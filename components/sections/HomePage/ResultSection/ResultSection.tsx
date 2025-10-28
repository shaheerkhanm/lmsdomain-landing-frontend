import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import ResultCounterSection from './ResultCounterSection';

function ResultSection({ data }: any) {

    const bgColors = [
        { color: "#d1b3fd" },
        { color: "#21C48C" },
        { color: "#FCA311" },
        { color: "#21C48C" }
    ];

    return (
        <div className='results-section main-padding font-manrope'>
            <MainTitle title={data?.title || 'Real Results'} h2ClassName={'text-center'} divClassName={''} />
            <ResultCounterSection />
        </div>
    )
}

export default ResultSection
