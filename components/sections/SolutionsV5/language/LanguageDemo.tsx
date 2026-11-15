"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CircleCheck, FileText, MessageSquare, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../../PlatformV5/DemoCursor";

/*
 * Language & test-prep hero: a teacher's essay review queue.
 * Scripted demo: open Amara's essay, highlight a sentence, add a private comment,
 * set the score and return it; her progress chart updates. Loops. Static for reduced motion.
 */

const QUEUE = [
  { n: "Amara Okafor", p: "/assets/img/home/testimonials/author-3.jpg", t: "Essay 3 · Opinion essay" },
  { n: "Lucas Martin", p: "/assets/img/home/testimonials/author-2.jpg", t: "Essay 3 · Opinion essay" },
  { n: "Kenji Tanaka", p: "/assets/img/home/testimonials/author-4.jpg", t: "Essay 3 · Opinion essay" },
];

const COMMENT = "Use the present perfect here: “have changed”.";
const HISTORY = [5, 5.5, 6, 6.5];

export function LanguageDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLSpanElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);

  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(false);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(6);
  const [returned, setReturned] = useState(false);
  const [cursor, setCursor] = useState<DemoPos | null>(null);
  const [click, setClick] = useState<DemoPos | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      setHl(true);
      setTyped(COMMENT);
      setScore(7);
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

    const run = async () => {
      await sleep(1500);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.5, y: box.clientHeight * 0.9 });
      await sleep(500);
      while (alive) {
        await moveTo(rowRef.current);
        if (!alive) return;
        await tap(rowRef.current);
        setOpen(true);
        await sleep(900);

        await moveTo(sentRef.current);
        if (!alive) return;
        await tap(sentRef.current);
        setHl(true);
        for (let i = 1; i <= COMMENT.length && alive; i++) {
          setTyped(COMMENT.slice(0, i));
          await sleep(28);
        }
        await sleep(500);

        await moveTo(plusRef.current);
        if (!alive) return;
        await tap(plusRef.current);
        setScore(7);
        await sleep(700);

        await moveTo(sendRef.current);
        if (!alive) return;
        await tap(sendRef.current);
        setReturned(true);
        await sleep(2800);

        setReturned(false);
        setOpen(false);
        setHl(false);
        setTyped("");
        setScore(6);
        await sleep(900);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const scores = returned ? [...HISTORY, score] : HISTORY;

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">Reviews · Advanced English, Evening batch</span>
      </div>

      <div className="grid md:grid-cols-[250px_1fr]">
        {/* Queue */}
        <div className="border-b border-[#F1F1F4] p-3 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between px-1.5 pb-2">
            <p className="text-[12px] font-semibold text-[#18181B]">To review</p>
            <span className="rounded-full bg-[#FEF4E2] px-2 py-0.5 text-[10.5px] font-semibold text-[#B45309]">{returned ? 15 : 16}</span>
          </div>
          <div className="space-y-1">
            {QUEUE.map((q, i) => (
              <div
                key={q.n}
                ref={i === 0 ? rowRef : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-2 py-2 transition-colors duration-300",
                  i === 0 && open ? "bg-[#F4F5F8]" : "",
                  i === 0 && returned && "opacity-50"
                )}
              >
                <Image src={q.p} alt="" width={56} height={56} className="h-7 w-7 shrink-0 rounded-full object-cover object-top" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-[#18181B]">{q.n}</p>
                  <p className="truncate text-[10.5px] text-[#9A9AA6]">{q.t}</p>
                </div>
                {i === 0 && returned && <CircleCheck className="h-4 w-4 shrink-0 text-[#16A34A]" />}
              </div>
            ))}
          </div>

          {/* Progress chart */}
          <div className="mt-3 hidden rounded-[12px] border border-[#F1F1F4] p-3 md:block">
            <p className="text-[11px] font-medium text-[#71717A]">Amara · essay scores</p>
            <div className="mt-2 flex h-[64px] items-end gap-1.5">
              {scores.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span
                    className={cn(
                      "w-full rounded-t-[4px] transition-all duration-700",
                      i === scores.length - 1 && returned ? "mo-swap bg-[#6C4BFF]" : i === scores.length - 1 ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]"
                    )}
                    style={{ height: `${(v / 9) * 56}px` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-1.5 text-[10.5px] text-[#9A9AA6]">Essays 1–{scores.length} · out of 9</p>
          </div>
        </div>

        {/* Essay */}
        <div className="relative h-[330px] overflow-hidden p-4 sm:p-5">
          {!open ? (
            <div key="empty" className="mo-swap grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#F4F5F8] text-[#71717A]">
                  <FileText className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[13px] font-semibold text-[#18181B]">16 essays waiting</p>
                <p className="text-[11.5px] text-[#9A9AA6]">Pick one from the list to start reviewing</p>
              </div>
            </div>
          ) : (
            <div key="essay" className="mo-swap">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-[#18181B]">Amara Okafor · Essay 3</p>
                  <p className="text-[11px] text-[#9A9AA6]">“Technology has changed how we learn.” · 268 words</p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-[#F4F5F8] px-2.5 py-1 text-[10.5px] font-medium text-[#52525B] sm:inline">essay-3.pdf</span>
              </div>
              <div className="mt-3 rounded-[12px] border border-[#F1F1F4] bg-[#FCFCFD] p-3.5 text-[12.5px] leading-[1.75] text-[#3F3F46]">
                In recent years, online classes{" "}
                <span
                  ref={sentRef}
                  className={cn("rounded-[3px] transition-colors duration-300", hl ? "bg-[#FEF08A] text-[#18181B]" : "")}
                >
                  has changed the way students learn
                </span>
                . Many learners now study at their own pace and revisit lessons whenever they need to.
              </div>
              <div className="mt-3 flex min-h-[44px] items-start gap-2 rounded-[12px] bg-[#F7F5FF] px-3 py-2.5">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6C4BFF]" />
                <p className="text-[12px] leading-[1.5] text-[#27272A]">
                  {typed || <span className="text-[#9A9AA6]">Private comment for Amara…</span>}
                  {typed && typed.length < COMMENT.length && <span className="mo-caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#52525B]">Score</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#E4E4E7] text-[#18181B]">
                    <Minus className="h-3.5 w-3.5" />
                  </span>
                  <span key={score} className="mo-swap w-10 text-center font-urbanist text-[18px] font-semibold tabular-nums text-[#18181B]">
                    {score}/9
                  </span>
                  <span ref={plusRef} className="grid h-7 w-7 place-items-center rounded-full border border-[#E4E4E7] text-[#18181B]">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </div>
                <span ref={sendRef} className="rounded-full bg-[#0A0A0B] px-4 py-2 text-[12px] font-semibold text-white">
                  Return to Amara
                </span>
              </div>
            </div>
          )}

          {returned && (
            <div className="mo-swap absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] py-2 pl-2.5 pr-4 text-[11.5px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]">
              <CircleCheck className="h-4 w-4 text-[#4ADE80]" />
              Feedback returned · score added to her profile
            </div>
          )}
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Mia" />
    </div>
  );
}
