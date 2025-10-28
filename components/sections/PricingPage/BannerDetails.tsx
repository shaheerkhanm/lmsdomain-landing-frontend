import React from 'react'

function BannerDetails({ data }: any) {
    return (
        <div>
            {/* Price Banner */}
            <div className="banner-text flex flex-col justify-center items-center">
                <h1 className="lg:text-[52px] md:text-[42px] xsm:text-[26px] text-[24px] text-white md:font-semibold font-bold">
                    {data?.title}
                </h1>
                <p className="lg:w-[70%] md:w-[80%] w-[100%] 2xl:text-[18px] lg:text-[16px] text-[16px] md:leading-normal leading-tight text-center text-white">
                    {data?.subTitle}
                </p>
            </div>
        </div>
    )
}

export default BannerDetails