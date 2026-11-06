import React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children: React.ReactNode;
  tone?: "violet" | "emerald" | "dark" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

const TONE_CLASSES = {
  violet: "bg-[#EEE9FF] text-[#7B5CF5] border-[#DDD6FE]",
  emerald: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
  dark: "bg-white/10 text-white border-white/20",
  neutral: "bg-slate-100 text-[#161616] border-slate-200",
} as const;

export function Eyebrow({
  children,
  tone = "violet",
  icon = <span aria-hidden="true" className="shrink-0 text-[10px]">✦</span>,
  className,
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] shadow-2xs select-none transition-colors",
        TONE_CLASSES[tone],
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default Eyebrow;
