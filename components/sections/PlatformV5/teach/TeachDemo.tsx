"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Lock, Pause, PlayCircle, FileText, ListChecks, Maximize2, Volume2, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";

/*
 * Teach hero window with a scripted demo: the learner marks a video lesson complete,
 * answers the checkpoint quiz, marks it complete, then checks the locked next lesson.
 * Loops. Decorative only (aria-hidden on the parent). Static for reduced motion.
 */

const LESSONS = [
  { t: "Welcome and setup", m: "6 min", i: PlayCircle },
  { t: "Python cheat sheet", m: "PDF", i: FileText },
  { t: "Variables in practice", m: "14 min", i: PlayCircle },
  { t: "Checkpoint quiz", m: "3 questions", i: ListChecks },
  { t: "Loops and conditions", m: "Unlocks Mon", i: PlayCircle },
];

const LOCKED = 4;

const CODE: { n: number; c: React.ReactNode; hi?: boolean }[] = [
  { n: 1, c: <span className="text-[#71717A]"># Store a learner&apos;s details</span> },
  {
    n: 2,
    c: (
      <>
        <span className="text-[#C4B5FD]">name</span> = <span className="text-[#86EFAC]">&quot;Asha&quot;</span>
      </>
    ),
  },
  {
    n: 3,
    c: (
      <>
        <span className="text-[#C4B5FD]">age</span> = <span className="text-[#FCD34D]">21</span>
      </>
    ),
  },
  {
    n: 4,
    hi: true,
    c: (
      <>
        <span className="text-[#93C5FD]">print</span>(name, age)
        <span className="mo-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-white" />
      </>
    ),
  },
];

const QUIZ = { q: "Which line stores the learner's age?", o: ['age = "21"', "age = 21", "print(age)"], a: 1 };

export function TeachDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef<HTMLSpanElement>(null);
  const optRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // current lesson index (2 = video, 3 = quiz, 4 = reached the locked lesson)
  const [cur, setCur] = useState(2);
  const [picked, setPicked] = useState<number | null>(null);
  const [lockTip, setLockTip] = useState(false);
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

    const run = async () => {
      await sleep(1600);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.3, y: box.clientHeight * 0.92 });
      await sleep(600);
      while (alive) {
        // 1. finish the video lesson
        await moveTo(completeRef.current);
        if (!alive) return;
        await tap(completeRef.current);
        setCur(3);
        await sleep(1100);

        // 2. answer the checkpoint quiz
        await moveTo(optRefs.current[QUIZ.a]);
        if (!alive) return;
        await tap(optRefs.current[QUIZ.a]);
        setPicked(QUIZ.a);
        await sleep(1100);
        await moveTo(completeRef.current);
        if (!alive) return;
        await tap(completeRef.current);
        setCur(LOCKED);
        await sleep(700);

        // 3. look at the locked lesson
        await moveTo(rowRefs.current[LOCKED]);
        if (!alive) return;
        setLockTip(true);
        await sleep(2200);
        setLockTip(false);

        // reset
        await sleep(500);
        setCur(2);
        setPicked(null);
        await sleep(1200);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const doneCount = Math.min(cur, LOCKED); // lessons before `cur` are done
  const pct = [42, 46, 50][Math.max(0, Math.min(cur, LOCKED) - 2)];
  const onQuiz = cur >= 3;
  const lesson = onQuiz ? { t: "Checkpoint quiz", m: "Lesson 2.2 · Quiz · 3 questions" } : { t: "Variables in practice", m: "Lesson 2.1 · Video · 14 min" };
  const quizDone = cur >= LOCKED;

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">Python for Beginners · Module 2</span>
      </div>

      <div className="grid md:grid-cols-[1.6fr_1fr]">
        {/* Player */}
        <div className="p-4 sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-[14px] bg-[#16141F]">
            {!onQuiz ? (
              <div key="video" className="mo-swap absolute inset-0">
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
                    <span className="rounded-[6px] bg-white/10 px-2 py-0.5 font-mono text-[10.5px] text-white/80">variables.py</span>
                    <span className="px-2 py-0.5 font-mono text-[10.5px] text-white/35">notes.md</span>
                  </div>
                  <div className="flex-1 space-y-1 px-3 py-3 font-mono text-[11px] leading-[1.7] text-white/90 sm:px-4 sm:py-4 sm:text-[13px]">
                    {CODE.map((l) => (
                      <div key={l.n} className={cn("-mx-2 flex gap-4 rounded-[6px] px-2", l.hi && "bg-white/[0.06]")}>
                        <span className="w-3 shrink-0 text-right text-white/25">{l.n}</span>
                        <span>{l.c}</span>
                      </div>
                    ))}
                    <div className="-mx-2 mt-2 hidden gap-4 px-2 text-[#86EFAC]/80 sm:flex">
                      <span className="w-3 shrink-0" />
                      <span>Asha 21</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-12 right-3 w-[84px] overflow-hidden rounded-[10px] ring-2 ring-white/15 sm:bottom-14 sm:right-4 sm:w-[132px]">
                  <Image
                    src="/assets/img/home/participant_alex.jpg"
                    alt=""
                    width={264}
                    height={198}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <div className="absolute bottom-1 left-1 flex items-end gap-[2px] rounded-[4px] bg-black/50 px-1 py-0.5">
                    {[0, 0.2, 0.4].map((dl) => (
                      <span key={dl} className="mo-eq block h-2.5 w-[2px] rounded-full bg-white" style={{ "--ed": `${dl}s` } as React.CSSProperties} />
                    ))}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-6 sm:px-4">
                  <div className="h-1 rounded-full bg-white/25">
                    <div className="mo-progress relative h-full w-[37%] rounded-full bg-white">
                      <span className="absolute -right-1.5 -top-1 h-3 w-3 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-white/85">
                    <Pause className="h-3.5 w-3.5 fill-current" />
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="text-[10.5px] tabular-nums">05:12 / 14:00</span>
                    <span className="ml-auto rounded-[4px] bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">1.25x</span>
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div key="quiz" className="mo-swap absolute inset-0 flex items-center justify-center bg-[#F4F5F8] p-4 sm:p-8">
                <div className="w-full max-w-[420px] rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-[0_12px_32px_-14px_rgba(16,16,24,0.25)] sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6C4BFF]">Checkpoint · 1 of 3</p>
                    {picked !== null && (
                      <span className="mo-swap inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#15803D]">
                        <CircleCheck className="h-3.5 w-3.5" /> Correct!
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[14px] font-semibold text-[#18181B] sm:text-[15px]">{QUIZ.q}</p>
                  <div className="mt-3 space-y-2">
                    {QUIZ.o.map((o, i) => {
                      const on = picked === i;
                      return (
                        <span
                          key={o}
                          ref={(el) => {
                            optRefs.current[i] = el;
                          }}
                          className={cn(
                            "flex items-center gap-2.5 rounded-[10px] border px-3 py-2 font-mono text-[12px] transition-colors duration-200 sm:text-[12.5px]",
                            on ? "border-[#16A34A] bg-[#F0FDF4] text-[#14532D]" : "border-[#EDEDF1] text-[#3F3F46]"
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-5 w-5 shrink-0 place-items-center rounded-full font-sans text-[10px] font-semibold",
                              on ? "bg-[#16A34A] text-white" : "bg-[#F4F4F5] text-[#71717A]"
                            )}
                          >
                            {on ? <Check className="h-3 w-3" strokeWidth={3} /> : "ABC"[i]}
                          </span>
                          {o}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div key={lesson.t} className="mo-swap min-w-0">
              <p className="truncate text-[15px] font-semibold text-[#18181B]">{lesson.t}</p>
              <p className="text-[12.5px] text-[#9A9AA6]">{lesson.m}</p>
            </div>
            <span
              ref={completeRef}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-300",
                quizDone ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#0A0A0B] text-white"
              )}
            >
              {quizDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              {quizDone ? "Completed" : "Mark complete"}
            </span>
          </div>
        </div>

        {/* Lesson list */}
        <div className="border-t border-[#F1F1F4] p-4 sm:p-5 md:border-l md:border-t-0">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-[#18181B]">Course content</p>
            <p className="text-[12px] font-medium tabular-nums text-[#71717A]">{pct}% done</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div className="h-full rounded-full bg-[#0A0A0B] transition-[width] duration-700" style={{ width: `${pct}%` }} />
          </div>
          <ul className="mt-4 space-y-1.5">
            {LESSONS.map(({ t, m, i: Icon }, idx) => {
              const s = idx === LOCKED ? "locked" : idx < doneCount ? "done" : idx === cur ? "now" : "open";
              return (
                <li
                  key={t}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 transition-colors duration-300",
                    s === "now" && "bg-[#F4F5F8]",
                    s === "locked" && (lockTip ? "bg-[#F4F5F8]" : "opacity-60")
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300",
                      s === "done" && "bg-[#0A0A0B] text-white",
                      s === "now" && "mo-ping border-2 border-[#0A0A0B] text-[#0A0A0B]",
                      s === "open" && "border border-[#D4D4D8]",
                      s === "locked" && "bg-[#F4F4F5] text-[#71717A]"
                    )}
                  >
                    {s === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
                    {s === "locked" && <Lock className="h-2.5 w-2.5" />}
                  </span>
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#9A9AA6]" />
                  <span className={cn("min-w-0 flex-1 truncate text-[12.5px]", s === "now" ? "font-semibold text-[#18181B]" : "text-[#3F3F46]")}>
                    {t}
                  </span>
                  <span className="shrink-0 text-[11px] text-[#9A9AA6]">{m}</span>
                  {s === "locked" && lockTip && (
                    <span className="mo-swap absolute -top-9 right-2 whitespace-nowrap rounded-[8px] bg-[#0A0A0B] px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg">
                      Unlocks Monday for Batch B
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Asha" />
    </div>
  );
}
