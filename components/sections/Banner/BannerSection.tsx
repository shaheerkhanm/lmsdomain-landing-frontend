'use client'

import React from 'react'
import MainHeading from './MainHeading'
import EmailSection from './EmailSection'
import BannerGridSection from './BannerGridSection'
import { motion } from "motion/react"


function BannerSection() {
    return (
        <div className='main-padding w-full h-[100%] bg-[#8475C91A] flex flex-col items-center pt-[130px] py-[30px]'>
            <div className="top-section flex items-center gap-[10px] font-inter font-medium text-[12px]">
                <div className="img-div flex -space-x-3">
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0, duration: .3, type: "tween", stiffness: 300, damping: 20 }}
                    >
                        <img src="/assets/img/banner/top-img-1.png" alt="" className='size-[30px]' />
                    </motion.div >
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: .1, duration: .3, type: "tween", stiffness: 300, damping: 20 }}
                    >
                        <img src="/assets/img/banner/top-img-2.png" alt="" className='size-[30px]' />
                    </motion.div >
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: .2, duration: .3, type: "tween", stiffness: 300, damping: 20 }}
                    >
                        <img src="/assets/img/banner/top-img-3.png" alt="" className='size-[30px]' />
                    </motion.div >
                    {/* <img src="/assets/img/banner/top-img-2.png" alt="" className='size-[30px]' /> */}
                    {/* <img src="/assets/img/banner/top-img-3.png" alt="" className='size-[30px]' /> */}
                </div>
                <motion.div
                    initial={{ x: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: .3, duration: .3, }}
                    className="content-div flex px-4 py-1 rounded-md bg-[#8475c920]">
                    <span>95% Student Satisfaction Rate</span>
                </motion.div>
            </div>
            <div className="main-heading-section font-manrope flex flex-col gap-2 items-center">
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0, duration: .3, type: "spring", stiffness: 200, damping: 20 }}
                >
                    <MainHeading />
                </motion.div>
                <motion.p
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: .15, duration: .3, type: "spring", stiffness: 200, damping: 20 }}
                    className='text-[#101725B2] lg:w-[60%] w-[85%] text-center md:text-[18px] text-[16px] font-medium'>Empower your students with a beautifully branded learning experience. Create, manage, and monetize your courses—all in one place.</motion.p>
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: .3, duration: .3, type: "spring", stiffness: 200, damping: 20 }}
                    className="form-section mt-2 w-full flex justify-center">
                    <EmailSection />
                </motion.div>
            </div>
            <div className="banner-grid-section w-full lg:px-[15%] px-0 lg:mt-[60px] mt-[40px]">
                <BannerGridSection />
            </div>
        </div>
    )
}

export default BannerSection