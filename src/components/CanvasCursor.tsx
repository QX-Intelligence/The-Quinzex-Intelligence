'use client';

import useCanvasCursor from '../hooks/use-canvasCursor';

const CanvasCursor = () => {
    // Basic mobile/tablet detection
    if (typeof window !== 'undefined') {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmall = window.innerWidth <= 1024;
        if (isTouch || isSmall) return null;
    }

    useCanvasCursor();

    return (
        <canvas
            className='pointer-events-none fixed inset-0 z-[9998]'
            id='canvas'
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9998 /* Below TargetCursor (9999) */
            }}
        />
    );
};

export default CanvasCursor;
