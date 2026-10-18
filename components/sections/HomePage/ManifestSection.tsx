"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { manifestoContent } from "@/content/home/manifesto";

const STATEMENT_WORDS = manifestoContent.text.split(" ");

export function ManifestSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word", sectionRef.current);

      if (isReduced) {
        gsap.set(words, { color: "#161616" });
        return;
      }

      // Base color per spec §5.5: #C9CCD1
      gsap.set(words, { color: "#C9CCD1" });

      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (Pinned word illumination)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
          },
        });

        tl.to(words, {
          color: "#161616",
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power1.inOut",
        });
      });

      // Mobile / Tablet: under 1024px (Keep word reveal, NO pin)
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 35%",
            pin: false,
            scrub: 0.4,
          },
        });

        tl.to(words, {
          color: "#161616",
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power1.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="py-28 sm:py-36 bg-white font-urbanist relative overflow-hidden flex items-center justify-center min-h-[500px]"
    >
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 text-center">
        {/* A12: Editorial Text Reveal Typography (≈44px at 1440px, weight 500, line-height 1.3) */}
        <p className="text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.3] tracking-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 select-none">
          {STATEMENT_WORDS.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word text-[#C9CCD1] will-change-[color]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default ManifestSection;
