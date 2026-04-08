import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPayPalOrder } from "@/lib/paypal";
import type {
  MembershipTier,
  RegistrationCategory,
  PricingTier,
} from "@/types/database";

interface MembershipOrderBody {
  type: "membership";
  tier: MembershipTier;
  userId: string;
}

interface RegistrationOrderBody {
  type: "registration";
  category: RegistrationCategory;
  eventId: string;
  userId: string;
}

type OrderBody = MembershipOrderBody | RegistrationOrderBody;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: OrderBody = await request.json();

    if (body.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

      const order = await createPayPalOrder({
        amount: pricing.annual_price,
        description: `IAMA ${body.tier.charAt(0).toUpperCase() + body.tier.slice(1)} Membership`,
        referenceId: `membership:${user.id}:${body.tier}`,
      });

      return NextResponse.json({
        orderId: order.id,
        approvalUrl: order.approvalUrl,
        metadata: {
          type: "membership",
          userId: user.id,
          tier: body.tier,
          amount: pricing.annual_price,
        },
      });
    }

    if (body.type === "registration") {
      if (!body.eventId) {
        return NextResponse.json(
          { error: "eventId is required for registration" },
          { status: 400 }
        );
      }

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

      // Check active membership
      const { data: activeMembership } = await supabase
        .from("memberships")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .gte("expires_at", new Date().toISOString())
        .limit(1)
        .single();

      const isMember = !!activeMembership;

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

      // Check existing registration
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

      const order = await createPayPalOrder({
        amount: price,
        description: `${event.title} Registration — ${body.category}`,
        referenceId: `registration:${user.id}:${body.eventId}`,
      });

      return NextResponse.json({
        orderId: order.id,
        approvalUrl: order.approvalUrl,
        metadata: {
          type: "registration",
          userId: user.id,
          eventId: body.eventId,
          category: body.category,
          pricingTier,
          isMember,
          amount: price,
        },
      });
    }

    return NextResponse.json({ error: "Invalid order type" }, { status: 400 });
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
