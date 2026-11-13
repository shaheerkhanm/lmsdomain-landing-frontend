"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import {
  RazorpayLogo,
  StripeLogo,
  PaytmLogo,
  DokuLogo,
} from "@/components/logos";
import {
  TicketPercent,
  FileText,
  CheckCircle2,
  Landmark,
  TrendingUp,
  ArrowRight,
  Lock,
  Sparkles,
} from "lucide-react";

interface CurrencyOption {
  code: string;
  symbol: string;
  price: string;
  discount: string;
  total: string;
}

const CURRENCIES: CurrencyOption[] = [
  { code: "INR", symbol: "₹", price: "₹4,999", discount: "−₹500", total: "₹4,499" },
  { code: "USD", symbol: "$", price: "$64", discount: "−$10", total: "$54" },
  { code: "EUR", symbol: "€", price: "€58", discount: "−€8", total: "€50" },
  { code: "GBP", symbol: "£", price: "£50", discount: "−£7", total: "£43" },
];

interface FeedItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeType: "success" | "neutral" | "action";
  logo: React.ReactNode;
}

export function SellAnywhereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Column 1: Currency & Coupon Animation State
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);
  const [typedCoupon, setTypedCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Column 2: Vertical Feed Animation State
  const [feedIndex, setFeedIndex] = useState(0);

  // Column 3: Self-writing Settlement Lines
  const [visibleLines, setVisibleLines] = useState(0);

  // IntersectionObserver to pause animations when out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Column 1: Typewriter coupon & currency cycle
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedCoupon("WELCOME10");
      setCouponApplied(true);
      return;
    }
    if (!isInView) return;

    const couponTarget = "WELCOME10";
    let charIdx = 0;
    let timeoutId: NodeJS.Timeout;

    // Type coupon letter by letter
    const typeNext = () => {
      if (charIdx < couponTarget.length) {
        charIdx++;
        setTypedCoupon(couponTarget.slice(0, charIdx));
        timeoutId = setTimeout(typeNext, 120);
      } else {
        setCouponApplied(true);
      }
    };

    const initialDelay = setTimeout(() => {
      typeNext();
    }, 600);

    // Currency cycle every 3s
    const currencyInterval = setInterval(() => {
      setActiveCurrencyIdx((prev) => (prev + 1) % CURRENCIES.length);
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
      clearInterval(currencyInterval);
    };
  }, [isInView]);

  // Column 2: Feed cycling upward every 1.8s
  const feedItems: FeedItem[] = [
    {
      id: "f1",
      title: "Payment received · ₹4,499",
      subtitle: "Aman K. · Razorpay",
      badge: "Paid ✓",
      badgeType: "success",
      logo: <RazorpayLogo size={20} variant="mark" />,
    },
    {
      id: "f2",
      title: "Coupon WELCOME10 used",
      subtitle: "38 uses this month",
      badge: "−10%",
      badgeType: "neutral",
      logo: <TicketPercent size={18} className="text-[#12A27A]" strokeWidth={2} />,
    },
    {
      id: "f3",
      title: "GST invoice sent",
      subtitle: "INV-2041 · emailed to learner",
      badge: "Sent",
      badgeType: "neutral",
      logo: <FileText size={18} className="text-[#535361]" strokeWidth={2} />,
    },
    {
      id: "f4",
      title: "Offline payment to approve",
      subtitle: "UPI reference 4821…",
      badge: "Approve",
      badgeType: "action",
      logo: <CheckCircle2 size={18} className="text-[#F2894A]" strokeWidth={2} />,
    },
    {
      id: "f5",
      title: "Payment received · $54",
      subtitle: "Sneha M. · Stripe",
      badge: "Paid ✓",
      badgeType: "success",
      logo: <StripeLogo size={20} variant="mark" />,
    },
    {
      id: "f6",
      title: "Bank transfer approved",
      subtitle: "Access granted to Batch B",
      badge: "Approved ✓",
      badgeType: "success",
      logo: <Landmark size={18} className="text-[#12A27A]" strokeWidth={2} />,
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isInView) return;

    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % feedItems.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isInView, feedItems.length]);

  // Column 3: Self-writing payout panel lines sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisibleLines(5);
      return;
    }
    if (!isInView) return;

    let line = 0;
    const interval = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= 5) {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isInView]);

  const activeCurrency = CURRENCIES[activeCurrencyIdx];

  // Visible window of 4 items for Column 2 feed loop
  const visibleFeed = [
    feedItems[feedIndex % feedItems.length],
    feedItems[(feedIndex + 1) % feedItems.length],
    feedItems[(feedIndex + 2) % feedItems.length],
    feedItems[(feedIndex + 3) % feedItems.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="py-[clamp(72px,9vw,128px)] pt-0 font-sans"
      id="sell"
    >
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header: Left H2 + Right short paragraph on 1 row (desktop) */}
        <div className="rv-v4 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow dotColor="#12A27A">Sell anywhere</Eyebrow>
            <h2 className="type-h2-v4 text-[#151517] mt-1">
              Collect fees anywhere
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[48ch]">
            Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval.
          </p>
        </div>

        {/* 3 Animated Workflow Columns: Sendr-style Live Product UIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* ========================================================= */}
          {/* COLUMN 1: CHECKOUT (Learner Side) */}
          {/* ========================================================= */}
          <div className="rv-v4 flex flex-col">
            {/* Live UI Container */}
            <div className="bg-[#F8F8FA] border border-[rgba(15,15,20,0.08)] rounded-[20px] p-5 h-[430px] flex flex-col justify-between overflow-hidden shadow-xs relative">
              {/* Checkout Mini Window */}
              <div className="bg-white border border-[#E8E8EC] rounded-[14px] p-4 shadow-[0_4px_16px_rgba(20,20,40,0.04)]">
                {/* Course Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#F0F0F3]">
                  <div className="relative w-10 h-10 rounded-[8px] overflow-hidden bg-[#ECECF0] shrink-0 border border-[#E8E8EC]">
                    <Image
                      src="/images/features/course-checkout-browsing.webp"
                      alt="Course thumbnail"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <b className="text-[13px] font-bold text-[#151517] block truncate">
                      Full-Stack Web Engineering
                    </b>
                    <span className="text-[11.5px] text-[#8C8C98] block">
                      Batch B · Live + Assignments
                    </span>
                  </div>
                </div>

                {/* Pricing & Coupon Calculation */}
                <div className="py-2.5 space-y-1.5 text-[12.5px] border-b border-[#F0F0F3]">
                  <div className="flex justify-between text-[#535361]">
                    <span>Course fee</span>
                    <span className="text-[#151517] font-medium">{activeCurrency.price}</span>
                  </div>

                  {/* Coupon Field & Typewriter */}
                  <div className="flex items-center justify-between gap-2 py-0.5">
                    <div className="flex items-center gap-1.5 bg-[#F6F6F9] border border-[#E4E4E9] rounded-[6px] px-2 py-0.5 min-w-[120px]">
                      <TicketPercent size={13} className="text-[#12A27A] shrink-0" />
                      <span className="font-mono text-[11px] font-semibold text-[#151517]">
                        {typedCoupon}
                        {!couponApplied && (
                          <span className="inline-block w-1 h-3 bg-[#12A27A] animate-pulse ml-0.5 align-middle" />
                        )}
                      </span>
                    </div>
                    {couponApplied && (
                      <span className="text-[#12A27A] font-semibold text-[12px] animate-fade-in">
                        {activeCurrency.discount}
                      </span>
                    )}
                  </div>

                  {/* Total Payable */}
                  <div className="flex justify-between items-baseline pt-1.5 border-t border-dashed border-[#E8E8EC]">
                    <span className="font-semibold text-[#151517] text-[13px]">Total payable</span>
                    <b className="font-bold text-[18px] text-[#151517] tracking-tight">
                      {couponApplied ? activeCurrency.total : activeCurrency.price}
                    </b>
                  </div>
                </div>

                {/* Currency Switcher Chips */}
                <div className="pt-2.5">
                  <span className="text-[10px] uppercase font-semibold tracking-[0.08em] text-[#8C8C98] block mb-1.5">
                    Currency Auto-Detection
                  </span>
                  <div className="flex items-center gap-1.5">
                    {CURRENCIES.map((curr, idx) => {
                      const isActive = idx === activeCurrencyIdx;
                      return (
                        <span
                          key={curr.code}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-[5px] transition-all ${
                            isActive
                              ? "bg-[#151517] text-white shadow-xs"
                              : "bg-[#F0F0F3] text-[#535361]"
                          }`}
                        >
                          {curr.code}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Overlapping Gateway Discs (Avatar Cluster Style) */}
              <div className="pt-2 pb-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C8C98] block mb-2">
                  Integrated Gateways
                </span>
                <div className="flex items-center">
                  {/* Razorpay */}
                  <div
                    title="Razorpay"
                    className="w-11 h-11 rounded-full bg-white border-2 border-white shadow-[0_2px_8px_rgba(20,20,40,0.12)] flex items-center justify-center relative z-[4] hover:z-10 hover:scale-105 transition-all"
                  >
                    <RazorpayLogo size={22} variant="mark" />
                  </div>
                  {/* Stripe */}
                  <div
                    title="Stripe"
                    className="w-11 h-11 rounded-full bg-white border-2 border-white shadow-[0_2px_8px_rgba(20,20,40,0.12)] flex items-center justify-center -ml-2.5 relative z-[3] hover:z-10 hover:scale-105 transition-all"
                  >
                    <StripeLogo size={22} variant="mark" />
                  </div>
                  {/* Paytm */}
                  <div
                    title="Paytm"
                    className="w-11 h-11 rounded-full bg-white border-2 border-white shadow-[0_2px_8px_rgba(20,20,40,0.12)] flex items-center justify-center -ml-2.5 relative z-[2] hover:z-10 hover:scale-105 transition-all"
                  >
                    <PaytmLogo size={22} variant="mark" />
                  </div>
                  {/* DOKU */}
                  <div
                    title="DOKU"
                    className="w-11 h-11 rounded-full bg-white border-2 border-white shadow-[0_2px_8px_rgba(20,20,40,0.12)] flex items-center justify-center -ml-2.5 relative z-[1] hover:z-10 hover:scale-105 transition-all"
                  >
                    <DokuLogo size={22} variant="mark" />
                  </div>
                  {/* Label */}
                  <span className="text-[11.5px] font-medium text-[#6B6B78] ml-3">
                    + Cards, UPI & Wallets
                  </span>
                </div>
              </div>
            </div>

            {/* Column Text Under UI */}
            <div className="mt-5 text-left">
              <h3 className="text-[17px] font-bold text-[#151517] tracking-tight">
                Multi-currency checkout & coupons
              </h3>
              <p className="text-[14px] text-[#535361] leading-[1.5] mt-1.5 min-h-[42px]">
                Sell in INR, USD, EUR, GBP and other major currencies with auto-detection. Run promotional codes and early-bird discounts.
              </p>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#151517] hover:text-[#12A27A] transition-colors mt-2.5 cursor-pointer"
              >
                <span>Learn about checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: PAYMENTS COME IN (Feed Loop) */}
          {/* ========================================================= */}
          <div className="rv-v4 flex flex-col">
            {/* Live UI Container: Scrolling Stack */}
            <div className="bg-[#F8F8FA] border border-[rgba(15,15,20,0.08)] rounded-[20px] p-5 h-[430px] flex flex-col justify-between overflow-hidden shadow-xs relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C8C98]">
                  Live Activity Feed
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#12A27A] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12A27A] animate-pulse" />
                  Streaming
                </span>
              </div>

              {/* Upward Cycling Stack */}
              <div className="space-y-2.5 my-auto overflow-hidden">
                {visibleFeed.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="bg-white border border-[#E8E8EC] rounded-[12px] p-3 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(20,20,40,0.04)] transition-all duration-500 ease-out"
                    style={{
                      opacity: idx === 0 ? 0.85 : 1,
                      transform: `translateY(${idx * 0}px)`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-[8px] bg-[#F7F7FA] border border-[#E8E8EC] flex items-center justify-center shrink-0">
                        {item.logo}
                      </div>
                      <div className="min-w-0">
                        <b className="text-[12.5px] font-semibold text-[#151517] block truncate">
                          {item.title}
                        </b>
                        <span className="text-[11px] text-[#8C8C98] block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {item.badgeType === "success" && (
                        <span className="bg-[#E8F8F0] text-[#12A27A] font-semibold text-[11px] px-2 py-0.5 rounded-[5px]">
                          {item.badge}
                        </span>
                      )}
                      {item.badgeType === "neutral" && (
                        <span className="bg-[#F0F0F3] text-[#535361] font-semibold text-[11px] px-2 py-0.5 rounded-[5px]">
                          {item.badge}
                        </span>
                      )}
                      {item.badgeType === "action" && (
                        <span className="bg-[#12A27A] text-white font-semibold text-[11px] px-2 py-0.5 rounded-[5px] shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footnote */}
              <div className="pt-2 border-t border-[#E8E8EC] text-center">
                <span className="text-[11px] text-[#8C8C98]">
                  Automated receipts & GST invoice generation
                </span>
              </div>
            </div>

            {/* Column Text Under UI */}
            <div className="mt-5 text-left">
              <h3 className="text-[17px] font-bold text-[#151517] tracking-tight">
                Instant alerts & offline review
              </h3>
              <p className="text-[14px] text-[#535361] leading-[1.5] mt-1.5 min-h-[42px]">
                GST tax invoices emailed on checkout. Direct bank transfers and UPI payments queue for instant one-click approval.
              </p>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#151517] hover:text-[#12A27A] transition-colors mt-2.5 cursor-pointer"
              >
                <span>Learn about payment flows</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: MONEY REACHES YOU (Self-writing Payout) */}
          {/* ========================================================= */}
          <div className="rv-v4 flex flex-col">
            {/* Live UI Container */}
            <div className="bg-[#F8F8FA] border border-[rgba(15,15,20,0.08)] rounded-[20px] p-5 h-[430px] flex flex-col justify-between overflow-hidden shadow-xs relative">
              {/* Payout Breakdown Card */}
              <div className="bg-white border border-[#E8E8EC] rounded-[14px] p-4 shadow-[0_4px_16px_rgba(20,20,40,0.04)]">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F0F0F3]">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-[0.08em] text-[#8C8C98] block">
                      Settlement Statement
                    </span>
                    <b className="text-[14px] font-bold text-[#151517]">
                      Weekly Payout
                    </b>
                  </div>
                  <div className="flex items-center gap-1 text-[#12A27A] font-bold text-[12.5px]">
                    <TrendingUp size={15} strokeWidth={2.2} />
                    <span>₹1,42,800</span>
                  </div>
                </div>

                {/* Self-writing Lines */}
                <div className="py-2.5 space-y-2 text-[12px]">
                  {/* Line 1: Gross */}
                  <div
                    className={`flex justify-between items-center transition-all duration-300 ${
                      visibleLines >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span className="text-[#535361]">Gross course sales</span>
                    <span className="font-semibold text-[#151517]">₹1,42,800</span>
                  </div>

                  {/* Line 2: Gateway Fees */}
                  <div
                    className={`flex justify-between items-center transition-all duration-300 ${
                      visibleLines >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span className="text-[#535361]">Gateway fees (direct)</span>
                    <span className="text-[#8C8C98]">As per gateway</span>
                  </div>

                  {/* Line 3: 0% Platform Cut */}
                  <div
                    className={`flex justify-between items-center bg-[#F5FAF6] rounded-[6px] px-2 py-1 transition-all duration-300 ${
                      visibleLines >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span className="text-[#12A27A] font-semibold">LMS Domain cut</span>
                    <b className="text-[#12A27A] font-bold">0% (₹0)</b>
                  </div>

                  {/* Line 4: Net Payout */}
                  <div
                    className={`flex justify-between items-baseline pt-2 border-t border-dashed border-[#E8E8EC] transition-all duration-300 ${
                      visibleLines >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span className="font-semibold text-[#151517]">Net to your bank</span>
                    <b className="font-bold text-[16px] text-[#151517]">100% funds</b>
                  </div>
                </div>

                {/* Drawing Sparkline */}
                <div className="pt-1">
                  <svg viewBox="0 0 100 20" className="w-full h-5 text-[#12A27A]" fill="none">
                    <path
                      d="M2 17 L18 13 L34 15 L50 8 L66 11 L82 5 L98 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Footer Trust Callout */}
              <div className="bg-white border border-[#E8E8EC] rounded-[10px] p-2.5 px-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#12A27A] shrink-0" />
                <span className="text-[11.5px] font-medium text-[#151517] leading-tight">
                  Your own Razorpay / Stripe account, connected directly
                </span>
              </div>
            </div>

            {/* Column Text Under UI */}
            <div className="mt-5 text-left">
              <h3 className="text-[17px] font-bold text-[#151517] tracking-tight">
                0% platform cut & direct settlements
              </h3>
              <p className="text-[14px] text-[#535361] leading-[1.5] mt-1.5 min-h-[42px]">
                Connect your existing payment accounts. Fees deposit straight into your bank account with zero platform commission.
              </p>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#151517] hover:text-[#12A27A] transition-colors mt-2.5 cursor-pointer"
              >
                <span>Learn about payouts</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white border border-[#E8E8EC] rounded-[24px]">
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default SellAnywhereSection;
