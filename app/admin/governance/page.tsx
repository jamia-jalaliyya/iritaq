"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { defaultGovernanceData as DEFAULT_DATA } from "@/lib/governanceDefaultData";
import { Loader2, Upload, Plus, Trash2, Save, CheckCircle2, Settings } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MemberItem {
  id: string;
  name: string;
  role?: string;
  designation?: string;
  imageUrl: string;
  bio?: string;
  link?: string;
  badgeVariant?: "emerald" | "amber" | "dark" | string;
}

interface StatItem {
  value: string;
  label: string;
}

export default function GovernanceAdminPage() {
  // Hero Section
  const [heroTagline, setHeroTagline] = useState(DEFAULT_DATA.hero.tagline);
  const [heroTitle, setHeroTitle] = useState(DEFAULT_DATA.hero.title);
  const [heroDescription, setHeroDescription] = useState(DEFAULT_DATA.hero.description);
  const [heroBgImageUrl, setHeroBgImageUrl] = useState(DEFAULT_DATA.hero.bgImageUrl);
  const [heroMobileBgImageUrl, setHeroMobileBgImageUrl] = useState(DEFAULT_DATA.hero.mobileBgImageUrl);
  const [heroButtonText, setHeroButtonText] = useState(DEFAULT_DATA.hero.buttonText);
  const [heroButtonLink, setHeroButtonLink] = useState(DEFAULT_DATA.hero.buttonLink);

  // Stats Bar
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_DATA.stats);

  // Overview Intro
  const [overviewTagline, setOverviewTagline] = useState(DEFAULT_DATA.overview.tagline);
  const [overviewTitle, setOverviewTitle] = useState(DEFAULT_DATA.overview.title);
  const [overviewSubtitle, setOverviewSubtitle] = useState(DEFAULT_DATA.overview.subtitle);

  // 1. Senior Leadership
  const [seniorTitle, setSeniorTitle] = useState(DEFAULT_DATA.seniorLeadership.title);
  const [seniorDesc, setSeniorDesc] = useState(DEFAULT_DATA.seniorLeadership.description);
  const [seniorSecDesc, setSeniorSecDesc] = useState(DEFAULT_DATA.seniorLeadership.secondaryDescription || "");
  const [seniorMembers, setSeniorMembers] = useState<MemberItem[]>(DEFAULT_DATA.seniorLeadership.members);

  // 2. Scientific Council
  const [scientificTitle, setScientificTitle] = useState(DEFAULT_DATA.scientificCouncil.title);
  const [scientificDesc, setScientificDesc] = useState(DEFAULT_DATA.scientificCouncil.description);
  const [scientificMembers, setScientificMembers] = useState<MemberItem[]>(DEFAULT_DATA.scientificCouncil.members);

  // 3. Advisory Board
  const [advisoryTitle, setAdvisoryTitle] = useState(DEFAULT_DATA.advisoryBoard.title);
  const [advisoryDesc, setAdvisoryDesc] = useState(DEFAULT_DATA.advisoryBoard.description);
  const [advisorySecDesc, setAdvisorySecDesc] = useState(DEFAULT_DATA.advisoryBoard.secondaryDescription || "");
  const [advisoryMembers, setAdvisoryMembers] = useState<MemberItem[]>(DEFAULT_DATA.advisoryBoard.members);

  // 4. Academic Leadership
  const [academicTitle, setAcademicTitle] = useState(DEFAULT_DATA.academicLeadership.title);
  const [academicDesc, setAcademicDesc] = useState(DEFAULT_DATA.academicLeadership.description);
  const [academicSecDesc, setAcademicSecDesc] = useState(DEFAULT_DATA.academicLeadership.secondaryDescription || "");
  const [academicMembers, setAcademicMembers] = useState<MemberItem[]>(DEFAULT_DATA.academicLeadership.members);

  // 5. Executive Leadership
  const [execTitle, setExecTitle] = useState(DEFAULT_DATA.executiveLeadership.title);
  const [execDesc, setExecDesc] = useState(DEFAULT_DATA.executiveLeadership.description);
  const [execSecDesc, setExecSecDesc] = useState(DEFAULT_DATA.executiveLeadership.secondaryDescription || "");
  const [execMembers, setExecMembers] = useState<MemberItem[]>(DEFAULT_DATA.executiveLeadership.members);

  // 6. Research Faculty
  const [facultyTitle, setFacultyTitle] = useState(DEFAULT_DATA.researchFaculty.title);
  const [facultyDesc, setFacultyDesc] = useState(DEFAULT_DATA.researchFaculty.description);
  const [facultyMembers, setFacultyMembers] = useState<MemberItem[]>(DEFAULT_DATA.researchFaculty.members);

  // Organizational Structure
  const [orgTitle, setOrgTitle] = useState(DEFAULT_DATA.organizationalStructure.title);
  const [orgP1, setOrgP1] = useState(DEFAULT_DATA.organizationalStructure.paragraph1);
  const [orgP2, setOrgP2] = useState(DEFAULT_DATA.organizationalStructure.paragraph2);

  // CTA Section
  const [ctaTitle, setCtaTitle] = useState(DEFAULT_DATA.ctaSection.title);
  const [ctaDesc, setCtaDesc] = useState(DEFAULT_DATA.ctaSection.description);
  const [ctaBtnText, setCtaBtnText] = useState(DEFAULT_DATA.ctaSection.buttonText);
  const [ctaBtnLink, setCtaBtnLink] = useState(DEFAULT_DATA.ctaSection.buttonLink);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGovernanceSettings() {
      try {
        const { data, error } = await supabase
          .from("governance_page_settings")
          .select("*")
          .eq("slug", "governance-page")
          .maybeSingle();

        let governanceData = data;

        if (!governanceData) {
          const initialPayload = {
            slug: "governance-page",
            hero: DEFAULT_DATA.hero,
            stats: DEFAULT_DATA.stats,
            overview: DEFAULT_DATA.overview,
            senior_leadership: DEFAULT_DATA.seniorLeadership,
            scientific_council: DEFAULT_DATA.scientificCouncil,
            advisory_board: DEFAULT_DATA.advisoryBoard,
            academic_leadership: DEFAULT_DATA.academicLeadership,
            executive_leadership: DEFAULT_DATA.executiveLeadership,
            research_faculty: DEFAULT_DATA.researchFaculty,
            organizational_structure: DEFAULT_DATA.organizationalStructure,
            cta_section: DEFAULT_DATA.ctaSection,
          };

          await supabase
            .from("governance_page_settings")
            .upsert([initialPayload], { onConflict: "slug" });

          governanceData = initialPayload;
        }

        if (error && error.code) {
          console.error("Error fetching governance settings:", error.message);
        }

        if (governanceData) {
          if (governanceData.hero) {
            setHeroTagline(governanceData.hero.tagline || DEFAULT_DATA.hero.tagline);
            setHeroTitle(governanceData.hero.title || DEFAULT_DATA.hero.title);
            setHeroDescription(governanceData.hero.description || DEFAULT_DATA.hero.description);
            setHeroBgImageUrl(governanceData.hero.bgImageUrl || DEFAULT_DATA.hero.bgImageUrl);
            setHeroMobileBgImageUrl(governanceData.hero.mobileBgImageUrl || DEFAULT_DATA.hero.mobileBgImageUrl);
            setHeroButtonText(governanceData.hero.buttonText || DEFAULT_DATA.hero.buttonText);
            setHeroButtonLink(governanceData.hero.buttonLink || DEFAULT_DATA.hero.buttonLink);
          }
          if (governanceData.stats && Array.isArray(governanceData.stats)) setStats(governanceData.stats);
          if (governanceData.overview) {
            setOverviewTagline(governanceData.overview.tagline || DEFAULT_DATA.overview.tagline);
            setOverviewTitle(governanceData.overview.title || DEFAULT_DATA.overview.title);
            setOverviewSubtitle(governanceData.overview.subtitle || DEFAULT_DATA.overview.subtitle);
          }
          if (governanceData.senior_leadership) {
            setSeniorTitle(governanceData.senior_leadership.title || DEFAULT_DATA.seniorLeadership.title);
            setSeniorDesc(governanceData.senior_leadership.description || DEFAULT_DATA.seniorLeadership.description);
            setSeniorSecDesc(governanceData.senior_leadership.secondaryDescription || "");
            if (governanceData.senior_leadership.members) setSeniorMembers(governanceData.senior_leadership.members);
          }
          if (governanceData.scientific_council) {
            setScientificTitle(governanceData.scientific_council.title || DEFAULT_DATA.scientificCouncil.title);
            setScientificDesc(governanceData.scientific_council.description || DEFAULT_DATA.scientificCouncil.description);
            if (governanceData.scientific_council.members) setScientificMembers(governanceData.scientific_council.members);
          }
          if (governanceData.advisory_board) {
            setAdvisoryTitle(governanceData.advisory_board.title || DEFAULT_DATA.advisoryBoard.title);
            setAdvisoryDesc(governanceData.advisory_board.description || DEFAULT_DATA.advisoryBoard.description);
            setAdvisorySecDesc(governanceData.advisory_board.secondaryDescription || "");
            if (governanceData.advisory_board.members) setAdvisoryMembers(governanceData.advisory_board.members);
          }
          if (governanceData.academic_leadership) {
            setAcademicTitle(governanceData.academic_leadership.title || DEFAULT_DATA.academicLeadership.title);
            setAcademicDesc(governanceData.academic_leadership.description || DEFAULT_DATA.academicLeadership.description);
            setAcademicSecDesc(governanceData.academic_leadership.secondaryDescription || "");
            if (governanceData.academic_leadership.members) setAcademicMembers(governanceData.academic_leadership.members);
          }
          if (governanceData.executive_leadership) {
            setExecTitle(governanceData.executive_leadership.title || DEFAULT_DATA.executiveLeadership.title);
            setExecDesc(governanceData.executive_leadership.description || DEFAULT_DATA.executiveLeadership.description);
            setExecSecDesc(governanceData.executive_leadership.secondaryDescription || "");
            if (governanceData.executive_leadership.members) setExecMembers(governanceData.executive_leadership.members);
          }
          if (governanceData.research_faculty) {
            setFacultyTitle(governanceData.research_faculty.title || DEFAULT_DATA.researchFaculty.title);
            setFacultyDesc(governanceData.research_faculty.description || DEFAULT_DATA.researchFaculty.description);
            if (governanceData.research_faculty.members) setFacultyMembers(governanceData.research_faculty.members);
          }
          if (governanceData.organizational_structure) {
            setOrgTitle(governanceData.organizational_structure.title || DEFAULT_DATA.organizationalStructure.title);
            setOrgP1(governanceData.organizational_structure.paragraph1 || DEFAULT_DATA.organizationalStructure.paragraph1);
            setOrgP2(governanceData.organizational_structure.paragraph2 || DEFAULT_DATA.organizationalStructure.paragraph2);
          }
          if (governanceData.cta_section) {
            setCtaTitle(governanceData.cta_section.title || DEFAULT_DATA.ctaSection.title);
            setCtaDesc(governanceData.cta_section.description || DEFAULT_DATA.ctaSection.description);
            setCtaBtnText(governanceData.cta_section.buttonText || DEFAULT_DATA.ctaSection.buttonText);
            setCtaBtnLink(governanceData.cta_section.buttonLink || DEFAULT_DATA.ctaSection.buttonLink);
          }
        }
      } catch (err: unknown) {
        console.error("Error loading governance admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGovernanceSettings();
  }, []);

  async function handleImageUpload(file: File, fieldKey: string, memberListSetter?: (members: MemberItem[]) => void, currentMembers?: MemberItem[], memberIndex?: number) {
    try {
      setUploadingField(fieldKey + (memberIndex !== undefined ? `-${memberIndex}` : ""));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `governance-page/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("iritaq-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("iritaq-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      if (fieldKey === "heroBg") setHeroBgImageUrl(publicUrl);
      else if (fieldKey === "heroMobileBg") setHeroMobileBgImageUrl(publicUrl);
      else if (memberListSetter && currentMembers && memberIndex !== undefined) {
        const updated = [...currentMembers];
        updated[memberIndex].imageUrl = publicUrl;
        memberListSetter(updated);
      }
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Ensure bucket 'iritaq-media' exists and is public.");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const payload = {
        slug: "governance-page",
        hero: {
          tagline: heroTagline,
          title: heroTitle,
          description: heroDescription,
          bgImageUrl: heroBgImageUrl,
          mobileBgImageUrl: heroMobileBgImageUrl,
          buttonText: heroButtonText,
          buttonLink: heroButtonLink,
        },
        stats,
        overview: {
          tagline: overviewTagline,
          title: overviewTitle,
          subtitle: overviewSubtitle,
        },
        senior_leadership: {
          id: DEFAULT_DATA.seniorLeadership.id,
          title: seniorTitle,
          description: seniorDesc,
          secondaryDescription: seniorSecDesc,
          members: seniorMembers,
        },
        scientific_council: {
          title: scientificTitle,
          description: scientificDesc,
          members: scientificMembers,
        },
        advisory_board: {
          title: advisoryTitle,
          description: advisoryDesc,
          secondaryDescription: advisorySecDesc,
          members: advisoryMembers,
        },
        academic_leadership: {
          title: academicTitle,
          description: academicDesc,
          secondaryDescription: academicSecDesc,
          members: academicMembers,
        },
        executive_leadership: {
          title: execTitle,
          description: execDesc,
          secondaryDescription: execSecDesc,
          members: execMembers,
        },
        research_faculty: {
          title: facultyTitle,
          description: facultyDesc,
          members: facultyMembers,
        },
        organizational_structure: {
          title: orgTitle,
          paragraph1: orgP1,
          paragraph2: orgP2,
        },
        cta_section: {
          title: ctaTitle,
          description: ctaDesc,
          buttonText: ctaBtnText,
          buttonLink: ctaBtnLink,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("governance_page_settings")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;

      setSuccessMessage("Governance page settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error: unknown) {
      console.error("Error saving governance settings:", error);
      const msg = error instanceof Error ? error.message : String(error);
      alert("Failed to save: " + msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
        <span className="ml-3 font-medium text-sm">Loading Governance Admin...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">ADMIN DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-900">Manage Governance Page</h1>
          </div>
          <Settings className="w-6 h-6 text-slate-400" />
        </div>

        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10">
          
          {/* 1. HERO SECTION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">1. Hero Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Main Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Desktop Background Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroBgImageUrl}
                    onChange={(e) => setHeroBgImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'heroBg' ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'heroBg')} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Mobile Background Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroMobileBgImageUrl}
                    onChange={(e) => setHeroMobileBgImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'heroMobileBg' ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'heroMobileBg')} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text</label>
                <input
                  type="text"
                  value={heroButtonText}
                  onChange={(e) => setHeroButtonText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Link URL</label>
                <input
                  type="text"
                  value={heroButtonLink}
                  onChange={(e) => setHeroButtonLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
          </section>

          {/* 2. STATS BAR */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-serif text-slate-900">2. Stats Bar ({stats.length})</h2>
              <button
                type="button"
                onClick={() => setStats([...stats, { value: "0+", label: "New Stat" }])}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Stat #{idx + 1}</span>
                    <button type="button" onClick={() => setStats(stats.filter((_, i) => i !== idx))} className="text-rose-600 hover:bg-rose-100 p-1 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].value = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].label = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. OVERVIEW INTRO */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">3. Overview Intro Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Tagline</label>
                <input
                  type="text"
                  value={overviewTagline}
                  onChange={(e) => setOverviewTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Title</label>
                <input
                  type="text"
                  value={overviewTitle}
                  onChange={(e) => setOverviewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Subtitle / Paragraph</label>
              <textarea
                rows={3}
                value={overviewSubtitle}
                onChange={(e) => setOverviewSubtitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 4. SENIOR INSTITUTE LEADERSHIP */}
          <MemberSectionEditor
            title="4. Senior Institute Leadership"
            sectionTitle={seniorTitle}
            setSectionTitle={setSeniorTitle}
            desc={seniorDesc}
            setDesc={setSeniorDesc}
            secDesc={seniorSecDesc}
            setSecDesc={setSeniorSecDesc}
            members={seniorMembers}
            setMembers={setSeniorMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="senior"
            uploadingField={uploadingField}
          />

          {/* 5. SCIENTIFIC COUNCIL */}
          <MemberSectionEditor
            title="5. Scientific Council"
            sectionTitle={scientificTitle}
            setSectionTitle={setScientificTitle}
            desc={scientificDesc}
            setDesc={setScientificDesc}
            members={scientificMembers}
            setMembers={setScientificMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="scientific"
            uploadingField={uploadingField}
          />

          {/* 6. ADVISORY BOARD */}
          <MemberSectionEditor
            title="6. Advisory Board"
            sectionTitle={advisoryTitle}
            setSectionTitle={setAdvisoryTitle}
            desc={advisoryDesc}
            setDesc={setAdvisoryDesc}
            secDesc={advisorySecDesc}
            setSecDesc={setAdvisorySecDesc}
            members={advisoryMembers}
            setMembers={setAdvisoryMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="advisory"
            uploadingField={uploadingField}
          />

          {/* 7. ACADEMIC & RESEARCH LEADERSHIP */}
          <MemberSectionEditor
            title="7. Academic & Research Leadership"
            sectionTitle={academicTitle}
            setSectionTitle={setAcademicTitle}
            desc={academicDesc}
            setDesc={setAcademicDesc}
            secDesc={academicSecDesc}
            setSecDesc={setAcademicSecDesc}
            members={academicMembers}
            setMembers={setAcademicMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="academic"
            uploadingField={uploadingField}
          />

          {/* 8. EXECUTIVE LEADERSHIP */}
          <MemberSectionEditor
            title="8. Executive Leadership"
            sectionTitle={execTitle}
            setSectionTitle={setExecTitle}
            desc={execDesc}
            setDesc={setExecDesc}
            secDesc={execSecDesc}
            setSecDesc={setExecSecDesc}
            members={execMembers}
            setMembers={setExecMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="exec"
            uploadingField={uploadingField}
          />

          {/* 9. RESEARCH FACULTY */}
          <MemberSectionEditor
            title="9. Research Faculty"
            sectionTitle={facultyTitle}
            setSectionTitle={setFacultyTitle}
            desc={facultyDesc}
            setDesc={setFacultyDesc}
            members={facultyMembers}
            setMembers={setFacultyMembers}
            onUpload={handleImageUpload}
            uploadingFieldKey="faculty"
            uploadingField={uploadingField}
          />

          {/* 10. ORGANIZATIONAL STRUCTURE */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">10. Organizational Structure Framework</h2>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Title</label>
              <input
                type="text"
                value={orgTitle}
                onChange={(e) => setOrgTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 1</label>
              <textarea
                rows={3}
                value={orgP1}
                onChange={(e) => setOrgP1(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Paragraph 2</label>
              <textarea
                rows={3}
                value={orgP2}
                onChange={(e) => setOrgP2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* 11. CTA BOTTOM BANNER */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
            <h2 className="text-xl font-serif text-slate-900 border-b border-slate-100 pb-3">11. Bottom CTA Banner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Title</label>
                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Text</label>
                <input
                  type="text"
                  value={ctaBtnText}
                  onChange={(e) => setCtaBtnText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">CTA Description</label>
              <textarea
                rows={2}
                value={ctaDesc}
                onChange={(e) => setCtaDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Button Link URL</label>
              <input
                type="text"
                value={ctaBtnLink}
                onChange={(e) => setCtaBtnLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-4 rounded-full transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? "Saving Changes..." : "Save Governance Page Settings"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// Sub-component for rendering & managing group member lists cleanly
interface MemberSectionEditorProps {
  title: string;
  sectionTitle: string;
  setSectionTitle: (val: string) => void;
  desc: string;
  setDesc: (val: string) => void;
  secDesc?: string;
  setSecDesc?: (val: string) => void;
  members: MemberItem[];
  setMembers: (val: MemberItem[]) => void;
  onUpload: (file: File, key: string, setter: (m: MemberItem[]) => void, members: MemberItem[], idx: number) => void;
  uploadingFieldKey: string;
  uploadingField: string | null;
}

function MemberSectionEditor({
  title,
  sectionTitle,
  setSectionTitle,
  desc,
  setDesc,
  secDesc,
  setSecDesc,
  members,
  setMembers,
  onUpload,
  uploadingFieldKey,
  uploadingField,
}: MemberSectionEditorProps) {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-xl font-serif text-slate-900">{title}</h2>
        <button
          type="button"
          onClick={() =>
            setMembers([
              ...members,
              { id: String(Date.now()), name: "New Member Name", designation: "Role / Title", imageUrl: "/images/team/placeholder.jpg", badgeVariant: "emerald" },
            ])
          }
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-lg hover:bg-emerald-100"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Section Heading</label>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Primary Description</label>
          <textarea
            rows={2}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
          />
        </div>
        {secDesc !== undefined && setSecDesc && (
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Secondary Description (Optional)</label>
            <textarea
              rows={2}
              value={secDesc}
              onChange={(e) => setSecDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
            />
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Members List ({members.length})</h3>
        {members.map((m, idx) => (
          <div key={m.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Member #{idx + 1}</span>
              <button type="button" onClick={() => setMembers(members.filter((_, i) => i !== idx))} className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={m.name}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[idx].name = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Designation / Role</label>
                <input
                  type="text"
                  value={m.designation || m.role || ""}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[idx].designation = e.target.value;
                    setMembers(updated);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Member Image URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={m.imageUrl}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[idx].imageUrl = e.target.value;
                    setMembers(updated);
                  }}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <label className="cursor-pointer inline-flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-900 shrink-0">
                  <Upload className="w-3 h-3" />
                  <span>{uploadingField === `${uploadingFieldKey}-${idx}` ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0], uploadingFieldKey, setMembers, members, idx)}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}