import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chapters, getChapterBySlug } from "@/lib/chapters";
import {
  MapPin,
  Users,
  Mail,
  User,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export async function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: "Chapter Not Found | IAMA" };
  return {
    title: `${chapter.name} Chapter | IAMA Community`,
    description: `Learn about the IAMA ${chapter.name} Chapter — serving ${chapter.region} with ${chapter.memberCount} members.`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title={`${chapter.name} Chapter`}
          subtitle={`Serving Iranian American physicians across ${chapter.region}`}
          breadcrumbs={[
            { label: "Community", href: "/community" },
            { label: "Chapters" },
            { label: chapter.name },
          ]}
        />

        {/* Quick facts */}
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <strong className="text-secondary">{chapter.region}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <strong className="text-secondary">{chapter.memberCount} Members</strong>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${chapter.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {chapter.email}
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
                  <h2 className="text-2xl font-bold text-secondary mb-4">About This Chapter</h2>
                  <p className="text-muted leading-relaxed">{chapter.blurb}</p>
                </div>

                {/* Activities */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Local Activities</h2>
                  <div className="space-y-4">
                    {chapter.activities.map((activity) => (
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
                {/* Chapter Chair */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Chapter Chair</h3>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{chapter.chair.name}</p>
                        <p className="text-xs text-muted mt-0.5 leading-snug">
                          {chapter.chair.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Contact</h3>
                    <a
                      href={`mailto:${chapter.email}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {chapter.email}
                    </a>
                    <p className="mt-2 text-xs text-muted">
                      For chapter membership, local events, and sponsorship inquiries.
                    </p>
                  </CardContent>
                </Card>

                {/* Membership CTA */}
                <Card className="border-primary-100 bg-primary-50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Join This Chapter</h3>
                    <p className="text-sm text-muted mb-4">
                      IAMA membership automatically includes access to your regional chapter
                      and all local events.
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

                {/* All chapters link */}
                <Link
                  href="/community"
                  className="block text-center text-sm text-primary hover:underline font-medium"
                >
                  ← View All Chapters
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
