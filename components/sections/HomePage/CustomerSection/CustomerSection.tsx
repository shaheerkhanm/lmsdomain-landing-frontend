"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PlaceholderCard {
  id: string;
  initials: string;
  avatarBg: string;
  title: string;
  subtitle: string;
  caseNum: string;
}

const PLACEHOLDER_CARDS: PlaceholderCard[] = [
  {
    id: "card-1",
    initials: "EA",
    avatarBg: "#161616",
    title: "Customer story coming soon",
    subtitle: "Reserved for verified enterprise academy case study and student outcomes.",
    caseNum: "Spotlight #01",
  },
  {
    id: "card-2",
    initials: "PT",
    avatarBg: "#7B5CF5",
    title: "Customer story coming soon",
    subtitle: "Reserved for professional training and certification partner program showcase.",
    caseNum: "Spotlight #02",
  },
  {
    id: "card-3",
    initials: "GA",
    avatarBg: "#10B981",
    title: "Customer story coming soon",
    subtitle: "Reserved for global online academy launch and multi-batch milestones.",
    caseNum: "Spotlight #03",
  },
];

export function CustomerSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLHeadingElement>(null);
  const deckWrapperRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Measure and fit headline width to ~88% of viewport (never wider than innerWidth - 96px)
  useEffect(() => {
    const handleResize = () => {
      if (!wallTextRef.current) return;
      const vw = window.innerWidth;
      // Target 88% of viewport width, clamped to innerWidth - 96px
      const targetWidth = Math.min(vw * 0.88, vw - 96);

      // Measure current width with baseline font size
      wallTextRef.current.style.fontSize = "100px";
      const measuredWidth = wallTextRef.current.offsetWidth || 1;
      const desiredFontSize = Math.max(28, Math.floor((targetWidth / measuredWidth) * 100));

      wallTextRef.current.style.fontSize = `${desiredFontSize}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A20 Text Scale + A21 Card Upward Flight)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) {
          gsap.set(wallTextRef.current, { color: "#161616", scale: 1 });
          gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
            clearProps: "all",
          });
          return;
        }

        // Initial positions:
        // Text scale 0.65 -> 1.0 (subtle zoom, stays inside bounds), color #9CA3AF -> #161616
        gsap.set(wallTextRef.current, { scale: 0.75, color: "#9CA3AF" });
        // Deck starts slightly lower and rises directly over "of"
        gsap.set(deckWrapperRef.current, { y: 60, opacity: 0.9 });
        // Initial card rotations: subtle fan
        gsap.set(card1Ref.current, { rotateZ: -4, x: -6, y: 0 });
        gsap.set(card2Ref.current, { rotateZ: 4, x: 8, y: 4 });
        gsap.set(card3Ref.current, { rotateZ: 0, x: 0, y: 8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 60px",
            end: "+=130%",
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
          },
        });

        // Stage 1 (0 -> 0.4): Text settles to full scale and dark color, Deck settles over "of"
        tl.to(
          wallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.4,
          },
          0
        );

        tl.to(
          deckWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.4,
          },
          0
        );

        // Stage 2 (0.4 -> 0.8): Card 1 flies upward
        tl.to(
          card1Ref.current,
          {
            y: "-90vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.4,
          },
          0.4
        );

        // Stage 3 (0.8 -> 1.2): Card 2 flies upward
        // Card 3 stays centered at 0deg!
        tl.to(
          card2Ref.current,
          {
            y: "-90vh",
            rotateZ: 6,
            opacity: 0,
            ease: "power1.in",
            duration: 0.4,
          },
          0.8
        );
      });

      // Mobile: under 1024px (Normal flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(wallTextRef.current, { scale: 1, color: "#161616" });
        gsap.set(
          [deckWrapperRef.current, card1Ref.current, card2Ref.current, card3Ref.current],
          {
            clearProps: "all",
          }
        );
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="bg-[#F3F4F6] font-urbanist relative overflow-visible">
      {/* Pinned Stage Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[640px] sm:h-[700px] flex items-center justify-center overflow-hidden"
      >
        {/* A20: Headline "Wall of love" fitting ~88% of screen with font-weight 600 */}
        <div
          ref={textWrapperRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 px-6 sm:px-12"
        >
          <h2
            ref={wallTextRef}
            className="font-semibold tracking-[-0.03em] leading-none text-center whitespace-nowrap will-change-transform text-[#161616]"
            style={{ fontWeight: 600 }}
          >
            Wall of love
          </h2>
        </div>

        {/* A21: Deck sits centered over "of", starting at the middle height of letters and hanging below baseline */}
        <div
          ref={deckWrapperRef}
          className="absolute inset-x-0 top-[52%] -translate-y-1/2 z-10 flex items-center justify-center will-change-transform pointer-events-none"
        >
          <div className="relative w-full max-w-md h-[210px] sm:h-[220px] flex items-center justify-center pointer-events-auto">
            {/* Card 1 (Top of stack, z-30) */}
            <div
              ref={card1Ref}
              style={{
                zIndex: 30,
                boxShadow:
                  "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ECEDEF]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="size-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: PLACEHOLDER_CARDS[0].avatarBg }}
                    >
                      {PLACEHOLDER_CARDS[0].initials}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_CARDS[0].title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                    Placeholder
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-[#6B6F76] leading-relaxed">
                  {PLACEHOLDER_CARDS[0].subtitle}
                </p>
              </div>
              <div className="pt-3 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-[#161616]">LMS Domain Academy Network</span>
                <span className="font-mono text-[#7B5CF5] font-semibold">{PLACEHOLDER_CARDS[0].caseNum}</span>
              </div>
            </div>

            {/* Card 2 (Middle of stack, z-20) */}
            <div
              ref={card2Ref}
              style={{
                zIndex: 20,
                boxShadow:
                  "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ECEDEF]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="size-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: PLACEHOLDER_CARDS[1].avatarBg }}
                    >
                      {PLACEHOLDER_CARDS[1].initials}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_CARDS[1].title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                    Placeholder
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-[#6B6F76] leading-relaxed">
                  {PLACEHOLDER_CARDS[1].subtitle}
                </p>
              </div>
              <div className="pt-3 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-[#161616]">LMS Domain Academy Network</span>
                <span className="font-mono text-[#7B5CF5] font-semibold">{PLACEHOLDER_CARDS[1].caseNum}</span>
              </div>
            </div>

            {/* Card 3 (Bottom of stack / stays settled at 0deg, z-10) */}
            <div
              ref={card3Ref}
              style={{
                zIndex: 10,
                boxShadow:
                  "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ECEDEF]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="size-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: PLACEHOLDER_CARDS[2].avatarBg }}
                    >
                      {PLACEHOLDER_CARDS[2].initials}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#161616] leading-tight">
                        {PLACEHOLDER_CARDS[2].title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                    Placeholder
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-[#6B6F76] leading-relaxed">
                  {PLACEHOLDER_CARDS[2].subtitle}
                </p>
              </div>
              <div className="pt-3 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#6B6F76]">
                <span className="font-medium text-[#161616]">LMS Domain Academy Network</span>
                <span className="font-mono text-[#7B5CF5] font-semibold">{PLACEHOLDER_CARDS[2].caseNum}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Flow */}
      <div className="w-full flex flex-col gap-4 lg:hidden px-4 py-8">
        {PLACEHOLDER_CARDS.map((card) => (
          <div
            key={card.id}
            className="rounded-[20px] bg-white border border-[#ECEDEF] shadow-sm p-5 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="size-7 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ backgroundColor: card.avatarBg }}
                >
                  {card.initials}
                </div>
                <h4 className="text-sm font-semibold text-[#161616]">{card.title}</h4>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F6F8] text-[#6B6F76]">
                Placeholder
              </span>
            </div>
            <p className="text-xs text-[#6B6F76]">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerSection;