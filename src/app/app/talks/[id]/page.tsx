import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";

import {
  formatTime,
  getDay,
  getPerson,
  getSession,
  getTalk,
  talks,
} from "@/lib/agenda";
import type { Person, TalkRole } from "@/lib/agenda/types";
import { PersonAvatar } from "@/components/app/person-avatar";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/app/save-button";

export function generateStaticParams() {
  return talks.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const t = getTalk(id);
  if (!t) return { title: "Talk" };
  return { title: t.title };
}

function RoleBadge({ role }: { role: TalkRole }) {
  switch (role) {
    case "keynote":
      return <Badge variant="warning">Keynote</Badge>;
    case "poster":
      return <Badge variant="outline">Poster Presentation</Badge>;
    case "oral":
      return <Badge variant="default">Oral Presentation</Badge>;
    default:
      return <Badge variant="default">Presentation</Badge>;
  }
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTalk(id);
  if (!t) notFound();

  const s = getSession(t.sessionId);
  const day = s ? getDay(s.dayId) : undefined;
  const time = t.start ?? s?.start;

  const speakers = t.speakerIds
    .map(getPerson)
    .filter((p): p is Person => Boolean(p));

  return (
    <article className="space-y-6">
      {/* Back link to parent session */}
      {s && (
        <Link
          href={`/app/sessions/${s.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Part of {s.title}</span>
        </Link>
      )}

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-secondary">
            {t.title}
          </h1>
          <div className="shrink-0">
            <SaveButton itemId={t.id} itemType="talk" size="md" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <RoleBadge role={t.role} />
        </div>

        <dl className="space-y-1.5 text-sm text-muted">
          {(day || time) && (
            <div className="flex flex-wrap items-baseline gap-x-2">
              {day && <dt className="font-medium text-secondary">{day.label}</dt>}
              {time && <dd className="tabular-nums">{formatTime(time)}</dd>}
            </div>
          )}
          {s?.room && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{s.room}</span>
            </div>
          )}
        </dl>
      </header>

      {/* Speakers */}
      {speakers.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
            {speakers.length > 1 ? "Speakers" : "Speaker"}
          </h2>
          <ul className="space-y-2">
            {speakers.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/app/people/${p.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <PersonAvatar name={p.name} photoUrl={p.photoUrl} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight text-secondary">
                      {p.name}
                      {p.credentials && (
                        <span className="font-normal text-muted">
                          {", "}
                          {p.credentials}
                        </span>
                      )}
                    </p>
                    {p.role && (
                      <p className="mt-0.5 truncate text-sm text-muted">
                        {p.role}
                      </p>
                    )}
                    {p.affiliation && (
                      <p className="truncate text-sm text-muted">
                        {p.affiliation}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Abstract */}
      {t.abstract && (
        <section className="space-y-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
            Abstract
          </h2>
          <p className="text-pretty leading-relaxed text-foreground">
            {t.abstract}
          </p>
        </section>
      )}

      {/* Footer: back to full session */}
      {s && (
        <footer className="border-t border-border pt-4">
          <Link
            href={`/app/sessions/${s.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View full session
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </footer>
      )}
    </article>
  );
}
