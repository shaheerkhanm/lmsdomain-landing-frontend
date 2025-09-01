'use client'

import React from 'react'
import FeaturesCards from './FeaturesCards'
import { motion } from "motion/react"



interface FeaturedData {
    img: string,
    title: string,
    content: string,
}

function FeaturesItems() {


    const data: FeaturedData[] = [
        {
            img: "/assets/img/features/feature-icon-1.svg",
            title: "Visual Builder",
            content: "Create lessons, quizzes, and videos effortlessly",
        },
        {
            img: "/assets/img/features/feature-icon-2.svg",
            title: "Smart Automation",
            content: "Enrollments, reminders, and certificates on auto",
        },
        {
            img: "/assets/img/features/feature-icon-3.svg",
            title: "Global Payments",
            content: "Accept payments from anywhere, in your own currency",
        },
        {
            img: "/assets/img/features/feature-icon-4.svg",
            title: "Mobile Ready",
            content: "Native apps for learners, branded in your name",
        },
    ];


    return (
        <div className="grid grid-cols-2 lg:gap-[50px] md:gap-[20px] gap-[10px]">
            {data?.map((item, index) => (
                <div key={index} className='lg:col-span-2 md:col-span-1 col-span-2 lg:bg-transparent bg-[#8475c90d] lg:p-0 p-4 rounded-[10px]' >
                    <motion.div

                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        <FeaturesCards item={item} />
                    </motion.div>
                </div>
            ))}
        </div>
    )
}

export default FeaturesItems
