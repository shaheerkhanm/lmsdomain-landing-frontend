"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FeatureCategory } from "@/types/content";
import { FeatureIcon } from "./FeatureIcon";
import { ScrollTrigger } from "@/lib/gsap";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

const DEFAULT_LABELS = {
  premiumLabel: "Premium",
  featuresLabel: "features",
  exploreLabel: "Explore ↓",
  searchPlaceholder: "Find a feature across all 9 categories...",
  premiumOnlyLabel: "Premium Only",
  jumpLabel: "Jump to section",
  emptyMessage: "No features match your query. Try another keyword or ask us during a live demo.",
  emptyCtaText: "Book a Live Demo",
};

interface CategoryOverviewNavProps {
  categories: FeatureCategory[];
  labels?: typeof DEFAULT_LABELS;
}

const SHORT_TAB_LABELS: Record<string, string> = {
  "course-learning": "Course Learning",
  "assessment-and-evaluation": "Assessment",
  "learner-engagement": "Engagement",
  "ai-powered-tools": "Domie AI",
  "live-and-cohort-learning": "Live Learning",
  "course-sales-and-payments": "Sales & Payments",
  "content-publishing-and-digital-products": "Publishing",
  "administration-and-communication": "Administration",
  "branding-website-and-reach": "Branding",
};

const CATEGORY_ICONS: Record<string, string> = {
  "course-learning": "BookOpen",
  "assessment-and-evaluation": "CheckSquare",
  "learner-engagement": "Trophy",
  "ai-powered-tools": "Bot",
  "live-and-cohort-learning": "Video",
  "course-sales-and-payments": "CreditCard",
  "content-publishing-and-digital-products": "BookMarked",
  "administration-and-communication": "ShieldCheck",
  "branding-website-and-reach": "Globe2",
};

