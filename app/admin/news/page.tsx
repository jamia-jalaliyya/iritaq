"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import {
  newsHero as defaultHero,
  featuredMainStory as defaultMainStory,
  featuredSideStories as defaultSideStories,
  initialNewsGridItems as defaultNewsGrid,
  officialPressReleases as defaultPressReleases,
  conferenceHighlights as defaultConferenceHighlights,
  newsCategories as defaultCategories,
  NewsCardItem,
  PressReleaseItem,
  ConferenceHighlightItem,
  FeaturedArticle,
} from "@/lib/newsData";
import {
  Loader2,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Settings,
} from "lucide-react";


export default function NewsAdminPage() {
  // Hero State
  const [heroBadge, setHeroBadge] = useState("NEWSROOM");
  const [heroTitle, setHeroTitle] = useState(
    "Institutional news, research announcements and press releases"
  );
  const [heroDesc, setHeroDesc] = useState(
    "The latest breakthroughs in Qur'anic Studies, institutional updates, scholarly conferences, and collaborative announcements."
  );
  const [heroBg, setHeroBg] = useState(defaultHero.backgroundImage);
  const [heroMobileBg, setHeroMobileBg] = useState(
    defaultHero.mobileBackgroundImage
  );

  // Section Headers State
  const [sectionHeaders, setSectionHeaders] = useState({
    latestNewsBadge: "LATEST NEWS",
    latestNewsTitle: "Featured Stories",
    newsGridBadge: "NEWSROOM DIRECTORY",
    newsGridTitle: "All Articles & Announcements",
    newsletterBadge: "NEWSLETTER",
    newsletterTitle: "Subscribe to Our Newsletter",
    newsletterDesc: "Get quarterly digests of the latest peer-reviewed research, announcements, and critical commentary delivered straight to your inbox.",
    pressBadge: "PRESS RELEASES",
    pressTitle: "Official Press Releases",
    confBadge: "CONFERENCE NEWS",
    confTitle: "Highlights from Recent Events",
  });

  // Categories State
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  // Content States
  const [mainStory, setMainStory] = useState<FeaturedArticle>(defaultMainStory);
  const [sideStories, setSideStories] = useState<FeaturedArticle[]>(defaultSideStories);
  const [newsGrid, setNewsGrid] = useState<NewsCardItem[]>(defaultNewsGrid);
  const [pressReleases, setPressReleases] = useState<PressReleaseItem[]>(defaultPressReleases);
  const [conferenceHighlights, setConferenceHighlights] = useState<ConferenceHighlightItem[]>(defaultConferenceHighlights);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsSettings() {
      try {
        const { data, error } = await supabase
          .from("news_page_settings")
          .select("*")
          .eq("slug", "news-page")
          .maybeSingle();

        let pageData = data;

        if (!pageData) {
          const initialPayload = {
            slug: "news-page",
            hero: {
              badge: "NEWSROOM",
              title: "Institutional news, research announcements and press releases",
              description: "The latest breakthroughs in Qur'anic Studies, institutional updates, scholarly conferences, and collaborative announcements.",
              backgroundImage: defaultHero.backgroundImage,
              mobileBackgroundImage: defaultHero.mobileBackgroundImage,
            },
            section_headers: sectionHeaders,
            categories: defaultCategories,
            featured_main_story: defaultMainStory,
            featured_side_stories: defaultSideStories,
            news_grid: defaultNewsGrid,
            press_releases: defaultPressReleases,
            conference_highlights: defaultConferenceHighlights,
          };

          await supabase
            .from("news_page_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          pageData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching news settings:", error.message);
        }

        if (pageData) {
          if (pageData.hero) {
            setHeroBadge(pageData.hero.badge || "NEWSROOM");
            setHeroTitle(pageData.hero.title || heroTitle);
            setHeroDesc(pageData.hero.description || heroDesc);
            setHeroBg(pageData.hero.backgroundImage || defaultHero.backgroundImage);
            setHeroMobileBg(pageData.hero.mobileBackgroundImage || defaultHero.mobileBackgroundImage);
          }
          if (pageData.section_headers) setSectionHeaders(pageData.section_headers);
          if (Array.isArray(pageData.categories)) setCategories(pageData.categories);
          if (pageData.featured_main_story) setMainStory(pageData.featured_main_story);
          if (Array.isArray(pageData.featured_side_stories)) setSideStories(pageData.featured_side_stories);
          if (Array.isArray(pageData.news_grid)) setNewsGrid(pageData.news_grid);
          if (Array.isArray(pageData.press_releases)) setPressReleases(pageData.press_releases);
          if (Array.isArray(pageData.conference_highlights)) setConferenceHighlights(pageData.conference_highlights);
        }
      } catch (err: unknown) {
        console.error("Error loading news admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNewsSettings();
  }, [heroDesc, heroTitle, sectionHeaders]);

  async function handleFileUpload(file: File, fieldKey: string, onSuccess: (url: string) => void) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `news-page/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      onSuccess(publicUrlData.publicUrl);
    } catch (error: unknown) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Check if bucket 'iritaq-media' exists and is public.");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const payload = {
        slug: "news-page",
        hero: {
          badge: heroBadge,
          title: heroTitle,
          description: heroDesc,
          backgroundImage: heroBg,
          mobileBackgroundImage: heroMobileBg,
        },
        section_headers: sectionHeaders,
        categories: categories,
        featured_main_story: mainStory,
        featured_side_stories: sideStories,
        news_grid: newsGrid,
        press_releases: pressReleases,
        conference_highlights: conferenceHighlights,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("news_page_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage("Newsroom settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving news settings:", error);
      const msg = error instanceof Error ? error.message : String(error);
      alert("Failed to save: " + msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
        <span className="ml-3 font-medium text-sm">Loading News Admin...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Title */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                ADMIN DASHBOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">
              Manage Newsroom Page & Contents
            </h1>
          </div>
          <Settings className="w-6 h-6 text-slate-400" />
        </div>

        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10">
          
          {/* 1. HERO SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              1. Hero Header Banner
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hero Subheading Badge</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Main Headline</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description Subtitle</label>
              <textarea
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Desktop BG Image URL</label>
                <input
                  type="text"
                  value={heroBg}
                  onChange={(e) => setHeroBg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mobile BG Image URL</label>
                <input
                  type="text"
                  value={heroMobileBg}
                  onChange={(e) => setHeroMobileBg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </section>

          {/* 2. SECTION HEADINGS & CATEGORIES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              2. Section Headings & Filter Categories
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Featured Stories Badge</label>
                <input
                  type="text"
                  value={sectionHeaders.latestNewsBadge}
                  onChange={(e) => setSectionHeaders({ ...sectionHeaders, latestNewsBadge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Featured Stories Title</label>
                <input
                  type="text"
                  value={sectionHeaders.latestNewsTitle}
                  onChange={(e) => setSectionHeaders({ ...sectionHeaders, latestNewsTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Press Releases Title</label>
                <input
                  type="text"
                  value={sectionHeaders.pressTitle}
                  onChange={(e) => setSectionHeaders({ ...sectionHeaders, pressTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Conference Highlights Title</label>
                <input
                  type="text"
                  value={sectionHeaders.confTitle}
                  onChange={(e) => setSectionHeaders({ ...sectionHeaders, confTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            {/* Category Pills Management */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Filter Categories
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((cat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-full border border-slate-200">
                    {cat}
                    <button
                      type="button"
                      onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:text-rose-800 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="New category name..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryInput.trim() && !categories.includes(newCategoryInput.trim())) {
                      setCategories([...categories, newCategoryInput.trim()]);
                      setNewCategoryInput("");
                    }
                  }}
                  className="bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-900 shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </section>

          {/* 3. FEATURED MAIN STORY */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              3. Featured Main Story
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  value={mainStory.title}
                  onChange={(e) => setMainStory({ ...mainStory, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date</label>
                <input
                  type="text"
                  value={mainStory.date}
                  onChange={(e) => setMainStory({ ...mainStory, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
              <input
                type="text"
                value={mainStory.category}
                onChange={(e) => setMainStory({ ...mainStory, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Excerpt / Summary</label>
              <textarea
                rows={3}
                value={mainStory.excerpt}
                onChange={(e) => setMainStory({ ...mainStory, excerpt: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={mainStory.image}
                  onChange={(e) => setMainStory({ ...mainStory, image: e.target.value })}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingField === "main-story" ? "..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleFileUpload(e.target.files[0], "main-story", (url) =>
                        setMainStory({ ...mainStory, image: url })
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </section>

          {/* 4. FEATURED SIDE STORIES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              4. Featured Side Stories ({sideStories.length})
            </h2>
            <div className="space-y-6">
              {sideStories.map((story, idx) => (
                <div key={story.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Side Story #{idx + 1}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={story.title}
                        onChange={(e) => {
                          const updated = [...sideStories];
                          updated[idx].title = e.target.value;
                          setSideStories(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={story.category}
                        onChange={(e) => {
                          const updated = [...sideStories];
                          updated[idx].category = e.target.value;
                          setSideStories(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Excerpt</label>
                    <textarea
                      rows={2}
                      value={story.excerpt}
                      onChange={(e) => {
                        const updated = [...sideStories];
                        updated[idx].excerpt = e.target.value;
                        setSideStories(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. NEWS GRID ARTICLES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                5. News Grid Articles ({newsGrid.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setNewsGrid([
                    ...newsGrid,
                    {
                      id: String(Date.now()),
                      category: "RESEARCH",
                      date: "2024",
                      author: "Research Directorate",
                      title: "New News Article Title",
                      excerpt: "Article summary...",
                      image: "/images/news/placeholder.jpg",
                      slug: "new-news-article",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add News Item
              </button>
            </div>

            <div className="space-y-6">
              {newsGrid.map((item, idx) => (
                <div key={item.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Article #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setNewsGrid(newsGrid.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...newsGrid];
                          updated[idx].title = e.target.value;
                          setNewsGrid(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...newsGrid];
                          updated[idx].category = e.target.value;
                          setNewsGrid(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Excerpt</label>
                    <textarea
                      rows={2}
                      value={item.excerpt}
                      onChange={(e) => {
                        const updated = [...newsGrid];
                        updated[idx].excerpt = e.target.value;
                        setNewsGrid(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => {
                          const updated = [...newsGrid];
                          updated[idx].image = e.target.value;
                          setNewsGrid(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingField === `news-${idx}` ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `news-${idx}`, (url) => {
                              const updated = [...newsGrid];
                              updated[idx].image = url;
                              setNewsGrid(updated);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. PRESS RELEASES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                6. Official Press Releases ({pressReleases.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setPressReleases([
                    ...pressReleases,
                    {
                      id: String(Date.now()),
                      date: "2024",
                      title: "New Press Release Title",
                      summary: "Press release summary...",
                      pdfUrl: "#",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Press Release
              </button>
            </div>

            <div className="space-y-6">
              {pressReleases.map((pr, idx) => (
                <div key={pr.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Press Release #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setPressReleases(pressReleases.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={pr.title}
                      onChange={(e) => {
                        const updated = [...pressReleases];
                        updated[idx].title = e.target.value;
                        setPressReleases(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Summary</label>
                    <textarea
                      rows={2}
                      value={pr.summary}
                      onChange={(e) => {
                        const updated = [...pressReleases];
                        updated[idx].summary = e.target.value;
                        setPressReleases(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. CONFERENCE HIGHLIGHTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                7. Conference Highlights ({conferenceHighlights.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setConferenceHighlights([
                    ...conferenceHighlights,
                    {
                      id: String(Date.now()),
                      date: "2024",
                      title: "New Conference Highlight",
                      description: "Description...",
                      image: "/images/news/placeholder.jpg",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            </div>

            <div className="space-y-6">
              {conferenceHighlights.map((conf, idx) => (
                <div key={conf.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Highlight #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setConferenceHighlights(conferenceHighlights.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={conf.title}
                        onChange={(e) => {
                          const updated = [...conferenceHighlights];
                          updated[idx].title = e.target.value;
                          setConferenceHighlights(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date</label>
                      <input
                        type="text"
                        value={conf.date}
                        onChange={(e) => {
                          const updated = [...conferenceHighlights];
                          updated[idx].date = e.target.value;
                          setConferenceHighlights(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={conf.description}
                      onChange={(e) => {
                        const updated = [...conferenceHighlights];
                        updated[idx].description = e.target.value;
                        setConferenceHighlights(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={conf.image}
                        onChange={(e) => {
                          const updated = [...conferenceHighlights];
                          updated[idx].image = e.target.value;
                          setConferenceHighlights(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingField === `conf-${idx}` ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `conf-${idx}`, (url) => {
                              const updated = [...conferenceHighlights];
                              updated[idx].image = url;
                              setConferenceHighlights(updated);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SAVE BUTTON */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{saving ? "Saving Changes..." : "Save Newsroom Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}