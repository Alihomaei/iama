"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

const trackColors: Record<string, string> = {
  Plenary: "bg-primary-100 text-primary-800",
  Cardiology: "bg-blue-100 text-blue-800",
  Oncology: "bg-purple-100 text-purple-800",
  Surgery: "bg-rose-100 text-rose-800",
  Research: "bg-amber-100 text-amber-800",
  Networking: "bg-green-100 text-green-800",
};

interface Session {
  time: string;
  title: string;
  speaker: string;
  track: string;
  room: string;
}

const schedule: Record<string, Session[]> = {
  "Day 1 — Oct 16": [
    {
      time: "8:00 AM - 9:00 AM",
      title: "Registration & Welcome Breakfast",
      speaker: "",
      track: "Networking",
      room: "Grand Foyer",
    },
    {
      time: "9:00 AM - 10:00 AM",
      title: "Opening Ceremony & Presidential Address",
      speaker: "Dr. Reza Ahmadi, IAMA President",
      track: "Plenary",
      room: "Grand Ballroom",
    },
    {
      time: "10:15 AM - 11:45 AM",
      title: "Keynote: Advances in Precision Medicine",
      speaker: "Dr. Farzaneh Sorond, Northwestern University",
      track: "Plenary",
      room: "Grand Ballroom",
    },
    {
      time: "12:00 PM - 1:30 PM",
      title: "Lunch & Poster Session I",
      speaker: "",
      track: "Research",
      room: "Exhibition Hall",
    },
    {
      time: "1:45 PM - 3:15 PM",
      title: "Panel: Innovations in Cardiovascular Imaging",
      speaker: "Dr. Kaveh Nasseri (Moderator)",
      track: "Cardiology",
      room: "Pacific Room A",
    },
    {
      time: "1:45 PM - 3:15 PM",
      title: "Workshop: Minimally Invasive Surgical Techniques",
      speaker: "Dr. Amir Hosseini",
      track: "Surgery",
      room: "Pacific Room B",
    },
    {
      time: "3:30 PM - 5:00 PM",
      title: "Oral Abstract Presentations — Session I",
      speaker: "Multiple Presenters",
      track: "Research",
      room: "Grand Ballroom",
    },
    {
      time: "6:00 PM - 8:00 PM",
      title: "Welcome Reception & Networking Dinner",
      speaker: "",
      track: "Networking",
      room: "Rooftop Terrace",
    },
  ],
  "Day 2 — Oct 17": [
    {
      time: "7:30 AM - 8:30 AM",
      title: "Morning CME: Updates in Clinical Practice",
      speaker: "Dr. Sara Mohammadi",
      track: "Plenary",
      room: "Grand Ballroom",
    },
    {
      time: "8:45 AM - 10:15 AM",
      title: "Keynote: Immunotherapy Breakthroughs in Oncology",
      speaker: "Dr. Parisa Tehrani, MD Anderson Cancer Center",
      track: "Oncology",
      room: "Grand Ballroom",
    },
    {
      time: "10:30 AM - 12:00 PM",
      title: "Panel: Managing Complex Cardiac Cases",
      speaker: "Dr. Babak Sharifi (Moderator)",
      track: "Cardiology",
      room: "Pacific Room A",
    },
    {
      time: "10:30 AM - 12:00 PM",
      title: "Workshop: AI Applications in Surgical Planning",
      speaker: "Dr. Nima Rezaei, Stanford",
      track: "Surgery",
      room: "Pacific Room B",
    },
    {
      time: "12:00 PM - 1:30 PM",
      title: "Lunch & Poster Session II",
      speaker: "",
      track: "Research",
      room: "Exhibition Hall",
    },
    {
      time: "1:45 PM - 3:15 PM",
      title: "Oral Abstract Presentations — Session II",
      speaker: "Multiple Presenters",
      track: "Research",
      room: "Grand Ballroom",
    },
    {
      time: "3:30 PM - 5:00 PM",
      title: "Young Physicians Forum & Mentorship Session",
      speaker: "IAMA Mentorship Committee",
      track: "Networking",
      room: "Pacific Room A",
    },
    {
      time: "7:00 PM - 10:00 PM",
      title: "Gala Dinner & Awards Ceremony",
      speaker: "",
      track: "Networking",
      room: "Grand Ballroom",
    },
  ],
  "Day 3 — Oct 18": [
    {
      time: "8:00 AM - 9:30 AM",
      title: "Keynote: Global Health Disparities and Action",
      speaker: "Dr. Hossein Gharib, Mayo Clinic",
      track: "Plenary",
      room: "Grand Ballroom",
    },
    {
      time: "9:45 AM - 11:15 AM",
      title: "Panel: Advances in Targeted Cancer Therapies",
      speaker: "Dr. Leila Tehrani (Moderator)",
      track: "Oncology",
      room: "Pacific Room A",
    },
    {
      time: "9:45 AM - 11:15 AM",
      title: "Workshop: Robotic Surgery — Live Case Discussion",
      speaker: "Dr. Mehrdad Ayati",
      track: "Surgery",
      room: "Pacific Room B",
    },
    {
      time: "11:30 AM - 12:30 PM",
      title: "Oral Abstract Presentations — Session III",
      speaker: "Multiple Presenters",
      track: "Research",
      room: "Grand Ballroom",
    },
    {
      time: "12:30 PM - 1:30 PM",
      title: "Closing Lunch & Best Abstract Awards",
      speaker: "IAMA Scientific Committee",
      track: "Plenary",
      room: "Grand Ballroom",
    },
    {
      time: "1:45 PM - 2:30 PM",
      title: "Closing Ceremony & Looking Ahead to 2027",
      speaker: "Dr. Reza Ahmadi",
      track: "Plenary",
      room: "Grand Ballroom",
    },
  ],
};

export default function CongressSchedulePage() {
  const days = Object.keys(schedule);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Congress Schedule"
          subtitle="Three days of cutting-edge medical education, research presentations, and networking."
          breadcrumbs={[
            { label: "Congress", href: "/congress" },
            { label: "Schedule" },
          ]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            {/* Track legend */}
            <div className="mb-8 flex flex-wrap gap-2">
              {Object.entries(trackColors).map(([track, color]) => (
                <span
                  key={track}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
                >
                  {track}
                </span>
              ))}
            </div>

            <Tabs defaultValue={days[0]}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {days.map((day) => (
                  <TabsTrigger key={day} value={day}>
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>

              {days.map((day) => (
                <TabsContent key={day} value={day}>
                  <div className="space-y-3">
                    {schedule[day].map((session, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            {/* Time column */}
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 sm:w-48 sm:shrink-0 sm:flex-col sm:items-start sm:justify-center">
                              <Clock className="h-4 w-4 text-muted sm:hidden" />
                              <span className="text-sm font-medium text-secondary">
                                {session.time}
                              </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-4">
                              <div className="flex flex-wrap items-start gap-2 mb-1">
                                <h3 className="font-semibold text-secondary">
                                  {session.title}
                                </h3>
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                    trackColors[session.track] ?? "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {session.track}
                                </span>
                              </div>
                              {session.speaker && (
                                <p className="text-sm text-muted">
                                  {session.speaker}
                                </p>
                              )}
                              <div className="mt-2 flex items-center gap-1 text-xs text-muted">
                                <MapPin className="h-3 w-3" />
                                {session.room}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
