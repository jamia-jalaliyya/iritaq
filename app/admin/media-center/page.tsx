"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import {
  defaultMediaData as DEFAULT_DATA,
  VideoGalleryItem,
  PhotoAlbumItem,
  FeaturedGalleryItem,
  ConferenceGalleryItem,
  AcademicEventItem,
  InstitutionalEventItem,
  MediaListItem,
  PressCoverageItem,
} from "@/lib/mediaData";
import {
  Loader2,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Settings,
  Video,
} from "lucide-react";


export default function MediaAdminPage() {
  // Hero State
  const [heroTitle, setHeroTitle] = useState(DEFAULT_DATA.hero.title);
  const [heroDesc, setHeroDesc] = useState(DEFAULT_DATA.hero.description);
  const [heroBg, setHeroBg] = useState(DEFAULT_DATA.hero.backgroundImage);
  const [heroMobileBg, setHeroMobileBg] = useState(
    DEFAULT_DATA.hero.mobileBackgroundImage
  );

  // Sections State
  const [videoGallery, setVideoGallery] = useState<VideoGalleryItem[]>(
    DEFAULT_DATA.videoGallery
  );
  const [photoAlbums, setPhotoAlbums] = useState<PhotoAlbumItem[]>(
    DEFAULT_DATA.photoAlbums
  );
  const [featuredGalleries, setFeaturedGalleries] = useState<FeaturedGalleryItem[]>(
    DEFAULT_DATA.featuredGalleries
  );
  const [conferenceGalleries, setConferenceGalleries] = useState<ConferenceGalleryItem[]>(
    DEFAULT_DATA.conferenceGalleries
  );
  const [academicEvents, setAcademicEvents] = useState<AcademicEventItem[]>(
    DEFAULT_DATA.academicEvents
  );
  const [institutionalEvents, setInstitutionalEvents] = useState<InstitutionalEventItem[]>(
    DEFAULT_DATA.institutionalEvents
  );
  const [lecturesList, setLecturesList] = useState<MediaListItem[]>(
    DEFAULT_DATA.lecturesList
  );
  const [interviewsList, setInterviewsList] = useState<MediaListItem[]>(
    DEFAULT_DATA.interviewsList
  );
  const [pressCoverage, setPressCoverage] = useState<PressCoverageItem[]>(
    DEFAULT_DATA.pressCoverage
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMediaSettings() {
      try {
        const { data, error } = await supabase
          .from("media_page_settings")
          .select("*")
          .eq("slug", "media-page")
          .maybeSingle();

        let pageData = data;

        if (!pageData) {
          const initialPayload = {
            slug: "media-page",
            hero: DEFAULT_DATA.hero,
            categories: DEFAULT_DATA.categories,
            featured_galleries: DEFAULT_DATA.featuredGalleries,
            photo_albums: DEFAULT_DATA.photoAlbums,
            video_gallery: DEFAULT_DATA.videoGallery,
            conference_galleries: DEFAULT_DATA.conferenceGalleries,
            academic_events: DEFAULT_DATA.academicEvents,
            institutional_events: DEFAULT_DATA.institutionalEvents,
            lectures_list: DEFAULT_DATA.lecturesList,
            interviews_list: DEFAULT_DATA.interviewsList,
            press_coverage: DEFAULT_DATA.pressCoverage,
          };

          await supabase
            .from("media_page_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          pageData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching media settings:", error.message);
        }

        if (pageData) {
          if (pageData.hero) {
            setHeroTitle(pageData.hero.title || DEFAULT_DATA.hero.title);
            setHeroDesc(pageData.hero.description || DEFAULT_DATA.hero.description);
            setHeroBg(pageData.hero.backgroundImage || DEFAULT_DATA.hero.backgroundImage);
            setHeroMobileBg(
              pageData.hero.mobileBackgroundImage || DEFAULT_DATA.hero.mobileBackgroundImage
            );
          }
          if (Array.isArray(pageData.video_gallery)) setVideoGallery(pageData.video_gallery);
          if (Array.isArray(pageData.photo_albums)) setPhotoAlbums(pageData.photo_albums);
          if (Array.isArray(pageData.featured_galleries))
            setFeaturedGalleries(pageData.featured_galleries);
          if (Array.isArray(pageData.conference_galleries))
            setConferenceGalleries(pageData.conference_galleries);
          if (Array.isArray(pageData.academic_events))
            setAcademicEvents(pageData.academic_events);
          if (Array.isArray(pageData.institutional_events))
            setInstitutionalEvents(pageData.institutional_events);
          if (Array.isArray(pageData.lectures_list))
            setLecturesList(pageData.lectures_list);
          if (Array.isArray(pageData.interviews_list))
            setInterviewsList(pageData.interviews_list);
          if (Array.isArray(pageData.press_coverage))
            setPressCoverage(pageData.press_coverage);
        }
      } catch (err: unknown) {
        console.error("Error loading media admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMediaSettings();
  }, []);

  async function handleFileUpload(
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
      const filePath = `media-page/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      onSuccess(publicUrlData.publicUrl);
    } catch (error: unknown) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Check if bucket 'iritaq-media' exists and is public.");
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
        slug: "media-page",
        hero: {
          title: heroTitle,
          description: heroDesc,
          backgroundImage: heroBg,
          mobileBackgroundImage: heroMobileBg,
        },
        categories: DEFAULT_DATA.categories,
        featured_galleries: featuredGalleries,
        photo_albums: photoAlbums,
        video_gallery: videoGallery,
        conference_galleries: conferenceGalleries,
        academic_events: academicEvents,
        institutional_events: institutionalEvents,
        lectures_list: lecturesList,
        interviews_list: interviewsList,
        press_coverage: pressCoverage,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("media_page_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage("Media Center settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving media settings:", error);
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
        <span className="ml-3 font-medium text-sm">Loading Media Admin...</span>
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
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                ADMIN DASHBOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">
              Manage Media Center
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
              1. Hero Header
            </h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 2. FEATURED GALLERIES SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                2. Featured Galleries ({featuredGalleries.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setFeaturedGalleries([
                    ...featuredGalleries,
                    {
                      id: String(Date.now()),
                      category: "Conference Gallery",
                      categorySlug: "conference-gallery",
                      date: "2024",
                      title: "New Featured Gallery",
                      description: "Description...",
                      photosCount: 10,
                      image: "/images/media/placeholder.jpg",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Featured Item
              </button>
            </div>

            <div className="space-y-6">
              {featuredGalleries.map((fg, idx) => (
                <div key={fg.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Featured #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setFeaturedGalleries(featuredGalleries.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={fg.title}
                        onChange={(e) => {
                          const updated = [...featuredGalleries];
                          updated[idx].title = e.target.value;
                          setFeaturedGalleries(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date</label>
                      <input
                        type="text"
                        value={fg.date}
                        onChange={(e) => {
                          const updated = [...featuredGalleries];
                          updated[idx].date = e.target.value;
                          setFeaturedGalleries(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={fg.description}
                      onChange={(e) => {
                        const updated = [...featuredGalleries];
                        updated[idx].description = e.target.value;
                        setFeaturedGalleries(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={fg.image}
                        onChange={(e) => {
                          const updated = [...featuredGalleries];
                          updated[idx].image = e.target.value;
                          setFeaturedGalleries(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingField === `fg-${idx}` ? "Uploading..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `fg-${idx}`, (url) => {
                              const updated = [...featuredGalleries];
                              updated[idx].image = url;
                              setFeaturedGalleries(updated);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. PHOTO GALLERIES / ALBUMS SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                3. Photo Albums ({photoAlbums.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setPhotoAlbums([
                    ...photoAlbums,
                    {
                      id: String(Date.now()),
                      title: "New Photo Album",
                      photoCount: 12,
                      image: "/images/media/placeholder.jpg",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Album
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {photoAlbums.map((album, idx) => (
                <div key={album.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Album #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setPhotoAlbums(photoAlbums.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Album Title</label>
                    <input
                      type="text"
                      value={album.title}
                      onChange={(e) => {
                        const updated = [...photoAlbums];
                        updated[idx].title = e.target.value;
                        setPhotoAlbums(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Photo Count</label>
                    <input
                      type="number"
                      value={album.photoCount}
                      onChange={(e) => {
                        const updated = [...photoAlbums];
                        updated[idx].photoCount = Number(e.target.value);
                        setPhotoAlbums(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Cover Image URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={album.image}
                        onChange={(e) => {
                          const updated = [...photoAlbums];
                          updated[idx].image = e.target.value;
                          setPhotoAlbums(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingField === `album-${idx}` ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileUpload(e.target.files[0], `album-${idx}`, (url) => {
                              const updated = [...photoAlbums];
                              updated[idx].image = url;
                              setPhotoAlbums(updated);
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. VIDEO GALLERY SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                4. Video Gallery ({videoGallery.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setVideoGallery([
                    ...videoGallery,
                    {
                      id: String(Date.now()),
                      category: "LECTURE",
                      date: "2024",
                      title: "New Video Title",
                      description: "Video summary...",
                      thumbnail: "/images/media/placeholder.jpg",
                      videoUrl: "https://www.youtube.com/watch?v=...",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Video
              </button>
            </div>

            <div className="space-y-6">
              {videoGallery.map((vid, idx) => (
                <div key={vid.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Video #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setVideoGallery(videoGallery.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={vid.title}
                        onChange={(e) => {
                          const updated = [...videoGallery];
                          updated[idx].title = e.target.value;
                          setVideoGallery(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category Tag</label>
                      <input
                        type="text"
                        value={vid.category}
                        onChange={(e) => {
                          const updated = [...videoGallery];
                          updated[idx].category = e.target.value;
                          setVideoGallery(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        YouTube / Instagram Embed Link
                      </label>
                      <input
                        type="text"
                        value={vid.videoUrl || ""}
                        onChange={(e) => {
                          const updated = [...videoGallery];
                          updated[idx].videoUrl = e.target.value;
                          setVideoGallery(updated);
                        }}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        OR Upload Video File
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={vid.videoFileUrl || ""}
                          onChange={(e) => {
                            const updated = [...videoGallery];
                            updated[idx].videoFileUrl = e.target.value;
                            setVideoGallery(updated);
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                        <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                          <Video className="w-3.5 h-3.5" />
                          <span>{uploadingField === `vidfile-${idx}` ? "..." : "Upload File"}</span>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleFileUpload(e.target.files[0], `vidfile-${idx}`, (url) => {
                                const updated = [...videoGallery];
                                updated[idx].videoFileUrl = url;
                                setVideoGallery(updated);
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. PRESS COVERAGE SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">
                5. Press Coverage ({pressCoverage.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setPressCoverage([
                    ...pressCoverage,
                    {
                      id: String(Date.now()),
                      source: "Newspaper Name",
                      date: "2024",
                      title: "Press Coverage Headline",
                      summary: "Summary of coverage...",
                      link: "https://",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Press Item
              </button>
            </div>

            <div className="space-y-6">
              {pressCoverage.map((pc, idx) => (
                <div key={pc.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Press Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setPressCoverage(pressCoverage.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Headline</label>
                      <input
                        type="text"
                        value={pc.title}
                        onChange={(e) => {
                          const updated = [...pressCoverage];
                          updated[idx].title = e.target.value;
                          setPressCoverage(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Source Outlet</label>
                      <input
                        type="text"
                        value={pc.source}
                        onChange={(e) => {
                          const updated = [...pressCoverage];
                          updated[idx].source = e.target.value;
                          setPressCoverage(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Summary</label>
                    <textarea
                      rows={2}
                      value={pc.summary}
                      onChange={(e) => {
                        const updated = [...pressCoverage];
                        updated[idx].summary = e.target.value;
                        setPressCoverage(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Article Link URL</label>
                    <input
                      type="text"
                      value={pc.link}
                      onChange={(e) => {
                        const updated = [...pressCoverage];
                        updated[idx].link = e.target.value;
                        setPressCoverage(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SAVE BUTTON */}
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
              <span>{saving ? "Saving Changes..." : "Save Media Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}