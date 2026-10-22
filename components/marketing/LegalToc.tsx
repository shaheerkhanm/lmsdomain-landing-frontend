"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface TocHeading {
  id: string;
  text: string;
}

interface LegalTocProps {
  headings: TocHeading[];
}

export function LegalToc({ headings }: LegalTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Collapsible Accordion (< 1024px) */}
      <div className="block lg:hidden print:hidden mb-8 border border-[#ECEDEF] rounded-2xl bg-[#F9FAFB] overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left text-sm font-semibold text-[#161616] cursor-pointer"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <span className="text-[#7B5CF5]">✦</span>
            <span>On this page</span>
          </span>
          <ChevronDown
            className={`size-4 text-[#6B6F76] transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileOpen && (
          <nav className="px-5 pb-4 pt-1 border-t border-[#ECEDEF] space-y-2">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <button
                  key={heading.id}
                  type="button"
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full text-left text-sm py-1 transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#7B5CF5] font-semibold"
                      : "text-[#6B6F76] hover:text-[#161616]"
                  }`}
                >
                  {heading.text}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar (>= 1024px) */}
      <aside
        className="w-[240px] shrink-0 sticky top-28 self-start hidden lg:block print:hidden"
        aria-label="Table of contents"
      >
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8F94A0] mb-3">
          On this page
        </p>
        <nav className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <button
                key={heading.id}
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm py-1.5 transition-all cursor-pointer ${
                  isActive
                    ? "border-l-2 border-[#7B5CF5] text-[#161616] font-semibold pl-3"
                    : "border-l-2 border-transparent text-[#6B6F76] hover:text-[#161616] hover:border-slate-300 pl-3"
                }`}
              >
                {heading.text}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default LegalToc;
