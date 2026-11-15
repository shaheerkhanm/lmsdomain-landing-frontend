import React from "react";
import {
  LayoutGrid,
  BookOpen,
  Users,
  Video,
  ClipboardCheck,
  CreditCard,
  Settings,
  Search,
  Bell,
  TrendingUp,
} from "lucide-react";

// Sample data only: a calm, light view of the admin dashboard for the hero.
const KPIS = [
  { label: "Active learners", value: "2,418", delta: "+12.4%" },
  { label: "Revenue this month", value: "$18,240", delta: "+9.1%" },
  { label: "Live classes this week", value: "14", delta: "6 today" },
  { label: "Average test score", value: "78%", delta: "+3 pts" },
];

const COURSES = [
  { name: "Python for Beginners", learners: 412, progress: 72, color: "#6C4BFF" },
  { name: "Grade 10 Mathematics", learners: 356, progress: 68, color: "#0A0A0B" },
  { name: "Business English", learners: 274, progress: 77, color: "#6C4BFF" },
  { name: "Digital Marketing Essentials", learners: 196, progress: 54, color: "#0A0A0B" },
];

const CLASSES = [
  { time: "09:00", title: "Algebra revision", batch: "Grade 10 · Batch A", live: false },
  { time: "13:30", title: "Presentation skills", batch: "Business English", live: true },
  { time: "19:00", title: "Loops and lists", batch: "Python · Batch B", live: false },
];

const NAV = [LayoutGrid, BookOpen, Users, Video, ClipboardCheck, CreditCard];

export function HeroProductShot() {
  return (
    <div className="relative mx-auto max-w-[1120px]" aria-hidden="true">
      <div className="rounded-[20px] border border-[#E4E4E7] bg-white p-1.5 shadow-[0_1px_2px_rgba(10,10,11,0.04),0_40px_80px_-32px_rgba(10,10,11,0.22)] sm:rounded-[24px] sm:p-2">
        <div className="overflow-hidden rounded-[14px] border border-[#ECECEF] bg-[#FAFAFA] sm:rounded-[18px]">
          {/* Top bar */}
          <div className="flex items-center gap-3 border-b border-[#ECECEF] bg-white px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="mx-auto hidden h-7 w-[320px] items-center gap-2 rounded-[8px] bg-[#F4F4F5] px-3 text-[12px] text-[#71717A] sm:flex">
              <Search className="h-3.5 w-3.5" />
              Search courses, learners, payments
            </div>
            <div className="ml-auto flex items-center gap-3 sm:ml-0">
              <Bell className="h-4 w-4 text-[#71717A]" />
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0A0A0B] text-[11px] font-semibold text-white">
                NA
              </span>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-[60px] shrink-0 flex-col items-center gap-2 border-r border-[#ECECEF] bg-white py-4 md:flex">
              {NAV.map((Icon, i) => (
                <span
                  key={i}
                  className={`grid h-9 w-9 place-items-center rounded-[10px] ${
                    i === 0 ? "bg-[#F4F4F5] text-[#0A0A0B]" : "text-[#A1A1AA]"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
              ))}
              <span className="mt-auto grid h-9 w-9 place-items-center text-[#A1A1AA]">
                <Settings className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
            </div>

            {/* Main */}
            <div className="min-w-0 flex-1 p-4 text-left sm:p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] text-[#71717A]">Northwind Academy</p>
                  <p className="font-urbanist text-[20px] font-semibold tracking-[-0.01em] text-[#0A0A0B]">Overview</p>
                </div>
                <span className="hidden rounded-[8px] border border-[#E4E4E7] bg-white px-2.5 py-1 text-[12px] text-[#52525B] sm:inline">
                  Last 30 days
                </span>
              </div>

              {/* KPIs */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4 sm:gap-3">
                {KPIS.map((k) => (
                  <div key={k.label} className="rounded-[12px] border border-[#ECECEF] bg-white p-3 sm:p-4">
                    <p className="text-[11.5px] text-[#71717A] sm:text-[12px]">{k.label}</p>
                    <p className="mt-1 font-urbanist text-[20px] font-semibold tracking-[-0.02em] text-[#0A0A0B] sm:text-[24px]">
                      {k.value}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11.5px] font-medium text-[#16A34A]">
                      <TrendingUp className="h-3 w-3" />
                      {k.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
                {/* Courses */}
                <div className="rounded-[12px] border border-[#ECECEF] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-[#0A0A0B]">Top courses</p>
                    <p className="text-[12px] text-[#71717A]">Completion</p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {COURSES.map((c, idx) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-medium text-[#27272A]">{c.name}</p>
                          <p className="text-[11px] text-[#A1A1AA]">{c.learners} learners</p>
                        </div>
                        <div className="hidden h-1.5 w-[120px] overflow-hidden rounded-full bg-[#F4F4F5] sm:block">
                          <div
                            className="v5-grow h-full rounded-full"
                            style={{ width: `${c.progress}%`, background: c.color, "--d": `${1300 + idx * 120}ms` } as React.CSSProperties}
                          />
                        </div>
                        <p className="w-9 text-right text-[12px] font-medium tabular-nums text-[#52525B]">{c.progress}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's classes */}
                <div className="hidden rounded-[12px] border border-[#ECECEF] bg-white p-4 lg:block">
                  <p className="text-[13px] font-semibold text-[#0A0A0B]">Today&apos;s live classes</p>
                  <div className="mt-3 space-y-2">
                    {CLASSES.map((c) => (
                      <div
                        key={c.time}
                        className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 ${
                          c.live ? "bg-[#F5F3FF]" : "bg-[#FAFAFA]"
                        }`}
                      >
                        <p className="w-11 text-[12px] font-medium tabular-nums text-[#52525B]">{c.time}</p>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12.5px] font-medium text-[#27272A]">{c.title}</p>
                          <p className="text-[11px] text-[#A1A1AA]">{c.batch}</p>
                        </div>
                        {c.live ? (
                          <span className="rounded-full bg-[#6C4BFF] px-2 py-0.5 text-[10.5px] font-semibold text-white">Live</span>
                        ) : (
                          <span className="text-[11px] text-[#A1A1AA]">Zoom</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
