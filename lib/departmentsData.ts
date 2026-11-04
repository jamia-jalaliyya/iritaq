export interface ResearchUnit {
  name: string;
}

export interface Department {
  id: string;
  number: string;
  badge: string;
  title: string;
  description: string;
  researchUnits: string[];
  slug: string;
}

export const departmentsData = {
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "ACADEMIC DEPARTMENTS", href: "/departments" },
    ],
    tag: "ACADEMIC DIVISIONS & RESEARCH",
    title: "Six departments, one scholarly programme.",
    description:
      "Each department maintains its own research units, teaching staff and publication pipeline while contributing to the Institute's shared agenda.",
    buttonText: "Explore Departments",
    buttonLink: "#departments-list",
    backgroundImage: "/images/dep.jpe", // Default desktop image
    mobileBackgroundImage: "/images/dep-mobile.jpe", // Default mobile image
  },

  sectionHeader: {
    tag: "DEPARTMENTS",
    title: "Departments and research units",
    description:
      "Departments are data-driven: new departments and units can be added without altering the site structure.",
  },

  departments: [
    {
      id: "tafsir",
      number: "01",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Tafsir",
      description:
        "Exegetical traditions, hermeneutics and interpretive authority. Advancing scholarship in classical commentary lineages.",
      researchUnits: [
        "Classical Tafsir",
        "Modern Tafsir",
        "Comparative Exegesis",
      ],
      slug: "/departments/tafsir",
    },
    {
      id: "quranic-sciences",
      number: "02",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Qur'anic Sciences",
      description:
        "Transmission sciences, qira'at, rasm and textual history. Digging deep into foundational disciplines of revelation.",
      researchUnits: [
        "Qira'at Studies",
        "Rasm & Orthography",
        "Asbab al-Nuzul",
      ],
      slug: "/departments/quranic-sciences",
    },
    {
      id: "manuscripts",
      number: "03",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Manuscripts",
      description:
        "Codicology, cataloguing, conservation and critical editions. Preserving rare classical folios with scientific rigour.",
      researchUnits: [
        "Codicology Studies",
        "Digital Preservation",
        "Critical Editions",
      ],
      slug: "/departments/manuscripts",
    },
    {
      id: "translation-studies",
      number: "04",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Translation Studies",
      description:
        "Translation theory, review and multilingual publication. Rendering authoritative scholarship accessible globally.",
      researchUnits: [
        "Translation Review",
        "Terminology Standards",
        "Multilingual Publishing",
      ],
      slug: "/departments/translation-studies",
    },
    {
      id: "quran-and-society",
      number: "05",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Qur'an & Society",
      description:
        "Ethics, law, economics and contemporary application. Fostering understanding of Qur'anic relevance in modern spaces.",
      researchUnits: [
        "Ethics & Law",
        "Society & Culture",
        "Science & Qur'an",
      ],
      slug: "/departments/quran-and-society",
    },
    {
      id: "digital-humanities",
      number: "06",
      badge: "IRITAQ ACADEMICS",
      title: "Department of Digital Humanities",
      description:
        "Corpora, annotation standards and computational analysis. Bridging historical texts with modern technology.",
      researchUnits: [
        "Corpus Building",
        "Semantic Annotation",
        "Data & Analytical Tools",
      ],
      slug: "/departments/digital-humanities",
    },
  ] as Department[],

  cta: {
    tag: "STUDY WITH US",
    title: "Programmes are offered through the departments",
    buttonText: "View Academic Programmes",
    buttonLink: "/programmes",
  },
};