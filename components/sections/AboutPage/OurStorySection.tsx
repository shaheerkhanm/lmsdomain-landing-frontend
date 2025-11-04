import React from 'react'

function OurStorySection({ data }: any) {
    return (
        <div className='main-padding'>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
                <div className="col-span-1">
                    <div className="img-div lg:p-[40px] md:p-[30px] p-[15px] bg-[#FCA72330] md:rounded-[40px] rounded-[30px]">
                        <img src={data?.image || "assets/img/our-story-img.jpg"} alt={data?.altImage} title={data?.altImage} className='lg:h-[316px] md:h-[300px] h-[200px] w-full md:rounded-[30px] rounded-[20px] object-cover' />
                    </div>
                </div>
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[20px] font-bold'>{data?.title || 'Our Story'}</h2>
                    <div className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]' dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
                    <div className="flex flex-col gap-2 md:mt-5 mt-3 p-[20px] bg-[#F3F2FA] rounded-[20px]">
                        <p className='leading-relaxed font-medium 2xl:text-[18px] text-[16px]'>"{data?.quote}"</p>
                        <span className='text-[#6C4BFF] font-bold'>— {data?.author}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStorySection