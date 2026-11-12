"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

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

const FEATURES = [
  {
    title: "Multi-currency checkout",
    desc: "Sell in INR, USD, EUR, GBP and other major currencies, depending on your gateway account.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]">
        <circle cx="10" cy="10" r="7" />
        <path d="M3 10h14M10 3c2.5 2.5 2.5 11.5 0 14M10 3c-2.5 2.5-2.5 11.5 0 14" />
      </svg>
    ),
  },
  {
    title: "Coupons & promotions",
    desc: "Create percentage or flat discount codes with expiry dates and redemption limits.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]">
        <path d="M3 7a2 2 0 0 0 0 6v3h14v-3a2 2 0 0 1 0-6V4H3z M8 13l4-6" />
      </svg>
    ),
  },
  {
    title: "Offline payments with review",
    desc: "Accept direct bank transfers and payment screenshots with one-click admin approval.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]">
        <path d="M3 8l7-4 7 4M4 8v7M8 8v7M12 8v7M16 8v7M3 16h14" />
      </svg>
    ),
  },
  {
    title: "Revenue reports & payouts",
    desc: "Track academy earnings and calculate revenue splits for your teaching team.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]">
        <path d="M3 16h14M5 13l3-4 3 2 4-6" />
      </svg>
    ),
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

        {/* Centred Hairline Feature List (Sendr Engine Style) */}
        <div className="max-w-[560px] mx-auto mt-11">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="rv-v4 text-center py-6.5 border-b border-[#E8E8EC] first:border-t"
            >
              <span className="w-10 h-10 rounded-[12px] bg-white border border-[#E8E8EC] shadow-[0_6px_14px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center mx-auto mb-3.5 text-[#6C4BFF]">
                {feat.icon}
              </span>
              <b className="block font-semibold text-[15.5px] text-[#151517] mb-1">
                {feat.title}
              </b>
              <p className="text-[#535361] text-[14px] leading-relaxed max-w-[44ch] mx-auto">
                {feat.desc}
              </p>
            </div>
          ))}
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
