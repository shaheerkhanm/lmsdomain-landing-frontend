'use client'

import React, { useEffect, useState } from 'react'
import FeaturesCards from './FeaturesCards'
import { motion } from "motion/react"
import { fetchData } from '@/utils/api'
import { apiRoutes } from '@/utils/api/apiRoutes'


function FeaturesItems() {


    const [data, setData] = useState<any>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getSmartTeach
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


    return (
        <div className="grid grid-cols-2 lg:gap-[50px] md:gap-[20px] gap-[10px]">
            {data?.map((item: any, index: any) => (
                <div key={index} className='lg:col-span-2 md:col-span-1 col-span-2 lg:bg-transparent bg-[#8475c90d] lg:p-0 p-4 rounded-[10px]' >
                    <motion.div

                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        <FeaturesCards item={item} />
                    </motion.div>
                </div>
            ))}
        </div>
    )
}

export default FeaturesItems
