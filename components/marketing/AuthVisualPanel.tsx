import React from "react";
import Image from "next/image";
import { ArrowDownLeft, Check, Lock, Users, Video } from "lucide-react";
import type { AuthSidePanelCopy } from "@/types/content";

const shade = "shadow-[0_2px_4px_rgba(0,0,0,0.15),0_30px_60px_-24px_rgba(0,0,0,0.6)]";

/**
 * Login / signup side panel: the site's dark premium panel with a layered academy
 * dashboard (sample data) and the admin-editable copy. No AI-style decoration.
 */
export function AuthVisualPanel({ sidePanel }: { sidePanel: AuthSidePanelCopy }) {
  return (
    <div
      role="region"
      aria-label="LMS Domain overview"
      className="relative isolate flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-[32px] bg-[#0B0A12] p-10 text-white xl:p-14"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="ai-blob ai-blob-1 left-[-10%] top-[-10%] h-[460px] w-[560px] bg-[#5B3BF0] opacity-45" />
        <div className="ai-blob ai-blob-2 bottom-[-15%] right-[-10%] h-[420px] w-[520px] bg-[#2F5BFF] opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,#000,transparent_85%)]" />
      </div>

      {/* Scene */}
      <div aria-hidden="true" className="relative mx-auto mt-2 h-[400px] w-full max-w-[520px] origin-top xl:scale-[1.08] min-[1600px]:scale-[1.18]">
        {/* dashboard */}
        <div className={`v5-rise absolute left-0 top-6 w-[380px] overflow-hidden rounded-[18px] bg-white text-[#18181B] ${shade}`} style={{ "--d": "150ms" } as React.CSSProperties}>
          <div className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 flex items-center gap-1 text-[11px] text-[#71717A]">
              <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> learn.apexacademy.com/admin
            </span>
          </div>
          <div className="p-4">
            <p className="text-[12px] text-[#71717A]">Good morning, Sarah</p>
            <p className="font-urbanist text-[18px] font-semibold">Apex Academy today</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["248", "Learners"],
                ["6", "Classes today"],
                ["$1,486", "This week"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-[10px] bg-[#F8F8FA] p-2.5">
                  <p className="font-urbanist text-[17px] font-semibold">{v}</p>
                  <p className="text-[10px] text-[#71717A]">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10.5px] font-medium text-[#71717A]">Enrolments, last 7 days</p>
            <div className="mt-1.5 flex h-12 items-end gap-1.5">
              {[40, 58, 46, 72, 64, 86, 78].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === 5 ? "#6C4BFF" : "#E4E4E7" }} />
              ))}
            </div>
          </div>
        </div>

        {/* live class */}
        <div className="mo-float absolute right-0 top-0" style={{ "--fd": "0s" } as React.CSSProperties}>
          <div className={`v5-rise w-[220px] rounded-[16px] bg-white p-3.5 text-[#18181B] ${shade}`} style={{ "--d": "450ms" } as React.CSSProperties}>
            <div className="flex items-center gap-2.5">
              <Image src="/assets/img/home/participant_alex.jpg" alt="" width={72} height={72} className="h-9 w-9 rounded-full object-cover object-top" />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate text-[12.5px] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" /> Live now
                </p>
                <p className="truncate text-[10.5px] text-[#71717A]">Algebra · Batch B</p>
              </div>
            </div>
            <p className="mt-2.5 flex items-center justify-between rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[11px]">
              <span className="flex items-center gap-1.5 text-[#52525B]">
                <Users className="h-3 w-3" /> 23 of 24 joined
              </span>
              <Video className="h-3 w-3 text-[#71717A]" />
            </p>
          </div>
        </div>

        {/* learner progress */}
        <div className="mo-float absolute bottom-2 left-6" style={{ "--fd": "-1.5s" } as React.CSSProperties}>
          <div className={`v5-rise w-[230px] rounded-[14px] bg-white p-3 text-[#18181B] ${shade}`} style={{ "--d": "750ms" } as React.CSSProperties}>
            <div className="flex items-center gap-2.5">
              <Image src="/assets/img/home/participant_mia.jpg" alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover object-top" />
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold">Mia finished Module 3</p>
                <p className="text-[10.5px] text-[#71717A]">Web Design Basics</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F4]">
                <span className="block h-full w-[75%] rounded-full bg-[#6C4BFF]" />
              </span>
              <span className="text-[10.5px] font-semibold text-[#52525B]">75%</span>
            </div>
          </div>
        </div>

        {/* sale */}
        <div className="mo-float absolute bottom-20 right-0" style={{ "--fd": "-3s" } as React.CSSProperties}>
          <div className={`v5-rise flex w-[240px] items-center gap-2.5 rounded-[14px] bg-white p-3 text-[#18181B] ${shade}`} style={{ "--d": "600ms" } as React.CSSProperties}>
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
              <ArrowDownLeft className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">Course sale · Stripe</p>
              <p className="text-[10.5px] text-[#71717A]">Just now</p>
            </div>
            <span className="text-[12.5px] font-semibold text-[#15803D]">+$59</span>
          </div>
        </div>
      </div>

      {/* Copy (from Admin) */}
      <div className="relative max-w-[480px]">
        <h2 className="font-urbanist text-[clamp(28px,2.6vw,38px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">{sidePanel.title}</h2>
        {sidePanel.subtitle && <p className="mt-3 text-[15.5px] leading-[1.6] text-white/65">{sidePanel.subtitle}</p>}
        {sidePanel.bullets && sidePanel.bullets.length > 0 && (
          <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {sidePanel.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] text-white/85">
                <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#6C4BFF] p-0.5">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AuthVisualPanel;
