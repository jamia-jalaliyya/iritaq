"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import {
  Lock,
  Mail,
  Home,
  Info,
  Shield,
  Search,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Library,
  Globe,
  Newspaper,
  Video,
  UserCheck,
  Phone,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

const MANAGEMENT_PAGES = [
  { name: "Home", href: "/admin/home", icon: Home, description: "Manage hero banners, announcements, and homepage layout." },
  { name: "About", href: "/admin/about", icon: Info, description: "Manage mission, vision, history, and overview." },
  { name: "Governance", href: "/admin/governance", icon: Shield, description: "Manage leadership, board members, and policies." },
  { name: "Research", href: "/admin/research", icon: Search, description: "Manage research projects, labs, and domain areas." },
  { name: "Academic Departments", href: "/admin/academic-departments", icon: GraduationCap, description: "Manage faculties, departments, and staff rosters." },
  { name: "Publications", href: "/admin/publications", icon: BookOpen, description: "Manage journals, papers, and publication catalogs." },
  { name: "Conference", href: "/admin/conference", icon: Users, description: "Manage upcoming/past conferences and registrations." },
  { name: "Academic Programs", href: "/admin/academic-programs", icon: Award, description: "Manage degree programs, courses, and curricula." },
  { name: "Digital Library", href: "/admin/digital-library", icon: Library, description: "Manage core digital library settings and portal." },
  { name: "Digital Library Collections", href: "/admin/digital-library/collections", icon: Library, description: "Manage catalog collections, archives, and repositories." },
  { name: "Digital Library Details", href: "/admin/digital-library/details", icon: Library, description: "Manage resource metadata, access links, and specifications." },
  { name: "International Partnerships", href: "/admin/international-partnerships", icon: Globe, description: "Manage foreign university MOUs and exchange programs." },
  { name: "News", href: "/admin/news", icon: Newspaper, description: "Manage news articles, announcements, and press updates." },
  { name: "Media Center", href: "/admin/media-center", icon: Video, description: "Manage photo galleries, video archives, and press kits." },
  { name: "Admission", href: "/admin/admission", icon: UserCheck, description: "Manage admission criteria, forms, and deadlines." },
  { name: "Contact", href: "/admin/contact", icon: Phone, description: "Manage contact details, locations, and user inquiries." },
];

export default function AdminPage() {
  const { data: session, status } = useSession();

  // Login Form Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NextAuth Login Handler
  const handleNextAuthLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (res?.error) {
      setLoginError("Invalid credentials. Please check your email and password.");
    }
  };

  // ---------------------------------------------------------------------------
  // 1. LOADING STATE
  // ---------------------------------------------------------------------------
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
        <p className="text-xs tracking-wider uppercase font-medium text-slate-400">
          Authenticating Session...
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. NEXTAUTH LOGIN SCREEN (Unauthenticated)
  // ---------------------------------------------------------------------------
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mb-4 shadow-inner">
              <Lock className="w-8 h-8 text-emerald-700" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              IRITAQ Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
            Authenticated Session
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleNextAuthLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@iritaq.org"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-medium py-3 rounded-lg text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. ADMIN DASHBOARD SCREEN (Authenticated)
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Management Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select a page section below to redirect to its dedicated management module.
            </p>
          </div>
          <span className="self-start md:self-auto text-xs px-3 py-1 bg-emerald-50 text-emerald-800 font-medium rounded-full border border-emerald-200">
            {MANAGEMENT_PAGES.length} Modules Available
          </span>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MANAGEMENT_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.name}
                href={page.href}
                className="group bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-600 hover:shadow-md transition flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-800 group-hover:text-emerald-800 transition">
                    {page.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {page.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition">
                  <span>Manage Section</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}