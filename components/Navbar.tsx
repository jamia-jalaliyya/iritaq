"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about" },
      { label: "International Partnerships", href: "/international-partnerships" },
      { label: "Governance", href: "/governance" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Academic Programs", href: "/academic-programs" },
      { label: "Admission", href: "/admission" },
      { label: "Academic Departments", href: "/departments" },
    ],
  },
  { label: "Research", href: "/research" },
  {
    label: "Publications",
    children: [
      { label: "Publications Catalogue", href: "/publications" },
      { label: "Digital Library", href: "/digital-library" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Media Center", href: "/media-center" },
      { label: "News", href: "/news" },
    ],
  },
  { label: "Conference", href: "/conference" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState("EN");
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [hideAtFooter, setHideAtFooter] = useState(false);

  // Scroll detection for floating nav and footer boundary check
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingNav(scrollY > 150);

      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setHideAtFooter(footerRect.top <= window.innerHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Google Translate Automatic Integration Effect
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
      (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
        new (window as unknown as { google: { translate: { TranslateElement: new (arg: unknown, id: string) => void } } }).google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      };
    };
    addGoogleTranslateScript();
  }, []);

  const handleLanguageToggle = (lang: string) => {
    setCurrentLang(lang);
    document.documentElement.lang = lang.toLowerCase() === "ar" ? "ar" : "en";

    const selectField = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (selectField) {
      selectField.value = lang.toLowerCase() === "ar" ? "ar" : "en";
      selectField.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs">
        {/* Hidden Google Translate Container */}
        <div id="google_translate_element" className="hidden" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Left: Logo & Text PNG */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative w-40 h-20 sm:w-40 sm:h-20">
              <Image
                src="/logo-iritaq.png"
                alt="IRITAQ Title"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Nav Items */}
          <nav className="hidden lg:flex items-center justify-between flex-1 max-w-2xl mx-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative text-center"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors tracking-wide whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="inline-flex items-center justify-center gap-1 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors tracking-wide whitespace-nowrap">
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-xl border border-amber-200/60 py-3 mt-1 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#faf8f5] hover:text-emerald-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Language Toggle & Mobile Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Toggle */}
            <div className="flex items-center bg-[#f4f0e6] border border-amber-200/60 rounded-full p-0.5 text-[11px] sm:text-xs font-bold">
              <button
                onClick={() => handleLanguageToggle("EN")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currentLang === "EN" ? "bg-[#0c3823] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageToggle("AR")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currentLang === "AR" ? "bg-[#0c3823] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                AR
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-[#f4f0e6] transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Floating Transparent Rounded Nav Bar (Appears on Scroll, Excludes Logo & Language Switcher) */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-35 hidden lg:flex items-center bg-[#faf8f5]/85 backdrop-blur-md border border-amber-200/70 shadow-lg rounded-full px-6 py-2.5 transition-all duration-300 ${
          showFloatingNav && !hideAtFooter
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <div
              key={`float-${item.label}`}
              className="relative text-center group"
              onMouseEnter={() => item.children && setActiveDropdown(`float-${item.label}`)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center py-1 text-xs font-semibold text-slate-800 hover:text-emerald-800 transition-colors tracking-wide whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="inline-flex items-center justify-center gap-1 py-1 text-xs font-semibold text-slate-800 hover:text-emerald-800 transition-colors tracking-wide whitespace-nowrap">
                  <span>{item.label}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>
              )}

              {/* Floating Nav Dropdown Menu */}
              {item.children && activeDropdown === `float-${item.label}` && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-xl border border-amber-200/60 py-3 mt-2 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#faf8f5] hover:text-emerald-800 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Side Drawer Menu (Rendered at Root/Body level via Fixed Positioning) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-4/5 max-w-xs h-full bg-[#faf8f5] shadow-2xl flex flex-col p-6 overflow-y-auto z-50 border-l border-amber-200/60">
            <div className="flex items-center justify-between pb-4 border-b border-amber-200/50 mb-4">
              <span className="font-serif text-base text-slate-800 font-semibold">IRITAQ</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-700 hover:bg-amber-100/40 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:bg-amber-100/40 transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)
                      }
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:bg-amber-100/40 transition text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {item.children && mobileSubmenu === item.label && (
                    <div className="flex flex-col pl-3 py-1 gap-1 bg-amber-50/50 rounded-xl my-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="py-2 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/80 transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}