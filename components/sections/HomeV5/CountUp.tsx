"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Counts a stat like "2,000+" up from 0 when it scrolls into view.
 * Server-renders the final value (SEO / no-JS), and does nothing for reduced-motion users.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCurrent(0);
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (!match || current === null) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {current.toLocaleString("en-US")}
      {match[3]}
    </span>
  );
}
