import React, { useState, useEffect, useRef } from 'react';
import MontfortContact from './MontfortContact';
import Link from './Link';

const MontfortSections = ({ onScrollToChapter }) => {
    const trackRef = useRef(null);
    const stageRef = useRef(null);
    const scrollPromptRef = useRef(null);
    const projectCarouselRef = useRef(null);
    
    // 1-to-4 Split Animation Refs
    const capCard0Ref = useRef(null);
    const capCard1Ref = useRef(null);
    const capCard2Ref = useRef(null);
    const capCard3Ref = useRef(null);

    // Team Parallax Refs
    const teamCard0Ref = useRef(null);
    const teamCard1Ref = useRef(null);
    const teamCard2Ref = useRef(null);
    const teamCard3Ref = useRef(null);

    // Slide element refs for direct 60fps/120fps hardware-accelerated transform updates
    const slide0Ref = useRef(null);
    const slide1Ref = useRef(null);
    const slide2Ref = useRef(null);
    const slide3Ref = useRef(null);
    const slide4Ref = useRef(null);
    const slide5Ref = useRef(null);

    // High-performance scroll-driven slide positioning (ZERO CPU work when idle)
    useEffect(() => {
        let ticking = false;
        let lastScrollY = -1;

        const applySlideStyles = (el, progress, enterStart, enterEnd, exitStart, exitEnd) => {
            if (!el) return;

            let opacity = 0;
            let y = 32;
            let scale = 0.97;

            if (progress < enterStart) {
                opacity = 0;
                y = 32;
                scale = 0.96;
            } else if (progress >= enterStart && progress < enterEnd) {
                // Dissolving in
                const t = (progress - enterStart) / (enterEnd - enterStart);
                opacity = t;
                y = 32 * (1 - t);
                scale = 0.96 + 0.04 * t;
            } else if (progress >= enterEnd && progress <= exitStart) {
                // Fully visible
                opacity = 1;
                y = 0;
                scale = 1;
            } else if (progress > exitStart && progress <= exitEnd) {
                // Dissolving out
                const t = (progress - exitStart) / (exitEnd - exitStart);
                opacity = 1 - t;
                y = -32 * t;
                scale = 1 - 0.04 * t;
            } else {
                opacity = 0;
                y = -32;
                scale = 0.96;
            }

            const isVisible = opacity > 0.01;
            el.style.opacity = opacity;
            el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
            el.style.pointerEvents = isVisible ? 'auto' : 'none';
            el.style.visibility = isVisible ? 'visible' : 'hidden';
        };

        const updateScroll = () => {
            if (!trackRef.current) return;
            
            const isDesktop = window.innerWidth > 1024;
            const scrollY = window.scrollY || window.pageYOffset || 0;
            if (scrollY === lastScrollY) return;
            lastScrollY = scrollY;

            const rect = trackRef.current.getBoundingClientRect();
            const trackHeight = trackRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollDist = Math.max(1, trackHeight - windowHeight);
            const p = Math.max(0, Math.min(1, -rect.top / scrollDist));

            // Dynamically manage stage transform: pinned inside track, smoothly scrolls up to reveal footer at the end
            if (stageRef.current) {
                if (rect.bottom < windowHeight) {
                    stageRef.current.style.transform = `translate3d(0, ${(rect.bottom - windowHeight).toFixed(1)}px, 0)`;
                    stageRef.current.style.opacity = Math.max(0, Math.min(1, rect.bottom / windowHeight)).toFixed(2);
                } else if (rect.top > 0) {
                    stageRef.current.style.transform = `translate3d(0, ${rect.top.toFixed(1)}px, 0)`;
                    stageRef.current.style.opacity = '1';
                } else {
                    stageRef.current.style.transform = 'translate3d(0, 0, 0)';
                    stageRef.current.style.opacity = '1';
                }
            }

            // Direct DOM class toggle without React re-render
            if (scrollPromptRef.current) {
                scrollPromptRef.current.classList.toggle('faded', p > 0.07);
            }

            // 6 Clean Non-Overlapping Cinematic Slide Ranges (Active on all screens for Option B)
            applySlideStyles(slide0Ref.current, p, 0.00, 0.00, 0.10, 0.15);
            applySlideStyles(slide1Ref.current, p, 0.15, 0.20, 0.28, 0.33);
            applySlideStyles(slide2Ref.current, p, 0.33, 0.38, 0.46, 0.51);
            applySlideStyles(slide3Ref.current, p, 0.51, 0.56, 0.72, 0.77);
            applySlideStyles(slide4Ref.current, p, 0.77, 0.82, 0.88, 0.93);
            applySlideStyles(slide5Ref.current, p, 0.93, 0.97, 1.00, 1.00);

            // Capabilities (Slide 2): 1-to-4 Card Animation
            if (capCard0Ref.current && capCard1Ref.current && capCard2Ref.current && capCard3Ref.current) {
                const startP = 0.34;
                const endP = 0.45;
                let splitProgress = 0;
                
                if (p <= startP) splitProgress = 0;
                else if (p >= endP) splitProgress = 1;
                else splitProgress = (p - startP) / (endP - startP);

                const easeOut = 1 - Math.pow(1 - splitProgress, 3);
                
                if (isDesktop) {
                    // Desktop / Laptops: 100% UNTOUCHED horizontal split
                    capCard0Ref.current.style.transform = `translate3d(${(-369 * easeOut).toFixed(1)}px, ${(20 * easeOut).toFixed(1)}px, 0) rotate(${(-6 * easeOut).toFixed(2)}deg)`;
                    capCard1Ref.current.style.transform = `translate3d(${(-127 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(-2 * easeOut).toFixed(2)}deg)`;
                    capCard2Ref.current.style.transform = `translate3d(${(127 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(2 * easeOut).toFixed(2)}deg)`;
                    capCard3Ref.current.style.transform = `translate3d(${(369 * easeOut).toFixed(1)}px, ${(20 * easeOut).toFixed(1)}px, 0) rotate(${(6 * easeOut).toFixed(2)}deg)`;
                } else if (window.innerWidth <= 768) {
                    // Mobile: Vertical Stacked Deck Animation (Full remaining height in bottom)
                    const availableH = Math.min(560, Math.max(340, window.innerHeight - 170));
                    const maxSpan = Math.max(260, availableH - 105);
                    const step = maxSpan / 3;
                    const card0Y = -step * 1.5 * easeOut;
                    const card1Y = -step * 0.5 * easeOut;
                    const card2Y = step * 0.5 * easeOut;
                    const card3Y = step * 1.5 * easeOut;

                    capCard0Ref.current.style.transform = `translate3d(0, ${card0Y.toFixed(1)}px, 0) scale(${(0.96 + 0.04 * easeOut).toFixed(3)}) rotate(${(-2.0 * (1 - easeOut)).toFixed(1)}deg)`;
                    capCard1Ref.current.style.transform = `translate3d(0, ${card1Y.toFixed(1)}px, 0) scale(${(0.97 + 0.03 * easeOut).toFixed(3)}) rotate(${(1.4 * (1 - easeOut)).toFixed(1)}deg)`;
                    capCard2Ref.current.style.transform = `translate3d(0, ${card2Y.toFixed(1)}px, 0) scale(${(0.98 + 0.02 * easeOut).toFixed(3)}) rotate(${(-1.2 * (1 - easeOut)).toFixed(1)}deg)`;
                    capCard3Ref.current.style.transform = `translate3d(0, ${card3Y.toFixed(1)}px, 0) scale(${(0.99 + 0.01 * easeOut).toFixed(3)}) rotate(${(1.8 * (1 - easeOut)).toFixed(1)}deg)`;
                    capCard0Ref.current.style.zIndex = '4';
                    capCard1Ref.current.style.zIndex = '3';
                    capCard2Ref.current.style.zIndex = '2';
                    capCard3Ref.current.style.zIndex = '1';
                } else {
                    // Tablet: Proportional horizontal fan
                    capCard0Ref.current.style.transform = `translate3d(${(-240 * easeOut).toFixed(1)}px, ${(15 * easeOut).toFixed(1)}px, 0) rotate(${(-4 * easeOut).toFixed(1)}deg)`;
                    capCard1Ref.current.style.transform = `translate3d(${(-80 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(-1.5 * easeOut).toFixed(1)}deg)`;
                    capCard2Ref.current.style.transform = `translate3d(${(80 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(1.5 * easeOut).toFixed(1)}deg)`;
                    capCard3Ref.current.style.transform = `translate3d(${(240 * easeOut).toFixed(1)}px, ${(15 * easeOut).toFixed(1)}px, 0) rotate(${(4 * easeOut).toFixed(1)}deg)`;
                }
            }

            // Projects (Slide 3) Animation
            if (projectCarouselRef.current) {
                const startP = 0.54;
                const endP = 0.70;
                let progress = 0;
                
                if (p <= startP) progress = 0;
                else if (p >= endP) progress = 1;
                else progress = (p - startP) / (endP - startP);
                
                if (isDesktop) {
                    // Laptop / Desktop: 100% UNTOUCHED horizontal scroll
                    const maxScroll = projectCarouselRef.current.scrollWidth - projectCarouselRef.current.clientWidth;
                    if (maxScroll > 0) {
                        projectCarouselRef.current.scrollLeft = maxScroll * progress;
                    }
                    projectCarouselRef.current.style.transform = '';
                } else {
                    // Mobile & Tablet: Vertical project orientation & vertical glide using full remaining height
                    projectCarouselRef.current.scrollLeft = 0;
                    const parent = projectCarouselRef.current.parentElement;
                    const parentH = parent ? parent.clientHeight : 500;
                    const maxScrollY = Math.max(0, projectCarouselRef.current.scrollHeight - parentH);
                    if (maxScrollY > 0) {
                        projectCarouselRef.current.style.transform = `translate3d(0, ${(-maxScrollY * progress).toFixed(1)}px, 0)`;
                    } else {
                        projectCarouselRef.current.style.transform = 'translate3d(0, 0, 0)';
                    }
                }
            }

            // Team (Slide 4) Animation
            if (teamCard0Ref.current && teamCard1Ref.current && teamCard2Ref.current && teamCard3Ref.current) {
                const startP = 0.76;
                const endP = 0.86;
                let teamProgress = 0;
                
                if (p <= startP) teamProgress = 0;
                else if (p >= endP) teamProgress = 1;
                else teamProgress = (p - startP) / (endP - startP);

                const easeOut = 1 - Math.pow(1 - teamProgress, 3);
                
                if (isDesktop) {
                    // Laptop / Desktop: 100% UNTOUCHED parallax rise
                    teamCard0Ref.current.style.transform = `translate3d(0, ${(300 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard1Ref.current.style.transform = `translate3d(0, ${(100 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard2Ref.current.style.transform = `translate3d(0, ${(-100 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard3Ref.current.style.transform = `translate3d(0, ${(-300 * (1 - easeOut)).toFixed(1)}px, 0)`;
                } else {
                    // Mobile & Tablet: Noticeable staggered entrance into 2x2 grid
                    const scaleVal = (0.92 + 0.08 * easeOut).toFixed(3);
                    teamCard0Ref.current.style.transform = `translate3d(0, ${(35 * (1 - easeOut)).toFixed(1)}px, 0) scale(${scaleVal})`;
                    teamCard1Ref.current.style.transform = `translate3d(0, ${(48 * (1 - easeOut)).toFixed(1)}px, 0) scale(${scaleVal})`;
                    teamCard2Ref.current.style.transform = `translate3d(0, ${(60 * (1 - easeOut)).toFixed(1)}px, 0) scale(${scaleVal})`;
                    teamCard3Ref.current.style.transform = `translate3d(0, ${(72 * (1 - easeOut)).toFixed(1)}px, 0) scale(${scaleVal})`;
                }
            }
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    updateScroll();
                    ticking = false;
                });
            }
        };

        // Initial layout positioning
        updateScroll();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <main data-scene="Homepage" className="infracorp-homepage-main">
            <div className="topChapters" data-chapter="TopChapters" data-chapter-first="true"></div>

            {/* Pinned Scroll Track */}
            <div ref={trackRef} className="infracorp-scroll-track">
                {/* Scroll Anchor Markers along track for link / HUD jumps */}
                <div id="Hero" className="infracorp-anchor" style={{ top: '0%' }} />
                <div id="WhoWeAre" className="infracorp-anchor" style={{ top: '18%' }} />
                <div id="WhatWeDo" className="infracorp-anchor" style={{ top: '34%' }} />
                <div id="GlobalConnectivity" className="infracorp-anchor" style={{ top: '50%' }} />
                <div id="Sustainability" className="infracorp-anchor" style={{ top: '66%' }} />
                <div id="form" className="infracorp-anchor" style={{ top: '82%' }} />

                {/* Mobile Snap Targets for Screen-to-Screen Paging */}
                <div className="ic-mobile-snap-point" style={{ top: '0%' }} />
                <div className="ic-mobile-snap-point" style={{ top: '18%' }} />
                <div className="ic-mobile-snap-point" style={{ top: '36%' }} />
                <div className="ic-mobile-snap-point" style={{ top: '56%' }} />
                <div className="ic-mobile-snap-point" style={{ top: '78%' }} />
                <div className="ic-mobile-snap-point" style={{ top: '95%' }} />

                {/* 100vh Sticky Viewport Stage */}
                <div ref={stageRef} className="infracorp-sticky-stage">
                    {/* Minimal Centered Scroll Indicator ↓ */}
                    <div 
                        ref={scrollPromptRef}
                        className="ic-scroll-prompt"
                        onClick={() => onScrollToChapter?.('WhoWeAre')}
                        title="Scroll to explore"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 0: HERO                                        */}
                    {/* ==================================================== */}
                    <div ref={slide0Ref} className="infracorp-stage-slide slide-hero">
                        <div className="slide-content-wrap hero-slide-wrap">
                            <div className="hero-colossal-display-static">
                                <h1 className="colossal-title">QUINZEX</h1>
                            </div>
                            <p className="ic-hero-subtitle">
                                High-Performance Software Engineering, Cloud Architecture &amp; AI Systems Studio.
                            </p>
                            <button 
                                className="ic-btn"
                                onClick={() => onScrollToChapter?.('WhoWeAre')}
                            >
                                <span>EXPLORE OUR WORK</span>
                                <span className="ic-btn-arrow">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 1: WHO WE ARE                                  */}
                    {/* ==================================================== */}
                    <div ref={slide1Ref} className="infracorp-stage-slide slide-whoweare">
                        <div className="slide-content-wrap">
                            <h2 className="ic-title">
                                QUINZEX CLOSES THE GAP BETWEEN WHAT TECH LEADERS ARE AND HOW THEY ARE PERCEIVED.
                            </h2>
                            <p className="ic-desc">
                                Most companies experience the same disconnect — between what their technology delivers and how they are perceived in the market. We close that gap through strategic clarity, high-signal design, custom AI workflows, and scalable software platforms.
                            </p>
                            <button 
                                className="ic-btn"
                                onClick={() => onScrollToChapter?.('WhatWeDo')}
                            >
                                <span>OUR DISCIPLINES</span>
                                <span className="ic-btn-arrow">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 2: FOUR CAPABILITIES                           */}
                    {/* ==================================================== */}
                    <div ref={slide2Ref} className="infracorp-stage-slide slide-whatwedo">
                        <div className="slide-content-wrap">
                            <h2 className="ic-title">
                                FULL-STACK ENGINEERING CAPABILITIES.
                            </h2>
                            <p className="ic-desc" style={{ maxWidth: '640px' }}>
                                Integrated engineering disciplines to design, build, and scale high-stakes production systems.
                            </p>

                            <div className="ic-split-card-wrap">
                                <div className="ic-split-card" ref={capCard0Ref}>
                                    <div>
                                        <div className="ic-split-card-num">01</div>
                                        <h3 className="ic-split-card-title">AI SOLUTIONS &amp; AGENTS</h3>
                                        <p className="ic-split-card-desc">Custom self-healing AI agents, automated data ingestion pipelines, and LLM fine-tuning to accelerate team velocity.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard1Ref}>
                                    <div>
                                        <div className="ic-split-card-num">02</div>
                                        <h3 className="ic-split-card-title">WEB DESIGN &amp; 3D</h3>
                                        <p className="ic-split-card-desc">Custom React and WebGL architectures engineered with fluid transitions, responsive layouts, and interactive micro-physics.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard2Ref}>
                                    <div>
                                        <div className="ic-split-card-num">03</div>
                                        <h3 className="ic-split-card-title">STRATEGY &amp; BRANDING</h3>
                                        <p className="ic-split-card-desc">Unified visual identities, high-signal typography systems, and strategic positioning frameworks that demand attention.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard3Ref}>
                                    <div>
                                        <div className="ic-split-card-num">04</div>
                                        <h3 className="ic-split-card-title">MOTION &amp; UX/UI</h3>
                                        <p className="ic-split-card-desc">Interface design grounded in rigorous user research, wireframing, and immersive keyframe animations.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 3: SELECTED WORK                               */}
                    {/* ==================================================== */}
                    <div ref={slide3Ref} className="infracorp-stage-slide slide-work">
                        <div className="slide-content-wrap">
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', maxWidth: '980px', margin: '0 auto', width: '100%', gap: '24px' }}>
                                <h2 className="ic-title" style={{ margin: 0, maxWidth: '700px', paddingBottom: '16px' }}>
                                    MEASURABLE IMPACT FOR FAST-GROWING TECH &amp; ENTERPRISE LEADERS.
                                </h2>
                            </div>
                            <div className="ic-project-track-wrap">
                                <div className="ic-project-track" ref={projectCarouselRef}>
                                    <div className="ic-bento-block">
                                        <a href="/project/fintech" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Aura FinTech</h3>
                                                <p className="ic-bento-tags">Finance • React • TypeScript</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>

                                        <a href="/project/analytics" className="ic-bento-card ic-bento-small">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Nova Analytics</h3>
                                                <p className="ic-bento-tags">Data • Python • Vue</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>

                                        <a href="/project/career-vedha" className="ic-bento-card ic-bento-small">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">CareerVedha</h3>
                                                <p className="ic-bento-tags">EdTech • Next.js • WebSockets</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>

                                        <a href="/project/mh-marble" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">MH Marble</h3>
                                                <p className="ic-bento-tags">E-Commerce • React • WebGL</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>
                                    </div>

                                    <div className="ic-bento-block-narrow">
                                        <a href="/project/nexus" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Nexus Platform</h3>
                                                <p className="ic-bento-tags">Messaging • Node.js • Redis</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>

                                        <a href="/project/hrms" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">HRMS Platform</h3>
                                                <p className="ic-bento-tags">Enterprise • React • GraphQL</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 4: OUR TEAM                                   */}
                    {/* ==================================================== */}
                    <div ref={slide4Ref} className="infracorp-stage-slide slide-collective">
                        <div className="slide-content-wrap">
                            <h2 className="ic-title">
                                THE CORE TEAM BEHIND QUINZEX.
                            </h2>
                            <p className="ic-desc" style={{ maxWidth: '640px' }}>
                                Dedicated engineers specializing in full-stack architecture, AI workflows, distributed backend, and cloud infrastructure.
                            </p>

                            <div className="ic-team-parallax-wrap">
                                <Link to="/member/chaitanya-kumar" className="ic-team-parallax-card" ref={teamCard0Ref}>
                                    <div className="ic-team-card-top">
                                        <div className="ic-team-monogram">C</div>
                                        <span className="ic-team-arrow">↗</span>
                                    </div>
                                    <div className="ic-team-content">
                                        <h3 className="ic-team-name">CHAITANYA KUMAR</h3>
                                        <div className="ic-team-role">Full Stack Developer</div>
                                        <p className="ic-team-desc">
                                            Specializing in MERN Stack, Next.js, and luxury UI/UX. Transforming bespoke aesthetics into scalable, high-performance web applications.
                                        </p>
                                    </div>
                                    <div className="ic-team-action">
                                        <span className="ic-team-view-profile">VIEW PROFILE ↗</span>
                                    </div>
                                </Link>

                                <Link to="/member/sri-sai-praveen" className="ic-team-parallax-card" ref={teamCard1Ref}>
                                    <div className="ic-team-card-top">
                                        <div className="ic-team-monogram">K</div>
                                        <span className="ic-team-arrow">↗</span>
                                    </div>
                                    <div className="ic-team-content">
                                        <h3 className="ic-team-name">KATTA SRI SAI PRAVEEN</h3>
                                        <div className="ic-team-role">Backend &amp; Data Engineer</div>
                                        <p className="ic-team-desc">
                                            Computer Science engineer specialized in Python, Django REST, microservices, real-time WebSockets, and ML-driven analytics pipelines.
                                        </p>
                                    </div>
                                    <div className="ic-team-action">
                                        <span className="ic-team-view-profile">VIEW PROFILE ↗</span>
                                    </div>
                                </Link>

                                <Link to="/member/akhil-malisetty" className="ic-team-parallax-card" ref={teamCard2Ref}>
                                    <div className="ic-team-card-top">
                                        <div className="ic-team-monogram">A</div>
                                        <span className="ic-team-arrow">↗</span>
                                    </div>
                                    <div className="ic-team-content">
                                        <h3 className="ic-team-name">AKHIL MALISETTY</h3>
                                        <div className="ic-team-role">Backend Engineer</div>
                                        <p className="ic-team-desc">
                                            Building scalable, low-latency applications with Java, Spring Boot, distributed systems, Redis caching, and robust API architecture.
                                        </p>
                                    </div>
                                    <div className="ic-team-action">
                                        <span className="ic-team-view-profile">VIEW PROFILE ↗</span>
                                    </div>
                                </Link>

                                <Link to="/member/siva-chandrasekhar" className="ic-team-parallax-card" ref={teamCard3Ref}>
                                    <div className="ic-team-card-top">
                                        <div className="ic-team-monogram">S</div>
                                        <span className="ic-team-arrow">↗</span>
                                    </div>
                                    <div className="ic-team-content">
                                        <h3 className="ic-team-name">SIVA CHANDRASEKHAR JAVVADI</h3>
                                        <div className="ic-team-role">Cloud &amp; DevOps Engineer</div>
                                        <p className="ic-team-desc">
                                            Kubernetes, AWS/Azure, Terraform, and CI/CD pipelines engineer ensuring zero-downtime deployments, observability, and infrastructure stability.
                                        </p>
                                    </div>
                                    <div className="ic-team-action">
                                        <span className="ic-team-view-profile">VIEW PROFILE ↗</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SLIDE 5: DIRECT INQUIRY & CONTACT FORM               */}
                    {/* ==================================================== */}
                    <div ref={slide5Ref} className="infracorp-stage-slide slide-contact">
                        <div className="slide-content-wrap">
                            <MontfortContact />
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================================================== */}
            {/* EXACT MONTFORT FOOTER (PURE WHITE BACKGROUND)        */}
            {/* ==================================================== */}
            <footer className="ic-creative-footer">
                <div className="ic-footer-top">
                    <h2 className="ic-footer-cta-title">READY TO BUILD<br />THE FUTURE?</h2>
                    <div className="ic-footer-cta-actions">
                        <button onClick={() => onScrollToChapter?.('form')} className="ic-footer-btn-primary">
                            START A CONVERSATION
                        </button>
                        <a href="https://cal.com/quinzex/discovery" target="_blank" rel="noopener noreferrer" className="ic-footer-btn-secondary">
                            BOOK DISCOVERY CALL
                        </a>
                    </div>
                </div>

                <div className="ic-footer-middle">
                    <div className="ic-footer-brand">
                        <div className="ic-footer-logo-wrap">
                            <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
                                <circle cx="22" cy="13" r="3.6" fill="var(--text-navy)" />
                                <circle cx="11" cy="22" r="3.6" fill="var(--text-navy)" />
                                <circle cx="33" cy="22" r="3.6" fill="var(--text-navy)" />
                                <circle cx="15" cy="33" r="3.2" fill="var(--text-navy)" />
                                <circle cx="29" cy="33" r="3.2" fill="var(--text-navy)" />
                                <circle cx="22" cy="24" r="2.8" fill="var(--text-navy)" />
                            </svg>
                            <span className="ic-footer-logo-text">QUINZEX</span>
                        </div>
                        <p className="ic-footer-brand-desc">
                            High-performance software engineering, cloud architecture &amp; AI systems studio for modern technology leaders.
                        </p>
                    </div>
                    
                    <div className="ic-footer-links-grid">
                        <div className="ic-footer-link-group">
                            <h4>NAVIGATION</h4>
                            <a href="#Hero" onClick={(e) => { e.preventDefault(); onScrollToChapter?.('Hero'); }}>Overview</a>
                            <a href="#WhoWeAre" onClick={(e) => { e.preventDefault(); onScrollToChapter?.('WhoWeAre'); }}>Who We Are</a>
                            <a href="#WhatWeDo" onClick={(e) => { e.preventDefault(); onScrollToChapter?.('WhatWeDo'); }}>Capabilities</a>
                            <a href="#GlobalConnectivity" onClick={(e) => { e.preventDefault(); onScrollToChapter?.('GlobalConnectivity'); }}>Selected Work</a>
                        </div>
                        <div className="ic-footer-link-group">
                            <h4>INQUIRIES</h4>
                            <a href="mailto:hello@quinzexintelligence.com">hello@quinzexintelligence.com</a>
                            <a href="mailto:partners@quinzexintelligence.com">partners@quinzexintelligence.com</a>
                            <p style={{ marginTop: '16px' }}>Global Distributed Team<br/>US &bull; EU &bull; APAC Timezones</p>
                        </div>
                    </div>
                </div>

                <div className="ic-footer-bottom">
                    <div className="ic-footer-copyright">
                        © {new Date().getFullYear()} Quinzex Intelligence. All rights reserved.
                    </div>
                    <div className="ic-footer-giant-text">QUINZEX</div>
                </div>
            </footer>
        </main>
    );
};

export default MontfortSections;
