'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AdmissionsData } from '@/lib/admissionsData';

interface AdmissionClientProps {
  data: AdmissionsData;
}

export function AdmissionClient({ data }: AdmissionClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    qualification: '',
    university: '',
    targetProgram: '',
    researchInterests: '',
    declaration: false,
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Application Form:', formData);
  };

  const { hero, programs, featuredProgram, requirements, steps, deadlines, faqs } = data;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="px-4 sm:px-4 lg:px-4 pt-6 md:pt-8 w-full">
        <div className="relative bg-[#1E3E34] text-white min-h-130 flex items-center overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl">
          <div className="absolute inset-0 z-0">
            {/* Desktop Background Image */}
            <Image
              src={hero.bgImage}
              alt="Library background Desktop"
              fill
              priority
              className="hidden md:block object-cover object-center opacity-25"
            />
            {/* Mobile Background Image */}
            <Image
              src={hero.bgImageMobile || hero.bgImage}
              alt="Library background Mobile"
              fill
              priority
              className="block md:hidden object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#132821] via-[#1E3E34]/90 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 relative z-10 w-full">
            {/* Breadcrumb */}
            <nav className="flex text-xs text-[#C5A059] mb-6 font-medium tracking-wide">
              {hero.breadcrumb.map((item, index) => (
                <React.Fragment key={item}>
                  {index > 0 && <span className="mx-2">&gt;</span>}
                  <span
                    className={
                      index === hero.breadcrumb.length - 1
                        ? 'text-white/90'
                        : 'hover:underline opacity-80 cursor-pointer'
                    }
                  >
                    {item}
                  </span>
                </React.Fragment>
              ))}
            </nav>

            {/* Sub-tagline */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                {hero.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white max-w-4xl leading-tight mb-6">
              {hero.headline}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light mb-10 leading-relaxed">
              {hero.subheading}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#21674E] hover:bg-[#1B543F] text-white text-sm font-medium rounded transition-colors duration-200"
              >
                Start Application
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <button className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-white/40 hover:border-white text-white text-sm font-medium rounded transition-colors duration-200">
                Download Prospectus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. PROGRAMS & PATHWAYS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                PROGRAMS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-4">
              Academic Programs &amp; Pathways
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl font-light">
              Discover rigorous educational structures designed to deepen your
              understanding of Qur&apos;anic sciences, classical exegesis, and
              linguistic lineages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="border border-gray-200 rounded-lg p-5 flex space-x-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-32 shrink-0 overflow-hidden rounded">
                  {/* Desktop Image */}
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="hidden md:block object-cover"
                  />
                  {/* Mobile Image */}
                  <Image
                    src={prog.imageMobile || prog.image}
                    alt={prog.title}
                    fill
                    className="block md:hidden object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#C5A059] uppercase block mb-1">
                      {prog.status}
                    </span>
                    <h3 className="text-lg font-serif text-[#1E3E34] font-medium mb-1">
                      {prog.title}
                    </h3>
                    <p
                      className="text-xs text-[#1E3E34]/80 font-serif mb-2"
                      dir="rtl"
                    >
                      {prog.titleArabic}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                  <a
                    href="#apply"
                    className="text-xs font-semibold text-[#1E3E34] hover:underline inline-flex items-center mt-3"
                  >
                    Apply Now <span className="ml-1">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. FEATURED PROGRAM ================= */}
      <section className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-4 lg:px-4">
        <div className="w-full mx-auto bg-[#1E3E34] text-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="h-px w-8 bg-[#C5A059]"></span>
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                  {featuredProgram.tagline}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white mb-3">
                {featuredProgram.title}
              </h2>
              <p className="text-gray-300 text-sm max-w-2xl font-light">
                {featuredProgram.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="px-5 py-3 bg-[#C5A059] hover:bg-[#D4B87C] text-[#132821] text-xs font-bold rounded transition-colors"
              >
                Apply for Masters
              </a>
              <button className="px-5 py-3 bg-transparent border border-white/30 hover:border-white text-white text-xs font-semibold rounded transition-colors">
                Download Syllabus
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="text-[10px] tracking-widest text-[#C5A059] uppercase block mb-3 font-semibold">
                DURATION &amp; TERM
              </span>
              <h3 className="text-2xl font-serif text-white font-normal mb-2">
                {featuredProgram.duration}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {featuredProgram.durationDetails}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <span className="text-[10px] tracking-widest text-[#C5A059] uppercase block mb-3 font-semibold">
                PREREQUISITE ELIGIBILITY
              </span>
              <h3 className="text-2xl font-serif text-white font-normal mb-2">
                {featuredProgram.prerequisite}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {featuredProgram.prerequisiteDetails}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <span className="text-[10px] tracking-widest text-[#C5A059] uppercase block mb-3 font-semibold">
                ADMISSIONS LIMIT
              </span>
              <h3 className="text-2xl font-serif text-white font-normal mb-2">
                {featuredProgram.limit}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {featuredProgram.limitDetails}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. CORE ADMISSION REQUIREMENTS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                CRITERIA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Core Admission Requirements
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl font-light">
              Scholars applying to the Institute must submit authentic
              verification documents and meet academic standards to secure
              selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="border border-gray-200 rounded-lg p-6 bg-white"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center justify-center">
                    {req.number}
                  </span>
                  <h3 className="text-base font-serif text-[#1E3E34] font-medium">
                    {req.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {req.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. APPLICATION PROCESS ================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                STEPS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Application Process
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl font-light">
              A brief walkthrough of the digital submission steps required to
              enroll in the current term.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-[#C5A059] uppercase block mb-3">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-serif text-[#1E3E34] font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. DIGITAL ADMISSION FORM ================= */}
      <section
        id="apply"
        className="py-20 bg-[#FAF7F2] border-t border-b border-[#E8E3DA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                APPLY NOW
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Digital Admission Form
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl font-light">
              Input correct details and secure your scholarly placement file
              for review by the academic board.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
            {/* 1. Personal Information */}
            <div>
              <h3 className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-4">
                1. PERSONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Yahya Al-Mansoor"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. scholar@domain.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 800 000 0000"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="e.g. Indian"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Academic Information */}
            <div>
              <h3 className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-4">
                2. ACADEMIC INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Highest Academic Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g. Bachelor of Arts in Islamic Studies"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Graduating University / Institution
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="e.g. Al-Jamia Al-Jalaliyya"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Program & Interests */}
            <div>
              <h3 className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-4">
                3. PROGRAM &amp; INTERESTS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Target Admission Program
                  </label>
                  <select
                    name="targetProgram"
                    value={formData.targetProgram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-[#1E3E34]"
                  >
                    <option value="" disabled>
                      Select e.g. Master of Qur&apos;anic Sciences
                    </option>
                    <option value="masters">
                      Master of Qur&apos;anic Sciences
                    </option>
                    <option value="cert">Certificate Programs</option>
                    <option value="diploma">Diploma Programs</option>
                    <option value="fellowship">Research Fellowships</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Core Research Interests
                  </label>
                  <textarea
                    rows={4}
                    name="researchInterests"
                    value={formData.researchInterests}
                    onChange={handleInputChange}
                    placeholder="Outline targeted commentators, eras, or Arabic linguistic frameworks of interest..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#1E3E34] resize-y"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#1E3E34] rounded border-gray-300 focus:ring-[#1E3E34]"
                />
                <span className="text-xs text-gray-600 font-medium">
                  I hereby declare that all submitted academic and personal
                  records are authentic.
                </span>
              </label>
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#21674E] hover:bg-[#1B543F] text-white text-xs font-bold rounded transition-colors duration-200 whitespace-nowrap"
              >
                Submit Secure Application
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= 7. KEY ENROLLMENT DEADLINES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                SCHEDULE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Key Enrollment Deadlines
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl font-light">
              Review our annual milestone dates carefully to ensure timely
              evaluation of your dossier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deadlines.map((group) => (
              <div
                key={group.category}
                className="border border-gray-200 rounded-lg p-6 bg-white"
              >
                <span className="text-[11px] font-bold tracking-wider text-[#C5A059] uppercase block mb-4">
                  {group.category}
                </span>
                <div className="space-y-4">
                  {group.items.map((item, idx) => (
                    <div
                      key={item.event}
                      className={`flex justify-between items-center text-xs ${
                        idx < group.items.length - 1
                          ? 'pb-3 border-b border-gray-100'
                          : ''
                      }`}
                    >
                      <span className="text-gray-600">{item.event}</span>
                      <span className="font-bold text-[#1E3E34]">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                SUPPORT
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl font-light">
              Common inquiries from incoming scholars seeking admission to
              IRITAQ.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 bg-white"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-serif text-[#1E3E34] text-sm sm:text-base font-medium focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transition-transform duration-200 text-[#C5A059] ml-2 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}