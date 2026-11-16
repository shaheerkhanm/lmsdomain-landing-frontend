import React from "react";
import { Check, Download, FileSpreadsheet, KeyRound, Laptop, Lock, Server, ShieldCheck, Smartphone, Tablet, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Face, d } from "../bento";
import { Countdown } from "../assess/Countdown";
import { PLATFORM_CARDS, type PlatformCard } from "@/content/platform/cards";

/* Sample data only. Claims match content/platform/security.ts. */

/* 1. Dynamic watermark on the video */
function WatermarkArt() {
  return (
    <div className="absolute inset-0 flex justify-center px-6 pt-6">
      <Panel className="v5-pop v5-lift w-full max-w-[440px] overflow-hidden rounded-[18px]">
        <div className="relative h-[178px] bg-[#16141F]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,#3A3550,transparent_65%)]" />
          <div className="absolute left-4 top-4 font-mono text-[11.5px] leading-[1.7] text-white/80">
            <p>
              <span className="text-[#C4B5FD]">price</span> = <span className="text-[#FCD34D]">200</span>
            </p>
            <p>
              <span className="text-[#C4B5FD]">tax</span> = price * <span className="text-[#FCD34D]">0.15</span>
            </p>
          </div>
          <span className="mo-wm absolute whitespace-nowrap rounded-[4px] bg-black/25 px-1.5 py-0.5 font-mono text-[9px] text-white/70 sm:text-[10.5px]">
            amara.okafor@mail.com · ID 20517
          </span>
          <div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-white/25">
            <div className="mo-progress h-full w-[40%] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-[12px] font-medium text-[#18181B]">Each learner sees their own details</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10.5px] font-semibold text-[#3F3F46]">
            <ShieldCheck className="h-3 w-3" /> On
          </span>
        </div>
      </Panel>
    </div>
  );
}

