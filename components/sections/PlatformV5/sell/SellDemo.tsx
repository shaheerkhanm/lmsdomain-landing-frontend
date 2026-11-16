"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Lock, Tag, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoCursor, pointIn, type DemoPos } from "../DemoCursor";
import { BrandMark, type BrandName } from "@/components/brand/PartnerMarks";

/*
 * Sell hero window with a scripted demo: a learner types a coupon, applies it,
 * picks a payment gateway and pays; the enrolment confirmation appears. Loops.
 * Decorative only (aria-hidden on the parent). Static for reduced motion. Sample data only.
 */

const GATEWAYS: { n: BrandName; m: string }[] = [
  { n: "Razorpay", m: "Cards and local methods" },
  { n: "Stripe", m: "Cards and wallets" },
  { n: "Paytm", m: "Wallet and local methods" },
  { n: "DOKU", m: "Local payment methods" },
];

const CODE = "EARLYBIRD";

export function SellDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSpanElement>(null);
  const applyRef = useRef<HTMLSpanElement>(null);
  const gwRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const payRef = useRef<HTMLSpanElement>(null);

  const [typed, setTyped] = useState("");
  const [focus, setFocus] = useState(false);
  const [applied, setApplied] = useState(false);
  const [gw, setGw] = useState(0);
  const [paid, setPaid] = useState(false);
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
      if (box) setCursor({ x: box.clientWidth * 0.5, y: box.clientHeight * 0.9 });
      await sleep(600);
      while (alive) {
        // 1. type the coupon
        await moveTo(inputRef.current);
        if (!alive) return;
        await tap(inputRef.current);
        setFocus(true);
        for (let i = 1; i <= CODE.length && alive; i++) {
          setTyped(CODE.slice(0, i));
          await sleep(110);
        }
        await sleep(300);
        // 2. apply it
        await moveTo(applyRef.current);
        if (!alive) return;
        await tap(applyRef.current);
        setFocus(false);
        setApplied(true);
        await sleep(1100);
        // 3. choose Stripe
        await moveTo(gwRefs.current[1]);
        if (!alive) return;
        await tap(gwRefs.current[1]);
        setGw(1);
        await sleep(900);
        // 4. pay
        await moveTo(payRef.current);
        if (!alive) return;
        await tap(payRef.current);
        setPaid(true);
        await sleep(2600);
        // reset
        setPaid(false);
        setApplied(false);
        setTyped("");
        setGw(0);
        await sleep(1200);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const total = applied ? 199 : 249;

  return (
    <div ref={boxRef} className="relative">
      {/* Browser bar on the academy's own domain */}
      <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 inline-flex min-w-0 items-center gap-1.5 truncate rounded-[7px] bg-[#F4F4F5] px-2.5 py-1 text-[11.5px] text-[#71717A]">
          <Lock className="h-3 w-3 shrink-0 text-[#16A34A]" /> academy.northwind.com/checkout
        </span>
      </div>

      <div className="relative grid md:grid-cols-[1.15fr_1fr]">
        {/* Order summary */}
        <div className="p-4 sm:p-6">
          <p className="text-[12px] font-medium text-[#71717A]">Your order</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#0F766E,#134E4A)]">
              <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-wide text-white/80">Bootcamp</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-semibold text-[#18181B]">Data Analysis Bootcamp</p>
              <p className="text-[12px] text-[#9A9AA6]">8 weeks · Live + recorded · Northwind Academy</p>
            </div>
          </div>

          <p className="mt-5 text-[12px] font-medium text-[#71717A]">Coupon code</p>
          <div className="mt-2 flex gap-2">
            <span
              ref={inputRef}
              className={cn(
                "flex h-10 flex-1 items-center rounded-[10px] border px-3 font-mono text-[13px] tracking-wide transition-colors",
                focus ? "border-[#6C4BFF] ring-2 ring-[#6C4BFF]/15" : applied ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#E4E4E7]",
                typed ? "text-[#18181B]" : "text-[#B4B4BE]"
              )}
            >
              {typed || "Enter code"}
              {focus && <span className="mo-caret ml-0.5 inline-block h-[1.1em] w-[1.5px] bg-[#18181B]" />}
              {applied && <Check className="ml-auto h-4 w-4 text-[#16A34A]" strokeWidth={3} />}
            </span>
            <span
              ref={applyRef}
              className="inline-flex h-10 items-center rounded-[10px] border border-[#E4E4E7] px-4 text-[12.5px] font-semibold text-[#18181B]"
            >
              Apply
            </span>
          </div>

          <div className="mt-5 space-y-2 border-t border-[#F1F1F4] pt-4 text-[13px]">
            <div className="flex justify-between text-[#52525B]">
              <span>Course price</span>
              <span className="tabular-nums">$249.00</span>
            </div>
            {applied && (
              <div className="mo-swap flex justify-between font-medium text-[#15803D]">
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> EARLYBIRD ($50 off)
                </span>
                <span className="tabular-nums">−$50.00</span>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-semibold text-[#18181B]">Total</span>
              <span key={total} className="mo-swap font-urbanist text-[26px] font-semibold tabular-nums text-[#18181B]">
                ${total}.00
              </span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="border-t border-[#F1F1F4] p-4 sm:p-6 md:border-l md:border-t-0">
          <p className="text-[12px] font-medium text-[#71717A]">Pay with</p>
          <div className="mt-3 space-y-2">
            {GATEWAYS.map((g, i) => (
              <span
                key={g.n}
                ref={(el) => {
                  gwRefs.current[i] = el;
                }}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] border px-3 py-2.5 transition-colors duration-300",
                  gw === i ? "border-[#0A0A0B] bg-[#FAFAFB]" : "border-[#EDEDF1]",
                  i === 3 && "hidden sm:flex"
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    gw === i ? "border-[#0A0A0B]" : "border-[#D4D4D8]"
                  )}
                >
                  {gw === i && <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0B]" />}
                </span>
                <BrandMark name={g.n} size={24} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-semibold text-[#18181B]">{g.n}</span>
                  <span className="block truncate text-[10.5px] text-[#9A9AA6]">{g.m}</span>
                </span>
              </span>
            ))}
          </div>
          <span
            ref={payRef}
            className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-[#0A0A0B] text-[13.5px] font-semibold text-white"
          >
            <Lock className="h-3.5 w-3.5" /> Pay ${total}.00
          </span>
          <p className="mt-2.5 text-center text-[10.5px] text-[#9A9AA6]">Payment goes straight to Northwind Academy</p>
        </div>

        {/* Success */}
        {paid && (
          <div className="mo-swap absolute inset-0 z-10 grid place-items-center bg-white/95 backdrop-blur-[2px]">
            <div className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#E8F7EF] text-[#15803D]">
                <CircleCheck className="h-7 w-7" />
              </span>
              <p className="mt-4 font-urbanist text-[22px] font-semibold text-[#18181B]">Payment received</p>
              <p className="mt-1 text-[13px] text-[#71717A]">You&apos;re enrolled in Data Analysis Bootcamp</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-4 py-2 text-[12.5px] font-semibold text-white">
                Start learning
              </span>
            </div>
          </div>
        )}
      </div>

      <DemoCursor cursor={cursor} click={click} clickKey={clickKey} pressing={pressing} label="Asha" />
    </div>
  );
}
