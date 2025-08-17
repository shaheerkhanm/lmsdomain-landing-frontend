"use client";

import { ReactLenis } from 'lenis/react';

function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.001, // Lower value for smoother interpolation
                duration: 1, // Increase duration for a more relaxed scroll animation
                smoothWheel: true, // Enable smoother wheel scrolling
                smoothTouch: true, // Enable smooth scrolling on touch devices
                infinite: false,
                preventDefault: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;
