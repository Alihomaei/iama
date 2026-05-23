import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plane, ArrowRight, Award, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Opportunities & Awards | IAMA",
  description:
    "Explore IAMA's Mentorship Program, Travel Grant, and awards for Iranian American medical professionals.",
};

const opportunities = [
  {
    slug: "mentorship",
    title: "Mentorship Program",
    icon: Users,
    color: "bg-primary-50 text-primary",
    badge: "Applications Open",
    badgeVariant: "success" as const,
    deadline: "Applications due May 31, 2026",
    description:
      "The IAMA Mentorship Program pairs early-career physicians, residents, and medical students with experienced physician mentors across a range of specialties. Through structured one-on-one guidance, group sessions, and career resources, mentees gain the professional insight and personal support needed to thrive in American medicine.",
    highlights: [
      "Personalized 1:1 pairing based on specialty and career goals",
      "6-month structured program with milestones",
      "Monthly virtual check-ins and group webinars",
      "Open to IAMA members at all career stages",
    ],
    href: "/opportunities/mentorship",
  },
  {
    slug: "travel-grant",
    title: "Travel Grant",
    icon: Plane,
    color: "bg-amber-50 text-amber-700",
    badge: "Next Cycle: Spring 2026",
    badgeVariant: "warning" as const,
    deadline: "Applications due April 15, 2026",
    description:
      "The IAMA Travel Grant awards financial support to medical students, residents, and early-career physicians to attend national and international medical conferences, present research, or participate in global health initiatives. Up to $1,500 per awardee per cycle.",
    highlights: [
      "Awards up to $1,500 per recipient",
      "Supports conference attendance and research presentations",
      "Two award cycles per year (spring and fall)",
      "Open to IAMA student and early-career members",
    ],
    href: "/opportunities/travel-grant",
  },
];

export default function OpportunitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Opportunities & Awards"
          subtitle="IAMA invests in the professional growth of Iranian American medical professionals through mentorship, financial support, and peer recognition."
          breadcrumbs={[{ label: "Opportunities & Awards" }]}
        />

        {/* Intro */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-muted leading-relaxed">
                Since 1993, IAMA has been committed to supporting the careers of Iranian
                American physicians and trainees. Our programs are designed to accelerate
                professional development, foster meaningful mentorship relationships, and
                remove financial barriers to participation in academic and professional life.
                Explore the programs below and apply before the upcoming deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities cards */}
        <section className="py-4 pb-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {opportunities.map((opp) => {
                const Icon = opp.icon;
                return (
                  <Card
                    key={opp.slug}
                    className="group hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${opp.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
                            {opp.title}
                          </h2>
                          <Badge variant={opp.badgeVariant} className="mt-1">
                            {opp.badge}
                          </Badge>
                        </div>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 text-xs text-muted mb-4">
                        <Calendar className="h-3.5 w-3.5" />
                        {opp.deadline}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {opp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1.5 mb-6 flex-1">
                        {opp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-muted">
                            <Award className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={opp.href}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors self-start"
                      >
                        Learn More & Apply
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Annual awards note */}
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-secondary">Annual Awards</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Physician of the Year",
                  description:
                    "Awarded to an IAMA member who has demonstrated outstanding clinical excellence and service to the community.",
                },
                {
                  name: "Rising Star Award",
                  description:
                    "Recognizes an early-career physician member who shows exceptional promise in their specialty and leadership.",
                },
                {
                  name: "Advocacy Award",
                  description:
                    "Honors the member who has made the most significant contribution to healthcare policy advocacy on behalf of Iranian Americans.",
                },
                {
                  name: "Medical Educator Award",
                  description:
                    "Celebrates a faculty member who has made an exceptional impact on medical education and training programs.",
                },
                {
                  name: "Community Service Award",
                  description:
                    "Given to a member whose volunteer and community health initiatives have had measurable positive impact.",
                },
                {
                  name: "Lifetime Achievement Award",
                  description:
                    "The highest IAMA honor — presented to a distinguished physician whose career exemplifies the association's mission.",
                },
              ].map((award) => (
                <Card key={award.name} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-1">{award.name}</h3>
                    <p className="text-sm text-muted leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Annual awards are presented at the Annual Meeting Gala each September. Nominations
              open in June.{" "}
              <Link href="/events/annual-meeting" className="text-primary hover:underline font-medium">
                Learn about the Annual Meeting →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
