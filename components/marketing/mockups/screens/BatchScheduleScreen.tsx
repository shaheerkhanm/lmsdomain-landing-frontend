"use client";

import React from "react";
import AppShell from "../AppShell";
import { MOCKUP_SCHEDULE_EVENTS, MOCKUP_IDENTITY } from "@/content/mockup-data";
import {
  Calendar as CalendarIcon,
  Video,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  CheckCircle2,
} from "lucide-react";

export function BatchScheduleScreen() {
  return (
    <AppShell activeMenuItem="Tutor Booking" title="Batches & Class Schedule">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* Header Toolbar */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-[13px] text-[#161616]">
              <CalendarIcon className="size-4 text-[#161616]" />
              <span>November 2026</span>
            </div>
            <div className="flex items-center gap-0.5 border border-[#EAE8E2] rounded-lg p-0.5">
              <button className="p-1 hover:bg-[#F5F6F8] rounded text-[#717684]">
                <ChevronLeft className="size-3" />
              </button>
              <button className="px-2 py-0.5 text-[9px] font-semibold text-[#161616] hover:bg-[#F5F6F8] rounded">
                Today
              </button>
              <button className="p-1 hover:bg-[#F5F6F8] rounded text-[#717684]">
                <ChevronRight className="size-3" />
              </button>
            </div>
            <span className="text-[9px] text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <CheckCircle2 className="size-2.5" />
              Zoom Sync Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded-lg border border-[#EAE8E2] text-[10px] font-medium text-[#525866]">
              {MOCKUP_IDENTITY.timeZoneText}
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#161616] text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-xs">
              <Plus className="size-3" />
              <span>Schedule Live Class</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Mini Month Calendar (Left) + Detailed Schedule Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          {/* Calendar Month Grid (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="grid grid-cols-7 text-center border-b border-[#F0EFEA] pb-2 text-[9px] font-bold text-[#8F94A0]">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>

            <div className="grid grid-cols-7 grid-rows-5 gap-1.5 flex-1 pt-2 min-h-0">
              {/* Sample 35 days in month view */}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 1; // start from Nov 1
                const isCurrentMonth = dayNum >= 1 && dayNum <= 30;
                const isToday = dayNum === 10;
                const hasLiveClass = dayNum === 10 || dayNum === 11 || dayNum === 13 || dayNum === 15;
                const hasTutor = dayNum === 10 || dayNum === 12 || dayNum === 17;

                return (
                  <div
                    key={i}
                    className={`rounded-lg p-1 flex flex-col justify-between border transition-colors ${
                      isToday
                        ? "bg-[#FAF5FF] border-[#8E7CF8]"
                        : isCurrentMonth
                        ? "bg-[#FAFAF9] border-[#F0EFEA]/80 hover:bg-[#F5F6F8]"
                        : "bg-[#F9F9FB] border-transparent text-[#CBD0D8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-semibold ${
                          isToday
                            ? "size-4 rounded-full bg-[#161616] text-white flex items-center justify-center font-bold"
                            : isCurrentMonth
                            ? "text-[#161616]"
                            : "text-[#CBD0D8]"
                        }`}
                      >
                        {isCurrentMonth ? dayNum : ""}
                      </span>
                    </div>

                    {isCurrentMonth && (
                      <div className="space-y-0.5 mt-1">
                        {hasLiveClass && (
                          <div className="h-2 rounded bg-[#161616] text-white text-[7px] px-1 truncate font-medium">
                            Live Zoom
                          </div>
                        )}
                        {hasTutor && (
                          <div className="h-2 rounded bg-[#8E7CF8]/25 text-[#5B47D9] text-[7px] px-1 truncate font-medium">
                            1:1 Session
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's & Upcoming Schedule Details (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[12px] font-bold text-[#161616]">
                Upcoming Classes & 1:1s
              </h4>
              <span className="text-[9px] font-semibold text-[#8E7CF8] bg-[#8E7CF8]/10 px-2 py-0.5 rounded-full">
                Asia/Kolkata
              </span>
            </div>

            <div className="space-y-2 flex-1 overflow-hidden min-h-0">
              {MOCKUP_SCHEDULE_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="p-2.5 rounded-xl border border-[#EAE8E2] bg-[#FAF9F6] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#8F94A0] flex items-center gap-1">
                      <Clock className="size-3 text-[#161616]" />
                      {event.date} · {event.time}
                    </span>
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                        event.mode === "Zoom Live"
                          ? "bg-[#161616] text-white"
                          : event.mode === "1:1 Tutor"
                          ? "bg-[#8E7CF8]/20 text-[#5B47D9]"
                          : "bg-[#F3F4F6] text-[#525866]"
                      }`}
                    >
                      {event.mode}
                    </span>
                  </div>

                  <div className="font-semibold text-[#161616] text-[11px] truncate">
                    {event.course}
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-[#717684]">
                    <span>Batch: {event.batch}</span>
                    <span className="flex items-center gap-1 font-medium text-[#161616]">
                      <User className="size-2.5" />
                      {event.instructor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default BatchScheduleScreen;

