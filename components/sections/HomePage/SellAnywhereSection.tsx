"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { Globe, TicketPercent, Landmark, TrendingUp, Check } from "lucide-react";

const GATEWAYS = [
  {
    name: "Razorpay",
    type: "image" as const,
    src: "/assets/img/integration/integration-1.png",
    desc: "UPI, Cards & NetBanking in India",
  },
  {
    name: "Stripe",
    type: "image" as const,
    src: "/assets/img/integration/integration-8.png",
    desc: "Global cards, Apple Pay & Google Pay",
  },
  {
    name: "Paytm",
    type: "wordmark" as const,
    color: "#00B9F1",
    desc: "UPI, Paytm Wallet & Indian Cards",
  },
  {
    name: "DOKU",
    type: "wordmark" as const,
    color: "#E2231A",
    desc: "Virtual accounts & wallets in SE Asia",
  },
];

const RECENT_PAYMENTS = [
  { initials: "AK", name: "Aman K.", course: "Batch B · Full-Stack Web", amount: "₹4,499", time: "3m ago" },
  { initials: "SM", name: "Sneha M.", course: "React & Node.js Mastery", amount: "₹2,499", time: "18m ago" },
  { initials: "VT", name: "Vikram T.", course: "Python Systems Bootcamp", amount: "₹3,999", time: "1h ago" },
];

