import { Icons } from "@/components/layout/common/Icons";
import React from "react";

type PriceCardProps = {
  plan: {
    id: number;
    title: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
  };
  isYearly: boolean;
};

function PriceCard({ plan, isYearly }: PriceCardProps) {
  return (
    <div className="p-[30px] bg-white rounded-[20px] w-full shadow-[0_0_20px_#00000010]">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="icon-div flex items-center justify-center bg-MainColor rounded-full size-[50px]">
            <Icons.starIcon />
          </div>
          <h3 className="text-black text-[24px] font-extrabold">
            {plan.title}
          </h3>
        </div>

        {/* Description */}
        <p>{plan.description}</p>

        {/* Pricing */}
        <div className="flex flex-col">
          <div className="price flex items-center gap-4">
            <span className="text-[#21C48C] text-[36px] font-bold">
              ₹{isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
            </span>
            <span className="font-bold">+ Taxes</span>
          </div>
          <span className="text-[#00000080] font-semibold">
            {isYearly ? "(Billed Annually)" : "(Per Month)"}
          </span>
        </div>

        {/* CTA */}
        <button className="w-full rounded-xl bg-MainColor hover:bg-ScndColor cursor-pointer transition-all duration-200 py-[14px] text-white font-bold text-[20px]">
          Choose Plan
        </button>

        {/* Features */}
        <div className="flex flex-col gap-2 mt-4 h-[80vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
          {plan.features.map((feature: any, idx: any) => (
            <div key={idx} className="flex items-center gap-2">
              <Icons.tickIcon />
              <span className="font-normal">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
