import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { defaultAboutData, AboutPageData } from "@/lib/aboutDefaultData";

export const revalidate = 60; // Revalidate dynamic content every 60s

async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const { data: s } = await supabaseAdmin
      .from("about_page_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!s) return defaultAboutData;

    return {
      hero: {
        tagline: s.hero_tagline ?? defaultAboutData.hero.tagline,
        title: s.hero_title ?? defaultAboutData.hero.title,
        description: s.hero_description ?? defaultAboutData.hero.description,
        primaryBtnText: s.hero_primary_btn_text ?? defaultAboutData.hero.primaryBtnText,
        primaryBtnLink: s.hero_primary_btn_link ?? defaultAboutData.hero.primaryBtnLink,
        secondaryBtnText: s.hero_secondary_btn_text ?? defaultAboutData.hero.secondaryBtnText,
        secondaryBtnLink: s.hero_secondary_btn_link ?? defaultAboutData.hero.secondaryBtnLink,
        bgImageUrl: s.hero_bg_image_url ?? defaultAboutData.hero.bgImageUrl,
        bgImageUrlMobile:
          s.hero_bg_image_url_mobile ?? s.hero_bg_image_url ?? defaultAboutData.hero.bgImageUrlMobile,
      },
      stats: s.stats?.length ? s.stats : defaultAboutData.stats,
      executiveOverview: {
        tagline: s.eo_tagline ?? defaultAboutData.executiveOverview.tagline,
        title: s.eo_title ?? defaultAboutData.executiveOverview.title,
        paragraph1: s.eo_paragraph1 ?? defaultAboutData.executiveOverview.paragraph1,
        paragraph2: s.eo_paragraph2 ?? defaultAboutData.executiveOverview.paragraph2,
        buttonText: s.eo_button_text ?? defaultAboutData.executiveOverview.buttonText,
        buttonLink: s.eo_button_link ?? defaultAboutData.executiveOverview.buttonLink,
        imageUrl: s.eo_image_url ?? defaultAboutData.executiveOverview.imageUrl,
        imageUrlMobile:
          s.eo_image_url_mobile ?? s.eo_image_url ?? defaultAboutData.executiveOverview.imageUrlMobile,
      },
      foundingVision: {
        tagline: s.fv_tagline ?? defaultAboutData.foundingVision.tagline,
        title: s.fv_title ?? defaultAboutData.foundingVision.title,
        paragraph1: s.fv_paragraph1 ?? defaultAboutData.foundingVision.paragraph1,
        paragraph2: s.fv_paragraph2 ?? defaultAboutData.foundingVision.paragraph2,
        imageUrl: s.fv_image_url ?? defaultAboutData.foundingVision.imageUrl,
        imageUrlMobile:
          s.fv_image_url_mobile ?? s.fv_image_url ?? defaultAboutData.foundingVision.imageUrlMobile,
      },
      visionMission: {
        tagline: s.vm_tagline ?? defaultAboutData.visionMission.tagline,
        title: s.vm_title ?? defaultAboutData.visionMission.title,
        visionTitle: s.vision_title ?? defaultAboutData.visionMission.visionTitle,
        visionDescription: s.vision_description ?? defaultAboutData.visionMission.visionDescription,
        missionTitle: s.mission_title ?? defaultAboutData.visionMission.missionTitle,
        missionDescription: s.mission_description ?? defaultAboutData.visionMission.missionDescription,
      },
      coreValues: {
        tagline: s.cv_tagline ?? defaultAboutData.coreValues.tagline,
        title: s.cv_title ?? defaultAboutData.coreValues.title,
        subtitle: s.cv_subtitle ?? defaultAboutData.coreValues.subtitle,
        values: s.core_values?.length ? s.core_values : defaultAboutData.coreValues.values,
      },
      institutionalProfile: {
        tagline: s.ip_tagline ?? defaultAboutData.institutionalProfile.tagline,
        title: s.ip_title ?? defaultAboutData.institutionalProfile.title,
        paragraph1: s.ip_paragraph1 ?? defaultAboutData.institutionalProfile.paragraph1,
        paragraph2: s.ip_paragraph2 ?? defaultAboutData.institutionalProfile.paragraph2,
      },
      historyObjectives: {
        tagline: s.ho_tagline ?? defaultAboutData.historyObjectives.tagline,
        title: s.ho_title ?? defaultAboutData.historyObjectives.title,
        subtitle: s.ho_subtitle ?? defaultAboutData.historyObjectives.subtitle,
        imageUrl: s.ho_image_url ?? defaultAboutData.historyObjectives.imageUrl,
        imageUrlMobile:
          s.ho_image_url_mobile ?? s.ho_image_url ?? defaultAboutData.historyObjectives.imageUrlMobile,
        milestones: s.milestones?.length ? s.milestones : defaultAboutData.historyObjectives.milestones,
      },
    };
  } catch {
    return defaultAboutData;
  }
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative py-12 md:py-20 px-4 sm:px-4 lg:px-4 pt-6 md:pt-8 overflow-hidden">
        {/* Outer Container Card View */}
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-900 min-h-125 flex items-center">
          {/* Background Image & Lightened Overlay Layer */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background Image */}
            <Image
              src={data.hero.bgImageUrl}
              alt="Hero Background Desktop"
              fill
              priority
              className="hidden md:block object-cover object-center scale-105 transition-transform duration-1000"
            />
            {/* Mobile Background Image */}
            <Image
              src={data.hero.bgImageUrlMobile || data.hero.bgImageUrl}
              alt="Hero Background Mobile"
              fill
              priority
              className="block md:hidden object-cover object-center scale-105 transition-transform duration-1000"
            />
            {/* Lightened, localized gradient overlays: dark on the left for text contrast, clear on the right */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          {/* Floating Content Layer */}
          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-12 md:py-20">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-8">
              <Link
                href="/"
                className="hover:text-amber-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-amber-400 font-semibold tracking-wide" aria-current="page">
                About
              </span>
            </nav>

            {/* Section Tagline */}
            <div className="inline-flex items-center gap-3 mb-5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
              <div className="w-6 h-0.5 bg-amber-500 rounded-full" />
              <span className="text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-amber-400">
                {data.hero.tagline}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-wide max-w-3xl mb-6 leading-[1.15] drop-shadow-md">
              {data.hero.title}
            </h1>

            {/* Subdescription */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mb-10 font-light leading-relaxed drop-shadow-sm">
              {data.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={data.hero.primaryBtnLink}
                className="group bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white px-7 py-3.5 rounded-full text-sm font-medium flex items-center gap-2.5 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/50 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>{data.hero.primaryBtnText}</span>
                <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href={data.hero.secondaryBtnLink}
                className="group border border-slate-300/60 hover:border-white bg-slate-900/50 hover:bg-slate-800/70 active:bg-slate-900 text-slate-100 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium flex items-center gap-2.5 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>{data.hero.secondaryBtnText}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="border-b bg-slate-100 border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center ${
                idx < data.stats.length - 1 ? "md:border-r border-slate-300" : ""
              }`}
            >
              <p className="text-4xl md:text-5xl font-serif text-slate-700 font-light mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXECUTIVE OVERVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-95 md:h-115 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            {/* Desktop Image */}
            <Image
              src={data.executiveOverview.imageUrl}
              alt="Executive Overview Desktop"
              fill
              className="hidden md:block object-cover"
            />
            {/* Mobile Image */}
            <Image
              src={data.executiveOverview.imageUrlMobile || data.executiveOverview.imageUrl}
              alt="Executive Overview Mobile"
              fill
              className="block md:hidden object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-emerald-600" />
              <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
                {data.executiveOverview.tagline}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-6 leading-snug">
              {data.executiveOverview.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {data.executiveOverview.paragraph1}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {data.executiveOverview.paragraph2}
            </p>

            <Link
              href={data.executiveOverview.buttonLink}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2 transition"
            >
              {data.executiveOverview.buttonText} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOUNDING VISION */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-emerald-600" />
              <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
                {data.foundingVision.tagline}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-6 leading-snug">
              {data.foundingVision.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {data.foundingVision.paragraph1}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.foundingVision.paragraph2}
            </p>
          </div>

          <div className="relative h-95 md:h-115 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            {/* Desktop Image */}
            <Image
              src={data.foundingVision.imageUrl}
              alt="Founding Vision Desktop"
              fill
              className="hidden md:block object-cover"
            />
            {/* Mobile Image */}
            <Image
              src={data.foundingVision.imageUrlMobile || data.foundingVision.imageUrl}
              alt="Founding Vision Mobile"
              fill
              className="block md:hidden object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. VISION & MISSION */}
      <section className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-amber-700" />
              <span className="text-xs tracking-widest uppercase font-medium text-amber-700">
                {data.visionMission.tagline}
              </span>
              <div className="w-8 h-0.5 bg-amber-700" />
            </div>
            <h2 className="text-3xl text-black md:text-4xl font-serif">{data.visionMission.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-slate-700/10 rounded-2xl p-8 hover:border-amber-700/30">
              <h3 className="text-2xl font-serif text-amber-700 mb-4">
                {data.visionMission.visionTitle}
              </h3>
              <p className="text-black text-sm leading-relaxed">
                {data.visionMission.visionDescription}
              </p>
            </div>

            <div className="border border-slate-700/10 rounded-2xl p-8 hover:border-amber-700/30">
              <h3 className="text-2xl font-serif text-amber-700 mb-4">
                {data.visionMission.missionTitle}
              </h3>
              <p className="text-black text-sm leading-relaxed">
                {data.visionMission.missionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-0.5 bg-emerald-600" />
            <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
              {data.coreValues.tagline}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-2">
            {data.coreValues.title}
          </h2>
          <p className="text-slate-500 text-sm">{data.coreValues.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 rounded-3xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {data.coreValues.values.map((val) => (
            <div key={val.id} className="p-8 bg-white hover:bg-slate-50/80 transition">
              <span className="text-amber-600 font-serif text-lg font-light block mb-2">
                {val.number}
              </span>
              <h3 className="text-xl font-serif text-slate-800 mb-2">{val.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INSTITUTIONAL PROFILE */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-emerald-600" />
              <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
                {data.institutionalProfile.tagline}
              </span>
            </div>
            <h2 className="text-3xl font-serif text-slate-800">
              {data.institutionalProfile.title}
            </h2>
          </div>

          <div className="md:col-span-2 space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>{data.institutionalProfile.paragraph1}</p>
            <p>{data.institutionalProfile.paragraph2}</p>
          </div>
        </div>
      </section>

      {/* 8. HISTORY & OBJECTIVES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-0.5 bg-emerald-600" />
            <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
              {data.historyObjectives.tagline}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-2">
            {data.historyObjectives.title}
          </h2>
          <p className="text-slate-500 text-sm">{data.historyObjectives.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative pl-6 border-l-2 border-amber-300">
            {data.historyObjectives.milestones.map((m) => (
              <div key={m.id} className="relative">
                <span className="absolute -left-7.75 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
                <span className="text-[10px] font-semibold tracking-wider text-emerald-700 uppercase block mb-1">
                  {m.tagline}
                </span>
                <h3 className="text-lg font-serif text-slate-800 mb-1">{m.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>

          <div className="relative h-95 md:h-120 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            {/* Desktop Image */}
            <Image
              src={data.historyObjectives.imageUrl}
              alt="History Mosque Desktop"
              fill
              className="hidden md:block object-cover"
            />
            {/* Mobile Image */}
            <Image
              src={data.historyObjectives.imageUrlMobile || data.historyObjectives.imageUrl}
              alt="History Mosque Mobile"
              fill
              className="block md:hidden object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}