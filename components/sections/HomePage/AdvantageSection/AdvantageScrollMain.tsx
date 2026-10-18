"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { benefitsContent } from "@/content/home/benefits";

const BENEFIT_CARDS = [
  {
    id: benefitsContent.cards[0].id,
    title: benefitsContent.cards[0].title,
    description: benefitsContent.cards[0].summary,
    imageSrc: "/assets/img/home/benefits/benefit_sell_anywhere.png",
  },
  {
    id: benefitsContent.cards[1].id,
    title: benefitsContent.cards[1].title,
    description: benefitsContent.cards[1].summary,
    imageSrc: "/assets/img/home/benefits/benefit_your_brand.png",
  },
  {
    id: benefitsContent.cards[2].id,
    title: benefitsContent.cards[2].title,
    description: benefitsContent.cards[2].summary,
    imageSrc: "/assets/img/home/benefits/benefit_keep_learners.png",
  },
];

export function AdvantageScrollMain({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A18 Entrance + A19 Scroll Pinned Collapse)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // A18: Initial side-by-side row view (all 3 cards equal size and equal top alignment, y: 0)
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          x: 0,
          y: 0,
          rotateZ: 0,
          scale: 1,
        });
        gsap.set(groupRef.current, { rotateZ: 0, scale: 1, opacity: 1 });

        // ScrollTrigger pinned collapse sequence per spec §5.7 & ref_25.00s to ref_27.75s
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 120px",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: true,
          },
        });

        // ----------------------------------------------------
        // Segment 1 (progress 0 -> 0.6):
        // Scale never goes above 1 (stays at 0.95-1.0).
        // Group rotates as one to -35deg.
        // Cards slide into diagonal stack at center (Card 3 on top)
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: -35,
            scale: 0.92,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        tl.to(
          card1Ref.current,
          {
            x: 290,
            y: 0,
            rotateZ: 0,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        tl.to(
          card2Ref.current,
          {
            x: 0,
            y: 0,
            rotateZ: 0,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        tl.to(
          card3Ref.current,
          {
            x: -290,
            y: 0,
            rotateZ: 0,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        // ----------------------------------------------------
        // Segment 2 (progress 0.6 -> 1.0):
        // Stack shrinks and fades toward the centre
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: -45,
            scale: 0.1,
            opacity: 0,
            ease: "power1.in",
            duration: 0.4,
          },
          0.6
        );
      });

      // Mobile: under 1024px (Normal static stack, no pin or rotate exit)
      mm.add("(max-width: 1023px)", () => {
        gsap.set([groupRef.current, card1Ref.current, card2Ref.current, card3Ref.current], {
          clearProps: "all",
        });
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinWrapperRef}
      className="relative max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] overflow-visible font-urbanist"
    >
      {/* Desktop Group Wrapper (A19 GSAP scrubbed rotation & collapse) */}
      <div
        ref={groupRef}
        className="hidden lg:flex items-center justify-center gap-7 will-change-transform transform-gpu select-none"
      >
        {/* Card 1: Sell Anywhere */}
        <div
          ref={card1Ref}
          style={{ zIndex: 10 }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          {/* Faint dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2 flex items-center justify-center h-[170px]">
            <img
              src={BENEFIT_CARDS[0].imageSrc}
              alt={BENEFIT_CARDS[0].title}
              className="h-[145px] w-auto object-contain drop-shadow-md select-none pointer-events-none"
            />
          </div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[0].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[260px]">
              {BENEFIT_CARDS[0].description}
            </p>
          </div>
        </div>

        {/* Card 2: Your brand, your domain */}
        <div
          ref={card2Ref}
          style={{ zIndex: 20 }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2 flex items-center justify-center h-[170px]">
            <img
              src={BENEFIT_CARDS[1].imageSrc}
              alt={BENEFIT_CARDS[1].title}
              className="h-[145px] w-auto object-contain drop-shadow-md select-none pointer-events-none"
            />
          </div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[1].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[260px]">
              {BENEFIT_CARDS[1].description}
            </p>
          </div>
        </div>

        {/* Card 3: Keep learners coming back */}
        <div
          ref={card3Ref}
          style={{ zIndex: 30 }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2 flex items-center justify-center h-[170px]">
            <img
              src={BENEFIT_CARDS[2].imageSrc}
              alt={BENEFIT_CARDS[2].title}
              className="h-[145px] w-auto object-contain drop-shadow-md select-none pointer-events-none"
            />
          </div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[2].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[260px]">
              {BENEFIT_CARDS[2].description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Flow (No exit animation) */}
      <div className="w-full flex flex-col gap-6 lg:hidden">
        {BENEFIT_CARDS.map((card) => (
          <div
            key={card.id}
            className="rounded-[24px] bg-white border border-[#ECEDEF] shadow-md p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="shrink-0 flex items-center justify-center h-[140px]">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="h-[120px] w-auto object-contain drop-shadow-sm select-none pointer-events-none"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-[#161616]">{card.title}</h4>
              <p className="text-sm text-[#6B6F76] leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvantageScrollMain;
