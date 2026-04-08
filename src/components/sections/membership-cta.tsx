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
    icon: BookOpen,
    title: "CME Programs",
    description: "Access accredited continuing medical education courses",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with leading physicians and researchers",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Awards and fellowships for outstanding contributions",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Participate in international health initiatives",
  },
  {
    icon: Ticket,
    title: "Congress Discounts",
    description: "Reduced rates for all IAMA events and conferences",
  },
  {
    icon: FileText,
    title: "Publications",
    description: "Exclusive access to research journals and newsletters",
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
            Student memberships start at just $50/year
          </p>
        </div>
      </div>
    </section>
  );
}
