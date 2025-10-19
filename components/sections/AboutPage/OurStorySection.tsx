import React from 'react'

function OurStorySection() {
    return (
        <div className='main-padding'>
            <div className="grid grid-cols-2 gap-[40px]">
                <div className="col-span-1">
                    <div className="img-div p-[40px] bg-[#FCA72330] rounded-[40px]">
                        <img src="assets/img/our-story-img.jpg" alt="" className='h-[350px] w-full rounded-[30px] object-cover' />
                    </div>
                </div>
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[18px] font-bold'>Our Story</h2>
                    <p className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]'>We believe that education should be accessible, engaging, and transformative. Our mission is to democratize learning by providing cutting-edge technology that enables educators to create, deliver, and scale exceptional educational experiences. Since our founding, we've helped over 10,000 educators reach millions of learners worldwide, breaking down barriers and making quality education available to everyone, everywhere. 10K+</p>
                    <div className="flex flex-col gap-2 mt-5 p-[20px] bg-[#F3F2FA] rounded-[20px]">
                        <p className='leading-relaxed font-medium 2xl:text-[18px] text-[16px]'>"Our vision is to make creating and delivering exceptional learning experiences as simple as having a conversation. Education should inspire, not frustrate."</p>
                        <span className='text-[#6C4BFF] font-bold'>— Shaheer Khan, CEO & Co-founder</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStorySection