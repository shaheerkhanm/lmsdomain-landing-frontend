"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  FileText,
  CreditCard,
  RotateCw,
  ExternalLink,
} from "lucide-react";

export function HeroDashboard() {
  const asmRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const [p, setP] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) {
      setP(1);
    }

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
      tickingRef.current = false;
      if (!asmRef.current) return;
      if (prefersReduced) {
        setP(1);
        return;
      }
      const r = asmRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      let rawP = (vh * 0.92 - r.top) / (vh * 0.62);
      rawP = Math.max(0, Math.min(1, rawP));
      const easedP = 1 - Math.pow(1 - rawP, 2);
      setP(Number(easedP.toFixed(3)));
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateScroll);
      }
    };

    updateScale();
    updateScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScale);

    const ro = new ResizeObserver(() => {
      updateScale();
      updateScroll();
    });
    if (asmRef.current) ro.observe(asmRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScale);
      ro.disconnect();
    };
  }, []);

  const effectiveP = isReducedMotion ? 1 : p;

  return (
    <div
      ref={asmRef}
      className="asm-container relative max-w-[1120px] mx-auto pb-8 sm:pb-12 overflow-hidden"
      style={{ "--p": effectiveP } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className="dev-wrapper relative w-full origin-top overflow-hidden"
        style={{
          transform: isReducedMotion ? "none" : `scale(${0.86 + 0.14 * effectiveP})`,
          height: height ? `${height}px` : "auto",
        }}
      >
        <div
          ref={contentRef}
          className="devscale-content origin-top-left"
          style={{
            width: "1100px",
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Black device bezel */}
          <div
            className="rounded-[30px] p-[14px] bg-[#0B0B0D] shadow-[0_60px_120px_-50px_rgba(20,10,60,0.55),inset_0_0_0_1px_#26262B]"
          >
            {/* Dark Admin Screen */}
            <div
              className="bg-[#121214] rounded-[18px] grid grid-cols-[64px_minmax(0,1fr)] h-[700px] overflow-hidden text-[#ECECF1] font-sans select-none"
            >
              {/* Left Rail */}
              <aside className="border-r border-[#232327] flex flex-col items-center gap-4 py-[18px]">
                {/* Domie Logo Tile */}
                <span className="w-[34px] h-[34px] rounded-[10px] bg-white grid place-items-center shadow-xs">
                  <Image
                    src="/images/ai/domie/domie-bot-sm.webp"
                    alt="Domie"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                    priority={false}
                  />
                </span>

                {/* Nav Icons */}
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
              <div className="p-[18px_22px] flex flex-col gap-3.5 min-w-0">
                {/* Top Bar (fades 20% -> 100% on scroll) */}
                <div
                  className="flex items-center gap-2.5 transition-opacity"
                  style={{ opacity: isReducedMotion ? 1 : 0.2 + 0.8 * effectiveP }}
                >
                  <h3 className="text-[24px] font-bold tracking-[-0.03em] mr-auto text-white">
                    Dashboard
                  </h3>
                  <span className="flex items-center gap-2 w-[240px] bg-[#1A1A1F] border border-[#2A2A30] rounded-[10px] px-3 py-2 text-[#A5A5B2] text-[12.5px]">
                    <Search className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Search courses, learners…</span>
                    <em className="ml-auto font-mono text-[10.5px] not-italic text-[#A5A5B2]">⌘K</em>
                  </span>
                  <span
                    className="bg-white text-[#151517] rounded-[10px] px-3.5 py-2 font-semibold text-[12.5px] flex items-center gap-1.5 shadow-xs select-none"
                  >
                    ✦ Ask Domie
                  </span>
                  <span
                    className="w-[34px] h-[34px] rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg, #F2894A, #E2539B)" }}
                  />
                </div>

                {/* 2×2 Card Grid */}
                <div className="grid grid-cols-2 gap-3.5 flex-1 min-h-0">
                  {/* Card 1: Today's live class */}
                  <div
                    className="hero-asm-card bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between"
                    style={
                      {
                        "--dx": "-90px",
                        "--dy": "-40px",
                        "--r": "-4deg",
                      } as React.CSSProperties
                    }
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

                    {/* Bottom Row */}
                    <div className="flex items-center gap-2.5 mt-3 pt-1">
                      <span className="bg-white text-[#151517] rounded-[9px] px-3.5 py-1.5 font-semibold text-[12px]">
                        Start class
                      </span>
                      <small className="text-[#A5A5B2] text-[11.5px]">
                        Reminder sent to 24 learners
                      </small>
                    </div>
                  </div>

                  {/* Card 2: Needs your attention */}
                  <div
                    className="hero-asm-card bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between"
                    style={
                      {
                        "--dx": "90px",
                        "--dy": "-60px",
                        "--r": "4deg",
                      } as React.CSSProperties
                    }
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5">
                        <div>
                          <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                            Needs your attention
                          </h4>
                          <div className="text-[#A5A5B2] text-[12px] mt-0.5">
                            Waiting on you right now
                          </div>
                        </div>
                        <span className="border border-[#33333B] rounded-[8px] px-2.5 py-1 text-[11.5px] text-[#D6D6DE]">
                          View all
                        </span>
                      </div>

                      {/* Row 1: Applications */}
                      <div className="flex items-center gap-2.5 mt-2.5 bg-[#141417] border border-[#26262C] rounded-[11px] px-3 py-2.5">
                        <span className="w-7 h-7 rounded-[8px] grid place-items-center text-white shrink-0 bg-[#F2894A]">
                          <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-medium text-white leading-tight">
                            Applications to review
                          </div>
                          <small className="block text-[#A5A5B2] text-[11px] mt-0.5">
                            Batch C · next month
                          </small>
                        </div>
                        <em className="ml-auto not-italic font-bold text-[12px] text-white bg-[#26262B] rounded-[7px] px-2 py-0.5">
                          2
                        </em>
                      </div>

                      {/* Row 2: Offline payments */}
                      <div className="flex items-center gap-2.5 mt-2 bg-[#141417] border border-[#26262C] rounded-[11px] px-3 py-2.5">
                        <span className="w-7 h-7 rounded-[8px] grid place-items-center text-white shrink-0 bg-[#17A06B]">
                          <CreditCard className="w-3.5 h-3.5" strokeWidth={2} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-medium text-white leading-tight">
                            Offline payments to approve
                          </div>
                          <small className="block text-[#A5A5B2] text-[11px] mt-0.5">
                            Bank transfer screenshots
                          </small>
                        </div>
                        <em className="ml-auto not-italic font-bold text-[12px] text-white bg-[#26262B] rounded-[7px] px-2 py-0.5">
                          2
                        </em>
                      </div>
                    </div>

                    {/* Radios */}
                    <div className="flex items-center gap-3.5 mt-3 text-[12px] text-[#B4B4C0]">
                      <span className="flex items-center gap-1.5 text-white font-medium">
                        <span className="w-3 h-3 rounded-full border-[4px] border-white inline-block" />
                        Approve
                      </span>
                      <span className="flex items-center gap-1.5 text-[#A5A5B2]">
                        <span className="w-3 h-3 rounded-full border-[1.5px] border-[#6C6C78] inline-block" />
                        Review later
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Revenue this month */}
                  <div
                    className="hero-asm-card bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative flex flex-col justify-between"
                    style={
                      {
                        "--dx": "-60px",
                        "--dy": "90px",
                        "--r": "-7deg",
                      } as React.CSSProperties
                    }
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5">
                        <div>
                          <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                            Revenue this month
                          </h4>
                          <div className="text-[#A5A5B2] text-[12px] mt-0.5">
                            Fees collected, all gateways
                          </div>
                        </div>
                        <span className="border border-[#33333B] rounded-[8px] px-2.5 py-1 text-[11.5px] text-[#D6D6DE]">
                          Reports
                        </span>
                      </div>

                      {/* Number + Delta pill */}
                      <div className="mt-2 text-[30px] font-bold tracking-[-0.03em] tabular-nums text-white flex items-baseline gap-2">
                        <span>₹4,86,200</span>
                        <em className="not-italic text-[12px] font-semibold text-[#5BE0A0] bg-[#3DD68C]/15 rounded-[6px] px-2 py-0.5">
                          ▲ 31.2%
                        </em>
                      </div>

                      {/* 4-segment bar */}
                      <div className="flex h-2 rounded-[9px] overflow-hidden gap-[3px] mt-2.5">
                        <i className="block rounded-[9px]" style={{ flex: 42, background: "#8B6CFF" }} />
                        <i className="block rounded-[9px]" style={{ flex: 26, background: "#7FD8C0" }} />
                        <i className="block rounded-[9px]" style={{ flex: 18, background: "#F2C76E" }} />
                        <i className="block rounded-[9px]" style={{ flex: 14, background: "#E2539B" }} />
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

                  {/* Card 4: Domie's brief for today */}
                  <div
                    className="hero-asm-card bg-[#1A1A1F] border border-[#2A2A31] rounded-[18px] p-5 relative grid grid-cols-[minmax(0,1fr)_150px] gap-2 items-center overflow-hidden"
                    style={
                      {
                        "--dx": "80px",
                        "--dy": "110px",
                        "--r": "7deg",
                      } as React.CSSProperties
                    }
                  >
                    <div>
                      <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                        ✦ Domie&apos;s brief for today
                      </h4>
                      <p className="text-[#B4B4C0] text-[12.5px] mt-2 max-w-[30ch] leading-relaxed">
                        Batch B is almost full, so open Batch C. WELCOME10 brought 38 sales and expires Friday.
                      </p>
                      <span className="inline-block mt-3.5 border border-[#3A3A44] rounded-[9px] px-3 py-1.5 text-[12px] font-semibold text-white">
                        Open Domie AI
                      </span>
                    </div>

                    {/* Art Illustration */}
                    <div className="relative h-[170px]">
                      {/* Radial glow */}
                      <span
                        className="absolute right-[10px] top-[20px] w-[130px] h-[130px] rounded-full blur-[14px]"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(164,139,255,0.55), transparent 70%)",
                        }}
                      />
                      {/* Avatar with bobbing */}
                      <Image
                        src="/images/ai/domie/domie-bot-sm.webp"
                        alt="Domie AI bot"
                        width={150}
                        height={150}
                        loading="lazy"
                        className={`absolute right-[-6px] top-[6px] w-[150px] h-[150px] rounded-full drop-shadow-[0_20px_30px_rgba(108,75,255,0.5)] ${
                          isReducedMotion ? "" : "animate-domie-bob"
                        }`}
                      />
                      {/* 3 Twinkling Sparkles */}
                      {!isReducedMotion && (
                        <>
                          <span
                            className="absolute text-[#C9BCFF] text-[14px] animate-domie-tw"
                            style={{ right: "150px", top: "20px" }}
                          >
                            ✦
                          </span>
                          <span
                            className="absolute text-[#C9BCFF] text-[14px] animate-domie-tw"
                            style={{ right: "6px", top: "4px", animationDelay: "-1s" }}
                          >
                            ✦
                          </span>
                          <span
                            className="absolute text-[#C9BCFF] text-[10px] animate-domie-tw"
                            style={{ right: "120px", top: "140px", animationDelay: "-1.8s" }}
                          >
                            ✦
                          </span>
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
