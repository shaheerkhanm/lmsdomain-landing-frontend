import Link from "next/link"
import React from "react"

interface Props {
    title: string
    desc: string
    img: string
}

function AdvanteageItemCard({ title, desc, img }: Props) {
    return (
        <div className="advantage-card grid grid-cols-2 font-manrope h-[100vh]">
            {/* Left side content */}
            <div className="col-span-1 flex flex-col justify-center gap-[20px] px-10">
                <h3 className="font-bold text-[24px] leading-tight">{title}</h3>
                <p className="w-[70%] 2xl:text-[18px] text-[16px]">{desc}</p>
                <Link
                    href=""
                    className="py-2 px-5 bg-[#FCA311] text-white hover:bg-MainColor common-transition w-fit rounded-full text-[16px]"
                >
                    Learn More
                </Link>
            </div>

            {/* Right side pinned image */}
            <div className="col-span-1">
                <div className="flex h-full items-center">
                    <div className="img-div flex justify-center items-end w-full pt-[80px] bg-gradient-to-t from-[#6C4BFF30] to-[#6C4BFF10] rounded-[20px] overflow-hidden">
                        <img
                            src={img}
                            alt={title}
                            className="rounded-tl-[20px] rounded-tr-[20px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvanteageItemCard
