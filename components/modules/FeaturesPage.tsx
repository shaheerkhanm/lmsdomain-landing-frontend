import React from 'react'
import FeaturesBanner from '../sections/FeaturesPage/FeaturesBanner'
import FeaturesDetails from '../sections/FeaturesPage/FeaturesDetails'
import FeaturesMultipleContent from '../sections/FeaturesPage/FeaturesMultipleContent'
import SeamlessIntegrationSection from '../sections/FeaturesPage/SeamlessIntegrationSection'
import { apiRoutes } from '@/utils/api/apiRoutes'
import { fetchData } from '@/utils/api'
import IntegrationMobileSection from '../sections/FeaturesPage/IntegrationMobileSection'

async function FeaturesPage() {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getAllCms
            const response = await fetchData({
                url: location,
                body: { slug },

            })



            return response
        } catch (error) {
            return {}
        }
    }

    // Fetch all section data
    const featuresHeroData = await getData("features-hero");
    const featuresContentData = await getData("features-content");

    return (
        <div className="font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">
            <FeaturesBanner data={featuresHeroData} />
            <FeaturesDetails />
            <FeaturesMultipleContent data={featuresContentData} />
            <SeamlessIntegrationSection />
        </div>
    )
}

export default FeaturesPage