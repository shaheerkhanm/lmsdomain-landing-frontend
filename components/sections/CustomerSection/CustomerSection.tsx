
import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import CustomerSliderSection from './CustomerSliderSection'

function CustomerSection() {
    return (
        <div className='main-padding'>
            <MainTitle
                title={'Built for Trainers, Institutes & Businesses'} h2ClassName={'text-center w-[80%]'} divClassName={'d-flex w-full justify-center'} />
            <CustomerSliderSection />
        </div>
    )
}

export default CustomerSection