import PriceSection from "@/components/sections/PricingPage/PriceSection";
import PricingBanner from "@/components/sections/PricingPage/PricingBanner";
import React from "react";

function PricingPage() {
    return (
        <div className="font-manrope relative">
            <PricingBanner />
            <PriceSection />
        </div>
    );
}

export default PricingPage;
