import React from 'react'
import HeadingAnimateText from './HeadingAnimateText'

function MainHeading() {
    return (
        <div className='flex flex-col items-center mt-[10px]'>
            <h1 className='xl:text-[52px] md:text-[38px] text-[28px] font-bold text-black w-[100%] leading-tight text-center font-manrope flex flex-col items-center'>
                <span className='leading-tight flex'>
                    <HeadingAnimateText />
                    <span className='ms-4'>Your Branded</span>
                </span>
                <span>Learning Hub Starts Here.</span>
            </h1>
        </div>
    )
}

export default MainHeading