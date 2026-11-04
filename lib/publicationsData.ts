// data/publicationsData.ts

export interface Publication {
  id: string;
  type: "Journals" | "Books" | "Monographs" | "Research Papers" | "Proceedings" | "Digital Publications";
  badgeLabel: string;
  title: string;
  author: string;
  description: string;
  year: string;
  pages: string;
  language: string;
  coverImage: string;
  featured?: boolean;
}

export const publicationsData = {
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Publications", href: "/publications" },
    ],
    tag: "PUBLICATION CATALOGUE",
    title: "A Digital Library of Qur'anic Scholarship",
    description:
      "Peer-reviewed journals, books, monographs, proceedings and digital collections published by the Institute and its international collaborators.",
    buttonText: "Submit Your Research",
    buttonLink: "/submit-research",
    backgroundImage: "/images/lib.jpe",
    mobileBackgroundImage: "/images/lib-mobile.jpe",
  },

  featuredSection: {
    tag: "FEATURED",
    title: "Highlights from the Catalogue",
    description: "Selected works representing the Institute's current research priorities.",
  },

  browseSection: {
    tag: "BROWSE",
    title: "Publication Catalogue",
    description: "Filter by category or search the full catalogue by title, author or subject.",
    searchPlaceholder: "Search titles, authors, subjects",
    categories: [
      "All",
      "Academic Journals",
      "Books",
      "Research Papers",
      "Monographs",
      "Conference Proceedings",
      "Digital Publications",
    ],
  },

  publications: [
    {
      id: "pub-1",
      type: "Journals",
      badgeLabel: "JOURNALS",
      title: "IRITAQ Journal of Tafsir Studies",
      author: "International Scientific Council",
      description:
        "The Institute's flagship peer-reviewed journal presenting original research in classical and contemporary Qur'anic exegesis.",
      year: "2026",
      pages: "212 PP.",
      language: "ARABIC / ENGLISH",
      coverImage: "/images/pub-cover-journal-1.jpg",
    },
    {
      id: "pub-2",
      type: "Books",
      badgeLabel: "BOOKS",
      title: "AI for Qur'anic Studies",
      author: "Department of Digital & AI Research",
      description:
        "Artificial intelligence applied to Qur'anic interpretation, semantic search and the digital preservation of classical Islamic texts.",
      year: "2026",
      pages: "318 PP.",
      language: "ENGLISH",
      coverImage: "/images/pub-cover-book-1.jpg",
      featured: true,
    },
    {
      id: "pub-3",
      type: "Monographs",
      badgeLabel: "MONOGRAPHS",
      title: "Manuscripts & Heritage: Codicological Studies",
      author: "Dr. V. Suleiman",
      description:
        "Critical studies of rare Qur'anic manuscripts, codicological analysis and heritage preservation methodology.",
      year: "2025",
      pages: "184 PP.",
      language: "ARABIC",
      coverImage: "/images/pub-cover-mono-1.jpg",
      featured: true,
    },
    {
      id: "pub-4",
      type: "Research Papers",
      badgeLabel: "RESEARCH PAPERS",
      title: "Arabic Language Technologies",
      author: "Prof. Muhammad Rashid AK",
      description:
        "AI-powered tools for Arabic natural language processing, automated translation and linguistic analysis supporting Islamic scholarship.",
      year: "2026",
      pages: "42 PP.",
      language: "ENGLISH",
      coverImage: "/images/pub-cover-paper-1.jpg",
    },
    {
      id: "pub-5",
      type: "Books",
      badgeLabel: "BOOKS",
      title: "Qur'anic Linguistics and Rhetorical Structure",
      author: "Department of Qur'anic Linguistics",
      description:
        "The linguistic structure, rhetoric and stylistic features of the Holy Qur'an examined through classical and computational methods.",
      year: "2025",
      pages: "266 PP.",
      language: "ARABIC",
      coverImage: "/images/pub-cover-book-2.jpg",
    },
    {
      id: "pub-6",
      type: "Proceedings",
      badgeLabel: "PROCEEDINGS",
      title: "Proceedings: Knowledge, Faith & Civilization",
      author: "IRITAQ International Conference",
      description:
        "Full proceedings of the international conference convening scholars from universities and research centres worldwide.",
      year: "2026",
      pages: "402 PP.",
      language: "ARABIC / ENGLISH",
      coverImage: "/images/pub-cover-proceedings-1.jpg",
    },
    {
      id: "pub-7",
      type: "Journals",
      badgeLabel: "JOURNALS",
      title: "Review of Qur'anic Sciences",
      author: "Editorial Board, IRITAQ",
      description:
        "Peer-reviewed studies in Ulum al-Qur'an, revelation history and the textual sciences of the Holy Qur'an.",
      year: "2025",
      pages: "196 PP.",
      language: "ENGLISH",
      coverImage: "/images/pub-cover-journal-2.jpg",
    },
    {
      id: "pub-8",
      type: "Monographs",
      badgeLabel: "MONOGRAPHS",
      title: "Qira'at Transmission Chains: A Critical Survey",
      author: "Dr. Yasir Sarhan al-Dib",
      description:
        "The canonical readings, their transmission chains and the phonetic sciences of recitation examined in critical perspective.",
      year: "2025",
      pages: "158 PP.",
      language: "ARABIC",
      coverImage: "/images/pub-cover-mono-2.jpg",
    },
  ] as Publication[],

  cta: {
    title: "Submit your research to IRITAQ",
    description:
      "The Institute welcomes original scholarly contributions in Tafsir, Qur'anic Sciences, Qira'at, manuscripts and digital humanities.",
    buttonText: "Submit Your Research",
    buttonLink: "/submit-research",
  },
};