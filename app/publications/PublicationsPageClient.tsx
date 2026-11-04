"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { Publication, publicationsData } from "@/lib/publicationsData";

interface PublicationsPageClientProps {
  hero: typeof publicationsData.hero;
  featuredSection: typeof publicationsData.featuredSection;
  browseSection: typeof publicationsData.browseSection;
  publications: Publication[];
  cta: typeof publicationsData.cta;
}

export default function PublicationsPageClient({
  hero,
  featuredSection,
  browseSection,
  publications,
  cta,
}: PublicationsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePub, setActivePub] = useState<Publication | null>(null);

  // Filter logic for interactive searching & categories
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchesCategory =
        selectedCategory === "All" ||
        pub.type === selectedCategory ||
        (selectedCategory === "Academic Journals" && pub.type === "Journals") ||
        (selectedCategory === "Books" && pub.type === "Books") ||
        (selectedCategory === "Research Papers" && pub.type === "Research Papers") ||
        (selectedCategory === "Monographs" && pub.type === "Monographs") ||
        (selectedCategory === "Conference Proceedings" && pub.type === "Proceedings") ||
        (selectedCategory === "Digital Publications" && pub.type === "Digital Publications");

      const matchesSearch =
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, publications]);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">

      {/* 1. HERO SECTION */}
      <section className="pt-6 pb-6 w-full mx-auto px-4 md:pt-8">
        <div className="relative py-8 sm:py-10 md:py-14 bg-slate-400 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.backgroundImage}
              alt="Digital Library Backdrop"
              fill
              className="hidden md:block object-cover object-center opacity-75"
              priority
            />
            <Image
              src={hero.mobileBackgroundImage || hero.backgroundImage}
              alt="Digital Library Backdrop Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-75"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 md:px-16">
            <nav className="flex items-center gap-2 text-xs text-amber-300 mb-6 font-medium tracking-wide">
              {hero.breadcrumb?.map((crumb: { label: string; href: string }, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < hero.breadcrumb.length - 1 && <span>&gt;</span>}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-amber-500" />
              <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                {hero.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-6 drop-shadow-sm">
              {hero.title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-sm">
              {hero.description}
            </p>

            <Link
              href={hero.buttonLink}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-lg"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED HIGHLIGHTS SECTION */}
      <section className="py-16 bg-[#f8f6f0] border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                {featuredSection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-2">
              {featuredSection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {featuredSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publications.slice(1, 4).map((pub) => (
              <div
                key={`feat-${pub.id}`}
                onClick={() => setActivePub(pub)}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition cursor-pointer group"
              >
                <div className="relative w-32 h-44 shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-md mx-auto sm:mx-0">
                  <Image
                    src={pub.coverImage}
                    alt={pub.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-0.5 bg-emerald-700" />
                      <span className="text-[10px] font-semibold tracking-widest text-emerald-800 uppercase">
                        {pub.badgeLabel}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-slate-800 mb-1 leading-snug group-hover:text-emerald-800 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      {pub.author} · {pub.year}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {pub.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATALOGUE & FILTER SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                {browseSection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-2">
              {browseSection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {browseSection.description}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={browseSection.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-700 transition"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {browseSection.categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-8">
          {filteredPublications.length} PUBLICATIONS
        </p>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              onClick={() => setActivePub(pub)}
              className="flex flex-col justify-between group cursor-pointer bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition"
            >
              <div>
                <div className="relative w-full aspect-3/4 rounded-2xl bg-[#f5f2eb] border border-slate-200/80 p-6 flex items-center justify-center mb-5 overflow-hidden shadow-xs">
                  <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-md z-10 backdrop-blur-sm">
                    {pub.badgeLabel}
                  </span>

                  <div className="relative w-4/5 h-4/5 rounded shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={pub.coverImage}
                      alt={pub.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-serif font-medium text-slate-800 mb-1 leading-snug group-hover:text-emerald-800 transition-colors">
                  {pub.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{pub.author}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {pub.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 text-[11px] font-semibold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                <span>{pub.year}</span>
                <span>·</span>
                <span>{pub.pages}</span>
                <span>·</span>
                <span>{pub.language}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUBMIT RESEARCH CTA */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="w-full bg-[#04402a] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white mb-4">
              {cta.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {cta.description}
            </p>
          </div>

          <Link
            href={cta.buttonLink}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition shadow-lg shrink-0"
          >
            <span>{cta.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PUBLICATION DETAILS MODAL */}
      {activePub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {activePub.badgeLabel}
              </span>
              <button
                onClick={() => setActivePub(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-36 h-48 shrink-0 rounded-xl overflow-hidden shadow-md bg-slate-100 mx-auto">
                <Image
                  src={activePub.coverImage}
                  alt={activePub.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 flex-1">
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900 leading-snug">
                  {activePub.title}
                </h2>
                <p className="text-xs font-semibold text-emerald-800">
                  By {activePub.author}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePub.description}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>{activePub.year}</span>
                  <span>•</span>
                  <span>{activePub.pages}</span>
                  <span>•</span>
                  <span>{activePub.language}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400">IRITAQ Digital Library Repository</span>
              <button
                onClick={() => setActivePub(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}