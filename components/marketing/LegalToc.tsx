"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Printer } from "lucide-react";
import { usePageVisibility } from "@/lib/pages-context";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
}

/** "1. What we collect" -> { n: "1", label: "What we collect" } */
function split(text: string) {
  const m = text.match(/^(\d+)[.)]\s*(.*)$/);
  return m ? { n: m[1], label: m[2] } : { n: "", label: text };
}

/** Sticky contents list with reading progress (desktop) and a collapsible list (mobile). */
export function LegalToc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      const art = document.getElementById("legal-body");
      if (!art) return;
      const r = art.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(1, (window.innerHeight * 0.3 - r.top) / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
    setMobileOpen(false);
  };

  if (!headings.length) return null;

  return (
    <>
      {/* Mobile */}
      <div className="mb-10 overflow-hidden rounded-[20px] bg-[#F4F5F8] lg:hidden print:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-[15px] font-semibold text-[#0A0A0B]"
        >
          On this page
          <span className="flex items-center gap-2 text-[13px] font-medium text-[#71717A]">
            {headings.length} sections
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileOpen && "rotate-180")} />
          </span>
        </button>
        {mobileOpen && (
          <nav className="space-y-0.5 border-t border-[#E4E4E7] px-3 py-3">
            {headings.map((h) => {
              const { n, label } = split(h.text);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => go(h.id)}
                  className="flex w-full cursor-pointer items-start gap-3 rounded-[12px] px-2 py-2 text-left text-[14px] text-[#3F3F46] hover:bg-white"
                >
                  {n && <span className="w-5 shrink-0 font-semibold tabular-nums text-[#A1A1AA]">{n}</span>}
                  {label}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop */}
      <aside aria-label="Table of contents" className="sticky top-28 hidden w-[270px] shrink-0 self-start lg:block print:hidden">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA6]">On this page</p>
          <p className="text-[12px] font-medium tabular-nums text-[#9A9AA6]">{Math.round(progress * 100)}%</p>
        </div>
        <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-[#ECECF0]">
          <div className="h-full rounded-full bg-[#6C4BFF] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
        </div>
        <nav className="mt-4 max-h-[calc(100vh-260px)] space-y-0.5 overflow-y-auto pr-1">
          {headings.map((h) => {
            const active = activeId === h.id;
            const { n, label } = split(h.text);
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => go(h.id)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-3 rounded-[12px] px-3 py-2 text-left text-[13.5px] leading-[1.4] transition-colors",
                  active ? "bg-[#0A0A0B] text-white" : "text-[#52525B] hover:bg-[#F4F5F8] hover:text-[#0A0A0B]"
                )}
              >
                {n && <span className={cn("w-5 shrink-0 font-semibold tabular-nums", active ? "text-white/60" : "text-[#A1A1AA]")}>{n.padStart(2, "0")}</span>}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

const DOCS = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refunds" },
];

/** Pills to switch between the legal documents, plus a print button. */
export function LegalDocNav({ current }: { current: string }) {
  const { isPathVisible } = usePageVisibility();
  const docs = DOCS.filter((d) => isPathVisible(d.href));
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-nowrap print:hidden">
      <div className="inline-flex rounded-full bg-[#F4F5F8] p-1">
        {docs.map((d) => {
          const on = d.href === `/${current}`;
          return (
            <Link
              key={d.href}
              href={d.href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition-colors",
                on ? "bg-white text-[#0A0A0B] shadow-[0_1px_3px_rgba(16,16,24,0.12)]" : "text-[#71717A] hover:text-[#0A0A0B]"
              )}
            >
              {d.label}
            </Link>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-[#52525B] hover:bg-[#F4F5F8] hover:text-[#0A0A0B]"
      >
        <Printer className="h-4 w-4" /> Print
      </button>
    </div>
  );
}

export default LegalToc;
