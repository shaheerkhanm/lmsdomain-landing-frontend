'use client'

import React from 'react'
import { motion, MotionProps } from "motion/react"

function ResultCounterSection() {
    return (
        <div className="counter-section border border-black rounded-[20px] p-[40px] grid grid-cols-12 mt-[30px]">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, type: "tween", stiffness: 700, damping: 10 }}
                viewport={{ once: false, amount: 0.7 }}
                className="col-span-3 flex flex-col gap-2">
                <h3 className='text-[#6C4BFF] 2xl:text-[42px] text-[36px] font-bold'>3x</h3>
                <p className='lg:w-[90%] w-full 2xl:text-[18px] text-[16px] leading-tight'>Faster launch time compared to other platforms</p>
            </motion.div>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3, type: "tween", stiffness: 700, damping: 10 }}
                viewport={{ once: false, amount: 0.7 }}
                className="col-span-3 flex flex-col gap-2">
                <h3 className='text-[#21C48C] 2xl:text-[42px] text-[36px] font-bold'>92%</h3>
                <p className='lg:w-[90%] w-full 2xl:text-[18px] text-[16px] leading-tight'>Average course completion</p>
            </motion.div>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3, type: "tween", stiffness: 700, damping: 10 }}
                viewport={{ once: false, amount: 0.7 }}
                className="col-span-3 flex flex-col gap-2">
                <h3 className='text-[#FCA311] 2xl:text-[42px] text-[36px] font-bold'>1.2M+</h3>
                <p className='lg:w-[90%] w-full 2xl:text-[18px] text-[16px] leading-tight'>Learners trained globally</p>
            </motion.div>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3, type: "tween", stiffness: 700, damping: 10 }}
                viewport={{ once: false, amount: 0.7 }}
                className="col-span-3 flex flex-col gap-2">
                <h3 className='text-[#FF5C50] 2xl:text-[42px] text-[36px] font-bold'>99.9%</h3>
                <p className='lg:w-[90%] w-full 2xl:text-[18px] text-[16px] leading-tight'>Platform uptime with enterprise-grade security</p>
            </motion.div>
        </div>
    )
}

export default ResultCounterSection
