import React from 'react'
import FooterSection from './common/FooterSection'
import { apiRoutes } from '@/utils/api/apiRoutes'
import { fetchData } from '@/utils/api'

async function Footer() {

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
  const addressData = await getData("address");
  const contentData = await getData("footer");

  return (
    <div>
      <FooterSection contentData={contentData} addressData={addressData} />
    </div>
  )
}

export default Footer