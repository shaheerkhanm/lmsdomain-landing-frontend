import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import AdvantageScrollMain from './AdvantageScrollMain'

function AdvantageSection() {
    return (
        <div className='main-padding'>
            <div className="flex justify-center w-full">
                <MainTitle title={'A Complete Package Ready to Deploy'} h2ClassName={'text-center w-[80%]'} divClassName={'flex justify-center'} />
            </div>
            <div className="advantage-scroll-main">
                <AdvantageScrollMain />
            </div>
        </div>
    )
}

export default AdvantageSection