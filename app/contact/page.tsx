'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import {
  HERO_CONTACT_DATA as DEFAULT_HERO,
  DEPARTMENTS_DATA as DEFAULT_DEPARTMENTS,
  CAMPUS_INFO as DEFAULT_CAMPUS,
  EnquiryDepartment,
} from '@/lib/contactData';
import { Loader2, CheckCircle2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ContactPage: React.FC = () => {
  // --- Live Dynamic Settings State ---
  const [heroData, setHeroData] = useState(DEFAULT_HERO);
  const [departments, setDepartments] = useState<EnquiryDepartment[]>(DEFAULT_DEPARTMENTS);
  const [campusInfo, setCampusInfo] = useState(DEFAULT_CAMPUS);
  const [, setLoadingSettings] = useState(true);

  // --- Form State ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    country: '',
    subject: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Fetch Admin Settings from Supabase on Mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: settings, error } = await supabase
          .from('contact_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (error) {
          console.error('Error loading public contact settings from Supabase:', error);
          return;
        }

        if (settings) {
          // Update Hero
          setHeroData({
            breadcrumb: settings.hero_breadcrumb?.length ? settings.hero_breadcrumb : DEFAULT_HERO.breadcrumb,
            tagline: settings.hero_tagline || DEFAULT_HERO.tagline,
            headline: settings.hero_headline || DEFAULT_HERO.headline,
            subheading: settings.hero_subheading || DEFAULT_HERO.subheading,
            bgImage: settings.hero_bg_image || DEFAULT_HERO.bgImage,
            mobilebgImage: settings.hero_bg_image || DEFAULT_HERO.mobilebgImage,
          });

          // Update Departments
          if (settings.departments && Array.isArray(settings.departments) && settings.departments.length > 0) {
            setDepartments(settings.departments);
          }

          // Update Campus Info
          setCampusInfo({
            title: settings.campus_title || DEFAULT_CAMPUS.title,
            address: settings.campus_address || DEFAULT_CAMPUS.address,
            hours: settings.campus_hours || DEFAULT_CAMPUS.hours,
            mapImage: settings.campus_map_image || DEFAULT_CAMPUS.mapImage,
          });
        }
      } catch (err) {
        console.error('Unexpected error fetching contact settings:', err);
      } finally {
        setLoadingSettings(false);
      }
    }

    fetchSettings();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setErrorMessage('');

    try {
      let fileUrl = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `contact-docs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('iritaq-media')
          .upload(filePath, file);

        if (uploadError) throw new Error('Failed to upload file: ' + uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from('iritaq-media')
          .getPublicUrl(filePath);

        fileUrl = publicUrlData.publicUrl;
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        organisation: formData.organisation.trim() || null,
        country: formData.country || null,
        subject: formData.subject || 'general',
        message: formData.message.trim(),
        file_url: fileUrl,
      };

      const { error: insertError } = await supabase.from('contact_submissions').insert([payload]);

      if (insertError) throw new Error(insertError.message);

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organisation: '',
        country: '',
        subject: '',
        message: '',
      });
      setFile(null);
    } catch (err: unknown) {
      console.error('Error submitting enquiry:', err);
      const errorMessageText =
        err instanceof Error ? err.message : 'Failed to submit enquiry. Please try again.';
      setErrorMessage(errorMessageText);
    } finally {
      setSubmitting(false);
    }
  };

  const renderDepartmentIcon = (type: EnquiryDepartment['icon']) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'academic':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'quill':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 'grad':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'megaphone':
        return (
          <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c.41 0 .789-.252.95-.63l1.107-2.585A1 1 0 0111.81 2h.38a1 1 0 011 1v18a1 1 0 01-1 1h-.38a1 1 0 01-.922-.615l-1.107-2.585A1.001 1.001 0 008.832 18H7a4 4 0 01-1.564-.317z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-4 lg:px-4">
        <div className="relative bg-[#13231E] text-white min-h-130 flex items-center overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroData.bgImage}
              alt="IRITAQ Library Background"
              fill
              priority
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0C1714] via-[#13231E]/90 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 relative z-10 w-full">
            {/* Breadcrumb */}
            <nav className="flex text-xs text-[#C5A059] mb-6 font-medium tracking-wide">
              {heroData.breadcrumb.map((item, index) => (
                <React.Fragment key={item}>
                  {index > 0 && <span className="mx-2">&gt;</span>}
                  <span
                    className={
                      index === heroData.breadcrumb.length - 1
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
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                {heroData.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white max-w-4xl leading-tight mb-6">
              {heroData.headline}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light mb-10 leading-relaxed">
              {heroData.subheading}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#21674E] hover:bg-[#1B543F] text-white text-sm font-medium rounded-full transition-colors duration-200"
              >
                Contact Us
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#staff-directory"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-white/40 hover:border-white text-white text-sm font-medium rounded-full transition-colors duration-200"
              >
                View Staff Directory
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. ENQUIRY DEPARTMENTS SECTION ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-px w-8 bg-[#C5A059]"></span>
              <span className="text-xs uppercase tracking-widest text-[#21674E] font-semibold">
                ENQUIRY DEPARTMENTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#1E3E34] mb-3">
              Enquiry Departments
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Please direct your inquiry to the appropriate academic or administrative office for an efficient and timely response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="border border-gray-200/80 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF5EC] flex items-center justify-center mb-5">
                    {renderDepartmentIcon(dept.icon)}
                  </div>
                  <h3 className="text-base font-serif text-[#1E3E34] font-medium mb-2.5">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light mb-6">
                    {dept.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-xs font-medium">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center text-[#21674E] hover:underline truncate"
                  >
                    <svg className="w-3.5 h-3.5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{dept.email}</span>
                  </a>
                  <a
                    href={`tel:${dept.phone}`}
                    className="flex items-center text-gray-600 hover:text-gray-900 truncate"
                  >
                    <svg className="w-3.5 h-3.5 mr-2 shrink-0 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{dept.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. OFFICIAL ENQUIRY FORM & CAMPUS MAP ================= */}
      <section id="enquiry-form" className="py-16 sm:py-20 bg-[#F7F7F7] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left side Form */}
            <div className="lg:col-span-7">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="h-px w-8 bg-[#C5A059]"></span>
                  <span className="text-xs uppercase tracking-widest text-[#21674E] font-semibold">
                    OFFICIAL ENQUIRY FORM
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#1E3E34] mb-3">
                  Official Enquiry Form
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  Please populate the field entries below. All submissions are directed to respective departments instantly.
                </p>
              </div>

              {success && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Your enquiry has been successfully submitted! We will respond shortly.</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-900 px-6 py-4 rounded-xl text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Include country code"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Organisation / University</label>
                    <input
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleInputChange}
                      placeholder="e.g. Al-Azhar University"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#1E3E34]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-700 focus:outline-none focus:border-[#1E3E34]"
                    >
                      <option value="">Select your country</option>
                      <option value="IN">India</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="EG">Egypt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject of Inquiry</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-700 focus:outline-none focus:border-[#1E3E34]"
                    >
                      <option value="">Choose a department category</option>
                      <option value="general">General Enquiries</option>
                      <option value="academics">Academic Affairs</option>
                      <option value="research">Research Enquiries</option>
                      <option value="relations">International Relations</option>
                      <option value="publications">Publications &amp; Journals</option>
                      <option value="admissions">Admissions &amp; Registrar</option>
                      <option value="media">Media &amp; Communications</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe the details of your inquiry, collaboration request, or questions..."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#1E3E34] resize-y"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Supporting Documents (Optional)</label>
                  <div className="border border-dashed border-[#C5A059]/70 rounded-lg p-6 bg-white/50 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <svg className="w-6 h-6 text-[#C5A059] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-800">
                      Drag &amp; Drop files here, or click to upload
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      PDF, DOCX, or JPEG up to 10MB
                    </span>
                    {file && (
                      <span className="text-xs font-medium text-[#21674E] mt-2">
                        Selected: {file.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#132821] hover:bg-[#0C1714] text-white text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right side Campus Info & Map */}
            <div className="lg:col-span-5 space-y-6">
              {/* Campus Info Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
                <h3 className="text-lg font-serif text-[#1E3E34] font-medium mb-4">
                  {campusInfo.title}
                </h3>
                <div className="space-y-3.5 text-xs text-gray-600">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-[#C5A059] mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{campusInfo.address}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-[#C5A059] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{campusInfo.hours}</span>
                  </div>
                </div>
              </div>

              {/* Campus Vector Map Illustration */}
              <div className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-200 bg-[#E3E0D8]">
                <Image
                  src={campusInfo.mapImage}
                  alt="IRITAQ Campus Map"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#D3CEBE]/40 mix-blend-multiply"></div>

                {/* Styled Map Tag Pin Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-[#1E3E34] text-white text-[11px] font-bold px-3 py-1.5 rounded shadow-lg border border-white/20 whitespace-nowrap">
                    IRITAQ Campus
                  </div>
                  <div className="w-2.5 h-2.5 bg-[#1E3E34] rotate-45 -mt-1"></div>
                  <div className="w-3 h-3 bg-[#C5A059] rounded-full border-2 border-white shadow-md mt-1"></div>
                </div>

                <div className="absolute top-3 right-3 text-gray-500/60 font-serif text-xs tracking-widest pointer-events-none">
                  N ↗
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. SOCIAL NETWORKS FOOTER BAR ================= */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h4 className="text-base font-serif text-[#1E3E34]">
            Connect with IRITAQ on Social Networks
          </h4>
          <div className="flex items-center space-x-5">
            <a href="#" className="text-[#1E3E34] hover:text-[#C5A059] transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-[#1E3E34] hover:text-[#C5A059] transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href="#" className="text-[#1E3E34] hover:text-[#C5A059] transition-colors" aria-label="X (Twitter)">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-[#1E3E34] hover:text-[#C5A059] transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;