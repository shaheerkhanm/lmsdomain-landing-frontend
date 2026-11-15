"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LenisLike = { scrollTo: (target: HTMLElement | number, opts?: { offset?: number }) => void };

/** Sticky pill bar that jumps to each platform section and highlights the one in view. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active pill visible on small screens
  useEffect(() => {
    const bar = barRef.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (bar && pill && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -150 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="Platform sections" className="sticky top-[72px] z-30 py-3 min-[900px]:top-[86px]">
      <div className="mx-auto flex max-w-[1200px] justify-center px-[clamp(16px,4vw,40px)]">
        <div
          ref={barRef}
          className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#ECECF1] bg-white/90 p-1 shadow-[0_8px_24px_-12px_rgba(16,16,24,0.18)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((i) => (
            <a
              key={i.id}
              data-id={i.id}
              href={`#${i.id}`}
              onClick={(e) => go(e, i.id)}
              aria-current={active === i.id ? "true" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors",
                active === i.id ? "bg-[#0A0A0B] text-white" : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#0A0A0B]"
              )}
            >
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
