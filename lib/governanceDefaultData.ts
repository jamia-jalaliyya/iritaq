// lib/governanceDefaultData.ts
import { GovernancePageData } from "@/types/governance";

export const defaultGovernanceData: GovernancePageData = {
  hero: {
    tagline: "GOVERNANCE",
    title: "Institutional Leadership & Governance",
    description:
      "A unified framework of trustees, advisory bodies, scientific councils and academic leadership guiding the Institute's global mission.",
    buttonText: "Leadership Directory",
    buttonLink: "#senior-leadership",
    bgImageUrl: "/images/hero-bg.png",
    mobileBgImageUrl: "/images/hero-bg-mobile.png",
  },
  stats: [
    { value: "06", label: "GOVERNING BODIES" },
    { value: "25", label: "OFFICE HOLDERS" },
    { value: "08", label: "ACADEMIC DEPARTMENTS" },
    { value: "12+", label: "PARTNER INSTITUTIONS" },
  ],
  overview: {
    tagline: "GOVERNANCE",
    title: "Academic Integrity Through Governance",
    subtitle:
      "Each body carries a defined mandate — from strategic stewardship to scientific evaluation — ensuring transparent decision-making across the Institute.",
  },
  seniorLeadership: {
    id: "senior-leadership",
    title: "Senior Institute Leadership",
    description:
      "The Board of Trustees is the supreme governing authority of the International Research Institute for Tafsir al-Qur'an (IRITAQ). It is entrusted with safeguarding the Institute's vision, mission, and long-term strategic direction while ensuring that its academic and institutional objectives are achieved with excellence and integrity.",
    secondaryDescription:
      "The Board provides leadership in policy formulation, institutional development, financial sustainability, and international expansion. It also oversees governance, approves major strategic initiatives, and strengthens relationships with universities, research institutions, and global academic organizations.",
    members: [
      {
        id: "s1",
        name: "Prof. Sayyid Muhammed Jifri Muthukoya Thangal",
        designation: "GRAND PATRON",
        imageUrl: "/images/thangalusthad.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "s2",
        name: "Sayyid Sadiq Ali Shihab Thangal Panakkad",
        designation: "HONORARY PRESIDENT",
        imageUrl: "/images/sdqltng.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "s3",
        name: "Sayyid Munawwar Ali Shihab Thangal Panakkad",
        designation: "HONORARY SECRETARY GENERAL",
        imageUrl: "/images/mnvrtng.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "s4",
        name: "Sayyid Abbas Ali Shihab Thangal Panakkad",
        designation: "CHAIRMAN, BOARD OF TRUSTEES",
        imageUrl: "/images/absltng.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "s5",
        name: "Prof. Abdul Gafoor Darimi",
        designation: "SECRETARY GENERAL",
        imageUrl: "/images/drmustd.png",
        badgeVariant: "emerald" as const,
      },
    ],
  },
  scientificCouncil: {
    id: "scientific-council",
    title: "International Scientific Council",
    description:
      "The International Scientific Council is the Institute's highest academic authority. Comprising eminent scholars of Ahl al-Sunnah wa al-Jema'ah from across the world, the Council provides scholarly leadership, supervises research quality, safeguards doctrinal authenticity, and approves major academic publications and research initiatives.",
    members: [
      {
        id: "sc1",
        name: "Prof. Dr. Sami Abdul Fattah Abdul Aziz Hassan Hilal",
        designation: "DIRECTOR OF QUR'ANIC SCIENCES",
        imageUrl: "/images/samiabdfth.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "sc2",
        name: "Dr. Muhammad Rajab Dib",
        designation: "DIRECTOR OF TAFSIR STUDIES",
        imageUrl: "/images/rjbdb.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "sc3",
        name: "Dr. Yasir Farhan Dib",
        designation: "DIRECTOR OF QIRA'AT STUDIES",
        imageUrl: "/images/ysrfrndb.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "sc4",
        name: "Prof. Dr. Ali Abdul Qadir Othman",
        designation: "INTERNATIONAL ADVISORY BOARD MEMBER",
        imageUrl: "/images/aliotmn.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "sc5",
        name: "Prof. Dr. Ahmad Saleh Al-Malaibari",
        designation: "DIRECTOR OF QUR'ANIC RESEARCH",
        imageUrl: "/images/amdslh.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "sc6",
        name: "Prof. Dr. Sayyid Musa Al-Kadzimi",
        designation: "DIRECTOR GENERAL",
        imageUrl: "/images/musqzmtng.png",
        badgeVariant: "emerald" as const,
      },
    ],
  },
  advisoryBoard: {
    id: "advisory-board",
    title: "International Advisory Board",
    description:
      "The International Advisory Board comprises distinguished scholars, academics, researchers, and professionals from different parts of the world who contribute their expertise to the strategic and academic development of the Institute.",
    secondaryDescription:
      "The Board provides independent advice on institutional growth, international collaboration, research priorities, academic quality, and emerging opportunities in Qur'anic studies.",
    members: [
      {
        id: "ab1",
        name: "Dr. Ibrahim Sayyid Salah Hud Hud",
        designation: "CHAIRMAN, INTERNATIONAL ADVISORY BOARD",
        imageUrl: "/images/ibrhmhdhd.png",
        badgeVariant: "amber" as const,
      },
      {
        id: "ab2",
        name: "Dr. Mohammed Saud Ahmed al-Jadahi",
        designation: "INTERNATIONAL ADVISORY BOARD MEMBER",
        imageUrl: "/images/saudjdh.png",
        badgeVariant: "amber" as const,
      },
    ],
  },
  academicLeadership: {
    id: "academic-leadership",
    title: "Academic & Research Leadership",
    description:
      "The Academic Leadership directs the scholarly activities of the Institute and provides leadership for all academic departments, research centres, publications, and educational programs.",
    secondaryDescription:
      "Its responsibilities include developing research strategies, supervising faculty and researchers, promoting interdisciplinary collaboration, establishing international academic partnerships, and ensuring the highest standards of excellence in Qur'anic scholarship.",
    members: [
      {
        id: "al1",
        name: "Sayyid Mubashir Jamalullaili al-Darimi",
        designation: "ASSOCIATE DEAN",
        imageUrl: "/images/mbsrtng.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al2",
        name: "Prof. Ibrahim Baqavi",
        designation: "DIRECTOR OF ACADEMIC AFFAIRS",
        imageUrl: "/images/ibrhmbqv.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al3",
        name: "Prof. Abdullah Al-Qasimi",
        designation: "DIRECTOR, FUNDAMENTALS OF TAFSIR AND RHETORIC",
        imageUrl: "/images/abdqsm.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al4",
        name: "Prof. Muhammed TH Darimi",
        designation: "EXECUTIVE DIRECTOR",
        imageUrl: "/images/thdrm.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al5",
        name: "Dr. V. Suleiman",
        designation: "DIRECTOR OF MANUSCRIPTS & HERITAGE",
        imageUrl: "/images/slmnsr.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al6",
        name: "Dr. Hassan Sharif Wafi K.P.",
        designation: "SCIENTIFIC DIRECTOR",
        imageUrl: "/images/hsnsrfwfy.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al7",
        name: "Dr. Abdul Vadod Nizami",
        designation: "CHAIR SCIENTIFIC COUNCIL",
        imageUrl: "/images/vddnzm.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "al8",
        name: "Muhammad Mufeed Faizy",
        designation: "DIRECTOR OF INTERNATIONAL RELATIONS",
        imageUrl: "/images/mfdfz.png",
        badgeVariant: "emerald" as const,
      },
    ],
  },
  executiveLeadership: {
    id: "executive-leadership",
    title: "Executive Leadership",
    description:
      "The Executive Leadership is responsible for the overall administration and day-to-day management of the Institute. It implements the strategic plans approved by the governing bodies and oversees academic, administrative, financial, and operational affairs.",
    secondaryDescription:
      "Working closely with academic leaders and international partners, the Executive Leadership promotes institutional growth, strengthens organizational performance, and ensures the effective implementation of research programs.",
    members: [
      {
        id: "el1",
        name: "Bappu Haji. KP",
        designation: "BOARD OF TRUSTEES MEMBERS",
        imageUrl: "/images/bphj.png",
        badgeVariant: "amber" as const,
      },
      {
        id: "el2",
        name: "Alavi Kutty Haji",
        designation: "VICE CHAIRMAN, BOARD OF TRUSTEES",
        imageUrl: "/images/alvkthj.png",
        badgeVariant: "amber" as const,
      },
      {
        id: "el3",
        name: "Saeed Anwar Muthuvallur",
        designation: "WORKING SECRETARY, BOARD OF TRUSTEES",
        imageUrl: "/images/anvr.png",
        badgeVariant: "amber" as const,
      },
    ],
  },
  researchFaculty: {
    id: "research-faculty",
    title: "Research Faculty",
    description:
      "Our distinguished research faculty comprises dedicated scholars advancing the frontiers of Qur'anic exegesis, manuscript studies, and digital humanities.",
    members: [
      {
        id: "rf1",
        name: "Prof. Muhyuddin Al-Faizy",
        designation: "VISITING PROFESSOR",
        imageUrl: "/images/ckmfz.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "rf2",
        name: "Dr. Muhammed Aslam Hudawi",
        designation: "VISITING PROFESSOR",
        imageUrl: "/images/aslmhdw.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "rf3",
        name: "Fajrudhin Muhammad al-Rahmani",
        designation: "SENIOR RESEARCH FELLOW",
        imageUrl: "/images/fjrrhmn.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "rf4",
        name: "Dr. Muhammed Najeeb Haithami",
        designation: "PRINCIPAL RESEARCHER",
        imageUrl: "/images/njbhtm.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "rf5",
        name: "Muhammad Rashid Jalali",
        designation: "RESEARCH FELLOW",
        imageUrl: "/images/rsdjll.png",
        badgeVariant: "emerald" as const,
      },
      {
        id: "rf6",
        name: "Luckman Jalali Muthuvallur",
        designation: "RESEARCH ASSOCIATE",
        imageUrl: "/images/lqmnjll.png",
        badgeVariant: "emerald" as const,
      },
    ],
  },
  organizationalStructure: {
    title: "Organizational Structure",
    paragraph1:
      "IRITAQ operates through a comprehensive institutional framework designed to promote academic excellence, effective governance, and sustainable development. The organizational structure integrates the Board of Trustees, International Advisory Board, International Scientific Council, Executive Leadership, Academic Leadership, and specialized research departments into a unified system of administration and scholarship.",
    paragraph2:
      "This structure ensures clear responsibilities, transparent decision-making, efficient institutional management, and strong collaboration among scholars, researchers, administrators, and international partners. It enables the Institute to achieve its vision of becoming a globally recognized centre of excellence in Qur'anic research and academic innovation.",
  },
  ctaSection: {
    title: "Collaborate with the Institute",
    description:
      "Universities, research centres and scholarly organisations are invited to engage with IRITAQ through joint research, publications and academic partnerships.",
    buttonText: "International Partnerships",
    buttonLink: "/contact",
  },
};