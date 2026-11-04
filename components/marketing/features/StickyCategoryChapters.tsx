"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FeatureCategory, Feature } from "@/types/content";
import * as LucideIcons from "lucide-react";
import {
  InteractiveWatchPercentage,
  InteractiveVideoCheckpoint,
} from "../InteractiveIllustrations";
import { FeatureVideoLoop } from "../FeatureVideoLoop";
import {
  CourseLearningScene,
  AssessmentScene,
  LearnerEngagementScene,
  LiveCohortScene,
  CourseSalesScene,
  ContentPublishingScene,
  AdministrationScene,
  BrandingScene,
} from "./CategoryMiniScenes";

interface StickyCategoryChaptersProps {
  categories: FeatureCategory[];
  media?: Record<string, any>;
}

export function StickyCategoryChapters({ categories, media }: StickyCategoryChaptersProps) {
  // Exclude AI-powered tools (covered in Section E)
  const sequenceCategories = categories.filter((c) => c.slug !== "ai-powered-tools");

  return (
    <div className="font-urbanist">
      {sequenceCategories.map((category, catIdx) => {
        // Alternating background: white / #F3F4F6
        const isWhite = catIdx % 2 === 0;
        return (
          <CategoryChapterSection
            key={category.slug}
            category={category}
            isWhite={isWhite}
            media={media}
          />
        );
      })}
    </div>
  );
}

interface CategoryChapterSectionProps {
  category: FeatureCategory;
  isWhite: boolean;
  media?: Record<string, any>;
}

