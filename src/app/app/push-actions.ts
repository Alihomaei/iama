"use server";

import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type PushActionResult =
  | { ok: true }
  | { ok: false; reason: string };

interface PushSubscriptionInput {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

// ---------------------------------------------------------------------------
// Guard: returns true only when all required env vars are present
// ---------------------------------------------------------------------------

function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY &&
      process.env.VAPID_PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ---------------------------------------------------------------------------
// subscribeUser
// Upsert a push subscription for the currently authenticated user.
// ---------------------------------------------------------------------------

export async function subscribeUser(
  sub: PushSubscriptionInput,
  userAgent?: string
): Promise<PushActionResult> {
  try {
    if (!isConfigured()) {
      return { ok: false, reason: "Notifications not configured on this server." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { ok: false, reason: "You must be signed in to save your subscription." };
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .upsert(
        {
          user_id: user.id,
          endpoint: sub.endpoint,
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth,
          user_agent: userAgent ?? null,
        },
        { onConflict: "endpoint" }
      );

    if (error) {
      console.error("[push] subscribeUser error:", error.message);
      return { ok: false, reason: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[push] subscribeUser unexpected:", err);
    return { ok: false, reason: "An unexpected error occurred." };
  }
}

// ---------------------------------------------------------------------------
// unsubscribeUser
// Delete the subscription row for the current user matching the given endpoint.
// ---------------------------------------------------------------------------

export async function unsubscribeUser(endpoint: string): Promise<PushActionResult> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { ok: false, reason: "Supabase not configured." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { ok: false, reason: "Not authenticated." };
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", endpoint)
      .eq("user_id", user.id);

    if (error) {
      console.error("[push] unsubscribeUser error:", error.message);
      return { ok: false, reason: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[push] unsubscribeUser unexpected:", err);
    return { ok: false, reason: "An unexpected error occurred." };
  }
}

// ---------------------------------------------------------------------------
// sendTestNotification
// Send a test push to the current user's most recent subscription.
// web-push is imported lazily so missing env never crashes the module.
// ---------------------------------------------------------------------------

export async function sendTestNotification(): Promise<PushActionResult> {
  try {
    const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivate = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublic || !vapidPrivate || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { ok: false, reason: "Notifications not configured on this server." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { ok: false, reason: "Not authenticated." };
    }

    const { data: rows, error: fetchError } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchError) {
      return { ok: false, reason: fetchError.message };
    }
    if (!rows || rows.length === 0) {
      return { ok: false, reason: "No active subscription found." };
    }

    const row = rows[0];

    // Lazy import — module only evaluated when env is present
    const webpush = await import("web-push");
    webpush.setVapidDetails(
      "mailto:info@iamamed.org",
      vapidPublic,
      vapidPrivate
    );

    const payload = JSON.stringify({
      title: "IAMA 2026",
      body: "Test notification from the meeting app.",
      icon: "/icon-192.png",
      url: "/app",
      tag: "test",
    });

    await webpush.sendNotification(
      {
        endpoint: row.endpoint,
        keys: { p256dh: row.p256dh, auth: row.auth },
      },
      payload
    );

    return { ok: true };
  } catch (err) {
    console.error("[push] sendTestNotification unexpected:", err);
    const message = err instanceof Error ? err.message : "Failed to send notification.";
    return { ok: false, reason: message };
  }
}
