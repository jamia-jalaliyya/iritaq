import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabaseServer";
import {
  academicProgramsData,
  AcademicProgramsData,
} from "@/lib/academicProgramsData";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getAcademicProgramsData(): Promise<AcademicProgramsData> {
  try {
    const { data: s } = await supabaseAdmin
      .from("academic_programs_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!s) return academicProgramsData;

    return {
      hero: {
        breadcrumb: s.hero_breadcrumb?.length
          ? s.hero_breadcrumb
          : academicProgramsData.hero.breadcrumb,
        tagline: s.hero_tagline ?? academicProgramsData.hero.tagline,
        title: s.hero_title ?? academicProgramsData.hero.title,
        description: s.hero_description ?? academicProgramsData.hero.description,
        buttonText: s.hero_button_text ?? academicProgramsData.hero.buttonText,
        buttonLink: s.hero_button_link ?? academicProgramsData.hero.buttonLink,
        backgroundImage:
          s.hero_background_image ?? academicProgramsData.hero.backgroundImage,
        backgroundImageMobile:
          s.hero_background_image_mobile ??
          s.hero_background_image ??
          academicProgramsData.hero.backgroundImageMobile,
      },
      offeringsSection: {
        tagline: s.offerings_tagline ?? academicProgramsData.offeringsSection.tagline,
        title: s.offerings_title ?? academicProgramsData.offeringsSection.title,
        description:
          s.offerings_description ?? academicProgramsData.offeringsSection.description,
        categories: s.categories?.length
          ? s.categories
          : academicProgramsData.offeringsSection.categories,
      },
      admissionsBanner: {
        tagline: s.banner_tagline ?? academicProgramsData.admissionsBanner.tagline,
        title: s.banner_title ?? academicProgramsData.admissionsBanner.title,
        buttonText:
          s.banner_button_text ?? academicProgramsData.admissionsBanner.buttonText,
        buttonLink:
          s.banner_button_link ?? academicProgramsData.admissionsBanner.buttonLink,
      },
    };
  } catch {
    return academicProgramsData;
  }
}

export default async function AcademicProgramsPage() {
  const data = await getAcademicProgramsData();

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <div className="w-full mx-auto px-4 pt-6 md:pt-8">
        <section className="relative min-h-105 md:min-h-120 flex items-center justify-center text-white px-6 md:px-12 py-16 md:py-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background Image */}
            <Image
              src={data.hero.backgroundImage}
              alt="Academic Library Background Desktop"
              fill
              className="hidden md:block object-cover object-center opacity-40"
              priority
            />
            {/* Mobile Background Image */}
            <Image
              src={data.hero.backgroundImageMobile || data.hero.backgroundImage}
              alt="Academic Library Background Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-amber-400 mb-4 font-medium tracking-wide">
              {data.hero.breadcrumb.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < data.hero.breadcrumb.length - 1 && <span>&gt;</span>}
                </div>
              ))}
            </nav>

            {/* Tagline */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                {data.hero.tagline}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-4 drop-shadow-sm">
              {data.hero.title}
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-sm">
              {data.hero.description}
            </p>

            {/* CTA Button */}
            <a
              href={data.hero.buttonLink}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-lg"
            >
              <span>{data.hero.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>

      {/* 2. PROGRAMME CATEGORIES GRID */}
      <section id="program-categories" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-amber-600" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              {data.offeringsSection.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            {data.offeringsSection.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {data.offeringsSection.description}
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.offeringsSection.categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group p-4"
            >
              <div>
                {/* Image Container with Desktop & Mobile Support */}
                <div className="relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4">
                  {/* Desktop Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="hidden md:block object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Mobile Image */}
                  <Image
                    src={item.imageMobile || item.image}
                    alt={item.title}
                    fill
                    className="block md:hidden object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Sub-Badges */}
                <div className="flex items-center justify-between text-[11px] mb-3 px-1">
                  <span className="bg-emerald-50 text-emerald-800 font-medium px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                    {item.badgeCount}
                  </span>
                  <div className="flex items-center gap-1 text-amber-700 font-semibold tracking-wider text-[10px]">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    <span>{item.categoryTag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-1">
                  <h3 className="text-lg font-serif font-medium text-slate-800 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-1 pt-2 pb-1">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-700 text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>View programmes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ADMISSIONS ROLLING BANNER */}
      <section className="py-20 bg-[#fbf9f4] border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Centered Tagline */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-amber-600" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              {data.admissionsBanner.tagline}
            </span>
            <span className="w-8 h-px bg-amber-600" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-800 font-normal mb-8 leading-snug">
            {data.admissionsBanner.title}
          </h2>

          {/* Centered Button */}
          <Link
            href={data.admissionsBanner.buttonLink}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-7 py-3.5 rounded-full transition shadow-md"
          >
            <span>{data.admissionsBanner.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}