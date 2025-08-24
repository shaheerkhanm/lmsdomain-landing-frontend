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
        className="cta-main flex flex-col items-center gap-[20px] bg-[#1B1F3B] rounded-[20px] py-[80px]">
        <h3 className='2xl:text-[52px] xl:text-[45px] md:text-[40px] text-[30px] text-white font-semibold leading-tight text-center'>Ready to Build Your Learning Empire?</h3>
        <p className='text-white xl:text-[18px] text-[16px] leading-tight text-center'>Start today — no credit card, no tech hassle. Just results.</p>
        <EmailSection inputClass={'bg-white'} btnClass={''} />
      </motion.div>
    </div>
  )
}

export default CtaSection
