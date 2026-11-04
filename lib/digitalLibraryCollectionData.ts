export interface CollectionResource {
  id: string;
  title: string;
  category: string;
  status: "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  isFeatured: boolean;
  description: string;
  language: "Arabic" | "English" | "Malayalam" | "Urdu";
  image: string;
}

export interface RelatedCategoryPill {
  name: string;
  slug: string;
}

export const collectionData = {
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Digital Library", href: "/digital-library" },
      { label: "Tafsir Collections", href: "/digital-library/tafsir-collections" },
    ],
    tagline: "DIGITAL LIBRARY",
    title: "Tafsir Collections",
    description:
      "Classical and contemporary commentaries of the Holy Qur'an, indexed by school, era and methodology.",
    backgroundImage: "/images/quran2.jpg",
    mobileBackgroundImage: "/images/quran2-mobile.jpg",
  },

  resourcesHeader: {
    countTag: "3 RESOURCES",
    title: "Tafsir Collections resources",
    subtitle:
      "Entries are managed as data: publish, unpublish, schedule, feature or archive each resource and attach unlimited media.",
    addButtonText: "+ Add resource",
  },

  items: [
    {
      id: "res-1",
      title: "Jami' al-Bayan: A Critical Reading",
      category: "Tafsir Collections",
      status: "PUBLISHED",
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
      status: "PUBLISHED",
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
      status: "PUBLISHED",
      isFeatured: true,
      description:
        "An annotated study of al-Tabari's methodology in narration-based exegesis with comparative notes.",
      language: "Arabic",
      image: "/images/library/quran-book-3.jpg",
    },
  ] as CollectionResource[],

  relatedCategories: [
    { name: "Qur'anic Sciences", slug: "quranic-sciences" },
    { name: "Classical Islamic Books", slug: "classical-books" },
    { name: "Digital Manuscripts", slug: "digital-manuscripts" },
    { name: "Research Papers", slug: "research-papers" },
    { name: "E Books", slug: "e-books" },
    { name: "Academic Journals", slug: "academic-journals" },
    { name: "Conference Proceedings", slug: "proceedings" },
    { name: "Audio Library", slug: "audio" },
    { name: "Video Library", slug: "video" },
    { name: "Research Reports", slug: "research-reports" },
    { name: "Digital Archive", slug: "digital-archive" },
  ] as RelatedCategoryPill[],
};