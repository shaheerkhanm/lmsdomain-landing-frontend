"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DomieOrb } from "@/components/ai/DomieOrb";
import {
  LayoutGrid,
  Sparkles,
  BookOpen,
  CalendarDays,
  Video,
  Users,
  Bell,
  Settings,
  Search,
} from "lucide-react";

export function HeroDashboard() {
  const asmRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const targetPRef = useRef(0);
  const currentPRef = useRef(0);
  const [currentP, setCurrentP] = useState(0);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) {
      targetPRef.current = 1;
      currentPRef.current = 1;
      setCurrentP(1);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const updateScale = () => {
      if (asmRef.current && contentRef.current) {
        const clientW = asmRef.current.clientWidth;
        if (clientW > 0) {
          const s = Math.min(1, clientW / 1100);
          setScale(s);
          setHeight(contentRef.current.offsetHeight * s);
        }
      }
    };

    const updateScroll = () => {
      if (!asmRef.current) return;
      if (prefersReduced) {
        targetPRef.current = 1;
        return;
      }
      const r = asmRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress runs from frameTop = 0.95*vh (p = 0) to frameTop = 0.30*vh (p = 1)
      let rawP = (vh * 0.95 - r.top) / (vh * 0.65);
      // On first load without scroll (scrollY <= 2), ensure target is exactly 0
      if (typeof window !== "undefined" && window.scrollY <= 2) {
        rawP = 0;
      }
      targetPRef.current = Math.max(0, Math.min(1, rawP));
    };

    updateScale();
    updateScroll();

    let animId: number;
    const tick = () => {
      if (prefersReduced) {
        setCurrentP(1);
        return;
      }
      const diff = targetPRef.current - currentPRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentPRef.current += diff * 0.12;
        setCurrentP(Number(currentPRef.current.toFixed(4)));
      } else if (currentPRef.current !== targetPRef.current) {
        currentPRef.current = targetPRef.current;
        setCurrentP(targetPRef.current);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onScroll = () => {
      updateScroll();
    };

    const onResize = () => {
      checkMobile();
      updateScale();
      updateScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      updateScale();
      updateScroll();
    });
    if (asmRef.current) ro.observe(asmRef.current);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const effectiveP = isReducedMotion ? 1 : currentP;
  const isFinalState = isReducedMotion || effectiveP >= 0.999;
  const mult = isMobile ? 0.5 : 1.0;

  // Staggered card transforms: each card's progress = clamp((p - i*0.06) / 0.82)
  const getCardTransform = (index: number, baseDx: number, baseDy: number, baseR: number) => {
    if (isFinalState) {
      return {
        transform: "none",
        boxShadow: "none",
      };
    }
    const cardRawP = Math.max(0, Math.min(1, (effectiveP - index * 0.06) / 0.82));
    const cardEased = 1 - Math.pow(1 - cardRawP, 2);
    const factor = (1 - cardEased) * mult;

    const dx = baseDx * factor;
    const dy = baseDy * factor;
    const r = baseR * factor;
    const cardScale = 1 + 0.06 * (1 - cardEased);
    const shadowAlpha = 0.55 * (1 - cardEased);

    return {
      transform: `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) rotate(${r.toFixed(2)}deg) scale(${cardScale.toFixed(3)})`,
      boxShadow:
        cardEased >= 0.99
          ? "none"
          : `0 40px 70px -30px rgba(20,10,60,${shadowAlpha.toFixed(3)})`,
    };
  };

  const card1Style = getCardTransform(0, -145, -65, -7);
  const card2Style = getCardTransform(1, 145, -95, 7);
  const card3Style = getCardTransform(2, -95, 145, -10);
  const card4Style = getCardTransform(3, 130, 175, 10);

  // Bezel shell scales 0.82 -> 1.0; at final state transform is strictly none
  const bezelTransform = isFinalState ? "none" : `scale(${0.82 + 0.18 * effectiveP})`;

  // Screen background dimmed content (rail + top bar at 30% -> 100%)
  const dimmedOpacity = isFinalState ? 1 : 0.3 + 0.7 * effectiveP;

  return (
    <div
      ref={asmRef}
      className="asm-container relative max-w-[1120px] mx-auto pb-8 sm:pb-12 overflow-visible"
      style={{ "--p": effectiveP } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className="dev-wrapper relative w-full origin-top overflow-visible"
        style={{
          height: height ? `${height}px` : "auto",
        }}
      >
        <div
          ref={contentRef}
          className="devscale-content origin-top-left overflow-visible"
          style={{
            width: "1100px",
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Black device bezel (scales 0.82 -> 1, overflow visible for floating cards) */}
          <div
            className="rounded-[30px] p-[14px] bg-[#0B0B0D] shadow-[0_60px_120px_-50px_rgba(20,10,60,0.55),inset_0_0_0_1px_#26262B] origin-center overflow-visible"
            style={{
              transform: bezelTransform,
            }}
          >
            {/* Dark Admin Screen */}
            <div className="bg-[#121214] rounded-[18px] grid grid-cols-[64px_minmax(0,1fr)] h-[700px] text-[#ECECF1] font-sans select-none relative overflow-visible">
              {/* Left Rail (starts at 30% opacity, crisp icons) */}
              <aside
                className="border-r border-[#232327] flex flex-col items-center gap-4 py-[18px] transition-opacity duration-150"
                style={{ opacity: dimmedOpacity }}
              >
                {/* Domie Logo Tile */}
                <span className="w-[34px] h-[34px] rounded-[10px] bg-[#1A1A1F] grid place-items-center shadow-xs overflow-hidden">
                  <DomieOrb size={24} surface="dark" />
                </span>

                {/* Nav Icons (lucide-react 18px stroke 1.75) */}
                <i className="w-9 h-9 rounded-[10px] grid place-items-center bg-[#26262B] text-white not-italic cursor-pointer">
                  <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#A48BFF] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <Sparkles className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <CalendarDays className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <Video className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>

                {/* Spacer */}
                <span className="flex-1" />

                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
                <i className="w-9 h-9 rounded-[10px] grid place-items-center text-[#8C8C98] not-italic cursor-pointer hover:bg-white/5 transition-colors">
                  <Settings className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </i>
              </aside>

              {/* Main Area */}
              <div className="p-[18px_22px] flex flex-col gap-3.5 min-w-0 relative overflow-visible">
                {/* Top Bar (starts at 30% opacity) */}
                <div
                  className="flex items-center gap-2.5 transition-opacity duration-150"
                  style={{ opacity: dimmedOpacity }}
                >
                  <h3 className="text-[24px] font-bold tracking-[-0.03em] mr-auto text-white">
                    Dashboard
                  </h3>
                  <span className="flex items-center gap-2 w-[240px] bg-[#1A1A1F] border border-[#2A2A30] rounded-[10px] px-3 py-2 text-[#A5A5B2] text-[12.5px]">
                    <Search className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Search courses, learners…</span>
                    <em className="ml-auto font-mono text-[10.5px] not-italic text-[#A5A5B2]">⌘K</em>
                  </span>
                  <span className="bg-white text-[#151517] rounded-[10px] px-3.5 py-2 font-semibold text-[12.5px] flex items-center gap-1.5 shadow-xs select-none">
                    <DomieOrb size={16} surface="light" />
                    Ask Domie ✦
                  </span>
                  <span
                    className="w-[34px] h-[34px] rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg, #F2894A, #E2539B)" }}
                  />
                </div>

                {/* 2×2 Card Grid (cards sit with z-20 so they break out and float over bezel) */}
                <div className="grid grid-cols-2 gap-3.5 flex-1 min-h-0 relative overflow-visible">
                  {/* Card 1: Today's live class (breakout top-left) */}
                  <div
                    className="bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between z-20 will-change-transform"
                    style={card1Style}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5">
                        <div>
                          <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                            Today&apos;s live class
                          </h4>
                          <div className="text-[#A5A5B2] text-[12px] mt-0.5">
                            Batch B · Full-Stack Web Engineering
                          </div>
                        </div>
                        <span className="bg-[#D9383E] text-white rounded-[6px] px-2 py-0.5 text-[10.5px] font-bold tracking-wide">
                          LIVE
                        </span>
                      </div>

                      {/* Meeting Field */}
                      <div className="mt-3">
                        <label className="block text-[#A5A5B2] text-[10.5px] tracking-[0.06em] uppercase mb-1">
                          Meeting
                        </label>
                        <div className="flex items-center gap-2 bg-[#141417] border border-[#2A2A31] rounded-[10px] px-3 py-2 text-[12.5px] text-[#ECECF1]">
                          <span className="w-5 h-5 rounded-[6px] bg-[#2D8CFF] grid place-items-center text-white font-bold text-[9px]">
                            Z
                          </span>
                          <span>Zoom · linked to Batch B</span>
                          <span className="ml-auto text-[#A5A5B2] text-[12px]">⧉</span>
                        </div>
                      </div>

                      {/* When Field */}
                      <div className="mt-2.5">
                        <label className="block text-[#A5A5B2] text-[10.5px] tracking-[0.06em] uppercase mb-1">
                          When
                        </label>
                        <div className="flex items-center gap-2 bg-[#141417] border border-[#2A2A31] rounded-[10px] px-3 py-2 text-[12.5px] text-[#ECECF1]">
                          <span>Monday · 7:00 PM IST</span>
                          <span className="ml-auto text-[#A5A5B2] text-[12px]">↻</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA row */}
                    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-[#26262C]">
                      <span className="bg-white text-[#151517] font-semibold text-[11.5px] rounded-[8px] px-3 py-1.5 shadow-xs select-none cursor-pointer">
                        Start class
                      </span>
                      <small className="text-[#A5A5B2] text-[11px]">
                        Reminder sent to 24 learners
                      </small>
                    </div>
                  </div>

                  {/* Card 2: Needs your attention (breakout top-right) */}
                  <div
                    className="bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between z-20 will-change-transform"
                    style={card2Style}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                            Needs your attention
                          </h4>
                          <div className="text-[#A5A5B2] text-[12px] mt-0.5">
                            Waiting on you right now
                          </div>
                        </div>
                        <span className="text-[#A48BFF] text-[11.5px] font-semibold cursor-pointer">
                          View all
                        </span>
                      </div>

                      {/* Item 1 */}
                      <div className="flex items-center gap-2.5 bg-[#141417] border border-[#26262C] rounded-[11px] p-2.5 mt-3">
                        <span className="w-7 h-7 rounded-[8px] bg-[#F2894A]/15 text-[#F2894A] grid place-items-center font-bold text-[12px] shrink-0">
                          📄
                        </span>
                        <div className="flex-1 min-w-0">
                          <b className="block text-[12.5px] font-semibold text-[#ECECF1] truncate">
                            Applications to review
                          </b>
                          <small className="block text-[#A5A5B2] text-[11px]">
                            Batch C · starts next month
                          </small>
                        </div>
                        <em className="font-mono text-[11.5px] bg-[#26262C] text-white px-2 py-0.5 rounded-[6px] not-italic font-bold">
                          2
                        </em>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center gap-2.5 bg-[#141417] border border-[#26262C] rounded-[11px] p-2.5 mt-2">
                        <span className="w-7 h-7 rounded-[8px] bg-[#17A06B]/15 text-[#17A06B] grid place-items-center font-bold text-[12px] shrink-0">
                          💳
                        </span>
                        <div className="flex-1 min-w-0">
                          <b className="block text-[12.5px] font-semibold text-[#ECECF1] truncate">
                            Offline payments to approve
                          </b>
                          <small className="block text-[#A5A5B2] text-[11px]">
                            Bank transfers awaiting verification
                          </small>
                        </div>
                        <em className="font-mono text-[11.5px] bg-[#26262C] text-white px-2 py-0.5 rounded-[6px] not-italic font-bold">
                          2
                        </em>
                      </div>
                    </div>

                    {/* Radio pills */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#26262C]">
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-white bg-white/10 px-2.5 py-1 rounded-full cursor-pointer">
                        <i className="w-1.5 h-1.5 rounded-full bg-[#17A06B] block not-italic" />
                        Approve
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#A5A5B2] hover:text-white px-2 py-1 rounded-full cursor-pointer transition-colors">
                        Review later
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Revenue this month (breakout bottom-left) */}
                  <div
                    className="bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between z-20 will-change-transform"
                    style={card3Style}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                            Revenue this month
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-bold text-[26px] tracking-[-0.03em] text-white leading-none">
                              ₹4,86,200
                            </span>
                            <span className="text-[#17A06B] font-semibold text-[11.5px]">
                              ▲ 31.2%
                            </span>
                          </div>
                        </div>
                        <span className="text-[#A48BFF] text-[11.5px] font-semibold cursor-pointer">
                          Reports
                        </span>
                      </div>

                      {/* 4-segment progress bar */}
                      <div className="h-2 rounded-full overflow-hidden bg-[#24242A] flex gap-[2px] mt-3">
                        <span className="bg-[#8B6CFF] w-[42%]" />
                        <span className="bg-[#7FD8C0] w-[26%]" />
                        <span className="bg-[#F2C76E] w-[18%]" />
                        <span className="bg-[#E2539B] w-[14%]" />
                      </div>

                      {/* 4 Source tiles */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="flex items-center gap-2 bg-[#141417] border border-[#26262C] rounded-[11px] p-2">
                          <span className="w-6 h-6 rounded-[8px] bg-[#8B6CFF]/15 grid place-items-center shrink-0">
                            <i className="w-2 h-2 rounded-[2px] bg-[#8B6CFF] block rotate-45 not-italic" />
                          </span>
                          <div className="min-w-0">
                            <b className="block text-[12px] font-semibold text-white leading-tight">Courses</b>
                            <small className="block text-[#A5A5B2] text-[10.5px]">186 sales</small>
                          </div>
                          <span className="ml-auto font-mono text-[11px] font-semibold text-[#E6E6EC]">₹2.04L</span>
                        </div>

                        <div className="flex items-center gap-2 bg-[#141417] border border-[#26262C] rounded-[11px] p-2">
                          <span className="w-6 h-6 rounded-[8px] bg-[#7FD8C0]/15 grid place-items-center shrink-0">
                            <i className="w-2 h-2 rounded-[2px] bg-[#7FD8C0] block rotate-45 not-italic" />
                          </span>
                          <div className="min-w-0">
                            <b className="block text-[12px] font-semibold text-white leading-tight">Live batches</b>
                            <small className="block text-[#A5A5B2] text-[10.5px]">64 seats</small>
                          </div>
                          <span className="ml-auto font-mono text-[11px] font-semibold text-[#E6E6EC]">₹1.26L</span>
                        </div>

                        <div className="flex items-center gap-2 bg-[#141417] border border-[#26262C] rounded-[11px] p-2">
                          <span className="w-6 h-6 rounded-[8px] bg-[#F2C76E]/15 grid place-items-center shrink-0">
                            <i className="w-2 h-2 rounded-[2px] bg-[#F2C76E] block rotate-45 not-italic" />
                          </span>
                          <div className="min-w-0">
                            <b className="block text-[12px] font-semibold text-white leading-tight">Test series</b>
                            <small className="block text-[#A5A5B2] text-[10.5px]">212 sales</small>
                          </div>
                          <span className="ml-auto font-mono text-[11px] font-semibold text-[#E6E6EC]">₹0.88L</span>
                        </div>

                        <div className="flex items-center gap-2 bg-[#141417] border border-[#26262C] rounded-[11px] p-2">
                          <span className="w-6 h-6 rounded-[8px] bg-[#E2539B]/15 grid place-items-center shrink-0">
                            <i className="w-2 h-2 rounded-[2px] bg-[#E2539B] block rotate-45 not-italic" />
                          </span>
                          <div className="min-w-0">
                            <b className="block text-[12px] font-semibold text-white leading-tight">Bundles</b>
                            <small className="block text-[#A5A5B2] text-[10.5px]">31 sales</small>
                          </div>
                          <span className="ml-auto font-mono text-[11px] font-semibold text-[#E6E6EC]">₹0.68L</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Domie's brief for today (breakout bottom-right) */}
                  <div
                    className="bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative grid grid-cols-[minmax(0,1fr)_150px] gap-2 items-center overflow-hidden z-20 will-change-transform"
                    style={card4Style}
                  >
                    <div>
                      <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                        ✦ Domie&apos;s brief for today
                      </h4>
                      <p className="text-[#B4B4C0] text-[12.5px] mt-2 max-w-[30ch] leading-relaxed">
                        Batch B is almost full, so open Batch C. WELCOME10 brought 38 sales and expires Friday.
                      </p>
                      <span className="inline-block mt-3.5 border border-[#3A3A44] rounded-[9px] px-3 py-1.5 text-[12px] font-semibold text-white cursor-pointer select-none">
                        Open Domie AI
                      </span>
                    </div>

                    {/* High-Resolution Domie Artwork (§7) */}
                    <div className="relative h-[170px] flex items-center justify-center">
                      {/* Separate radial glow element behind */}
                      <div
                        className="pointer-events-none absolute right-[10px] top-[15px] w-[140px] h-[140px] rounded-full blur-[24px]"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(139,108,255,0.45) 0%, rgba(139,108,255,0) 70%)",
                        }}
                        aria-hidden="true"
                      />

                      {/* Domie Animated Orb 160px (§2) */}
                      <div className="absolute right-[-4px] top-[5px] w-[160px] h-[160px] flex items-center justify-center">
                        <DomieOrb size={160} surface="dark" />
                      </div>

                      {/* 3 Twinkling Inline SVG 4-Point Stars */}
                      {!isReducedMotion && (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="#C9BCFF"
                            className="w-3.5 h-3.5 absolute animate-star-twinkle pointer-events-none select-none"
                            style={{ right: "140px", top: "15px" }}
                            aria-hidden="true"
                          >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="#C9BCFF"
                            className="w-3 h-3 absolute animate-star-twinkle pointer-events-none select-none"
                            style={{ right: "12px", top: "8px", animationDelay: "-0.8s" }}
                            aria-hidden="true"
                          >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="#C9BCFF"
                            className="w-2.5 h-2.5 absolute animate-star-twinkle pointer-events-none select-none"
                            style={{ right: "125px", bottom: "16px", animationDelay: "-1.6s" }}
                            aria-hidden="true"
                          >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDashboard;
