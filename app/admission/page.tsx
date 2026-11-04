import { supabaseAdmin } from "@/lib/supabaseServer";
import { admissionsData, AdmissionsData } from "@/lib/admissionsData";
import { AdmissionClient } from "./AdmissionClient";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getAdmissionsData(): Promise<AdmissionsData> {
  try {
    const { data: s } = await supabaseAdmin
      .from("admissions_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!s) return admissionsData;

    return {
      hero: {
        breadcrumb: s.hero_breadcrumb?.length
          ? s.hero_breadcrumb
          : admissionsData.hero.breadcrumb,
        tagline: s.hero_tagline ?? admissionsData.hero.tagline,
        headline: s.hero_headline ?? admissionsData.hero.headline,
        subheading: s.hero_subheading ?? admissionsData.hero.subheading,
        bgImage: s.hero_bg_image ?? admissionsData.hero.bgImage,
        bgImageMobile:
          s.hero_bg_image_mobile ??
          s.hero_bg_image ??
          admissionsData.hero.bgImageMobile,
      },
      programs: s.programs?.length ? s.programs : admissionsData.programs,
      featuredProgram: s.featured_program ?? admissionsData.featuredProgram,
      requirements: s.requirements?.length
        ? s.requirements
        : admissionsData.requirements,
      steps: s.steps?.length ? s.steps : admissionsData.steps,
      deadlines: s.deadlines?.length ? s.deadlines : admissionsData.deadlines,
      faqs: s.faqs?.length ? s.faqs : admissionsData.faqs,
    };
  } catch {
    return admissionsData;
  }
}

export default async function AdmissionsPage() {
  const data = await getAdmissionsData();

  return <AdmissionClient data={data} />;
}