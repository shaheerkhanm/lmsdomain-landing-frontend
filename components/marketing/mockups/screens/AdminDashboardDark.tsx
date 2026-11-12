"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Sparkles,
  Folder,
  BookOpen,
  GraduationCap,
  CalendarDays,
  FileText,
  Notebook,
  HelpCircle,
  UserCheck,
  Share2,
  BarChart3,
  Award,
  Trophy,
  Bell,
  ExternalLink,
  Users,
  IndianRupee,
  Video,
  Clock,
} from "lucide-react";

export interface AdminDashboardDarkProps {
  adminName?: string;
  academyName?: string;
  kpis?: {
    students: string;
    studentsChange: string;
    enrollments: string;
    enrollmentsChange: string;
    revenue: string;
    revenueChange: string;
    classesToday: string;
    classesNext: string;
    waitingReview: string;
    waitingDesc: string;
  };
  completionData?: Array<{
    course: string;
    students: number;
    lessons: number;
    completion: number;
  }>;
  needsAttention?: Array<{
    label: string;
    count: number;
  }>;
  domieBrief?: string[];
  upcomingLessons?: Array<{
    time: string;
    title: string;
  }>;
}

export function AdminDashboardDark({
  adminName = "Admin",
  academyName = "Your Academy",
  kpis = {
    students: "2,148",
    studentsChange: "▲ 18.4% (184)",
    enrollments: "326",
    enrollmentsChange: "▲ 24.6% (64)",
    revenue: "₹4,86,200",
    revenueChange: "▲ 31.2%",
    classesToday: "6",
    classesNext: "Next: Batch B at 7:00 PM",
    waitingReview: "4",
    waitingDesc: "Approvals, payments and posts",
  },
  completionData = [
    { course: "Full-Stack Web Engineering", students: 186, lessons: 40, completion: 82 },
    { course: "IELTS Academic Writing", students: 242, lessons: 18, completion: 76 },
    { course: "Frontend React", students: 128, lessons: 24, completion: 71 },
    { course: "Spoken English Batch C", students: 94, lessons: 30, completion: 64 },
  ],
  needsAttention = [
    { label: "Applications to review", count: 2 },
    { label: "Offline payments to approve", count: 2 },
  ],
  domieBrief = [
    "✦ Enrolments are up 24.6%. Batch B is almost full, so open Batch C for next month.",
    "✦ WELCOME10 brought 38 sales this month and expires Friday. Extend it to keep the momentum.",
    "✦ Full-Stack Web Engineering learners are 82% through. Schedule the final live class.",
  ],
  upcomingLessons = [
    { time: "10:00", title: "Frontend React · Batch A" },
    { time: "19:00", title: "Architecture Blueprint · Batch B" },
  ],
}: AdminDashboardDarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && contentRef.current) {
        const clientW = containerRef.current.clientWidth;
        if (clientW > 0) {
          const s = clientW / 1200;
          setScale(s);
          setHeight(contentRef.current.offsetHeight * s);
        }
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-t-[10px]"
      style={{ height: height ? `${height}px` : "auto" }}
    >
      <div
        ref={contentRef}
        style={{
          width: "1200px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="grid grid-cols-[56px_1fr] bg-[#121214] text-[#ECECF1] text-[13px] leading-[1.45] font-sans text-left select-none"
      >
        {/* Left Icon Rail */}
        <aside className="border-r border-[#232327] flex flex-col items-center gap-3 py-4">
          <div className="w-[30px] h-[30px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#8FA8FF,#5B3DF5_60%,#2A1A80)] shadow-[0_0_0_3px_rgba(108,75,255,0.25)] flex items-center justify-center font-urbanist text-white font-bold text-xs shrink-0">
            L
          </div>
          {/* Active LayoutGrid in #26262B tile */}
          <span className="w-[32px] h-[32px] rounded-[8px] bg-[#26262B] border border-[#3E3E47] flex items-center justify-center text-[#ECECF1] shrink-0">
            <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          {/* Sparkles (violet) */}
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#8B6CFF] hover:text-[#A78BFA] transition-colors shrink-0" title="Domie AI">
            <Sparkles className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <hr className="w-6 border-0 border-t border-[#2A2A30] my-0.5" />
          {/* Main nav items */}
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Files">
            <Folder className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Courses">
            <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Batches">
            <GraduationCap className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Schedule">
            <CalendarDays className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Assessments">
            <FileText className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Notes">
            <Notebook className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Help">
            <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <hr className="w-6 border-0 border-t border-[#2A2A30] my-0.5" />
          {/* Secondary nav items */}
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Users">
            <UserCheck className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Marketing">
            <Share2 className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Analytics">
            <BarChart3 className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Certificates">
            <Award className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
          <span className="w-[28px] h-[28px] flex items-center justify-center text-[#9A9AA6] hover:text-[#ECECF1] transition-colors shrink-0" title="Gamification">
            <Trophy className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </span>
        </aside>

        {/* Main Content Area */}
        <div className="p-4 sm:p-[22px]">
          {/* Top Bar */}
          <div className="flex items-center gap-2.5 pb-3">
            <div className="mr-auto">
              <small className="block text-[#8C8C98] text-[11px]">
                Admin › Dashboard
              </small>
              <b className="text-[18px] tracking-[-0.02em] text-white">
                Dashboard
              </b>
            </div>

            {/* Search ⌘K */}
            <span className="bg-[#1A1A1E] border border-[#26262B] rounded-[8px] px-2.5 py-1 text-[12px] text-[#7A7A88] flex items-center gap-2">
              Search…
              <em className="not-italic text-[10px] bg-[#26262D] px-1 py-0.5 rounded text-[#9999A8]">
                ⌘K
              </em>
            </span>

            {/* Glowing Ask Domie ✦ */}
            <span className="bg-[#6C4BFF] text-white rounded-[9px] px-3 py-1 font-semibold text-[12px] flex items-center gap-1.5 shadow-[0_0_16px_rgba(108,75,255,0.6)]">
              <span className="w-4 h-4 rounded-full overflow-hidden shrink-0 relative">
                <Image
                  src="/images/ai/domie/domie-bot-sm.webp"
                  alt="Domie"
                  width={16}
                  height={16}
                  className="w-full h-full object-cover"
                />
              </span>
              Ask Domie ✦
            </span>

            {/* Bell */}
            <span className="w-7 h-7 rounded-[7px] border border-[#25252B] flex items-center justify-center text-[#9A9AA6] hover:text-white transition-colors shrink-0">
              <Bell className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>

            {/* View Site */}
            <span className="border border-[#25252B] rounded-[7px] px-2.5 py-1 text-xs text-[#B4B4C0] flex items-center gap-1.5 hover:text-white transition-colors shrink-0">
              <ExternalLink className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
              <span>View site</span>
            </span>

            {/* User Menu */}
            <span className="flex items-center gap-2 pl-2 border-l border-[#25252B]">
              <i className="w-6 h-6 rounded-full bg-[#34343D] not-italic block" />
              <span className="text-xs">
                {adminName}
                <small className="block text-[10.5px] text-[#8C8C98]">
                  {academyName}
                </small>
              </span>
            </span>
          </div>

          {/* Heading */}
          <h4 className="text-[16px] font-bold text-white mt-1">
            Welcome back, {adminName}
          </h4>
          <p className="text-[#8C8C98] text-[12.5px] mb-3">
            Courses, students and revenue at a glance. Figures use the Asia/Kolkata time zone.
          </p>

          {/* 5 KPI Cards */}
          <div className="grid grid-cols-5 gap-2.5 my-3.5">
            {/* KPI 1: Students */}
            <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3 px-3.5">
              <small className="text-[#B4B4C0] text-[12px] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
                <span>Students</span>
              </small>
              <b className="block text-[24px] tracking-[-0.03em] text-white my-1">
                {kpis.students}
              </b>
              <span className="text-[#8C8C98] text-[11.5px]">
                <em className="not-italic text-[11px] rounded-[6px] px-1.5 py-0.5 mr-1 bg-[#3DD68C]/14 text-[#5BE0A0]">
                  {kpis.studentsChange}
                </em>
                new vs last month
              </span>
            </div>

            {/* KPI 2: Enrollments */}
            <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3 px-3.5">
              <small className="text-[#B4B4C0] text-[12px] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
                <span>Enrollments this month</span>
              </small>
              <b className="block text-[24px] tracking-[-0.03em] text-white my-1">
                {kpis.enrollments}
              </b>
              <span className="text-[#8C8C98] text-[11.5px]">
                <em className="not-italic text-[11px] rounded-[6px] px-1.5 py-0.5 mr-1 bg-[#3DD68C]/14 text-[#5BE0A0]">
                  {kpis.enrollmentsChange}
                </em>
                vs last month
              </span>
            </div>

            {/* KPI 3: Revenue */}
            <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3 px-3.5">
              <small className="text-[#B4B4C0] text-[12px] flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
                <span>Revenue this month</span>
              </small>
              <b className="block text-[24px] tracking-[-0.03em] text-white my-1">
                {kpis.revenue}
              </b>
              <span className="text-[#8C8C98] text-[11.5px]">
                <em className="not-italic text-[11px] rounded-[6px] px-1.5 py-0.5 mr-1 bg-[#3DD68C]/14 text-[#5BE0A0]">
                  {kpis.revenueChange}
                </em>
                vs last month
              </span>
            </div>

            {/* KPI 4: Classes today */}
            <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3 px-3.5">
              <small className="text-[#B4B4C0] text-[12px] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
                <span>Classes today</span>
              </small>
              <b className="block text-[24px] tracking-[-0.03em] text-white my-1">
                {kpis.classesToday}
              </b>
              <span className="text-[#8C8C98] text-[11.5px]">
                {kpis.classesNext}
              </span>
            </div>

            {/* KPI 5: Waiting for review */}
            <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3 px-3.5">
              <small className="text-[#B4B4C0] text-[12px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#9A9AA6]" strokeWidth={1.75} />
                <span>Waiting for review</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2894A] ml-auto" />
              </small>
              <b className="block text-[24px] tracking-[-0.03em] text-white my-1">
                {kpis.waitingReview}
              </b>
              <span className="text-[#8C8C98] text-[11.5px]">
                {kpis.waitingDesc}
              </span>
            </div>
          </div>

          {/* Grid: 2 Columns */}
          <div className="grid grid-cols-[1.75fr_1fr] gap-3 mt-3">
            {/* Left Column */}
            <div className="grid gap-3 content-start">
              {/* Card 1: Revenue over time */}
              <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3.5 px-4">
                <div className="flex justify-between items-start gap-2.5 mb-2.5">
                  <div>
                    <b className="text-[14px] block text-white">Revenue over time</b>
                    <small className="text-[#8C8C98] text-[11.5px]">Per month, last 12 months</small>
                  </div>
                  <span className="bg-[#3DD68C]/14 text-[#5BE0A0] rounded-[7px] px-2 py-0.5 text-[11px] whitespace-nowrap">
                    ▲ 31.2% this month
                  </span>
                </div>

                <div className="relative h-[190px]">
                  <svg viewBox="0 0 700 200" preserveAspectRatio="none" className="w-full h-[160px] block">
                    <defs>
                      <linearGradient id="admin-dark-rg" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#8B6CFF" stopOpacity="0.55" />
                        <stop offset="1" stopColor="#8B6CFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="rgba(255,255,255,0.07)">
                      <path d="M0 50H700M0 100H700M0 150H700" />
                    </g>
                    <path
                      d="M0,156 L64,145 L127,149 L191,131 L255,120 L318,123 L382,101 L445,90 L509,79 L573,65 L636,50 L700,22 L700,200 L0,200 Z"
                      fill="url(#admin-dark-rg)"
                    />
                    <path
                      className="animate-chart-draw"
                      d="M0,156 L64,145 L127,149 L191,131 L255,120 L318,123 L382,101 L445,90 L509,79 L573,65 L636,50 L700,22"
                      fill="none"
                      stroke="#A48BFF"
                      strokeWidth="2.5"
                      strokeDasharray="1400"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <span className="absolute right-0 -top-1 bg-[#ECECF1] text-[#121214] font-semibold text-[11px] rounded-[7px] px-2 py-0.5">
                    Nov · ₹4,86,200
                  </span>
                  <div className="flex justify-between text-[#6C6C78] text-[10.5px] mt-2">
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Course completion */}
              <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3.5 px-4">
                <div className="flex justify-between items-start gap-2.5 mb-2.5">
                  <div>
                    <b className="text-[14px] block text-white">Course completion</b>
                    <small className="text-[#8C8C98] text-[11.5px]">Average progress of enrolled students</small>
                  </div>
                  <span className="border border-[#2A2A30] rounded-[8px] px-2.5 py-0.5 text-[12px] text-[#ECECF1]">
                    View all
                  </span>
                </div>

                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr className="border-b border-[#25252B] text-[#7C7C88] font-medium text-[10.5px] tracking-[0.08em] uppercase">
                      <th className="text-left py-1.5">Course</th>
                      <th className="text-left py-1.5">Students</th>
                      <th className="text-left py-1.5">Lessons</th>
                      <th className="text-right py-1.5">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completionData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx === completionData.length - 1 ? "" : "border-b border-[#1F1F24]"}
                      >
                        <td className="py-2 text-white font-medium">{row.course}</td>
                        <td className="py-2 text-[#8C8C98]">{row.students}</td>
                        <td className="py-2 text-[#8C8C98]">{row.lessons}</td>
                        <td className="py-2 text-right">
                          <span className="inline-flex items-center gap-2.5 justify-end">
                            <span className="w-[120px] h-[5px] rounded-[9px] bg-[#2A2A30] overflow-hidden inline-block">
                              <span
                                className="h-full bg-gradient-to-r from-[#7B5CFF] to-[#A48BFF] block"
                                style={{ width: `${row.completion}%` }}
                              />
                            </span>
                            <span className="text-white font-semibold text-[11.5px] w-8">
                              {row.completion}%
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="grid gap-3 content-start">
              {/* Card 1: Needs your attention */}
              <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3.5 px-4">
                <div className="flex justify-between items-start gap-2.5 mb-2.5">
                  <div>
                    <b className="text-[14px] block text-white">Needs your attention</b>
                    <small className="text-[#8C8C98] text-[11.5px]">Waiting on you right now</small>
                  </div>
                  <span className="bg-[#F3C9A9] text-[#5A2A0B] rounded-[7px] px-2 py-0.5 font-bold text-[12px]">
                    4
                  </span>
                </div>
                {needsAttention.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-t border-[#222227] text-[12.5px]"
                  >
                    <span className="text-[#ECECF1]">{item.label}</span>
                    <em className="not-italic bg-[#F3C9A9] text-[#5A2A0B] rounded-[6px] px-2 py-0.5 font-bold text-[11.5px]">
                      {item.count}
                    </em>
                  </div>
                ))}
              </div>

              {/* Card 2: Domie's brief for today */}
              <div className="border border-[#5B47C9] bg-gradient-to-b from-[#1A1630] to-[#16141F] shadow-[0_0_0_1px_rgba(123,92,255,0.25)] rounded-[14px] p-3.5 px-4">
                <div className="flex justify-between items-start gap-2.5 mb-2">
                  <div>
                    <b className="text-[14px] block text-white">✦ Domie&apos;s brief for today</b>
                    <small className="text-[#8C8C98] text-[11.5px]">Written by Domie AI from your activity</small>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {domieBrief.map((text, idx) => (
                    <p
                      key={idx}
                      className="bg-[#241E40] rounded-[9px] p-2 px-2.5 text-[12px] text-[#DCD6FF] leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card 3: Upcoming lessons */}
              <div className="border border-[#25252B] bg-[#17171A] rounded-[14px] p-3.5 px-4">
                <div className="flex justify-between items-start gap-2.5 mb-2">
                  <div>
                    <b className="text-[14px] block text-white">Upcoming lessons</b>
                    <small className="text-[#8C8C98] text-[11.5px]">Today, Wed 11 Nov</small>
                  </div>
                </div>
                {upcomingLessons.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 border-t border-[#222227] text-[12.5px]"
                  >
                    <em className="not-italic font-mono-code text-[11px] bg-[#232328] rounded-[6px] px-1.5 py-0.5 text-[#B4B4C0]">
                      {item.time}
                    </em>
                    <span className="text-[#ECECF1]">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardDark;
