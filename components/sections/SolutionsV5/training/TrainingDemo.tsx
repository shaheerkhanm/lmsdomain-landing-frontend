"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, Building2, CircleCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../../PlatformV5/DemoCursor";

/*
 * Training companies hero: a client cohort dashboard.
 * Scripted demo: approve a learner's final project (progress hits 100%, certificate issued),
 * export the client's completion report, switch to another client. Loops. Sample data only.
 */

type Learner = { n: string; p: string; prog: number; cert: boolean; pending?: boolean };

const CLIENTS: Record<string, { programme: string; size: number; learners: Learner[]; done: number }> = {
  "Northwind Retail": {
    programme: "Data skills · 6 weeks",
    size: 32,
    done: 27,
    learners: [
      { n: "Sofia Rossi", p: "/assets/img/home/testimonials/author-5.jpg", prog: 100, cert: true },
      { n: "Lucas Martin", p: "/assets/img/home/testimonials/author-2.jpg", prog: 100, cert: true },
      { n: "Kenji Tanaka", p: "/assets/img/home/testimonials/author-4.jpg", prog: 90, cert: false, pending: true },
      { n: "Amara Okafor", p: "/assets/img/home/testimonials/author-3.jpg", prog: 64, cert: false },
    ],
  },
  "Bluebird Bank": {
    programme: "Customer service · 4 weeks",
    size: 18,
    done: 6,
    learners: [
      { n: "Priya Sharma", p: "/assets/img/home/testimonials/author-1.jpg", prog: 100, cert: true },
      { n: "Daniel Reyes", p: "/assets/img/home/participant_alex.jpg", prog: 72, cert: false },
      { n: "Mia Collins", p: "/assets/img/home/participant_mia.jpg", prog: 55, cert: false },
      { n: "Lucas Martin", p: "/assets/img/home/testimonials/author-2.jpg", prog: 40, cert: false },
    ],
  },
};
const CLIENT_NAMES = ["Northwind Retail", "Bluebird Bank", "Acme Logistics"];

