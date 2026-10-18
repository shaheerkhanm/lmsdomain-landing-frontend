"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  svgGraphic: React.ReactNode;
}

import { benefitsContent } from "@/content/home/benefits";

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: benefitsContent.cards[0].id,
    title: benefitsContent.cards[0].title,
    description: benefitsContent.cards[0].summary,
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <defs>
          <linearGradient id="sell-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>
          <linearGradient id="sell-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="sell-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* 3D Isometric Global Payment & Checkout Vault */}
        <polygon points="60,22 96,42 60,62 24,42" fill="url(#sell-top)" />
        <polygon points="24,42 60,62 60,102 24,82" fill="url(#sell-left)" />
        <polygon points="60,62 96,42 96,82 60,102" fill="url(#sell-right)" />
        <polygon points="60,34 78,44 60,54 42,44" fill="#FFFFFF" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: benefitsContent.cards[1].id,
    title: benefitsContent.cards[1].title,
    description: benefitsContent.cards[1].summary,
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <defs>
          <linearGradient id="brand-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
          <linearGradient id="brand-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="brand-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
        </defs>
        {/* 3D Isometric Brand & Custom Domain Shield Podium */}
        <polygon points="60,18 98,40 60,62 22,40" fill="url(#brand-top)" />
        <polygon points="22,40 60,62 60,104 22,82" fill="url(#brand-left)" />
        <polygon points="60,62 98,40 98,82 60,104" fill="url(#brand-right)" />
        <circle cx="60" cy="40" r="12" fill="#FFFFFF" fillOpacity="0.45" />
      </svg>
    ),
  },
  {
    id: benefitsContent.cards[2].id,
    title: benefitsContent.cards[2].title,
    description: benefitsContent.cards[2].summary,
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <defs>
          <linearGradient id="engage-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
          <linearGradient id="engage-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="engage-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
        </defs>
        {/* 3D Isometric Points & Achievement Beacon */}
        <polygon points="60,20 96,41 60,62 24,41" fill="url(#engage-top)" />
        <polygon points="24,41 60,62 60,102 24,81" fill="url(#engage-left)" />
        <polygon points="60,62 96,41 96,81 60,102" fill="url(#engage-right)" />
        <circle cx="60" cy="41" r="14" fill="#FFFFFF" fillOpacity="0.35" />
        <circle cx="60" cy="41" r="7" fill="#FFFFFF" fillOpacity="0.75" />
      </svg>
    ),
  },
];

export function AdvantageScrollMain({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A18 Entrance + A19 Scroll Pinned Collapse)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // A18: Initial side-by-side row view (cards sit completely upright, no fan overlap)
        gsap.set(card1Ref.current, { x: 0, y: 0, rotateZ: 0 });
        gsap.set(card2Ref.current, { x: 0, y: 0, rotateZ: 0 });
        gsap.set(card3Ref.current, { x: 0, y: 24, rotateZ: 0 });
        gsap.set(groupRef.current, { rotateZ: 0, scale: 1, opacity: 1 });

        // ScrollTrigger pinned collapse sequence per spec §5.7
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
        // Group rotates 0 -> 45deg, scale 1 -> 1.25
        // Cards slide into diagonal stack at center (Card 3 on top)
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: 45,
            scale: 1.25,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        tl.to(
          card1Ref.current,
          {
            x: 320,
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
            x: -320,
            y: -24,
            rotateZ: 0,
            ease: "power1.inOut",
            duration: 0.6,
          },
          0
        );

        // ----------------------------------------------------
        // Segment 2 (progress 0.6 -> 1.0):
        // Group: rotateZ 45 -> 70deg, scale 1.25 -> 0.1, opacity 1 -> 0
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: 70,
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
      className="relative max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] overflow-visible"
    >
      {/* Desktop Group Wrapper (A19 GSAP scrubbed rotation & collapse) */}
      <div
        ref={groupRef}
        className="hidden lg:flex items-center justify-center gap-8 will-change-transform transform-gpu select-none"
      >
        {/* Card 1: Sell Anywhere */}
        <div
          ref={card1Ref}
          style={{ zIndex: 10 }}
          className="relative w-[300px] h-[340px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          {/* Faint 16px grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2">{BENEFIT_CARDS[0].svgGraphic}</div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[0].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[240px]">
              {BENEFIT_CARDS[0].description}
            </p>
          </div>
        </div>

        {/* Card 2: Attendance & Certs */}
        <div
          ref={card2Ref}
          style={{ zIndex: 20 }}
          className="relative w-[300px] h-[340px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2">{BENEFIT_CARDS[1].svgGraphic}</div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[1].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[240px]">
              {BENEFIT_CARDS[1].description}
            </p>
          </div>
        </div>

        {/* Card 3: Live Classrooms */}
        <div
          ref={card3Ref}
          style={{ zIndex: 30 }}
          className="relative w-[300px] h-[340px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center justify-between overflow-hidden will-change-transform"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 shrink-0 pt-2">{BENEFIT_CARDS[2].svgGraphic}</div>
          <div className="relative z-10 text-center space-y-2 pb-2">
            <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight">
              {BENEFIT_CARDS[2].title}
            </h4>
            <p className="text-[13px] text-[#6B6F76] leading-relaxed max-w-[240px]">
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
            className="rounded-[28px] bg-white border border-slate-200/90 shadow-md p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="shrink-0">{card.svgGraphic}</div>
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
