import React from "react";
import { Check, Globe, GripVertical, Lock, Mail, Award, LayoutDashboard, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, d } from "../bento";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORM_CARDS, type PlatformCard } from "@/content/platform/cards";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { CourseScreen, Phone } from "@/components/sections/mobile/AppScreens";
import { AppleIcon, GooglePlayIcon } from "@/components/sections/mobile/StoreIcons";

/* Sample data only. Claims match content/platform/brand.ts. */

const TEAL = "#0F766E";

/* 1. Own domain with automatic SSL: connection steps joined by a line */
function DomainArt() {
  const steps = [
    { t: "DNS record found", m: "CNAME · academy" },
    { t: "SSL certificate issued", m: "Renews automatically" },
    { t: "Live on your domain", m: "https://academy.northwind.com" },
  ];
  return (
    <div className="absolute inset-0 pl-7 pt-6">
      <div className="absolute left-[46px] top-[52px] h-[138px] w-px bg-[#DCDCE3]" />
      <Panel className="v5-pop relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <Globe className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold text-[#18181B]">academy.northwind.com</span>
      </Panel>
      <div className="relative ml-[38px] mt-2.5 space-y-2">
        {steps.map((s, i) => (
          <div key={s.t} style={d(150 + i * 160)} className="v5-pop relative flex">
            <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
            <Panel className={cn("flex w-[330px] max-w-[calc(100vw-120px)] items-center gap-3 px-2.5 py-2", i === 2 && "mo-glow")}>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", i === 2 ? "bg-[#15803D] text-white" : "bg-[#E8F7EF] text-[#15803D]")}>
                {i === 2 ? <Lock className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" strokeWidth={3} />}
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

/* 2. Homepage builder: drag sections into order */
function BuilderArt() {
  const blocks = ["Hero banner", "Featured courses", "Meet the faculty", "Announcements"];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <div className="relative w-[270px]">
        <Panel className="v5-pop rounded-[18px] p-3">
          <p className="px-1 text-[12px] font-semibold text-[#18181B]">Homepage sections</p>
          <div className="mt-2 space-y-1.5">
            {blocks.map((b, i) => (
              <div
                key={b}
                className={cn(
                  "flex items-center gap-2 rounded-[10px] border px-2.5 py-2 text-[12px]",
                  i === 1 ? "border-dashed border-[#C4B5FD] bg-[#F7F5FF] text-transparent" : "border-[#EDEDF1] text-[#27272A]"
                )}
              >
                <GripVertical className={cn("h-3.5 w-3.5", i === 1 ? "text-transparent" : "text-[#B4B4BE]")} />
                {b}
              </div>
            ))}
          </div>
        </Panel>
        {/* section being dragged */}
        <div
          style={{ "--fd": "-1s" } as React.CSSProperties}
          className="mo-float absolute left-6 right-[-18px] top-[86px] flex rotate-[3deg] items-center gap-2 rounded-[10px] border border-[#0A0A0B] bg-white px-2.5 py-2 text-[12px] font-semibold text-[#18181B] shadow-[0_16px_32px_-12px_rgba(16,16,24,0.35)]"
        >
          <GripVertical className="h-3.5 w-3.5 text-[#52525B]" /> Featured courses
          <span className="ml-auto flex gap-1">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-4 w-6 rounded-[4px]" style={{ background: ["#E6F4F1", "#FEF4E2", "#E7F3FD"][k] }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* 3. Logo, colours and fonts */
function KitArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <p className="text-[12px] font-semibold text-[#18181B]">Brand kit</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="grid h-14 place-items-center rounded-[10px] border border-[#EDEDF1]">
            <LmsDomainMark size={28} />
          </div>
          <div className="grid h-14 place-items-center rounded-[10px] bg-[#18181B]">
            <LmsDomainMark size={28} className="ring-2 ring-white/10" />
          </div>
          <div className="grid h-14 place-items-center rounded-[10px] border border-[#EDEDF1]">
            <LmsDomainMark size={16} />
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-3 text-center text-[10px] text-[#9A9AA6]">
          <span>Light logo</span>
          <span>Dark logo</span>
          <span>Favicon</span>
        </div>
        <div className="mt-3.5 flex items-center gap-2">
          {[TEAL, "#134E4A", "#F59E0B", "#18181B"].map((c, i) => (
            <span key={c} className={cn("h-7 w-7 rounded-full", i === 0 && "ring-2 ring-offset-2")} style={{ background: c, ["--tw-ring-color" as string]: c }} />
          ))}
          <span className="ml-auto font-mono text-[11px] text-[#71717A]">#0F766E</span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#F8F8FA] px-3 py-2">
          <span className="font-urbanist text-[15px] font-semibold text-[#18181B]">Aa Urbanist</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#52525B]">Custom font · Growth</span>
        </div>
      </Panel>
    </div>
  );
}

/* 4. Your brand everywhere (portal, emails, certificates) */
function EverywhereArt() {
  const items = [
    { i: LayoutDashboard, t: "Learner portal", m: "Northwind logo and colours" },
    { i: Mail, t: "Emails", m: "With your logo and colours" },
    { i: Award, t: "Certificates", m: "Your logo on every PDF" },
  ];
  return (
    <div className="absolute inset-0 pt-7">
      {items.map((x, i) => (
        <Panel
          key={x.t}
          className={cn("v5-pop relative mb-3 flex items-center gap-3 rounded-[16px] p-2.5", i === 0 && "v5-lift")}
          style={{ marginLeft: 24 + i * 26, width: `min(340px, calc(100% - ${48 + i * 26}px))`, "--d": `${i * 130}ms` } as React.CSSProperties}
        >
          <span className="relative grid h-11 w-14 shrink-0 place-items-center rounded-[9px]" style={{ background: "#E6F4F1", color: TEAL }}>
            <x.i className="h-4 w-4" />
            <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-[3px]" style={{ background: TEAL }} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{x.t}</p>
            <p className="truncate text-[11px] text-[#9A9AA6]">{x.m}</p>
          </div>
          <Check className="h-4 w-4 shrink-0 text-[#16A34A]" strokeWidth={3} />
        </Panel>
      ))}
    </div>
  );
}

/* 5. SEO settings with a search preview */
function SeoArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(380px,calc(100%-40px))] rounded-[18px] p-4">
        <p className="text-[12px] font-semibold text-[#18181B]">SEO · Data Analysis Bootcamp</p>
        <div className="mt-3 space-y-2.5">
          <div>
            <div className="flex justify-between text-[10.5px] text-[#9A9AA6]">
              <span>Meta title</span>
              <span className="tabular-nums">36 / 60</span>
            </div>
            <p className="mt-1 rounded-[9px] border border-[#EDEDF1] px-2.5 py-1.5 text-[12px] text-[#18181B]">
              Data Analysis Bootcamp | Northwind
              <span className="mo-caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />
            </p>
          </div>
          <div>
            <p className="text-[10.5px] text-[#9A9AA6]">Meta description</p>
            <p className="mt-1 rounded-[9px] border border-[#EDEDF1] px-2.5 py-1.5 text-[12px] text-[#52525B]">Learn data skills with live mentors…</p>
          </div>
        </div>
        <div className="mt-3 rounded-[12px] bg-[#F8F8FA] p-3">
          <p className="truncate text-[10.5px] text-[#3F3F46]">academy.northwind.com › courses</p>
          <p className="truncate text-[13px] font-medium text-[#1A0DAB]">Data Analysis Bootcamp | Northwind</p>
          <p className="truncate text-[11px] text-[#52525B]">Learn data skills with live mentors. New batches…</p>
        </div>
      </Panel>
    </div>
  );
}

/* 6. Blog and help articles */
function BlogArt() {
  const posts = [
    { t: "5 ways to practise English every day", m: "Blog · 4 min read", c: "#E6F4F1", s: "Published" },
    { t: "How to join your live class", m: "Help article", c: "#E7F3FD", s: "Published" },
    { t: "March batch timetable", m: "Announcement", c: "#FEF4E2", s: "Draft" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(380px,calc(100%-40px))] rounded-[18px] p-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-[12px] font-semibold text-[#18181B]">Posts</p>
          <span className="rounded-full bg-[#0A0A0B] px-2.5 py-0.5 text-[10.5px] font-semibold text-white">+ New post</span>
        </div>
        <div className="mt-2.5 space-y-2">
          {posts.map((p, i) => (
            <div key={p.t} style={d(150 + i * 120)} className="v5-pop flex items-center gap-3 rounded-[12px] border border-[#F1F1F4] p-2">
              <span className="grid h-10 w-12 shrink-0 place-items-center rounded-[8px] text-[#52525B]" style={{ background: p.c }}>
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[#18181B]">{p.t}</p>
                <p className="text-[10.5px] text-[#9A9AA6]">{p.m}</p>
              </div>
              {p.s === "Published" ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#15803D]">
                  <Eye className="h-3 w-3" /> Live
                </span>
              ) : (
                <span className="text-[10.5px] font-medium text-[#9A9AA6]">Draft</span>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 7. Your own branded app (wide card): store listing next to the academy's app on a phone */
function BrandedAppCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rv-v4 group relative grid overflow-hidden rounded-[28px] bg-[#F4F5F8] md:col-span-2 md:grid-cols-[1fr_1.2fr] lg:col-span-12">
      <div className="flex flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0A0A0B]">{title}</h3>
          <span className="rounded-full border border-[#E4E4E7] bg-white px-2.5 py-0.5 text-[11.5px] font-semibold text-[#52525B]">Pro and up</span>
        </div>
        <p className="mt-2 max-w-[46ch] text-[14.5px] leading-[1.55] text-[#6B6B76]">{body}</p>
        <Link href="/platform/mobile-app" className="group mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF] md:mt-auto md:pt-10">
          See the mobile apps <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div aria-hidden="true" className="relative h-[300px] overflow-hidden md:h-[320px]">
        <Panel style={d(150)} className="v5-pop absolute left-4 top-10 z-10 w-[236px] rounded-[16px] p-3.5 sm:left-8 md:left-2 lg:left-[8%]">
          <div className="flex items-center gap-3">
            <span className="overflow-hidden rounded-[13px] shadow-[0_8px_18px_-10px_rgba(11,93,87,0.6)]"><NorthwindMark size={48} /></span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-[#18181B]">Northwind Academy</span>
              <span className="block text-[11px] text-[#9A9AA6]">Education</span>
              <span className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-[10.5px] font-bold text-white" style={{ background: TEAL }}>GET</span>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-[#F1F1F4] pt-2.5 text-[11px] text-[#71717A]">
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#F4F5F8]"><GooglePlayIcon size={14} /></span>
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#F4F5F8]"><AppleIcon size={13} /></span>
            Google Play and App Store
          </div>
        </Panel>
        <div className="absolute right-[-30px] top-8 w-[248px] sm:right-8 md:right-[-20px] lg:right-[10%]">
          <div className="v5-lift drop-shadow-[0_30px_40px_rgba(16,16,24,0.18)]">
            <Phone>
              <CourseScreen variant="branded" />
            </Phone>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Seven cards (layout and pictures by position); text from Admin > Website > Platform.
 *  Card 7 falls back to the built-in text until the admin entry has it. */
export function BrandBento({ cards = PLATFORM_CARDS.brand }: { cards?: PlatformCard[] } = {}) {
  const card = (i: number) => cards[i] || PLATFORM_CARDS.brand[i];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        plan="Growth"
        title={card(0).title}
        body={card(0).text}
      >
        <DomainArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title={card(1).title}
        body={card(1).text}
      >
        <BuilderArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title={card(2).title}
        body={card(2).text}
      >
        <KitArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title={card(3).title}
        body={card(3).text}
      >
        <EverywhereArt />
      </Card>
      <Card
        className="lg:col-span-6"
        title={card(4).title}
        body={card(4).text}
      >
        <SeoArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title={card(5).title}
        body={card(5).text}
      >
        <BlogArt />
      </Card>
      <BrandedAppCard title={card(6).title} body={card(6).text} />
    </div>
  );
}
