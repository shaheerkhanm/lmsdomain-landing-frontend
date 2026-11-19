"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import { HOME_MOBILE_APP, type HomeMobileAppContent } from "@/content/home/mobile-app";
import { CatalogueScreen, CertificateScreen, CourseScreen, MusicHomeScreen, Phone, ScheduleScreen } from "@/components/sections/mobile/AppScreens";

/*
 * Mobile apps (homepage). A fan of five phones: the biggest in the middle, smaller ones stepping down
 * to each side and running off the edges. Each phone is a different (made-up) academy's own app,
 * so the "your own branded app" point lands at a glance. Phones rise in one after another, then
 * drift apart a little as the page scrolls. Reduced motion: a still picture.
 * PhoneFan is the /platform/mobile-app hero. MobileAppFan (with its own heading) is kept aside, unused.
 */

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

/** 0 → 1 while the element travels from the bottom of the screen to the top */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [p, setP] = useState(0.5);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      setP(Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height))));
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
  }, [ref, enabled]);
  return p;
}

/* Fan positions: slot -2..2 (desktop px, before the small-screen scale) */
const SLOTS = [
  { pos: -2, x: 520, y: 70, s: 0.8, App: ScheduleScreen, dark: false },
  { pos: -1, x: 270, y: 34, s: 0.88, App: CertificateScreen, dark: false },
  { pos: 0, x: 0, y: 0, s: 1, App: CourseScreen, dark: false },
  { pos: 1, x: 270, y: 34, s: 0.88, App: MusicHomeScreen, dark: false },
  { pos: 2, x: 520, y: 70, s: 0.8, App: CatalogueScreen, dark: false },
];

/** The five-phone fan on its own (used by the homepage version below and the /platform/mobile-app hero). */
export function PhoneFan({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const small = useMedia("(max-width: 639px)");
  const p = useScrollProgress(stage, !reduce);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const spread = reduce ? 0 : (p - 0.5) * 2; // -1 … 1 as the fan passes
  const k = small ? 0.62 : 1; // phones scale down on small screens
  const live = shown || reduce;

  return (
    <div ref={stage} aria-hidden="true" className={cn("relative mx-auto h-[350px] max-w-[1440px] sm:h-[580px]", className)}>
      {SLOTS.map(({ pos, x: sx, y: sy, s: ss, App, dark }) => {
        const a = Math.abs(pos);
        const dir = Math.sign(pos);
        if (small && a === 2) return null;
        const x = dir * sx * k * (1 + spread * 0.05 * a);
        const y = (sy + (live ? 0 : 140 + a * 40)) * k - spread * a * 16;
        return (
          <div
            key={pos}
            className="absolute left-1/2 top-0"
            style={{
              zIndex: 10 - a,
              opacity: live ? 1 : 0,
              transform: `translate3d(calc(-50% + ${x}px), ${y}px, 0) scale(${ss * k})`,
              transformOrigin: "top center",
              transition: reduce ? "none" : `transform 1s cubic-bezier(0.22,1,0.36,1) ${shown ? a * 110 : 0}ms, opacity 0.7s ease ${a * 110}ms`,
            }}
          >
            <div className="transition-transform duration-500 hover:-translate-y-2">
              <Phone dark={dark}>
                <App />
              </Phone>
            </div>
          </div>
        );
      })}
      {/* soft floor shadow under the fan */}
      <span className="pointer-events-none absolute bottom-[2%] left-1/2 h-16 w-[86%] max-w-[1100px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(20,20,60,0.14),transparent)] blur-md" />
    </div>
  );
}

export function MobileAppFan({ data = HOME_MOBILE_APP }: { data?: HomeMobileAppContent }) {
  return (
    <section id="mobile-app" className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F5FF_40%,#F7F8FF_75%,#FFFFFF_100%)] pt-[clamp(64px,8vw,112px)]">
      <Container>
        <div className="rv-v4 mx-auto max-w-[760px] text-center">
          <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A] shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
            <Smartphone className="h-3.5 w-3.5" /> {data.eyebrow}
          </p>
          <h2 className="font-urbanist text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#0A0A0B] [text-wrap:balance]">{data.title}</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#52525B] sm:text-[17px]">{data.subtitle}</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {data.plans.map((pl, i) => (
              <span
                key={pl.title}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full py-1.5 pl-3.5 pr-1.5 text-[13.5px] font-semibold",
                  i === 0 ? "bg-[#0A0A0B] text-white" : "bg-white text-[#0A0A0B] ring-1 ring-[#E4E4E7]"
                )}
              >
                {pl.title}
                <span className={cn("rounded-full px-2 py-0.5 text-[11px]", i === 0 ? "bg-white/15 text-white/80" : "bg-[#D9F2EE] text-[#0B5D57]")}>{pl.plan}</span>
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Image src="/assets/img/badges/google-play-badge.png" alt="Get it on Google Play" width={155} height={60} className="-mx-[6px] -my-[7px] h-[54px] w-auto" />
            <Image src="/assets/img/badges/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} className="h-[40px] w-auto" />
          </div>
        </div>
      </Container>

      {/* Phone fan */}
      <PhoneFan className="mt-12 sm:mt-14" />

      <Container>
        <div className="relative z-30 mt-4 flex flex-col items-center gap-2 pb-[clamp(56px,7vw,96px)] text-center">
          <Link href={data.linkHref} className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
            {data.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="text-[12px] text-[#A1A1AA]">Sample academies shown</p>
        </div>
      </Container>
    </section>
  );
}
