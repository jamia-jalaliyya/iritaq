import { createClient } from "@supabase/supabase-js";
import NewsPageClient from "./NewsPageClient";
import {
  newsHero,
  featuredMainStory,
  featuredSideStories,
  newsCategories,
  initialNewsGridItems,
  officialPressReleases,
  conferenceHighlights,
} from "@/lib/newsData";

export const revalidate = 60; // Revalidate cache every 60 seconds

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function NewsPage() {
  let pageData = null;

  try {
    const { data, error } = await supabase
      .from("news_page_settings")
      .select("*")
      .eq("slug", "news-page")
      .maybeSingle();

    if (error) {
      console.error("Error fetching news settings from Supabase:", error.message);
    }

    if (data) {
      pageData = data;
    }
  } catch (err) {
    console.error("Unexpected error fetching news page data:", err);
  }

  // Fallback defaults mapped from newsData.ts if database record is missing
  const hero = pageData?.hero || newsHero;
  const sectionHeaders = pageData?.section_headers || {
    latestNewsBadge: "LATEST NEWS",
    latestNewsTitle: "Featured Stories",
    pressTitle: "Official Press Releases",
    confTitle: "Highlights from Recent Events",
  };
  const categories = pageData?.categories || newsCategories;
  const mainStory = pageData?.featured_main_story || featuredMainStory;
  const sideStories = pageData?.featured_side_stories || featuredSideStories;
  const newsGrid = pageData?.news_grid || initialNewsGridItems;
  const pressReleases = pageData?.press_releases || officialPressReleases;
  const confHighlights = pageData?.conference_highlights || conferenceHighlights;

  return (
    <NewsPageClient
      hero={hero}
      sectionHeaders={sectionHeaders}
      categories={categories}
      mainStory={mainStory}
      sideStories={sideStories}
      newsGrid={newsGrid}
      pressReleases={pressReleases}
      conferenceHighlights={confHighlights}
    />
  );
}