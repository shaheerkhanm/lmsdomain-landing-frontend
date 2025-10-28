import React from 'react'
import { IntegrationBeamEffects } from './IntegrationBeamEffects'
import MainTitle from '@/components/layout/common/MainTitle'
import IntegrationMobileSection from './IntegrationMobileSection'

function SeamlessIntegrationSection() {
    return (
        <div className='!m-0 bg-[#1B1F3B] xl:py-[120px] py-[70px]'>
            <div className="title-section flex flex-col gap-1 items-center">
                <MainTitle title={'Seamless Integrations'} h2ClassName={'text-center text-white'} divClassName={''} />
                <p className='text-center xl:w-[20%] lg:w-[40%] w-[90%] text-white'>LMS Domain connects with your favorite tools for effortless workflows:</p>
            </div>
            <IntegrationBeamEffects />
            <IntegrationMobileSection />
        </div>
    )
}

export default SeamlessIntegrationSection