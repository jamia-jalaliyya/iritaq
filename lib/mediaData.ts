export interface MediaCategoryItem {
  label: string;
  targetId: string;
}

export interface FeaturedGalleryItem {
  id: string;
  category: string;
  categorySlug: string;
  date: string;
  title: string;
  description: string;
  photosCount: number;
  videosCount?: number;
  image: string;
}

export interface PhotoAlbumItem {
  id: string;
  title: string;
  photoCount: number;
  image: string;
}

export interface VideoGalleryItem {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string; // YouTube or Instagram Link
  videoFileUrl?: string; // Direct uploaded video file URL
}

export interface ConferenceGalleryItem {
  id: string;
  locationTag: string;
  date: string;
  title: string;
  photosCount: number;
  videosCount?: number;
  image: string;
}

export interface AcademicEventItem {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface InstitutionalEventItem {
  id: string;
  date: string;
  title: string;
  description: string;
  photosCount: number;
  videosCount?: number;
  image: string;
}

export interface MediaListItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  duration?: string;
  thumbnail: string;
}

export interface PressCoverageItem {
  id: string;
  source: string;
  date: string;
  title: string;
  summary: string;
  link: string;
}

export interface MediaPageData {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
    mobileBackgroundImage: string;
  };
  categories: MediaCategoryItem[];
  featuredGalleries: FeaturedGalleryItem[];
  photoAlbums: PhotoAlbumItem[];
  videoGallery: VideoGalleryItem[];
  conferenceGalleries: ConferenceGalleryItem[];
  academicEvents: AcademicEventItem[];
  institutionalEvents: InstitutionalEventItem[];
  lecturesList: MediaListItem[];
  interviewsList: MediaListItem[];
  pressCoverage: PressCoverageItem[];
}

