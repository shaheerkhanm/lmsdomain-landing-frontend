"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AdvantageScrollMain from "./AdvantageScrollMain";

import { benefitsContent } from "@/content/home/benefits";

export function AdvantageSection({ data }: { data?: any }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReduced) {
        gsap.set(headingRef.current, { color: "#161616" });
        return;
      }

      // A18 entrance: H2 goes from color #BDBDBD to #161616 over 0.4s on enter
      gsap.fromTo(
        headingRef.current,
        { color: "#BDBDBD" },
        {
          color: "#161616",
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="benefits" className="py-24 sm:py-36 bg-[#F3F4F6] font-urbanist relative overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header (Mota 2-Line H2 per spec §5.7) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">{benefitsContent.badge}</span>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#161616] tracking-tight leading-tight"
          >
            <span className="block">{benefitsContent.title.line1}</span>
            <span className="block mt-1 sm:mt-2">{benefitsContent.title.line2}</span>
          </h2>
        </div>

        {/* Angled Rotating Benefits Motion Sequence (A18 + A19) */}
        <AdvantageScrollMain />
      </div>
    </section>
  );
}

export default AdvantageSection;