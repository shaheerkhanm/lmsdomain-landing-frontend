"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./primitives";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { HOME_SELL_GROW, type HomeSellGrowContent } from "@/content/home/sell-grow";

/*
 * Homepage "Sell and grow". One sample order receipt; every line is a selling tool at work,
 * with a plain margin note (number, name, plan) joined to it by a hairline.
 * Deliberately quiet: black type, monospace amounts, one accent for the note dots.
 * Desktop: notes alternate left and right. Phones: the note sits under its line.
 * Academy, learners and amounts are sample data.
 */

type NoteKey = "store" | "coupon" | "upsell" | "recovery" | "affiliate" | "subs";
type Row =
  | { kind: "head" }
  | { kind: "rule" }
  | { kind: "item"; name: string; sub?: string; amount: string; note: NoteKey; side: "L" | "R"; muted?: boolean }
  | { kind: "total" }
  | { kind: "event"; text: string; note: NoteKey; side: "L" | "R" }
  | { kind: "foot" };

const ROWS: Row[] = [
  { kind: "head" },
  { kind: "rule" },
  { kind: "item", name: "Python for Beginners", sub: "Course · lifetime access", amount: "$49.00", note: "store", side: "L" },
  { kind: "item", name: "Coupon LAUNCH20", sub: "20% off", amount: "−$9.80", note: "coupon", side: "R", muted: true },
  { kind: "item", name: "Data Analysis", sub: "Added after payment, 30% off", amount: "$35.00", note: "upsell", side: "L" },
  { kind: "rule" },
  { kind: "total" },
  { kind: "rule" },
  { kind: "event", text: "Mia came back from a cart reminder, 1 hour later", note: "recovery", side: "R" },
  { kind: "event", text: "Referred by Ravi · 20% commission, $14.84", note: "affiliate", side: "L" },
  { kind: "event", text: "Also joined All-access · $19 a month", note: "subs", side: "R" },
  { kind: "foot" },
];
const ORDER: NoteKey[] = ["store", "coupon", "upsell", "recovery", "affiliate", "subs"];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/** The admin's notes are a list by position (ORDER); missing rows fall back to the built-in text. */
const noteOf = (data: HomeSellGrowContent, k: NoteKey) => data.notes[ORDER.indexOf(k)] || HOME_SELL_GROW.notes[ORDER.indexOf(k)];

function NoteText({ k, data, align }: { k: NoteKey; data: HomeSellGrowContent; align: "left" | "right" }) {
  const n = noteOf(data, k);
  return (
    <span className={cn("block w-full", align === "right" && "text-right")}>
      <span className="block text-[14px] font-semibold leading-snug text-[#0A0A0B]">
        <span className="mr-1.5 font-mono text-[11.5px] font-medium text-[#A1A1AA]">{String(ORDER.indexOf(k) + 1).padStart(2, "0")}</span>
        {n.title}
      </span>
      <span className="mt-0.5 block text-[13px] leading-[1.45] text-[#6B6B76]">{n.text}</span>
      <span className="mt-0.5 block text-[12px] text-[#A1A1AA]">{n.plan}</span>
    </span>
  );
}

