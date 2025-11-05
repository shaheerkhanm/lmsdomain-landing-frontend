'use client'

import React from 'react'
import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';
import { BACKEND_URL } from '@/utils/constants/constant';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import { DialogTitle } from '@radix-ui/react-dialog';

type EnquiryInputs = {
    firstName: string,
    email: string,
    phoneNumber: string,
    organizationName: string,
    subject: string,
};

function EnquiryForm({ onClose }: { onClose: () => void }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryInputs>();

    const onSubmit: SubmitHandler<EnquiryInputs> = data => submitData(data);

    const submitData = async (data: any) => {
        try {
            const url = BACKEND_URL + apiRoutes.getEnquiry;
            const body = {
                ...data,
                type: 1,
            };
            const response: any = await fetchData({ url, body });

            if (response) {
                toast.success(
                    <div className="leading-tight">
                        Enquiry submitted <br /> successfully
                    </div>,
                    {
                        richColors: true

                    }
                )
                reset();
                onClose();
                // setSelectedOption("");
            }
        } catch (error) {
            // console.log(error);
            toast.error(
                <div className="leading-tight">
                    Something went wrong<br />while sending enquiry
                </div>,
                {
                    richColors: true

                }
            );
        }
    };

    return (
        <div className='font-manrope'>
            <div className="top-section">
                <DialogTitle >
                    <span className='md:text-[30px] text-[24px] font-bold'>Request A Demo</span>
                </DialogTitle>
                {/* <h2 className='' >Request A Demo</h2> */}
                <p className='leading-tight mt-1 md:w-[80%] w-[100%]'>Submit the below details and our team will connect with you to schedule a live demo walkthrough.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[10px]">
                    <div className="input-div flex flex-col">
                        <label className='text-black text-[14px] font-semibold mb-1'>Full Name</label>
                        <input
                            type="text"
                            className='border border-[#00000050] outline-none px-[15px] py-[10px] rounded-[10px] placeholder:text-[14px]'
                            placeholder="Enter your full name"
                            {...register("firstName", { required: "Name Not Entered" })}
                        />
                        {errors?.firstName?.message && (
                            <span className="2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                                {errors?.firstName?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-div flex flex-col">
                        <label className='text-black text-[14px] font-semibold mb-1'>Email</label>
                        <input
                            type="email"
                            className='border border-[#00000050] outline-none px-[15px] py-[10px] rounded-[10px] placeholder:text-[14px]'
                            placeholder="Enter your email"
                            {...register("email", { required: "Email Not Entered" })}
                        />
                        {errors?.email?.message && (
                            <span className="2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-div flex flex-col">
                        <label className='text-black text-[14px] font-semibold mb-1'>Phone</label>
                        <input
                            type="tel"
                            className='border border-[#00000050] outline-none px-[15px] py-[10px] rounded-[10px] placeholder:text-[14px]'
                            placeholder="Enter your phone number"
                            {...register("phoneNumber", { required: "Phone Number Not Entered" })}
                        />
                        {errors?.phoneNumber?.message && (
                            <span className="2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                                {errors?.phoneNumber?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-div flex flex-col">
                        <label className='text-black text-[14px] font-semibold mb-1'>Organisation</label>
                        <input
                            type="text"
                            className='border border-[#00000050] outline-none px-[15px] py-[10px] rounded-[10px] placeholder:text-[14px]'
                            placeholder="Enter your organisation"
                            {...register("organizationName", { required: "Organization Not Entered" })}
                        />
                        {errors?.organizationName?.message && (
                            <span className="2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                                {errors?.organizationName?.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="input-div flex flex-col mt-[10px]">
                    <label className='text-black text-[14px] font-semibold mb-1'>Subject</label>
                    <textarea
                        rows={5}
                        className='border border-[#00000050] outline-none px-[15px] py-[10px] rounded-[10px] placeholder:text-[14px]'
                        placeholder="Enter subject or message details"
                        {...register("subject", { required: "Subject Not Entered" })}
                    ></textarea>
                    {errors?.subject?.message && (
                        <span className="2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                            {errors?.subject?.message}
                        </span>
                    )}
                </div>

                <button type="submit" className='cursor-pointer w-full py-[15px] font-semibold rounded-[10px] text-white mt-[10px] bg-MainColor'>Submit</button>
            </form>
        </div>
    )
}

export default EnquiryForm