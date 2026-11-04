"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  researchData, 
  NavigationCard, 
  StatItem, 
  ResearchDomain, 
  OngoingProject 
} from "@/lib/researchData";
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

export default function ResearchAdminPage() {
  // Hero State
  const [heroBadge, setHeroBadge] = useState(researchData.hero.badge);
  const [heroTitle, setHeroTitle] = useState(researchData.hero.title);
  const [heroDesc, setHeroDesc] = useState(researchData.hero.description);
  const [heroBg, setHeroBg] = useState(researchData.hero.backgroundImage);
  const [heroMobileBg, setHeroMobileBg] = useState(
    researchData.hero.mobileBackgroundImage || ""
  );

  // Sections State
  const [navCards, setNavCards] = useState<NavigationCard[]>(researchData.navigationCards);
  const [stats, setStats] = useState<StatItem[]>(researchData.stats);
  const [domains, setDomains] = useState<ResearchDomain[]>(researchData.domains);
  const [ongoingProjects, setOngoingProjects] = useState<OngoingProject[]>(researchData.ongoingProjects);

  // CTA Section State
  const [ctaTitle, setCtaTitle] = useState(researchData.cta.title);
  const [ctaDesc, setCtaDesc] = useState(researchData.cta.description);
  const [ctaPrimaryText, setCtaPrimaryText] = useState(researchData.cta.primaryButtonText);
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState(researchData.cta.primaryButtonLink);
  const [ctaSecondaryText, setCtaSecondaryText] = useState(researchData.cta.secondaryButtonText);
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState(researchData.cta.secondaryButtonLink);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResearchSettings() {
      try {
        const { data, error } = await supabase
          .from("research_page_settings")
          .select("*")
          .eq("slug", "research-page")
          .maybeSingle();

        let pageData = data;

        if (!pageData) {
          const initialPayload = {
            slug: "research-page",
            hero: researchData.hero,
            navigationCards: researchData.navigationCards,
            stats: researchData.stats,
            domains: researchData.domains,
            ongoingProjects: researchData.ongoingProjects,
            cta: researchData.cta,
          };

          await supabase
            .from("research_page_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          pageData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching research settings:", error.message);
        }

        if (pageData) {
          if (pageData.hero) {
            setHeroBadge(pageData.hero.badge || researchData.hero.badge);
            setHeroTitle(pageData.hero.title || researchData.hero.title);
            setHeroDesc(pageData.hero.description || researchData.hero.description);
            setHeroBg(pageData.hero.backgroundImage || researchData.hero.backgroundImage);
            setHeroMobileBg(pageData.hero.mobileBackgroundImage || "");
          }
          if (Array.isArray(pageData.navigationCards)) {
            setNavCards(pageData.navigationCards);
          }
          if (Array.isArray(pageData.stats)) {
            setStats(pageData.stats);
          }
          if (Array.isArray(pageData.domains)) {
            setDomains(pageData.domains);
          }
          if (Array.isArray(pageData.ongoingProjects)) {
            setOngoingProjects(pageData.ongoingProjects);
          }
          if (pageData.cta) {
            setCtaTitle(pageData.cta.title || researchData.cta.title);
            setCtaDesc(pageData.cta.description || researchData.cta.description);
            setCtaPrimaryText(pageData.cta.primaryButtonText || researchData.cta.primaryButtonText);
            setCtaPrimaryLink(pageData.cta.primaryButtonLink || researchData.cta.primaryButtonLink);
            setCtaSecondaryText(pageData.cta.secondaryButtonText || researchData.cta.secondaryButtonText);
            setCtaSecondaryLink(pageData.cta.secondaryButtonLink || researchData.cta.secondaryButtonLink);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading research admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResearchSettings();
  }, []);

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
      const filePath = `research-page/${fileName}`;

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
        slug: "research-page",
        hero: {
          ...researchData.hero,
          badge: heroBadge,
          title: heroTitle,
          description: heroDesc,
          backgroundImage: heroBg,
          mobileBackgroundImage: heroMobileBg,
        },
        navigation_cards: navCards, // Updated to snake_case
        stats: stats,
        domains: domains,
        ongoing_projects: ongoingProjects, // Updated to snake_case
        cta: {
          title: ctaTitle,
          description: ctaDesc,
          primaryButtonText: ctaPrimaryText,
          primaryButtonLink: ctaPrimaryLink,
          secondaryButtonText: ctaSecondaryText,
          secondaryButtonLink: ctaSecondaryLink,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("research_page_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) {
        throw new Error(error.message || JSON.stringify(error));
      }

      setSuccessMessage("Research settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving research settings:", error);
      const msg = error instanceof Error ? error.message : JSON.stringify(error);
      alert("Failed to save: " + msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
        <span className="ml-3 font-medium text-sm">Loading Research Admin...</span>
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
              Manage Research Page & Initiatives
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
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hero Badge</label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
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

          {/* 2. EXPLORE RESEARCH AREAS (NAVIGATION CARDS) */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                2. Navigation Cards Grid ({navCards.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setNavCards([
                    ...navCards,
                    {
                      id: String(Date.now()),
                      title: "New Research Area",
                      description: "Short description...",
                      icon: "BookOpen",
                      link: "/research/new",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
            </div>

            <div className="space-y-6">
              {navCards.map((card, idx) => (
                <div key={card.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setNavCards(navCards.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNavCards((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], title: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={card.icon}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNavCards((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], icon: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={card.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNavCards((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], description: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Link URL</label>
                      <input
                        type="text"
                        value={card.link}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNavCards((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], link: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. KEY METRICS & STATS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                3. Key Metrics & Stats ({stats.length})
              </h2>
              <button
                type="button"
                onClick={() => setStats([...stats, { value: "100+", label: "NEW STAT" }])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Stat #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Value (e.g. 50+)</label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStats((prev) => {
                          const updated = [...prev];
                          updated[idx] = { ...updated[idx], value: val };
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStats((prev) => {
                          const updated = [...prev];
                          updated[idx] = { ...updated[idx], label: val };
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. RESEARCH DOMAINS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                4. Research Domains ({domains.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setDomains([
                    ...domains,
                    {
                      id: Date.now(),
                      title: "New Research Domain",
                      icon: "BookOpen",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Domain
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {domains.map((dom, idx) => (
                <div key={dom.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Domain #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDomains(domains.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={dom.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDomains((prev) => {
                          const updated = [...prev];
                          updated[idx] = { ...updated[idx], title: val };
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Icon Name</label>
                    <input
                      type="text"
                      value={dom.icon}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDomains((prev) => {
                          const updated = [...prev];
                          updated[idx] = { ...updated[idx], icon: val };
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. ONGOING RESEARCH PROJECTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                5. Ongoing Research Projects ({ongoingProjects.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setOngoingProjects([
                    ...ongoingProjects,
                    {
                      id: String(Date.now()),
                      title: "New Project Title",
                      author: "Lead Researcher",
                      category: "Tafsir",
                      status: "Ongoing",
                      dateRange: "2026",
                      imageUrl: "/images/research/placeholder.jpg",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="space-y-6">
              {ongoingProjects.map((proj, idx) => (
                <div key={proj.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Project #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setOngoingProjects(ongoingProjects.filter((_, i) => i !== idx))}
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
                        value={proj.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], title: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Author / Lead</label>
                      <input
                        type="text"
                        value={proj.author}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], author: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], category: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
                      <input
                        type="text"
                        value={proj.status}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], status: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date Range</label>
                      <input
                        type="text"
                        value={proj.dateRange}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], dateRange: val };
                            return updated;
                          });
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={proj.imageUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOngoingProjects((prev) => {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], imageUrl: val };
                            return updated;
                          });
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingField === `proj-${idx}` ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `proj-${idx}`, (url) => {
                              setOngoingProjects((prev) => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], imageUrl: url };
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

          {/* 6. CALL TO ACTION (CTA) SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">
              6. Bottom Call-to-Action Banner
            </h2>
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
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">CTA Description</label>
              <textarea
                rows={2}
                value={ctaDesc}
                onChange={(e) => setCtaDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Primary Button Text</label>
                <input
                  type="text"
                  value={ctaPrimaryText}
                  onChange={(e) => setCtaPrimaryText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Primary Button Link</label>
                <input
                  type="text"
                  value={ctaPrimaryLink}
                  onChange={(e) => setCtaPrimaryLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  value={ctaSecondaryText}
                  onChange={(e) => setCtaSecondaryText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Secondary Button Link</label>
                <input
                  type="text"
                  value={ctaSecondaryLink}
                  onChange={(e) => setCtaSecondaryLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
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
              <span>{saving ? "Saving Changes..." : "Save Research Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}