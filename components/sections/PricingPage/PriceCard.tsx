import { Icons } from "@/components/layout/common/Icons";
import React from "react";

// type PriceCardProps = {
//   plan: {
//     id: number;
//     title: string;
//     description: string;
//    ? price: number;
//     discount: number;
//     // yearlyPrice: number;
//     features: string[];
//   };
//   isYearly: boolean;
// };

function PriceCard({ plan, isYearly }: any) {

  const yearlyPriceCalc = plan?.price * 12;
  const discountCalc = yearlyPriceCalc * plan.discount / 100;
  const yearlyPrice = yearlyPriceCalc - discountCalc;
  // const yearlyPrice = plan?.price * 12;

  return (
    <div className="md:p-[30px] p-[20px] bg-white rounded-[20px] h-full w-full shadow-[0_0_20px_#00000020]">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="icon-div flex items-center justify-center bg-MainColor rounded-full md:size-[50px] size-[40px]">
            <Icons.starIcon className="" />
          </div>
          <h3 className="text-black xl:text-[24px] lg:text-[18px] md:text-[20px] text-[20px] font-extrabold">
            {plan?.title}
          </h3>
        </div>

        {/* Description */}
        <p className="md:h-[80px] overflow-y-auto custom-scrollbar" data-lenis-prevent>{plan?.subTitle}</p>

        {/* Pricing */}
        <div className="flex flex-col">
          <div className="price flex items-end gap-2">
            <span className="text-[#21C48C] xl:text-[36px] lg:text-[28px] md:text-[24px] text-[26px] font-bold">
              ₹{isYearly ? yearlyPrice.toLocaleString() : plan?.price.toLocaleString()}
            </span>

            {/* YEARLY DISCOUNT */}
            <div className="flex items-center gap-2">
              {isYearly ? (
                <span className="text-red-400 text-[14px] font-bold lg:mb-2 md:mb-1 mb-1 line-through">
                  ₹{yearlyPriceCalc.toLocaleString()}
                </span>
              ) : ('')}
              <span className="font-bold lg:mb-2 md:mb-1 mb-1 text-[14px]">+ Taxes</span>
            </div>
          </div>

          <span className="text-[#00000080] text-[14px] font-semibold flex gap-3">
            {isYearly ? (
              <span className="text-grey -400 text-[14px] text-black font-bold ">
                -{plan.discount}% Discount
              </span>
            ) : ('')}
            {isYearly ? "(Billed Annually)" : "(Per Month)"}
          </span>
        </div>

        {/* CTA */}
        <button className="w-full md:rounded-xl rounded-md bg-MainColor hover:bg-ScndColor cursor-pointer transition-all duration-200 md:py-[14px] py-[10px] text-white font-bold md:text-[20px] text-[18px]">
          {plan?.buttonText}
        </button>

        {/* Features */}
        <div className="flex flex-col gap-3 mt-4 h-full overflow-y-auto custom-scrollbar" data-lenis-prevent>
          {plan?.tags.map((feature: any, idx: any) => (
            <div key={idx} className="flex items-start gap-2">
              <Icons.tickIcon className="min-w-[15px] min-h-[15px] max-w-[15px] max-h-[15px] mt-1" />
              <span className="font-normal xl:text-[16px] text-[16px] leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
