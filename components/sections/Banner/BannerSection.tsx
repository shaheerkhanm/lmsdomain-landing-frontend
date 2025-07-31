import React from 'react'
import MainHeading from './MainHeading'

function BannerSection() {
    return (
        <div className='w-full h-[100vh] bg-[#8475C91A] flex flex-col items-center pt-[140px]'>
            <div className="top-section flex items-center gap-[10px] font-inter font-medium text-[12px]">
                <div className="img-div flex -space-x-3">
                    <img src="/assets/img/banner/top-img-1.png" alt="" className='size-[30px]' />
                    <img src="/assets/img/banner/top-img-2.png" alt="" className='size-[30px]' />
                    <img src="/assets/img/banner/top-img-3.png" alt="" className='size-[30px]' />
                </div>
                <div className="content-div flex px-4 py-1 rounded-md bg-[#8475c952]">
                    <span>95% Student Satisfaction Rate</span>
                </div>
            </div>
            <div className="main-heading-section">
                <MainHeading />
            </div>
        </div>
    )
}

export default BannerSection