"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  defaultInternationalPartnershipsData as DEFAULT_DATA,
  PartnerCardItem,
  ArchiveImageItem,
} from "@/lib/internationalPartnershipsDefaultData";
import {
  Loader2,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Settings,
  ExternalLink,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function InternationalPartnershipsAdminPage() {
  // Hero Section State
  const [heroTagline, setHeroTagline] = useState(DEFAULT_DATA.hero.tagline);
  const [heroTitle, setHeroTitle] = useState(DEFAULT_DATA.hero.title);
  const [heroDescription, setHeroDescription] = useState(
    DEFAULT_DATA.hero.description
  );
  const [heroBgImageUrl, setHeroBgImageUrl] = useState(
    DEFAULT_DATA.hero.bgImageUrl
  );
  const [heroMobileBgImageUrl, setHeroMobileBgImageUrl] = useState(
    DEFAULT_DATA.hero.mobileBgImageUrl
  );

  // Overview Section State
  const [overviewTitle, setOverviewTitle] = useState(
    DEFAULT_DATA.overview.title
  );
  const [overviewParagraphs, setOverviewParagraphs] = useState<string[]>(
    DEFAULT_DATA.overview.paragraphs
  );

  // Partners List State
  const [partners, setPartners] = useState<PartnerCardItem[]>(
    DEFAULT_DATA.partners
  );

  // Archives Gallery State
  const [archives, setArchives] = useState<ArchiveImageItem[]>(
    DEFAULT_DATA.archives
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Fetch Existing Data from Supabase
  useEffect(() => {
    async function fetchPartnershipSettings() {
      try {
        const { data, error } = await supabase
          .from("international_partnerships_settings")
          .select("*")
          .eq("slug", "partnerships-page")
          .maybeSingle();

        let pageData = data;

        if (!pageData) {
          const initialPayload = {
            slug: "partnerships-page",
            hero: DEFAULT_DATA.hero,
            overview: DEFAULT_DATA.overview,
            partners: DEFAULT_DATA.partners,
            archives: DEFAULT_DATA.archives,
          };

          await supabase
            .from("international_partnerships_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          pageData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching partnership settings:", error.message);
        }

        if (pageData) {
          if (pageData.hero) {
            setHeroTagline(pageData.hero.tagline || DEFAULT_DATA.hero.tagline);
            setHeroTitle(pageData.hero.title || DEFAULT_DATA.hero.title);
            setHeroDescription(
              pageData.hero.description || DEFAULT_DATA.hero.description
            );
            setHeroBgImageUrl(
              pageData.hero.bgImageUrl || DEFAULT_DATA.hero.bgImageUrl
            );
            setHeroMobileBgImageUrl(
              pageData.hero.mobileBgImageUrl ||
                DEFAULT_DATA.hero.mobileBgImageUrl
            );
          }
          if (pageData.overview) {
            setOverviewTitle(
              pageData.overview.title || DEFAULT_DATA.overview.title
            );
            if (Array.isArray(pageData.overview.paragraphs)) {
              setOverviewParagraphs(pageData.overview.paragraphs);
            }
          }
          if (Array.isArray(pageData.partners)) {
            setPartners(pageData.partners);
          }
          if (Array.isArray(pageData.archives)) {
            setArchives(pageData.archives);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading partnership admin data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartnershipSettings();
  }, []);

  // Image Upload Helper for Storage Bucket "iritaq-media"
  async function handleImageUpload(
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
      const filePath = `partnerships-page/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      onSuccess(publicUrlData.publicUrl);
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      alert(
        "Failed to upload image. Please check if bucket 'iritaq-media' exists and is public."
      );
    } finally {
      setUploadingField(null);
    }
  }

  // Form Submission Handler
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const payload = {
        slug: "partnerships-page",
        hero: {
          tagline: heroTagline,
          title: heroTitle,
          description: heroDescription,
          bgImageUrl: heroBgImageUrl,
          mobileBgImageUrl: heroMobileBgImageUrl,
        },
        overview: {
          title: overviewTitle,
          paragraphs: overviewParagraphs,
        },
        partners,
        archives,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("international_partnerships_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage(
        "International Partnerships settings saved successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving partnership settings:", error);
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
        <span className="ml-3 font-medium text-sm">
          Loading Partnerships Admin...
        </span>
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
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                ADMIN DASHBOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">
              Manage International Partnerships
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
              1. Hero Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Desktop Background Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroBgImageUrl}
                    onChange={(e) => setHeroBgImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingField === "heroBg"
                        ? "Uploading..."
                        : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleImageUpload(
                          e.target.files[0],
                          "heroBg",
                          setHeroBgImageUrl
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Mobile Background Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroMobileBgImageUrl}
                    onChange={(e) => setHeroMobileBgImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingField === "heroMobileBg"
                        ? "Uploading..."
                        : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleImageUpload(
                          e.target.files[0],
                          "heroMobileBg",
                          setHeroMobileBgImageUrl
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. OVERVIEW INTRO SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                2. Global Outreach Description
              </h2>
              <button
                type="button"
                onClick={() =>
                  setOverviewParagraphs([
                    ...overviewParagraphs,
                    "New description paragraph...",
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Paragraph
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={overviewTitle}
                onChange={(e) => setOverviewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Paragraphs ({overviewParagraphs.length})
              </label>
              {overviewParagraphs.map((p, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <textarea
                    rows={2}
                    value={p}
                    onChange={(e) => {
                      const updated = [...overviewParagraphs];
                      updated[idx] = e.target.value;
                      setOverviewParagraphs(updated);
                    }}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setOverviewParagraphs(
                        overviewParagraphs.filter((_, i) => i !== idx)
                      )
                    }
                    className="text-rose-600 hover:bg-rose-100 p-2.5 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. PARTNERS CARDS GRID SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                3. Partners Cards ({partners.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setPartners([
                    ...partners,
                    {
                      id: String(Date.now()),
                      name: "Partner Institution Name",
                      logoUrl: "/images/partners/placeholder.png",
                      description: "Short description of the partner collaboration.",
                      websiteUrl: "https://",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Partner
              </button>
            </div>

            <div className="space-y-6">
              {partners.map((partner, idx) => (
                <div
                  key={partner.id || idx}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Partner #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPartners(partners.filter((_, i) => i !== idx))
                      }
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Partner Name
                      </label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => {
                          const updated = [...partners];
                          updated[idx].name = e.target.value;
                          setPartners(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Official Website URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={partner.websiteUrl}
                          onChange={(e) => {
                            const updated = [...partners];
                            updated[idx].websiteUrl = e.target.value;
                            setPartners(updated);
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-amber-700 p-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={partner.description}
                      onChange={(e) => {
                        const updated = [...partners];
                        updated[idx].description = e.target.value;
                        setPartners(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Partner Logo Image URL
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={partner.logoUrl}
                        onChange={(e) => {
                          const updated = [...partners];
                          updated[idx].logoUrl = e.target.value;
                          setPartners(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>
                          {uploadingField === `partner-${idx}`
                            ? "Uploading..."
                            : "Upload"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleImageUpload(
                              e.target.files[0],
                              `partner-${idx}`,
                              (url) => {
                                const updated = [...partners];
                                updated[idx].logoUrl = url;
                                setPartners(updated);
                              }
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. ARCHIVES PHOTO GALLERY SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                4. Archives Photo Gallery ({archives.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setArchives([
                    ...archives,
                    {
                      url: "/images/archives/placeholder.jpg",
                      caption: "Event caption details...",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Gallery Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {archives.map((img, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Photo #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setArchives(archives.filter((_, i) => i !== idx))
                      }
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Image URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => {
                          const updated = [...archives];
                          updated[idx].url = e.target.value;
                          setArchives(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3 h-3" />
                        <span>
                          {uploadingField === `archive-${idx}`
                            ? "Uploading..."
                            : "Upload"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleImageUpload(
                              e.target.files[0],
                              `archive-${idx}`,
                              (url) => {
                                const updated = [...archives];
                                updated[idx].url = url;
                                setArchives(updated);
                              }
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Caption / Description
                    </label>
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => {
                        const updated = [...archives];
                        updated[idx].caption = e.target.value;
                        setArchives(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
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
              <span>
                {saving
                  ? "Saving Changes..."
                  : "Save Partnerships Settings"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}