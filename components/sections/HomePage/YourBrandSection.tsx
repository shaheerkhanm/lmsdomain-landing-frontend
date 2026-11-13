"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { Check } from "lucide-react";

interface ColorSwatch {
  name: string;
  color: string;
  accentBg: string;
}

const SWATCHES: ColorSwatch[] = [
  { name: "Orange", color: "#F2894A", accentBg: "rgba(242, 137, 74, 0.12)" },
  { name: "Blue", color: "#2F6BFF", accentBg: "rgba(47, 107, 255, 0.12)" },
  { name: "Green", color: "#12A27A", accentBg: "rgba(18, 162, 122, 0.12)" },
  { name: "Pink", color: "#E2539B", accentBg: "rgba(226, 83, 155, 0.12)" },
  { name: "Ink", color: "#151517", accentBg: "rgba(21, 21, 23, 0.10)" },
];

const POINTS = [
  "Custom domain with automated SSL certificate",
  "Per-school logos, favicon and custom brand colors",
  "Visual homepage builder with full SEO metadata controls",
  "Zero third-party logos or platform mentions for your students",
];

const SAMPLE_COURSES = [
  {
    title: "Full-Stack Web Engineering",
    lessons: "48 lessons",
    price: "₹4,499",
    image: "/images/features/course-checkout-browsing.webp",
  },
  {
    title: "Data Structures & Algorithms",
    lessons: "36 lessons",
    price: "₹3,499",
    image: "/images/features/team-training-office.webp",
  },
  {
    title: "System Design Blueprint",
    lessons: "24 lessons",
    price: "₹3,999",
    image: "/images/features/cohort-workshop.webp",
  },
];

