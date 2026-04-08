import { NextResponse } from "next/server";
import { stripe, getStripeWebhookSecret } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { sendMembershipConfirmation, sendRegistrationConfirmation } from "@/lib/email";
import { formatCurrency } from "@/lib/utils";
import type Stripe from "stripe";

// Use a service-role client for webhook processing (no user session available)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret()
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      console.error("No metadata in checkout session");
      return NextResponse.json({ received: true });
    }

    const supabase = getServiceClient();

    try {
      if (metadata.type === "membership") {
        await handleMembershipPayment(supabase, session, metadata);
      } else if (metadata.type === "registration") {
        await handleRegistrationPayment(supabase, session, metadata);
      }
    } catch (error) {
      console.error("Webhook processing error:", error);
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function handleMembershipPayment(
  supabase: ReturnType<typeof getServiceClient>,
  session: Stripe.Checkout.Session,
  metadata: Record<string, string>
) {
  const userId = metadata.userId;
  const tier = metadata.tier;
  const amount = session.amount_total!;

  // Log payment
  await supabase.from("payments").insert({
    user_id: userId,
    provider: "stripe",
    provider_payment_id: session.payment_intent as string,
    amount,
    currency: session.currency || "usd",
    status: "completed",
    metadata: { type: "membership", tier, sessionId: session.id },
  });

  // Calculate membership dates
  const startsAt = new Date();
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  // Deactivate any current active membership
  await supabase
    .from("memberships")
    .update({ status: "expired" })
    .eq("user_id", userId)
    .eq("status", "active");

  // Create active membership
  await supabase.from("memberships").insert({
    user_id: userId,
    tier,
    status: "active",
    starts_at: startsAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    payment_id: session.payment_intent as string,
  });

  // Send confirmation email
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
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
      console.error("Failed to send membership confirmation email:", emailError);
    }
  }
}

async function handleRegistrationPayment(
  supabase: ReturnType<typeof getServiceClient>,
  session: Stripe.Checkout.Session,
  metadata: Record<string, string>
) {
  const userId = metadata.userId;
  const eventId = metadata.eventId;
  const category = metadata.category;
  const pricingTier = metadata.pricingTier;
  const isMember = metadata.isMember === "true";
  const amount = session.amount_total!;

  // Log payment
  await supabase.from("payments").insert({
    user_id: userId,
    provider: "stripe",
    provider_payment_id: session.payment_intent as string,
    amount,
    currency: session.currency || "usd",
    status: "completed",
    metadata: {
      type: "registration",
      eventId,
      category,
      pricingTier,
      sessionId: session.id,
    },
  });

  // Check if registration already exists (from a previous pending attempt)
  const { data: existingRegistration } = await supabase
    .from("registrations")
    .select("id")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .single();

  if (existingRegistration) {
    // Update existing registration
    await supabase
      .from("registrations")
      .update({
        payment_status: "completed",
        payment_provider: "stripe",
        payment_id: session.payment_intent as string,
        amount_paid: amount,
        is_member_rate: isMember,
        pricing_tier: pricingTier,
        category,
      })
      .eq("id", existingRegistration.id);
  } else {
    // Insert new registration
    await supabase.from("registrations").insert({
      user_id: userId,
      event_id: eventId,
      category,
      pricing_tier: pricingTier,
      payment_status: "completed",
      payment_provider: "stripe",
      payment_id: session.payment_intent as string,
      amount_paid: amount,
      is_member_rate: isMember,
    });
  }

  // Send confirmation email
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", userId)
    .single();

  const { data: event } = await supabase
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
        amount: formatCurrency(amount),
      });
    } catch (emailError) {
      console.error("Failed to send registration confirmation email:", emailError);
    }
  }
}
