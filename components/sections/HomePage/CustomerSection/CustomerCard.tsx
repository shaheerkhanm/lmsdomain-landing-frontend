import React from 'react'

interface CustomerData {
    title: string,
    content: string,
    img: string,
    bgColor: string,
}

interface Props {
    item: CustomerData
}

function CustomerCard({ item }: Props) {
    return (
        <div className="flex flex-col font-manrope">
            <div className={`px-[0px] !pb-0 pt-[40px] rounded-[20px] overflow-hidden relative ${item.bgColor} `}>
                <span className='absolute z-1 left-1/2 -translate-x-1/2 bottom-0 h-[70%] w-[60%] rounded-l-[20px] rounded-tr-[120px] rounded-br-[20px] bg-[#ffffff40]'></span>
                <div className="img-div w-full flex justify-center relative z-1">
                    <img src={item?.img} alt="" className='object-cover lg:h-[250px] md:h-[180px] h-[150px]' />
                </div>
            </div>
            <div className="customer-details py-[15px]">
                <h3 className='2xl:text-[24px] font-bold md:text-[22px] text-[20px]'>{item.title}</h3>
                <p className='md:text-[18px] text-[16px] lg:w-full md:w-[90%] w-[100%] leading-tight'>{item.content}</p>
            </div>
        </div>
    )
}

export default CustomerCard