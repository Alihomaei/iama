import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Sparkles, Users } from "lucide-react";

import {
  formatTime,
  getDay,
  getPerson,
  getSession,
  getTalksForSession,
  sessions,
} from "@/lib/agenda";
import type { Person } from "@/lib/agenda/types";
import { PersonAvatar } from "@/components/app/person-avatar";
import { TalkRow } from "@/components/app/talk-row";
import { TrackChip } from "@/components/app/track-chip";
import { SaveButton } from "@/components/app/save-button";

export function generateStaticParams() {
  return sessions.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = getSession(id);
  if (!s) return { title: "Session" };
  return { title: s.title };
}

/** A clickable avatar + name chip linking to a person's profile. */
function PersonPill({ person }: { person: Person }) {
  return (
    <Link
      href={`/app/people/${person.id}`}
      className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <PersonAvatar name={person.name} photoUrl={person.photoUrl} size="sm" />
      <span className="text-sm font-medium leading-tight text-secondary">
        {person.name}
      </span>
    </Link>
  );
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = getSession(id);
  if (!s) notFound();

  const day = getDay(s.dayId);
  const talks = getTalksForSession(s.id);

  const moderators = (s.moderatorIds ?? [])
    .map(getPerson)
    .filter((p): p is Person => Boolean(p));
  const panelists = (s.panelistIds ?? [])
    .map(getPerson)
    .filter((p): p is Person => Boolean(p));

  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <TrackChip track={s.track ?? "general"} />
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-secondary">
              {s.title}
            </h1>
          </div>
          <div className="shrink-0">
            <SaveButton itemId={s.id} itemType="session" size="md" />
          </div>
        </div>

        <dl className="space-y-1.5 text-sm text-muted">
          {day && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="font-medium text-secondary">{day.label}</dt>
              <dd className="tabular-nums">
                {formatTime(s.start)}
                {s.end ? `–${formatTime(s.end)}` : ""}
              </dd>
            </div>
          )}
          {s.room && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{s.room}</span>
            </div>
          )}
          {s.sponsor && (
            <div className="flex items-center gap-1.5 text-secondary">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Sponsored by{" "}
                <span className="font-semibold">{s.sponsor}</span>
              </span>
            </div>
          )}
        </dl>
      </header>

      {/* Description */}
      {s.description && (
        <p className="text-pretty leading-relaxed text-foreground">
          {s.description}
        </p>
      )}

      {/* Moderators */}
      {moderators.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {moderators.length > 1 ? "Moderators" : "Moderator"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {moderators.map((p) => (
              <PersonPill key={p.id} person={p} />
            ))}
          </div>
        </section>
      )}

      {/* Panel */}
      {panelists.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
            Panel
          </h2>
          <div className="flex flex-wrap gap-2">
            {panelists.map((p) => (
              <PersonPill key={p.id} person={p} />
            ))}
          </div>
        </section>
      )}

      {/* Program */}
      {talks.length > 0 ? (
        <section className="space-y-2.5">
          <h2 className="flex items-baseline gap-2 text-sm font-semibold text-secondary">
            Program
            <span className="text-xs font-normal text-muted">
              {talks.length} {talks.length === 1 ? "talk" : "talks"}
            </span>
          </h2>
          <div className="space-y-2">
            {talks.map((t) => (
              <TalkRow
                key={t.id}
                talk={t}
                speakers={t.speakerIds
                  .map(getPerson)
                  .filter((p): p is Person => Boolean(p))}
                href={`/app/talks/${t.id}`}
                action={
                  <SaveButton itemId={t.id} itemType="talk" size="sm" />
                }
              />
            ))}
          </div>
        </section>
      ) : (
        !s.description && (
          <p className="rounded-lg border border-dashed border-border bg-card px-4 py-6 text-center text-sm text-muted">
            No individual talks are listed for this session.
          </p>
        )
      )}
    </article>
  );
}
