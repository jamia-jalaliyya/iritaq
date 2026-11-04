// app/research/page.tsx
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  FileText, 
  CheckCircle, 
  Wallet, 
  ShieldCheck, 
  Building2, 
  FileCode,
  Scroll,
  Landmark,
  Cpu,
  FileSpreadsheet
} from "lucide-react";
import { researchData } from "@/lib/researchData";

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  FlaskConical,
  FileText,
  CheckCircle,
  Wallet,
  ShieldCheck,
  Building2,
  FileCode,
  Scroll,
  Landmark,
  Cpu,
  FileSpreadsheet,
};

export default function ResearchPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION (ROUNDED CARD VERSION) */}
      <section className="pt-4 pb-6 w-full mx-auto px-4 md:pt-8">
        <div className="relative py-12 sm:py-16 md:py-20 bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Background Images with High Visibility & Softer Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background Image */}
            <Image
              src={researchData.hero.backgroundImage}
              alt="Research Backdrop"
              fill
              className="hidden md:block object-cover object-center opacity-75"
              priority
            />
            {/* Mobile Background Image */}
            <Image
              src={researchData.hero.mobileBackgroundImage || researchData.hero.backgroundImage}
              alt="Research Backdrop Mobile"
              fill
              className="block md:hidden object-cover object-center opacity-75"
              priority
            />
            {/* Subtle linear overlay to preserve high image visibility while maintaining text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 md:px-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-amber-300 mb-6 font-medium tracking-wide">
              <Link href="/" className="hover:underline transition-colors">Home</Link>
              <span>&gt;</span>
              <span className="text-amber-100">Research</span>
            </nav>

            {/* Section Sub-heading / Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-amber-500" />
              <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                {researchData.hero.badge}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight max-w-3xl mb-6 drop-shadow-sm">
              {researchData.hero.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light drop-shadow-sm">
              {researchData.hero.description}
            </p>
          </div>

        </div>
      </section>

      {/* 2. EXPLORE OUR RESEARCH AREAS (GRID CARDS) */}
      <section className="py-20 w-full mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-emerald-700" />
            <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
              RESEARCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
            Explore Our Research Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchData.navigationCards.map((card) => {
            const IconComponent = iconMap[card.icon] || BookOpen;
            return (
              <div
                key={card.id}
                className="group bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5 group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-slate-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <Link
                  href={card.link}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-800 group-hover:text-emerald-900 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. KEY METRICS & STATS BANNER */}
      <section className="bg-slate-100/90 border-y border-slate-200/80 py-12">
        <div className="w-full mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {researchData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-800 mb-2">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RESEARCH DOMAINS SECTION */}
      <section id="domains" className="py-20 w-full mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-emerald-700" />
              <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                DOMAINS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
              Research Domains
            </h2>
          </div>

          <Link
            href="/domains"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-900 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2 Rows x 4 Columns List Grid with Border Separators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {researchData.domains.map((domain) => {
            const IconComp = iconMap[domain.icon] || BookOpen;
            return (
              <div key={domain.id} className="border-t border-amber-400/80 pt-6 flex flex-col justify-between">
                <div className="w-8 h-8 text-emerald-800 mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-medium text-slate-800 leading-snug">
                  {domain.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ONGOING RESEARCH PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-[#f7f5f0] border-t border-slate-200/80">
        <div className="w-full mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-emerald-700" />
                <span className="text-emerald-800 text-xs font-semibold tracking-widest uppercase">
                  PROJECTS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-800">
                Ongoing Research Projects
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-900 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {researchData.ongoingProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-16/10 bg-slate-100">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-slate-800 mb-3 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-4">
                      {project.author} · {project.category}
                    </p>
                  </div>

                  <p className="text-xs font-semibold text-emerald-800">
                    {project.status} · {project.dateRange}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Proposal Action Button */}
          <div>
            <Link
              href="/submit-proposal"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition shadow-md"
            >
              <span>Submit Your Research Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-12 px-4 sm:px-6 lg:px-4">
        <div className="w-full mx-auto bg-[#04402a] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-emerald-900/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white mb-4">
                {researchData.cta.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {researchData.cta.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href={researchData.cta.primaryButtonLink}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition shadow-lg"
              >
                <span>{researchData.cta.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={researchData.cta.secondaryButtonLink}
                className="border border-emerald-400/60 hover:bg-emerald-900/50 text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition"
              >
                <span>{researchData.cta.secondaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}