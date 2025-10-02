'use client'

import React, { useState } from "react";
import PriceCard from "./PriceCard";
import { pricingPlans } from "@/lib/data/pricingData";

function PriceSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="main-padding relative z-1 pt-[10%] pb-[3%]">
      <div className="banner-text flex flex-col justify-center items-center">
        <h1 className="text-[52px] text-white font-semibold">
          Simple, Transparent Pricing
        </h1>
        <p className="w-[70%] text-center text-white">
          Lorem ipsum dolor sit amet consectetur. Sem vulputate a cras et morbi
          quisque orci. Dui faucibus aliquam scelerisque sapien non mauris. Arcu
          dignissim massa sed neque.
        </p>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center my-[30px]">
        <div className="relative z-1 pricing-btn w-fit flex items-center gap-2 p-[10px] bg-white rounded-full">
          <div
            className={`price-item rounded-full py-[20px] w-[180px] flex justify-center text-[18px] font-semibold cursor-pointer transition-all duration-200 ${!isYearly ? "bg-black text-white" : "bg-transparent"
              }`}
            onClick={() => setIsYearly(false)}
          >
            <span>Monthly</span>
          </div>
          <div
            className={`price-item rounded-full py-[20px] w-[180px] flex justify-center text-[18px] font-semibold cursor-pointer transition-all duration-200 ${isYearly ? "bg-black text-white" : "bg-transparent"
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
