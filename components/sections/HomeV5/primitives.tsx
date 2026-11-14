import React from "react";
import { cn } from "@/lib/utils";

/*
 * v5 homepage design tokens (kept as literal Tailwind values so each section reads on its own):
 *   ink        #0A0A0B   headings, primary buttons
 *   body       #52525B   paragraph text
 *   muted      #71717A   secondary text, captions
 *   line       #E4E4E7   borders and dividers
 *   card       #F4F5F8   bento / feature card surface (on white page)
 *   accent     #6C4BFF   brand violet, used sparingly: eyebrows, links, focus, AI glow
 *   dark       #0B0B0F   the AI section only
 */

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("rv-v4", align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[640px]", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-5 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[13px] font-medium",
            dark ? "border-white/15 bg-white/[0.04] text-[#E4E4E7]" : "border-[#E4E4E7] bg-white text-[#27272A] shadow-[0_1px_2px_rgba(10,10,11,0.04)]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-urbanist text-[clamp(32px,4.4vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]",
          dark ? "text-white" : "text-[#0A0A0B]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-[16px] leading-[1.6] sm:text-[17px] [text-wrap:pretty]",
            dark ? "text-[#A1A1AA]" : "text-[#52525B]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Small white "chip" used inside bento illustrations, like the reference designs. */
export function UiChip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-[#ECECEF] bg-white shadow-[0_1px_2px_rgba(10,10,11,0.04),0_8px_24px_-12px_rgba(10,10,11,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-5 text-[14.5px] font-semibold text-[#0A0A0B] transition-colors hover:border-[#D4D4D8] hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]";
