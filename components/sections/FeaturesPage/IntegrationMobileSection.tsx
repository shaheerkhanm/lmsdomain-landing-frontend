'use client'

import React from 'react'
import { motion } from "motion/react"


function IntegrationMobileSection() {

    const integrationIcons = [
        {
            image: "assets/img/integration/integration-1.png"
        },
        {
            image: "assets/img/integration/integration-2.png"
        },
        {
            image: "assets/img/integration/integration-3.png"
        },
        {
            image: "assets/img/integration/integration-4.png"
        },
        {
            image: "assets/img/integration/integration-5.png"
        },
        {
            image: "assets/img/integration/integration-6.png"
        },
        {
            image: "assets/img/integration/integration-7.png"
        },
        {
            image: "assets/img/integration/integration-8.png"
        },
        {
            image: "assets/img/integration/integration-9.png"
        },
        {
            image: "assets/img/integration/integration-10.png"
        },
        {
            image: "assets/img/integration/integration-11.png"
        },
        {
            image: "assets/img/integration/integration-12.png"
        },
    ]
    return (
        <div
            className='main-padding py-[50px] md:hidden' >
            <div className="grid grid-cols-4 gap-y-[30px] gap-x-[10px]">
                {integrationIcons.map((item, index) => (
                    <div key={index}>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: index < 3 ? index * 0.1 : 0,
                                duration: 0.3, type: "tween", stiffness: 300, damping: 20
                            }}
                            viewport={{ once: true, amount: 0.3 }} key={index} className="col-span-1 flex items-center justify-center">
                            <div className="img-div size-[70px] flex items-center justify-center bg-white rounded-[10px]">
                                <img src={item?.image} alt="" className="size-[40px] object-contain" />

                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default IntegrationMobileSection