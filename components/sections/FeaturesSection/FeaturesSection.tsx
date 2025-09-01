'use client'

import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import FeaturesItems from './FeaturesItems'
import { motion } from "motion/react"



function FeaturesSection() {
    return (
        <div className='main-padding'>
            <div className="grid grid-cols-12 lg:gap-[60px] gap-[10px] lg:gap-y-0 gap-y-10">
                <div className="lg:col-span-6 col-span-12 relative lg:px-0 px-10">
                    <div className="img-div p-[20px] sticky top-[30px] rounded-[20px] bg-[#8475C91A]">
                        <motion.img
                            viewport={{ once: true, amount: 0.5 }}
                            initial={{ x: 40, opacity: 0, scale: 0.9 }}
                            whileInView={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0, duration: .3, type: "spring", stiffness: 300, damping: 20 }}
                            style={{ transformOrigin: "left" }}
                            src="/assets/img/features/features-img.jpg" alt="" className='w-full h-[450px] object-cover rounded-[20px]' />
                    </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                    <div className="flex flex-col lg:gap-[40px] gap-[20px] lg:w-[60%] w-full">
                        <MainTitle
                            title="Everything You Need to Teach Smarter"
                            h2ClassName={'text-start'} divClassName={'lg:w-[100%] w-[60%]'}
                        />
                        <FeaturesItems />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
