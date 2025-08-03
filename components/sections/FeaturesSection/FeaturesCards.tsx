import React from 'react'

interface FeaturedData {
    img: string,
    title: string,
    content: string,
}

interface Props {
    item: FeaturedData
}

function FeaturesCards({ item }: Props) {
    return (
        <div className='flex gap-[30px]'>
            <div className="icoc-div">
                <img src={item.img} alt="" className='size-[45px] object-contain' />
            </div>
            <div className="details flex flex-col gap-2">
                <h3 className='font-manrope font-bold text-TextBlack text-[24px] leading-tight'>{item.title}</h3>
                <p className='font-inter text-[18px] leading-tight'>{item.content}</p>
            </div>
        </div>
    )
}

export default FeaturesCards
