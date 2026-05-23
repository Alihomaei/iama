import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  DollarSign,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  FileText,
  Users,
  Award,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Grant | IAMA Opportunities",
  description:
    "Apply for the IAMA Travel Grant — up to $1,500 to support conference attendance, research presentations, and global health initiatives.",
};

const eligibility = [
  "Current IAMA member (student, resident, fellow, or early-career physician within 5 years of training completion)",
  "Accepted to present research (oral or poster) at a recognized national or international medical conference, OR attending a major conference related to your specialty",
  "In good academic or professional standing",
  "Have not received an IAMA Travel Grant in the prior 12 months",
  "Priority given to those who have not previously received this award",
];

const applicationChecklist = [
  "Completed online application form",
  "Letter of acceptance from the conference or event (if presenting)",
  "Brief personal statement (500 words max): describe the conference, its relevance to your career, and how an IAMA Travel Grant will enable your participation",
  "Itemized budget estimate (registration, travel, lodging)",
  "Current CV or resume",
  "Letter of support from a faculty advisor, program director, or department chair",
];

const cycles = [
  {
    cycle: "Spring 2026",
    deadline: "April 15, 2026",
    notification: "May 1, 2026",
    disbursement: "May 15, 2026",
    status: "Open",
    variant: "success" as const,
  },
  {
    cycle: "Fall 2026",
    deadline: "October 1, 2026",
    notification: "October 15, 2026",
    disbursement: "November 1, 2026",
    status: "Opens August 1",
    variant: "warning" as const,
  },
];

export default function TravelGrantPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Travel Grant"
          subtitle="Financial support for Iranian American physicians and trainees to attend conferences, present research, and engage in global health."
          breadcrumbs={[
            { label: "Opportunities & Awards", href: "/opportunities" },
            { label: "Travel Grant" },
          ]}
        />

        {/* Key facts bar */}
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Up to $1,500 per Recipient</strong>
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Spring Deadline: April 15, 2026</strong>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Two Award Cycles Per Year</strong>
              </span>
              <Badge variant="success">Spring Cycle Open</Badge>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Main */}
              <div className="lg:col-span-2 space-y-10">
                {/* Purpose */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">About the Grant</h2>
                  <p className="text-muted leading-relaxed mb-3">
                    The IAMA Travel Grant was established in 2009 to remove financial barriers
                    that prevent talented Iranian American medical trainees and early-career
                    physicians from participating in national and international medical conferences.
                    Presenting research, attending specialty meetings, and engaging in global
                    health programs are critical to career advancement — and the Travel Grant
                    makes those opportunities accessible.
                  </p>
                  <p className="text-muted leading-relaxed">
                    Each cycle, IAMA awards grants of up to $1,500 to cover registration fees,
                    round-trip travel, and lodging. Recipients are selected by the IAMA
                    Scholarship Committee based on merit, need, and the relevance of the
                    proposed conference or program to the applicant's career.
                  </p>
                </div>

                {/* Award tiers */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Award Tiers</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        label: "Medical Student",
                        amount: "Up to $750",
                        color: "border-green-100 bg-green-50",
                        textColor: "text-green-800",
                      },
                      {
                        label: "Resident / Fellow",
                        amount: "Up to $1,000",
                        color: "border-primary-100 bg-primary-50",
                        textColor: "text-primary-800",
                      },
                      {
                        label: "Early-Career Physician",
                        amount: "Up to $1,500",
                        color: "border-amber-100 bg-amber-50",
                        textColor: "text-amber-800",
                      },
                    ].map((tier) => (
                      <Card key={tier.label} className={`border ${tier.color} text-center`}>
                        <CardContent className="p-5">
                          <p className={`text-2xl font-bold ${tier.textColor}`}>{tier.amount}</p>
                          <p className="text-sm text-muted mt-1">{tier.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-xs text-muted">
                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Award amounts are maximums; the Scholarship Committee determines the
                    final grant based on the itemized budget and demonstrated need.
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Eligibility</h2>
                  <ul className="space-y-2">
                    {eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to apply */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">How to Apply</h2>
                  <p className="text-muted text-sm mb-4 leading-relaxed">
                    Applications are submitted online through the IAMA member portal. You will
                    need to prepare the following materials:
                  </p>
                  <ul className="space-y-2">
                    {applicationChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Apply CTA */}
                <Card className="border-primary-100 bg-primary-50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Apply for Spring 2026</h3>
                    <p className="text-sm text-muted mb-4">
                      The Spring 2026 cycle is now open. Deadline is April 15, 2026.
                      IAMA membership required.
                    </p>
                    <Link
                      href="/auth/signup"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                    >
                      Start Application
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/membership"
                      className="block text-center text-xs text-muted hover:text-primary transition-colors mt-3"
                    >
                      Not a member? Join IAMA first →
                    </Link>
                  </CardContent>
                </Card>

                {/* Cycles */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-3">Award Cycles</h3>
                    <div className="space-y-4">
                      {cycles.map((cycle) => (
                        <div key={cycle.cycle} className="text-sm">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-medium text-secondary">{cycle.cycle}</span>
                            <Badge variant={cycle.variant}>{cycle.status}</Badge>
                          </div>
                          <ul className="space-y-1 text-xs text-muted">
                            <li>Deadline: {cycle.deadline}</li>
                            <li>Notification: {cycle.notification}</li>
                            <li>Disbursement: {cycle.disbursement}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Past winners note */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Past Recipients</h3>
                    <p className="text-sm text-muted">
                      IAMA has awarded over $180,000 in travel grants since 2009, supporting
                      more than 200 recipients across 38 states and 15 countries.
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-primary">
                      <Award className="h-4 w-4" />
                      <span className="font-medium">200+ recipients and counting</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">Questions?</h3>
                    <p className="text-sm text-muted mb-2">
                      Reach the Scholarship Committee for application questions.
                    </p>
                    <a
                      href="mailto:grants@iama.org"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      grants@iama.org
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
