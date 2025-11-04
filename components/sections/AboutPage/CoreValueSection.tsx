import React from 'react'
import CodeValueSlider from './CodeValueSlider'
import MainTitle from '@/components/layout/common/MainTitle'
import { apiRoutes } from '@/utils/api/apiRoutes'
import { fetchData } from '@/utils/api'

async function CoreValueSection({ data }: any) {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getAboutValues
            const response = await fetchData({
                url: location,
                body: { slug },

            })



            return response
        } catch (error) {
            return {}
        }
    }

    const sliderData = await getData("");


    return (
        <div>
            <div className="flex flex-col gap-2 items-center">
                <MainTitle title={data?.title || 'Multiple Content Types'} h2ClassName={'text-center'} divClassName={''} />
                <p className='text-center lg:w-[40%] md:w-[60%] w-[100%]'>{data?.subTitle}</p>
            </div>
            <CodeValueSlider sliderData={sliderData} />
        </div>
    )
}

export default CoreValueSection