export interface BreadcrumbLink {
  label: string;
  href: string;
}

export interface AcademicProgramsHero {
  breadcrumb: BreadcrumbLink[];
  tagline: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
}

export interface ProgramCategoryCard {
  id: string;
  badgeCount: string;
  categoryTag: string;
  title: string;
  description: string;
  image: string;
  imageMobile?: string;
  link: string;
}

export interface OfferingsSection {
  tagline: string;
  title: string;
  description: string;
  categories: ProgramCategoryCard[];
}

export interface AdmissionsBanner {
  tagline: string;
  title: string;
  buttonText: string;
  buttonLink: string;
}

export interface AcademicProgramsData {
  hero: AcademicProgramsHero;
  offeringsSection: OfferingsSection;
  admissionsBanner: AdmissionsBanner;
}

export const academicProgramsData: AcademicProgramsData = {
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "ACADEMIC PROGRAMS", href: "/academic-programs" },
    ],
    tagline: "ACADEMIC DIVISIONS & RESEARCH",
    title: "Structured study in Tafsir and the Qur'anic sciences",
    description:
      "Programmes combine classical text study with academic research training, taught by departmental faculty and visiting specialists.",
    buttonText: "Explore programmes",
    buttonLink: "#program-categories",
    backgroundImage: "/images/lib.jpe",
    backgroundImageMobile: "/images/lib.jpe",
  },

  offeringsSection: {
    tagline: "OFFERINGS",
    title: "Programme Categories",
    description:
      "Programme families are managed as dynamic categories under Admission, so new intakes and courses appear here automatically.",
    categories: [
      {
        id: "academic-programs",
        badgeCount: "2 programmes",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Academic Programs",
        description: "Master's and doctoral study in Tafsir and Qur'anic Sciences.",
        image: "/images/programs/academic-programs.jpg",
        imageMobile: "/images/programs/academic-programs.jpg",
        link: "/academic-programs/academic",
      },
      {
        id: "certificate-programs",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Certificate Programs",
        description: "Short certified courses for scholars, teachers and graduate students.",
        image: "/images/programs/certificate-programs.jpg",
        imageMobile: "/images/programs/certificate-programs.jpg",
        link: "/academic-programs/certificates",
      },
      {
        id: "diploma-programs",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Diploma Programs",
        description: "One-year diplomas in Qur'anic sciences and Arabic linguistics.",
        image: "/images/programs/diploma-programs.jpg",
        imageMobile: "/images/programs/diploma-programs.jpg",
        link: "/academic-programs/diplomas",
      },
      {
        id: "research-fellowships",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Research Fellowships",
        description: "Funded fellowships for early-career and senior researchers.",
        image: "/images/programs/research-fellowships.jpg",
        imageMobile: "/images/programs/research-fellowships.jpg",
        link: "/academic-programs/fellowships",
      },
      {
        id: "visiting-scholars",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Visiting Scholars",
        description: "Short and long residencies for scholars from partner institutions.",
        image: "/images/programs/visiting-scholars.jpg",
        imageMobile: "/images/programs/visiting-scholars.jpg",
        link: "/academic-programs/visiting-scholars",
      },
      {
        id: "research-internships",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Research Internships",
        description: "Internships for graduate students in research and digitisation units.",
        image: "/images/programs/research-internships.jpg",
        imageMobile: "/images/programs/research-internships.jpg",
        link: "/academic-programs/internships",
      },
      {
        id: "online-programs",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Online Programs",
        description: "Fully online courses for international participants.",
        image: "/images/programs/online-programs.jpg",
        imageMobile: "/images/programs/online-programs.jpg",
        link: "/academic-programs/online",
      },
      {
        id: "scholarships",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Scholarships",
        description: "Merit and need-based scholarships, including partner-funded awards.",
        image: "/images/programs/scholarships.jpg",
        imageMobile: "/images/programs/scholarships.jpg",
        link: "/academic-programs/scholarships",
      },
      {
        id: "admission-requirements",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Admission Requirements",
        description: "General and programme-specific requirements and document checklists.",
        image: "/images/programs/admission-requirements.jpg",
        imageMobile: "/images/programs/admission-requirements.jpg",
        link: "/academic-programs/requirements",
      },
      {
        id: "application-process",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Application Process",
        description: "Step-by-step guidance from enquiry to enrolment.",
        image: "/images/programs/application-process.jpg",
        imageMobile: "/images/programs/application-process.jpg",
        link: "/academic-programs/application-process",
      },
      {
        id: "important-dates",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "Important Dates",
        description: "Intake calendar, deadlines, interviews and orientation.",
        image: "/images/programs/important-dates.jpg",
        imageMobile: "/images/programs/important-dates.jpg",
        link: "/academic-programs/important-dates",
      },
      {
        id: "faqs",
        badgeCount: "1 programme",
        categoryTag: "IRITAQ ACADEMICS",
        title: "FAQs",
        description: "Frequently asked questions on eligibility, fees, visas and accommodation.",
        image: "/images/programs/faqs.jpg",
        imageMobile: "/images/programs/faqs.jpg",
        link: "/academic-programs/faqs",
      },
    ],
  },

  admissionsBanner: {
    tagline: "ADMISSIONS",
    title: "Admission is open on a rolling basis",
    buttonText: "Start an application",
    buttonLink: "/admissions/apply",
  },
};