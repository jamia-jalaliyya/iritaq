"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import { departmentsData, Department } from "@/lib/departmentsData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Settings } from "lucide-react";


export default function DepartmentsAdminPage() {
  // Hero States
  const [tag, setTag] = useState(departmentsData.hero.tag);
  const [title, setTitle] = useState(departmentsData.hero.title);
  const [description, setDescription] = useState(departmentsData.hero.description);
  const [backgroundImage, setBackgroundImage] = useState(departmentsData.hero.backgroundImage);
  const [mobileBackgroundImage, setMobileBackgroundImage] = useState(departmentsData.hero.mobileBackgroundImage);
  const [buttonText, setButtonText] = useState(departmentsData.hero.buttonText);

  // Section Header States
  const [secTag, setSecTag] = useState(departmentsData.sectionHeader.tag);
  const [secTitle, setSecTitle] = useState(departmentsData.sectionHeader.title);
  const [secDesc, setSecDesc] = useState(departmentsData.sectionHeader.description);

  // Departments List State
  const [departments, setDepartments] = useState<Department[]>(departmentsData.departments);

  // CTA States
  const [ctaTag, setCtaTag] = useState(departmentsData.cta.tag);
  const [ctaTitle, setCtaTitle] = useState(departmentsData.cta.title);
  const [ctaButtonText, setCtaButtonText] = useState(departmentsData.cta.buttonText);
  const [ctaButtonLink, setCtaButtonLink] = useState(departmentsData.cta.buttonLink);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartmentsSettings() {
      try {
        let { data } = await supabase
  .from("departments_settings")
  .select("*")
  .eq("id", 1)
  .maybeSingle();

const { error } = await supabase
  .from("departments_settings")
  .select("*")
  .eq("id", 1)
  .maybeSingle();

if (error) console.error("Error fetching departments settings:", error);

if (!data) {
  const initialPayload = {
    id: 1,
    hero: departmentsData.hero,
    section_header: departmentsData.sectionHeader,
    departments_list: departmentsData.departments,
    cta: departmentsData.cta,
  };
  await supabase.from("departments_settings").insert([initialPayload]);
  data = initialPayload; // Fully valid and linter-approved!
}

        if (data) {
          if (data.hero) {
            setTag(data.hero.tag || departmentsData.hero.tag);
            setTitle(data.hero.title || departmentsData.hero.title);
            setDescription(data.hero.description || departmentsData.hero.description);
            setBackgroundImage(data.hero.backgroundImage || departmentsData.hero.backgroundImage);
            setMobileBackgroundImage(data.hero.mobileBackgroundImage || departmentsData.hero.mobileBackgroundImage);
            setButtonText(data.hero.buttonText || departmentsData.hero.buttonText);
          }
          if (data.section_header) {
            setSecTag(data.section_header.tag || departmentsData.sectionHeader.tag);
            setSecTitle(data.section_header.title || departmentsData.sectionHeader.title);
            setSecDesc(data.section_header.description || departmentsData.sectionHeader.description);
          }
          if (data.departments_list && Array.isArray(data.departments_list)) {
            setDepartments(data.departments_list);
          }
          if (data.cta) {
            setCtaTag(data.cta.tag || departmentsData.cta.tag);
            setCtaTitle(data.cta.title || departmentsData.cta.title);
            setCtaButtonText(data.cta.buttonText || departmentsData.cta.buttonText);
            setCtaButtonLink(data.cta.buttonLink || departmentsData.cta.buttonLink);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading departments admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDepartmentsSettings();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `departments/${fileName}`;

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
          breadcrumb: departmentsData.hero.breadcrumb,
          tag,
          title,
          description,
          backgroundImage,
          mobileBackgroundImage,
          buttonText,
          buttonLink: departmentsData.hero.buttonLink,
        },
        section_header: {
          tag: secTag,
          title: secTitle,
          description: secDesc,
        },
        departments_list: departments,
        cta: {
          tag: ctaTag,
          title: ctaTitle,
          buttonText: ctaButtonText,
          buttonLink: ctaButtonLink,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("departments_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Departments page settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving departments settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Departments Management...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Manage Departments Page</h1>
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
          
          {/* 1. HERO SECTION SETTINGS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Hero Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tag Line</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
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

          {/* 2. SECTION HEADER SETTINGS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">2. Section Header (Grid Intro)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Tag</label>
                <input
                  type="text"
                  value={secTag}
                  onChange={(e) => setSecTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Title</label>
                <input
                  type="text"
                  value={secTitle}
                  onChange={(e) => setSecTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Description</label>
              <textarea
                rows={2}
                value={secDesc}
                onChange={(e) => setSecDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 3. DEPARTMENTS CARDS LIST MANAGER */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">3. Departments Cards ({departments.length})</h2>
              <button
                type="button"
                onClick={() => setDepartments([
                  ...departments,
                  {
                    id: String(Date.now()),
                    number: String(departments.length + 1).padStart(2, '0'),
                    badge: 'RESEARCH DEPARTMENT',
                    title: 'New Department',
                    description: 'Description of the department.',
                    researchUnits: ['Unit One', 'Unit Two'],
                    slug: '#',
                  }
                ])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Department
              </button>
            </div>

            <div className="space-y-6">
              {departments.map((dept: Department, idx: number) => (
                <div key={dept.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDepartments(departments.filter((_: Department, i: number) => i !== idx))}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Number ID</label>
                      <input
                        type="text"
                        value={dept.number}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].number = e.target.value;
                          setDepartments(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={dept.badge}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].badge = e.target.value;
                          setDepartments(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Slug / Link URL</label>
                      <input
                        type="text"
                        value={dept.slug}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].slug = e.target.value;
                          setDepartments(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Department Title</label>
                    <input
                      type="text"
                      value={dept.title}
                      onChange={(e) => {
                        const updated = [...departments];
                        updated[idx].title = e.target.value;
                        setDepartments(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={dept.description}
                      onChange={(e) => {
                        const updated = [...departments];
                        updated[idx].description = e.target.value;
                        setDepartments(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  {/* Research Units Sub-list */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Research Units</label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...departments];
                          updated[idx].researchUnits.push("New Research Unit");
                          setDepartments(updated);
                        }}
                        className="text-[11px] font-semibold text-emerald-800 hover:underline"
                      >
                        + Add Unit
                      </button>
                    </div>
                    {dept.researchUnits.map((unit: string, uIdx: number) => (
                      <div key={uIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={unit}
                          onChange={(e) => {
                            const updated = [...departments];
                            updated[idx].researchUnits[uIdx] = e.target.value;
                            setDepartments(updated);
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...departments];
                            updated[idx].researchUnits = updated[idx].researchUnits.filter((_: string, i: number) => i !== uIdx);
                            setDepartments(updated);
                          }}
                          className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* 4. CALL TO ACTION BANNER SETTINGS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">4. Call to Action Banner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Tag</label>
                <input
                  type="text"
                  value={ctaTag}
                  onChange={(e) => setCtaTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Title</label>
                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Button Link</label>
                <input
                  type="text"
                  value={ctaButtonLink}
                  onChange={(e) => setCtaButtonLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? "Saving Changes..." : "Save All Departments Settings"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}