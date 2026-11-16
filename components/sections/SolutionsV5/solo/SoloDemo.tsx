"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownLeft, BookOpen, CalendarCheck, FileText, Users, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../../PlatformV5/DemoCursor";
import { BrandMark } from "@/components/brand/PartnerMarks";

/*
 * Solo educator hero: a creator's dashboard for one week.
 * Scripted demo: a course sale arrives (earnings count up), open Bookings and a 1:1 slot
 * gets booked and paid, open Payouts. Loops. Static for reduced motion. Sample data only.
 */

const TABS = ["Sales", "Bookings", "Payouts"] as const;
type Tab = (typeof TABS)[number];

const BASE_SALES = [
  { t: "Data cleaning masterclass", m: "Live workshop · Amara", a: 120, i: Video },
  { t: "Excel formulas guide", m: "Ebook · Kenji", a: 12, i: FileText },
  { t: "Python for Beginners", m: "Course · Priya", a: 59, i: BookOpen },
];
const NEW_SALE = { t: "Python for Beginners", m: "Course · Lucas, just now", a: 59, i: BookOpen };

const SLOTS = [
  { d: "Thu", t: "11:30", who: "Sofia" },
  { d: "Thu", t: "15:00", who: null as string | null },
  { d: "Fri", t: "09:00", who: null as string | null },
  { d: "Fri", t: "17:30", who: "Lucas" },
];

const START = 1387;

