"use client";

// "My Agenda" — the user's saved sessions & talks, grouped by day and sorted by
// start time, with conflict highlighting for overlapping items on the same day.
//
// Data source is `useSavedItems()` (cloud when signed in, localStorage
// otherwise). Saved ids are resolved against the static agenda data; ids that no
// longer exist (e.g. a removed item) are skipped gracefully.

import { useMemo } from "react";
import Link from "next/link";
import {
  CalendarX,
  Cloud,
  Smartphone,
  AlertTriangle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  days,
  getSession,
  getTalk,
  getDay,
  getPerson,
  formatTime,
  sessionStartDate,
  sessionEndDate,
} from "@/lib/agenda";
import type { Session, Talk } from "@/lib/agenda/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SessionCard } from "@/components/app/session-card";
import { TalkRow } from "@/components/app/talk-row";
import { SaveButton } from "@/components/app/save-button";
import { useSavedItems } from "@/components/app/use-saved-items";

const DEFAULT_DURATION_MS = 30 * 60 * 1000; // assume 30 min when no end time

type ResolvedItem =
  | { kind: "session"; id: string; dayId: string; session: Session; startMs: number; endMs: number }
  | { kind: "talk"; id: string; dayId: string; talk: Talk; session: Session; startMs: number; endMs: number };

/** Build an absolute instant for an "HH:mm" wall-clock on a session's day. */
function instantOnSessionDay(session: Session, hhmm: string): number {
  // Reuse sessionStartDate by cloning the session with the desired start; the
  // helper appends the fixed event offset for us.
  return sessionStartDate({ ...session, start: hhmm }).getTime();
}

function resolveSession(id: string): ResolvedItem | null {
  const session = getSession(id);
  if (!session) return null;
  const start = sessionStartDate(session).getTime();
  if (Number.isNaN(start)) return null;
  const endDate = sessionEndDate(session);
  const end =
    endDate && !Number.isNaN(endDate.getTime())
      ? endDate.getTime()
      : start + DEFAULT_DURATION_MS;
  return { kind: "session", id, dayId: session.dayId, session, startMs: start, endMs: end };
}

function resolveTalk(id: string): ResolvedItem | null {
  const talk = getTalk(id);
  if (!talk) return null;
  const session = getSession(talk.sessionId);
  if (!session) return null;
  const startHHmm = talk.start ?? session.start;
  const start = instantOnSessionDay(session, startHHmm);
  if (Number.isNaN(start)) return null;
  const end = talk.end
    ? instantOnSessionDay(session, talk.end)
    : start + DEFAULT_DURATION_MS;
  return {
    kind: "talk",
    id,
    dayId: session.dayId,
    talk,
    session,
    startMs: start,
    endMs: Number.isNaN(end) ? start + DEFAULT_DURATION_MS : end,
  };
}

/** Half-open interval overlap: [aStart,aEnd) intersects [bStart,bEnd). */
function overlaps(a: ResolvedItem, b: ResolvedItem): boolean {
  return a.startMs < b.endMs && b.startMs < a.endMs;
}

export function MyAgendaClient() {
  const { saved, ready, mode } = useSavedItems();

  // Resolve + group + sort + detect conflicts. Recomputed whenever the saved
  // set identity changes (the store hands us a fresh Set on every mutation).
  const { byDay, conflictIds, total } = useMemo(() => {
    const resolved: ResolvedItem[] = [];
    for (const id of saved) {
      const item = resolveSession(id) ?? resolveTalk(id);
      if (item) resolved.push(item);
    }

    // Group by dayId.
    const groups = new Map<string, ResolvedItem[]>();
    for (const item of resolved) {
      const arr = groups.get(item.dayId);
      if (arr) arr.push(item);
      else groups.set(item.dayId, [item]);
    }

    // Conflict detection within each day (pairwise; lists are short).
    const conflicts = new Set<string>();
    for (const items of groups.values()) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          if (overlaps(items[i], items[j])) {
            conflicts.add(items[i].id);
            conflicts.add(items[j].id);
          }
        }
      }
    }

    // Sort each day's items by start time, then emit days in program order.
    const ordered: { dayId: string; label: string; items: ResolvedItem[] }[] = [];
    for (const day of days) {
      const items = groups.get(day.id);
      if (!items || items.length === 0) continue;
      items.sort((a, b) => a.startMs - b.startMs);
      ordered.push({ dayId: day.id, label: getDay(day.id)?.label ?? day.label, items });
    }

    return { byDay: ordered, conflictIds: conflicts, total: resolved.length };
  }, [saved]);

  // ---- Loading -------------------------------------------------------------
  if (!ready) {
    return (
      <div className="space-y-4">
        <Header />
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-10 text-sm text-muted shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading your agenda…
        </div>
      </div>
    );
  }

  // ---- Empty ---------------------------------------------------------------
  if (total === 0) {
    return (
      <div className="space-y-4">
        <Header />
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
          <CalendarX className="h-8 w-8 text-muted" aria-hidden="true" />
          <div>
            <p className="font-medium text-secondary">No saved items yet</p>
            <p className="mt-1 text-sm text-muted">
              Tap the star on any session or talk to build your personal agenda.
            </p>
          </div>
          <Button asChild href="/app/schedule" variant="primary" size="md">
            Browse the schedule
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  // ---- Populated -----------------------------------------------------------
  return (
    <div className="space-y-5">
      <Header />

      {mode === "local" ? (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <Smartphone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="leading-snug">
            Saved on this device.{" "}
            <Link
              href="/auth/login?redirect=/app/my-agenda"
              className="font-medium underline underline-offset-2"
            >
              Sign in to sync across devices.
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-muted">
          <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
          Synced to your account
        </div>
      )}

      {byDay.map((group) => (
        <section key={group.dayId} className="space-y-2.5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {group.label}
          </h2>
          <ul className="space-y-2.5">
            {group.items.map((item) => {
              const conflict = conflictIds.has(item.id);
              const remove = (
                <SaveButton itemId={item.id} itemType={item.kind} size="sm" />
              );

              if (item.kind === "session") {
                return (
                  <li key={item.id} className="space-y-1">
                    <SessionCard
                      session={item.session}
                      timeLabel={
                        item.session.end
                          ? `${formatTime(item.session.start)}–${formatTime(item.session.end)}`
                          : formatTime(item.session.start)
                      }
                      href={`/app/sessions/${item.session.id}`}
                      action={remove}
                    />
                    {conflict && <ConflictBadge />}
                  </li>
                );
              }

              const speakers = item.talk.speakerIds
                .map((pid) => getPerson(pid))
                .filter((p): p is NonNullable<typeof p> => Boolean(p));

              return (
                <li key={item.id} className="space-y-1">
                  <TalkRow
                    talk={item.talk}
                    speakers={speakers}
                    href={`/app/talks/${item.talk.id}`}
                    action={remove}
                  />
                  {conflict && <ConflictBadge />}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1 className="text-2xl font-bold tracking-tight text-secondary">
        My Agenda
      </h1>
      <p className="mt-1 text-sm text-muted">
        Your saved sessions and talks for the meeting.
      </p>
    </header>
  );
}

function ConflictBadge() {
  return (
    <div className="pl-1">
      <Badge variant="warning" className="gap-1">
        <AlertTriangle className="h-3 w-3" aria-hidden="true" />
        Overlaps
      </Badge>
    </div>
  );
}
