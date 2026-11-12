"use client";

import React, { useState, useEffect } from "react";
import { Eyebrow } from "@/components/marketing/ui";

const BRAND_THEMES = [
  { domain: "learn.youracademy.in", color: "#0F766E", name: "Your Academy" },
  { domain: "courses.prepcode.com", color: "#1D4ED8", name: "PrepCode" },
  { domain: "training.northstar.edu", color: "#B45309", name: "NorthStar" },
  { domain: "academy.apexskills.org", color: "#BE185D", name: "Apex Skills" },
];

const POINTS = [
  "Custom domain with automated SSL",
  "Per-school logos & brand colors",
  "Homepage builder & SEO controls",
];

export function YourBrandSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % BRAND_THEMES.length);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const currentTheme = BRAND_THEMES[activeIdx];

  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="brand">
      <div className="max-w-[1080px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-[clamp(24px,5vw,64px)] items-center">
        {/* Left Column: Brand Copy & Points */}
        <div className="rv-v4">
          <Eyebrow tone="gradient">Brand</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Your own domain, logo and colours
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch] mt-3">
            Your own domain, logo and colours, with a home page you build yourself. Students experience your academy, not ours.
          </p>

          <div className="grid gap-3 mt-6 sm:mt-7">
            {POINTS.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-[15px] text-[#151517]">
                <span className="w-6 h-6 rounded-[7px] bg-[#EFEBFF] text-[#6C4BFF] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="w-[13px] h-[13px]">
                    <path d="m3 7.5 2.5 2.5L11 4" />
                  </svg>
                </span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Browser Window */}
        <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[16px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,20,40,0.35)]">
          {/* Browser Chrome Bar */}
          <div className="flex items-center gap-3 p-2.5 px-3.5 bg-[#F6F6F8] border-b border-[#E8E8EC]">
            <span className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </span>

            {/* URL Pill */}
            <div className="flex-1 bg-white border border-[#E8E8EC] rounded-[8px] py-1 px-2.5 font-mono-code font-medium text-[12.5px] text-[#151517] flex items-center gap-1.5 min-w-0 overflow-hidden whitespace-nowrap">
              <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-[#17A06B] shrink-0" aria-hidden="true">
                <path d="M3 5V4a3 3 0 0 1 6 0v1h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5zm1.5 0h3V4a1.5 1.5 0 0 0-3 0z" />
              </svg>
              <span className="truncate">{currentTheme.domain}</span>
              <span className="inline-block w-px h-3.5 bg-[#151517] animate-live-blink" />
            </div>
          </div>

          {/* Sample Academy Site Content */}
          <div className="p-5 sm:p-[22px]">
            {/* Top Navigation */}
            <div className="flex items-center justify-between text-[12.5px] text-[#535361]">
              <span className="flex items-center gap-2 font-bold text-[14px] text-[#151517]">
                <i
                  className="w-5.5 h-5.5 rounded-[7px] inline-block transition-colors duration-500 not-italic"
                  style={{ backgroundColor: currentTheme.color }}
                />
                <span>{currentTheme.name}</span>
              </span>
              <span>Courses · Batches · Log in</span>
            </div>

            {/* Hero Card with Dynamic Brand Color */}
            <div
              className="mt-4.5 rounded-[12px] p-6 text-white transition-colors duration-500"
              style={{ backgroundColor: currentTheme.color }}
            >
              <b className="text-[20px] sm:text-[22px] tracking-[-0.03em] block max-w-[16ch] leading-[1.1]">
                Crack your exam with live batches
              </b>
              <span className="inline-block mt-3.5 bg-white text-[#151517] rounded-[8px] py-1.5 px-3 text-xs font-semibold shadow-2xs">
                Browse courses
              </span>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-3 gap-2.5 mt-3">
              <div className="h-16 rounded-[10px] bg-[#F2F2F5]" />
              <div className="h-16 rounded-[10px] bg-[#F2F2F5]" />
              <div className="h-16 rounded-[10px] bg-[#F2F2F5]" />
            </div>

            {/* Clickable Swatches */}
            <div className="flex items-center gap-2 mt-3.5 text-xs text-[#535361]">
              <span>Brand colour</span>
              <div className="flex items-center gap-1.5">
                {BRAND_THEMES.map((theme, idx) => (
                  <button
                    key={theme.domain}
                    type="button"
                    aria-label={`Select brand theme ${theme.name}`}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-4.5 h-4.5 rounded-full transition-transform cursor-pointer ${
                      activeIdx === idx ? "scale-125 ring-2 ring-offset-2 ring-slate-400" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: theme.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourBrandSection;
