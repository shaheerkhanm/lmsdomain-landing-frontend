'use client'

import React, { useState } from "react";
import PriceCard from "./PriceCard";
import { pricingPlans } from "@/lib/data/pricingData";
import BannerDetails from "./BannerDetails";
import PricingBanner from "./PricingBanner";
import PriceFAQ from "./PriceFAQ";

function PriceSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="main-padding relative z-1 pt-[10%]">
      <PricingBanner />

      <BannerDetails />

      {/* Toggle Button */}
      <div className="flex justify-center my-[30px]">
        <div className="relative z-1 pricing-btn w-fit flex items-center gap-2 p-[10px] bg-white rounded-full">
          <div
            className={`price-item rounded-full py-[20px] w-[180px] flex justify-center text-[18px] font-semibold cursor-pointer transition-all border duration-200 ${!isYearly ? "bg-black text-white" : "bg-transparent border-transparent hover:border-black"
              }`}
            onClick={() => setIsYearly(false)}
          >
            <span>Monthly</span>
          </div>
          <div
            className={`price-item rounded-full py-[20px] w-[180px] flex justify-center text-[18px] font-semibold cursor-pointer transition-all border duration-200 ${isYearly ? "bg-black text-white" : "bg-transparent border-transparent hover:border-black"
              }`}
            onClick={() => setIsYearly(true)}
          >
            <span>Yearly</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-12 gap-[20px]">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="col-span-4">
            <PriceCard plan={plan} isYearly={isYearly} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceSection;
