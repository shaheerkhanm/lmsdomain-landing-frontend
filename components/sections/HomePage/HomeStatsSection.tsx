"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DuotoneLearners,
  DuotoneCourses,
  DuotoneLessons,
  DuotoneLiveClasses,
} from "@/components/marketing/icons/duotone";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  hasComma?: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const STATS_DATA: StatItem[] = [
  {
    id: "learners",
    target: 2000,
    suffix: "+",
    hasComma: true,
    label: "learners",
    icon: DuotoneLearners,
  },
  {
    id: "courses",
    target: 100,
    suffix: "+",
    label: "courses",
    icon: DuotoneCourses,
  },
  {
    id: "lessons",
    target: 300,
    suffix: "+",
    label: "lessons",
    icon: DuotoneLessons,
  },
  {
    id: "classes",
    target: 100,
    suffix: "+",
    label: "live classes",
    icon: DuotoneLiveClasses,
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
          const duration = 1400; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              learners: Math.round(2000 * easeOut),
              courses: Math.round(100 * easeOut),
              lessons: Math.round(300 * easeOut),
              classes: Math.round(100 * easeOut),
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
    <section
      ref={sectionRef}
      id="stats-section"
      className="pt-14 pb-24 font-sans transition-colors duration-700"
    >
      <div className="max-w-[1080px] mx-auto px-5 text-center">
        {/* Caption above the numbers */}
        <p className="text-[14px] font-medium text-[#8A8A96] stat-text-muted mb-10 tracking-normal transition-colors duration-700">
          Academies teaching with LMS Domain
        </p>

        {/* 4 equal columns on desktop, 2x2 on mobile, no outer card */}
        <div className="grid grid-cols-2 md:grid-cols-4 relative">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="relative flex flex-col items-center justify-center p-6 sm:p-8"
              >
                {/* Vertical Hairline with Top/Bottom Fade */}
                {idx !== 0 && (
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[75%] stat-divider-line pointer-events-none ${
                      idx === 2 ? "hidden md:block" : ""
                    }`}
                    style={{
                      background:
                        "linear-gradient(transparent, #E4E4EA 25%, #E4E4EA 75%, transparent)",
                    }}
                  />
                )}

                {/* Mobile Second Row Left Divider (idx = 3 on mobile) */}
                {idx === 3 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[75%] stat-divider-line pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(transparent, #E4E4EA 25%, #E4E4EA 75%, transparent)",
                    }}
                  />
                )}

                {/* Mobile Horizontal Divider between row 1 & row 2 */}
                {idx >= 2 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] stat-divider-line pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #E4E4EA 25%, #E4E4EA 75%, transparent)",
                    }}
                  />
                )}

                {/* 48px Duotone Icon (no tile behind) */}
                <div className="mb-4 shrink-0">
                  <Icon size={48} className="w-12 h-12" />
                </div>

                {/* Number: 52px desktop / 38px mobile Inter 700 -0.04em */}
                <b className="block font-inter font-bold text-[38px] md:text-[52px] tracking-[-0.04em] leading-none text-[#151517] stat-text-ink transition-colors duration-700">
                  {formatNumber(counts[stat.id] ?? stat.target, stat.hasComma)}
                  {stat.suffix}
                </b>

                {/* Label: 16px #535361 */}
                <span className="text-[#535361] stat-text-muted text-[16px] font-normal mt-2.5 block transition-colors duration-700">
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
