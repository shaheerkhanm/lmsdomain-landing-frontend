import React from "react";

/**
 * Soft, slowly drifting light behind the Domie AI dark panel, plus a faint grid.
 * Blobs repeat down the panel so every section has some light. Static for reduced motion.
 */
export function AiBackdrop({ repeat = 1 }: { repeat?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      {Array.from({ length: repeat }).map((_, i) => {
        const top = (i / repeat) * 100;
        return (
          <React.Fragment key={i}>
            <div
              className="ai-blob ai-blob-1 h-[520px] w-[620px] bg-[#5B3BF0]"
              style={{ top: `calc(${top}% + 2%)`, left: i % 2 ? "55%" : "-8%", animationDelay: `${-i * 7}s` }}
            />
            <div
              className="ai-blob ai-blob-2 h-[460px] w-[560px] bg-[#2F5BFF]"
              style={{ top: `calc(${top}% + 9%)`, left: i % 2 ? "-6%" : "60%", opacity: 0.35, animationDelay: `${-i * 9}s` }}
            />
            <div
              className="ai-blob ai-blob-3 h-[380px] w-[420px] bg-[#8B5CF6]"
              style={{ top: `calc(${top}% + 16%)`, left: "30%", opacity: 0.3, animationDelay: `${-i * 5}s` }}
            />
          </React.Fragment>
        );
      })}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* keep text areas calm: darken the very edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,10,18,0.55)_100%)]" />
    </div>
  );
}
