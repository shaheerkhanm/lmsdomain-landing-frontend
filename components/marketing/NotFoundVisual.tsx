"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, Sparkles, BookOpen } from "lucide-react";

export function NotFoundVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-hidden select-none"
    >
      {/* Background Soft Purple Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#EEE9FF]/50 blur-[100px] -z-10" />

      {/* Floating Card Left */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [-8, 8, -8],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                transform: "translate3d(-180px, -40px, 0) rotate(-8deg)",
              }
        }
        className="hidden sm:block absolute w-[300px] p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200/60 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.06)] opacity-40 text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#7B5CF5] font-semibold text-[10px]">
            <BookOpen className="size-3" />
            Curriculum
          </span>
          <span className="text-[10px] text-slate-400">Lesson 02</span>
        </div>
        <div className="h-3 w-3/4 bg-slate-200 rounded-full mb-2" />
        <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
      </motion.div>

      {/* Floating Card Right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [8, -8, 8],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                transform: "translate3d(180px, 30px, 0) rotate(7deg)",
              }
        }
        className="hidden sm:block absolute w-[280px] p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200/60 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.06)] opacity-40 text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#7B5CF5] font-semibold text-[10px]">
            <Sparkles className="size-3" />
            Domie AI
          </span>
          <span className="size-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="h-3 w-2/3 bg-slate-200 rounded-full mb-2" />
        <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
      </motion.div>
    </div>
  );
}

export default NotFoundVisual;
