"use client";

import React, { useEffect, useRef } from "react";
import {
  FileCode,
  Video,
  CheckCircle,
  Trophy,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface JourneyStep {
  step: string;
  name: string;
  categorySlug: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
}

const STEPS: JourneyStep[] = [
  { step: "01", name: "Create Content", categorySlug: "course-learning", icon: FileCode, color: "#7B5CF5" },
  { step: "02", name: "Teach Live", categorySlug: "live-and-cohort-learning", icon: Video, color: "#2563EB" },
  { step: "03", name: "Assess Mastery", categorySlug: "assessment-and-evaluation", icon: CheckCircle, color: "#0D9488" },
  { step: "04", name: "Engage Learners", categorySlug: "learner-engagement", icon: Trophy, color: "#F59E0B" },
  { step: "05", name: "Sell Globally", categorySlug: "course-sales-and-payments", icon: CreditCard, color: "#10B981" },
  { step: "06", name: "Grow Brand", categorySlug: "branding-website-and-reach", icon: TrendingUp, color: "#EC4899" },
];

export function JourneyStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, { offset: -140 });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.width = "100%";
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          line,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power2.out" }
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#F3F4F6] py-14 lg:py-18 font-urbanist border-y border-[#ECEDEF]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-2">
            <span>✦</span>
            <span>ACADEMY LIFECYCLE</span>
          </div>
          <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#161616] tracking-tight">
            Your Academy, Start to Finish
          </h2>
          <p className="text-sm text-[#6B6F76] mt-1">
            See how all nine capabilities connect into a unified learning journey.
          </p>
        </div>

        {/* Desktop Step Flow with Progress Line */}
        <div className="relative hidden md:block">
          {/* Animated Connecting Line */}
          <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-[#E5E7EB] z-0">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-[#7B5CF5] via-[#0D9488] to-[#10B981] w-0 will-change-[width]"
            />
          </div>

          <div className="relative z-10 grid grid-cols-6 gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => scrollToCategory(step.categorySlug)}
                  className="group flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#7B5CF5]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#ECEDEF] shadow-md flex items-center justify-center text-[#161616] group-hover:border-[#7B5CF5] group-hover:shadow-lg transition-all mb-3 relative">
                    <Icon size={22} className="text-[#161616] group-hover:text-[#7B5CF5] transition-colors" />
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-[#161616] text-white text-[9px] font-mono font-bold">
                      {step.step}
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-[#161616] group-hover:text-[#7B5CF5] transition-colors block">
                    {step.name}
                  </span>
                  <span className="text-[11px] text-[#8F94A0] mt-0.5 group-hover:text-[#6B6F76]">
                    Explore Step →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => scrollToCategory(step.categorySlug)}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#ECEDEF] shadow-2xs text-left cursor-pointer active:scale-98"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-[#161616] shrink-0 font-semibold text-xs">
                  <Icon size={18} className="text-[#161616]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#8F94A0] block">
                    STEP {step.step}
                  </span>
                  <span className="text-xs font-semibold text-[#161616] block">
                    {step.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JourneyStrip;

