import PriceSection from "@/components/sections/PricingPage/PriceSection";
import PricingBanner from "@/components/sections/PricingPage/PricingBanner";
import React from "react";
import CtaSection from "../sections/HomePage/CtaSection/CtaSection";
import PriceFAQ from "../sections/PricingPage/PriceFAQ";

function PricingPage() {
    return (
        <div className="font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">
            <PriceSection />
            <PriceFAQ />
            <CtaSection />
        </div>
    );
}

export default PricingPage;
