"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import { admissionsData, AdmissionsData } from "@/lib/admissionsData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";


export default function AdmissionsAdminPage() {
  const [data, setData] = useState<AdmissionsData>(admissionsData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdmissionsData() {
      try {
        const { data: s } = await supabase
          .from("admissions_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (s) {
          setData({
            hero: {
              breadcrumb: s.hero_breadcrumb?.length ? s.hero_breadcrumb : admissionsData.hero.breadcrumb,
              tagline: s.hero_tagline ?? admissionsData.hero.tagline,
              headline: s.hero_headline ?? admissionsData.hero.headline,
              subheading: s.hero_subheading ?? admissionsData.hero.subheading,
              bgImage: s.hero_bg_image ?? admissionsData.hero.bgImage,
              bgImageMobile: s.hero_bg_image_mobile ?? admissionsData.hero.bgImageMobile,
            },
            programs: s.programs?.length ? s.programs : admissionsData.programs,
            featuredProgram: s.featured_program ?? admissionsData.featuredProgram,
            requirements: s.requirements?.length ? s.requirements : admissionsData.requirements,
            steps: s.steps?.length ? s.steps : admissionsData.steps,
            deadlines: s.deadlines?.length ? s.deadlines : admissionsData.deadlines,
            faqs: s.faqs?.length ? s.faqs : admissionsData.faqs,
          });
        }
      } catch (err) {
        console.error("Error fetching admissions data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmissionsData();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, programIndex?: number) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `academics/admissions/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (programIndex !== undefined) {
        const updatedPrograms = data.programs.map((item, i) =>
          i === programIndex ? { ...item, [fieldKey]: publicUrl } : item
        );
        setData({ ...data, programs: updatedPrograms });
      } else if (fieldKey === "hero.bgImage") {
        setData({ ...data, hero: { ...data.hero, bgImage: publicUrl } });
      } else if (fieldKey === "hero.bgImageMobile") {
        setData({ ...data, hero: { ...data.hero, bgImageMobile: publicUrl } });
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
        hero_headline: data.hero.headline,
        hero_subheading: data.hero.subheading,
        hero_bg_image: data.hero.bgImage,
        hero_bg_image_mobile: data.hero.bgImageMobile,
        programs: data.programs,
        featured_program: data.featuredProgram,
        requirements: data.requirements,
        steps: data.steps,
        deadlines: data.deadlines,
        faqs: data.faqs,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("admissions_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Admissions settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving admissions settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading Admissions Settings...</span>
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
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Admissions Page Manager</h1>
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
                    hero: { ...data.hero, breadcrumb: [...data.hero.breadcrumb, "New Crumb"] }
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
                    value={crumb}
                    onChange={(e) => {
                      const updated = [...data.hero.breadcrumb];
                      updated[idx] = e.target.value;
                      setData({ ...data, hero: { ...data.hero, breadcrumb: updated } });
                    }}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Headline</label>
                <input
                  type="text"
                  value={data.hero.headline}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, headline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subheading</label>
              <textarea
                rows={3}
                value={data.hero.subheading}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, subheading: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.hero.bgImage}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, bgImage: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.bgImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.bgImage')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background (Mobile)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.hero.bgImageMobile || ''}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, bgImageMobile: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'hero.bgImageMobile' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.bgImageMobile')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. PROGRAMS & PATHWAYS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Programs & Pathways</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  programs: [
                    ...data.programs,
                    {
                      id: String(Date.now()),
                      title: "New Program",
                      titleArabic: "برنامج جديد",
                      status: "OPEN",
                      description: "Program description.",
                      image: "/hero.png"
                    }
                  ]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Program
              </button>
            </div>

            <div className="space-y-6">
              {data.programs.map((prog, idx) => (
                <div key={prog.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Program #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.programs.filter((_, i) => i !== idx);
                        setData({ ...data, programs: updated });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={prog.title}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[idx].title = e.target.value;
                        setData({ ...data, programs: updated });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Arabic Title"
                      value={prog.titleArabic}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[idx].titleArabic = e.target.value;
                        setData({ ...data, programs: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Status (e.g. OPEN)"
                      value={prog.status}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[idx].status = e.target.value;
                        setData({ ...data, programs: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={prog.description}
                    onChange={(e) => {
                      const updated = [...data.programs];
                      updated[idx].description = e.target.value;
                      setData({ ...data, programs: updated });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={prog.image}
                      onChange={(e) => {
                        const updated = [...data.programs];
                        updated[idx].image = e.target.value;
                        setData({ ...data, programs: updated });
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

          {/* 3. FEATURED PROGRAM */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Featured Program</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.featuredProgram.tagline}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, tagline: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.featuredProgram.title}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={2}
                value={data.featuredProgram.description}
                onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, description: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Duration & Term</label>
                <input
                  type="text"
                  value={data.featuredProgram.duration}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, duration: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <textarea
                  rows={2}
                  value={data.featuredProgram.durationDetails}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, durationDetails: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Prerequisite Eligibility</label>
                <input
                  type="text"
                  value={data.featuredProgram.prerequisite}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, prerequisite: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <textarea
                  rows={2}
                  value={data.featuredProgram.prerequisiteDetails}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, prerequisiteDetails: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Admissions Limit</label>
                <input
                  type="text"
                  value={data.featuredProgram.limit}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, limit: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <textarea
                  rows={2}
                  value={data.featuredProgram.limitDetails}
                  onChange={(e) => setData({ ...data, featuredProgram: { ...data.featuredProgram, limitDetails: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </section>

          {/* 4. REQUIREMENTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">4. Core Admission Requirements</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  requirements: [
                    ...data.requirements,
                    { id: String(Date.now()), number: "04", title: "New Requirement", description: "Requirement description." }
                  ]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Requirement
              </button>
            </div>

            <div className="space-y-4">
              {data.requirements.map((req, idx) => (
                <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Requirement #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.requirements.filter((_, i) => i !== idx);
                        setData({ ...data, requirements: updated });
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
                      value={req.number}
                      onChange={(e) => {
                        const updated = [...data.requirements];
                        updated[idx].number = e.target.value;
                        setData({ ...data, requirements: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={req.title}
                      onChange={(e) => {
                        const updated = [...data.requirements];
                        updated[idx].title = e.target.value;
                        setData({ ...data, requirements: updated });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={req.description}
                    onChange={(e) => {
                      const updated = [...data.requirements];
                      updated[idx].description = e.target.value;
                      setData({ ...data, requirements: updated });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. STEPS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">5. Application Process Steps</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  steps: [
                    ...data.steps,
                    { stepNumber: "STEP 05", title: "New Step", description: "Step description." }
                  ]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {data.steps.map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Step #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.steps.filter((_, i) => i !== idx);
                        setData({ ...data, steps: updated });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Step Number (e.g. STEP 01)"
                      value={step.stepNumber}
                      onChange={(e) => {
                        const updated = [...data.steps];
                        updated[idx].stepNumber = e.target.value;
                        setData({ ...data, steps: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...data.steps];
                        updated[idx].title = e.target.value;
                        setData({ ...data, steps: updated });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...data.steps];
                      updated[idx].description = e.target.value;
                      setData({ ...data, steps: updated });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 6. DEADLINES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">6. Key Enrollment Deadlines</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  deadlines: [
                    ...data.deadlines,
                    { category: "NEW TERM", items: [{ event: "Application Opens", date: "August 1, 2026" }] }
                  ]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Deadline Group
              </button>
            </div>

            <div className="space-y-6">
              {data.deadlines.map((group, gIdx) => (
                <div key={gIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={group.category}
                      onChange={(e) => {
                        const updated = [...data.deadlines];
                        updated[gIdx].category = e.target.value;
                        setData({ ...data, deadlines: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold uppercase w-1/2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.deadlines.filter((_, i) => i !== gIdx);
                        setData({ ...data, deadlines: updated });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">Events & Dates</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...data.deadlines];
                          updated[gIdx].items.push({ event: "New Event", date: "Date Here" });
                          setData({ ...data, deadlines: updated });
                        }}
                        className="text-[11px] font-bold text-[#04402a] bg-emerald-50 px-2.5 py-1 rounded hover:bg-emerald-100"
                      >
                        + Add Item
                      </button>
                    </div>

                    {group.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Event"
                          value={item.event}
                          onChange={(e) => {
                            const updated = [...data.deadlines];
                            updated[gIdx].items[iIdx].event = e.target.value;
                            setData({ ...data, deadlines: updated });
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Date"
                          value={item.date}
                          onChange={(e) => {
                            const updated = [...data.deadlines];
                            updated[gIdx].items[iIdx].date = e.target.value;
                            setData({ ...data, deadlines: updated });
                          }}
                          className="w-1/3 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.deadlines];
                            updated[gIdx].items = updated[gIdx].items.filter((_, i) => i !== iIdx);
                            setData({ ...data, deadlines: updated });
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. FAQS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">7. Frequently Asked Questions</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  faqs: [...data.faqs, { question: "New Question?", answer: "Answer here." }]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.faqs.filter((_, i) => i !== idx);
                        setData({ ...data, faqs: updated });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...data.faqs];
                      updated[idx].question = e.target.value;
                      setData({ ...data, faqs: updated });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...data.faqs];
                      updated[idx].answer = e.target.value;
                      setData({ ...data, faqs: updated });
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
              <span>{saving ? "Saving Changes to Supabase..." : "Save All Admissions Settings"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}