export function TrainingDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLSpanElement>(null);
  const approveRef = useRef<HTMLSpanElement>(null);
  const exportRef = useRef<HTMLSpanElement>(null);
  const clientRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const [client, setClient] = useState("Northwind Retail");
  const [reviewing, setReviewing] = useState(false);
  const [approved, setApproved] = useState(false);
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
    const step = async (el: HTMLElement | null, after: () => void, wait = 1100) => {
      await moveTo(el);
      if (!alive) return false;
      await tap(el);
      after();
      await sleep(wait);
      return alive;
    };

    const run = async () => {
      await sleep(1500);
      const box = boxRef.current;
      if (box) setCursor({ x: box.clientWidth * 0.6, y: box.clientHeight * 0.92 });
      await sleep(500);
      while (alive) {
        if (!(await step(reviewRef.current, () => setReviewing(true), 900))) return;
        if (!(await step(approveRef.current, () => {
          setReviewing(false);
          setApproved(true);
        }, 1900))) return;
        if (!(await step(exportRef.current, () => setToast("northwind-completion-report.csv downloaded"), 1900))) return;
        setToast(null);
        if (!(await step(clientRefs.current["Bluebird Bank"], () => setClient("Bluebird Bank"), 2400))) return;
        setClient("Northwind Retail");
        setApproved(false);
        await sleep(900);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const c = CLIENTS[client];
  const isNorthwind = client === "Northwind Retail";
  const done = c.done + (isNorthwind && approved ? 1 : 0);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[12px] font-medium text-[#71717A]">Client programmes</span>
      </div>

      <div className="grid md:grid-cols-[210px_1fr]">
        {/* Clients */}
        <div className="border-b border-[#F1F1F4] p-3 md:border-b-0 md:border-r">
          <p className="px-2 pb-2 text-[11px] font-medium text-[#9A9AA6]">Clients</p>
          <div className="flex gap-1 overflow-hidden md:block md:space-y-1">
            {CLIENT_NAMES.map((n) => (
              <span
                key={n}
                ref={(el) => {
                  clientRefs.current[n] = el;
                }}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-[10px] px-2.5 py-2 text-[12px] font-medium transition-colors duration-300",
                  client === n ? "bg-[#0A0A0B] text-white" : "text-[#3F3F46]",
                  n === "Acme Logistics" && "hidden md:flex"
                )}
              >
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{n}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Cohort */}
        <div className="relative h-[400px] overflow-hidden p-4 sm:h-[340px] sm:p-5">
          <div key={client} className="mo-swap">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#18181B]">{client}</p>
                <p className="text-[11.5px] text-[#9A9AA6]">
                  {c.programme} · {c.size} learners · Private batch
                </p>
              </div>
              <span
                ref={exportRef}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[11.5px] font-semibold text-[#18181B]"
              >
                <Download className="h-3.5 w-3.5" /> Export report
              </span>
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {[
                ["Completed", `${done} / ${c.size}`],
                ["Certificates", `${done}`],
                ["Avg. test score", isNorthwind ? "81%" : "76%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
                  <p className="text-[10px] text-[#9A9AA6]">{k}</p>
                  <p key={v} className="mo-swap font-urbanist text-[17px] font-semibold tabular-nums text-[#18181B]">
                    {v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 divide-y divide-[#F1F1F4]">
              {c.learners.map((l) => {
                const nowDone = isNorthwind && l.pending && approved;
                const prog = nowDone ? 100 : l.prog;
                const cert = l.cert || nowDone;
                return (
                  <div key={l.n} className="relative flex items-center gap-2.5 py-2">
                    <Image src={l.p} alt="" width={56} height={56} className="h-7 w-7 shrink-0 rounded-full object-cover object-top" />
                    <span className="w-[76px] truncate text-[12px] font-medium text-[#27272A] sm:w-[110px]">{l.n}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F4]">
                      <span
                        className={cn("block h-full rounded-full transition-[width] duration-700", prog === 100 ? "bg-[#16A34A]" : "bg-[#0A0A0B]")}
                        style={{ width: `${prog}%` }}
                      />
                    </span>
                    <span className="hidden w-8 text-right text-[11px] tabular-nums text-[#71717A] sm:inline">{prog}%</span>
                    <span className="flex w-[104px] shrink-0 justify-end">
                      {cert ? (
                        <span className={cn("inline-flex items-center gap-1 rounded-full bg-[#F1EDFF] px-2 py-0.5 text-[10.5px] font-semibold text-[#6C4BFF]", nowDone && "mo-swap")}>
                          <Award className="h-3 w-3" /> Certified
                        </span>
                      ) : isNorthwind && l.pending ? (
                        <span ref={reviewRef} className="whitespace-nowrap rounded-full bg-[#FEF4E2] px-2 py-0.5 text-[10.5px] font-semibold text-[#B45309]">
                          Review project
                        </span>
                      ) : (
                        <span className="text-[10.5px] text-[#9A9AA6]">In progress</span>
                      )}
                    </span>
                    {isNorthwind && l.pending && reviewing && (
                      <div className="mo-swap absolute bottom-[40px] right-0 z-10 w-[230px] rounded-[14px] border border-[#ECECF1] bg-white p-3 shadow-[0_16px_32px_-12px_rgba(16,16,24,0.3)]">
                        <p className="text-[12px] font-semibold text-[#18181B]">Final project · Sales dashboard</p>
                        <p className="mt-0.5 text-[11px] text-[#9A9AA6]">sales-dashboard.pdf · Score 8 / 10</p>
                        <span ref={approveRef} className="mt-2.5 flex items-center justify-center rounded-full bg-[#0A0A0B] py-1.5 text-[11.5px] font-semibold text-white">
                          Approve project
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {toast && (
            <div className="mo-swap absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] py-2 pl-2.5 pr-4 text-[11.5px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]">
              <CircleCheck className="h-4 w-4 text-[#4ADE80]" />
              {toast}
            </div>
          )}
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Daniel" />
    </div>
  );
}
