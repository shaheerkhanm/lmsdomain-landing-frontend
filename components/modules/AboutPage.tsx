import React from 'react'
import AboutBanner from '../sections/AboutPage/AboutBanner'
import OurMissionSection from '../sections/AboutPage/OurMissionSection'
import CodeValueSlider from '../sections/AboutPage/CodeValueSlider'
import OurStorySection from '../sections/AboutPage/OurStorySection'
import AboutCTA from '../sections/AboutPage/AboutCTA'
import { apiRoutes } from '@/utils/api/apiRoutes'
import { fetchData } from '@/utils/api'
import CoreValueSection from '../sections/AboutPage/CoreValueSection'

async function AboutPage() {

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
    const aboutHeroData = await getData("about-hero");
    const aboutMissionData = await getData("about-mission");
    const aboutvalueData = await getData("about-values");
    const aboutStoryData = await getData("about-story");
    const aboutCTAData = await getData("about-mission-card");

    return (
        <div className='font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]'>
            <AboutBanner data={aboutHeroData} />
            <OurMissionSection data={aboutMissionData} />
            <CoreValueSection data={aboutvalueData} />
            <OurStorySection data={aboutStoryData} />
            <AboutCTA data={aboutCTAData} />
        </div>
    )
}

export default AboutPage