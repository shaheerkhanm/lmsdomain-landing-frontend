"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useReducedMotion } from "motion/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { usePageVisibility } from "@/lib/pages-context";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import DomieOrb from "@/components/ai/DomieOrb";
import {
  Lock,
  Play,
  CheckCircle2,
  Award,
  CreditCard,
  Trophy,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { FEATURES_EASE, FEATURES_EASE_CSS, FEATURES_COLORS } from "./motion";

interface HeroAssemblyProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

export function HeroAssembly({
  eyebrow = "✦ FEATURES",
  title = "Everything You Need to Build, Manage, and Grow Your Online Academy",
  subtitle = "Bring courses, assessments, live learning, AI-powered tools, payments, and academy management together in one flexible learning platform.",
  ctaText = "Book a Demo",
  secondaryCtaText = "See pricing",
}: HeroAssemblyProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isPathVisible } = usePageVisibility();
  const prefersReduced = useReducedMotion();

  // Dynamic computation of features and categories
  const totalFeatures = FEATURE_CATEGORIES.reduce((acc, cat) => acc + cat.features.length, 0);
  const totalCategories = FEATURE_CATEGORIES.length;
  const metricLine = `${totalFeatures} features · ${totalCategories} categories · Domie AI built in`;

  // Refs for GSAP scroll-assembly
  const heroSectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frag1Ref = useRef<HTMLDivElement>(null);
  const frag2Ref = useRef<HTMLDivElement>(null);
  const frag3Ref = useRef<HTMLDivElement>(null);
  const frag4Ref = useRef<HTMLDivElement>(null);
  const frag5Ref = useRef<HTMLDivElement>(null);
  const frag6Ref = useRef<HTMLDivElement>(null);

  // Pointer Parallax (Desktop only, Motion useSpring)
  const springConfig = { damping: 25, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 16);
    mouseY.set(y * 16);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (prefersReduced || !heroSectionRef.current || !pinContainerRef.current) return;

    const fragments = [
      frag1Ref.current,
      frag2Ref.current,
      frag3Ref.current,
      frag4Ref.current,
      frag5Ref.current,
      frag6Ref.current,
    ].filter(Boolean);

    const mm = gsap.matchMedia();

    // Desktop ≥1024: Pinned scroll-assembly
    mm.add("(min-width: 1024px)", () => {
      // Set scattered start positions
      gsap.set(frag1Ref.current, { x: -80, y: -60, rotation: -6, opacity: 0.85 });
      gsap.set(frag2Ref.current, { x: 90, y: -70, rotation: 8, opacity: 0.85 });
      gsap.set(frag3Ref.current, { x: -110, y: 40, rotation: -7, opacity: 0.85 });
      gsap.set(frag4Ref.current, { x: 100, y: 50, rotation: 6, opacity: 0.85 });
      gsap.set(frag5Ref.current, { x: -70, y: 90, rotation: -5, opacity: 0.85 });
      gsap.set(frag6Ref.current, { x: 80, y: 80, rotation: 5, opacity: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top top+=70",
          end: "+=60%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
        },
      });

      tl.to(
        fragments,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.04,
        },
        0
      );

      return () => {
        tl.kill();
      };
    });

    // Mobile/Tablet <1024: Simple time-based entrance, no pin
    mm.add("(max-width: 1023px)", () => {
      gsap.set(fragments, { x: 0, y: 0, rotation: 0, opacity: 1 });
    });

    return () => mm.revert();
  }, [prefersReduced]);

  // Words for masked H1 entrance
  const titleWords = title.split(" ");

  return (
    <>
      <section
        ref={heroSectionRef}
        className="relative bg-white pt-[116px] sm:pt-[136px] lg:pt-[160px] pb-12 sm:pb-16 font-urbanist overflow-hidden text-center"
      >
        {/* Subtle dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#161616 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Soft Accent Glow behind Visual */}
        <div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[650px] h-[350px] bg-[#7B5CF5]/12 rounded-full blur-[110px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3F4F6] text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-4">
            <span>✦</span>
            <span>{eyebrow.replace(/^✦\s*/, "")}</span>
          </div>

          {/* Masked H1 Entrance: server rendered visible, masked word-rise after hydration */}
          <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-semibold leading-[1.08] tracking-[-0.025em] text-[#161616] max-w-4xl mx-auto mb-5">
            {titleWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0">
                <span
                  className="inline-block"
                  style={{
                    animation: isClient && !prefersReduced
                      ? `heroWordRise 0.65s ${FEATURES_EASE_CSS} ${idx * 0.05}s both`
                      : "none",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] sm:text-[19px] text-[#6B6F76] max-w-[680px] mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4">
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              {ctaText}
            </button>

            {isPathVisible("/pricing") && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#161616] hover:text-[#7B5CF5] transition-colors group cursor-pointer py-2"
              >
                <span>{secondaryCtaText}</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* Computed factual metric line */}
          <p className="text-xs sm:text-[13px] text-[#8F94A0] tracking-wide font-medium mb-12 lg:mb-16">
            {metricLine}
          </p>

          {/* Right/Below: Browser Frame Assembly Window */}
          <div
            ref={pinContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[1040px] mx-auto relative will-change-transform"
          >
            <motion.div
              style={{
                x: mouseX,
                y: mouseY,
              }}
              className="relative transition-transform duration-200 ease-out"
            >
              {/* Outer Browser Window Frame */}
              <div
                ref={frameRef}
                className="w-full rounded-[24px] sm:rounded-[32px] bg-white border border-[#E5E7EB] shadow-[0_20px_50px_-15px_rgba(22,22,22,0.08)] overflow-hidden"
              >
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#F0F1F3] bg-[#FAFAFA]">
                  {/* Window Controls */}
                  <div className="flex items-center gap-1.5 w-16">
                    <span className="size-2.5 rounded-full bg-[#FF5F56]/80" />
                    <span className="size-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <span className="size-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>

                  {/* Address Bar */}
                  <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-[11px] sm:text-xs text-[#6B6F76] font-mono shadow-2xs">
                    <Lock className="size-3 text-[#10B981]" />
                    <span className="text-[#161616] font-medium">academy.yourdomain.com</span>
                  </div>

                  <div className="w-16 flex justify-end text-[10px] text-[#8F94A0] font-medium">
                    <span>Live</span>
                  </div>
                </div>

                {/* Dashboard Canvas with 6 Assembling Fragments */}
                <div className="p-4 sm:p-7 lg:p-8 bg-[#FBFBFC] relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center">
                  {/* Internal Grid Layout of Assembled Dashboard */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative z-10">
                    {/* Fragment 1: Lesson list with playing video */}
                    <div
                      ref={frag1Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-2.5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5CF5]">
                          Course 1
                        </span>
                        <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                          Playing
                        </span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden bg-[#161616] aspect-video flex items-center justify-center group">
                        <div className="size-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                          <Play className="size-4 fill-white ml-0.5" />
                        </div>
                        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] text-white/90">
                          <span>04:12 / 12:40</span>
                          <span>1080p</span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#161616] truncate">
                        Lesson 03: Architecture & Core Principles
                      </p>
                    </div>

                    {/* Fragment 2: Quiz Card */}
                    <div
                      ref={frag2Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-3 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F94A0]">
                          Quiz 01
                        </span>
                        <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Passed (95%)
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#161616]">
                        Which mechanism securely verifies certificate authenticity?
                      </p>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="p-2 rounded-lg bg-[#F4F5F7] text-[#6B6F76]">
                          <span>Manual signature upload</span>
                        </div>
                      </div>
                    </div>

                    {/* Fragment 3: Certificate */}
                    <div
                      ref={frag3Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-2.5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                          Verifiable
                        </span>
                        <Award className="size-4 text-[#F59E0B]" />
                      </div>
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] text-center space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#B45309]">
                          Certificate of Completion
                        </div>
                        <p className="text-xs font-bold text-[#161616]">Awarded to Learner</p>
                        <p className="text-[10px] text-[#92400E]">Mastery in Cloud Systems</p>
                      </div>
                      <div className="text-[10px] text-[#8F94A0] text-center">
                        ID: LMS-2026-CERT-991
                      </div>
                    </div>

                    {/* Fragment 4: Domie AI Chat Bubble Pair */}
                    <div
                      ref={frag4Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-2.5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <DomieOrb size={20} variant="sm" />
                          <span className="text-xs font-bold text-[#161616]">Domie AI</span>
                        </div>
                        <span className="text-[9px] font-semibold text-[#7B5CF5] bg-[#7B5CF5]/10 px-1.5 py-0.5 rounded">
                          AI Tutor
                        </span>
                      </div>
                      <div className="space-y-2 text-[11px]">
                        <div className="p-2 rounded-xl rounded-tr-xs bg-[#F4F5F7] text-[#161616] text-right">
                          Can you summarize key topics in Module 2?
                        </div>
                        <div className="p-2.5 rounded-xl rounded-tl-xs bg-[#7B5CF5]/10 border border-[#7B5CF5]/20 text-[#161616] text-left">
                          <p className="leading-snug">
                            Module 2 covers asynchronous pipelines, database schema locks, and caching strategies.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fragment 5: Payment Received Chip */}
                    <div
                      ref={frag5Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-2.5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                          Sales & Billing
                        </span>
                        <CreditCard className="size-4 text-[#10B981]" />
                      </div>
                      <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#065F46]">Payment Received</p>
                          <p className="text-[10px] text-[#047857]">Course 1 · Premium Plan</p>
                        </div>
                        <span className="text-sm font-bold text-[#065F46]">$149.00</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#8F94A0]">
                        <span>Stripe / Razorpay / Paytm / DOKU</span>
                        <span>Instant Access</span>
                      </div>
                    </div>

                    {/* Fragment 6: Leaderboard Row */}
                    <div
                      ref={frag6Ref}
                      className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-left space-y-2.5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7CF8]">
                          Engagement
                        </span>
                        <Trophy className="size-4 text-[#8E7CF8]" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-[#8E7CF8] text-white flex items-center justify-center text-[10px] font-bold">
                            1
                          </span>
                          <span className="text-xs font-bold text-[#161616]">Learner</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#8E7CF8]">
                          1,250 XP
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#8F94A0]">
                        <span>Weekly Rank #1</span>
                        <span>Top 5% Academy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-[480px] p-0 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
          <EnquiryForm />
        </DialogContent>
      </Dialog>

      {/* Global CSS for masked word rise */}
      <style jsx global>{`
        @keyframes heroWordRise {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}</style>
    </>
  );
}

export default HeroAssembly;
