'use client'

import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import { pricingPlans } from "@/lib/data/pricingData";
import BannerDetails from "./BannerDetails";
import PricingBanner from "./PricingBanner";
import PriceFAQ from "./PriceFAQ";
import PriceSliderDevice from "./PriceSliderDevice";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";

function PriceSection({ data }: any) {
  const [isYearly, setIsYearly] = useState(false);

  const [pricingPlans, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true); // 👈 start loading
        const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getPricing;
        const response = await fetchData({
          url: location,
          body: { slug: "" },
        });
        setData(response || []);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        setData([]);
      } finally {
        setIsLoading(false); // 👈 stop loading
      }
    };

    getData();
  }, []);

  return (
    <div className="main-padding relative z-1 xl:pt-[10%] md:pt-[15%] pt-[25%]">
      <PricingBanner />

      <BannerDetails data={data} />

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
      <div className={`lg:grid md:hidden grid grid-cols-12 gap-[20px] ${isLoading ? "h-screen" : ""}`}>
        {pricingPlans?.map((plan: any, index: any) => (
          <div key={index} className="lg:col-span-4 md:col-span-12 col-span-12">
            <PriceCard plan={plan} isYearly={isYearly} />
          </div>
        ))}
      </div>

      <PriceSliderDevice pricingPlans={pricingPlans} isYearly={isYearly} />

    </div >
  );
}

export default PriceSection;
