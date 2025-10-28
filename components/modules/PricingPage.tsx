import PriceSection from "@/components/sections/PricingPage/PriceSection";
import PricingBanner from "@/components/sections/PricingPage/PricingBanner";
import React from "react";
import CtaSection from "../sections/HomePage/CtaSection/CtaSection";
import PriceFAQ from "../sections/PricingPage/PriceFAQ";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";

async function PricingPage() {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getAllCms
            const response = await fetchData({
                url: location,
                body: { slug },

            })



            return response
        } catch (error) {
            return {}
        }
    }

    // Fetch all section data
    const pricingHeroData = await getData("pricing-hero");
    const pricingFaqData = await getData("pricing-faq");
    const pricingCtaData = await getData("pricing-footer-card");

    return (
        <div className="font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">
            <PriceSection data={pricingHeroData} />
            <PriceFAQ data={pricingFaqData} />
            <CtaSection data={pricingCtaData} />
        </div>
    );
}

export default PricingPage;
