import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NUM_COLUMNS = 7;
const COOKIE_NAME = 'quinzex_preloader_seen';
const ONE_DAY_SECONDS = 86400; // 24 hours

function hasSeenPreloaderToday() {
    if (typeof document === 'undefined') return false;
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + COOKIE_NAME + '=([^;]+)'));
    return Boolean(match && match[2] === 'true');
}

function markPreloaderAsSeen() {
    if (typeof document === 'undefined') return;
    document.cookie = `${COOKIE_NAME}=true; max-age=${ONE_DAY_SECONDS}; path=/; SameSite=Lax`;
}

const MontfortPreloader = ({ onDone }) => {
    const alreadySeen = typeof window !== 'undefined' && hasSeenPreloaderToday();
    const [progress, setProgress] = useState(alreadySeen ? 100 : 0);
    const [isComplete, setIsComplete] = useState(alreadySeen);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (hasSeenPreloaderToday()) {
            setIsComplete(true);
            onDone?.();
            return;
        }

        let startTime = Date.now();
        const duration = 2000; // 2.0s smooth cinematic duration

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const rawProgress = elapsed / duration;
            const easedProgress = Math.min(100, Math.floor(Math.pow(rawProgress, 1.2) * 100));
            setProgress(easedProgress);

            if (rawProgress >= 1) {
                clearInterval(interval);
                setProgress(100);
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => {
                        markPreloaderAsSeen();
                        setIsComplete(true);
                        onDone?.();
                    }, 1000);
                }, 350);
            }
        }, 25);

        return () => clearInterval(interval);
    }, [onDone]);

    if (isComplete) return null;

    const brandLetters = ['Q', 'U', 'I', 'N', 'Z', 'E', 'X'];

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                pointerEvents: isExiting ? 'none' : 'all',
                overflow: 'hidden',
                fontFamily: "'Montserrat', sans-serif"
            }}
        >
            {/* STAGGERED VERTICAL SHUTTER CURTAIN PANELS */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}
            >
                {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: '0%' }}
                        animate={{ y: isExiting ? '-100%' : '0%' }}
                        transition={{
                            duration: 0.95,
                            delay: isExiting ? i * 0.05 : 0,
                            ease: [0.77, 0, 0.175, 1] // Luxury exponential wipe
                        }}
                        style={{
                            flex: 1,
                            height: '100%',
                            backgroundColor: i % 2 === 0 ? '#dce5ec' : '#d5e0e8',
                            borderRight: i < NUM_COLUMNS - 1 ? '1px solid rgba(15, 53, 84, 0.06)' : 'none',
                            position: 'relative'
                        }}
                    />
                ))}
            </div>

            {/* CINEMATIC CLEAN CENTER BRAND PRELOADER */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -25 : 0 }}
                transition={{ duration: 0.45, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f3554',
                    pointerEvents: 'none'
                }}
            >
                {/* CENTER STAGE: ROTATING GYROSCOPE + STAGGERED TYPOGRAPHY + GIANT COUNTER */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    {/* Rotating Gyroscope Orbit Compass Ring */}
                    <div
                        style={{
                            position: 'relative',
                            width: '170px',
                            height: '170px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '26px'
                        }}
                    >
                        {/* Outer Slow Rotating Dotted Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                border: '1px dashed rgba(15, 53, 84, 0.32)'
                            }}
                        />

                        {/* Inner Counter-Rotating Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                inset: '14px',
                                borderRadius: '50%',
                                border: '1px solid rgba(15, 53, 84, 0.16)'
                            }}
                        />

                        {/* Constellation Center Crest */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                width: '52px',
                                height: '52px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <svg viewBox="0 0 44 44" fill="none" style={{ width: '100%', height: '100%', color: '#0f3554' }}>
                                <circle cx="22" cy="13" r="3.6" fill="currentColor" />
                                <circle cx="11" cy="22" r="3.6" fill="currentColor" />
                                <circle cx="33" cy="22" r="3.6" fill="currentColor" />
                                <circle cx="15" cy="33" r="3.2" fill="currentColor" />
                                <circle cx="29" cy="33" r="3.2" fill="currentColor" />
                                <circle cx="22" cy="24" r="2.8" fill="currentColor" />
                                <circle cx="6" cy="14" r="2.2" fill="currentColor" opacity="0.6" />
                                <circle cx="38" cy="14" r="2.2" fill="currentColor" opacity="0.6" />
                                <circle cx="7" cy="30" r="2.2" fill="currentColor" opacity="0.6" />
                                <circle cx="37" cy="30" r="2.2" fill="currentColor" opacity="0.6" />
                                <circle cx="22" cy="38" r="2" fill="currentColor" opacity="0.4" />
                                <circle cx="22" cy="5" r="2" fill="currentColor" opacity="0.4" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Staggered Cinematic Character Reveal */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '14px',
                            marginBottom: '12px',
                            overflow: 'hidden'
                        }}
                    >
                        {brandLetters.map((letter, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ y: 45, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.75,
                                    delay: 0.2 + idx * 0.07,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                style={{
                                    fontSize: '34px',
                                    fontWeight: 300,
                                    letterSpacing: '0.12em',
                                    color: '#0f3554',
                                    display: 'inline-block'
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Sub-label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.65 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            letterSpacing: '0.36em',
                            textTransform: 'uppercase',
                            color: '#2d4f6e',
                            marginBottom: '32px'
                        }}
                    >
                        Strategy &amp; Design Collective
                    </motion.div>

                    {/* Architectural Counter */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '4px',
                            fontFamily: "'Montserrat', sans-serif",
                            fontVariantNumeric: 'tabular-nums'
                        }}
                    >
                        <span
                            style={{
                                fontSize: '64px',
                                fontWeight: 200,
                                letterSpacing: '-0.02em',
                                color: '#0f3554',
                                lineHeight: 1
                            }}
                        >
                            {progress.toString().padStart(2, '0')}
                        </span>
                        <span
                            style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                color: 'rgba(15, 53, 84, 0.45)',
                                letterSpacing: '0.05em'
                            }}
                        >
                            %
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MontfortPreloader;
