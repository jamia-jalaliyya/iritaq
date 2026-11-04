// data/digitalLibraryDetailData.ts

export interface ResourceDetail {
  id: string;
  category: string;
  categorySlug: string;
  title: string;
  subtitle: string;
  status: "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  author: string;
  language: string;
  heroImage: string;
  mobileHeroImage: string; // Added for separate mobile hero image
  
  // Body Content
  paragraphs: string[];

  // Attachments & Media
  mediaDocuments: {
    pdfUrl?: string;
    externalLink?: string;
    downloadPackageUrl?: string;
  };

  // Keywords
  keywords: string[];

  // Citation
  citation: string;

  // Sidebar Metadata
  details: {
    category: string;
    author: string;
    publication: string;
    language: string;
    pages: number;
    isbn: string;
  };

  // More in Category
  relatedResources: {
    title: string;
    link: string;
  }[];
}

export const sampleResourceDetail: ResourceDetail = {
  id: "jami-al-bayan-critical-reading",
  category: "TAFSIR COLLECTIONS",
  categorySlug: "tafsir-collections",
  title: "Jami' al-Bayan: A Critical Reading",
  subtitle: "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
  status: "PUBLISHED",
  author: "Dr. Ahmad Al-Hakim",
  language: "Arabic",
  heroImage: "/images/quran2.jpg", // Default desktop image
  mobileHeroImage: "/images/quran2-mobile.jpg", // Default mobile image
  
  paragraphs: [
    "Jami' al-Bayan: A Critical Reading forms part of the Institute's curated academic record. This preview uses demonstration content to show how the published entry, its media attachments and its bibliographic metadata will appear once the administrator publishes it.",
    "Editors can revise the text, attach unlimited files, translate the entry into Arabic, schedule the publication date, mark it as featured or move it to the archive — all without any change to the website structure.",
  ],

  mediaDocuments: {
    pdfUrl: "#download-pdf",
    externalLink: "https://example.org/resource",
    downloadPackageUrl: "#download-package",
  },

  keywords: ["Tafsir", "al-Tabari", "Narration"],

  citation: "Al-Hakim, A. (2025). Jami' al-Bayan: A Critical Reading. Kozhikode: IRITAQ Press.",

  details: {
    category: "Tafsir Collections",
    author: "Dr. Ahmad Al-Hakim",
    publication: "IRITAQ Press, 2025 · 412 pages",
    language: "Arabic",
    pages: 412,
    isbn: "978-93-0000-121-4",
  },

  relatedResources: [
    {
      title: "Thematic Tafsir of the Madinan Surahs",
      link: "/digital-library/resource/thematic-tafsir",
    },
    {
      title: "Comparative Tafsir Seminar Series",
      link: "/digital-library/resource/comparative-tafsir-seminar",
    },
  ],
};