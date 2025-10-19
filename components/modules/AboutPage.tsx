import React from 'react'
import AboutBanner from '../sections/AboutPage/AboutBanner'
import OurMissionSection from '../sections/AboutPage/OurMissionSection'
import CodeValueSlider from '../sections/AboutPage/CodeValueSlider'
import OurStorySection from '../sections/AboutPage/OurStorySection'
import AboutCTA from '../sections/AboutPage/AboutCTA'

function AboutPage() {
    return (
        <div className='font-manrope [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]'>
            <AboutBanner />
            <OurMissionSection />
            <CodeValueSlider />
            <OurStorySection />
            <AboutCTA />
        </div>
    )
}

export default AboutPage