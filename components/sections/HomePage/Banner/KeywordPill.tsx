"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface WordItem {
  text: string;
  bg: string;
}

const WORDS: WordItem[] = [
  { text: "teach", bg: "#F3CF74" },
  { text: "certify", bg: "#8E7CF8" },
  { text: "scale", bg: "#A6E3D3" },
];

export function KeywordPill() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % WORDS.length);
    }, 1100); // 0.5s hold + 0.5s wipe

    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = WORDS[currentIndex];
  const previous = prevIndex !== null ? WORDS[prevIndex] : current;

  return (
    <span className="relative inline-flex items-center align-middle mx-1.5 sm:mx-2.5 overflow-hidden rounded-full shadow-2xs select-none">
      {/* Base Layer: Previous word (or current if idle) with natural height */}
      <span
        style={{ backgroundColor: previous.bg }}
        className="relative px-5 sm:px-7 py-1 sm:py-1.5 rounded-full text-3xl sm:text-5xl lg:text-[60px] leading-tight font-medium text-[#161616] inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200"
      >
        {/* In-flow sizing span to give container natural height and width */}
        <span className="invisible select-none" aria-hidden="true">
          {isAnimating ? (current.text.length > previous.text.length ? current.text : previous.text) : current.text}
        </span>
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
          className="absolute inset-0 rounded-full px-5 sm:px-7 py-1 sm:py-1.5 text-3xl sm:text-5xl lg:text-[60px] leading-tight font-medium text-[#161616] flex items-center justify-center whitespace-nowrap"
        >
          {current.text}
        </motion.span>
      )}
    </span>
  );
}

export default KeywordPill;

