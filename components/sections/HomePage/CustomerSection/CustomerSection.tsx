
import MainTitle from '@/components/layout/common/MainTitle'
import React from 'react'
import CustomerSliderSection from './CustomerSliderSection'
import { fetchData } from '@/utils/api'
import { apiRoutes } from '@/utils/api/apiRoutes'

async function CustomerSection({ data }: any) {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getCustomers
            const response = await fetchData({
                url: location,
                body: { slug },

            })



            return response
        } catch (error) {
            return {}
        }
    }

    const CustomerItemsData = await getData("");

    return (
        <div className='main-padding'>
            <MainTitle
                title={data?.title || 'Built for Trainers, Institutes & Businesses'} h2ClassName={'text-center lg:w-full md:w-[80%]'} divClassName={'flex w-full justify-center'} />
            <CustomerSliderSection data={CustomerItemsData} />
        </div>
    )
}

export default CustomerSection