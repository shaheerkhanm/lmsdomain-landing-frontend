import React from "react";
import Image from "next/image";
import { ArrowDownLeft, Award, CalendarCheck, ListChecks, MessageSquare, PlayCircle, Video } from "lucide-react";
import { BrandMark, type BrandName } from "@/components/brand/PartnerMarks";

/*
 * Two rows of small product "moments" gliding in opposite directions.
 * Shows the everyday things academies do on LMS Domain. Sample data only. Static for reduced motion.
 */

type M = { i: React.ElementType; t: string; m: string; face?: string; brand?: BrandName; tag?: string };

const STRIPE: BrandName = "Stripe";
const RAZORPAY: BrandName = "Razorpay";

const ROW_A: M[] = [
  { i: Video, t: "Live class started", m: "Maths · Evening batch", face: "/assets/img/home/participant_alex.jpg", tag: "23 joined" },
  { i: Award, t: "Certificate issued", m: "Python for Beginners", face: "/assets/img/home/testimonials/author-1.jpg" },
  { i: ArrowDownLeft, t: "Course sale", m: "Data Analysis Bootcamp · Stripe", brand: STRIPE, tag: "+$249" },
  { i: ListChecks, t: "Mock test scored", m: "Algebra · Rank 6 of 48", face: "/assets/img/home/testimonials/author-5.jpg", tag: "82%" },
  { i: CalendarCheck, t: "1:1 session booked", m: "Thu 15:00 · paid", face: "/assets/img/home/testimonials/author-4.jpg" },
];

const ROW_B: M[] = [
  { i: MessageSquare, t: "Essay reviewed", m: "Private feedback · 7/9", face: "/assets/img/home/participant_mia.jpg" },
  { i: ArrowDownLeft, t: "Fees paid", m: "Batch B · Razorpay", brand: RAZORPAY, tag: "+₹4,999" },
  { i: PlayCircle, t: "Lesson completed", m: "Loops in practice", face: "/assets/img/home/testimonials/author-2.jpg" },
  { i: Award, t: "Cohort certified", m: "Northwind Retail · 28 learners", face: "/assets/img/home/testimonials/author-3.jpg" },
  { i: ArrowDownLeft, t: "Workshop sale", m: "Data cleaning masterclass · Stripe", brand: STRIPE, tag: "+€120" },
];

/** Activity-feed style: photo (or gateway mark) with a small black action badge. */
function Chip({ x }: { x: M }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[#ECECF1] bg-white py-2 pl-2 pr-5 shadow-[0_1px_2px_rgba(16,16,24,0.04),0_14px_30px_-18px_rgba(16,16,24,0.25)]">
      <span className="relative shrink-0">
        {x.face ? (
          <Image src={x.face} alt="" width={80} height={80} className="h-10 w-10 rounded-full object-cover object-top" />
        ) : (
          x.brand && <BrandMark name={x.brand} size={40} round />
        )}
        <span className="absolute -bottom-0.5 -right-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#0A0A0B] text-white ring-2 ring-white">
          <x.i className="h-2.5 w-2.5" strokeWidth={2.5} />
        </span>
      </span>
      <span className="text-left">
        <span className="block text-[13px] font-semibold text-[#18181B]">{x.t}</span>
        <span className="block text-[11.5px] text-[#71717A]">{x.m}</span>
      </span>
      {x.tag && <span className="ml-1 text-[13px] font-semibold tabular-nums text-[#18181B]">{x.tag}</span>}
    </span>
  );
}

function Row({ items, reverse = false }: { items: M[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="animate-marquee-v4 gap-3 py-2" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {loop.map((x, i) => (
          <Chip key={i} x={x} />
        ))}
      </div>
    </div>
  );
}

export function Moments() {
  return (
    <div aria-hidden="true" className="space-y-1">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
