import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: "1",
    title: "IAMA Annual Congress 2026",
    date: "October 16-18, 2026",
    location: "Beverly Hilton, Los Angeles, CA",
    description:
      "Join over 500 physicians and researchers for three days of cutting-edge medical education, networking, and community.",
    href: "/congress",
    featured: true,
  },
  {
    id: "2",
    title: "Spring CME Symposium",
    date: "May 10, 2026",
    location: "Virtual Event",
    description:
      "A full day of accredited continuing medical education covering the latest advances in cardiology and oncology.",
    href: "/education",
    featured: false,
  },
  {
    id: "3",
    title: "Young Physicians Forum",
    date: "June 22, 2026",
    location: "New York, NY",
    description:
      "A gathering for residents and early-career physicians to network, share research, and connect with mentors.",
    href: "/education",
    featured: false,
  },
];

export function FeaturedEvents() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-3 text-lg text-muted">
            Stay connected with our community through conferences, workshops, and
            educational programs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className={
                event.featured
                  ? "border-primary/30 ring-1 ring-primary/20 md:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              {event.featured && (
                <div className="bg-primary px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white rounded-t-xl">
                  Featured Event
                </div>
              )}
              <CardContent className={event.featured ? "p-6" : "p-6"}>
                <h3 className="text-lg font-semibold text-secondary">
                  {event.title}
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Calendar className="h-4 w-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {event.description}
                </p>
                <Link
                  href={event.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
