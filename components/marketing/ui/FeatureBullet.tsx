import React from "react";
import { LucideIcon } from "lucide-react";

export interface FeatureBulletProps {
  icon: LucideIcon;
  leadText: string;
  restText: string;
  className?: string;
}

export function FeatureBullet({
  icon: Icon,
  leadText,
  restText,
  className = "",
}: FeatureBulletProps) {
  return (
    <div className={`flex items-start gap-[14px] ${className}`}>
      {/* 32px square tile, radius 9px, bg #FFFFFF, 1px border rgba(15,15,20,.08), shadow */}
      <div
        className="w-8 h-8 rounded-[9px] bg-white border border-[rgba(15,15,20,0.08)] shadow-[0_1px_2px_rgba(15,15,20,0.06),inset_0_-1px_0_rgba(15,15,20,0.04)] flex items-center justify-center shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <Icon size={16} strokeWidth={1.75} className="text-[#151517] w-4 h-4" />
      </div>

      {/* Text: first phrase in 600 ink #151517, rest in muted #6B6B78, 15px/1.5 */}
      <p className="text-[15px] leading-[1.5] text-[#6B6B78] m-0">
        <span className="font-semibold text-[#151517]">{leadText}</span>
        {restText}
      </p>
    </div>
  );
}

export default FeatureBullet;
