import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { defaultGovernanceData as fallbackData } from "@/lib/governanceDefaultData";
import { MemberCard } from "@/components/governance/MemberCard";
import { LeadershipMember } from "@/types/governance";

export const revalidate = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function GovernancePage() {
  let data = fallbackData;

  try {
    const { data: dbData, error } = await supabase
      .from("governance_page_settings")
      .select("*")
      .eq("slug", "governance-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching governance data from Supabase:", error.message);
    }

    if (dbData) {
      data = {
        hero: dbData.hero || fallbackData.hero,
        stats: dbData.stats || fallbackData.stats,
        overview: dbData.overview || fallbackData.overview,
        seniorLeadership: dbData.senior_leadership || fallbackData.seniorLeadership,
        scientificCouncil: dbData.scientific_council || fallbackData.scientificCouncil,
        advisoryBoard: dbData.advisory_board || fallbackData.advisoryBoard,
        academicLeadership: dbData.academic_leadership || fallbackData.academicLeadership,
        executiveLeadership: dbData.executive_leadership || fallbackData.executiveLeadership,
        researchFaculty: dbData.research_faculty || fallbackData.researchFaculty,
        organizationalStructure: dbData.organizational_structure || fallbackData.organizationalStructure,
        ctaSection: dbData.cta_section || fallbackData.ctaSection,
      };
    }
  } catch (err: unknown) {
    console.error("Unexpected error fetching governance data:", err);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-12 md:py-20 px-4 sm:px-4 lg:px-4 pt-6 md:pt-6 overflow-hidden">
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-900/50 min-h-125 flex items-center">
          
          {/* Background Images & Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Hero Image */}
            <Image
              src={data.hero.bgImageUrl}
              alt="Governance Hero"
              fill
              priority
              className="hidden md:block object-cover object-center scale-105"
            />
            {/* Mobile Hero Image */}
            <Image
              src={data.hero.mobileBgImageUrl}
              alt="Governance Hero Mobile"
              fill
              priority
              className="block md:hidden object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-12 md:py-20">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-8">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-amber-400 font-semibold tracking-wide">Governance</span>
            </nav>

            <div className="inline-flex items-center gap-3 mb-5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
              <div className="w-6 h-0.5 bg-amber-500 rounded-full" />
              <span className="text-xs tracking-widest uppercase font-semibold text-amber-400">
                {data.hero.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-wide max-w-3xl mb-6 leading-tight">
              {data.hero.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mb-10 font-light leading-relaxed">
              {data.hero.description}
            </p>

            <Link
              href={data.hero.buttonLink}
              className="group bg-emerald-700 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2.5 shadow-lg shadow-emerald-950/40 transition duration-200"
            >
              <span>{data.hero.buttonText}</span>
              <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-100 border-b border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center ${
                idx < data.stats.length - 1 ? "md:border-r border-slate-300/80" : ""
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

      {/* 3. OVERVIEW INTRO */}
      <section className="pt-20 pb-12 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-0.5 bg-emerald-600" />
          <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
            {data.overview.tagline}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4 max-w-2xl">
          {data.overview.title}
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
          {data.overview.subtitle}
        </p>
      </section>

      {/* 4. SENIOR INSTITUTE LEADERSHIP */}
      <section id={data.seniorLeadership.id} className="py-12 max-w-7xl mx-auto px-6 border-t border-slate-200">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-4">
            {data.seniorLeadership.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 text-sm leading-relaxed">
            <p>{data.seniorLeadership.description}</p>
            {data.seniorLeadership.secondaryDescription && (
              <p>{data.seniorLeadership.secondaryDescription}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {data.seniorLeadership.members.map((m) => (
            <MemberCard key={m.id} member={m as LeadershipMember} />
          ))}
        </div>
      </section>

      {/* 5. SCIENTIFIC COUNCIL & ADVISORY BOARD (DUAL SPLIT CONTAINER) */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Scientific Council (Left Side - 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-3">
                {data.scientificCouncil.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {data.scientificCouncil.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {data.scientificCouncil.members.map((m) => (
                <MemberCard key={m.id} member={m as LeadershipMember} />
              ))}
            </div>
          </div>

          {/* Advisory Board (Right Side Green Card - 5 Cols) */}
          <div className="lg:col-span-5 bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-900/60">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              {data.advisoryBoard.title}
            </h2>
            <div className="space-y-4 text-white text-xs sm:text-sm leading-relaxed mb-8">
              <p>{data.advisoryBoard.description}</p>
              {data.advisoryBoard.secondaryDescription && (
                <p>{data.advisoryBoard.secondaryDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {data.advisoryBoard.members.map((m) => (
                <MemberCard key={m.id} member={m as LeadershipMember} isDarkContainer />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. ACADEMIC & RESEARCH LEADERSHIP */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-4">
            {data.academicLeadership.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 text-sm leading-relaxed">
            <p>{data.academicLeadership.description}</p>
            {data.academicLeadership.secondaryDescription && (
              <p>{data.academicLeadership.secondaryDescription}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.academicLeadership.members.map((m) => (
            <MemberCard key={m.id} member={m as LeadershipMember} />
          ))}
        </div>
      </section>

      {/* 7. EXECUTIVE LEADERSHIP & RESEARCH FACULTY */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Executive Leadership Box (Expanded Left Side - 6 Cols) */}
          <div className="lg:col-span-6 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-emerald-900/60">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              {data.executiveLeadership.title}
            </h2>
            <div className="space-y-4 text-white text-xs sm:text-sm leading-relaxed mb-8">
              <p>{data.executiveLeadership.description}</p>
              {data.executiveLeadership.secondaryDescription && (
                <p>{data.executiveLeadership.secondaryDescription}</p>
              )}
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {data.executiveLeadership.members.map((m) => (
                <MemberCard 
                  key={m.id} 
                  member={m as LeadershipMember} 
                  isDarkContainer 
                  aspectRatio="aspect-[3/4]"
                />
              ))}
            </div>
          </div>

          {/* Research Faculty Grid (Right Side - 6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-3">
                {data.researchFaculty.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {data.researchFaculty.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {data.researchFaculty.members.map((m) => (
                <MemberCard key={m.id} member={m as LeadershipMember} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. ORGANIZATIONAL STRUCTURE */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-emerald-600" />
            <span className="text-xs tracking-widest uppercase font-semibold text-emerald-700">
              FRAMEWORK
            </span>
          </div>
          <h2 className="text-3xl font-serif text-slate-800 mb-6">
            {data.organizationalStructure.title}
          </h2>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>{data.organizationalStructure.paragraph1}</p>
            <p>{data.organizationalStructure.paragraph2}</p>
          </div>
        </div>
      </section>

      {/* 9. CTA BOTTOM BANNER */}
      <section className="py-12 w-full mx-auto px-3 pt-3">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 md:p-14 shadow-xl border border-emerald-900/60 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-3">
              {data.ctaSection.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {data.ctaSection.description}
            </p>
          </div>

          <Link
            href={data.ctaSection.buttonLink}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-full text-sm font-medium shrink-0 flex items-center gap-2 transition shadow-lg hover:shadow-emerald-900/40"
          >
            <span>{data.ctaSection.buttonText}</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-200" />
          </Link>
        </div>
      </section>

    </div>
  );
}