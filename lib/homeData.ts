export interface ResearchDomain {
  id: string;
  title: string;
}

export interface NewsEvent {
  id: string;
  date: string;
  title: string;
  image: string; // Desktop / default
  mobileImage?: string; // Mobile (portrait)
}

export interface Publication {
  id: string;
  title: string;
  description: string;
  image: string; // Desktop / default
  mobileImage?: string; // Mobile (portrait)
}

export interface HomePageSettings {
  heroSubheading: string;
  heroHeading: string;
  heroDescription: string;
  heroBgImage: string;
  heroBgImageMobile?: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnLink: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnLink: string;
  announcements: string[];
  welcomeSubheading: string;
  welcomeHeading: string;
  welcomeDescription: string;
  welcomeImage: string;
  welcomeImageMobile?: string;
  patronSubheading: string;
  patronQuoteHeading: string;
  patronQuoteText: string;
  patronName: string;
  patronTitle: string;
  patronImage: string;
  patronImageMobile?: string;
  patronBgImage: string;
  patronBgImageMobile?: string;
  vmSubheading: string;
  vmHeading: string;
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  missionDescription: string;
  researchDomains: ResearchDomain[];
  newsEvents: NewsEvent[];
  publications: Publication[];
}

export const DEFAULT_HOME_PAGE_SETTINGS: HomePageSettings = {
  heroSubheading: "INTERNATIONAL RESEARCH INSTITUTE FOR TAFSIR AL-QUR'AN",
  heroHeading: "Advancing Qur'an Scholarship",
  heroDescription:
    "IRITAQ is a global centre for advanced research in Tafsir, Qur'anic Sciences and Islamic knowledge.",
  heroBgImage: "/hero.png",
  heroBgImageMobile: "/hero.png",
  heroPrimaryBtnText: "Join Community",
  heroPrimaryBtnLink: "/community",
  heroSecondaryBtnText: "Explore Research",
  heroSecondaryBtnLink: "/research",
  announcements: [
    "IRITAQ International Conference on Qur'anic Sciences — Registration Now Open",
    "New Research Publication: Advances in Tafsir Methodology",
  ],
  welcomeSubheading: "WELCOME TO IRITAQ",
  welcomeHeading: "A Global Centre for Qur'anic Scholarship",
  welcomeDescription:
    "The International Research Institute for Tafsir al-Qur'an (IRITAQ) is an international academic and research institution established under the auspices of Al-Jamia Al-Jalaliyya.",
  welcomeImage: "/wel.png",
  welcomeImageMobile: "/wel.png",
  patronSubheading: "GRAND PATRON",
  patronQuoteHeading: '"Message from the Grand Patron"',
  patronQuoteText:
    "IRITAQ was established with a clear vision to promote authentic Qur'anic scholarship...",
  patronName: "Sayyid Muhammad Jifri Muthu Koya Thangal",
  patronTitle: "GRAND PATRON",
  patronImage: "/thangalusthad.png",
  patronImageMobile: "/thangalusthad.png",
  patronBgImage: "/patronbg.png",
  patronBgImageMobile: "/patronbg.png",
  vmSubheading: "VISION & MISSION",
  vmHeading: "Purpose That Anchors Every Programme",
  visionTitle: "Our Vision",
  visionDescription:
    "To become a globally recognized centre of excellence in Qur'anic research, exegesis, and academic studies.",
  missionTitle: "Our Mission",
  missionDescription:
    "To advance authentic Qur'anic scholarship through innovative research, international collaboration, and classical methodology.",
  researchDomains: [
    { id: "1", title: "Tafsir & Qur'anic Exegesis" },
    { id: "2", title: "Qur'anic Sciences & Hermeneutics" },
    { id: "3", title: "Manuscript & Textual Studies" },
    { id: "4", title: "Linguistic & Rhetorical Analysis" },
    { id: "5", title: "Contemporary Qur'anic Applications" },
    { id: "6", title: "Digital Qur'anic Studies" },
  ],
  newsEvents: [
    {
      id: "1",
      title: "IRITAQ Hosts International Seminar on Classical Tafsir Literature",
      date: "OCTOBER 24, 2026",
      image: "/wel.png",
      mobileImage: "/wel.png",
    },
    {
      id: "2",
      title: "Call for Papers: Annual Journal of Qur'anic Exegesis",
      date: "NOVEMBER 12, 2026",
      image: "/hero.png",
      mobileImage: "/hero.png",
    },
  ],
  publications: [
    {
      id: "1",
      title: "Methodologies in Classical Tafsir",
      description: "A comprehensive study of traditional exegetical approaches.",
      image: "/wel.png",
      mobileImage: "/wel.png",
    },
  ],
};