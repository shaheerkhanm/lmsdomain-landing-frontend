"use client";

import React, { useEffect, useRef, useState } from "react";

const STATEMENT_WORDS = [
  "In", "today's", "digital", "world,", "maximizing", "efficiency", "and", "protecting",
  "knowledge", "is", "paramount.", "With", "an", "AI-native", "LMS", "built",
  "for", "speed,", "we", "simplify", "course", "creation,", "enforce", "hardware",
  "DRM,", "and", "scale", "uncompromised", "learning", "experiences", "globally."
];

export function ManifestSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when top enters 75% of viewport, finish by 30%
      const start = windowHeight * 0.75;
      const end = windowHeight * 0.3;

      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalWords = STATEMENT_WORDS.length;
  const activeWordIndex = Math.floor(scrollProgress * totalWords);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="py-28 sm:py-40 bg-white font-inter relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Mota 00:12 Editorial Text Reveal Typography */}
        <p className="text-3xl sm:text-5xl lg:text-[54px] font-medium leading-[1.28] tracking-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5 sm:gap-y-2 select-none">
          {STATEMENT_WORDS.map((word, idx) => {
            const isHighlighted = idx <= activeWordIndex;
            return (
              <span
                key={idx}
                className={`transition-colors duration-150 ${
                  isHighlighted ? "text-slate-900" : "text-slate-300"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

export default ManifestSection;
