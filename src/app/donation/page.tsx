import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Award,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Donate | IAMA",
  description:
    "Support the Iranian American Medical Association — a 501(c)(3) non-profit advancing the mission of Iranian American physicians since 1993. Your gift is tax-deductible.",
};

const tiers = [
  {
    amount: "$50",
    label: "Friend",
    color: "border-green-100 bg-green-50",
    accentColor: "text-green-700",
    badgeVariant: "success" as const,
    impact:
      "Funds one student's registration for a JAVAAN or SUSMA virtual workshop, giving the next generation of Iranian American physicians access to career development resources.",
    perks: ["Recognition in IAMA newsletter", "Digital certificate of appreciation"],
  },
  {
    amount: "$100",
    label: "Supporter",
    color: "border-blue-100 bg-blue-50",
    accentColor: "text-blue-700",
    badgeVariant: "default" as const,
    impact:
      "Subsidizes the registration fee for a medical student attending the Annual Meeting, ensuring trainee representation at the flagship IAMA event.",
    perks: [
      "Recognition in IAMA newsletter",
      "Digital certificate of appreciation",
      "Invitation to donor appreciation webinar",
    ],
  },
  {
    amount: "$250",
    label: "Advocate",
    color: "border-primary-100 bg-primary-50",
    accentColor: "text-primary",
    badgeVariant: "default" as const,
    impact:
      "Contributes to the Travel Grant Fund, helping a resident or early-career physician attend and present research at a national medical conference.",
    perks: [
      "Named recognition at Annual Meeting",
      "Digital certificate of appreciation",
      "Invitation to donor appreciation webinar",
      "Priority access to IAMA member events",
    ],
    featured: true,
  },
  {
    amount: "$1,000",
    label: "Benefactor",
    color: "border-amber-100 bg-amber-50",
    accentColor: "text-amber-700",
    badgeVariant: "warning" as const,
    impact:
      "Funds an entire cycle of Travel Grants for two recipients or underwrites a chapter health fair, directly enabling community health outreach to Iranian American families.",
    perks: [
      "Named recognition at Annual Meeting and on IAMA website",
      "Personalized thank-you letter from IAMA President",
      "Exclusive Benefactor Roundtable invitation",
      "Priority access to all IAMA member events",
      "Complimentary one-year IAMA membership",
    ],
  },
];

const impactAreas = [
  {
    icon: BookOpen,
    title: "Medical Education",
    description:
      "Funding CME courses, webinars, and educational content accessible to all members regardless of ability to pay.",
  },
  {
    icon: Users,
    title: "Mentorship & Careers",
    description:
      "Supporting the Mentorship Program infrastructure, travel grants, and career development workshops.",
  },
  {
    icon: Award,
    title: "Advocacy",
    description:
      "Enabling IAMA to represent Iranian American physicians before Congress, state legislatures, and federal agencies.",
  },
  {
    icon: Heart,
    title: "Community Health",
    description:
      "Funding chapter-level community health fairs, free clinics, and outreach to underserved populations.",
  },
];

