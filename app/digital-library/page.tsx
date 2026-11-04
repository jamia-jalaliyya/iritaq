"use client";

import { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";
import {
  digitalLibraryData as DEFAULT_DATA,
  LibraryCategory,
  FeaturedResource,
  ResourceItem,
} from "@/lib/digitalLibraryData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DigitalLibraryPage() {
  const [hero, setHero] = useState(DEFAULT_DATA.hero);
  const [stats, setStats] = useState(DEFAULT_DATA.stats);
  const [categoriesSection, setCategoriesSection] = useState(DEFAULT_DATA.categoriesSection);
  const [featuredSection, setFeaturedSection] = useState(DEFAULT_DATA.featuredSection);
  const [allResourcesSection, setAllResourcesSection] = useState(DEFAULT_DATA.allResourcesSection);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All languages");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("digital_library_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error loading digital library settings:", error);
          return;
        }

        if (data) {
          if (data.hero) setHero({ ...DEFAULT_DATA.hero, ...data.hero });
          if (data.stats && Array.isArray(data.stats)) setStats(data.stats);
          if (data.categories_section) setCategoriesSection({ ...DEFAULT_DATA.categoriesSection, ...data.categories_section });
          if (data.featured_section) setFeaturedSection({ ...DEFAULT_DATA.featuredSection, ...data.featured_section });
          if (data.all_resources_section) setAllResourcesSection({ ...DEFAULT_DATA.allResourcesSection, ...data.all_resources_section });
        }
      } catch (err: unknown) {
        console.error("Unexpected error fetching digital library data:", err);
      }
    }

    fetchData();
  }, []);

  const filteredResources = useMemo(() => {
    return allResourcesSection.items.filter((item: ResourceItem) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;

      const matchesLanguage =
        selectedLanguage === "All languages" || item.language === selectedLanguage;

      return matchesSearch && matchesStatus && matchesLanguage;
    });
  }, [allResourcesSection.items, searchQuery, selectedStatus, selectedLanguage]);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* HERO SECTION */}
      <div className="w-full mx-auto px-4 pt-6 md:pt-8">
        <section className="relative min-h-110 md:min-h-125 flex items-center justify-center text-white px-6 md:px-12 py-16 md:py-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.backgroundImage}
              alt="Digital Library Shelves Background"
              fill
              className="hidden md:block object-cover object-center opacity-30"
              priority
            />
            <Image
              src={hero.mobileBackgroundImage}
              alt="Digital Library Shelves Background Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-amber-400 mb-4 font-medium tracking-wide">
              {hero.breadcrumb.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < hero.breadcrumb.length - 1 && <span>&gt;</span>}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                {hero.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-4 drop-shadow-sm">
              {hero.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-sm">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={hero.primaryButtonLink}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-lg"
              >
                <span>{hero.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={hero.secondaryButtonLink}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-sm"
              >
                <span>{hero.secondaryButtonText}</span>
              </a>
            </div>

          </div>

        </section>
      </div>

      {/* STATS COUNTER BAR */}
      <section className="py-12 bg-slate-100/70 border-b border-slate-200/80 my-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-serif text-slate-700 font-light mb-2">
                {stat.value}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section id="categories" className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-amber-600" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              {categoriesSection.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            {categoriesSection.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {categoriesSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesSection.items.map((cat: LibraryCategory) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-700 mb-3 block">
                  RESOURCES
                </span>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-serif text-slate-800 font-medium group-hover:text-emerald-800 transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-sm font-serif text-slate-500 font-normal dir-rtl ml-2 shrink-0">
                    {cat.arabicTitle}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                <Link
                  href={cat.link}
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-700 text-xs font-medium transition-colors"
                >
                  <span>{cat.resourceCount}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HIGHLIGHTS SECTION */}
      <section className="py-16 md:py-20 bg-[#1e2a24] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-2">
              {featuredSection.tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-light">
              {featuredSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSection.items.map((feat: FeaturedResource) => (
              <div
                key={feat.id}
                className="border border-emerald-800/60 rounded-2xl p-6 bg-emerald-950/30 flex flex-col justify-between hover:border-amber-400/50 transition-colors"
              >
                <div>
                  <span className="text-amber-400 text-[10px] font-semibold tracking-widest uppercase block mb-3">
                    {feat.categoryTag}
                  </span>
                  <h3 className="text-lg font-serif text-white mb-3 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <Link
                  href={feat.link}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors"
                >
                  <span>View resource</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH & ALL RESOURCES GALLERY */}
      <section id="all-resources" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-amber-600" />
            <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">
              {allResourcesSection.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            {allResourcesSection.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {allResourcesSection.description}
          </p>
        </div>

        <div className="bg-[#f5f2eb] rounded-2xl p-3 md:p-4 mb-8 border border-amber-200/60 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources, authors and keywords"
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
              {["All languages", "Arabic", "English", "Malayalam", "Urdu"].map((lang) => (
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
            <p className="text-slate-500 text-sm">No resources found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res: ResourceItem) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                    <Image
                      src={res.image}
                      alt={res.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-medium text-slate-500">
                        {res.category}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200/60 uppercase tracking-wider">
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

    </main>
  );
}