"use client";

import React, { useState } from "react";
import { Lock, Sun, Moon, Sparkles, Check, BookOpen } from "lucide-react";

const SWATCHES = [
  { name: "Electric Purple", hex: "#7B5CF5" },
  { name: "Soft Violet", hex: "#8E7CF8" },
  { name: "Warm Amber", hex: "#F3CF74" },
  { name: "Mint Green", hex: "#A6E3D3" },
  { name: "Ocean Teal", hex: "#0D9488" },
  { name: "Royal Blue", hex: "#2563EB" },
];

export function BrandingPlayground() {
  const [academyName, setAcademyName] = useState("Your Academy");
  const [activeColor, setActiveColor] = useState(SWATCHES[0].hex);
  const [isDark, setIsDark] = useState(false);

  const initial = academyName.trim().charAt(0).toUpperCase() || "A";

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 font-urbanist border-b border-[#F0F1F3] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3F4F6] text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-4">
            <span>✦</span>
            <span>MAKE IT YOURS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#161616] leading-[1.15] mb-3">
            Interactive Branding Playground
          </h2>

          <p className="text-base sm:text-lg text-[#6B6F76] leading-relaxed">
            Customize colors, academy name, and appearance to see how LMS Domain adapts to your brand identity in real time.
          </p>
        </div>

        {/* Playground Container */}
        <div className="max-w-[1020px] mx-auto rounded-[32px] bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pb-8 border-b border-[#E5E7EB]">
            {/* 1. Name Input */}
            <div className="space-y-2">
              <label htmlFor="playground-academy-name" className="text-xs font-bold uppercase tracking-wider text-[#6B6F76] block">
                Academy Name
              </label>
              <input
                id="playground-academy-name"
                type="text"
                maxLength={24}
                value={academyName}
                onChange={(e) => setAcademyName(e.target.value)}
                placeholder="Enter academy name..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-sm font-semibold text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] focus:border-transparent transition-all shadow-2xs"
              />
            </div>

            {/* 2. Color Swatches Radio Group */}
            <div className="space-y-2" role="radiogroup" aria-label="Brand color swatches">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F76] block">
                Primary Brand Color
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {SWATCHES.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    role="radio"
                    aria-checked={activeColor === swatch.hex}
                    aria-label={swatch.name}
                    onClick={() => setActiveColor(swatch.hex)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                      activeColor === swatch.hex
                        ? "ring-3 ring-offset-2 ring-[#161616] scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    {activeColor === swatch.hex && (
                      <Check className="size-4 text-white drop-shadow-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Light/Dark Preview Mode Toggle */}
            <div className="space-y-2 md:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F76] block">
                Preview Theme
              </span>
              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#161616] hover:bg-[#F3F4F6] transition-colors shadow-2xs cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="size-4 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="size-4 text-[#7B5CF5]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Browser Preview Frame */}
          <div
            className={`rounded-2xl border transition-colors duration-500 overflow-hidden shadow-md ${
              isDark
                ? "bg-[#161616] border-white/15 text-white"
                : "bg-white border-[#E5E7EB] text-[#161616]"
            }`}
          >
            {/* Browser Window Bar */}
            <div
              className={`flex items-center justify-between px-4 sm:px-6 py-2.5 border-b text-xs ${
                isDark ? "bg-[#1E1F24] border-white/10" : "bg-[#F3F4F6] border-[#E5E7EB]"
              }`}
            >
              <div className="flex items-center gap-1.5 w-16">
                <span className="size-2 rounded-full bg-rose-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
              </div>

              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono ${
                  isDark ? "bg-white/10 text-[#C9CCD1]" : "bg-white text-[#6B6F76] border border-[#E5E7EB]"
                }`}
              >
                <Lock className="size-3 text-[#10B981]" />
                <span>academy.yourdomain.com</span>
              </div>

              <div className="w-16 text-right font-medium text-[10px] text-[#8F94A0]">
                SSL Live
              </div>
            </div>

            {/* Mock Academy Header & Content */}
            <div className="p-5 sm:p-8 space-y-8">
              {/* Academy Nav */}
              <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-xs transition-colors duration-500"
                    style={{ backgroundColor: activeColor }}
                  >
                    {initial}
                  </div>
                  <span className="font-bold text-sm sm:text-base tracking-tight truncate max-w-[180px] sm:max-w-[260px]">
                    {academyName || "Your Academy"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer">
                    Courses
                  </span>
                  <span className="hidden sm:inline opacity-70 hover:opacity-100 cursor-pointer">
                    Community
                  </span>
                  <button
                    type="button"
                    style={{ backgroundColor: activeColor }}
                    className="px-3.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-xs transition-colors duration-500 cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Hero Banner */}
              <div className="text-center max-w-xl mx-auto space-y-3 py-3">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-500"
                  style={{
                    backgroundColor: `${activeColor}15`,
                    color: activeColor,
                  }}
                >
                  <Sparkles className="size-3" />
                  <span>Welcome to {academyName || "Your Academy"}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Master High-Demand Skills at Your Pace
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-[#C9CCD1]" : "text-[#6B6F76]"}`}>
                  Explore accredited video curriculums, interactive quizzes, and earn verifiable certificates.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    style={{ backgroundColor: activeColor }}
                    className="px-6 py-2.5 rounded-full text-white text-xs font-semibold shadow-md transition-colors duration-500 cursor-pointer"
                  >
                    Explore 12 Courses →
                  </button>
                </div>
              </div>

              {/* Two Sample Course Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border transition-colors duration-500 space-y-2 ${
                    isDark ? "bg-white/5 border-white/10" : "bg-[#F9FAFB] border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: activeColor }}
                    >
                      Featured Course
                    </span>
                    <span className="text-[10px] opacity-70">12 Lessons</span>
                  </div>
                  <p className="text-sm font-bold truncate">Cloud Engineering Bootcamp</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold">$129</span>
                    <span
                      className="text-[11px] font-semibold underline cursor-pointer"
                      style={{ color: activeColor }}
                    >
                      Enroll Now
                    </span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border transition-colors duration-500 space-y-2 ${
                    isDark ? "bg-white/5 border-white/10" : "bg-[#F9FAFB] border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: activeColor }}
                    >
                      New Release
                    </span>
                    <span className="text-[10px] opacity-70">8 Lessons</span>
                  </div>
                  <p className="text-sm font-bold truncate">Full-Stack TypeScript &amp; Next.js</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold">$99</span>
                    <span
                      className="text-[11px] font-semibold underline cursor-pointer"
                      style={{ color: activeColor }}
                    >
                      Enroll Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal / Technical Disclaimer Caption */}
          <p className="text-xs text-center text-[#8F94A0] italic">
            Illustration of Per-School Branding and Custom Domain with SSL. Domain setup requires DNS configuration.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BrandingPlayground;
