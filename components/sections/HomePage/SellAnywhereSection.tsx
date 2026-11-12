"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { Globe, TicketPercent, Landmark, TrendingUp } from "lucide-react";

const GATEWAYS = [
  {
    name: "Razorpay",
    letter: "R",
    color: "#0C66E4",
    desc: "UPI, Cards, NetBanking in India",
  },
  {
    name: "Paytm",
    letter: "P",
    color: "#00B9F1",
    desc: "UPI, Paytm Wallet & Indian Cards",
  },
  {
    name: "Stripe",
    letter: "S",
    color: "#635BFF",
    desc: "Global cards, Apple Pay & Google Pay",
  },
  {
    name: "DOKU",
    letter: "D",
    color: "#E2231A",
    desc: "Virtual accounts, cards & wallets in SE Asia",
  },
];

export function SellAnywhereSection() {
  const [selectedGateway, setSelectedGateway] = useState("Razorpay");
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="sell">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="rv-v4">
          <Eyebrow tone="gradient">Sell anywhere</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Collect fees anywhere
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch] mt-3">
            Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval.
          </p>
        </div>

        {/* 2-column Grid: Left Checkout Card + Right Gateway List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
          {/* Left: Checkout Card */}
          <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[20px] p-5 sm:p-[22px] shadow-[0_30px_60px_-36px_rgba(20,20,40,0.3)]">
            <span className="text-[12px] text-[#535361] uppercase tracking-[0.1em] font-semibold block">
              Checkout
            </span>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mt-2.5 mb-4 gap-3">
              <b className="text-[19px] tracking-[-0.02em] text-[#151517]">
                Full-Stack Web Engineering
              </b>
              <div className="sm:text-right shrink-0">
                <strong className="block text-[22px] tracking-[-0.03em] text-[#151517]">
                  ₹7,999
                </strong>
                <small className="text-[#535361] text-xs">or $89</small>
              </div>
            </div>

            {/* Coupon row */}
            <div className="bg-[#F5FAF6] border border-dashed border-[#A0D8B4] rounded-[10px] p-2.5 px-3 flex justify-between items-center text-[13px] mb-4">
              <span className="text-[#151517]">
                Coupon <b>WELCOME10</b>
              </span>
              <span className="text-[#17A06B] font-semibold">Applied ✓</span>
            </div>

            {/* Gateway Radios */}
            <div className="grid grid-cols-2 gap-2 mb-4.5">
              {GATEWAYS.map((gw) => {
                const isSelected = selectedGateway === gw.name;
                return (
                  <div
                    key={gw.name}
                    onClick={() => setSelectedGateway(gw.name)}
                    className={`border rounded-[10px] p-2.5 px-3 text-[13px] flex items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#6C4BFF] bg-[#EFEBFF] font-semibold text-[#151517]"
                        : "border-[#E2E2E8] bg-white text-[#535361] hover:border-[#D0D0D8]"
                    }`}
                  >
                    <i
                      className={`w-3.5 h-3.5 rounded-full border-[1.5px] inline-block shrink-0 not-italic ${
                        isSelected
                          ? "border-[#6C4BFF] bg-[#6C4BFF] shadow-[inset_0_0_0_2.5px_#FFFFFF]"
                          : "border-[#C4C4CD]"
                      }`}
                    />
                    <span>{gw.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="btn-v4-dark w-full justify-center text-center cursor-pointer"
            >
              Pay ₹7,999
            </button>
          </div>

          {/* Right: Gateway List */}
          <div className="rv-v4 grid gap-3">
            {GATEWAYS.map((gw) => (
              <div
                key={gw.name}
                className="bg-white border border-[#E8E8EC] rounded-[14px] p-3.5 px-4.5 flex items-center gap-3.5"
              >
                <span
                  className="w-9 h-9 rounded-[10px] bg-[#F5F5F7] flex items-center justify-center font-bold text-[17px] shrink-0"
                  style={{ color: gw.color }}
                >
                  {gw.letter}
                </span>
                <div>
                  <b className="text-[15px] font-semibold text-[#151517] block">
                    {gw.name}
                  </b>
                  <small className="text-[#535361] text-[12.5px]">
                    {gw.desc}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid (4 in 1 row at 1280px+, 2x2 at 768-1279px, 1 col below 768px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {/* Card 1: Multi-currency checkout */}
          <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[20px] p-6 shadow-[0_20px_40px_-32px_rgba(20,20,40,0.3)] text-left transition-all duration-200 hover:border-[#D9D3FF] hover:-translate-y-0.5 flex flex-col">
            <div className="h-[88px] canvas-dots rounded-[12px] border border-[#E8E8EC] flex items-center justify-center p-3 mb-5 overflow-hidden">
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                <span className="bg-white border border-[#6C4BFF] text-[#6C4BFF] font-semibold text-[12px] px-2.5 py-1 rounded-[6px] shadow-xs">
                  ₹7,999
                </span>
                <span className="bg-white border border-[#E8E8EC] text-[#151517] font-medium text-[12px] px-2.5 py-1 rounded-[6px] shadow-xs">
                  $89
                </span>
                <span className="bg-white border border-[#E8E8EC] text-[#535361] font-medium text-[12px] w-7 h-7 flex items-center justify-center rounded-[6px] shadow-xs">
                  €
                </span>
                <span className="bg-white border border-[#E8E8EC] text-[#535361] font-medium text-[12px] w-7 h-7 flex items-center justify-center rounded-[6px] shadow-xs">
                  £
                </span>
              </div>
            </div>
            <span className="w-10 h-10 rounded-[12px] bg-[#EFEBFF] flex items-center justify-center mb-4 text-[#6C4BFF] shrink-0">
              <Globe className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-[16px] font-semibold text-[#151517] mb-1.5">
              Multi-currency checkout
            </h3>
            <p className="text-[14px] text-[#535361] leading-[1.5]">
              Sell in INR, USD, EUR, GBP and other major currencies, depending on your gateway account.
            </p>
          </div>

          {/* Card 2: Coupons & promotions */}
          <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[20px] p-6 shadow-[0_20px_40px_-32px_rgba(20,20,40,0.3)] text-left transition-all duration-200 hover:border-[#D9D3FF] hover:-translate-y-0.5 flex flex-col">
            <div className="h-[88px] canvas-dots rounded-[12px] border border-[#E8E8EC] flex items-center justify-center p-3 mb-5 overflow-hidden">
              <div className="border border-dashed border-[#A0D8B4] bg-[#F5FAF6] rounded-[8px] p-2 px-3 flex flex-col items-center gap-0.5 shadow-xs">
                <span className="text-[11.5px] font-semibold text-[#151517]">
                  WELCOME10 · 10% off
                </span>
                <span className="text-[10px] text-[#17A06B] font-medium">
                  Expires Fri
                </span>
              </div>
            </div>
            <span className="w-10 h-10 rounded-[12px] bg-[#EFEBFF] flex items-center justify-center mb-4 text-[#6C4BFF] shrink-0">
              <TicketPercent className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-[16px] font-semibold text-[#151517] mb-1.5">
              Coupons & promotions
            </h3>
            <p className="text-[14px] text-[#535361] leading-[1.5]">
              Create percentage or flat discount codes with expiry dates and redemption limits.
            </p>
          </div>

          {/* Card 3: Offline payments with review */}
          <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[20px] p-6 shadow-[0_20px_40px_-32px_rgba(20,20,40,0.3)] text-left transition-all duration-200 hover:border-[#D9D3FF] hover:-translate-y-0.5 flex flex-col">
            <div className="h-[88px] canvas-dots rounded-[12px] border border-[#E8E8EC] flex items-center justify-center p-3 mb-5 overflow-hidden">
              <div className="bg-white border border-[#E8E8EC] rounded-[8px] p-2 px-2.5 flex items-center justify-between w-full max-w-[210px] shadow-xs">
                <span className="text-[11px] font-medium text-[#151517] truncate mr-2">
                  Bank transfer screenshot
                </span>
                <span className="bg-[#17A06B] text-white text-[10px] font-semibold px-2 py-0.5 rounded-[5px] shrink-0">
                  Approve
                </span>
              </div>
            </div>
            <span className="w-10 h-10 rounded-[12px] bg-[#EFEBFF] flex items-center justify-center mb-4 text-[#6C4BFF] shrink-0">
              <Landmark className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-[16px] font-semibold text-[#151517] mb-1.5">
              Offline payments with review
            </h3>
            <p className="text-[14px] text-[#535361] leading-[1.5]">
              Accept direct bank transfers and payment screenshots with one-click admin approval.
            </p>
          </div>

          {/* Card 4: Revenue reports & payouts */}
          <div className="rv-v4 bg-white border border-[#E8E8EC] rounded-[20px] p-6 shadow-[0_20px_40px_-32px_rgba(20,20,40,0.3)] text-left transition-all duration-200 hover:border-[#D9D3FF] hover:-translate-y-0.5 flex flex-col">
            <div className="h-[88px] canvas-dots rounded-[12px] border border-[#E8E8EC] flex items-center justify-center p-3 mb-5 overflow-hidden">
              <div className="flex items-end gap-2 h-10" aria-label="Mini revenue bar chart">
                <span className="w-2.5 h-3 rounded-t-[3px] bg-[#6C4BFF]/40" />
                <span className="w-2.5 h-4.5 rounded-t-[3px] bg-[#6C4BFF]/55" />
                <span className="w-2.5 h-6 rounded-t-[3px] bg-[#6C4BFF]/70" />
                <span className="w-2.5 h-7 rounded-t-[3px] bg-[#6C4BFF]/85" />
                <span className="w-2.5 h-8.5 rounded-t-[3px] bg-[#6C4BFF]" />
                <span className="w-2.5 h-10 rounded-t-[3px] bg-[#6C4BFF]" />
              </div>
            </div>
            <span className="w-10 h-10 rounded-[12px] bg-[#EFEBFF] flex items-center justify-center mb-4 text-[#6C4BFF] shrink-0">
              <TrendingUp className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-[16px] font-semibold text-[#151517] mb-1.5">
              Revenue reports & payouts
            </h3>
            <p className="text-[14px] text-[#535361] leading-[1.5]">
              Track academy earnings and calculate revenue splits for your teaching team.
            </p>
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