export function SoloDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const [tab, setTab] = useState<Tab>("Sales");
  const [sold, setSold] = useState(false);
  const [booked, setBooked] = useState(false);
  const [earn, setEarn] = useState(START);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSold(true);
      setEarn(START + 59);
      return;
    }
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const countTo = async (from: number, to: number) => {
      const steps = 18;
      for (let i = 1; i <= steps && alive; i++) {
        setEarn(Math.round(from + ((to - from) * i) / steps));
        await sleep(40);
      }
    };
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

    const run = async () => {
      await sleep(1500);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.75, y: box.clientHeight * 0.88 });
      while (alive) {
        // a sale arrives on its own
        await sleep(900);
        setSold(true);
        await countTo(START, START + 59);
        await sleep(1400);

        await moveTo(tabRefs.current.Bookings);
        if (!alive) return;
        await tap(tabRefs.current.Bookings);
        setTab("Bookings");
        await sleep(1100);
        setBooked(true);
        await countTo(START + 59, START + 99);
        await sleep(1600);

        await moveTo(tabRefs.current.Payouts);
        if (!alive) return;
        await tap(tabRefs.current.Payouts);
        setTab("Payouts");
        await sleep(2600);

        await moveTo(tabRefs.current.Sales);
        if (!alive) return;
        await tap(tabRefs.current.Sales);
        setTab("Sales");
        setSold(false);
        setBooked(false);
        setEarn(START);
        await sleep(600);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const sales = sold ? [NEW_SALE, ...BASE_SALES] : BASE_SALES;

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">learn.miacollins.com · Dashboard</span>
      </div>

      <div className="grid md:grid-cols-[250px_1fr]">
        {/* Earnings + offers */}
        <div className="border-b border-[#F1F1F4] p-4 sm:p-5 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/img/home/participant_mia.jpg" alt="" width={72} height={72} className="h-9 w-9 rounded-full object-cover object-top" />
            <div>
              <p className="text-[13px] font-semibold text-[#18181B]">Mia Collins</p>
              <p className="text-[11px] text-[#9A9AA6]">Data and Excel tutor</p>
            </div>
          </div>
          <div className="mt-4 rounded-[14px] bg-[#0A0A0B] p-3.5 text-white">
            <p className="text-[11px] text-white/60">This week</p>
            <p className="font-urbanist text-[28px] font-semibold leading-tight tabular-nums">${earn.toLocaleString("en-US")}</p>
            <p className="mt-0.5 text-[10.5px] text-white/60">Paid to you · 0% commission</p>
          </div>
          <div className="mt-3 hidden grid-cols-2 gap-1.5 md:grid">
            {[
              { i: BookOpen, t: "3 courses" },
              { i: Video, t: "Workshops" },
              { i: Users, t: "1:1 sessions" },
              { i: FileText, t: "2 ebooks" },
            ].map((o) => (
              <span key={o.t} className="flex items-center gap-1.5 rounded-[9px] bg-[#F8F8FA] px-2 py-1.5 text-[11px] font-medium text-[#3F3F46]">
                <o.i className="h-3.5 w-3.5 text-[#71717A]" /> {o.t}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="min-w-0">
          <div className="flex gap-1 border-b border-[#F1F1F4] px-3 sm:px-4">
            {TABS.map((t) => (
              <span
                key={t}
                ref={(el) => {
                  tabRefs.current[t] = el;
                }}
                className={cn("relative px-3 py-2.5 text-[12.5px] font-semibold transition-colors duration-300", tab === t ? "text-[#18181B]" : "text-[#9A9AA6]")}
              >
                {t}
                <span className={cn("absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-[#0A0A0B] transition-opacity", tab === t ? "opacity-100" : "opacity-0")} />
              </span>
            ))}
          </div>

          <div className="relative h-[316px] overflow-hidden p-4 sm:p-5">
            {tab === "Sales" && (
              <div key="sales" className="mo-swap space-y-2">
                {sales.map((r, i) => (
                  <div
                    key={r.m}
                    className={cn(
                      "flex items-center gap-3 rounded-[12px] border px-3 py-2.5 transition-colors",
                      sold && i === 0 ? "mo-swap mo-glow border-[#C4B5FD] bg-[#FAF8FF]" : "border-[#F1F1F4]"
                    )}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
                      <ArrowDownLeft className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{r.t}</p>
                      <p className="flex items-center gap-1 truncate text-[11px] text-[#9A9AA6]">
                        <r.i className="h-3 w-3 shrink-0" /> {r.m}
                      </p>
                    </div>
                    <span className="text-[13px] font-semibold tabular-nums text-[#18181B]">+${r.a}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "Bookings" && (
              <div key="bookings" className="mo-swap">
                <p className="text-[12px] font-semibold text-[#18181B]">1:1 sessions · 45 min · $40</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {SLOTS.map((sl, i) => {
                    const justBooked = booked && i === 1;
                    const who = justBooked ? "Kenji" : sl.who;
                    return (
                      <div
                        key={sl.d + sl.t}
                        className={cn(
                          "rounded-[12px] border p-3 transition-colors duration-500",
                          who ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-dashed border-[#D4D4D8] text-[#3F3F46]",
                          justBooked && "mo-swap"
                        )}
                      >
                        <p className={cn("text-[11px]", who ? "text-white/60" : "text-[#9A9AA6]")}>
                          {sl.d} · {sl.t}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] font-semibold">
                          {who ? (
                            <>
                              <CalendarCheck className="h-3.5 w-3.5" /> {who} · Paid
                            </>
                          ) : (
                            "Open"
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className={cn("mt-3 text-[11.5px] transition-colors", booked ? "font-medium text-[#15803D]" : "text-[#9A9AA6]")}>
                  {booked ? "Kenji booked Thu 15:00 and paid $40" : "Learners pick an open time and pay upfront"}
                </p>
              </div>
            )}

            {tab === "Payouts" && (
              <div key="payouts" className="mo-swap">
                <div className="rounded-[14px] border border-[#ECECF1] p-4">
                  <p className="inline-flex items-center gap-1.5 text-[11px] text-[#9A9AA6]"><BrandMark name="Stripe" size={12} className="rounded-[3px]" /> Paid to your Stripe account</p>
                  <p className="font-urbanist text-[30px] font-semibold tabular-nums text-[#15803D]">+${earn.toLocaleString("en-US")}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#F1EDFF] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#6C4BFF]">0% commission</span>
                    <span className="rounded-full bg-[#F4F5F8] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#52525B]">Direct to you</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  {[
                    ["Courses", "$708"],
                    ["Live workshops", "$480"],
                    ["1:1 sessions", "$240"],
                    ["Ebooks", `$${earn - 1428}`],
                  ].map(([k, v]) => (
                    <p key={k} className="flex justify-between rounded-[9px] bg-[#F8F8FA] px-3 py-1.5 text-[11.5px]">
                      <span className="text-[#52525B]">{k}</span>
                      <span className="font-semibold tabular-nums text-[#18181B]">{v}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Mia" />
    </div>
  );
}
