import Link from "next/link";
import { MapPin, Radio, ArrowRight, CalendarClock } from "lucide-react";
import type { Session } from "@/lib/agenda/types";
import { TrackChip } from "@/components/app/track-chip";

const defaultHref = (s: Session) => `/app/sessions/${s.id}`;

export function NowNextBanner({
  now,
  next,
  renderHref = defaultHref,
}: {
  now: Session[];
  next: Session | null;
  renderHref?: (s: Session) => string;
}) {
  if (now.length === 0 && !next) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted shadow-sm">
        <CalendarClock className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        No sessions in progress right now.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {now.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-primary/30 bg-primary-50 shadow-sm ring-1 ring-primary/10">
          <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-2">
            <Radio className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary-800">
              Happening now
            </span>
          </div>
          <ul className="divide-y divide-primary/10">
            {now.map((session) => (
              <li key={session.id}>
                <Link
                  href={renderHref(session)}
                  className="block px-4 py-3 transition-colors hover:bg-primary-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 font-semibold leading-snug text-secondary">
                      {session.title}
                    </p>
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <TrackChip track={session.track ?? "general"} />
                    {session.room && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {session.room}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {next && (
        <Link
          href={renderHref(next)}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="font-medium text-muted">Up next</span>
          <span className="font-medium tabular-nums text-secondary">
            {next.start}
          </span>
          <span className="min-w-0 truncate text-secondary">{next.title}</span>
          <ArrowRight
            className="ml-auto h-4 w-4 shrink-0 text-muted"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
