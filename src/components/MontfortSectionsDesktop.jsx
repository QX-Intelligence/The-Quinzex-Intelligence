import React, { useEffect, useRef } from 'react';
import MontfortContact from './MontfortContact';
import MontfortFooter from './MontfortFooter';
import Link from './Link';

const MontfortSectionsDesktop = ({ onScrollToChapter }) => {
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

    // Slide element refs for 60fps/120fps desktop transitions
    const slide0Ref = useRef(null);
    const slide1Ref = useRef(null);
    const slide2Ref = useRef(null);
    const slide3Ref = useRef(null);
    const slide4Ref = useRef(null);
    const slide5Ref = useRef(null);

    useEffect(() => {
        let ticking = false;
        let rafId = null;
        let lastScrollY = -1;

        const metrics = {
            windowHeight: window.innerHeight,
            trackTop: 0,
            trackHeight: 1,
            scrollDist: 1,
            projectMaxScrollX: 0,
        };

        const measureMetrics = () => {
            metrics.windowHeight = window.innerHeight;

            if (trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset || 0;
                metrics.trackTop = rect.top + scrollY;
                metrics.trackHeight = trackRef.current.offsetHeight;
                metrics.scrollDist = Math.max(1, metrics.trackHeight - metrics.windowHeight);
            }

            if (projectCarouselRef.current) {
                const el = projectCarouselRef.current;
                metrics.projectMaxScrollX = Math.max(0, el.scrollWidth - el.clientWidth);
            }
        };

        const slideVisState = new WeakMap();

        const applySlideStyles = (el, progress, enterStart, enterEnd, exitStart, exitEnd) => {
            if (!el) return false;

            let opacity = 0;
            let y = 32;
            let scale = 0.97;

            if (progress < enterStart) {
                opacity = 0;
                y = 32;
                scale = 0.96;
            } else if (progress >= enterStart && progress < enterEnd) {
                const t = (progress - enterStart) / (enterEnd - enterStart);
                opacity = t;
                y = 32 * (1 - t);
                scale = 0.96 + 0.04 * t;
            } else if (progress >= enterEnd && progress <= exitStart) {
                opacity = 1;
                y = 0;
                scale = 1;
            } else if (progress > exitStart && progress <= exitEnd) {
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
            const wasVisible = slideVisState.get(el);
            if (!isVisible && wasVisible === false) {
                return false;
            }
            slideVisState.set(el, isVisible);

            el.style.opacity = opacity;
            el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
            el.style.pointerEvents = isVisible ? 'auto' : 'none';
            el.style.visibility = isVisible ? 'visible' : 'hidden';
            el.style.willChange = isVisible ? 'transform, opacity' : 'auto';
            return isVisible;
        };

        let lastStageMode = '';
        let lastCapProgress = -1;
        let lastProjectProgress = -1;
        let lastTeamProgress = -1;

        const updateScroll = (force = false) => {
            if (!trackRef.current) return;

            const scrollY = window.scrollY || window.pageYOffset || 0;
            if (!force && scrollY === lastScrollY) return;
            lastScrollY = scrollY;

            const { windowHeight, trackTop, trackHeight, scrollDist, projectMaxScrollX } = metrics;
            const rectTop = trackTop - scrollY;
            const rectBottom = rectTop + trackHeight;
            const p = Math.max(0, Math.min(1, -rectTop / scrollDist));

            if (stageRef.current) {
                if (rectBottom < windowHeight) {
                    stageRef.current.style.transform = `translate3d(0, ${(rectBottom - windowHeight).toFixed(1)}px, 0)`;
                    stageRef.current.style.opacity = Math.max(0, Math.min(1, rectBottom / windowHeight)).toFixed(2);
                    lastStageMode = 'bottom';
                } else if (rectTop > 0) {
                    stageRef.current.style.transform = `translate3d(0, ${rectTop.toFixed(1)}px, 0)`;
                    stageRef.current.style.opacity = '1';
                    lastStageMode = 'top';
                } else if (lastStageMode !== 'pinned' || force) {
                    stageRef.current.style.transform = 'translate3d(0, 0, 0)';
                    stageRef.current.style.opacity = '1';
                    lastStageMode = 'pinned';
                }
            }

            if (scrollPromptRef.current) {
                scrollPromptRef.current.classList.toggle('faded', p > 0.07);
            }

            applySlideStyles(slide0Ref.current, p, 0.00, 0.00, 0.10, 0.15);
            applySlideStyles(slide1Ref.current, p, 0.15, 0.20, 0.28, 0.33);
            const slide2Visible = applySlideStyles(slide2Ref.current, p, 0.33, 0.38, 0.46, 0.51);
            const slide3Visible = applySlideStyles(slide3Ref.current, p, 0.51, 0.56, 0.72, 0.77);
            const slide4Visible = applySlideStyles(slide4Ref.current, p, 0.77, 0.82, 0.88, 0.93);
            applySlideStyles(slide5Ref.current, p, 0.93, 0.97, 1.00, 1.00);

            // Capabilities (Slide 2): 1-to-4 horizontal card split
            if (capCard0Ref.current && capCard1Ref.current && capCard2Ref.current && capCard3Ref.current) {
                const startP = 0.34;
                const endP = 0.45;
                let splitProgress = 0;

                if (p <= startP) splitProgress = 0;
                else if (p >= endP) splitProgress = 1;
                else splitProgress = (p - startP) / (endP - startP);

                if (force || (slide2Visible && splitProgress !== lastCapProgress) || (lastCapProgress !== splitProgress && (splitProgress === 0 || splitProgress === 1))) {
                    lastCapProgress = splitProgress;
                    const easeOut = 1 - Math.pow(1 - splitProgress, 3);
                    capCard0Ref.current.style.transform = `translate3d(${(-369 * easeOut).toFixed(1)}px, ${(20 * easeOut).toFixed(1)}px, 0) rotate(${(-6 * easeOut).toFixed(2)}deg)`;
                    capCard1Ref.current.style.transform = `translate3d(${(-127 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(-2 * easeOut).toFixed(2)}deg)`;
                    capCard2Ref.current.style.transform = `translate3d(${(127 * easeOut).toFixed(1)}px, ${(5 * easeOut).toFixed(1)}px, 0) rotate(${(2 * easeOut).toFixed(2)}deg)`;
                    capCard3Ref.current.style.transform = `translate3d(${(369 * easeOut).toFixed(1)}px, ${(20 * easeOut).toFixed(1)}px, 0) rotate(${(6 * easeOut).toFixed(2)}deg)`;
                }
            }

            // Projects (Slide 3): horizontal carousel scroll
            if (projectCarouselRef.current) {
                const startP = 0.54;
                const endP = 0.70;
                let progress = 0;

                if (p <= startP) progress = 0;
                else if (p >= endP) progress = 1;
                else progress = (p - startP) / (endP - startP);

                if (force || (slide3Visible && progress !== lastProjectProgress) || (lastProjectProgress !== progress && (progress === 0 || progress === 1))) {
                    lastProjectProgress = progress;
                    if (projectMaxScrollX > 0) {
                        projectCarouselRef.current.scrollLeft = projectMaxScrollX * progress;
                    }
                    if (force) projectCarouselRef.current.style.transform = '';
                }
            }

            // Team (Slide 4): desktop parallax rise
            if (teamCard0Ref.current && teamCard1Ref.current && teamCard2Ref.current && teamCard3Ref.current) {
                const startP = 0.76;
                const endP = 0.86;
                let teamProgress = 0;

                if (p <= startP) teamProgress = 0;
                else if (p >= endP) teamProgress = 1;
                else teamProgress = (p - startP) / (endP - startP);

                if (force || (slide4Visible && teamProgress !== lastTeamProgress) || (lastTeamProgress !== teamProgress && (teamProgress === 0 || teamProgress === 1))) {
                    lastTeamProgress = teamProgress;
                    const easeOut = 1 - Math.pow(1 - teamProgress, 3);
                    teamCard0Ref.current.style.transform = `translate3d(0, ${(300 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard1Ref.current.style.transform = `translate3d(0, ${(100 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard2Ref.current.style.transform = `translate3d(0, ${(-100 * (1 - easeOut)).toFixed(1)}px, 0)`;
                    teamCard3Ref.current.style.transform = `translate3d(0, ${(-300 * (1 - easeOut)).toFixed(1)}px, 0)`;
                }
            }
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                rafId = requestAnimationFrame(() => {
                    updateScroll(false);
                    ticking = false;
                });
            }
        };

        const onResize = () => {
            measureMetrics();
            updateScroll(true);
        };

        let resizeObs = null;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObs = new ResizeObserver(onResize);
            if (trackRef.current) resizeObs.observe(trackRef.current);
            if (projectCarouselRef.current) resizeObs.observe(projectCarouselRef.current);
        }

        measureMetrics();
        updateScroll(true);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (rafId) cancelAnimationFrame(rafId);
            resizeObs?.disconnect();
        };
    }, []);

    return (
        <main data-scene="Homepage" className="infracorp-homepage-main">
            <div className="topChapters" data-chapter="TopChapters" data-chapter-first="true"></div>

            {/* Pinned Scroll Track */}
            <div ref={trackRef} className="infracorp-scroll-track">
                <div id="Hero" className="infracorp-anchor" style={{ top: '0%' }} />
                <div id="WhoWeAre" className="infracorp-anchor" style={{ top: '18%' }} />
                <div id="WhatWeDo" className="infracorp-anchor" style={{ top: '34%' }} />
                <div id="GlobalConnectivity" className="infracorp-anchor" style={{ top: '50%' }} />
                <div id="Sustainability" className="infracorp-anchor" style={{ top: '66%' }} />
                <div id="form" className="infracorp-anchor" style={{ top: '82%' }} />

                {/* 100vh Sticky Viewport Stage */}
                <div ref={stageRef} className="infracorp-sticky-stage">
                    <div
                        ref={scrollPromptRef}
                        className="ic-scroll-prompt"
                        onClick={() => onScrollToChapter?.('WhoWeAre')}
                        title="Scroll to explore"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                    </div>

                    {/* SLIDE 0: HERO */}
                    <div ref={slide0Ref} className="infracorp-stage-slide slide-hero">
                        <div className="slide-content-wrap hero-slide-wrap">
                            <div className="hero-colossal-display-static">
                                <h1 className="colossal-title">QUINZEX</h1>
                            </div>
                            <p className="ic-hero-subtitle">
                                Software Engineering, Cloud Architecture &amp; Digital Products.
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

                    {/* SLIDE 1: WHO WE ARE */}
                    <div ref={slide1Ref} className="infracorp-stage-slide slide-whoweare">
                        <div className="slide-content-wrap">
                            <h2 className="ic-title">
                                WE BUILD RELIABLE SOFTWARE PLATFORMS FOR GROWING TECHNOLOGY COMPANIES.
                            </h2>
                            <p className="ic-desc">
                                We partner with engineering and product teams to design, build, and scale web applications, cloud infrastructure, and practical AI integrations.
                            </p>
                            <button
                                className="ic-btn"
                                onClick={() => onScrollToChapter?.('WhatWeDo')}
                            >
                                <span>OUR CAPABILITIES</span>
                                <span className="ic-btn-arrow">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* SLIDE 2: FOUR CAPABILITIES */}
                    <div ref={slide2Ref} className="infracorp-stage-slide slide-whatwedo">
                        <div className="slide-content-wrap">
                            <h2 className="ic-title">
                                OUR CORE CAPABILITIES.
                            </h2>
                            <p className="ic-desc" style={{ maxWidth: '640px' }}>
                                End-to-end engineering services to design, build, and scale production software.
                            </p>

                            <div className="ic-split-card-wrap">
                                <div className="ic-split-card" ref={capCard0Ref}>
                                    <div>
                                        <div className="ic-split-card-num">01</div>
                                        <h3 className="ic-split-card-title">APPLIED AI &amp; AUTOMATION</h3>
                                        <p className="ic-split-card-desc">Practical LLM integrations, automated data pipelines, and intelligent workflows built for production reliability.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard1Ref}>
                                    <div>
                                        <div className="ic-split-card-num">02</div>
                                        <h3 className="ic-split-card-title">WEB DEVELOPMENT &amp; 3D</h3>
                                        <p className="ic-split-card-desc">Responsive React and WebGL applications built with clean interfaces, smooth interactions, and fast load times.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard2Ref}>
                                    <div>
                                        <div className="ic-split-card-num">03</div>
                                        <h3 className="ic-split-card-title">PRODUCT STRATEGY &amp; DESIGN</h3>
                                        <p className="ic-split-card-desc">Clear visual identities, structured design systems, and product positioning tailored to your market.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>

                                <div className="ic-split-card" ref={capCard3Ref}>
                                    <div>
                                        <div className="ic-split-card-num">04</div>
                                        <h3 className="ic-split-card-title">UI/UX &amp; INTERACTION DESIGN</h3>
                                        <p className="ic-split-card-desc">User-centered interface design backed by wireframing, usability testing, and refined motion.</p>
                                    </div>
                                    <div className="ic-split-card-arrow">↗</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 3: SELECTED WORK */}
                    <div ref={slide3Ref} className="infracorp-stage-slide slide-work">
                        <div className="slide-content-wrap">
                            <div className="ic-work-header-wrap">
                                <h2 className="ic-title ic-title-work">
                                    SELECTED WORK &amp; CLIENT CASE STUDIES.
                                </h2>
                                <p className="ic-desc ic-desc-work">
                                    Production web platforms, data pipelines, and cloud systems delivered for our clients.
                                </p>
                            </div>
                            <div className="ic-project-track-wrap">
                                <div className="ic-project-track" ref={projectCarouselRef}>
                                    <div className="ic-bento-block">
                                        <Link to="/project/brunst-studios" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Brunst Studios</h3>
                                                <p className="ic-bento-tags">Creative Agency • Next.js • Turbopack</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>

                                        <Link to="/project/nova-analytics" className="ic-bento-card ic-bento-small">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Nova Analytics</h3>
                                                <p className="ic-bento-tags">Data &amp; ML • Python • Vue</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>

                                        <Link to="/project/career-vedha" className="ic-bento-card ic-bento-small">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">CareerVedha</h3>
                                                <p className="ic-bento-tags">EdTech • Next.js • WebSockets</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>

                                        <Link to="/project/mh-marble" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">MH Marble</h3>
                                                <p className="ic-bento-tags">E-Commerce • React • WebGL</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>
                                    </div>

                                    <div className="ic-bento-block-narrow">
                                        <Link to="/project/nexus" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">Nexus Platform</h3>
                                                <p className="ic-bento-tags">Messaging • Node.js • Redis</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>

                                        <Link to="/project/hrms" className="ic-bento-card ic-bento-large">
                                            <div className="ic-bento-content">
                                                <h3 className="ic-bento-title">HRMS Platform</h3>
                                                <p className="ic-bento-tags">Enterprise • Java • Spring Boot</p>
                                            </div>
                                            <div className="ic-bento-icon">↗</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 4: OUR TEAM */}
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
                                        <div className="ic-team-role">Backend, AI &amp; Data Engineer</div>
                                        <p className="ic-team-desc">
                                            Python, Django/Flask microservices, machine learning, computer vision, and LangChain/LangGraph engineer building scalable APIs and AI pipelines.
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
                                            Java, Spring Boot/Cloud/Security, Hibernate, Microservices, Apache Kafka, Redis, WebSockets, and payment gateway engineer.
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
                                            Linux, AWS, Kubernetes, Docker, Terraform, and Jenkins engineer automating CI/CD, security scanning, and Prometheus + Grafana observability.
                                        </p>
                                    </div>
                                    <div className="ic-team-action">
                                        <span className="ic-team-view-profile">VIEW PROFILE ↗</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 5: DIRECT INQUIRY & CONTACT FORM */}
                    <div ref={slide5Ref} className="infracorp-stage-slide slide-contact">
                        <div className="slide-content-wrap">
                            <MontfortContact />
                        </div>
                    </div>
                </div>
            </div>

            <MontfortFooter onScrollToChapter={onScrollToChapter} />
        </main>
    );
};

export default MontfortSectionsDesktop;
