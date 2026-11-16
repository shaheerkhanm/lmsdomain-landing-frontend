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
  images: string[];
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
    images: [
      "/images/solutions/coaching-institutes-1.webp",
      "/images/solutions/coaching-institutes-2.webp",
      "/images/solutions/coaching-institutes-3.webp",
    ],
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
    images: [
      "/images/solutions/language-test-prep-1.webp",
      "/images/solutions/language-test-prep-2.webp",
      "/images/solutions/language-test-prep-3.webp",
    ],
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
    images: [
      "/images/solutions/solo-educators-1.webp",
      "/images/solutions/solo-educators-2.webp",
      "/images/solutions/solo-educators-3.webp",
    ],
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
    images: [
      "/images/solutions/training-companies-1.webp",
      "/images/solutions/training-companies-2.webp",
      "/images/solutions/training-companies-3.webp",
    ],
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
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasExpandedMap, setHasExpandedMap] = useState<Record<number, boolean>>({ 0: true });
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [mobilePhotoIdx, setMobilePhotoIdx] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion and viewport width
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track expanded panels to lazy-load photos 2 and 3 only when panel first expands (§3d)
  useEffect(() => {
    setHasExpandedMap((prev) => {
      if (prev[activeIdx]) return prev;
      return { ...prev, [activeIdx]: true };
    });
  }, [activeIdx]);

  // Track snapped mobile slide for lazy-load
  useEffect(() => {
    setHasExpandedMap((prev) => {
      if (prev[mobileSlide]) return prev;
      return { ...prev, [mobileSlide]: true };
    });
    setMobilePhotoIdx(0);
  }, [mobileSlide]);

  // IntersectionObserver to pause auto-advance when off-screen (§3c)
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

  // Desktop auto-switching: every 2.5s crossfade photo, advance to next panel after 3rd photo (7.5s cycle) (§3b)
  useEffect(() => {
    if (isReducedMotion || isHovered || !isInView || isMobile) {
      return;
    }

    const interval = setInterval(() => {
      setActivePhotoIdx((prevPhoto) => {
        if (prevPhoto < 2) {
          return prevPhoto + 1;
        } else {
          // 3rd photo finished -> advance to next panel, reset photo to 0
          setActiveIdx((prevIdx) => (prevIdx + 1) % SOLUTIONS.length);
          return 0;
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isReducedMotion, isHovered, isInView, isMobile, activeIdx]);

  // Mobile snapped card auto-cycling every 2.5s (§3d)
  useEffect(() => {
    if (isReducedMotion || !isInView || !isMobile) {
      return;
    }

    const interval = setInterval(() => {
      setMobilePhotoIdx((prev) => (prev + 1) % 3);
    }, 2500);

    return () => clearInterval(interval);
  }, [isReducedMotion, isInView, isMobile, mobileSlide]);

  const handleSelectPanel = (idx: number) => {
    if (idx !== activeIdx) {
      setActiveIdx(idx);
      setActivePhotoIdx(0);
    }
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

  // Mobile scroll observer for snapped card
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
        <div
          className="hidden md:flex gap-4 h-[520px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {SOLUTIONS.map((sol, idx) => {
            const isExpanded = activeIdx === idx;
            const hasExpandedEver = Boolean(hasExpandedMap[idx]);

            return (
              <div
                key={sol.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Solution: ${sol.title}`}
                onClick={() => handleSelectPanel(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative rounded-[20px] overflow-hidden cursor-pointer select-none isolate flex flex-col justify-between p-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isExpanded ? "flex-[3.2] shadow-lg" : "flex-1 shadow-sm"
                }`}
              >
                {/* Photo Stack (3 photos cross-fade on expanded, narrow shows photo 0 only) */}
                <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
                  {sol.images.map((imgSrc, photoIdx) => {
                    // Lazy-load photos 2 and 3 only after panel has been expanded (§3d)
                    if (photoIdx > 0 && !hasExpandedEver) return null;

                    const isCurrent = isExpanded
                      ? activePhotoIdx === photoIdx
                      : photoIdx === 0;

                    return (
                      <div
                        key={imgSrc}
                        className="absolute inset-0 transition-opacity duration-600 ease-in-out"
                        style={{
                          opacity: isCurrent ? 1 : 0,
                          zIndex: isCurrent ? 2 : 1,
                        }}
                      >
                        <Image
                          src={imgSrc}
                          alt={sol.title}
                          fill
                          sizes={isExpanded ? "(max-width: 1280px) 60vw, 50vw" : "15vw"}
                          loading={photoIdx === 0 ? "lazy" : "eager"}
                          className={`object-cover transition-transform duration-[2500ms] ease-out ${
                            isReducedMotion
                              ? "scale-100"
                              : isCurrent && isExpanded
                              ? "scale-100"
                              : "scale-[1.04]"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

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
                    /* Expanded Panel: Full Title, Description, Link, and Story Progress Bar */
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
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-white/80 transition-colors pt-1 group"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {/* 3-Segment Story Progress Bar (§3c) */}
                      {!isReducedMotion && (
                        <div
                          className="pt-3 flex items-center gap-1.5 w-full max-w-[180px]"
                          aria-label={`Photo ${activePhotoIdx + 1} of 3`}
                        >
                          {[0, 1, 2].map((segIdx) => {
                            const isPast = segIdx < activePhotoIdx;
                            const isCurrent = segIdx === activePhotoIdx;

                            return (
                              <div
                                key={segIdx}
                                className="h-[2.5px] flex-1 bg-white/30 rounded-full overflow-hidden relative"
                              >
                                {isPast ? (
                                  <div className="h-full w-full bg-white rounded-full" />
                                ) : isCurrent ? (
                                  <div
                                    key={`seg-${activeIdx}-${activePhotoIdx}`}
                                    className="h-full bg-white rounded-full transition-all duration-[2500ms] ease-linear w-full"
                                    style={{
                                      animation: `progressFill 2500ms linear forwards`,
                                      animationPlayState: isHovered ? "paused" : "running",
                                    }}
                                  />
                                ) : (
                                  <div className="h-full w-0 bg-white rounded-full" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Narrow Panel: Short Title */
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
            {SOLUTIONS.map((sol, solIdx) => {
              const isSnapped = mobileSlide === solIdx;
              const hasExpandedEver = Boolean(hasExpandedMap[solIdx]);

              return (
                <div
                  key={sol.id}
                  className="w-[85vw] max-w-[340px] shrink-0 snap-center rounded-[20px] overflow-hidden aspect-[3/4] relative p-5 flex flex-col justify-between text-white isolate shadow-sm"
                >
                  {/* Photo Background Stack */}
                  <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
                    {sol.images.map((imgSrc, photoIdx) => {
                      if (photoIdx > 0 && !hasExpandedEver) return null;
                      const isCurrent = isSnapped ? mobilePhotoIdx === photoIdx : photoIdx === 0;

                      return (
                        <div
                          key={imgSrc}
                          className="absolute inset-0 transition-opacity duration-600 ease-in-out"
                          style={{
                            opacity: isCurrent ? 1 : 0,
                            zIndex: isCurrent ? 2 : 1,
                          }}
                        >
                          <Image
                            src={imgSrc}
                            alt={sol.title}
                            fill
                            sizes="85vw"
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>

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

                    {/* Mobile Story Progress Bar on Snapped Card */}
                    {isSnapped && !isReducedMotion && (
                      <div className="pt-2 flex items-center gap-1.5 w-full max-w-[140px]" aria-hidden="true">
                        {[0, 1, 2].map((segIdx) => (
                          <div
                            key={segIdx}
                            className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden"
                          >
                            <div
                              className={`h-full bg-white rounded-full transition-all duration-300 ${
                                segIdx <= mobilePhotoIdx ? "w-full" : "w-0"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1 mt-4">
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
                className="p-2 flex items-center justify-center cursor-pointer min-w-[28px] min-h-[28px]"
              >
                <span
                  className={`h-2 rounded-full transition-all block ${
                    mobileSlide === idx ? "w-6 bg-[#151517]" : "w-2 bg-[#D0D0D8]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSolutionsSection;
