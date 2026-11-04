"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import DomieOrb from "@/components/ai/DomieOrb";
import {
  CheckCircle2,
  Award,
  BookOpen,
  Video,
  ShoppingCart,
  Book,
  ShieldCheck,
  Palette,
  Sparkles,
  Lock,
} from "lucide-react";

export interface MiniSceneProps {
  size?: "sm" | "lg";
  isActive?: boolean;
}

/**
 * 1. Course Learning Scene:
 * Lesson list, checkmark ticks onto the next lesson, progress bar grows, certificate slides up.
 */
export function CourseLearningScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1100);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5CF5]">
          Curriculum
        </span>
        <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
          {step >= 2 ? "66% Complete" : "33% Complete"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7B5CF5] transition-all duration-700 ease-out rounded-full"
          style={{ width: step >= 2 ? "66%" : "33%" }}
        />
      </div>

      {/* Lessons List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#F9FAFB] border border-[#F0F1F3]">
          <span className="font-medium text-[#161616]">01. Platform Foundations</span>
          <CheckCircle2 className="size-3.5 text-[#10B981]" />
        </div>
        <div
          className={`flex items-center justify-between text-xs p-2 rounded-lg border transition-all duration-500 ${
            step >= 1
              ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]"
              : "bg-white border-[#E5E7EB] text-[#161616]"
          }`}
        >
          <span className="font-medium">02. Video Streaming & Watermark</span>
          {step >= 1 ? (
            <CheckCircle2 className="size-3.5 text-[#10B981]" />
          ) : (
            <span className="size-3.5 rounded-full border border-[#D1D5DB]" />
          )}
        </div>
      </div>

      {/* Certificate Slide-in */}
      {step >= 3 && (
        <div className="p-2 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B45309]">
            <Award className="size-3.5 text-[#F59E0B]" />
            <span>Certificate Unlocked</span>
          </div>
          <span className="text-[10px] text-[#D97706] font-semibold">Ready</span>
        </div>
      )}
    </div>
  );
}

/**
 * 2. Assessment Scene:
 * Quiz card, option gets selected, turns green, "Passed" chip pops.
 */
