import { createClient } from "@supabase/supabase-js";
import { researchData } from "@/lib/researchData";
import ResearchPageClient from "./ResearchPageClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Ensure the page fetches fresh updates on every request
export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  let pageData = null;

  try {
    const { data, error } = await supabase
      .from("research_page_settings")
      .select("*")
      .eq("slug", "research-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching research page settings from Supabase:", error.message);
    }

    pageData = data;
  } catch (err) {
    console.error("Failed to connect to Supabase for research page:", err);
  }

  // Fallback to local researchData if database hasn't been saved yet
  const hero = pageData?.hero || researchData.hero;
  const navigationCards = pageData?.navigation_cards || researchData.navigationCards;
  const stats = pageData?.stats || researchData.stats;
  const domains = pageData?.domains || researchData.domains;
  const ongoingProjects = pageData?.ongoing_projects || researchData.ongoingProjects;
  const cta = pageData?.cta || researchData.cta;

  return (
    <ResearchPageClient
      hero={hero}
      navigationCards={navigationCards}
      stats={stats}
      domains={domains}
      ongoingProjects={ongoingProjects}
      cta={cta}
    />
  );
}