"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { ArrowRight, Sparkles, CheckCircle2, Clock, FileCheck } from "lucide-react";

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  chip: {
    label: string;
    icon: React.ReactNode;
  };
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: "coaching-institutes",
    title: "Coaching institutes",
    description:
      "Scheduled morning and evening batches, timed mock tests, and automated GST fee receipts on your own domain.",
    href: "/solutions/coaching-institutes",
    image: "/images/solutions/coaching-institutes.webp",
    chip: {
      label: "Batch B · Live at 7 PM",
      icon: <span className="w-2 h-2 rounded-full bg-[#12A27A] animate-pulse" />,
    },
  },
  {
    id: "language-test-prep",
    title: "Language & test-prep academies",
    description:
      "Timed practice mock tests from question banks, live speaking cohorts, and multi-currency tuition.",
    href: "/solutions/language-test-prep-academies",
    image: "/images/solutions/language-test-prep.webp",
    chip: {
      label: "Mock Test 4 · 42 submissions",
      icon: <FileCheck className="w-3.5 h-3.5 text-[#2F6BFF]" />,
    },
  },
  {
    id: "solo-educators",
    title: "Solo educators",
    description:
      "Recorded courses with drip release, live Zoom workshops, and 0% platform transaction fees.",
    href: "/solutions/solo-educators",
    image: "/images/solutions/solo-educators.webp",
    chip: {
      label: "Course published · 24 lessons",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#F2894A]" />,
    },
  },
  {
    id: "training-companies",
    title: "Training companies",
    description:
      "Cohort bootcamps, client batch invoicing, progress tracking, and branded PDF certificates.",
    href: "/solutions/training-companies",
    image: "/images/solutions/training-companies.webp",
    chip: {
      label: "Team progress 82% · 18 certified",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#12A27A]" />,
    },
  },
];

export function HomeSolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSlide, setMobileSlide] = useState(0);

  // Check viewport width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver to pause auto-advance when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 5s on desktop until user interacts
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || userInteracted || !isInView || isMobile) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SOLUTIONS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [userInteracted, isInView, isMobile]);

  const handleSelectPanel = (idx: number) => {
    setUserInteracted(true);
    setActiveIdx(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectPanel(idx);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleSelectPanel((idx + 1) % SOLUTIONS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleSelectPanel((idx - 1 + SOLUTIONS.length) % SOLUTIONS.length);
    }
  };

  // Mobile scroll observer for dots
  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.offsetWidth * 0.85;
    const current = Math.round(scrollLeft / width);
    setMobileSlide(Math.max(0, Math.min(SOLUTIONS.length - 1, current)));
  };

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(72px,9vw,128px)] pt-0 font-sans"
      id="solutions"
    >
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="rv-v4 mb-10">
          <Eyebrow dotColor="#151517">Solutions</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Made for the way you teach
          </h2>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP: TRENDING EXPANDING PANELS (Height ~520px at 1440) */}
        {/* ========================================================= */}
        <div className="hidden md:flex gap-4 h-[520px] w-full">
          {SOLUTIONS.map((sol, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <div
                key={sol.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Solution: ${sol.title}`}
                onClick={() => handleSelectPanel(idx)}
                onMouseEnter={() => handleSelectPanel(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative rounded-[20px] overflow-hidden cursor-pointer select-none isolate flex flex-col justify-between p-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isExpanded ? "flex-[3.2] shadow-lg" : "flex-1 shadow-sm"
                }`}
              >
                {/* Photo Background */}
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  sizes={isExpanded ? "(max-width: 1280px) 60vw, 50vw" : "15vw"}
                  loading="lazy"
                  className={`object-cover -z-20 transition-transform duration-700 ease-out ${
                    isExpanded ? "scale-100" : "scale-105 filter brightness-90"
                  }`}
                />

                {/* Dark Vignette / Gradient Overlay */}
                <div
                  className={`absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none ${
                    isExpanded
                      ? "bg-gradient-to-t from-black/85 via-black/35 to-black/20"
                      : "bg-gradient-to-t from-black/80 via-black/45 to-black/30"
                  }`}
                  aria-hidden="true"
                />

                {/* Top Row: Floating Audience UI Chip (shows only on expanded panel) */}
                <div className="w-full flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#151517] px-3 py-1.5 rounded-full text-[12px] font-semibold shadow-xs transition-all duration-300 ${
                      isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {sol.chip.icon}
                    <span>{sol.chip.label}</span>
                  </div>

                  {/* Panel Indicator Number on Narrow Panels */}
                  {!isExpanded && (
                    <span className="text-white/60 font-mono text-[12px] font-semibold tracking-wider">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="w-full text-white">
                  {isExpanded ? (
                    /* Expanded Panel: Full Title, Description, and Link */
                    <div className="animate-fade-in space-y-3">
                      <b className="block text-[24px] lg:text-[28px] font-bold tracking-tight leading-tight">
                        {sol.title}
                      </b>
                      <p className="text-[14px] lg:text-[15px] text-white/90 leading-relaxed max-w-[46ch]">
                        {sol.description}
                      </p>
                      <Link
                        href={sol.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-white/80 transition-colors pt-2 group"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  ) : (
                    /* Narrow Panel: Short / Vertical Title */
                    <div className="py-2">
                      <b className="block text-[16px] font-bold tracking-tight text-white/95 truncate">
                        {sol.title}
                      </b>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE: HORIZONTAL SCROLL-SNAP CAROUSEL (85% Width, 16px Peek) */}
        {/* ========================================================= */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 -mx-[clamp(20px,4vw,48px)] px-[clamp(20px,4vw,48px)]"
          >
            {SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                className="w-[85vw] max-w-[340px] shrink-0 snap-center rounded-[20px] overflow-hidden aspect-[3/4] relative p-5 flex flex-col justify-between text-white isolate shadow-sm"
              >
                {/* Photo Background */}
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  sizes="85vw"
                  loading="lazy"
                  className="object-cover -z-20"
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 -z-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Audience Chip */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#151517] px-3 py-1.5 rounded-full text-[11.5px] font-semibold shadow-xs">
                    {sol.chip.icon}
                    <span>{sol.chip.label}</span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-2">
                  <b className="block text-[20px] font-bold tracking-tight leading-tight">
                    {sol.title}
                  </b>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    {sol.description}
                  </p>
                  <Link
                    href={sol.href}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white pt-1"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {SOLUTIONS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Jump to slide ${idx + 1}`}
                onClick={() => {
                  if (carouselRef.current) {
                    const width = carouselRef.current.offsetWidth * 0.85;
                    carouselRef.current.scrollTo({ left: idx * width, behavior: "smooth" });
                  }
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  mobileSlide === idx ? "w-6 bg-[#151517]" : "w-2 bg-[#D0D0D8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSolutionsSection;
