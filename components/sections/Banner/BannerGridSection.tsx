'use client'

import { Icons } from '@/components/layout/common/Icons'
import Link from 'next/link'
import React from 'react'
// React
import { motion } from "motion/react"

function BannerGridSection() {
    return (
        <div className="grid grid-cols-6 grid-rows-4 lg:gap-x-6 gap-x-3 lg:gap-y-4 gap-y-3 w-full">
            <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0, duration: 1, type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#8475C91A] rounded-[20px] w-fit col-span-2 row-span-3 lg:p-[20px] p-[10px]">
                <div className="flex bg-white lg:rounded-[20px] rounded-[15px] w-full h-full p-4">
                    <img src="/assets/img/banner/grid-1-img.jpg" alt="" className='object-contain object-bottom h-fit' />
                </div>
            </motion.div>
            <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: .15, duration: 1, type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#8475C91A] rounded-[20px] w-full col-span-2 row-span-3 col-start-3">
                <div className="flex items-end justify-center w-full h-full relative">
                    <img src="/assets/img/banner/banner-main-img.png" alt="" className='mt-[-30px] lg:h-[340px] h-[260px] object-bottom object-contain' />
                    <div className='flex gap-1 items-start  p-[5px] bg-[#ffffff50] backdrop-blur-lg rounded-[5px] absolute right-[60px] bottom-8'>
                        <Icons.tick_button className='mt-0' />
                        <div className="flex flex-col">
                            <span className='text-[12px] font-manrope font-bold text-nowrap text-white leading-tight'>New Course Created</span>
                            <span className='text-[10px] font-manrope font-normal text-nowrap text-white leading-tight'>10M Ago</span>
                        </div>
                        {/* <img src="/assets/img/banner/crse-img.svg" alt="" className='absolute right-0 bottom-0 h-[120px] w-[120px] object-contain' /> */}
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: .3, duration: 1, type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#8475C91A] lg:rounded-[20px] rounded-[15px] w-full col-span-4 row-span-2 col-start-1 row-start-4">
                <div className="flex items-center gap-[20px] h-full px-[20px] py-0">
                    <span className='lg:text-[50px] md:text-[40px] font-bold font-manrope text-[#21C48C]'>10+</span>
                    <span className='font-manrope text-black leading-tight 2xl:text-[20px]  text-[16px] w-[70%]'>Integrated tools to manage content, learners, payments, and growth.</span>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: .45, duration: 1, type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#8475C91A] rounded-[20px] w-full col-span-2 row-span-5 col-start-5 row-start-1 lg:p-[20px] p-[10px]">
                <div className="flex bg-white lg:rounded-[20px] rounded-[15px] w-full h-full p-4 flex-col justify-between gap-2">
                    <img src="/assets/img/banner/grid-2-img.jpg" alt="" className='object-contain  object-top h-fit' />
                    <Link href={''} className='flex items-center gap-2 justify-center bg-ScndColor lg:px-4 px-2 lg:py-4 py-3 rounded-l-full rounded-r-full'>
                        <Icons.globe_icon  className='lg:size-[20px] size-[18px]'/>
                        <span className='text-white font-manrope lg:text-[16px] text-[14px] leading-tight'>25+ countries served</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default BannerGridSection
