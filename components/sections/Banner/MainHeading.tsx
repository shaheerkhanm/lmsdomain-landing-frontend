import React from 'react'
import HeadingAnimateText from './HeadingAnimateText'

function MainHeading() {
    return (
        <div className='flex flex-col items-center mt-[20px]'>
            <h1 className='text-[52px] font-bold text-black w-[60%] leading-tight text-center font-manrope flex flex-col items-center'>
                <HeadingAnimateText />
                <span className='ps-4'>Your Branded Learning Hub Starts Here.</span>
            </h1>
        </div>
    )
}

export default MainHeading