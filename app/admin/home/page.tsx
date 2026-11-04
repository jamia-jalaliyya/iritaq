"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_HOME_PAGE_SETTINGS, HomePageSettings } from "@/lib/homeData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomeAdminPage() {
  const [settings, setSettings] = useState<HomePageSettings>(DEFAULT_HOME_PAGE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Fetch settings from Supabase on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase
          .from("home_page_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (data) {
          setSettings({
            heroSubheading: data.hero_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.heroSubheading,
            heroHeading: data.hero_heading ?? DEFAULT_HOME_PAGE_SETTINGS.heroHeading,
            heroDescription: data.hero_description ?? DEFAULT_HOME_PAGE_SETTINGS.heroDescription,
            heroBgImage: data.hero_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.heroBgImage,
            heroBgImageMobile: data.hero_bg_image_mobile ?? DEFAULT_HOME_PAGE_SETTINGS.heroBgImageMobile,
            heroPrimaryBtnText: data.hero_primary_btn_text ?? DEFAULT_HOME_PAGE_SETTINGS.heroPrimaryBtnText,
            heroPrimaryBtnLink: data.hero_primary_btn_link ?? DEFAULT_HOME_PAGE_SETTINGS.heroPrimaryBtnLink,
            heroSecondaryBtnText: data.hero_secondary_btn_text ?? DEFAULT_HOME_PAGE_SETTINGS.heroSecondaryBtnText,
            heroSecondaryBtnLink: data.hero_secondary_btn_link ?? DEFAULT_HOME_PAGE_SETTINGS.heroSecondaryBtnLink,
            announcements: data.announcements ?? DEFAULT_HOME_PAGE_SETTINGS.announcements,
            welcomeSubheading: data.welcome_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeSubheading,
            welcomeHeading: data.welcome_heading ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeHeading,
            welcomeDescription: data.welcome_description ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeDescription,
            welcomeImage: data.welcome_image ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeImage,
            welcomeImageMobile: data.welcome_image_mobile ?? DEFAULT_HOME_PAGE_SETTINGS.welcomeImageMobile,
            patronSubheading: data.patron_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.patronSubheading,
            patronQuoteHeading: data.patron_quote_heading ?? DEFAULT_HOME_PAGE_SETTINGS.patronQuoteHeading,
            patronQuoteText: data.patron_quote_text ?? DEFAULT_HOME_PAGE_SETTINGS.patronQuoteText,
            patronName: data.patron_name ?? DEFAULT_HOME_PAGE_SETTINGS.patronName,
            patronTitle: data.patron_title ?? DEFAULT_HOME_PAGE_SETTINGS.patronTitle,
            patronImage: data.patron_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronImage,
            patronImageMobile: data.patron_image_mobile ?? DEFAULT_HOME_PAGE_SETTINGS.patronImageMobile,
            patronBgImage: data.patron_bg_image ?? DEFAULT_HOME_PAGE_SETTINGS.patronBgImage,
            patronBgImageMobile: data.patron_bg_image_mobile ?? DEFAULT_HOME_PAGE_SETTINGS.patronBgImageMobile,
            vmSubheading: data.vm_subheading ?? DEFAULT_HOME_PAGE_SETTINGS.vmSubheading,
            vmHeading: data.vm_heading ?? DEFAULT_HOME_PAGE_SETTINGS.vmHeading,
            visionTitle: data.vision_title ?? DEFAULT_HOME_PAGE_SETTINGS.visionTitle,
            visionDescription: data.vision_description ?? DEFAULT_HOME_PAGE_SETTINGS.visionDescription,
            missionTitle: data.mission_title ?? DEFAULT_HOME_PAGE_SETTINGS.missionTitle,
            missionDescription: data.mission_description ?? DEFAULT_HOME_PAGE_SETTINGS.missionDescription,
            researchDomains: data.research_domains ?? DEFAULT_HOME_PAGE_SETTINGS.researchDomains,
            newsEvents: data.news_events ?? DEFAULT_HOME_PAGE_SETTINGS.newsEvents,
            publications: data.publications ?? DEFAULT_HOME_PAGE_SETTINGS.publications,
          });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Handle file uploads to Supabase Storage
  async function handleImageUpload(file: File, fieldKey: string, index?: number, listType?: 'news' | 'pub') {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `home/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (listType && index !== undefined) {
        if (listType === 'news') {
          const updated = settings.newsEvents.map((item, i) =>
            i === index ? { ...item, [fieldKey]: publicUrl } : item
          );
          setSettings({ ...settings, newsEvents: updated });
        } else if (listType === 'pub') {
          const updated = settings.publications.map((item, i) =>
            i === index ? { ...item, [fieldKey]: publicUrl } : item
          );
          setSettings({ ...settings, publications: updated });
        }
      } else {
        setSettings({ ...settings, [fieldKey]: publicUrl });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Make sure Supabase storage bucket 'iritaq-media' exists.");
    } finally {
      setUploadingField(null);
    }
  }

  // Save settings to Supabase
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const payload = {
        id: 1,
        hero_subheading: settings.heroSubheading,
        hero_heading: settings.heroHeading,
        hero_description: settings.heroDescription,
        hero_bg_image: settings.heroBgImage,
        hero_bg_image_mobile: settings.heroBgImageMobile,
        hero_primary_btn_text: settings.heroPrimaryBtnText,
        hero_primary_btn_link: settings.heroPrimaryBtnLink,
        hero_secondary_btn_text: settings.heroSecondaryBtnText,
        hero_secondary_btn_link: settings.heroSecondaryBtnLink,
        announcements: settings.announcements,
        welcome_subheading: settings.welcomeSubheading,
        welcome_heading: settings.welcomeHeading,
        welcome_description: settings.welcomeDescription,
        welcome_image: settings.welcomeImage,
        welcome_image_mobile: settings.welcomeImageMobile,
        patron_subheading: settings.patronSubheading,
        patron_quote_heading: settings.patronQuoteHeading,
        patron_quote_text: settings.patronQuoteText,
        patron_name: settings.patronName,
        patron_title: settings.patronTitle,
        patron_image: settings.patronImage,
        patron_image_mobile: settings.patronImageMobile,
        patron_bg_image: settings.patronBgImage,
        patron_bg_image_mobile: settings.patronBgImageMobile,
        vm_subheading: settings.vmSubheading,
        vm_heading: settings.vmHeading,
        vision_title: settings.visionTitle,
        vision_description: settings.visionDescription,
        mission_title: settings.missionTitle,
        mission_description: settings.missionDescription,
        research_domains: settings.researchDomains,
        news_events: settings.newsEvents,
        publications: settings.publications,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("home_page_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Home page settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading Home Page Settings...</span>
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
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Home Page Manager</h1>
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subheading</label>
                <input
                  type="text"
                  value={settings.heroSubheading}
                  onChange={(e) => setSettings({ ...settings, heroSubheading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Heading</label>
                <input
                  type="text"
                  value={settings.heroHeading}
                  onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={settings.heroDescription}
                onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Primary Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.heroPrimaryBtnText}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryBtnText: e.target.value })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                    placeholder="Text"
                  />
                  <input
                    type="text"
                    value={settings.heroPrimaryBtnLink}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryBtnLink: e.target.value })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                    placeholder="Link"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Secondary Button Text / Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.heroSecondaryBtnText}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryBtnText: e.target.value })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                    placeholder="Text"
                  />
                  <input
                    type="text"
                    value={settings.heroSecondaryBtnLink}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryBtnLink: e.target.value })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#04402a]"
                    placeholder="Link"
                  />
                </div>
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background Image (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.heroBgImage}
                    onChange={(e) => setSettings({ ...settings, heroBgImage: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'heroBgImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'heroBgImage')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background Image (Mobile)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.heroBgImageMobile || ''}
                    onChange={(e) => setSettings({ ...settings, heroBgImageMobile: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'heroBgImageMobile' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'heroBgImageMobile')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. ANNOUNCEMENTS TICKER */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Announcements Ticker</h2>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, announcements: [...settings.announcements, "New Announcement"] })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Announcement
              </button>
            </div>
            <div className="space-y-3">
              {settings.announcements.map((ann, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={ann}
                    onChange={(e) => {
                      const updated = [...settings.announcements];
                      updated[idx] = e.target.value;
                      setSettings({ ...settings, announcements: updated });
                    }}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = settings.announcements.filter((_, i) => i !== idx);
                      setSettings({ ...settings, announcements: updated });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. WELCOME SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Welcome Section</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subheading</label>
                <input
                  type="text"
                  value={settings.welcomeSubheading}
                  onChange={(e) => setSettings({ ...settings, welcomeSubheading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Heading</label>
                <input
                  type="text"
                  value={settings.welcomeHeading}
                  onChange={(e) => setSettings({ ...settings, welcomeHeading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={settings.welcomeDescription}
                onChange={(e) => setSettings({ ...settings, welcomeDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Welcome Image (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.welcomeImage}
                    onChange={(e) => setSettings({ ...settings, welcomeImage: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'welcomeImage')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Welcome Image (Mobile)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.welcomeImageMobile || ''}
                    onChange={(e) => setSettings({ ...settings, welcomeImageMobile: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'welcomeImageMobile')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 4. PATRON QUOTE SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">4. Grand Patron Section</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subheading</label>
                <input
                  type="text"
                  value={settings.patronSubheading}
                  onChange={(e) => setSettings({ ...settings, patronSubheading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Quote Heading</label>
                <input
                  type="text"
                  value={settings.patronQuoteHeading}
                  onChange={(e) => setSettings({ ...settings, patronQuoteHeading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Quote Text</label>
              <textarea
                rows={3}
                value={settings.patronQuoteText}
                onChange={(e) => setSettings({ ...settings, patronQuoteText: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Patron Name</label>
                <input
                  type="text"
                  value={settings.patronName}
                  onChange={(e) => setSettings({ ...settings, patronName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Patron Title</label>
                <input
                  type="text"
                  value={settings.patronTitle}
                  onChange={(e) => setSettings({ ...settings, patronTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Patron Portrait Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.patronImage}
                    onChange={(e) => setSettings({ ...settings, patronImage: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'patronImage')}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Patron Background Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.patronBgImage}
                    onChange={(e) => setSettings({ ...settings, patronBgImage: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'patronBgImage')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 5. VISION & MISSION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">5. Vision & Mission</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Subheading</label>
                <input
                  type="text"
                  value={settings.vmSubheading}
                  onChange={(e) => setSettings({ ...settings, vmSubheading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Heading</label>
                <input
                  type="text"
                  value={settings.vmHeading}
                  onChange={(e) => setSettings({ ...settings, vmHeading: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-800">Vision Box</h3>
                <input
                  type="text"
                  value={settings.visionTitle}
                  onChange={(e) => setSettings({ ...settings, visionTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  placeholder="Vision Title"
                />
                <textarea
                  rows={3}
                  value={settings.visionDescription}
                  onChange={(e) => setSettings({ ...settings, visionDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  placeholder="Vision Description"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-slate-800">Mission Box</h3>
                <input
                  type="text"
                  value={settings.missionTitle}
                  onChange={(e) => setSettings({ ...settings, missionTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  placeholder="Mission Title"
                />
                <textarea
                  rows={3}
                  value={settings.missionDescription}
                  onChange={(e) => setSettings({ ...settings, missionDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  placeholder="Mission Description"
                />
              </div>
            </div>
          </section>

          {/* 6. RESEARCH DOMAINS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">6. Research Domains</h2>
              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  researchDomains: [...settings.researchDomains, { id: String(Date.now()), title: "New Domain" }]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Domain
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.researchDomains.map((domain, idx) => (
                <div key={domain.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    value={domain.title}
                    onChange={(e) => {
                      const updated = [...settings.researchDomains];
                      updated[idx].title = e.target.value;
                      setSettings({ ...settings, researchDomains: updated });
                    }}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = settings.researchDomains.filter((_, i) => i !== idx);
                      setSettings({ ...settings, researchDomains: updated });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100/50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 7. NEWS & EVENTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">7. News & Events Slider/Grid</h2>
              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  newsEvents: [...settings.newsEvents, { id: String(Date.now()), date: "OCTOBER 2026", title: "New Event", image: "/wel.png" }]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add News Item
              </button>
            </div>
            <div className="space-y-6">
              {settings.newsEvents.map((news, idx) => (
                <div key={news.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = settings.newsEvents.filter((_, i) => i !== idx);
                        setSettings({ ...settings, newsEvents: updated });
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
                      value={news.title}
                      onChange={(e) => {
                        const updated = [...settings.newsEvents];
                        updated[idx].title = e.target.value;
                        setSettings({ ...settings, newsEvents: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g. OCTOBER 24, 2026)"
                      value={news.date}
                      onChange={(e) => {
                        const updated = [...settings.newsEvents];
                        updated[idx].date = e.target.value;
                        setSettings({ ...settings, newsEvents: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={news.image}
                      onChange={(e) => {
                        const updated = [...settings.newsEvents];
                        updated[idx].image = e.target.value;
                        setSettings({ ...settings, newsEvents: updated });
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
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'image', idx, 'news')}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. PUBLICATIONS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">8. Publications Section</h2>
              <button
                type="button"
                onClick={() => setSettings({
                  ...settings,
                  publications: [...settings.publications, { id: String(Date.now()), title: "New Publication", description: "Description", image: "/wel.png" }]
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Publication
              </button>
            </div>
            <div className="space-y-6">
              {settings.publications.map((pub, idx) => (
                <div key={pub.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Publication #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = settings.publications.filter((_, i) => i !== idx);
                        setSettings({ ...settings, publications: updated });
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
                      value={pub.title}
                      onChange={(e) => {
                        const updated = [...settings.publications];
                        updated[idx].title = e.target.value;
                        setSettings({ ...settings, publications: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={pub.description}
                      onChange={(e) => {
                        const updated = [...settings.publications];
                        updated[idx].description = e.target.value;
                        setSettings({ ...settings, publications: updated });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={pub.image}
                      onChange={(e) => {
                        const updated = [...settings.publications];
                        updated[idx].image = e.target.value;
                        setSettings({ ...settings, publications: updated });
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
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'image', idx, 'pub')}
                      />
                    </label>
                  </div>
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
              <span>{saving ? "Saving Changes to Supabase..." : "Save All Home Settings"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}