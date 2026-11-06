"use client";

import React from "react";
import { Section, Eyebrow } from "@/components/marketing/ui";
import { Globe, ShieldCheck, Tag, ReceiptText } from "lucide-react";

export function SellAnywhereSection() {
  const gateways = [
    { name: "Stripe", note: "Global cards, Apple Pay & Google Pay" },
    { name: "Razorpay", note: "UPI, Cards, NetBanking in India" },
    { name: "Paytm", note: "UPI, Paytm Wallet & Indian Cards" },
    { name: "DOKU", note: "Virtual accounts, cards & wallets in SE Asia" },
  ];

  const features = [
    {
      icon: Globe,
      title: "Multi-currency checkout",
      desc: "Sell in INR, USD, EUR, GBP and 100+ currencies depending on your gateway account.",
    },
    {
      icon: Tag,
      title: "Coupons & promotions",
      desc: "Create percentage or flat discount codes with expiry dates and redemption limits.",
    },
    {
      icon: ShieldCheck,
      title: "Offline payments with review",
      desc: "Accept direct bank transfers and payment screenshots with one-click admin approval.",
    },
    {
      icon: ReceiptText,
      title: "Revenue reports & payouts",
      desc: "Track academy earnings and calculate revenue splits for your teaching team.",
    },
  ];

  return (
    <Section tone="warm" spacing="default">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Eyebrow tone="emerald">PAYMENTS & CHECKOUT</Eyebrow>
        <h2 className="type-h2 text-[#161616] mt-3">
          Sell anywhere, in any currency
        </h2>
        <p className="type-body text-[#6B6F76] mt-3">
          Connect your preferred payment gateway. No proprietary vendor lock-in, with instant fee settlements straight to your own merchant account.
        </p>
      </div>

      {/* Gateway Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {gateways.map((gw, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EAE8E2] text-center flex flex-col items-center justify-center shadow-xs"
          >
            <span className="text-lg sm:text-xl font-bold text-[#161616] tracking-tight mb-1">
              {gw.name}
            </span>
            <span className="text-xs text-[#6B6F76] leading-relaxed">
              {gw.note}
            </span>
          </div>
        ))}
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/70 border border-[#EAE8E2] flex flex-col"
            >
              <div className="size-9 rounded-xl bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] mb-4">
                <Icon className="size-4" />
              </div>
              <h3 className="text-base font-bold text-[#161616] tracking-tight mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default SellAnywhereSection;