export function SellGrowSection({ data = HOME_SELL_GROW }: { data?: HomeSellGrowContent }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reveal = (r: number): React.CSSProperties => ({ transitionDelay: inView ? `${200 + r * 90}ms` : "0ms" });
  const shown = inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0";

  return (
    <section id="sell-grow" className="bg-white py-[clamp(72px,9vw,120px)]">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

        <div ref={ref} className="relative mx-auto mt-12 grid max-w-[1120px] grid-cols-1 lg:mt-16 lg:grid-cols-[1fr_minmax(0,420px)_1fr]">
          {/* the paper: white, perforated bottom edge, soft shadow */}
          <div
            aria-hidden="true"
            className={cn("pointer-events-none col-start-1 transition-all duration-700 lg:col-start-2", inView ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0")}
            style={{ gridRow: `1 / span ${ROWS.length}`, filter: "drop-shadow(0 1px 1px rgba(16,16,24,0.06)) drop-shadow(0 18px 36px rgba(16,16,24,0.12))" }}
          >
            <div
              className="h-full rounded-t-[6px] border-x border-t border-[#EDEDF1] bg-white"
              style={{
                WebkitMaskImage: "radial-gradient(circle at 8px 100%, transparent 6px, #000 6.5px)",
                maskImage: "radial-gradient(circle at 8px 100%, transparent 6px, #000 6.5px)",
                WebkitMaskSize: "16px 100%",
                maskSize: "16px 100%",
              }}
            />
          </div>

          {ROWS.map((row, i) => {
            const r = i + 1;
            const center = "relative col-start-1 px-6 transition-all duration-500 sm:px-8 lg:col-start-2";
            if (row.kind === "head")
              return (
                <div key={i} className={cn(center, "flex items-center justify-between pb-4 pt-7", shown)} style={{ gridRow: r, ...reveal(0) }}>
                  <span className="flex items-center gap-2.5">
                    <NorthwindMark size={30} />
                    <span className="leading-tight">
                      <span className="block text-[14px] font-semibold text-[#0A0A0B]">Northwind Academy</span>
                      <span className="block text-[12px] text-[#9A9AA6]">academy.northwind.com</span>
                    </span>
                  </span>
                  <span className="text-right font-mono text-[11.5px] leading-tight text-[#9A9AA6]">
                    Order 1042
                    <br />
                    18 Nov, 7:42 PM
                  </span>
                </div>
              );
            if (row.kind === "rule")
              return <div key={i} aria-hidden="true" className={cn(center, "py-1")} style={{ gridRow: r }}><span className="block border-t border-dashed border-[#DCDCE3]" /></div>;
            if (row.kind === "total")
              return (
                <div key={i} className={cn(center, "flex items-baseline justify-between py-3", shown)} style={{ gridRow: r, ...reveal(4) }}>
                  <span className="text-[14px] font-semibold text-[#0A0A0B]">Paid by Mia</span>
                  <span className="font-mono text-[22px] font-semibold tracking-[-0.02em] text-[#0A0A0B]">$74.20</span>
                </div>
              );
            if (row.kind === "foot")
              return (
                <div key={i} className={cn(center, "pb-9 pt-4", shown)} style={{ gridRow: r, ...reveal(8) }}>
                  <span className="block border-t border-dashed border-[#DCDCE3] pt-4 text-center text-[12px] leading-[1.5] text-[#9A9AA6]">
                    <span className="block font-mono text-[11.5px] text-[#71717A]">{data.invoiceLine}</span>
                    <span className="mt-1 block">{data.footnote}</span>
                  </span>
                </div>
              );

            const order = ORDER.indexOf(row.note);
            const noteCell = (
              <div key={`n${i}`} aria-hidden="true" className={cn("relative hidden lg:block", row.side === "L" ? "col-start-1" : "col-start-3")} style={{ gridRow: r }}>
                {/* floats beside its line, so the receipt keeps its own tight rhythm */}
                <div className={cn("absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center gap-3", row.side === "R" && "flex-row-reverse")}>
                <span className={cn("min-w-0 max-w-[260px] shrink transition-all duration-500", shown)} style={reveal(order + 1)}>
                  <NoteText k={row.note} data={data} align={row.side === "L" ? "right" : "left"} />
                </span>
                <span
                  className={cn("h-px min-w-[24px] flex-1 bg-[#D4D4D8] transition-transform duration-700", row.side === "L" ? "origin-right" : "origin-left", inView ? "scale-x-100" : "scale-x-0")}
                  style={reveal(order + 1)}
                />
                <span className={cn("relative z-10 h-2 w-2 shrink-0 rounded-full bg-[#6C4BFF] ring-4 ring-white transition-opacity duration-500", inView ? "opacity-100" : "opacity-0", row.side === "L" ? "-mr-1" : "-ml-1")} style={reveal(order + 1)} />
                </div>
              </div>
            );
            const mobileNote = (
              <span className="mt-1.5 block text-[12px] text-[#9A9AA6] lg:hidden">
                <span className="font-mono text-[#6C4BFF]">{String(order + 1).padStart(2, "0")}</span> {noteOf(data, row.note).title} · {noteOf(data, row.note).plan}
              </span>
            );

            if (row.kind === "item")
              return (
                <React.Fragment key={i}>
                  <div className={cn(center, "py-3.5", shown)} style={{ gridRow: r, ...reveal(order + 1) }}>
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="min-w-0">
                        <span className={cn("block text-[14.5px] font-medium", row.muted ? "text-[#52525B]" : "text-[#0A0A0B]")}>{row.name}</span>
                        {row.sub && <span className="block text-[12.5px] text-[#9A9AA6]">{row.sub}</span>}
                      </span>
                      <span className={cn("shrink-0 font-mono text-[14px]", row.muted ? "text-[#52525B]" : "text-[#0A0A0B]")}>{row.amount}</span>
                    </span>
                    {mobileNote}
                  </div>
                  {noteCell}
                </React.Fragment>
              );
            return (
              <React.Fragment key={i}>
                <div className={cn(center, "py-3", shown)} style={{ gridRow: r, ...reveal(order + 1) }}>
                  <span className="block text-[13.5px] leading-[1.45] text-[#3F3F46]">{row.text}</span>
                  {mobileNote}
                </div>
                {noteCell}
              </React.Fragment>
            );
          })}
        </div>

        {/* Also included: the rest of the selling tools, as plain text */}
        <div className="rv-v4 mx-auto mt-16 max-w-[1120px]">
          <p className="text-center text-[13px] font-medium text-[#71717A]">{data.alsoTitle}</p>
          <div className="mt-5 grid border-t border-[#ECECEF] sm:grid-cols-2 lg:grid-cols-4">
            {data.also.map((a, i) => (
              <div
                key={a.title}
                className={cn(
                  "border-b border-[#ECECEF] px-1 py-5 sm:px-6 lg:border-b-0 lg:py-6",
                  i % 2 === 1 && "sm:border-l",
                  i > 0 && "lg:border-l",
                  i === 0 && "lg:pl-0",
                  i === 3 && "lg:pr-0"
                )}
              >
                <p className="text-[14.5px] font-semibold text-[#0A0A0B]">{a.title}</p>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-[#6B6B76]">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href={data.linkHref} className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
            {data.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
