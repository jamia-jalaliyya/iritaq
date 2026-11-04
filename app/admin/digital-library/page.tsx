"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import {
  digitalLibraryData,
  LibraryCategory,
  FeaturedResource,
  ResourceItem,
} from "@/lib/digitalLibraryData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Settings } from "lucide-react";


export default function DigitalLibraryAdminPage() {
  // Hero States
  const [tagline, setTagline] = useState(digitalLibraryData.hero.tagline);
  const [title, setTitle] = useState(digitalLibraryData.hero.title);
  const [description, setDescription] = useState(digitalLibraryData.hero.description);
  const [backgroundImage, setBackgroundImage] = useState(digitalLibraryData.hero.backgroundImage);
  const [mobileBackgroundImage, setMobileBackgroundImage] = useState(digitalLibraryData.hero.mobileBackgroundImage);
  const [primaryButtonText, setPrimaryButtonText] = useState(digitalLibraryData.hero.primaryButtonText);
  const [primaryButtonLink, setPrimaryButtonLink] = useState(digitalLibraryData.hero.primaryButtonLink);
  const [secondaryButtonText, setSecondaryButtonText] = useState(digitalLibraryData.hero.secondaryButtonText);
  const [secondaryButtonLink, setSecondaryButtonLink] = useState(digitalLibraryData.hero.secondaryButtonLink);

  // Stats State
  const [stats, setStats] = useState(digitalLibraryData.stats);

  // Categories Section States
  const [catTagline, setCatTagline] = useState(digitalLibraryData.categoriesSection.tagline);
  const [catTitle, setCatTitle] = useState(digitalLibraryData.categoriesSection.title);
  const [catDescription, setCatDescription] = useState(digitalLibraryData.categoriesSection.description);
  const [categories, setCategories] = useState<LibraryCategory[]>(digitalLibraryData.categoriesSection.items);

  // Featured Section States
  const [featTagline, setFeatTagline] = useState(digitalLibraryData.featuredSection.tagline);
  const [featTitle, setFeatTitle] = useState(digitalLibraryData.featuredSection.title);
  const [featuredItems, setFeaturedItems] = useState<FeaturedResource[]>(digitalLibraryData.featuredSection.items);

  // All Resources Section States
  const [resTagline, setResTagline] = useState(digitalLibraryData.allResourcesSection.tagline);
  const [resTitle, setResTitle] = useState(digitalLibraryData.allResourcesSection.title);
  const [resDescription, setResDescription] = useState(digitalLibraryData.allResourcesSection.description);
  const [resources, setResources] = useState<ResourceItem[]>(digitalLibraryData.allResourcesSection.items);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        let { data } = await supabase
          .from("digital_library_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        const { error } = await supabase
  .from("digital_library_settings")
  .select("*")
  .eq("id", 1)
  .maybeSingle();

        if (error) console.error("Error fetching digital library settings:", error);

        if (!data) {
          const initialPayload = {
            id: 1,
            hero: digitalLibraryData.hero,
            stats: digitalLibraryData.stats,
            categories_section: digitalLibraryData.categoriesSection,
            featured_section: digitalLibraryData.featuredSection,
            all_resources_section: digitalLibraryData.allResourcesSection,
          };
          await supabase.from("digital_library_settings").insert([initialPayload]);
          data = initialPayload;
        }

        if (data) {
          if (data.hero) {
            setTagline(data.hero.tagline || digitalLibraryData.hero.tagline);
            setTitle(data.hero.title || digitalLibraryData.hero.title);
            setDescription(data.hero.description || digitalLibraryData.hero.description);
            setBackgroundImage(data.hero.backgroundImage || digitalLibraryData.hero.backgroundImage);
            setMobileBackgroundImage(data.hero.mobileBackgroundImage || digitalLibraryData.hero.mobileBackgroundImage);
            setPrimaryButtonText(data.hero.primaryButtonText || digitalLibraryData.hero.primaryButtonText);
            setPrimaryButtonLink(data.hero.primaryButtonLink || digitalLibraryData.hero.primaryButtonLink);
            setSecondaryButtonText(data.hero.secondaryButtonText || digitalLibraryData.hero.secondaryButtonText);
            setSecondaryButtonLink(data.hero.secondaryButtonLink || digitalLibraryData.hero.secondaryButtonLink);
          }
          if (data.stats && Array.isArray(data.stats)) setStats(data.stats);
          if (data.categories_section) {
            setCatTagline(data.categories_section.tagline || digitalLibraryData.categoriesSection.tagline);
            setCatTitle(data.categories_section.title || digitalLibraryData.categoriesSection.title);
            setCatDescription(data.categories_section.description || digitalLibraryData.categoriesSection.description);
            if (data.categories_section.items) setCategories(data.categories_section.items);
          }
          if (data.featured_section) {
            setFeatTagline(data.featured_section.tagline || digitalLibraryData.featuredSection.tagline);
            setFeatTitle(data.featured_section.title || digitalLibraryData.featuredSection.title);
            if (data.featured_section.items) setFeaturedItems(data.featured_section.items);
          }
          if (data.all_resources_section) {
            setResTagline(data.all_resources_section.tagline || digitalLibraryData.allResourcesSection.tagline);
            setResTitle(data.all_resources_section.title || digitalLibraryData.allResourcesSection.title);
            setResDescription(data.all_resources_section.description || digitalLibraryData.allResourcesSection.description);
            if (data.all_resources_section.items) setResources(data.all_resources_section.items);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading digital library admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, resourceIndex?: number) {
    try {
      setUploadingField(fieldKey + (resourceIndex !== undefined ? `-${resourceIndex}` : ""));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `digital-library/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (fieldKey === "backgroundImage") setBackgroundImage(publicUrl);
      else if (fieldKey === "mobileBackgroundImage") setMobileBackgroundImage(publicUrl);
      else if (fieldKey === "resourceImage" && resourceIndex !== undefined) {
        const updated = [...resources];
        updated[resourceIndex].image = publicUrl;
        setResources(updated);
      }
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Ensure bucket 'iritaq-media' exists.");
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
        id: 1,
        hero: {
          breadcrumb: digitalLibraryData.hero.breadcrumb,
          tagline,
          title,
          description,
          backgroundImage,
          mobileBackgroundImage,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
        },
        stats,
        categories_section: {
          tagline: catTagline,
          title: catTitle,
          description: catDescription,
          items: categories,
        },
        featured_section: {
          tagline: featTagline,
          title: featTitle,
          items: featuredItems,
        },
        all_resources_section: {
          tagline: resTagline,
          title: resTitle,
          description: resDescription,
          items: resources,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("digital_library_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Digital Library settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving digital library settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Digital Library Management...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Manage Digital Library Page</h1>
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
          
          {/* HERO */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Hero Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Primary Button Text</label>
                <input
                  type="text"
                  value={primaryButtonText}
                  onChange={(e) => setPrimaryButtonText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Main Heading (Title)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Secondary Button Text</label>
                <input
                  type="text"
                  value={secondaryButtonText}
                  onChange={(e) => setSecondaryButtonText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Secondary Button Link</label>
                <input
                  type="text"
                  value={secondaryButtonLink}
                  onChange={(e) => setSecondaryButtonLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Desktop Background Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'backgroundImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'backgroundImage')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Mobile Background Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={mobileBackgroundImage}
                    onChange={(e) => setMobileBackgroundImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'mobileBackgroundImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'mobileBackgroundImage')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Stats Counters ({stats.length})</h2>
              <button
                type="button"
                onClick={() => setStats([...stats, { value: "10K+", label: "NEW STAT" }])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Stat #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].value = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].label = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">3. Categories Grid ({categories.length})</h2>
              <button
                type="button"
                onClick={() => setCategories([
                  ...categories,
                  {
                    id: String(Date.now()),
                    title: "New Category",
                    arabicTitle: "التصنيف",
                    description: "Category description.",
                    resourceCount: "1 Resource",
                    link: "#",
                  }
                ])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Tagline</label>
                <input
                  type="text"
                  value={catTagline}
                  onChange={(e) => setCatTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Title</label>
                <input
                  type="text"
                  value={catTitle}
                  onChange={(e) => setCatTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {categories.map((cat, idx) => (
                <div key={cat.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Category Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[idx].title = e.target.value;
                          setCategories(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Arabic Title</label>
                      <input
                        type="text"
                        value={cat.arabicTitle}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[idx].arabicTitle = e.target.value;
                          setCategories(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Resource Count Text</label>
                      <input
                        type="text"
                        value={cat.resourceCount}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[idx].resourceCount = e.target.value;
                          setCategories(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={cat.description}
                      onChange={(e) => {
                        const updated = [...categories];
                        updated[idx].description = e.target.value;
                        setCategories(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">4. Featured Highlights ({featuredItems.length})</h2>
              <button
                type="button"
                onClick={() => setFeaturedItems([
                  ...featuredItems,
                  {
                    id: String(Date.now()),
                    categoryTag: "FEATURED",
                    title: "New Featured Resource",
                    description: "Description of featured highlight.",
                    link: "#",
                  }
                ])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {featuredItems.map((feat, idx) => (
                <div key={feat.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Highlight #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setFeaturedItems(featuredItems.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category Tag</label>
                      <input
                        type="text"
                        value={feat.categoryTag}
                        onChange={(e) => {
                          const updated = [...featuredItems];
                          updated[idx].categoryTag = e.target.value;
                          setFeaturedItems(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Link URL</label>
                      <input
                        type="text"
                        value={feat.link}
                        onChange={(e) => {
                          const updated = [...featuredItems];
                          updated[idx].link = e.target.value;
                          setFeaturedItems(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...featuredItems];
                        updated[idx].title = e.target.value;
                        setFeaturedItems(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...featuredItems];
                        updated[idx].description = e.target.value;
                        setFeaturedItems(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ALL RESOURCES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">5. Resources Gallery ({resources.length})</h2>
              <button
                type="button"
                onClick={() => setResources([
                  ...resources,
                  {
                    id: String(Date.now()),
                    title: "New Resource Title",
                    description: "Description of the resource.",
                    category: "Tafsir Collections",
                    status: "Published",
                    language: "English",
                    image: "/images/library/quran-book-1.jpg",
                    isFeatured: false,
                  }
                ])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Resource
              </button>
            </div>

            <div className="space-y-6">
              {resources.map((res, idx) => (
                <div key={res.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Resource Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setResources(resources.filter((_, i) => i !== idx))}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={res.category}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[idx].category = e.target.value;
                          setResources(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
                      <select
                        value={res.status}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[idx].status = e.target.value as ResourceItem["status"];
                          setResources(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        <option value="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Language</label>
                      <select
                        value={res.language}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[idx].language = e.target.value as ResourceItem["language"];
                          setResources(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        <option value="Arabic">Arabic</option>
                        <option value="English">English</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Urdu">Urdu</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                        <input
                          type="checkbox"
                          checked={res.isFeatured || false}
                          onChange={(e) => {
                            const updated = [...resources];
                            updated[idx].isFeatured = e.target.checked;
                            setResources(updated);
                          }}
                          className="w-4 h-4 text-emerald-700 rounded border-slate-300"
                        />
                        Mark as Featured
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Resource Title</label>
                    <input
                      type="text"
                      value={res.title}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[idx].title = e.target.value;
                        setResources(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={res.description}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[idx].description = e.target.value;
                        setResources(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Thumbnail Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={res.image}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[idx].image = e.target.value;
                          setResources(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingField === `resourceImage-${idx}` ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'resourceImage', idx)}
                        />
                      </label>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? "Saving Changes..." : "Save All Digital Library Settings"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}