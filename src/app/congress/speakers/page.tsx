import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Congress Speakers",
  description:
    "Meet the keynote speakers and session leaders at the IAMA Annual Congress 2026.",
};

const speakers = [
  {
    name: "Dr. Farzaneh Sorond",
    title: "Professor of Neurology",
    institution: "Northwestern University",
    bio: "Leading researcher in cerebrovascular physiology and precision medicine with over 150 peer-reviewed publications.",
    sessions: ["Keynote: Advances in Precision Medicine"],
    keynote: true,
  },
  {
    name: "Dr. Parisa Tehrani",
    title: "Professor of Oncology",
    institution: "MD Anderson Cancer Center",
    bio: "Pioneer in immunotherapy research for solid tumors, recipient of the NCI Outstanding Investigator Award.",
    sessions: ["Keynote: Immunotherapy Breakthroughs in Oncology"],
    keynote: true,
  },
  {
    name: "Dr. Hossein Gharib",
    title: "Professor of Medicine",
    institution: "Mayo Clinic",
    bio: "Internationally recognized endocrinologist and global health advocate with decades of leadership in medical education.",
    sessions: ["Keynote: Global Health Disparities and Action"],
    keynote: true,
  },
  {
    name: "Dr. Reza Ahmadi",
    title: "IAMA President, Chief of Cardiology",
    institution: "UCLA Medical Center",
    bio: "Board-certified cardiologist leading IAMA's mission to advance healthcare excellence among Iranian American physicians.",
    sessions: ["Opening Ceremony", "Closing Ceremony"],
    keynote: false,
  },
  {
    name: "Dr. Sara Mohammadi",
    title: "Professor of Oncology",
    institution: "Johns Hopkins Hospital",
    bio: "Expert in molecular oncology and personalized cancer treatment strategies.",
    sessions: ["Morning CME: Updates in Clinical Practice"],
    keynote: false,
  },
  {
    name: "Dr. Kaveh Nasseri",
    title: "Director of Cardiovascular Imaging",
    institution: "Mayo Clinic",
    bio: "Specialist in advanced cardiac imaging modalities and AI-assisted diagnostics.",
    sessions: ["Panel: Innovations in Cardiovascular Imaging"],
    keynote: false,
  },
  {
    name: "Dr. Amir Hosseini",
    title: "Chief of Minimally Invasive Surgery",
    institution: "Cleveland Clinic",
    bio: "Pioneer in robotic-assisted surgical techniques with over 3,000 procedures performed.",
    sessions: ["Workshop: Minimally Invasive Surgical Techniques"],
    keynote: false,
  },
  {
    name: "Dr. Leila Tehrani",
    title: "Chair, Research Committee",
    institution: "Cedars-Sinai Medical Center",
    bio: "Leading pathologist focused on translational research in targeted cancer therapies.",
    sessions: ["Panel: Advances in Targeted Cancer Therapies"],
    keynote: false,
  },
  {
    name: "Dr. Babak Sharifi",
    title: "Associate Professor of Cardiology",
    institution: "Stanford Health Care",
    bio: "Interventional cardiologist specializing in complex percutaneous coronary interventions.",
    sessions: ["Panel: Managing Complex Cardiac Cases"],
    keynote: false,
  },
  {
    name: "Dr. Nima Rezaei",
    title: "Assistant Professor of Surgery",
    institution: "Stanford University",
    bio: "Research focuses on AI and machine learning applications in surgical planning and outcomes prediction.",
    sessions: ["Workshop: AI Applications in Surgical Planning"],
    keynote: false,
  },
  {
    name: "Dr. Mehrdad Ayati",
    title: "Professor of Urology",
    institution: "USC Keck School of Medicine",
    bio: "Expert in robotic urologic surgery and innovative minimally invasive approaches.",
    sessions: ["Workshop: Robotic Surgery — Live Case Discussion"],
    keynote: false,
  },
  {
    name: "Dr. Mina Karimi",
    title: "IAMA Treasurer",
    institution: "Stanford Health Care",
    bio: "Internal medicine specialist dedicated to health equity and community engagement in medicine.",
    sessions: ["Young Physicians Forum & Mentorship Session"],
    keynote: false,
  },
];

export default function CongressSpeakersPage() {
  const keynotes = speakers.filter((s) => s.keynote);
  const sessionSpeakers = speakers.filter((s) => !s.keynote);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Congress Speakers"
          subtitle="Distinguished physicians and researchers presenting at the IAMA Annual Congress 2026."
          breadcrumbs={[
            { label: "Congress", href: "/congress" },
            { label: "Speakers" },
          ]}
        />

        {/* Keynote Speakers */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-secondary">
              Keynote Speakers
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {keynotes.map((speaker) => (
                <Card key={speaker.name} className="overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-300 text-primary-800 text-3xl font-bold">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <Badge className="mb-2">Keynote</Badge>
                    <h3 className="text-lg font-semibold text-secondary">
                      {speaker.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {speaker.title}
                    </p>
                    <p className="text-sm text-muted">{speaker.institution}</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {speaker.bio}
                    </p>
                    <div className="mt-3">
                      {speaker.sessions.map((session) => (
                        <p
                          key={session}
                          className="text-xs text-primary-700 font-medium"
                        >
                          {session}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Session Speakers */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-secondary">
              Session Speakers & Moderators
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sessionSpeakers.map((speaker) => (
                <Card key={speaker.name}>
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xl font-bold">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <h3 className="font-semibold text-secondary">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-primary">{speaker.title}</p>
                    <p className="text-sm text-muted">{speaker.institution}</p>
                    <p className="mt-2 text-xs text-muted leading-relaxed">
                      {speaker.bio}
                    </p>
                    <div className="mt-3 space-y-1">
                      {speaker.sessions.map((session) => (
                        <p
                          key={session}
                          className="text-xs text-primary-700 font-medium"
                        >
                          {session}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
