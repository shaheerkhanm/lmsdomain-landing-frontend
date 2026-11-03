"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { CustomPlanTimeline as CustomPlanTimelineType } from "@/types/content";

interface CustomPlanTimelineProps {
  timeline: CustomPlanTimelineType;
}

export function CustomPlanTimeline({ timeline }: CustomPlanTimelineProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const glowingDotRef = useRef<HTMLDivElement>(null);

  if (!timeline || !timeline.steps || timeline.steps.length === 0) {
    return null;
  }

  const steps = timeline.steps;
  const title = timeline.title || "From first call to launch, in days not months";
  const subtitle =
    timeline.subtitle ||
    "A fixed plan from the first day, so you always know what happens next.";
  const footnote =
    timeline.footnote ||
    "Times are working days after you approve the plan and share your brand assets. Store review time is set by Apple and Google, usually a few days.";

  // GSAP Horizontal Scrub for Desktop (>= 1024px)
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;
        const track = trackRef.current;
        const pinnedWrapper = pinnedWrapperRef.current;
        if (!track || !pinnedWrapper) return;

        // Total distance to scroll horizontally
        const distance = track.scrollWidth - track.clientWidth;
        if (distance <= 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedWrapper,
            start: "top top",
            end: () => `+=${distance + 400}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              // Map progress to active step index (0 to steps.length - 1)
              const stepIndex = Math.min(
                steps.length - 1,
                Math.floor(p * steps.length)
              );
              setActiveIdx(stepIndex);
            },
          },
        });

        // Animate horizontal track movement
        tl.to(track, {
          x: -distance,
          ease: "none",
        }, 0);

        // Animate top progress bar fill and glowing dot
        if (progressLineRef.current) {
          tl.to(
            progressLineRef.current,
            {
              scaleX: 1,
              transformOrigin: "left",
              ease: "none",
            },
            0
          );
        }

        if (glowingDotRef.current) {
          tl.to(
            glowingDotRef.current,
            {
              left: "100%",
              ease: "none",
            },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#161616] text-white font-urbanist relative overflow-visible"
    >
      {/* ====================================================================== */}
      {/* DESKTOP PINNED SECTION (>= 1024px) */}
      {/* ====================================================================== */}
      <div
        ref={pinnedWrapperRef}
        className="hidden lg:flex flex-col justify-between h-screen w-full py-12 px-6 max-w-[1360px] mx-auto overflow-hidden relative"
      >
        {/* Top Header Row with Active Step Counter in Corner */}
        <div className="flex items-start justify-between gap-6 pb-6 border-b border-white/10 shrink-0">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#A78BFA] text-xs font-semibold uppercase tracking-wider mb-3">
              ✦ Launch Timeline
            </span>
            <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white mb-2">
              {title}
            </h2>
            <p className="text-sm xl:text-base text-[#C9CCD1] max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Corner Live Counter */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[200px] text-right shrink-0">
            <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-wider block">
              Timeline Progress
            </span>
            <p className="text-lg font-bold text-white tracking-tight">
              {steps[activeIdx]?.when || "Day 1"}
            </p>
            <span className="text-xs text-[#C9CCD1]">
              Phase {activeIdx + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Global Progress Line across track */}
        <div className="relative w-full h-1 bg-white/10 rounded-full my-6 overflow-visible shrink-0">
          <div
            ref={progressLineRef}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7B5CF5] to-[#A78BFA] rounded-full origin-left scale-x-0 w-full"
          />
          <div
            ref={glowingDotRef}
            className="absolute -top-1.5 size-4 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#7B5CF5] -translate-x-1/2 left-0 pointer-events-none"
          />
        </div>

        {/* Horizontal Track of Step Cards */}
        <div className="relative flex-1 flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 will-change-transform pr-16"
          >
            {steps.map((step, idx) => {
              const isActive = idx <= activeIdx;
              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={idx}
                  className={`w-[360px] xl:w-[400px] rounded-2xl p-6 xl:p-7 flex flex-col justify-between shrink-0 transition-all duration-300 border ${
                    isCurrent
                      ? "bg-white/10 border-[#7B5CF5] shadow-[0_15px_40px_rgba(123,92,245,0.2)]"
                      : isActive
                      ? "bg-white/5 border-white/15"
                      : "bg-white/3 border-white/10 opacity-70"
                  }`}
                >
                  <div>
                    {/* Step Card Header: "When" pill + Step number */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isCurrent
                            ? "bg-[#7B5CF5] text-white shadow-xs"
                            : isActive
                            ? "bg-white/15 text-white"
                            : "bg-white/5 text-[#8F94A0]"
                        }`}
                      >
                        {step.when}
                      </span>
                      <span className="font-mono text-xs text-[#8F94A0]">
                        Step {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-sm text-[#C9CCD1] leading-relaxed">
                      {step.text}
                    </p>
                  </div>

                  {/* Card Bottom: milestone tag */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8F94A0] mt-6">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2
                        className={`size-4 ${
                          isActive ? "text-[#059669]" : "text-white/20"
                        }`}
                      />
                      <span>{isActive ? "Included" : "Planned"}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#A78BFA]">
                      {isCurrent ? "In Progress" : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <div className="pt-4 border-t border-white/10 text-xs text-[#8F94A0] text-center shrink-0">
          {footnote}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* MOBILE VERTICAL TIMELINE (< 1024px) */}
      {/* ====================================================================== */}
      <div className="lg:hidden py-16 sm:py-20 px-4 sm:px-6 max-w-xl mx-auto">
        <div className="text-left mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#A78BFA] text-xs font-semibold uppercase tracking-wider mb-3">
            ✦ Launch Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#C9CCD1] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Vertical Step Line */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#7B5CF5]/40 space-y-8 text-left">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Milestone Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 size-4 rounded-full bg-[#161616] border-2 border-[#7B5CF5] flex items-center justify-center">
                <span className="size-1.5 rounded-full bg-[#A78BFA]" />
              </div>

              {/* Step Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#7B5CF5]/20 text-[#A78BFA] text-[10px] font-bold uppercase tracking-wider">
                    {step.when}
                  </span>
                  <span className="text-[10px] font-mono text-[#8F94A0]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#C9CCD1] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Footnote */}
        <p className="text-[11px] text-[#8F94A0] mt-8 text-left leading-relaxed">
          {footnote}
        </p>
      </div>
    </section>
  );
}

export default CustomPlanTimeline;

