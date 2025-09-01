'use client'

import React from 'react'
import EmailSection from '../Banner/EmailSection'
import { motion } from "motion/react"


function CtaSection() {
  return (
    <div className='main-padding'>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
        viewport={{ once: true, amount: 0.7 }}
        className="cta-main flex flex-col items-center md:gap-[20px] gap-[10px] bg-[#1B1F3B] rounded-[20px] lg:py-[80px] py-[40px]">
        <h3 className='2xl:text-[52px] xl:text-[45px] lg:text-[38px] md:text-[30px] text-[24px] text-white font-bold leading-tight text-center'>Ready to Build Your Learning Empire?</h3>
        <p className='text-white xl:text-[18px] md:text-[16px] text-[14px] leading-tight text-center md:w-[100%] w-[80%]'>Start today — no credit card, no tech hassle. Just results.</p>
        <EmailSection inputClass={'bg-white'} btnClass={''} />
      </motion.div>
    </div>
  )
}

export default CtaSection
