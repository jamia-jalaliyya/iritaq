'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Download, Monitor } from 'lucide-react';
import { ConferenceData } from '@/lib/conferenceData';

interface ConferenceClientProps {
  data: ConferenceData;
}

export function ConferenceClient({ data }: ConferenceClientProps) {
  const {
    hero,
    featuredConference,
    forumsSection,
    upcomingEventsSection,
    gallerySection,
  } = data;

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <div className="w-full mx-auto px-4 pt-6 md:pt-8">
        <section className="relative min-h-125 flex items-center justify-center text-white px-6 md:px-12 py-16 md:py-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200/20">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background Image */}
            <Image
              src={hero.backgroundImage}
              alt="Conference Backdrop Desktop"
              fill
              className="hidden md:block object-cover object-center opacity-70"
              priority
            />
            {/* Mobile Background Image */}
            <Image
              src={hero.backgroundImageMobile || hero.backgroundImage}
              alt="Conference Backdrop Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-amber-300 mb-4 font-medium tracking-wide">
              {hero.breadcrumb.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link
                    href={crumb.href}
                    className="hover:underline transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  {idx < hero.breadcrumb.length - 1 && <span>&gt;</span>}
                </div>
              ))}
            </nav>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-4 drop-shadow-sm">
              {hero.title}
            </h1>

            {/* Description */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-sm">
              {hero.description}
            </p>

            {/* CTA Button */}
            <a
              href={hero.buttonLink}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-lg"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>

      {/* 2. UPCOMING INTERNATIONAL CONFERENCE (FEATURED) */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Feature Image with Accent Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 z-10">
              {/* Desktop Image */}
              <Image
                src={featuredConference.image}
                alt={featuredConference.title}
                fill
                className="hidden md:block object-cover"
              />
              {/* Mobile Image */}
              <Image
                src={
                  featuredConference.imageMobile || featuredConference.image
                }
                alt={featuredConference.title}
                fill
                className="block md:hidden object-cover"
              />
            </div>

            {/* Decorative Accent Box */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-2 border-amber-400 rounded-2xl pointer-events-none z-0 hidden sm:block" />
          </div>

          {/* Right Conference Information */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                {featuredConference.tag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-800 leading-snug mb-3">
              {featuredConference.title}
            </h2>

            <p className="text-emerald-800 text-sm sm:text-base font-medium mb-6">
              Theme: {featuredConference.theme}
            </p>

            <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>{featuredConference.date}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>{featuredConference.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 text-xs sm:text-sm text-slate-700">
              {featuredConference.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={featuredConference.detailsLink}
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition shadow-xs"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={featuredConference.brochureLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition shadow-xs"
              >
                <span>Download Brochure</span>
                <Download className="w-4 h-4 text-slate-600" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIVERSE FORUMS FOR KNOWLEDGE EXCHANGE */}
      <section className="py-16 md:py-24 bg-[#f8f6f0] border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                {forumsSection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
              {forumsSection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              {forumsSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {forumsSection.forums.map((forum) => (
              <div
                key={forum.number}
                className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-amber-500 font-serif text-lg font-light mb-4 block">
                    {forum.number}
                  </span>
                  <h3 className="text-xl font-serif text-slate-800 mb-3">
                    {forum.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {forum.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href={forumsSection.buttonLink}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-7 py-3 rounded-full transition shadow-xs"
            >
              <span>{forumsSection.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CALENDAR OF FORTHCOMING GATHERINGS */}
      <section id="upcoming-events" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
              {upcomingEventsSection.tag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            {upcomingEventsSection.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            {upcomingEventsSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEventsSection.events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                  {/* Desktop Image */}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="hidden md:block object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Mobile Image */}
                  <Image
                    src={event.imageMobile || event.image}
                    alt={event.title}
                    fill
                    className="block md:hidden object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-medium px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    {event.type === 'In-Person' ? (
                      <MapPin className="w-3 h-3 text-emerald-800" />
                    ) : (
                      <Monitor className="w-3 h-3 text-sky-600" />
                    )}
                    <span>{event.type}</span>
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-slate-800 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-700 font-medium mb-3">
                    Theme: {event.theme}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={event.link}
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-700 text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PAST EVENTS GALLERY */}
      <section className="py-16 md:py-24 bg-[#f8f6f0] border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                {gallerySection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
              {gallerySection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              {gallerySection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallerySection.images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                {/* Desktop Image */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="hidden md:block object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Mobile Image */}
                <Image
                  src={img.srcMobile || img.src}
                  alt={img.alt}
                  fill
                  className="block md:hidden object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}