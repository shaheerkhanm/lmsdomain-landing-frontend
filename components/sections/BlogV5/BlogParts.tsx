import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Check, CreditCard, Eye, Globe, Lock, PlayCircle, Users, Video } from "lucide-react";
import type { BlogPost } from "@/content/blog/posts";
import { cn } from "@/lib/utils";

/* Blog building blocks: typographic covers with a small product visual (no stock or AI art). */

export const BLOG_META: Record<string, { category: string; tone: string; ink: string; art: "start" | "lms" | "sell" }> = {
  "how-to-start-an-online-academy-in-india": { category: "Getting started", tone: "#F1EDFF", ink: "#6C4BFF", art: "start" },
  "what-is-an-lms-guide-for-coaching-institutes": { category: "LMS basics", tone: "#E6F4F1", ink: "#0D9488", art: "lms" },
  "how-to-sell-courses-online-in-india-with-gst-invoices": { category: "Selling courses", tone: "#FFF1E8", ink: "#EA580C", art: "sell" },
};
export const metaFor = (slug: string) => BLOG_META[slug] || { category: "Guide", tone: "#F4F5F8", ink: "#0A0A0B", art: "lms" as const };

const panel = "rounded-[12px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_14px_30px_-16px_rgba(16,16,24,0.28)]";

function Art({ kind, ink }: { kind: "start" | "lms" | "sell"; ink: string }) {
  if (kind === "start")
    return (
      <div className="space-y-2">
        {[
          { i: BookOpen, t: "Pick your subject" },
          { i: Globe, t: "Launch on your domain" },
          { i: Video, t: "Teach your first batch" },
        ].map((s, k) => (
          <div key={s.t} className={cn("flex items-center gap-2.5 px-3 py-2", panel)} style={{ marginLeft: k * 18 }}>
            <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: k < 2 ? ink : "#D4D4D8" }}>
              {k < 2 ? <Check className="h-3 w-3" strokeWidth={3} /> : <s.i className="h-3 w-3" />}
            </span>
            <span className="text-[12px] font-semibold text-[#18181B]">{s.t}</span>
          </div>
        ))}
      </div>
    );
  if (kind === "lms")
    return (
      <div className={cn("w-[230px] overflow-hidden", panel)}>
        <div className="flex items-center gap-1 border-b border-[#F1F1F4] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
          <span className="ml-1.5 flex items-center gap-0.5 text-[8.5px] text-[#71717A]">
            <Lock className="h-2 w-2 text-[#16A34A]" /> your-institute.com
          </span>
        </div>
        <div className="space-y-1.5 p-2.5">
          {[
            { i: Users, t: "Batches", v: "3" },
            { i: Video, t: "Live classes", v: "12" },
            { i: PlayCircle, t: "Lessons", v: "48" },
          ].map((r) => (
            <p key={r.t} className="flex items-center gap-2 rounded-[7px] bg-[#F8F8FA] px-2 py-1.5 text-[10.5px] text-[#27272A]">
              <r.i className="h-3 w-3" style={{ color: ink }} />
              <span className="flex-1">{r.t}</span>
              <span className="font-semibold">{r.v}</span>
            </p>
          ))}
        </div>
      </div>
    );
  return (
    <div className="space-y-2">
      {[
        ["Course sale", "+₹4,999"],
        ["Bootcamp", "+$249"],
      ].map(([t, a], k) => (
        <div key={t} className={cn("flex w-[220px] items-center gap-2.5 p-2.5", panel)} style={{ marginLeft: k * 22 }}>
          <span className="grid h-7 w-7 place-items-center rounded-[8px] text-white" style={{ background: ink }}>
            <CreditCard className="h-3.5 w-3.5" />
          </span>
          <span className="flex-1 text-[11.5px] font-semibold text-[#18181B]">{t}</span>
          <span className="text-[12px] font-semibold tabular-nums text-[#15803D]">{a}</span>
        </div>
      ))}
      <span className={cn("ml-11 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-semibold text-[#18181B]", panel, "rounded-full")}>
        <Check className="h-3 w-3 text-[#16A34A]" strokeWidth={3} /> Invoice sent
      </span>
    </div>
  );
}

/** Cover: tinted background, category, and a small product visual. */
const shade = "shadow-[0_2px_4px_rgba(0,0,0,0.12),0_30px_60px_-24px_rgba(0,0,0,0.55)]";

/** Large layered scene for the featured card and article covers. Sample data only. */
function BigScene({ kind, ink }: { kind: "start" | "lms" | "sell"; ink: string }) {
  if (kind === "sell")
    return (
      <div className="relative h-[300px] w-[440px]">
        {/* checkout */}
        <div className={cn("absolute left-0 top-2 w-[300px] overflow-hidden rounded-[18px] bg-white", shade)}>
          <div className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            <span className="ml-2 flex items-center gap-1 text-[10px] text-[#71717A]">
              <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> learn.apexacademy.com/checkout
            </span>
          </div>
          <div className="p-4">
            <p className="text-[11px] text-[#9A9AA6]">Your order</p>
            <div className="mt-2 flex items-center gap-3">
              <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-[9px]">
                <Image src="/images/features/cohort-workshop.webp" alt="" fill sizes="112px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#18181B]">Data Analysis Bootcamp</p>
                <p className="text-[10.5px] text-[#9A9AA6]">8 weeks · Live + recorded</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#F1F1F4] pt-3">
              <span className="text-[12px] text-[#52525B]">Total</span>
              <span className="font-urbanist text-[20px] font-semibold text-[#18181B]">₹4,999</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              <Image src="/assets/img/integration/integration-1.png" alt="" width={56} height={56} className="h-7 w-7 rounded-full ring-1 ring-[#ECECF1]" />
              <Image src="/assets/img/integration/integration-8.png" alt="" width={56} height={56} className="h-7 w-7 rounded-full" />
              <span className="ml-auto rounded-full px-4 py-1.5 text-[11px] font-semibold text-white" style={{ background: "#0A0A0B" }}>
                Pay ₹4,999
              </span>
            </div>
          </div>
        </div>
        {/* payment received */}
        <div className={cn("mo-float absolute right-0 top-0 w-[200px] rounded-[16px] bg-white p-3.5", shade)} style={{ "--fd": "-1s" } as React.CSSProperties}>
          <p className="text-[10.5px] text-[#9A9AA6]">Payment received</p>
          <p className="font-urbanist text-[24px] font-semibold text-[#15803D]">+₹4,999</p>
          <p className="text-[10.5px] text-[#71717A]">Razorpay · to your account</p>
        </div>
        {/* invoice */}
        <div className={cn("mo-float absolute -bottom-4 -right-4 w-[180px] rotate-[3deg] rounded-[14px] bg-white p-3.5", shade)} style={{ "--fd": "-3s" } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#18181B]">GST invoice</p>
            <span className="rounded-full bg-[#E8F7EF] px-1.5 py-0.5 text-[9px] font-semibold text-[#15803D]">Sent</span>
          </div>
          <div className="mt-2 space-y-1">
            <span className="block h-1.5 rounded-full bg-[#F1F1F4]" />
            <span className="block h-1.5 w-3/4 rounded-full bg-[#F1F1F4]" />
            <span className="block h-1.5 w-1/2 rounded-full bg-[#F1F1F4]" />
          </div>
          <p className="mt-2 text-right text-[11px] font-semibold text-[#18181B]">INV-0248</p>
        </div>
      </div>
    );
  if (kind === "start")
    return (
      <div className="relative h-[300px] w-[440px]">
        <div className={cn("absolute left-0 top-4 w-[280px] rounded-[18px] bg-white p-4", shade)}>
          <p className="text-[12.5px] font-semibold text-[#18181B]">Launch checklist</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div className="h-full w-[66%] rounded-full" style={{ background: ink }} />
          </div>
          <div className="mt-3 space-y-2">
            {["Pick your subject", "Plan your batches", "Launch on your domain", "Teach your first class"].map((t, k) => (
              <p key={t} className="flex items-center gap-2 text-[12px] text-[#27272A]">
                <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: k < 3 ? ink : "#D4D4D8" }}>
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </p>
            ))}
          </div>
        </div>
        <div className={cn("mo-float absolute right-0 top-0 w-[210px] overflow-hidden rounded-[16px] bg-white", shade)}>
          <p className="flex items-center gap-1 border-b border-[#F1F1F4] px-3 py-2 text-[10px] text-[#71717A]">
            <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> learn.youracademy.com
          </p>
          <div className="m-2.5 rounded-[10px] p-3" style={{ background: ink }}>
            <p className="text-[12px] font-semibold text-white">Your academy is live</p>
            <span className="mt-1.5 inline-block rounded-full bg-white px-2 py-0.5 text-[9.5px] font-semibold" style={{ color: ink }}>
              Enrol now
            </span>
          </div>
        </div>
        <div className={cn("mo-float absolute bottom-2 right-10 flex items-center gap-2.5 rounded-[14px] bg-white p-3", shade)} style={{ "--fd": "-3s" } as React.CSSProperties}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FDECEC] text-[#B91C1C]">
            <Video className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-[#18181B]">First live class</p>
            <p className="text-[10px] text-[#71717A]">Mon 18:00 · 24 learners</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="relative h-[300px] w-[440px]">
      <div className={cn("absolute left-0 top-6 w-[300px] overflow-hidden rounded-[18px] bg-white", shade)}>
        <div className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[10px] text-[#71717A]">Your institute · Dashboard</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3.5">
          {[
            ["3", "Batches", Users],
            ["12", "Live classes", Video],
            ["48", "Lessons", PlayCircle],
          ].map(([v, l, I]) => {
            const Icon = I as React.ElementType;
            return (
              <div key={l as string} className="rounded-[10px] bg-[#F8F8FA] p-2.5">
                <Icon className="h-3.5 w-3.5" style={{ color: ink }} />
                <p className="mt-1.5 font-urbanist text-[18px] font-semibold text-[#18181B]">{v as string}</p>
                <p className="text-[9.5px] text-[#71717A]">{l as string}</p>
              </div>
            );
          })}
        </div>
        <div className="mx-3.5 mb-3.5 flex h-12 items-end gap-1.5">
          {[40, 58, 46, 72, 64, 86, 78].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === 5 ? ink : "#E4E4E7" }} />
          ))}
        </div>
      </div>
      <div className={cn("mo-float absolute right-0 top-0 w-[190px] rounded-[16px] bg-white p-3.5", shade)}>
        <p className="text-[10.5px] text-[#9A9AA6]">Attendance today</p>
        <p className="font-urbanist text-[24px] font-semibold text-[#18181B]">23/24</p>
        <p className="text-[10.5px] text-[#71717A]">Logged from Zoom</p>
      </div>
      <div className={cn("mo-float absolute bottom-0 right-8 w-[200px] rotate-[2deg] rounded-[14px] bg-white p-3", shade)} style={{ "--fd": "-3s" } as React.CSSProperties}>
        <p className="text-[11px] font-semibold text-[#18181B]">Mock test 4 · Results</p>
        {[
          ["Sofia", 94],
          ["Lucas", 88],
        ].map(([n, v]) => (
          <div key={n as string} className="mt-1.5 flex items-center gap-2 text-[10px]">
            <span className="w-9 text-[#52525B]">{n}</span>
            <span className="h-1.5 flex-1 rounded-full bg-[#F1F1F4]">
              <span className="block h-full rounded-full" style={{ width: `${v}%`, background: ink }} />
            </span>
            <span className="font-semibold">{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogCover({ slug, big = false }: { slug: string; big?: boolean }) {
  const m = metaFor(slug);
  if (big)
    return (
      <div aria-hidden="true" className="relative h-[340px] overflow-hidden bg-[#0B0A12] sm:h-[460px]">
        {/* soft hint of the topic colour, low and to the side */}
        <div className="absolute -left-24 -top-24 h-[380px] w-[420px] rounded-full bg-[#6C4BFF] opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 right-[-60px] h-[360px] w-[420px] rounded-full bg-[#3B5BFF] opacity-[0.12] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,#000,transparent_85%)]" />
        <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.ink }} />
          {m.category}
        </span>
        <div className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.7] transition-transform duration-700 group-hover:scale-[0.73] sm:scale-[0.95] sm:group-hover:scale-[0.98] lg:scale-100 lg:group-hover:scale-[1.03]">
          <BigScene kind={m.art} ink={m.ink} />
        </div>
      </div>
    );
  return (
    <div aria-hidden="true" className="relative h-[220px] overflow-hidden" style={{ background: m.tone }}>
      <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[12px] font-semibold" style={{ color: m.ink }}>
        {m.category}
      </span>
      <div className="absolute bottom-6 right-6">
        <Art kind={m.art} ink={m.ink} />
      </div>
    </div>
  );
}

function fmtDate(d: string) {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
export { fmtDate };

/** Magazine-style card: full topic colour, big title, product visual at the bottom; turns dark on hover. */
export function BlogCard({ post, tall = false }: { post: BlogPost; tall?: boolean }) {
  const m = metaFor(post.slug);
  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-[32px] p-7 transition-[translate] duration-500 hover:-translate-y-1.5 sm:p-8",
        tall ? "min-h-[560px]" : "min-h-[500px]"
      )}
      style={{ background: m.tone }}
    >
      {/* dark layer that slides up on hover */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full bg-[#0A0A0B] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0" />
      <span aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(10,10,11,0.07)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:linear-gradient(180deg,transparent_30%,#000)]" />

      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold" style={{ color: m.ink }}>
          {m.category}
        </span>
        <span className="text-[12.5px] font-medium text-[#52525B] transition-colors duration-500 group-hover:text-white/60">{post.readingTime}</span>
      </div>

      <h3 className="mt-7 font-urbanist text-[clamp(26px,2.4vw,32px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B] transition-colors duration-500 [text-wrap:balance] group-hover:text-white">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-[14.5px] leading-[1.55] text-[#52525B] transition-colors duration-500 group-hover:text-white/65">{post.subtitle}</p>

      {/* product visual */}
      <div aria-hidden="true" className="relative mt-auto flex min-h-[170px] items-end justify-center pt-6">
        <div className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
          <Art kind={m.art} ink={m.ink} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 transition-colors duration-500 group-hover:border-white/15">
        <span className="text-[13px] text-[#52525B] transition-colors duration-500 group-hover:text-white/60">{fmtDate(post.date)}</span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0A0A0B] text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#0A0A0B]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/** Notice shown while the blog is still a draft (pages are noindex). */
export function DraftNotice() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-[#FCD9A5] bg-[#FFF8EB] px-3.5 py-1.5 text-[12.5px] font-medium text-[#92400E]">
      <Eye className="h-3.5 w-3.5" /> Draft preview · not public yet
    </p>
  );
}
