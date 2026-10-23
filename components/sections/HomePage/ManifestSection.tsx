"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { manifestoContent as defaultManifestoContent } from "@/content/home/manifesto";
import { useSectionContent } from "@/components/content/PageContent";

export interface ManifestSectionProps {
  statement?: string;
  id?: string;
  bgClassName?: string;
  eyebrow?: string;
}

export function ManifestSection({
  statement,
  id = "manifesto",
  bgClassName = "bg-[#F3F4F6] lg:bg-white",
  eyebrow,
}: ManifestSectionProps = {}) {
  const manifestoContent = useSectionContent("home-manifesto", defaultManifestoContent);
  const words = (statement || manifestoContent.text).trim().split(/\s+/);
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphBlockRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const desktopWords = gsap.utils.toArray<HTMLElement>(".manifesto-word", paragraphBlockRef.current);

      if (isReduced) {
        // Final state for both layouts (the mobile matchMedia branch never runs here)
        const mobileWords = gsap.utils.toArray<HTMLElement>(".manifesto-word-mobile", mobileContainerRef.current);
        gsap.set([...desktopWords, ...mobileWords], { color: "#161616" });
        return;
      }

      // Base color per spec: #C9CCD1
      gsap.set(desktopWords, { color: "#C9CCD1" });

      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (Pinned word illumination vertically centred)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: paragraphBlockRef.current,
            start: "center center",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
          },
        });

        tl.to(desktopWords, {
          color: "#161616",
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power1.inOut",
        });
      });

      // Mobile / Tablet: under 1024px (Natural document flow illumination, no empty runway)
      mm.add("(max-width: 1023px)", () => {
        const mobileWords = gsap.utils.toArray<HTMLElement>(".manifesto-word-mobile", mobileContainerRef.current);
        if (isReduced) {
          gsap.set(mobileWords, { color: "#161616" });
          return;
        }

        gsap.set(mobileWords, { color: "#C9CCD1" });

        gsap.to(mobileWords, {
          color: "#161616",
          stagger: {
            each: 0.03,
            from: "start",
          },
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: mobileTextRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [statement]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${bgClassName} font-urbanist relative overflow-visible flex items-center justify-center pt-0 pb-0 lg:py-24 lg:sm:py-32 lg:min-h-[600px] mb-16 lg:mb-0`}
    >
      {/* Desktop Layout (>=1024px: Pinned Row) */}
      <div
        ref={paragraphBlockRef}
        className="hidden lg:block max-w-[820px] mx-auto px-4 sm:px-6 text-center will-change-transform"
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-6">
            <span>✦</span>
            <span>{eyebrow.replace(/^✦\s*/, "")}</span>
          </div>
        )}
        <p className="text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.3] tracking-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 select-none">
          {words.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word text-[#C9CCD1] will-change-[color]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Mobile Layout (<1024px: In-flow text reveal, no sticky runway) */}
      <div
        ref={mobileContainerRef}
        className={`w-full px-6 py-12 lg:hidden flex ${eyebrow ? "flex-col" : ""} items-center justify-center`}
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-4">
            <span>✦</span>
            <span>{eyebrow.replace(/^✦\s*/, "")}</span>
          </div>
        )}
        <p
          ref={mobileTextRef}
          className="text-2xl sm:text-3xl font-medium leading-[1.35] tracking-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-2.5 gap-y-1.5 select-none text-center max-w-[700px]"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word-mobile text-[#C9CCD1] will-change-[color]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default ManifestSection;
