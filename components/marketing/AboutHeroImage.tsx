"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface AboutHeroImageProps {
  src: string;
  alt?: string;
}

export function AboutHeroImage({ src, alt = "About LMS Domain" }: AboutHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only (>=1024px): Scale 0.94 to 1.0 as it scrolls into view
      mm.add("(min-width: 1024px)", () => {
        if (!cardRef.current || !containerRef.current) return;

        gsap.fromTo(
          cardRef.current,
          { scale: 0.94 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16 lg:pb-24 font-urbanist"
    >
      <div
        ref={cardRef}
        className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden aspect-[4/3] sm:aspect-[16/7] border border-[#ECEDEF] shadow-md will-change-transform bg-slate-100"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default AboutHeroImage;

