"use client";

import { ReactLenis } from 'lenis/react';

function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.1,
                smoothWheel: true,
                smoothTouch: false,
                infinite: false,
                preventDefault: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;
