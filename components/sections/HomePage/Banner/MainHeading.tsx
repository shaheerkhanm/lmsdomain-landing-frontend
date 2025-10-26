import React from 'react'
import HeadingAnimateText from './HeadingAnimateText'

function MainHeading({ data }: any) {
    return (
        <div className='flex flex-col items-center mt-[10px]'>
            <h1 className='xl:text-[52px] md:text-[38px] text-[24px] font-bold text-black w-[100%] leading-tight text-center font-manrope flex flex-col items-center'>
                <span className='leading-tight flex'>
                    <HeadingAnimateText data={data} />
                    <span className='ms-4'>{data?.title || "Your Branded"}</span>
                </span>
                <span> {data?.subTitle || "Learning Hub Starts Here."}</span>
            </h1>
        </div>
    )
}

export default MainHeading