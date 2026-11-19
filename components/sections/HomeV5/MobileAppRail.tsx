"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronLeft, Clock, Lock, PlayCircle, ShieldCheck, Smartphone, Store, Trophy, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import { LmsDomainMark, BrandMark } from "@/components/brand/PartnerMarks";
import { DEMO_ACADEMY, NorthwindLogo, NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { HOME_MOBILE_APP, type HomeMobileAppContent } from "@/content/home/mobile-app";

/* Kept aside: sideways-scroll story (desktop) / swipe cards (phones). Not used on any page.

 * Mobile apps (homepage). Four slides, one phone each:
 * desktop: the section pins and scrolling down moves the slides sideways (with a progress bar).
 * mobile: swipe cards with scroll-snap and dots.
 * Steps 1-3 show the LMS Domain app (every plan); step 4 shows the academy's own app (Pro).
 * Sample academy = "Northwind Academy" (made up). Reduced motion: no auto-advance, no ambient motion.
 */

const INK = "#0A0A0B";
const TEAL = DEMO_ACADEMY.color;

/* Soft backdrop colour for each step */
const TINTS = [
  { glow: "#E9E3FF", ring: "#C9BDFF", dot: "#6C4BFF" },
  { glow: "#E2ECFF", ring: "#B7CCFF", dot: "#3B6EF5" },
  { glow: "#FFF1D6", ring: "#F7D59A", dot: "#D97706" },
  { glow: "#D9F2EE", ring: "#9ED9CF", dot: TEAL },
];

function useMedia(query: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setOn(m.matches);
    const fn = () => setOn(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
}

function useTicker(running: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setT((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  return t;
}

/* ---------- phone ---------- */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[248px] shrink-0 rounded-[44px] bg-[#0A0A0B] p-[7px] shadow-[0_40px_80px_-30px_rgba(20,20,60,0.45),0_0_0_1px_rgba(10,10,11,0.06),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]">
      <span className="absolute -left-[2px] top-[104px] h-8 w-[3px] rounded-l bg-[#2A2A30]" />
      <span className="absolute -right-[2px] top-[130px] h-12 w-[3px] rounded-r bg-[#2A2A30]" />
      <div className="relative h-[506px] overflow-hidden rounded-[37px] bg-white">
        <div className="absolute left-1/2 top-2 z-40 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-[#0A0A0B]" />
        <div className="relative z-30 flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold text-[#18181B]">
          <span>9:41</span>
          <span className="flex items-center gap-0.5">
            <span className="h-[7px] w-[3px] rounded-[1px] bg-[#18181B]" />
            <span className="h-[8px] w-[3px] rounded-[1px] bg-[#18181B]" />
            <span className="h-[9px] w-[3px] rounded-[1px] bg-[#18181B]" />
            <span className="ml-1 h-[9px] w-[17px] rounded-[3px] border border-[#18181B] p-[1px]">
              <span className="block h-full w-[70%] rounded-[1px] bg-[#18181B]" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* One screen inside the phone; only the active one is visible */
function Screen({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!on}
      className={cn(
        "absolute inset-x-0 bottom-0 top-[30px] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        on ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-[0.97] opacity-0"
      )}
    >
      {children}
    </div>
  );
}

function AppBar({ branded = false }: { branded?: boolean }) {
  return (
    <div className="flex h-[42px] items-center gap-2 px-4">
      {branded ? (
        <NorthwindLogo size={28} />
      ) : (
        <>
          <LmsDomainMark size={26} />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-semibold text-[#18181B]">{DEMO_ACADEMY.name}</p>
            <p className="text-[9.5px] text-[#9A9AA6]">in the LMS Domain app</p>
          </div>
        </>
      )}
    </div>
  );
}

function TabBar({ active, accent = INK }: { active: number; accent?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#F1F1F4] bg-white px-4 pb-3.5 pt-2">
      {["Home", "Courses", "Live", "Tests"].map((t, i) => (
        <span key={t} className={cn("text-[9px] font-semibold", i !== active && "text-[#A1A1AA]")} style={i === active ? { color: accent } : undefined}>
          {t}
        </span>
      ))}
    </div>
  );
}

/* 1. Protected lesson */
function LessonScreen() {
  return (
    <>
      <AppBar />
      <div className="relative mx-3 h-[160px] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#1E293B,#0F172A)]">
        <pre className="p-3 font-mono text-[9.5px] leading-[1.6] text-[#CBD5E1]">{"for i in range(5):\n    print(i * 2)\n\n# Lesson 3 · Loops"}</pre>
        <span className="ma-drift absolute left-3 top-[54px] -rotate-12 text-[9px] font-semibold text-white/30">mia.c@mail.com · ID 2041</span>
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-semibold text-white/80">
          <Lock className="h-2.5 w-2.5" /> DRM
        </span>
        <span className="absolute inset-x-3 bottom-2.5 h-1 overflow-hidden rounded-full bg-white/20">
          <span className="ma-progress block h-full w-[46%] rounded-full bg-white" />
        </span>
      </div>
      <p className="px-4 pb-1.5 pt-3.5 text-[11px] font-semibold text-[#18181B]">Python for Beginners</p>
      <div className="space-y-1.5 px-3">
        {["Variables", "Loops", "Functions", "Lists and loops", "Practice test"].map((t, i) => (
          <div key={t} className="flex items-center gap-2 rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
            {i < 1 ? (
              <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />
            ) : i === 1 ? (
              <PlayCircle className="h-3.5 w-3.5 text-[#6C4BFF]" />
            ) : (
              <span className="h-3.5 w-3.5 rounded-full border border-[#D4D4DB]" />
            )}
            <span className={cn("flex-1 text-[10.5px]", i === 1 ? "font-semibold text-[#18181B]" : "text-[#52525B]")}>{t}</span>
            {i === 1 && (
              <span className="flex h-[10px] items-end gap-[2px]" aria-hidden="true">
                {[0, 1, 2].map((b) => (
                  <span key={b} className="mo-eq w-[2px] rounded-full bg-[#6C4BFF]" style={{ height: 9, animationDelay: `${b * 0.15}s` }} />
                ))}
              </span>
            )}
          </div>
        ))}
      </div>
      <TabBar active={1} accent="#6C4BFF" />
    </>
  );
}

/* 2. Live class, with a WhatsApp reminder dropping in */
function LiveScreen({ tick, on }: { tick: number; on: boolean }) {
  const faces = ["author-1", "author-2", "author-3", "author-4"];
  const speaker = Math.floor(tick / 2) % faces.length;
  return (
    <>
      <AppBar />
      <div
        className={cn(
          "absolute inset-x-2.5 top-1 z-20 rounded-[16px] bg-white/95 p-2.5 shadow-[0_14px_30px_-12px_rgba(10,10,40,0.35)] ring-1 ring-black/5 backdrop-blur transition-all delay-300 duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          on ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0"
        )}
      >
        <div className="flex items-start gap-2">
          <BrandMark name="WhatsApp" size={26} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="flex justify-between text-[9.5px] font-semibold text-[#18181B]">WhatsApp <span className="font-normal text-[#A1A1AA]">now</span></p>
            <p className="text-[10.5px] font-semibold text-[#18181B]">Class starts in 10 minutes</p>
            <p className="text-[9.5px] text-[#71717A]">Business English · Tap to join</p>
          </div>
        </div>
      </div>
      <div className="mx-3 mt-1 rounded-[14px] bg-[#0F172A] p-2">
        <div className="flex items-center justify-between pb-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EF4444] px-2 py-0.5 text-[8.5px] font-bold text-white">
            <span className="mo-ping h-1.5 w-1.5 rounded-full bg-white" /> LIVE
          </span>
          <span className="text-[9px] text-white/70">Google Meet</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {faces.map((f, i) => (
            <div key={f} className={cn("relative h-[66px] overflow-hidden rounded-[8px] bg-[#1E293B]", i === speaker && "ma-speak")}>
              <Image src={`/assets/img/home/testimonials/${f}.jpg`} alt="" fill sizes="80px" className="object-cover opacity-90" />
            </div>
          ))}
        </div>
      </div>
      <p className="px-4 pt-3 text-[11.5px] font-semibold text-[#18181B]">Business English · Batch B</p>
      <p className="px-4 text-[9.5px] text-[#9A9AA6]">{21 + (Math.floor(tick / 3) % 3)} learners joined</p>
      <div className="px-3 pt-3">
        <span className="mo-glow flex items-center justify-center gap-1.5 rounded-full bg-[#3B6EF5] py-2 text-[11px] font-semibold text-white">
          <Video className="h-3.5 w-3.5" /> Join class
        </span>
      </div>
      <p className="px-4 pt-4 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Up next</p>
      <div className="mx-3 mt-1.5 flex items-center gap-2.5 rounded-[12px] bg-[#F8F8FA] px-2.5 py-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#E2ECFF] text-center text-[8px] font-bold leading-[1.05] text-[#3B6EF5]">THU<br />21</span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[10.5px] font-semibold text-[#18181B]">Grammar: past perfect</span>
          <span className="block text-[9.5px] text-[#9A9AA6]">7:00 PM · Microsoft Teams</span>
        </span>
      </div>
      <TabBar active={2} accent="#3B6EF5" />
    </>
  );
}

/* 3. Timed mock test */
function TestScreen({ tick }: { tick: number }) {
  const left = 18 * 60 + 42 - (tick % 600);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const picked = tick % 6 >= 2 ? 1 : -1;
  return (
    <>
      <AppBar />
      <div className="mx-3 flex items-center justify-between rounded-[12px] bg-[#F8F8FA] px-3 py-2">
        <span className="text-[10.5px] font-semibold text-[#18181B]">Mock test 4</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold tabular-nums text-[#B45309]">
          <Clock className="h-3 w-3" /> {mm}:{ss}
        </span>
      </div>
      <div className="mx-3 mt-2 h-1 overflow-hidden rounded-full bg-[#F1F1F4]">
        <div className="h-full rounded-full bg-[#D97706] transition-[width] duration-700" style={{ width: `${((7 + (tick % 6 >= 5 ? 1 : 0)) / 30) * 100}%` }} />
      </div>
      <p className="px-4 pt-3 text-[9.5px] text-[#9A9AA6]">Question 7 of 30</p>
      <p className="px-4 pt-1 text-[11.5px] font-semibold leading-snug text-[#18181B]">Which word completes the sentence: “She has lived here ___ 2019.”</p>
      <div className="space-y-1.5 px-3 pt-3">
        {["for", "since", "from", "by"].map((o, i) => {
          const sel = i === picked;
          return (
            <div
              key={o}
              className={cn(
                "flex items-center gap-2 rounded-[10px] border px-2.5 py-2 text-[10.5px] transition-all duration-300",
                sel ? "scale-[1.02] border-[#18181B] bg-[#18181B] font-semibold text-white" : "border-[#ECECEF] text-[#3F3F46]"
              )}
            >
              <span className={cn("grid h-4 w-4 place-items-center rounded-full text-[8.5px] font-bold", sel ? "bg-white/20" : "bg-[#F4F5F8] text-[#71717A]")}>{"ABCD"[i]}</span>
              {o}
              {sel && <Check className="ml-auto h-3 w-3" strokeWidth={3} />}
            </div>
          );
        })}
      </div>
      <TabBar active={3} accent="#D97706" />
    </>
  );
}

/* 4. The academy's own app in the store */
function StoreScreen({ on }: { on: boolean }) {
  return (
    <>
      <div className="flex h-[36px] items-center gap-1 px-3 text-[11px] font-medium text-[#0F766E]">
        <ChevronLeft className="h-4 w-4" /> Search
      </div>
      <div className="flex gap-3 px-4 pt-1">
        <span className={cn("block overflow-hidden rounded-[18px] shadow-[0_12px_24px_-12px_rgba(11,93,87,0.6)] transition-transform delay-200 duration-700", on ? "rotate-0 scale-100" : "-rotate-12 scale-75")}>
          <NorthwindMark size={72} />
        </span>
        <div className="min-w-0 pt-1 leading-tight">
          <p className="text-[13.5px] font-bold text-[#18181B]">{DEMO_ACADEMY.name}</p>
          <p className="mt-0.5 text-[10px] text-[#71717A]">Education</p>
          <span className="mt-2 inline-flex items-center rounded-full bg-[#0F766E] px-3.5 py-1 text-[10.5px] font-bold text-white">GET</span>
        </div>
      </div>
      <div className="mx-4 mt-4 flex justify-between border-y border-[#F1F1F4] py-2.5 text-center text-[9px] text-[#9A9AA6]">
        <span><b className="block text-[11px] text-[#18181B]">Android</b>Google Play</span>
        <span><b className="block text-[11px] text-[#18181B]">iOS</b>App Store</span>
        <span><b className="block text-[11px] text-[#18181B]">4+</b>Age</span>
      </div>
      <p className="px-4 pt-3 text-[10.5px] font-semibold text-[#18181B]">Preview</p>
      <div className="flex gap-2 overflow-hidden px-4 pt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn("h-[176px] w-[86px] shrink-0 rounded-[12px] bg-[linear-gradient(160deg,#14B8A6,#0B5D57)] p-2 transition-all duration-700", on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
            style={{ transitionDelay: `${350 + i * 120}ms` }}
          >
            <span className="block h-1.5 w-10 rounded-full bg-white/70" />
            <span className="mt-1.5 block h-1.5 w-7 rounded-full bg-white/40" />
            <span className="mt-3 block h-[62px] rounded-[8px] bg-white/20" />
            <span className="mt-2 block h-1.5 w-12 rounded-full bg-white/50" />
            <span className="mt-1.5 block h-1.5 w-9 rounded-full bg-white/30" />
            <span className="mt-3 block h-4 rounded-full bg-[#FBBF24]/90" />
          </div>
        ))}
      </div>
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-[12px] bg-[#ECF7F5] px-3 py-2.5">
        <NorthwindMark size={22} />
        <span className="text-[10px] leading-tight text-[#0B3B37]">Your name, logo and colours, published under your academy</span>
      </div>
    </>
  );
}

/* Small card beside the phone, one per slide */
const NOTES: { icon: (active: boolean) => React.ReactNode; t: string; d: React.ReactNode }[] = [
  { icon: () => <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#E8F7EF] text-[#15803D]"><ShieldCheck className="h-[18px] w-[18px]" /></span>, t: "Screen recording blocked", d: "DRM video · learner watermark" },
  { icon: () => <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#E2ECFF] text-[#3B6EF5]"><Video className="h-[18px] w-[18px]" /></span>, t: "Zoom, Meet or Teams", d: "Join from the app in one tap" },
  {
    icon: (active) => (
      <span className="relative grid h-11 w-11 place-items-center">
        <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F1F4" strokeWidth="3.2" />
          {active && <circle cx="18" cy="18" r="15.9" fill="none" stroke="#16A34A" strokeWidth="3.2" strokeLinecap="round" pathLength={100} strokeDasharray="86 100" className="ma-ring" />}
        </svg>
        <span className="text-[10.5px] font-bold text-[#18181B]">86%</span>
      </span>
    ),
    t: "Mock test 4 submitted",
    d: <span className="inline-flex items-center gap-1"><Trophy className="h-3 w-3 text-[#D97706]" /> Rank 4 of 120</span>,
  },
  { icon: () => <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#D9F2EE] text-[#0F766E]"><Store className="h-[18px] w-[18px]" /></span>, t: "Live on both stores", d: "Google Play and App Store" },
];

function Note({ i, active }: { i: number; active: boolean }) {
  const n = NOTES[i];
  return (
    <div
      className={cn(
        "flex w-[250px] items-center gap-2.5 rounded-[18px] bg-white p-3 shadow-[0_20px_44px_-22px_rgba(20,20,60,0.4)] ring-1 ring-black/[0.06] transition-all delay-200 duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      )}
    >
      {n.icon(active)}
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-[#18181B]">{n.t}</p>
        <p className="text-[11px] text-[#71717A]">{n.d}</p>
      </div>
    </div>
  );
}

/* One phone with its screen, on soft turning rings in the slide's colour */
function PhoneArt({ i, active, tick }: { i: number; active: boolean; tick: number }) {
  const tint = TINTS[i];
  const flip = i === 3 && active;
  return (
    <div className="relative flex items-center justify-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="absolute h-[400px] w-[400px] rounded-full blur-[50px]" style={{ background: tint.glow }} />
        <span className={cn("absolute h-[380px] w-[380px] rounded-full border border-dashed", active && "ma-spin")} style={{ borderColor: tint.ring }}>
          <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: tint.dot }} />
        </span>
        <span className={cn("absolute h-[500px] w-[500px] rounded-full border", active && "ma-spin-rev")} style={{ borderColor: `${tint.ring}80` }}>
          <span className="absolute -bottom-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full opacity-60" style={{ background: tint.dot }} />
        </span>
      </div>
      <div className="relative" aria-hidden="true">
        <div className="transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" style={{ transform: active ? `rotate(${[-2, 2, -1.5, 0][i]}deg)` : "rotate(0deg) scale(0.96)" }}>
          <Phone>
            <Screen on>
              {i === 0 && <LessonScreen />}
              {i === 1 && <LiveScreen tick={tick} on={active} />}
              {i === 2 && <TestScreen tick={tick} />}
              {i === 3 && <StoreScreen on={active} />}
            </Screen>
          </Phone>
        </div>
        {/* app icon: LMS Domain, flips to the academy's own icon on the last slide */}
        <span className="absolute -right-8 top-[46%] [perspective:500px]">
          <span className="relative block h-[60px] w-[60px] transition-transform delay-300 duration-700 [transform-style:preserve-3d]" style={{ transform: flip ? "rotateY(180deg)" : "rotateY(0deg)" }}>
            <span className="absolute inset-0 grid place-items-center rounded-[17px] bg-white shadow-[0_16px_34px_-14px_rgba(20,20,60,0.45)] ring-1 ring-black/[0.05] [backface-visibility:hidden]">
              <LmsDomainMark size={38} />
            </span>
            <span className="absolute inset-0 overflow-hidden rounded-[17px] shadow-[0_16px_34px_-14px_rgba(11,93,87,0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <NorthwindMark size={60} />
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

function PlanTag({ plan, brand }: { plan: string; brand: boolean }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold", brand ? "bg-[#D9F2EE] text-[#0B5D57]" : "bg-white text-[#3F3F46] ring-1 ring-black/[0.06]")}>
      {plan}
    </span>
  );
}

function Stores({ data }: { data: HomeMobileAppContent }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Image src="/assets/img/badges/google-play-badge.png" alt="Get it on Google Play" width={155} height={60} className="-mx-[6px] -my-[7px] h-[54px] w-auto" />
      <Image src="/assets/img/badges/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} className="h-[40px] w-auto" />
      <Link href={data.linkHref} className="group ml-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
        {data.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

const counter = (i: number, n: number) => `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
const slideBg = (i: number) => `linear-gradient(140deg, #FFFFFF 0%, ${TINTS[i].glow} 100%)`;

/* ---------- desktop: pinned, vertical scroll moves the slides sideways ---------- */
function DesktopRail({ steps, tick }: { steps: HomeMobileAppContent["steps"]; tick: number }) {
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = track.current;
      const r = row.current;
      if (!t || !r) return;
      const vh = window.innerHeight;
      const total = t.offsetHeight - vh;
      const prog = total > 0 ? Math.max(0, Math.min(1, -t.getBoundingClientRect().top / total)) : 0;
      const dist = Math.max(0, r.scrollWidth - window.innerWidth);
      setP(prog);
      setX(-prog * dist);
    };
    const on = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const n = steps.length;
  const active = Math.min(n - 1, Math.round(p * (n - 1)));

  const jump = (i: number) => {
    const t = track.current;
    if (!t) return;
    const total = t.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY + (total * i) / (n - 1), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={track} className="relative hidden lg:block" style={{ height: `${n * 85 + 15}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[72px]">
        <div
          ref={row}
          className="flex w-max gap-8 will-change-transform"
          style={{ transform: `translate3d(${x}px,0,0)`, paddingLeft: "max(40px, calc((100vw - 1120px) / 2))", paddingRight: "max(40px, calc((100vw - 1120px) / 2))" }}
        >
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <article
                key={s.key}
                className={cn(
                  "relative grid h-[min(600px,calc(100vh-170px))] w-[min(1000px,calc(100vw-200px))] shrink-0 grid-cols-[1fr_1.05fr] items-center overflow-hidden rounded-[40px] ring-1 ring-black/[0.05] transition-opacity duration-500",
                  on ? "opacity-100" : "opacity-55"
                )}
                style={{ background: slideBg(i) }}
              >
                <div className="pl-14 pr-4">
                  <p className="text-[14px] font-semibold tabular-nums" style={{ color: TINTS[i].dot }}>{counter(i, n)}</p>
                  <h3 className="mt-3 font-urbanist text-[clamp(28px,2.8vw,38px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B]">{s.title}</h3>
                  <p className="mt-4 max-w-[400px] text-[16.5px] leading-[1.6] text-[#52525B]">{s.text}</p>
                  <p className="mt-5"><PlanTag plan={s.plan} brand={s.key === "brand"} /></p>
                  <div className="mt-8"><Note i={i} active={on} /></div>
                </div>
                <div className="flex h-full origin-center scale-[0.92] items-center justify-center xl:scale-100">
                  <PhoneArt i={i} active={on} tick={tick} />
                </div>
              </article>
            );
          })}
        </div>

        {/* progress + step buttons */}
        <div className="mx-auto mt-6 flex w-full max-w-[1120px] items-center gap-6 px-10">
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => jump(i)}
                aria-label={s.title}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]",
                  i === active ? "text-white" : "bg-white text-[#52525B] ring-1 ring-[#E4E4E7] hover:text-[#0A0A0B]"
                )}
                style={i === active ? { background: TINTS[i].dot } : undefined}
              >
                {["Lessons", "Live", "Tests", "Your app"][i] ?? s.title}
              </button>
            ))}
          </div>
          <span aria-hidden="true" className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#ECECEF]">
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#6C4BFF,#3B6EF5,#D97706,#0F766E)]" style={{ clipPath: `inset(0 ${100 - Math.max(4, p * 100)}% 0 0 round 999px)` }} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- mobile: swipe cards with snap + dots ---------- */
function MobileCards({ steps, tick }: { steps: HomeMobileAppContent["steps"]; tick: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const card = el.firstElementChild as HTMLElement | null;
        if (!card) return;
        const w = card.offsetWidth + 12;
        setActive(Math.max(0, Math.min(steps.length - 1, Math.round(el.scrollLeft / w))));
        if (el.scrollLeft > 8) setSwiped(true);
      });
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => {
      el.removeEventListener("scroll", on);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  const go = (i: number) => {
    const el = scroller.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden">
      <div
        ref={scroller}
        role="region"
        aria-label="App features, swipe to see more"
        className="-mx-[clamp(16px,4vw,40px)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <article
              key={s.key}
              className="relative w-[86%] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-[32px] ring-1 ring-black/[0.05]"
              style={{ background: slideBg(i) }}
            >
              <div className="relative h-[470px] overflow-hidden">
                <div className="absolute left-1/2 top-6 origin-top -translate-x-1/2 scale-[0.84]">
                  <PhoneArt i={i} active={on} tick={tick} />
                </div>
              </div>
              <div className="px-5 pb-6">
                <p className="text-[13px] font-semibold tabular-nums" style={{ color: TINTS[i].dot }}>{counter(i, steps.length)}</p>
                <h3 className="mt-1.5 font-urbanist text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A0A0B]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B]">{s.text}</p>
                <p className="mt-3"><PlanTag plan={s.plan} brand={s.key === "brand"} /></p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === active ? "step" : undefined}
              className="grid h-6 place-items-center"
            >
              <span className={cn("block h-2 rounded-full transition-all duration-300", i === active ? "w-6" : "w-2 bg-[#D4D4DB]")} style={i === active ? { background: TINTS[i].dot } : undefined} />
            </button>
          ))}
        </div>
        <span className={cn("inline-flex items-center gap-1 text-[13px] font-medium text-[#71717A] transition-opacity duration-500", swiped ? "opacity-0" : "opacity-100")}>
          Swipe <ArrowRight className="ma-nudge h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

export function MobileAppRail({ data = HOME_MOBILE_APP, id = "mobile-app", stores = true }: { data?: HomeMobileAppContent; id?: string; stores?: boolean }) {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const tick = useTicker(visible && !reduce);

  // Run the little screen timers only while the section is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id={id} className="relative bg-white pt-[clamp(64px,8vw,112px)] pb-[clamp(48px,6vw,64px)]">
      <Container>
        <div className="rv-v4 grid items-end gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A] shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
              {data.eyebrow}
            </p>
            <h2 className="font-urbanist text-[clamp(32px,4.4vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]">
              {data.title}
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[16px] leading-[1.6] text-[#52525B] sm:text-[17px]">{data.subtitle}</p>
            {stores && (
              <div className="mt-5 hidden lg:block">
                <Stores data={data} />
              </div>
            )}
          </div>
        </div>
        <MobileCards steps={data.steps} tick={tick} />
        {stores && (
          <div className="mt-6 lg:hidden">
            <Stores data={data} />
          </div>
        )}
      </Container>
      <DesktopRail steps={data.steps} tick={tick} />
    </section>
  );
}
