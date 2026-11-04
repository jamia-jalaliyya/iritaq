"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import {
  FileText,
  ExternalLink,
  Download,
  ChevronRight,
} from "lucide-react";
import { sampleResourceDetail } from "@/lib/digitalLibraryDetailData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DigitalLibraryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const resourceId = resolvedParams.id || "res-1";

  const [resource, setResource] = useState(sampleResourceDetail);

  useEffect(() => {
    async function fetchResourceData() {
      try {
        let { data } = await supabase
          .from("digital_library_resource_settings")
          .select("*")
          .eq("id", resourceId)
          .maybeSingle();

        const { error } = await supabase
          .from("digital_library_resource_settings")
          .select("*")
          .eq("id", resourceId)
          .maybeSingle();

        if (!data) {
          // Fallback to first available resource if specific ID is not seeded yet
          const { data: fallbackData } = await supabase
            .from("digital_library_resource_settings")
            .select("*")
            .limit(1)
            .maybeSingle();
          if (fallbackData) data = fallbackData;
        }

        if (error && error.code) {
          console.error("Error loading resource detail:", error.message);
          return;
        }

        if (data) {
          setResource({
  id: data.id || resourceId, // Ensure 'id' is present
  title: data.title || sampleResourceDetail.title,
  subtitle: data.subtitle || sampleResourceDetail.subtitle,
  category: data.category || sampleResourceDetail.category,
  categorySlug: data.category_slug || sampleResourceDetail.categorySlug,
  author: data.author || sampleResourceDetail.author,
  language: data.language || sampleResourceDetail.language,
  status: data.status || sampleResourceDetail.status,
  heroImage: data.hero_image || sampleResourceDetail.heroImage,
  mobileHeroImage: data.mobile_hero_image || sampleResourceDetail.mobileHeroImage,
  paragraphs: data.paragraphs || sampleResourceDetail.paragraphs,
  mediaDocuments: data.media_documents || sampleResourceDetail.mediaDocuments,
  keywords: data.keywords || sampleResourceDetail.keywords,
  citation: data.citation || sampleResourceDetail.citation,
  details: data.details || sampleResourceDetail.details,
  relatedResources: data.related_resources || sampleResourceDetail.relatedResources,
});
        }
      } catch (err: unknown) {
        console.error("Unexpected error fetching resource detail:", err);
      }
    }

    fetchResourceData();
  }, [resourceId]);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      
      {/* 1. HERO BANNER SECTION */}
      <div className="w-full mx-auto px-4 pt-4 md:pt-6">
        <section className="relative min-h-95 md:min-h-110 flex items-end text-white px-6 md:px-12 py-12 md:py-16 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          
          <div className="absolute inset-0 z-0">
            {resource.heroImage && (
              <Image
                src={resource.heroImage}
                alt={resource.title}
                fill
                className="hidden md:block object-cover object-center"
                priority
              />
            )}
            {resource.mobileHeroImage && (
              <Image
                src={resource.mobileHeroImage}
                alt={`${resource.title} Mobile`}
                fill
                className="block md:hidden object-cover object-center"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/75 to-slate-950/40" />
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            
            <nav className="flex items-center flex-wrap gap-2 text-xs text-amber-400/90 mb-6 font-medium">
              <Link href="/" className="hover:underline transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <Link href="/digital-library" className="hover:underline transition-colors">
                Digital Library
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <Link
                href={`/digital-library/${resource.categorySlug}`}
                className="hover:underline transition-colors"
              >
                {resource.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-amber-300 font-normal truncate max-w-50 sm:max-w-none">
                {resource.title}
              </span>
            </nav>

            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-3">
              {resource.category}
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight mb-4 max-w-4xl drop-shadow-sm">
              {resource.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl drop-shadow-sm">
              {resource.subtitle}
            </p>

          </div>

        </section>
      </div>

      {/* 2. MAIN CONTENT & SIDEBAR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* LEFT COLUMN: Main Detail Content (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
              <span className="bg-emerald-100/80 text-emerald-900 border border-emerald-300/60 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase">
                {resource.status}
              </span>
              <span>{resource.author}</span>
              <span className="text-slate-300">•</span>
              <span>{resource.language}</span>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {resource.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="bg-[#f7f5ef] border border-amber-200/60 rounded-2xl p-6 sm:p-8 mt-2">
              <h3 className="text-xl font-serif text-slate-800 mb-1 font-normal">
                Media & documents
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Access official files and external academic references for this resource.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {resource.mediaDocuments?.pdfUrl && (
                  <a
                    href={resource.mediaDocuments.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200/90 shadow-2xs transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Download PDF</span>
                  </a>
                )}

                {resource.mediaDocuments?.externalLink && (
                  <a
                    href={resource.mediaDocuments.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200/90 shadow-2xs transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                    <span>External link</span>
                  </a>
                )}

                {resource.mediaDocuments?.downloadPackageUrl && (
                  <a
                    href={resource.mediaDocuments.downloadPackageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200/90 shadow-2xs transition"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Download package</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-2">
              <span className="text-amber-700 text-[11px] font-semibold tracking-widest uppercase block mb-3">
                KEYWORDS
              </span>
              <div className="flex flex-wrap gap-2">
                {resource.keywords?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-200/70 text-slate-700 hover:bg-slate-200 transition text-xs px-3.5 py-1.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2 border-l-2 border-amber-600 pl-4 py-1">
              <span className="text-amber-700 text-[11px] font-semibold tracking-widest uppercase block mb-2">
                CITATION
              </span>
              <p className="text-xs sm:text-sm italic text-slate-600 font-serif leading-relaxed">
                {resource.citation}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar Metadata & Related Items (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="text-lg font-serif text-slate-800 mb-4 font-normal">
                Details
              </h3>

              <div className="divide-y divide-slate-100 text-xs text-slate-600 mb-6">
                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">Category</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.category}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">Author</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.author}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">Publication</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.publication}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">Language</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.language}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">Pages</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.pages}
                  </span>
                </div>

                <div className="py-2.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">ISBN</span>
                  <span className="text-slate-800 font-medium text-right">
                    {resource.details?.isbn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a href={resource.mediaDocuments?.pdfUrl || "#"} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-medium py-1.5 rounded-md transition">
                  <FileText className="w-3 h-3" /> PDF
                </a>
                <a href={resource.mediaDocuments?.externalLink || "#"} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-medium py-1.5 rounded-md transition">
                  <ExternalLink className="w-3 h-3" /> LINK
                </a>
                <a href={resource.mediaDocuments?.downloadPackageUrl || "#"} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-medium py-1.5 rounded-md transition">
                  <Download className="w-3 h-3" /> DOWNLOAD
                </a>
              </div>
            </div>

            <div className="bg-[#f7f5ef] border border-amber-200/60 rounded-2xl p-6">
              <h4 className="text-base font-serif text-slate-800 mb-4 font-normal">
                More in {resource.category}
              </h4>

              <div className="space-y-3">
                {resource.relatedResources?.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    className="block text-emerald-800 hover:text-emerald-700 hover:underline text-xs sm:text-sm font-medium leading-snug transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}