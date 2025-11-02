import { Icons } from '@/components/layout/common/Icons'
import React from 'react'
import FeaturesBannerGrid from './FeaturesBannerGrid'
import RequestDemoForm from '@/components/layout/common/RequestDemoForm'

function FeaturesBanner({ data }: any) {
    return (
        <div className='xl:h-full lg:h-[100%] main-padding bg-[#8475C91A] flex flex-col items-center justify-end gap-[40px] xl:pt-[150px] md:pt-[160px] pt-[120px] 2xl:pb-[80px] xl:pb-[40px] md:pb-[80px] pb-[50px]'>
            <div className="banner-text flex flex-col gap-[20px] justify-center items-center ">
                <h1 className='xl:text-[52px] lg:text-[46px] md:text-[42px] xsm:text-[26px] text-[24px] text-black md:font-bold font-bold text-center leading-tight md:w-[70%]'>{data?.title}</h1>
                <p className="lg:w-[80%] w-[100%] 2xl:text-[18px] lg:text-[16px] text-[16px] md:leading-normal leading-tight text-center text-black">
                    {data?.subTitle}
                </p>
                <RequestDemoForm data={data} />
                {/* <button type='submit' className={`lg:px-5 md:px-4 px-3 lg:py-3 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer`}>
                    <span className=''> {data?.buttonText}</span>
                    <Icons.button_arrrow className='size-[25px]' />
                </button> */}
            </div>
            <FeaturesBannerGrid data={data} />
        </div>
    )
}

export default FeaturesBanner