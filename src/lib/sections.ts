export interface SectionActivity {
  title: string;
  description: string;
}

export interface Section {
  slug: string;
  name: string;
  focus: string;
  blurb: string;
  lead: {
    name: string;
    title: string;
  };
  activities: SectionActivity[];
  email: string;
}

export const sections: Section[] = [
  {
    slug: "javaan",
    name: "JAVAAN (Juniors)",
    focus: "Junior & Early-Career Members",
    blurb:
      "JAVAAN — which means 'youth' in Persian — is IAMA's section for junior members. Junior members connect with their peers, voice their needs, and network to identify their interests and the medical areas they would like to focus on. The section is committed to supporting the next generation of Iranian American physicians and trainees. Vice President: Dr. Alireza Farazpey, DDS.",
    lead: {
      name: "Dr. Niloufar Salehi",
      title: "MD — President, JAVAAN (Junior Members)",
    },
    activities: [
      {
        title: "Peer Networking",
        description:
          "Opportunities for junior members to connect with peers and build a national community within IAMA.",
      },
      {
        title: "Mentorship & Guidance",
        description:
          "Connecting junior members with experienced IAMA physicians for career guidance through the Mentorship Program.",
      },
      {
        title: "Career Exploration",
        description:
          "Helping members identify their interests and the medical areas they would like to focus on.",
      },
    ],
    email: "iama@iama.org",
  },
  {
    slug: "psychiatry",
    name: "Psychiatry (SIPNA)",
    focus: "Mental Health & Psychiatry",
    blurb:
      "SIPNA — the Society of Iranian Psychiatrists of North America — is a professional, non-profit, non-political organization founded in 1982 by Dr. Iraj Siassi. As IAMA's Psychiatry section, SIPNA promotes, generates, and disseminates scholarly information and research on psychiatry and related fields among mental health professionals of Iranian origin. Learn more at sipna.net.",
    lead: {
      name: "Dr. Morteza Nadjafi",
      title: "MD — President, SIPNA",
    },
    activities: [
      {
        title: "Scholarly Research & Dissemination",
        description:
          "Promoting, generating, and sharing research on psychiatry and related fields among mental health professionals of Iranian origin.",
      },
      {
        title: "Professional Network",
        description:
          "Connecting Iranian psychiatrists and mental health professionals across North America.",
      },
      {
        title: "Continuing Education",
        description:
          "Educational programming and collaboration in psychiatry and behavioral medicine.",
      },
    ],
    email: "iama@iama.org",
  },
  {
    slug: "susma",
    name: "SUSMA",
    focus: "Shiraz University School of Medicine Alumni",
    blurb:
      "SUSMA is the Shiraz University School of Medicine Alumni section of IAMA. Graduates of Shiraz Medical School formed a society spanning members across 32 states. At its height the alumni network counted up to 700 members, gathering at yearly conferences for networking and continuing medical education (CME). As an IAMA section, SUSMA continues to connect Shiraz Medical School alumni and support their professional community in North America.",
    lead: {
      name: "Dr. Jasmin Moshirpur",
      title: "MD — President, SUSMA",
    },
    activities: [
      {
        title: "Annual Alumni Conference",
        description:
          "A yearly gathering of Shiraz Medical School alumni for networking and continuing medical education (CME).",
      },
      {
        title: "Nationwide Alumni Network",
        description:
          "Connecting graduates across more than 32 states to maintain professional and personal ties.",
      },
      {
        title: "Continuing Medical Education",
        description:
          "CME programming offered through alumni conferences and IAMA's scientific activities.",
      },
    ],
    email: "iama@iama.org",
  },
  {
    slug: "dental",
    name: "Dental",
    focus: "Dentistry & Oral Health",
    blurb:
      "The Dental Section unites Iranian American dentists, oral surgeons, orthodontists, and dental specialists across the United States. As an IAMA section, it promotes excellence in oral healthcare and fosters connections between dental and physician members of IAMA to advance whole-patient care.",
    lead: {
      name: "Dr. Padideh Alizadeh",
      title: "DMD — Dental Division Chair",
    },
    activities: [
      {
        title: "Oral-Systemic Health Education",
        description:
          "Continuing education connecting oral health with overall medical care and chronic disease.",
      },
      {
        title: "Community Outreach",
        description:
          "Oral health screenings and education for underserved communities.",
      },
      {
        title: "Professional Network",
        description:
          "Connecting dental professionals with physician members within the IAMA community.",
      },
    ],
    email: "iama@iama.org",
  },
];

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
