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
      {/* Top Designation Header (Outside the Photo) */}
      {designationText && (
        <div
          className={`px-2.5 py-2 text-center border-b transition-colors ${
            isAmber
              ? "bg-amber-900/95 text-amber-50 border-amber-500/30"
              : isDarkContainer
              ? "bg-emerald-950/90 text-amber-300 border-emerald-800/80"
              : "bg-[#1b4d3e] text-white border-emerald-900/15"
          }`}
        >
          <span
            className={`block font-semibold uppercase leading-[1.15] tracking-wide whitespace-normal break-words ${getFontSizeClass(
              designationText
            )}`}
          >
            {designationText}
          </span>
        </div>
      )}

      {/* Unobstructed Full-Bleed Portrait Container */}
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