import React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children: React.ReactNode;
  tone?: "violet" | "emerald" | "dark" | "neutral" | "gradient";
  icon?: React.ReactNode;
  className?: string;
}

const TONE_CLASSES = {
  violet: "bg-[#EEE9FF] text-[#5925DC] border-[#DDD6FE]",
  emerald: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
  dark: "bg-white/10 text-white border-white/20",
  neutral: "bg-slate-100 text-[#161616] border-slate-200",
  gradient: "border-0 bg-transparent p-0 text-grad-v4 tracking-[0.12em] text-[11.5px] font-semibold uppercase shadow-none",
} as const;

export function Eyebrow({
  children,
  tone = "violet",
  icon,
  className,
}: EyebrowProps) {
  if (tone === "gradient") {
    return (
      <span
        className={cn(
          "inline-block font-sans text-[11.5px] leading-none font-semibold uppercase tracking-[0.12em] text-grad-v4 mb-3.5 select-none",
          className
        )}
      >
        {children}
      </span>
    );
  }

  const defaultIcon = icon ?? (
    <span aria-hidden="true" className="shrink-0 text-[10px]">
      ✦
    </span>
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] shadow-2xs select-none transition-colors",
        TONE_CLASSES[tone],
        className
      )}
    >
      {defaultIcon}
      <span>{children}</span>
    </div>
  );
}

export default Eyebrow;

