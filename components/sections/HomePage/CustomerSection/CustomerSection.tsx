"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PlaceholderCard {
  id: string;
  initials: string;
  avatarBg: string;
}

const PLACEHOLDER_CARDS: PlaceholderCard[] = [
  {
    id: "card-1",
    initials: "EA",
    avatarBg: "#161616",
  },
  {
    id: "card-2",
    initials: "PT",
    avatarBg: "#7B5CF5",
  },
  {
    id: "card-3",
    initials: "GA",
    avatarBg: "#10B981",
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
        gsap.set(wallTextRef.current, { scale: 0.8, color: "#9CA3AF" });
        gsap.set(deckWrapperRef.current, { y: 40, opacity: 0.95 });
        gsap.set(card1Ref.current, { rotateZ: -4, x: -6, y: 0 });
        gsap.set(card2Ref.current, { rotateZ: 4, x: 8, y: 4 });
        gsap.set(card3Ref.current, { rotateZ: 0, x: 0, y: 6 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 80px",
            end: "+=70%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
          },
        });

        // Stage 1 (0 -> 0.25): Text settles to full scale and dark color, Deck settles over "of"
        tl.to(
          wallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.25,
          },
          0
        );

        tl.to(
          deckWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.25,
          },
          0
        );

        // Stage 2 (0.25 -> 0.6): Card 1 flies upward
        tl.to(
          card1Ref.current,
          {
            y: "-85vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.35,
          },
          0.25
        );

        // Stage 3 (0.6 -> 0.95): Card 2 flies upward; Card 3 settles at 0deg
        tl.to(
          card2Ref.current,
          {
            y: "-85vh",
            rotateZ: 6,
            opacity: 0,
            ease: "power1.in",
            duration: 0.35,
          },
          0.6
        );

        tl.to(
          card3Ref.current,
          {
            x: 0,
            y: 0,
            rotateZ: 0,
            duration: 0.2,
          },
          0.75
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
      {/* Pinned Stage Container: Compact height with direct exit to FAQ */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center overflow-hidden"
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
          <div className="relative w-full max-w-md h-[130px] sm:h-[140px] flex items-center justify-center pointer-events-auto">
            {/* Card 1 (Top of stack, z-30) */}
            <div
              ref={card1Ref}
              style={{
                zIndex: 30,
                boxShadow:
                  "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-center will-change-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ backgroundColor: PLACEHOLDER_CARDS[0].avatarBg }}
                  >
                    {PLACEHOLDER_CARDS[0].initials}
                  </div>
                  <h4 className="text-[16px] font-semibold text-[#161616] leading-tight">
                    Customer story coming soon
                  </h4>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                  Placeholder
                </span>
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
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-center will-change-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ backgroundColor: PLACEHOLDER_CARDS[1].avatarBg }}
                  >
                    {PLACEHOLDER_CARDS[1].initials}
                  </div>
                  <h4 className="text-[16px] font-semibold text-[#161616] leading-tight">
                    Customer story coming soon
                  </h4>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                  Placeholder
                </span>
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
              className="absolute w-[340px] sm:w-[420px] rounded-[20px] bg-white border border-[#ECEDEF] p-5 sm:p-6 flex flex-col justify-center will-change-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ backgroundColor: PLACEHOLDER_CARDS[2].avatarBg }}
                  >
                    {PLACEHOLDER_CARDS[2].initials}
                  </div>
                  <h4 className="text-[16px] font-semibold text-[#161616] leading-tight">
                    Customer story coming soon
                  </h4>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]">
                  Placeholder
                </span>
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
            className="rounded-[20px] bg-white border border-[#ECEDEF] shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="size-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                style={{ backgroundColor: card.avatarBg }}
              >
                {card.initials}
              </div>
              <h4 className="text-sm font-semibold text-[#161616]">Customer story coming soon</h4>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F6F8] text-[#6B6F76]">
              Placeholder
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerSection;