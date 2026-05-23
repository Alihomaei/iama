import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  BookOpen,
  Award,
  Mic2,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "30th Annual Meeting 2026 | IAMA Events",
  description:
    "Join the IAMA 30th Annual Meeting at the Kimpton Hotel Monaco in Washington, D.C., May 23–25, 2026 — CME, networking, the Gala Dinner, and the abstract competition.",
};

const tracks = [
  {
    title: "Clinical Excellence",
    icon: BookOpen,
    color: "bg-primary-50 text-primary",
    sessions: [
      "Advances in Cardiovascular Risk Stratification",
      "Oncology Immunotherapy: 2026 Updates",
      "Neurological Emergencies in the Modern ICU",
      "Endocrinology Case Conference",
    ],
  },
  {
    title: "Health Policy & Advocacy",
    icon: Mic2,
    color: "bg-amber-50 text-amber-700",
    sessions: [
      "Physician Reimbursement & Prior Authorization Reform",
      "Immigration Policy and the Physician Workforce",
      "Healthcare Equity in Underserved Communities",
      "Advocacy Skills Workshop",
    ],
  },
  {
    title: "Research & Innovation",
    icon: Award,
    color: "bg-blue-50 text-blue-700",
    sessions: [
      "AI Diagnostics: Promise and Pitfalls",
      "Translational Research Panel",
      "Resident & Student Poster Presentations",
      "Innovation Pitch Competition",
    ],
  },
  {
    title: "Leadership & Wellness",
    icon: Users,
    color: "bg-green-50 text-green-700",
    sessions: [
      "Physician Burnout Prevention Strategies",
      "Executive Leadership for Clinicians",
      "Work-Life Integration in Academic Medicine",
      "JAVAAN Young Physicians Forum",
    ],
  },
];

const schedule = [
  {
    day: "Saturday, May 23",
    label: "Opening Day",
    items: [
      { time: "12:00 PM – 5:00 PM", activity: "Registration & Check-In" },
      { time: "2:00 PM – 4:30 PM", activity: "Pre-Conference Workshops (optional, additional registration)" },
      { time: "6:00 PM – 9:00 PM", activity: "Welcome Reception & Opening Keynote" },
    ],
  },
  {
    day: "Sunday, May 24",
    label: "Main Program",
    items: [
      { time: "7:30 AM – 8:30 AM", activity: "Breakfast & Networking" },
      { time: "8:30 AM – 12:00 PM", activity: "Plenary Sessions & Morning CME Tracks" },
      { time: "12:00 PM – 1:30 PM", activity: "Lunch with Exhibitors" },
      { time: "1:30 PM – 5:30 PM", activity: "Afternoon CME Tracks & Poster Presentations" },
      { time: "7:00 PM – 11:00 PM", activity: "Annual Gala & Awards Ceremony" },
    ],
  },
  {
    day: "Monday, May 25",
    label: "Closing Day",
    items: [
      { time: "8:00 AM – 9:00 AM", activity: "Morning Coffee & Networking" },
      { time: "9:00 AM – 12:00 PM", activity: "Leadership Forum & Business Meeting" },
      { time: "12:00 PM – 1:30 PM", activity: "Closing Luncheon & Resident Award Presentations" },
      { time: "1:30 PM – 3:00 PM", activity: "Optional Cultural Excursion (National Mall)" },
    ],
  },
];

export default function AnnualMeetingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="IAMA 30th Annual Meeting"
          subtitle="Three days of clinical excellence, networking, and celebration in the nation's capital, May 23–25, 2026."
          breadcrumbs={[
            { label: "Events", href: "/events" },
            { label: "Annual Meeting" },
          ]}
        />

        {/* Quick-glance info bar */}
        <section className="py-8 bg-gray-50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <strong className="text-secondary">May 23–25, 2026</strong>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <strong className="text-secondary">
                  Kimpton Hotel Monaco, Washington, D.C.
                </strong>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <strong className="text-secondary">AMA-CME Credits</strong>
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <strong className="text-secondary">Gala Dinner: Sun, May 24</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-secondary">About the Annual Meeting</h2>
                <p className="text-muted leading-relaxed">
                  The IAMA Annual Meeting is the association's most significant gathering of the
                  year — bringing together Iranian American physicians, medical students, residents,
                  and allied health professionals from across the United States. Since its
                  inaugural edition in 1993, the Annual Meeting has grown into a national forum for
                  clinical education, peer recognition, policy advocacy, and cultural celebration.
                </p>
                <p className="text-muted leading-relaxed">
                  The 2026 Annual Meeting is held at the Kimpton Hotel Monaco in Washington,
                  D.C., May 23–25, with the Gala Dinner on Sunday, May 24 from 7–11 PM (a
                  separate ticket is required). Attendees can expect keynote speakers,
                  accredited CME sessions, the Awards Gala, and the abstract competition with
                  travel grants for junior members.
                </p>
                <p className="text-muted leading-relaxed">
                  Detailed scheduling, speaker announcements, and hotel reservation links will be
                  published here as they become available. Full program information — including
                  congress sessions, speakers, and the abstract submission portal — is available
                  under the{" "}
                  <Link href="/congress" className="text-primary hover:underline font-medium">
                    Congress
                  </Link>{" "}
                  section.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="default">CME Accredited</Badge>
                  <Badge variant="success">Registration Open</Badge>
                  <Badge variant="warning">Abstract Submissions Due March 1</Badge>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-5 space-y-4">
                    <h3 className="font-semibold text-secondary">Key Dates</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        { label: "Abstract Submission Closes", date: "March 1, 2026" },
                        { label: "Annual Meeting Opens", date: "May 23, 2026" },
                        { label: "Gala Dinner (7–11 PM)", date: "May 24, 2026" },
                        { label: "Annual Meeting Closes", date: "May 25, 2026" },
                        { label: "Hotel Reservations", date: "Kimpton Hotel Monaco" },
                      ].map((item) => (
                        <li key={item.label} className="flex justify-between gap-4">
                          <span className="text-muted">{item.label}</span>
                          <span className="font-medium text-secondary shrink-0">{item.date}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-secondary">Registration & Hotel</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Register online for the 30th Annual Meeting. A discounted room block is
                      available for attendees at the Kimpton Hotel Monaco in Washington, D.C.
                      The Gala Dinner on Sunday, May 24 requires a separate ticket.
                    </p>
                    <Link
                      href="/congress/register"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Go to registration
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Conference Tracks & Highlights
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              The 2026 Annual Meeting features four parallel CME tracks, each curated by a
              specialty committee of IAMA physician-educators.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <Card key={track.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${track.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-secondary">{track.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {track.sessions.map((session) => (
                          <li key={session} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            {session}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Schedule overview */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-2">Schedule Overview</h2>
            <p className="text-muted mb-8 max-w-2xl">
              A preliminary schedule is shown below. Times are subject to change; the final
              program will be published in the{" "}
              <Link href="/congress/schedule" className="text-primary hover:underline font-medium">
                Congress Schedule
              </Link>{" "}
              page.
            </p>
            <div className="space-y-8">
              {schedule.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {day.label}
                    </span>
                    <h3 className="font-semibold text-secondary">{day.day}</h3>
                  </div>
                  <Card>
                    <CardContent className="p-0 divide-y divide-border">
                      {day.items.map((item) => (
                        <div
                          key={item.time}
                          className="flex flex-col sm:flex-row gap-1 sm:gap-6 px-5 py-3"
                        >
                          <span className="text-xs font-medium text-primary w-36 shrink-0 pt-0.5">
                            {item.time}
                          </span>
                          <span className="text-sm text-secondary">{item.activity}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Note about full congress details */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
              <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-secondary">
                Full speaker bios, session descriptions, and the abstract submission portal are
                available in the{" "}
                <Link href="/congress" className="font-medium text-primary hover:underline">
                  Congress section
                </Link>
                . The{" "}
                <Link href="/congress/speakers" className="font-medium text-primary hover:underline">
                  Speakers page
                </Link>{" "}
                and{" "}
                <Link href="/congress/schedule" className="font-medium text-primary hover:underline">
                  Schedule page
                </Link>{" "}
                are updated as confirmations are received.
              </p>
            </div>
          </div>
        </section>

        {/* Register CTA */}
        <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Ready to Register?</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-100 leading-relaxed">
              Reserve your spot for the 30th Annual Meeting and book your room at the
              discounted rate at the Kimpton Hotel Monaco. IAMA members receive discounted
              registration; residents and students qualify for reduced rates.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/congress/register"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-primary hover:bg-primary-50 transition-colors"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Become a Member First
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
