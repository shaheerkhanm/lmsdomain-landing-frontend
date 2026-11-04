"use client";

import React from "react";
import Link from "next/link";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import * as LucideIcons from "lucide-react";
import { useReducedMotion } from "motion/react";

export function FeatureMarquee() {
  const prefersReduced = useReducedMotion();

  // Gather all 38 features with their category and premium flags
  const allFeatures = React.useMemo(() => {
    return FEATURE_CATEGORIES.flatMap((cat) =>
      cat.features.map((feat) => ({
        ...feat,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
      }))
    );
  }, []);

  // Split cleanly into two rows (19 features each)
  const row1 = allFeatures.slice(0, 19);
  const row2 = allFeatures.slice(19);

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.CheckCircle2 className="size-3.5 text-[#7B5CF5]" />;
    const IconComponent = (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CheckCircle2;
    return <IconComponent className="size-3.5 text-[#7B5CF5] shrink-0" />;
  };

  const renderChip = (
    feat: (typeof allFeatures)[0],
    keySuffix: string,
    isDuplicate: boolean = false
  ) => {
    return (
      <Link
        key={`${feat.slug}-${keySuffix}`}
        href={`#${feat.slug}`}
        data-marquee="true"
        aria-hidden={isDuplicate ? "true" : undefined}
        tabIndex={isDuplicate ? -1 : 0}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] hover:border-[#7B5CF5]/40 text-xs font-medium text-[#161616] transition-all hover:scale-[1.02] shadow-2xs shrink-0 select-none cursor-pointer group"
      >
        {renderIcon(feat.icon)}
        <span data-marquee="true" className="whitespace-nowrap">{feat.title}</span>
        {feat.isPremium && (
          <span
            data-marquee="true"
            className="text-[9px] font-semibold text-[#7B5CF5] bg-[#7B5CF5]/10 px-1.5 py-0.5 rounded-full"
          >
            ✦ Premium
          </span>
        )}
      </Link>
    );
  };

  return (
    <section className="bg-white py-6 sm:py-8 border-y border-[#F0F1F3] overflow-hidden font-urbanist relative">
      {/* Visually hidden summary for screen readers */}
      <div className="sr-only">
        <h2>Complete Platform Feature Marquee</h2>
        <ul>
          {allFeatures.map((f) => (
            <li key={`sr-${f.slug}`}>
              {f.title} {f.isPremium ? "(Premium)" : ""}
            </li>
          ))}
        </ul>
      </div>

      {/* Gradient edge mask for desktop */}
      <div
        className="relative max-w-full"
        style={{
          maskImage: prefersReduced
            ? "none"
            : "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: prefersReduced
            ? "none"
            : "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Row 1: Slides Left (40s loop) */}
        <div className="flex overflow-hidden py-1.5 group">
          <div
            className={`flex items-center gap-3 shrink-0 ${
              prefersReduced
                ? "flex-wrap justify-center w-full"
                : "animate-marquee-left group-hover:[animation-play-state:paused]"
            }`}
          >
            {row1.map((f) => renderChip(f, "row1-a"))}
          </div>
          {!prefersReduced && (
            <div
              aria-hidden="true"
              className="flex items-center gap-3 shrink-0 animate-marquee-left group-hover:[animation-play-state:paused] ml-3"
            >
              {row1.map((f) => renderChip(f, "row1-b", true))}
            </div>
          )}
        </div>

        {/* Row 2: Slides Right (40s loop) */}
        <div className="flex overflow-hidden py-1.5 mt-1 group">
          <div
            className={`flex items-center gap-3 shrink-0 ${
              prefersReduced
                ? "flex-wrap justify-center w-full"
                : "animate-marquee-right group-hover:[animation-play-state:paused]"
            }`}
          >
            {row2.map((f) => renderChip(f, "row2-a"))}
          </div>
          {!prefersReduced && (
            <div
              aria-hidden="true"
              className="flex items-center gap-3 shrink-0 animate-marquee-right group-hover:[animation-play-state:paused] ml-3"
            >
              {row2.map((f) => renderChip(f, "row2-b", true))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 42s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 42s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default FeatureMarquee;
