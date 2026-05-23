// Real agenda for the 30th IAMA Annual Meeting.
//
// Faithful transcription of the printed program. Hand-authored, runs in both the
// browser and on the server (no Node-only APIs). All IDs are stable ASCII
// kebab-case slugs — see types.ts for why they must never be renamed.
//
// DEDUP NOTE: one Person object per real human, reused everywhere.
//  - "Reza Movahed" / "Mohammed Reza Movahed" / "Reza Movahed, MD, PhD, FSCAI…"
//    all collapse into a single `reza-movahed`.
//  - "Danesh Mazloomdoost" (Neurotech moderator + speaker + Med/Tech presenter)
//    is one `danesh-mazloomdoost`, kept SEPARATE from `donna-mazloomdoost`.
//  - "Farin Kamangar" (Medicine + Dermatology moderator) is one person.
//  - "Ehsan Vaghefi" (Shark-Tank + Med/Tech moderator) is one person.
//  - "Ali Sadoughi" and "Shirin Sadoughi" are distinct people.

import type { Day, EventInfo, Person, Session, Talk } from "./types";

export const EVENT: EventInfo = {
  name: "30th IAMA Annual Meeting",
  shortName: "IAMA 2026",
  venue: "Kimpton Hotel Monaco Washington DC",
  city: "Washington, DC",
  timeZone: "America/New_York",
  utcOffset: "-04:00",
  startDate: "2026-05-22",
  endDate: "2026-05-25",
};

export const days: Day[] = [
  {
    id: "fri-may-22",
    date: "2026-05-22",
    weekday: "Friday",
    label: "Friday, May 22",
  },
  {
    id: "sat-may-23",
    date: "2026-05-23",
    weekday: "Saturday",
    label: "Saturday, May 23",
  },
  {
    id: "sun-may-24",
    date: "2026-05-24",
    weekday: "Sunday",
    label: "Sunday, May 24",
  },
  {
    id: "mon-may-25",
    date: "2026-05-25",
    weekday: "Monday",
    label: "Monday, May 25",
  },
];

