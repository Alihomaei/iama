import type { ReactNode } from "react";
import Link from "next/link";
import {
  MapPin,
  Presentation,
  Mic,
  Wrench,
  Lightbulb,
  LayoutGrid,
  Coffee,
  Utensils,
  PartyPopper,
  Briefcase,
  HeartPulse,
  Map as MapIcon,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import type { Session, SessionType } from "@/lib/agenda/types";
import { cn } from "@/lib/utils";
import { TrackChip } from "@/components/app/track-chip";

const typeIcons: Record<SessionType, LucideIcon> = {
  panel: Presentation,
  keynote: Mic,
  workshop: Wrench,
  pitch: Lightbulb,
  poster: LayoutGrid,
  break: Coffee,
  meal: Utensils,
  social: PartyPopper,
  business: Briefcase,
  wellness: HeartPulse,
  tour: MapIcon,
  registration: ClipboardCheck,
};

export function SessionCard({
  session,
  timeLabel,
  href,
  action,
  live,
}: {
  session: Session;
  timeLabel?: string;
  href?: string;
  action?: ReactNode;
  live?: boolean;
}) {
  const TypeIcon = typeIcons[session.type] ?? Presentation;
  const time = timeLabel ?? session.start;

  const inner = (
    <div className="flex items-stretch gap-3">
      {/* Time block */}
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-gray-50 px-1 py-2 text-center">
        <span className="text-sm font-semibold leading-tight text-secondary">
          {time}
        </span>
        {session.end && (
          <span className="mt-0.5 text-[11px] leading-tight text-muted">
            {session.end}
          </span>
        )}
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <TypeIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <h3 className="min-w-0 flex-1 font-semibold leading-snug text-secondary">
            {session.title}
          </h3>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <TrackChip track={session.track ?? "general"} />
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
              </span>
              Live now
            </span>
          )}
          {session.room && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {session.room}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card shadow-sm transition-shadow",
        live ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
        href && "hover:shadow-md"
      )}
    >
      {href ? (
        <Link
          href={href}
          className="block rounded-xl p-3 pr-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {inner}
        </Link>
      ) : (
        <div className="p-3 pr-12">{inner}</div>
      )}

      {/* Action slot — kept outside the Link so it is independently tappable. */}
      {action && (
        <div className="absolute right-2 top-2 z-10">{action}</div>
      )}
    </div>
  );
}