function CategoryChapterSection({ category, isWhite, media }: CategoryChapterSectionProps) {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to detect which feature card is crossing the viewport centre
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-card-index"));
            if (!isNaN(index)) {
              setActiveFeatureIdx(index);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [category.features.length]);

  const getIllustration = (slug: string) => {
    switch (slug) {
      case "course-learning":
        return <CourseLearningScene size="lg" isActive={true} />;
      case "assessment-and-evaluation":
        return <AssessmentScene size="lg" isActive={true} />;
      case "learner-engagement":
        return <LearnerEngagementScene size="lg" isActive={true} />;
      case "live-and-cohort-learning":
        return <LiveCohortScene size="lg" isActive={true} />;
      case "course-sales-and-payments":
        return <CourseSalesScene size="lg" isActive={true} />;
      case "content-publishing-and-digital-products":
        return <ContentPublishingScene size="lg" isActive={true} />;
      case "administration-and-communication":
        return <AdministrationScene size="lg" isActive={true} />;
      case "branding-website-and-reach":
        return <BrandingScene size="lg" isActive={true} />;
      default:
        return null;
    }
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.CheckCircle2 className="size-5 text-[#7B5CF5]" />;
    const IconComponent = (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CheckCircle2;
    return <IconComponent className="size-5 text-[#7B5CF5]" />;
  };

  return (
    <section
      id={`category-${category.slug}`}
      className={`${
        isWhite ? "bg-white" : "bg-[#F3F4F6]"
      } py-16 sm:py-24 lg:py-28 transition-colors border-b border-[#E5E7EB]/60`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (40% desktop, Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
                  <span>✦</span>
                  <span>{category.eyebrow || category.title}</span>
                </span>
                {category.isPremium && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                    Premium
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#161616] leading-[1.15]">
                {getCategoryHeading(category.slug, category.title)}
              </h2>

              <p className="text-base text-[#6B6F76] leading-relaxed">
                {category.intro}
              </p>
            </div>

            {/* Desktop Active Feature Counter & Mini Scene */}
            <div className="hidden lg:block space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#8F94A0] uppercase tracking-wider">
                <span>Domain Simulation</span>
                <span className="text-[#7B5CF5]">
                  {activeFeatureIdx + 1} / {category.features.length}
                </span>
              </div>

              <div className="w-full">{getIllustration(category.slug)}</div>
            </div>
          </div>

          {/* Right Column (60% desktop, Scrolling Feature Cards) */}
          <div className="lg:col-span-7 space-y-6">
            {category.features.map((feature, idx) => {
              const isActive = activeFeatureIdx === idx;
              return (
                <div
                  key={feature.slug}
                  id={feature.slug}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-card-index={idx}
                  data-feature-slug={feature.slug}
                  className={`rounded-[28px] bg-white border p-6 sm:p-8 transition-all duration-300 shadow-xs ${
                    isActive
                      ? "border-[#7B5CF5] opacity-100 shadow-md ring-1 ring-[#7B5CF5]/20"
                      : "border-[#E5E7EB] lg:opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
                        {renderIcon(feature.icon)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F94A0]">
                        Feature 0{idx + 1}
                      </span>
                    </div>

                    {feature.isPremium && (
                      <span className="text-[10px] font-semibold text-[#7B5CF5] bg-[#7B5CF5]/10 px-2.5 py-1 rounded-full">
                        ✦ Premium
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Contextual Rich Media & Simulations */}
                  {renderFeatureAttachment(category.slug, feature.slug, media)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function getCategoryHeading(slug: string, fallback: string): string {
  switch (slug) {
    case "course-learning":
      return "Deliver Structured, Verifiable Course Curriculums";
    case "assessment-and-evaluation":
      return "Evaluate Mastery with Quizzes and Assignments";
    case "learner-engagement":
      return "Keep Learners Motivated from Start to Finish";
    case "live-and-cohort-learning":
      return "Connect Instructors and Learners in Real Time";
    case "course-sales-and-payments":
      return "Monetize Courses with Flexible Global Checkout";
    case "content-publishing-and-digital-products":
      return "Publish Books, Articles, and Knowledge Bases";
    case "administration-and-communication":
      return "Operate Your Academy with Controlled Roles";
    case "branding-website-and-reach":
      return "White-Label Your Academy on Your Own Domain";
    default:
      return fallback;
  }
}

function renderFeatureAttachment(
  categorySlug: string,
  featureSlug: string,
  media?: Record<string, any>
) {
  // 1. Assessment: In-Video Checkpoint Quizzes
  if (categorySlug === "assessment-and-evaluation" && featureSlug === "in-video-checkpoint-quizzes") {
    return (
      <div className="mt-4 pt-4 border-t border-[#F0F1F3]">
        <InteractiveVideoCheckpoint />
      </div>
    );
  }

  // 2. Engagement: Watch Percentage Slider
  if (categorySlug === "learner-engagement" && featureSlug === "watch-percentage-completion") {
    return (
      <div className="mt-4 pt-4 border-t border-[#F0F1F3]">
        <InteractiveWatchPercentage />
      </div>
    );
  }

  // 3. Live Cohort: Live Classes with Zoom
  if (categorySlug === "live-and-cohort-learning" && featureSlug === "live-classes-with-zoom") {
    return (
      <div className="mt-4 pt-4 border-t border-[#F0F1F3]">
        <FeatureVideoLoop
          src={media?.["live-class-loop"]?.src || "/videos/features/live_class_loop.mp4"}
          poster={media?.["live-class-loop"]?.poster || "/videos/features/live_class_poster.webp"}
          alt="Live video class simulation with Zoom integration"
          label="Live Class Preview"
        />
      </div>
    );
  }

  // 4. Live Cohort: Cohort Bootcamps Photo
  if (categorySlug === "live-and-cohort-learning" && featureSlug === "cohort-based-bootcamps") {
    return (
      <div className="mt-4 relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-[#E5E7EB]">
        <Image
          src="/images/features/cohort-workshop.webp"
          alt="Cohort workshop team collaboration"
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
        <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white">
          Scheduled Workshops
        </div>
      </div>
    );
  }

  // 5. Course Sales: Multiple Payment Gateways
  if (categorySlug === "course-sales-and-payments" && featureSlug === "multiple-payment-gateways") {
    return (
      <div className="mt-4 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2 text-xs">
        <div className="flex flex-wrap gap-2">
          {["Stripe", "PayPal", "Razorpay", "Offline Bank Transfer"].map((gw) => (
            <span
              key={gw}
              className="px-3 py-1 rounded-lg bg-white border border-[#E5E7EB] font-bold text-[#161616] shadow-2xs"
            >
              {gw}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-[#8F94A0] italic">
          * Gateway availability and currency settlement are subject to regional account configuration.
        </p>
      </div>
    );
  }

  // 6. Branding: Custom Domain with SSL
  if (categorySlug === "branding-website-and-reach" && featureSlug === "custom-domain-with-ssl") {
    return (
      <div className="mt-4 p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-mono text-[#161616]">
          <span className="text-[#10B981]">🔒</span>
          <span className="font-semibold">academy.yourdomain.com</span>
        </div>
        <span className="text-[10px] text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded-full">
          Auto SSL Issued
        </span>
      </div>
    );
  }

  return null;
}

export default StickyCategoryChapters;
