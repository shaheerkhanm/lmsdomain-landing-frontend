import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';
import React from 'react'

// const featuresData = [
//     {
//         id: 1,
//         title: "Intelligent Course Management",
//         description: "Design, organize, and deliver stunning courses with ease. From drip content to course bundles, LMSDomain offers a seamless experience for instructors and learners alike.",
//         points: [
//             "Create free, paid, or subscription-based courses.",
//             "Upload unlimited multimedia lessons — video, audio, PDFs, SCORM files.",
//             "Organize your content into chapters and lessons for easy navigation.",
//             "Automate content release to keep learners engaged over time.",
//         ],
//         iconSrc: "assets/img/features/features-icon-common.svg",
//         imageSrc: "assets/img/features/feature-img-1.png",
//     },
//     {
//         id: 2,
//         title: "Immersive Learning Experience",
//         description: "Engage learners with immersive, interactive features designed to boost engagement.",
//         points: [
//             "Live Classes: Conduct real-time sessions via Zoom, Google Meet or MS Teams.",
//             "Interactive Quizzes & Assignments: Assess progress and encourage active participation.",
//             "Discussion Boards: Foster peer-to-peer interaction and idea sharing.",
//             "Gamification Elements: Badges, certificates, and progress tracking to motivate learners.",
//         ],
//         iconSrc: "assets/img/features/features-icon-common.svg",
//         imageSrc: "assets/img/features/feature-img-2.png",
//     },
//     {
//         id: 3,
//         title: "Powerful Admin, Instructor & Student Dashboards",
//         description: "Everyone gets the tools they need.",
//         points: [
//             "Admins can manage courses, users, payments, and reports.",
//             "Instructors can create, update, and track their courses with ease.",
//             "Students can track progress, access resources, and communicate instantly.",
//             "Role-based access keeps everything secure and organized.",
//         ],
//         iconSrc: "assets/img/features/features-icon-common.svg",
//         imageSrc: "assets/img/features/feature-img-3.png",
//     },
//     {
//         id: 4,
//         title: "Enterprise-Grade Security",
//         description: "Protect your data, your content, and your learners.",
//         points: [
//             "SSL encryption for secure data transfer.",
//             "Role-based access to prevent unauthorized changes.",
//             "GDPR-compliant data management.",
//             "Secure payment gateways with fraud protection.",
//         ],
//         iconSrc: "assets/img/features/features-icon-common.svg",
//         imageSrc: "assets/img/features/feature-img-4.png",
//     },
// ];

const iconBgColorClasses = [
    'bg-[#10B981]',
    'bg-[#6C4BFF]',
    'bg-[#F97316]',
    'bg-[#475569]'
];

async function FeaturesDetails() {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getFeaturesData
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
    const featuresData = await getData("");

    return (
        <div className='main-padding flex flex-col md:gap-[50px] gap-[20px]'>
            {featuresData?.map((feature: any, index: any) => {
                const isReversed = index % 2 !== 0;

                const iconBgColor = iconBgColorClasses[index % iconBgColorClasses.length];

                const imageColOrder = isReversed ? 'lg:order-1 order-2' : 'lg:order-2 order-1';
                const contentColOrder = isReversed ? 'order-2' : 'order-1';
                const imageJustify = isReversed ? 'lg:justify-center justify-center' : 'lg:justify-center justify-center';
                return (
                    <div key={index} className="grid lg:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[30px]" >
                        <div className={`col-span-1 flex items-center ${contentColOrder}`}>
                            <div className="flex flex-col md:gap-10 gap-5">
                                <div className="top-item-title">
                                    <div className="flex md:flex-row flex-col gap-[20px]">
                                        <div className={`icon-div 
                                            lg:min-w-[70px] lg:min-h-[70px] lg:max-w-[70px] lg:max-h-[70px] 
                                            md:min-w-[50px] md:min-h-[50px] md:max-w-[50px] md:max-h-[50px]
                                            min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]
                                             rounded-full ${iconBgColor} flex items-center justify-center p-3`}>
                                            <img src={feature.iconSrc || "assets/img/features/features-icon-common.svg"} alt={"Feature Icon"} className='w-full h-full object-contain' />
                                        </div>
                                        <div className="title-details flex flex-col gap-1">
                                            <h2 className='2xl:text-[24px] lg:text-[20px] md:text-[22px] text-[18px] font-bold'>{feature?.title}</h2>
                                            <p className='font-medium xl:text-[16px] lg:text-[14px] md:text-[16px] text-[16px]'>{feature?.subTitle}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-details-section 2xl:text-[18px] lg:text-[18px] md:text-[18px] text-[16px]">
                                    <span dangerouslySetInnerHTML={{ __html: feature?.content || "" }} />
                                    {/* <ul>
                                        {feature?.tags.map((item: any, index: any) => (
                                            <li key={index}></li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                        <div className={`col-span-1 flex items-center ${imageColOrder}`}>
                            <div className={`img-div flex items-center ${imageJustify} w-full`}>
                                <img
                                    src={feature?.image}
                                    title={`Image for ${feature.title}`}
                                    alt={feature.altImage} className='lg:h-[512px] md:h-[412px] h-[312px] object-contain' />
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div >
    )
}

export default FeaturesDetails