export const defaultMediaData: MediaPageData = {
  hero: {
    title: "Media Center",
    description:
      "A visual archive of IRITAQ's academic, institutional, and international activities. Exploring sacred exegesis and classical codicology through photography, presentations, and interviews.",
    backgroundImage: "/images/lib.jpe",
    mobileBackgroundImage: "/images/lib-mobile.jpe",
  },
  categories: [
    { label: "Featured Gallery", targetId: "featured-gallery" },
    { label: "Photo Gallery", targetId: "photo-gallery" },
    { label: "Video Gallery", targetId: "video-gallery" },
    { label: "Conference Gallery", targetId: "conference-gallery" },
    { label: "Academic Events", targetId: "academic-events" },
    { label: "Institutional Events", targetId: "institutional-events" },
    { label: "Lectures & Interviews", targetId: "lectures-interviews" },
    { label: "Press Coverage", targetId: "press-coverage" },
  ],
  featuredGalleries: [
    {
      id: "fg-1",
      category: "Conference Gallery",
      categorySlug: "conference-gallery",
      date: "February 12, 2024",
      title: "International Quranic Research Symposium 2024",
      description:
        "A gathering of global exegesis scholars discussing contemporary scientific frameworks for traditional classical Tafsir texts.",
      photosCount: 48,
      videosCount: 2,
      image: "/images/media/symposium-2024.jpg",
    },
    {
      id: "fg-2",
      category: "Institutional Events",
      categorySlug: "institutional-events",
      date: "November 08, 2023",
      title: "MOU Signing Ceremony — University of Oxford",
      description:
        "Formalizing research frameworks on early Hijazi fragments with the University of Oxford Faculty of Oriental Studies.",
      photosCount: 24,
      videosCount: 1,
      image: "/images/media/mou-oxford.jpg",
    },
    {
      id: "fg-3",
      category: "Academic Events",
      categorySlug: "academic-events",
      date: "June 20, 2023",
      title: "Annual Academic Conference 2023",
      description:
        "IRITAQ's annual gathering featuring dissertation defenses, manuscript digital library announcements, and academic exchange panels.",
      photosCount: 36,
      videosCount: 5,
      image: "/images/media/academic-conf-2023.jpg",
    },
  ],
  photoAlbums: [
    {
      id: "pa-1",
      title: "Sacred Manuscript Exhibition",
      photoCount: 18,
      image: "/images/media/sacred-manuscript.jpg",
    },
    {
      id: "pa-2",
      title: "On-Site Codicology Training",
      photoCount: 12,
      image: "/images/media/codicology-lab.jpg",
    },
    {
      id: "pa-3",
      title: "Islamic Studies Visiting Delegation",
      photoCount: 15,
      image: "/images/media/visiting-delegation.jpg",
    },
    {
      id: "pa-4",
      title: "Kerala Campus Library Interior",
      photoCount: 30,
      image: "/images/media/kerala-library.jpg",
    },
    {
      id: "pa-5",
      title: "Scholarly Panel Q&A Session",
      photoCount: 8,
      image: "/images/media/panel-qa.jpg",
    },
    {
      id: "pa-6",
      title: "Bilateral Diplomatic Signing",
      photoCount: 14,
      image: "/images/media/diplomatic-signing.jpg",
    },
  ],
  videoGallery: [
    {
      id: "vid-1",
      category: "KEYNOTE ADDRESS",
      date: "February 2024",
      title: "The Future of Quranic Manuscript Studies",
      description:
        "Keynote presentation delivered at Radcliffe Hall, Oxford, detailing advanced multispectral imaging.",
      thumbnail: "/images/media/keynote.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "vid-2",
      category: "LECTURES",
      date: "Jan 18, 2024",
      title: "Digital Codicology Best Practices Workshop",
      description:
        "A technical seminar on digital cataloging standards for early Hijazi parchments.",
      thumbnail: "/images/media/codicology-workshop.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "vid-3",
      category: "DOCUMENTARY",
      date: "Dec 05, 2023",
      title: "Preserving Ancient Hijazi Parchments",
      description:
        "Documentary footage highlighting the conservation lab at the Kerala main campus.",
      thumbnail: "/images/media/hijazi-documentary.jpg",
      videoUrl: "https://www.instagram.com/p/ExamplePost/",
    },
  ],
  conferenceGalleries: [
    {
      id: "cg-1",
      locationTag: "Gulf Region",
      date: "Jan 12, 2024",
      title: "3rd International Symposium on Tafsir Studies",
      photosCount: 56,
      videosCount: 4,
      image: "/images/media/gulf-symposium.jpg",
    },
    {
      id: "cg-2",
      locationTag: "Doha, Qatar",
      date: "Oct 28, 2023",
      title: "Gulf Region Academic Summit",
      photosCount: 42,
      image: "/images/media/doha-summit.jpg",
    },
    {
      id: "cg-3",
      locationTag: "Kerala, India",
      date: "Mar 05, 2024",
      title: "Annual Research Forum 2024",
      photosCount: 64,
      videosCount: 2,
      image: "/images/media/kerala-forum.jpg",
    },
  ],
  academicEvents: [
    {
      id: "ae-1",
      category: "Workshop",
      date: "Jan 15, 2024",
      title: "Research Methodology Workshop",
      description:
        "Equipping young exegesis researchers with rigorous classical and modern linguistic textual tools.",
      image: "/images/media/classroom-workshop.jpg",
    },
    {
      id: "ae-2",
      category: "Seminar",
      date: "Nov 12, 2023",
      title: "Manuscript Preservation Seminar",
      description:
        "An intensive seminar on the restoration, handling, and chemical mapping of historic parchments.",
      image: "/images/media/preservation-lab.jpg",
    },
    {
      id: "ae-3",
      category: "Seminar",
      date: "Oct 10, 2023",
      title: "Doctoral Dissertation Symposium",
      description:
        "Scholarly defenses of innovative thematic exegesis treatises before our multi-national Board.",
      image: "/images/media/doctoral-symposium.jpg",
    },
    {
      id: "ae-4",
      category: "Guest Lecture",
      date: "Sep 24, 2023",
      title: "Guest Lecturer Series: Oxford Codicologists",
      description:
        "An educational series detailing the latest advancements in digital exegesis.",
      image: "/images/media/guest-lecture-room.jpg",
    },
  ],
  institutionalEvents: [
    {
      id: "ie-1",
      date: "Dec 15, 2023",
      title: "Board of Directors Annual Meeting",
      description:
        "Strategic reviews of academic output, financial modeling, and long-term expansion plans.",
      photosCount: 18,
      image: "/images/media/boardroom-meeting.jpg",
    },
    {
      id: "ie-2",
      date: "Oct 04, 2023",
      title: "Partnership Signing with Al-Azhar University",
      description:
        "Ratifying strategic manuscript translation exchange systems with Al-Azhar Faculty of Theology.",
      photosCount: 30,
      videosCount: 1,
      image: "/images/media/al-azhar-signing.jpg",
    },
    {
      id: "ie-3",
      date: "Jul 11, 2023",
      title: "IRITAQ Foundation Day Ceremony",
      description:
        "Celebrating our commitment to authentic exegesis scholarship with students and visiting fellows.",
      photosCount: 45,
      videosCount: 2,
      image: "/images/media/foundation-day-stage.jpg",
    },
  ],
  lecturesList: [
    {
      id: "lec-1",
      title: "Linguistic Paradigms in Sana'a Manuscripts",
      subtitle: "Dr. Sarah Mitchell",
      date: "March 10, 2024",
      duration: "1:15:20",
      thumbnail: "/images/media/lec-sanaa.jpg",
    },
    {
      id: "lec-2",
      title: "Standardizing Exegesis: An Ottoman Survey",
      subtitle: "Prof. Ahmad Al-Rashid",
      date: "February 22, 2024",
      duration: "58:45",
      thumbnail: "/images/media/lec-ottoman.jpg",
    },
    {
      id: "lec-3",
      title: "Traditional Codicology vs. Digital Humanities",
      subtitle: "Dr. G. Sterling",
      date: "January 14, 2024",
      duration: "1:32:10",
      thumbnail: "/images/media/lec-digital.jpg",
    },
  ],
  interviewsList: [
    {
      id: "int-1",
      title: "Preserving Quranic Manuscripts: A Life's Work",
      subtitle: "Interview with Prof. Ahmad Al-Rashid",
      date: "March 02, 2024",
      thumbnail: "/images/media/int-rashid.jpg",
    },
    {
      id: "int-2",
      title: "Bilateral Codicology: Oxford & India",
      subtitle: "Interview with Dr. Sarah Mitchell",
      date: "February 04, 2024",
      thumbnail: "/images/media/int-mitchell.jpg",
    },
    {
      id: "int-3",
      title: "The Digital Library: Access and Preservation",
      subtitle: "Interview with Dr. H. Yilmaz",
      date: "December 18, 2023",
      thumbnail: "/images/media/int-yilmaz.jpg",
    },
  ],
  pressCoverage: [
    {
      id: "pc-1",
      source: "Al Jazeera",
      date: "February 15, 2024",
      title: "IRITAQ Kerala Unveils Digital Codicology Lab to Scan Early Quran Manuscripts",
      summary:
        "The newly opened state-of-the-art laboratory features multispectral imaging capabilities.",
      link: "https://www.aljazeera.com",
    },
    {
      id: "pc-2",
      source: "Gulf News",
      date: "November 12, 2023",
      title: "Strategic Partnership Signed Between Oxford and India's Premier Tafsir Institute",
      summary:
        "Dignitaries from both seats of learning ratified agreements to exchange visiting scholars.",
      link: "https://gulfnews.com",
    },
    {
      id: "pc-3",
      source: "The National",
      date: "September 05, 2023",
      title: "How Traditional Exegesis Meets Modern Digital Preservation in Kerala",
      summary:
        "Scholars at the institute ensure that contemporary technology serves traditional theological frameworks.",
      link: "https://www.thenationalnews.com",
    },
    {
      id: "pc-4",
      source: "Arab News",
      date: "July 20, 2023",
      title: "IRITAQ Announces Global Academic Conference on Manuscript Codicology",
      summary:
        "Exegesis researchers and digital library coordinators from ten countries are expected to convene.",
      link: "https://www.arabnews.com",
    },
  ],
};