'use client'

import React, { useEffect, useState } from 'react'
import MainHeading from './MainHeading'
import EmailSection from './EmailSection'
import BannerGridSection from './BannerGridSection'
import { motion } from "motion/react"
import { fetchData } from '@/utils/api'
import { apiRoutes } from '@/utils/api/apiRoutes'

function BannerSection({ data, graphData }: any) {

    // const [data, setData] = useState<any>(null)
    // // ✅ Fetch data client-side after mount
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const location = process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getAllCms
    //             const response = await fetchData({
    //                 url: location,
    //                 body: { slug: "home-hero" },
    //             })
    //             setData(response)
    //         } catch (error) {
    //             console.error("Error fetching banner data:", error)
    //             setData({})
    //         }
    //     }

    //     getData()
    // }, [])

    // Track mouse position (relative to center)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e
        const { width, height, left, top } = currentTarget.getBoundingClientRect()

        // Get relative position (-1 to 1)
        const x = (clientX - left - width / 2) / (width / 2)
        const y = (clientY - top - height / 2) / (height / 2)

        setMousePos({ x, y })
    }


    return (
        <div
            className='main-padding relative w-full h-[100%] bg-[#fff] flex flex-col items-center pt-[130px] py-[30px] overflow-hidden'
            onMouseMove={handleMouseMove}
        >
            {/* Top Section */}
            <div className="top-section flex items-center gap-[10px] font-inter font-medium text-[12px]">
                <div className="img-div flex -space-x-3">
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0, duration: .3 }}
                    >
                        <img src="/assets/img/banner/top-img-1.png" alt="user image" title='user image' className='size-[30px]' />
                    </motion.div>
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: .1, duration: .3 }}
                    >
                        <img src="/assets/img/banner/top-img-2.png" alt="user image" title='user image' className='size-[30px]' />
                    </motion.div>
                    <motion.div
                        initial={{ x: 40, opacity: 0, scale: 0.9 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: .2, duration: .3 }}
                    >
                        <img src="/assets/img/banner/top-img-3.png" alt="user image" title='user image' className='size-[30px]' />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ x: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: .3, duration: .3 }}
                    className="content-div flex px-4 py-1 rounded-md bg-[#8475c920]"
                >
                    <span>95% Student Satisfaction Rate</span>
                </motion.div>
            </div>

            {/* Main Heading */}
            <div className="main-heading-section font-manrope flex flex-col gap-2 items-center">
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .3 }}
                >
                    <MainHeading data={data} />
                </motion.div>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: .15, duration: .3 }}
                    className='text-[#101725B2] lg:w-[60%] md:w-[85%] w-full text-center md:text-[18px] xsm:text-[16px] text-[14px] font-medium'
                    dangerouslySetInnerHTML={{ __html: data?.description || "" }}>
                </motion.div>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: .3, duration: .3 }}
                    className="form-section mt-2 w-full flex justify-center"
                >
                    <EmailSection data={data} />
                </motion.div>
            </div>

            {/* Banner Grid */}
            <div className="banner-grid-section w-full xl:px-[15%] px-0 lg:mt-[60px] mt-[40px]">
                <BannerGridSection graphData={graphData} data={data} />
            </div>

            {/* Parallax Mouse Arrows */}
            <div className="parallax-image lg:block hidden">
                <motion.img
                    src="assets/img/svg/mouuse-arow-1.svg"
                    alt="mouse pointer image"
                    title='mouse pointer image'
                    className='absolute 2xl:left-[20%] xl:left-[10%] lg:left-[5%] top-1/2 translate-y-[calc(-50%+-50px)]'
                    animate={{
                        x: mousePos.x * 40,  // adjust intensity
                        y: mousePos.y * 25,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />

                <motion.img
                    src="assets/img/svg/mouuse-arow-2.svg"
                    alt="mouse pointer image"
                    title='mouse pointer image'
                    className='absolute 2xl:right-[20%] xl:right-[10%] lg:right-[5%] top-1/2 translate-y-[calc(-50%+-100px)]'
                    animate={{
                        x: -mousePos.x * 40, // opposite direction
                        y: -mousePos.y * 25,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>
        </div>
    )
}

export default BannerSection
