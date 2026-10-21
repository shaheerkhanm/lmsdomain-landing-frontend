import React from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`font-urbanist mb-12 lg:mb-16 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5 ${
            isCenter ? "justify-center" : "justify-start"
          }`}
        >
          <span>✦</span>
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-[30px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-[#161616] mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[16px] lg:text-[18px] text-[#6B6F76] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
