"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bell, Download, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";
import { BrandMark } from "@/components/brand/PartnerMarks";

/*
 * Manage hero window with a scripted demo: an admin opens Attendance, exports the sheet,
 * switches to Schedule, picks a day, then sends a reminder to the batch. Loops.
 * Decorative only (aria-hidden on the parent). Static for reduced motion. Sample data only.
 */

const PEOPLE = [
  { n: "Priya Sharma", p: "/assets/img/home/testimonials/author-1.jpg", prog: 86, join: "17:58" },
  { n: "Lucas Martin", p: "/assets/img/home/testimonials/author-2.jpg", prog: 72, join: "18:01" },
  { n: "Amara Okafor", p: "/assets/img/home/testimonials/author-3.jpg", prog: 64, join: "18:03" },
  { n: "Kenji Tanaka", p: "/assets/img/home/testimonials/author-4.jpg", prog: 41, join: null },
  { n: "Sofia Rossi", p: "/assets/img/home/testimonials/author-5.jpg", prog: 93, join: "17:59" },
];

const TABS = ["Roster", "Attendance", "Schedule"] as const;
type Tab = (typeof TABS)[number];

const DAYS = [
  { d: "Mon", n: 10, has: true },
  { d: "Tue", n: 11, has: false },
  { d: "Wed", n: 12, has: true },
  { d: "Thu", n: 13, has: false },
  { d: "Fri", n: 14, has: true },
];

const CLASSES: Record<number, { t: string; time: string; who: string }[]> = {
  10: [{ t: "Linear equations", time: "18:00", who: "Daniel Reyes" }],
  12: [
    { t: "Quadratic equations", time: "18:00", who: "Daniel Reyes" },
    { t: "Doubt clearing", time: "19:15", who: "Mia Collins" },
  ],
  14: [{ t: "Weekly mock test review", time: "18:00", who: "Mia Collins" }],
};

