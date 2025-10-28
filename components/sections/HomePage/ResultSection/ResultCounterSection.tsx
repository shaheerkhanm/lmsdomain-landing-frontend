'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';
import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';

function ResultCounterSection() {

    // ✅ Fetch data client-side after mount
    const [data, setData] = useState<any>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getResults
                const response = await fetchData({
                    url: location,
                    body: { slug: "" },
                })
                setData(response)
            } catch (error) {
                console.error("Error fetching banner data:", error)
                setData({})
            }
        }

        getData()
    }, [])

    const bgColors = [
        { color: "#6C4BFF" },
        { color: "#21C48C" },
        { color: "#FCA311" },
        { color: "#FF5C50" }
    ];

    // const data? = [
    //     { value: '3x', color: '#6C4BFF', text: 'Faster launch time compared to other platforms' },
    //     { value: '92%', color: '#21C48C', text: 'Average course completion' },
    //     { value: '1.2M+', color: '#FCA311', text: 'Learners trained globally' },
    //     { value: '99.9%', color: '#FF5C50', text: 'Platform uptime with enterprise-grade security' },
    // ];

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

    return (
        <div className="counter-section border border-black rounded-[20px] lg:p-[40px] md:p-[30px] p-[20px] grid grid-cols-12 lg:gap-0 md:gap-5 gap-2 lg:mt-[30px] mt-[20px]">
            {data?.map((item: any, index: any) => {
                const { prefix, number, suffix } = splitCount(item?.title);
                const color = bgColors[index % bgColors.length].color; // cycle through colors
                return (
                    <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * (index + 1), duration: 0.3, type: 'tween' }}
                        viewport={{ once: true, amount: 0.7 }}
                        onViewportEnter={() => handleInView(index)}
                        className="lg:col-span-3 col-span-6 flex flex-col md:gap-2 gap-1"
                    >
                        <h3
                            className="2xl:text-[42px] md:text-[36px] text-[30px] font-bold"
                            style={{ color:color }}
                        >
                            {prefix}
                            <NumberFlow
                                value={animated[index] ? number : 0}
                                transformTiming={{ duration: 2000, easing: "ease-in-out" }}

                                format={{
                                    notation: 'standard',
                                    maximumFractionDigits: item.title.includes('.') ? 2 : 0,
                                }}
                                className="inline-block"
                            />
                            {suffix}
                        </h3>
                        <p className="md:w-[90%] md:text-[18px] text-[14px] leading-tight">
                            {item.subTitle}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default ResultCounterSection;
