import { Icons } from '@/components/layout/common/Icons'
import { useForm, SubmitHandler } from "react-hook-form";
import React from 'react'
import { apiRoutes } from '@/utils/api/apiRoutes';
import { BACKEND_URL } from '@/utils/constants/constant';
import { fetchData } from '@/utils/api';
import { toast } from 'sonner';

type EmailInputs = {
    email: string,
};

function EmailSection({ inputClass, btnClass, data }: any) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EmailInputs>();

    const onSubmit: SubmitHandler<EmailInputs> = data => submitData(data);

    const submitData = async (data: any) => {
        try {
            const url = BACKEND_URL + apiRoutes.getEnquiry;
            const body = {
                ...data,
                type: 2,
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
                // setSelectedOption("");
            }
        } catch (error) {
            console.log(error);
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
        <div className='flex items-center w-[90%]'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <div className="flex flex-col">
                    <div className='flex md:flex-row flex-row items-center md:gap-[10px] gap-[5px] justify-center'>
                        <div className="flex flex-col">
                            <input
                                type="email"
                                placeholder='Enter Your Email'
                                className={` lg:px-6 px-4 lg:py-4 md:py-3 py-2 text-[16px] md:w-[320px] w-full border border-GreyMain md:rounded-lg rounded-sm outline-none ${inputClass}`}
                                {...register("email", { required: "Email Not Entered" })} />

                        </div>
                        <button type='submit' className={`lg:px-6 md:px-4 px-3 lg:py-4 md:py-3 py-2 flex items-center gap-3 md:rounded-lg rounded-sm bg-MainColor hover:bg-[#21C48C] text-white font-semibold 2xl:text-[18px] text-[16px] common-transition cursor-pointer ${btnClass}`}>
                            <span className='md:block hidden'> {data?.buttonText}</span>
                            <Icons.button_arrrow className='size-[25px]' />
                        </button>
                    </div>
                    {errors?.email?.message && (
                        <span className=" ps-[30px] mt-1 2xl:text-[14px] text-[12px] text-red-500 sst-roman">
                            {errors?.email?.message}
                        </span>
                    )}
                </div>
            </form>
        </div>
    )
}

export default EmailSection
