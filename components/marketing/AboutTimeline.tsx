"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import type { AboutTimeline as AboutTimelineType } from "@/types/content";

interface AboutTimelineProps {
  data?: AboutTimelineType;
}

export function AboutTimeline({ data }: AboutTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !data.items || data.items.length === 0) return;

    const ctx = gsap.context(() => {
      if (!fillLineRef.current || !containerRef.current) return;

      gsap.fromTo(
        fillLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="bg-[#F3F4F6] py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Milestones"
          title={data.title || "The Evolution of LMS Domain"}
          subtitle={
            data.subtitle ||
            "From an initial prototype for independent academies to an enterprise infrastructure power-house."
          }
          align="center"
        />

        {/* Vertical Timeline Container */}
        <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
          {/* Base Track Line (1px #ECEDEF) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 w-[1px] bg-[#ECEDEF]"
          />

          {/* Accent Fill Line (accent #7B5CF5 segment that fills as user scrolls) */}
          <div
            ref={fillLineRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 w-[2px] bg-[#7B5CF5] origin-top will-change-transform"
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {data.items.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex items-start ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  {/* Central Node Dot on Vertical Line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 top-1.5 size-3 rounded-full bg-white border-2 border-[#7B5CF5] z-10 shadow-xs"
                  />

                  {/* Content Container (Alternate L/R on desktop; all on right on mobile) */}
                  <div
                    className={`w-full lg:w-1/2 pl-12 sm:pl-16 lg:pl-0 ${
                      isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    }`}
                  >
                    <div className="bg-white rounded-[24px] border border-[#ECEDEF] p-6 shadow-2xs">
                      <span className="text-[13px] font-bold uppercase tracking-wider text-[#8F94A0] block mb-1">
                        {item.date}
                      </span>
                      <h4 className="text-[20px] font-semibold text-[#161616] tracking-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[15px] text-[#6B6F76] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutTimeline;

