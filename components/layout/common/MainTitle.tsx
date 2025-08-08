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
            initial={{ y: 40, opacity: 0, }}
            whileInView={{ y: 0, opacity: 1, }}
            transition={{ delay: 0, duration: .3, type: "tween", stiffness: 300, damping: 20 }}
            className={`${divClassName}`}
        // viewport={{ once: false, amount: 0.5 }}
        >
            <h2 className={`font-manrope 2xl:text-[36px] text-[34px] leading-tight font-bold text-TextBlack ${h2ClassName}`}>{title}</h2>
        </motion.div>
    )
}

export default MainTitle
