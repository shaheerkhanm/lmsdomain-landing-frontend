"use client";

import React, { useEffect, useState } from "react";

/** Ticking mm:ss countdown for the sample test (decorative). Stays still for reduced motion. */
export function Countdown({ from = 18 * 60 + 42 }: { from?: number }) {
  const [left, setLeft] = useState(from);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setLeft((s) => (s <= 60 ? from : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [from]);

  const m = Math.floor(left / 60);
  const s = left % 60;
  return (
    <span className="tabular-nums">
      {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}
