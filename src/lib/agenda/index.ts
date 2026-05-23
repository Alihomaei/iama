// Pure, side-effect-free selectors over the agenda data.
//
// Everything here is deterministic and isomorphic (no Node-only APIs, no
// framework imports) so it can run unchanged in a Server Component, a Client
// Component, or a build script. Times are local wall-clock "HH:mm" on a day;
// absolute instants are built by appending EVENT.utcOffset (-04:00 / EDT).

import { EVENT, days, people, sessions, talks } from "./data";
import type {
  Day,
  NowNext,
  Person,
  Session,
  Talk,
  TrackId,
} from "./types";

export { EVENT, days, people, sessions, talks };

// ---- internal lookup maps (built once on module load) ----

const dayById = new Map<string, Day>(days.map((d) => [d.id, d]));
const sessionById = new Map<string, Session>(sessions.map((s) => [s.id, s]));
const talkById = new Map<string, Talk>(talks.map((t) => [t.id, t]));
const personById = new Map<string, Person>(people.map((p) => [p.id, p]));

/** Index of dayId -> chronological position, for stable cross-day sorting. */
const dayOrder = new Map<string, number>(days.map((d, i) => [d.id, i]));

/** Compare two "HH:mm" strings; lexicographic order matches chronological. */
function compareTime(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

// ---- days ----

export function getDays(): Day[] {
  return [...days].sort(
    (a, b) => (dayOrder.get(a.id) ?? 0) - (dayOrder.get(b.id) ?? 0),
  );
}

export function getDay(id: string): Day | undefined {
  return dayById.get(id);
}

// ---- sessions ----

export function getSessionsByDay(dayId: string): Session[] {
  return sessions
    .filter((s) => s.dayId === dayId)
    .sort((a, b) => compareTime(a.start, b.start));
}

export function getSession(id: string): Session | undefined {
  return sessionById.get(id);
}

// ---- talks ----

export function getTalk(id: string): Talk | undefined {
  return talkById.get(id);
}

export function getTalksForSession(sessionId: string): Talk[] {
  return talks
    .filter((t) => t.sessionId === sessionId)
    .sort((a, b) => compareTime(a.start ?? "", b.start ?? ""));
}

// ---- people ----

export function getPerson(id: string): Person | undefined {
  return personById.get(id);
}

/** Sort key: last name, then full name. ASCII names, simple split is fine. */
function personSortKey(p: Person): string {
  const parts = p.name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return `${last} ${p.name}`.toLowerCase();
}

export function getPeople(): Person[] {
  return [...people].sort((a, b) =>
    personSortKey(a).localeCompare(personSortKey(b)),
  );
}

export function getTalksForPerson(personId: string): Talk[] {
  return talks
    .filter((t) => t.speakerIds.includes(personId))
    .sort((a, b) => {
      const sa = sessionById.get(a.sessionId);
      const sb = sessionById.get(b.sessionId);
      const da = sa ? (dayOrder.get(sa.dayId) ?? 0) : 0;
      const db = sb ? (dayOrder.get(sb.dayId) ?? 0) : 0;
      if (da !== db) return da - db;
      return compareTime(a.start ?? "", b.start ?? "");
    });
}

export type PersonSessionRole = "moderator" | "panelist" | "speaker";

export function getSessionsForPerson(
  personId: string,
): { session: Session; roles: PersonSessionRole[] }[] {
  const rolesBySession = new Map<string, Set<PersonSessionRole>>();

  const add = (sessionId: string, role: PersonSessionRole) => {
    let set = rolesBySession.get(sessionId);
    if (!set) {
      set = new Set<PersonSessionRole>();
      rolesBySession.set(sessionId, set);
    }
    set.add(role);
  };

  for (const s of sessions) {
    if (s.moderatorIds?.includes(personId)) add(s.id, "moderator");
    if (s.panelistIds?.includes(personId)) add(s.id, "panelist");
  }
  for (const t of talks) {
    if (t.speakerIds.includes(personId)) add(t.sessionId, "speaker");
  }

  const result: { session: Session; roles: PersonSessionRole[] }[] = [];
  for (const [sessionId, roleSet] of rolesBySession) {
    const session = sessionById.get(sessionId);
    if (!session) continue;
    // Stable role ordering for display.
    const order: PersonSessionRole[] = ["moderator", "panelist", "speaker"];
    const roles = order.filter((r) => roleSet.has(r));
    result.push({ session, roles });
  }

  return result.sort((a, b) => {
    const da = dayOrder.get(a.session.dayId) ?? 0;
    const db = dayOrder.get(b.session.dayId) ?? 0;
    if (da !== db) return da - db;
    return compareTime(a.session.start, b.session.start);
  });
}

/** Every person who appears on the program in any role (moderator/panelist/speaker). */
export function getSpeakers(): Person[] {
  const ids = new Set<string>();
  for (const s of sessions) {
    s.moderatorIds?.forEach((id) => ids.add(id));
    s.panelistIds?.forEach((id) => ids.add(id));
  }
  for (const t of talks) {
    t.speakerIds.forEach((id) => ids.add(id));
  }
  return people
    .filter((p) => ids.has(p.id))
    .sort((a, b) => personSortKey(a).localeCompare(personSortKey(b)));
}

// ---- search ----

export function searchAgenda(q: string): {
  sessions: Session[];
  talks: Talk[];
  people: Person[];
} {
  const needle = q.trim().toLowerCase();
  if (!needle) return { sessions: [], talks: [], people: [] };

  const matchedSessions = sessions.filter((s) => {
    const hay = [s.title, s.description, s.room, s.sponsor]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });

  const matchedTalks = talks.filter((t) => {
    const hay = [t.title, t.abstract].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(needle);
  });

  const matchedPeople = people.filter((p) => {
    const hay = [p.name, p.credentials, p.role, p.affiliation, p.location, p.bio]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });

  return {
    sessions: matchedSessions,
    talks: matchedTalks,
    people: matchedPeople,
  };
}

// ---- time helpers ----

/** Parse "HH:mm" into [hours, minutes]; returns null when malformed. */
function parseHHmm(hhmm: string): [number, number] | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return [h, min];
}

