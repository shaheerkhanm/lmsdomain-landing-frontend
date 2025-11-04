'use client'

import NumberFlow from '@number-flow/react';
import React, { useState } from 'react'
import { motion } from 'motion/react';


function OurMissionSection({ data }: any) {

    const splitCount = (value: string) => {
        const match = value.match(/([^\d]*)(\d+(?:\.\d+)?)([^\d]*)/);
        if (match) {
            return { prefix: match[1] || '', number: parseFloat(match[2]), suffix: match[3] || '' };
        }
        return { prefix: '', number: 0, suffix: '' };
    };

    const [animated, setAnimated] = useState<boolean[]>(new Array(data?.length).fill(false));

    const handleInView = (index: number) => {
        setAnimated((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const bgColors = [
        { color: "#6C4BFF" },
        { color: "#21C48C" },
        { color: "#FCA311" },
        { color: "#FF5C50" }
    ];

    return (
        <div className='main-padding'>
            <div className="grid grid-cols-2 gap-[100px]">
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[18px] font-bold'>{data?.title}</h2>
                    <div className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]' dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                    <div className="flex gap-10 mt-5">
                        {data?.counts?.map((item: any, index: any) => {
                            const { prefix, number, suffix } = splitCount(item?.count);
                            const color = bgColors[index % bgColors.length].color; // cycle through colors
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 1, opacity: 1 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 * (index + 1), duration: 0.3, type: 'tween' }}
                                    viewport={{ once: true, amount: 0.7 }}
                                    onViewportEnter={() => handleInView(index)}
                                    className="flex flex-col">
                                    <h3 className='font-extrabold xl:text-[36px] lg:text-[30px] md:text-[28px] text-[26px] text-[#6C4BFF]'
                                        style={{ color: color }}
                                    >
                                        {prefix}

                                        <NumberFlow
                                            value={animated[index] ? number : 0}
                                            transformTiming={{ duration: 2000, easing: "ease-in-out" }}

                                            format={{
                                                notation: 'standard',
                                                maximumFractionDigits: item?.count.includes('.') ? 2 : 0,
                                            }}
                                            className="inline-block"
                                        />
                                        {suffix}
                                    </h3>
                                    <span className='2xl:text-[18px] text-[16px]'>{item?.title}</span>
                                </motion.div>
                            )
                        })}

                        {/* <div className="flex flex-col">
                            <h3 className='font-extrabold xl:text-[36px] lg:text-[30px] md:text-[28px] text-[26px] text-[#21C48C]'>1.2M+</h3>
                            <span className='2xl:text-[18px] text-[16px]'>Learners</span>
                        </div> */}
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="img-div p-[40px] bg-[#D9D5F8] rounded-[40px]">
                        <img src="assets/img/mission-img.jpg" alt="" className='h-[316px] w-full rounded-[20px] object-cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurMissionSection