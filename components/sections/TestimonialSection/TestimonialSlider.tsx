"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Icons } from "@/components/layout/common/Icons";

function TestimonialSlider() {
    const swiperRef = useRef<any>(null);

    const settings = {
        modules: [Autoplay],
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 500,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
        },
        className: "w-full testimonial-slider",
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
        <div className="relative">
            <Swiper {...settings}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col gap-2 border border-black rounded-[20px] md:p-[30px] p-[20px]">
                            <Icons.quote_icon className="fill-ScndColor" />
                            <p className="2xl:text-[18px] text-[16px]">
                                I created, sold, and delivered my first online course in under
                                10 days. This platform is magic!
                            </p>
                            <span className="font-semibold text-black text-[16px]">
                                Anita Dev, Soft Skills Trainer
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-start md:mt-[20px] mt-[10px] rtl:flex-row-reverse gap-2 z-3 w-full">
                <button
                    onClick={goToPrev}
                    className="custm-slider-prev bg-transparent hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all"
                >
                    <img
                        src="/assets/img/svg/slider-prev.svg"
                        alt="Slider Prev Icon"
                        className="size-[40px]"
                    />
                </button>
                <button
                    onClick={goToNext}
                    className="custm-slider-next bg-transparent hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all"
                >
                    <img
                        src="/assets/img/svg/slider-next.svg"
                        alt="Slider Next Icon"
                        className="size-[40px]"
                    />
                </button>
            </div>
        </div>
    );
}

export default TestimonialSlider;
