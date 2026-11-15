"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flag, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Countdown } from "./Countdown";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";

/*
 * Assess hero window with a scripted demo: a coloured cursor answers a question,
 * moves to the next one, answers again, then flags a question, and loops.
 * Decorative only (aria-hidden on the parent). Static for reduced motion.
 */

const QUESTIONS = [
  { n: 7, q: "If 2x + 6 = 18, what is the value of x?", o: ["x = 4", "x = 6", "x = 8", "x = 12"], a: 1 },
  { n: 8, q: "What is 15% of 200?", o: ["15", "20", "30", "45"], a: 2 },
  { n: 9, q: "Simplify 3(x + 2) − x", o: ["2x + 2", "2x + 6", "4x + 6", "3x + 5"], a: -1 },
];

const BASE_DONE = [1, 2, 3, 5, 6];
const BASE_FLAG = [4, 11];

type Pos = DemoPos;

export function AssessDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const optRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nextRef = useRef<HTMLSpanElement>(null);
  const flagRef = useRef<HTMLSpanElement>(null);

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>(BASE_DONE);
  const [flagged, setFlagged] = useState<number[]>(BASE_FLAG);
  const [cursor, setCursor] = useState<Pos | null>(null);
  const [click, setClick] = useState<Pos | null>(null);
  const [pressing, setPressing] = useState(false);
  const [clickKey, setClickKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const posOf = (el: HTMLElement | null): Pos | null => pointIn(boxRef.current, el);
    const moveTo = async (el: HTMLElement | null) => {
      const p = posOf(el);
      if (p) setCursor(p);
      await sleep(950);
    };
    const tap = async (el: HTMLElement | null) => {
      const p = posOf(el);
      setPressing(true);
      if (p) {
        setClick({ ...p });
        setClickKey((k) => k + 1);
      }
      await sleep(180);
      setPressing(false);
      await sleep(220);
    };

    const run = async () => {
      await sleep(1400);
      // start the cursor near the bottom right of the window
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.82, y: box.clientHeight * 0.9 });
      await sleep(500);

      while (alive) {
        for (let i = 0; i < QUESTIONS.length && alive; i++) {
          const q = QUESTIONS[i];
          if (q.a >= 0) {
            await moveTo(optRefs.current[q.a]);
            if (!alive) return;
            await tap(optRefs.current[q.a]);
            setPicked(q.a);
            await sleep(700);
            await moveTo(nextRef.current);
            if (!alive) return;
            await tap(nextRef.current);
            setDone((d) => [...d, q.n]);
            setPicked(null);
            setQi(i + 1);
            await sleep(900);
          } else {
            await moveTo(flagRef.current);
            if (!alive) return;
            await tap(flagRef.current);
            setFlagged((f) => [...f, q.n]);
            await sleep(1800);
          }
        }
        // reset and loop
        setQi(0);
        setPicked(null);
        setDone(BASE_DONE);
        setFlagged(BASE_FLAG);
        await sleep(1200);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const q = QUESTIONS[Math.min(qi, QUESTIONS.length - 1)];
  const answered = done.filter((n) => !flagged.includes(n)).length;
  const progress = Math.round((q.n / 30) * 100);

  return (
    <div ref={boxRef} className="relative">
      {/* Test header */}
      <div className="flex items-center gap-3 border-b border-[#F1F1F4] px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold text-[#18181B]">Mock test 4 · Algebra</p>
          <p className="text-[11.5px] text-[#9A9AA6]">30 questions · Pass mark 40%</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF4E2] px-3 py-1 text-[12.5px] font-semibold text-[#B45309]">
          <Timer className="h-3.5 w-3.5" />
          <Countdown />
        </span>
      </div>

      <div className="grid md:grid-cols-[1.6fr_1fr]">
        {/* Question */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-medium text-[#71717A]">Question {q.n} of 30</p>
            <span
              ref={flagRef}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium transition-colors",
                flagged.includes(q.n) ? "bg-[#FEF4E2] text-[#B45309]" : "text-[#71717A]"
              )}
            >
              <Flag className={cn("h-3 w-3", flagged.includes(q.n) && "fill-current")} />
              {flagged.includes(q.n) ? "Flagged" : "Flag for review"}
            </span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div className="h-full rounded-full bg-[#0A0A0B] transition-[width] duration-700" style={{ width: `${progress}%` }} />
          </div>
          <div key={q.n} className="mo-swap">
            <p className="mt-5 min-h-[2.5em] font-urbanist text-[19px] font-semibold leading-snug text-[#18181B] sm:min-h-0 sm:text-[22px]">
              {q.q}
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {q.o.map((o, i) => {
                const on = picked === i;
                return (
                  <span
                    key={o}
                    ref={(el) => {
                      optRefs.current[i] = el;
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-[12px] border px-3.5 py-3 text-[14px] transition-colors duration-200",
                      on ? "border-[#6C4BFF] bg-[#F7F5FF] font-semibold text-[#18181B]" : "border-[#EDEDF1] text-[#3F3F46]"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-colors duration-200",
                        on ? "bg-[#6C4BFF] text-white" : "bg-[#F4F4F5] text-[#71717A]"
                      )}
                    >
                      {"ABCD"[i]}
                    </span>
                    {o}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="rounded-full border border-[#E4E4E7] px-4 py-2 text-[12.5px] font-semibold text-[#3F3F46]">Previous</span>
            <span ref={nextRef} className="rounded-full bg-[#0A0A0B] px-4 py-2 text-[12.5px] font-semibold text-white">
              Save and next
            </span>
          </div>
        </div>

        {/* Answer palette */}
        <div className="border-t border-[#F1F1F4] p-4 sm:p-6 md:border-l md:border-t-0">
          <p className="text-[13px] font-semibold text-[#18181B]">Questions</p>
          <div className="mt-3.5 grid grid-cols-6 gap-1.5 sm:gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => {
              const isFlag = flagged.includes(n);
              const isDone = done.includes(n) && !isFlag;
              const isNow = n === q.n && !isFlag;
              return (
                <span
                  key={n}
                  className={cn(
                    "grid h-8 place-items-center rounded-[8px] text-[11.5px] font-semibold tabular-nums transition-colors duration-300",
                    isDone && "bg-[#0A0A0B] text-white",
                    isFlag && "bg-[#FEF4E2] text-[#B45309]",
                    isNow && "mo-ping border-2 border-[#6C4BFF] text-[#6C4BFF]",
                    !isDone && !isFlag && !isNow && "bg-[#F4F5F8] text-[#9A9AA6]"
                  )}
                >
                  {n}
                </span>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#0A0A0B]" /> Answered {answered}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#FEF4E2] ring-1 ring-[#FCD9A5]" /> Flagged {flagged.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] border-2 border-[#6C4BFF]" /> Current
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#F4F5F8] ring-1 ring-[#E4E4E7]" /> Not visited
            </span>
          </div>
          <span className="mt-5 block rounded-full border border-[#0A0A0B] py-2 text-center text-[12.5px] font-semibold text-[#0A0A0B]">
            Submit test
          </span>
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Priya" />
    </div>
  );
}
