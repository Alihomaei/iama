import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: "1",
    title: "IAMA 30th Annual Meeting",
    date: "May 23–25, 2026",
    location: "Kimpton Hotel Monaco, Washington, D.C.",
    description:
      "Three decades of IAMA. Join colleagues in Washington, D.C. for CME sessions, scientific presentations, and the Gala Dinner.",
    href: "/congress",
    featured: true,
  },
  {
    id: "2",
    title: "Annual Gala Dinner",
    date: "Sunday, May 24, 2026 · 7–11 PM",
    location: "Kimpton Hotel Monaco, Washington, D.C.",
    description:
      "An evening of celebration and networking. A separate ticket is required for the Gala Dinner during the Annual Meeting.",
    href: "/congress",
    featured: false,
  },
  {
    id: "3",
    title: "Call for Abstracts",
    date: "Deadline: March 1, 2026",
    location: "Online Submission",
    description:
      "Submit your abstract for the Annual Meeting. Junior members submitting abstracts can also apply for a travel grant.",
    href: "/abstracts/submit",
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
