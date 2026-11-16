"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { useBrandPreview } from "./BrandPreviewContext";
import type { CustomPlanBrandPreview } from "@/types/content";
import { Check } from "lucide-react";

interface BrandPreviewMockProps {
  config?: CustomPlanBrandPreview;
  interactive?: boolean; // false for static homepage band
  className?: string;
}

export function BrandPreviewMock({
  config,
  interactive = true,
  className = "",
}: BrandPreviewMockProps) {
  const { brandName, brandColor, setBrandName, setBrandColor } = useBrandPreview();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const colours = useMemo(() => {
    return config?.colours && config.colours.length > 0
      ? config.colours
      : ["#7B5CF5", "#2563EB", "#059669", "#D97706", "#DC2626", "#0D9488"];
  }, [config?.colours]);

  const [hasInteracted, setHasInteracted] = useState(false);

  // Derive initials from brandName (up to 2 letters)
  const initials = useMemo(() => {
    const parts = (brandName || "YA").trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }, [brandName]);

  // Auto-play once on load: types a sample name, cycles 2 colours, then waits
  useEffect(() => {
    if (!interactive || hasInteracted || shouldReduceMotion) return;

    let isMounted = true;
    const sampleName = "Apex Academy";
    let interval: NodeJS.Timeout | null = null;
    let colorTimer1: NodeJS.Timeout | null = null;
    let colorTimer2: NodeJS.Timeout | null = null;

    // Start auto-play after 800ms
    const startTimer = setTimeout(() => {
      let idx = 0;
      setBrandName("");
      interval = setInterval(() => {
        if (!isMounted || hasInteracted) {
          if (interval) clearInterval(interval);
          return;
        }
        idx++;
        setBrandName(sampleName.slice(0, idx));
        if (idx >= sampleName.length) {
          if (interval) clearInterval(interval);
          // Cycle colour after typing completes
          colorTimer1 = setTimeout(() => {
            if (!isMounted || hasInteracted) return;
            if (colours[1]) setBrandColor(colours[1]);
            colorTimer2 = setTimeout(() => {
              if (!isMounted || hasInteracted) return;
              if (colours[0]) setBrandColor(colours[0]);
            }, 1000);
          }, 800);
        }
      }, 70);
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
      if (colorTimer1) clearTimeout(colorTimer1);
      if (colorTimer2) clearTimeout(colorTimer2);
    };
  }, [interactive, hasInteracted, shouldReduceMotion, colours, setBrandName, setBrandColor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    // Limit to 24 characters and basic safe text
    const val = e.target.value.slice(0, 24);
    setBrandName(val);
  };

  const handleColorSelect = (color: string) => {
    setHasInteracted(true);
    setBrandColor(color);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[580px] mx-auto select-none font-urbanist ${className}`}
      style={{ "--brand-accent": brandColor } as React.CSSProperties}
    >
      {/* 1. TOP CONTROL CARD (Input + Colour swatches) */}
      {interactive && (
        <div className="mb-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[#ECEDEF] p-3.5 sm:p-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-30">
          {/* Name Input */}
          <div className="w-full sm:w-auto flex-1">
            <label className="block text-[11px] font-semibold text-[#8F94A0] uppercase tracking-wider mb-1 text-left">
              {config?.nameLabel || "Try it: your academy name"}
            </label>
            <input
              type="text"
              value={brandName}
              onChange={handleInputChange}
              maxLength={24}
              placeholder={config?.namePlaceholder || "Your Academy"}
              className="w-full h-9 px-3 rounded-lg border border-[#ECEDEF] bg-[#F8FAFC] text-xs font-semibold text-[#161616] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition-shadow"
            />
          </div>

          {/* Colour Swatches */}
          <div className="w-full sm:w-auto shrink-0 text-left sm:text-right">
            <label className="block text-[11px] font-semibold text-[#8F94A0] uppercase tracking-wider mb-1">
              {config?.colourLabel || "Pick your colour"}
            </label>
            <div className="flex items-center gap-1.5">
              {colours.map((c) => {
                const isSelected = brandColor.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleColorSelect(c)}
                    aria-label={`Select theme colour ${c}`}
                    className="size-6 rounded-full relative transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: c }}
                  >
                    {isSelected && <Check className="size-3 text-white stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. MOCK STAGE (Browser Window + Overlapping Phone) */}
      <div className="relative w-full">
        {/* Desktop Browser Window Mock */}
        <div className="w-full rounded-[22px] bg-white border border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300">
          {/* Browser Chrome Header */}
          <div className="bg-[#F8FAFC] px-3.5 py-2.5 border-b border-[#ECEDEF] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="size-2.5 rounded-full bg-[#EF4444]/80" />
              <span className="size-2.5 rounded-full bg-[#F59E0B]/80" />
              <span className="size-2.5 rounded-full bg-[#10B981]/80" />
            </div>

            {/* Address bar */}
            <div className="flex-1 max-w-[280px] mx-auto h-5 bg-white border border-[#ECEDEF] rounded-md px-2.5 flex items-center text-[10px] text-[#8F94A0] font-mono truncate">
              https://learn.{(brandName || "academy").toLowerCase().replace(/[^a-z0-9]/g, "")}.com
            </div>

            <div className="w-10" />
          </div>

          {/* Browser Inner Web Academy */}
          <div className="p-4 sm:p-5 text-left bg-gradient-to-b from-white to-[#F8FAFC] min-h-[260px] sm:min-h-[290px]">
            {/* Top Navigation */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F3F5] mb-4">
              <div className="flex items-center gap-2">
                {/* Brand Logo Tile */}
                <div
                  className="size-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xs transition-colors duration-300"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                >
                  {initials}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#161616] tracking-tight truncate max-w-[150px] sm:max-w-[200px]">
                  {brandName || "Your Academy"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-medium text-[#6B6F76]">
                <span className="hidden sm:inline hover:text-[#161616]">Courses</span>
                <span className="hidden sm:inline hover:text-[#161616]">Certificates</span>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full text-white text-[10px] font-semibold transition-colors duration-300 shadow-xs"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                >
                  My Learning
                </button>
              </div>
            </div>

            {/* Academy Course Card (Featured Hero Course) */}
            <div className="rounded-xl border border-[#ECEDEF] bg-white p-3.5 sm:p-4 shadow-xs relative max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white transition-colors duration-300"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                >
                  Active Course
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-[#161616] leading-tight mb-1 truncate">
                Full-Stack Mastery 2026
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#6B6F76] line-clamp-2 mb-3">
                Live interactive classes, quizzes, and automated certificate generation on graduation.
              </p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#8F94A0]">
                  <span>Progress</span>
                  <span className="font-semibold text-[#161616]">68%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#ECEDEF] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: "68%", backgroundColor: "var(--brand-accent)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandPreviewMock;
