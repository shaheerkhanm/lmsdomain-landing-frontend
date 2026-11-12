"use client";

import React, { useState, useEffect } from "react";

interface HeroHeadlineHighlightProps {
  title?: string;
}

export function HeroHeadlineHighlight({ title }: HeroHeadlineHighlightProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStep(3);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 150);
    const t2 = setTimeout(() => setStep(2), 150 + 350 + 150); // 650ms
    const t3 = setTimeout(() => setStep(3), 150 + 350 + 150 + 350 + 150); // 1150ms

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
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
      <span className={`hero-marker ${step >= 1 ? "drawn" : ""}`}>
        batches
      </span>
      <span className="text-[#151517]">, </span>
      <span className={`hero-marker ${step >= 2 ? "drawn" : ""}`}>
        live classes
      </span>
      <span className="text-[#151517]"> and </span>
      <span className={`hero-marker ${step >= 3 ? "drawn" : ""}`}>
        tests
      </span>
      <span className="text-[#151517]"> in one place{endsWithPeriod ? "." : ""}</span>
    </>
  );
}

export default HeroHeadlineHighlight;
