export interface AboutHero {
  tagline: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  bgImageUrl: string;
  bgImageUrlMobile?: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutExecutiveOverview {
  tagline: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageUrlMobile?: string;
}

export interface AboutFoundingVision {
  tagline: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
  imageUrlMobile?: string;
}

export interface AboutVisionMission {
  tagline: string;
  title: string;
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  missionDescription: string;
}

export interface AboutCoreValue {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface AboutCoreValues {
  tagline: string;
  title: string;
  subtitle: string;
  values: AboutCoreValue[];
}

export interface AboutInstitutionalProfile {
  tagline: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export interface AboutMilestone {
  id: string;
  tagline: string;
  title: string;
  description: string;
}

export interface AboutHistoryObjectives {
  tagline: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageUrlMobile?: string;
  milestones: AboutMilestone[];
}

export interface AboutPageData {
  hero: AboutHero;
  stats: AboutStat[];
  executiveOverview: AboutExecutiveOverview;
  foundingVision: AboutFoundingVision;
  visionMission: AboutVisionMission;
  coreValues: AboutCoreValues;
  institutionalProfile: AboutInstitutionalProfile;
  historyObjectives: AboutHistoryObjectives;
}

export const defaultAboutData: AboutPageData = {
  hero: {
    tagline: "ABOUT THE INSTITUTE",
    title: "An International Home for Qur'anic Scholarship",
    description:
      "A premier academic and research institution advancing excellence in Tafsir al-Qur'an, Qur'anic Sciences and interdisciplinary Islamic research.",
    primaryBtnText: "Our Governance",
    primaryBtnLink: "/governance",
    secondaryBtnText: "Research Domains",
    secondaryBtnLink: "/domains",
    bgImageUrl: "/hero-bg.png",
    bgImageUrlMobile: "/hero-bg.png",
  },
  stats: [
    { value: "08", label: "ACADEMIC DEPARTMENTS" },
    { value: "10", label: "RESEARCH DOMAINS" },
    { value: "06", label: "PUBLISHING STREAMS" },
    { value: "25", label: "SCHOLARS & OFFICE HOLDERS" },
  ],
  executiveOverview: {
    tagline: "EXECUTIVE OVERVIEW",
    title: "Scholarship, Integrity and Global Collaboration",
    paragraph1:
      "The International Research Institute for Tafsir al-Qur'an (IRITAQ) is a premier international academic and research institution established under the auspices of Al-Jamia Al-Jalaliyya in Kerala, India. As a flagship initiative of the Syed Muhammad Ali Shihab Thangal Research Consortium, the Institute is dedicated to advancing excellence in Tafsir al-Qur'an, Qur'anic Sciences and interdisciplinary Islamic research through rigorous scholarship, academic integrity and global collaboration.",
    paragraph2:
      "IRITAQ serves as an international platform for research, scholarly dialogue, academic publications and institutional partnerships, while integrating the rich heritage of classical Islamic scholarship with contemporary research methodologies and emerging technologies.",
    buttonText: "Academic Departments",
    buttonLink: "/departments",
    imageUrl: "/overview-mosque.png",
    imageUrlMobile: "/overview-mosque.png",
  },
  foundingVision: {
    tagline: "FOUNDING VISION",
    title: "A Legacy That Continues to Guide Us",
    paragraph1:
      "The establishment of IRITAQ is inspired by the visionary legacy of Shams al-Ulama Sheikh Abu Bakr Musliyar, whose lifelong dedication to Qur'anic scholarship, authentic Islamic education and intellectual excellence continues to inspire generations.",
    paragraph2:
      "The Institute also honours the enduring legacy of Sayyid Muhammad Ali Shihab Thangal, whose exemplary leadership, moral integrity, educational vision and lifelong service to Islam and humanity remain the guiding spirit of this institution.",
    imageUrl: "/founding-legacy.png",
    imageUrlMobile: "/founding-legacy.png",
  },
  visionMission: {
    tagline: "VISION & MISSION",
    title: "Purpose That Anchors Every Programme",
    visionTitle: "Our Vision",
    visionDescription:
      "To become a globally recognized centre of excellence and an authoritative reference in Tafsir al-Qur'an and Qur'anic Studies through academic leadership, pioneering research and international collaboration.",
    missionTitle: "Our Mission",
    missionDescription:
      "To advance authentic Qur'anic scholarship through innovative research, academic excellence, international cooperation, scholarly publications and advanced educational programs, while preparing future generations of researchers dedicated to serving the Holy Qur'an and humanity.",
  },
  coreValues: {
    tagline: "CORE VALUES",
    title: "The Principles Behind Our Research",
    subtitle:
      "Every project approved and published by the Institute is measured against these commitments.",
    values: [
      {
        id: "1",
        number: "01",
        title: "Academic Excellence",
        description:
          "Rigorous scholarship measured against international research standards.",
      },
      {
        id: "2",
        number: "02",
        title: "Authenticity",
        description:
          "Grounded in the classical heritage and methodology of Islamic scholarship.",
      },
      {
        id: "3",
        number: "03",
        title: "Integrity",
        description:
          "Transparent governance, ethical research and honest scholarly practice.",
      },
      {
        id: "4",
        number: "04",
        title: "Innovation",
        description:
          "Emerging technologies applied thoughtfully to Qur'anic research.",
      },
      {
        id: "5",
        number: "05",
        title: "Intellectual Responsibility",
        description:
          "Scholarship that serves the community with clarity and care.",
      },
      {
        id: "6",
        number: "06",
        title: "Global Collaboration",
        description:
          "Partnership with universities and research centres worldwide.",
      },
    ],
  },
  institutionalProfile: {
    tagline: "INSTITUTIONAL PROFILE",
    title: "Specialised, International, Interdisciplinary",
    paragraph1:
      "IRITAQ is an international research institute specializing in Tafsir al-Qur'an, Qur'anic Sciences, Qira'at, Qur'anic manuscripts, linguistic studies and interdisciplinary Islamic research.",
    paragraph2:
      "The Institute collaborates with universities, scholars and research organizations worldwide through academic partnerships, conferences, publications and research initiatives aimed at strengthening global Qur'anic scholarship.",
  },
  historyObjectives: {
    tagline: "HISTORY & OBJECTIVES",
    title: "How the Institute Came to Be",
    subtitle:
      "From its founding under Al-Jamia Al-Jalaliyya to its strategic objectives for the years ahead.",
    imageUrl: "/history-mosque.png",
    imageUrlMobile: "/history-mosque.png",
    milestones: [
      {
        id: "1",
        tagline: "FOUNDATION",
        title: "Established under Al-Jamia Al-Jalaliyya",
        description:
          "The International Research Institute for Tafsir al-Qur'an was established under the auspices of Al-Jamia Al-Jalaliyya as a pioneering initiative of the Syed Muhammad Ali Shihab Thangal Research Consortium.",
      },
      {
        id: "2",
        tagline: "MANDATE",
        title: "A global platform for advanced Tafsir research",
        description:
          "The Institute was founded to provide a global academic platform for advanced research in Tafsir al-Qur'an, preserving the rich heritage of classical Islamic scholarship.",
      },
      {
        id: "3",
        tagline: "DIRECTION",
        title: "Answering contemporary intellectual challenges",
        description:
          "Addressing contemporary intellectual and academic challenges through innovative research, publications and international cooperation.",
      },
      {
        id: "4",
        tagline: "OBJECTIVES",
        title: "Strategic objectives for the decade ahead",
        description:
          "Cultivating distinguished researchers, developing advanced research programs, publishing high quality scholarly works, establishing strategic partnerships with leading universities, and utilizing emerging technologies including Artificial Intelligence.",
      },
    ],
  },
};