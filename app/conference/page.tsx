import { supabaseAdmin } from "@/lib/supabaseServer";
import { conferenceData, ConferenceData } from "@/lib/conferenceData";
import { ConferenceClient } from "./ConferenceClient";

export const revalidate = 60; // Dynamic cache revalidation every 60 seconds

async function getConferenceData(): Promise<ConferenceData> {
  try {
    const { data: s } = await supabaseAdmin
      .from("conference_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!s) return conferenceData;

    return {
      hero: {
        breadcrumb: s.hero_breadcrumb?.length
          ? s.hero_breadcrumb
          : conferenceData.hero.breadcrumb,
        title: s.hero_title ?? conferenceData.hero.title,
        description: s.hero_description ?? conferenceData.hero.description,
        buttonText: s.hero_button_text ?? conferenceData.hero.buttonText,
        buttonLink: s.hero_button_link ?? conferenceData.hero.buttonLink,
        backgroundImage:
          s.hero_background_image ?? conferenceData.hero.backgroundImage,
        backgroundImageMobile:
          s.hero_background_image_mobile ??
          s.hero_background_image ??
          conferenceData.hero.backgroundImageMobile,
      },
      featuredConference: {
        tag: s.featured_tag ?? conferenceData.featuredConference.tag,
        title: s.featured_title ?? conferenceData.featuredConference.title,
        theme: s.featured_theme ?? conferenceData.featuredConference.theme,
        date: s.featured_date ?? conferenceData.featuredConference.date,
        location:
          s.featured_location ?? conferenceData.featuredConference.location,
        highlights: s.featured_highlights?.length
          ? s.featured_highlights
          : conferenceData.featuredConference.highlights,
        detailsLink:
          s.featured_details_link ??
          conferenceData.featuredConference.detailsLink,
        brochureLink:
          s.featured_brochure_link ??
          conferenceData.featuredConference.brochureLink,
        image: s.featured_image ?? conferenceData.featuredConference.image,
        imageMobile:
          s.featured_image_mobile ??
          s.featured_image ??
          conferenceData.featuredConference.imageMobile,
      },
      forumsSection: {
        tag: s.forums_tag ?? conferenceData.forumsSection.tag,
        title: s.forums_title ?? conferenceData.forumsSection.title,
        description:
          s.forums_description ?? conferenceData.forumsSection.description,
        buttonText:
          s.forums_button_text ?? conferenceData.forumsSection.buttonText,
        buttonLink:
          s.forums_button_link ?? conferenceData.forumsSection.buttonLink,
        forums: s.forums?.length ? s.forums : conferenceData.forumsSection.forums,
      },
      upcomingEventsSection: {
        tag: s.upcoming_tag ?? conferenceData.upcomingEventsSection.tag,
        title: s.upcoming_title ?? conferenceData.upcomingEventsSection.title,
        description:
          s.upcoming_description ??
          conferenceData.upcomingEventsSection.description,
        events: s.upcoming_events?.length
          ? s.upcoming_events
          : conferenceData.upcomingEventsSection.events,
      },
      gallerySection: {
        tag: s.gallery_tag ?? conferenceData.gallerySection.tag,
        title: s.gallery_title ?? conferenceData.gallerySection.title,
        description:
          s.gallery_description ?? conferenceData.gallerySection.description,
        images: s.gallery_images?.length
          ? s.gallery_images
          : conferenceData.gallerySection.images,
      },
    };
  } catch {
    return conferenceData;
  }
}

export default async function ConferencePage() {
  const data = await getConferenceData();

  return <ConferenceClient data={data} />;
}