"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface AudienceTab {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  photo: string;
  photoAlt: string;
  photoChip: string;
  photoChipColor?: string;
  features: { title: string; slug: string; tag: string }[];
}

const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "institutes",
    label: "Training Institutes",
    heading: "Built for Professional Academies and Institutes",
    subheading:
      "Scale cohorts, manage teacher permissions, issue accredited certificates, and white-label your entire school.",
    photo: "/images/features/audience-institutes.webp",
    photoAlt: "Training Institute classroom with educator and learners",
    photoChip: "Training institute",
    photoChipColor: "bg-[#0D9488]",
    features: [
      { title: "Structured Courses", slug: "course-learning", tag: "Curriculums" },
      { title: "Graded Quizzes", slug: "assessment-and-evaluation", tag: "Testing" },
      { title: "Course Certificates", slug: "course-learning", tag: "Verifiable" },
      { title: "Role-Based Access Control", slug: "administration-and-communication", tag: "Admin" },
      { title: "Custom Domain with SSL", slug: "branding-website-and-reach", tag: "Branding" },
      { title: "Per-School Branding", slug: "branding-website-and-reach", tag: "White-Label" },
    ],
  },
  {
    id: "coaches",
    label: "Coaches and Creators",
    heading: "Designed for Solo Educators and Course Creators",
    subheading:
      "Draft courses with AI assistance, protect video content, and sell digital courses worldwide.",
    photo: "/images/features/audience-coaches.webp",
    photoAlt: "Coach and creator recording educational material at studio desk",
    photoChip: "Creator studio",
    photoChipColor: "bg-[#7B5CF5]",
    features: [
      { title: "Domie AI Content Generator", slug: "ai-powered-tools", tag: "AI Drafts" },
      { title: "HelpDesk AI Tutor", slug: "ai-powered-tools", tag: "24/7 Support" },
      { title: "Course Catalogue, Cart, and Wishlist", slug: "course-sales-and-payments", tag: "Storefront" },
      { title: "Coupons and Discounts", slug: "course-sales-and-payments", tag: "Marketing" },
      { title: "Video Watermarking", slug: "course-learning", tag: "DRM Protection" },
      { title: "One-to-One Tutor Booking", slug: "live-and-cohort-learning", tag: "1:1 Sessions" },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Teams",
    heading: "Engineered for Enterprise Employee Onboarding and Training",
    subheading:
      "Automate corporate compliance training, track team progress with analytics, and allocate seat licenses effortlessly.",
    photo: "/images/features/audience-corporate.webp",
    photoAlt: "Corporate team collaborating around laptop in office meeting",
    photoChip: "Team training",
    photoChipColor: "bg-[#2563EB]",
    features: [
      { title: "Team Training Packages", slug: "live-and-cohort-learning", tag: "Seat Licenses" },
      { title: "Learner Device Limits", slug: "course-learning", tag: "Compliance" },
      { title: "Leaderboards and Points", slug: "learner-engagement", tag: "Gamification" },
      { title: "AI Prescriptive Analytics", slug: "ai-powered-tools", tag: "Risk Alerts" },
      { title: "Scheduled Content Release", slug: "course-learning", tag: "Drip Pacing" },
      { title: "Instructor Payouts and Revenue Reports", slug: "course-sales-and-payments", tag: "Reporting" },
    ],
  },
];

export function AudienceSwitcher({ media }: { media?: Record<string, any> }) {
  const [activeTabId, setActiveTabId] = useState("institutes");
  const activeTab = AUDIENCE_TABS.find((t) => t.id === activeTabId) || AUDIENCE_TABS[0];
  const photoSrc = media?.[`audience-${activeTab.id}`]?.src || activeTab.photo;

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, { offset: -140 });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-12 lg:py-20 font-urbanist border-b border-[#F3F4F6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header with pill tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-2.5">
              <span>✦</span>
              <span>TAILORED SOLUTIONS</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] font-semibold text-[#161616] tracking-tight">
              Built for How You Teach
            </h2>
          </div>

          {/* Pill Tabs with Motion LayoutId */}
          <div
            role="tablist"
            aria-label="Target audiences"
            className="inline-flex p-1.5 rounded-full bg-[#F3F4F6] border border-[#ECEDEF] self-start"
          >
            {AUDIENCE_TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`audience-panel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive ? "text-white" : "text-[#6B6F76] hover:text-[#161616]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="audienceTab"
                      className="absolute inset-0 bg-[#161616] rounded-full -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div
          id={`audience-panel-${activeTab.id}`}
          role="tabpanel"
          className="bg-[#F8FAFC] rounded-[32px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Real Photo in 20px-radius frame with overlapping chip */}
            <div className="w-full lg:col-span-5 order-1">
              <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-xl group">
                <Image
                  src={photoSrc}
                  alt={activeTab.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Corner UI Chip */}
                <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-2 border border-white/15 shadow-md">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeTab.photoChipColor || "bg-[#0D9488]"
                    } animate-pulse`}
                  />
                  <span>{activeTab.photoChip}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Heading, Subtitle & Interactive Feature Chips */}
            <div className="w-full lg:col-span-7 order-2 space-y-6">
              <div>
                <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#161616] tracking-tight mb-3 leading-snug">
                  {activeTab.heading}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#6B6F76] leading-relaxed">
                  {activeTab.subheading}
                </p>
              </div>

              {/* Chips picked strictly from the 38 catalog features */}
              <div>
                <span className="text-xs uppercase font-bold text-[#8F94A0] tracking-wider block mb-3">
                  Essential Features for this Role
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTab.features.map((feat) => (
                    <button
                      key={feat.title}
                      type="button"
                      onClick={() => scrollToSection(feat.slug)}
                      className="group/chip bg-white hover:bg-[#EEE9FF] rounded-xl p-3 border border-[#ECEDEF] hover:border-[#C4B5FD] text-left transition-all duration-200 flex items-center justify-between cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7B5CF5] block">
                          {feat.tag}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#161616] truncate block group-hover/chip:text-[#7B5CF5]">
                          {`${feat.title} →`}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8F94A0] group-hover/chip:text-[#7B5CF5] group-hover/chip:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudienceSwitcher;
