"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { defaultAboutData, AboutPageData } from "@/lib/aboutDefaultData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutPageData>(defaultAboutData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const { data: s } = await supabase
          .from("about_page_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (s) {
          setData({
            hero: {
              tagline: s.hero_tagline ?? defaultAboutData.hero.tagline,
              title: s.hero_title ?? defaultAboutData.hero.title,
              description: s.hero_description ?? defaultAboutData.hero.description,
              primaryBtnText: s.hero_primary_btn_text ?? defaultAboutData.hero.primaryBtnText,
              primaryBtnLink: s.hero_primary_btn_link ?? defaultAboutData.hero.primaryBtnLink,
              secondaryBtnText: s.hero_secondary_btn_text ?? defaultAboutData.hero.secondaryBtnText,
              secondaryBtnLink: s.hero_secondary_btn_link ?? defaultAboutData.hero.secondaryBtnLink,
              bgImageUrl: s.hero_bg_image_url ?? defaultAboutData.hero.bgImageUrl,
              bgImageUrlMobile: s.hero_bg_image_url_mobile ?? defaultAboutData.hero.bgImageUrlMobile,
            },
            stats: s.stats?.length ? s.stats : defaultAboutData.stats,
            executiveOverview: {
              tagline: s.eo_tagline ?? defaultAboutData.executiveOverview.tagline,
              title: s.eo_title ?? defaultAboutData.executiveOverview.title,
              paragraph1: s.eo_paragraph1 ?? defaultAboutData.executiveOverview.paragraph1,
              paragraph2: s.eo_paragraph2 ?? defaultAboutData.executiveOverview.paragraph2,
              buttonText: s.eo_button_text ?? defaultAboutData.executiveOverview.buttonText,
              buttonLink: s.eo_button_link ?? defaultAboutData.executiveOverview.buttonLink,
              imageUrl: s.eo_image_url ?? defaultAboutData.executiveOverview.imageUrl,
              imageUrlMobile: s.eo_image_url_mobile ?? defaultAboutData.executiveOverview.imageUrlMobile,
            },
            foundingVision: {
              tagline: s.fv_tagline ?? defaultAboutData.foundingVision.tagline,
              title: s.fv_title ?? defaultAboutData.foundingVision.title,
              paragraph1: s.fv_paragraph1 ?? defaultAboutData.foundingVision.paragraph1,
              paragraph2: s.fv_paragraph2 ?? defaultAboutData.foundingVision.paragraph2,
              imageUrl: s.fv_image_url ?? defaultAboutData.foundingVision.imageUrl,
              imageUrlMobile: s.fv_image_url_mobile ?? defaultAboutData.foundingVision.imageUrlMobile,
            },
            visionMission: {
              tagline: s.vm_tagline ?? defaultAboutData.visionMission.tagline,
              title: s.vm_title ?? defaultAboutData.visionMission.title,
              visionTitle: s.vision_title ?? defaultAboutData.visionMission.visionTitle,
              visionDescription: s.vision_description ?? defaultAboutData.visionMission.visionDescription,
              missionTitle: s.mission_title ?? defaultAboutData.visionMission.missionTitle,
              missionDescription: s.mission_description ?? defaultAboutData.visionMission.missionDescription,
            },
            coreValues: {
              tagline: s.cv_tagline ?? defaultAboutData.coreValues.tagline,
              title: s.cv_title ?? defaultAboutData.coreValues.title,
              subtitle: s.cv_subtitle ?? defaultAboutData.coreValues.subtitle,
              values: s.core_values?.length ? s.core_values : defaultAboutData.coreValues.values,
            },
            institutionalProfile: {
              tagline: s.ip_tagline ?? defaultAboutData.institutionalProfile.tagline,
              title: s.ip_title ?? defaultAboutData.institutionalProfile.title,
              paragraph1: s.ip_paragraph1 ?? defaultAboutData.institutionalProfile.paragraph1,
              paragraph2: s.ip_paragraph2 ?? defaultAboutData.institutionalProfile.paragraph2,
            },
            historyObjectives: {
              tagline: s.ho_tagline ?? defaultAboutData.historyObjectives.tagline,
              title: s.ho_title ?? defaultAboutData.historyObjectives.title,
              subtitle: s.ho_subtitle ?? defaultAboutData.historyObjectives.subtitle,
              imageUrl: s.ho_image_url ?? defaultAboutData.historyObjectives.imageUrl,
              imageUrlMobile: s.ho_image_url_mobile ?? defaultAboutData.historyObjectives.imageUrlMobile,
              milestones: s.milestones?.length ? s.milestones : defaultAboutData.historyObjectives.milestones,
            },
          });
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `about/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const keys = fieldKey.split(".");
      if (keys.length === 2) {
        const [parent, child] = keys;
        if (parent === "hero") {
          setData({
            ...data,
            hero: { ...data.hero, [child]: publicUrl },
          });
        } else if (parent === "executiveOverview") {
          setData({
            ...data,
            executiveOverview: { ...data.executiveOverview, [child]: publicUrl },
          });
        } else if (parent === "foundingVision") {
          setData({
            ...data,
            foundingVision: { ...data.foundingVision, [child]: publicUrl },
          });
        } else if (parent === "historyObjectives") {
          setData({
            ...data,
            historyObjectives: { ...data.historyObjectives, [child]: publicUrl },
          });
        }
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
        hero_tagline: data.hero.tagline,
        hero_title: data.hero.title,
        hero_description: data.hero.description,
        hero_primary_btn_text: data.hero.primaryBtnText,
        hero_primary_btn_link: data.hero.primaryBtnLink,
        hero_secondary_btn_text: data.hero.secondaryBtnText,
        hero_secondary_btn_link: data.hero.secondaryBtnLink,
        hero_bg_image_url: data.hero.bgImageUrl,
        hero_bg_image_url_mobile: data.hero.bgImageUrlMobile,
        stats: data.stats,
        eo_tagline: data.executiveOverview.tagline,
        eo_title: data.executiveOverview.title,
        eo_paragraph1: data.executiveOverview.paragraph1,
        eo_paragraph2: data.executiveOverview.paragraph2,
        eo_button_text: data.executiveOverview.buttonText,
        eo_button_link: data.executiveOverview.buttonLink,
        eo_image_url: data.executiveOverview.imageUrl,
        eo_image_url_mobile: data.executiveOverview.imageUrlMobile,
        fv_tagline: data.foundingVision.tagline,
        fv_title: data.foundingVision.title,
        fv_paragraph1: data.foundingVision.paragraph1,
        fv_paragraph2: data.foundingVision.paragraph2,
        fv_image_url: data.foundingVision.imageUrl,
        fv_image_url_mobile: data.foundingVision.imageUrlMobile,
        vm_tagline: data.visionMission.tagline,
        vm_title: data.visionMission.title,
        vision_title: data.visionMission.visionTitle,
        vision_description: data.visionMission.visionDescription,
        mission_title: data.visionMission.missionTitle,
        mission_description: data.visionMission.missionDescription,
        cv_tagline: data.coreValues.tagline,
        cv_title: data.coreValues.title,
        cv_subtitle: data.coreValues.subtitle,
        core_values: data.coreValues.values,
        ip_tagline: data.institutionalProfile.tagline,
        ip_title: data.institutionalProfile.title,
        ip_paragraph1: data.institutionalProfile.paragraph1,
        ip_paragraph2: data.institutionalProfile.paragraph2,
        ho_tagline: data.historyObjectives.tagline,
        ho_title: data.historyObjectives.title,
        ho_subtitle: data.historyObjectives.subtitle,
        ho_image_url: data.historyObjectives.imageUrl,
        ho_image_url_mobile: data.historyObjectives.imageUrlMobile,
        milestones: data.historyObjectives.milestones,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("about_page_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("About page settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving about settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading About Page Settings...</span>
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
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">About Page Manager</h1>
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Primary Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.hero.primaryBtnText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryBtnText: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    value={data.hero.primaryBtnLink}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryBtnLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Secondary Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.hero.secondaryBtnText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryBtnText: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    value={data.hero.secondaryBtnLink}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryBtnLink: e.target.value } })}
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
                    value={data.hero.bgImageUrl}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, bgImageUrl: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.bgImageUrl' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.bgImageUrl')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background (Mobile)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.hero.bgImageUrlMobile || ''}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, bgImageUrlMobile: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.bgImageUrlMobile' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.bgImageUrlMobile')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. STATS BAR */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Stats Bar</h2>
              <button
                type="button"
                onClick={() => setData({ ...data, stats: [...data.stats, { value: "100+", label: "NEW STAT" }] })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="Value (e.g. 25+)"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[idx].value = e.target.value;
                      setData({ ...data, stats: updated });
                    }}
                    className="w-1/3 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. YEARS)"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[idx].label = e.target.value;
                      setData({ ...data, stats: updated });
                    }}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = data.stats.filter((_, i) => i !== idx);
                      setData({ ...data, stats: updated });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. EXECUTIVE OVERVIEW */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Executive Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.executiveOverview.tagline}
                  onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.executiveOverview.title}
                  onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 1</label>
              <textarea
                rows={3}
                value={data.executiveOverview.paragraph1}
                onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, paragraph1: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 2</label>
              <textarea
                rows={3}
                value={data.executiveOverview.paragraph2}
                onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, paragraph2: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.executiveOverview.buttonText}
                    onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, buttonText: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    value={data.executiveOverview.buttonLink}
                    onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, buttonLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Image URL (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.executiveOverview.imageUrl}
                    onChange={(e) => setData({ ...data, executiveOverview: { ...data.executiveOverview, imageUrl: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'executiveOverview.imageUrl')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 4. FOUNDING VISION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">4. Founding Vision</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.foundingVision.tagline}
                  onChange={(e) => setData({ ...data, foundingVision: { ...data.foundingVision, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.foundingVision.title}
                  onChange={(e) => setData({ ...data, foundingVision: { ...data.foundingVision, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 1</label>
              <textarea
                rows={3}
                value={data.foundingVision.paragraph1}
                onChange={(e) => setData({ ...data, foundingVision: { ...data.foundingVision, paragraph1: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 2</label>
              <textarea
                rows={3}
                value={data.foundingVision.paragraph2}
                onChange={(e) => setData({ ...data, foundingVision: { ...data.foundingVision, paragraph2: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Image URL (Desktop)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={data.foundingVision.imageUrl}
                  onChange={(e) => setData({ ...data, foundingVision: { ...data.foundingVision, imageUrl: e.target.value } })}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'foundingVision.imageUrl')}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* 5. VISION & MISSION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">5. Vision & Mission</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.visionMission.tagline}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.visionMission.title}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-800">Vision Box</h3>
                <input
                  type="text"
                  value={data.visionMission.visionTitle}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, visionTitle: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
                <textarea
                  rows={3}
                  value={data.visionMission.visionDescription}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, visionDescription: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-800">Mission Box</h3>
                <input
                  type="text"
                  value={data.visionMission.missionTitle}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, missionTitle: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
                <textarea
                  rows={3}
                  value={data.visionMission.missionDescription}
                  onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, missionDescription: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
          </section>

          {/* 6. CORE VALUES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">6. Core Values</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  coreValues: {
                    ...data.coreValues,
                    values: [...data.coreValues.values, { id: String(Date.now()), number: "04", title: "New Value", description: "Description here" }]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Value
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.coreValues.tagline}
                  onChange={(e) => setData({ ...data, coreValues: { ...data.coreValues, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.coreValues.title}
                  onChange={(e) => setData({ ...data, coreValues: { ...data.coreValues, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {data.coreValues.values.map((val, idx) => (
                <div key={val.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Value #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.coreValues.values.filter((_, i) => i !== idx);
                        setData({ ...data, coreValues: { ...data.coreValues, values: updated } });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Number (e.g. 01)"
                      value={val.number}
                      onChange={(e) => {
                        const updated = [...data.coreValues.values];
                        updated[idx].number = e.target.value;
                        setData({ ...data, coreValues: { ...data.coreValues, values: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={val.title}
                      onChange={(e) => {
                        const updated = [...data.coreValues.values];
                        updated[idx].title = e.target.value;
                        setData({ ...data, coreValues: { ...data.coreValues, values: updated } });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={val.description}
                    onChange={(e) => {
                      const updated = [...data.coreValues.values];
                      updated[idx].description = e.target.value;
                      setData({ ...data, coreValues: { ...data.coreValues, values: updated } });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 7. INSTITUTIONAL PROFILE */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">7. Institutional Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.institutionalProfile.tagline}
                  onChange={(e) => setData({ ...data, institutionalProfile: { ...data.institutionalProfile, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.institutionalProfile.title}
                  onChange={(e) => setData({ ...data, institutionalProfile: { ...data.institutionalProfile, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 1</label>
              <textarea
                rows={3}
                value={data.institutionalProfile.paragraph1}
                onChange={(e) => setData({ ...data, institutionalProfile: { ...data.institutionalProfile, paragraph1: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 2</label>
              <textarea
                rows={3}
                value={data.institutionalProfile.paragraph2}
                onChange={(e) => setData({ ...data, institutionalProfile: { ...data.institutionalProfile, paragraph2: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 8. HISTORY & OBJECTIVES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">8. History & Objectives (Milestones)</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  historyObjectives: {
                    ...data.historyObjectives,
                    milestones: [...data.historyObjectives.milestones, { id: String(Date.now()), tagline: "2026", title: "New Milestone", description: "Milestone description." }]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Milestone
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.historyObjectives.tagline}
                  onChange={(e) => setData({ ...data, historyObjectives: { ...data.historyObjectives, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.historyObjectives.title}
                  onChange={(e) => setData({ ...data, historyObjectives: { ...data.historyObjectives, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">History Image URL (Desktop)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={data.historyObjectives.imageUrl}
                  onChange={(e) => setData({ ...data, historyObjectives: { ...data.historyObjectives, imageUrl: e.target.value } })}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'historyObjectives.imageUrl')}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-sm font-bold text-slate-800">Milestones Timeline</h3>
              {data.historyObjectives.milestones.map((m, idx) => (
                <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Milestone #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.historyObjectives.milestones.filter((_, i) => i !== idx);
                        setData({ ...data, historyObjectives: { ...data.historyObjectives, milestones: updated } });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Year/Tagline (e.g. 2024)"
                      value={m.tagline}
                      onChange={(e) => {
                        const updated = [...data.historyObjectives.milestones];
                        updated[idx].tagline = e.target.value;
                        setData({ ...data, historyObjectives: { ...data.historyObjectives, milestones: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...data.historyObjectives.milestones];
                        updated[idx].title = e.target.value;
                        setData({ ...data, historyObjectives: { ...data.historyObjectives, milestones: updated } });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={m.description}
                    onChange={(e) => {
                      const updated = [...data.historyObjectives.milestones];
                      updated[idx].description = e.target.value;
                      setData({ ...data, historyObjectives: { ...data.historyObjectives, milestones: updated } });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              ))}
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
              <span>{saving ? "Saving Changes to Supabase..." : "Save All About Settings"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}