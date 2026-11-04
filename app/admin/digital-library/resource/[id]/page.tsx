"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import { sampleResourceDetail } from "@/lib/digitalLibraryDetailData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Settings } from "lucide-react";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DigitalLibraryResourceAdminPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const resourceId = resolvedParams.id || "res-1";

  // Form States
  const [title, setTitle] = useState(sampleResourceDetail.title);
  const [subtitle, setSubtitle] = useState(sampleResourceDetail.subtitle);
  const [category, setCategory] = useState(sampleResourceDetail.category);
  const [categorySlug, setCategorySlug] = useState(sampleResourceDetail.categorySlug);
  const [author, setAuthor] = useState(sampleResourceDetail.author);
  const [language, setLanguage] = useState(sampleResourceDetail.language);
  const [status, setStatus] = useState<"PUBLISHED" | "SCHEDULED" | "ARCHIVED">(sampleResourceDetail.status);
  const [heroImage, setHeroImage] = useState(sampleResourceDetail.heroImage);
  const [mobileHeroImage, setMobileHeroImage] = useState(sampleResourceDetail.mobileHeroImage);
  
  const [paragraphs, setParagraphs] = useState<string[]>(sampleResourceDetail.paragraphs);
  
  const [pdfUrl, setPdfUrl] = useState(sampleResourceDetail.mediaDocuments.pdfUrl || "");
  const [externalLink, setExternalLink] = useState(sampleResourceDetail.mediaDocuments.externalLink || "");
  const [downloadPackageUrl, setDownloadPackageUrl] = useState(sampleResourceDetail.mediaDocuments.downloadPackageUrl || "");

  const [keywords, setKeywords] = useState<string[]>(sampleResourceDetail.keywords);
  const [citation, setCitation] = useState(sampleResourceDetail.citation);

  // Details Meta Box (Sidebar)
  const [detCategory, setDetCategory] = useState(sampleResourceDetail.details.category);
  const [detAuthor, setDetAuthor] = useState(sampleResourceDetail.details.author);
  const [detPublication, setDetPublication] = useState(sampleResourceDetail.details.publication);
  const [detLanguage, setDetLanguage] = useState(sampleResourceDetail.details.language);
  const [detPages, setDetPages] = useState<number>(Number(sampleResourceDetail.details.pages) || 120);
  const [detIsbn, setDetIsbn] = useState(sampleResourceDetail.details.isbn);

  // Related Resources ("More in Category")
  const [relatedResources, setRelatedResources] = useState(sampleResourceDetail.relatedResources);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResourceSettings() {
      try {
        let { data } = await supabase
          .from("digital_library_resource_settings")
          .select("*")
          .eq("id", resourceId)
          .maybeSingle();

        const { error } = await supabase
          .from("digital_library_resource_settings")
          .select("*")
          .eq("id", resourceId)
          .maybeSingle();

        if (!data) {
          const initialPayload = {
            id: resourceId,
            category: sampleResourceDetail.category,
            category_slug: sampleResourceDetail.categorySlug,
            title: sampleResourceDetail.title,
            subtitle: sampleResourceDetail.subtitle,
            author: sampleResourceDetail.author,
            language: sampleResourceDetail.language,
            status: sampleResourceDetail.status,
            hero_image: sampleResourceDetail.heroImage,
            mobile_hero_image: sampleResourceDetail.mobileHeroImage,
            paragraphs: sampleResourceDetail.paragraphs,
            media_documents: sampleResourceDetail.mediaDocuments,
            keywords: sampleResourceDetail.keywords,
            citation: sampleResourceDetail.citation,
            details: sampleResourceDetail.details,
            related_resources: sampleResourceDetail.relatedResources,
          };
          
          await supabase
            .from("digital_library_resource_settings")
            .upsert([initialPayload], { onConflict: "id" });
            
          data = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching resource settings:", error.message);
        }

        if (data) {
          setTitle(data.title || sampleResourceDetail.title);
          setSubtitle(data.subtitle || sampleResourceDetail.subtitle);
          setCategory(data.category || sampleResourceDetail.category);
          setCategorySlug(data.category_slug || sampleResourceDetail.categorySlug);
          setAuthor(data.author || sampleResourceDetail.author);
          setLanguage(data.language || sampleResourceDetail.language);
          setStatus((data.status as "PUBLISHED" | "SCHEDULED" | "ARCHIVED") || sampleResourceDetail.status);
          setHeroImage(data.hero_image || sampleResourceDetail.heroImage);
          setMobileHeroImage(data.mobile_hero_image || sampleResourceDetail.mobileHeroImage);
          
          if (data.paragraphs && Array.isArray(data.paragraphs)) setParagraphs(data.paragraphs);
          
          if (data.media_documents) {
            setPdfUrl(data.media_documents.pdfUrl || "");
            setExternalLink(data.media_documents.externalLink || "");
            setDownloadPackageUrl(data.media_documents.downloadPackageUrl || "");
          }
          
          if (data.keywords && Array.isArray(data.keywords)) setKeywords(data.keywords);
          setCitation(data.citation || sampleResourceDetail.citation);
          
          if (data.details) {
            setDetCategory(data.details.category || sampleResourceDetail.details.category);
            setDetAuthor(data.details.author || sampleResourceDetail.details.author);
            setDetPublication(data.details.publication || sampleResourceDetail.details.publication);
            setDetLanguage(data.details.language || sampleResourceDetail.details.language);
            setDetPages(Number(data.details.pages) || Number(sampleResourceDetail.details.pages));
            setDetIsbn(data.details.isbn || sampleResourceDetail.details.isbn);
          }
          
          if (data.related_resources && Array.isArray(data.related_resources)) {
            setRelatedResources(data.related_resources);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading resource admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResourceSettings();
  }, [resourceId]);

  async function handleImageUpload(file: File, fieldKey: string) {
    try {
      setUploadingField(fieldKey);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `digital-library-resource/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (fieldKey === "heroImage") setHeroImage(publicUrl);
      else if (fieldKey === "mobileHeroImage") setMobileHeroImage(publicUrl);
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Ensure bucket 'iritaq-media' exists in Supabase storage.");
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
        id: resourceId,
        category,
        category_slug: categorySlug,
        title,
        subtitle,
        author,
        language,
        status,
        hero_image: heroImage,
        mobile_hero_image: mobileHeroImage,
        paragraphs,
        media_documents: {
          pdfUrl,
          externalLink,
          downloadPackageUrl,
        },
        keywords,
        citation,
        details: {
          category: detCategory,
          author: detAuthor,
          publication: detPublication,
          language: detLanguage,
          pages: detPages,
          isbn: detIsbn,
        },
        related_resources: relatedResources,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("digital_library_resource_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Resource detail settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving resource settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Resource Admin...</span>
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
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">RESOURCE DETAIL MANAGER ({resourceId})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Manage Article Reader & Sidebar Detail</h1>
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
          
          {/* 1. HERO BANNER SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Article Hero Banner</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Category Name</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Category Slug</label>
                <input
                  type="text"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "PUBLISHED" | "SCHEDULED" | "ARCHIVED")}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Article Main Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subtitle / Short Summary</label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Desktop Hero Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'heroImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'heroImage')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Mobile Hero Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={mobileHeroImage}
                    onChange={(e) => setMobileHeroImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'mobileHeroImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'mobileHeroImage')}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 2. BODY CONTENT PARAGRAPHS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Body Paragraphs ({paragraphs.length})</h2>
              <button
                type="button"
                onClick={() => setParagraphs([...paragraphs, "New paragraph content..."])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Paragraph
              </button>
            </div>

            <div className="space-y-4">
              {paragraphs.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 mt-2">#{idx + 1}</span>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const updated = [...paragraphs];
                      updated[idx] = e.target.value;
                      setParagraphs(updated);
                    }}
                    className="flex-1 bg-white border border-slate-300 rounded-xl p-3 text-xs leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => setParagraphs(paragraphs.filter((_, i) => i !== idx))}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. MEDIA & DOCUMENTS */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Media & Documents Attachments</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">PDF Document URL</label>
                <input
                  type="text"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">External Link URL</label>
                <input
                  type="text"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Download Package URL</label>
                <input
                  type="text"
                  value={downloadPackageUrl}
                  onChange={(e) => setDownloadPackageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
          </section>

          {/* 4. DETAILS SIDEBAR METADATA & CITATION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">4. Sidebar Details & Citation</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setDetAuthor(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setDetLanguage(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Publication</label>
                <input
                  type="text"
                  value={detPublication}
                  onChange={(e) => setDetPublication(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Pages Count</label>
                <input
                  type="number"
                  value={detPages}
                  onChange={(e) => setDetPages(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">ISBN</label>
                <input
                  type="text"
                  value={detIsbn}
                  onChange={(e) => setDetIsbn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Category Detail</label>
                <input
                  type="text"
                  value={detCategory}
                  onChange={(e) => setDetCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Citation Text</label>
              <textarea
                rows={2}
                value={citation}
                onChange={(e) => setCitation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-serif"
              />
            </div>
          </section>

          {/* 5. RELATED RESOURCES */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">5. More in Category Sidebar List ({relatedResources.length})</h2>
              <button
                type="button"
                onClick={() => setRelatedResources([...relatedResources, { title: "New Related Item", link: "#" }])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Related Item
              </button>
            </div>

            <div className="space-y-4">
              {relatedResources.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...relatedResources];
                      updated[idx].title = e.target.value;
                      setRelatedResources(updated);
                    }}
                    placeholder="Title"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => {
                      const updated = [...relatedResources];
                      updated[idx].link = e.target.value;
                      setRelatedResources(updated);
                    }}
                    placeholder="Link URL"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setRelatedResources(relatedResources.filter((_, i) => i !== idx))}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
              <span>{saving ? "Saving Changes..." : "Save Resource Settings"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}