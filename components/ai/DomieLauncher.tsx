"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="fixed right-[max(16px,env(safe-area-inset-right,0px))] bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-50 flex items-center gap-2.5 font-sans"
    >
      {/* Speech Bubble (Desktop only) */}
      <div
        className={`hidden min-[560px]:block bg-white border border-[#E8E8EC] rounded-[14px_14px_4px_14px] py-2 px-3 text-[13px] text-[#151517] font-medium shadow-[0_12px_30px_-12px_rgba(0,0,0,0.3)] transition-all duration-400 whitespace-nowrap ${
          showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5 pointer-events-none"
        }`}
      >
        Hi! Ask Domie about LMS Domain
      </div>

      {/* Domie Floating Circular Launcher (§3) */}
      <Link
        href="/platform/ai"
        aria-label="Ask Domie about LMS Domain"
        className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-[#16141F] shadow-[0_0_0_3px_rgba(108,75,255,0.35),0_12px_26px_-10px_rgba(108,75,255,0.8)] grid place-items-center overflow-hidden shrink-0 origin-center transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#6C4BFF]"
      >
        <Image
          src="/images/ai/domie/domie-bot-sm.webp"
          alt="Domie AI"
          width={52}
          height={52}
          loading="lazy"
          className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full object-cover object-center block m-0 p-0 select-none pointer-events-none"
        />
      </Link>
    </div>
  );
}

export default DomieLauncher;
