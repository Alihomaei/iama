import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Heart,
  Globe,
  Users,
  Shield,
  FileText,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Advocacy",
  description:
    "IAMA's advocacy efforts on healthcare policy, physician workforce issues, and global health initiatives.",
};

const priorities = [
  {
    icon: Scale,
    title: "Healthcare Policy",
    description:
      "Advocating for equitable healthcare legislation, physician reimbursement reform, and insurance coverage expansion to ensure all patients receive quality care.",
  },
  {
    icon: Globe,
    title: "Immigration & Workforce",
    description:
      "Supporting immigration policies that facilitate the contributions of international medical graduates and address physician shortages in underserved areas.",
  },
  {
    icon: Heart,
    title: "Health Equity",
    description:
      "Promoting programs that eliminate healthcare disparities in immigrant communities and ensure culturally competent care is accessible to all.",
  },
  {
    icon: Shield,
    title: "Research Funding",
    description:
      "Championing increased federal and private funding for biomedical research, clinical trials, and translational science.",
  },
  {
    icon: Users,
    title: "Physician Well-being",
    description:
      "Advocating for system-level changes to reduce administrative burden, address burnout, and support the mental health of medical professionals.",
  },
  {
    icon: FileText,
    title: "Medical Education",
    description:
      "Supporting expansion of residency positions, modernization of medical curricula, and equitable access to training opportunities.",
  },
];

const updates = [
  {
    date: "March 2026",
    title: "IAMA Joins Coalition for Physician Reimbursement Reform",
    summary:
      "IAMA has joined a coalition of 30+ medical organizations calling on Congress to address the Medicare physician payment schedule and prevent further cuts to reimbursement rates.",
  },
  {
    date: "February 2026",
    title: "Testimony on International Medical Graduate Visa Policies",
    summary:
      "IAMA leadership provided testimony before the Senate Health Committee on the critical role of international medical graduates and the need for streamlined visa processes.",
  },
  {
    date: "January 2026",
    title: "Health Equity Initiative Launched in Underserved Communities",
    summary:
      "In partnership with community health centers, IAMA launched free screening programs in five underserved communities across California and Texas.",
  },
  {
    date: "December 2025",
    title: "Position Statement on AI in Clinical Decision-Making",
    summary:
      "IAMA published a position paper outlining ethical guidelines and regulatory recommendations for the use of artificial intelligence in clinical settings.",
  },
];

export default function AdvocacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Advocacy & Policy"
          subtitle="IAMA advocates for policies that strengthen healthcare, support physicians, and improve patient outcomes."
          breadcrumbs={[{ label: "Advocacy" }]}
        />

        {/* Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-3xl font-bold text-secondary">
              Our Advocacy Mission
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              The IAMA Advocacy Committee works to advance policies that support
              the practice of medicine, promote the interests of Iranian American
              physicians, and improve health outcomes for communities across the
              nation and abroad. We believe that physician voices are essential to
              shaping effective healthcare policy.
            </p>
          </div>
        </section>

        {/* Policy Priorities */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold text-secondary">
              Policy Priorities
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {priorities.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-secondary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Advocacy Updates */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold text-secondary">
              Recent Advocacy Updates
            </h2>
            <div className="space-y-6">
              {updates.map((update) => (
                <Card key={update.title}>
                  <CardContent className="p-6">
                    <span className="text-sm font-medium text-primary">
                      {update.date}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-secondary">
                      {update.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {update.summary}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-3xl font-bold">Get Involved</h2>
            <p className="mt-4 text-lg text-primary-100 leading-relaxed">
              Your voice matters. Join the IAMA Advocacy Committee to help shape
              healthcare policy, attend advocacy events, and represent the
              interests of Iranian American physicians on Capitol Hill.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                href="/membership"
                size="lg"
                className="bg-white text-primary-800 hover:bg-primary-50"
              >
                Become a Member
              </Button>
              <Button
                asChild
                href="mailto:advocacy@iama.org"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Advocacy Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
