import React from 'react'

function OurMissionSection() {
    return (
        <div className='main-padding'>
            <div className="grid grid-cols-2 gap-[100px]">
                <div className="col-span-1 flex flex-col justify-center gap-[10px]">
                    <h2 className='xl:text-[24px] lg:text-[20px] text-[18px] font-bold'>Our Mission</h2>
                    <p className='font-medium leading-relaxed 2xl:text-[18px] text-[16px]'>We believe that education should be accessible, engaging, and transformative. Our mission is to democratize learning by providing cutting-edge technology that enables educators to create, deliver, and scale exceptional educational experiences. Since our founding, we've helped over 10,000 educators reach millions of learners worldwide, breaking down barriers and making quality education available to everyone, everywhere. 10K+</p>
                    <div className="flex gap-10 mt-5">
                        <div className="flex flex-col">
                            <h3 className='font-extrabold xl:text-[36px] lg:text-[30px] md:text-[28px] text-[26px] text-[#6C4BFF]'>10K+</h3>
                            <span className='2xl:text-[18px] text-[16px]'>Educators</span>
                        </div>
                        <div className="flex flex-col">
                            <h3 className='font-extrabold xl:text-[36px] lg:text-[30px] md:text-[28px] text-[26px] text-[#21C48C]'>1.2M+</h3>
                            <span className='2xl:text-[18px] text-[16px]'>Learners</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="img-div p-[40px] bg-[#D9D5F8] rounded-[40px]">
                        <img src="assets/img/mission-img.jpg" alt="" className='h-[316px] w-full rounded-[20px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurMissionSection