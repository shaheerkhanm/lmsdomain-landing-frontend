import React from 'react';
import AboutBanner from '../sections/AboutPage/AboutBanner';
import OurMissionSection from '../sections/AboutPage/OurMissionSection';
import OurStorySection from '../sections/AboutPage/OurStorySection';
import AboutCTA from '../sections/AboutPage/AboutCTA';
import CoreValueSection from '../sections/AboutPage/CoreValueSection';
import { fetchCms } from '@/lib/api/content';

async function AboutPage() {
    const [aboutHeroData, aboutMissionData, aboutValueData, aboutStoryData, aboutCTAData] = await Promise.all([
        fetchCms("about-hero"),
        fetchCms("about-mission"),
        fetchCms("about-values"),
        fetchCms("about-story"),
        fetchCms("about-mission-card"),
    ]);

    return (
        <div className='font-manrope [&>*:not(:first-child)]:lg:mt-[80px] [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px] [&>*:last-child]:mb-[30px]'>
            <AboutBanner data={aboutHeroData || {}} />
            <OurMissionSection initialData={aboutMissionData || {}} />
            <CoreValueSection data={aboutValueData || {}} />
            <OurStorySection data={aboutStoryData || {}} />
            <AboutCTA data={aboutCTAData || {}} />
        </div>
    );
}

export default AboutPage;
