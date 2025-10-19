import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import MultipleContentSlider from './MultipleContentSlider'

function FeaturesMultipleContent() {
    return (
        <div className='main-padding bg-[#F3F2FA] py-[80px]'>
            <div className="flex flex-col gap-2 items-center">
                <MainTitle title={'Multiple Content Types'} h2ClassName={'text-center'} divClassName={''} />
                <p className='text-center w-[40%]'>Support for diverse learning formats to engage students and enhance the learning experience.</p>
            </div>
            <MultipleContentSlider />
        </div>
    )
}

export default FeaturesMultipleContent