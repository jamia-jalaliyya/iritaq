"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import { conferenceData, ConferenceData } from "@/lib/conferenceData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";


export default function ConferenceAdminPage() {
  const [data, setData] = useState<ConferenceData>(conferenceData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConferenceData() {
      try {
        const { data: s } = await supabase
          .from("conference_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (s) {
          setData({
            hero: {
              breadcrumb: s.hero_breadcrumb?.length ? s.hero_breadcrumb : conferenceData.hero.breadcrumb,
              title: s.hero_title ?? conferenceData.hero.title,
              description: s.hero_description ?? conferenceData.hero.description,
              buttonText: s.hero_button_text ?? conferenceData.hero.buttonText,
              buttonLink: s.hero_button_link ?? conferenceData.hero.buttonLink,
              backgroundImage: s.hero_background_image ?? conferenceData.hero.backgroundImage,
              backgroundImageMobile: s.hero_background_image_mobile ?? conferenceData.hero.backgroundImageMobile,
            },
            featuredConference: {
              tag: s.featured_tag ?? conferenceData.featuredConference.tag,
              title: s.featured_title ?? conferenceData.featuredConference.title,
              theme: s.featured_theme ?? conferenceData.featuredConference.theme,
              date: s.featured_date ?? conferenceData.featuredConference.date,
              location: s.featured_location ?? conferenceData.featuredConference.location,
              highlights: s.featured_highlights?.length ? s.featured_highlights : conferenceData.featuredConference.highlights,
              detailsLink: s.featured_details_link ?? conferenceData.featuredConference.detailsLink,
              brochureLink: s.featured_brochure_link ?? conferenceData.featuredConference.brochureLink,
              image: s.featured_image ?? conferenceData.featuredConference.image,
              imageMobile: s.featured_image_mobile ?? conferenceData.featuredConference.imageMobile,
            },
            forumsSection: {
              tag: s.forums_tag ?? conferenceData.forumsSection.tag,
              title: s.forums_title ?? conferenceData.forumsSection.title,
              description: s.forums_description ?? conferenceData.forumsSection.description,
              buttonText: s.forums_button_text ?? conferenceData.forumsSection.buttonText,
              buttonLink: s.forums_button_link ?? conferenceData.forumsSection.buttonLink,
              forums: s.forums?.length ? s.forums : conferenceData.forumsSection.forums,
            },
            upcomingEventsSection: {
              tag: s.upcoming_tag ?? conferenceData.upcomingEventsSection.tag,
              title: s.upcoming_title ?? conferenceData.upcomingEventsSection.title,
              description: s.upcoming_description ?? conferenceData.upcomingEventsSection.description,
              events: s.upcoming_events?.length ? s.upcoming_events : conferenceData.upcomingEventsSection.events,
            },
            gallerySection: {
              tag: s.gallery_tag ?? conferenceData.gallerySection.tag,
              title: s.gallery_title ?? conferenceData.gallerySection.title,
              description: s.gallery_description ?? conferenceData.gallerySection.description,
              images: s.gallery_images?.length ? s.gallery_images : conferenceData.gallerySection.images,
            },
          });
        }
      } catch (err) {
        console.error("Error fetching conference data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchConferenceData();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, index?: number) {
    try {
      setUploadingField(fieldKey + (index !== undefined ? `-${index}` : ''));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `conference/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (fieldKey === "hero.backgroundImage") {
        setData({ ...data, hero: { ...data.hero, backgroundImage: publicUrl } });
      } else if (fieldKey === "hero.backgroundImageMobile") {
        setData({ ...data, hero: { ...data.hero, backgroundImageMobile: publicUrl } });
      } else if (fieldKey === "featuredConference.image") {
        setData({ ...data, featuredConference: { ...data.featuredConference, image: publicUrl } });
      } else if (fieldKey === "featuredConference.imageMobile") {
        setData({ ...data, featuredConference: { ...data.featuredConference, imageMobile: publicUrl } });
      } else if (fieldKey === "upcomingEvent.image" && index !== undefined) {
        const updatedEvents = data.upcomingEventsSection.events.map((ev, i) =>
          i === index ? { ...ev, image: publicUrl } : ev
        );
        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updatedEvents } });
      } else if (fieldKey === "gallery.src" && index !== undefined) {
        const updatedImages = data.gallerySection.images.map((img, i) =>
          i === index ? { ...img, src: publicUrl } : img
        );
        setData({ ...data, gallerySection: { ...data.gallerySection, images: updatedImages } });
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
        hero_title: data.hero.title,
        hero_description: data.hero.description,
        hero_button_text: data.hero.buttonText,
        hero_button_link: data.hero.buttonLink,
        hero_background_image: data.hero.backgroundImage,
        hero_background_image_mobile: data.hero.backgroundImageMobile,
        featured_tag: data.featuredConference.tag,
        featured_title: data.featuredConference.title,
        featured_theme: data.featuredConference.theme,
        featured_date: data.featuredConference.date,
        featured_location: data.featuredConference.location,
        featured_highlights: data.featuredConference.highlights,
        featured_details_link: data.featuredConference.detailsLink,
        featured_brochure_link: data.featuredConference.brochureLink,
        featured_image: data.featuredConference.image,
        featured_image_mobile: data.featuredConference.imageMobile,
        forums_tag: data.forumsSection.tag,
        forums_title: data.forumsSection.title,
        forums_description: data.forumsSection.description,
        forums_button_text: data.forumsSection.buttonText,
        forums_button_link: data.forumsSection.buttonLink,
        forums: data.forumsSection.forums,
        upcoming_tag: data.upcomingEventsSection.tag,
        upcoming_title: data.upcomingEventsSection.title,
        upcoming_description: data.upcomingEventsSection.description,
        upcoming_events: data.upcomingEventsSection.events,
        gallery_tag: data.gallerySection.tag,
        gallery_title: data.gallerySection.title,
        gallery_description: data.gallerySection.description,
        gallery_images: data.gallerySection.images,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("conference_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Conference page settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving conference settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading Conference Settings...</span>
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
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Conference Page Manager</h1>
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
                    hero: { ...data.hero, breadcrumb: [...data.hero.breadcrumb, { label: "New Crumb", href: "#" }] }
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

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
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

          {/* 2. FEATURED CONFERENCE */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">2. Featured International Conference</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tag</label>
                <input
                  type="text"
                  value={data.featuredConference.tag}
                  onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, tag: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.featuredConference.title}
                  onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Theme</label>
                <input
                  type="text"
                  value={data.featuredConference.theme}
                  onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, theme: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Date</label>
                <input
                  type="text"
                  value={data.featuredConference.date}
                  onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, date: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Location</label>
                <input
                  type="text"
                  value={data.featuredConference.location}
                  onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, location: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            {/* Highlights Manager */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Conference Highlights</label>
                <button
                  type="button"
                  onClick={() => setData({
                    ...data,
                    featuredConference: {
                      ...data.featuredConference,
                      highlights: [...data.featuredConference.highlights, "New Highlight"]
                    }
                  })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#04402a] bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Highlight
                </button>
              </div>
              {data.featuredConference.highlights.map((high, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={high}
                    onChange={(e) => {
                      const updated = [...data.featuredConference.highlights];
                      updated[idx] = e.target.value;
                      setData({ ...data, featuredConference: { ...data.featuredConference, highlights: updated } });
                    }}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = data.featuredConference.highlights.filter((_, i) => i !== idx);
                      setData({ ...data, featuredConference: { ...data.featuredConference, highlights: updated } });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Details Link / Brochure Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Details Link"
                    value={data.featuredConference.detailsLink}
                    onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, detailsLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Brochure PDF Link"
                    value={data.featuredConference.brochureLink}
                    onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, brochureLink: e.target.value } })}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Featured Image URL (Desktop)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={data.featuredConference.image}
                    onChange={(e) => setData({ ...data, featuredConference: { ...data.featuredConference, image: e.target.value } })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'featuredConference.image')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FORUMS SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">3. Diverse Forums for Knowledge Exchange</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  forumsSection: {
                    ...data.forumsSection,
                    forums: [...data.forumsSection.forums, { number: "04", title: "New Forum", description: "Forum description." }]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Forum
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tag</label>
                <input
                  type="text"
                  value={data.forumsSection.tag}
                  onChange={(e) => setData({ ...data, forumsSection: { ...data.forumsSection, tag: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.forumsSection.title}
                  onChange={(e) => setData({ ...data, forumsSection: { ...data.forumsSection, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={2}
                value={data.forumsSection.description}
                onChange={(e) => setData({ ...data, forumsSection: { ...data.forumsSection, description: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-sm font-bold text-slate-800">Forums List</h3>
              {data.forumsSection.forums.map((forum, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Forum #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.forumsSection.forums.filter((_, i) => i !== idx);
                        setData({ ...data, forumsSection: { ...data.forumsSection, forums: updated } });
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
                      value={forum.number}
                      onChange={(e) => {
                        const updated = [...data.forumsSection.forums];
                        updated[idx].number = e.target.value;
                        setData({ ...data, forumsSection: { ...data.forumsSection, forums: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={forum.title}
                      onChange={(e) => {
                        const updated = [...data.forumsSection.forums];
                        updated[idx].title = e.target.value;
                        setData({ ...data, forumsSection: { ...data.forumsSection, forums: updated } });
                      }}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={forum.description}
                    onChange={(e) => {
                      const updated = [...data.forumsSection.forums];
                      updated[idx].description = e.target.value;
                      setData({ ...data, forumsSection: { ...data.forumsSection, forums: updated } });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 4. UPCOMING EVENTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">4. Calendar of Forthcoming Gatherings</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  upcomingEventsSection: {
                    ...data.upcomingEventsSection,
                    events: [
                      ...data.upcomingEventsSection.events,
                      {
                        id: String(Date.now()),
                        title: "New Gathering",
                        theme: "Theme here",
                        date: "Date here",
                        location: "Location",
                        type: "In-Person",
                        link: "#",
                        image: "/hero.png"
                      }
                    ]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tag</label>
                <input
                  type="text"
                  value={data.upcomingEventsSection.tag}
                  onChange={(e) => setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, tag: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.upcomingEventsSection.title}
                  onChange={(e) => setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-sm font-bold text-slate-800">Events List</h3>
              {data.upcomingEventsSection.events.map((ev, idx) => (
                <div key={ev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Event #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.upcomingEventsSection.events.filter((_, i) => i !== idx);
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={ev.title}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].title = e.target.value;
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Theme"
                      value={ev.theme}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].theme = e.target.value;
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Date"
                      value={ev.date}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].date = e.target.value;
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={ev.location}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].location = e.target.value;
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <select
                      value={ev.type}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].type = e.target.value as "In-Person" | "Online";
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
                      }}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={ev.image}
                      onChange={(e) => {
                        const updated = [...data.upcomingEventsSection.events];
                        updated[idx].image = e.target.value;
                        setData({ ...data, upcomingEventsSection: { ...data.upcomingEventsSection, events: updated } });
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
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'upcomingEvent.image', idx)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. GALLERY SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">5. Past Events Gallery</h2>
              <button
                type="button"
                onClick={() => setData({
                  ...data,
                  gallerySection: {
                    ...data.gallerySection,
                    images: [...data.gallerySection.images, { src: "/hero.png", alt: "Gallery photo" }]
                  }
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tag</label>
                <input
                  type="text"
                  value={data.gallerySection.tag}
                  onChange={(e) => setData({ ...data, gallerySection: { ...data.gallerySection, tag: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={data.gallerySection.title}
                  onChange={(e) => setData({ ...data, gallerySection: { ...data.gallerySection, title: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-sm font-bold text-slate-800">Gallery Images</h3>
              {data.gallerySection.images.map((img, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Image #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.gallerySection.images.filter((_, i) => i !== idx);
                        setData({ ...data, gallerySection: { ...data.gallerySection, images: updated } });
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Alt Text"
                    value={img.alt}
                    onChange={(e) => {
                      const updated = [...data.gallerySection.images];
                      updated[idx].alt = e.target.value;
                      setData({ ...data, gallerySection: { ...data.gallerySection, images: updated } });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={img.src}
                      onChange={(e) => {
                        const updated = [...data.gallerySection.images];
                        updated[idx].src = e.target.value;
                        setData({ ...data, gallerySection: { ...data.gallerySection, images: updated } });
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
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'gallery.src', idx)}
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
              <span>{saving ? "Saving Changes to Supabase..." : "Save All Conference Settings"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}