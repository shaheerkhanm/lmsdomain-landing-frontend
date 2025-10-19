import { Icons } from '@/components/layout/common/Icons'
import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'

function AboutCTA() {
    return (
        <div className='bg-ScndColor main-padding !mb-0 py-[100px]'>
            <div className="title-section flex flex-col gap-1 items-center">
                <MainTitle title={'Join Our Mission'} h2ClassName={'text-center text-white'} divClassName={''} />
                <p className='text-center xl:w-[35%] lg:w-[40%] text-white'>Ready to be part of the education revolution? Start building your learning empire today.</p>
                <button type='submit' className={`mt-[20px] lg:px-5 md:px-4 px-3 lg:py-3 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer`}>
                    <span className=''> Book A Demo</span>
                    <Icons.button_arrrow className='size-[25px]' />
                </button>
            </div>
        </div>
    )
}

export default AboutCTA