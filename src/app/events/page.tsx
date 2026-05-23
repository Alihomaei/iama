import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Star,
  Users,
  Stethoscope,
  BookOpen,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Events | IAMA",
  description:
    "Explore upcoming IAMA events including the Annual Meeting, regional symposia, webinars, and community gatherings.",
};

const upcomingEvents = [
  {
    id: "annual-meeting",
    title: "IAMA Annual Meeting 2026",
    date: "September 18–20, 2026",
    location: "Marriott Marquis, Washington, D.C.",
    description:
      "The flagship event of the Iranian American Medical Association — three days of CME sessions, keynote lectures, specialty breakouts, the Annual Gala, and the student/resident poster competition.",
    category: "Annual Meeting",
    featured: true,
    href: "/events/annual-meeting",
    icon: Star,
  },
  {
    id: "mid-year-webinar",
    title: "Mid-Year Clinical Update Webinar",
    date: "May 7, 2026",
    location: "Virtual (Zoom)",
    description:
      "A half-day virtual CME event covering evidence-based updates in internal medicine, cardiology, and oncology — open to all IAMA members and sponsored guests.",
    category: "Webinar",
    featured: false,
    href: "#",
    icon: Globe,
  },
  {
    id: "west-coast-symposium",
    title: "West Coast Regional Symposium",
    date: "June 14, 2026",
    location: "Omni Hotel, Los Angeles, CA",
    description:
      "A one-day regional gathering hosted by the California Chapter, featuring case presentations, a panel on healthcare innovation, and a networking dinner.",
    category: "Regional Event",
    featured: false,
    href: "#",
    icon: Stethoscope,
  },
  {
    id: "leadership-summit",
    title: "JAVAAN Leadership Summit",
    date: "July 19, 2026",
    location: "Virtual (Zoom)",
    description:
      "An all-day leadership development summit exclusively for early-career physician members, featuring workshops on negotiation, practice management, and executive presence.",
    category: "Section Event",
    featured: false,
    href: "#",
    icon: Users,
  },
  {
    id: "cme-series-fall",
    title: "Fall CME Lecture Series",
    date: "October 5 – November 16, 2026",
    location: "Virtual (6-part series)",
    description:
      "A six-week virtual lecture series covering advances in diabetes management, hypertension, mental health, and preventive care — eligible for up to 6.0 AMA PRA Category 1 Credits.",
    category: "CME",
    featured: false,
    href: "#",
    icon: BookOpen,
  },
  {
    id: "northeast-gala",
    title: "Northeast Region Annual Gala",
    date: "November 21, 2026",
    location: "The Plaza Hotel, New York City, NY",
    description:
      "An elegant evening celebrating the accomplishments of Iranian American physicians in the Northeast, featuring an award ceremony, dinner, and live Persian music.",
    category: "Regional Event",
    featured: false,
    href: "#",
    icon: Star,
  },
];

const categoryColors: Record<string, string> = {
  "Annual Meeting": "bg-primary-100 text-primary-800",
  Webinar: "bg-blue-100 text-blue-800",
  "Regional Event": "bg-amber-100 text-amber-800",
  "Section Event": "bg-purple-100 text-purple-800",
  CME: "bg-green-100 text-green-800",
};

export default function EventsPage() {
  const featured = upcomingEvents.find((e) => e.featured);
  const rest = upcomingEvents.filter((e) => !e.featured);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Events"
          subtitle="Connect with colleagues, earn CME credits, and advance your career at IAMA events held across the country and online."
          breadcrumbs={[{ label: "Events" }]}
        />

        {/* Stats bar */}
        <section className="py-10 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Annual Events", count: "12+" },
                { label: "CME Credits Offered", count: "30+" },
                { label: "States Represented", count: "20+" },
                { label: "Years Running", count: "33" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white p-4 shadow-sm text-center"
                >
                  <p className="text-2xl font-bold text-secondary">{stat.count}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured event */}
        {featured && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                Featured Event
              </h2>
              <Card className="overflow-hidden border-2 border-primary-100 group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-primary-800 to-primary-700 p-6 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white mb-3">
                      <Star className="h-3.5 w-3.5" />
                      Flagship Event
                    </span>
                    <h3 className="text-2xl font-bold">{featured.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-4 text-primary-100 text-sm">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {featured.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
                    <p className="text-muted leading-relaxed max-w-2xl">
                      {featured.description}
                    </p>
                    <Link
                      href={featured.href}
                      className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Upcoming events grid */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Upcoming Events
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((event) => {
                const Icon = event.icon;
                return (
                  <Card
                    key={event.id}
                    className="group hover:shadow-md transition-shadow flex flex-col"
                  >
                    <CardContent className="p-5 flex flex-col flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`mt-0.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            categoryColors[event.category] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.category}
                        </span>
                      </div>

                      <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <div className="mt-2 space-y-1 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.location}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                        {event.description}
                      </p>

                      <Link
                        href={event.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-secondary">
              Stay Informed
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              IAMA members receive priority registration, discounted rates, and
              early access to event announcements. Join or renew your membership
              to stay connected.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Become a Member
              </Link>
              <Link
                href="/congress"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-secondary hover:bg-gray-50 transition-colors"
              >
                View Annual Congress
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
