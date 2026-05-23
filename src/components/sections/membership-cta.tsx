import Link from "next/link";
import {
  BookOpen,
  Users,
  Award,
  Globe,
  Ticket,
  FileText,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Networking",
    description:
      "Connect with clinicians, research scientists, and allied health professionals across specialties",
  },
  {
    icon: Ticket,
    title: "Meeting Discounts",
    description:
      "Discounted registration at the Annual Meeting and monthly public awareness seminars",
  },
  {
    icon: Globe,
    title: "Voting Rights",
    description:
      "Vote and stand for election to the Executive Committee and section and chapter boards",
  },
  {
    icon: Award,
    title: "Travel Grants & Awards",
    description:
      "Eligibility for travel grants and recognition awards for junior and senior members",
  },
  {
    icon: BookOpen,
    title: "Educational Material",
    description: "Access to webinars and monthly lectures posted online",
  },
  {
    icon: FileText,
    title: "Job Board",
    description: "Post and access job opportunities shared with the membership",
  },
];

export function MembershipCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20 text-white">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary-600 opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Join the IAMA Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100 leading-relaxed">
            Become part of a thriving network of Iranian American medical
            professionals dedicated to advancing healthcare and supporting one
            another.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-start gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-primary-100">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/membership"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary-800 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl"
          >
            View Membership Plans
          </Link>
          <p className="mt-4 text-sm text-primary-200">
            Pre-residency membership is free — annual dues start at just $50
          </p>
        </div>
      </div>
    </section>
  );
}
