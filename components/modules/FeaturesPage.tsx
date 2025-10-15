import React from 'react'
import FeaturesBanner from '../sections/FeaturesPage/FeaturesBanner'
import FeaturesDetails from '../sections/FeaturesPage/FeaturesDetails'

function FeaturesPage() {
    return (
        <div className="font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">
            <FeaturesBanner />
            <FeaturesDetails />
        </div>
    )
}

export default FeaturesPage