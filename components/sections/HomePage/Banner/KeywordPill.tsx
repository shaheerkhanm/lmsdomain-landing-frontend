"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";

export function KeywordPill() {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const WORDS = heroContent?.rotatingWords ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (WORDS.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % WORDS.length);
    }, 1100); // 0.5s hold + 0.5s wipe

    return () => clearInterval(timer);
  }, [currentIndex, WORDS.length]);

  if (!WORDS || WORDS.length === 0) {
    return null;
  }

  const current = WORDS[currentIndex] ?? WORDS[0];
  const previous = prevIndex !== null ? (WORDS[prevIndex] ?? current) : current;

  return (
    <span
      data-hero-pill
      className="relative inline-flex items-center align-middle mx-1.5 sm:mx-2.5 overflow-hidden rounded-full shadow-2xs select-none"
    >
      {/* Screen reader text: reads only the active current word */}
      <span className="sr-only">{current.text}</span>

      {/* Base Layer: Fixed to the widest word at all times via inline-grid stack of all words */}
      <span
        style={{ backgroundColor: previous.bg }}
        aria-hidden="true"
        className="relative px-5 sm:px-7 py-1 sm:py-1.5 rounded-full text-3xl sm:text-5xl lg:text-[60px] leading-tight font-medium text-[#161616] inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200"
      >
        {/* Invisible sizer stack: every word rendered in the same grid cell */}
        <span className="inline-grid items-center justify-center invisible select-none" aria-hidden="true">
          {WORDS.map((w, idx) => (
            <span
              key={w.text ? `${w.text}-${idx}` : idx}
              style={{ gridArea: "1 / 1" }}
              className="whitespace-nowrap"
            >
              {w.text}
            </span>
          ))}
        </span>

        {/* Visible base word (centered) */}
        <span className="absolute inset-0 px-5 sm:px-7 py-1 sm:py-1.5 flex items-center justify-center text-[#161616]">
          {isAnimating ? previous.text : current.text}
        </span>
      </span>

      {/* Sweeping Overlay Layer: Animates left-to-right clip-path over previous layer */}
      {isAnimating && (
        <motion.span
          key={current.text}
          initial={{ clipPath: "inset(0 100% 0 0 round 9999px)" }}
          animate={{ clipPath: "inset(0 0% 0 0 round 9999px)" }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => {
            setIsAnimating(false);
            setPrevIndex(null);
          }}
          style={{ backgroundColor: current.bg }}
          aria-hidden="true"
          className="absolute inset-0 rounded-full px-5 sm:px-7 py-1 sm:py-1.5 text-3xl sm:text-5xl lg:text-[60px] leading-tight font-medium text-[#161616] flex items-center justify-center whitespace-nowrap"
        >
          {current.text}
        </motion.span>
      )}
    </span>
  );
}

export default KeywordPill;
