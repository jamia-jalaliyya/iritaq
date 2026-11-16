'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Save, Loader2, CheckCircle, BookOpen, Plus, Trash2 } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FocusAreaItem {
  id: string;
  label: string;
}

const DEFAULT_FOCUS_AREAS: FocusAreaItem[] = [
  { id: 'fa-1', label: 'Islamic Jurisprudence & Usul al-Fiqh' },
  { id: 'fa-2', label: 'Comparative Religious Studies' },
  { id: 'fa-3', label: 'Arabic Language & Literature' },
  { id: 'fa-4', label: 'Contemporary Social Sciences' },
  { id: 'fa-5', label: 'Educational Theory & Curriculum Design' },
  { id: 'fa-6', label: 'Middle Eastern & Islamic History' },
];

export default function AdminJournalPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    tag: 'Majallah Al-Iritaq for Islamic Studies (MJIS)',
    title: 'Jamia Jalaliyya Academic Journal',
    description:
      'Advancing scholarly research, contemporary Islamic studies, humanities, and multidisciplinary academic discourse through rigorous peer review.',
    externalUrl: 'https://journal.iritaq.info/index.php/mjis/en',
    stats: {
      reviewProcess: 'Double-Blind',
      format: 'Digital Portal',
      accessType: 'Open Access',
    },
    focusScopeDescription:
      'The journal serves as a premier platform for academics, researchers, and students to publish findings covering a wide array of disciplines including Islamic jurisprudence, philosophy, contemporary social sciences, Arabic-English literature, and historical studies.',
    ctaBanner: {
      title: 'Ready to submit your research paper?',
      subtitle:
        'Review our author guidelines and submit your manuscript through our official portal.',
    },
  });

  const [focusAreas, setFocusAreas] = useState<FocusAreaItem[]>(DEFAULT_FOCUS_AREAS);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('academic_journal_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching journal settings:', error);
        } else if (data && isMounted) {
          setFormData((prev) => ({
            tag: data.tag || prev.tag,
            title: data.title || prev.title,
            description: data.description || prev.description,
            externalUrl: data.externalUrl || prev.externalUrl,
            stats: data.stats || prev.stats,
            focusScopeDescription:
              data.focusScopeDescription || prev.focusScopeDescription,
            ctaBanner: data.ctaBanner || prev.ctaBanner,
          }));

          if (Array.isArray(data.focusAreas) && data.focusAreas.length > 0) {
            setFocusAreas(
              data.focusAreas.map((label: string, idx: number) => ({
                id: `fa-${idx}-${crypto.randomUUID()}`,
                label,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Unexpected error loading admin journal settings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddFocusArea = () => {
    setFocusAreas((prev) => [
      ...prev,
      { id: `fa-${crypto.randomUUID()}`, label: 'New Focus Area' },
    ]);
  };

  const handleUpdateFocusArea = (id: string, newValue: string) => {
    setFocusAreas((prev) =>
      prev.map((item) => (item.id === id ? { ...item, label: newValue } : item))
    );
  };

  const handleDeleteFocusArea = (id: string) => {
    setFocusAreas((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        id: 1,
        ...formData,
        focusAreas: focusAreas
          .map((item) => item.label.trim())
          .filter((label) => label.length > 0),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('academic_journal_settings')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        throw error;
      }

      setSuccessMessage('Academic journal settings successfully updated!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: unknown) {
      console.error('Error saving journal settings:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to save settings. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-800" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Portal Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900">
            Academic Journal Settings
          </h1>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-lg font-serif font-medium text-slate-800 border-b border-slate-100 pb-3">
            Header & Hero Details
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Journal Tag / Subheading
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Journal Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Official External Portal URL
            </label>
            <input
              type="url"
              value={formData.externalUrl}
              onChange={(e) =>
                setFormData({ ...formData, externalUrl: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              required
            />
          </div>
        </div>

        {/* Quick Stats Metadata */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-lg font-serif font-medium text-slate-800 border-b border-slate-100 pb-3">
            Quick Stats / Badges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Review Process
              </label>
              <input
                type="text"
                value={formData.stats.reviewProcess}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, reviewProcess: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Format
              </label>
              <input
                type="text"
                value={formData.stats.format}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, format: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Access Type
              </label>
              <input
                type="text"
                value={formData.stats.accessType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, accessType: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Focus & Scope Areas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-serif font-medium text-slate-800">
              Focus & Scope Areas
            </h2>
            <button
              type="button"
              onClick={handleAddFocusArea}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl hover:bg-emerald-100 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Area
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Scope Summary Description
            </label>
            <textarea
              rows={3}
              value={formData.focusScopeDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  focusScopeDescription: e.target.value,
                })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
            />
          </div>

          <div className="space-y-3 pt-2">
            {focusAreas.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    handleUpdateFocusArea(item.id, e.target.value)
                  }
                  placeholder="Enter focus area..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteFocusArea(item.id)}
                  className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                  aria-label="Delete focus area"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-lg font-serif font-medium text-slate-800 border-b border-slate-100 pb-3">
            Bottom Call-to-Action Banner
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Banner Heading
            </label>
            <input
              type="text"
              value={formData.ctaBanner.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ctaBanner: { ...formData.ctaBanner, title: e.target.value },
                })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Banner Subtitle
            </label>
            <input
              type="text"
              value={formData.ctaBanner.subtitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ctaBanner: {
                    ...formData.ctaBanner,
                    subtitle: e.target.value,
                  },
                })
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Journal Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}