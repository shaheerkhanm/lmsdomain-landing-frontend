'use client'

import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import FeaturesItems from './FeaturesItems'
import { motion } from "motion/react"



function FeaturesSection() {
    return (
        <div className='main-padding'>
            <div className="grid grid-cols-12 gap-[60px]">
                <div className="col-span-6 relative">
                    <div className="img-div p-[20px] sticky top-[30px] rounded-[20px] bg-[#8475C91A]">
                        <motion.img
                            viewport={{ once: false, amount: 0.5 }}
                            initial={{ x: 40, opacity: 0, scale: 0.9 }}
                            whileInView={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0, duration: .3, type: "spring", stiffness: 300, damping: 20 }}
                            style={{ transformOrigin: "left" }}
                            src="/assets/img/features/features-img.jpg" alt="" className='w-full h-[450px] object-cover rounded-[20px]' />
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="flex flex-col gap-[40px] w-[60%]">
                        <MainTitle
                            title="Everything You Need to Teach Smarter"
                            initial={{ y: -40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                            viewport={{ once: false, amount: 0.7 }}
                            h2ClassName={'text-start'} divClassName={''}
                        />
                        <FeaturesItems />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
