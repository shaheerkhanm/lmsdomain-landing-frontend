import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import MultipleContentSlider from './MultipleContentSlider'
import { fetchData } from '@/utils/api'
import { apiRoutes } from '@/utils/api/apiRoutes'

async function FeaturesMultipleContent({ data }: any) {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getFeaturesContent
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
    const featuresContentData = await getData("");

    return (
        <div className='main-padding bg-[#F3F2FA] py-[80px]'>
            <div className="flex flex-col gap-2 items-center">
                <MainTitle title={data?.title || 'Multiple Content Types'} h2ClassName={'text-center'} divClassName={''} />
                <p className='text-center lg:w-[40%] md:w-[60%] w-[100%]'>{data?.subTitle}</p>
            </div>
            <MultipleContentSlider sliderData={featuresContentData} />
        </div>
    )
}

export default FeaturesMultipleContent