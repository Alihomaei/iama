import type { Metadata } from "next";
import Image from "next/image";
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
    name: "Dr. Freidoon Ghazi",
    title: "President",
    institution: "MD",
    specialty: "Executive Committee",
    photo: "/images/team/ghazi.jpg",
  },
  {
    name: "Dr. Payam Torrei",
    title: "Vice President",
    institution: "MD",
    specialty: "Executive Committee",
    photo: "/images/team/torrei.jpg",
  },
  {
    name: "Dr. Mohammad Sarraf",
    title: "Treasurer",
    institution: "MD",
    specialty: "Executive Committee",
    photo: "/images/team/sarraf.jpg",
  },
  {
    name: "Dr. Hale Yarmohammadi",
    title: "Corresponding Secretary",
    institution: "MD, MPH",
    specialty: "Executive Committee",
    photo: "/images/team/yarmohammadi.jpg",
  },
  {
    name: "Dr. Hossein Ali Shahidi",
    title: "Membership Committee Chair",
    institution: "MD",
    specialty: "Membership Committee",
    photo: "/images/team/shahidi.jpg",
  },
  {
    name: "Dr. Nooshin Hashemzadeh",
    title: "Scientific Chair",
    institution: "PhD",
    specialty: "Scientific Committee",
    photo: "/images/team/hashemzadeh.jpg",
  },
  {
    name: "Dr. Padideh Alizadeh",
    title: "Dental Division Chair",
    institution: "DMD",
    specialty: "Dental Section",
    photo: "/images/team/alizadeh.jpg",
  },
  {
    name: "Dr. Reza Movahed",
    title: "Arizona Chapter President",
    institution: "MD, PhD",
    specialty: "Arizona Chapter",
    photo: "/images/team/movahed.jpg",
  },
  {
    name: "Dr. Amir Quorbani",
    title: "California Chapter President",
    institution: "MD",
    specialty: "California Chapter",
    photo: "/images/team/quorbani.jpg",
  },
  {
    name: "Dr. Danesh Mazloomdoost",
    title: "Member at Large",
    institution: "MD",
    specialty: "Board of Directors",
    photo: "/images/team/mazloomdoost.jpg",
  },
  {
    name: "Dr. Arash Dabestani",
    title: "Advisor",
    institution: "PharmD",
    specialty: "Advisory",
    photo: "/images/team/dabestani.jpg",
  },
  {
    name: "Dr. Sohrab Fallahi",
    title: "Advisor",
    institution: "MD",
    specialty: "Advisory",
    photo: "/images/team/fallahi.jpg",
  },
];

const milestones = [
  {
    year: "1982",
    event:
      "The Society of Iranian Psychiatrists of North America (SIPNA) is founded by Dr. Iraj Siassi — later joining IAMA as its Psychiatry section.",
  },
  {
    year: "1993",
    event:
      "IAMA is founded by a group of seven Iranian American physicians as a scientific, non-profit, non-religious, and non-political professional association.",
  },
  {
    year: "2003",
    event:
      "Following the Bam earthquake, IAMA helps establish the IAMA Medical Center in Bam, Iran, supporting relief and care.",
  },
  {
    year: "Today",
    event:
      "IAMA serves members through six state chapters and four specialty sections — Javaan, SIPNA, SUSMA, and Dental — hosting annual conferences with AMA-CME credits.",
  },
  {
    year: "2026",
    event:
      "The 30th IAMA Annual Meeting convenes in Washington, D.C. at the Kimpton Hotel Monaco, May 23–25.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="About IAMA"
          subtitle="A scientific, non-profit, non-religious, and non-political association advancing education, health, and community among Iranian American medical professionals since 1993."
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
                  text: "IAMA is a 501(c)(3) non-profit organization established for charitable and educational purposes — providing financial assistance to medical students and healthcare support to underserved communities.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "To unite Iranian medical professionals across the United States so they can support one another and advance education, health, communication, and medical research.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  text: "IAMA is a scientific, non-profit, non-religious, non-political, and professional association — open to all and driven by service.",
                },
                {
                  icon: Award,
                  title: "Our Impact",
                  text: "Six state chapters, four specialty sections, three decades of annual CME conferences, and the IAMA Medical Center established in Bam, Iran.",
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
                Our Team
              </h2>
              <p className="mt-3 text-lg text-muted">
                The Board of Directors guiding IAMA&apos;s mission forward.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leadership.map((person) => (
                <div
                  key={person.name}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-primary-100 shadow-sm"
                >
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient + info overlay that expands on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-semibold leading-snug">{person.name}</h3>
                    <p className="text-sm font-medium text-primary-light">
                      {person.title}
                    </p>
                    <p className="mt-1 text-xs text-white/80 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                      {person.institution} &middot; {person.specialty}
                    </p>
                  </div>
                </div>
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
                  href="mailto:iama@iama.org"
                  className="mt-1 text-sm text-primary hover:text-primary-dark"
                >
                  iama@iama.org
                </a>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-secondary">Phone</p>
                <a
                  href="tel:+19735958888"
                  className="mt-1 text-sm text-primary hover:text-primary-dark"
                >
                  (973) 595-8888
                </a>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold text-secondary">Address</p>
                <p className="mt-1 text-sm text-muted">
                  P.O. Box 8218
                  <br />
                  Haledon, NJ 07538
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
