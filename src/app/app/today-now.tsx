"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { getNowAndNext } from "@/lib/agenda";
import type { NowNext } from "@/lib/agenda/types";
import { NowNextBanner } from "@/components/app/now-next-banner";

/**
 * Live "Happening now / Up next" island for the Today screen.
 *
 * Server-rendered output is a neutral placeholder so the markup is stable and
 * hydration never mismatches. After mount we compute {@link getNowAndNext}
 * against the real wall-clock and refresh every 30s so the screen feels live
 * for someone walking the conference floor.
 */
export function TodayNow() {
  const [state, setState] = useState<NowNext | null>(null);

  useEffect(() => {
    const tick = () => setState(getNowAndNext(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    // Pre-hydration placeholder — same shape/height as the real banner.
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted shadow-sm"
        aria-hidden="true"
      >
        <Radio className="h-5 w-5 shrink-0 text-muted" />
        Loading what&rsquo;s on now&hellip;
      </div>
    );
  }

  return (
    <div aria-live="polite">
      <NowNextBanner now={state.now} next={state.next} />
    </div>
  );
}
