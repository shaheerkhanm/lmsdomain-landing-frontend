"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { AuthSidePanelCopy } from "@/types/content";
import { Sparkles, Check, GraduationCap } from "lucide-react";

interface AuthVisualPanelProps {
  sidePanel: AuthSidePanelCopy;
}

export function AuthVisualPanel({ sidePanel }: AuthVisualPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      aria-label="Illustration"
      role="region"
      className="w-full h-full rounded-[32px] bg-[#F3F4F6] border border-[#ECEDEF] p-8 xl:p-12 flex flex-col justify-between items-center relative overflow-hidden select-none"
    >
      {/* Background Accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#DDD6FE]/40 rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top / Center Visual Stage with 3D perspective and slow float */}
      <div className="w-full flex-1 flex items-center justify-center py-6 [perspective:1200px]">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [-6, 6, -6],
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
                  transform: "rotateX(8deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d",
                }
          }
          className="w-full max-w-[420px] relative transition-transform"
        >
          {/* Main Dark Device Frame */}
          <div className="rounded-[24px] bg-[#161616] border border-[#2B2B2B] p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] text-white relative">
            {/* Browser Chrome Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#282828] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#374151]" />
                <span className="size-2.5 rounded-full bg-[#374151]" />
                <span className="size-2.5 rounded-full bg-[#374151]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#222222] border border-[#2E2E2E] font-mono text-[11px] text-[#9CA3AF]">
                <span className="text-[#7B5CF5]">✦</span>
                <span>lmsdomain.com</span>
              </div>
              <span className="size-2 rounded-full bg-emerald-400" />
            </div>

            {/* UI Card 1: Cohort Learning Overview */}
            <div className="rounded-xl bg-white p-4 text-[#161616] border border-slate-100 shadow-sm mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#7B5CF5] font-semibold text-[11px]">
                  <GraduationCap className="size-3" />
                  Live Cohort
                </span>
                <span className="text-[11px] text-[#6B6F76] font-medium">Curriculum Track</span>
              </div>
              <p className="text-sm font-semibold text-[#161616] mb-2 tracking-tight">
                Structured Course Sequence
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-[#6B6F76]">
                  <span>Progress</span>
                  <span className="font-medium text-[#7B5CF5]">In Progress</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7B5CF5] h-full w-2/3 rounded-full" />
                </div>
              </div>
            </div>

            {/* UI Card 2: AI Tool Card (Catalog Aligned) */}
            <div className="rounded-xl bg-white p-4 text-[#161616] border border-slate-100 shadow-md">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-[#7B5CF5]">
                  <Sparkles className="size-3.5" />
                  <span className="text-xs font-semibold">Domie AI Content Generator</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-[10px] font-semibold">
                  AI Tool
                </span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Draft course titles, descriptions, and learning outcomes with AI assistance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Text & Feature Highlights */}
      <div className="w-full max-w-[440px] pt-4 text-left">
        <h2 className="text-2xl xl:text-[28px] font-semibold text-[#161616] tracking-tight leading-snug">
          {sidePanel.title}
        </h2>
        <p className="text-sm text-[#6B6F76] mt-2 leading-relaxed">
          {sidePanel.subtitle}
        </p>

        {sidePanel.bullets && sidePanel.bullets.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {sidePanel.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#374151]">
                <div className="size-4 rounded-full bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default AuthVisualPanel;
