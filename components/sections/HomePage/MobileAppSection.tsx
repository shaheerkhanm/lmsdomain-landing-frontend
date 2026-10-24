"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Video, CheckCircle, TrendingUp, Download, Bell, MessageCircle, Award, Calendar, Smartphone, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { HomeMobileApp } from "@/types/content";

// ============================================================================
// Mobile app section (Home > Cms > "mobile app (new site)").
// Desktop: three phones fanned out as the section scrolls in, with a gentle
// parallax; the screens cross-fade through the screenshots. Mobile: a swipeable
// carousel with dots. Reduced motion: phones stay fanned, screens don't cycle.
// ============================================================================

// The admin's fixed icon set (lucide names)
const ICONS: Record<string, LucideIcon> = { BookOpen, Video, CheckCircle, TrendingUp, Download, Bell, MessageCircle, Award, Calendar, Smartphone };
const CYCLE_MS = 3200;
const SCREEN_RATIO = "1170 / 2532"; // screenshots are 9:19.5 portrait

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[13%/6%] bg-[#161616] p-[3.6%] shadow-[0_30px_60px_-20px_rgba(22,22,22,0.45)] ring-1 ring-black/10 ${className}`}>
      <div className="relative overflow-hidden rounded-[10.5%/4.9%] bg-[#0B0B0C]" style={{ aspectRatio: SCREEN_RATIO }}>
        {children}
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[1.6%] h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-black z-10" aria-hidden="true" />
      </div>
    </div>
  );
}

// All screenshots stacked; the active one is visible (cross-fade)
function Screens({ screenshots, active, sizes, label }: { screenshots: HomeMobileApp["screenshots"]; active: number; sizes: string; label?: boolean }) {
  return (
    <>
      {screenshots.map((s, i) => (
        <Image
          key={s.image + i}
          src={s.image}
          alt={label && i === active ? s.alt : ""}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          aria-hidden={label && i === active ? undefined : true}
        />
      ))}
    </>
  );
}

function StoreBadges({ appStoreUrl, playStoreUrl }: { appStoreUrl?: string; playStoreUrl?: string }) {
  if (!appStoreUrl && !playStoreUrl) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {appStoreUrl && (
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-[9px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B5CF5]">
          {/* Official Apple badge (developer.apple.com) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/badges/app-store-badge.svg" alt="Download on the App Store" width={132} height={44} className="h-11 w-auto" loading="lazy" decoding="async" />
        </a>
      )}
      {playStoreUrl && (
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-[9px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B5CF5]">
          {/* Official Google badge (play.google.com); its PNG includes clear space, so the
              visible badge is drawn at the same 44 px height as Apple's */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/badges/google-play-badge.png" alt="Get it on Google Play" width={169} height={65} className="h-[65.5px] w-auto -my-[10.7px] -mx-[10.7px]" loading="lazy" decoding="async" />
        </a>
      )}
    </div>
  );
}

