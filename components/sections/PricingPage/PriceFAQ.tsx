
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MainTitle from '@/components/layout/common/MainTitle';
import { motion } from "motion/react"
import { fetchData } from '@/utils/api';
import { apiRoutes } from '@/utils/api/apiRoutes';


// const faqData = [
//     {
//         id: "item-1",
//         question: "Alright, but what exactly do you do?",
//         answer: "As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design."
//     },
//     {
//         id: "item-2",
//         question: "I don’t need a brand strategist but I need help executing an upcoming campaign. Can we still work together?",
//         answer: "Absolutely! We can jump in at any stage of the process. Whether you need a full-funnel strategy or just some help with creative execution, we’re here for you."
//     },
//     {
//         id: "item-3",
//         question: "Are your rates competitive?",
//         answer: "We pride ourselves on offering top-tier creative work at competitive rates. Our pricing is structured to provide value, ensuring you get the best return on your investment."
//     },
//     {
//         id: "item-4",
//         question: "Why do you have a monthly project cap?",
//         answer: "Our monthly project cap ensures that every client receives the focused attention and high-quality work they deserve. It allows us to maintain our standards and deliver exceptional results without compromise."
//     }
// ];



async function PriceFAQ({ data }: any) {

    const getData = async (slug: string) => {
        try {
            const location = process.env.BACKEND_URL + apiRoutes?.getFaq
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
    const faqData = await getData("");

    return (
        <div
            className='main-padding faq-section'>
            <MainTitle title={data?.title || 'Frequently Asked Questions'} h2ClassName={'text-center 2xl:mb-10 mb-5'} divClassName={''} />
            <Accordion type="single" collapsible defaultValue="0">
                {faqData?.map((faqItem: any, index: any) => (
                    <AccordionItem
                        key={index}
                        value={index.toString()}
                        className={`data-[state=open]:opacity-100 opacity-30 transition-all duration-200 flex gap-8 border md:py-3 py-2 md:px-5 px-4 ${index === faqData.length - 1 ? '!border-b-1' : ' !border-b-1'}`}>
                        <span className='text-[48px] font-bold min-w-[60px] max-w-[60px] text-[#9D96A8] md:block hidden'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col items-start w-full">
                            <AccordionTrigger className='text-black text w-[50%] flex items-center justify-between 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] leading-tight font-bold hover:no-underline cursor-pointer'>
                                <div className="flex items-center gap-10">
                                    <span>
                                        {faqItem.question}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='text-[#5A5365] 2xl:text-[20px] xl:text-[18px] text-[16px]'>
                                {faqItem.answer}
                            </AccordionContent>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default PriceFAQ