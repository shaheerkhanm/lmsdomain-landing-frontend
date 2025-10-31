"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react"


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CustomerCard from "./CustomerCard";
import Link from "next/link";


function CustomerSliderSection({ data }: any) {


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
    };

    return (
        <div className="lg:mt-[40px] md:mt-[30px] mt-[20px]">
            <Swiper {...settings}>
                {data?.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Link href={''} className="px-0">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: index < 3 ? index * 0.1 : 0,
                                    duration: 0.3, type: "tween", stiffness: 300, damping: 20
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <CustomerCard item={item} />
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}

export default CustomerSliderSection;
