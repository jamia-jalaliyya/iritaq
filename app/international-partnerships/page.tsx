import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { defaultInternationalPartnershipsData as fallbackData } from "@/lib/internationalPartnershipsDefaultData";

export const revalidate = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function InternationalPartnershipsPage() {
  let data = fallbackData;

  try {
    const { data: dbData, error } = await supabase
      .from("international_partnerships_settings")
      .select("*")
      .eq("slug", "partnerships-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching international partnerships data:", error.message);
    }

    if (dbData) {
      data = {
        hero: dbData.hero || fallbackData.hero,
        overview: dbData.overview || fallbackData.overview,
        partners: dbData.partners || fallbackData.partners,
        archives: dbData.archives || fallbackData.archives,
      };
    }
  } catch (err: unknown) {
    console.error("Unexpected error loading partnerships page data:", err);
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 font-sans pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="w-full pt-4 md:pt-6 px-4">
        <div className="relative w-full min-h-105 md:min-h-120 flex items-end text-white px-6 md:px-16 py-12 md:py-16 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={data.hero.bgImageUrl}
              alt="International Partnerships Hero"
              fill
              className="hidden md:block object-cover object-center scale-105"
              priority
            />
            <Image
              src={data.hero.mobileBgImageUrl}
              alt="International Partnerships Hero Mobile"
              fill
              className="block md:hidden object-cover object-center scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-6">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-amber-400 font-semibold tracking-wide">International Partnerships</span>
            </nav>

            <div className="inline-flex items-center gap-3 mb-4 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
              <div className="w-6 h-0.5 bg-amber-500 rounded-full" />
              <span className="text-xs tracking-widest uppercase font-semibold text-amber-400">
                {data.hero.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-4 leading-tight">
              {data.hero.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
              {data.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* BRIEF DESCRIPTION SECTION ABOUT IRITAQ'S INTERNATIONAL CONNECTIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-semibold tracking-widest uppercase">
              GLOBAL OUTREACH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-4">
            {data.overview.title}
          </h2>
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {data.overview.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2 & 3 & 4. PARTNERS SECTION (CARDS DYNAMICALLY LOADED + 3 FALLBACKS) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-semibold tracking-widest uppercase">
              NETWORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
            Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-amber-300 transition"
            >
              <div>
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-6 flex items-center justify-center">
                  {partner.logoUrl ? (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-400">LOGO</span>
                  )}
                </div>

                <h3 className="text-xl font-serif text-slate-800 mb-3">
                  {partner.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {partner.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800 transition"
                >
                  <span>Know the partner</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ARCHIVES SECTION (PURE PHOTO GALLERY WITH FALLBACKS) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-[11px] font-semibold tracking-widest uppercase">
              GALLERY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-2">
            Archives
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
            Visual chronicles of partner-related events, delegations, and news updates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.archives.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-4/3 rounded-2xl overflow-hidden group bg-slate-200 border border-slate-200 shadow-xs"
            >
              <Image
                src={img.url}
                alt={img.caption || `Archive image ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                <span className="text-white text-xs font-medium leading-snug">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}