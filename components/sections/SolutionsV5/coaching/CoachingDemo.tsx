"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bell, CircleCheck, ListChecks, Video, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../../PlatformV5/DemoCursor";

/*
 * Coaching institute hero: this week's batch timetable with a detail panel.
 * Scripted demo: open today's live class (attendance counts up), open Friday's mock test
 * results, open fees and send a reminder. Loops. Static for reduced motion. Sample data only.
 */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
type Slot = { t: string; kind: "class" | "test"; id?: string };
const ROWS: { batch: string; time: string; slots: (Slot | null)[] }[] = [
  {
    batch: "Maths · Morning",
    time: "07:00",
    slots: [{ t: "Algebra", kind: "class" }, null, { t: "Algebra", kind: "class" }, null, { t: "Algebra", kind: "class" }, null],
  },
  {
    batch: "Maths · Evening",
    time: "18:00",
    slots: [{ t: "Algebra", kind: "class" }, null, { t: "Live", kind: "class", id: "live" }, null, { t: "Test", kind: "test", id: "test" }, null],
  },
  {
    batch: "Physics · Weekend",
    time: "10:00",
    slots: [null, null, null, null, null, { t: "Motion", kind: "class" }],
  },
];

const FACES = [
  "/assets/img/home/testimonials/author-1.jpg",
  "/assets/img/home/testimonials/author-2.jpg",
  "/assets/img/home/testimonials/author-3.jpg",
  "/assets/img/home/testimonials/author-5.jpg",
];

type Panel = "live" | "test" | "fees";

