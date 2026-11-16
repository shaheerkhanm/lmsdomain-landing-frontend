"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, BookOpen, Check, FileText, ListChecks, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";
import { DomieMark } from "@/components/brand/PartnerMarks";

/*
 * Domie AI hero window with a scripted demo: a learner asks a question inside the course,
 * Domie answers from the course's own lesson, the learner opens that lesson, then asks
 * something that isn't in the course and Domie says so honestly. Loops.
 * Decorative only (aria-hidden on the parent). Static for reduced motion. Sample data only.
 */

type Msg = { from: "me" | "domie"; text: React.ReactNode; source?: string; key: string };

const LESSONS = [
  { t: "Welcome and setup", i: PlayCircle },
  { t: "Variables and data", i: PlayCircle },
  { t: "Loops in practice", i: PlayCircle },
  { t: "Loops cheat sheet", i: FileText },
  { t: "Checkpoint quiz", i: ListChecks },
];

const Q1 = "Why does my while loop never stop?";
const Q2 = "When is the final exam?";

const GREETING: Msg = {
  from: "domie",
  key: "hi",
  text: "Hi Asha. Ask me anything about Python for Beginners.",
};

const A1: Msg = {
  from: "domie",
  key: "a1",
  source: "Lesson 3.2 · Loops in practice",
  text: (
    <>
      Your loop checks <code className="rounded bg-[#F4F4F5] px-1 font-mono text-[11.5px]">count &lt; 10</code>, but{" "}
      <code className="rounded bg-[#F4F4F5] px-1 font-mono text-[11.5px]">count</code> never changes. Add{" "}
      <code className="rounded bg-[#F4F4F5] px-1 font-mono text-[11.5px]">count += 1</code> inside the loop so it can end.
    </>
  ),
};

const A2: Msg = {
  from: "domie",
  key: "a2",
  text: "I couldn't find the exam date in your course materials, so I won't guess. Please check with your instructor, Daniel.",
};

function DomieAvatar({ size = 26 }: { size?: number }) {
  return <DomieMark size={size} />;
}

