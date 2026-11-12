"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { Users, BookOpen, FileText, Video } from "lucide-react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  hasComma?: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const STATS_DATA: StatItem[] = [
  {
    id: "learners",
    target: 2000,
    suffix: "+",
    hasComma: true,
    label: "learners",
    icon: Users,
  },
  {
    id: "courses",
    target: 100,
    suffix: "+",
    label: "courses",
    icon: BookOpen,
  },
  {
    id: "lessons",
    target: 300,
    suffix: "+",
    label: "lessons",
    icon: FileText,
  },
  {
    id: "classes",
    target: 100,
    suffix: "+",
    label: "live classes",
    icon: Video,
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
    <section ref={sectionRef} className="py-14 md:py-20 font-sans">
      <div className="rv-v4 max-w-[1080px] mx-auto px-5">
        <Eyebrow tone="gradient">Proof</Eyebrow>
        <h2 className="type-h2-v4 text-[#151517] mt-1">
          Academies teaching with LMS Domain
        </h2>

        {/* 4 Stats in one white card with hairlines */}
        <div className="bg-white border border-[#E8E8EC] rounded-[20px] shadow-[0_20px_40px_-32px_rgba(20,20,40,0.25)] grid grid-cols-2 md:grid-cols-4 mt-8 sm:mt-10 overflow-hidden">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`p-6 sm:p-7 flex flex-col items-start ${
                  idx % 2 !== 0 ? "border-l border-[#E8E8EC]" : ""
                } ${
                  idx >= 2 ? "border-t border-[#E8E8EC] md:border-t-0" : ""
                } md:border-t-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#E8E8EC]`}
              >
                <span className="w-10 h-10 rounded-[12px] bg-[#EFEBFF] text-[#6C4BFF] flex items-center justify-center mb-4 shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <b className="block font-inter font-bold text-[36px] md:text-[48px] tracking-[-0.04em] leading-none text-[#151517]">
                  {formatNumber(counts[stat.id] ?? stat.target, stat.hasComma)}
                  {stat.suffix}
                </b>
                <span className="text-[#535361] text-[14px] mt-2 block font-normal">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeStatsSection;
