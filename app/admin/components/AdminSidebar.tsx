"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Session, createClient } from "@supabase/supabase-js";
import {
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
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const NAV_ITEMS = [
  { label: "Home", href: "/admin/home", icon: Home },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Governance", href: "/admin/governance", icon: Shield },
  { label: "Research", href: "/admin/research", icon: Search },
  { label: "Academic Departments", href: "/admin/departments", icon: GraduationCap },
  { label: "Publications", href: "/admin/publications", icon: BookOpen },
  { label: "Conference", href: "/admin/conference", icon: Users },
  { label: "Academic Programs", href: "/admin/academic-programs", icon: Award },
  { label: "Digital Library", href: "/admin/digital-library", icon: Library },
  { label: "Digital Library Collections", href: "/admin/digital-library/collections", icon: Library },
  { label: "Digital Library Details", href: "/admin/digital-library/details", icon: Library },
  { label: "International Partnerships", href: "/admin/international-partnerships", icon: Globe },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Media Center", href: "/admin/media-center", icon: Video },
  { label: "Admission", href: "/admin/admission", icon: UserCheck },
  { label: "Contact", href: "/admin/contact", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Fetch active Supabase session on mount & subscribe to changes
  useEffect(() => {
    async function getActiveSession() {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
      } catch (err) {
        console.error("Error checking sidebar session:", err);
      } finally {
        setLoading(false);
      }
    }

    getActiveSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 🔴 DO NOT RENDER SIDEBAR IF USER IS NOT LOGGED IN
  if (loading || !session) {
    return null;
  }

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-neutral-900 text-white px-4 py-3 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white text-xs shadow">
            I
          </div>
          <span className="font-serif font-bold text-sm tracking-wide">
            IRITAQ Admin
          </span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-neutral-800 focus:outline-none cursor-pointer"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile drawer */}
      {isMobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-neutral-900 text-slate-300 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center font-bold text-white shadow-md group-hover:scale-105 transition-transform">
              I
            </div>
            <div>
              <h1 className="font-serif text-base font-bold text-white tracking-wide leading-tight">
                IRITAQ
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge / Session Info */}
        <div className="mx-3 mt-4 mb-2 p-3 rounded-xl bg-neutral-800/60 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-semibold text-xs shrink-0">
            {session.user?.email ? session.user.email[0].toUpperCase() : "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {session.user?.email || "Admin User"}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              Authorized User
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-700 text-white font-semibold shadow-sm"
                    : "text-slate-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-200 shrink-0" />}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Public Site
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}