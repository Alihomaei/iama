import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TrackChip } from "@/components/app/track-chip";
import { Clock, MapPin, Users, ArrowRight, Smartphone } from "lucide-react";
import {
  getDays,
  getSessionsByDay,
  getTalksForSession,
  getPerson,
  formatTime,
} from "@/lib/agenda";
import type { TrackId } from "@/lib/agenda/types";

export const metadata: Metadata = {
  title: "Annual Meeting Schedule",
  description:
    "The full program for the IAMA 30th Annual Meeting — Kimpton Hotel Monaco, Washington, D.C., May 22–25, 2026. Panels, keynotes, and presentations by day.",
};

function people(ids: string[] | undefined): string {
  if (!ids?.length) return "";
  return ids
    .map((id) => getPerson(id)?.name)
    .filter(Boolean)
    .join(", ");
}

export default function CongressSchedulePage() {
  const days = getDays();
  // Unique tracks present, in first-seen order, for the legend.
  const seen = new Set<TrackId>();
  for (const day of days) {
    for (const s of getSessionsByDay(day.id)) {
      if (s.track) seen.add(s.track);
    }
  }
  const legendTracks = [...seen];

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Annual Meeting Schedule"
          subtitle="The full program for the 30th IAMA Annual Meeting — Kimpton Hotel Monaco, Washington, D.C., May 22–25, 2026."
          breadcrumbs={[
            { label: "Congress", href: "/congress" },
            { label: "Schedule" },
          ]}
        />

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            {/* Open-the-app banner */}
            <Link
              href="/app/schedule"
              className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-primary-100 bg-primary-50 p-4 transition-colors hover:bg-primary-100"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                  <Smartphone className="h-5 w-5" />
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-secondary">
                    Open the interactive Meeting App
                  </span>
                  <span className="text-muted">
                    Save sessions, see what&apos;s on now, and add it to your
                    home screen.
                  </span>
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary sm:flex">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Track legend */}
            <div className="mb-8 flex flex-wrap gap-2">
              {legendTracks.map((track) => (
                <TrackChip key={track} track={track} />
              ))}
            </div>

            <Tabs defaultValue={days[0].id}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {days.map((day) => (
                  <TabsTrigger key={day.id} value={day.id}>
                    {day.weekday} · {day.label.split(", ")[1]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {days.map((day) => {
                const sessions = getSessionsByDay(day.id);
                return (
                  <TabsContent key={day.id} value={day.id}>
                    {sessions.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted">
                        No sessions listed for this day.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {sessions.map((session) => {
                          const talks = getTalksForSession(session.id);
                          const moderators = people(session.moderatorIds);
                          const panel = people(session.panelistIds);
                          return (
                            <Card key={session.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row">
                                  {/* Time column */}
                                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:justify-center">
                                    <Clock className="h-4 w-4 text-muted sm:hidden" />
                                    <span className="text-sm font-medium text-secondary">
                                      {formatTime(session.start)}
                                      {session.end
                                        ? ` – ${formatTime(session.end)}`
                                        : ""}
                                    </span>
                                  </div>

                                  {/* Details */}
                                  <div className="flex-1 p-4">
                                    <div className="mb-1 flex flex-wrap items-start gap-2">
                                      <Link
                                        href={`/app/sessions/${session.id}`}
                                        className="font-semibold text-secondary hover:text-primary"
                                      >
                                        {session.title}
                                      </Link>
                                      {session.track && (
                                        <TrackChip track={session.track} />
                                      )}
                                    </div>

                                    {moderators && (
                                      <p className="text-sm text-muted">
                                        <span className="font-medium text-secondary">
                                          Moderators:
                                        </span>{" "}
                                        {moderators}
                                      </p>
                                    )}
                                    {panel && (
                                      <p className="text-sm text-muted">
                                        <span className="font-medium text-secondary">
                                          Panel:
                                        </span>{" "}
                                        {panel}
                                      </p>
                                    )}
                                    {session.sponsor && (
                                      <p className="text-sm text-muted">
                                        Sponsored by {session.sponsor}
                                      </p>
                                    )}

                                    {/* Nested talks */}
                                    {talks.length > 0 && (
                                      <ul className="mt-3 space-y-2 border-l-2 border-primary-100 pl-3">
                                        {talks.map((talk) => (
                                          <li key={talk.id} className="text-sm">
                                            <Link
                                              href={`/app/talks/${talk.id}`}
                                              className="font-medium text-secondary hover:text-primary"
                                            >
                                              {talk.title}
                                            </Link>
                                            <span className="block text-xs text-muted">
                                              {talk.start
                                                ? `${formatTime(talk.start)} · `
                                                : ""}
                                              {people(talk.speakerIds)}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}

                                    {session.room && (
                                      <div className="mt-3 flex items-center gap-1 text-xs text-muted">
                                        <MapPin className="h-3 w-3" />
                                        {session.room}
                                      </div>
                                    )}
                                    {!moderators &&
                                      !panel &&
                                      talks.length === 0 &&
                                      session.description && (
                                        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                                          <Users className="h-3 w-3" />
                                          {session.description}
                                        </p>
                                      )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
