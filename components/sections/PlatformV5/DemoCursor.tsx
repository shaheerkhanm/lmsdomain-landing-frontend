"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type DemoPos = { x: number; y: number };

/** Coloured demo cursor with a name tag, plus the click ripple. Used by the scripted hero demos. */
export function DemoCursor({
  cursor,
  click,
  clickKey,
  pressing,
  label,
}: {
  cursor: DemoPos | null;
  click: DemoPos | null;
  clickKey: number;
  pressing: boolean;
  label: string;
}) {
  return (
    <>
      {click && (
        <span
          key={clickKey}
          className="mo-ripple pointer-events-none absolute z-20 h-10 w-10 rounded-full bg-[#6C4BFF]/40"
          style={{ left: click.x, top: click.y }}
        />
      )}
      {cursor && (
        <div
          className="pointer-events-none absolute z-30 transition-[left,top] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <div className={cn("origin-top-left transition-transform duration-150", pressing ? "scale-[0.82]" : "scale-100")}>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" className="drop-shadow-[0_4px_8px_rgba(108,75,255,0.45)]">
              <path d="M2 2l17 8.5-7.5 2.2L8 20.5 2 2z" fill="#6C4BFF" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span className="-mt-1 ml-4 inline-block whitespace-nowrap rounded-full bg-[#6C4BFF] px-2 py-0.5 text-[10.5px] font-semibold text-white shadow-[0_4px_10px_-2px_rgba(108,75,255,0.5)]">
              {label}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

/** Centre-left point of an element, relative to a container (where the cursor tip should land). */
export function pointIn(box: HTMLElement | null, el: HTMLElement | null): DemoPos | null {
  if (!box || !el) return null;
  const b = box.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - b.left + Math.min(r.width * 0.3, 60), y: r.top - b.top + r.height * 0.55 };
}
