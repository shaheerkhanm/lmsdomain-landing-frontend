"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { manifestoContent } from "@/content/home/manifesto";

const STATEMENT_WORDS = manifestoContent.text.split(" ");

export function ManifestSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphBlockRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const desktopWords = gsap.utils.toArray<HTMLElement>(".manifesto-word", paragraphBlockRef.current);

      if (isReduced) {
        gsap.set(desktopWords, { color: "#161616" });
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

      // Mobile / Tablet: under 1024px (Sticky paragraph in 160vh container, vertically centred)
      mm.add("(max-width: 1023px)", () => {
        const mobileWords = gsap.utils.toArray<HTMLElement>(".manifesto-word-mobile", mobileContainerRef.current);
        if (isReduced) {
          gsap.set(mobileWords, { color: "#161616" });
          return;
        }

        gsap.set(mobileWords, { color: "#C9CCD1" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // Word illumination finishes by 80% of scroll so it is fully read before release
        tl.to(mobileWords, {
          color: "#161616",
          stagger: {
            each: 0.04,
            from: "start",
          },
          duration: 0.8,
          ease: "power1.inOut",
        }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="bg-white font-urbanist relative overflow-visible flex items-center justify-center lg:py-24 lg:sm:py-32 lg:min-h-[600px]"
    >
      {/* Desktop Layout (>=1024px: Pinned Row) */}
      <div
        ref={paragraphBlockRef}
        className="hidden lg:block max-w-[820px] mx-auto px-4 sm:px-6 text-center will-change-transform"
      >
        <p className="text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.3] tracking-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 select-none">
          {STATEMENT_WORDS.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word text-[#C9CCD1] will-change-[color]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Mobile Layout (<1024px: 160vh Sticky Container, Vertically Centred) */}
      <div
        ref={mobileContainerRef}
        className="relative w-full h-[160vh] lg:hidden"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6">
          <p className="text-2xl sm:text-3xl font-medium leading-[1.35] tracking-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-2.5 gap-y-1.5 select-none text-center max-w-[700px]">
            {STATEMENT_WORDS.map((word, idx) => (
              <span
                key={idx}
                className="manifesto-word-mobile text-[#C9CCD1] will-change-[color]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ManifestSection;
