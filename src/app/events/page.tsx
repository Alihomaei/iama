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
    title: "IAMA 30th Annual Meeting",
    date: "May 23–25, 2026",
    location: "Kimpton Hotel Monaco, Washington, D.C.",
    description:
      "The flagship event of the Iranian American Medical Association — three decades of IAMA, with CME sessions, keynote lectures, scientific presentations, the Gala Dinner, and the abstract competition with travel grants for junior members.",
    category: "Annual Meeting",
    featured: true,
    href: "/events/annual-meeting",
    icon: Star,
  },
  {
    id: "gala-dinner",
    title: "Annual Gala Dinner",
    date: "Sunday, May 24, 2026 · 7–11 PM",
    location: "Kimpton Hotel Monaco, Washington, D.C.",
    description:
      "An evening of celebration and networking during the Annual Meeting. A separate ticket is required for the Gala Dinner.",
    category: "Annual Meeting",
    featured: false,
    href: "/congress",
    icon: Star,
  },
  {
    id: "call-for-abstracts",
    title: "Call for Abstracts",
    date: "Deadline: March 1, 2026",
    location: "Online Submission",
    description:
      "Submit your abstract for the Annual Meeting. Junior members submitting abstracts can also apply for a travel grant.",
    category: "CME",
    featured: false,
    href: "/abstracts/submit",
    icon: BookOpen,
  },
  {
    id: "shark-tank",
    title: "Shark Tank–Style Innovation Pitch",
    date: "At the 30th Annual Meeting",
    location: "Washington, D.C.",
    description:
      "One future for med-tech: an innovation pitch program, led by Dr. Ehsan Vaghefi and team, returning at the 30th Annual IAMA Meeting.",
    category: "Section Event",
    featured: false,
    href: "/congress",
    icon: Users,
  },
  {
    id: "chapter-events",
    title: "Chapter Events",
    date: "Year-round",
    location: "AZ · CA · MA · NJ · NY · OH",
    description:
      "Local gatherings, CME, and networking hosted by IAMA's six state chapters throughout the year.",
    category: "Regional Event",
    featured: false,
    href: "/community",
    icon: Stethoscope,
  },
  {
    id: "mentorship",
    title: "Mentorship Program",
    date: "Year-round",
    location: "Virtual",
    description:
      "IAMA's Junior Members Mentorship Program connects junior members with experienced physicians for guidance and professional development.",
    category: "Section Event",
    featured: false,
    href: "/opportunities/mentorship",
    icon: Globe,
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
                { label: "Annual Meeting", count: "30th" },
                { label: "State Chapters", count: "6" },
                { label: "Specialty Sections", count: "4" },
                { label: "Years of Service", count: "33" },
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
