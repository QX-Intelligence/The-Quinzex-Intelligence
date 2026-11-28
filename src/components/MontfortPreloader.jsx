import React, { useEffect, useRef, useState } from 'react';
import MontfortPreloaderDesktop from './MontfortPreloaderDesktop';
import MontfortPreloaderMobile from './MontfortPreloaderMobile';

const NUM_COLUMNS = 7;
const COOKIE_NAME = 'quinzex_preloader_seen';
const ONE_DAY_SECONDS = 86400; // 24 hours
const BRAND_LETTERS = ['Q', 'U', 'I', 'N', 'Z', 'E', 'X'];

const CREST_NODES = [
    [22, 13, 3.6, 1],
    [11, 22, 3.6, 1],
    [33, 22, 3.6, 1],
    [15, 33, 3.2, 1],
    [29, 33, 3.2, 1],
    [22, 24, 2.8, 1],
    [6, 14, 2.2, 0.6],
    [38, 14, 2.2, 0.6],
    [7, 30, 2.2, 0.6],
    [37, 30, 2.2, 0.6],
    [22, 38, 2, 0.4],
    [22, 5, 2, 0.4]
];

function hasSeenPreloaderToday() {
    if (typeof document === 'undefined') return false;
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + COOKIE_NAME + '=([^;]+)'));
    return Boolean(match && match[2] === 'true');
}

function markPreloaderAsSeen() {
    if (typeof document === 'undefined') return;
    document.cookie = `${COOKIE_NAME}=true; max-age=${ONE_DAY_SECONDS}; path=/; SameSite=Lax`;
}

/**
 * Coordinates preloader progress/cookie state and dispatches either the pure-CSS
 * mobile preloader (<= 1024px) or the Framer Motion desktop preloader (> 1024px).
 */
const MontfortPreloader = ({ onDone }) => {
    const alreadySeen = typeof window !== 'undefined' && hasSeenPreloaderToday();
    const [isMobile] = useState(
        () => typeof window !== 'undefined' && window.innerWidth <= 1024
    );
    const [isComplete, setIsComplete] = useState(alreadySeen);
    const [isExiting, setIsExiting] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        if (hasSeenPreloaderToday()) {
            setIsComplete(true);
            onDone?.();
            return;
        }

        const startTime = performance.now();
        const duration = 2000;
        let rafId = null;
        let exitTimer = null;
        let doneTimer = null;
        let lastDisplayed = -1;

        const tick = (now) => {
            const elapsed = now - startTime;
            const rawProgress = Math.min(1, elapsed / duration);
            const easedProgress = Math.min(100, Math.floor(Math.pow(rawProgress, 1.2) * 100));

            if (easedProgress !== lastDisplayed && counterRef.current) {
                lastDisplayed = easedProgress;
                counterRef.current.textContent = easedProgress.toString().padStart(2, '0');
            }

            if (rawProgress < 1) {
                rafId = requestAnimationFrame(tick);
            } else {
                if (counterRef.current) counterRef.current.textContent = '100';
                exitTimer = setTimeout(() => {
                    setIsExiting(true);
                    doneTimer = setTimeout(() => {
                        markPreloaderAsSeen();
                        setIsComplete(true);
                        onDone?.();
                    }, 1000);
                }, 350);
            }
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (exitTimer) clearTimeout(exitTimer);
            if (doneTimer) clearTimeout(doneTimer);
        };
    }, [onDone]);

    if (isComplete) return null;

    const crest = (
        <svg viewBox="0 0 44 44" fill="none" style={{ width: '100%', height: '100%', color: '#0f3554' }}>
            {CREST_NODES.map(([cx, cy, r, opacity], idx) => (
                <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="currentColor"
                    opacity={opacity < 1 ? opacity : undefined}
                />
            ))}
        </svg>
    );

    const PreloaderView = isMobile ? MontfortPreloaderMobile : MontfortPreloaderDesktop;

    return (
        <PreloaderView
            numColumns={NUM_COLUMNS}
            brandLetters={BRAND_LETTERS}
            crest={crest}
            isExiting={isExiting}
            counterRef={counterRef}
        />
    );
};

export default MontfortPreloader;
