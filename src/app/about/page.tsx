import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About IAMA",
  description:
    "Learn about the Iranian American Medical Association — our mission, vision, leadership, and history of advancing healthcare excellence.",
};

const leadership = [
  {
    name: "Dr. Reza Ahmadi",
    title: "President",
    institution: "UCLA Medical Center",
    specialty: "Cardiology",
  },
  {
    name: "Dr. Sara Mohammadi",
    title: "Vice President",
    institution: "Johns Hopkins Hospital",
    specialty: "Oncology",
  },
  {
    name: "Dr. Kaveh Nasseri",
    title: "Secretary General",
    institution: "Mayo Clinic",
    specialty: "Neurology",
  },
  {
    name: "Dr. Mina Karimi",
    title: "Treasurer",
    institution: "Stanford Health Care",
    specialty: "Internal Medicine",
  },
  {
    name: "Dr. Amir Hosseini",
    title: "Chair, Education Committee",
    institution: "Cleveland Clinic",
    specialty: "Surgery",
  },
  {
    name: "Dr. Leila Tehrani",
    title: "Chair, Research Committee",
    institution: "Cedars-Sinai Medical Center",
    specialty: "Pathology",
  },
];

const milestones = [
  {
    year: "1995",
    event: "IAMA founded by a group of Iranian American physicians in Los Angeles",
  },
  {
    year: "2000",
    event: "First Annual Congress held in Beverly Hills with 150 attendees",
  },
  {
    year: "2005",
    event: "Membership exceeds 1,000; first international chapter established",
  },
  {
    year: "2010",
    event: "Launch of CME accreditation program and quarterly journal",
  },
  {
    year: "2015",
    event: "Partnership with major academic medical centers for research grants",
  },
  {
    year: "2020",
    event: "Transition to hybrid events; member-led COVID-19 response initiative",
  },
  {
    year: "2024",
    event: "3,500+ active members across 25 chapters and 12 countries",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="About IAMA"
          subtitle="Dedicated to advancing healthcare excellence through education, advocacy, and community since 1995."
          breadcrumbs={[{ label: "About" }]}
        />

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "To advance the practice of medicine, promote health education, and foster professional development among Iranian American medical professionals and their communities.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "A world where Iranian American physicians lead in clinical excellence, groundbreaking research, and compassionate patient care, bridging cultures and advancing global health.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  text: "Excellence, integrity, collaboration, cultural heritage, service, and innovation guide every aspect of our organization and programs.",
                },
                {
                  icon: Award,
                  title: "Our Impact",
                  text: "With over 3,500 members, 25 chapters, and 40+ annual events, IAMA is the premier professional organization for Iranian American medical professionals.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-lg font-semibold text-secondary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-secondary">
                Our Leadership
              </h2>
              <p className="mt-3 text-lg text-muted">
                Dedicated professionals guiding IAMA&apos;s mission forward.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((person) => (
                <Card key={person.name} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-200 text-primary-700 text-2xl font-bold">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-secondary">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {person.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {person.institution} &middot; {person.specialty}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section id="history" className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-secondary">Our History</h2>
              <p className="mt-3 text-lg text-muted">
                Three decades of advancing healthcare excellence.
              </p>
            </div>

            <div className="relative mx-auto max-w-3xl">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-100 sm:left-1/2 sm:-translate-x-px" />

              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start gap-4 sm:gap-8 ${
                      i % 2 === 0
                        ? "sm:flex-row-reverse sm:text-right"
                        : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-white sm:left-1/2" />

                    {/* Content */}
                    <div className="ml-10 flex-1 sm:ml-0 sm:w-1/2">
                      <span className="text-sm font-bold text-primary">
                        {milestone.year}
                      </span>
                      <p className="mt-1 text-sm text-muted leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden flex-1 sm:block sm:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-3xl font-bold text-secondary">Contact Us</h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Have questions about IAMA? We&apos;d love to hear from you. Reach
              out to our team and we&apos;ll get back to you within 48 hours.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-secondary">Email</p>
                <a
                  href="mailto:info@iama.org"
                  className="mt-1 text-sm text-primary hover:text-primary-dark"
                >
                  info@iama.org
                </a>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-secondary">Phone</p>
                <a
                  href="tel:+13105551234"
                  className="mt-1 text-sm text-primary hover:text-primary-dark"
                >
                  (310) 555-1234
                </a>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-secondary">Address</p>
                <p className="mt-1 text-sm text-muted">
                  P.O. Box 1234
                  <br />
                  Beverly Hills, CA 90210
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