export const people: Person[] = [
  // ---- Opening / Welcome ----
  {
    id: "irum-khan",
    name: "Irum Khan",
    credentials: "Pharm D.",
  },
  {
    id: "freidoon-ghazi",
    name: "Freidoon Ghazi",
    credentials: "MD",
  },
  {
    id: "jasmin-moshirpur",
    name: "Jasmin Moshirpur",
    credentials: "MD",
  },

  // ---- Surgery panel ----
  {
    id: "alireza-shamshirsaz",
    name: "Alireza Shamshirsaz",
    credentials: "MD",
  },
  {
    id: "donna-mazloomdoost",
    name: "Donna Mazloomdoost",
    credentials: "MD",
  },
  {
    id: "shieva-ghofrany",
    name: "Shieva Ghofrany",
    credentials: "MD, FACOG",
    location: "Stamford, CT",
  },
  {
    id: "sahar-khoshravesh",
    name: "Sahar Khoshravesh",
    credentials: "MD",
    role: "Post-doc Fellow",
    affiliation: "University of Maryland",
  },
  {
    id: "omeed-moaven",
    name: "Omeed Moaven",
    credentials: "MD",
    role: "Associate Professor, HPB/GI Surgical Oncology",
    affiliation: "LSU",
  },
  {
    id: "saina-attaran",
    name: "Saina Attaran",
    credentials: "MD, MRCS, FRCS",
    location: "Gilbert, AZ",
  },
  {
    id: "niloufar-salehi",
    name: "Niloufar Salehi",
    credentials: "MD",
    role: "Post-doc Fellow",
    affiliation: "Cornell",
  },
  {
    id: "babak-givi",
    name: "Babak Givi",
    credentials: "MD",
    role: "Head and Neck Surgeon",
    affiliation: "Memorial Sloan Kettering Cancer Center",
    location: "New York, NY",
  },

  // ---- Cardiovascular panel ----
  {
    id: "hirad-yarmohammadi",
    name: "Hirad Yarmohammadi",
    credentials: "MD, MPH",
  },
  {
    id: "reza-movahed",
    name: "Reza Movahed",
    credentials: "MD, PhD, FSCAI, FACC, FACP, FCCP",
    role: "Clinical Professor of Medicine",
    affiliation: "University of Arizona",
    location: "Tucson, AZ",
  },
  {
    id: "mehdi-shishehbor",
    name: "Mehdi Shishehbor",
    credentials: "DO, MPH, PhD",
    role: "Interventional Cardiology",
    location: "Cleveland, OH",
  },
  {
    id: "viona-tavakkoli",
    name: "Viona Tavakkoli",
    credentials: "MD",
    role: "Pre-med",
    affiliation: "NYU",
  },
  {
    id: "reza-arsanjani",
    name: "Reza Arsanjani",
    credentials: "MD",
    role: "Chair of Cardiovascular Imaging and Stress Testing",
    affiliation: "Mayo Clinic Arizona",
  },
  {
    id: "misha-moazzemi",
    name: "Misha Moazzemi",
    role: "Pre-med",
    affiliation: "NYU",
  },
  {
    id: "nersi-nazari",
    name: "Nersi Nazari",
    credentials: "PhD",
    role: "Founder, CEO",
    affiliation: "Vital Connect",
    location: "San Jose, CA",
  },
  {
    id: "roxana-mehran",
    name: "Roxana Mehran",
    credentials: "MD, FACC, FACP, FCCP, FESC",
    role: "Professor of Medicine; Director of Interventional Cardiovascular Research and Clinical Trials",
    affiliation: "Mount Sinai",
    location: "New York, NY",
  },

  // ---- Lunch (Saturday) ----
  {
    id: "payam-shakouri",
    name: "Payam Shakouri",
    credentials: "MD",
  },

  // ---- Medicine panel (Saturday) ----
  {
    id: "farin-kamangar",
    name: "Farin Kamangar",
    credentials: "MD, PhD",
  },
  {
    id: "sebastian-lighvani",
    name: "Sebastian Lighvani",
    credentials: "MD",
  },
  {
    id: "alidad-arabshahi",
    name: "Alidad Arabshahi",
    credentials: "MD",
  },
  {
    id: "shaun-shayegan",
    name: "Shaun Shayegan",
    credentials: "MD",
  },
  {
    id: "ali-sadoughi",
    name: "Ali Sadoughi",
    credentials: "MD, DAABIP",
    role: "Interventional Pulmonologist",
    affiliation: "Montefiore Medical Center — Albert Einstein College of Medicine",
    location: "New York, NY",
  },
  {
    id: "jalil-ahari",
    name: "Jalil Ahari",
    credentials: "MD",
    role: "Program Director, Pulmonary Critical Care Medicine",
    affiliation: "George Washington University",
  },
  {
    id: "taraneh-rezaee",
    name: "Taraneh Rezaee",
    credentials: "PhD",
    role: "Assistant Professor",
    affiliation: "CUNY",
    location: "New York, NY",
  },
  {
    id: "dara-koozekanani",
    name: "Dara Koozekanani",
    credentials: "MD",
    role: "Assistant Professor of Ophthalmology and Visual Neurosciences",
    affiliation: "University of Minnesota",
    location: "Minneapolis, MN",
  },
  {
    id: "amirfarbod-yazdanyar",
    name: "AmirFarbod Yazdanyar",
    credentials: "MD",
    role: "Clinical Assistant Professor of Ophthalmology",
    location: "Waterford, CT",
  },
  {
    id: "maryam-tahvildari",
    name: "Maryam Tahvildari",
    credentials: "MD",
    role: "Assistant Professor, Department of Ophthalmology and Visual Sciences",
    affiliation: "Yale University",
    location: "CT",
  },

  // ---- Shark-Tank pitch ----
  {
    id: "ehsan-vaghefi",
    name: "Ehsan Vaghefi",
    credentials: "PhD",
  },
  {
    id: "shabnam-mohadessi",
    name: "Shabnam Mohadessi",
    credentials: "PhD",
  },
  {
    id: "aileen-mastouri",
    name: "Aileen Mastouri",
    credentials: "PhD",
  },
  {
    id: "tony-chan",
    name: "Tony Chan",
    credentials: "JD",
    affiliation: "Orrick",
  },
  {
    id: "angus-mcquilken",
    name: "Angus McQuilken",
    credentials: "BA",
    affiliation: "Orrick",
  },

  // ---- Med/Tech workshop presenters ----
  {
    id: "roofya-rostami",
    name: "Roofya Rostami",
    credentials: "PhD",
  },
  {
    id: "iman-daryaei",
    name: "Iman Daryaei",
    credentials: "PhD",
  },
  {
    id: "farhad-taghibaksh",
    name: "Farhad Taghibaksh",
    credentials: "PhD",
  },
  {
    id: "samaneh-kamali",
    name: "Samaneh Kamali",
    credentials: "PhD",
    role: "CEO and Founder",
    affiliation: "Caleo Biotechnologies, Inc.",
  },
  {
    id: "danesh-mazloomdoost",
    name: "Danesh Mazloomdoost",
    credentials: "MD",
    role: "Regenerative Specialist",
    location: "Lexington, KY",
  },

  // ---- Pilates (Sunday) ----
  {
    id: "padideh-ortensi",
    name: "Padideh Ortensi",
    credentials: "DMD",
  },

  // ---- Neurotech panel ----
  {
    id: "nooshin-rezvani",
    name: "Nooshin Rezvani",
    credentials: "MD, PhD",
  },
  {
    id: "rose-faghih",
    name: "Rose Faghih",
    credentials: "PhD",
    role: "Associate Professor of Biomedical Engineering",
    affiliation: "NYU",
  },
  {
    id: "bardiya-ghaderi-yazdi",
    name: "Bardiya Ghaderi Yazdi",
    credentials: "MD",
    affiliation: "Weill Cornell",
    location: "New York, NY",
  },
  {
    id: "omid-foruzan",
    name: "Omid Foruzan",
    credentials: "PhD",
    role: "Vice President of Clinical",
    affiliation: "Synchron",
    location: "New York, NY",
  },
  {
    id: "parnian-alizadeh",
    name: "Parnian Alizadeh",
    credentials: "MD",
    role: "Post-doc Research Fellow",
    affiliation: "Harvard Medical School",
    location: "MA",
  },
  {
    id: "fargol-yeganeh-fathi",
    name: "Fargol Yeganeh Fathi",
    role: "Pre-med Student",
    affiliation: "Weill Cornell",
  },

  // ---- Neuroscience panel ----
  {
    id: "arash-taavoni",
    name: "Arash Taavoni",
    credentials: "DO",
  },
  {
    id: "pegah-hosseinzadeh",
    name: "Pegah Hosseinzadeh",
    credentials: "DMD",
  },
  {
    id: "ramin-javan",
    name: "Ramin Javan",
    credentials: "MD",
    role: "Professor of Radiology",
    affiliation: "George Washington School of Medicine",
  },
  {
    id: "sara-naderinabi",
    name: "Sara Naderinabi",
    role: "Pre-med",
    affiliation: "Case Western Reserve University",
  },
  {
    id: "neda-hovaizi",
    name: "Neda Hovaizi",
    credentials: "DDS",
    location: "Boston, MA",
  },
  {
    id: "mahtab-shariatkhah",
    name: "Mahtab Shariatkhah",
    role: "Nutrition Health Coach",
    location: "Maryland",
  },
  {
    id: "mohammad-ehteshami",
    name: "Mohammad Ehteshami",
    role: "Chairman and CEO",
    affiliation: "Beehive Industry",
    location: "Evendale, OH",
  },

  // ---- Dermatology / Medicine panel (Sunday) ----
  {
    id: "mana-ogholikhan",
    name: "Mana Ogholikhan",
    credentials: "MD",
    role: "Dermatology Specialist",
    location: "Greenbelt, MD",
  },
  {
    id: "amir-qorbani",
    name: "Amir Qorbani",
    credentials: "MD",
    role: "Associate Clinical Professor",
    affiliation: "UCSF",
  },
  {
    id: "shervin-dorodi",
    name: "Shervin Dorodi",
    credentials: "MD",
    role: "Family Medicine",
    location: "IL",
  },
  {
    id: "alireza-farazpey",
    name: "Alireza Farazpey",
    affiliation: "UCSF School of Dentistry",
  },
  {
    id: "shirin-sadoughi",
    name: "Shirin Sadoughi",
    affiliation: "Edgemont Jr/Sr High School",
    location: "New York",
  },
  {
    id: "negar-kohly",
    name: "Negar Kohly",
    credentials: "PharmD",
    location: "New York, NY",
  },
  {
    id: "marc-spedaliere",
    name: "Marc Spedaliere",
    credentials: "CFP",
    role: "Senior Vice President, Wealth Management Advisor",
    affiliation: "Merrill Lynch",
  },
];

