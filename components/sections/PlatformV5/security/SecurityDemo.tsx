"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Laptop, Minus, Pause, Plus, Smartphone, Tablet, X, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";

/*
 * Security hero window with a scripted demo: an admin turns on the video watermark,
 * lowers the device limit (the oldest session signs out), then changes a team member's
 * role to Instructor. Loops. Decorative only. Static for reduced motion. Sample data only.
 */

const TABS = ["Content protection", "Devices", "Team roles"] as const;
type Tab = (typeof TABS)[number];

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-300", on ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")}>
      <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-[left] duration-300", on ? "left-[18px]" : "left-0.5")} />
    </span>
  );
}

export function SecurityDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const wmRef = useRef<HTMLSpanElement>(null);
  const minusRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const instrRef = useRef<HTMLSpanElement>(null);

  const [tab, setTab] = useState<Tab>("Content protection");
  const [wm, setWm] = useState(false);
  const [limit, setLimit] = useState(3);
  const [menu, setMenu] = useState(false);
  const [role, setRole] = useState<"Admin" | "Instructor">("Admin");
  const [toast, setToast] = useState<string | null>(null);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWm(true);
      return;
    }
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
      if (box) setCursor({ x: box.clientWidth * 0.3, y: box.clientHeight * 0.85 });
      await sleep(600);
      while (alive) {
        if (!(await step(wmRef.current, () => setWm(true), 2200))) return;
        if (!(await step(tabRefs.current.Devices, () => setTab("Devices"), 1000))) return;
        if (!(await step(minusRef.current, () => {
          setLimit(2);
          setToast("Oldest session signed out");
        }, 1800))) return;
        setToast(null);
        if (!(await step(tabRefs.current["Team roles"], () => setTab("Team roles"), 1000))) return;
        if (!(await step(roleRef.current, () => setMenu(true), 700))) return;
        if (!(await step(instrRef.current, () => {
          setRole("Instructor");
          setMenu(false);
          setToast("Daniel is now an Instructor");
        }, 2200))) return;
        setToast(null);
        await sleep(400);
        setTab("Content protection");
        setWm(false);
        setLimit(3);
        setRole("Admin");
        await sleep(1200);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const devices = [
    { i: Laptop, t: "MacBook · Chrome", m: "Active now" },
    { i: Smartphone, t: "iPhone · Safari", m: "Active 2 h ago" },
    { i: Tablet, t: "iPad · Safari", m: "Active 6 days ago" },
  ];

  return (
    <div ref={boxRef} className="relative">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">Settings · Security</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-hidden border-b border-[#F1F1F4] px-3 sm:px-4">
        {TABS.map((t) => (
          <span
            key={t}
            ref={(el) => {
              tabRefs.current[t] = el;
            }}
            className={cn(
              "relative shrink-0 whitespace-nowrap px-3 py-2.5 text-[12.5px] font-semibold transition-colors duration-300",
              tab === t ? "text-[#18181B]" : "text-[#9A9AA6]"
            )}
          >
            {t}
            <span className={cn("absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-[#0A0A0B] transition-opacity duration-300", tab === t ? "opacity-100" : "opacity-0")} />
          </span>
        ))}
      </div>

      <div className="relative h-[460px] overflow-hidden md:h-[340px]">
        {tab === "Content protection" && (
          <div key="content" className="mo-swap grid h-full md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-2 border-b border-[#F1F1F4] p-4 sm:p-5 md:border-b-0 md:border-r">
              <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EDEDF1] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#18181B]">Video watermark</p>
                  <p className="truncate text-[11px] text-[#9A9AA6]">Learner&apos;s email and ID on every video</p>
                </div>
                <span ref={wmRef}>
                  <Toggle on={wm} />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EDEDF1] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#18181B]">Time-limited playback</p>
                  <p className="truncate text-[11px] text-[#9A9AA6]">Video links expire automatically</p>
                </div>
                <Toggle on />
              </div>
              <div className="hidden items-center justify-between gap-3 rounded-[12px] border border-[#EDEDF1] px-3 py-2.5 sm:flex">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#18181B]">HTTPS on your domain</p>
                  <p className="truncate text-[11px] text-[#9A9AA6]">Managed for you</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F7EF] px-2 py-0.5 text-[10.5px] font-semibold text-[#15803D]">
                  <Check className="h-3 w-3" strokeWidth={3} /> On
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-medium text-[#9A9AA6]">Learner view · Lesson 3.2</p>
              <div className="relative mt-2 aspect-video overflow-hidden rounded-[12px] bg-[#16141F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,#3A3550,transparent_65%)]" />
                <div className="absolute left-4 top-4 font-mono text-[11px] leading-[1.7] text-white/80">
                  <p>
                    <span className="text-[#93C5FD]">for</span> i <span className="text-[#93C5FD]">in</span> range(5):
                  </p>
                  <p className="pl-4">print(i)</p>
                </div>
                {wm && (
                  <span className="mo-wm mo-swap absolute whitespace-nowrap rounded-[4px] bg-black/25 px-1.5 py-0.5 font-mono text-[9px] text-white/70 sm:text-[10.5px]">
                    priya.sharma@mail.com · ID 20481
                  </span>
                )}
                <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-white/80">
                  <Pause className="h-3 w-3 fill-current" />
                  <div className="h-1 flex-1 rounded-full bg-white/25">
                    <div className="mo-progress h-full w-[40%] rounded-full bg-white" />
                  </div>
                </div>
              </div>
              <p className={cn("mt-2.5 text-[11px] transition-colors", wm ? "font-medium text-[#15803D]" : "text-[#9A9AA6]")}>
                {wm ? "Watermark on. Screen recordings show who shared them." : "Watermark off"}
              </p>
            </div>
          </div>
        )}

        {tab === "Devices" && (
          <div key="devices" className="mo-swap p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EDEDF1] px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-[#18181B]">Devices per learner</p>
                <p className="text-[11px] text-[#9A9AA6]">Stops one account being shared by many people</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span ref={minusRef} className="grid h-7 w-7 place-items-center rounded-full border border-[#E4E4E7] text-[#18181B]">
                  <Minus className="h-3.5 w-3.5" />
                </span>
                <span key={limit} className="mo-swap w-6 text-center font-urbanist text-[18px] font-semibold tabular-nums text-[#18181B]">
                  {limit}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-[#E4E4E7] text-[#18181B]">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <Image src="/assets/img/home/testimonials/author-4.jpg" alt="" width={56} height={56} className="h-7 w-7 rounded-full object-cover object-top" />
              <p className="text-[12px] font-semibold text-[#18181B]">Kenji Tanaka&apos;s devices</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {devices.map((d, i) => {
                const out = i >= limit;
                return (
                  <div
                    key={d.t}
                    className={cn(
                      "flex items-center gap-3 rounded-[11px] px-3 py-2 transition-colors duration-500",
                      out ? "bg-[#FDECEC]" : "bg-[#F8F8FA]"
                    )}
                  >
                    <d.i className={cn("h-4 w-4", out ? "text-[#B91C1C]" : "text-[#52525B]")} />
                    <span className={cn("flex-1 truncate text-[12px] font-medium", out ? "text-[#B91C1C] line-through" : "text-[#27272A]")}>{d.t}</span>
                    <span className={cn("text-[11px]", out ? "font-semibold text-[#B91C1C]" : "text-[#9A9AA6]")}>{out ? "Signed out" : d.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "Team roles" && (
          <div key="roles" className="mo-swap p-4 sm:p-5">
            <div className="divide-y divide-[#F1F1F4] rounded-[12px] border border-[#EDEDF1]">
              {[
                { n: "Sarah Lee", p: "/assets/img/home/testimonials/author-5.jpg", r: "Owner", fixed: true },
                { n: "Daniel Reyes", p: "/assets/img/home/participant_alex.jpg", r: role, fixed: false },
                { n: "Mia Collins", p: "/assets/img/home/participant_mia.jpg", r: "Instructor", fixed: true },
              ].map((m) => (
                <div key={m.n} className="relative flex items-center gap-3 px-3 py-2.5">
                  <Image src={m.p} alt="" width={56} height={56} className="h-7 w-7 rounded-full object-cover object-top" />
                  <span className="flex-1 truncate text-[12.5px] font-medium text-[#27272A]">{m.n}</span>
                  {m.fixed ? (
                    <span className="rounded-full bg-[#F4F5F8] px-2.5 py-1 text-[11px] font-semibold text-[#3F3F46]">{m.r}</span>
                  ) : (
                    <span ref={roleRef} className="inline-flex items-center gap-1 rounded-full border border-[#E4E4E7] px-2.5 py-1 text-[11px] font-semibold text-[#18181B]">
                      <span key={m.r} className="mo-swap">{m.r}</span> <ChevronDown className="h-3 w-3" />
                    </span>
                  )}
                  {!m.fixed && menu && (
                    <div className="mo-swap absolute right-3 top-[42px] z-10 w-[150px] rounded-[12px] border border-[#ECECF1] bg-white p-1 shadow-[0_16px_32px_-12px_rgba(16,16,24,0.3)]">
                      {["Admin", "Instructor"].map((r) => (
                        <span
                          key={r}
                          ref={r === "Instructor" ? instrRef : undefined}
                          className={cn("flex items-center justify-between rounded-[8px] px-2.5 py-1.5 text-[12px]", r === role ? "bg-[#F4F5F8] font-semibold" : "text-[#3F3F46]")}
                        >
                          {r} {r === role && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
              {[
                { t: "Assigned batches", ok: true },
                { t: "Course materials", ok: true },
                { t: "Grade tests", ok: true },
                { t: "Revenue reports", ok: role === "Admin" },
              ].map((p) => (
                <p
                  key={p.t}
                  className={cn("flex items-center gap-1.5 rounded-[9px] px-2.5 py-1.5 transition-colors duration-500", p.ok ? "bg-[#F8F8FA] text-[#27272A]" : "bg-[#FDECEC] text-[#B91C1C]")}
                >
                  {p.ok ? <Check className="h-3 w-3 text-[#16A34A]" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
                  {p.t}
                </p>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] text-[#9A9AA6]">What Daniel can access</p>
          </div>
        )}

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