export function SellAnywhereSection() {
  const [selectedGateway, setSelectedGateway] = useState("Razorpay");
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="sell">
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="rv-v4">
          <Eyebrow dotColor="#12A27A">Sell anywhere</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Collect fees anywhere
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch] mt-3">
            Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval.
          </p>
        </div>

        {/* 2-column Grid: Left Real Checkout Card + Right Gateway Strip & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-10 items-start">
          {/* Left: Believable Checkout Card */}
          <div className="rv-v4 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6 sm:p-7">
            {/* Header / Course line */}
            <div className="flex items-start gap-4 pb-5 border-b border-[#F0F0F3]">
              <div className="relative w-14 h-14 rounded-[12px] overflow-hidden bg-[#F4F4F7] shrink-0 border border-[#E8E8EC]">
                <Image
                  src="/images/features/course-checkout-browsing.webp"
                  alt="Course cover"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C8C98] block">
                  Course enrollment
                </span>
                <b className="text-[16px] font-bold text-[#151517] block truncate mt-0.5">
                  Full-Stack Web Engineering · Batch B
                </b>
                <span className="text-[13px] text-[#535361] mt-0.5 block">
                  Includes live classes, assignments & certificate
                </span>
              </div>
            </div>

            {/* Price & Coupon calculation */}
            <div className="py-4 border-b border-[#F0F0F3] space-y-2 text-[13.5px]">
              <div className="flex justify-between items-center text-[#535361]">
                <span>Course fee</span>
                <span className="text-[#151517] font-medium">₹4,999</span>
              </div>
              <div className="flex justify-between items-center text-[#12A27A]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="bg-[#E8F8F0] px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold">
                    WELCOME10 applied
                  </span>
                </span>
                <span className="font-semibold">−₹500</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-[#E8E8EC]">
                <span className="text-[14px] font-semibold text-[#151517]">Total payable</span>
                <div className="text-right">
                  <span className="text-[22px] font-bold tracking-[-0.03em] text-[#151517] leading-none">
                    ₹4,499
                  </span>
                  <small className="block text-[#8C8C98] text-[11px] mt-0.5">or $54 USD</small>
                </div>
              </div>
            </div>

            {/* Gateway choices with real logos & radio */}
            <div className="py-4 space-y-2">
              <span className="text-[11.5px] uppercase font-semibold tracking-[0.08em] text-[#8C8C98] block mb-2">
                Select payment method
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GATEWAYS.map((gw) => {
                  const isSelected = selectedGateway === gw.name;
                  return (
                    <div
                      key={gw.name}
                      onClick={() => setSelectedGateway(gw.name)}
                      className={`border rounded-[12px] p-3 px-3.5 flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#12A27A] border-[1.5px] bg-[#F5FAF6] text-[#151517]"
                          : "border-[#E8E8EC] bg-white text-[#535361] hover:border-[#D0D0D8]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {gw.type === "image" ? (
                          <div className="relative h-6 w-18 shrink-0 flex items-center">
                            <Image
                              src={gw.src}
                              alt={gw.name}
                              width={72}
                              height={24}
                              className="h-5 w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <span
                            className="font-bold text-[14px] tracking-tight shrink-0"
                            style={{ color: gw.color }}
                          >
                            {gw.name}
                          </span>
                        )}
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#12A27A] bg-[#12A27A]"
                            : "border-[#C8C8D0]"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="btn-v4-dark w-full justify-center text-center cursor-pointer mt-2 bg-[#151517] hover:bg-[#252528] text-white h-12 rounded-[12px] font-semibold text-[15px]"
            >
              Pay ₹4,499
            </button>

            {/* Security Footnote */}
            <p className="text-center text-[12px] text-[#8C8C98] mt-3 flex items-center justify-center gap-1.5">
              <span>🔒 256-bit encrypted checkout</span>
              <span className="text-[#D0D0D8]">·</span>
              <span>Secured by {selectedGateway}</span>
            </p>
          </div>

          {/* Right: Gateway Brand Strip & Integration Details */}
          <div className="rv-v4 flex flex-col gap-4">
            <div className="bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#12A27A] block mb-2">
                Zero Commission
              </span>
              <h3 className="text-[20px] font-bold text-[#151517] tracking-tight">
                Connect your existing accounts directly
              </h3>
              <p className="text-[14px] text-[#535361] leading-[1.55] mt-2">
                Fees deposit straight into your bank account. We take 0% cut of your course sales and never hold your funds.
              </p>

              {/* Gateway Logo Strip (Single Row, Grayscale -> Color on hover) */}
              <div className="pt-6 mt-6 border-t border-[#F0F0F3]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C8C98] block mb-3.5">
                  Supported Payment Gateways
                </span>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {GATEWAYS.map((gw) => (
                    <div
                      key={gw.name}
                      className="group flex items-center gap-2 px-3 py-2 rounded-[10px] bg-[#F7F7F9] border border-[#EBEBEF] transition-all hover:bg-white hover:border-[#D0D0D8]"
                    >
                      {gw.type === "image" ? (
                        <Image
                          src={gw.src}
                          alt={gw.name}
                          width={72}
                          height={22}
                          className="h-4.5 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                        />
                      ) : (
                        <span
                          className="font-semibold text-[13px] filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                          style={{ color: gw.color }}
                        >
                          {gw.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Offline review preview callout */}
            <div className="bg-[#F6F5F2] border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6">
              <b className="text-[14.5px] font-semibold text-[#151517] block">
                Direct bank transfers & UPI QR codes
              </b>
              <p className="text-[13px] text-[#535361] mt-1 leading-relaxed">
                Learners can submit transaction references or payment receipts. Your finance team reviews and approves access in one click.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards Bento Grid: 1 Wide Card + 3 Smaller UI-Fragment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Card 1 (Wide Bento Card spanning 2 columns on desktop): Payments this week */}
          <div className="rv-v4 lg:col-span-2 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6 text-left flex flex-col justify-between">
            <div>
              {/* Top Row: Title + Sparkline */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11.5px] uppercase font-semibold tracking-[0.08em] text-[#12A27A] block">
                    Revenue & payouts
                  </span>
                  <h3 className="text-[18px] font-bold text-[#151517] tracking-tight mt-0.5">
                    Payments this week
                  </h3>
                  <p className="text-[13.5px] text-[#535361] mt-1 max-w-[48ch]">
                    Track academy earnings, verify settlement dates, and calculate revenue splits for instructors.
                  </p>
                </div>

                {/* Green Sparkline */}
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-1.5 text-[#12A27A] font-bold text-[13px]">
                    <TrendingUp className="w-4 h-4" strokeWidth={2} />
                    <span>₹1,42,800</span>
                  </div>
                  <svg viewBox="0 0 100 24" className="w-24 h-6 mt-1 text-[#12A27A]" fill="none">
                    <path
                      d="M2 20 L18 16 L34 19 L50 11 L66 14 L82 6 L98 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* 3 Rows of Recent Payments with Initials & Paid Pill */}
              <div className="divide-y divide-[#F0F0F3] border-t border-b border-[#F0F0F3] my-2">
                {RECENT_PAYMENTS.map((payment, pIdx) => (
                  <div key={pIdx} className="py-2.5 flex items-center justify-between gap-3 text-[13px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-[8px] bg-[#EBEBED] text-[#535361] font-semibold text-[11px] grid place-items-center shrink-0">
                        {payment.initials}
                      </span>
                      <div className="min-w-0">
                        <b className="font-semibold text-[#151517] block truncate leading-tight">
                          {payment.name}
                        </b>
                        <small className="text-[#8C8C98] text-[11px] block truncate">
                          {payment.course} · {payment.time}
                        </small>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-semibold text-[#151517] text-[13px]">
                        {payment.amount}
                      </span>
                      <span className="bg-[#E8F8F0] text-[#12A27A] font-semibold text-[11px] px-2 py-0.5 rounded-[5px]">
                        Paid ✓
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[12.5px] text-[#8C8C98] mt-3">
              Automated settlement reconciliation with zero payment delay.
            </p>
          </div>

          {/* Card 2: Multi-currency checkout */}
          <div className="rv-v4 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6 text-left flex flex-col justify-between">
            <div>
              {/* Real UI Fragment: Currency Switcher Pill */}
              <div className="p-3 bg-[#F7F7F9] rounded-[12px] border border-[#E8E8EC] mb-4">
                <span className="text-[10.5px] uppercase font-semibold tracking-[0.08em] text-[#8C8C98] block mb-2">
                  Auto-detected currency
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-white border border-[#12A27A] text-[#12A27A] font-semibold text-[12px] px-2.5 py-1 rounded-[6px] shadow-xs">
                    ₹ INR · ₹4,499
                  </span>
                  <span className="bg-white border border-[#E8E8EC] text-[#535361] font-medium text-[12px] px-2 py-1 rounded-[6px]">
                    $ USD · $54
                  </span>
                  <span className="bg-white border border-[#E8E8EC] text-[#8C8C98] font-medium text-[12px] px-2 py-1 rounded-[6px]">
                    € EUR
                  </span>
                  <span className="bg-white border border-[#E8E8EC] text-[#8C8C98] font-medium text-[12px] px-2 py-1 rounded-[6px]">
                    £ GBP
                  </span>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#151517] mb-1.5">
                Multi-currency checkout
              </h3>
              <p className="text-[13.5px] text-[#535361] leading-[1.5]">
                Sell in INR, USD, EUR, GBP and other major currencies, depending on your gateway account.
              </p>
            </div>
          </div>

          {/* Card 3: Coupons & promotions */}
          <div className="rv-v4 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6 text-left flex flex-col justify-between">
            <div>
              {/* Real UI Fragment: Coupon Chip */}
              <div className="p-3 bg-[#F7F7F9] rounded-[12px] border border-[#E8E8EC] mb-4">
                <div className="border border-dashed border-[#A0D8B4] bg-[#F5FAF6] rounded-[8px] p-2.5 px-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-[13px] text-[#151517] block">
                      WELCOME10
                    </span>
                    <small className="text-[#12A27A] text-[11px] font-semibold block">
                      10% off · 38 uses recorded
                    </small>
                  </div>
                  <span className="bg-[#12A27A] text-white text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] shrink-0">
                    Active
                  </span>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#151517] mb-1.5">
                Coupons & promotions
              </h3>
              <p className="text-[13.5px] text-[#535361] leading-[1.5]">
                Create percentage or flat discount codes with expiry dates and redemption limits.
              </p>
            </div>
          </div>

          {/* Card 4: Offline payments with review */}
          <div className="rv-v4 lg:col-span-2 bg-white border border-[rgba(15,15,20,0.08)] rounded-[20px] p-6 text-left flex flex-col justify-between">
            <div>
              {/* Real UI Fragment: Invoice with GST line + Approve Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* GST invoice fragment */}
                <div className="p-3 bg-[#F7F7F9] rounded-[12px] border border-[#E8E8EC] text-[12px]">
                  <span className="text-[10.5px] uppercase font-semibold text-[#8C8C98] block">
                    GST Compliant Invoice
                  </span>
                  <b className="font-semibold text-[#151517] block mt-0.5">INV-2026-0841</b>
                  <div className="flex justify-between text-[#535361] mt-1 text-[11.5px]">
                    <span>18% GST (CGST + SGST)</span>
                    <span className="font-mono font-semibold">₹686.28</span>
                  </div>
                </div>

                {/* Action Row */}
                <div className="p-3 bg-[#F7F7F9] rounded-[12px] border border-[#E8E8EC] flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[11.5px]">
                    <span className="text-[#151517] font-medium">Bank transfer · UTR 481920</span>
                    <span className="text-[#8C8C98]">₹4,499</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      className="bg-[#12A27A] hover:bg-[#0E8563] text-white text-[11.5px] font-semibold px-2.5 py-1 rounded-[6px] transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="bg-white border border-[#E8E8EC] text-[#535361] text-[11.5px] font-medium px-2.5 py-1 rounded-[6px]"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#151517] mb-1.5">
                Offline payments with review
              </h3>
              <p className="text-[13.5px] text-[#535361] leading-[1.5]">
                Accept direct bank transfers and payment screenshots with one-click admin approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Enquiry Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default SellAnywhereSection;