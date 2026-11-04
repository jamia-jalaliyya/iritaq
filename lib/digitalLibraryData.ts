export interface LibraryCategory {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  resourceCount: string;
  link: string;
}

export interface FeaturedResource {
  id: string;
  categoryTag: string;
  title: string;
  description: string;
  link: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Scheduled" | "Archived";
  isFeatured: boolean;
  description: string;
  language: "Arabic" | "English" | "Malayalam" | "Urdu";
  image: string;
  pdfUrl?: string;
  externalLink?: string;
  downloadUrl?: string;
}

export const digitalLibraryData = {
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Digital Library", href: "/digital-library" },
    ],
    tagline: "KNOWLEDGE RESOURCES",
    title: "A digital hub for Qur'anic studies and scholarly resources.",
    description:
      "A searchable collection of tafsir, Qur'anic sciences, classical books, manuscripts, journals, audio, and video resources—all in one place.",
    primaryButtonText: "Browse Digital Library",
    primaryButtonLink: "#categories",
    secondaryButtonText: "Search all resources",
    secondaryButtonLink: "#all-resources",
    backgroundImage: "/images/lib.jpe", // Default desktop image
    mobileBackgroundImage: "/images/lib-mobile.jpe", // Default mobile image
  },

  stats: [
    { value: "12", label: "DIGITAL LIBRARY CATEGORIES" },
    { value: "20", label: "RESOURCES" },
    { value: "4", label: "PUBLICATION LANGUAGES" },
  ],

  categoriesSection: {
    tagline: "CATEGORIES",
    title: "Explore Digital Library",
    description:
      "Every category below is dynamic. New categories added in the admin panel appear here, in navigation, in search and in filters automatically.",
    items: [
      {
        id: "tafsir-collections",
        title: "Tafsir Collections",
        arabicTitle: "مجموعات التفسير",
        description:
          "Classical and contemporary commentaries of the Holy Qur'an, indexed by school, era and methodology.",
        resourceCount: "3 Resources",
        link: "/digital-library/tafsir",
      },
      {
        id: "quranic-sciences",
        title: "Qur'anic Sciences",
        arabicTitle: "علوم القرآن",
        description:
          "Foundational disciplines: asbab al-nuzul, nasikh wa mansukh, i'jaz, qira'at and rasm al-mushaf.",
        resourceCount: "2 Resources",
        link: "/digital-library/quranic-sciences",
      },
      {
        id: "classical-books",
        title: "Classical Islamic Books",
        arabicTitle: "الكتب الإسلامية الكلاسيكية",
        description: "Heritage texts in fiqh, hadith, aqidah, usul and Arabic grammar.",
        resourceCount: "2 Resources",
        link: "/digital-library/classical-books",
      },
      {
        id: "digital-manuscripts",
        title: "Digital Manuscripts",
        arabicTitle: "المخطوطات الرقمية",
        description:
          "High-resolution facsimiles of rare Qur'anic and Islamic manuscripts with codicological records.",
        resourceCount: "2 Resources",
        link: "/digital-library/manuscripts",
      },
      {
        id: "research-papers",
        title: "Research Papers",
        arabicTitle: "الأوراق البحثية",
        description:
          "Peer-reviewed papers produced by Institute researchers and international fellows.",
        resourceCount: "2 Resources",
        link: "/digital-library/research-papers",
      },
      {
        id: "e-books",
        title: "E Books",
        arabicTitle: "الكتب الإلكترونية",
        description:
          "Institute e-book editions optimised for reading on tablets and e-readers.",
        resourceCount: "1 Resource",
        link: "/digital-library/ebooks",
      },
      {
        id: "academic-journals",
        title: "Academic Journals",
        arabicTitle: "المجلات الأكاديمية",
        description:
          "Institute journals with complete issue archives and article-level metadata.",
        resourceCount: "2 Resources",
        link: "/digital-library/journals",
      },
      {
        id: "conference-proceedings",
        title: "Conference Proceedings",
        arabicTitle: "أعمال المؤتمرات",
        description:
          "Full proceedings, abstract books and presentation decks from Institute conferences.",
        resourceCount: "1 Resource",
        link: "/digital-library/proceedings",
      },
      {
        id: "audio-library",
        title: "Audio Library",
        arabicTitle: "المكتبة الصوتية",
        description: "Lectures, recitations, seminars and scholarly interviews.",
        resourceCount: "2 Resources",
        link: "/digital-library/audio",
      },
    ] as LibraryCategory[],
  },

  featuredSection: {
    tagline: "FEATURED",
    title: "Highlighted from Digital Library",
    items: [
      {
        id: "feat-1",
        categoryTag: "TAFSIR COLLECTIONS",
        title: "Jami' al-Bayan: A Critical Reading",
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        link: "/digital-library/resource/1",
      },
      {
        id: "feat-2",
        categoryTag: "QUR'ANIC SCIENCES",
        title: "Introduction to Ulum al-Qur'an",
        description:
          "Graduate-level primer surveying the classical sciences of the Qur'an with contemporary readings.",
        link: "/digital-library/resource/2",
      },
      {
        id: "feat-3",
        categoryTag: "DIGITAL MANUSCRIPTS",
        title: "Kufic Mushaf Folio, 3rd Century AH",
        description:
          "Facsimile of an early Kufic folio with palaeographic description and provenance notes.",
        link: "/digital-library/resource/3",
      },
    ] as FeaturedResource[],
  },

  allResourcesSection: {
    tagline: "SEARCH & FILTER",
    title: "All resources",
    description:
      "Search, filter by publication state and language, and open any entry to see its media, documents and citation data.",
    items: [
      {
        id: "res-1",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-1.jpg",
      },
      {
        id: "res-2",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-2.jpg",
      },
      {
        id: "res-3",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-3.jpg",
      },
      {
        id: "res-4",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-3.jpg",
      },
      {
        id: "res-5",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-1.jpg",
      },
      {
        id: "res-6",
        title: "Jami' al-Bayan: A Critical Reading",
        category: "Tafsir Collections",
        status: "Published",
        isFeatured: true,
        description:
          "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
        language: "Arabic",
        image: "/images/library/quran-book-2.jpg",
      },
    ] as ResourceItem[],
  },
};