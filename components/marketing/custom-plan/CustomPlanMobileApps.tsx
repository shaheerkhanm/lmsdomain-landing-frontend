"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Smartphone } from "lucide-react";
import { useBrandPreview } from "./BrandPreviewContext";
import type { CustomPlanMobileApps as CustomPlanMobileAppsType } from "@/types/content";

interface CustomPlanMobileAppsProps {
  mobileApps: CustomPlanMobileAppsType;
}

export function CustomPlanMobileApps({ mobileApps }: CustomPlanMobileAppsProps) {
  const { brandColor, brandName } = useBrandPreview();
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);

  if (!mobileApps) return null;

  const eyebrow = mobileApps.eyebrow || "ANDROID + iOS";
  const title = mobileApps.title || "Your app, on your students' phones";
  const text =
    mobileApps.text ||
    "Learners download your app, not ours. Recorded and live classes, quizzes, certificates and Domie AI tutor, with push notifications to bring them back.";
  const bullets = mobileApps.bullets || [
    "Published under your name",
    "Your icon and splash screen",
    "Same login as your web academy",
    "Updates handled by us",
  ];
  const note =
    mobileApps.note ||
    "Apps are published from your own Google Play and Apple developer accounts, so the listings stay yours.";

  const screens = mobileApps.screenshots && mobileApps.screenshots.length > 0
    ? mobileApps.screenshots
    : [
        { image: "/assets/img/banner/grid-1-img.jpg", alt: "Mobile app lesson view" },
        { image: "/assets/img/banner/grid-2-img.jpg", alt: "Mobile app quiz view" },
      ];

  // Cross-fade through screenshots every 4 seconds
  useEffect(() => {
    if (screens.length <= 1) return;
    const interval = setInterval(() => {
      setActiveScreenIdx((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screens.length]);

  const initials = useMemo(() => {
    const parts = (brandName || "YA").trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }, [brandName]);

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#F3F4F6] font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#7B5CF5] border border-[#E5E7EB] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              ✦ {eyebrow}
            </span>

            <h2 className="text-[32px] sm:text-[42px] font-bold text-[#161616] tracking-tight leading-tight mb-4">
              {title}
            </h2>

            <p className="text-[16px] sm:text-[18px] text-[#6B6F76] leading-relaxed mb-6">
              {text}
            </p>

            {/* Bullets */}
            <ul className="space-y-3 mb-8">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-semibold text-[#161616]">
                  <CheckCircle2 className="size-5 text-[#059669] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Store Badges / Text Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-bold text-[#161616] shadow-2xs flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#0D9488]" />
                <span>Google Play</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-bold text-[#161616] shadow-2xs flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#2563EB]" />
                <span>App Store</span>
              </span>
            </div>

            {/* Note */}
            <p className="text-xs text-[#8F94A0] leading-relaxed max-w-lg">
              {note}
            </p>
          </div>

          {/* Right Column: Two Phone Frames (Android & iPhone CSS outlines) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative flex items-center gap-4 sm:gap-6">
              {/* Phone 1: Android Frame */}
              <div className="w-[190px] sm:w-[230px] rounded-[36px] bg-[#161616] p-3 shadow-2xl border border-white/20 relative">
                {/* Speaker pill */}
                <div className="w-10 h-2 bg-black/80 rounded-full mx-auto mb-2.5" />
                <div className="w-full h-[320px] sm:h-[390px] rounded-[24px] bg-[#0E0E0E] overflow-hidden relative">
                  {screens.map((scr, idx) => (
                    <img
                      key={idx}
                      src={scr.image}
                      alt={scr.alt || "Android screen"}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        idx === activeScreenIdx ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  {/* Android overlay header */}
                  <div className="absolute top-0 inset-x-0 p-2.5 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between text-[9px] text-white">
                    <span className="font-semibold">Android</span>
                    <span>4G • 98%</span>
                  </div>
                </div>
              </div>

              {/* Phone 2: iPhone Frame */}
              <div className="w-[190px] sm:w-[230px] rounded-[38px] bg-black p-3 shadow-2xl border border-white/25 relative -translate-y-4">
                {/* Dynamic Island Notch */}
                <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="size-1 rounded-full bg-white/20" />
                </div>
                <div className="w-full h-[320px] sm:h-[390px] rounded-[26px] bg-[#0E0E0E] overflow-hidden relative">
                  {screens.map((scr, idx) => (
                    <img
                      key={idx}
                      src={scr.image}
                      alt={scr.alt || "iOS screen"}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        idx === (activeScreenIdx + 1) % screens.length ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  {/* iOS overlay header */}
                  <div className="absolute top-0 inset-x-0 p-2.5 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between text-[9px] text-white">
                    <span className="font-semibold">9:41</span>
                    <span>5G • 100%</span>
                  </div>
                </div>
              </div>

              {/* Floating App-Icon Tile using shared BrandPreview colour */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-2xl bg-white shadow-xl border border-[#ECEDEF] flex items-center gap-3 transition-all duration-300"
              >
                <div
                  className="size-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm transition-colors duration-300"
                  style={{ backgroundColor: brandColor }}
                >
                  {initials}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#161616] leading-tight">
                    {brandName || "Your Academy"}
                  </p>
                  <p className="text-[10px] text-[#0D9488] font-semibold">Live on Stores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomPlanMobileApps;