export function CoachingDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const testRef = useRef<HTMLSpanElement>(null);
  const feesRef = useRef<HTMLSpanElement>(null);
  const remindRef = useRef<HTMLSpanElement>(null);

  const [panel, setPanel] = useState<Panel>("live");
  const [joined, setJoined] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setJoined(23);
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
    const countUp = async () => {
      for (let n = 1; n <= 23 && alive; n++) {
        setJoined(n);
        await sleep(55);
      }
    };

    const run = async () => {
      await sleep(1500);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.2, y: box.clientHeight * 0.9 });
      await sleep(500);
      while (alive) {
        await moveTo(liveRef.current);
        if (!alive) return;
        await tap(liveRef.current);
        setPanel("live");
        setJoined(0);
        await countUp();
        await sleep(1500);

        await moveTo(testRef.current);
        if (!alive) return;
        await tap(testRef.current);
        setPanel("test");
        await sleep(2200);

        await moveTo(feesRef.current);
        if (!alive) return;
        await tap(feesRef.current);
        setPanel("fees");
        await sleep(1200);
        await moveTo(remindRef.current);
        if (!alive) return;
        await tap(remindRef.current);
        setToast("Reminder emailed to 6 learners");
        await sleep(2200);
        setToast(null);
        await sleep(600);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div ref={boxRef} className="relative">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 min-w-0 flex-1 truncate text-[12px] font-medium text-[#71717A]">Northwind Coaching · This week</span>
        <span
          ref={feesRef}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-colors",
            panel === "fees" ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-[#E4E4E7] text-[#18181B]"
          )}
        >
          <Wallet className="h-3.5 w-3.5" /> Fees
        </span>
      </div>

      <div className="grid md:grid-cols-[1.45fr_1fr]">
        {/* Timetable */}
        <div className="overflow-hidden border-b border-[#F1F1F4] p-4 sm:p-5 md:border-b-0 md:border-r">
          <div className="grid grid-cols-[96px_repeat(6,minmax(0,1fr))] gap-1 text-[10.5px] sm:gap-1.5 font-semibold text-[#9A9AA6] sm:grid-cols-[140px_repeat(6,minmax(0,1fr))]">
            <span>Batch</span>
            {DAYS.map((d) => (
              <span key={d} className={cn("text-center", d === "Wed" && "text-[#18181B]")}>
                {d}
              </span>
            ))}
          </div>
          <div className="mt-2 space-y-1.5">
            {ROWS.map((r) => (
              <div key={r.batch} className="grid grid-cols-[96px_repeat(6,minmax(0,1fr))] items-center gap-1 sm:gap-1.5 sm:grid-cols-[140px_repeat(6,minmax(0,1fr))]">
                <div className="min-w-0 pr-1">
                  <p className="truncate text-[11.5px] font-semibold text-[#18181B]">{r.batch}</p>
                  <p className="text-[10.5px] text-[#9A9AA6]">{r.time}</p>
                </div>
                {r.slots.map((s, i) => (
                  <div key={i} className="h-[46px]">
                    {s ? (
                      <span
                        ref={s.id === "live" ? liveRef : s.id === "test" ? testRef : undefined}
                        className={cn(
                          "flex h-full flex-col justify-center rounded-[8px] px-1.5 text-[10px] font-semibold leading-tight transition-colors duration-300",
                          s.id === "live"
                            ? cn("bg-[#0A0A0B] text-white", panel === "live" && "ring-2 ring-[#6C4BFF] ring-offset-2")
                            : s.id === "test"
                              ? cn("bg-[#F1EDFF] text-[#6C4BFF]", panel === "test" && "ring-2 ring-[#6C4BFF] ring-offset-2")
                              : "bg-[#F4F5F8] text-[#3F3F46]"
                        )}
                      >
                        <span className="flex items-center gap-1">
                          {s.id === "live" && <span className="mo-ping h-1.5 w-1.5 shrink-0 rounded-full bg-[#F87171] text-[#F87171]" />}
                          {s.kind === "test" ? <ListChecks className="mx-auto h-3 w-3 shrink-0 sm:mx-0" /> : null}
                          <span className="hidden truncate sm:inline">{s.t}</span>
                        </span>
                      </span>
                    ) : (
                      <span className="block h-full rounded-[8px] border border-dashed border-[#F1F1F4]" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[10.5px] text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#F4F5F8] ring-1 ring-[#E4E4E7]" /> Live class
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#F1EDFF]" /> Mock test
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#0A0A0B]" /> Happening now
            </span>
          </div>
        </div>

        {/* Detail panel */}
        <div className="relative h-[280px] overflow-hidden p-4 sm:p-5">
          {panel === "live" && (
            <div key="live" className="mo-swap">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FDECEC] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#B91C1C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" /> Live now
              </p>
              <p className="mt-2 text-[15px] font-semibold text-[#18181B]">Quadratic equations</p>
              <p className="text-[11.5px] text-[#9A9AA6]">Daniel Reyes · Grade 10 Maths, Evening</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="font-urbanist text-[30px] font-semibold leading-none tabular-nums text-[#18181B]">
                    {joined}
                    <span className="text-[16px] text-[#9A9AA6]"> / 24</span>
                  </p>
                  <p className="mt-1 text-[11px] text-[#71717A]">joined · logged automatically</p>
                </div>
                <div className="flex">
                  {FACES.map((f, i) => (
                    <Image
                      key={f}
                      src={f}
                      alt=""
                      width={56}
                      height={56}
                      className={cn("h-7 w-7 rounded-full object-cover object-top ring-2 ring-white transition-opacity duration-300", i > 0 && "-ml-2", joined > i * 5 ? "opacity-100" : "opacity-0")}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
                <div className="h-full rounded-full bg-[#0A0A0B] transition-[width] duration-150" style={{ width: `${(joined / 24) * 100}%` }} />
              </div>
              <span className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-[#0A0A0B] py-2 text-[12px] font-semibold text-white">
                <Video className="h-3.5 w-3.5" /> Join on Zoom
              </span>
            </div>
          )}

          {panel === "test" && (
            <div key="test" className="mo-swap">
              <p className="text-[11px] font-medium text-[#6C4BFF]">Fri · Results</p>
              <p className="mt-1 text-[15px] font-semibold text-[#18181B]">Mock test 4 · Algebra</p>
              <p className="text-[11.5px] text-[#9A9AA6]">24 learners · Average 71%</p>
              <div className="mt-3.5 space-y-2.5">
                {[
                  { n: "Sofia Rossi", p: FACES[3], s: 94 },
                  { n: "Lucas Martin", p: FACES[1], s: 88 },
                  { n: "Priya Sharma", p: FACES[0], s: 82 },
                ].map((x, i) => (
                  <div key={x.n} className="flex items-center gap-2.5">
                    <span className="w-3 text-[11px] font-semibold text-[#9A9AA6]">{i + 1}</span>
                    <Image src={x.p} alt="" width={48} height={48} className="h-6 w-6 rounded-full object-cover object-top" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between text-[11.5px]">
                        <span className="truncate font-medium text-[#27272A]">{x.n}</span>
                        <span className="font-semibold tabular-nums text-[#18181B]">{x.s}%</span>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#F1F1F4]">
                        <div className="mo-swap h-full rounded-full bg-[#0A0A0B]" style={{ width: `${x.s}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3.5 text-[11px] text-[#71717A]">Scored automatically the moment the test closed.</p>
            </div>
          )}

          {panel === "fees" && (
            <div key="fees" className="mo-swap">
              <p className="text-[11px] font-medium text-[#71717A]">March fees</p>
              <p className="mt-1 text-[15px] font-semibold text-[#18181B]">Grade 10 Maths · Evening</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="font-urbanist text-[28px] font-semibold leading-none text-[#18181B]">
                  18<span className="text-[15px] text-[#9A9AA6]"> of 24 paid</span>
                </p>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
                <div className="h-full w-[75%] rounded-full bg-[#16A34A]" />
              </div>
              <div className="mt-3 space-y-1.5">
                {["Kenji Tanaka", "Amara Okafor"].map((n) => (
                  <p key={n} className="flex items-center justify-between rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[11.5px]">
                    <span className="text-[#27272A]">{n}</span>
                    <span className="font-semibold text-[#B45309]">Pending</span>
                  </p>
                ))}
                <p className="px-2.5 text-[10.5px] text-[#9A9AA6]">+ 4 more pending</p>
              </div>
              <span
                ref={remindRef}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-[#0A0A0B] py-2 text-[12px] font-semibold text-white"
              >
                <Bell className="h-3.5 w-3.5" /> Remind 6 learners
              </span>
            </div>
          )}

          {toast && (
            <div className="mo-swap absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] py-2 pl-2.5 pr-4 text-[11.5px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]">
              <CircleCheck className="h-4 w-4 text-[#4ADE80]" />
              {toast}
            </div>
          )}
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Admin" />
    </div>
  );
}
