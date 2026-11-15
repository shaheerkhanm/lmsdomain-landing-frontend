import React from "react";
import { Check, Globe, GripVertical, Lock, Mail, Award, LayoutDashboard, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, d } from "../bento";

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
            <span className="grid h-7 w-7 place-items-center rounded-[7px] text-[12px] font-bold text-white" style={{ background: TEAL }}>N</span>
          </div>
          <div className="grid h-14 place-items-center rounded-[10px] bg-[#18181B]">
            <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-white text-[12px] font-bold" style={{ color: TEAL }}>N</span>
          </div>
          <div className="grid h-14 place-items-center rounded-[10px] border border-[#EDEDF1]">
            <span className="grid h-4 w-4 place-items-center rounded-[4px] text-[8px] font-bold text-white" style={{ background: TEAL }}>N</span>
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

export function BrandBento() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        title="Your own domain, with free SSL"
        body="Connect your domain on any plan. SSL certificates are issued and renewed for you automatically."
      >
        <DomainArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title="Homepage builder"
        body="Arrange featured courses, faculty and announcements on your homepage without code."
      >
        <BuilderArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title="Logo, colours and fonts"
        body="Upload light and dark logos and a favicon, and set your colours. Custom fonts on Growth and up."
      >
        <KitArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title="Your brand everywhere"
        body="Your branding shows on the website, learner portal, emails and certificates. Remove “Powered by LMS Domain” on Pro."
      >
        <EverywhereArt />
      </Card>
      <Card
        className="lg:col-span-6"
        title="SEO settings for every page"
        body="Set meta titles, descriptions and share images for your homepage, courses and catalogue."
      >
        <SeoArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title="Blog and help articles"
        body="Publish blog posts, announcements and help articles to reach new learners and support current ones."
      >
        <BlogArt />
      </Card>
    </div>
  );
}
