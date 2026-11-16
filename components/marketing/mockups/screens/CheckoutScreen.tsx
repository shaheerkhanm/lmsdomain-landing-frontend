"use client";

import React from "react";
import { Lock, ShieldCheck, Tag, Check, CreditCard, Building, ArrowRight } from "lucide-react";
import { MOCKUP_IDENTITY } from "@/content/mockup-data";

export function CheckoutScreen() {
  return (
    <div
      role="img"
      aria-label="Your Academy branded checkout experience"
      className="w-full h-full bg-[#FAF9F6] font-urbanist text-[#161616] flex flex-col select-none overflow-hidden"
    >
      <div aria-hidden="true" className="w-full h-full flex flex-col">
        {/* Custom Domain Browser Bar */}
        <div className="h-9 bg-[#F0EFEA] border-b border-[#E0DED7] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
            <span className="size-2 rounded-full bg-[#D5D5D0]" />
          </div>

          <div className="w-full max-w-[340px] h-6 bg-white border border-[#D5D5D0] rounded-md px-2.5 text-[10px] font-mono text-[#525866] flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-1.5 truncate">
              <Lock className="size-2.5 text-[#059669]" />
              https://{MOCKUP_IDENTITY.domain}/checkout/neet-biology
            </span>
            <span className="text-[8px] font-sans font-semibold text-[#059669]">
              256-bit SSL
            </span>
          </div>

          <div className="w-10" />
        </div>

        {/* Checkout Header */}
        <header className="h-11 bg-white border-b border-[#EAE8E2] px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-[#161616] text-white font-bold text-xs flex items-center justify-center">
              {MOCKUP_IDENTITY.shortName}
            </div>
            <span className="font-bold text-[12px] text-[#161616] tracking-tight">
              {MOCKUP_IDENTITY.academyName} · Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[#059669] font-medium">
            <ShieldCheck className="size-3.5" />
            <span>Encrypted Checkout</span>
          </div>
        </header>

        {/* Checkout Body: Two Columns */}
        <div className="p-3 sm:p-4 flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-3 max-w-4xl mx-auto w-full">
          {/* Left Column: Payment Method Selection (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[12px] font-bold text-[#161616] mb-1">
                Select Payment Method
              </div>
              <p className="text-[9px] text-[#717684] mb-3">
                All major domestic & international payment options supported.
              </p>

              {/* Gateway Choice List */}
              <div className="space-y-2">
                {/* Razorpay (Selected) */}
                <div className="p-2.5 rounded-xl border-2 border-[#161616] bg-[#FAF9F6] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="size-4 rounded-full border-2 border-[#161616] flex items-center justify-center">
                      <div className="size-2 rounded-full bg-[#161616]" />
                    </div>
                    <div>
                      <div className="font-bold text-[11px] text-[#161616]">
                        Razorpay (UPI, Google Pay, Netbanking, Cards)
                      </div>
                      <div className="text-[9px] text-[#717684]">
                        Zero surcharge · Instant confirmation
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                    Fastest
                  </span>
                </div>

                {/* Paytm */}
                <div className="p-2.5 rounded-xl border border-[#EAE8E2] bg-white flex items-center justify-between hover:bg-[#FAF9F6]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-4 rounded-full border border-[#D5D5D0]" />
                    <div>
                      <div className="font-semibold text-[11px] text-[#161616]">
                        Paytm (UPI & Paytm Wallet)
                      </div>
                      <div className="text-[9px] text-[#717684]">
                        Direct wallet debit & UPI QR
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stripe */}
                <div className="p-2.5 rounded-xl border border-[#EAE8E2] bg-white flex items-center justify-between hover:bg-[#FAF9F6]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-4 rounded-full border border-[#D5D5D0]" />
                    <div>
                      <div className="font-semibold text-[11px] text-[#161616]">
                        Stripe (Credit / Debit Cards)
                      </div>
                      <div className="text-[9px] text-[#717684]">
                        Visa, Mastercard, Amex (USD, EUR, GBP, INR)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Bank Transfer */}
                <div className="p-2.5 rounded-xl border border-[#EAE8E2] bg-white flex items-center justify-between hover:bg-[#FAF9F6]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-4 rounded-full border border-[#D5D5D0]" />
                    <div>
                      <div className="font-semibold text-[11px] text-[#161616]">
                        Pay by Bank Transfer (Offline Review)
                      </div>
                      <div className="text-[9px] text-[#717684]">
                        NEFT / RTGS with manual admin approval
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] text-[#717684] bg-[#F5F6F8] px-1.5 py-0.5 rounded">
                    Admin Approval
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0EFEA] text-[9px] text-[#8F94A0]">
              Direct settlement to Your Academy merchant account · Zero vendor fee
            </div>
          </div>

          {/* Right Column: Order Summary & Price Breakdown (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[12px] font-bold text-[#161616] mb-2 pb-1.5 border-b border-[#F0EFEA]">
                Order Summary
              </div>

              {/* Course Item */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="font-bold text-[11px] text-[#161616]">
                    NEET Biology Live Batch 2026
                  </div>
                  <div className="text-[9px] text-[#717684]">
                    Batch B · Scheduled Live Zoom Classes & Tests
                  </div>
                </div>
                <span className="font-bold text-[11px] text-[#161616]">₹14,999.00</span>
              </div>

              {/* Coupon Field */}
              <div className="mb-3 p-2 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2]">
                <div className="text-[9px] font-semibold text-[#717684] mb-1">
                  Coupon Code
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 bg-white border border-[#059669] rounded-md px-2 py-1 text-[10px] font-mono text-[#059669] font-bold flex items-center justify-between">
                    <span>NEWBATCH10</span>
                    <span className="text-[8px] bg-[#ECFDF5] px-1 rounded">Applied</span>
                  </div>
                  <button className="px-2 py-1 rounded bg-[#161616] text-white text-[9px] font-semibold">
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-[10px] border-t border-[#F0EFEA] pt-2">
                <div className="flex justify-between text-[#717684]">
                  <span>Course fee:</span>
                  <span>₹14,999.00</span>
                </div>
                <div className="flex justify-between text-[#717684]">
                  <span>GST (18%):</span>
                  <span>₹2,699.82</span>
                </div>
                <div className="flex justify-between font-bold text-[13px] text-[#161616] pt-1.5 border-t border-[#F0EFEA]">
                  <span>Total Amount:</span>
                  <span>₹17,698.82</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-2">
              <button className="w-full h-8 rounded-lg bg-[#161616] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs">
                <span>Proceed to Pay ₹17,698.82</span>
                <ArrowRight className="size-3" />
              </button>
              <div className="text-center text-[8px] text-[#8F94A0] mt-1.5">
                Instant enrollment confirmation & GST tax invoice
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;

