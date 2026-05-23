// Content model for the IAMA Meeting App (30th Annual Meeting).
//
// Three addressable tiers so a *session* and an individual *talk* can each have
// their own page, and every *person* (oral/poster presenter, moderator,
// panelist) has a profile. All IDs are stable kebab-case slugs and double as the
// keys used by the personal-agenda "save" feature, so DO NOT rename an ID once
// it ships — add new ones instead.
//
// Times are local wall-clock "HH:mm" (24h) on the session's `dayId`. The venue
// is in Washington D.C.; late-May is EDT (UTC−4). Selectors in `index.ts` turn
// these into absolute instants by appending the `-04:00` offset, so "Now / Next"
// is correct regardless of the device's time zone.

/** A person who appears on the program in any role. */
export type Person = {
  /** Stable slug, e.g. "roxana-mehran". */
  id: string;
  /** Full name without trailing credentials, e.g. "Roxana Mehran". */
  name: string;
  /** Post-nominals, e.g. "MD, FACC, FACP, FCCP, FESC". */
  credentials?: string;
  /** Position/title, e.g. "Professor of Medicine; Director of ...". */
  role?: string;
  /** Institution / company, e.g. "Mount Sinai". */
  affiliation?: string;
  /** City/state, e.g. "New York, NY". */
  location?: string;
  bio?: string;
  /** Optional headshot in /public; falls back to initials avatar when absent. */
  photoUrl?: string;
};

/** How a person relates to a single talk. */
export type TalkRole = "keynote" | "oral" | "poster" | "presenter";

/**
 * An individual presentation that lives inside a Session. Keynotes are modeled
 * as talks (role "keynote") within their parent panel so the panel lists them
 * and the keynote still has its own detail page.
 */
export type Talk = {
  /** Stable slug, e.g. "prevention-strategies-womens-cardiac-health". */
  id: string;
  /** The Session this talk belongs to. */
  sessionId: string;
  title: string;
  /** "HH:mm" on the parent session's day. Optional for untimed items. */
  start?: string;
  end?: string;
  /** One or more Person IDs. */
  speakerIds: string[];
  role: TalkRole;
  abstract?: string;
};

/** Top-level kind of an agenda block. Drives the icon + how it renders. */
export type SessionType =
  | "panel" // a panel that contains talks
  | "keynote" // a standalone keynote (most keynotes are talks inside a panel)
  | "workshop"
  | "pitch" // Shark-Tank–style
  | "poster"
  | "break"
  | "meal"
  | "social" // reception / gala
  | "business" // membership / board meetings
  | "wellness" // pilates etc.
  | "tour"
  | "registration"; // check-in / breakfast

/** Program track — used for color-coding and filtering. */
export type TrackId =
  | "surgery"
  | "cardiovascular"
  | "medicine"
  | "neurotech"
  | "neuroscience"
  | "dermatology"
  | "keynote"
  | "medtech"
  | "pitch"
  | "poster"
  | "social"
  | "break"
  | "business"
  | "wellness"
  | "general"; // catch-all (registration, tours, opening/welcome)

/** A scheduled block on a given day. */
export type Session = {
  /** Stable slug, e.g. "cardiovascular-panel". */
  id: string;
  /** Day this session occurs on (Day.id). */
  dayId: string;
  type: SessionType;
  track?: TrackId;
  title: string;
  /** "HH:mm" 24h on `dayId`. */
  start: string;
  /** "HH:mm" 24h. Strongly preferred so Now/Next can compute duration. */
  end?: string;
  /** Room, e.g. "Paris Ballroom". */
  room?: string;
  moderatorIds?: string[];
  /** Judges / discussants who are not giving a titled talk (e.g. Shark-Tank). */
  panelistIds?: string[];
  /** Ordered talk IDs contained in this session. */
  talkIds?: string[];
  description?: string;
  /** e.g. "AMGEN" for a sponsored block. */
  sponsor?: string;
};

/** A conference day. */
export type Day = {
  /** Stable slug, e.g. "sat-may-23". */
  id: string;
  /** ISO date "2026-05-23". */
  date: string;
  /** "Saturday". */
  weekday: string;
  /** "Saturday, May 23". */
  label: string;
};

/** Top-level event metadata. */
export type EventInfo = {
  name: string;
  shortName: string;
  venue: string;
  city: string;
  /** IANA tz; used to document the fixed -04:00 offset assumption. */
  timeZone: string;
  /** Fixed UTC offset string applied to wall-clock times, e.g. "-04:00". */
  utcOffset: string;
  startDate: string;
  endDate: string;
};

/** Result of the "what's on now / coming up" selector. */
export type NowNext = {
  /** Sessions currently in progress (start ≤ now < end). */
  now: Session[];
  /** The next session to start after `now`, if any. */
  next: Session | null;
};

/** An item the user can save to their personal agenda. */
export type SavedItemType = "session" | "talk";