export function CategoryOverviewNav({ categories, labels = DEFAULT_LABELS }: CategoryOverviewNavProps) {
  const [activeSlug, setActiveSlug] = useState<string>(categories[0]?.slug || "");
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);

  // Feature Finder state
  const [searchQuery, setSearchQuery] = useState("");
  const [isPremiumOnly, setIsPremiumOnly] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Flattened features list with category association
  const allFeatures = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.features.map((feat) => ({
        ...feat,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
      }))
    );
  }, [categories]);

  // Filtered results
  const filteredFeatures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && !isPremiumOnly) return [];

    return allFeatures.filter((f) => {
      const matchesText =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.categoryTitle.toLowerCase().includes(q);
      const matchesPremium = !isPremiumOnly || f.isPremium;
      return matchesText && matchesPremium;
    });
  }, [allFeatures, searchQuery, isPremiumOnly]);

  const scrollToCategory = (slug: string) => {
    const target = document.getElementById(slug);
    if (!target) return;

    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(target, { offset: -140 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActiveSlug(slug);
  };

  const handleSelectFeature = (feat: typeof allFeatures[0]) => {
    scrollToCategory(feat.categorySlug);

    setTimeout(() => {
      const targetCard = document.querySelector(`[data-feature-slug="${feat.slug}"]`);
      if (targetCard) {
        targetCard.classList.add("ring-4", "ring-[#7B5CF5]/50", "transition-all", "duration-500");
        setTimeout(() => {
          targetCard.classList.remove("ring-4", "ring-[#7B5CF5]/50");
        }, 1500);
      }
    }, 400);

    setSearchQuery("");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggers: any[] = [];

    // Trigger for sticky pill bar visibility (between start of AI spotlight and end of last category section)
    const firstSection = document.getElementById("ai-powered-tools") || document.getElementById(categories[0]?.slug);
    const lastCategory = categories[categories.length - 1];
    const lastSection = document.getElementById(lastCategory?.slug);

    if (firstSection && lastSection) {
      const visibilityTrigger = ScrollTrigger.create({
        trigger: firstSection,
        start: "top 180px",
        endTrigger: lastSection,
        end: "bottom 300px",
        onToggle: (self) => {
          setIsStickyVisible(self.isActive);
        },
      });
      triggers.push(visibilityTrigger);
    }

    // Triggers for active section detection
    categories.forEach((cat) => {
      const el = document.getElementById(cat.slug);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 220px",
        end: "bottom 220px",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSlug(cat.slug);
          }
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [categories]);

  const isSearching = searchQuery.trim().length > 0 || isPremiumOnly;

  return (
    <>
      {/* 3x3 Overview Grid (directly under the Hero) */}
      <section
        ref={overviewRef}
        aria-label="Category Overview"
        className="bg-white pb-14 lg:pb-20 pt-4 font-urbanist"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const iconName = CATEGORY_ICONS[cat.slug] || "Sparkles";
              const count = cat.features.length;

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => scrollToCategory(cat.slug)}
                  className="group bg-white rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-5 sm:p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-[#DFE1E6] flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7B5CF5]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-colors ${
                          cat.isPremium
                            ? "bg-[#EEE9FF] text-[#7B5CF5] group-hover:bg-[#E2D9FF]"
                            : "bg-[#F3F4F6] text-[#161616] group-hover:bg-[#E9EAEF]"
                        }`}
                      >
                        <FeatureIcon
                          name={iconName}
                          size={20}
                          className={cat.isPremium ? "text-[#7B5CF5]" : "text-[#161616]"}
                        />
                      </div>

                      {cat.isPremium && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5] tracking-wide">
                          {labels.premiumLabel}
                        </span>
                      )}
                    </div>

                    <h3 className="text-[17px] font-semibold text-[#161616] tracking-tight mb-1.5 group-hover:text-[#7B5CF5] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-[14px] text-[#6B6F76] leading-relaxed line-clamp-2 mb-4">
                      {cat.intro}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] text-xs font-medium text-[#8F94A0]">
                    <span>{count} {labels.featuresLabel}</span>
                    <span className="text-[#161616] group-hover:translate-x-0.5 transition-transform">
                      {labels.exploreLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Finder (Interactive Search & Filter Bar) */}
          <div className="pt-4 border-t border-[#F3F4F6]">
            <div className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-4 sm:p-6 shadow-2xs relative">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8F94A0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={labels.searchPlaceholder}
                    aria-label="Find a feature search input"
                    className="w-full bg-white rounded-full pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#161616] border border-[#ECEDEF] focus:border-[#7B5CF5] focus:outline-none transition-colors shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear feature search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F94A0] hover:text-[#161616] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Premium Only Toggle */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsPremiumOnly(!isPremiumOnly)}
                    aria-pressed={isPremiumOnly}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      isPremiumOnly
                        ? "bg-[#EEE9FF] border-[#7B5CF5] text-[#7B5CF5]"
                        : "bg-white border-[#ECEDEF] text-[#6B6F76] hover:text-[#161616]"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{labels.premiumOnlyLabel}</span>
                  </button>
                </div>
              </div>

              {/* Live Accessibility Feedback */}
              <div className="sr-only" aria-live="polite">
                {isSearching
                  ? `${filteredFeatures.length} features found matching ${searchQuery}`
                  : ""}
              </div>

              {/* Render Search Results ONLY when actively searching (query > 0 or premium filter) */}
              {isSearching && (
                <div className="mt-4 pt-4 border-t border-[#ECEDEF] space-y-2 max-h-[360px] overflow-y-auto">
                  {filteredFeatures.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {filteredFeatures.map((feat) => (
                        <button
                          key={feat.slug}
                          type="button"
                          onClick={() => handleSelectFeature(feat)}
                          className="p-3 rounded-xl bg-white border border-[#ECEDEF] hover:border-[#7B5CF5] hover:shadow-xs text-left transition-all flex flex-col justify-between cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F94A0]">
                              {feat.categoryTitle}
                            </span>
                            {feat.isPremium && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EEE9FF] text-[#7B5CF5] font-semibold">
                                {labels.premiumLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#161616] group-hover:text-[#7B5CF5] transition-colors truncate">
                            {feat.title}
                          </p>
                          <span className="text-[11px] text-[#8F94A0] group-hover:text-[#161616] mt-1 flex items-center gap-1">
                            {labels.jumpLabel} <ArrowRight className="w-3 h-3" />
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="py-6 text-center space-y-3">
                      <p className="text-sm text-[#6B6F76]">
                        {labels.emptyMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowDemoModal(true)}
                        className="px-5 py-2 rounded-full bg-[#161616] hover:bg-black text-white text-xs font-semibold transition-all cursor-pointer"
                      >
                        {labels.emptyCtaText}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Sticky Pill Bar (>= 1024px only) */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[88px] left-0 right-0 z-40 hidden lg:flex justify-center pointer-events-none px-4"
          >
            <nav
              aria-label="Features Category Navigation"
              className="bg-white/95 backdrop-blur-md rounded-[18px] p-1.5 border border-[#ECEDEF] shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto flex items-center gap-1 overflow-x-auto max-w-[96vw]"
            >
              {categories.map((cat) => {
                const isActive = activeSlug === cat.slug;
                const shortLabel = SHORT_TAB_LABELS[cat.slug] || cat.title;

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => scrollToCategory(cat.slug)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-3.5 py-1.5 rounded-[14px] text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive ? "text-white" : "text-[#6B6F76] hover:text-[#161616]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureTab"
                        className="absolute inset-0 bg-[#161616] rounded-[14px] -z-10 shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {shortLabel}
                      {cat.isPremium && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B5CF5]" />
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CategoryOverviewNav;