export function AssessmentScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setSelected((prev) => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F94A0]">
          Question 3 of 5
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
            selected
              ? "bg-[#10B981]/15 text-[#10B981] opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
        >
          ✓ Passed (100%)
        </span>
      </div>

      <p className="text-xs font-semibold text-[#161616]">
        Verify completion with in-video checkpoint quizzes?
      </p>

      <div className="space-y-1.5 text-[11px]">
        <div className="p-2 rounded-lg bg-[#F9FAFB] border border-[#F0F1F3] text-[#6B6F76] flex items-center justify-between">
          <span>Manual self-check</span>
          <span className="size-3 rounded-full border border-[#D1D5DB]" />
        </div>
        <div
          className={`p-2 rounded-lg border transition-all duration-500 flex items-center justify-between ${
            selected
              ? "bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-medium shadow-2xs"
              : "bg-[#F9FAFB] border-[#F0F1F3] text-[#6B6F76]"
          }`}
        >
          <span>Automated checkpoint with instant grading</span>
          <span
            className={`size-3 rounded-full flex items-center justify-center text-[9px] text-white ${
              selected ? "bg-[#10B981]" : "border border-[#D1D5DB]"
            }`}
          >
            {selected && "✓"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Learner Engagement Scene:
 * Three leaderboard rows swap order with a smooth layout animation.
 */
export function LearnerEngagementScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setSwapped((prev) => !prev);
    }, 2200);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  const items = swapped
    ? [
        { id: "learner-a", name: "Alex Chen", points: "1,420 XP", rank: 1, badge: "✦ MVP" },
        { id: "learner-b", name: "Sarah Miller", points: "1,250 XP", rank: 2 },
        { id: "learner-c", name: "David Kim", points: "980 XP", rank: 3 },
      ]
    : [
        { id: "learner-b", name: "Sarah Miller", points: "1,250 XP", rank: 1 },
        { id: "learner-a", name: "Alex Chen", points: "1,190 XP", rank: 2, badge: "✦ MVP" },
        { id: "learner-c", name: "David Kim", points: "980 XP", rank: 3 },
      ];

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7CF8]">
          Academy Leaderboard
        </span>
        <span className="text-[10px] font-semibold text-[#8E7CF8] bg-[#8E7CF8]/10 px-2 py-0.5 rounded-full">
          Live Sync
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((item) => (
          <motion.div
            layout={!prefersReduced}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            key={item.id}
            className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-[#F9FAFB] border border-[#F0F1F3] text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className={`size-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  item.rank === 1
                    ? "bg-[#7B5CF5] text-white"
                    : "bg-[#E5E7EB] text-[#6B6F76]"
                }`}
              >
                {item.rank}
              </span>
              <span className="font-semibold text-[#161616] text-[11px] truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {item.badge && (
                <span className="text-[9px] font-bold text-[#7B5CF5] bg-[#7B5CF5]/10 px-1 rounded">
                  {item.badge}
                </span>
              )}
              <span className="font-mono text-[10px] text-[#6B6F76]">{item.points}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. AI-Powered Tools Scene:
 * Domie chat, question types itself, three dots, answer appears line by line.
 */
export function AiToolsScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"typing" | "thinking" | "answered">("answered");

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const t1 = setTimeout(() => setPhase("thinking"), 1200);
    const t2 = setTimeout(() => setPhase("answered"), 2400);
    const t3 = setTimeout(() => setPhase("typing"), 4400);

    const interval = setInterval(() => {
      setPhase("typing");
      setTimeout(() => setPhase("thinking"), 1200);
      setTimeout(() => setPhase("answered"), 2400);
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <DomieOrb size={18} variant="sm" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5CF5]">
            Domie AI
          </span>
        </div>
        <span className="text-[9px] font-semibold text-[#7B5CF5] bg-[#7B5CF5]/10 px-1.5 py-0.5 rounded-full">
          Grounded In Courses
        </span>
      </div>

      <div className="space-y-2 text-[11px]">
        {/* User Bubble */}
        <div className="p-2 rounded-xl rounded-tr-xs bg-[#F4F5F7] text-[#161616] text-right font-medium">
          How do I enable auto certificates?
        </div>

        {/* Domie Response */}
        <div className="p-2.5 rounded-xl rounded-tl-xs bg-[#7B5CF5]/10 border border-[#7B5CF5]/20 text-[#161616] text-left">
          {phase === "thinking" ? (
            <div className="flex items-center gap-1 py-1">
              <span className="size-1.5 rounded-full bg-[#7B5CF5] animate-bounce" />
              <span className="size-1.5 rounded-full bg-[#7B5CF5] animate-bounce [animation-delay:0.2s]" />
              <span className="size-1.5 rounded-full bg-[#7B5CF5] animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <p className="leading-snug">
              Turn on <span className="font-semibold text-[#7B5CF5]">Auto-Issue</span> in Course
              Settings &gt; Certificates upon 100% completion.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Live and Cohort Scene:
 * 2x2 video-call grid, a "Live" dot pulses, one tile highlights as speaker.
 */
export function LiveCohortScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [activeSpeaker, setActiveSpeaker] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % 4);
    }, 1600);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
            Live Session
          </span>
        </div>
        <span className="text-[10px] text-[#6B6F76] font-mono">Zoom Integrated</span>
      </div>

      {/* 2x2 Video Grid */}
      <div className="grid grid-cols-2 gap-2">
        {["Instructor", "Learner A", "Learner B", "Learner C"].map((name, idx) => (
          <div
            key={name}
            className={`relative rounded-xl p-2 h-11 flex items-end justify-between transition-all duration-300 ${
              activeSpeaker === idx
                ? "bg-[#1E1F24] border-2 border-[#7B5CF5] shadow-xs text-white"
                : "bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            <span className="text-[9px] font-semibold truncate">{name}</span>
            {activeSpeaker === idx && (
              <span className="flex gap-0.5 items-end h-2.5">
                <span className="w-0.5 h-1.5 bg-[#7B5CF5] rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-[#7B5CF5] rounded-full animate-pulse [animation-delay:0.15s]" />
                <span className="w-0.5 h-2 bg-[#7B5CF5] rounded-full animate-pulse [animation-delay:0.3s]" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 6. Course Sales Scene:
 * Course card drops into a cart, cart badge counts 0 -> 1, then "Payment received".
 */
export function CourseSalesScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setInCart((prev) => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
          Checkout & Gateways
        </span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[10px] text-[#161616] font-semibold">
          <ShoppingCart className="size-3" />
          <span>Cart ({inCart ? "1" : "0"})</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#161616]">Python Mastery Bootcamp</p>
          <p className="text-[10px] text-[#6B6F76]">Instant Stripe / PayPal access</p>
        </div>
        <span className="text-xs font-bold text-[#161616]">$99</span>
      </div>

      <div
        className={`p-2 rounded-lg border transition-all duration-400 flex items-center justify-between text-xs ${
          inCart
            ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46] font-semibold"
            : "bg-white border-[#E5E7EB] text-[#6B6F76]"
        }`}
      >
        <span>{inCart ? "✓ Payment Received · Instant Enrollment" : "Add to Cart →"}</span>
        <span className="text-[10px] font-mono">{inCart ? "#TXN-8820" : "0% Platform Fee"}</span>
      </div>
    </div>
  );
}

/**
 * 7. Content Publishing Scene:
 * Ebook cover with page turning (CSS 3D rotateY).
 */
export function ContentPublishingScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [pageFlipped, setPageFlipped] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setPageFlipped((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6366F1]">
          Digital Products
        </span>
        <span className="text-[10px] font-semibold text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full">
          Ebook Reader
        </span>
      </div>

      {/* 3D Ebook Flip Card */}
      <div className="relative mx-auto w-36 h-20 [perspective:600px] flex items-center justify-center">
        {/* Back Content Page */}
        <div className="absolute inset-0 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] p-2 text-left space-y-1">
          <span className="text-[8px] font-bold text-[#7E22CE] uppercase">Chapter 1</span>
          <p className="text-[9px] text-[#581C87] font-medium leading-tight">
            Comprehensive guide to launching modern digital courses.
          </p>
        </div>

        {/* Flipping Front Cover */}
        <div
          className="absolute inset-0 rounded-lg bg-[#7B5CF5] text-white p-2 flex flex-col justify-between transition-transform duration-700 [transform-origin:left_center]"
          style={{
            transform: pageFlipped && !prefersReduced ? "rotateY(-130deg)" : "rotateY(0deg)",
          }}
        >
          <Book className="size-3.5 text-white/90" />
          <p className="text-[10px] font-bold leading-tight">Academy Handbook</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 8. Administration Scene:
 * Role toggles switching on one by one.
 */
export function AdministrationScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [toggleState, setToggleState] = useState([true, false, false]);

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setToggleState(([t0, t1, t2]) => {
        if (!t1) return [true, true, false];
        if (!t2) return [true, true, true];
        return [true, false, false];
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive]);

  const isLg = size === "lg";

  const permissions = [
    { label: "Admin: Full System Access", on: toggleState[0] },
    { label: "Instructor: Course & Grading", on: toggleState[1] },
    { label: "Finance: Payout Visibility", on: toggleState[2] },
  ];

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5563]">
          RBAC Permissions
        </span>
        <ShieldCheck className="size-3.5 text-[#4B5563]" />
      </div>

      <div className="space-y-1.5">
        {permissions.map((p) => (
          <div
            key={p.label}
            className="flex items-center justify-between p-1.5 px-2 rounded-lg bg-[#F9FAFB] border border-[#F0F1F3] text-[11px]"
          >
            <span className="font-medium text-[#161616] truncate">{p.label}</span>
            <div
              className={`w-7 h-4 rounded-full transition-colors p-0.5 flex items-center ${
                p.on ? "bg-[#7B5CF5] justify-end" : "bg-[#D1D5DB] justify-start"
              }`}
            >
              <div className="size-3 rounded-full bg-white shadow-2xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 9. Branding Scene:
 * Browser frame recolours through the 3 pill colours (#F3CF74, #8E7CF8, #A6E3D3), padlock + "academy.yourdomain.com".
 */
export function BrandingScene({ size = "sm", isActive = true }: MiniSceneProps) {
  const prefersReduced = useReducedMotion();
  const [colorIdx, setColorIdx] = useState(0);

  const colors = [
    { name: "Yellow", hex: "#F3CF74", bg: "#FEF9C3", border: "#FDE047" },
    { name: "Purple", hex: "#8E7CF8", bg: "#EDE9FE", border: "#DDD6FE" },
    { name: "Mint", hex: "#A6E3D3", bg: "#CCFBF1", border: "#99F6E4" },
  ];

  useEffect(() => {
    if (prefersReduced || !isActive) return;
    const interval = setInterval(() => {
      setColorIdx((prev) => (prev + 1) % colors.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [prefersReduced, isActive, colors.length]);

  const current = colors[colorIdx];
  const isLg = size === "lg";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white border border-[#E5E7EB] p-4 overflow-hidden shadow-2xs select-none ${
        isLg ? "max-w-[420px] p-6 space-y-4" : "h-[160px] flex flex-col justify-between"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F76]">
          White-Label Brand
        </span>
        <div className="flex items-center gap-1 text-[10px] text-[#161616] font-mono">
          <Lock className="size-2.5 text-[#10B981]" />
          <span>academy.yourdomain.com</span>
        </div>
      </div>

      {/* Mini Academy Hero preview with changing brand color */}
      <div
        className="p-3 rounded-xl border transition-colors duration-700 flex items-center justify-between"
        style={{ backgroundColor: current.bg, borderColor: current.border }}
      >
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-[#161616]">Your Academy</p>
          <p className="text-[10px] text-[#4B5563]">Custom SSL &amp; Colors</p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-[10px] font-bold text-[#161616] transition-colors duration-700 shadow-2xs"
          style={{ backgroundColor: current.hex }}
        >
          Enroll Now
        </div>
      </div>
    </div>
  );
}
