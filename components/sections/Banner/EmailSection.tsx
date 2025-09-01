import { Icons } from '@/components/layout/common/Icons'
import React from 'react'

function EmailSection({ inputClass, btnClass }: any) {
    return (
        <div className='flex items-center'>
            <form action="">
                <div className='flex items-center gap-[10px]'>
                    <input type="email" placeholder='Enter Your Email' className={`lg:px-6 px-4 lg:py-4 py-3 text-[16px] w-[320px] border border-GreyMain rounded-md outline-none ${inputClass}`} />
                    <button type='submit' className={`lg:px-6 px-4 lg:py-4 py-3 flex items-center gap-3 rounded-lg bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer ${btnClass}`}>
                        Book A Demo
                        <Icons.button_arrrow className='size-[25px]' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmailSection
