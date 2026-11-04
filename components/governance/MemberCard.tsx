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
  aspectRatio = "aspect-[4/5]" 
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
    <div className="group flex flex-col items-center text-center w-full">
      {/* Outer Card Container */}
      <div 
        className={`relative w-full ${aspectRatio} rounded-2xl sm:rounded-3xl overflow-hidden bg-[#d8ebf9] border border-slate-200/80 shadow-sm group-hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
      >
        {/* Photo Container - Fills full space above/behind banner without cutoff */}
        <div className="relative w-full h-full flex-1">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover object-[center_15%] scale-105 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Slimmer Solid Banner at Bottom */}
        <div 
          className={`relative z-10 w-full h-10 sm:h-11 px-1.5 flex items-center justify-center transition-colors shrink-0 ${
            isAmber 
              ? "bg-amber-800 text-white" 
              : "bg-[#1b4d3e] text-white"
          }`}
        >
          {/* Caret/Triangle Peak */}
          <div 
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#d8ebf9]" 
          />

          {/* Designation Text */}
          <span 
            className={`font-semibold uppercase text-center leading-[1.05] tracking-tight whitespace-normal wrap-break-word ${getFontSizeClass(designationText)}`}
          >
            {designationText}
          </span>
        </div>
      </div>

      {/* Member Name */}
      <h3 
        className={`mt-3.5 text-xs sm:text-sm md:text-base font-serif font-medium leading-snug transition-colors ${
          isDarkContainer 
            ? "text-white group-hover:text-amber-300" 
            : "text-slate-800 group-hover:text-emerald-800"
        }`}
      >
        {member.name}
      </h3>
    </div>
  );
}