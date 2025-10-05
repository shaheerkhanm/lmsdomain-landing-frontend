import { Icons } from "@/components/layout/common/Icons";
import React from "react";

type PriceCardProps = {
  plan: {
    id: number;
    title: string;
    description: string;
    monthlyPrice: number;
    discount: number;
    // yearlyPrice: number;
    features: string[];
  };
  isYearly: boolean;
};

function PriceCard({ plan, isYearly }: PriceCardProps) {

  const yearlyPriceCalc = plan.monthlyPrice * 12;
  const discountCalc = yearlyPriceCalc * plan.discount / 100;
  const yearlyPrice = yearlyPriceCalc - discountCalc;
  // const yearlyPrice = plan.monthlyPrice * 12;

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
          <div className="price flex items-end gap-2">
            <span className="text-[#21C48C] text-[36px] font-bold">
              ₹{isYearly ? yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
            </span>
            {isYearly ? (
              <span className="text-red-400 text-[16px] font-bold mb-2 line-through">
                ₹{yearlyPriceCalc.toLocaleString()}
              </span>
            ) : ('')}
            <span className="font-bold mb-2">+ Taxes</span>
          </div>

          <span className="text-[#00000080] text-[14px] font-semibold flex gap-3">
            {isYearly ? (
              <span className="text-grey -400 text-[14px] text-black font-bold mb-2 ">
                -{plan.discount}% Discount
              </span>
            ) : ('')}
            {isYearly ? "(Billed Annually)" : "(Per Month)"}
          </span>
        </div>

        {/* CTA */}
        <button className="w-full rounded-xl bg-MainColor hover:bg-ScndColor cursor-pointer transition-all duration-200 py-[14px] text-white font-bold text-[20px]">
          Choose Plan
        </button>

        {/* Features */}
        <div className="flex flex-col gap-2 mt-4 max-h-[40vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
          {plan.features.map((feature: any, idx: any) => (
            <div key={idx} className="flex items-center gap-2">
              <Icons.tickIcon className="min-w-[15px] min-h-[15px] max-w-[15px] max-h-[15px]" />
              <span className="font-normal xl:text-[16px] text-[14px]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
