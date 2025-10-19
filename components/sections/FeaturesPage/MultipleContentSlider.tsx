'use client'

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react"


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';

function MultipleContentSlider() {

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


    const sliderData = [
        {
            icon: "assets/img/svg/play-1.svg",
            title: "Video Lessons",
            details: [
                "Youtube Video Lessons",
                "Vimeo Integration",
                "Video File Upload",
                "HTML5 Video URLs",
            ],
            link: "/lessons"
        },
        {
            icon: "assets/img/svg/play-2.svg", // Example for a second icon
            title: "Interactive Quizzes",
            details: [
                "Multiple Choice",
                "True/False Questions",
                "Timed Assessments",
                "Automated Grading",
            ],
            link: "/quizzes"
        },
        {
            icon: "assets/img/svg/play-3.svg", // Example for a third icon
            title: "Assignments",
            details: [
                "File Submissions",
                "Peer Reviews",
                "Plagiarism Check",
                "Instructor Feedback",
            ],
            link: "/assignments"
        }
    ];


    return (
        <div className='mt-[40px]'>
            <Swiper {...settings}>
                {sliderData.map((item, index) => (
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
                                        <ul>
                                            {item.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
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

export default MultipleContentSlider