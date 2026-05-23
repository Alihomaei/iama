import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chapters } from "@/lib/chapters";
import { sections } from "@/lib/sections";
import { MapPin, Users, ArrowRight, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Community | IAMA",
  description:
    "Explore IAMA's regional chapters and specialty sections — find your local chapter or join a section aligned with your practice area.",
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Community"
          subtitle="IAMA's strength comes from its members. Find your regional chapter or connect with a specialty section aligned with your interests."
          breadcrumbs={[{ label: "Community" }]}
        />

        {/* Intro */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 max-w-3xl">
            <p className="text-muted leading-relaxed">
              IAMA has served the Iranian American medical community since 1993 through a
              network of regional chapters across the United States and a growing set of
              specialty sections. Chapters organize local events, advocacy days, and
              community health initiatives. Specialty sections provide focused forums for
              clinical collaboration, CME content, and mentorship within a specific field.
            </p>
          </div>
        </section>

        {/* Chapters */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">Regional Chapters</h2>
                <p className="text-sm text-muted mt-0.5">
                  Local communities in {chapters.length} states
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Card
                  key={chapter.slug}
                  className="group hover:shadow-md transition-shadow flex flex-col"
                >
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-secondary text-lg group-hover:text-primary transition-colors">
                        {chapter.name}
                      </h3>
                      <Badge variant="outline">{chapter.memberCount} members</Badge>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-muted mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      {chapter.region}
                    </span>
                    <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                      {chapter.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted">
                        Chair: {chapter.chair.name.replace("Dr. ", "")}
                      </span>
                      <Link
                        href={`/community/chapters/${chapter.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Chapter
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">Specialty Sections</h2>
                <p className="text-sm text-muted mt-0.5">
                  Focused communities by practice area and career stage
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {sections.map((section) => (
                <Card
                  key={section.slug}
                  className="group hover:shadow-md transition-shadow flex flex-col"
                >
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="font-semibold text-secondary text-lg group-hover:text-primary transition-colors flex-1">
                        {section.name}
                      </h3>
                    </div>
                    <Badge variant="default" className="self-start mb-3">
                      {section.focus}
                    </Badge>
                    <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                      {section.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted">
                        Lead: {section.lead.name.replace("Dr. ", "")}
                      </span>
                      <Link
                        href={`/community/sections/${section.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Section
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get involved CTA */}
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-secondary">Get Involved</h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              IAMA membership gives you access to all regional chapters and specialty sections.
              Join today to connect with colleagues in your area and your specialty.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                <Users className="h-4 w-4" />
                Join IAMA
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-secondary hover:bg-white transition-colors"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
