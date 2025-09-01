'use client'

import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import TestimonialSlider from './TestimonialSlider'
import ClientsSection from './ClientsSection'
import { motion } from "motion/react"

function TestimonialSection() {
    return (
        <div className='main-padding lg:py-[3%] py-[5%] bg-[#F3F2FA]'>
            <div className="grid grid-cols-12">
                <div className="lg:col-span-4 md:col-span-10 col-span-12 flex flex-col gap-2">
                    <MainTitle title={'We don’t just have customers. We have believers.'} h2ClassName={''} divClassName={'!origin-left'} />
                    <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 300, damping: 100 }}
                        viewport={{ once: true, amount: 0.7 }} className='2xl:text-[18px] text-[16px] md:w-[70%] leading-tight'>Lorem ipsum dolor sit amet consectetur. Pulvinar sit volutpat at.</motion.p>
                </div>
                <div className="lg:col-span-8 col-span-12 lg:mt-0 mt-6">
                    <TestimonialSlider />
                </div>
            </div>
            <div className="client-slider-section lg:mt-20 mt-10">
                <ClientsSection />
            </div>
        </div>
    )
}

export default TestimonialSection
