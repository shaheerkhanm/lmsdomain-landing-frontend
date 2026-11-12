"use client";

import React, { useState, useEffect } from "react";

interface HeroHeadlineHighlightProps {
  title?: string;
}

export function HeroHeadlineHighlight({ title }: HeroHeadlineHighlightProps) {
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % 3);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const defaultTitle = "Run your academy's batches, live classes and tests in one place.";
  const rawText = title || defaultTitle;

  const hasKeywords =
    rawText.includes("batches") &&
    rawText.includes("live classes") &&
    rawText.includes("tests");

  if (!hasKeywords) {
    return <span className="text-[#151517]">{rawText}</span>;
  }

  const endsWithPeriod = rawText.trim().endsWith(".");

  return (
    <>
      <span className="text-[#151517]">Run your academy&apos;s </span>
      <span
        className={`hl c1 ${activeHighlight === 0 ? "on" : ""}`}
        data-h="0"
      >
        batches
      </span>
      <span className="text-[#151517]">, </span>
      <span
        className={`hl c2 ${activeHighlight === 1 ? "on" : ""}`}
        data-h="1"
      >
        live classes
      </span>
      <span className="text-[#151517]"> and </span>
      <span
        className={`hl c3 ${activeHighlight === 2 ? "on" : ""}`}
        data-h="2"
      >
        tests
      </span>
      <span className="text-[#151517]"> in one place{endsWithPeriod ? "." : ""}</span>
    </>
  );
}

export default HeroHeadlineHighlight;
