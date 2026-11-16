'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Monitor, X, Clock } from 'lucide-react';
import { ConferenceData, EventCard } from '@/lib/conferenceData';

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

  // State for Event Details Popup Modal
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);

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
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="hidden md:block object-cover"
              />
              {/* Mobile Image */}
              <Image
                src={
                  featuredConference.imageMobile || featuredConference.image
                }
                alt={featuredConference.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="hidden md:block object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Mobile Image */}
                  <Image
                    src={event.imageMobile || event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                {/* Popup Trigger Button */}
                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-700 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="hidden md:block object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Mobile Image */}
                <Image
                  src={img.srcMobile || img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="block md:hidden object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT DETAILS POPUP MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <Image
                src={selectedEvent.imageMobile || selectedEvent.image}
                alt={selectedEvent.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 transition cursor-pointer backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Type Badge & Date */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-widest uppercase bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-md">
                  {selectedEvent.type}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300 bg-slate-950/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-amber-500/30">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedEvent.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-amber-700 uppercase block mb-1">
                  Theme: {selectedEvent.theme}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 leading-snug">
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Location
                    </span>
                    <span className="font-medium text-slate-800">{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Format
                    </span>
                    <span className="font-medium text-slate-800">{selectedEvent.type} Gathering</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer shadow-md"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}