/* 2. Device limits */
function DevicesArt() {
  const rows = [
    { i: Laptop, t: "Laptop · Chrome", ok: true },
    { i: Smartphone, t: "Phone · Safari", ok: true },
    { i: Tablet, t: "Tablet · New sign-in", ok: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#18181B]">Devices</p>
          <span className="rounded-full bg-[#F4F5F8] px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-[#3F3F46]">2 of 2 in use</span>
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((r, i) => (
            <div
              key={r.t}
              style={d(150 + i * 140)}
              className={cn("v5-pop flex items-center gap-2.5 rounded-[11px] px-2.5 py-2", r.ok ? "bg-[#F8F8FA]" : "mo-glow bg-[#FDECEC]")}
            >
              <r.i className={cn("h-4 w-4", r.ok ? "text-[#52525B]" : "text-[#B91C1C]")} />
              <span className={cn("flex-1 truncate text-[12px] font-medium", r.ok ? "text-[#27272A]" : "text-[#B91C1C]")}>{r.t}</span>
              {r.ok ? (
                <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />
              ) : (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#B91C1C]">
                  <X className="h-3 w-3" strokeWidth={3} /> Blocked
                </span>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 3. Roles: what an instructor can and can't see */
function RolesArt() {
  const rows = [
    { t: "Their assigned batches", ok: true },
    { t: "Course materials", ok: true },
    { t: "Grade tests", ok: true },
    { t: "Revenue and payment reports", ok: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center gap-2.5">
          <Face src="/assets/img/home/participant_mia.jpg" size={34} />
          <div>
            <p className="text-[13px] font-semibold text-[#18181B]">Mia Collins</p>
            <p className="text-[11px] text-[#9A9AA6]">Instructor</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {rows.map((r, i) => (
            <p
              key={r.t}
              style={d(150 + i * 100)}
              className={cn("v5-pop flex items-center gap-2 rounded-[9px] px-2.5 py-1.5 text-[12px]", r.ok ? "bg-[#F8F8FA] text-[#27272A]" : "bg-[#FDECEC] text-[#B91C1C]")}
            >
              {r.ok ? <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} /> : <Lock className="h-3.5 w-3.5" />}
              {r.t}
            </p>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 4. Time-limited playback links */
function TokenArt() {
  return (
    <div className="absolute inset-0 flex justify-center px-6 pt-6">
      <Panel className="v5-pop v5-lift w-full max-w-[430px] rounded-[18px] p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#F4F5F8] text-[#0A0A0B]">
            <KeyRound className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-[#18181B]">Secure playback link</p>
            <p className="text-[11px] text-[#9A9AA6]">Lesson 3.2 · issued to Priya</p>
          </div>
        </div>
        <p className="mt-3 truncate rounded-[10px] bg-[#F8F8FA] px-3 py-2 font-mono text-[11px] text-[#52525B]">
          …/stream/3-2?token=•••••••••••••••
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[12px] text-[#52525B]">Expires in</span>
          <span className="rounded-full bg-[#FEF4E2] px-2.5 py-1 font-mono text-[12px] font-semibold text-[#B45309]">
            <Countdown from={4 * 60 + 59} />
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#9A9AA6]">A copied link stops working once it expires.</p>
      </Panel>
    </div>
  );
}

/* 5. Managed hosting with HTTPS */
function HostingArt() {
  const items = [
    { t: "Managed cloud hosting", m: "Servers run by our team" },
    { t: "HTTPS on every domain", m: "academy.northwind.com" },
    { t: "Encrypted with TLS", m: "Data protected in transit" },
  ];
  return (
    <div className="absolute inset-0 pl-7 pt-6">
      <div className="absolute left-[46px] top-[52px] h-[150px] w-px bg-[#DCDCE3]" />
      <Panel className="v5-pop relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <Server className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold text-[#18181B]">Your academy</span>
      </Panel>
      <div className="relative ml-[38px] mt-2.5 space-y-2">
        {items.map((s, i) => (
          <div key={s.t} style={d(150 + i * 150)} className="v5-pop relative flex">
            <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
            <Panel className="flex w-[300px] max-w-[calc(100vw-120px)] items-center gap-3 px-2.5 py-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E8F7EF] text-[#15803D]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{s.t}</p>
                <p className="truncate text-[11px] text-[#9A9AA6]">{s.m}</p>
              </div>
            </Panel>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 6. Your data, yours to export */
function DataArt() {
  const files = [
    { f: "students.csv", m: "248 rows" },
    { f: "test-results.csv", m: "1,120 rows" },
    { f: "attendance.csv", m: "3,460 rows" },
    { f: "transactions.csv", m: "386 rows" },
  ];
  return (
    <div className="absolute inset-0 pt-6">
      {files.map((x, i) => (
        <Panel
          key={x.f}
          className={cn("v5-pop relative mb-2.5 flex items-center gap-3 rounded-[14px] p-2.5", i === 0 && "v5-lift", i === 3 && "opacity-70")}
          style={{ marginLeft: 24 + i * 22, width: `min(320px, calc(100% - ${48 + i * 22}px))`, "--d": `${i * 120}ms` } as React.CSSProperties}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <FileSpreadsheet className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[12px] font-medium text-[#18181B]">{x.f}</p>
            <p className="text-[10.5px] text-[#9A9AA6]">{x.m}</p>
          </div>
          <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", i === 0 ? "mo-ping bg-[#0A0A0B] text-white" : "border border-[#E4E4E7] text-[#52525B]")}>
            <Download className="h-3.5 w-3.5" />
          </span>
        </Panel>
      ))}
    </div>
  );
}

/** Six cards (layout and pictures by position); text from Admin > Website > Platform. */
export function SecurityBento({ cards = PLATFORM_CARDS.security }: { cards?: PlatformCard[] } = {}) {
  const card = (i: number) => cards[i] || PLATFORM_CARDS.security[i];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        plan="Growth"
        title={card(0).title}
        body={card(0).text}
      >
        <WatermarkArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        plan="Pro"
        title={card(1).title}
        body={card(1).text}
      >
        <DevicesArt />
      </Card>
      <Card
        className="lg:col-span-5"
        plan="Custom roles on Pro"
        title={card(2).title}
        body={card(2).text}
      >
        <RolesArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title={card(3).title}
        body={card(3).text}
      >
        <TokenArt />
      </Card>
      <Card
        className="lg:col-span-6"
        title={card(4).title}
        body={card(4).text}
      >
        <HostingArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title={card(5).title}
        body={card(5).text}
      >
        <DataArt />
      </Card>
    </div>
  );
}
