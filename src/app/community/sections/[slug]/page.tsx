import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sections, getSectionBySlug } from "@/lib/sections";
import {
  Mail,
  User,
  CalendarDays,
  ArrowRight,
  FlaskConical,
} from "lucide-react";

export async function generateStaticParams() {
  return sections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  if (!section) return { title: "Section Not Found | IAMA" };
  return {
    title: `${section.name} | IAMA Community`,
    description: `Learn about the IAMA ${section.name} section — focused on ${section.focus}.`,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title={section.name}
          subtitle={section.focus}
          breadcrumbs={[
            { label: "Community", href: "/community" },
            { label: "Sections" },
            { label: section.name },
          ]}
        />

        {/* Quick facts */}
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" />
                <strong className="text-secondary">{section.focus}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${section.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {section.email}
                </a>
              </span>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">About This Section</h2>
                  <p className="text-muted leading-relaxed">{section.blurb}</p>
                </div>

                {/* Activities */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Section Activities</h2>
                  <div className="space-y-4">
                    {section.activities.map((activity) => (
                      <Card key={activity.title} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary mt-0.5">
                              <CalendarDays className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-secondary">
                                {activity.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted leading-relaxed">
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Section Lead */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Section Leader</h3>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{section.lead.name}</p>
                        <p className="text-xs text-muted mt-0.5 leading-snug">
                          {section.lead.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Focus area */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Focus Area</h3>
                    <Badge variant="default">{section.focus}</Badge>
                    <p className="mt-3 text-xs text-muted leading-relaxed">
                      This section hosts dedicated CME content, mentorship programming, and
                      peer networking opportunities within its specialty area.
                    </p>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Contact</h3>
                    <a
                      href={`mailto:${section.email}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {section.email}
                    </a>
                    <p className="mt-2 text-xs text-muted">
                      For section membership, event proposals, and collaboration inquiries.
                    </p>
                  </CardContent>
                </Card>

                {/* Join CTA */}
                <Card className="border-primary-100 bg-primary-50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Join This Section</h3>
                    <p className="text-sm text-muted mb-4">
                      IAMA members can participate in any specialty section. Join or renew
                      your membership to get started.
                    </p>
                    <Link
                      href="/membership"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                    >
                      Become a Member
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Back link */}
                <Link
                  href="/community"
                  className="block text-center text-sm text-primary hover:underline font-medium"
                >
                  ← View All Sections
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
