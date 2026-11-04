export interface PartnerCardItem {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
}

export interface ArchiveImageItem {
  url: string;
  caption: string;
}

export interface InternationalPartnershipsPageData {
  hero: {
    tagline: string;
    title: string;
    description: string;
    bgImageUrl: string;
    mobileBgImageUrl: string;
  };
  overview: {
    title: string;
    paragraphs: string[];
  };
  partners: PartnerCardItem[];
  archives: ArchiveImageItem[];
}

export const defaultInternationalPartnershipsData: InternationalPartnershipsPageData = {
  hero: {
    tagline: "GLOBAL ALLIANCES",
    title: "International Partnerships & Networks",
    description: "IRITAQ actively fosters collaborative academic frameworks, manuscript preservation programs, and research exchanges with elite global universities and institutions.",
    bgImageUrl: "/images/hero-bg.png",
    mobileBgImageUrl: "/images/hero-bg-mobile.png",
  },
  overview: {
    title: "Bridging Scholarship Across Borders",
    paragraphs: [
      "Our international connections form the backbone of IRITAQ's global outreach, connecting specialized Qur'anic exegesis research with premier academic institutions worldwide.",
      "Through joint fellowships, shared digital archives, and high-level symposia, these partnerships guarantee rigorous peer review, cross-cultural scholarly input, and preservation of rare manuscript heritage."
    ],
  },
  partners: [
    {
      id: "p1",
      name: "University of Oxford",
      logoUrl: "/images/partners/oxford.png",
      description: "Collaborative research framework focusing on Middle Eastern manuscripts, codicology, and comparative textual analysis of classical Tafsir works.",
      websiteUrl: "https://www.ox.ac.uk"
    },
    {
      id: "p2",
      name: "Al-Azhar University",
      logoUrl: "/images/partners/alazhar.png",
      description: "Strategic partnership on traditional Islamic jurisprudence, Arabic rhetoric studies, and joint certification of advanced Qur'anic sciences curricula.",
      websiteUrl: "https://www.azhar.eg"
    },
    {
      id: "p3",
      name: "Cambridge Islamic College",
      logoUrl: "/images/partners/cambridge.png",
      description: "Joint academic symposia, faculty exchange initiatives, and modern digital humanities applications in textual Qur'anic databases.",
      websiteUrl: "https://www.cambridgeislamiccollege.org"
    }
  ],
  archives: [
    {
      url: "/images/archives/archive-1.jpg",
      caption: "MOU signing ceremony with international visiting delegates."
    },
    {
      url: "/images/archives/archive-2.jpg",
      caption: "Joint manuscript restoration workshop and paleography training session."
    },
    {
      url: "/images/archives/archive-3.jpg",
      caption: "International Qur'anic Studies roundtable discussion panel."
    }
  ]
};