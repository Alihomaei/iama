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
    focus: "Young Professionals & Early-Career Physicians",
    blurb:
      "JAVAAN — which means 'youth' in Persian — is IAMA's section for early-career physicians, including those within the first ten years of completing residency or fellowship. JAVAAN members access dedicated mentorship, leadership development tracks, and a vibrant peer network across the country. The section is committed to ensuring the next generation of Iranian American physicians are equipped to lead and innovate in medicine.",
    lead: {
      name: "Dr. Dina Rahimi",
      title: "MD — Family Medicine, Year 3 Attending, Northwestern Medicine",
    },
    activities: [
      {
        title: "JAVAAN Leadership Academy",
        description:
          "A competitive six-month program pairing selected early-career physicians with senior IAMA leaders for structured mentorship and a capstone leadership project.",
      },
      {
        title: "Annual Young Physicians Symposium",
        description:
          "A national one-day virtual conference exclusively for JAVAAN members, featuring career panels, wellness workshops, and a networking mixer.",
      },
      {
        title: "Monthly Career Coffee Chats",
        description:
          "Informal 45-minute virtual sessions where early-career members connect with a featured senior physician from a different specialty.",
      },
    ],
    email: "javaan@iama.org",
  },
  {
    slug: "psychiatry",
    name: "Psychiatry",
    focus: "Mental Health, Psychiatry & Behavioral Medicine",
    blurb:
      "The Psychiatry Section brings together Iranian American psychiatrists, psychologists, and mental health professionals to advance culturally competent mental healthcare for Iranian and Iranian American communities. The section advocates for reducing stigma, increasing access to care, and training the next generation of culturally sensitive mental health providers.",
    lead: {
      name: "Dr. Azadeh Modarresi",
      title: "MD — Psychiatry & Psychoanalysis, Columbia University Medical Center",
    },
    activities: [
      {
        title: "Cultural Competency in Psychiatry Workshop",
        description:
          "An annual CME workshop on culturally adapted therapeutic approaches for patients of Middle Eastern and Iranian descent.",
      },
      {
        title: "Stigma Reduction Community Campaign",
        description:
          "An outreach campaign in partnership with Persian-language media to normalize mental health care in Iranian American communities.",
      },
      {
        title: "Psychiatric Residency Mentorship",
        description:
          "A mentorship program connecting Iranian American medical students and residents interested in psychiatry with attending psychiatrists.",
      },
    ],
    email: "psychiatry@iama.org",
  },
  {
    slug: "susma",
    name: "SUSMA",
    focus: "Medical Students & Residents",
    blurb:
      "SUSMA — the Student and Resident Section of IAMA — is the home for Iranian American medical students, interns, and residents across the United States. SUSMA provides academic support, USMLE resources, match preparation guidance, and a national community for those in training. The section collaborates closely with JAVAAN to ensure a smooth transition into early-career practice.",
    lead: {
      name: "Dr. Arash Maddahi",
      title: "MD/PhD Candidate — Internal Medicine Resident, Johns Hopkins Hospital",
    },
    activities: [
      {
        title: "Match Day Preparation Bootcamp",
        description:
          "An intensive virtual bootcamp each fall to help medical students optimize their residency applications, personal statements, and interview skills.",
      },
      {
        title: "USMLE Study Group Network",
        description:
          "A nationwide virtual peer study group network for Step 1, Step 2, and Step 3 preparation, moderated by senior residents.",
      },
      {
        title: "Annual Research Poster Competition",
        description:
          "A national competition for SUSMA members to present original research, case reports, and quality improvement projects, with winners recognized at the Annual Meeting.",
      },
    ],
    email: "susma@iama.org",
  },
  {
    slug: "dental",
    name: "Dental",
    focus: "Dentistry & Oral Health",
    blurb:
      "The Dental Section unites Iranian American dentists, oral surgeons, orthodontists, and dental specialists across the United States. The section promotes excellence in oral healthcare, advocates for the integration of dental and systemic medicine, and fosters connections between dentists and physician members of IAMA to advance whole-patient care models.",
    lead: {
      name: "Dr. Shahrzad Kiani",
      title: "DDS, MS — Periodontics & Implantology, University of Michigan School of Dentistry",
    },
    activities: [
      {
        title: "Oral-Systemic Health Symposium",
        description:
          "An annual continuing education event exploring the connections between oral health and conditions such as diabetes, cardiovascular disease, and pregnancy complications.",
      },
      {
        title: "Community Dental Outreach Day",
        description:
          "Volunteer dental clinics providing free oral health screenings and education to underserved Iranian and immigrant communities.",
      },
      {
        title: "Dental Student Mentorship Circle",
        description:
          "A mentorship program connecting Iranian American dental students with licensed practitioners for career guidance and specialty exploration.",
      },
    ],
    email: "dental@iama.org",
  },
];

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