export function MobileAppSection({ data }: { data: HomeMobileApp }) {
  const sectionRef = useRef<HTMLElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const count = data.screenshots.length;

  // Desktop: cycle the screens while the section is on screen (not with reduced motion)
  useEffect(() => {
    if (count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    const start = () => {
      if (timer || reduce.matches || !visible || document.hidden) return;
      timer = setInterval(() => setActive((a) => (a + 1) % count), CYCLE_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    if (fanRef.current) io.observe(fanRef.current);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  // Desktop: fan out on the way in, then a slow parallax drift
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const left = "[data-phone='left']";
        const right = "[data-phone='right']";
        const center = "[data-phone='center']";
        gsap.fromTo(
          [left, right],
          { xPercent: (i: number) => (i === 0 ? 38 : -38), rotate: 0, opacity: 0.6 },
          { xPercent: 0, rotate: (i: number) => (i === 0 ? -8 : 8), opacity: 1, ease: "power2.out", scrollTrigger: { trigger: fanRef.current, start: "top 85%", end: "top 35%", scrub: 0.6 } }
        );
        gsap.fromTo(left, { y: 50 }, { y: -10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(right, { y: 80 }, { y: 0, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(center, { y: 20 }, { y: -30, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [count]);

  // Mobile carousel: dot follows the slide nearest the centre
  const onCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const middle = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft + s.offsetWidth / 2 - middle) < Math.abs(slides[best].offsetLeft + slides[best].offsetWidth / 2 - middle)) best = i;
    });
    setSlide(best);
  }, []);
  const goTo = (i: number) => {
    const el = carouselRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
  };

  const at = (offset: number) => (active + offset + count) % count;
  const showSides = count >= 3;

  return (
    <section ref={sectionRef} id="mobile-app" aria-labelledby="mobile-app-title" className="bg-[#F3F4F6] lg:bg-white font-urbanist relative overflow-x-clip pt-0 pb-0 lg:py-28 mb-16 lg:mb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Text */}
        <div className="lg:col-span-6">
          {data.eyebrow && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
              <span aria-hidden="true">✦</span>
              <span className="uppercase tracking-widest text-[11px]">{data.eyebrow.replace(/^✦\s*/, "")}</span>
            </div>
          )}
          <h2 id="mobile-app-title" className="text-[32px] sm:text-5xl lg:text-[52px] font-semibold text-[#161616] tracking-tight leading-[1.1]">
            {data.title}
          </h2>
          {data.description && <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">{data.description}</p>}

          {data.highlights.length > 0 && (
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {data.highlights.map((h, i) => {
                const Icon = ICONS[h.icon] || Smartphone;
                return (
                  <li key={i} className="flex gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7B5CF5]" aria-hidden="true">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-[#161616]">{h.title}</span>
                      {h.text && <span className="mt-0.5 block text-sm text-slate-500 leading-relaxed">{h.text}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {(data.appStoreUrl || data.playStoreUrl || data.qrImage) && (
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <StoreBadges appStoreUrl={data.appStoreUrl} playStoreUrl={data.playStoreUrl} />
              {data.qrImage && (
                <div className="flex items-center gap-3">
                  <div className="relative size-[84px] rounded-xl bg-white p-1.5 ring-1 ring-slate-200">
                    <Image src={data.qrImage} alt="QR code to download the app" fill sizes="84px" className="object-contain p-1.5" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Phones */}
        {count > 0 && (
          <div className="lg:col-span-6">
            {/* Desktop: fanned phones */}
            <div ref={fanRef} className="relative hidden lg:flex h-[620px] items-center justify-center" aria-roledescription="slideshow" aria-label="App screens">
              {showSides && (
                <div data-phone="left" className="absolute left-[2%] top-[70px] w-[214px] -rotate-8 opacity-95">
                  <PhoneFrame>
                    <Screens screenshots={data.screenshots} active={at(-1)} sizes="214px" />
                  </PhoneFrame>
                </div>
              )}
              {count >= 2 && (
                <div data-phone="right" className="absolute right-[2%] top-[70px] w-[214px] rotate-8 opacity-95">
                  <PhoneFrame>
                    <Screens screenshots={data.screenshots} active={at(1)} sizes="214px" />
                  </PhoneFrame>
                </div>
              )}
              <div data-phone="center" className="relative z-10 w-[262px]">
                <PhoneFrame className="shadow-[0_40px_80px_-24px_rgba(22,22,22,0.55)]">
                  <Screens screenshots={data.screenshots} active={active} sizes="262px" label />
                </PhoneFrame>
              </div>
            </div>

            {/* Mobile and tablet: swipeable carousel with dots */}
            <div className="lg:hidden">
              <div
                ref={carouselRef}
                onScroll={onCarouselScroll}
                className="app-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-min(31vw,140px))] sm:px-[calc(50%-min(18vw,140px))] pb-6 pt-2"
                aria-roledescription="carousel"
                aria-label="App screens"
              >
                {data.screenshots.map((s, i) => (
                  <div key={s.image + i} className="w-[min(62vw,280px)] sm:w-[min(36vw,280px)] shrink-0 snap-center" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
                    <PhoneFrame>
                      <Image src={s.image} alt={s.alt} fill sizes="(min-width: 640px) min(36vw, 280px), min(62vw, 280px)" className="object-cover" />
                    </PhoneFrame>
                  </div>
                ))}
              </div>
              {count > 1 && (
                <div className="flex justify-center gap-2" role="group" aria-label="Choose a screen">
                  {data.screenshots.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show screen ${i + 1}`}
                      aria-current={i === slide ? "true" : undefined}
                      className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-6 bg-[#161616]" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MobileAppSection;
