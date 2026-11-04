// types/governance.ts

export interface StatItem {
  value: string;
  label: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  badgeVariant?: "emerald" | "amber" | "dark" | string; // Adding string prevents type mismatches from DB/JSON payloads
}

export interface GovernanceBody {
  id: string;
  tagline?: string;
  title: string;
  description: string;
  secondaryDescription?: string;
  members: LeadershipMember[];
}

export interface GovernancePageData {
  hero: {
    tagline: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    bgImageUrl: string;
    mobileBgImageUrl: string;
  };
  stats: StatItem[];
  overview: {
    tagline: string;
    title: string;
    subtitle: string;
  };
  seniorLeadership: GovernanceBody;
  scientificCouncil: GovernanceBody;
  advisoryBoard: GovernanceBody;
  academicLeadership: GovernanceBody;
  executiveLeadership: GovernanceBody;
  researchFaculty: GovernanceBody;
  organizationalStructure: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  ctaSection: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}