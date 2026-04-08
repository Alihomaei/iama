import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import type {
  MembershipTier,
  RegistrationCategory,
  PricingTier,
} from "@/types/database";

interface MembershipCheckoutBody {
  type: "membership";
  tier: MembershipTier;
  userId: string;
}

interface RegistrationCheckoutBody {
  type: "registration";
  category: RegistrationCategory;
  eventId: string;
  userId: string;
}

type CheckoutBody = MembershipCheckoutBody | RegistrationCheckoutBody;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CheckoutBody = await request.json();

    if (body.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    if (body.type === "membership") {
      const { data: pricing } = await supabase
        .from("membership_pricing")
        .select("annual_price, tier, description")
        .eq("tier", body.tier)
        .single();

      if (!pricing) {
        return NextResponse.json(
          { error: "Invalid membership tier" },
          { status: 400 }
        );
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: profile.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `IAMA ${body.tier.charAt(0).toUpperCase() + body.tier.slice(1)} Membership`,
                description: pricing.description || undefined,
              },
              unit_amount: pricing.annual_price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: "membership",
          userId: user.id,
          tier: body.tier,
        },
        success_url: `${siteUrl}/dashboard?payment=success`,
        cancel_url: `${siteUrl}/membership?payment=cancelled`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (body.type === "registration") {
      if (!body.eventId) {
        return NextResponse.json(
          { error: "eventId is required for registration" },
          { status: 400 }
        );
      }

      // Get the event and its deadlines
      const { data: event } = await supabase
        .from("congress_events")
        .select("*")
        .eq("id", body.eventId)
        .single();

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      // Determine pricing tier based on deadlines
      const now = new Date();
      let pricingTier: PricingTier = "late";

      if (event.early_bird_deadline && now <= new Date(event.early_bird_deadline)) {
        pricingTier = "early_bird";
      } else if (event.regular_deadline && now <= new Date(event.regular_deadline)) {
        pricingTier = "regular";
      }

      // Check if user has active membership for member pricing
      const { data: activeMembership } = await supabase
        .from("memberships")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .gte("expires_at", new Date().toISOString())
        .limit(1)
        .single();

      const isMember = !!activeMembership;

      // Get pricing for this category and tier
      const { data: pricing } = await supabase
        .from("congress_pricing")
        .select("*")
        .eq("event_id", body.eventId)
        .eq("category", body.category)
        .eq("tier", pricingTier)
        .single();

      if (!pricing) {
        return NextResponse.json(
          { error: "Pricing not found for this category and tier" },
          { status: 400 }
        );
      }

      const price = isMember ? pricing.member_price : pricing.price;

      // Check for existing registration
      const { data: existingRegistration } = await supabase
        .from("registrations")
        .select("id, payment_status")
        .eq("user_id", user.id)
        .eq("event_id", body.eventId)
        .single();

      if (existingRegistration?.payment_status === "completed") {
        return NextResponse.json(
          { error: "Already registered for this event" },
          { status: 409 }
        );
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: profile.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${event.title} Registration`,
                description: `${body.category} — ${pricingTier.replace("_", " ")}${isMember ? " (Member Rate)" : ""}`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: "registration",
          userId: user.id,
          eventId: body.eventId,
          category: body.category,
          pricingTier,
          isMember: isMember ? "true" : "false",
          amount: price.toString(),
        },
        success_url: `${siteUrl}/dashboard?payment=success`,
        cancel_url: `${siteUrl}/congress/${event.slug}?payment=cancelled`,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: "Invalid checkout type" }, { status: 400 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
