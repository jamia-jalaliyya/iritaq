"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import {
  FeaturedArticle,
  NewsCardItem,
  PressReleaseItem,
  ConferenceHighlightItem,
} from "@/lib/newsData";

interface ArticleModalData {
  title: string;
  category: string;
  date: string;
  author?: string;
  image: string;
  content: string;
}

interface NewsPageClientProps {
  hero: {
    badge?: string;
    title?: string;
    description?: string;
    backgroundImage: string;
    mobileBackgroundImage: string;
  };
  sectionHeaders: {
    latestNewsBadge?: string;
    latestNewsTitle?: string;
    pressTitle?: string;
    confTitle?: string;
  };
  categories: string[];
  mainStory: FeaturedArticle;
  sideStories: FeaturedArticle[];
  newsGrid: NewsCardItem[];
  pressReleases: PressReleaseItem[];
  conferenceHighlights: ConferenceHighlightItem[];
}

export default function NewsPageClient({
  hero,
  sectionHeaders,
  categories,
  mainStory,
  sideStories,
  newsGrid,
  pressReleases,
  conferenceHighlights,
}: NewsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ArticleModalData | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const filteredNewsGrid =
    activeCategory === "All News"
      ? newsGrid
      : newsGrid.filter(
          (item) =>
            item.category.toLowerCase() === activeCategory.toLowerCase() ||
            (activeCategory === "Research News" && item.category === "RESEARCH") ||
            (activeCategory === "Academic News" && item.category === "ACADEMIC") ||
            (activeCategory === "Institutional" && item.category === "INSTITUTIONAL") ||
            (activeCategory === "Announcements" && item.category === "ANNOUNCEMENT") ||
            (activeCategory === "Publications" && item.category === "PUBLICATIONS")
        );

  return (
    <main className="w-full min-h-screen bg-white text-slate-800 font-sans pb-16 relative">
      
      {/* 1. HERO HEADER BANNER */}
      <section className="w-full mx-auto px-4 sm:px-4 md:px-4 pt-6 sm:pt-8">
        <div className="relative w-full min-h-125 md:min-h-140 flex items-center px-6 md:px-16 py-12 md:py-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.backgroundImage}
              alt="IRITAQ Newsroom Summit"
              fill
              className="hidden md:block object-cover object-center opacity-40"
              priority
            />
            <Image
              src={hero.mobileBackgroundImage || hero.backgroundImage}
              alt="IRITAQ Newsroom Summit Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-6 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-amber-400 font-normal">News</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-amber-500" />
              <span className="text-amber-400 text-[11px] font-bold tracking-widest uppercase">
                {hero.badge || "NEWSROOM"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-white tracking-tight mb-6 max-w-4xl leading-[1.1]">
              {hero.title || "Institutional news, research announcements and press releases"}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light mb-8 leading-relaxed">
              {hero.description || "The latest breakthroughs in Qur'anic Studies, institutional updates, scholarly conferences, and collaborative announcements."}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#latest-news"
                className="inline-flex items-center gap-2 bg-[#126b48] hover:bg-[#0f593c] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition shadow-md"
              >
                <span>Browse News</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#news-grid"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3.5 rounded-full border border-slate-600/80 backdrop-blur-md transition"
              >
                <Search className="w-3.5 h-3.5 text-slate-300" />
                <span>Search All Articles</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORIES */}
      <section id="latest-news" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-bold tracking-widest uppercase">
              {sectionHeaders.latestNewsBadge || "LATEST NEWS"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light">
            {sectionHeaders.latestNewsTitle || "Featured Stories"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Featured Card */}
          <div className="lg:col-span-7 bg-[#f7f4ed] rounded-3xl overflow-hidden border border-amber-200/60 shadow-2xs flex flex-col justify-between group">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
              <Image
                src={mainStory.image}
                alt={mainStory.title}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-between grow">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-white text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200/80">
                    {mainStory.category}
                  </span>
                  <span className="text-emerald-800 font-bold text-xs">
                    {mainStory.date}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-slate-800 leading-snug mb-4 group-hover:text-emerald-900 transition-colors">
                  {mainStory.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {mainStory.excerpt}
                </p>
              </div>

              <div>
                <button
                  onClick={() =>
                    setActiveArticle({
                      title: mainStory.title,
                      category: mainStory.category,
                      date: mainStory.date,
                      image: mainStory.image,
                      content: `${mainStory.excerpt}\n\nIRITAQ continues its global outreach in advancing classical exegesis, digital manuscript cataloging, and fostering bilateral scholarly exchange across research universities worldwide.`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <span>{mainStory.actionText || "Read Full Article"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Stacked Secondary Featured Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sideStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full hover:border-emerald-200 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#c78828] text-[10px] font-bold tracking-widest uppercase">
                      {story.category}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">
                      {story.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-slate-800 leading-snug mb-3">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {story.excerpt}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() =>
                      setActiveArticle({
                        title: story.title,
                        category: story.category,
                        date: story.date,
                        image: mainStory.image,
                        content: `${story.excerpt}\n\nThis initiative marks a milestone for our research fellows and institutional departments as we expand our collaborative horizons into classical codicology and rigorous textual criticism.`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                  >
                    <span>{story.actionText || "Read More"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTERS & NEWS GRID */}
      <section id="news-grid" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="bg-[#f7f4ed] p-3 rounded-2xl md:rounded-full border border-amber-200/60 mb-10 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/60"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNewsGrid.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs flex flex-col justify-between group hover:border-slate-300 transition"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="text-slate-500 font-medium">{item.author}</span>
                  </div>

                  <h3 className="text-xl font-serif text-slate-800 leading-snug mb-3 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() =>
                    setActiveArticle({
                      title: item.title,
                      category: item.category,
                      date: item.date,
                      author: item.author,
                      image: item.image,
                      content: `${item.excerpt}\n\nFull article coverage and academic commentary regarding ${item.title}. Authored by ${item.author} on ${item.date}.\n\nIRITAQ remains committed to disseminating precise linguistic annotations, research monographs, and international conference findings to scholars worldwide.`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER SUBSCRIPTION BANNER */}
      <section className="w-full bg-[#f8f5ee] border-y border-amber-200/60 py-16 px-6 md:px-16 mt-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-bold tracking-widest uppercase">
              NEWSLETTER
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-4">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed mb-8">
            Get quarterly digests of the latest peer-reviewed research, announcements, and critical commentary delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-semibold px-6 py-3.5 rounded-full">
              Thank you for subscribing to IRITAQ Newsroom updates!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs px-5 py-3.5 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-700 shadow-2xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#2d7355] hover:bg-[#235b43] text-white text-xs font-bold px-7 py-3.5 rounded-full transition shadow-xs shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. OFFICIAL PRESS RELEASES */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-bold tracking-widest uppercase">
              PRESS RELEASES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light">
            {sectionHeaders.pressTitle || "Official Press Releases"}
          </h2>
        </div>

        <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
          {pressReleases.map((pr) => (
            <div
              key={pr.id}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition px-2 rounded-xl"
            >
              <div className="max-w-3xl space-y-2">
                <span className="text-amber-800 text-xs font-bold block">
                  {pr.date}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif text-slate-800 font-normal">
                  {pr.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {pr.summary}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() =>
                    setActiveArticle({
                      title: pr.title,
                      category: "Press Release",
                      date: pr.date,
                      image: mainStory.image,
                      content: `${pr.summary}\n\nOfficial Press Release statement published by IRITAQ on ${pr.date}.\n\nMedia liaisons and accredited publishing agencies may reach out via our contact directory for further inquiries.`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 border border-emerald-800/80 text-emerald-800 hover:bg-emerald-800 hover:text-white text-xs font-bold px-5 py-2.5 rounded-lg transition cursor-pointer"
                >
                  <span>Read Full Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONFERENCE HIGHLIGHTS */}
      <section className="w-full bg-[#f8f5ee] border-t border-amber-200/60 py-16 px-6 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-[11px] font-bold tracking-widest uppercase">
                CONFERENCE NEWS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light">
              {sectionHeaders.confTitle || "Highlights from Recent Events"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {conferenceHighlights.map((conf) => (
              <div
                key={conf.id}
                onClick={() =>
                  setActiveArticle({
                    title: conf.title,
                    category: "Conference Highlight",
                    date: conf.date,
                    image: conf.image,
                    content: `${conf.description}\n\nDetailed event proceedings, keynote addresses, and scholar panels from ${conf.title} held on ${conf.date}.`,
                  })
                }
                className="relative aspect-3/4 rounded-2xl overflow-hidden group border border-slate-800/20 shadow-md bg-slate-950 flex flex-col justify-end p-5 text-white cursor-pointer"
              >
                <Image
                  src={conf.image}
                  alt={conf.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <span className="text-amber-300 text-xs font-bold block mb-1">
                    {conf.date}
                  </span>

                  <h3 className="text-base font-serif font-medium leading-snug text-white">
                    {conf.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    {conf.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE POPUP MODAL DIALOG */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200">
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              {activeArticle.author && (
                <p className="text-xs font-semibold text-emerald-800">
                  By {activeArticle.author}
                </p>
              )}

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full transition cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}