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

interface CustomerData {
    title: string;
    content: string;
    img: string;
    bgColor: string;
}

function CustomerSliderSection() {
    const data: CustomerData[] = [
        {
            title: "Individual Coaches",
            content: "Sell courses and grow your personal brand",
            img: "/assets/img/customer/customer-1.png",
            bgColor: "bg-[#CBBFFF]",
        },
        {
            title: "Training Institutes",
            content: "Manage staff, batches, and student performance",
            img: "/assets/img/customer/customer-2.png",
            bgColor: "bg-[#FFD6A4]",
        },
        {
            title: "Corporate Teams",
            content: "Onboard, upskill, and train teams effectively",
            img: "/assets/img/customer/customer-3.png",
            bgColor: "bg-[#FFE39B]",
        },
        {
            title: "Corporate Teams",
            content: "Onboard, upskill, and train teams effectively",
            img: "/assets/img/customer/customer-3.png",
            bgColor: "bg-[#FFE39B]",
        },
    ];

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
        <div className="lg:mt-[40px] mt-[30px]">
            <Swiper {...settings}>
                {data.map((item, index) => (
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
