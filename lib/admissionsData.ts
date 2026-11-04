export interface Program {
  id: string;
  title: string;
  titleArabic: string;
  status: string;
  description: string;
  image: string;
  imageMobile?: string;
}

export interface FeaturedProgram {
  tagline: string;
  title: string;
  description: string;
  duration: string;
  durationDetails: string;
  prerequisite: string;
  prerequisiteDetails: string;
  limit: string;
  limitDetails: string;
}

export interface Requirement {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Step {
  stepNumber: string;
  title: string;
  description: string;
}

export interface DeadlineItem {
  event: string;
  date: string;
}

export interface DeadlineGroup {
  category: string;
  items: DeadlineItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HeroData {
  breadcrumb: string[];
  tagline: string;
  headline: string;
  subheading: string;
  bgImage: string;
  bgImageMobile?: string;
}

export interface AdmissionsData {
  hero: HeroData;
  programs: Program[];
  featuredProgram: FeaturedProgram;
  requirements: Requirement[];
  steps: Step[];
  deadlines: DeadlineGroup[];
  faqs: FAQItem[];
}

export const HERO_DATA: HeroData = {
  breadcrumb: ["Home", "Admissions"],
  tagline: "JOIN OUR SCHOLARLY COMMUNITY",
  headline: "Academic programmes, fellowships and scholarly opportunities",
  subheading:
    "A dynamic portal for programmes, fellowships, internships, online study and scholarships, with eligibility, fees, documents and online applications.",
  bgImage:
    "/images/lib.jpe",
  bgImageMobile:
    "/images/lib.jpe",
};

export const PROGRAMS_DATA: Program[] = [
  {
    id: "academic-programs",
    title: "Academic Programs",
    titleArabic: "البرامج الأكاديمية",
    status: "ADMISSIONS OPEN",
    description:
      "Full-time scholarly research tracks focused on historical context, hermeneutical studies, and theology.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
  {
    id: "certificate-programs",
    title: "Certificate Programs",
    titleArabic: "برامج الشهادات",
    status: "ADMISSIONS OPEN",
    description:
      "Short-term intensive courses targeting specialized elements within Ulum al-Qur'an and early manuscript studies.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
  {
    id: "diploma-programs",
    title: "Diploma Programs",
    titleArabic: "برامج الدبلوم",
    status: "ADMISSIONS OPEN",
    description:
      "Comprehensive part-time study paths designed for working professionals seeking advanced accreditation.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
  {
    id: "research-fellowships",
    title: "Research Fellowships",
    titleArabic: "الزمالات البحثية",
    status: "ADMISSIONS OPEN",
    description:
      "Funded opportunities for senior post-doctoral scholars to publish innovative Tafsir methodologies.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
  {
    id: "visiting-scholars",
    title: "Visiting Scholars",
    titleArabic: "العلماء الزائرون",
    status: "ADMISSIONS OPEN",
    description:
      "Collaborative residential frameworks for international academics conducting comparative research.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
  {
    id: "research-internships",
    title: "Research Internships",
    titleArabic: "التدريب البحثي",
    status: "ADMISSIONS OPEN",
    description:
      "Hands-on assistantships paired directly with leading faculty on ongoing digital database indexing.",
    image:
      "/images/lib.jpe",
    imageMobile:
      "/images/lib.jpe",
  },
];

export const FEATURED_PROGRAM: FeaturedProgram = {
  tagline: "FEATURED PROGRAM",
  title: "Master of Qur'anic Sciences",
  description:
    "A premier graduate program exploring the hermeneutics of classical commentary, early manuscripts palaeography, and linguistic systems.",
  duration: "2 Academic Years",
  durationDetails: "Four full terms including a compulsory thesis submission.",
  prerequisite: "Bachelor's Degree",
  prerequisiteDetails:
    "Islamic Studies, Arabic Grammar, or certified equivalent required.",
  limit: "25 Scholars Max",
  limitDetails: "Maintained tightly for high-fidelity seminar supervision.",
};

export const REQUIREMENTS_DATA: Requirement[] = [
  {
    id: "req-1",
    number: "01",
    title: "Official Transcripts",
    description:
      "Degree sheets and official seals of previous universities, with accredited Arabic or English translations.",
  },
  {
    id: "req-2",
    number: "02",
    title: "Identifications (ID/Passport)",
    description:
      "A valid national identification document or passport copy with clear details and photograph.",
  },
  {
    id: "req-3",
    number: "03",
    title: "Language Proficiency",
    description:
      "Demonstrated fluency in classical Arabic. English standard verification for fellowship candidates.",
  },
  {
    id: "req-4",
    number: "04",
    title: "Research Proposal",
    description:
      "A comprehensive 1500-word draft detailing research questions, targeted texts, and methodologies (Fellows only).",
  },
  {
    id: "req-5",
    number: "05",
    title: "Letters of Recommendation",
    description:
      "Two signed academic endorsements from accredited departments confirming historical integrity and drive.",
  },
  {
    id: "req-6",
    number: "06",
    title: "Statement of Purpose",
    description:
      "A personal letter detailing your academic journey, targets, and reasons for choosing IRITAQ.",
  },
];

export const STEPS_DATA: Step[] = [
  {
    stepNumber: "STEP 01",
    title: "Create Account",
    description:
      "Register an applicant account on the official portal using verified contact emails.",
  },
  {
    stepNumber: "STEP 02",
    title: "Fill Forms",
    description:
      "Input details, select target courses, and outline previous scholarly backgrounds carefully.",
  },
  {
    stepNumber: "STEP 03",
    title: "Upload Materials",
    description:
      "Submit high-resolution PDFs of ID sheets, official degree transcripts, and references.",
  },
  {
    stepNumber: "STEP 04",
    title: "Review & Pay",
    description:
      "Double-check overall details, process the digital administrative fee, and receive confirmation.",
  },
];

export const DEADLINES_DATA: DeadlineGroup[] = [
  {
    category: "JANUARY TERM",
    items: [
      { event: "Admissions Open:", date: "January 01, 2026" },
      { event: "Early Action Deadline:", date: "February 28, 2026" },
      { event: "General Deadline:", date: "March 15, 2026" },
    ],
  },
  {
    category: "INTERVIEWS & INTAKE",
    items: [
      { event: "Scholarly Interviews:", date: "April 1–15, 2026" },
      { event: "Final Decisions Out:", date: "May 01, 2026" },
      { event: "Classes Inauguration:", date: "September 01, 2026" },
    ],
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Can I apply for multiple programs simultaneously?",
    answer:
      "You may select up to two program choices on a single registration track. However, you must highlight a primary preference and submit a dedicated research overview for your highest option.",
  },
  {
    question: "Is financial aid or full scholarship support available?",
    answer:
      "Yes, IRITAQ maintains a comprehensive merit-based scholarship program.",
  },
];

export const admissionsData: AdmissionsData = {
  hero: HERO_DATA,
  programs: PROGRAMS_DATA,
  featuredProgram: FEATURED_PROGRAM,
  requirements: REQUIREMENTS_DATA,
  steps: STEPS_DATA,
  deadlines: DEADLINES_DATA,
  faqs: FAQ_DATA,
};