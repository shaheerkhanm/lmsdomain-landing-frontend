// 'use client'

// import React from 'react'
// import MainTitle from '@/components/layout/common/MainTitle'
// import { motion, MotionProps } from "motion/react"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'

// function FaqAccordion({ data, faqData }: any) {
//     return (
//         <div>
//             <motion.div
//                 initial={{ x: 40, opacity: 0, scale: 0.9 }}
//                 whileInView={{ x: 0, opacity: 1, scale: 1 }}
//                 transition={{ delay: 0, duration: .3, type: "tween", stiffness: 300, damping: 20 }}
//                 className='main-padding faq-section'>
//                 <MainTitle title={data?.title || 'Frequently Asked Questions'} h2ClassName={'text-center 2xl:mb-10 mb-5'} divClassName={''} />
//                 <Accordion type="single" collapsible defaultValue={faqData?.[0]}>
//                     {faqData?.map((faqItem: any, index: any) => (
//                         <AccordionItem
//                             key={index}
//                             value={index}
//                             className={`data-[state=open]:opacity-100 opacity-30 transition-all duration-200 flex gap-10 border md:py-3 py-2 md:px-5 px-4 ${index === faqData.length - 1 ? '!border-b-1' : ' !border-b-1'}`}>
//                             <span className='text-[48px] font-bold text-[#9D96A8] md:block hidden'>
//                                 {String(index + 1).padStart(2, '0')}
//                             </span>
//                             <div className="flex flex-col items-start w-full">
//                                 <AccordionTrigger className='text-black text w-[50%] flex items-center justify-between 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] leading-tight font-bold hover:no-underline cursor-pointer'>
//                                     <div className="flex items-center gap-10">
//                                         <span>
//                                             {faqItem?.question}
//                                         </span>
//                                     </div>
//                                 </AccordionTrigger>
//                                 <AccordionContent className='text-[#5A5365] 2xl:text-[20px] xl:text-[18px] text-[16px]'>
//                                     {faqItem?.answer}
//                                 </AccordionContent>
//                             </div>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </motion.div>
//         </div>
//     )
// }

// export default FaqAccordion