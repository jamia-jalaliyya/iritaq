import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Play,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import {
  defaultMediaData as fallbackData,
  MediaCategoryItem,
  FeaturedGalleryItem,
  PhotoAlbumItem,
  VideoGalleryItem,
  ConferenceGalleryItem,
  AcademicEventItem,
  InstitutionalEventItem,
  MediaListItem,
  PressCoverageItem,
} from "@/lib/mediaData";

export const revalidate = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function MediaCenterPage() {
  let data = fallbackData;

  try {
    const { data: dbData, error } = await supabase
      .from("media_page_settings")
      .select("*")
      .eq("slug", "media-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching media center settings from Supabase:", error.message);
    }

    if (dbData) {
      data = {
        hero: dbData.hero || fallbackData.hero,
        categories: dbData.categories || fallbackData.categories,
        featuredGalleries: dbData.featured_galleries || fallbackData.featuredGalleries,
        photoAlbums: dbData.photo_albums || fallbackData.photoAlbums,
        videoGallery: dbData.video_gallery || fallbackData.videoGallery,
        conferenceGalleries: dbData.conference_galleries || fallbackData.conferenceGalleries,
        academicEvents: dbData.academic_events || fallbackData.academicEvents,
        institutionalEvents: dbData.institutional_events || fallbackData.institutionalEvents,
        lecturesList: dbData.lectures_list || fallbackData.lecturesList,
        interviewsList: dbData.interviews_list || fallbackData.interviewsList,
        pressCoverage: dbData.press_coverage || fallbackData.pressCoverage,
      };
    }
  } catch (err: unknown) {
    console.error("Unexpected error fetching media center data:", err);
  }

  return (
    <main className="w-full min-h-screen bg-[#faf8f5] text-slate-800 font-sans pb-20">
      
      {/* ==========================================
          1. HERO HEADER BANNER
      ========================================== */}
      <section className="w-full mx-auto px-4 sm:px-4 md:px-4 pt-6 sm:pt-8">
        <div className="relative w-full min-h-95 md:min-h-110 flex items-center px-6 md:px-16 py-12 md:py-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={data.hero.backgroundImage}
              alt="IRITAQ Media Center Archive"
              fill
              className="hidden md:block object-cover object-center opacity-35"
              priority
            />
            <Image
              src={data.hero.mobileBackgroundImage || data.hero.backgroundImage}
              alt="IRITAQ Media Center Archive Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-6 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-amber-400 font-normal">Media Center</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-6 leading-tight">
              {data.hero.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              {data.hero.description}
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. PURE BUTTON FILTER NAVIGATION BAR (REDIRECTS)
      ========================================== */}
      <section className="w-full bg-[#f4f0e6] border-y border-amber-200/60 py-4 px-4 sm:px-8 mt-6 sticky top-0 z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {data.categories.map((cat: MediaCategoryItem) => (
              <a
                key={cat.targetId}
                href={`#${cat.targetId}`}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white/90 hover:bg-[#0c3823] hover:text-white text-slate-700 border border-amber-200/60 transition-all shadow-2xs"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURED GALLERY (CURATED)
      ========================================== */}
      <section id="featured-gallery" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              CURATED
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Featured Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Explore prominent highlights and milestone events captured by our official media liaisons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.featuredGalleries.map((item: FeaturedGalleryItem) => (
            <div
              key={item.id}
              className="bg-[#f7f4ed] rounded-3xl overflow-hidden border border-amber-200/70 shadow-2xs flex flex-col justify-between group hover:border-amber-300 transition"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#e8f0eb] text-[#0c3823] text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                      {item.category}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-slate-800 leading-snug mb-3 group-hover:text-[#0c3823] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-amber-200/40 mt-4">
                <span className="text-xs text-slate-500 font-medium">
                  {item.photosCount} Photos {item.videosCount ? `• ${item.videosCount} Videos` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c3823]">
                  <span>View Highlights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          PHOTO GALLERY (IMAGERY)
      ========================================== */}
      <section id="photo-gallery" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              IMAGERY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Photo Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Explore high-resolution visual records from our domestic campus and overseas research fellowships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.photoAlbums.map((album: PhotoAlbumItem) => (
            <div
              key={album.id}
              className="relative aspect-4/3 rounded-2xl overflow-hidden group border border-slate-800/10 shadow-md bg-slate-950 flex flex-col justify-end p-6 text-white"
            >
              <Image
                src={album.image}
                alt={album.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-serif font-medium text-white mb-1">
                    {album.title}
                  </h3>
                  <span className="text-xs text-emerald-300 font-medium">
                    {album.photoCount} Photos
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          VIDEO GALLERY
      ========================================== */}
      <section id="video-gallery" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              VIDEOGRAPHY & MULTIMEDIA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Video Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Watch curated video streams, YouTube/Instagram features, and media files uploaded by administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.videoGallery.map((vid: VideoGalleryItem) => {
            const isEmbed =
              vid.videoUrl &&
              (vid.videoUrl.includes("youtube.com") ||
                vid.videoUrl.includes("youtu.be") ||
                vid.videoUrl.includes("instagram.com"));

            return (
              <div
                key={vid.id}
                className="bg-[#f7f4ed] rounded-3xl overflow-hidden border border-amber-200/70 p-5 shadow-2xs flex flex-col justify-between group hover:border-amber-300 transition"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-4">
                    {isEmbed ? (
                      <iframe
                        src={vid.videoUrl!.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                        title={vid.title}
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : vid.videoFileUrl ? (
                      <video
                        src={vid.videoFileUrl}
                        controls
                        poster={vid.thumbnail}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={vid.thumbnail || "/images/hero-bg.png"}
                          alt={vid.title}
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[#0c3823] text-[10px] font-bold tracking-widest uppercase block mb-1">
                    {vid.category || "Featured Video"}
                  </span>

                  <h3 className="text-lg font-serif text-slate-800 leading-snug mb-2">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200/40 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{vid.date}</span>
                  {vid.videoUrl && (
                    <a
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 hover:underline font-bold"
                    >
                      <span>Watch Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          CONFERENCE GALLERY (ACADEMIC SYMPOSIUM)
      ========================================== */}
      <section id="conference-gallery" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              ACADEMIC SYMPOSIUM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Conference Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Annual events focusing on classical exegesis frameworks, translation methodologies, and codicological cataloging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.conferenceGalleries.map((cg: ConferenceGalleryItem) => (
            <div
              key={cg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-100 mb-5">
                  <Image
                    src={cg.image}
                    alt={cg.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-amber-800 font-bold">{cg.locationTag}</span>
                  <span className="text-slate-400">{cg.date}</span>
                </div>

                <h3 className="text-xl font-serif text-slate-800 leading-snug mb-4">
                  {cg.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                {cg.photosCount} Photos {cg.videosCount ? `• ${cg.videosCount} Videos` : ""}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          ACADEMIC EVENTS (WORKSHOPS & SEMINARS)
      ========================================== */}
      <section id="academic-events" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              WORKSHOPS & SEMINARS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Academic Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Visual records of specialized training programs, exegesis workshops, and visiting scholar guest lectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.academicEvents.map((ae: AcademicEventItem) => (
            <div
              key={ae.id}
              className="bg-[#f7f4ed] rounded-3xl p-6 border border-amber-200/70 shadow-2xs flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="relative w-full sm:w-44 aspect-square rounded-2xl overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src={ae.image}
                  alt={ae.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-100 text-[#0c3823] font-bold px-3 py-0.5 rounded-full uppercase text-[10px]">
                    {ae.category}
                  </span>
                  <span className="text-slate-500 font-medium">{ae.date}</span>
                </div>

                <h3 className="text-lg font-serif text-slate-800 leading-snug">
                  {ae.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ae.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          INSTITUTIONAL EVENTS (DIPLOMACY & MILESTONES)
      ========================================== */}
      <section id="institutional-events" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#0c3823]" />
            <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
              DIPLOMACY & MILESTONES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 font-light mb-3">
            Institutional Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Visual records of IRITAQ governance meetings, board proceedings, and official foundation celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.institutionalEvents.map((ie: InstitutionalEventItem) => (
            <div
              key={ie.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-100 mb-5">
                  <Image
                    src={ie.image}
                    alt={ie.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="text-slate-400 text-xs font-medium block mb-2">
                  {ie.date}
                </span>

                <h3 className="text-xl font-serif text-slate-800 leading-snug mb-3">
                  {ie.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {ie.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                {ie.photosCount} Photos {ie.videosCount ? `• ${ie.videosCount} Video` : ""}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          LECTURES & INTERVIEWS (2-COLUMN LISTS)
      ========================================== */}
      <section id="lectures-interviews" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Lectures */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-0.5 bg-[#0c3823]" />
                <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
                  ACADEMIC PRESENT
                </span>
              </div>
              <h2 className="text-3xl font-serif text-slate-800 font-light">
                Lectures
              </h2>
            </div>

            <div className="space-y-4">
              {data.lecturesList.map((lec: MediaListItem) => (
                <div
                  key={lec.id}
                  className="bg-[#f7f4ed] p-4 rounded-2xl border border-amber-200/60 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <Image
                        src={lec.thumbnail}
                        alt={lec.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-medium text-slate-800 leading-snug">
                        {lec.title}
                      </h3>
                      <p className="text-xs text-slate-500">{lec.subtitle}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>{lec.date}</span>
                        {lec.duration && (
                          <span className="text-amber-800 font-bold">
                            {lec.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interviews */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-0.5 bg-[#0c3823]" />
                <span className="text-[#0c3823] text-[11px] font-bold tracking-widest uppercase">
                  CONVERSATIONS
                </span>
              </div>
              <h2 className="text-3xl font-serif text-slate-800 font-light">
                Interviews
              </h2>
            </div>

            <div className="space-y-4">
              {data.interviewsList.map((int: MediaListItem) => (
                <div
                  key={int.id}
                  className="bg-[#f7f4ed] p-4 rounded-2xl border border-amber-200/60 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <Image
                        src={int.thumbnail}
                        alt={int.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-medium text-slate-800 leading-snug">
                        {int.title}
                      </h3>
                      <p className="text-xs text-slate-500">{int.subtitle}</p>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {int.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          PRESS COVERAGE (DARK SECTION)
      ========================================== */}
      <section id="press-coverage" className="w-full bg-[#121714] text-white py-16 px-6 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-emerald-500" />
              <span className="text-emerald-400 text-[11px] font-bold tracking-widest uppercase">
                GLOBAL RECOGNITION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mb-3">
              Press Coverage
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              How international and regional media outlets report on IRITAQ&apos;s academic milestones and global partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.pressCoverage.map((pc: PressCoverageItem) => (
              <div
                key={pc.id}
                className="bg-[#1b221e] rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-emerald-800 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-amber-400 font-bold">{pc.source}</span>
                    <span className="text-slate-500 text-[11px]">{pc.date}</span>
                  </div>

                  <h3 className="text-base font-serif text-white leading-snug mb-3">
                    {pc.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {pc.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={pc.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Read Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}