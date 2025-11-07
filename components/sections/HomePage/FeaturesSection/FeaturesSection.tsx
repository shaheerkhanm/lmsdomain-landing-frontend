'use client'

import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import FeaturesItems from './FeaturesItems'
import { motion } from "motion/react"



function FeaturesSection({ data }: any) {
    return (
        <div className='main-padding'>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] gap-[10px] lg:gap-y-0 gap-y-10 relative">
                <div className="left-section">
                    <div className=" sticky top-1">
                        <div className=" img-div md:p-[20px] p-[15px] rounded-[20px] bg-[#8475C91A]">
                            <motion.img
                                viewport={{ once: true, amount: 0.5 }}
                                initial={{ x: 40, opacity: 0, scale: 0.9 }}
                                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0, duration: .3, type: "spring", stiffness: 300, damping: 20 }}
                                style={{ transformOrigin: "left" }}
                                src={data?.image || "/assets/img/features/features-img.jpg"} alt={data?.imageAlt} className='w-full object-contain md:rounded-[20px] rounded-[10px]' />
                            {/* <motion.img
                                viewport={{ once: true, amount: 0.5 }}
                                initial={{ x: 40, opacity: 0, scale: 0.9 }}
                                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0, duration: .3, type: "spring", stiffness: 300, damping: 20 }}
                                style={{ transformOrigin: "left" }}
                                src={data?.image || "/assets/img/features/features-img.jpg"} alt={data?.imageAlt} className='w-full xl:h-[450px] lg:h-[330px] md:h-[455px] h-[240px] object-contain md:rounded-[20px] rounded-[10px]' /> */}
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="flex flex-col lg:gap-[40px] gap-[20px] 2xl:w-[60%] lg:w-[80%] w-full">
                        <MainTitle
                            title={data?.title || "Everything You Need to Teach Smarter"}
                            h2ClassName={'text-start'} divClassName={'lg:w-[100%] md:w-[60%] w-[80%]'}
                        />
                        <FeaturesItems />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
