"use client";

import { useState, useMemo, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  Search,
  FileText,
  ExternalLink,
  Download,
  Filter,
  Plus,
  ChevronRight,
} from "lucide-react";
import {
  collectionData as DEFAULT_DATA,
  CollectionResource,
  RelatedCategoryPill,
} from "@/lib/digitalLibraryCollectionData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DigitalLibraryCollectionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || "tafsir-collections";

  const [hero, setHero] = useState(DEFAULT_DATA.hero);
  const [resourcesHeader, setResourcesHeader] = useState(DEFAULT_DATA.resourcesHeader);
  const [items, setItems] = useState<CollectionResource[]>(DEFAULT_DATA.items);
  const [relatedCategories, setRelatedCategories] = useState<RelatedCategoryPill[]>(DEFAULT_DATA.relatedCategories);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All languages");

  useEffect(() => {
    async function fetchCollectionData() {
      if (!slug) return;

      try {
        // Try querying by the exact slug first
        let { data } = await supabase
          .from("digital_library_collection_settings")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        const { error } = await supabase
          .from("digital_library_collection_settings")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        // Fallback: If not found, try looking up by 'tafsir-collections' or the first available record to prevent blank pages
        if (!data) {
          const { data: fallbackData } = await supabase
            .from("digital_library_collection_settings")
            .select("*")
            .limit(1)
            .maybeSingle();
          
          if (fallbackData) {
            data = fallbackData;
          }
        }

        if (error) {
          console.error("Error loading collection settings from Supabase:", error);
          return;
        }

        if (data) {
          if (data.hero) {
            setHero({
              ...DEFAULT_DATA.hero,
              ...data.hero,
              breadcrumb: data.hero.breadcrumb || DEFAULT_DATA.hero.breadcrumb,
            });
          }
          if (data.resources_header) {
            setResourcesHeader({ ...DEFAULT_DATA.resourcesHeader, ...data.resources_header });
          }
          if (data.items && Array.isArray(data.items)) {
            setItems(data.items);
          }
          if (data.related_categories && Array.isArray(data.related_categories)) {
            setRelatedCategories(data.related_categories);
          }
        }
      } catch (err: unknown) {
        console.error("Unexpected error fetching collection data:", err);
      }
    }

    fetchCollectionData();
  }, [slug]);

  // Case-insensitive dynamic filter logic
  const filteredResources = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" ||
        (item.status && item.status.toLowerCase() === selectedStatus.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All languages" || 
        (item.language && item.language.toLowerCase() === selectedLanguage.toLowerCase());

      return matchesSearch && matchesStatus && matchesLanguage;
    });
  }, [items, searchQuery, selectedStatus, selectedLanguage]);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* 1. HERO SECTION */}
      <div className="w-full mx-auto px-4 pt-4 md:pt-6">
        <section className="relative min-h-95 md:min-h-110 flex items-center justify-center text-white px-6 md:px-12 py-16 md:py-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          
          <div className="absolute inset-0 z-0">
            {hero.backgroundImage && (
              <Image
                src={hero.backgroundImage}
                alt={hero.title || "Collection Background"}
                fill
                className="hidden md:block object-cover object-center opacity-25"
                priority
              />
            )}
            {hero.mobileBackgroundImage && (
              <Image
                src={hero.mobileBackgroundImage}
                alt={hero.title || "Collection Background Mobile"}
                fill
                className="block md:hidden object-cover object-center opacity-25"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/80 to-slate-950/50" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            
            <nav className="flex items-center flex-wrap gap-2 text-xs text-amber-400/90 mb-4 font-medium tracking-wide">
              {hero.breadcrumb?.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < hero.breadcrumb.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </div>
              ))}
            </nav>

            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-3">
              {hero.tagline}
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-white leading-tight max-w-3xl mb-4 drop-shadow-sm">
              {hero.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl drop-shadow-sm">
              {hero.description}
            </p>

          </div>

        </section>
      </div>

      {/* 2. COLLECTION RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-[11px] font-semibold tracking-widest uppercase">
                {resourcesHeader.countTag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-2">
              {resourcesHeader.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {resourcesHeader.subtitle}
            </p>
          </div>

          <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-300/80 shadow-2xs transition shrink-0 self-start sm:self-auto">
            <Plus className="w-3.5 h-3.5 text-slate-600" />
            <span>{resourcesHeader.addButtonText || "Add resource"}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#f5f2eb] rounded-2xl p-3 md:p-4 mb-8 border border-amber-200/60 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search within collection"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:block" />

            <div className="flex items-center bg-white/70 p-1 rounded-full border border-slate-200/80">
              {["All", "Published", "Scheduled", "Archived"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    selectedStatus === status
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-white/70 p-1 rounded-full border border-slate-200/80">
              {["All languages", "English", "Arabic", "Malayalam", "Urdu"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    selectedLanguage === lang
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

          </div>

        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              No resources found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                    <Image
                      src={res.image || "/images/library/quran-book-1.jpg"}
                      alt={res.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded border border-emerald-200/60 uppercase tracking-wider">
                        {res.status}
                      </span>
                      {res.isFeatured && (
                        <span className="text-amber-700 text-[11px] font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-medium text-slate-800 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {res.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-md font-medium">
                        <FileText className="w-3 h-3 text-slate-500" /> PDF
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-md font-medium">
                        <ExternalLink className="w-3 h-3 text-slate-500" /> LINK
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] px-2.5 py-1 rounded-md font-medium">
                        <Download className="w-3 h-3 text-slate-500" /> DOWNLOAD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">
                    {res.language}
                  </span>
                  <Link
                    href={`/digital-library/resource/${res.id}`}
                    className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-700 text-xs font-semibold tracking-wide transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* 3. RELATED CATEGORIES PILL SECTION */}
      <section className="mt-20 py-14 bg-[#f8f6f0] border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-[11px] font-semibold tracking-widest uppercase">
                RELATED
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-slate-800">
              Other Digital Library categories
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {relatedCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/digital-library/${cat.slug}`}
                className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 rounded-full px-4 py-2 text-xs font-medium transition shadow-2xs"
              >
                {cat.name}
              </Link>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}