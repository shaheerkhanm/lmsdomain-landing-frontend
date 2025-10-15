import { Icons } from '@/components/layout/common/Icons'
import React from 'react'
import FeaturesBannerGrid from './FeaturesBannerGrid'

function FeaturesBanner() {
    return (
        <div className='xl:h-screen lg:h-[50vh] main-padding bg-[#8475C91A] flex flex-col items-center justify-end gap-[40px] pb-[80px]'>
            <div className="banner-text flex flex-col gap-[20px] justify-center items-center ">
                <h1 className='lg:text-[52px] md:text-[42px] xsm:text-[26px] text-[24px] text-black md:font-bold font-bold text-center leading-tight w-[70%]'>Power-Packed Features to Elevate Learning</h1>
                <p className="lg:w-[80%] w-[100%] 2xl:text-[18px] lg:text-[16px] text-[16px] md:leading-normal leading-tight text-center text-black">
                    LMS Domain is packed with modern, scalable tools to help instructors, institutions, and EdTech startups deliver world-class eLearning experiences — with zero hassle.
                </p>
                <button type='submit' className={`lg:px-5 md:px-4 px-3 lg:py-3 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer`}>
                    <span className='md:block hidden'> Book A Demo</span>
                    <Icons.button_arrrow className='size-[25px]' />
                </button>
            </div>
            <FeaturesBannerGrid />
        </div>
    )
}

export default FeaturesBanner