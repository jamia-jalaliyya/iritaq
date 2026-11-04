"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  collectionData as DEFAULT_DATA,
  CollectionResource,
  RelatedCategoryPill,
} from "@/lib/digitalLibraryCollectionData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Settings } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DigitalLibraryCollectionAdminPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || "tafsir-collections";

  // Hero States
  const [tagline, setTagline] = useState(DEFAULT_DATA.hero.tagline);
  const [title, setTitle] = useState(DEFAULT_DATA.hero.title);
  const [description, setDescription] = useState(DEFAULT_DATA.hero.description);
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_DATA.hero.backgroundImage);
  const [mobileBackgroundImage, setMobileBackgroundImage] = useState(DEFAULT_DATA.hero.mobileBackgroundImage);

  // Resources Header States
  const [countTag, setCountTag] = useState(DEFAULT_DATA.resourcesHeader.countTag);
  const [resHeaderTitle, setResHeaderTitle] = useState(DEFAULT_DATA.resourcesHeader.title);
  const [subtitle, setSubtitle] = useState(DEFAULT_DATA.resourcesHeader.subtitle);
  const [addButtonText, setAddButtonText] = useState(DEFAULT_DATA.resourcesHeader.addButtonText);

  // Items & Related Categories
  const [items, setItems] = useState<CollectionResource[]>(DEFAULT_DATA.items);
  const [relatedCategories, setRelatedCategories] = useState<RelatedCategoryPill[]>(DEFAULT_DATA.relatedCategories);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollectionSettings() {
      try {
        let { data } = await supabase
          .from("digital_library_collection_settings")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        const { error } = await supabase
          .from("digital_library_collection_settings")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error && error.code) {
          console.error("Error fetching collection settings:", error.message || error);
        }

        if (!data) {
          const initialPayload = {
            slug,
            hero: DEFAULT_DATA.hero,
            resources_header: DEFAULT_DATA.resourcesHeader,
            items: DEFAULT_DATA.items,
            related_categories: DEFAULT_DATA.relatedCategories,
          };
          
          const { error: upsertError } = await supabase
            .from("digital_library_collection_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          if (upsertError) {
            console.error("Error seeding initial collection settings:", upsertError.message);
          }

          data = initialPayload;
        }

        if (data) {
          if (data.hero) {
            setTagline(data.hero.tagline || DEFAULT_DATA.hero.tagline);
            setTitle(data.hero.title || DEFAULT_DATA.hero.title);
            setDescription(data.hero.description || DEFAULT_DATA.hero.description);
            setBackgroundImage(data.hero.backgroundImage || DEFAULT_DATA.hero.backgroundImage);
            setMobileBackgroundImage(data.hero.mobileBackgroundImage || DEFAULT_DATA.hero.mobileBackgroundImage);
          }
          if (data.resources_header) {
            setCountTag(data.resources_header.countTag || DEFAULT_DATA.resourcesHeader.countTag);
            setResHeaderTitle(data.resources_header.title || DEFAULT_DATA.resourcesHeader.title);
            setSubtitle(data.resources_header.subtitle || DEFAULT_DATA.resourcesHeader.subtitle);
            setAddButtonText(data.resources_header.addButtonText || DEFAULT_DATA.resourcesHeader.addButtonText);
          }
          if (data.items && Array.isArray(data.items)) setItems(data.items);
          if (data.related_categories && Array.isArray(data.related_categories)) setRelatedCategories(data.related_categories);
        }
      } catch (err: unknown) {
        console.error("Unexpected error loading collection admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollectionSettings();
  }, [slug]);

  async function handleImageUpload(file: File, fieldKey: string, resourceIndex?: number) {
    try {
      setUploadingField(fieldKey + (resourceIndex !== undefined ? `-${resourceIndex}` : ""));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `digital-library-collection/${fileName}`;

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
        const updated = [...items];
        updated[resourceIndex].image = publicUrl;
        setItems(updated);
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
        slug,
        hero: {
          breadcrumb: DEFAULT_DATA.hero.breadcrumb,
          tagline,
          title,
          description,
          backgroundImage,
          mobileBackgroundImage,
        },
        resources_header: {
          countTag,
          title: resHeaderTitle,
          subtitle,
          addButtonText,
        },
        items,
        related_categories: relatedCategories,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("digital_library_collection_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage("Collection page settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving collection settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Collection Management...</span>
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
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">COLLECTION MANAGER ({slug})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Manage Collection Page & Cards Grid</h1>
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
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Collection Hero Banner</h2>

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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Main Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
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

          {/* 2. RESOURCES HEADER SETTINGS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">2. Cards Grid Header & Subtitle</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Count Tag</label>
                <input
                  type="text"
                  value={countTag}
                  onChange={(e) => setCountTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Title</label>
                <input
                  type="text"
                  value={resHeaderTitle}
                  onChange={(e) => setResHeaderTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Add Button Text</label>
                <input
                  type="text"
                  value={addButtonText}
                  onChange={(e) => setAddButtonText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subtitle</label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 3. COLLECTION CARDS GRID MANAGER */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">3. Resource Cards Grid Items ({items.length})</h2>
              <button
                type="button"
                onClick={() => setItems([
                  ...items,
                  {
                    id: String(Date.now()),
                    title: "New Resource Title",
                    category: title,
                    status: "PUBLISHED",
                    isFeatured: false,
                    description: "Description of the collection resource.",
                    language: "Arabic",
                    image: "/images/library/quran-book-1.jpg",
                  }
                ])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> {addButtonText || "Add resource"}
              </button>
            </div>

            <div className="space-y-6">
              {items.map((res, idx) => (
                <div key={res.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Card Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setItems(items.filter((_, i) => i !== idx))}
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
                          const updated = [...items];
                          updated[idx].category = e.target.value;
                          setItems(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
                      <select
                        value={res.status}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[idx].status = e.target.value as CollectionResource["status"];
                          setItems(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Language</label>
                      <select
                        value={res.language}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[idx].language = e.target.value as CollectionResource["language"];
                          setItems(updated);
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
                            const updated = [...items];
                            updated[idx].isFeatured = e.target.checked;
                            setItems(updated);
                          }}
                          className="w-4 h-4 text-emerald-700 rounded border-slate-300"
                        />
                        Mark as Featured
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Title</label>
                    <input
                      type="text"
                      value={res.title}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].title = e.target.value;
                        setItems(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Description</label>
                    <textarea
                      rows={2}
                      value={res.description}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].description = e.target.value;
                        setItems(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Thumbnail Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={res.image}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[idx].image = e.target.value;
                          setItems(updated);
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

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? "Saving Changes..." : "Save Collection Settings"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}