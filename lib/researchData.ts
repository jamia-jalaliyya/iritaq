export interface NavigationCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ResearchDomain {
  id: number;
  title: string;
  icon: string;
}

export interface OngoingProject {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  dateRange: string;
  imageUrl: string;
}

export const researchData = {
  hero: {
    badge: "RESEARCH",
    title: "Advancing Knowledge Through Excellence",
    description:
      "IRITAQ is committed to promoting high-impact research in Qur'anic studies and related disciplines, addressing contemporary issues and contributing to the global scholarly community.",
    backgroundImage: "/images/quran2.jpg",
    mobileBackgroundImage: "/images/quran2-mobile.jpg",
  },
  
  navigationCards: [
    {
      id: "domains",
      title: "Research Domains",
      description: "Explore our diverse research domains in Qur'anic studies and related disciplines.",
      icon: "BookOpen",
      link: "#domains",
    },
    {
      id: "projects",
      title: "Research Projects",
      description: "Discover our impactful research projects addressing contemporary challenges.",
      icon: "FlaskConical",
      link: "#projects",
    },
    {
      id: "ongoing",
      title: "Ongoing Research",
      description: "Browse current research initiatives undertaken by our scholars.",
      icon: "FileText",
      link: "#projects",
    },
    {
      id: "completed",
      title: "Completed Research",
      description: "View our completed research projects and their significant contributions.",
      icon: "CheckCircle",
      link: "#projects",
    },
    {
      id: "grants",
      title: "Research Grants",
      description: "Learn about research funding opportunities and grant support at IRITAQ.",
      icon: "Wallet",
      link: "#grants",
    },
    {
      id: "ethics",
      title: "Research Ethics",
      description: "Our commitment to ethical research practices and academic integrity.",
      icon: "ShieldCheck",
      link: "#ethics",
    },
    {
      id: "centres",
      title: "Research Centres",
      description: "Explore our specialized research centres fostering advanced studies.",
      icon: "Building2",
      link: "#centres",
    },
    {
      id: "publications",
      title: "Research Publications",
      description: "Access publications, papers and outputs from our research activities.",
      icon: "FileCode",
      link: "#publications",
    },
  ] as NavigationCard[],

  stats: [
    { value: "12+", label: "RESEARCH DOMAINS" },
    { value: "85+", label: "RESEARCH PROJECTS" },
    { value: "45+", label: "ONGOING RESEARCH" },
    { value: "250+", label: "PUBLICATIONS" },
    { value: "30+", label: "RESEARCH SCHOLARS" },
    { value: "15+", label: "RESEARCH GRANTS" },
  ] as StatItem[],

  domains: [
    { id: 1, title: "Tafsir and Qur'anic Exegesis", icon: "BookOpen" },
    { id: 2, title: "Qur'anic Sciences", icon: "Scroll" },
    { id: 3, title: "Qur'anic Manuscripts and Heritage", icon: "Landmark" },
    { id: 4, title: "Linguistics and Qur'anic Language", icon: "FileText" },
    { id: 5, title: "Qur'anic Rhetoric and Literary Studies", icon: "FileSpreadsheet" },
    { id: 6, title: "Comparative and Interfaith Studies", icon: "Building2" },
    { id: 7, title: "Digital Humanities & AI in Qur'anic Studies", icon: "Cpu" },
    { id: 8, title: "Contemporary Issues in Qur'anic Studies", icon: "FlaskConical" },
  ] as ResearchDomain[],

  ongoingProjects: [
    {
      id: "p1",
      title: "Thematic Study of Mercy in the Qur'an",
      author: "Dr. Abdul Rahman Al-Masri",
      category: "Tafsir Studies",
      status: "Ongoing",
      dateRange: "May 2024 – Present",
      imageUrl: "/images/project-mercy.jpg",
    },
    {
      id: "p2",
      title: "AI-based Arabic Text Analysis for Qur'anic Research",
      author: "Dr. Fatimah Al-Zahra",
      category: "Digital Qur'anic Studies",
      status: "Ongoing",
      dateRange: "Feb 2024 – Present",
      imageUrl: "/images/project-ai.jpg",
    },
    {
      id: "p3",
      title: "Manuscript Preservation and Digitization Project",
      author: "Dr. Ahmed Zaki",
      category: "Qur'anic Manuscripts",
      status: "Ongoing",
      dateRange: "Jan 2024 – Present",
      imageUrl: "/images/project-manuscript.jpg",
    },
  ] as OngoingProject[],

  cta: {
    title: "Contribute to Knowledge. Inspire Humanity.",
    description: "Join our research community and be part of a global mission to advance Qur'anic scholarship and serve humanity.",
    primaryButtonText: "Join as Researcher",
    primaryButtonLink: "/join-researcher",
    secondaryButtonText: "Collaborate With Us",
    secondaryButtonLink: "/collaborate",
  },
};