export function AiDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const sourceRef = useRef<HTMLSpanElement | null>(null);

  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [typed, setTyped] = useState("");
  const [focus, setFocus] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [lesson, setLesson] = useState(1);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMsgs([GREETING, { from: "me", key: "q1", text: Q1 }, A1]);
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
    const ask = async (q: string, answer: Msg, key: string) => {
      await moveTo(inputRef.current);
      if (!alive) return false;
      await tap(inputRef.current);
      setFocus(true);
      for (let i = 1; i <= q.length && alive; i++) {
        setTyped(q.slice(0, i));
        await sleep(42);
      }
      await sleep(250);
      await moveTo(sendRef.current);
      if (!alive) return false;
      await tap(sendRef.current);
      setFocus(false);
      setTyped("");
      setMsgs((m) => [...m, { from: "me", key, text: q }]);
      setThinking(true);
      await sleep(1300);
      setThinking(false);
      setMsgs((m) => [...m, answer]);
      return alive;
    };

    const run = async () => {
      await sleep(1600);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.75, y: box.clientHeight * 0.55 });
      await sleep(600);
      while (alive) {
        if (!(await ask(Q1, A1, "q1"))) return;
        await sleep(1500);
        // open the lesson the answer came from
        await moveTo(sourceRef.current);
        if (!alive) return;
        await tap(sourceRef.current);
        setLesson(2);
        await sleep(1600);
        if (!(await ask(Q2, A2, "q2"))) return;
        await sleep(3200);
        setMsgs([GREETING]);
        setLesson(1);
        await sleep(1200);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">Python for Beginners · Module 3</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
        {/* Course side */}
        <div className="hidden border-r border-[#F1F1F4] p-5 md:block">
          <div className="relative aspect-video overflow-hidden rounded-[12px] bg-[#16141F]">
            <div className="absolute inset-0 p-3 font-mono text-[11px] leading-[1.7] text-white/85">
              <p>
                <span className="text-[#C4B5FD]">count</span> = <span className="text-[#FCD34D]">0</span>
              </p>
              <p>
                <span className="text-[#93C5FD]">while</span> count &lt; <span className="text-[#FCD34D]">10</span>:
              </p>
              <p className="pl-4">print(count)</p>
              <p className={cn("pl-4 transition-colors duration-500", lesson === 2 ? "rounded bg-[#86EFAC]/15 text-[#86EFAC]" : "text-white/25")}>
                count += 1
              </p>
            </div>
            <div className="absolute bottom-2 right-2 w-[72px] overflow-hidden rounded-[8px] ring-2 ring-white/15">
              <Image src="/assets/img/home/participant_alex.jpg" alt="" width={144} height={108} className="aspect-[4/3] w-full object-cover object-top" />
            </div>
          </div>
          <p className="mt-4 text-[12px] font-semibold text-[#18181B]">Module 3 · Loops</p>
          <ul className="mt-2 space-y-1">
            {LESSONS.map(({ t, i: Icon }, idx) => (
              <li
                key={t}
                className={cn(
                  "flex items-center gap-2.5 rounded-[9px] px-2.5 py-1.5 text-[12px] transition-colors duration-500",
                  idx === lesson ? "bg-[#F4F5F8] font-semibold text-[#18181B]" : "text-[#52525B]",
                  idx === 2 && lesson === 2 && "mo-glow"
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 shrink-0 place-items-center rounded-full",
                    idx < lesson ? "bg-[#0A0A0B] text-white" : idx === lesson ? "border-2 border-[#0A0A0B]" : "border border-[#D4D4D8]"
                  )}
                >
                  {idx < lesson && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                </span>
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#9A9AA6]" />
                <span className="truncate">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Course help chat */}
        <div className="flex h-[420px] min-w-0 flex-col">
          <div className="flex items-center gap-2.5 border-b border-[#F1F1F4] px-4 py-3">
            <DomieAvatar size={30} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#18181B]">Course help</p>
              <p className="truncate text-[11px] text-[#9A9AA6]">Answers from this course&apos;s lessons and notes</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#F4F5F8] px-2.5 py-1 text-[10.5px] font-medium text-[#52525B] sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Available 24/7
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-4">
            {msgs.map((m) =>
              m.from === "me" ? (
                <div key={m.key} className="mo-swap ml-auto flex max-w-[85%] items-end gap-2">
                  <p className="rounded-[16px] rounded-br-[6px] bg-[#0A0A0B] px-3.5 py-2.5 text-[12.5px] leading-[1.5] text-white">{m.text}</p>
                  <Image src="/assets/img/home/testimonials/author-1.jpg" alt="" width={52} height={52} className="h-6 w-6 shrink-0 rounded-full object-cover object-top" />
                </div>
              ) : (
                <div key={m.key} className="mo-swap flex max-w-[92%] items-start gap-2">
                  <DomieAvatar />
                  <div className="min-w-0 rounded-[16px] rounded-tl-[6px] border border-[#ECECF1] bg-white px-3.5 py-2.5 text-[12.5px] leading-[1.55] text-[#27272A]">
                    {m.text}
                    {m.source && (
                      <span
                        ref={(el) => {
                          sourceRef.current = el;
                        }}
                        className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#FAFAFB] px-2.5 py-1 text-[11px] font-medium text-[#18181B]"
                      >
                        <BookOpen className="h-3 w-3" /> {m.source}
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
            {thinking && (
              <div className="mo-swap flex items-center gap-2">
                <DomieAvatar />
                <span className="flex gap-1 rounded-full border border-[#ECECF1] bg-white px-3 py-2.5">
                  {[0, 0.15, 0.3].map((dl) => (
                    <span key={dl} className="mo-eq block h-2 w-1.5 rounded-full bg-[#9A9AA6]" style={{ "--ed": `${dl}s` } as React.CSSProperties} />
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-[#F1F1F4] p-3">
            <div className="flex items-center gap-2">
              <span
                ref={inputRef}
                className={cn(
                  "flex h-10 min-w-0 flex-1 items-center truncate rounded-full border px-4 text-[12.5px] transition-colors",
                  focus ? "border-[#0A0A0B]" : "border-[#E4E4E7]",
                  typed ? "text-[#18181B]" : "text-[#B4B4BE]"
                )}
              >
                <span className="truncate">{typed || "Ask about this course…"}</span>
                {focus && <span className="mo-caret ml-0.5 inline-block h-[1.1em] w-[1.5px] shrink-0 bg-[#18181B]" />}
              </span>
              <span ref={sendRef} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Asha" />
    </div>
  );
}
