import React from 'react'


function CustomerCard({ item }: any) {
    return (
        <div className="flex flex-col font-manrope">
            <div className={`px-[0px] !pb-0 rounded-[20px] overflow-hidden relative  `}>
                <div className="img-div w-full flex justify-center relative z-1 lg:h-[280px] md:h-[240px] h-[240px]">
                    <img src={item?.image} alt={item?.altImage} className='object-cover w-full h-full' />
                </div>
            </div>
            <div className="customer-details py-[15px]">
                <h3 className='2xl:text-[24px] font-bold md:text-[22px] text-[20px]'>{item.title}</h3>
                <p className='md:text-[18px] text-[16px] lg:w-full md:w-[90%] w-[100%] leading-tight'>{item.subTitle}</p>
            </div>
        </div>
    )
}

export default CustomerCard