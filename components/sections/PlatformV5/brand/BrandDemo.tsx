"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Globe, Loader2, Lock, Upload, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";

/*
 * Brand hero window with a scripted demo: an admin uploads a logo, picks a brand colour,
 * connects their own domain (SSL turns on) and publishes. The live preview updates as they go.
 * Loops. Decorative only (aria-hidden on the parent). Static for reduced motion. Sample data only.
 */

const SWATCHES = [
  { c: "#18181B", soft: "#F4F4F5" },
  { c: "#0F766E", soft: "#E6F4F1" },
  { c: "#6C4BFF", soft: "#F1EDFF" },
  { c: "#C2410C", soft: "#FFF1E8" },
];
const DOMAIN = "academy.northwind.com";

export function BrandDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLSpanElement>(null);
  const swRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const domainRef = useRef<HTMLSpanElement>(null);
  const connectRef = useRef<HTMLSpanElement>(null);
  const publishRef = useRef<HTMLSpanElement>(null);

  const [logo, setLogo] = useState(false);
  const [sw, setSw] = useState(0);
  const [typed, setTyped] = useState("");
  const [focus, setFocus] = useState(false);
  const [dns, setDns] = useState<"idle" | "checking" | "live">("idle");
  const [toast, setToast] = useState(false);
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
      if (box) setCursor({ x: box.clientWidth * 0.6, y: box.clientHeight * 0.9 });
      await sleep(600);
      while (alive) {
        await moveTo(uploadRef.current);
        if (!alive) return;
        await tap(uploadRef.current);
        setLogo(true);
        await sleep(900);

        await moveTo(swRefs.current[1]);
        if (!alive) return;
        await tap(swRefs.current[1]);
        setSw(1);
        await sleep(1000);

        await moveTo(domainRef.current);
        if (!alive) return;
        await tap(domainRef.current);
        setFocus(true);
        for (let i = 1; i <= DOMAIN.length && alive; i++) {
          setTyped(DOMAIN.slice(0, i));
          await sleep(55);
        }
        await sleep(250);
        await moveTo(connectRef.current);
        if (!alive) return;
        await tap(connectRef.current);
        setFocus(false);
        setDns("checking");
        await sleep(1300);
        setDns("live");
        await sleep(1000);

        await moveTo(publishRef.current);
        if (!alive) return;
        await tap(publishRef.current);
        setToast(true);
        await sleep(2200);

        setToast(false);
        setLogo(false);
        setSw(0);
        setTyped("");
        setDns("idle");
        await sleep(1300);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const theme = SWATCHES[sw];

  return (
    <div ref={boxRef} className="relative">
      {/* Editor top bar */}
      <div className="flex items-center gap-3 border-b border-[#F1F1F4] px-4 py-3 sm:px-5">
        <p className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-[#18181B]">Website · Brand settings</p>
        <span className="hidden text-[11.5px] text-[#9A9AA6] sm:inline">Saved</span>
        <span ref={publishRef} className="rounded-full bg-[#0A0A0B] px-3.5 py-1.5 text-[12px] font-semibold text-white">
          Publish
        </span>
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Settings */}
        <div className="space-y-5 border-b border-[#F1F1F4] p-4 sm:p-5 md:border-b-0 md:border-r">
          <div>
            <p className="text-[12px] font-semibold text-[#18181B]">Logo</p>
            <div className="mt-2 flex items-center gap-3">
              <span
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-[10px] border text-[15px] font-bold transition-colors duration-500",
                  logo ? "border-transparent text-white" : "border-dashed border-[#D4D4D8] text-[#B4B4BE]"
                )}
                style={logo ? { background: theme.c } : undefined}
              >
                {logo ? "N" : "?"}
              </span>
              <span
                ref={uploadRef}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[11.5px] font-semibold text-[#18181B]"
              >
                {logo ? <Check className="h-3 w-3 text-[#16A34A]" strokeWidth={3} /> : <Upload className="h-3 w-3" />}
                {logo ? "logo.svg" : "Upload logo"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-[#18181B]">Brand colour</p>
            <div className="mt-2 flex gap-2.5">
              {SWATCHES.map((s, i) => (
                <span
                  key={s.c}
                  ref={(el) => {
                    swRefs.current[i] = el;
                  }}
                  className={cn("h-8 w-8 rounded-full transition-shadow duration-300", sw === i && "ring-2 ring-offset-2")}
                  style={{ background: s.c, ...(sw === i ? ({ "--tw-ring-color": s.c } as React.CSSProperties) : {}) }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-semibold text-[#18181B]">Your domain</p>
            <div className="mt-2 flex gap-2">
              <span
                ref={domainRef}
                className={cn(
                  "flex h-9 min-w-0 flex-1 items-center gap-1.5 truncate rounded-[10px] border px-2.5 text-[12px] transition-colors",
                  focus ? "border-[#6C4BFF] ring-2 ring-[#6C4BFF]/15" : "border-[#E4E4E7]",
                  typed ? "text-[#18181B]" : "text-[#B4B4BE]"
                )}
              >
                <Globe className="h-3.5 w-3.5 shrink-0 text-[#9A9AA6]" />
                <span className="truncate">{typed || "yourdomain.com"}</span>
                {focus && <span className="mo-caret inline-block h-[1.1em] w-[1.5px] shrink-0 bg-[#18181B]" />}
              </span>
              <span
                ref={connectRef}
                className="inline-flex h-9 items-center rounded-[10px] border border-[#E4E4E7] px-3 text-[11.5px] font-semibold text-[#18181B]"
              >
                Connect
              </span>
            </div>
            <p className="mt-2 flex h-4 items-center gap-1.5 text-[11px]">
              {dns === "checking" && (
                <span className="mo-swap inline-flex items-center gap-1.5 text-[#71717A]">
                  <Loader2 className="h-3 w-3 animate-spin" /> Checking DNS…
                </span>
              )}
              {dns === "live" && (
                <span className="mo-swap inline-flex items-center gap-1.5 font-semibold text-[#15803D]">
                  <Lock className="h-3 w-3" /> Connected · SSL active
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Live preview */}
        <div className="relative bg-[#FAFAFB] p-4 sm:p-5">
          <div className="overflow-hidden rounded-[14px] border border-[#ECECF1] bg-white shadow-[0_12px_32px_-18px_rgba(16,16,24,0.25)]">
            <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
              <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
              <span className="ml-2 inline-flex min-w-0 items-center gap-1 truncate rounded-[6px] bg-[#F4F4F5] px-2 py-0.5 text-[10.5px] text-[#71717A]">
                {dns === "live" ? (
                  <>
                    <Lock className="h-2.5 w-2.5 shrink-0 text-[#16A34A]" /> {DOMAIN}
                  </>
                ) : (
                  "Preview"
                )}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-[6px] text-[11px] font-bold transition-colors duration-500",
                    logo ? "text-white" : "border border-dashed border-[#D4D4D8] text-[#B4B4BE]"
                  )}
                  style={logo ? { background: theme.c } : undefined}
                >
                  {logo ? "N" : "?"}
                </span>
                <p className="text-[12.5px] font-semibold text-[#18181B]">{logo ? "Northwind Academy" : "Your academy"}</p>
              </div>
              <div className="hidden gap-3 text-[11px] text-[#71717A] sm:flex">
                <span>Courses</span>
                <span>Batches</span>
                <span>Blog</span>
              </div>
            </div>
            <div className="mx-4 rounded-[12px] p-4 transition-colors duration-500 sm:p-5" style={{ background: theme.c }}>
              <p className="font-urbanist text-[17px] font-semibold leading-tight text-white sm:text-[20px]">Learn data skills with live mentors</p>
              <p className="mt-1 text-[11px] text-white/70">New batches start 3 March</p>
              <span className="mt-3 inline-block rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold transition-colors duration-500" style={{ color: theme.c }}>
                Enrol now
              </span>
            </div>
            <div className="m-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((k) => (
                <div key={k} className="overflow-hidden rounded-[10px] border border-[#F1F1F4]">
                  <span className="block h-10 transition-colors duration-500" style={{ background: theme.soft }} />
                  <span className="mx-2 my-2 block h-1.5 w-3/4 rounded-full bg-[#ECECF1]" />
                </div>
              ))}
            </div>
          </div>

          {toast && (
            <div className="mo-swap absolute left-1/2 top-12 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] py-2 pl-2.5 pr-4 text-[12px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]">
              <CircleCheck className="h-4 w-4 text-[#4ADE80]" />
              Site published on {DOMAIN}
            </div>
          )}
        </div>
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Admin" />
    </div>
  );
}
