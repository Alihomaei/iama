export interface ChapterActivity {
  title: string;
  description: string;
}

export interface Chapter {
  slug: string;
  name: string;
  region: string;
  blurb: string;
  chair: {
    name: string;
    title: string;
  };
  memberCount: number;
  email: string;
  activities: ChapterActivity[];
}

export const chapters: Chapter[] = [
  {
    slug: "arizona",
    name: "Arizona",
    region: "Phoenix, Tucson, Scottsdale",
    blurb:
      "The Arizona Chapter serves Iranian American physicians throughout the Phoenix metropolitan area and southern Arizona, fostering professional development and community engagement in one of the fastest-growing healthcare markets in the Southwest.",
    chair: {
      name: "Dr. Farshid Nourbakhsh",
      title: "MD, FACP — Internal Medicine, Mayo Clinic Arizona",
    },
    memberCount: 78,
    email: "arizona@iama.org",
    activities: [
      {
        title: "Annual Desert Medicine Symposium",
        description:
          "A half-day CME event held each spring in Scottsdale, featuring local faculty and networking dinner.",
      },
      {
        title: "Quarterly Mentorship Roundtable",
        description:
          "Small-group sessions pairing established physicians with residents and early-career members.",
      },
      {
        title: "Community Health Fair Partnership",
        description:
          "Collaboration with the Iranian Cultural Center of Arizona to offer free health screenings to the local community.",
      },
    ],
  },
  {
    slug: "california",
    name: "California",
    region: "Los Angeles, San Francisco, San Diego, Sacramento",
    blurb:
      "The California Chapter is the largest IAMA chapter, representing thousands of Iranian American medical professionals across the state. With chapters in Southern and Northern California, members benefit from a rich network of academic medical centers, private practices, and research institutions.",
    chair: {
      name: "Dr. Shirin Mostaghim",
      title: "MD, PhD — Cardiology, UCLA Health",
    },
    memberCount: 412,
    email: "california@iama.org",
    activities: [
      {
        title: "Nowruz Physicians Gala",
        description:
          "An annual spring celebration bringing together Iranian American physicians and their families for an evening of networking and cultural festivities.",
      },
      {
        title: "Advocacy Day at Sacramento",
        description:
          "Annual legislative advocacy trip where chapter members meet with California state legislators on healthcare policy priorities.",
      },
      {
        title: "Resident Research Competition",
        description:
          "An annual competition for medical residents and fellows to present original research, with prizes and mentorship awards.",
      },
    ],
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    region: "Boston, Cambridge, Worcester, Springfield",
    blurb:
      "The Massachusetts Chapter thrives within one of the world's premier biomedical ecosystems. Members are affiliated with Harvard, MGH, Brigham and Women's, Boston Medical Center, and other leading institutions, creating exceptional opportunities for collaboration and professional growth.",
    chair: {
      name: "Dr. Parisa Sadeghi",
      title: "MD, MPH — Infectious Disease, Massachusetts General Hospital",
    },
    memberCount: 134,
    email: "massachusetts@iama.org",
    activities: [
      {
        title: "Boston Medical Grand Rounds Collaboration",
        description:
          "Co-hosted grand rounds with Harvard and Boston University affiliates on topics in global health and health equity.",
      },
      {
        title: "Annual Networking Dinner",
        description:
          "A formal dinner each October bringing together chapter members from across Massachusetts for peer recognition and fellowship.",
      },
      {
        title: "Pre-Medical Mentorship Initiative",
        description:
          "Partnerships with local universities to mentor Iranian American pre-medical students applying to medical school.",
      },
    ],
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    region: "Newark, Jersey City, Edison, Parsippany",
    blurb:
      "The New Jersey Chapter serves a vibrant and rapidly growing community of Iranian American physicians across the Garden State, with strong representation in both academic medical centers affiliated with Rutgers and NYU, and in thriving independent practices.",
    chair: {
      name: "Dr. Kamran Tehrani",
      title: "MD — Gastroenterology, Rutgers New Jersey Medical School",
    },
    memberCount: 96,
    email: "newjersey@iama.org",
    activities: [
      {
        title: "Spring CME Workshop Series",
        description:
          "A three-part workshop series each spring covering practice management, clinical updates, and wellness.",
      },
      {
        title: "Mentoring Medical Students Program",
        description:
          "Pairing Iranian American medical students at Rutgers and NJMS with practicing physician mentors.",
      },
      {
        title: "Community Outreach Health Clinic",
        description:
          "Quarterly free clinic days hosted in collaboration with local mosques and Iranian community centers.",
      },
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    region: "New York City, Long Island, Westchester, Upstate NY",
    blurb:
      "The New York Chapter is one of IAMA's most active chapters, rooted in the dense concentration of world-class hospitals and research institutions across New York City and greater New York State. Members represent every medical specialty and include leading researchers, clinicians, and educators.",
    chair: {
      name: "Dr. Nasrin Afshari",
      title: "MD, FACS — Ophthalmology & Vision Science, NYU Langone Health",
    },
    memberCount: 287,
    email: "newyork@iama.org",
    activities: [
      {
        title: "Annual Persian Night at the Met",
        description:
          "A beloved tradition: an exclusive members-only evening at the Metropolitan Museum of Art coinciding with the Persian art galleries.",
      },
      {
        title: "Healthcare Innovation Summit",
        description:
          "A half-day summit connecting physician members with healthcare startups and venture-backed health tech companies in New York.",
      },
      {
        title: "Inter-Chapter Grand Rounds",
        description:
          "Quarterly virtual grand rounds co-hosted with the New Jersey chapter, covering the latest in multi-disciplinary care.",
      },
    ],
  },
  {
    slug: "ohio",
    name: "Ohio",
    region: "Columbus, Cleveland, Cincinnati, Dayton",
    blurb:
      "The Ohio Chapter serves Iranian American physicians across the Midwest's medical heartland. With world-renowned institutions like Cleveland Clinic and Ohio State Wexner Medical Center, Ohio chapter members are at the forefront of clinical care and translational research.",
    chair: {
      name: "Dr. Mehrdad Jafari",
      title: "MD — Oncology, Cleveland Clinic",
    },
    memberCount: 62,
    email: "ohio@iama.org",
    activities: [
      {
        title: "Midwest IAMA CME Day",
        description:
          "An annual full-day CME conference hosted in Columbus, drawing participants from Ohio and neighboring states.",
      },
      {
        title: "Physician Wellness Retreat",
        description:
          "An annual weekend retreat focused on burnout prevention, mindfulness, and career sustainability.",
      },
      {
        title: "Junior Physician Career Development Series",
        description:
          "A monthly webinar series for residents and early-career members on topics from contract negotiation to building a practice.",
      },
    ],
  },
];

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
