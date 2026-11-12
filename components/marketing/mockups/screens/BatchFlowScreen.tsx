import React from "react";
import Image from "next/image";

export function BatchFlowScreen() {
  return (
    <div className="relative w-full">
      <span className="sr-only">
        Interactive preview of an academy batch flow showing a structured curriculum with drip content, Zoom live class, interactive checkpoints, and submission review.
      </span>
      <div
        className="w-full bg-white border border-[#E8E8EC] rounded-[20px] shadow-[0_50px_100px_-40px_rgba(20,20,40,0.28),0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden font-sans"
        aria-hidden="true"
      >
        {/* Top Window Bar */}
        <div className="flex items-center gap-4 sm:gap-[18px] px-4 sm:px-[22px] py-3.5 border-b border-[#E8E8EC] text-[14px]">
          <div className="w-[30px] h-[30px] rounded-[9px] bg-[#151517] flex items-center justify-center text-white font-bold text-[15px] shrink-0 font-urbanist">
            L
          </div>
          <div className="font-semibold flex items-center gap-2 whitespace-nowrap text-[13px] sm:text-[14px] text-[#151517]">
            <span>‹</span>
            <span>Full-Stack Web Engineering · Batch B</span>
          </div>

          <div className="hidden md:flex items-center gap-6 ml-6 text-[#535361] text-[13.5px]">
            <span className="py-1 cursor-default">Learners</span>
            <span className="py-1 font-semibold text-[#151517] shadow-[0_22px_0_-20px_#151517] cursor-default">
              Schedule
            </span>
            <span className="py-1 cursor-default">Reports</span>
            <span className="py-1 cursor-default">Settings</span>
          </div>

          {/* Toggle pill */}
          <div className="ml-auto w-[42px] h-[24px] rounded-full bg-[#151517] relative shrink-0">
            <span className="absolute right-[3px] top-[3px] w-[18px] h-[18px] rounded-full bg-white" />
          </div>
        </div>

        {/* Window Body: Canvas + Settings Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] min-h-[640px]">
          {/* Canvas Left */}
          <div className="relative bg-[#FBFBFC] bg-[radial-gradient(#DADAE0_1px,transparent_1.2px)] [background-size:18px_18px] py-9 px-4 sm:px-6 flex flex-col items-center overflow-hidden">
            {/* Animated Cursor (Desktop only) */}
            <div className="hidden min-[560px]:block absolute left-1/2 top-0 w-[22px] h-[22px] pointer-events-none z-10 animate-flow-cursor">
              <svg
                viewBox="0 0 22 22"
                className="w-[22px] h-[22px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
                fill="none"
              >
                <path
                  d="M3 2l15 8-6.5 1.6L8.3 18z"
                  fill="#151517"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>
              <b className="absolute left-[18px] top-[16px] bg-[#6C4BFF] text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-[6px] whitespace-nowrap">
                You
              </b>
            </div>

            {/* Node 1: Course Intro */}
            <div className="relative w-full max-w-[250px] bg-white border border-[#E2E2E8] rounded-[14px] pt-[26px] pb-3.5 px-4 text-center shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
              <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#151517] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 4h9l3 3v9H4z M7 9h6M7 12h6" />
                </svg>
              </span>
              <b className="block font-semibold text-[15px] text-[#151517]">
                Course Introduction & Setup
              </b>
              <small className="text-[#535361] text-[12.5px] mt-0.5 block">
                Lesson 1 · published
              </small>
            </div>

            {/* Link 1 */}
            <div className="w-[1.5px] h-[34px] bg-[#D7D7DE] relative overflow-hidden shrink-0">
              <span className="absolute left-0 -top-[14px] w-full h-[14px] bg-[#6C4BFF] animate-pulse-flow" />
            </div>

            {/* Node 2: Architecture Blueprint */}
            <div className="relative w-full max-w-[250px] bg-white border border-[#E2E2E8] rounded-[14px] pt-[26px] pb-3.5 px-4 text-center shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
              <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#7B5CFF] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="4.5" width="14" height="12" rx="2" />
                  <path d="M3 8.5h14M7 3v3M13 3v3" />
                </svg>
              </span>
              <b className="block font-semibold text-[15px] text-[#151517]">
                Architecture Blueprint
              </b>
              <small className="text-[#535361] text-[12.5px] mt-0.5 block">
                Drip: unlocks Monday
              </small>
            </div>

            {/* Link 2 */}
            <div className="w-[1.5px] h-[34px] bg-[#D7D7DE] relative overflow-hidden shrink-0">
              <span className="absolute left-0 -top-[14px] w-full h-[14px] bg-[#6C4BFF] animate-pulse-flow" />
            </div>

            {/* Node 3: Live class on Zoom (Selected) */}
            <div className="relative w-full max-w-[250px] bg-white border-[1.5px] border-[#6C4BFF] rounded-[14px] pt-[26px] pb-3.5 px-4 text-center shadow-[0_0_0_4px_#EFEBFF,0_10px_24px_-14px_rgba(108,75,255,0.6)]">
              <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#2D8CFF] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="2.5" y="5.5" width="10" height="9" rx="2" />
                  <path d="m12.5 9 5-3v8l-5-3" />
                </svg>
              </span>
              <b className="block font-semibold text-[15px] text-[#151517]">
                Live class on Zoom
              </b>
              <small className="text-[#535361] text-[12.5px] mt-0.5 block">
                Reminder sent to Batch B
              </small>
            </div>

            {/* Link 3 */}
            <div className="w-[1.5px] h-[34px] bg-[#D7D7DE] relative overflow-hidden shrink-0">
              <span className="absolute left-0 -top-[14px] w-full h-[14px] bg-[#6C4BFF] animate-pulse-flow" />
            </div>

            {/* Node 4: Checkpoint Evaluation */}
            <div className="relative w-full max-w-[250px] bg-white border border-[#E2E2E8] rounded-[14px] pt-[26px] pb-3.5 px-4 text-center shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
              <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#F2894A] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 10.5 8.5 14 15 6.5" />
                </svg>
              </span>
              <b className="block font-semibold text-[15px] text-[#151517]">
                Checkpoint Evaluation
              </b>
              <small className="text-[#535361] text-[12.5px] mt-0.5 block">
                In-video quiz · auto-scored
              </small>
            </div>

            {/* Link 4 */}
            <div className="w-[1.5px] h-[34px] bg-[#D7D7DE] relative overflow-hidden shrink-0">
              <span className="absolute left-0 -top-[14px] w-full h-[14px] bg-[#6C4BFF] animate-pulse-flow" />
            </div>

            {/* Condition Pill: Assignment submitted? */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-[#E2E2E8] rounded-[12px] py-2.5 px-4 font-semibold text-[14.5px] text-[#151517] shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
              <span className="w-7 h-7 rounded-[8px] bg-[#17A06B] text-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M10 3v14M3 10h14" />
                </svg>
              </span>
              <span>Assignment submitted?</span>
            </div>

            {/* Split branch into 2 nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 relative mt-[34px] w-full max-w-[460px]">
              {/* Branch top bridge line (desktop) */}
              <div className="hidden sm:block absolute left-[25%] right-[25%] -top-[18px] h-[18px] border-t-[1.5px] border-x-[1.5px] border-[#D7D7DE] rounded-t-[10px]" />

              {/* Node 5a: Instructor Review */}
              <div className="relative w-full bg-white border border-[#E2E2E8] rounded-[14px] pt-[26px] pb-3.5 px-3 text-center shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
                <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#E2539B] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 15.5V5a1.5 1.5 0 0 1 1.5-1.5H16v10H5.5A1.5 1.5 0 0 0 4 15Zm0 0A1.5 1.5 0 0 0 5.5 17H16" />
                  </svg>
                </span>
                <b className="block font-semibold text-[14px] text-[#151517]">
                  Instructor review
                </b>
                <small className="text-[#535361] text-[11.5px] mt-0.5 block">
                  Feedback on the submission
                </small>
              </div>

              {/* Node 5b: Progress Updated */}
              <div className="relative w-full bg-white border border-[#E2E2E8] rounded-[14px] pt-[26px] pb-3.5 px-3 text-center shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
                <span className="absolute left-1/2 -top-[17px] -translate-x-1/2 w-[34px] h-[34px] rounded-[10px] bg-[#151517] text-white flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M3 10h11M10 5l5 5-5 5" />
                  </svg>
                </span>
                <b className="block font-semibold text-[14px] text-[#151517]">
                  Progress updated
                </b>
                <small className="text-[#535361] text-[11.5px] mt-0.5 block">
                  Attendance & progress report
                </small>
              </div>
            </div>
          </div>

          {/* Settings Sidebar Right */}
          <aside className="border-t lg:border-t-0 lg:border-l border-[#E8E8EC] p-5 sm:p-[22px] flex flex-col gap-4 bg-white">
            {/* Sidebar Header */}
            <div className="flex items-center gap-2.5 font-semibold text-[#151517] text-[14px]">
              <div className="w-5 h-5 rounded-[5px] bg-[#2D8CFF] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                  <rect width="20" height="20" rx="5" fill="#2D8CFF" />
                  <path d="M5 7.5h6.5a1 1 0 0 1 1 1V13H6a1 1 0 0 1-1-1zM13 9.5l2.5-1.5v5L13 11.5" fill="#FFFFFF" />
                </svg>
              </div>
              <span>Live class</span>
              <span className="font-mono-code font-medium text-[11px] bg-[#F1F1F4] text-[#535361] px-1.5 py-0.5 rounded-[6px]">
                B3
              </span>
              <span className="ml-auto text-[#8A8A96] text-[13px] cursor-default">✕</span>
            </div>

            {/* Segments */}
            <div className="grid grid-cols-2 border-b border-[#E8E8EC] text-[14px] text-center">
              <span className="pb-2 font-semibold text-[#151517] border-b-2 border-[#151517]">
                Settings
              </span>
              <span className="pb-2 text-[#535361]">Attendance</span>
            </div>

            {/* Field: Batch */}
            <div>
              <label className="block text-[12.5px] text-[#535361] mb-1.5">Batch</label>
              <div className="border border-[#E2E2E8] rounded-[10px] px-3 py-2 text-[13.5px] text-[#151517] flex items-center justify-between bg-white">
                <span>Batch B · 24 learners</span>
                <span className="text-[#8A8A96] text-xs">⌄</span>
              </div>
            </div>

            {/* Field: When */}
            <div>
              <label className="block text-[12.5px] text-[#535361] mb-1.5">When</label>
              <div className="border border-[#E2E2E8] rounded-[10px] px-3 py-2 text-[13.5px] text-[#151517] flex items-center justify-between bg-white">
                <span>Monday · 7:00 PM IST</span>
                <span className="text-[#8A8A96] text-xs">⌄</span>
              </div>
            </div>

            {/* Field: Meeting */}
            <div>
              <label className="block text-[12.5px] text-[#535361] mb-1.5">Meeting</label>
              <div className="border border-[#E2E2E8] rounded-[10px] px-3 py-2 text-[13.5px] text-[#151517] flex items-center gap-2 bg-white">
                <span className="w-5 h-5 rounded-[6px] bg-[#2D8CFF] text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                  Z
                </span>
                <span>Zoom meeting · linked</span>
                <span className="ml-auto text-[#8A8A96] text-xs">⌄</span>
              </div>
            </div>

            {/* Toggle Row 1: Send reminders */}
            <div className="flex items-center justify-between text-[13.5px] font-medium text-[#151517] pt-1">
              <span>Send reminders</span>
              <div className="w-[42px] h-[24px] rounded-full bg-[#151517] relative shrink-0">
                <span className="absolute right-[3px] top-[3px] w-[18px] h-[18px] rounded-full bg-white" />
              </div>
            </div>

            {/* Toggle Row 2: Keep recording with the course */}
            <div className="flex items-center justify-between text-[13.5px] font-medium text-[#151517]">
              <span>Keep recording with the course</span>
              <div className="w-[42px] h-[24px] rounded-full bg-[#151517] relative shrink-0">
                <span className="absolute right-[3px] top-[3px] w-[18px] h-[18px] rounded-full bg-white" />
              </div>
            </div>

            {/* Video / Live photo thumbnail with LIVE pill */}
            <div className="rounded-[12px] overflow-hidden relative aspect-video bg-[#222222] mt-1 shadow-sm">
              <Image
                src="/images/features/live-class-screen.webp"
                alt="Live class in progress"
                fill
                sizes="(max-width: 980px) 100vw, 360px"
                className="object-cover"
              />
              <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 bg-[#E5484D] text-white font-bold text-[10.5px] tracking-[0.08em] px-2 py-1 rounded-[6px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-blink" />
                LIVE
              </span>
            </div>

            {/* Footer Buttons */}
            <div className="mt-auto pt-4 border-t border-[#E8E8EC] flex items-center justify-between text-[13.5px]">
              <span className="text-[#D14343] font-medium cursor-pointer">
                Remove class
              </span>
              <span className="bg-[#151517] text-white rounded-[9px] px-[22px] py-2 font-semibold cursor-pointer">
                Save
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BatchFlowScreen;
