"use client";

import React from "react";
import { Play, Video, Clock, Award, BookOpen, CheckCircle, ChevronRight, Lock } from "lucide-react";
import { MOCKUP_IDENTITY } from "@/content/mockup-data";

export function StudentViewScreen() {
  return (
    <div
      role="img"
      aria-label="Northstar Academy learner experience in mobile browser"
      className="w-full h-full bg-[#F5F6F8] font-urbanist text-[#161616] flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="w-full max-w-[420px] bg-white rounded-2xl border border-[#EAE8E2] shadow-sm flex flex-col overflow-hidden max-h-full"
      >
        {/* Mobile Browser Address Bar */}
        <div className="bg-[#FAF9F6] border-b border-[#EAE8E2] px-3 py-1.5 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-[#E5E5E0]" />
            <span className="size-1.5 rounded-full bg-[#E5E5E0]" />
          </div>
          <div className="flex-1 bg-white border border-[#EAE8E2] rounded-md px-2 py-0.5 text-[9px] text-[#717684] flex items-center justify-between font-mono">
            <span className="truncate flex items-center gap-1">
              <Lock className="size-2 text-[#059669]" />
              {MOCKUP_IDENTITY.domain}/learn
            </span>
            <span className="text-[8px] text-[#059669] font-sans font-semibold">SSL Active</span>
          </div>
        </div>

        {/* Learner Portal Header */}
        <div className="px-3.5 py-2.5 border-b border-[#F0EFEA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[#161616] text-white font-bold text-[10px] flex items-center justify-center">
              NA
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#161616] leading-tight">
                {MOCKUP_IDENTITY.academyName}
              </div>
              <div className="text-[9px] text-[#8F94A0]">Student Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-[#8E7CF8]/20 text-[#6D58E8] font-bold text-[9px] flex items-center justify-center">
              R
            </span>
            <span className="text-[10px] font-semibold text-[#161616]">Rohan S.</span>
          </div>
        </div>

        {/* Portal Body */}
        <div className="p-3 space-y-2.5 overflow-hidden flex-1 min-h-0 text-[10px]">
          {/* Next Live Class Alert */}
          <div className="rounded-xl bg-gradient-to-r from-[#161616] to-[#262626] text-white p-2.5 flex items-center justify-between shadow-2xs">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1 text-[8px] text-[#A6E3D3] font-bold uppercase tracking-wider">
                <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Class Today · 10:00 AM
              </div>
              <div className="font-bold text-[11px] truncate mt-0.5">
                NEET Biology Live (Batch B)
              </div>
              <div className="text-[9px] text-white/70">Dr. K. Sharma · Zoom</div>
            </div>
            <button className="px-2.5 py-1 rounded-lg bg-white text-[#161616] text-[9px] font-bold shrink-0 shadow-xs flex items-center gap-1">
              <Video className="size-2.5 text-[#161616]" />
              <span>Join Class</span>
            </button>
          </div>

          {/* Continue Learning Card */}
          <div className="rounded-xl border border-[#EAE8E2] p-2.5 bg-[#FAF9F6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-[#8F94A0] uppercase tracking-wider">
                Continue Learning
              </span>
              <span className="text-[9px] font-bold text-[#161616]">64% Done</span>
            </div>

            <div>
              <div className="font-bold text-[11px] text-[#161616]">
                IELTS Academic Masterclass
              </div>
              <div className="text-[9px] text-[#717684]">
                Lesson 14: Complex Sentence Structures for Writing Task 2
              </div>
            </div>

            <div className="w-full h-1.5 bg-[#EAE8E2] rounded-full overflow-hidden">
              <div className="h-full bg-[#161616] rounded-full" style={{ width: "64%" }} />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] text-[#8F94A0]">32 of 64 lessons completed</span>
              <button className="text-[9px] font-bold text-[#161616] flex items-center gap-0.5 hover:underline">
                <Play className="size-2.5 fill-current" />
                Resume
              </button>
            </div>
          </div>

          {/* Enrolled Courses / Certificates */}
          <div className="space-y-1.5">
            <div className="text-[9px] font-bold text-[#8F94A0] uppercase tracking-wider">
              Enrolled Courses & Tests
            </div>

            <div className="p-2 rounded-lg border border-[#F0EFEA] bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-[#F3CF74]/30 text-[#B45309] font-bold text-[8px] flex items-center justify-center">
                  <BookOpen className="size-3" />
                </div>
                <div>
                  <div className="font-semibold text-[#161616] text-[10px]">
                    Spoken English Foundation
                  </div>
                  <div className="text-[8px] text-[#717684]">Evening Batch A · 77% complete</div>
                </div>
              </div>
              <ChevronRight className="size-3 text-[#8F94A0]" />
            </div>

            <div className="p-2 rounded-lg border border-[#F0EFEA] bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded bg-[#8E7CF8]/20 text-[#6D58E8] font-bold text-[8px] flex items-center justify-center">
                  <Award className="size-3" />
                </div>
                <div>
                  <div className="font-semibold text-[#161616] text-[10px]">
                    IELTS Mock Test Series 04
                  </div>
                  <div className="text-[8px] text-[#059669] font-medium">Passed · Certificate issued</div>
                </div>
              </div>
              <span className="text-[8px] font-bold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                Download PDF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentViewScreen;

