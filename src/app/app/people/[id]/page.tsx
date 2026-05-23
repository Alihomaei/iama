import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin } from "lucide-react";

import {
  formatTime,
  getDay,
  getPerson,
  getSession,
  getSessionsForPerson,
  getTalksForPerson,
  people,
} from "@/lib/agenda";
import type { PersonSessionRole } from "@/lib/agenda";
import { PersonAvatar } from "@/components/app/person-avatar";
import { TalkRow } from "@/components/app/talk-row";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getPerson(id);
  if (!p) return { title: "Speaker" };
  return { title: p.name };
}

const roleLabels: Record<PersonSessionRole, string> = {
  moderator: "Moderator",
  panelist: "Panelist",
  speaker: "Speaker",
};

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getPerson(id);
  if (!p) notFound();

  const sessionRoles = getSessionsForPerson(p.id);
  const personTalks = getTalksForPerson(p.id);

  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-start gap-4">
          <PersonAvatar name={p.name} photoUrl={p.photoUrl} size="lg" />
          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-secondary">
              {p.name}
              {p.credentials && (
                <span className="text-lg font-normal text-muted">
                  {", "}
                  {p.credentials}
                </span>
              )}
            </h1>
            {p.role && <p className="text-sm text-secondary">{p.role}</p>}
            {p.affiliation && (
              <p className="text-sm text-muted">{p.affiliation}</p>
            )}
            {p.location && (
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {p.location}
              </p>
            )}
          </div>
        </div>

        {p.bio && (
          <p className="text-pretty leading-relaxed text-foreground">{p.bio}</p>
        )}
      </header>

      {/* Sessions */}
      {sessionRoles.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="text-sm font-semibold text-secondary">Sessions</h2>
          <ul className="space-y-2">
            {sessionRoles.map(({ session, roles }) => {
              const day = getDay(session.dayId);
              return (
                <li key={session.id}>
                  <Link
                    href={`/app/sessions/${session.id}`}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <h3 className="font-semibold leading-snug text-secondary">
                        {session.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {day ? `${day.label} · ` : ""}
                        <span className="tabular-nums">
                          {formatTime(session.start)}
                          {session.end ? `–${formatTime(session.end)}` : ""}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {roles.map((r) => (
                          <Badge
                            key={r}
                            variant={r === "speaker" ? "default" : "outline"}
                          >
                            {roleLabels[r]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Talks */}
      {personTalks.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="flex items-baseline gap-2 text-sm font-semibold text-secondary">
            Talks
            <span className="text-xs font-normal text-muted">
              {personTalks.length}
            </span>
          </h2>
          <div className="space-y-2">
            {personTalks.map((t) => {
              const session = getSession(t.sessionId);
              return (
                <div key={t.id} className="space-y-1">
                  <TalkRow talk={t} speakers={[p]} href={`/app/talks/${t.id}`} />
                  {session && (
                    <p className="pl-3 text-xs text-muted">
                      in {session.title}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Fallback (shouldn't happen for people on the program) */}
      {sessionRoles.length === 0 && personTalks.length === 0 && (
        <p className="rounded-lg border border-dashed border-border bg-card px-4 py-6 text-center text-sm text-muted">
          No scheduled sessions or talks are listed for {p.name}.
        </p>
      )}
    </article>
  );
}
