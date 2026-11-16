'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { BookOpen, ExternalLink, Award, Users, FileText, CheckCircle2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_JOURNAL_DATA = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Academic Journal", href: "/journal" }
  ],
  tag: "Majallah Al-Iritaq for Islamic Studies (MJIS)",
  title: "Jamia Jalaliyya Academic Journal",
  description: "Advancing scholarly research, contemporary Islamic studies, humanities, and multidisciplinary academic discourse through rigorous peer review.",
  externalUrl: "https://journal.iritaq.info/index.php/mjis/en",
  stats: {
    reviewProcess: "Double-Blind",
    format: "Digital Portal",
    accessType: "Open Access"
  },
  highlights: [
    {
      title: "High Academic Standards",
      description: "Committed to publishing original, high-quality research contributions evaluated by expert double-blind reviewers."
    },
    {
      title: "Global Editorial Board",
      description: "Guided by distinguished scholars, researchers, and academicians from prominent universities worldwide."
    },
    {
      title: "Open Access Policy",
      description: "Providing unrestricted global online access to scholarly outputs to encourage knowledge sharing and academic growth."
    }
  ],
  focusScopeDescription: "The journal serves as a premier platform for academics, researchers, and students to publish findings covering a wide array of disciplines including Islamic jurisprudence, philosophy, contemporary social sciences, Arabic-English literature, and historical studies.",
  focusAreas: [
    "Islamic Jurisprudence & Usul al-Fiqh",
    "Comparative Religious Studies",
    "Arabic Language & Literature",
    "Contemporary Social Sciences",
    "Educational Theory & Curriculum Design",
    "Middle Eastern & Islamic History"
  ],
  ctaBanner: {
    title: "Ready to submit your research paper?",
    subtitle: "Review our author guidelines and submit your manuscript through our official portal."
  }
};

export default function AcademicJournalPage() {
  const [data, setData] = useState(DEFAULT_JOURNAL_DATA);

  useEffect(() => {
    async function fetchJournalSettings() {
      try {
        const { data: dbData, error } = await supabase
          .from("academic_journal_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error loading academic journal settings:", error);
          return;
        }

        if (dbData) {
          setData({
            breadcrumb: dbData.breadcrumb || DEFAULT_JOURNAL_DATA.breadcrumb,
            tag: dbData.tag || DEFAULT_JOURNAL_DATA.tag,
            title: dbData.title || DEFAULT_JOURNAL_DATA.title,
            description: dbData.description || DEFAULT_JOURNAL_DATA.description,
            externalUrl: dbData.externalUrl || DEFAULT_JOURNAL_DATA.externalUrl,
            stats: dbData.stats || DEFAULT_JOURNAL_DATA.stats,
            highlights: dbData.highlights || DEFAULT_JOURNAL_DATA.highlights,
            focusScopeDescription: dbData.focusScopeDescription || DEFAULT_JOURNAL_DATA.focusScopeDescription,
            focusAreas: dbData.focusAreas || DEFAULT_JOURNAL_DATA.focusAreas,
            ctaBanner: dbData.ctaBanner || DEFAULT_JOURNAL_DATA.ctaBanner,
          });
        }
      } catch (err) {
        console.error("Unexpected error fetching academic journal settings:", err);
      }
    }

    fetchJournalSettings();
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* --- BREADCRUMB --- */}
        <nav className="flex items-center gap-2 text-xs text-amber-700 font-medium tracking-wide">
          {data.breadcrumb.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Link href={crumb.href} className="hover:underline transition-colors">
                {crumb.label}
              </Link>
              {idx < data.breadcrumb.length - 1 && <span>&gt;</span>}
            </div>
          ))}
        </nav>
        
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          {/* Subtle background watermark icon */}
          <div className="absolute -right-10 -bottom-10 text-slate-100 pointer-events-none select-none">
            <BookOpen className="w-96 h-96 opacity-30" />
          </div>

          {/* Left Side: 3D Journal / Book Cover Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-64 sm:w-72 h-96 bg-linear-to-br from-emerald-900 via-emerald-950 to-slate-900 text-amber-50 rounded-r-2xl rounded-l-md shadow-2xl p-6 flex flex-col justify-between border-l-4 border-amber-600 transform transition-transform duration-300 hover:scale-[1.02]">
              
              {/* Book Spine Shadow / Crease overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 rounded-l-md" />

              {/* Top Cover details */}
              <div className="space-y-3 z-10">
                <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-amber-400 font-semibold border-b border-amber-500/30 pb-2">
                  <span>Peer-Reviewed</span>
                  <span>MJIS</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">Iritaq Publication</span>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight mt-1">
                    International Journal of Tafsir and Qur&apos;anic Studies
                  </h3>
                </div>
              </div>

              {/* Center Seal / Graphic */}
              <div className="my-auto py-4 flex flex-col items-center justify-center text-center z-10">
                <div className="w-16 h-16 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2 shadow-inner">
                  <Award className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-serif tracking-widest text-amber-200/80 uppercase">Scholarly Discourse</span>
              </div>

              {/* Bottom Cover details */}
              <div className="pt-3 border-t border-amber-500/30 flex justify-between items-end text-[10px] text-slate-300 z-10">
                <div>
                  <p className="font-semibold text-white">Academic Periodical</p>
                  <p className="text-amber-400">Open Access Edition</p>
                </div>
                <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Hero Metadata & Action */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{data.tag}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900">
              {data.title}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.description}
            </p>

            {/* Journal Quick Stats Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase">Review Process</span>
                <span className="text-xs font-bold text-slate-800">{data.stats.reviewProcess}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase">Format</span>
                <span className="text-xs font-bold text-slate-800">{data.stats.format}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase">Access Type</span>
                <span className="text-xs font-bold text-slate-800">{data.stats.accessType}</span>
              </div>
            </div>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={data.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Explore Journal Portal</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* --- Key Highlights Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {data.highlights.map((highlight, idx) => {
            const icons = [<Award key={0} className="w-5 h-5" />, <Users key={1} className="w-5 h-5" />, <FileText key={2} className="w-5 h-5" />];
            return (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                  {icons[idx] || <Award className="w-5 h-5" />}
                </div>
                <h2 className="font-bold text-base text-slate-900">{highlight.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* --- About & Focus Areas Section --- */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-xl font-serif font-bold border-b border-slate-100 pb-4 text-slate-900">
            Focus & Scope
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {data.focusScopeDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {data.focusAreas.map((focusItem, index) => (
              <div key={index} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{focusItem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA Bar --- */}
        <div className="bg-emerald-950 text-emerald-50 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-serif font-bold text-white">{data.ctaBanner.title}</h2>
            <p className="text-xs text-emerald-200">{data.ctaBanner.subtitle}</p>
          </div>
          <Link
            href={data.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 whitespace-nowrap"
          >
            <span>Access Portal</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}