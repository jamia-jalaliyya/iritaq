"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/admin/utils/supabase";
import { HERO_CONTACT_DATA, DEPARTMENTS_DATA, CAMPUS_INFO } from "@/lib/contactData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Inbox, Settings, Mail, Phone, Building2, Calendar, FileText } from "lucide-react";


interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  country: string;
  subject: string;
  message: string;
  file_url: string;
  created_at: string;
}

export default function ContactAdminPage() {
  const [activeTab, setActiveTab] = useState<"content" | "submissions">("content");
  
  // Content States
  const [breadcrumb, setBreadcrumb] = useState<string[]>(HERO_CONTACT_DATA.breadcrumb);
  const [tagline, setTagline] = useState(HERO_CONTACT_DATA.tagline);
  const [headline, setHeadline] = useState(HERO_CONTACT_DATA.headline);
  const [subheading, setSubheading] = useState(HERO_CONTACT_DATA.subheading);
  const [bgImage, setBgImage] = useState(HERO_CONTACT_DATA.bgImage);
  const [departments, setDepartments] = useState(DEPARTMENTS_DATA);
  const [campusTitle, setCampusTitle] = useState(CAMPUS_INFO.title);
  const [campusAddress, setCampusAddress] = useState(CAMPUS_INFO.address);
  const [campusHours, setCampusHours] = useState(CAMPUS_INFO.hours);
  const [campusMapImage, setCampusMapImage] = useState(CAMPUS_INFO.mapImage);

  // Submissions States
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Settings
        const { data: s } = await supabase
          .from("contact_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (s) {
          if (s.hero_breadcrumb?.length) setBreadcrumb(s.hero_breadcrumb);
          if (s.hero_tagline) setTagline(s.hero_tagline);
          if (s.hero_headline) setHeadline(s.hero_headline);
          if (s.hero_subheading) setSubheading(s.hero_subheading);
          if (s.hero_bg_image) setBgImage(s.hero_bg_image);
          if (s.departments?.length) setDepartments(s.departments);
          if (s.campus_title) setCampusTitle(s.campus_title);
          if (s.campus_address) setCampusAddress(s.campus_address);
          if (s.campus_hours) setCampusHours(s.campus_hours);
          if (s.campus_map_image) setCampusMapImage(s.campus_map_image);
        }

        // Fetch Submissions
        setLoadingSubs(true);
        const { data: subs } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (subs) setSubmissions(subs);
      } catch (err) {
        console.error("Error fetching contact data:", err);
      } finally {
        setLoading(false);
        setLoadingSubs(false);
      }
    }
    fetchData();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, deptIndex?: number) {
    try {
      setUploadingField(fieldKey + (deptIndex !== undefined ? `-${deptIndex}` : ''));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `contact/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (fieldKey === "bgImage") setBgImage(publicUrl);
      else if (fieldKey === "campusMapImage") setCampusMapImage(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Ensure bucket 'iritaq-media' exists.");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSaveContent(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const payload = {
        id: 1,
        hero_breadcrumb: breadcrumb,
        hero_tagline: tagline,
        hero_headline: headline,
        hero_subheading: subheading,
        hero_bg_image: bgImage,
        departments: departments,
        campus_title: campusTitle,
        campus_address: campusAddress,
        campus_hours: campusHours,
        campus_map_image: campusMapImage,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("contact_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccessMessage("Contact page settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error saving contact settings:", error);
      alert("Error saving settings to database.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteSubmission(id: string) {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
      setSubmissions(submissions.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error("Error deleting submission:", err);
      alert("Failed to delete submission.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-[#04402a]" />
        <span className="ml-3 font-medium text-sm">Loading Contact Management...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Bar & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-[#04402a]" />
              <span className="text-xs font-bold tracking-widest text-[#04402a] uppercase">ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Contact Page & Submissions</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab("content")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === "content" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Settings className="w-4 h-4 text-[#04402a]" />
              <span>Content & Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === "submissions" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Inbox className="w-4 h-4 text-[#04402a]" />
              <span>Submitted Inquiries ({submissions.length})</span>
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* TAB 1: CONTENT & SETTINGS MANAGER */}
        {activeTab === "content" && (
          <form onSubmit={handleSaveContent} className="space-y-10">
            
            {/* 1. HERO SECTION */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
              <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Hero Section</h2>
              
              {/* Breadcrumb Manager */}
              <div className="space-y-3 pb-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Breadcrumbs</label>
                  <button
                    type="button"
                    onClick={() => setBreadcrumb([...breadcrumb, "New Crumb"])}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#04402a] bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Breadcrumb
                  </button>
                </div>
                {breadcrumb.map((crumb, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={crumb}
                      onChange={(e) => {
                        const updated = [...breadcrumb];
                        updated[idx] = e.target.value;
                        setBreadcrumb(updated);
                      }}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setBreadcrumb(breadcrumb.filter((_, i) => i !== idx))}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subheading</label>
                <textarea
                  rows={3}
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Hero Background Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'bgImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'bgImage')}
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* 2. ENQUIRY DEPARTMENTS */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-xl font-serif text-slate-900">2. Enquiry Departments</h2>
                <button
                  type="button"
                  onClick={() => setDepartments([
                    ...departments,
                    { id: String(Date.now()), title: "New Department", description: "Department description.", email: "dept@iritaq.com", phone: "+91 000 000 0000", icon: "email" }
                  ])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#04402a] bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
                >
                  <Plus className="w-4 h-4" /> Add Department
                </button>
              </div>

              <div className="space-y-6">
                {departments.map((dept, idx) => (
                  <div key={dept.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase">Department #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setDepartments(departments.filter((_, i) => i !== idx))}
                        className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Department Title"
                        value={dept.title}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].title = e.target.value;
                          setDepartments(updated);
                        }}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <select
                        value={dept.icon}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].icon = e.target.value as 'email' | 'academic' | 'search' | 'globe' | 'quill' | 'grad' | 'megaphone';
                          setDepartments(updated);
                        }}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        <option value="email">Icon: Email</option>
                        <option value="academic">Icon: Academic</option>
                        <option value="search">Icon: Search</option>
                        <option value="globe">Icon: Globe</option>
                        <option value="quill">Icon: Quill</option>
                        <option value="grad">Icon: Graduation</option>
                        <option value="megaphone">Icon: Megaphone</option>
                      </select>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={dept.description}
                      onChange={(e) => {
                        const updated = [...departments];
                        updated[idx].description = e.target.value;
                        setDepartments(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={dept.email}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].email = e.target.value;
                          setDepartments(updated);
                        }}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={dept.phone}
                        onChange={(e) => {
                          const updated = [...departments];
                          updated[idx].phone = e.target.value;
                          setDepartments(updated);
                        }}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. CAMPUS INFO & MAP */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
              <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Campus Info & Map</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Campus Title</label>
                  <input
                    type="text"
                    value={campusTitle}
                    onChange={(e) => setCampusTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Operating Hours</label>
                  <input
                    type="text"
                    value={campusHours}
                    onChange={(e) => setCampusHours(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Campus Address</label>
                <textarea
                  rows={2}
                  value={campusAddress}
                  onChange={(e) => setCampusAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Campus Vector Map Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={campusMapImage}
                    onChange={(e) => setCampusMapImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'campusMapImage' ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'campusMapImage')}
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* Bottom Save Action */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#04402a] hover:bg-[#032b1c] text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                <span>{saving ? "Saving Changes to Supabase..." : "Save All Contact Settings"}</span>
              </button>
            </div>

          </form>
        )}

        {/* TAB 2: SUBMITTED INQUIRIES */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200">
              <h2 className="text-xl font-serif text-slate-900 mb-2">Public Contact Submissions</h2>
              <p className="text-xs text-slate-600 mb-6">
                Review all inquiries submitted through the official public contact form.
              </p>

              {loadingSubs ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#04402a]" />
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  No submissions received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{sub.name}</h3>
                          <span className="text-[11px] text-[#04402a] font-semibold uppercase tracking-wider">
                            Subject: {sub.subject || "General"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(sub.created_at).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`mailto:${sub.email}`} className="text-emerald-700 hover:underline">{sub.email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{sub.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{sub.organisation || "N/A"} ({sub.country || "N/A"})</span>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
                        {sub.message}
                      </div>

                      {sub.file_url && (
                        <div className="flex items-center gap-2 text-xs">
                          <FileText className="w-4 h-4 text-emerald-800" />
                          <a href={sub.file_url} target="_blank" rel="noreferrer" className="text-emerald-800 font-semibold hover:underline">
                            View Supporting Document
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}