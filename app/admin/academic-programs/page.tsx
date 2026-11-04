"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { academicProgramsData, AcademicProgramsData } from "@/lib/academicProgramsData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AcademicProgramsAdminPage() {
  const [data, setData] = useState<AcademicProgramsData>(academicProgramsData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAcademicProgramsData() {
      try {
        const { data: s } = await supabase
          .from("academic_programs_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (s) {
          setData({
            hero: {
              breadcrumb: s.hero_breadcrumb?.length ? s.hero_breadcrumb : academicProgramsData.hero.breadcrumb,
              tagline: s.hero_tagline ?? academicProgramsData.hero.tagline,
              title: s.hero_title ?? academicProgramsData.hero.title,
              description: s.hero_description ?? academicProgramsData.hero.description,
              buttonText: s.hero_button_text ?? academicProgramsData.hero.buttonText,
              buttonLink: s.hero_button_link ?? academicProgramsData.hero.buttonLink,
              backgroundImage: s.hero_background_image ?? academicProgramsData.hero.backgroundImage,
              backgroundImageMobile: s.hero_background_image_mobile ?? academicProgramsData.hero.backgroundImageMobile,
            },
            offeringsSection: {
              tagline: s.offerings_tagline ?? academicProgramsData.offeringsSection.tagline,
              title: s.offerings_title ?? academicProgramsData.offeringsSection.title,
              description: s.offerings_description ?? academicProgramsData.offeringsSection.description,
              categories: s.categories?.length ? s.categories : academicProgramsData.offeringsSection.categories,
            },
            admissionsBanner: {
              tagline: s.banner_tagline ?? academicProgramsData.admissionsBanner.tagline,
              title: s.banner_title ?? academicProgramsData.admissionsBanner.title,
              buttonText: s.banner_button_text ?? academicProgramsData.admissionsBanner.buttonText,
              buttonLink: s.banner_button_link ?? academicProgramsData.admissionsBanner.buttonLink,
            },
          });
        }
      } catch (err) {
        console.error("Error fetching academic programs data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAcademicProgramsData();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, categoryIndex?: number) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `academics/programs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (categoryIndex !== undefined) {
        const updatedCategories = data.offeringsSection.categories.map((item, i) =>
          i === categoryIndex ? { ...item, [fieldKey]: publicUrl } : item
        );
        setData({
          ...data,
          offeringsSection: {
            ...data.offeringsSection,
            categories: updatedCategories,
          },
        });
      } else if (fieldKey === "hero.backgroundImage") {
        setData({
          ...data,
          hero: { ...data.hero, backgroundImage: publicUrl },
        });
      } else if (fieldKey === "hero.backgroundImageMobile") {
        setData({
          ...data,
          hero: { ...data.hero, backgroundImageMobile: publicUrl },
        });
      }
    } catch (error) {
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
        hero_breadcrumb: data.hero.breadcrumb,
        hero_tagline: data.hero.tagline,
        hero_title: data.hero.title,
        hero_description: data.hero.description,
        hero_button_text: data.hero.buttonText,
        hero_button_link: data.hero.buttonLink,
        hero_background_image: data.hero.backgroundImage,
        hero_background_image_mobile: data.hero.backgroundImageMobile,
        offerings_tagline: data.offeringsSection.tagline,
        offerings_title: data.offeringsSection.title,
        offerings_description: data.offeringsSection.description,
        categories: data.offeringsSection.categories,
        banner_tagline: data.admissionsBanner.tagline,
        banner_title: data.admissionsBanner.title,
        banner_button_text: data.admissionsBanner.buttonText,
        banner_button_link: data.admissionsBanner.buttonLink,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("academic_programs_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Academic Programs page settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving academic programs settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading Academic Programs Settings...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-[#04402a]" />
              <span className="text-xs font-bold tracking-widest text-[#04402a] uppercase">ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Academic Programs Manager</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#04402a] hover:bg-[#032b1c] text-white text-xs font-bold px-6 py-3 rounded-full transition shadow-md disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
          </button>
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
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Hero Section</h2>
            
            {/* Breadcrumb Manager */}
            <div className="space-y-3 pb-2 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Breadcrumbs</label>
                <button
                  type="button"
                  onClick={() => setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      breadcrumb: [...data.hero.breadcrumb, { label: "New Crumb", href: "#" }]
                    }
                  })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#04402a] bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Breadcrumb
                </button>
              </div>
              {data.hero.breadcrumb.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Label"
                    value={crumb.label}
                    onChange={(e) => {
                      const updated = [...data.hero.breadcrumb];
                      updated[idx].label = e.target.value;
                      setData({ ...data, hero: { ...data.hero, breadcrumb: updated } });
                    }}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Href"
                    value={crumb.href}
                    onChange={(e) => {
                      const updated = [...data.hero.breadcrumb];
                      updated[idx].href = e.target.value;
                      setData({ ...data, hero: { ...data.hero, breadcrumb: updated } });
                    }}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = data.hero.breadcrumb.filter((_, i) => i !== idx);
                      setData({ ...data, hero: { ...data.hero, breadcrumb: updated } });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.hero.tagline}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={data.hero.description}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.hero.buttonText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, buttonText: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    value={data.hero.buttonLink}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, buttonLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.hero.backgroundImage}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, backgroundImage: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.backgroundImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.backgroundImage')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background (Mobile)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.hero.backgroundImageMobile || ''}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, backgroundImageMobile: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.backgroundImageMobile' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.backgroundImageMobile')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. OFFERINGS / PROGRAMME CATEGORIES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Programme Offerings & Categories</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  offeringsSection: {
                    ...data.offeringsSection,
                    categories: [
                      ...data.offeringsSection.categories,
                      {
                        id: String(Date.now()),
                        title: "New Programme Category",
                        description: "Description of the category.",
                        image: "/hero.png",
                        badgeCount: "4 Programmes",
                        categoryTag: "ACADEMIC",
                        link: "#"
                      }
                    ]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.offeringsSection.tagline}
                  onChange={(e) => setData({ ...data, offeringsSection: { ...data.offeringsSection, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.offeringsSection.title}
                  onChange={(e) => setData({ ...data, offeringsSection: { ...data.offeringsSection, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
                <input
                  type="text"
                  value={data.offeringsSection.description}
                  onChange={(e) => setData({ ...data, offeringsSection: { ...data.offeringsSection, description: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            {/* Category Cards Manager */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <h3 className="font-serif text-sm font-bold text-slate-800">Programme Cards</h3>
              {data.offeringsSection.categories.map((cat, idx) => (
                <div key={cat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Category #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.offeringsSection.categories.filter((_, i) => i !== idx);
                        setData({
                          ...data,
                          offeringsSection: { ...data.offeringsSection, categories: updated }
                        });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...data.offeringsSection.categories];
                        updated[idx].title = e.target.value;
                        setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Link (e.g. /academics/programs/diploma)"
                      value={cat.link}
                      onChange={(e) => {
                        const updated = [...data.offeringsSection.categories];
                        updated[idx].link = e.target.value;
                        setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Badge Count (e.g. 4 Programmes)"
                      value={cat.badgeCount}
                      onChange={(e) => {
                        const updated = [...data.offeringsSection.categories];
                        updated[idx].badgeCount = e.target.value;
                        setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Category Tag (e.g. ACADEMIC)"
                      value={cat.categoryTag}
                      onChange={(e) => {
                        const updated = [...data.offeringsSection.categories];
                        updated[idx].categoryTag = e.target.value;
                        setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={cat.description}
                    onChange={(e) => {
                      const updated = [...data.offeringsSection.categories];
                      updated[idx].description = e.target.value;
                      setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={cat.image}
                      onChange={(e) => {
                        const updated = [...data.offeringsSection.categories];
                        updated[idx].image = e.target.value;
                        setData({ ...data, offeringsSection: { ...data.offeringsSection, categories: updated } });
                      }}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'image', idx)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. ADMISSIONS BANNER */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Admissions Rolling Banner</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.admissionsBanner.tagline}
                  onChange={(e) => setData({ ...data, admissionsBanner: { ...data.admissionsBanner, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.admissionsBanner.title}
                  onChange={(e) => setData({ ...data, admissionsBanner: { ...data.admissionsBanner, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.admissionsBanner.buttonText}
                    onChange={(e) => setData({ ...data, admissionsBanner: { ...data.admissionsBanner, buttonText: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    value={data.admissionsBanner.buttonLink}
                    onChange={(e) => setData({ ...data, admissionsBanner: { ...data.admissionsBanner, buttonLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Save Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#04402a] hover:bg-[#032b1c] text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? "Saving Changes to Supabase..." : "Save All Academic Programs Settings"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}