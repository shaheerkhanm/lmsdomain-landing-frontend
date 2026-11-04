"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import DomieOrb from "@/components/ai/DomieOrb";
import {
  Sparkles,
  ArrowRight,
  Bot,
  TrendingUp,
  Command,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
} from "lucide-react";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";

interface AiDarkChapterProps {
  heading?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
}

export function AiDarkChapter({
  heading = {
    eyebrow: "✦ DOMIE AI",
    title: "AI Grounded in Your Courses, Built for Your Entire Academy",
    subtitle:
      "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.",
  },
}: AiDarkChapterProps) {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [tutorChars, setTutorChars] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const darkCardRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);

  // Extract the 4 AI features from the catalog so titles and descriptions match exactly
  const aiCategory = FEATURE_CATEGORIES.find((c) => c.slug === "ai-powered-tools");
  const aiFeatures = aiCategory?.features || [
    {
      slug: "helpdesk-ai-tutor",
      title: "HelpDesk AI Tutor",
      description: "Give learners course-grounded AI answers 24/7 without instructor workload.",
    },
    {
      slug: "domie-ai-content-generator",
      title: "Domie AI Content Generator",
      description: "Draft comprehensive course descriptions, outlines, and questions in seconds.",
    },
    {
      slug: "ai-prescriptive-analytics",
      title: "AI Prescriptive Analytics",
      description: "Spot engagement drop-offs and struggling learners before they churn.",
    },
    {
      slug: "ai-command-bar",
      title: "AI Command Bar",
      description: "Navigate courses, settings, and learner queries from one unified search bar.",
    },
  ];

  const tools = [
    {
      ...aiFeatures[0],
      audience: "For Learners",
      badge: "24/7 Tutor",
      icon: Bot,
    },
    {
      ...aiFeatures[1],
      audience: "For Creators",
      badge: "Content Generator",
      icon: Sparkles,
    },
    {
      ...aiFeatures[2],
      audience: "For Administrators",
      badge: "Academy Health",
      icon: TrendingUp,
    },
    {
      ...aiFeatures[3],
      audience: "For Everyone",
      badge: "Global Navigation",
      icon: Command,
    },
  ];

  const fullTutorResponse =
    "A quiz is automatically graded with instant feedback. An assignment requires instructor review, rubric grading, and manual file submission.";

  useEffect(() => {
    if (activeStep === 0) {
      let i = 0;
      const interval = setInterval(() => {
        i += 4;
        setTutorChars(Math.min(i, fullTutorResponse.length));
        if (i >= fullTutorResponse.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    } else {
      setTutorChars(fullTutorResponse.length);
    }
  }, [activeStep]);

  // GSAP ScrollTrigger Pinned Scrollytelling
  useEffect(() => {
    if (prefersReduced || !containerRef.current || !pinSectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop ≥1024: Pin and scrub through the 4 tools
    mm.add("(min-width: 1024px)", () => {
      // Inset expansion transition into dark full-bleed
      if (darkCardRef.current) {
        gsap.fromTo(
          darkCardRef.current,
          { borderRadius: "40px", margin: "0 24px" },
          {
            borderRadius: "0px",
            margin: "0 0px",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom-=100",
              end: "top top",
              scrub: 0.5,
            },
          }
        );
      }

      const trigger = ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top top+=60",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          let step: 0 | 1 | 2 | 3 = 0;
          if (p >= 0.75) step = 3;
          else if (p >= 0.5) step = 2;
          else if (p >= 0.25) step = 1;
          else step = 0;
          setActiveStep(step);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReduced]);

  const handleStepClick = (idx: 0 | 1 | 2 | 3) => {
    setActiveStep(idx);
    if (!prefersReduced && pinSectionRef.current && window.innerWidth >= 1024) {
      const pinTrigger = ScrollTrigger.getById("ai-pin");
      // Fallback smooth scroll or state jump
    }
  };

  return (
    <section
      ref={containerRef}
      id="category-ai-powered-tools"
      className="bg-white py-4 sm:py-6 font-urbanist relative overflow-visible"
    >
      {/* Expanding / Shrinking Full-Bleed Dark Container */}
      <div
        ref={darkCardRef}
        className="w-full bg-[#161616] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden transition-all duration-300"
      >
        {/* Subtle white dot pattern on dark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Soft Accent Glow */}
        <div
          className="absolute right-0 top-1/3 w-[550px] h-[550px] bg-[#7B5CF5]/15 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto relative z-10">
          {/* Chapter Header with Domie Bot */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#A78BFA] text-xs font-semibold uppercase tracking-[0.08em] border border-white/15 mb-4">
                <span>✦</span>
                <span>{heading.eyebrow ? heading.eyebrow.replace(/^✦\s*/, "") : "DOMIE AI"}</span>
                <span className="text-white/40">|</span>
                <span className="text-white font-bold">Premium Core</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white tracking-tight leading-[1.12] mb-4">
                {heading.title}
              </h2>

              <p className="text-base sm:text-lg text-[#C9CCD1] leading-relaxed">
                {heading.subtitle}
              </p>
            </div>

            {/* Domie Bot Graphic */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative inline-flex items-center justify-center">
                <DomieOrb size={150} variant="lg" className="hidden sm:inline-flex" />
                <DomieOrb size={110} variant="lg" className="sm:hidden inline-flex" />
              </div>
              <span className="text-[11px] font-medium text-[#A78BFA] tracking-wide mt-2">
                Domie, the LMS Domain AI assistant
              </span>
            </div>
          </div>

          {/* Desktop Pinned Interactive Showcase (≥1024px) */}
          <div ref={pinSectionRef} className="hidden lg:grid grid-cols-12 gap-10 items-center">
            {/* Left Column: 4 Tools List with Progress Indicator */}
            <div className="col-span-5 space-y-3">
              {tools.map((t, idx) => {
                const isActive = activeStep === idx;
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => handleStepClick(idx as 0 | 1 | 2 | 3)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isActive
                        ? "bg-white/10 border-[#7B5CF5] shadow-lg shadow-[#7B5CF5]/10"
                        : "bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:bg-white/8"
                    }`}
                  >
                    {/* Active Step Progress Line */}
                    {isActive && (
                      <div className="absolute left-0 inset-y-0 w-1 bg-[#7B5CF5]" />
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <IconComponent className="size-4 text-[#A78BFA]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78BFA]">
                          {t.audience}
                        </span>
                      </div>
                      <span className="text-[9px] font-semibold text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                        {t.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>
                    <p className="text-xs text-[#C9CCD1] leading-relaxed line-clamp-2">
                      {t.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Morphing Studio Window */}
            <div className="col-span-7">
              <div className="rounded-[32px] bg-[#1E1F24] border border-white/15 p-6 lg:p-7 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
                {/* Window Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-xl bg-[#7B5CF5] text-white flex items-center justify-center font-bold text-xs shadow-md">
                      AI
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block leading-tight">
                        LMS Domain AI Studio
                      </span>
                      <span className="text-[10px] text-[#A78BFA] font-mono">
                        {tools[activeStep].title}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#7B5CF5]/20 text-[#C9CCD1] text-[10px] font-semibold border border-[#7B5CF5]/30">
                    Step {activeStep + 1} of 4
                  </span>
                </div>

                {/* 4 Interactive Scenes */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Scene 0: HelpDesk AI Tutor */}
                  {activeStep === 0 && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-white/10 border border-white/10 px-4 py-3 text-xs text-white">
                          <p className="font-medium">
                            What&apos;s the difference between a quiz and an assignment?
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <DomieOrb size={32} variant="sm" />
                        <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-white/5 border border-white/10 p-4 text-xs text-[#C9CCD1] space-y-2">
                          <p className="leading-relaxed">
                            {fullTutorResponse.slice(0, tutorChars)}
                            {tutorChars < fullTutorResponse.length && (
                              <span className="inline-block w-1.5 h-3 bg-[#7B5CF5] ml-1 animate-pulse align-middle" />
                            )}
                          </p>
                          <div className="pt-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7B5CF5]/20 border border-[#7B5CF5]/30 text-[#A78BFA] text-[10px] font-semibold">
                              <span>✦</span>
                              From your course: Module 2 (Assessment Guidelines)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene 1: Content Generator */}
                  {activeStep === 1 && (
                    <div className="space-y-3.5 animate-in fade-in duration-300">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          Drafted Course Title
                        </span>
                        <p className="text-sm font-bold text-white">Python Basics for Beginners</p>
                        <p className="text-[11px] text-[#C9CCD1]">
                          Build programming fundamentals, write real scripts, and automate daily tasks with Python.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          3 Learning Outcomes
                        </span>
                        <ul className="text-[11px] text-[#C9CCD1] space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Write and execute clean Python syntax and functions</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Manipulate data structures, files, and external APIs</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Construct practical automation scripts from scratch</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#C9CCD1]">Draft ready in 1.4s</span>
                        <button
                          type="button"
                          className="px-3 py-1 rounded-lg bg-[#7B5CF5] hover:bg-[#6D4EE3] text-white text-xs font-semibold transition-colors"
                        >
                          Insert into Course →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Scene 2: Prescriptive Analytics */}
                  {activeStep === 2 && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider">
                            Alert 1 · Grade Queue
                          </span>
                          <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                            Action Required
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white">
                          3 assignments require grading (48+ hours pending)
                        </p>
                        <p className="text-[11px] text-[#C9CCD1]">
                          In Advanced JavaScript. Student satisfaction decreases after 72 hours.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider">
                            Alert 2 · Retention Warning
                          </span>
                          <span className="text-[9px] font-semibold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                            Retention Risk
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white">
                          5 learners inactive for 7+ days
                        </p>
                        <p className="text-[11px] text-[#C9CCD1]">
                          Enrolled in React Fundamentals. Automated re-engagement email recommended.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-[#C9CCD1]">
                        <span>Continuous Academy Monitoring</span>
                        <span className="text-amber-400 font-medium">3 Suggested Actions</span>
                      </div>
                    </div>
                  )}

                  {/* Scene 3: AI Command Bar */}
                  {activeStep === 3 && (
                    <div className="space-y-3.5 animate-in fade-in duration-300">
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white">
                        <Search className="size-3.5 text-[#A78BFA]" />
                        <span className="font-medium text-white truncate text-xs">
                          How do I configure custom certificates?
                        </span>
                        <span className="ml-auto text-[9px] font-mono text-[#C9CCD1] bg-white/10 px-1.5 py-0.5 rounded">
                          ⌘K
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors">
                          <div className="flex items-center gap-2 text-white">
                            <span>⚙️</span>
                            <span>Settings / Custom Domain &amp; SSL</span>
                          </div>
                          <span className="text-[9px] font-mono text-[#A78BFA] bg-purple-500/20 px-1.5 py-0.5 rounded">
                            Admin page
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors">
                          <div className="flex items-center gap-2 text-white">
                            <span>📚</span>
                            <span>Python Basics for Beginners</span>
                          </div>
                          <span className="text-[9px] font-mono text-[#A78BFA] bg-purple-500/20 px-1.5 py-0.5 rounded">
                            Course
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors">
                          <div className="flex items-center gap-2 text-white">
                            <span>💬</span>
                            <span>How do I schedule recurring live classes with Zoom?</span>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                            Platform Question
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stacked Cards (<1024px) */}
          <div className="grid grid-cols-1 gap-6 lg:hidden">
            {tools.map((t, idx) => {
              const IconComponent = t.icon;
              return (
                <div
                  key={t.slug}
                  className="p-6 rounded-3xl bg-[#1E1F24] border border-white/15 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="size-4 text-[#A78BFA]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78BFA]">
                        {t.audience}
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{t.title}</h3>
                  <p className="text-xs text-[#C9CCD1] leading-relaxed">{t.description}</p>

                  {/* Mobile mini preview */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    {idx === 0 && (
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-white/10 text-white text-right">
                          Can you summarize Module 2?
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#7B5CF5]/20 text-[#E9D5FF] text-left">
                          Domie references course transcripts and slides directly.
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-[#A78BFA] uppercase">
                          AI Curriculum Outliner
                        </span>
                        <p className="text-white font-medium">Generate 10 structured lessons &amp; quizzes.</p>
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-amber-400 uppercase">
                          Retention Risk Alert
                        </span>
                        <p className="text-white font-medium">5 inactive students flagged with re-engagement action.</p>
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="flex items-center justify-between text-[#C9CCD1]">
                        <span>Search or run actions...</span>
                        <span className="font-mono text-[9px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Link: Explore Domie AI */}
          <div className="mt-14 sm:mt-18 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Want to see the complete Domie AI architecture?
              </p>
              <p className="text-xs text-[#C9CCD1]">
                Learn how course-grounding safeguards your content and prevents hallucination.
              </p>
            </div>

            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Explore Domie AI</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiDarkChapter;
