"use client";

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { pricingPlans } from "@/lib/data/pricingData";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PriceCard from './PriceCard';

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

function PriceSliderDevice({ isYearly }: any) {
    const swiperRef = useRef<any>(null);


    const settings = {
        modules: [Autoplay],
        autoplay: { delay: 3000, disableOnInteraction: false },
        speed: 500,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        className: "w-full",
        onBeforeInit: (swiper: any) => {
            swiperRef.current = swiper;
        },
    };

    const goToNext = () => {
        swiperRef.current?.slideNext();
    };

    const goToPrev = () => {
        swiperRef.current?.slidePrev();
    };

    return (
        <div className="lg:hidden md:block hidden mt-8 relative">
            <Swiper {...settings}>
                {pricingPlans.map((plan) => (
                    <SwiperSlide key={plan.id}>
                        <div className="lg:col-span-4 md:col-span-12 col-span-12">
                            <PriceCard plan={plan} isYearly={isYearly} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute top-1/2 left-0 trna flex justify-between md:mt-[20px] mt-[10px] rtl:flex-row-reverse gap-2 z-3 w-full">
                <button
                    onClick={goToPrev}
                    className="custm-slider-prev bg-white hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all -ml-[30px]"
                >
                    <img
                        src="/assets/img/svg/slider-prev.svg"
                        alt="Slider Prev Icon"
                        className="size-[40px]"
                    />
                </button>
                <button
                    onClick={goToNext}
                    className="custm-slider-next bg-white hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all -mr-[30px]"
                >
                    <img
                        src="/assets/img/svg/slider-next.svg"
                        alt="Slider Next Icon"
                        className="size-[40px]"
                    />
                </button>
            </div>
        </div >
    )
}

export default PriceSliderDevice