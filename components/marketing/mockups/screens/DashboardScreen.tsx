"use client";

import React from "react";
import AppShell from "../AppShell";
import {
  MOCKUP_KPIS,
  MOCKUP_REVENUE_HISTORY,
  MOCKUP_COURSE_COMPLETIONS,
  MOCKUP_UPCOMING_LESSONS,
  MOCKUP_DOMIE_BRIEF,
  MOCKUP_IDENTITY,
} from "@/content/mockup-data";
import { Sparkles, Calendar, ArrowUpRight, Clock, Video, User } from "lucide-react";

export function DashboardScreen() {
  return (
    <AppShell activeMenuItem="Dashboard" title="Academy Overview">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px] leading-normal">
        {/* KPI Row (5 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 shrink-0">
          {MOCKUP_KPIS.map((kpi, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs flex flex-col justify-between"
            >
              <div className="text-[10px] text-[#717684] font-medium truncate">
                {kpi.label}
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-1">
                <span className="text-[15px] font-bold text-[#161616] tracking-tight">
                  {kpi.value}
                </span>
                {kpi.change && (
                  <span className="text-[9px] font-semibold text-[#059669] shrink-0">
                    {kpi.change}
                  </span>
                )}
              </div>
              {kpi.subtext && (
                <div className="text-[9px] text-[#8F94A0] truncate mt-0.5">
                  {kpi.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Middle Row: Revenue Chart (Left) + Domie's Daily Brief (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 shrink-0">
          {/* Revenue Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[12px] font-bold text-[#161616]">
                  Revenue & Collection
                </p>
                <p className="text-[9px] text-[#717684]">
                  Last 12 months · Dec–Nov
                </p>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#161616]">₹4,86,200</div>
                <div className="text-[9px] text-[#059669] font-medium">▲ 14.2% MoM</div>
              </div>
            </div>

            {/* SVG Area Chart */}
            <div className="w-full h-24 pt-1">
              <svg
                viewBox="0 0 550 90"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#161616" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#161616" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Subtle grid lines */}
                <line x1="0" y1="20" x2="550" y2="20" stroke="#F0EFEA" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="550" y2="50" stroke="#F0EFEA" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="550" y2="80" stroke="#F0EFEA" />

                {/* Area fill */}
                <path
                  d="M 10,75 L 55,68 L 100,70 L 145,62 L 190,54 L 235,56 L 280,48 L 325,40 L 370,42 L 415,34 L 460,40 L 520,20 L 520,80 L 10,80 Z"
                  fill="url(#revGrad)"
                />
                {/* Trend line */}
                <path
                  d="M 10,75 L 55,68 L 100,70 L 145,62 L 190,54 L 235,56 L 280,48 L 325,40 L 370,42 L 415,34 L 460,40 L 520,20"
                  fill="none"
                  stroke="#161616"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Target node on current month */}
                <circle cx="520" cy="20" r="3.5" fill="#161616" />
                <circle cx="520" cy="20" r="6" fill="#161616" fillOpacity="0.2" />
              </svg>
            </div>

            {/* Months Label */}
            <div className="flex justify-between text-[8px] text-[#8F94A0] px-1 pt-1 font-medium">
              {MOCKUP_REVENUE_HISTORY.map((pt) => (
                <span key={pt.month}>{pt.month}</span>
              ))}
            </div>
          </div>

          {/* Domie's Daily Brief (1 col) */}
          <div className="bg-gradient-to-br from-[#FAF5FF] via-white to-[#F5F3FF] rounded-xl border border-[#8E7CF8]/30 p-3 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-md bg-[#8E7CF8] text-white flex items-center justify-center">
                    <Sparkles className="size-3" />
                  </div>
                  <p className="text-[12px] font-bold text-[#161616]">
                    Domie&apos;s Brief
                  </p>
                </div>
                <span className="text-[9px] font-bold text-[#6D58E8] bg-[#8E7CF8]/15 px-1.5 py-0.5 rounded">
                  Today
                </span>
              </div>
              <ul className="space-y-2 mt-2">
                {MOCKUP_DOMIE_BRIEF.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[10px] text-[#475467]">
                    <span className="size-1 rounded-full bg-[#8E7CF8] mt-1.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-[#8E7CF8]/15 flex items-center justify-between text-[9px] text-[#717684]">
              <span>Grounded in your courses</span>
              <span className="text-[#6D58E8] font-medium flex items-center gap-0.5">
                Full AI Report <ArrowUpRight className="size-2.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Course Completion Table + Upcoming Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 flex-1 min-h-0">
          {/* Course Completion Table (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-bold text-[#161616]">
                Course Progress & Completion
              </p>
              <span className="text-[9px] text-[#717684]">
                Across active batches
              </span>
            </div>

            <div className="flex-1 overflow-hidden min-h-0">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="border-b border-[#F0EFEA] text-[9px] font-bold text-[#8F94A0] uppercase">
                    <th className="pb-1.5 font-medium">Course</th>
                    <th className="pb-1.5 font-medium text-center">Students</th>
                    <th className="pb-1.5 font-medium text-center">Lessons</th>
                    <th className="pb-1.5 font-medium text-right">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F7F5]">
                  {MOCKUP_COURSE_COMPLETIONS.slice(0, 4).map((course) => (
                    <tr key={course.id} className="hover:bg-[#FAF9F6]">
                      <td className="py-1.5 font-medium text-[#161616] truncate max-w-[180px]">
                        {course.name}
                      </td>
                      <td className="py-1.5 text-center text-[#525866]">
                        {course.students}
                      </td>
                      <td className="py-1.5 text-center text-[#525866]">
                        {course.lessons}
                      </td>
                      <td className="py-1.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-[#F0EFEA] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#161616] rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                          <span className="font-semibold text-[#161616] w-7 text-right">
                            {course.completionRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[9px] text-[#8F94A0]">
              <span>{MOCKUP_IDENTITY.timeZoneText}</span>
              <span className="font-medium text-[#161616]">View all courses →</span>
            </div>
          </div>

          {/* Today's Lessons (1 col) */}
          <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-[#161616]" />
                <p className="text-[12px] font-bold text-[#161616]">
                  Today&apos;s Schedule
                </p>
              </div>
              <span className="text-[9px] bg-[#F5F6F8] font-bold px-1.5 py-0.5 rounded text-[#525866]">
                6 classes
              </span>
            </div>

            <div className="space-y-1.5 flex-1 overflow-hidden min-h-0">
              {MOCKUP_UPCOMING_LESSONS.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-1.5 rounded-lg border border-[#F0EFEA] bg-[#FAFAF9] flex items-center justify-between gap-1.5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-[#161616]">
                      <Clock className="size-2.5 text-[#8F94A0]" />
                      <span>{lesson.time}</span>
                    </div>
                    <div className="text-[10px] font-medium text-[#161616] truncate">
                      {lesson.title}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-white border border-[#EAE8E2] text-[#525866]">
                      {lesson.type}
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

export default DashboardScreen;

