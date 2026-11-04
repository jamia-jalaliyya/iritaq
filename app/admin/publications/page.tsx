"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { publicationsData, Publication } from "@/lib/publicationsData";
import {
  Loader2,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Settings,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PublicationsAdminPage() {
  // Hero State
  const [heroTag, setHeroTag] = useState(publicationsData.hero.tag);
  const [heroTitle, setHeroTitle] = useState(publicationsData.hero.title);
  const [heroDesc, setHeroDesc] = useState(publicationsData.hero.description);
  const [heroBg, setHeroBg] = useState(publicationsData.hero.backgroundImage);
  const [heroMobileBg, setHeroMobileBg] = useState(
    publicationsData.hero.mobileBackgroundImage || ""
  );
  const [heroBtnText, setHeroBtnText] = useState(publicationsData.hero.buttonText);
  const [heroBtnLink, setHeroBtnLink] = useState(publicationsData.hero.buttonLink);

  // Featured Section State
  const [featTag, setFeatTag] = useState(publicationsData.featuredSection.tag);
  const [featTitle, setFeatTitle] = useState(publicationsData.featuredSection.title);
  const [featDesc, setFeatDesc] = useState(publicationsData.featuredSection.description);

  // Browse Section State
  const [browseTag, setBrowseTag] = useState(publicationsData.browseSection.tag);
  const [browseTitle, setBrowseTitle] = useState(publicationsData.browseSection.title);
  const [browseDesc, setBrowseDesc] = useState(publicationsData.browseSection.description);
  const [categories, setCategories] = useState<string[]>(
    publicationsData.browseSection.categories
  );
  const [newCatInput, setNewCatInput] = useState("");

  // Publications List State
  const [publications, setPublications] = useState<Publication[]>(
    publicationsData.publications
  );

  // CTA Section State
  const [ctaTitle, setCtaTitle] = useState(publicationsData.cta.title);
  const [ctaDesc, setCtaDesc] = useState(publicationsData.cta.description);
  const [ctaBtnText, setCtaBtnText] = useState(publicationsData.cta.buttonText);
  const [ctaBtnLink, setCtaBtnLink] = useState(publicationsData.cta.buttonLink);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPublicationsSettings() {
      try {
        const { data, error } = await supabase
          .from("publications_page_settings")
          .select("*")
          .eq("slug", "publications-page")
          .maybeSingle();

        let pageData = data;

        if (!pageData) {
          const initialPayload = {
            slug: "publications-page",
            hero: publicationsData.hero,
            featured_section: publicationsData.featuredSection,
            browse_section: publicationsData.browseSection,
            publications: publicationsData.publications,
            cta: publicationsData.cta,
          };

          await supabase
            .from("publications_page_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          pageData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching publications settings:", error.message);
        }

        if (pageData) {
          if (pageData.hero) {
            setHeroTag(pageData.hero.tag || publicationsData.hero.tag);
            setHeroTitle(pageData.hero.title || publicationsData.hero.title);
            setHeroDesc(pageData.hero.description || publicationsData.hero.description);
            setHeroBg(pageData.hero.backgroundImage || publicationsData.hero.backgroundImage);
            setHeroMobileBg(pageData.hero.mobileBackgroundImage || "");
            setHeroBtnText(pageData.hero.buttonText || publicationsData.hero.buttonText);
            setHeroBtnLink(pageData.hero.buttonLink || publicationsData.hero.buttonLink);
          }
          if (pageData.featured_section) {
            setFeatTag(pageData.featured_section.tag || publicationsData.featuredSection.tag);
            setFeatTitle(pageData.featured_section.title || publicationsData.featuredSection.title);
            setFeatDesc(pageData.featured_section.description || publicationsData.featuredSection.description);
          }
          if (pageData.browse_section) {
            setBrowseTag(pageData.browse_section.tag || publicationsData.browseSection.tag);
            setBrowseTitle(pageData.browse_section.title || publicationsData.browseSection.title);
            setBrowseDesc(pageData.browse_section.description || publicationsData.browseSection.description);
            if (Array.isArray(pageData.browse_section.categories)) {
              setCategories(pageData.browse_section.categories);
            }
          }
          if (Array.isArray(pageData.publications)) {
            setPublications(pageData.publications);
          }
          if (pageData.cta) {
            setCtaTitle(pageData.cta.title || publicationsData.cta.title);
            setCtaDesc(pageData.cta.description || publicationsData.cta.description);
            setCtaBtnText(pageData.cta.buttonText || publicationsData.cta.buttonText);
            setCtaBtnLink(pageData.cta.buttonLink || publicationsData.cta.buttonLink);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading publications admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicationsSettings();
  }, []); // Run only once on mount

  async function handleFileUpload(
    file: File,
    fieldKey: string,
    onSuccess: (url: string) => void
  ) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;
      const filePath = `publications-page/${fileName}`;

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
        slug: "publications-page",
        hero: {
          ...publicationsData.hero,
          tag: heroTag,
          title: heroTitle,
          description: heroDesc,
          backgroundImage: heroBg,
          mobileBackgroundImage: heroMobileBg,
          buttonText: heroBtnText,
          buttonLink: heroBtnLink,
        },
        featured_section: {
          tag: featTag,
          title: featTitle,
          description: featDesc,
        },
        browse_section: {
          ...publicationsData.browseSection,
          tag: browseTag,
          title: browseTitle,
          description: browseDesc,
          categories: categories,
        },
        publications: publications,
        cta: {
          title: ctaTitle,
          description: ctaDesc,
          buttonText: ctaBtnText,
          buttonLink: ctaBtnLink,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("publications_page_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage("Publications settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving publications settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Publications Admin...</span>
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
              Manage Publications & Digital Library
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
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hero Tag</label>
                <input
                  type="text"
                  value={heroTag}
                  onChange={(e) => setHeroTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Button Text</label>
                <input
                  type="text"
                  value={heroBtnText}
                  onChange={(e) => setHeroBtnText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Main Title</label>
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
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={heroBg}
                    onChange={(e) => setHeroBg(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === "hero-bg" ? "..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "hero-bg", (url) => setHeroBg(url))
                      }
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mobile BG Image URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={heroMobileBg}
                    onChange={(e) => setHeroMobileBg(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === "hero-mobile" ? "..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], "hero-mobile", (url) => setHeroMobileBg(url))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. FEATURED SECTION HEADINGS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              2. Featured Section Headings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Section Tag</label>
                <input
                  type="text"
                  value={featTag}
                  onChange={(e) => setFeatTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Section Title</label>
                <input
                  type="text"
                  value={featTitle}
                  onChange={(e) => setFeatTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Section Description</label>
              <textarea
                rows={2}
                value={featDesc}
                onChange={(e) => setFeatDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </section>

          {/* 3. BROWSE / CATALOG SECTION HEADINGS & CATEGORIES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              3. Catalogue & Filter Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Browse Tag</label>
                <input
                  type="text"
                  value={browseTag}
                  onChange={(e) => setBrowseTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Browse Title</label>
                <input
                  type="text"
                  value={browseTitle}
                  onChange={(e) => setBrowseTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Browse Description</label>
              <textarea
                rows={2}
                value={browseDesc}
                onChange={(e) => setBrowseDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            {/* Filter Categories Management */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Filter Category Tabs
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
                  placeholder="New category tab..."
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCatInput.trim() && !categories.includes(newCatInput.trim())) {
                      setCategories([...categories, newCatInput.trim()]);
                      setNewCatInput("");
                    }
                  }}
                  className="bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-900 shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </section>

          {/* 4. PUBLICATIONS LIST CATALOGUE */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                4. Publications Library ({publications.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setPublications([
                    ...publications,
                    {
                      id: String(Date.now()),
                      title: "New Publication Title",
                      author: "Author Name",
                      year: "2026",
                      pages: "300 pp.",
                      language: "Arabic / English",
                      type: "Books",
                      badgeLabel: "NEW BOOK",
                      description: "Publication summary...",
                      coverImage: "/images/publications/placeholder.jpg",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Publication
              </button>
            </div>

            <div className="space-y-6">
              {publications.map((pub, idx) => (
                <div key={pub.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Publication #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setPublications(publications.filter((_, i) => i !== idx))}
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
                        value={pub.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], title: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Author</label>
                      <input
                        type="text"
                        value={pub.author}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], author: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Year</label>
                      <input
                        type="text"
                        value={pub.year}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], year: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Pages</label>
                      <input
                        type="text"
                        value={pub.pages}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], pages: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Type / Category</label>
                      <input
                        type="text"
                        value={pub.type}
                        onChange={(e) => {
                          const val = e.target.value as Publication["type"];
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], type: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Badge Label</label>
                      <input
                        type="text"
                        value={pub.badgeLabel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], badgeLabel: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={pub.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPublications((prev) => {
                          const updated = [...prev];
                          updated[idx] = { ...updated[idx], description: val };
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Cover Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={pub.coverImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPublications((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], coverImage: val };
                            return updated;
                          });
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingField === `pub-${idx}` ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `pub-${idx}`, (url) => {
                              setPublications((prev) => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], coverImage: url };
                                return updated;
                              });
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

          {/* 5. CALL TO ACTION (CTA) SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              5. Bottom Call-to-Action Banner
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">CTA Title</label>
                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Button Text</label>
                <input
                  type="text"
                  value={ctaBtnText}
                  onChange={(e) => setCtaBtnText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">CTA Description</label>
              <textarea
                rows={2}
                value={ctaDesc}
                onChange={(e) => setCtaDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
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
              <span>{saving ? "Saving Changes..." : "Save Publications Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}