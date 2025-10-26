import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import AdvantageScrollMain from './AdvantageScrollMain'
import { fetchData } from '@/utils/api'
import { apiRoutes } from '@/utils/api/apiRoutes'

async function AdvantageSection({ data }: any) {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getFeatures
            const response = await fetchData({
                url: location,
                body: { slug },

            })



            return response
        } catch (error) {
            return {}
        }
    }

    const featuresData = await getData("");

    return (
        <div className='main-padding'>
            <div className="flex justify-center w-full">
                <MainTitle title={data?.title || 'A Complete Package Ready to Deploy'} h2ClassName={'text-center w-[80%]'} divClassName={'flex justify-center'} />
            </div>
            <div className="advantage-scroll-main">
                <AdvantageScrollMain data={featuresData} />
            </div>
        </div>
    )
}

export default AdvantageSection