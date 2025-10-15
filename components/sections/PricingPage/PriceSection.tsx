'use client'

import React, { useState } from "react";
import PriceCard from "./PriceCard";
import { pricingPlans } from "@/lib/data/pricingData";
import BannerDetails from "./BannerDetails";
import PricingBanner from "./PricingBanner";
import PriceFAQ from "./PriceFAQ";
import PriceSliderDevice from "./PriceSliderDevice";

function PriceSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="main-padding relative z-1 xl:pt-[10%] md:pt-[15%] pt-[25%]">
      <PricingBanner />

      <BannerDetails />

      {/* Toggle Button */}
      <div className="flex justify-center my-[30px]">
        <div className="relative z-1 pricing-btn w-fit flex items-center gap-2 md:p-[10px] p-[5px] bg-white rounded-full">
          <div
            className={`price-item rounded-full lg:py-[20px] md:py-[15px] py-[12px] xsm:w-[180px] w-[150px] flex justify-center lg:text-[18px] md:text-[20px] xsm:text-[18px] text-[18px] font-semibold cursor-pointer transition-all border duration-200 ${!isYearly ? "bg-black text-white" : "bg-transparent border-transparent hover:border-black"
              }`}
            onClick={() => setIsYearly(false)}
          >
            <span>Monthly</span>
          </div>
          <div
            className={`price-item rounded-full lg:py-[20px] md:py-[15px] py-[12px] xsm:w-[180px] w-[150px] flex justify-center lg:text-[18px] md:text-[20px] xsm:text-[18px] text-[18px] font-semibold cursor-pointer transition-all border duration-200 ${isYearly ? "bg-black text-white" : "bg-transparent border-transparent hover:border-black"
              }`}
            onClick={() => setIsYearly(true)}
          >
            <span>Yearly</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="lg:grid md:hidden grid grid-cols-12 gap-[20px]">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="lg:col-span-4 md:col-span-12 col-span-12">
            <PriceCard plan={plan} isYearly={isYearly} />
          </div>
        ))}
      </div>

      <PriceSliderDevice isYearly={isYearly} />

    </div>
  );
}

export default PriceSection;
