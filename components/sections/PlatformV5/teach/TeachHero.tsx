import React from "react";
import Image from "next/image";
import { Video, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeachDemo } from "./TeachDemo";

/*
 * Teach hero: a learner's course player (lesson video + lesson list), fully contained,
 * with two small cards floating on the stage. All names and numbers are sample data.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

export function TeachHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      {/* faint dot pattern on the stage */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      {/* Course player window */}
      <div className={cn("relative mx-auto max-w-[940px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <TeachDemo />
      </div>

      {/* Floating stage cards (desktop) */}
      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-16" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <CalendarClock className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Module 3 unlocks Monday</p>
            <p className="text-[11px] text-[#9A9AA6]">Weekly drip for Batch B</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-8 right-6 hidden lg:block xl:right-16" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[264px] rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3.5", shadow)}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/assets/img/home/participant_mia.jpg"
              alt=""
              width={80}
              height={80}
              className="h-10 w-10 rounded-full object-cover object-top"
            />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-[13px] font-semibold text-[#18181B]">
                <span className="mo-ping h-1.5 w-1.5 shrink-0 rounded-full bg-[#DC2626] text-[#DC2626]" />
                Live: Loops in practice
              </p>
              <p className="text-[11.5px] text-[#9A9AA6]">Batch B · Today, 18:00</p>
            </div>
          </div>
          <span className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-[#0A0A0B] py-2 text-[12px] font-semibold text-white">
            <Video className="h-3.5 w-3.5" /> Join on Zoom
          </span>
        </div>
      </div>
    </div>
  );
}
