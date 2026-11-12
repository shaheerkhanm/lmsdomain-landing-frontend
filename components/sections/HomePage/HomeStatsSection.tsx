"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/marketing/ui";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  hasComma?: boolean;
  label: string;
  icon: React.ReactNode;
}

const STATS_DATA: StatItem[] = [
  {
    id: "learners",
    target: 2000,
    suffix: "+",
    hasComma: true,
    label: "learners",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
        <circle cx="10" cy="7" r="3" />
        <path d="M4 17c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" />
      </svg>
    ),
  },
  {
    id: "courses",
    target: 100,
    suffix: "+",
    label: "courses",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
        <path d="M4 15.5V5a1.5 1.5 0 0 1 1.5-1.5H16v10H5.5A1.5 1.5 0 0 0 4 15Zm0 0A1.5 1.5 0 0 0 5.5 17H16" />
      </svg>
    ),
  },
  {
    id: "lessons",
    target: 300,
    suffix: "+",
    label: "lessons",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
        <path d="M4 4h9l3 3v9H4z M7 9h6M7 12h6" />
      </svg>
    ),
  },
  {
    id: "classes",
    target: 100,
    suffix: "+",
    label: "live classes",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
        <rect x="2.5" y="5.5" width="10" height="9" rx="2" />
        <path d="m12.5 9 5-3v8l-5-3" />
      </svg>
    ),
  },
];

function formatNumber(num: number, hasComma?: boolean): string {
  if (hasComma) {
    return num.toLocaleString("en-US");
  }
  return num.toString();
}

export function HomeStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    learners: 2000,
    courses: 100,
    lessons: 300,
    classes: 100,
  });

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate count up once
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            setCounts({
              learners: Math.round(2000 * easeProgress),
              courses: Math.round(100 * easeProgress),
              lessons: Math.round(300 * easeProgress),
              classes: Math.round(100 * easeProgress),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="pt-0 pb-[clamp(56px,7vw,88px)] font-sans">
      <div className="rv-v4 max-w-[1080px] mx-auto px-5">
        <Eyebrow tone="gradient">Proof</Eyebrow>
        <h2 className="type-h2-v4 text-[#151517] mt-1">
          Academies teaching with LMS Domain
        </h2>

        <div className="grid grid-cols-2 gap-x-[clamp(18px,4vw,60px)] gap-y-[clamp(18px,3vw,28px)] mt-10">
          {STATS_DATA.map((stat) => (
            <div key={stat.id} className="border-t border-[#E8E8EC] pt-[22px]">
              <span className="w-[30px] h-[30px] rounded-[9px] bg-[#EFEBFF] text-[#6C4BFF] flex items-center justify-center mb-4">
                {stat.icon}
              </span>
              <b className="block text-[clamp(34px,5vw,52px)] font-bold tracking-[-0.04em] leading-none text-[#151517]">
                {formatNumber(counts[stat.id] ?? stat.target, stat.hasComma)}
                {stat.suffix}
              </b>
              <span className="text-[#535361] text-[14px] mt-1.5 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeStatsSection;
