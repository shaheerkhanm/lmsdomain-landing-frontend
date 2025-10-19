"use client"
import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam";
import MainTitle from "@/components/layout/common/MainTitle";
const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex overflow-hidden size-[80px] items-center justify-center rounded-full border-1 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            {children}
        </div>
    )
})
Circle.displayName = "Circle"

export function IntegrationBeamEffects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const div1Ref = useRef<HTMLDivElement>(null)
    const div2Ref = useRef<HTMLDivElement>(null)
    const div3Ref = useRef<HTMLDivElement>(null)
    const div4Ref = useRef<HTMLDivElement>(null)
    const div5Ref = useRef<HTMLDivElement>(null)
    const div6Ref = useRef<HTMLDivElement>(null)
    const div7Ref = useRef<HTMLDivElement>(null)
    const div8Ref = useRef<HTMLDivElement>(null)
    const div9Ref = useRef<HTMLDivElement>(null)
    const div10Ref = useRef<HTMLDivElement>(null)
    const div11Ref = useRef<HTMLDivElement>(null)
    const div12Ref = useRef<HTMLDivElement>(null)
    const div13Ref = useRef<HTMLDivElement>(null)
    const div14Ref = useRef<HTMLDivElement>(null)
    return (
        <div
            className="main-padding relative !m-0 flex h-full w-full items-center justify-center overflow-hidden p-10"
            ref={containerRef}
        >
            <div className="2xl:px-20 xl:px-40 px-0 flex size-full max-w-full flex-col items-stretch justify-between gap-15">
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div1Ref}>
                        <img src="assets/img/integration/integration-1.png" alt="" className="size-[40px]" />
                    </Circle>
                    <Circle ref={div5Ref}>
                        <img src="assets/img/integration/integration-2.png" alt="" className="size-[40px]" />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div2Ref}>
                        <img src="assets/img/integration/integration-3.png" alt="" className="size-[40px]" />
                    </Circle>
                    <div ref={div4Ref} className="size-[200px] flex items-center border-t border-MainColor justify-center bg-gradient-to-b from-[#222748] to-[#1B1F3B] rounded-full z-1 text-white p-4">
                        <div className={`bg-[#ffffff09] size-[150px] flex items-center justify-center rounded-full relative border-b border-b-[#FFFFFF30]`}>
                            <h2 className="font-bold text-center leading-[20px] text-[18px]">LMS DOMAIN</h2>
                        </div>
                    </div>
                    <Circle ref={div6Ref}>
                        <img src="assets/img/integration/integration-4.png" alt="" className="size-[40px]" />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div3Ref}>
                        <img src="assets/img/integration/integration-5.png" alt="" className="size-[40px]" />
                    </Circle>
                    <Circle ref={div7Ref}>
                        <img src="assets/img/integration/integration-6.png" alt="" className="size-[40px]" />
                    </Circle>
                </div>
            </div>
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-190}
                endYOffset={0}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={190}
                endYOffset={0}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-190}
                endYOffset={0}
                reverse
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={190}
                endYOffset={0}
                reverse
            />

            <div className="absolute z-1 py-[50px] left-1/2 top-1/2 -translate-1/2 flex size-full xl:max-w-3/8 max-w-3/6 flex-col items-stretch justify-center gap-25">
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div8Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-7.png" alt="" className="size-[30px]" />
                    </Circle>
                    <Circle ref={div12Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-8.png" alt="" className="size-[30px]" />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div9Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-9.png" alt="" className="size-[30px]" />
                    </Circle>
                    {/* <Circle ref={div11Ref} className="size-16">
                        <Icons.openai />
                    </Circle> */}
                    <Circle ref={div13Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-10.png" alt="" className="size-[30px]" />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div10Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-11.png" alt="" className="size-[30px]" />
                    </Circle>
                    <Circle ref={div14Ref} className="size-[60px]">
                        <img src="assets/img/integration/integration-12.png" alt="" className="size-[30px]" />
                    </Circle>
                </div>
            </div>
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div8Ref}
                toRef={div4Ref}
                curvature={-150}
                endYOffset={0}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div9Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div10Ref}
                toRef={div4Ref}
                curvature={150}
                endYOffset={0}
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div12Ref}
                toRef={div4Ref}
                curvature={-150}
                endYOffset={0}
                reverse
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div13Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                gradientStartColor="#6C4BFF50"
                gradientStopColor="#6C4BFF"
                containerRef={containerRef}
                fromRef={div14Ref}
                toRef={div4Ref}
                curvature={150}
                endYOffset={0}
                reverse
            />
        </div>
    )
}

