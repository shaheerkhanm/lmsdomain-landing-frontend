"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { AboutStats as AboutStatsType } from "@/types/content";

interface AboutStatsProps {
  data?: AboutStatsType;
}

export function AboutStats({ data }: AboutStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !data.items || data.items.length === 0) return;

    const ctx = gsap.context(() => {
      // Trigger subtle count-up / rise animation on in-view
      gsap.from(".stat-box", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="bg-[#F3F4F6] py-16 sm:py-20 font-urbanist border-b border-[#ECEDEF]">
      <div
        ref={containerRef}
        className="max-w-[1200px] mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {data.items.map((stat, idx) => (
            <div key={idx} className="stat-box flex flex-col items-center">
              <span className="text-[36px] sm:text-[48px] font-semibold text-[#161616] tracking-tight leading-none mb-2">
                {stat.value}
              </span>

              <span className="text-[14px] sm:text-[15px] font-medium text-[#6B6F76]">
                {stat.label}
              </span>

              {stat.source && (
                <span className="text-[11px] text-[#8F94A0] mt-1">
                  Source: {stat.source}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutStats;

