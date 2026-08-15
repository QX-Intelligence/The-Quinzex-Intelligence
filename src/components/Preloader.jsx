import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

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

export default function Preloader({ onDone }) {
    const alreadySeen = typeof window !== 'undefined' && hasSeenPreloaderToday();
    const [phase, setPhase] = useState(alreadySeen ? 'exit' : 'intro'); // 'intro' | 'exit'
    const [isComplete, setIsComplete] = useState(alreadySeen);

    // Timings in seconds (slowed down for a majestic, luxurious feel)
    const TOP_BAR_DURATION   = 1.3;   // Slow horizontal beam draw
    const LETTER_STAGGER     = 0.38;  // Clear, elegant pause between letters
    const FIRST_LETTER_DELAY = TOP_BAR_DURATION + 0.2;
    
    // 7 letters: Q, u, i, n, Z, e, x
    const TOTAL_LETTERS = 7;
    const LAST_LETTER_TIME = FIRST_LETTER_DELAY + (TOTAL_LETTERS - 1) * LETTER_STAGGER + 0.75;
    const EXIT_TIME        = LAST_LETTER_TIME + 1.4; // Pause to display completed logo
    const DONE_TIME        = EXIT_TIME + 0.8;

    useEffect(() => {
        if (hasSeenPreloaderToday()) {
            setIsComplete(true);
            onDone?.();
            return;
        }

        const t1 = setTimeout(() => setPhase('exit'), EXIT_TIME * 1000);
        const t2 = setTimeout(() => {
            markPreloaderAsSeen();
            setIsComplete(true);
            onDone?.();
        }, DONE_TIME * 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onDone]);

    if (isComplete) return null;

    const isExiting = phase === 'exit';

    // Sliced letter columns with 1px overlap to prevent sub-pixel cracked gaps
    const letters = [
        { id: 'q', src: '/preloader/q_4k.png', left: 0,   width: 130 },
        { id: 'u', src: '/preloader/u_4k.png', left: 129, width: 101 },
        { id: 'i', src: '/preloader/i_4k.png', left: 229, width: 42  },
        { id: 'n', src: '/preloader/n_4k.png', left: 270, width: 113 },
        { id: 'z', src: '/preloader/z_4k.png', left: 382, width: 104 },
        { id: 'e', src: '/preloader/e_4k.png', left: 485, width: 102 },
        { id: 'x', src: '/preloader/x_4k.png', left: 586, width: 107 },
    ];

    const CANVAS_W = 692;
    const CANVAS_H = 165;
    const BAR_H    = 12; // Reduced height of the top line

    const node = (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2147483647,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                pointerEvents: isExiting ? 'none' : 'all',
            }}
        >
            {/* 692 x 165 Canvas Aspect Container - unified outline filter on parent */}
            <div style={{
                position: 'relative',
                width: '85%',
                maxWidth: '780px',
                aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
                userSelect: 'none',
                // Added 0.5px blur to make the outline border smooth and anti-aliased
                filter: 'drop-shadow(1.5px 0px 0.5px #ede7df) drop-shadow(-1.5px 0px 0.5px #ede7df) drop-shadow(0px 1.5px 0.5px #ede7df) drop-shadow(0px -1.5px 0.5px #ede7df)',
            }}>
                {/* ① TOP HORIZONTAL BAR - Renders first horizontally */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${(BAR_H / CANVAS_H) * 100}%`,
                    overflow: 'hidden',
                }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: TOP_BAR_DURATION,
                            ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier
                        }}
                        style={{
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src="/preloader/bar_4k.png"
                            alt="QuinZex Top Bar"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                objectFit: 'fill',
                                imageRendering: 'crisp-edges',
                            }}
                        />
                    </motion.div>
                </div>

                {/* ② LETTER-BY-LETTER DROP ANIMATION UNDER TOP BAR */}
                {/* Letters container starts at BAR_H - 1.5px with overflow: hidden to clip the top flat edge of the letters behind the top bar */}
                <div style={{
                    position: 'absolute',
                    top: `${((BAR_H - 1.5) / CANVAS_H) * 100}%`,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                }}>
                    {letters.map((letter, index) => (
                        <div
                            key={letter.id}
                            style={{
                                position: 'absolute',
                                top: 0, // Aligned to the top of the container
                                left: `${(letter.left / CANVAS_W) * 100}%`,
                                width: `${(letter.width / CANVAS_W) * 100}%`,
                                height: '100%',
                            }}
                        >
                            <motion.img
                                src={letter.src}
                                alt={`QuinZex ${letter.id}`}
                                initial={{ y: '-100%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                transition={{
                                    delay: FIRST_LETTER_DELAY + index * LETTER_STAGGER,
                                    duration: 0.75,
                                    ease: [0.25, 1, 0.5, 1], // Unhurried smooth drop
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                    objectFit: 'fill',
                                    imageRendering: 'crisp-edges',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(node, document.body);
}
