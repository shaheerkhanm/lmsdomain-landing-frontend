'use client'

import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import { motion, MotionProps } from "motion/react"

function AiSection() {

    const aiData = [
        {
            title: 'Generate Content Instantly',
            content: 'Type your request in plain language and watch the AI turn it into clean ,working',
            img: '/assets/img/ai/ai-img-1.png'
        },
        {
            title: 'Generate Course Thumbnails',
            content: 'Describe your idea and  the AI turn it into Beautiful High Quality Visual content',
            img: '/assets/img/ai/ai-img-2.png'
        },
        {
            title: 'Generate in different  Languages',
            content: 'Just type your request clearly, and watch the AI turn it into a polished output.',
            img: '/assets/img/ai/ai-img-3.png'
        },
    ]
    return (
        <div className='main-padding font-manrope'>
            <div className="relative xl:px-[80px] lg:px-[20px] md:px-[150px] px-[20px] xl:py-[40px] py-[20px] rounded-[20px] overflow-hidden flex flex-col items-center">
                <img src="/assets/img/ai/ai-bg.jpg" alt="" className='z-[1] w-full h-full absolute top-0 left-0 object-cover' />
                <motion.img
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.2, type: "tween", stiffness: 300, damping: 20
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    src="/assets/img/ai/ai-anim.gif" alt="" className='object-contain h-[120px] relative top-0 left-0 z-10  mix-blend-screen' />
                <div className="content-section relative flex flex-col gap-[20px] z-10 ">
                    <motion.img
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.3, type: "tween", stiffness: 300, damping: 20
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        src="/assets/img/ai/domie-ai.svg" alt="" className='object-contain h-[25px]' />
                    {/* <h2></h2> */}
                    <MainTitle title={'Introducing Domie AI — Your Smart Learning Companion'} h2ClassName={'text-white text-center xl:!text-[26px] lg:!text-[22px] md:!text-[22px] !text-[20px]'} divClassName={''} />
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px]">
                        {aiData?.map((items, index) => (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: index < 3 ? index * 0.1 : 0,
                                    duration: 0.5, type: "tween", stiffness: 300, damping: 20
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                key={index} className="cols-span-1 h-full">
                                <div className="ai-card p-[12px] bg-[#ffffff05] rounded-[20px] flex flex-col gap-0 h-full">
                                    <div className="img-div bg-[#ffffff10] xl:rounded-[20px] rounded-[15px]">
                                        <img src={items?.img} alt="" title='' className='w-full h-full object-contain aspect-auto ' />
                                    </div>
                                    <div className="flex flex-col gap-1 p-[10px]">
                                        <h3 className="text-white font-bold 2xl:text-[18px] lg:text-[16px] md:text-[18px] leading-tight">{items?.title}</h3>
                                        <p className='leading-tight 2xl:text-[16px] lg:text-[14px] md:text-[16px] w-[95%] font-light text-[#FFFFFF40]'>{items?.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiSection