"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TestimonialItem {
  id: string;
  tag: string;
  name: string;
  role: string;
  quote: string;
  footerTag: string;
}

const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "card-1",
    tag: "ACADEMY SPOTLIGHT",
    name: "Enterprise Academy Spotlight",
    role: "Partner Case Study Placeholder",
    quote:
      "Reserved for enterprise partner case study. Verified cohort completion metrics, graduation telemetry, and custom domain deployment architecture will appear here upon partner program onboarding.",
    footerTag: "Partner Verification Program",
  },
  {
    id: "card-2",
    tag: "INSTITUTIONAL SPOTLIGHT",
    name: "Professional Training Spotlight",
    role: "Clinical & Continuing Ed Placeholder",
    quote:
      "Reserved for institutional partner case study. Verified compliance telemetry, student assessment performance, and board certification data will appear here following accredited cohort launch.",
    footerTag: "Accredited Cohort Telemetry",
  },
  {
    id: "card-3",
    tag: "PARTNER SHOWCASE",
    name: "Global Academy Spotlight",
    role: "Global Learning Platform Showcase",
    quote:
      "Reserved for early adopter academy spotlight. Custom branding, dedicated learning experiences, and online course workflows will be featured here.",
    footerTag: "Feature Your Academy",
  },
];

export function CustomerSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLHeadingElement>(null);
  const deckWrapperRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A20 Solid Text Scale + A21 Deck Upward Flight)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) {
          gsap.set(wallTextRef.current, { scale: 1, color: "#161616" });
          gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { clearProps: "all" });
          return;
        }

        // Initial positions per spec §5.8:
        // Text: scale 0.25, color #BDBDBD
        gsap.set(wallTextRef.current, { scale: 0.25, color: "#BDBDBD" });
        // Deck: starts 35vh down so it rises directly to center
        gsap.set(deckWrapperRef.current, { y: "35vh" });
        // Initial card rotations & jitter:
        gsap.set(card1Ref.current, { rotateZ: -5, x: -8, y: 0 });
        gsap.set(card2Ref.current, { rotateZ: 6, x: 10, y: 6 });
        gsap.set(card3Ref.current, { rotateZ: 0, x: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            pinSpacing: true,
            scrub: true,
          },
        });

        // ----------------------------------------------------
        // Stage 1 (0 -> 0.7): A20 Text scale 0.25 -> 1, color #BDBDBD -> #161616
        // Deck rises from y +35vh to 0 (centered over "Wall of love")
        // ----------------------------------------------------
        tl.to(
          wallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.7,
          },
          0
        );

        tl.to(
          deckWrapperRef.current,
          {
            y: 0,
            ease: "power1.out",
            duration: 0.5,
          },
          0.15
        );

        // ----------------------------------------------------
        // Stage 2 (0.7 -> 1.4): Card 1 flies upward (-110vh)
        // ----------------------------------------------------
        tl.to(
          card1Ref.current,
          {
            y: "-110vh",
            rotateZ: -8,
            ease: "power1.in",
            duration: 0.7,
          },
          0.7
        );

        // ----------------------------------------------------
        // Stage 3 (1.4 -> 2.1): Card 2 flies upward (-110vh)
        // Card 3 stays centered at 0deg!
        // ----------------------------------------------------
        tl.to(
          card2Ref.current,
          {
            y: "-110vh",
            rotateZ: 3,
            ease: "power1.in",
            duration: 0.7,
          },
          1.4
        );
      });

      // Mobile: under 1024px (Normal flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(wallTextRef.current, { scale: 1, color: "#161616" });
        gsap.set([deckWrapperRef.current, card1Ref.current, card2Ref.current, card3Ref.current], {
          clearProps: "all",
        });
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="bg-[#F3F4F6] font-urbanist relative overflow-visible">
      {/* Pinned Stage Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[680px] max-h-[960px] flex items-center justify-center overflow-hidden"
      >
        {/* A20: Solid Giant Typography "Wall of love" (~85% viewport width, weight 700, solid #161616) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2
            ref={wallTextRef}
            className="text-[22vw] sm:text-[23vw] lg:text-[24vw] xl:text-[340px] font-bold tracking-[-0.04em] leading-none text-center whitespace-nowrap will-change-transform text-[#161616]"
          >
            Wall of love
          </h2>
        </div>

        {/* A21: Centered Testimonial Card Stack Deck (Covers the middle of "Wall of love", z-10) */}
        <div
          ref={deckWrapperRef}
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform pointer-events-none"
        >
          <div className="relative w-full max-w-lg h-[280px] sm:h-[320px] flex items-center justify-center pointer-events-auto">
            {/* Card 1 (Top of stack, z-30) */}
            <div
              ref={card1Ref}
              style={{ zIndex: 30 }}
              className="absolute w-[360px] sm:w-[460px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] p-6 sm:p-7 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#161616] text-white flex items-center justify-center font-bold text-xs">
                      EA
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_TESTIMONIALS[0].name}
                      </h4>
                      <span className="text-[11px] text-[#6B6F76]">
                        {PLACEHOLDER_TESTIMONIALS[0].role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {PLACEHOLDER_TESTIMONIALS[0].tag}
                  </span>
                </div>
                <p className="mt-4 text-[13px] sm:text-sm text-[#161616] leading-relaxed">
                  "{PLACEHOLDER_TESTIMONIALS[0].quote}"
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-slate-700">{PLACEHOLDER_TESTIMONIALS[0].footerTag}</span>
                <span className="text-slate-400 font-mono">LMS Domain Early Access</span>
              </div>
            </div>

            {/* Card 2 (Middle of stack, z-20) */}
            <div
              ref={card2Ref}
              style={{ zIndex: 20 }}
              className="absolute w-[360px] sm:w-[460px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] p-6 sm:p-7 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center font-bold text-xs">
                      PT
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_TESTIMONIALS[1].name}
                      </h4>
                      <span className="text-[11px] text-[#6B6F76]">
                        {PLACEHOLDER_TESTIMONIALS[1].role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-[#7B5CF5]">
                    {PLACEHOLDER_TESTIMONIALS[1].tag}
                  </span>
                </div>
                <p className="mt-4 text-[13px] sm:text-sm text-[#161616] leading-relaxed">
                  "{PLACEHOLDER_TESTIMONIALS[1].quote}"
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-slate-700">{PLACEHOLDER_TESTIMONIALS[1].footerTag}</span>
                <span className="text-slate-400 font-mono">Institutional Telemetry</span>
              </div>
            </div>

            {/* Card 3 (Bottom of stack / stays at 0deg, z-10) */}
            <div
              ref={card3Ref}
              style={{ zIndex: 10 }}
              className="absolute w-[360px] sm:w-[460px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] p-6 sm:p-7 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      GA
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_TESTIMONIALS[2].name}
                      </h4>
                      <span className="text-[11px] text-[#6B6F76]">
                        {PLACEHOLDER_TESTIMONIALS[2].role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    {PLACEHOLDER_TESTIMONIALS[2].tag}
                  </span>
                </div>
                <p className="mt-4 text-[13px] sm:text-sm text-[#161616] leading-relaxed">
                  "{PLACEHOLDER_TESTIMONIALS[2].quote}"
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-slate-700">{PLACEHOLDER_TESTIMONIALS[2].footerTag}</span>
                <span className="text-[#7B5CF5] font-semibold">Inquire Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerSection;