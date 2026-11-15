import React from "react";
import { Lock } from "lucide-react";

/**
 * Big-type visual for the 404 and error pages: a browser window on the dark stage.
 * The middle "0" is a course-style progress ring, so "404" reads as "0% found".
 */
export function ErrorScene({ code = "404", path = "lmsdomain.com/this-page", ringLabel = "0% found" }: { code?: string; path?: string; ringLabel?: string }) {
  const [a, , c] = code.split("");
  return (
    <div aria-hidden="true" className="relative isolate overflow-hidden rounded-[32px] bg-[#0B0A12] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="ai-blob ai-blob-1 -left-24 -top-24 h-[360px] w-[420px] bg-[#5B3BF0] opacity-45" />
        <div className="ai-blob ai-blob-2 -bottom-28 -right-20 h-[320px] w-[400px] bg-[#2F5BFF] opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000,transparent_85%)]" />
      </div>

      <div className="flex items-center gap-1.5 px-1 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex min-w-0 items-center gap-1.5 truncate rounded-full bg-white/[0.07] px-3 py-1 text-[12px] text-white/60">
          <Lock className="h-3 w-3 shrink-0" /> {path}
        </span>
      </div>

      <div className="flex items-center justify-center gap-[clamp(8px,2vw,20px)] py-[clamp(28px,6vw,64px)] font-urbanist font-semibold leading-none tracking-[-0.06em] text-white">
        <span className="v5-rise text-[clamp(110px,17vw,220px)]" style={{ "--d": "120ms" } as React.CSSProperties}>
          {a}
        </span>
        <span className="v5-pop relative grid aspect-square w-[clamp(96px,14vw,180px)] place-items-center" style={{ "--d": "260ms" } as React.CSSProperties}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#6C4BFF" strokeWidth="9" strokeLinecap="round" strokeDasharray="264" className="err-ring" />
          </svg>
          <span className="text-center font-sans text-[clamp(12px,1.3vw,15px)] font-semibold tracking-normal text-white/70">{ringLabel}</span>
        </span>
        <span className="v5-rise text-[clamp(110px,17vw,220px)]" style={{ "--d": "380ms" } as React.CSSProperties}>
          {c}
        </span>
      </div>
    </div>
  );
}

export default ErrorScene;
