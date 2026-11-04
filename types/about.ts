// types/about.ts

export interface KeyStat {
  value: string;
  label: string;
}

export interface CoreValue {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TimelineMilestone {
  id: string;
  tagline: string;
  title: string;
  description: string;
}

export interface AboutPageData {
  hero: {
    tagline: string;
    title: string;
    description: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
    bgImageUrl: string;
  };
  stats: KeyStat[];
  executiveOverview: {
    tagline: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
  };
  foundingVision: {
    tagline: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl: string;
  };
  visionMission: {
    tagline: string;
    title: string;
    visionTitle: string;
    visionDescription: string;
    missionTitle: string;
    missionDescription: string;
  };
  coreValues: {
    tagline: string;
    title: string;
    subtitle: string;
    values: CoreValue[];
  };
  institutionalProfile: {
    tagline: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  historyObjectives: {
    tagline: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    milestones: TimelineMilestone[];
  };
}