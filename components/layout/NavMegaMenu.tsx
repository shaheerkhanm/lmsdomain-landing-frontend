"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Info,
  Languages,
  LayoutGrid,
  Lock,
  Mail,
  Map,
  MessageSquareText,
  Monitor,
  Palette,
  Play,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { NavDropdownItem, NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";

export type FeaturedGuide = { title: string; slug: string; readingTime?: string } | null;

const ICONS: Record<string, LucideIcon> = {
  "/platform/teach": PlayCircle,
  "/platform/assess": ClipboardCheck,
  "/platform/manage": Users,
  "/platform/sell": CreditCard,
  "/platform/brand": Palette,
  "/platform/ai": MessageSquareText,
  "/platform/security": ShieldCheck,
  "/platform/mobile-app": Smartphone,
  "/platform": LayoutGrid,
  "/solutions/coaching-institutes": GraduationCap,
  "/solutions/language-test-prep-academies": Languages,
  "/solutions/training-companies": Building2,
  "/solutions/solo-educators": UserRound,
  "/resources/blog": BookOpen,
  "/roadmap": Map,
  "/about": Info,
  "/contact": Mail,
};
const iconFor = (href: string) => ICONS[href] || ArrowUpRight;

const PHOTOS: Record<string, string> = {
  "/solutions/coaching-institutes": "/images/solutions/coaching-institutes-1.webp",
  "/solutions/language-test-prep-academies": "/images/solutions/language-test-prep-1.webp",
  "/solutions/training-companies": "/images/solutions/training-companies-1.webp",
  "/solutions/solo-educators": "/images/solutions/solo-educators-1.webp",
};

/** Panel width per menu, so the shared panel resizes smoothly between menus. */
export function megaWidth(label: string): number {
  if (label === "Platform") return 980;
  if (label === "Solutions") return 800;
  return 720;
}

const isActive = (pathname: string | null, href: string) =>
  pathname === href || (href !== "/" && !!pathname?.startsWith(`${href}/`));

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="px-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA6]">{children}</p>;
}

function ItemRow({
  child,
  hot,
  current,
  onHover,
  onNavigate,
}: {
  child: NavDropdownItem;
  hot: boolean;
  current: boolean;
  onHover: () => void;
  onNavigate: () => void;
}) {
  const Icon = iconFor(child.href);
  return (
    <Link
      href={child.href}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group flex items-start gap-3 rounded-[14px] p-2.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#6C4BFF]",
        hot ? "bg-[#F5F5F8]" : "hover:bg-[#F5F5F8]"
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-[11px] border transition-all duration-200",
          hot ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-[#ECECF0] bg-white text-[#0A0A0B] shadow-[0_1px_2px_rgba(16,16,24,0.06)]"
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em] text-[#0A0A0B]">
          {child.label}
          {child.badge && (
            <span className="rounded-full bg-[#0A0A0B] px-1.5 py-px text-[10px] font-semibold tracking-wide text-white">{child.badge}</span>
          )}
          {current && <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" aria-hidden="true" />}
        </span>
        {child.description && <span className="mt-0.5 block truncate text-[12.5px] leading-[1.45] text-[#71717A]">{child.description}</span>}
      </span>
    </Link>
  );
}

function FooterLink({ href, children, onNavigate }: { href: string; children: React.ReactNode; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-semibold text-[#0A0A0B] outline-none hover:bg-[#F5F5F8] focus-visible:ring-2 focus-visible:ring-[#6C4BFF]"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Platform previews (sample UI, light cards on a dark stage)           */
/* ------------------------------------------------------------------ */

const card = "rounded-[12px] bg-white text-[#18181B] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_20px_40px_-18px_rgba(0,0,0,0.6)]";

function PreviewTeach() {
  return (
    <div className={cn(card, "w-[232px] overflow-hidden")}>
      <div className="relative grid h-[78px] place-items-center bg-[linear-gradient(135deg,#1F1B33,#2A2550)]">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#0A0A0B]">
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </span>
        <span className="absolute bottom-0 left-0 h-[3px] w-[62%] bg-[#6C4BFF]" />
      </div>
      <div className="space-y-1.5 p-2.5">
        {[
          ["Welcome and setup", true],
          ["Your first project", true],
          ["Live Q&A, Thursday", false],
        ].map(([t, done]) => (
          <p key={t as string} className="flex items-center gap-2 text-[11px]">
            <span className={cn("grid h-3.5 w-3.5 place-items-center rounded-full", done ? "bg-[#16A34A] text-white" : "border border-[#D4D4D8]")}>
              {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
            </span>
            <span className={done ? "text-[#52525B]" : "font-semibold"}>{t as string}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function PreviewAssess() {
  return (
    <div className={cn(card, "w-[232px] p-3")}>
      <p className="text-[10px] font-medium text-[#71717A]">Question 4 of 10</p>
      <p className="mt-1 text-[12px] font-semibold leading-snug">Which tense fits: “She ___ here since 2019”?</p>
      <div className="mt-2 space-y-1.5">
        {["lives", "has lived", "is living"].map((o, i) => (
          <p
            key={o}
            className={cn(
              "flex items-center justify-between rounded-[8px] border px-2 py-1 text-[11px]",
              i === 1 ? "border-[#16A34A] bg-[#F0FDF4] font-semibold text-[#15803D]" : "border-[#ECECF0] text-[#52525B]"
            )}
          >
            {o}
            {i === 1 && <Check className="h-3 w-3" strokeWidth={3} />}
          </p>
        ))}
      </div>
    </div>
  );
}

function PreviewManage() {
  const rows: [string, string, boolean][] = [
    ["/assets/img/home/participant_mia.jpg", "Mia Chen", true],
    ["/assets/img/home/participant_alex.jpg", "Alex Moreno", true],
    ["/assets/img/home/testimonials/author-1.jpg", "Priya Nair", false],
  ];
  return (
    <div className={cn(card, "w-[232px] p-3")}>
      <p className="flex items-center justify-between text-[11px] font-semibold">
        Batch B · Attendance <span className="font-medium text-[#71717A]">Today</span>
      </p>
      <div className="mt-2 space-y-1.5">
        {rows.map(([src, n, p]) => (
          <p key={n} className="flex items-center gap-2 text-[11px]">
            <Image src={src} alt="" width={40} height={40} className="h-5 w-5 rounded-full object-cover object-top" />
            <span className="flex-1">{n}</span>
            <span className={cn("rounded-full px-1.5 py-px text-[9.5px] font-semibold", p ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#FEF3C7] text-[#B45309]")}>
              {p ? "Present" : "Late"}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

function PreviewSell() {
  return (
    <div className={cn(card, "w-[232px] p-3")}>
      <p className="text-[10px] font-medium text-[#71717A]">Checkout</p>
      <p className="mt-0.5 text-[12px] font-semibold">Spoken English, Level 2</p>
      <div className="mt-2 flex gap-1">
        {["USD", "EUR", "GBP", "INR"].map((c, i) => (
          <span key={c} className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-semibold", i === 0 ? "bg-[#0A0A0B] text-white" : "bg-[#F4F5F8] text-[#52525B]")}>
            {c}
          </span>
        ))}
      </div>
      <p className="mt-2 flex items-baseline justify-between">
        <span className="font-urbanist text-[20px] font-semibold">$49</span>
        <span className="text-[10px] text-[#16A34A]">Coupon applied</span>
      </p>
      <p className="mt-1.5 rounded-full bg-[#0A0A0B] py-1.5 text-center text-[11px] font-semibold text-white">Pay securely</p>
    </div>
  );
}

function PreviewBrand() {
  return (
    <div className={cn(card, "w-[232px] overflow-hidden")}>
      <p className="flex items-center gap-1 border-b border-[#F1F1F4] px-2.5 py-1.5 text-[10px] text-[#71717A]">
        <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> learn.yourbrand.com
      </p>
      <div className="p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-[5px] bg-[#0E7C66]" />
          <span className="text-[11.5px] font-semibold">Your Academy</span>
        </div>
        <div className="mt-2 h-10 rounded-[8px] bg-[linear-gradient(120deg,#0E7C66,#14B8A6)]" />
        <div className="mt-2 flex items-center gap-1.5">
          {["#0E7C66", "#0A0A0B", "#F59E0B", "#E11D48"].map((c, i) => (
            <span key={c} className={cn("h-4 w-4 rounded-full", i === 0 && "ring-2 ring-[#0E7C66] ring-offset-1")} style={{ background: c }} />
          ))}
          <span className="ml-auto text-[10px] text-[#71717A]">Theme</span>
        </div>
      </div>
    </div>
  );
}

function PreviewAi() {
  return (
    <div className="w-[236px] space-y-2">
      <p className={cn(card, "ml-auto w-fit max-w-[190px] rounded-br-[4px] px-2.5 py-1.5 text-[11px]")}>When is my next live class?</p>
      <div className={cn(card, "max-w-[214px] rounded-bl-[4px] p-2.5")}>
        <p className="text-[11px] leading-snug">Thursday at 6 pm, Batch B. Revise Lesson 4 before it.</p>
        <p className="mt-1.5 inline-flex rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[9.5px] font-medium text-[#52525B]">From your course schedule</p>
      </div>
    </div>
  );
}

function PreviewMobileApp() {
  return (
    <div className="flex items-end gap-2.5">
      {[0, 1].map((i) => (
        <div key={i} className={cn("rounded-[18px] bg-[#0A0A0B] p-[4px] shadow-[0_18px_30px_-18px_rgba(0,0,0,0.8)] ring-1 ring-white/10", i === 0 ? "w-[96px]" : "w-[84px] opacity-80")}>
          <div className={cn("overflow-hidden rounded-[14px]", i === 0 ? "h-[150px] bg-white" : "h-[130px] bg-[#0F3B37]")}>
            <div className={cn("px-2 pt-2.5 text-[8px] font-semibold", i === 0 ? "text-[#18181B]" : "text-white")}>{i === 0 ? "LMS Domain" : "Your academy"}</div>
            <div className={cn("mx-2 mt-2 h-10 rounded-[7px]", i === 0 ? "bg-[#1E293B]" : "bg-white/15")} />
            <div className={cn("mx-2 mt-1.5 h-1.5 w-12 rounded-full", i === 0 ? "bg-[#E4E4E7]" : "bg-white/30")} />
            <div className={cn("mx-2 mt-1 h-1.5 w-9 rounded-full", i === 0 ? "bg-[#E4E4E7]" : "bg-white/20")} />
            <div className={cn("mx-2 mt-2.5 h-4 rounded-full", i === 0 ? "bg-[#0A0A0B]" : "bg-[#5EEAD4]/80")} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewSecurity() {
  return (
    <div className={cn(card, "w-[232px] p-3")}>
      <p className="flex items-center justify-between text-[11px] font-semibold">
        Device limit <span className="rounded-full bg-[#F4F5F8] px-1.5 py-px text-[9.5px] text-[#52525B]">2 of 2</span>
      </p>
      <div className="mt-2 space-y-1.5">
        {[
          [Monitor, "MacBook · Chrome"],
          [Smartphone, "iPhone · Safari"],
        ].map(([I, t]) => {
          const Ico = I as LucideIcon;
          return (
            <p key={t as string} className="flex items-center gap-2 rounded-[8px] bg-[#F8F8FA] px-2 py-1.5 text-[11px]">
              <Ico className="h-3.5 w-3.5 text-[#52525B]" /> {t as string}
            </p>
          );
        })}
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-[#15803D]">
        <ShieldCheck className="h-3 w-3" /> Videos watermarked per learner
      </p>
    </div>
  );
}

function PreviewAll() {
  const icons = [PlayCircle, ClipboardCheck, Users, CreditCard, Palette, ShieldCheck];
  return (
    <div className="grid w-[210px] grid-cols-3 gap-2">
      {icons.map((I, i) => (
        <span key={i} className={cn(card, "grid h-14 place-items-center")}>
          <I className="h-5 w-5" strokeWidth={1.8} />
        </span>
      ))}
    </div>
  );
}

const PREVIEWS: Record<string, { el: () => React.ReactElement; line: string }> = {
  "/platform/teach": { el: PreviewTeach, line: "Recorded lessons and live classes in one course." },
  "/platform/assess": { el: PreviewAssess, line: "Quizzes and mock tests that grade themselves." },
  "/platform/manage": { el: PreviewManage, line: "Batches, attendance and learners at a glance." },
  "/platform/sell": { el: PreviewSell, line: "Checkout in your learners' own currency." },
  "/platform/brand": { el: PreviewBrand, line: "Your domain, your colours, your academy." },
  "/platform/ai": { el: PreviewAi, line: "Answers from your own lessons. On Pro." },
  "/platform/security": { el: PreviewSecurity, line: "DRM video, watermarks and device limits." },
  "/platform/mobile-app": { el: PreviewMobileApp, line: "Android and iOS apps. Your own app on Pro." },
};

/* ------------------------------------------------------------------ */
/* Panels                                                               */
/* ------------------------------------------------------------------ */

function PlatformPanel({ items, pathname, onNavigate }: PanelProps) {
  const overview = items.find((c) => c.href === "/platform");
  const list = items.filter((c) => c.href !== "/platform");
  const [hot, setHot] = useState(list[0]?.href ?? "");
  const hotItem = list.find((c) => c.href === hot) ?? list[0];
  const preview = (hotItem && PREVIEWS[hotItem.href]) || { el: PreviewAll, line: "Everything you need to run an academy." };
  const Prev = preview.el;

  return (
    <div className="grid grid-cols-[1fr_290px] gap-2">
      <div className="flex flex-col p-3">
        <Eyebrow>Platform</Eyebrow>
        <div className="mt-2 grid grid-cols-2 gap-0.5">
          {list.map((c) => (
            <ItemRow key={c.href} child={c} hot={hot === c.href} current={isActive(pathname, c.href)} onHover={() => setHot(c.href)} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#F1F1F4] pt-3">
          {overview ? <FooterLink href={overview.href} onNavigate={onNavigate}>{overview.label}</FooterLink> : <span />}
          <Link
            href="/custom-lms"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[13px] text-[#52525B] outline-none hover:bg-[#F5F5F8] focus-visible:ring-2 focus-visible:ring-[#6C4BFF]"
          >
            Need it built for you? <span className="font-semibold text-[#0A0A0B]">Custom LMS</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#0A0A0B] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {hotItem && (
        <Link
          href={hotItem.href}
          onClick={onNavigate}
          tabIndex={-1}
          className="group relative isolate flex flex-col overflow-hidden rounded-[18px] bg-[#0B0A12] p-5 text-white"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute -left-16 -top-20 h-[240px] w-[260px] rounded-full bg-[#6C4BFF] opacity-40 blur-3xl" />
            <span className="absolute -bottom-24 -right-16 h-[220px] w-[240px] rounded-full bg-[#2F5BFF] opacity-25 blur-3xl" />
            <span className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000,transparent_85%)]" />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          </span>
          <span key={hotItem.href} className="nav-swap grid h-[176px] place-items-center">
            <Prev />
          </span>
          <span key={`${hotItem.href}-t`} className="nav-swap mt-auto block">
            <span className="block font-urbanist text-[19px] font-semibold tracking-[-0.02em]">{hotItem.label}</span>
            <span className="mt-1 block text-[13px] leading-[1.5] text-white/60">{preview.line}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold">
              Explore {hotItem.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

function SolutionsPanel({ items, pathname, onNavigate }: PanelProps) {
  const [hot, setHot] = useState(items[0]?.href ?? "");
  const hotItem = items.find((c) => c.href === hot) ?? items[0];
  return (
    <div className="grid grid-cols-[1fr_330px] gap-2">
      <div className="flex flex-col p-3">
        <Eyebrow>Built for</Eyebrow>
        <div className="mt-2 space-y-0.5">
          {items.map((c) => (
            <ItemRow key={c.href} child={c} hot={hot === c.href} current={isActive(pathname, c.href)} onHover={() => setHot(c.href)} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="mt-auto border-t border-[#F1F1F4] pt-3">
          <FooterLink href="/customers" onNavigate={onNavigate}>
            See academies on LMS Domain
          </FooterLink>
        </div>
      </div>

      {hotItem && (
        <Link href={hotItem.href} onClick={onNavigate} tabIndex={-1} className="group relative isolate min-h-[340px] overflow-hidden rounded-[18px] bg-[#0B0A12]">
          {items.map((c) => (
            <Image
              key={c.href}
              src={PHOTOS[c.href] || "/images/solutions/coaching-institutes-1.webp"}
              alt=""
              fill
              sizes="330px"
              className={cn(
                "object-cover transition-[opacity,scale] duration-500",
                c.href === hotItem.href ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              )}
            />
          ))}
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,10,18,0.92)_0%,rgba(11,10,18,0.35)_45%,transparent_70%)]" />
          <span key={hotItem.href} className="nav-swap absolute inset-x-0 bottom-0 block p-5 text-white">
            <span className="block font-urbanist text-[20px] font-semibold leading-tight tracking-[-0.02em]">{hotItem.label}</span>
            {hotItem.description && <span className="mt-1 block text-[13px] text-white/70">{hotItem.description}</span>}
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#0A0A0B]">
              See how it works <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

const LEARN = new Set(["/resources/blog", "/roadmap"]);

/** A real photo for the featured guide, picked from the post's topic. */
function guidePhoto(slug: string) {
  if (slug.includes("sell")) return "/images/features/course-checkout-browsing.webp";
  if (slug.includes("start")) return "/images/features/cohort-workshop.webp";
  if (slug.includes("lms") || slug.includes("coaching")) return "/images/features/audience-institutes.webp";
  return "/images/features/instructor-grading-review.webp";
}

function ResourcesPanel({ items, pathname, onNavigate, featured }: PanelProps) {
  const [hot, setHot] = useState("");
  const blog = items.find((c) => c.href === "/resources/blog");
  const learn = items.filter((c) => LEARN.has(c.href));
  const company = items.filter((c) => !LEARN.has(c.href));
  const groups = [
    { name: "Learn", list: learn },
    { name: "Company", list: company },
  ].filter((g) => g.list.length);
  const row = (c: NavDropdownItem) => (
    <ItemRow key={c.href} child={c} hot={hot === c.href} current={isActive(pathname, c.href)} onHover={() => setHot(c.href)} onNavigate={onNavigate} />
  );
  return (
    <div className={cn("grid gap-2", blog && featured ? "grid-cols-[1fr_300px]" : "grid-cols-1")}>
      <div className="grid grid-cols-1 gap-3 p-3">
        {groups.map((g) => (
          <div key={g.name}>
            <Eyebrow>{g.name}</Eyebrow>
            <div className="mt-2 space-y-0.5">{g.list.map(row)}</div>
          </div>
        ))}
      </div>
      {blog && featured && (
        <Link
          href={`/resources/blog/${featured.slug}`}
          onClick={onNavigate}
          className="group flex flex-col rounded-[18px] bg-[#F5F5F8] p-2 outline-none transition-colors hover:bg-[#EFEFF3] focus-visible:ring-2 focus-visible:ring-[#6C4BFF]"
        >
          <span className="relative block h-[150px] overflow-hidden rounded-[13px]">
            <Image src={guidePhoto(featured.slug)} alt="" fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          </span>
          <span className="flex flex-1 flex-col px-3 pb-3 pt-4">
            <span className="text-[12px] font-medium text-[#71717A]">
              Latest guide{featured.readingTime ? ` · ${featured.readingTime}` : ""}
            </span>
            <span className="mt-1.5 block font-urbanist text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0A0A0B] [text-wrap:balance]">{featured.title}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-[#0A0A0B]">
              Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

function GenericPanel({ items, pathname, onNavigate, label }: PanelProps & { label: string }) {
  const [hot, setHot] = useState("");
  return (
    <div className="p-3">
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-2 grid grid-cols-2 gap-0.5">
        {items.map((c) => (
          <ItemRow key={c.href} child={c} hot={hot === c.href} current={isActive(pathname, c.href)} onHover={() => setHot(c.href)} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

type PanelProps = { items: NavDropdownItem[]; pathname: string | null; onNavigate: () => void; featured?: FeaturedGuide };

/** The content of one desktop mega menu, chosen by the top-level label. */
export function NavMegaContent({
  item,
  pathname,
  onNavigate,
  featured,
}: {
  item: NavItem;
  pathname: string | null;
  onNavigate: () => void;
  featured?: FeaturedGuide;
}) {
  const items = item.children ?? [];
  const props = { items, pathname, onNavigate, featured };
  if (item.label === "Platform") return <PlatformPanel {...props} />;
  if (item.label === "Solutions") return <SolutionsPanel {...props} />;
  if (item.label === "Resources") return <ResourcesPanel {...props} />;
  return <GenericPanel {...props} label={item.label} />;
}

export { iconFor };
