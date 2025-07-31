'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

function HeadingAnimateText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = ['Build', 'Inspire', 'Grow'];
    const colors = ['#FFD700', '#9400D3', '#00CED1']; // yellow, violet, dark cyan

    useEffect(() => {
        if (!containerRef.current) return;

        let splitInstances: SplitType[] = [];
        let currentIndex = 0;
        let animationTimeline: gsap.core.Timeline | null = null;

        const initAnimation = () => {
            animationTimeline?.kill();
            splitInstances.forEach(instance => instance.revert());
            splitInstances = [];

            const spans = containerRef.current!.querySelectorAll('span');
            
            // Hide all spans initially
            gsap.set(spans, { 
                opacity: 0,
                display: 'none' // Hide completely to prevent layout shift
            });

            // Show only current span
            gsap.set(spans[currentIndex], { 
                opacity: 1,
                display: 'inline-block'
            });

            const splitText = new SplitType(spans[currentIndex] as HTMLElement, {
                types: 'chars',
                tagName: 'span'
            });

            splitInstances.push(splitText);

            gsap.set(splitText.chars as HTMLElement[], {
                opacity: 0,
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
                    // Hide the element completely after animation
                    const spans = containerRef.current!.querySelectorAll('span');
                    gsap.set(spans[currentIndex], { display: 'none' });
                }
            });
        };

        initAnimation();

        return () => {
            animationTimeline?.kill();
            splitInstances.forEach(instance => instance.revert());
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="text-center w-75 overflow-hidden"
            style={{
                // height: '5vw' // Fixed height to prevent layout shift
            }}
        >
            {words.map((word, index) => (
                <span
                    key={index}
                    className="align-top"
                    style={{
                        // fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 'bold',
                        lineHeight: '1.2',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}

export default HeadingAnimateText;