import React from 'react'

function OurStorySection({ data }: any) {
    return (
        <div className='main-padding'>
            <div className="grid grid-cols-2 gap-[40px]">
                <div className="col-span-1">
                    <div className="img-div p-[40px] bg-[#FCA72330] rounded-[40px]">
                        <img src={data?.image || "assets/img/our-story-img.jpg"} alt={data?.altImage} title={data?.altImage} className='h-[350px] w-full rounded-[30px] object-cover' />
                    </div>
                </div>
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[18px] font-bold'>{data?.title || 'Our Story'}</h2>
                    <div className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]' dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                    <div className="flex flex-col gap-2 mt-5 p-[20px] bg-[#F3F2FA] rounded-[20px]">
                        <p className='leading-relaxed font-medium 2xl:text-[18px] text-[16px]'>"{data?.quote}"</p>
                        <span className='text-[#6C4BFF] font-bold'>— {data?.author}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStorySection