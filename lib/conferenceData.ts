export interface BreadcrumbLink {
  label: string;
  href: string;
}

export interface HeroData {
  breadcrumb: BreadcrumbLink[];
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
}

export interface FeaturedConference {
  tag: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  highlights: string[];
  detailsLink: string;
  brochureLink: string;
  image: string;
  imageMobile?: string;
}

export interface ForumItem {
  number: string;
  title: string;
  description: string;
}

export interface ForumsSection {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  forums: ForumItem[];
}

export interface EventCard {
  id: string;
  type: "In-Person" | "Online";
  date: string;
  title: string;
  theme: string;
  location: string;
  image: string;
  imageMobile?: string;
  link: string;
}

export interface UpcomingEventsSection {
  tag: string;
  title: string;
  description: string;
  events: EventCard[];
}

export interface GalleryImage {
  src: string;
  srcMobile?: string;
  alt: string;
}

export interface GallerySection {
  tag: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface ConferenceData {
  hero: HeroData;
  featuredConference: FeaturedConference;
  forumsSection: ForumsSection;
  upcomingEventsSection: UpcomingEventsSection;
  gallerySection: GallerySection;
}

export const HERO_DATA: HeroData = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Conference", href: "/conference" },
  ],
  title: "A Global Platform for Scholarly Dialogue",
  description:
    "A global platform for scholarly dialogue, academic collaboration, and the exchange of knowledge in Qur'anic Studies and interdisciplinary Islamic research.",
  buttonText: "Explore Upcoming Events",
  buttonLink: "#upcoming-events",
  backgroundImage: "/images/lib.jpe",
  backgroundImageMobile: "/images/lib.jpe",
};

export const FEATURED_CONFERENCE_DATA: FeaturedConference = {
  tag: "UPCOMING INTERNATIONAL CONFERENCE",
  title: "International Conference on Tafsir and Contemporary Issues",
  theme: "The Qur'an and Humanity – Guidance for the Future",
  date: "24–25 December 2026",
  location: "IRITAQ Research Complex, Kerala, India",
  highlights: [
    "Global Scholars and Researchers",
    "Innovative Ideas and Perspectives",
    "Academic Excellence and Integrity",
    "Building International Collaborations",
  ],
  detailsLink: "/conference/tafsir-contemporary-issues-2026",
  brochureLink: "/files/tafsir-conference-2026-brochure.pdf",
  image: "/images/featured-conference.jpg",
  imageMobile: "/images/featured-conference.jpg",
};

export const FORUMS_SECTION_DATA: ForumsSection = {
  tag: "OUR ACADEMIC EVENTS",
  title: "Diverse Forums for Knowledge Exchange",
  description:
    "From major international conferences to intimate seminars, IRITAQ convenes a range of scholarly gatherings designed to advance research and foster collaboration.",
  buttonText: "Explore Upcoming Events",
  buttonLink: "#upcoming-events",
  forums: [
    {
      number: "01",
      title: "International Conferences",
      description:
        "Prestigious global conferences that bring together leading scholars, researchers, and institutions to discuss emerging issues and advancements in Qur'anic scholarship.",
    },
    {
      number: "02",
      title: "Seminars",
      description:
        "Regular academic seminars focusing on specialized topics in Qur'anic Studies and Islamic scholarship, encouraging discussion and intellectual engagement.",
    },
    {
      number: "03",
      title: "Workshops",
      description:
        "Practical workshops to enhance research skills, methodologies, academic writing, manuscript studies, digital humanities, and AI applications in research.",
    },
    {
      number: "04",
      title: "Colloquiums",
      description:
        "Scholarly colloquiums that promote focused academic dialogue on contemporary and emerging issues related to the Holy Qur'an.",
    },
    {
      number: "05",
      title: "Symposiums",
      description:
        "National and international symposiums featuring renowned scholars presenting original research and exploring significant developments in the field.",
    },
  ],
};

export const UPCOMING_EVENTS_SECTION_DATA: UpcomingEventsSection = {
  tag: "UPCOMING EVENTS",
  title: "Calendar of Forthcoming Gatherings",
  description:
    "Join us at our upcoming conferences, seminars, workshops, and colloquiums.",
  events: [
    {
      id: "evt-1",
      type: "In-Person",
      date: "24–25 DECEMBER 2026",
      title: "International Conference on Tafsir and Contemporary Issues",
      theme: "The Qur'an and Humanity – Guidance for the Future",
      location: "IRITAQ Research Complex, Kerala, India",
      image: "/images/event-1.jpg",
      imageMobile: "/images/event-1.jpg",
      link: "/events/tafsir-conference-2026",
    },
    {
      id: "evt-2",
      type: "Online",
      date: "20 AUGUST 2026",
      title: "Colloquium on Ethics in Qur'anic Research",
      theme: "Integrity, Responsibility and Scholarly Excellence",
      location: "Online / Virtual Event",
      image: "/images/event-2.jpg",
      imageMobile: "/images/event-2.jpg",
      link: "/events/ethics-colloquium-2026",
    },
    {
      id: "evt-3",
      type: "In-Person",
      date: "10–12 JUNE 2026",
      title: "Workshop on Manuscript Preservation and Digitization",
      theme: "Preserving Our Heritage for Future Generations",
      location: "IRITAQ Research Complex, Kerala, India",
      image: "/images/event-3.jpg",
      imageMobile: "/images/event-3.jpg",
      link: "/events/manuscript-workshop-2026",
    },
  ],
};

export const GALLERY_SECTION_DATA: GallerySection = {
  tag: "PAST EVENTS GALLERY",
  title: "Highlights from Previous Gatherings",
  description:
    "A visual gallery showcasing highlights from previous conferences, seminars, workshops, colloquiums, and academic gatherings.",
  images: [
    {
      src: "/images/gallery-1.jpg",
      srcMobile: "/images/gallery-1.jpg",
      alt: "International conference main hall presentation",
    },
    {
      src: "/images/gallery-2.jpg",
      srcMobile: "/images/gallery-2.jpg",
      alt: "Stage talk with blue ambient lighting",
    },
    {
      src: "/images/gallery-3.jpg",
      srcMobile: "/images/gallery-3.jpg",
      alt: "Speaker presenting with laptop at podium",
    },
    {
      src: "/images/gallery-4.jpg",
      srcMobile: "/images/gallery-4.jpg",
      alt: "Audience watching key session in main auditorium",
    },
  ],
};

export const conferenceData: ConferenceData = {
  hero: HERO_DATA,
  featuredConference: FEATURED_CONFERENCE_DATA,
  forumsSection: FORUMS_SECTION_DATA,
  upcomingEventsSection: UPCOMING_EVENTS_SECTION_DATA,
  gallerySection: GALLERY_SECTION_DATA,
};