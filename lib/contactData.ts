export interface EnquiryDepartment {
  id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  icon: 'email' | 'academic' | 'search' | 'globe' | 'quill' | 'grad' | 'megaphone';
}

export const HERO_CONTACT_DATA = {
  breadcrumb: ['Home', 'Contact Us'],
  tagline: 'GET IN TOUCH',
  headline: 'Connect with IRITAQ Departments',
  subheading:
    'Reach the right IRITAQ department, researcher, or international office through organized enquiry desks. Departments and enquiry types can be added or updated by the administrator anytime.',
  bgImage: '/images/lib.jpe',
  mobilebgImage: '/images/lib.jpe',
};

export const DEPARTMENTS_DATA: EnquiryDepartment[] = [
  {
    id: 'general',
    title: 'General Enquiries',
    description:
      'For general institutional questions, academic calendar, visitor information, and public enquiries.',
    email: 'info@iritaq.edu.in',
    phone: '+91 800 123 0001',
    icon: 'email',
  },
  {
    id: 'academic',
    title: 'Academic Affairs',
    description:
      "Enquiries regarding curriculum, academic collaborations, faculty appointments, and dean's office.",
    email: 'academics@iritaq.edu.in',
    phone: '+91 800 123 0002',
    icon: 'academic',
  },
  {
    id: 'research',
    title: 'Research Enquiries',
    description:
      'For scholarly research inquiries, grant applications, research center collaborations, and fellow programs.',
    email: 'research@iritaq.edu.in',
    phone: '+91 800 123 0003',
    icon: 'search',
  },
  {
    id: 'international',
    title: 'International Relations',
    description:
      'Managing agreements, international MoU execution, visiting scholar visas, and global academic networks.',
    email: 'relations@iritaq.edu.in',
    phone: '+91 800 123 0004',
    icon: 'globe',
  },
  {
    id: 'publications',
    title: 'Publications & Journals',
    description:
      'Enquiries regarding manuscript submissions, peer-review cycles, journal subscriptions, and Digital Library licensing.',
    email: 'publications@iritaq.edu.in',
    phone: '+91 800 123 0005',
    icon: 'quill',
  },
  {
    id: 'admissions',
    title: 'Admissions & Registrar',
    description:
      'For prospective students, admissions requirements, applications, scholarship quotas, and student registration.',
    email: 'admissions@iritaq.edu.in',
    phone: '+91 800 123 0006',
    icon: 'grad',
  },
  {
    id: 'media',
    title: 'Media & Communications',
    description:
      'Handling press releases, event announcements, broadcasting permits, guest lecture recordings, and public relations.',
    email: 'media@iritaq.edu.in',
    phone: '+91 800 123 0007',
    icon: 'megaphone',
  },
];

export const CAMPUS_INFO = {
  title: 'Our Main Campus',
  address:
    "International Research Institute for Tafsir Al-Qur'an (IRITAQ), Al-Jamia Al-Jalaliyya Campus, Kerala, India",
  hours: 'Monday - Friday: 9:00 AM to 5:00 PM (IST)',
  mapImage: '/images/lib.jpe',
};