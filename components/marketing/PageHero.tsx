import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pattern?: "dots" | "none";
  topStrip?: React.ReactNode;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  pattern = "none",
  topStrip,
  primaryCta,
  secondaryCta,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-white pt-[128px] lg:pt-[180px] pb-12 lg:pb-16 font-urbanist text-center", className)}
    >
      {/* Subtle Dot Grid Hero Pattern (§Prompt 02c) */}
      {pattern === "dots" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hero-dot-pattern"
        />
      )}

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {topStrip && (
          <div className="mb-6 flex justify-center">
            {topStrip}
          </div>
        )}

        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-5">
            <span>✦</span>
            <span>{eyebrow.replace(/^✦\s*/, "")}</span>
          </div>
        )}

        <h1 className="text-[36px] sm:text-[44px] lg:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#161616] max-w-4xl mx-auto mb-5">
          {title}
        </h1>

        {subtitle && (
          <p className="text-[17px] lg:text-[19px] text-[#6B6F76] max-w-[620px] mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            {primaryCta && (
              primaryCta.href ? (
                <Link
                  href={primaryCta.href}
                  className="px-6 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs active:scale-95"
                >
                  {primaryCta.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={primaryCta.onClick}
                  className="px-6 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  {primaryCta.label}
                </button>
              )
            )}

            {secondaryCta && (
              secondaryCta.href ? (
                <Link
                  href={secondaryCta.href}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all shadow-2xs active:scale-95"
                >
                  {secondaryCta.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={secondaryCta.onClick}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  {secondaryCta.label}
                </button>
              )
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

export default PageHero;
