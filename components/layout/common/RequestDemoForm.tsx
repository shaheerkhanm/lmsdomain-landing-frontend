'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from './Icons'
import EnquiryForm from './EnquiryForm'


function RequestDemoForm({ data }: any) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div className={`lg:px-5 md:px-4 px-3 lg:py-3 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer`}>
                        <span className=''> {data?.buttonText}</span>
                        <Icons.button_arrrow className='size-[25px]' />
                    </div>
                </DialogTrigger>
                <DialogContent className='md:min-w-[750px] border-none md:py-[50px] md:px-[50px] p-[25px] rounded-[20px]'>
                    <EnquiryForm onClose={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RequestDemoForm