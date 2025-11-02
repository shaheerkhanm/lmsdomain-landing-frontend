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

function CodeValueSlider({ data }: any) {

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

    const goToNext = () => swiperRef.current?.slideNext();
    const goToPrev = () => swiperRef.current?.slidePrev();


    const sliderData = [
        {
            icon: "assets/img/svg/play-1.svg",
            title: "Innovation",
            details: "We constantly push boundaries to create cutting-edge solutions that anticipate the future of education.",
            link: "/lessons"
        },
        {
            icon: "assets/img/svg/play-2.svg", // Example for a second icon
            title: "Accessibility",
            details: "Quality education should be available to everyone, regardless of location, background, or circumstances.",
            link: "/quizzes"
        },
        {
            icon: "assets/img/svg/play-3.svg", // Example for a third icon
            title: "Excellence",
            details: "We're committed to delivering exceptional quality in every aspect of our platform and service.",
            link: "/assignments"
        }
    ];

    const showNav = sliderData.length > slidesPerView;


    return (
        <div className='main-padding relative xl:py-[120px] lg:py-[80px] py-[40px] mt-[40px] bg-[#8475C910]'>
            <div className="flex flex-col gap-2 items-center">
                <MainTitle title={data?.title || 'Multiple Content Types'} h2ClassName={'text-center'} divClassName={''} />
                <p className='text-center lg:w-[40%] md:w-[60%] w-[100%]'>{data?.subTitle}</p>
            </div>
            {showNav && (
                <div className="flex justify-between gap-2 z-3 w-full">
                    <button
                        onClick={goToPrev}
                        className="custm-slider-prev bg-white hover:bg-white rounded-[20px] md:size-[40px] size-[30px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all absolute md:left-[20px] left-[5px] top-1/2 -translate-y-1/2 z-99"
                    >
                        <img
                            src="/assets/img/svg/slider-prev.svg"
                            alt="Slider Prev Icon"
                            className="size-[40px]"
                        />
                    </button>
                    <button
                        onClick={goToNext}
                        className="custm-slider-next bg-white hover:bg-white rounded-[20px] md:size-[40px] size-[30px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all absolute md:right-[20px] right-[5px] top-1/2 -translate-y-1/2 z-99"
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
                {sliderData?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link href={item?.link} className="px-0">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: index < 3 ? index * 0.1 : 0,
                                    duration: 0.3, type: "tween", stiffness: 300, damping: 20
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="multiple-content-card flex flex-col items-start gap-4 bg-white p-[30px] rounded-[20px]">
                                    <img src={item?.icon || "assets/img/svg/play-1.svg"} alt="" className='h-[60px]' />
                                    <h3 className='font-black xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px]'>{item?.title}</h3>
                                    <div className="details 2xl:text-[18px] text-[16px]">
                                        {item.details}
                                    </div>
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