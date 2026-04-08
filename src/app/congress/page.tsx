import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  title: "Annual Congress 2026",
  description:
    "Join the IAMA Annual Congress 2026 in Los Angeles. Three days of medical education, research presentations, and networking.",
};

const highlights = [
  {
    icon: Mic2,
    title: "50+ Speakers",
    description: "Leading experts across multiple specialties",
  },
  {
    icon: FileText,
    title: "200+ Abstracts",
    description: "Oral and poster presentations of latest research",
  },
  {
    icon: Users,
    title: "500+ Attendees",
    description: "Physicians, researchers, and medical professionals",
  },
  {
    icon: Clock,
    title: "20+ CME Credits",
    description: "Accredited continuing medical education hours",
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
                October 16-18, 2026
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                IAMA Annual{" "}
                <span className="text-primary-light">Congress 2026</span>
              </h1>
              <p className="mt-6 text-lg text-primary-100 leading-relaxed max-w-2xl">
                Join over 500 physicians, researchers, and medical professionals
                for three transformative days of cutting-edge education,
                groundbreaking research, and meaningful connections.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  October 16-18, 2026
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Beverly Hilton, Los Angeles, CA
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
                    The IAMA Annual Congress is the premier gathering of Iranian
                    American medical professionals. Now in its 26th year, the
                    Congress brings together physicians, researchers, and
                    healthcare leaders for a transformative experience.
                  </p>
                  <p>
                    This year&apos;s theme, &quot;Bridging Innovation and
                    Tradition in Medicine,&quot; reflects our commitment to
                    advancing healthcare through cutting-edge research while
                    honoring our rich cultural heritage in the healing arts.
                  </p>
                  <p>
                    The three-day program features keynote addresses, panel
                    discussions, abstract presentations, hands-on workshops, and
                    ample networking opportunities in a world-class setting.
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
                          date: "June 1, 2026",
                          label: "Abstract Submission Deadline",
                        },
                        {
                          date: "July 15, 2026",
                          label: "Early Bird Registration Ends",
                        },
                        {
                          date: "September 1, 2026",
                          label: "Regular Registration Ends",
                        },
                        {
                          date: "October 16, 2026",
                          label: "Congress Opening Ceremony",
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
                      The Beverly Hilton
                      <br />
                      9876 Wilshire Boulevard
                      <br />
                      Beverly Hills, CA 90210
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      Special hotel rates available for IAMA Congress attendees.
                      Details will be provided upon registration.
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