export const sessions: Session[] = [
  // ===================== FRIDAY, MAY 22 =====================
  {
    id: "museum-tour",
    dayId: "fri-may-22",
    type: "tour",
    track: "general",
    title: "Museum Tour",
    start: "15:00",
    end: "17:00",
    description: "Museum tour for attendees. Arrival at leisure.",
  },

  // ===================== SATURDAY, MAY 23 =====================
  {
    id: "checkin-breakfast-sat",
    dayId: "sat-may-23",
    type: "registration",
    track: "general",
    title: "Check-in & Continental Breakfast",
    start: "07:30",
    end: "08:10",
    room: "Paris Ballroom",
  },
  {
    id: "opening-presentation",
    dayId: "sat-may-23",
    type: "keynote",
    track: "general",
    title: "Opening Presentation",
    start: "07:45",
    end: "08:10",
    room: "Paris Ballroom",
    talkIds: ["opening-aldosterone-hypertension"],
  },
  {
    id: "welcome",
    dayId: "sat-may-23",
    type: "registration",
    track: "general",
    title: "Welcome",
    start: "08:10",
    end: "08:15",
    room: "Paris Ballroom",
    moderatorIds: ["freidoon-ghazi", "jasmin-moshirpur"],
    description: "Welcome remarks by Drs. Freidoon Ghazi and Jasmin Moshirpur.",
  },
  {
    id: "surgery-panel",
    dayId: "sat-may-23",
    type: "panel",
    track: "surgery",
    title: "Surgery Panel",
    start: "08:15",
    end: "10:00",
    room: "Paris Ballroom",
    moderatorIds: ["alireza-shamshirsaz", "donna-mazloomdoost"],
    talkIds: [
      "hormonal-changes-treatment-options",
      "ai-framework-endometriosis",
      "war-on-cancer",
      "venous-insufficiency",
      "pretargeted-radioimmunotherapy-her2",
      "cancer-oropharynx",
    ],
  },
  {
    id: "coffee-break-sat",
    dayId: "sat-may-23",
    type: "poster",
    track: "poster",
    title: "Coffee Break & Poster Session",
    start: "10:00",
    end: "10:15",
    room: "Athens Ballroom",
  },
  {
    id: "cardiovascular-panel",
    dayId: "sat-may-23",
    type: "panel",
    track: "cardiovascular",
    title: "Cardiovascular Panel",
    start: "10:15",
    end: "12:00",
    room: "Paris Ballroom",
    moderatorIds: ["hirad-yarmohammadi", "reza-movahed"],
    talkIds: [
      "reducing-heterogeneity-cv-care",
      "vasovagal-syncope-pathways",
      "ai-in-cardiovascular-medicine",
      "rituximab-induced-vt",
      "single-lead-ecg-biosensor",
      "prevent-readmission-chf",
      "prevention-strategies-womens-cardiac-health",
    ],
  },
  {
    id: "lunch-sat",
    dayId: "sat-may-23",
    type: "meal",
    track: "general",
    title: "Lunch",
    start: "12:00",
    end: "13:00",
    room: "Paris Ballroom",
    sponsor: "AMGEN",
    description: "Lunch sponsored by AMGEN; Dr. Payam Shakouri.",
    talkIds: ["amgen-lunch-symposium"],
  },
  {
    id: "medicine-panel",
    dayId: "sat-may-23",
    type: "panel",
    track: "medicine",
    title: "Medicine Panel",
    start: "13:00",
    end: "14:25",
    room: "Paris Ballroom",
    moderatorIds: [
      "farin-kamangar",
      "sebastian-lighvani",
      "alidad-arabshahi",
      "shaun-shayegan",
    ],
    talkIds: [
      "updates-lung-cancer",
      "asthma-treatment-biologics",
      "novel-bisphosphonate",
      "flashes-floaters-retinal-detachments",
      "glp1-ocular-diseases",
      "dry-eye-syndrome",
    ],
  },
  {
    id: "shark-tank-pitch",
    dayId: "sat-may-23",
    type: "pitch",
    track: "pitch",
    title: "Shark-Tank Style Pitch",
    start: "14:25",
    end: "14:30",
    room: "Paris Ballroom",
    moderatorIds: ["ehsan-vaghefi"],
    panelistIds: [
      "shabnam-mohadessi",
      "aileen-mastouri",
      "tony-chan",
      "angus-mcquilken",
    ],
  },
  {
    id: "medtech-workshop",
    dayId: "sat-may-23",
    type: "workshop",
    track: "medtech",
    title: "Med/Tech Workshop",
    start: "14:30",
    end: "16:15",
    room: "Paris Ballroom",
    moderatorIds: ["ehsan-vaghefi"],
    talkIds: [
      "medtech-showcase-roofya-rostami",
      "medtech-showcase-iman-daryaei",
      "medtech-showcase-reza-movahed",
      "medtech-showcase-farhad-taghibaksh",
      "medtech-showcase-samaneh-kamali",
      "medtech-showcase-danesh-mazloomdoost",
    ],
  },

  // ===================== SUNDAY, MAY 24 =====================
  {
    id: "pilates",
    dayId: "sun-may-24",
    type: "wellness",
    track: "wellness",
    title: "Pilates Session",
    start: "07:15",
    end: "07:45",
    moderatorIds: ["padideh-ortensi"],
    description: "RSVP padidehalizadeh@gmail.com — space limited.",
  },
  {
    id: "checkin-breakfast-sun",
    dayId: "sun-may-24",
    type: "registration",
    track: "general",
    title: "Check-in & Continental Breakfast",
    start: "08:15",
    end: "08:30",
    room: "Paris Ballroom",
  },
  {
    id: "neurotech-panel",
    dayId: "sun-may-24",
    type: "panel",
    track: "neurotech",
    title: "Neurotech Panel",
    start: "08:30",
    end: "10:05",
    room: "Paris Ballroom",
    moderatorIds: ["danesh-mazloomdoost", "nooshin-rezvani"],
    talkIds: [
      "decoders-mental-physical-health",
      "preclinical-tau-deposition-dmn",
      "translating-thought-into-action-bci",
      "autonomic-responses-antiseizure-pediatrics",
      "regenerative-medicine-pain-management",
      "current-state-psychiatric-neurotech",
    ],
  },
  {
    id: "coffee-break-sun",
    dayId: "sun-may-24",
    type: "poster",
    track: "poster",
    title: "Coffee Break & Poster Sessions",
    start: "10:05",
    end: "10:25",
    room: "Athens Ballroom",
  },
  {
    id: "neuroscience-panel",
    dayId: "sun-may-24",
    type: "panel",
    track: "neuroscience",
    title: "Neuroscience Panel",
    start: "10:25",
    end: "12:00",
    room: "Paris Ballroom",
    moderatorIds: ["arash-taavoni", "pegah-hosseinzadeh"],
    talkIds: [
      "diagnostics-neurological-disease",
      "disenfranchised-grief-medicine",
      "redefining-cosmetic-dental-aesthetics",
      "nutrition-holistic-health",
      "entrepreneurs-technical-leadership",
    ],
  },
  {
    id: "lunch-sun",
    dayId: "sun-may-24",
    type: "meal",
    track: "general",
    title: "Lunch",
    start: "12:00",
    end: "13:00",
    room: "Paris Ballroom",
    description: "Catering by Persian Moby Dick.",
  },
  {
    id: "dermatology-medicine-panel",
    dayId: "sun-may-24",
    type: "panel",
    track: "dermatology",
    title: "Dermatology / Medicine Panel",
    start: "13:00",
    end: "14:50",
    room: "Paris Ballroom",
    moderatorIds: ["farin-kamangar"],
    talkIds: [
      "hair-loss-alopecia",
      "exogenous-ochronosis",
      "management-of-obesity",
      "trichohepatoenteric-syndrome",
      "immune-profiling-acral-melanoma",
      "movahed-sign-mri-ct",
      "drug-interactions",
      "finance-in-medicine",
    ],
  },
  {
    id: "general-membership-meeting",
    dayId: "sun-may-24",
    type: "business",
    track: "business",
    title: "General Membership Meeting",
    start: "14:50",
    end: "19:00",
    room: "Paris Ballroom",
  },
  {
    id: "gala-dinner",
    dayId: "sun-may-24",
    type: "social",
    track: "social",
    title: "Gala Dinner",
    start: "19:00",
    end: "23:00",
    room: "Paris Ballroom",
    description: "Gala Dinner — Black Tie Optional.",
  },

  // ===================== MONDAY, MAY 25 =====================
  {
    id: "board-members-meeting",
    dayId: "mon-may-25",
    type: "business",
    track: "business",
    title: "Board Members Meeting",
    start: "08:30",
    end: "10:30",
    room: "Athens Ballroom",
  },
];

