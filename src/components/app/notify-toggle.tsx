"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  subscribeUser,
  unsubscribeUser,
  sendTestNotification,
} from "@/app/app/push-actions";

// ---------------------------------------------------------------------------
// urlBase64ToUint8Array — from the Next.js PWA guide
// ---------------------------------------------------------------------------
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// ---------------------------------------------------------------------------
// NotifyToggle
// ---------------------------------------------------------------------------
export function NotifyToggle() {
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";
  const isCapable =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    Boolean(vapidKey);

  const [mounted, setMounted] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Hydrate state after mount (SSR-safe)
  const refresh = useCallback(async () => {
    if (!isCapable) return;
    setPermission(Notification.permission);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setSubscription(sub);
    } catch {
      // SW not ready yet — subscription stays null
    }
  }, [isCapable]);

  useEffect(() => {
    setMounted(true);
    refresh();
  }, [refresh]);

  if (!mounted) return null;

  // ── Unsupported / unconfigured ─────────────────────────────────────────────
  if (!isCapable) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted">
        <BellOff className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <span>Notifications aren&apos;t available yet — check back after installing the app.</span>
      </div>
    );
  }

  const isSubscribed = Boolean(subscription);
  const isDenied = permission === "denied";

  // ── Permission denied ──────────────────────────────────────────────────────
  if (isDenied) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted">
        <BellOff className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <span>
          Notifications are blocked. To enable them, update your browser&apos;s
          site settings and reload.
        </span>
      </div>
    );
  }

  // ── Enable handler ─────────────────────────────────────────────────────────
  async function handleEnable() {
    setLoading(true);
    setStatusMsg(null);
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        setStatusMsg("Permission not granted.");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey).buffer as ArrayBuffer,
      });
      setSubscription(sub);

      // Serialize to plain JSON before sending to server action
      const serialized = JSON.parse(JSON.stringify(sub)) as {
        endpoint: string;
        keys: { p256dh: string; auth: string };
      };
      const result = await subscribeUser(serialized, navigator.userAgent);
      if (!result.ok) {
        // Subscription is active client-side even if DB save fails (no user session)
        setStatusMsg(result.reason);
      } else {
        setStatusMsg("You'll receive reminders 15 min before saved sessions.");
      }
    } catch (err) {
      console.error("[NotifyToggle] enable:", err);
      setStatusMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Disable handler ────────────────────────────────────────────────────────
  async function handleDisable() {
    setLoading(true);
    setStatusMsg(null);
    try {
      if (subscription) {
        const ep = subscription.endpoint;
        await subscription.unsubscribe();
        setSubscription(null);
        await unsubscribeUser(ep);
      }
      setStatusMsg("Notifications disabled.");
    } catch (err) {
      console.error("[NotifyToggle] disable:", err);
      setStatusMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Test handler ───────────────────────────────────────────────────────────
  async function handleTest() {
    setLoading(true);
    setStatusMsg(null);
    try {
      const result = await sendTestNotification();
      setStatusMsg(result.ok ? "Test notification sent!" : result.reason);
    } catch {
      setStatusMsg("Failed to send test notification.");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border p-4",
          isSubscribed
            ? "border-primary/30 bg-primary-50"
            : "border-border bg-card"
        )}
      >
        {isSubscribed ? (
          <Bell
            className="h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
        ) : (
          <BellOff
            className="h-5 w-5 shrink-0 text-muted"
            aria-hidden="true"
          />
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-secondary">
            {isSubscribed ? "Reminders on" : "Reminders off"}
          </p>
          <p className="text-xs text-muted leading-snug mt-0.5">
            {isSubscribed
              ? "You'll get a push 15 min before your saved sessions."
              : "Enable to get push reminders for sessions you've saved."}
          </p>
        </div>

        {isSubscribed ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisable}
            disabled={loading}
            aria-label="Disable reminders"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              "Disable"
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleEnable}
            disabled={loading}
            aria-label="Enable reminders"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                <Bell className="h-4 w-4" aria-hidden="true" />
                Enable
              </>
            )}
          </Button>
        )}
      </div>

      {/* Status message */}
      {statusMsg && (
        <p className="text-xs text-muted px-1" role="status" aria-live="polite">
          {statusMsg}
        </p>
      )}

      {/* Sign-in note when no subscription saved server-side */}
      {!isSubscribed && (
        <p className="text-xs text-muted px-1">
          Reminders for your saved sessions require sign-in.
        </p>
      )}

      {/* Test button — only shown when already subscribed */}
      {isSubscribed && (
        <button
          onClick={handleTest}
          disabled={loading}
          className="text-xs text-primary underline underline-offset-2 hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send test notification
        </button>
      )}
    </div>
  );
}
