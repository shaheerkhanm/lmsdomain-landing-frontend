import { Icons } from '@/components/layout/common/Icons'
import React from 'react'

function EmailSection({ inputClass, btnClass }: any) {
    return (
        <div className='flex items-center w-[90%]'>
            <form action="" className='w-full'>
                <div className='flex md:flex-row flex-row items-center md:gap-[10px] gap-[5px] justify-center'>
                    <input type="email" placeholder='Enter Your Email' className={`lg:px-6 px-4 lg:py-4 md:py-3 py-2 text-[16px] md:w-[320px] w-full border border-GreyMain md:rounded-lg rounded-sm outline-none ${inputClass}`} />
                    <button type='submit' className={`lg:px-6 md:px-4 px-3 lg:py-4 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer ${btnClass}`}>
                        <span className='md:block hidden'> Book A Demo</span>
                        <Icons.button_arrrow className='size-[25px]' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmailSection
