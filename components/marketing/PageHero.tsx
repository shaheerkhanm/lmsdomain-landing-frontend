import React from "react";
import Link from "next/link";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
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
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  return (
    <section className="bg-white pt-[128px] lg:pt-[180px] pb-12 lg:pb-16 font-urbanist text-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-5">
            <span>✦</span>
            <span>{eyebrow}</span>
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
