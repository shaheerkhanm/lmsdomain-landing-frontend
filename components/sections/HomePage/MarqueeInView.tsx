"use client";

import React, { useEffect, useRef } from "react";

// Runs the logo marquee only while it is on screen (CSS: [data-active]); off
// screen the tracks are paused, so the page does no animation work there.
export function MarqueeInView({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.setAttribute("data-active", "");
      else el.removeAttribute("data-active");
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default MarqueeInView;
