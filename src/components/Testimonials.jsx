import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

const Testimonials = () => {
    const testimonials = [
        {
            text: `"Quinzex Intelligence transformed not just our website — they transformed how the market perceives us. Within 3 months of the rebrand, we closed two enterprise deals that had previously stalled for over a year."`,
            avatar: "JK",
            name: "James Kroft",
            role: "CEO, NexaFlow AI"
        },
        {
            text: `"Working with Quinzex felt like having a world-class in-house team. They understood our product deeply, challenged our assumptions, and delivered a digital experience that actually reflects what we've built."`,
            avatar: "SR",
            name: "Sara Reyes",
            role: "Founder, Orbis SaaS"
        },
        {
            text: `"The ROI was undeniable. Our user activation rate jumped 60%, and our sales cycle shortened by 30%. Quinzex aren't a vendor — they're a strategic growth partner."`,
            avatar: "MC",
            name: "Marcus Chen",
            role: "CTO, Vaultex Fintech"
        }
    ];

    const total = testimonials.length;
    // Clone array: [...originals, ...originals, ...originals] — start at index 'total' (middle set)
    const cloned = [...testimonials, ...testimonials, ...testimonials];
    
    const SLIDE_W_REM = 26.6875;
    const GAP_REM = 2;
    const STEP = SLIDE_W_REM + GAP_REM; // rem per slide

    // Start at the middle set so we can go backwards too
    const [index, setIndex] = useState(total);
    const [animate, setAnimate] = useState(true);
    const intervalRef = useRef(null);

    // Derived progress: map index to 0-n for the indicator
    const displayIndex = ((index % total) + total) % total;
    const progressPercent = ((displayIndex + 1) / total) * 100;

    const goTo = useCallback((newIndex, shouldAnimate = true) => {
        setAnimate(shouldAnimate);
        setIndex(newIndex);
    }, []);

    const next = useCallback(() => {
        setIndex(prev => prev + 1);
        setAnimate(true);
    }, []);

    const prev = useCallback(() => {
        setIndex(prev => prev - 1);
        setAnimate(true);
    }, []);

    // After animation ends, silently snap back to middle set to enable infinite scroll
    const handleAnimationComplete = useCallback(() => {
        // If we've gone past the last clone set, snap back to middle
        if (index >= total * 2) {
            setAnimate(false);
            setIndex(index - total);
        }
        // If we've gone before the first clone set, snap forward to middle
        if (index < total) {
            setAnimate(false);
            setIndex(index + total);
        }
    }, [index, total]);

    // Autoplay
    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            next();
        }, 5000);
    }, [next]);

    useEffect(() => {
        startAutoplay();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [startAutoplay]);

    const handleManualNext = () => { next(); startAutoplay(); };
    const handleManualPrev = () => { prev(); startAutoplay(); };

    return (
        <section className="section is-whitebg is-of">
            <div className="w-layout-blockcontainer container w-container">
                <div className="testimonials-wrapper">
                    
                    <motion.div 
                        className="grid-nopad-home w-layout-grid" 
                        style={{ paddingTop: 0 }}
                        initial={{ opacity: 0, y: '1.5rem' }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.12 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="sect-dot-flex w-layout-hflex">
                            <div className="dot"></div>
                            <div>What clients say</div>
                        </div>
                        <h2 id="testim-h2">Real results from real leaders who closed the gap.</h2>
                    </motion.div>

                    <div className="testimonials-slider-wrapper" id="testim-slider">
                        
                        {/* Outer clipping shell */}
                        <div style={{ overflow: 'hidden', width: '100%' }}>
                            <motion.div 
                                className="swiper-wrapper-custom"
                                animate={{ x: `-${index * STEP}rem` }}
                                transition={animate 
                                    ? { duration: 0.55, ease: [0.4, 0, 0.2, 1] } 
                                    : { duration: 0 }
                                }
                                onAnimationComplete={handleAnimationComplete}
                                drag="x"
                                dragConstraints={{ right: 0, left: -(cloned.length - 1) * STEP * 16 }}
                                onDragEnd={(event, info) => {
                                    const threshold = 50;
                                    if (info.offset.x < -threshold) {
                                        handleManualNext();
                                    } else if (info.offset.x > threshold) {
                                        handleManualPrev();
                                    }
                                }}
                            >
                                {cloned.map((testim, idx) => (
                                    <div key={idx} className="slide-testim">
                                        <p className="p-testim">{testim.text}</p>
                                        <div className="h-flex-btw w-layout-hflex">
                                            <div className="h-flex-testim-name w-layout-hflex">
                                                <div className="h-testim-img testim-avatar">{testim.avatar}</div>
                                                <div className="v-flex-testim-name w-layout-vflex">
                                                    <div className="testim-client-name">{testim.name}</div>
                                                    <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.875rem' }}>{testim.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Slider controls */}
                        <div className="nav-flex-wap w-layout-hflex">
                            <div className="swiper-drag-wrapper is-testim">
                                <div 
                                    className="swiper-drag is-testim" 
                                    id="testim-drag"
                                    style={{ 
                                        width: `${progressPercent}%`,
                                        transition: 'width 0.4s ease'
                                    }}
                                />
                            </div>
                            <div className="h-flex-arrows-wrap w-layout-hflex">
                                <div 
                                    className="arrow-slider is-grey" 
                                    id="testim-prev"
                                    onClick={handleManualPrev}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div 
                                    className="arrow-slider is-grey" 
                                    id="testim-next"
                                    onClick={handleManualNext}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
