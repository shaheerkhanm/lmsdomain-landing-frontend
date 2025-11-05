'use client'

import NumberFlow from '@number-flow/react';
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';
import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';


function OurMissionSection() {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [animated, setAnimated] = useState<boolean[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getAllCms
                const response = await fetchData({
                    url: location,
                    body: { slug: "about-mission" },

                })

                setData(response);

                if (response?.counts?.length) {
                    setAnimated(new Array(response.counts.length).fill(false));
                }

            } catch (error) {
                console.error("Failed to fetch mission data:", error);
                setData(null); // Set to null on error
            } finally {
                setLoading(false); // Stop loading in all cases
            }
        }

        loadData();
    }, []); // Empty array means this runs once when the component mounts


    const splitCount = (value: string) => {
        const match = value.match(/([^\d]*)(\d+(?:\.\d+)?)([^\d]*)/);
        if (match) {
            return { prefix: match[1] || '', number: parseFloat(match[2]), suffix: match[3] || '' };
        }
        return { prefix: '', number: 0, suffix: '' };
    };

    // const [animated, setAnimated] = useState<boolean[]>(new Array(data?.length).fill(false));

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
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[100px] gap-[50px]">
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[20px] font-bold'>{data?.title}</h2>
                    <div className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]' dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:mt-5 mt-2">
                        {data?.counts?.map((item: any, index: any) => {
                            const { prefix, number, suffix } = splitCount(item?.count);
                            const color = bgColors[index % bgColors.length].color; // cycle through colors
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0, opacity: 1 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 * (index + 1), duration: 0.3, type: 'tween' }}
                                    viewport={{ once: true, amount: 0.7 }}
                                    onViewportEnter={() => handleInView(index)}
                                    className="flex flex-col">
                                    <h3 className='text-left font-extrabold xl:text-[36px] lg:text-[30px] md:text-[32px] text-[32px] text-[#6C4BFF]'
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
                                            className="inline-block text-left"
                                        />
                                        {suffix}
                                    </h3>
                                    <span className='2xl:text-[18px] text-[18px]'>{item?.title}</span>
                                </motion.div>
                            )
                        })}

                    </div>
                </div>

                <div className="col-span-1">
                    <div className="img-div lg:p-[40px] md:p-[30px] p-[15px] bg-[#D9D5F8] md:rounded-[40px] rounded-[30px]">
                        <img src={data?.image || "assets/img/mission-img.jpg"} alt={data?.altImage} title={data?.altImage} className='lg:h-[316px] md:h-[300px] h-[200px]  w-full rounded-[20px] object-cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurMissionSection