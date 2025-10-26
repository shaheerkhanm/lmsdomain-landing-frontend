'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

function HeadingAnimateText({ data }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tempMeasureRef = useRef<HTMLDivElement>(null);
    const words = data?.tags;
    const colors = ['#6C4BFF', '#FCA311', '#21C48C']; // yellow, violet, dark cyan

    useEffect(() => {
        if (!containerRef.current || !tempMeasureRef.current) return;

        let splitInstances: SplitType[] = [];
        let currentIndex = 0;
        let animationTimeline: gsap.core.Timeline | null = null;

        const measureWordWidth = (word: string) => {
            const tempEl = tempMeasureRef.current!;
            tempEl.innerText = word;
            return tempEl.offsetWidth;
        };

        const initAnimation = () => {
            animationTimeline?.kill();
            splitInstances.forEach(instance => instance.revert());
            splitInstances = [];

            const spans = containerRef.current!.querySelectorAll('span');

            // Animate container width to match next word
            const nextWidth = measureWordWidth(words[currentIndex]);
            gsap.to(containerRef.current, {
                width: nextWidth,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Hide all spans initially
            gsap.set(spans, { opacity: 0, display: 'none' });

            // Show only current span
            gsap.set(spans[currentIndex], { opacity: 1, display: 'inline-block' });

            const splitText = new SplitType(spans[currentIndex] as HTMLElement, {
                types: 'chars',
                tagName: 'span'
            });

            splitInstances.push(splitText);

            gsap.set(splitText.chars as HTMLElement[], {
                opacity: 0,
                // filter: "blur(10px)",
                scale: 0,
                rotate: 50,
                y: 20,
                color: colors[currentIndex]
            });

            animationTimeline = gsap.timeline({
                onComplete: () => {
                    setTimeout(animateOut, 1500);
                }
            });

            animationTimeline.to(splitText.chars as HTMLElement[], {
                opacity: 1,
                // filter: "blur(0px)",
                scale: 1,
                rotate: 0,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'back.out'
            });
        };

        const animateOut = () => {
            const currentSplit = splitInstances[splitInstances.length - 1];

            animationTimeline = gsap.timeline({
                onComplete: () => {
                    currentIndex = (currentIndex + 1) % words.length;
                    initAnimation();
                }
            });

            animationTimeline.to(currentSplit.chars as HTMLElement[], {
                opacity: 0,
                y: -20,
                duration: 0.4,
                stagger: 0.02,
                ease: 'back.in',
                onComplete: () => {
                    const spans = containerRef.current!.querySelectorAll('span');
                    gsap.set(spans[currentIndex], { display: 'none' });
                }
            });
        };

        // Set initial width
        gsap.set(containerRef.current, { width: measureWordWidth(words[0]) });

        initAnimation();

        return () => {
            animationTimeline?.kill();
            splitInstances.forEach(instance => instance.revert());
        };
    }, []);

    return (
        <>
            {/* Hidden element for measuring text width */}
            <div
                ref={tempMeasureRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                }}
            />

            {/* Animated container */}
            <div
                ref={containerRef}
                className="text-end w-fit overflow-hidden pe-5"
                style={{ display: 'inline-block' }}
            >
                {words.map((word: any, index: any) => (
                    <span
                        key={index}
                        className="align-top"
                        style={{
                            fontWeight: 'bold',
                            lineHeight: '1.2',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </>
    );
}

export default HeadingAnimateText;
