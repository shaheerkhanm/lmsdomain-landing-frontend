"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { benefitsContent } from "@/content/home/benefits";

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

        // A18: Initial side-by-side row view (cards sit completely upright, tops lined up, NO y-offset)
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          x: 0,
          y: 0,
          rotateZ: 0,
        });
        gsap.set(groupRef.current, { rotateZ: 0, scale: 1, opacity: 1 });

        // ScrollTrigger pinned collapse sequence
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

        // Segment 1 (progress 0 -> 0.6):
        // Group rotates 0 -> 45deg, scale 1 -> 1.25
        tl.to(
          groupRef.current,
          {
            rotateZ: 45,
            scale: 1.22,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        );

        // Card 1 shifts inward to overlap card 2
        tl.to(
          card1Ref.current,
          {
            x: 180,
            y: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        );

        // Card 3 shifts inward to overlap card 2
        tl.to(
          card3Ref.current,
          {
            x: -180,
            y: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        );

        // Segment 2 (progress 0.6 -> 1.0):
        // Deck stays assembled in diagonal view, smooth exit transition
        tl.to(
          groupRef.current,
          {
            opacity: 0.95,
            ease: "power1.in",
            duration: 0.4,
          },
          0.6
        );
      });

      // Mobile: under 1024px (Normal static stack, no pin or rotate exit)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          [groupRef.current, card1Ref.current, card2Ref.current, card3Ref.current],
          {
            clearProps: "all",
          }
        );
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  const card1 = benefitsContent.cards[0];
  const card2 = benefitsContent.cards[1];
  const card3 = benefitsContent.cards[2];

  return (
    <div
      ref={pinWrapperRef}
      className="relative max-w-6xl mx-auto w-full flex flex-col items-center justify-center min-h-[500px] sm:min-h-[540px] overflow-visible font-urbanist"
    >
      {/* Desktop Group Wrapper (A19 GSAP scrubbed rotation & collapse) */}
      <div
        ref={groupRef}
        className="hidden lg:flex items-center justify-center gap-7 will-change-transform transform-gpu select-none"
      >
        {/* Card 1: Sell Anywhere */}
        <div
          ref={card1Ref}
          style={{
            zIndex: 10,
            boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
          }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform text-center"
        >
          {/* Faint subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top 55%: Large 3D Object (~180px tall) */}
          <div className="relative z-10 w-[180px] h-[180px] shrink-0 flex items-center justify-center">
            <Image
              src="/assets/img/home/benefits/benefit_sell_anywhere.png"
              alt="Sell anywhere 3D illustration"
              width={180}
              height={180}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          {/* Bottom Content: Title & 2-Line Subtitle */}
          <div className="relative z-10 space-y-1.5 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {card1.title}
            </h4>
            <p className="text-[14px] font-normal text-[#6B6F76] leading-relaxed max-w-[260px]">
              {card1.summary}
            </p>
          </div>
        </div>

        {/* Card 2: Your brand, your domain */}
        <div
          ref={card2Ref}
          style={{
            zIndex: 20,
            boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
          }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform text-center"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top 55%: Large 3D Object (~180px tall) */}
          <div className="relative z-10 w-[180px] h-[180px] shrink-0 flex items-center justify-center">
            <Image
              src="/assets/img/home/benefits/benefit_your_brand.png"
              alt="Your brand 3D illustration"
              width={180}
              height={180}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="relative z-10 space-y-1.5 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {card2.title}
            </h4>
            <p className="text-[14px] font-normal text-[#6B6F76] leading-relaxed max-w-[260px]">
              {card2.summary}
            </p>
          </div>
        </div>

        {/* Card 3: Keep learners coming back (Lined up on same line, no y-offset) */}
        <div
          ref={card3Ref}
          style={{
            zIndex: 30,
            boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
          }}
          className="relative w-[320px] h-[390px] rounded-[24px] bg-white border border-[#ECEDEF] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform text-center"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top 55%: Large 3D Object (~180px tall) */}
          <div className="relative z-10 w-[180px] h-[180px] shrink-0 flex items-center justify-center">
            <Image
              src="/assets/img/home/benefits/benefit_keep_learners.png"
              alt="Keep learners coming back 3D illustration"
              width={180}
              height={180}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="relative z-10 space-y-1.5 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {card3.title}
            </h4>
            <p className="text-[14px] font-normal text-[#6B6F76] leading-relaxed max-w-[260px]">
              {card3.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Flow */}
      <div className="w-full flex flex-col gap-6 lg:hidden px-4">
        {benefitsContent.cards.map((card, idx) => (
          <div
            key={card.id}
            className="rounded-[24px] bg-white border border-[#ECEDEF] shadow-md p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="w-[140px] h-[140px] shrink-0 relative flex items-center justify-center">
              <Image
                src={
                  idx === 0
                    ? "/assets/img/home/benefits/benefit_sell_anywhere.png"
                    : idx === 1
                    ? "/assets/img/home/benefits/benefit_your_brand.png"
                    : "/assets/img/home/benefits/benefit_keep_learners.png"
                }
                alt={card.title}
                width={140}
                height={140}
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
                {card.title}
              </h4>
              <p className="text-[14px] font-normal text-[#6B6F76] leading-relaxed">
                {card.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvantageScrollMain;
