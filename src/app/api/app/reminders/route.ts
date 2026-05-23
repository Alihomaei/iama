// Cron route: fires push reminders for agenda items starting in ~15 min.
// Called by Vercel Cron every 5 minutes (*/5 * * * *).
// Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` on cron
// invocations, so we validate that header to prevent unauthenticated calls.
//
// Degrades gracefully: missing env → returns 200 with { skipped }.
// web-push is imported lazily inside the handler to avoid crash on missing env.

import { createClient } from "@supabase/supabase-js";
import {
  EVENT,
  days,
  getSession,
  getTalk,
  sessionStartDate,
  formatTime,
} from "@/lib/agenda";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PushSubscriptionRow {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  user_id: string;
}

interface SavedAgendaItem {
  user_id: string;
  item_id: string;
  item_type: "session" | "talk";
}

interface SentReminder {
  subscription_id: string;
  item_id: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolve an absolute Date for an agenda item.
 * - Sessions: use sessionStartDate() from the library.
 * - Talks: use the parent session's day date + talk.start + EVENT.utcOffset.
 *   Falls back to the parent session's start when talk.start is absent.
 */
function resolveItemStart(
  itemId: string,
  itemType: "session" | "talk"
): { start: Date; title: string; room?: string; sessionId: string } | null {
  if (itemType === "session") {
    const session = getSession(itemId);
    if (!session) return null;
    return {
      start: sessionStartDate(session),
      title: session.title,
      room: session.room,
      sessionId: session.id,
    };
  }

  // talk
  const talk = getTalk(itemId);
  if (!talk) return null;
  const parentSession = getSession(talk.sessionId);
  if (!parentSession) return null;

  let talkStart: Date;
  if (talk.start) {
    // Build ISO string: day.date + talk.start + EVENT.utcOffset
    // Re-uses the same pattern as agenda/index.ts `instantFor`
    const day = days.find((d) => d.id === parentSession.dayId);
    if (day) {
      const [h, m] = talk.start.split(":").map(Number);
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      talkStart = new Date(`${day.date}T${hh}:${mm}:00${EVENT.utcOffset}`);
    } else {
      talkStart = sessionStartDate(parentSession);
    }
  } else {
    talkStart = sessionStartDate(parentSession);
  }

  return {
    start: talkStart,
    title: talk.title,
    room: parentSession.room,
    sessionId: parentSession.id,
  };
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  // ── 1. Auth ────────────────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!cronSecret || bearerToken !== cronSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── 2. Guard: env must be configured ──────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;

  if (!supabaseUrl || !serviceRoleKey || !vapidPublic || !vapidPrivate) {
    return Response.json({ ok: true, skipped: "not configured" });
  }

  // ── 3. Build service-role Supabase client (bypasses RLS) ──────────────────
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // ── 4. Compute time window: items starting in [now+10min, now+20min] ──────
  const now = new Date();
  const windowStart = new Date(now.getTime() + 10 * 60_000);
  const windowEnd = new Date(now.getTime() + 20 * 60_000);

  // ── 5. Load all saved agenda items ────────────────────────────────────────
  const { data: savedItems, error: savedErr } = await supabase
    .from("saved_agenda_items")
    .select("user_id, item_id, item_type");

  if (savedErr) {
    console.error("[reminders] fetch saved items:", savedErr.message);
    return Response.json({ ok: false, error: savedErr.message }, { status: 500 });
  }

  const items = (savedItems ?? []) as SavedAgendaItem[];

  // ── 6. Filter items whose start falls in the window ───────────────────────
  const due: Array<{
    userId: string;
    itemId: string;
    start: Date;
    title: string;
    room?: string;
    sessionId: string;
  }> = [];

  for (const item of items) {
    const resolved = resolveItemStart(item.item_id, item.item_type);
    if (!resolved) continue;
    const ms = resolved.start.getTime();
    if (Number.isNaN(ms)) continue;
    if (ms >= windowStart.getTime() && ms < windowEnd.getTime()) {
      due.push({ userId: item.user_id, itemId: item.item_id, ...resolved });
    }
  }

  if (due.length === 0) {
    return Response.json({ ok: true, due: 0, sent: 0, failed: 0 });
  }

  // ── 7. Load subscriptions for affected users ───────────────────────────────
  const affectedUserIds = [...new Set(due.map((d) => d.userId))];
  const { data: subRows, error: subErr } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth, user_id")
    .in("user_id", affectedUserIds);

  if (subErr) {
    console.error("[reminders] fetch subscriptions:", subErr.message);
    return Response.json({ ok: false, error: subErr.message }, { status: 500 });
  }

  const subs = (subRows ?? []) as PushSubscriptionRow[];
  if (subs.length === 0) {
    return Response.json({ ok: true, due: due.length, sent: 0, failed: 0 });
  }

  // ── 8. Load already-sent pairs to deduplicate ─────────────────────────────
  const subIds = subs.map((s) => s.id);
  const dueItemIds = [...new Set(due.map((d) => d.itemId))];

  const { data: sentRows } = await supabase
    .from("sent_reminders")
    .select("subscription_id, item_id")
    .in("subscription_id", subIds)
    .in("item_id", dueItemIds);

  const alreadySent = new Set<string>(
    ((sentRows ?? []) as SentReminder[]).map(
      (r) => `${r.subscription_id}::${r.item_id}`
    )
  );

  // ── 9. Init web-push (lazy import) ────────────────────────────────────────
  const webpush = await import("web-push");
  webpush.setVapidDetails("mailto:info@iamamed.org", vapidPublic, vapidPrivate);

  // ── 10. Send notifications ─────────────────────────────────────────────────
  let sent = 0;
  let failed = 0;
  const expiredEndpoints: string[] = [];

  for (const item of due) {
    const userSubs = subs.filter((s) => s.user_id === item.userId);
    for (const sub of userSubs) {
      const key = `${sub.id}::${item.itemId}`;
      if (alreadySent.has(key)) continue;

      const startTime = formatTime(
        // formatTime expects "HH:mm" — extract from Date in local-ish display
        item.start.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        })
      );

      const body = item.room
        ? `${item.title} · ${startTime} · ${item.room}`
        : `${item.title} · ${startTime}`;

      const payload = JSON.stringify({
        title: "Starting soon",
        body,
        icon: "/icon-192.png",
        url: `/app/sessions/${item.sessionId}`,
        tag: item.itemId,
      });

      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );

        // Record success
        await supabase
          .from("sent_reminders")
          .insert({ subscription_id: sub.id, item_id: item.itemId })
          .then(({ error }) => {
            if (error) console.warn("[reminders] sent_reminders insert:", error.message);
          });

        alreadySent.add(key);
        sent++;
      } catch (err) {
        const status =
          err instanceof Error && "statusCode" in err
            ? (err as { statusCode: number }).statusCode
            : 0;

        if (status === 404 || status === 410) {
          // Subscription expired — collect for cleanup
          expiredEndpoints.push(sub.endpoint);
        } else {
          console.error("[reminders] sendNotification:", err);
        }
        failed++;
      }
    }
  }

  // ── 11. Clean up expired subscriptions ────────────────────────────────────
  if (expiredEndpoints.length > 0) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in("endpoint", expiredEndpoints)
      .then(({ error }) => {
        if (error)
          console.warn("[reminders] cleanup expired:", error.message);
        else
          console.log(`[reminders] cleaned up ${expiredEndpoints.length} expired subscription(s).`);
      });
  }

  return Response.json({ ok: true, due: due.length, sent, failed });
}
