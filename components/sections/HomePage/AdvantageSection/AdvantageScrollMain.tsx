"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  svgGraphic: React.ReactNode;
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: "domains",
    title: "Sovereign Domains",
    description:
      "Host on your own custom domain with 100% white-label isolation, dynamic DNS, and hardware-backed TEE security.",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <path d="M60 20 L85 45 L75 80 L35 85 L20 50 Z" fill="#5EEAD4" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M85 45 L105 60 L95 95 L75 80 Z" fill="#14B8A6" />
        <path d="M35 85 L75 80 L65 105 L25 100 Z" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: "attendance-certs",
    title: "Attendance & Certs",
    description:
      "Telemetry logs real-time student watch time and automatically issues tamper-evident verifiable PDF credentials.",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <path d="M60 15 L100 38 L60 61 L20 38 Z" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="2" />
        <path d="M20 38 L60 61 L60 105 L20 82 Z" fill="#8B5CF6" />
        <path d="M60 61 L100 38 L100 82 L60 105 Z" fill="#6D28D9" />
      </svg>
    ),
  },
  {
    id: "live-sessions",
    title: "Live Classrooms",
    description:
      "Zero-latency multi-speaker WebRTC classrooms with breakout rooms, screen share, and instant cloud sync.",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-32 drop-shadow-md">
        <circle cx="60" cy="60" r="38" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="60" cy="60" r="20" fill="#0284C7" />
        <path d="M45 60 L55 48 L65 72 L75 60" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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

        // A18: Initial slight tilts and y offsets (-1deg, 0deg, +1deg; 0, +8, +16px)
        gsap.set(card1Ref.current, { x: 0, y: 0, rotateZ: -1 });
        gsap.set(card2Ref.current, { x: 0, y: 8, rotateZ: 0 });
        gsap.set(card3Ref.current, { x: 0, y: 16, rotateZ: 1 });

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
        // Segment 1 (progress 0 -> 0.3):
        // Group: rotateZ 0 -> 10deg, scale 1 -> 1.3
        // Cards: x-gaps shrink so edges overlap by ≈40px
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: 10,
            scale: 1.3,
            ease: "power1.inOut",
            duration: 0.3,
          },
          0
        );

        tl.to(
          card1Ref.current,
          {
            x: 120,
            ease: "power1.inOut",
            duration: 0.3,
          },
          0
        );

        tl.to(
          card3Ref.current,
          {
            x: -120,
            ease: "power1.inOut",
            duration: 0.3,
          },
          0
        );

        // ----------------------------------------------------
        // Segment 2 (progress 0.3 -> 0.7):
        // Group: rotateZ 10 -> 45deg
        // Cards: move to shared center with small residual offsets (±24px)
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: 45,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.3
        );

        tl.to(
          card1Ref.current,
          {
            x: 290,
            rotateZ: -4,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.3
        );

        tl.to(
          card3Ref.current,
          {
            x: -290,
            rotateZ: 4,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.3
        );

        // ----------------------------------------------------
        // Segment 3 (progress 0.7 -> 1.0):
        // Group: rotateZ 45 -> 70deg, scale 1.3 -> 0.1, opacity 1 -> 0
        // ----------------------------------------------------
        tl.to(
          groupRef.current,
          {
            rotateZ: 70,
            scale: 0.1,
            opacity: 0,
            ease: "power1.in",
            duration: 0.3,
          },
          0.7
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
        {/* Card 1: Sovereign Domains */}
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
