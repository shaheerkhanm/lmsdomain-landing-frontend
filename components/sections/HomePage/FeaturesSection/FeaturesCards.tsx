import React from 'react'

// interface FeaturedData {
//     img: string,
//     title: string,
//     content: string,
// }

// interface Props {
//     item: FeaturedData
// }

function FeaturesCards({ item }: any) {
    return (
        <div className='flex md:gap-[30px] gap-[20px]'>
            <div className="icoc-div">
                <img src={item?.image} alt="" className='lg:min-w-[45px] min-w-[40px] object-contain' />
            </div>
            <div className="details flex flex-col lg:gap-2 gap-1">
                <h3 className='font-manrope font-bold text-TextBlack lg:text-[24px] md:text-[22px] text-[20px] leading-tight'>{item.title}</h3>
                <p className='font-inter lg:text-[18px] text-[16px] leading-tight'>{item.subTitle}</p>
            </div>
        </div>
    )
}

export default FeaturesCards
