import { Icons } from '@/components/layout/common/Icons'
import MainTitle from '@/components/layout/common/MainTitle'
import RequestDemoForm from '@/components/layout/common/RequestDemoForm'
import React from 'react'

function AboutCTA({ data }: any) {
    return (
        <div className='bg-ScndColor main-padding !mb-0 lg:py-[100px] py-[50px]'>
            <div className="title-section flex flex-col gap-1 items-center">
                <MainTitle title={data?.title || 'Join Our Mission'} h2ClassName={'text-center text-white'} divClassName={''} />
                <p className='text-center xl:w-[35%] lg:w-[40%] md:w-[60%] text-white mb-2'>{data?.subTitle}</p>
                {/* <button type='submit' className={`mt-[20px] lg:px-5 md:px-4 px-3 lg:py-3 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer`}>
                    <span className=''> {data?.buttonText}</span>
                    <Icons.button_arrrow className='size-[25px]' />
                </button> */}
                <RequestDemoForm data={data} />
            </div>
        </div>
    )
}

export default AboutCTA