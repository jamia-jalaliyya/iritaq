import Image from 'next/image';
import Link from 'next/link';
import { Megaphone, ChevronRight, BookOpen, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabaseServer';
import {
  HomePageSettings,
  DEFAULT_HOME_PAGE_SETTINGS,
} from '@/lib/homeData';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getHomePageData(): Promise<HomePageSettings> {
  try {
    const { data: s } = await supabaseAdmin
      .from('home_page_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (!s) return DEFAULT_HOME_PAGE_SETTINGS;

    return {
      heroSubheading: s.hero_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.heroSubheading,
      heroHeading: s.hero_heading ?? DEFAULT_HOME_PAGE_SETTINGS.heroHeading,
      heroDescription: s.hero_description ?? DEFAULT_HOME_PAGE_SETTINGS.heroDescription,
      heroBgImage: s.hero_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.heroBgImage,
      heroBgImageMobile: s.hero_bg_image_mobile ?? s.hero_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.heroBgImageMobile,
      heroPrimaryBtnText: s.hero_primary_btn_text ?? DEFAULT_HOME_PAGE_SETTINGS.heroPrimaryBtnText,
      heroPrimaryBtnLink: s.hero_primary_btn_link ?? DEFAULT_HOME_PAGE_SETTINGS.heroPrimaryBtnLink,
      heroSecondaryBtnText: s.hero_secondary_btn_text ?? DEFAULT_HOME_PAGE_SETTINGS.heroSecondaryBtnText,
      heroSecondaryBtnLink: s.hero_secondary_btn_link ?? DEFAULT_HOME_PAGE_SETTINGS.heroSecondaryBtnLink,
      announcements: s.announcements?.length ? s.announcements : DEFAULT_HOME_PAGE_SETTINGS.announcements,
      welcomeSubheading: s.welcome_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeSubheading,
      welcomeHeading: s.welcome_heading ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeHeading,
      welcomeDescription: s.welcome_description ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeDescription,
      welcomeImage: s.welcome_image ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeImage,
      welcomeImageMobile: s.welcome_image_mobile ?? s.welcome_image ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeImageMobile,
      patronSubheading: s.patron_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.patronSubheading,
      patronQuoteHeading: s.patron_quote_heading ?? DEFAULT_HOME_PAGE_SETTINGS.patronQuoteHeading,
      patronQuoteText: s.patron_quote_text ?? DEFAULT_HOME_PAGE_SETTINGS.patronQuoteText,
      patronName: s.patron_name ?? DEFAULT_HOME_PAGE_SETTINGS.patronName,
      patronTitle: s.patron_title ?? DEFAULT_HOME_PAGE_SETTINGS.patronTitle,
      patronImage: s.patron_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronImage,
      patronImageMobile: s.patron_image_mobile ?? s.patron_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronImageMobile,
      patronBgImage: s.patron_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronBgImage,
      patronBgImageMobile: s.patron_bg_image_mobile ?? s.patron_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronBgImageMobile,
      vmSubheading: s.vm_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.vmSubheading,
      vmHeading: s.vm_heading ?? DEFAULT_HOME_PAGE_SETTINGS.vmHeading,
      visionTitle: s.vision_title ?? DEFAULT_HOME_PAGE_SETTINGS.visionTitle,
      visionDescription: s.vision_description ?? DEFAULT_HOME_PAGE_SETTINGS.visionDescription,
      missionTitle: s.mission_title ?? DEFAULT_HOME_PAGE_SETTINGS.missionTitle,
      missionDescription: s.mission_description ?? DEFAULT_HOME_PAGE_SETTINGS.missionDescription,
      researchDomains: s.research_domains?.length ? s.research_domains : DEFAULT_HOME_PAGE_SETTINGS.researchDomains,
      newsEvents: s.news_events?.length ? s.news_events : DEFAULT_HOME_PAGE_SETTINGS.newsEvents,
      publications: s.publications?.length ? s.publications : DEFAULT_HOME_PAGE_SETTINGS.publications,
    };
  } catch {
    return DEFAULT_HOME_PAGE_SETTINGS;
  }
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <div className="w-full mx-auto px-4 pt-6 md:pt-8">
        <section className="relative min-h-125 flex items-center justify-center text-white px-6 md:px-12 py-16 md:py-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          <Image src={data.heroBgImage} alt="Hero Background Desktop" fill className="hidden md:block object-cover brightness-[0.35]" priority />
          <Image src={data.heroBgImageMobile || data.heroBgImage} alt="Hero Background Mobile" fill className="block md:hidden object-cover brightness-[0.35]" priority />
          
          <div className="relative z-10 max-w-5xl mx-auto text-left w-full">
            <div className="flex items-center gap-2 mb-4 text-xs md:text-sm tracking-widest text-amber-400 font-semibold uppercase">
              <span className="w-8 h-0.5 bg-amber-400 inline-block"></span>
              {data.heroSubheading}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-normal leading-tight mb-6">
              {data.heroHeading}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8 font-light">
              {data.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={data.heroPrimaryBtnLink} className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-medium transition flex items-center gap-2 text-sm">
                {data.heroPrimaryBtnText} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href={data.heroSecondaryBtnLink} className="border border-white/60 hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition flex items-center gap-2 text-sm">
                {data.heroSecondaryBtnText} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 2. ANNOUNCEMENT TICKER */}
      {data.announcements.length > 0 && (
        <div className="w-full mx-auto px-4 pt-6">
          <div className="bg-neutral-900 text-white rounded-xl flex items-stretch overflow-hidden shadow-md">
            <div className="bg-emerald-700 px-6 py-3 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shrink-0 self-stretch z-10 shadow-md">
              <Megaphone className="w-4 h-4" /> Announcement
            </div>
            <div className="relative flex overflow-hidden items-center w-full py-3">
              <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] text-xs md:text-sm text-slate-300 font-medium">
                <span className="px-4">{data.announcements.join(" • ")} •</span>
                <span className="px-4">{data.announcements.join(" • ")} •</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. WELCOME SECTION */}
      <section className="py-24 w-full mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-100 md:h-120 rounded-2xl overflow-hidden shadow-xl">
            <Image src={data.welcomeImage} alt="Welcome Desktop" fill className="hidden md:block object-cover" />
            <Image src={data.welcomeImageMobile || data.welcomeImage} alt="Welcome Mobile" fill className="block md:hidden object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs tracking-widest text-emerald-700 font-semibold uppercase">
              <span className="w-8 h-0.5 bg-emerald-700 inline-block"></span>
              {data.welcomeSubheading}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6 leading-snug">
              {data.welcomeHeading}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8">
              {data.welcomeDescription}
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-medium text-sm transition">
              Read More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GRAND PATRON SECTION */}
      <div className="w-full mx-auto px-4 py-12 md:py-16">
        <section className="relative text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20 py-12 md:py-16 px-6 md:px-12">
          <Image src={data.patronBgImage} alt="Patron Background Desktop" fill className="hidden md:block object-cover brightness-[0.25]" />
          <Image src={data.patronBgImageMobile || data.patronBgImage} alt="Patron Background Mobile" fill className="block md:hidden object-cover brightness-[0.25]" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 relative h-72 w-full rounded-2xl overflow-hidden border-2 border-emerald-600/50">
                <Image src={data.patronImage} alt={data.patronName} fill className="hidden md:block object-cover" />
                <Image src={data.patronImageMobile || data.patronImage} alt={data.patronName} fill className="block md:hidden object-cover" />
              </div>
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 mb-2 text-xs tracking-widest text-amber-400 font-semibold uppercase">
                  <span className="w-8 h-0.5 bg-amber-400 inline-block"></span>
                  {data.patronSubheading}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-amber-200 mb-4">{data.patronQuoteHeading}</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">{data.patronQuoteText}</p>
                <div>
                  <h4 className="text-lg font-serif text-white">{data.patronName}</h4>
                  <p className="text-xs tracking-wider text-amber-400 font-medium uppercase mt-1">{data.patronTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. VISION & MISSION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2 text-xs tracking-widest text-amber-700 font-semibold uppercase">
            <span className="w-8 h-0.5 bg-amber-700 inline-block"></span>
            {data.vmSubheading}
            <span className="w-8 h-0.5 bg-amber-700 inline-block"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900">{data.vmHeading}</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200/80 hover:border-amber-700/30 transition">
            <h3 className="text-2xl font-serif text-amber-700 mb-4">{data.visionTitle}</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{data.visionDescription}</p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200/80 hover:border-amber-700/30 transition">
            <h3 className="text-2xl font-serif text-amber-700 mb-4">{data.missionTitle}</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{data.missionDescription}</p>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH DOMAINS */}
      {data.researchDomains.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Research Domains</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Discover groundbreaking research that bridges Islamic heritage with contemporary knowledge, fostering innovation, academic excellence and global collaboration.
              </p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.researchDomains.map((domain) => (
                <div key={domain.id} className="bg-neutral-900 text-white p-6 rounded-xl hover:bg-neutral-800 transition group cursor-pointer flex flex-col justify-between min-h-30">
                  <BookOpen className="w-5 h-5 text-amber-400 mb-4" />
                  <span className="font-serif text-sm tracking-wide group-hover:text-amber-200 transition">{domain.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. NEWS & EVENTS */}
      {data.newsEvents.length > 0 && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-3">News & Events</h2>
                <p className="text-slate-600 text-sm md:text-base max-w-xl">
                  Global in orientation, pioneering in knowledge, a university combining Sharia sciences and scientific disciplines, committed to excellence and comprehensiveness for its members.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-slate-300 transition">
                <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                  <Image src={data.newsEvents[0].image} alt="Featured News Desktop" fill className="hidden md:block object-cover" />
                  <Image src={data.newsEvents[0].mobileImage || data.newsEvents[0].image} alt="Featured News Mobile" fill className="block md:hidden object-cover" />
                </div>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {data.newsEvents[0].date}</p>
                <h3 className="text-lg font-serif text-slate-900 font-semibold mb-2">{data.newsEvents[0].title}</h3>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-4">
                {data.newsEvents.slice(1).map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 hover:border-slate-300 transition">
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</p>
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{item.title}</p>
                      <Link href="#" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold hover:underline">
                        Read More <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="relative h-20 w-28 shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image} alt="News thumbnail Desktop" fill className="hidden md:block object-cover" />
                      <Image src={item.mobileImage || item.image} alt="News thumbnail Mobile" fill className="block md:hidden object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. FEATURED PUBLICATIONS */}
      {data.publications.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-3">Featured Publications</h2>
              <p className="text-slate-600 text-sm md:text-base max-w-md">
                Peer-reviewed scholarship from the Institute&apos;s researchers, journals and international collaborators.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 rounded-full border border-slate-300 hover:bg-slate-100 transition"><ArrowLeft className="w-4 h-4" /></button>
              <button className="p-3 rounded-full border border-slate-300 hover:bg-slate-100 transition"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.publications.map((pub) => (
              <div key={pub.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition">
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 border border-emerald-600/30">
                  <Image src={pub.image} alt={pub.title} fill className="hidden md:block object-cover" />
                  <Image src={pub.mobileImage || pub.image} alt={pub.title} fill className="block md:hidden object-cover" />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-3">{pub.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{pub.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}