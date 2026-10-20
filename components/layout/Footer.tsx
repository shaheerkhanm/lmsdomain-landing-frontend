import React from 'react'
import FooterSection from './common/FooterSection'
import { apiRoutes } from '@/utils/api/apiRoutes'
import { fetchData } from '@/utils/api'

async function Footer() {

  const getData = async (slug: string) => {
    try {
      const baseUrl = (process.env.BACKEND_URL || process.env.BACKEND_INTERNAL_URL || "http://lms-landing-backend:3000").replace(/\/$/, "");
      const location = baseUrl + apiRoutes?.getAllCms;
      const response = await fetchData({
        url: location,
        body: { slug },
      });
      return response;
    } catch (error) {
      return {};
    }
  };

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