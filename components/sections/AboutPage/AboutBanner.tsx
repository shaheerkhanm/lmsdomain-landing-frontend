import { Icons } from '@/components/layout/common/Icons'
import React from 'react'

function AboutBanner({ data }: any) {
    return (
        <div className='xl:h-full lg:h-[100%] main-padding bg-[#8475C91A] flex flex-col items-center justify-end gap-[40px] xl:pt-[150px] md:pt-[160px] pt-[120px] 2xl:pb-[80px] xl:pb-[40px] md:pb-[80px] pb-[50px]'>
            <div className="banner-text flex flex-col gap-[10px] justify-center items-center lg:px-20 px-0">
                <h1 className='xl:text-[52px] lg:text-[46px] md:text-[42px] xsm:text-[26px] text-[24px] text-black md:font-bold font-bold text-center leading-tight lg:w-[70%] md:w-[90%]'>{data?.title}</h1>
                <p className="lg:w-[70%] w-[100%] 2xl:text-[18px] lg:text-[16px] text-[16px] md:leading-normal leading-tight text-center text-black">
                    {data?.subTitle}
                </p>
            </div>
            <div className="lg:px-20 px-0 w-full">
                <div className="img-div xl:h-[480px] md:h-[380px] h-[200px] w-full xl:rounded-[20px] rounded-[15px] overflow-hidden">
                    <img src={data?.image || "assets/img/about-img.jpg"} alt={data?.altImage} title={data?.altImage + "Image"} className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default AboutBanner