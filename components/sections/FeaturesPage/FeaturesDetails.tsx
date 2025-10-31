'use client'

import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';
import React, { useEffect, useState } from 'react'


const iconBgColorClasses = [
    'bg-[#10B981]',
    'bg-[#6C4BFF]',
    'bg-[#F97316]',
    'bg-[#475569]'
];

function FeaturesDetails() {

    const [data, setData] = useState<any>([])


    useEffect(() => {
        const getData = async () => {
            try {
                const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getFeaturesData
                const response = await fetchData({
                    url: location,
                    body: { slug: "" },
                })

                setData(response)
            } catch (error) {
                console.error("Error fetching data:", error)
                setData([])
            }
        }

        getData()
    }, [])

    // const getData = async (slug: string) => {
    //     try {
    //         const location = process.env.BACKEND_URL + apiRoutes?.getFeaturesData
    //         const response = await fetchData({
    //             url: location,
    //             body: { slug },

    //         })



    //         return response
    //     } catch (error) {
    //         return {}
    //     }
    // }

    // const featuresData = await getData("");

    return (
        <div className='main-padding flex flex-col md:gap-[50px] gap-[20px]'>
            {data?.map((feature: any, index: any) => {
                const isReversed = index % 2 !== 0;

                const iconBgColor = iconBgColorClasses[index % iconBgColorClasses.length];

                const imageColOrder = isReversed ? 'lg:order-1 order-2' : 'lg:order-2 order-1';
                const contentColOrder = isReversed ? 'order-2' : 'order-1';
                const imageJustify = isReversed ? 'lg:justify-center justify-center' : 'lg:justify-center justify-center';
                return (
                    <div key={index} className="grid lg:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[30px]" >
                        <div className={`col-span-1 flex items-center ${contentColOrder}`}>
                            <div className="flex flex-col md:gap-10 gap-5">
                                <div className="top-item-title">
                                    <div className="flex md:flex-row flex-col gap-[20px]">
                                        <div className={`icon-div 
                                            lg:min-w-[70px] lg:min-h-[70px] lg:max-w-[70px] lg:max-h-[70px] 
                                            md:min-w-[50px] md:min-h-[50px] md:max-w-[50px] md:max-h-[50px]
                                            min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]
                                             rounded-full ${iconBgColor} flex items-center justify-center p-3`}>
                                            <img src={feature.iconSrc || "assets/img/features/features-icon-common.svg"} alt={"Feature Icon"} className='w-full h-full object-contain' />
                                        </div>
                                        <div className="title-details flex flex-col gap-1">
                                            <h2 className='2xl:text-[24px] lg:text-[20px] md:text-[22px] text-[18px] font-bold'>{feature?.title}</h2>
                                            <p className='font-medium xl:text-[16px] lg:text-[14px] md:text-[16px] text-[16px]'>{feature?.subTitle}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-details-section 2xl:text-[18px] lg:text-[18px] md:text-[18px] text-[16px]">
                                    <span dangerouslySetInnerHTML={{ __html: feature?.content || "" }} />
                                    {/* <ul>
                                        {feature?.tags.map((item: any, index: any) => (
                                            <li key={index}></li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                        <div className={`col-span-1 flex items-center ${imageColOrder}`}>
                            <div className={`img-div flex items-center ${imageJustify} w-full`}>
                                <img
                                    src={feature?.image}
                                    title={`Image for ${feature.title}`}
                                    alt={feature.altImage} className='lg:h-[450px] md:h-[412px] h-[312px] object-contain' />
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div >
    )
}

export default FeaturesDetails