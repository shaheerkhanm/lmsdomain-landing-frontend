import React from "react";
import { ArrowDownLeft, Check, ImageIcon, Link2, Mail, Repeat, ShoppingBag, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Face, d } from "../bento";
import { BrandMark, LmsDomainMark, type BrandName } from "@/components/brand/PartnerMarks";
import { PLATFORM_CARDS, type PlatformCard } from "@/content/platform/cards";

/* Sample data only. Claims match content/platform/sell.ts. */

/* 1. Course catalogue and cart */
function CatalogueArt() {
  const items = [
    { t: "Data Analysis Bootcamp", p: "$249", bg: "linear-gradient(135deg,#0F766E,#134E4A)", tag: "Bootcamp" },
    { t: "Python for Beginners", p: "$59", bg: "linear-gradient(135deg,#1E293B,#334155)", tag: "Course" },
    { t: "Business English", p: "$79", bg: "linear-gradient(135deg,#92400E,#B45309)", tag: "Live batch" },
  ];
  return (
    <div className="absolute inset-0 px-6 pt-7 sm:px-8">
      <div className="flex items-center justify-between">
        <Panel className="v5-pop inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-[#18181B]">
          All courses <span className="text-[#9A9AA6]">· 24</span>
        </Panel>
        <Panel style={d(300)} className="v5-pop relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-[#18181B]">
          <ShoppingBag className="h-3.5 w-3.5" /> Cart
          <span className="mo-ping grid h-4 w-4 place-items-center rounded-full bg-[#0A0A0B] text-[9.5px] text-white">2</span>
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((it, i) => (
          <Panel
            key={it.t}
            style={{ "--d": `${120 + i * 110}ms`, "--fd": `${i * -2}s` } as React.CSSProperties}
            className={cn("v5-pop mo-float overflow-hidden p-1.5", i === 2 && "hidden sm:block")}
          >
            <div className="relative h-[72px] rounded-[10px]" style={{ background: it.bg }}>
              <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-semibold text-[#18181B]">{it.tag}</span>
            </div>
            <div className="px-1.5 pb-1 pt-2">
              <p className="truncate text-[12px] font-semibold text-[#18181B]">{it.t}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[13px] font-semibold tabular-nums text-[#18181B]">{it.p}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", i < 2 ? "bg-[#0A0A0B] text-white" : "border border-[#E4E4E7] text-[#3F3F46]")}>
                  {i < 2 ? "In cart" : "Add"}
                </span>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* 2. Coupons with rules */
function CouponArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-[10px] border border-dashed border-[#0A0A0B] px-3 py-1.5 font-mono text-[13px] font-semibold tracking-wide text-[#18181B]">
            <Tag className="h-3.5 w-3.5" /> EARLYBIRD
          </span>
          <span className="rounded-full bg-[#E8F7EF] px-2 py-0.5 text-[10.5px] font-semibold text-[#15803D]">Active</span>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          {[
            ["Discount", "$50 off"],
            ["Expires", "31 Mar"],
            ["Min. order", "$100"],
            ["Limit", "100 uses"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
              <p className="text-[10px] text-[#9A9AA6]">{k}</p>
              <p className="text-[12.5px] font-semibold text-[#18181B]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#71717A]">Used</span>
            <span className="font-semibold tabular-nums text-[#18181B]">46 of 100</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div className="v5-fill h-full w-[46%] rounded-full bg-[#0A0A0B]" style={{ "--w": "46%" } as React.CSSProperties} />
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 3. Gateways: brand chips joined by a bracket (Wiza style) */
function GatewaysArt() {
  const g = [
    { n: "Stripe", side: "justify-end" },
    { n: "Razorpay", side: "justify-start" },
    { n: "Paytm", side: "justify-end" },
    { n: "DOKU", side: "justify-center" },
  ] satisfies { n: BrandName; side: string }[];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <div className="relative w-[236px]">
        <div className="absolute inset-x-[18px] top-[20px] h-[168px] rounded-[18px] border border-[#DCDCE3]" />
        <div className="v5-pop relative flex justify-center">
          <Panel className="flex h-10 items-center gap-2 rounded-full pl-2 pr-4">
            <LmsDomainMark size={24} />
            <span className="text-[13.5px] font-semibold text-[#18181B]">Your academy</span>
          </Panel>
        </div>
        {g.map((x, i) => (
          <div key={x.n} style={d(90 + i * 90)} className={cn("v5-pop relative mt-2.5 flex", x.side)}>
            <Panel
              style={{ "--fd": `${i * -1.5}s` } as React.CSSProperties}
              className="mo-float flex h-10 items-center gap-2 rounded-full pl-2 pr-4"
            >
              <BrandMark name={x.n} size={24} />
              <span className="text-[13.5px] font-semibold text-[#18181B]">{x.n}</span>
            </Panel>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4. Multi-currency payments (finerrr-style staggered rows) */
function CurrencyArt() {
  const rows = [
    { t: "Course sale · Stripe", m: "Today, 10:42 · USD", a: "+$59.00" },
    { t: "Live batch · Razorpay", m: "Today, 09:15 · INR", a: "+₹4,999" },
    { t: "Bootcamp · Stripe", m: "Yesterday · EUR", a: "+€183.00" },
    { t: "Course bundle · Stripe", m: "Yesterday · GBP", a: "+£89.00" },
  ];
  return (
    <div className="absolute inset-0 pt-7">
      {rows.map((r, i) => (
        <Panel
          key={r.t}
          className={cn("v5-pop relative mb-2.5 flex items-center gap-3 rounded-[14px] p-2.5", i === 0 && "v5-lift", i === 3 && "opacity-70")}
          style={{ marginLeft: 24 + i * 22, width: `min(330px, calc(100% - ${48 + i * 22}px))`, "--d": `${i * 120}ms` } as React.CSSProperties}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
            <ArrowDownLeft className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{r.t}</p>
            <p className="truncate text-[10.5px] text-[#9A9AA6]">{r.m}</p>
          </div>
          <p className="text-[13px] font-semibold tabular-nums text-[#18181B]">{r.a}</p>
        </Panel>
      ))}
    </div>
  );
}

/* 5. Offline payments with approval */
function OfflineArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(370px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-center gap-3">
          <Face src="/assets/img/home/testimonials/author-4.jpg" size={34} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-[#18181B]">Kenji paid by bank transfer</p>
            <p className="text-[11px] text-[#9A9AA6]">Python for Beginners · $59</p>
          </div>
          <span className="rounded-full bg-[#FEF4E2] px-2 py-0.5 text-[10.5px] font-semibold text-[#B45309]">Pending</span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-[#EDEDF1] p-2.5">
          <span className="grid h-12 w-10 shrink-0 place-items-center rounded-[6px] bg-[#F4F5F8] text-[#9A9AA6]">
            <ImageIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[11.5px] text-[#18181B]">transfer-receipt.jpg</p>
            <p className="text-[10.5px] text-[#9A9AA6]">Uploaded at checkout</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E4E4E7] py-1.5 text-[11.5px] font-semibold text-[#3F3F46]">
            <X className="h-3 w-3" /> Reject
          </span>
          <span className="mo-glow inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#0A0A0B] py-1.5 text-[11.5px] font-semibold text-white">
            <Check className="h-3 w-3" strokeWidth={3} /> Approve and enrol
          </span>
        </div>
      </Panel>
    </div>
  );
}

/* 6. Sales reports and instructor revenue split */
function ReportsArt() {
  const bars = [38, 52, 44, 66, 58, 74, 86];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(380px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-[#9A9AA6]">Sales this month</p>
            <p className="font-urbanist text-[24px] font-semibold tabular-nums text-[#18181B]">$12,480</p>
          </div>
          <span className="rounded-full bg-[#E8F7EF] px-2 py-0.5 text-[10.5px] font-semibold text-[#15803D]">+18%</span>
        </div>
        <div className="mt-3 flex h-[64px] items-end gap-2">
          {bars.map((b, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-t-[4px]", i === bars.length - 1 ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")}
              style={{ height: `${b}%` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5 border-t border-[#F1F1F4] pt-3">
          {[
            { n: "Daniel Reyes", p: "/assets/img/home/participant_alex.jpg", s: "60%", a: "$4,210" },
            { n: "Mia Collins", p: "/assets/img/home/participant_mia.jpg", s: "40%", a: "$2,806" },
          ].map((r) => (
            <div key={r.n} className="flex items-center gap-2.5">
              <Face src={r.p} size={22} />
              <span className="flex-1 truncate text-[12px] text-[#27272A]">{r.n}</span>
              <span className="text-[11px] text-[#9A9AA6]">{r.s} split</span>
              <span className="w-14 text-right text-[12px] font-semibold tabular-nums text-[#18181B]">{r.a}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 7. Subscriptions and bundles */
function SubscriptionArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <div className="relative w-[min(300px,calc(100%-40px))]">
        <Panel className="v5-pop v5-lift rounded-[18px] p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#18181B]">
              <Repeat className="h-3.5 w-3.5" /> All-access membership
            </span>
            <span className="rounded-full bg-[#E8F7EF] px-2 py-0.5 text-[10.5px] font-semibold text-[#15803D]">312 members</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-[10px] bg-[#0A0A0B] px-2.5 py-2 text-white">
              <p className="text-[10px] text-white/60">Monthly</p>
              <p className="text-[13px] font-semibold tabular-nums">$29 / mo</p>
            </div>
            <div className="rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
              <p className="text-[10px] text-[#9A9AA6]">Yearly</p>
              <p className="text-[13px] font-semibold tabular-nums text-[#18181B]">$290 / yr</p>
            </div>
          </div>
        </Panel>
        <Panel style={d(260)} className="v5-pop mo-float relative -mt-2 ml-8 flex items-center gap-2.5 rounded-[14px] p-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#F1EDFF] text-[#5B3BE8]">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[#18181B]">Python + Data bundle</p>
            <p className="text-[10.5px] text-[#9A9AA6]">2 courses · save $59</p>
          </div>
          <span className="text-[13px] font-semibold tabular-nums text-[#18181B]">$249</span>
        </Panel>
      </div>
    </div>
  );
}

/* 8. Affiliates */
function AffiliateArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(300px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-center gap-2.5">
          <Face src="/assets/img/home/participant_mia.jpg" size={30} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">Mia Collins</p>
            <p className="text-[10.5px] text-[#9A9AA6]">Affiliate · 20% commission</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-dashed border-[#D4D4DB] px-2.5 py-1.5">
          <Link2 className="h-3.5 w-3.5 shrink-0 text-[#71717A]" />
          <span className="truncate font-mono text-[11px] text-[#18181B]">academy.com/?ref=mia</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            ["Clicks", "1,240"],
            ["Sales", "38"],
            ["Earned", "$760"],
          ].map(([k, v], i) => (
            <div key={k} className={cn("rounded-[10px] px-1 py-2", i === 2 ? "bg-[#0A0A0B] text-white" : "bg-[#F8F8FA]")}>
              <p className={cn("text-[10px]", i === 2 ? "text-white/60" : "text-[#9A9AA6]")}>{k}</p>
              <p className={cn("text-[13px] font-semibold tabular-nums", i !== 2 && "text-[#18181B]")}>{v}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 9. Abandoned-cart recovery and upsells */
function RecoveryArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <div className="relative w-[min(300px,calc(100%-40px))]">
        <Panel className="v5-pop v5-lift rounded-[18px] p-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#FEF4E2] text-[#B45309]">
              <Mail className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-[#18181B]">Still thinking it over?</p>
              <p className="truncate text-[10.5px] text-[#9A9AA6]">Business English is waiting in your cart</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
            <span className="text-[11px] text-[#71717A]">Recovered this month</span>
            <span className="text-[13px] font-semibold tabular-nums text-[#15803D]">+$1,180</span>
          </div>
        </Panel>
        <Panel style={d(260)} className="v5-pop mo-float relative -mt-2 ml-8 rounded-[14px] p-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9A9AA6]">After checkout</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-[12px] font-semibold text-[#18181B]">Add Speaking Club</p>
            <span className="mo-glow rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[10.5px] font-semibold text-white">+ $19</span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/** Nine cards (layout and pictures by position); text from Admin > Website > Platform.
 *  Cards 7–9 fall back to the built-in text until the admin entry has them. */
export function SellBento({ cards = PLATFORM_CARDS.sell }: { cards?: PlatformCard[] } = {}) {
  const card = (i: number) => cards[i] || PLATFORM_CARDS.sell[i];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        title={card(0).title}
        body={card(0).text}
      >
        <CatalogueArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title={card(1).title}
        body={card(1).text}
      >
        <CouponArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title={card(2).title}
        body={card(2).text}
      >
        <GatewaysArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title={card(3).title}
        body={card(3).text}
      >
        <CurrencyArt />
      </Card>
      <Card
        className="lg:col-span-6"
        plan="Growth"
        title={card(4).title}
        body={card(4).text}
      >
        <OfflineArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title={card(5).title}
        body={card(5).text}
      >
        <ReportsArt />
      </Card>
      <Card className="lg:col-span-4" plan="Growth" title={card(6).title} body={card(6).text}>
        <SubscriptionArt />
      </Card>
      <Card className="lg:col-span-4" delay={90} plan="Growth" title={card(7).title} body={card(7).text}>
        <AffiliateArt />
      </Card>
      <Card className="md:col-span-2 lg:col-span-4" delay={180} plan="Growth" title={card(8).title} body={card(8).text}>
        <RecoveryArt />
      </Card>
    </div>
  );
}