export default function DonationPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Support IAMA"
          subtitle="Your gift empowers Iranian American physicians, advances medical education, and strengthens our community."
          breadcrumbs={[{ label: "Donation" }]}
        />

        {/* 501(c)(3) notice */}
        <section className="py-6 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
              <span>
                IAMA is a{" "}
                <strong className="text-secondary">501(c)(3) non-profit organization</strong>
                . All donations are{" "}
                <strong className="text-secondary">
                  tax-deductible to the fullest extent permitted by law
                </strong>
                . You will receive a donation receipt for your records.
              </span>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-secondary">
                  Why Your Gift Matters
                </h2>
                <p className="text-muted leading-relaxed">
                  For more than three decades, IAMA has been the home of Iranian American
                  physicians in the United States — providing community, education, advocacy,
                  and opportunity. Founded in 1993, we are sustained almost entirely by
                  membership dues and the generosity of donors like you.
                </p>
                <p className="text-muted leading-relaxed">
                  Your donation directly funds scholarships for medical students, travel
                  grants for residents, CME content for practitioners, and advocacy efforts
                  that protect the rights and careers of Iranian American physicians across
                  the country.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { label: "Founded", value: "1993" },
                    { label: "State Chapters", value: "6" },
                    { label: "Specialty Sections", value: "4" },
                    { label: "Years of Service", value: "33" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-white p-4 text-center shadow-sm"
                    >
                      <p className="text-xl font-bold text-secondary">{stat.value}</p>
                      <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact areas */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-secondary">Your Impact</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {impactAreas.map((area) => {
                    const Icon = area.icon;
                    return (
                      <Card key={area.title} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary">
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-secondary text-sm">
                              {area.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted leading-relaxed">
                            {area.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Giving tiers */}
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-secondary">Choose a Giving Level</h2>
              <p className="mt-2 text-muted max-w-2xl">
                Every contribution makes a difference. Select a giving tier below or
                enter a custom amount.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <Card
                  key={tier.amount}
                  className={`flex flex-col border-2 transition-shadow hover:shadow-lg ${
                    tier.featured
                      ? "border-primary shadow-md"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-5 flex flex-col flex-1">
                    {tier.featured && (
                      <span className="inline-flex items-center gap-1 self-start rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white mb-2">
                        <Star className="h-3 w-3" />
                        Most Popular
                      </span>
                    )}
                    <p className={`text-3xl font-bold ${tier.accentColor}`}>{tier.amount}</p>
                    <p className="text-sm font-semibold text-secondary mt-0.5 mb-3">
                      {tier.label}
                    </p>
                    <p className="text-xs text-muted leading-relaxed mb-4 flex-1">
                      {tier.impact}
                    </p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-secondary mb-1.5">Includes:</p>
                      <ul className="space-y-1">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-1.5 text-xs text-muted">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* UI-only donate button — payment not wired */}
                    <button
                      type="button"
                      className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                        tier.featured
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "border border-border text-secondary hover:bg-gray-100"
                      }`}
                    >
                      Donate {tier.amount}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom amount and recurring note */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <Card className="flex-1">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-secondary mb-2">Donate Online or by Mail</h3>
                  <p className="text-sm text-muted mb-3">
                    Give securely online via PayPal — any amount is welcome and deeply
                    appreciated. Prefer to mail a check? Make it payable to &ldquo;IAMA&rdquo;
                    (note &ldquo;IAMA&rdquo; on the memo line) and mail to: 16 Gregory Lane,
                    Warren, NJ 07059.
                  </p>
                  <a
                    href="https://www.paypal.com/ncp/payment/DBX2YC334VSH4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-secondary hover:bg-gray-100 transition-colors"
                  >
                    <Heart className="h-4 w-4 text-primary" />
                    Donate via PayPal
                  </a>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-secondary mb-2">Monthly Giving</h3>
                  <p className="text-sm text-muted mb-3">
                    Monthly donors provide IAMA with the sustainable, predictable funding we
                    need to plan programs year-round. Opt into monthly giving at checkout.
                  </p>
                  <Badge variant="default" className="text-xs">
                    Recurring donations available
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tax deductible section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary mb-2">
                  Tax Deductibility
                </h2>
                <p className="text-muted text-sm leading-relaxed max-w-2xl">
                  The Iranian American Medical Association is recognized by the IRS as a
                  tax-exempt organization under Section 501(c)(3) of the Internal Revenue Code.
                  Contributions are tax-deductible to the fullest extent
                  permitted by applicable law. Upon completing your donation, you will receive
                  an electronic receipt confirming the amount and date of your contribution for
                  use in preparing your federal and state tax returns. Please retain this
                  receipt for your records. No goods or services were provided in exchange for
                  your contribution (except as noted in donor tier descriptions above).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other ways to give */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-xl font-bold text-secondary mb-6">Other Ways to Give</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Corporate Matching",
                  description:
                    "Many employers match employee charitable donations. Check with your HR department to double or triple your impact at no additional cost to you.",
                },
                {
                  title: "Planned Giving",
                  description:
                    "Consider including IAMA in your estate plan or designating IAMA as a beneficiary of a retirement account or life insurance policy.",
                },
                {
                  title: "In-Kind Donations",
                  description:
                    "IAMA welcomes in-kind contributions such as conference sponsorships, services, and venue support. Contact us to discuss opportunities.",
                },
              ].map((item) => (
                <Card key={item.title} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              For questions about giving, contact us at{" "}
              <a href="mailto:iama@iama.org" className="text-primary hover:underline font-medium">
                iama@iama.org
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
