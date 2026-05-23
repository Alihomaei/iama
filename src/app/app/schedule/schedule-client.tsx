"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarX2 } from "lucide-react";
import {
  EVENT,
  getDays,
  getDay,
  getSessionsByDay,
  formatTime,
  sessionStartDate,
  sessionEndDate,
  searchAgenda,
} from "@/lib/agenda";
import type { Day, Session, TrackId } from "@/lib/agenda/types";
import { DayTabs } from "@/components/app/day-tabs";
import { SearchBar } from "@/components/app/search-bar";
import { SessionCard } from "@/components/app/session-card";
import { SaveButton } from "@/components/app/save-button";
import { trackColors, trackLabels } from "@/components/app/track-chip";
import { cn } from "@/lib/utils";

const ALL = "all" as const;
type TrackFilter = typeof ALL | TrackId;

/** Canonical chip order — follow the declared order of {@link trackLabels}. */
const TRACK_ORDER = Object.keys(trackLabels) as TrackId[];

const trackOf = (s: Session): TrackId => s.track ?? "general";

/** "-04:00" -> -240 minutes. */
function parseOffsetMinutes(offset: string): number {
  const m = /^([+-])(\d{2}):(\d{2})$/.exec(offset);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3]));
}

/** Venue-local ISO date for `now` (event fixed offset), e.g. "2026-05-23". */
function eventLocalISODate(now: Date): string {
  const shifted = new Date(now.getTime() + parseOffsetMinutes(EVENT.utcOffset) * 60_000);
  return shifted.toISOString().slice(0, 10);
}

/** Default selected day: the one matching today's venue date, else the first. */
function defaultDayId(days: Day[]): string {
  const todayISO = eventLocalISODate(new Date());
  return (days.find((d) => d.date === todayISO) ?? days[0]).id;
}

const timeLabelFor = (s: Session) =>
  s.end ? `${formatTime(s.start)}–${formatTime(s.end)}` : formatTime(s.start);

function isLive(s: Session, nowMs: number): boolean {
  const start = sessionStartDate(s).getTime();
  if (Number.isNaN(start)) return false;
  const end = sessionEndDate(s)?.getTime() ?? null;
  return start <= nowMs && end !== null && nowMs < end;
}

export function ScheduleClient() {
  const days = useMemo(() => getDays(), []);
  const [dayId, setDayId] = useState<string>(() => defaultDayId(days));
  const [track, setTrack] = useState<TrackFilter>(ALL);
  const [query, setQuery] = useState("");

  // Tracks actually present in the program, in canonical order.
  const presentTracks = useMemo(() => {
    const present = new Set<TrackId>();
    for (const d of days) {
      for (const s of getSessionsByDay(d.id)) present.add(trackOf(s));
    }
    return TRACK_ORDER.filter((t) => present.has(t));
  }, [days]);

  const trimmed = query.trim();
  const searching = trimmed.length > 0;

  // Sessions for the selected day (no query) — already sorted by start.
  const daySessions = useMemo(() => getSessionsByDay(dayId), [dayId]);

  // Cross-day search results when a query is present.
  const searchSessions = useMemo(() => {
    if (!searching) return [];
    return searchAgenda(trimmed).sessions;
  }, [searching, trimmed]);

  const passesTrack = (s: Session) => track === ALL || trackOf(s) === track;

  const visible = (searching ? searchSessions : daySessions).filter(passesTrack);

  // Group results by day when searching so cross-day hits are legible.
  const groups = useMemo(() => {
    if (!searching) {
      return [{ day: getDay(dayId), sessions: visible }];
    }
    const byDay = new Map<string, Session[]>();
    for (const s of visible) {
      const arr = byDay.get(s.dayId) ?? [];
      arr.push(s);
      byDay.set(s.dayId, arr);
    }
    return days
      .filter((d) => byDay.has(d.id))
      .map((d) => ({
        day: d,
        sessions: (byDay.get(d.id) ?? []).sort((a, b) =>
          a.start < b.start ? -1 : a.start > b.start ? 1 : 0,
        ),
      }));
  }, [searching, visible, days, dayId]);

  // Client-only clock for "live now" badges. Starts at 0 (server + first client
  // render show no badge → hydration-safe), then ticks once mounted.
  const [nowMs, setNowMs] = useState(0);
  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  const hasResults = visible.length > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold leading-tight text-secondary">
          Schedule
        </h1>
        <p className="text-sm text-muted">
          {EVENT.name} · {EVENT.city}
        </p>
      </div>

      {/* Sticky day tabs (offset below the 56px top bar). */}
      <DayTabs days={days} value={dayId} onChange={setDayId} />

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search sessions, rooms, tracks"
      />

      {/* Track filter */}
      <div
        role="group"
        aria-label="Filter by track"
        className="flex flex-wrap gap-2"
      >
        <FilterChip
          active={track === ALL}
          onClick={() => setTrack(ALL)}
          label="All tracks"
        />
        {presentTracks.map((t) => (
          <FilterChip
            key={t}
            active={track === t}
            onClick={() => setTrack((cur) => (cur === t ? ALL : t))}
            label={trackLabels[t]}
            colorClass={trackColors[t]}
          />
        ))}
      </div>

      {searching && (
        <p className="text-sm text-muted">
          {hasResults
            ? `${visible.length} result${visible.length === 1 ? "" : "s"} for “${trimmed}” across all days`
            : `No matches for “${trimmed}”`}
        </p>
      )}

      {/* Results */}
      {hasResults ? (
        <div className="space-y-6">
          {groups.map(({ day, sessions }) => (
            <section key={day?.id ?? "results"} className="space-y-2.5">
              {searching && day && (
                <h2 className="sticky top-[7.25rem] z-10 -mx-4 bg-gray-50/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted backdrop-blur supports-[backdrop-filter]:bg-gray-50/75">
                  {day.label}
                </h2>
              )}
              <ul className="space-y-2.5">
                {sessions.map((session) => (
                  <li key={session.id}>
                    <SessionCard
                      session={session}
                      timeLabel={timeLabelFor(session)}
                      href={`/app/sessions/${session.id}`}
                      action={
                        <SaveButton
                          itemId={session.id}
                          itemType="session"
                          size="sm"
                        />
                      }
                      live={isLive(session, nowMs)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState
          searching={searching}
          filtered={track !== ALL}
          onReset={() => {
            setQuery("");
            setTrack(ALL);
          }}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  colorClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  colorClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        active
          ? colorClass
            ? cn(colorClass, "ring-2 ring-inset ring-current")
            : "bg-primary text-white"
          : "bg-gray-100 text-muted hover:bg-gray-200 hover:text-secondary",
      )}
    >
      {label}
    </button>
  );
}

function EmptyState({
  searching,
  filtered,
  onReset,
}: {
  searching: boolean;
  filtered: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <CalendarX2 className="h-8 w-8 text-muted" aria-hidden="true" />
      <p className="mt-3 font-semibold text-secondary">No sessions found</p>
      <p className="mt-1 text-sm text-muted">
        {searching
          ? "Try a different search term"
          : filtered
            ? "No sessions in this track on the selected day"
            : "Nothing scheduled here yet"}
      </p>
      {(searching || filtered) && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
