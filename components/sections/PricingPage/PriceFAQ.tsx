import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MainTitle from '@/components/layout/common/MainTitle';

const faqData = [
    {
        id: "item-1",
        question: "Alright, but what exactly do you do?",
        answer: "As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design."
    },
    {
        id: "item-2",
        question: "I don’t need a brand strategist but I need help executing an upcoming campaign. Can we still work together?",
        answer: "Absolutely! We can jump in at any stage of the process. Whether you need a full-funnel strategy or just some help with creative execution, we’re here for you."
    },
    {
        id: "item-3",
        question: "Are your rates competitive?",
        answer: "We pride ourselves on offering top-tier creative work at competitive rates. Our pricing is structured to provide value, ensuring you get the best return on your investment."
    },
    {
        id: "item-4",
        question: "Why do you have a monthly project cap?",
        answer: "Our monthly project cap ensures that every client receives the focused attention and high-quality work they deserve. It allows us to maintain our standards and deliver exceptional results without compromise."
    }
];

function PriceFAQ() {
    return (
        <div className='main-padding'>
            <MainTitle title={'Frequently Asked Questions'} h2ClassName={'text-center 2xl:mb-10 mb-5'} divClassName={''} />
            <Accordion type="single" collapsible defaultValue={faqData[0].id}>
                {faqData.map((faqItem, index) => (
                    <AccordionItem
                        key={faqItem.id}
                        value={faqItem.id}
                        className={`data-[state=open]:opacity-100 opacity-30 transition-all duration-200 flex gap-10 border py-3 px-5 ${index === faqData.length - 1 ? '!border-b-1' : ' !border-b-1'}`}>
                        <span className='text-[48px] font-bold text-[#9D96A8]'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col items-start">
                            <AccordionTrigger className='text-black text w-[50%] flex items-center justify-between 2xl:text-[24px] xl:text-[22px] text-[20px] font-bold hover:no-underline cursor-pointer'>
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