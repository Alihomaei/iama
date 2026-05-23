import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the Iranian American Medical Association. Choose from Platinum, Gold, Silver, Bronze, and Pre-residency membership tiers.",
};

const tiers = [
  {
    name: "Platinum",
    price: 150,
    description: "MD, DO, DMD, DDS, DVM, PharmD, PhD, DPM, DC, DN.",
    featured: true,
  },
  {
    name: "Gold",
    price: 75,
    description: "PA, RN, medical technologists, and other professionals.",
    featured: false,
  },
  {
    name: "Silver",
    price: 75,
    description: "Retirees.",
    featured: false,
  },
  {
    name: "Bronze",
    price: 50,
    description: "Residents, fellows, and post docs.",
    featured: false,
  },
  {
    name: "Pre-residency",
    price: 0,
    description: "Students, unpaid research fellows, and non-practicing doctors.",
    featured: false,
  },
];

const features = [
  "Networking",
  "Meeting Registration Discounts",
  "Webinars & Monthly Lectures",
  "Job Board Access",
  "Travel Grants & Awards",
  "Committee & Board Eligibility",
  "Voting Rights",
  "Mentorship Program",
];

const featureMatrix: Record<string, boolean[]> = {
  Platinum:       [true, true, true, true, true,  true,  true,  true],
  Gold:           [true, true, true, true, true,  true,  true,  true],
  Silver:         [true, true, true, true, true,  true,  true,  true],
  Bronze:         [true, true, true, true, true,  true,  true,  true],
  "Pre-residency": [true, true, true, true, true,  false, false, true],
};

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Membership"
          subtitle="Join a thriving community of Iranian American medical professionals. Choose the plan that fits your career stage."
          breadcrumbs={[{ label: "Membership" }]}
        />

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "flex flex-col",
                    tier.featured &&
                      "border-primary ring-2 ring-primary/20 relative"
                  )}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-secondary">
                        ${tier.price}
                      </span>
                      <span className="text-sm text-muted">/year</span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {features.map((feature, i) => {
                        const available = featureMatrix[tier.name][i];
                        return (
                          <li
                            key={feature}
                            className={cn(
                              "flex items-center gap-2 text-sm",
                              available ? "text-secondary" : "text-gray-300"
                            )}
                          >
                            {available ? (
                              <Check className="h-4 w-4 text-success shrink-0" />
                            ) : (
                              <X className="h-4 w-4 shrink-0" />
                            )}
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button
                      asChild
                      href="/auth/signup"
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      Join Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table (desktop) */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold text-secondary">
              Compare Membership Benefits
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 pr-4 text-left text-sm font-semibold text-secondary">
                      Benefit
                    </th>
                    {tiers.map((tier) => (
                      <th
                        key={tier.name}
                        className={cn(
                          "px-4 py-4 text-center text-sm font-semibold",
                          tier.featured ? "text-primary" : "text-secondary"
                        )}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, fIndex) => (
                    <tr key={feature} className="border-b border-border">
                      <td className="py-3 pr-4 text-sm text-secondary">
                        {feature}
                      </td>
                      {tiers.map((tier) => (
                        <td key={tier.name} className="px-4 py-3 text-center">
                          {featureMatrix[tier.name][fIndex] ? (
                            <Check className="mx-auto h-4 w-4 text-success" />
                          ) : (
                            <X className="mx-auto h-4 w-4 text-gray-300" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 pr-4 text-sm font-semibold text-secondary">
                      Annual Fee
                    </td>
                    {tiers.map((tier) => (
                      <td
                        key={tier.name}
                        className="px-4 py-4 text-center text-sm font-bold text-secondary"
                      >
                        ${tier.price}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ / CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-3xl font-bold text-secondary">
              Questions About Membership?
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Contact our membership team at{" "}
              <a
                href="mailto:iama@iama.org"
                className="text-primary hover:text-primary-dark"
              >
                iama@iama.org
              </a>{" "}
              or call (973) 595-8888. We&apos;re happy to help you find the right
              membership tier for your career.
            </p>
            <div className="mt-8">
              <Button asChild href="/auth/signup" size="lg">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