/**
 * Build an absolute Date for a wall-clock "HH:mm" on the session's day by
 * appending the fixed event UTC offset. Returns an Invalid Date only if the
 * day/time are unparseable (which validateAgenda would have flagged).
 */
function instantFor(dayId: string, hhmm: string): Date {
  const day = dayById.get(dayId);
  const parts = parseHHmm(hhmm);
  if (!day || !parts) return new Date(NaN);
  const [h, min] = parts;
  const hh = String(h).padStart(2, "0");
  const mm = String(min).padStart(2, "0");
  // ISO 8601 with explicit offset -> unambiguous absolute instant.
  return new Date(`${day.date}T${hh}:${mm}:00${EVENT.utcOffset}`);
}

export function sessionStartDate(session: Session): Date {
  return instantFor(session.dayId, session.start);
}

export function sessionEndDate(session: Session): Date | null {
  if (!session.end) return null;
  return instantFor(session.dayId, session.end);
}

/** "14:05" -> "2:05 PM". Falls back to the input if it can't be parsed. */
export function formatTime(hhmm: string): string {
  const parts = parseHHmm(hhmm);
  if (!parts) return hhmm;
  const [h, min] = parts;
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${period}`;
}

// ---- now / next ----

export function getNowAndNext(now: Date): NowNext {
  const nowMs = now.getTime();

  const inProgress: { session: Session; startMs: number }[] = [];
  const upcoming: { session: Session; startMs: number }[] = [];

  for (const s of sessions) {
    const startMs = sessionStartDate(s).getTime();
    if (Number.isNaN(startMs)) continue;
    const endDate = sessionEndDate(s);
    const endMs = endDate ? endDate.getTime() : null;

    if (startMs <= nowMs && endMs !== null && nowMs < endMs) {
      inProgress.push({ session: s, startMs });
    } else if (startMs > nowMs) {
      upcoming.push({ session: s, startMs });
    }
  }

  inProgress.sort((a, b) => a.startMs - b.startMs);
  upcoming.sort((a, b) => a.startMs - b.startMs);

  return {
    now: inProgress.map((x) => x.session),
    next: upcoming.length > 0 ? upcoming[0].session : null,
  };
}

// ---- track labels ----

const TRACK_LABELS: Record<TrackId, string> = {
  surgery: "Surgery",
  cardiovascular: "Cardiovascular",
  medicine: "Medicine",
  neurotech: "Neurotech",
  neuroscience: "Neuroscience",
  dermatology: "Dermatology",
  keynote: "Keynote",
  medtech: "Med/Tech",
  pitch: "Pitch",
  poster: "Poster",
  social: "Social",
  break: "Break",
  business: "Business",
  wellness: "Wellness",
  general: "General",
};

export function getTrackLabel(track: TrackId): string {
  return TRACK_LABELS[track] ?? track;
}

// ---- dev validation ----

/**
 * Returns a list of dangling-reference errors across the data set. An empty
 * array means full referential integrity. Intended for tests / dev assertions.
 */
export function validateAgenda(): string[] {
  const errors: string[] = [];

  const personIds = new Set(people.map((p) => p.id));
  const sessionIds = new Set(sessions.map((s) => s.id));
  const talkIds = new Set(talks.map((t) => t.id));
  const dayIds = new Set(days.map((d) => d.id));

  // Duplicate id detection.
  const seenPersonIds = new Set<string>();
  for (const p of people) {
    if (seenPersonIds.has(p.id)) errors.push(`duplicate person id: ${p.id}`);
    seenPersonIds.add(p.id);
  }
  const seenSessionIds = new Set<string>();
  for (const s of sessions) {
    if (seenSessionIds.has(s.id)) errors.push(`duplicate session id: ${s.id}`);
    seenSessionIds.add(s.id);
  }
  const seenTalkIds = new Set<string>();
  for (const t of talks) {
    if (seenTalkIds.has(t.id)) errors.push(`duplicate talk id: ${t.id}`);
    seenTalkIds.add(t.id);
  }

  // Session references.
  for (const s of sessions) {
    if (!dayIds.has(s.dayId)) {
      errors.push(`session ${s.id} -> missing day ${s.dayId}`);
    }
    for (const mid of s.moderatorIds ?? []) {
      if (!personIds.has(mid)) {
        errors.push(`session ${s.id}.moderatorIds -> missing person ${mid}`);
      }
    }
    for (const pid of s.panelistIds ?? []) {
      if (!personIds.has(pid)) {
        errors.push(`session ${s.id}.panelistIds -> missing person ${pid}`);
      }
    }
    for (const tid of s.talkIds ?? []) {
      if (!talkIds.has(tid)) {
        errors.push(`session ${s.id}.talkIds -> missing talk ${tid}`);
      } else {
        // The referenced talk should point back to this session.
        const t = talkById.get(tid);
        if (t && t.sessionId !== s.id) {
          errors.push(
            `session ${s.id}.talkIds -> talk ${tid} belongs to ${t.sessionId}`,
          );
        }
      }
    }
  }

  // Talk references.
  for (const t of talks) {
    if (!sessionIds.has(t.sessionId)) {
      errors.push(`talk ${t.id} -> missing session ${t.sessionId}`);
    }
    if (t.speakerIds.length === 0) {
      errors.push(`talk ${t.id} has no speakers`);
    }
    for (const sid of t.speakerIds) {
      if (!personIds.has(sid)) {
        errors.push(`talk ${t.id}.speakerIds -> missing person ${sid}`);
      }
    }
  }

  return errors;
}
