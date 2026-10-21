import PriceSection from "@/components/sections/PricingPage/PriceSection";
import React from "react";
import CtaSection from "../sections/HomePage/CtaSection/CtaSection";
import PriceFAQ from "../sections/PricingPage/PriceFAQ";
import { fetchCms } from "@/lib/api/content";
import { fetchApi } from "@/lib/api/client";

async function PricingPage() {
    const [pricingHeroData, pricingFaqData, pricingCtaData, pricingPlansRes] = await Promise.all([
        fetchCms("pricing-hero"),
        fetchCms("pricing-faq"),
        fetchCms("pricing-footer-card"),
        fetchApi<{ status?: boolean; data?: any[] }>("/api/pricing", {
            method: "POST",
            tags: ["pricing"],
            revalidate: 300,
        }).catch(() => null),
    ]);

    const pricingPlansData = pricingPlansRes?.data || [];

    return (
        <div className="font-manrope [&>*:not(:first-child)]:lg:mt-[80px] [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px] [&>*:last-child]:mb-[30px]">
            <PriceSection data={pricingHeroData || {}} plans={pricingPlansData} />
            <PriceFAQ data={pricingFaqData || {}} />
            <CtaSection data={pricingCtaData || {}} />
        </div>
    );
}

export default PricingPage;