export const talks: Talk[] = [
  // ---- Opening Presentation ----
  {
    id: "opening-aldosterone-hypertension",
    sessionId: "opening-presentation",
    title:
      "Rethinking Hypertension Management: A Novel, Aldosterone-Targeted Approach for Uncontrolled Blood Pressure",
    start: "07:45",
    speakerIds: ["irum-khan"],
    role: "keynote",
  },

  // ---- Surgery panel ----
  {
    id: "hormonal-changes-treatment-options",
    sessionId: "surgery-panel",
    title: "Hormonal Changes and Treatment Options",
    start: "08:15",
    speakerIds: ["shieva-ghofrany"],
    role: "oral",
  },
  {
    id: "ai-framework-endometriosis",
    sessionId: "surgery-panel",
    title:
      "Towards an Integrated Artificial Intelligence Framework for Endometriosis",
    start: "08:30",
    speakerIds: ["sahar-khoshravesh"],
    role: "oral",
  },
  {
    id: "war-on-cancer",
    sessionId: "surgery-panel",
    title:
      "The War on Cancer: Why We're Winning in Some Places and Failing in Others",
    start: "08:40",
    speakerIds: ["omeed-moaven"],
    role: "oral",
  },
  {
    id: "venous-insufficiency",
    sessionId: "surgery-panel",
    title: "Venous Insufficiency: Multiple Features, Single Concept",
    start: "09:00",
    speakerIds: ["saina-attaran"],
    role: "oral",
  },
  {
    id: "pretargeted-radioimmunotherapy-her2",
    sessionId: "surgery-panel",
    title:
      "Pretargeted Radioimmunotherapy for HER2-Positive Solid Tumors: A Novel Approach to Enhance Targeted Radiotherapy",
    start: "09:20",
    speakerIds: ["niloufar-salehi"],
    role: "oral",
  },
  {
    id: "cancer-oropharynx",
    sessionId: "surgery-panel",
    title: "Cancer of the Oropharynx; Approach and Treatment",
    start: "09:30",
    speakerIds: ["babak-givi"],
    role: "oral",
  },

  // ---- Cardiovascular panel ----
  {
    id: "reducing-heterogeneity-cv-care",
    sessionId: "cardiovascular-panel",
    title:
      "Reducing Heterogeneity of Cardiovascular Care Outcomes in the United States and Worldwide",
    start: "10:15",
    speakerIds: ["mehdi-shishehbor"],
    role: "oral",
  },
  {
    id: "vasovagal-syncope-pathways",
    sessionId: "cardiovascular-panel",
    title:
      "Mechanistic and Integrative Autonomic-Hemodynamic Pathways Underlying Vasovagal Syncope and New Approaches to Its Management",
    start: "10:30",
    speakerIds: ["viona-tavakkoli"],
    role: "oral",
  },
  {
    id: "ai-in-cardiovascular-medicine",
    sessionId: "cardiovascular-panel",
    title:
      "Current and Future Role of Artificial Intelligence in Cardiovascular Medicine",
    start: "10:40",
    speakerIds: ["reza-arsanjani"],
    role: "oral",
  },
  {
    id: "rituximab-induced-vt",
    sessionId: "cardiovascular-panel",
    title:
      "Rituximab-Induced Polymorphic Ventricular Tachycardia in the Setting of Electrolyte Imbalance",
    start: "10:55",
    speakerIds: ["misha-moazzemi"],
    role: "oral",
  },
  {
    id: "single-lead-ecg-biosensor",
    sessionId: "cardiovascular-panel",
    title:
      "A Single-Lead ECG Biosensor and a Cloud-Based Deep Learning AI Algorithm for Continuous Arrhythmia Monitoring",
    start: "11:05",
    speakerIds: ["nersi-nazari"],
    role: "oral",
  },
  {
    id: "prevent-readmission-chf",
    sessionId: "cardiovascular-panel",
    title: "How to Prevent Readmission in a Patient with Congestive Heart Failure",
    start: "11:20",
    speakerIds: ["reza-movahed"],
    role: "oral",
  },
  {
    id: "prevention-strategies-womens-cardiac-health",
    sessionId: "cardiovascular-panel",
    title: "Prevention Strategies for Women's Cardiac Health",
    start: "11:30",
    speakerIds: ["roxana-mehran"],
    role: "keynote",
  },

  // ---- Lunch (Saturday) ----
  {
    id: "amgen-lunch-symposium",
    sessionId: "lunch-sat",
    title: "Industry Lunch Symposium",
    start: "12:00",
    speakerIds: ["payam-shakouri"],
    role: "presenter",
  },

  // ---- Medicine panel (Saturday) ----
  {
    id: "updates-lung-cancer",
    sessionId: "medicine-panel",
    title:
      "Updates in Lung Cancer: From Screening to Diagnosis and Treatment—Focus on Minimally Invasive Procedures",
    start: "13:00",
    speakerIds: ["ali-sadoughi"],
    role: "oral",
  },
  {
    id: "asthma-treatment-biologics",
    sessionId: "medicine-panel",
    title: "Asthma Treatment Options and Biologics",
    start: "13:15",
    speakerIds: ["jalil-ahari"],
    role: "oral",
  },
  {
    id: "novel-bisphosphonate",
    sessionId: "medicine-panel",
    title:
      "A Novel Bisphosphonate Without Long Term Adverse Effects Does Not Cause Atypical-Like Fracture in an In Vivo Fatigue Model",
    start: "13:30",
    speakerIds: ["taraneh-rezaee"],
    role: "oral",
  },
  {
    id: "flashes-floaters-retinal-detachments",
    sessionId: "medicine-panel",
    title: "Flashes, Floaters, and Retinal Detachments - What You Need to Know",
    start: "13:40",
    speakerIds: ["dara-koozekanani"],
    role: "oral",
  },
  {
    id: "glp1-ocular-diseases",
    sessionId: "medicine-panel",
    title: "GLP1 Agonist Use and the Risk of Ocular Diseases",
    start: "13:55",
    speakerIds: ["amirfarbod-yazdanyar"],
    role: "oral",
  },
  {
    id: "dry-eye-syndrome",
    sessionId: "medicine-panel",
    title: "Dry Eye Syndrome: Diagnosis and Management",
    start: "14:10",
    speakerIds: ["maryam-tahvildari"],
    role: "oral",
  },

  // ---- Med/Tech workshop ----
  {
    id: "medtech-showcase-roofya-rostami",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Roofya Rostami",
    start: "14:30",
    speakerIds: ["roofya-rostami"],
    role: "presenter",
  },
  {
    id: "medtech-showcase-iman-daryaei",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Iman Daryaei",
    start: "14:45",
    speakerIds: ["iman-daryaei"],
    role: "presenter",
  },
  {
    id: "medtech-showcase-reza-movahed",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Mohammed Reza Movahed",
    start: "15:00",
    speakerIds: ["reza-movahed"],
    role: "presenter",
  },
  {
    id: "medtech-showcase-farhad-taghibaksh",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Farhad Taghibaksh",
    start: "15:15",
    speakerIds: ["farhad-taghibaksh"],
    role: "presenter",
  },
  {
    id: "medtech-showcase-samaneh-kamali",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Samaneh Kamali",
    start: "15:30",
    speakerIds: ["samaneh-kamali"],
    role: "presenter",
  },
  {
    id: "medtech-showcase-danesh-mazloomdoost",
    sessionId: "medtech-workshop",
    title: "Med/Tech Showcase — Danesh Mazloomdoost",
    start: "15:45",
    speakerIds: ["danesh-mazloomdoost"],
    role: "presenter",
  },

  // ---- Neurotech panel ----
  {
    id: "decoders-mental-physical-health",
    sessionId: "neurotech-panel",
    title: "Decoders for Sensing Mental and Physical Health",
    start: "08:30",
    speakerIds: ["rose-faghih"],
    role: "oral",
  },
  {
    id: "preclinical-tau-deposition-dmn",
    sessionId: "neurotech-panel",
    title:
      "The Preclinical Tau Deposition Alters DMN Deactivation During Episodic Memory Tasks Without Affecting Performance",
    start: "08:50",
    speakerIds: ["bardiya-ghaderi-yazdi"],
    role: "oral",
  },
  {
    id: "translating-thought-into-action-bci",
    sessionId: "neurotech-panel",
    title:
      "Translating Thought Into Action: Restoring Human Function Through Brain-Computer Interfaces",
    start: "09:00",
    speakerIds: ["omid-foruzan"],
    role: "oral",
  },
  {
    id: "autonomic-responses-antiseizure-pediatrics",
    sessionId: "neurotech-panel",
    title:
      "Evaluating Autonomic Responses to Antiseizure Medications in Pediatrics Using Wearable Devices",
    start: "09:20",
    speakerIds: ["parnian-alizadeh"],
    role: "oral",
  },
  {
    id: "regenerative-medicine-pain-management",
    sessionId: "neurotech-panel",
    title: "Regenerative Medicine for Pain Management",
    start: "09:30",
    speakerIds: ["danesh-mazloomdoost"],
    role: "oral",
  },
  {
    id: "current-state-psychiatric-neurotech",
    sessionId: "neurotech-panel",
    title: "Current State of Psychiatric Neurotech",
    start: "09:50",
    speakerIds: ["fargol-yeganeh-fathi"],
    role: "oral",
  },

  // ---- Neuroscience panel ----
  {
    id: "diagnostics-neurological-disease",
    sessionId: "neuroscience-panel",
    title: "Diagnostics for Neurological Disease",
    start: "10:25",
    speakerIds: ["ramin-javan"],
    role: "oral",
  },
  {
    id: "disenfranchised-grief-medicine",
    sessionId: "neuroscience-panel",
    title:
      "Disenfranchised Grief in Medicine: Understanding Grief and Healing Among Physicians and Families Following Adverse Medical Events",
    start: "10:45",
    speakerIds: ["sara-naderinabi"],
    role: "oral",
  },
  {
    id: "redefining-cosmetic-dental-aesthetics",
    sessionId: "neuroscience-panel",
    title:
      "Redefining Cosmetic and Dental Aesthetics: Identity, Expression, and the Modern Standard of Beauty",
    start: "10:55",
    speakerIds: ["neda-hovaizi"],
    role: "oral",
  },
  {
    id: "nutrition-holistic-health",
    sessionId: "neuroscience-panel",
    title: "The Medical Impact of Nutrition and Holistic Health Approaches",
    start: "11:15",
    speakerIds: ["mahtab-shariatkhah"],
    role: "oral",
  },
  {
    id: "entrepreneurs-technical-leadership",
    sessionId: "neuroscience-panel",
    title: "Entrepreneurs & Technical Leadership",
    start: "11:30",
    speakerIds: ["mohammad-ehteshami"],
    role: "keynote",
  },

  // ---- Dermatology / Medicine panel (Sunday) ----
  {
    id: "hair-loss-alopecia",
    sessionId: "dermatology-medicine-panel",
    title: "Hair Loss and Alopecia",
    start: "13:00",
    speakerIds: ["mana-ogholikhan"],
    role: "oral",
  },
  {
    id: "exogenous-ochronosis",
    sessionId: "dermatology-medicine-panel",
    title:
      "Exogenous Ochronosis: Skin Lightening Cream Causing Rare Caviar-Like Lesion With Banana-Like Pigments; Review of Literature and Histological Comparison With Endogenous Counterpart",
    start: "13:15",
    speakerIds: ["amir-qorbani"],
    role: "oral",
  },
  {
    id: "management-of-obesity",
    sessionId: "dermatology-medicine-panel",
    title: "Management of Obesity",
    start: "13:30",
    speakerIds: ["shervin-dorodi"],
    role: "oral",
  },
  {
    id: "trichohepatoenteric-syndrome",
    sessionId: "dermatology-medicine-panel",
    title:
      "Gastrointestinal Pathologic Features of Trichohepatoenteric Syndrome in a Young Adult Female: A Case Report and Review",
    start: "13:45",
    speakerIds: ["alireza-farazpey"],
    role: "oral",
  },
  {
    id: "immune-profiling-acral-melanoma",
    sessionId: "dermatology-medicine-panel",
    title:
      "Immune Profiling of Acral Lentiginous Melanoma and Its Relationship to Immunotherapy Response",
    start: "13:55",
    speakerIds: ["shirin-sadoughi"],
    role: "oral",
  },
  {
    id: "movahed-sign-mri-ct",
    sessionId: "dermatology-medicine-panel",
    title:
      "The Movahed Sign (D-Shape Left Ventricle Seen on Gated Single Photon Emission Computed Tomography (SPECT) Imaging as an Indicator for Right Ventricular Overload) is Also Valid in Magnetic Resonance Imaging (MRI) or Computed Tomography (CT)",
    start: "14:05",
    speakerIds: ["reza-movahed"],
    role: "oral",
  },
  {
    id: "drug-interactions",
    sessionId: "dermatology-medicine-panel",
    title: "Drug Interactions",
    start: "14:10",
    speakerIds: ["negar-kohly"],
    role: "oral",
  },
  {
    id: "finance-in-medicine",
    sessionId: "dermatology-medicine-panel",
    title: "Finance in Medicine",
    start: "14:25",
    speakerIds: ["marc-spedaliere"],
    role: "keynote",
  },
];
