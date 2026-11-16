// components/governance/MemberCard.tsx
import Image from "next/image";
import { LeadershipMember } from "@/types/governance";

interface MemberCardProps {
  member: LeadershipMember;
  isDarkContainer?: boolean;
  aspectRatio?: string;
}

export function MemberCard({
  member,
  isDarkContainer = false,
  aspectRatio = "aspect-[4/5]",
}: MemberCardProps) {
  const isAmber = member.badgeVariant === "amber";
  const designationText = member.designation || "";

  const getFontSizeClass = (text: string) => {
    if (text.length > 35) {
      return "text-[7px] xs:text-[7.5px] sm:text-[8px] md:text-[8.5px]";
    }
    if (text.length > 22) {
      return "text-[8px] xs:text-[8.5px] sm:text-[9px] md:text-[9.5px]";
    }
    return "text-[9px] xs:text-[9.5px] sm:text-[10px] md:text-[10.5px]";
  };

  return (
    <div
      className={`group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col w-full ${
        isDarkContainer
          ? "bg-emerald-900/40 border border-emerald-800/60 shadow-lg hover:border-emerald-500/60 hover:shadow-emerald-950/50"
          : "bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-700/30"
      }`}
    >
      {/* Full-Bleed Portrait Container */}
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden ${
          isDarkContainer ? "bg-emerald-950" : "bg-[#d8ebf9]"
        }`}
      >
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-[center_15%] scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Smooth Gradient Vignette for Floating Pill Contrast */}
        <div
          className={`absolute inset-0 bg-linear-to-t ${
            isDarkContainer
              ? "from-emerald-950/90 via-emerald-950/15 to-transparent"
              : "from-slate-950/75 via-slate-950/10 to-transparent"
          } opacity-90`}
        />

        {/* Floating Glassmorphic Designation Pill */}
        {designationText && (
          <div className="absolute bottom-2.5 inset-x-2.5 z-10">
            <span
              className={`block w-full py-1.5 px-2 rounded-lg backdrop-blur-md shadow-sm font-semibold uppercase text-center leading-[1.1] tracking-wide whitespace-normal wrap-break-word transition-colors ${getFontSizeClass(
                designationText
              )} ${
                isAmber
                  ? "bg-amber-900/90 text-amber-50 border border-amber-500/40"
                  : isDarkContainer
                  ? "bg-emerald-950/85 text-amber-300 border border-emerald-700/60"
                  : "bg-[#1b4d3e]/90 text-white border border-white/15"
              }`}
            >
              {designationText}
            </span>
          </div>
        )}
      </div>

      {/* Unified Editorial Name Footer */}
      <div
        className={`px-3 py-3.5 sm:py-4 text-center flex-1 flex items-center justify-center ${
          isDarkContainer ? "bg-emerald-950/60" : "bg-white"
        }`}
      >
        <h3
          className={`text-xs sm:text-sm md:text-[15px] font-serif font-medium leading-snug transition-colors ${
            isDarkContainer
              ? "text-white group-hover:text-amber-300"
              : "text-slate-800 group-hover:text-emerald-800"
          }`}
        >
          {member.name}
        </h3>
      </div>
    </div>
  );
}