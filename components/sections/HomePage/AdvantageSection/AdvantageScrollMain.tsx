"use client";

import React, { useEffect, useRef } from "react";
import { gsap, snap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Icons } from "@/components/layout/common/Icons";

gsap.registerPlugin(ScrollTrigger);

function AdvantageScrollMain({ data }: any) {
    const containerRef = useRef<HTMLDivElement | null>(null);


    const bgColors = [
        {
            bgColor: {
                from: "#d1b3fd",
                to: "#f4edff"
            }
        },
        {
            bgColor: {
                from: "#21C48C",
                to: "#21C48C"
            }
        },
        {
            bgColor: {
                from: "#FCA311",
                to: "#FCA311"
            }
        },
        {
            bgColor: {
                from: "#21C48C",
                to: "#21C48C"
            }
        },
    ]

    useEffect(() => {
        const viewportWidth = window.innerWidth;

        if (viewportWidth >= 1024) {
            const timeoutId = setTimeout(() => {
                let ctx = gsap.context(() => {
                    // initial states
                    gsap.set(".scroll-img-div:not(:first-child)", {
                        clipPath: "inset(100% 0% 0% 0%)", // closed from center
                    });

                    gsap.set(".scroll-img:not(:first-child)", {
                        scale: 1,
                        transformOrigin: "bottom"
                    });

                    gsap.set(".content-item:not(:first-child)", {
                        opacity: 0,
                        // y: 50
                    });

                    // timeline
                    const animation = gsap.timeline({
                        defaults: { duration: 1, ease: "power2.inOut" },
                    });

                    // right block images
                    animation.to(".scroll-img-div:not(:first-child)", {
                        clipPath: "inset(0% 0% 0% 0%)",
                        stagger: 1,
                    }, 0)

                    // left block content opacity + position
                    animation.to(".content-item:not(:first-child)", {
                        opacity: 1,
                        // y: 0,
                        stagger: 1,
                    }, 0); // sync with images

                    (ScrollTrigger as any).create({
                        trigger: ".advantage-animation",
                        start: "top top",
                        end: "bottom bottom",
                        pin: ".rightblock",
                        animation: animation,
                        scrub: true,
                        // markers: true,


                    });
                });

                (ScrollTrigger as any).refresh();

                return () => {
                    ctx.revert();
                };
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, []);




    return (
        <div className="advantage-section font-manrope">
            <div className="bottom-animation-section">
                <div className="relative advantage-animation grid lg:grid-cols-2 grid-cols-1 lg:gap-[80px] gap-0 lg:mt-0 mt-5">
                    {/* Left Content */}
                    <div className="left 2xl:w-[85%] w-full lg:flex flex-col lg:gap-[10px] grid md:grid-cols-2 grid-cols-1 gap-[15px]">
                        {data?.map((item: any, index: any) => (
                            <div
                                key={index}
                                className="content-item lg:bg-transparent bg-[#fafafa] rounded-[10px] lg:p-0 md:p-[20px] p-[14px] flex flex-col md:gap-[10px] gap-[8px] justify-center lg:min-h-[100vh] h-fit"
                            >
                                {/* Mobile image (desktop hides this) */}
                                <div className="scroll-img-div w-full lg:h-[25vh] md:h-[21vh] h-[240px] overflow-hidden rounded-[5px] z-[2] lg:hidden block">
                                    <img src={item.image} alt={item.altImage} className="w-full h-full object-cover" />
                                </div>

                                <h3 className="text-black font-bold lg:text-[26px] md:text-[20px] text-[20px] leading-tight">
                                    {item.title}
                                </h3>
                                <p className="main-para 2xl:text-[18px] text-[16px] lg:w-[80%] w-full">
                                    {item.subTitle}
                                </p>
                                <div className="tags-items my-2">
                                    {item?.tags?.map((tagitem: any, tagindex: any) => (
                                        <div key={tagindex} className="flex items-center gap-2">
                                            <Icons.tickIconTags />
                                            <span className="font-semibold">{tagitem}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href={item?.buttonAction || 'features'} className="lg:py-2 md:py-1.5 py-1 md:px-5 px-3 bg-[#FCA311] text-white hover:bg-MainColor common-transition w-fit md:rounded-full rounded-[5px] text-[16px] font-semibold" > Learn More </Link>
                            </div>
                        ))}
                    </div>

                    {/* Right Image Block */}
                    <div className="rightblock h-screen lg:flex hidden flex-col justify-center">
                        <div className="relative w-full 2xl:h-[28vw] xl:h-[30vw] h-[25vw] overflow-hidden rounded-[20px]">
                            {data?.map((item: any, index: any) => {
                                const gradient = bgColors[index % bgColors.length].bgColor; // cycle through colors
                                return (
                                    <div
                                        key={index}
                                        className="scroll-img-div w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-[20px] z-[2] flex items-end justify-center bg-white"
                                    // style={{
                                    //     background: `linear-gradient(to top, ,${gradient.from}, ${gradient.to})`,
                                    // }}
                                    >
                                        <span
                                            className="absolute inset-0 z-[1] rounded-[20px]"
                                            style={{
                                                background: `linear-gradient(to top, ${gradient.from}, ${gradient.to}30)`,
                                            }}
                                        />
                                        <img
                                            src={item.image}
                                            alt={item.altImage}
                                            className="scroll-img relative z-2 max-w-[80%] 2xl:h-[400px] h-[380px] object-cover rounded-tl-[20px] rounded-tr-[20px]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvantageScrollMain;
