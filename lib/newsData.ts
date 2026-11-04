// data/newsData.ts

export const newsHero = {
  backgroundImage: "/images/lib.jpe",
  mobileBackgroundImage: "/images/lib-mobile.jpe",
};

export interface FeaturedArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  actionText?: string;
}

export interface NewsCardItem {
  id: string;
  category: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

export interface PressReleaseItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  pdfUrl: string;
}

export interface ConferenceHighlightItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const featuredMainStory: FeaturedArticle = {
  id: "feat-1",
  category: "INSTITUTIONAL NEWS",
  date: "December 15, 2026",
  title: "IRITAQ Forms Landmark Academic Partnership with the Syed Muhammad Ali Shihab Thangal Consortium",
  excerpt:
    "This historic agreement paves the way for joint international symposia, shared digital databases of ancient manuscripts, and scholar exchange programs starting in early 2027.",
  image: "/images/news/partnership-meeting.jpg",
  link: "/news/iritaq-landmark-partnership",
  actionText: "Read Full Article",
};

export const featuredSideStories: FeaturedArticle[] = [
  {
    id: "feat-2",
    category: "RESEARCH NEWS",
    date: "Nov 28, 2026",
    title: "Pioneering AI Arabic Text Analysis Model Released for Public Peer Review",
    excerpt:
      "IRITAQ's Digital Humanities division has open-sourced its semantic processing algorithm engineered for classical Arabic grammar sy...",
    image: "/images/news/ai-research.jpg",
    link: "/news/pioneering-ai-arabic-model",
    actionText: "Read Abstract",
  },
  {
    id: "feat-3",
    category: "CONFERENCE NEWS",
    date: "Oct 14, 2026",
    title: "Keynote Speakers Announced for the upcoming Cairo Islamic Heritage Summit",
    excerpt:
      'Prof. Khalid Al-Azhari will be leading the panel on "Qur\'anic Linguistics and Rhetoric in the Digital Age" alongside global auth...',
    image: "/images/news/cairo-summit.jpg",
    link: "/news/keynote-speakers-cairo-summit",
    actionText: "View Schedule",
  },
];

export const newsCategories = [
  "All News",
  "Research News",
  "Academic News",
  "Institutional",
  "Announcements",
  "Press Releases",
  "International",
  "Publications",
];

export const initialNewsGridItems: NewsCardItem[] = [
  {
    id: "grid-1",
    category: "RESEARCH",
    date: "Dec 10, 2026",
    author: "By Dr. Omar Al-Suyuti",
    title: "Shedding Light on Lost 3rd Century Qur'anic Parchments",
    excerpt:
      "Our Manuscript Department has completed multi-spectral analysis on a newly discovered codex fragm...",
    image: "/images/news/manuscript-reading.jpg",
    slug: "shedding-light-lost-parchments",
  },
  {
    id: "grid-2",
    category: "ACADEMIC",
    date: "Nov 15, 2026",
    author: "By Dr. Fatimah Al-Zahri",
    title: "Applications Now Open for Winter Fellowship Cohort",
    excerpt:
      "The Syed Muhammad Ali Shihab Thangal Research Consortium is now accepting proposals for the Winte...",
    image: "/images/news/conference-hall.jpg",
    slug: "applications-open-winter-fellowship",
  },
  {
    id: "grid-3",
    category: "INSTITUTIONAL",
    date: "Oct 30, 2026",
    author: "By Executive Council",
    title: "Annual Performance Review Rates IRITAQ Outstanding",
    excerpt:
      "The Academic Excellence Board has completed its decennial performance review, highly praising the ins...",
    image: "/images/news/scholars-gate.jpg",
    slug: "annual-performance-review-outstanding",
  },
  {
    id: "grid-4",
    category: "PUBLICATIONS",
    date: "Oct 05, 2026",
    author: "By Editorial Board",
    title: "IRITAQ Journal of Tafsir Studies Issue No. 14 Released",
    excerpt:
      "Featuring 8 peer-reviewed research papers exploring digital corpus linguistics, thematic analysis, and mod...",
    image: "/images/news/journal-typewriter.jpg",
    slug: "tafsir-studies-journal-issue-14",
  },
  {
    id: "grid-5",
    category: "HERITAGE",
    date: "Sep 22, 2026",
    author: "By Prof. Ahmed Zaki",
    title: "Joint Heritage Exhibition Opens in Collaboration with Cairo Museum",
    excerpt:
      "An exquisite collection of rare hand-painted manuscripts will be displayed for public and scholarl...",
    image: "/images/news/illuminated-manuscript.jpg",
    slug: "joint-heritage-exhibition-cairo-museum",
  },
  {
    id: "grid-6",
    category: "ANNOUNCEMENT",
    date: "Aug 14, 2026",
    author: "By Media Center",
    title: "Webinar Scheduled: AI's Integration into Islamic Studies",
    excerpt:
      "Join our Digital Humanities experts as they present live case studies demonstrating correct workflows fo...",
    image: "/images/news/ai-presentation.jpg",
    slug: "webinar-ai-integration-islamic-studies",
  },
];

export const officialPressReleases: PressReleaseItem[] = [
  {
    id: "pr-1",
    date: "November 10, 2026",
    title: "IRITAQ Announces Expansion of Digital Archive with Over 5,000 Rare Manuscripts Added",
    summary:
      "In a collaborative effort with Egypt and Morocco libraries, IRITAQ digitizes and categorizes historical commentaries for online open access.",
    pdfUrl: "#download-pr-1",
  },
  {
    id: "pr-2",
    date: "October 01, 2026",
    title: "Al-Jamia Al-Jalaliyya Appoints Dr. Omar Al-Suyuti as New Dean of Academic Affairs",
    summary:
      "Dr. Al-Suyuti's legacy in textual preservation and Arabic linguistics will lead the newly structured interdisciplinary studies department.",
    pdfUrl: "#download-pr-2",
  },
  {
    id: "pr-3",
    date: "September 15, 2026",
    title: "International Symposium on Tafsir Methodologies Set to Launch in London this December",
    summary:
      "Scholars, computational researchers, and translators will converge to debate standardization guidelines in contemporary digital translation.",
    pdfUrl: "#download-pr-3",
  },
];

export const conferenceHighlights: ConferenceHighlightItem[] = [
  {
    id: "conf-1",
    date: "May 2026",
    title: "International Qur'anic Studies Conference",
    description: "Scholars and researchers exploring Qur'anic studies.",
    image: "/images/news/conf-mosque-night.jpg",
  },
  {
    id: "conf-2",
    date: "April 2026",
    title: "Global Qur'anic Scholarship Symposium",
    description: "International scholars sharing research and insights.",
    image: "/images/news/conf-dome-sunset.jpg",
  },
  {
    id: "conf-3",
    date: "March 2026",
    title: "Qur'anic Manuscripts & Heritage Seminar",
    description: "Exploring the preservation of Qur'anic manuscripts.",
    image: "/images/news/conf-open-quran.jpg",
  },
  {
    id: "conf-4",
    date: "February 2026",
    title: "Annual Research & Academic Forum",
    description: "Researchers presenting their latest academic work.",
    image: "/images/news/conf-sunlight-arches.jpg",
  },
];