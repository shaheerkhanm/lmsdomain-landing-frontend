import { Icons } from '@/components/layout/common/Icons'
import React from 'react'

function EmailSection() {
    return (
        <div className='flex items-center'>
            <form action="">
                <div className='flex items-center gap-[10px]'>
                    <input type="email" placeholder='Enter Your Email' className='px-6 py-4 text-[16px] w-[320px] border border-GreyMain rounded-md outline-none' />
                    <button type='submit' className='px-6 py-4 flex items-center gap-3 rounded-lg bg-MainColor hover:bg-ScndColor text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer'>
                        Book A Demo
                        <Icons.button_arrrow className='size-[25px]' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmailSection
