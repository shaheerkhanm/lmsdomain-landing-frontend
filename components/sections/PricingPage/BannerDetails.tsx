import React from 'react'

function BannerDetails() {
    return (
        <div>
            {/* Price Banner */}
            <div className="banner-text flex flex-col justify-center items-center">
                <h1 className="lg:text-[52px] md:text-[42px] xsm:text-[26px] text-[24px] text-white md:font-semibold font-bold">
                    Simple, Transparent Pricing
                </h1>
                <p className="lg:w-[70%] w-[100%] lg:text-[16px] text-[16px] md:leading-normal leading-tight text-center text-white">
                    Lorem ipsum dolor sit amet consectetur. Sem vulputate a cras et morbi
                    quisque orci. Dui faucibus aliquam scelerisque sapien non mauris. Arcu
                    dignissim massa sed neque.
                </p>
            </div>
        </div>
    )
}

export default BannerDetails