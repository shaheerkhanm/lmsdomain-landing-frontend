import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Sell | Platform"),
  description: "Collect fees in any currency, on your own checkout.",
  alternates: { canonical: "/platform/sell" },
};

export default function SellPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Sell"
        title="Collect fees in any currency, on your own checkout."
        subtitle="Catalogue, cart, coupons, Stripe, Razorpay, Paytm, DOKU, multi-currency, and instructor payouts."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Sell module payment flows, gateways, and checkout features will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}