export function YourBrandSection() {
  const [activeSwatch, setActiveSwatch] = useState<ColorSwatch>(SWATCHES[0]);

  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="brand">
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-[clamp(24px,5vw,64px)] items-center">
        {/* Left Column: Brand Copy & Points */}
        <div className="rv-v4">
          <Eyebrow dotColor="#F2894A">Brand</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Your own domain, logo and colours
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch] mt-3">
            Your own domain, logo and colours, with a home page you build yourself. Students experience your academy, not ours.
          </p>

          {/* Bullets: Ink Dots (no violet check tiles) */}
          <div className="grid gap-3.5 mt-7">
            {POINTS.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[14.5px] text-[#151517]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151517] shrink-0 mt-2" aria-hidden="true" />
                <span className="leading-snug">{pt}</span>
              </div>
            ))}
          </div>

          {/* Swatch Selector */}
          <div className="mt-8 pt-6 border-t border-[#E8E8EC]">
            <span className="text-[12px] uppercase font-semibold tracking-[0.08em] text-[#8C8C98] block mb-3">
              Theme your academy live
            </span>
            <div className="flex items-center gap-2.5">
              {SWATCHES.map((swatch) => {
                const isSelected = activeSwatch.name === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    aria-label={`Select brand theme ${swatch.name}`}
                    aria-pressed={isSelected}
                    onClick={() => setActiveSwatch(swatch)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-[#151517] scale-110 shadow-xs"
                        : "hover:scale-105 opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
                  </button>
                );
              })}
              <span className="text-[12.5px] text-[#535361] ml-2 font-medium">
                {activeSwatch.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Believable Academy Site Browser Mockup */}
        <div className="rv-v4 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] overflow-hidden shadow-[0_20px_50px_-25px_rgba(20,20,40,0.18)]">
          {/* Browser Chrome Bar */}
          <div className="flex items-center gap-3 p-3 px-4 bg-[#F7F7F9] border-b border-[#E8E8EC]">
            <span className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </span>

            {/* URL Pill */}
            <div className="flex-1 bg-white border border-[#E8E8EC] rounded-[8px] py-1 px-3 font-mono text-[12px] text-[#151517] flex items-center justify-between min-w-0 overflow-hidden">
              <div className="flex items-center gap-1.5 truncate">
                <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-[#12A27A] shrink-0" aria-hidden="true">
                  <path d="M3 5V4a3 3 0 0 1 6 0v1h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5zm1.5 0h3V4a1.5 1.5 0 0 0-3 0z" />
                </svg>
                <span className="font-semibold text-[#151517]">academy.yourbrand.com</span>
              </div>

              {/* Custom Domain Connected Chip */}
              <span className="hidden sm:inline-flex items-center gap-1 bg-[#E8F8F0] text-[#12A27A] border border-[#A0D8B4] text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] shrink-0">
                Custom domain connected ✓
              </span>
            </div>
          </div>

          {/* Believable Academy Site Content */}
          <div className="p-5 sm:p-6 bg-white">
            {/* Top Navigation */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F3] text-[12.5px] text-[#535361]">
              <div className="flex items-center gap-2 font-bold text-[14.5px] text-[#151517]">
                <span
                  className="w-6 h-6 rounded-[7px] flex items-center justify-center text-white text-[12px] font-bold transition-colors duration-300"
                  style={{ backgroundColor: activeSwatch.color }}
                >
                  N
                </span>
                <span>Northwind Academy</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] font-medium">
                <span className="hover:text-[#151517] cursor-pointer">Courses</span>
                <span className="hover:text-[#151517] cursor-pointer">Batches</span>
                <span
                  className="font-semibold px-2.5 py-1 rounded-[6px] text-white transition-colors duration-300"
                  style={{ backgroundColor: activeSwatch.color }}
                >
                  Log in
                </span>
              </div>
            </div>

            {/* Academy Hero Strip themed with activeSwatch */}
            <div
              className="mt-4 rounded-[14px] p-6 sm:p-7 text-white transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: activeSwatch.color }}
            >
              <div className="relative z-10 max-w-[340px]">
                <span className="inline-block bg-white/20 backdrop-blur-xs text-white text-[10.5px] uppercase font-semibold px-2 py-0.5 rounded-[5px] mb-2 tracking-[0.06em]">
                  Batch Admissions Open
                </span>
                <b className="text-[20px] sm:text-[22px] tracking-[-0.03em] block leading-tight font-bold">
                  Master modern engineering with live cohorts
                </b>
                <p className="text-white/85 text-[12.5px] mt-1.5 leading-relaxed">
                  Interactive classes, dedicated mentors, and peer projects on your own schedule.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="bg-white text-[#151517] rounded-[8px] py-1.5 px-3.5 text-[12px] font-bold shadow-xs cursor-pointer">
                    Explore batches
                  </span>
                  <span className="text-white text-[12px] font-semibold underline underline-offset-4 ml-2 cursor-pointer">
                    Download curriculum
                  </span>
                </div>
              </div>
            </div>

            {/* Course Cards Grid with Real Thumbnails */}
            <div className="mt-5">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] font-bold text-[#151517]">Featured Cohorts</b>
                <span className="text-[12px] text-[#8C8C98]">3 active courses</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_COURSES.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className="border border-[#E8E8EC] rounded-[12px] p-2.5 bg-white flex flex-col justify-between hover:border-[#D0D0D8] transition-colors"
                  >
                    <div className="relative h-20 w-full rounded-[8px] overflow-hidden bg-[#F4F4F7] mb-2 border border-[#F0F0F3]">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <b className="text-[12.5px] font-bold text-[#151517] block leading-snug line-clamp-2">
                        {course.title}
                      </b>
                      <small className="text-[#8C8C98] text-[11px] block mt-0.5">
                        {course.lessons}
                      </small>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-[#F0F0F3] text-[12px]">
                      <span className="font-bold text-[#151517]">{course.price}</span>
                      <span
                        className="font-semibold text-[11px] hover:underline cursor-pointer transition-colors duration-300"
                        style={{ color: activeSwatch.color }}
                      >
                        Enroll →
                      </span>
                    </div>
                  </div>
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