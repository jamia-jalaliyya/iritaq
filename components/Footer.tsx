"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111613] text-[#cfd4cf] font-sans border-t border-[#1e2520]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-12">
        
        {/* TOP MAIN GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#1e2520]">
          
          {/* Col 1: Brand / Institute Information with Logo */}
          <div className="lg:col-span-1 space-y-5">
            {/* Logo Container */}
            <div className="relative w-36 h-14">
              <Image
                src="/logo-iritaq.png"
                alt="IRITAQ Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>

            <h2 className="text-white font-serif font-light text-xl md:text-2xl leading-tight">
              International Research Institute for Tafsir Al-Qur&apos;an
            </h2>

            <p className="text-xs text-[#9da39d] font-light leading-relaxed">
              Advancing authentic Qur&apos;anic scholarship through research, publication and international collaboration.
            </p>

            {/* Social Icons (White Background & Black Icons) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-950 transition shadow-xs"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold text-slate-950">f</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-950 transition shadow-xs"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold text-slate-950">in</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-950 transition shadow-xs"
                aria-label="Twitter / X"
              >
                <span className="text-xs font-bold text-slate-950">𝕏</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-950 transition shadow-xs"
                aria-label="YouTube"
              >
                <span className="text-xs font-bold text-slate-950">▶</span>
              </a>
            </div>
          </div>

          {/* Col 2: Institute Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif font-medium tracking-wider text-[#d4af37] uppercase">
              Institute
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#b0b8b0]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About IRITAQ
                </Link>
              </li>
              <li>
                <Link href="/governance" className="hover:text-white transition-colors">
                  Governance
                </Link>
              </li>
              <li>
                <Link href="/academics/departments" className="hover:text-white transition-colors">
                  Academic Departments
                </Link>
              </li>
              <li>
                <Link href="/international-partnerships" className="hover:text-white transition-colors">
                  International Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academics Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif font-medium tracking-wider text-[#d4af37] uppercase">
              Academics
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#b0b8b0]">
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/academics/programs" className="hover:text-white transition-colors">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/digital-library" className="hover:text-white transition-colors">
                  Digital Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Engage Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif font-medium tracking-wider text-[#d4af37] uppercase">
              Engage
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#b0b8b0]">
              <li>
                <Link href="/conference" className="hover:text-white transition-colors">
                  Conference
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white transition-colors">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white transition-colors">
                  Media Center
                </Link>
              </li>
              <li>
                <Link href="/academics/admission" className="hover:text-white transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* MIDDLE CONTACT DETAILS BAR */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-[#1e2520] text-xs font-light text-[#b0b8b0]">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#18201a] flex items-center justify-center shrink-0 text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
            <span>Al-Jamia Al-Jalaliyya, Kerala, India</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#18201a] flex items-center justify-center shrink-0 text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Google Map</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#18201a] flex items-center justify-center shrink-0 text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <a href="mailto:care@iritaq.edu.in" className="hover:text-white transition-colors">
              care@iritaq.edu.in
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#18201a] flex items-center justify-center shrink-0 text-amber-400">
              <Phone className="w-4 h-4" />
            </div>
            <a href="tel:+918000000000" className="hover:text-white transition-colors">
              +91 800 000 0000
            </a>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & SCROLL TOP BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#808a80] gap-4">
          <p>© {new Date().getFullYear()} International Research Institute for Tafsir Al-Qur&apos;an. All rights reserved.</p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl bg-[#18201a] hover:bg-[#222d25] text-amber-400 flex items-center justify-center transition border border-[#253028] cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}