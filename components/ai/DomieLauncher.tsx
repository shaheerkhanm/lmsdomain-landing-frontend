"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DomieOrb } from "./DomieOrb";

export function DomieLauncher() {
  const [mounted, setMounted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    setMounted(true);
    let showTimer: NodeJS.Timeout | null = null;
    let hideTimer: NodeJS.Timeout | null = null;

    try {
      if (typeof window !== "undefined" && !sessionStorage.getItem("domie_seen")) {
        showTimer = setTimeout(() => {
          setShowBubble(true);
          sessionStorage.setItem("domie_seen", "1");

          hideTimer = setTimeout(() => {
            setShowBubble(false);
          }, 6000);
        }, 2500);
      }
    } catch {}

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed right-[max(16px,env(safe-area-inset-right,0px))] bottom-[calc(16px+env(safe-area-inset-bottom,0px))] sm:right-[max(20px,env(safe-area-inset-right,0px))] sm:bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-50 flex items-center gap-2.5 font-sans"
    >
      {/* Speech Bubble (Desktop only) */}
      <div
        className={`hidden min-[560px]:block bg-white border border-[#E8E8EC] rounded-[14px_14px_4px_14px] py-1.5 px-3 text-[12.5px] text-[#151517] font-medium shadow-[0_12px_28px_-10px_rgba(0,0,0,0.25)] transition-all duration-400 whitespace-nowrap ${
          showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5 pointer-events-none"
        }`}
      >
        Hi! Ask Domie about LMS Domain
      </div>

      {/* Domie Floating Circular Launcher (Part 4: 52px desktop, 46px mobile, 1.5px ring, 4px thin dark rim) */}
      <Link
        href="/platform/ai"
        aria-label="Ask Domie about LMS Domain"
        className="group relative w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#0E0E11] border-[1.5px] border-[rgba(123,92,255,0.55)] shadow-[0_6px_20px_-6px_rgba(123,92,255,0.55)] grid place-items-center overflow-hidden shrink-0 origin-center transition-transform duration-200 hover:scale-[1.06] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#6C4BFF]"
      >
        {/* Soft scaling pulse ring */}
        <span
          className="absolute inset-0 rounded-full border border-[rgba(123,92,255,0.5)] animate-ping pointer-events-none opacity-30 duration-1000"
          aria-hidden="true"
        />

        {/* Domie Orb (38px mobile, 44px desktop, object-fit cover, thin 4px rim) */}
        <DomieOrb
          size={44}
          surface="dark"
          className="w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] relative z-10"
        />
      </Link>
    </div>
  );
}

export default DomieLauncher;
