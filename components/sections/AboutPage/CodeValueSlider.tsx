'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react"


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import MainTitle from '@/components/layout/common/MainTitle';

function CodeValueSlider({ sliderData }: any) {

    const swiperRef = useRef<any>(null);

    const [slidesPerView, setSlidesPerView] = useState(3); // default (desktop)

    // 🔹 Track window width and update slidesPerView dynamically
    useEffect(() => {
        const updateSlidesPerView = () => {
            const width = window.innerWidth;
            if (width < 600) setSlidesPerView(1);
            else if (width < 1024) setSlidesPerView(2);
            else setSlidesPerView(3);
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    const settings = {
        modules: [Autoplay],
        autoplay: { delay: 3000, disableOnInteraction: false },
        speed: 500,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 40,
        breakpoints: {
            600: { slidesPerView: 2, spaceBetween: 20, },
            1024: { slidesPerView: 3 },
        },
        className: "w-full",
        onBeforeInit: (swiper: any) => {
            swiperRef.current = swiper;
        },
    };

    const goToNext = () => swiperRef.current?.slideNext();
    const goToPrev = () => swiperRef.current?.slidePrev();



    const showNav = sliderData.length > slidesPerView;

    const bgColors = [
        { color: "#6C4BFF" },
        { color: "#21C48C" },
        { color: "#FCA311" },
        { color: "#FF5C50" }
    ];


    return (
        <div className='relative'>

            {showNav && (
                <div className="flex justify-between gap-2 z-3 w-full">
                    <button
                        onClick={goToPrev}
                        className="custm-slider-prev bg-white hover:bg-white rounded-[20px] md:size-[40px] size-[30px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all absolute lg:left-[20px] md:left-[-24px] left-[-10px] top-1/2 -translate-y-1/2 z-[40]"
                    >
                        <img
                            src="/assets/img/svg/slider-prev.svg"
                            alt="Slider Prev Icon"
                            className="size-[40px]"
                        />
                    </button>
                    <button
                        onClick={goToNext}
                        className="custm-slider-next bg-white hover:bg-white rounded-[20px] md:size-[40px] size-[30px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all absolute lg:right-[20px] md:right-[-24px] right-[-10px] top-1/2 -translate-y-1/2 z-[40]"
                    >
                        <img
                            src="/assets/img/svg/slider-next.svg"
                            alt="Slider Next Icon"
                            className="size-[40px]"
                        />
                    </button>
                </div>
            )}
            <Swiper {...settings}>
                {sliderData?.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Link href={item?.link || ''} className="px-0">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: index < 3 ? index * 0.1 : 0,
                                    duration: 0.3, type: "tween", stiffness: 300, damping: 20
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="multiple-content-card flex flex-col items-start lg:gap-4 gap-2 bg-white p-[30px] rounded-[20px]">
                                    <div className="img-div md:size-[60px] size-[50px] bg-black rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: bgColors[index % bgColors.length].color,
                                        }}
                                    >
                                        <img src={"assets/img/svg/simple-play-icon.svg"} alt="" className='' />

                                    </div>
                                    <h3 className='font-black xl:text-[24px] lg:text-[22px] md:text-[20px] text-[20px]'>{item?.title}</h3>
                                    <div className="details 2xl:text-[18px] text-[16px]" dangerouslySetInnerHTML={{ __html: item?.content || "" }} />
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CodeValueSlider