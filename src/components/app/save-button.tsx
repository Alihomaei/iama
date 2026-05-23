"use client";

// Star toggle that adds/removes a session or talk from the user's personal
// agenda. Backed by `useSavedItems()` so every instance across the app stays in
// sync (module-level store; no provider required).
//
// Behaviour:
//   - Filled teal star when saved, outline when not. `aria-pressed` reflects it.
//   - Stops event propagation + prevents default so it works when nested inside
//     a linked SessionCard / TalkRow (tapping the star never follows the link).
//   - When a user saves while NOT signed in, a tiny, auto-dismissing inline
//     hint nudges them to sign in to sync across devices. Non-blocking.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import type { SavedItemType } from "@/lib/agenda/types";
import { useSavedItems } from "@/components/app/use-saved-items";
import { cn } from "@/lib/utils";

export function SaveButton({
  itemId,
  itemType,
  size = "md",
  className,
}: {
  itemId: string;
  itemType: SavedItemType;
  size?: "sm" | "md";
  className?: string;
}) {
  const { isSaved, toggle, ready, signedIn } = useSavedItems();
  const saved = isSaved(itemId);

  const [showHint, setShowHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    // Critical: keep the tap from activating an enclosing <Link>/card.
    e.preventDefault();
    e.stopPropagation();

    const wasSaved = saved;
    void toggle(itemId, itemType);

    // Only nudge when they *added* something while signed out.
    if (!wasSaved && !signedIn) {
      setShowHint(true);
      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setShowHint(false), 4000);
    } else {
      setShowHint(false);
    }
  };

  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconDim = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        aria-label={saved ? "Remove from My Agenda" : "Save to My Agenda"}
        title={saved ? "Remove from My Agenda" : "Save to My Agenda"}
        disabled={!ready}
        className={cn(
          "inline-flex items-center justify-center rounded-full border transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-40",
          dim,
          saved
            ? "border-primary/30 bg-primary-50 text-primary hover:bg-primary-100"
            : "border-border bg-white text-muted hover:border-primary/40 hover:text-primary",
          className,
        )}
      >
        <Star
          className={cn(iconDim, saved && "fill-primary")}
          strokeWidth={saved ? 2.2 : 2}
          aria-hidden="true"
        />
      </button>

      {/* One-shot "sign in to sync" nudge — only for signed-out saves. */}
      {showHint && (
        <div
          role="status"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-white p-2.5 text-xs text-secondary shadow-lg"
        >
          <p className="leading-snug">Saved on this device.</p>
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-block font-medium text-primary hover:underline"
          >
            Sign in to sync across devices
          </Link>
        </div>
      )}
    </div>
  );
}
