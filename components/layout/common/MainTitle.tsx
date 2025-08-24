'use client'

import React from 'react'
import { motion, MotionProps } from "motion/react"

interface TitleData extends MotionProps {
    title: string
    h2ClassName: string
    divClassName: string
}

function MainTitle({ title, h2ClassName, divClassName, ...motionProps }: TitleData) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, }}
            whileInView={{ scale: 1, opacity: 1, }}
            transition={{ delay: 0, duration: .3, type: "spring", stiffness: 300, damping: 100 }}
            className={`origin-center ${divClassName}`}
            viewport={{ once: true, }}
        >
            <h2 className={`font-manrope 2xl:text-[36px] text-[34px] leading-tight font-bold text-TextBlack ${h2ClassName}`}>{title}</h2>
        </motion.div>
    )
}

export default MainTitle
