'use client';

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, X, Send, Mail } from "lucide-react";
import { departmentsData as DEFAULT_DATA, Department } from "@/lib/departmentsData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RECIPIENT_EMAIL = "info@iritaq.org"; // 👈 Update with your institute's inquiry email

export default function DepartmentsPage() {
  const [hero, setHero] = useState(DEFAULT_DATA.hero);
  const [sectionHeader, setSectionHeader] = useState(DEFAULT_DATA.sectionHeader);
  const [departments, setDepartments] = useState<Department[]>(DEFAULT_DATA.departments);
  const [cta, setCta] = useState(DEFAULT_DATA.cta);

  // Inquiry Modal State
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    async function fetchDepartmentsData() {
      try {
        const { data, error } = await supabase
          .from("departments_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error loading departments settings:", error);
          return;
        }

        if (data) {
          if (data.hero) setHero({ ...DEFAULT_DATA.hero, ...data.hero });
          if (data.section_header) setSectionHeader({ ...DEFAULT_DATA.sectionHeader, ...data.section_header });
          if (data.departments_list && Array.isArray(data.departments_list)) {
            setDepartments(data.departments_list);
          }
          if (data.cta) setCta({ ...DEFAULT_DATA.cta, ...data.cta });
        }
      } catch (err: unknown) {
        console.error("Unexpected error fetching departments data:", err);
      }
    }

    fetchDepartmentsData();
  }, []);

  const handleOpenModal = (dept: Department) => {
    setSelectedDept(dept);
  };

  const handleCloseModal = () => {
    setSelectedDept(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDept) return;

    const subject = encodeURIComponent(
      `Department Inquiry: ${selectedDept.title} (${selectedDept.badge})`
    );

    const body = encodeURIComponent(
      `Department / Unit: ${selectedDept.title}\n` +
        `----------------------------------------\n` +
        `Full Name: ${formData.name}\n` +
        `Email Address: ${formData.email}\n` +
        `Phone Number: ${formData.phone}\n\n` +
        `What I would like to know:\n${formData.message}`
    );

    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    handleCloseModal();
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="pt-4 pb-6 w-full mx-auto px-4 md:pt-6">
        <div className="relative py-12 sm:py-16 md:py-20 bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.backgroundImage}
              alt="Academic Library Backdrop"
              fill
              className="hidden md:block object-cover object-center opacity-75"
              priority
            />
            <Image
              src={hero.mobileBackgroundImage}
              alt="Academic Library Backdrop Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-75"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 md:px-16">
            <nav className="flex items-center gap-2 text-xs text-amber-300 mb-6 font-medium tracking-wide">
              {hero.breadcrumb.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                  {idx < hero.breadcrumb.length - 1 && <span>&gt;</span>}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-amber-500" />
              <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                {hero.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-6 drop-shadow-sm">
              {hero.title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-sm">
              {hero.description}
            </p>

            <Link
              href={hero.buttonLink}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-lg"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 2. DEPARTMENTS & RESEARCH UNITS GRID */}
      <section id="departments-list" className="py-16 md:py-24 w-full mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
              {sectionHeader.tag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            {sectionHeader.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            {sectionHeader.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {departments.map((dept: Department) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    {dept.number}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-700/90 uppercase">
                    {dept.badge}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-medium text-slate-800 mb-3">
                  {dept.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {dept.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-3">
                    RESEARCH UNITS:
                  </h4>
                  <ul className="space-y-2">
                    {dept.researchUnits?.map((unit: string, uIdx: number) => (
                      <li key={uIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Trigger Button */}
              <button
                type="button"
                onClick={() => handleOpenModal(dept)}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer w-fit"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALL TO ACTION BANNER */}
      <section className="py-12 px-4 sm:px-4 lg:px-4">
        <div className="w-full mx-auto bg-[#f8f6f0] rounded-2xl sm:rounded-3xl p-10 sm:p-14 md:p-16 border border-amber-200/60 shadow-sm text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-0.5 bg-amber-600" />
            <span className="text-amber-800 text-xs font-semibold tracking-widest uppercase">
              {cta.tag}
            </span>
            <span className="w-6 h-0.5 bg-amber-600" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-slate-800 mb-8 max-w-2xl">
            {cta.title}
          </h2>

          <Link
            href={cta.buttonLink}
            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition shadow-md"
          >
            <span>{cta.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* DEPARTMENT INQUIRY POPUP MODAL */}
      {selectedDept && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white px-6 py-5 sm:px-8 sm:py-6 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-amber-400 mb-1">
                  <Mail className="w-3 h-3" />
                  <span>Department Inquiry</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white leading-snug">
                  {selectedDept.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-emerald-900 transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleInquirySubmit} className="p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  What would you like to know? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={`Ask about courses, research units, or admissions in ${selectedDept.title}...`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-md shadow-emerald-950/20 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Proceed to Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}