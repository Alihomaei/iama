import Link from "next/link";
import {
  CalendarDays,
  Users,
  Star,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  EVENT,
  getDays,
  getSessionsByDay,
  formatTime,
  sessionStartDate,
  sessionEndDate,
} from "@/lib/agenda";
import type { Day } from "@/lib/agenda/types";
import { SessionCard } from "@/components/app/session-card";
import { SaveButton } from "@/components/app/save-button";
import { Card } from "@/components/ui/card";
import { TodayNow } from "./today-now";

export const metadata = { title: "Today" };

// Rendered at request time so "today" and the live badges reflect the real clock.
export const dynamic = "force-dynamic";

/** ISO "YYYY-MM-DD" for `now` in the event's fixed offset (EDT, -04:00). */
function eventLocalISODate(now: Date): string {
  // Shift the instant by the event offset, then read the UTC date parts so the
  // result is the wall-clock calendar date *at the venue*, regardless of where
  // the server/device is.
  const offsetMin = parseOffsetMinutes(EVENT.utcOffset);
  const shifted = new Date(now.getTime() + offsetMin * 60_000);
  return shifted.toISOString().slice(0, 10);
}

/** "-04:00" -> -240 minutes. */
function parseOffsetMinutes(offset: string): number {
  const m = /^([+-])(\d{2}):(\d{2})$/.exec(offset);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3]));
}

/** Pick the Day matching today's venue-local date; fall back to the first day. */
function pickCurrentDay(days: Day[], now: Date): { day: Day; inRange: boolean } {
  const todayISO = eventLocalISODate(now);
  const match = days.find((d) => d.date === todayISO);
  if (match) return { day: match, inRange: true };
  return { day: days[0], inRange: false };
}

export default function TodayPage() {
  const now = new Date();
  const days = getDays();
  const { day, inRange } = pickCurrentDay(days, now);
  const dayIndex = days.findIndex((d) => d.id === day.id);

  const sessions = getSessionsByDay(day.id);
  const nowMs = now.getTime();

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold leading-tight text-secondary">
          {EVENT.name}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {EVENT.venue} · {EVENT.city}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-800">
            {inRange
              ? `Day ${dayIndex + 1} of ${days.length} · ${day.label}`
              : "Starts May 22"}
          </span>
          {!inRange && (
            <span className="text-sm text-muted">May 22–25, 2026</span>
          )}
        </div>
      </header>

      {/* Live now / next */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Right now
        </h2>
        <TodayNow />
      </section>

      {/* Today's sessions */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {inRange ? "Today's sessions" : `${day.weekday}'s sessions`}
          </h2>
          <Link
            href="/app/schedule"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            Full schedule
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {sessions.length === 0 ? (
          <Card className="p-4 text-sm text-muted">
            No sessions scheduled for this day yet.
          </Card>
        ) : (
          <ul className="space-y-2.5">
            {sessions.map((session) => {
              const start = sessionStartDate(session).getTime();
              const end = sessionEndDate(session)?.getTime() ?? null;
              const live =
                !Number.isNaN(start) &&
                start <= nowMs &&
                end !== null &&
                nowMs < end;
              return (
                <li key={session.id}>
                  <SessionCard
                    session={session}
                    timeLabel={
                      session.end
                        ? `${formatTime(session.start)}–${formatTime(session.end)}`
                        : formatTime(session.start)
                    }
                    href={`/app/sessions/${session.id}`}
                    action={
                      <SaveButton
                        itemId={session.id}
                        itemType="session"
                        size="sm"
                      />
                    }
                    live={live}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Quick links */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Explore
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickLink
            href="/app/schedule"
            icon={CalendarDays}
            title="Full schedule"
            subtitle="All 4 days"
          />
          <QuickLink
            href="/app/people"
            icon={Users}
            title="Speakers"
            subtitle="Faculty & presenters"
          />
          <QuickLink
            href="/app/my-agenda"
            icon={Star}
            title="My agenda"
            subtitle="Your saved sessions"
          />
          <QuickLink
            href="/app/info"
            icon={MapPin}
            title="Venue & info"
            subtitle="Getting around"
          />
        </div>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  subtitle,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary transition-colors group-hover:bg-primary-100">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="font-semibold leading-tight text-secondary">{title}</p>
      <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
    </Link>
  );
}
