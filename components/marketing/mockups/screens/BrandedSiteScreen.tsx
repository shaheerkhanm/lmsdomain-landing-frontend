"use client";

import React from "react";
import { Lock, Search, Star, BookOpen, Clock, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { MOCKUP_IDENTITY, MOCKUP_COURSE_COMPLETIONS } from "@/content/mockup-data";

export function BrandedSiteScreen() {
  return (
    <div
      role="img"
      aria-label="Northstar Academy branded custom domain storefront"
      className="w-full h-full bg-[#FAF9F6] font-urbanist text-[#161616] flex flex-col select-none overflow-hidden"
    >
      <div aria-hidden="true" className="w-full h-full flex flex-col">
        {/* Custom Domain Browser Bar */}
        <div className="h-9 bg-[#F0EFEA] border-b border-[#E0DED7] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
          </div>

          <div className="w-full max-w-[320px] h-6 bg-white border border-[#D5D5D0] rounded-md px-2.5 text-[10px] font-mono text-[#525866] flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-1.5 truncate">
              <Lock className="size-2.5 text-[#059669]" />
              https://{MOCKUP_IDENTITY.domain}
            </span>
            <span className="text-[8px] font-sans font-semibold text-[#059669]">
              Custom Domain SSL
            </span>
          </div>

          <div className="w-10" />
        </div>

        {/* Storefront Navigation Bar */}
        <header className="h-11 bg-white border-b border-[#EAE8E2] px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-lg bg-[#161616] text-white font-bold text-xs flex items-center justify-center">
              {MOCKUP_IDENTITY.shortName}
            </div>
            <span className="font-bold text-[13px] text-[#161616] tracking-tight">
              {MOCKUP_IDENTITY.academyName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-[11px] font-semibold text-[#525866]">
            <span className="text-[#161616]">Courses</span>
            <span className="hover:text-[#161616]">Live Batches</span>
            <span className="hover:text-[#161616]">Tutors</span>
            <span className="hover:text-[#161616]">About</span>
          </nav>

          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 text-[10px] font-semibold text-[#161616] hover:bg-[#F5F6F8] rounded-md">
              Sign In
            </button>
            <button className="px-3 py-1 text-[10px] font-bold bg-[#161616] text-white rounded-lg shadow-xs">
              Explore Batches
            </button>
          </div>
        </header>

        {/* Storefront Hero Banner */}
        <div className="p-4 sm:p-5 flex-1 overflow-hidden flex flex-col justify-between">
          <div className="max-w-xl mx-auto text-center space-y-2 py-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[9px] font-bold">
              <span>● Admissions Open for Winter 2026 Cohorts</span>
            </div>
            <h1 className="text-[18px] sm:text-[22px] font-extrabold text-[#161616] leading-tight tracking-tight">
              Master Entrance Exams & Professional Skills with Expert Faculty
            </h1>
            <p className="text-[11px] text-[#717684] max-w-md mx-auto">
              Live Zoom classes, interactive doubt-clearing sessions, and completion certificates directly on Northstar Academy.
            </p>
          </div>

          {/* Featured Courses Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto w-full">
            {MOCKUP_COURSE_COMPLETIONS.slice(0, 3).map((c, i) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-16 rounded-lg bg-gradient-to-br from-[#161616] to-[#333] text-white p-2 flex flex-col justify-between">
                    <span className="text-[8px] font-bold bg-white/20 px-1.5 py-0.5 rounded self-start">
                      {c.category}
                    </span>
                    <span className="text-[11px] font-bold truncate">{c.name}</span>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-[#161616] truncate">
                    {c.name}
                  </div>
                  <div className="text-[9px] text-[#8F94A0] flex items-center gap-1 mt-0.5">
                    <span>{c.lessons} Lessons</span>
                    <span>·</span>
                    <span>{c.students} Learners</span>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#F0EFEA] flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#161616]">{c.price}</span>
                  <button className="px-2 py-0.5 rounded-md bg-[#161616] text-white text-[9px] font-bold">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="text-center text-[9px] text-[#8F94A0] pt-2">
            © 2026 {MOCKUP_IDENTITY.academyName} · Built on white-label LMS Domain platform
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandedSiteScreen;

