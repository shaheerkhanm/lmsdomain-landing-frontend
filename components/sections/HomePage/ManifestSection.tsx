"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT_WORDS = [
  "In", "today's", "digital", "world,", "maximizing", "efficiency", "and", "protecting",
  "knowledge", "is", "paramount.", "With", "an", "AI-native", "LMS", "built",
  "for", "speed,", "we", "simplify", "course", "creation,", "enforce", "hardware",
  "DRM,", "and", "scale", "uncompromised", "learning", "experiences", "globally."
];

export function ManifestSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReduced) {
        gsap.set(wordsRef.current, { color: "#161616" });
        return;
      }

      // Base color per spec §5.5: #C9CCD1
      gsap.set(wordsRef.current, { color: "#C9CCD1" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 35%",
          end: "+=70%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      });

      tl.to(wordsRef.current, {
        color: "#161616",
        stagger: 0.1,
        ease: "none",
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
              ref={(el) => { wordsRef.current[idx] = el; }}
              className="transition-colors duration-75 text-[#C9CCD1]"
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
