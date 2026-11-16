import React from "react";
import { BookOpen, FileText, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiDemo } from "./AiDemo";

/*
 * Domie AI hero (sits on the dark hero): a learner's course page with the course-help chat
 * and a scripted cursor demo, plus two plain floating cards. No glow or sparkle decoration.
 */

const shadow = "shadow-[0_1px_2px_rgba(0,0,0,0.2),0_30px_60px_-24px_rgba(0,0,0,0.6)]";

export function AiHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] border border-white/10 bg-white/[0.03] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className={cn("relative mx-auto max-w-[940px] overflow-hidden rounded-[20px] bg-white", shadow)}>
        <AiDemo />
      </div>

      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <Moon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Answered at 11:42 pm</p>
            <p className="text-[11px] text-[#9A9AA6]">While the instructor was offline</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-24 right-6 hidden lg:block xl:right-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[250px] rotate-[2deg] rounded-[16px] bg-white p-3.5", shadow)}
        >
          <p className="text-[11px] text-[#9A9AA6]">Domie answers only from</p>
          <div className="mt-2 space-y-1.5">
            {[
              ["48 published lessons", BookOpen],
              ["12 PDF notes", FileText],
            ].map(([t, Icon]) => {
              const I = Icon as typeof BookOpen;
              return (
                <p key={t as string} className="flex items-center gap-2 rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[12px] font-medium text-[#18181B]">
                  <I className="h-3.5 w-3.5 text-[#52525B]" /> {t as string}
                </p>
              );
            })}
          </div>
          <p className="mt-2 text-[10.5px] text-[#9A9AA6]">Python for Beginners</p>
        </div>
      </div>
    </div>
  );
}