export function ManageDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const exportRef = useRef<HTMLSpanElement>(null);
  const dayRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const remindRef = useRef<HTMLSpanElement>(null);

  const [tab, setTab] = useState<Tab>("Roster");
  const [day, setDay] = useState(10);
  const [toast, setToast] = useState<string | null>(null);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const moveTo = async (el: HTMLElement | null) => {
      const p = pointIn(boxRef.current, el);
      if (p) setCursor(p);
      await sleep(950);
    };
    const tap = async (el: HTMLElement | null) => {
      const p = pointIn(boxRef.current, el);
      setPressing(true);
      if (p) {
        setClick(p);
        setClickKey((k) => k + 1);
      }
      await sleep(180);
      setPressing(false);
      await sleep(220);
    };
    const step = async (el: HTMLElement | null, after: () => void, wait = 1200) => {
      await moveTo(el);
      if (!alive) return false;
      await tap(el);
      after();
      await sleep(wait);
      return alive;
    };

    const run = async () => {
      await sleep(1600);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.55, y: box.clientHeight * 0.85 });
      await sleep(600);
      while (alive) {
        if (!(await step(tabRefs.current.Attendance, () => setTab("Attendance"), 1300))) return;
        if (!(await step(exportRef.current, () => setToast("attendance-batch-b.csv downloaded"), 1600))) return;
        setToast(null);
        if (!(await step(tabRefs.current.Schedule, () => setTab("Schedule"), 1100))) return;
        if (!(await step(dayRefs.current[12], () => setDay(12), 1400))) return;
        if (!(await step(remindRef.current, () => setToast("Reminder sent to 24 learners"), 2000))) return;
        setToast(null);
        await sleep(400);
        setTab("Roster");
        setDay(10);
        await sleep(1400);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const present = PEOPLE.filter((p) => p.join).length;

  return (
    <div ref={boxRef} className="relative">
      {/* Batch header */}
      <div className="flex items-center gap-3 border-b border-[#F1F1F4] px-4 py-3.5 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-[#18181B]">Batch B · Algebra</p>
          <p className="truncate text-[11.5px] text-[#9A9AA6]">24 learners · Mon, Wed, Fri at 18:00 · Daniel Reyes</p>
        </div>
        <span
          ref={remindRef}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0A0A0B] px-3.5 py-1.5 text-[12px] font-semibold text-white"
        >
          <Bell className="h-3.5 w-3.5" /> Send reminder
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#F1F1F4] px-3 sm:px-4">
        {TABS.map((t) => (
          <span
            key={t}
            ref={(el) => {
              tabRefs.current[t] = el;
            }}
            className={cn(
              "relative px-3 py-2.5 text-[12.5px] font-semibold transition-colors duration-300",
              tab === t ? "text-[#18181B]" : "text-[#9A9AA6]"
            )}
          >
            {t}
            <span
              className={cn(
                "absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-[#0A0A0B] transition-opacity duration-300",
                tab === t ? "opacity-100" : "opacity-0"
              )}
            />
          </span>
        ))}
      </div>

      {/* Tab content (fixed height so the window never jumps) */}
      <div className="relative h-[330px] overflow-hidden sm:h-[300px]">
        {tab === "Roster" && (
          <div key="roster" className="mo-swap divide-y divide-[#F1F1F4] px-4 sm:px-5">
            <div className="grid grid-cols-[1fr_auto] gap-4 py-2.5 text-[11px] font-medium text-[#9A9AA6] sm:grid-cols-[1fr_160px_70px]">
              <span>Learner</span>
              <span className="hidden sm:block">Course progress</span>
              <span className="text-right">Last test</span>
            </div>
            {PEOPLE.map((p, i) => (
              <div key={p.n} className="grid grid-cols-[1fr_auto] items-center gap-4 py-2.5 sm:grid-cols-[1fr_160px_70px]">
                <span className="flex min-w-0 items-center gap-2.5">
                  <Image src={p.p} alt="" width={56} height={56} className="h-7 w-7 shrink-0 rounded-full object-cover object-top" />
                  <span className="truncate text-[12.5px] font-medium text-[#27272A]">{p.n}</span>
                </span>
                <span className="hidden items-center gap-2 sm:flex">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F4]">
                    <span className="block h-full rounded-full bg-[#0A0A0B]" style={{ width: `${p.prog}%` }} />
                  </span>
                  <span className="w-8 text-right text-[11px] tabular-nums text-[#71717A]">{p.prog}%</span>
                </span>
                <span className="text-right text-[12px] font-semibold tabular-nums text-[#18181B]">{[82, 76, 68, 54, 91][i]}%</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Attendance" && (
          <div key="attendance" className="mo-swap px-4 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <p className="text-[12px] text-[#52525B]">
                <span className="font-semibold text-[#18181B]">Today, 18:00</span> · logged automatically
              </p>
              <span
                ref={exportRef}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] px-3 py-1 text-[11.5px] font-semibold text-[#18181B]"
              >
                <Download className="h-3 w-3" /> Export sheet
              </span>
            </div>
            <div className="divide-y divide-[#F1F1F4]">
              {PEOPLE.map((p) => (
                <div key={p.n} className="flex items-center gap-2.5 py-2">
                  <Image src={p.p} alt="" width={56} height={56} className="h-7 w-7 shrink-0 rounded-full object-cover object-top" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-[#27272A]">{p.n}</span>
                  <span className="hidden text-[11px] tabular-nums text-[#9A9AA6] sm:inline">{p.join ? `Joined ${p.join}` : "Did not join"}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                      p.join ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#FDECEC] text-[#B91C1C]"
                    )}
                  >
                    {p.join ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
            </div>
            <p className="pt-2 text-[11px] text-[#9A9AA6]">{present} of 5 shown present · 23 of 24 in the batch</p>
          </div>
        )}

        {tab === "Schedule" && (
          <div key="schedule" className="mo-swap px-4 py-3 sm:px-5">
            <p className="text-[12px] font-semibold text-[#18181B]">March, week 2</p>
            <div className="mt-2.5 grid grid-cols-5 gap-1.5 sm:gap-2">
              {DAYS.map((x) => (
                <span
                  key={x.n}
                  ref={(el) => {
                    dayRefs.current[x.n] = el;
                  }}
                  className={cn(
                    "relative rounded-[12px] border py-2 text-center transition-colors duration-300",
                    day === x.n ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-[#EDEDF1] text-[#3F3F46]"
                  )}
                >
                  <span className="block text-[10.5px] opacity-70">{x.d}</span>
                  <span className="block text-[15px] font-semibold">{x.n}</span>
                  <span
                    className={cn(
                      "mx-auto mt-1 block h-1 w-1 rounded-full",
                      x.has ? (day === x.n ? "bg-white" : "bg-[#6C4BFF]") : "bg-transparent"
                    )}
                  />
                </span>
              ))}
            </div>
            <div key={day} className="mo-swap mt-3 space-y-2">
              {(CLASSES[day] || []).map((c) => (
                <div key={c.t} className="flex items-center gap-3 rounded-[12px] bg-[#F4F5F8] px-3 py-2.5">
                  <span className="w-11 shrink-0 text-[12px] font-semibold tabular-nums text-[#18181B]">{c.time}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{c.t}</p>
                    <p className="truncate text-[11px] text-[#9A9AA6]">{c.who} · Batch B</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#3F3F46]">
                    <BrandMark name="Zoom" size={12} className="rounded-[3px]" /> Zoom
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="mo-swap absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] py-2 pl-2.5 pr-4 text-[12px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]">
            <CircleCheck className="h-4 w-4 text-[#4ADE80]" />
            {toast}
          </div>
        )}
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Admin" />
    </div>
  );
}
