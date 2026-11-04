import { createClient } from "@supabase/supabase-js";
import PublicationsPageClient from "./PublicationsPageClient";
import { publicationsData } from "@/lib/publicationsData";

export const revalidate = 60; // Revalidate cache every 60 seconds

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function PublicationsPage() {
  let pageData = null;

  try {
    const { data, error } = await supabase
      .from("publications_page_settings")
      .select("*")
      .eq("slug", "publications-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching publications settings from Supabase:", error.message);
    }

    if (data) {
      pageData = data;
    }
  } catch (err) {
    console.error("Unexpected error fetching publications page data:", err);
  }

  // Fallback defaults mapped from publicationsData.ts if database record is missing
  const hero = pageData?.hero || publicationsData.hero;
  const featuredSection = pageData?.featured_section || publicationsData.featuredSection;
  const browseSection = pageData?.browse_section || publicationsData.browseSection;
  const publications = pageData?.publications || publicationsData.publications;
  const cta = pageData?.cta || publicationsData.cta;

  return (
    <PublicationsPageClient
      hero={hero}
      featuredSection={featuredSection}
      browseSection={browseSection}
      publications={publications}
      cta={cta}
    />
  );
}