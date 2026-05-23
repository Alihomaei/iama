import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MeetingAppCta } from "@/components/sections/meeting-app-cta";
import {
  Calendar,
  MapPin,
  Users,
  Mic2,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "30th Annual Meeting 2026",
  description:
    "Join the IAMA 30th Annual Meeting at the Kimpton Hotel Monaco in Washington, D.C., May 23–25, 2026. CME sessions, research presentations, and the Gala Dinner.",
};

const highlights = [
  {
    icon: Mic2,
    title: "Scientific Program",
    description: "Keynotes and panels with leaders across specialties",
  },
  {
    icon: FileText,
    title: "Abstract Presentations",
    description: "Oral and poster research; travel grants for juniors",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Physicians, residents, students, and researchers",
  },
  {
    icon: Clock,
    title: "AMA-CME Credits",
    description: "Accredited continuing medical education",
  },
];

export default function CongressPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-secondary text-white">
          <div className="absolute inset-0 opacity-[0.07]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                backgroundSize: "50px 50px, 30px 30px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <span className="mb-4 inline-flex items-center rounded-full bg-accent/20 px-4 py-1 text-sm font-medium text-accent">
                May 23–25, 2026
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                IAMA 30th{" "}
                <span className="text-primary-light">Annual Meeting</span>
              </h1>
              <p className="mt-6 text-lg text-primary-100 leading-relaxed max-w-2xl">
                Thirty years of IAMA. Join physicians, researchers, residents,
                and students in Washington, D.C. for three days of education,
                scientific presentations, and connection.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  May 23–25, 2026
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Kimpton Hotel Monaco, Washington, D.C.
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild href="/congress/register" size="lg" className="bg-white text-primary-800 hover:bg-primary-50">
                  Register Now
                </Button>
                <Button
                  asChild
                  href="/abstracts/submit"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Submit Abstract
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center">
                  <CardContent className="p-5">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-secondary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <MeetingAppCta className="pt-16" />

        {/* Event Details */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-secondary">
                  About the Congress
                </h2>
                <div className="mt-6 space-y-4 text-muted leading-relaxed">
                  <p>
                    The IAMA Annual Meeting is the premier gathering of Iranian
                    American medical professionals. Now in its 30th year, the
                    meeting brings together physicians, researchers, residents,
                    and students from across the country.
                  </p>
                  <p>
                    This year the meeting is held at the Kimpton Hotel Monaco in
                    Washington, D.C., May 23–25, 2026, with the Gala Dinner on
                    Sunday, May 24 from 7–11 PM (a separate ticket is required).
                  </p>
                  <p>
                    The program features keynote addresses, scientific sessions,
                    abstract presentations, and ample networking — with AMA-CME
                    credits and travel grants for junior members presenting
                    research.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary">
                      Important Dates
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {[
                        {
                          date: "March 1, 2026",
                          label: "Abstract Submission Deadline",
                        },
                        {
                          date: "May 23, 2026",
                          label: "Annual Meeting Opens",
                        },
                        {
                          date: "May 24, 2026",
                          label: "Gala Dinner (7–11 PM)",
                        },
                        {
                          date: "May 25, 2026",
                          label: "Annual Meeting Closes",
                        },
                      ].map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start justify-between gap-4"
                        >
                          <span className="text-sm text-muted">
                            {item.label}
                          </span>
                          <span className="text-sm font-medium text-secondary whitespace-nowrap">
                            {item.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary">Venue</h3>
                    <p className="mt-2 text-sm text-muted">
                      Kimpton Hotel Monaco
                      <br />
                      700 F Street NW
                      <br />
                      Washington, D.C. 20004
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      A discounted room rate is available for IAMA Annual Meeting
                      attendees. Make your reservation at the Kimpton Hotel Monaco.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold text-secondary">
              Congress Resources
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Registration",
                  description:
                    "Register for the congress with member or non-member pricing.",
                  href: "/congress/register",
                },
                {
                  title: "Schedule",
                  description:
                    "View the full 3-day program with sessions by track.",
                  href: "/congress/schedule",
                },
                {
                  title: "Speakers",
                  description:
                    "Meet our keynote speakers and session moderators.",
                  href: "/congress/speakers",
                },
                {
                  title: "Abstract Submission",
                  description:
                    "Submit your research for oral or poster presentation.",
                  href: "/abstracts/submit",
                },
              ].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{link.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
