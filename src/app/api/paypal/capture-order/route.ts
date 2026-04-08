import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { sendMembershipConfirmation, sendRegistrationConfirmation } from "@/lib/email";
import { formatCurrency } from "@/lib/utils";

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface CaptureBody {
  orderId: string;
  metadata: {
    type: "membership" | "registration";
    userId: string;
    tier?: string;
    eventId?: string;
    category?: string;
    pricingTier?: string;
    isMember?: boolean;
    amount: number;
  };
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CaptureBody = await request.json();

    if (body.metadata.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Capture the PayPal order
    const capture = await capturePayPalOrder(body.orderId);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Payment was not completed" },
        { status: 400 }
      );
    }

    const serviceClient = getServiceClient();
    const amountCents = Math.round(parseFloat(capture.amount) * 100);

    if (body.metadata.type === "membership") {
      const tier = body.metadata.tier!;

      // Log payment
      await serviceClient.from("payments").insert({
        user_id: user.id,
        provider: "paypal",
        provider_payment_id: capture.captureId,
        amount: amountCents,
        currency: capture.currency.toLowerCase(),
        status: "completed",
        metadata: {
          type: "membership",
          tier,
          orderId: body.orderId,
        },
      });

      // Calculate membership dates
      const startsAt = new Date();
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      // Deactivate current membership
      await serviceClient
        .from("memberships")
        .update({ status: "expired" })
        .eq("user_id", user.id)
        .eq("status", "active");

      // Create active membership
      await serviceClient.from("memberships").insert({
        user_id: user.id,
        tier,
        status: "active",
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        payment_id: capture.captureId,
      });

      // Send confirmation email
      const { data: profile } = await serviceClient
        .from("profiles")
        .select("email, full_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        try {
          await sendMembershipConfirmation({
            to: profile.email,
            name: profile.full_name || profile.email,
            tier: tier.charAt(0).toUpperCase() + tier.slice(1),
            expiresAt: expiresAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });
        } catch (emailError) {
          console.error("Failed to send membership email:", emailError);
        }
      }

      return NextResponse.json({ success: true, type: "membership" });
    }

    if (body.metadata.type === "registration") {
      const eventId = body.metadata.eventId!;
      const category = body.metadata.category!;
      const pricingTier = body.metadata.pricingTier!;
      const isMember = body.metadata.isMember || false;

      // Log payment
      await serviceClient.from("payments").insert({
        user_id: user.id,
        provider: "paypal",
        provider_payment_id: capture.captureId,
        amount: amountCents,
        currency: capture.currency.toLowerCase(),
        status: "completed",
        metadata: {
          type: "registration",
          eventId,
          category,
          pricingTier,
          orderId: body.orderId,
        },
      });

      // Upsert registration
      const { data: existingRegistration } = await serviceClient
        .from("registrations")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_id", eventId)
        .single();

      if (existingRegistration) {
        await serviceClient
          .from("registrations")
          .update({
            payment_status: "completed",
            payment_provider: "paypal",
            payment_id: capture.captureId,
            amount_paid: amountCents,
            is_member_rate: isMember,
            pricing_tier: pricingTier,
            category,
          })
          .eq("id", existingRegistration.id);
      } else {
        await serviceClient.from("registrations").insert({
          user_id: user.id,
          event_id: eventId,
          category,
          pricing_tier: pricingTier,
          payment_status: "completed",
          payment_provider: "paypal",
          payment_id: capture.captureId,
          amount_paid: amountCents,
          is_member_rate: isMember,
        });
      }

      // Send confirmation email
      const { data: profile } = await serviceClient
        .from("profiles")
        .select("email, full_name")
        .eq("id", user.id)
        .single();

      const { data: event } = await serviceClient
        .from("congress_events")
        .select("title")
        .eq("id", eventId)
        .single();

      if (profile && event) {
        try {
          await sendRegistrationConfirmation({
            to: profile.email,
            name: profile.full_name || profile.email,
            eventTitle: event.title,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            amount: formatCurrency(amountCents),
          });
        } catch (emailError) {
          console.error("Failed to send registration email:", emailError);
        }
      }

      return NextResponse.json({ success: true, type: "registration" });
    }

    return NextResponse.json({ error: "Invalid order type" }, { status: 400 });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture PayPal payment" },
      { status: 500 }
    );
  }
}
