"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FeatureCategory } from "@/types/content";
import {
  CourseLearningScene,
  AssessmentScene,
  LearnerEngagementScene,
  AiToolsScene,
  LiveCohortScene,
  CourseSalesScene,
  ContentPublishingScene,
  AdministrationScene,
  BrandingScene,
} from "./CategoryMiniScenes";
import { ArrowUpRight } from "lucide-react";

interface BentoOverviewProps {
  categories: FeatureCategory[];
  labels?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    [key: string]: any;
  };
}

export function BentoOverview({
  categories,
  labels = {
    eyebrow: "✦ CATEGORY BENTO",
    title: "Everything at a Glance",
    subtitle: "Explore all 9 product domains. Tap any category to inspect its full feature breakdown.",
  },
}: BentoOverviewProps) {
  const prefersReduced = useReducedMotion();

  // Map slugs to their specific mini illustration component
  const getIllustration = (slug: string, isVisible: boolean) => {
    switch (slug) {
      case "course-learning":
        return <CourseLearningScene size="sm" isActive={isVisible} />;
      case "assessment-and-evaluation":
        return <AssessmentScene size="sm" isActive={isVisible} />;
      case "learner-engagement":
        return <LearnerEngagementScene size="sm" isActive={isVisible} />;
      case "ai-powered-tools":
        return <AiToolsScene size="sm" isActive={isVisible} />;
      case "live-and-cohort-learning":
        return <LiveCohortScene size="sm" isActive={isVisible} />;
      case "course-sales-and-payments":
        return <CourseSalesScene size="sm" isActive={isVisible} />;
      case "content-publishing-and-digital-products":
        return <ContentPublishingScene size="sm" isActive={isVisible} />;
      case "administration-and-communication":
        return <AdministrationScene size="sm" isActive={isVisible} />;
      case "branding-website-and-reach":
        return <BrandingScene size="sm" isActive={isVisible} />;
      default:
        return null;
    }
  };

  // Determine grid spans for the 12-column bento
  const getGridSpanClass = (slug: string) => {
    switch (slug) {
      case "course-learning":
        return "col-span-12 lg:col-span-6 lg:row-span-2";
      case "ai-powered-tools":
        return "col-span-12 lg:col-span-6 lg:row-span-2";
      case "course-sales-and-payments":
        return "col-span-12 md:col-span-6 lg:col-span-6 lg:row-span-1";
      case "branding-website-and-reach":
        return "col-span-12 md:col-span-6 lg:col-span-6 lg:row-span-1";
      default:
        return "col-span-12 md:col-span-6 lg:col-span-3 lg:row-span-1";
    }
  };

  const handleTileClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const target = document.getElementById(`category-${slug}`);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 100;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(top, { offset: 0, duration: 1.2 });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="features-bento"
      className="bg-[#F3F4F6] py-16 sm:py-20 lg:py-24 font-urbanist relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] shadow-2xs mb-4">
            <span>✦</span>
            <span>{labels.eyebrow ? labels.eyebrow.replace(/^✦\s*/, "") : "CATEGORY BENTO"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] text-[#161616] leading-[1.15] mb-4">
            {labels.title || "Everything at a Glance"}
          </h2>

          <p className="text-base sm:text-lg text-[#6B6F76] leading-relaxed">
            {labels.subtitle ||
              "Explore all 9 product domains. Tap any category to inspect its full feature breakdown."}
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <BentoTile
              key={cat.slug}
              category={cat}
              spanClass={getGridSpanClass(cat.slug)}
              index={idx}
              illustration={getIllustration(cat.slug, true)}
              onClick={(e) => handleTileClick(e, cat.slug)}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BentoTileProps {
  category: FeatureCategory;
  spanClass: string;
  index: number;
  illustration: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  prefersReduced: boolean | null;
}

function BentoTile({
  category,
  spanClass,
  index,
  illustration,
  onClick,
  prefersReduced,
}: BentoTileProps) {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: -100, y: -100, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handlePointerLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  };

  const hasPremium = category.isPremium || category.features.some((f) => f.isPremium);

  return (
    <motion.a
      ref={tileRef}
      href={`#category-${category.slug}`}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      className={`group relative rounded-[28px] bg-white border border-[#E5E7EB] p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${spanClass}`}
    >
      {/* Spotlight cursor glow overlay */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[28px] transition-opacity duration-300"
          style={{
            opacity: coords.opacity,
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(123, 92, 245, 0.14), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top Header */}
      <div className="relative z-10 space-y-2 mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B5CF5]">
              {category.features.length} Features
            </span>
            {hasPremium && (
              <span className="text-[10px] font-semibold text-[#7B5CF5] bg-[#7B5CF5]/10 px-2 py-0.5 rounded-full">
                ✦ Premium
              </span>
            )}
          </div>
          <div className="size-7 rounded-full bg-[#F3F4F6] group-hover:bg-[#7B5CF5] text-[#161616] group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#161616] leading-snug">
          {category.title}
        </h3>

        <p className="text-xs sm:text-[13px] text-[#6B6F76] leading-relaxed line-clamp-2">
          {category.intro}
        </p>
      </div>

      {/* Live Looping Product Moment Illustration */}
      <div className="relative z-10 w-full mt-auto pt-2 flex items-center justify-center">
        {illustration}
      </div>
    </motion.a>
  );
}

export default BentoOverview;
