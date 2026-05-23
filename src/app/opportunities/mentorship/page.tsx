import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  Star,
  MessageSquare,
  BookOpen,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mentorship Program | IAMA Opportunities",
  description:
    "Apply to the IAMA Mentorship Program — connecting Iranian American medical students, residents, and early-career physicians with experienced physician mentors.",
};

const howItWorks = [
  {
    step: "1",
    title: "Submit Your Application",
    description:
      "Complete the online application indicating your specialty interests, career goals, preferred mentor attributes, and availability. Applications take approximately 20 minutes.",
    icon: BookOpen,
  },
  {
    step: "2",
    title: "Matching Process",
    description:
      "The IAMA Mentorship Committee reviews all applications and creates pairings based on specialty alignment, geographic preference, career-stage fit, and mentor capacity.",
    icon: Lightbulb,
  },
  {
    step: "3",
    title: "Program Kickoff",
    description:
      "Matched pairs receive an introductory package including suggested conversation topics, goal-setting worksheets, and a program calendar. The cohort meets virtually for an orientation session.",
    icon: Users,
  },
  {
    step: "4",
    title: "6-Month Engagement",
    description:
      "Mentors and mentees meet at least monthly. Mid-program check-ins are conducted by IAMA staff. Group webinars on career development topics are held quarterly for the entire cohort.",
    icon: MessageSquare,
  },
];

const timeline = [
  { date: "April 1, 2026", event: "Applications open for Cycle 2 (Fall 2026)" },
  { date: "May 31, 2026", event: "Application deadline" },
  { date: "June 15 – July 1, 2026", event: "Matching committee review" },
  { date: "July 15, 2026", event: "Pairings announced and introduced" },
  { date: "August 1, 2026", event: "Program kickoff and orientation webinar" },
  { date: "August – January 2027", event: "Active mentorship period" },
  { date: "January 2027", event: "Program completion and survey" },
];

export default function MentorshipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Mentorship Program"
          subtitle="Connecting Iranian American physicians across generations — building careers through guidance, relationship, and shared experience."
          breadcrumbs={[
            { label: "Opportunities & Awards", href: "/opportunities" },
            { label: "Mentorship Program" },
          ]}
        />

        {/* Key facts */}
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <strong className="text-secondary">For Junior (JAVAAN) Members</strong>
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Knowledge Transfer &amp; Guidance</strong>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Open to IAMA Members</strong>
              </span>
              <Badge variant="success">Now Welcoming Mentees</Badge>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Main */}
              <div className="lg:col-span-2 space-y-10">
                {/* What is it */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">About the Program</h2>
                  <p className="text-muted leading-relaxed mb-3">
                    IAMA&apos;s Junior Members Mentorship Program aims to promote ongoing
                    educational and professional opportunities for young scientists and to
                    enhance junior members&apos; capacity as professionals.
                  </p>
                  <p className="text-muted leading-relaxed">
                    The program improves the transfer of knowledge from experienced professionals
                    to juniors and increases junior members&apos; appreciation of, and orientation
                    within, their field. Each mentee is paired with an experienced IAMA physician
                    mentor for career guidance, clinical insight, and professional networking.
                  </p>
                </div>

                {/* Who it's for */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Who Can Apply</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        role: "Mentees",
                        color: "border-primary-100 bg-primary-50",
                        items: [
                          "Medical students (MS1–MS4)",
                          "Interns, residents, and fellows",
                          "Early-career physicians (within 5 years of training completion)",
                          "Must be active IAMA members",
                        ],
                      },
                      {
                        role: "Mentors",
                        color: "border-amber-100 bg-amber-50",
                        items: [
                          "Physicians with 5+ years of practice experience",
                          "Committed to at least 1–2 hours/month",
                          "Any specialty — generalists and specialists welcome",
                          "Must be active IAMA members",
                        ],
                      },
                    ].map((group) => (
                      <Card key={group.role} className={`border ${group.color}`}>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-secondary mb-3">{group.role}</h3>
                          <ul className="space-y-2">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-muted">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* How it works */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">How It Works</h2>
                  <div className="space-y-4">
                    {howItWorks.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.step} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                            {step.step}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-4 w-4 text-primary" />
                              <h3 className="font-semibold text-secondary">{step.title}</h3>
                            </div>
                            <p className="text-sm text-muted leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Apply CTA */}
                <Card className="border-primary-100 bg-primary-50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Apply Now</h3>
                    <p className="text-sm text-muted mb-4">
                      Junior members can join the Mentorship Program. You must be an IAMA
                      member to participate.
                    </p>
                    <Link
                      href="/auth/signup"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors mb-2"
                    >
                      Start Application
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/membership"
                      className="block text-center text-xs text-muted hover:text-primary transition-colors mt-2"
                    >
                      Not a member? Join IAMA first →
                    </Link>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Program Timeline</h3>
                    <ul className="space-y-3">
                      {timeline.map((item) => (
                        <li key={item.date} className="text-sm">
                          <span className="block font-medium text-primary text-xs">
                            {item.date}
                          </span>
                          <span className="text-muted">{item.event}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Questions?</h3>
                    <p className="text-sm text-muted mb-2">
                      Contact the Mentorship Committee for program inquiries.
                    </p>
                    <a
                      href="mailto:iama@iama.org"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      iama@iama.org
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
