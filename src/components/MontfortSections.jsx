import React from 'react';
import { motion } from 'framer-motion';

const MontfortSections = () => {
    return (
        <main data-scene="Homepage">
            {/* ==================================================== */}
            {/* CHAPTER 0: TOP CHAPTERS & HERO                       */}
            {/* ==================================================== */}
            <div className="topChapters" data-chapter="TopChapters" data-chapter-first="true"></div>
            
            <section id="Hero" className="content-chapter" data-chapter="Hero" data-chapter-first="true" style={{ minHeight: '100vh', justifyContent: 'center' }}>
                <div className="hero-center-brand">
                    <svg className="hero-crest-svg" viewBox="0 0 44 44" fill="none">
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
                    <span className="hero-brand-name">QUINZEX</span>
                </div>

                <div className="hero-bottom-bar">
                    <span className="scroll-discover-text">SCROLL DOWN TO DISCOVER</span>
                </div>
            </section>

            {/* ==================================================== */}
            {/* CHAPTER 1: WHO WE ARE                                */}
            {/* ==================================================== */}
            <section id="WhoWeAre" className="content-chapter" data-chapter="WhoWeAre" data-label="Who we are">
                <motion.h2 
                    className="who-we-are-top-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    QUINZEX IS A STRATEGY &amp; DESIGN COLLECTIVE FOR TECH LEADERS AT TURNING POINTS.
                </motion.h2>

                <motion.p 
                    className="who-we-are-bottom-desc"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Most clients experience the same gap — between what they are and how they're perceived. We close that gap by turning internal truth into external perception through strategic clarity, position, high-signal branding, custom AI workflows, and bespoke digital experiences.
                </motion.p>
            </section>

            {/* ==================================================== */}
            {/* CHAPTER 2: WHAT WE DO                                */}
            {/* ==================================================== */}
            <section id="WhatWeDo" className="content-chapter" data-chapter="WhatWeDo" data-label="What we do">
                <motion.h2 
                    className="what-we-do-top-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    WE DELIVER BESPOKE STRATEGY, DIGITAL EXPERIENCES, AND AI WORKFLOWS.
                </motion.h2>

                {/* 4 Capability Cards */}
                <div className="divisions-showcase-container">
                    <div className="division-feature-card">
                        <h3 className="card-division-title">WEB DESIGN &amp; 3D</h3>
                        <p className="card-division-copy">
                            Custom React and WebGL architectures engineered with fluid transitions, responsive layouts, and state-of-the-art interactive micro-physics.
                        </p>
                    </div>

                    <div className="division-feature-card">
                        <h3 className="card-division-title">STRATEGY &amp; BRANDING</h3>
                        <p className="card-division-copy">
                            Unified visual identities, high-signal typography systems, and strategic positioning frameworks that demand attention and drive growth.
                        </p>
                    </div>

                    <div className="division-feature-card">
                        <h3 className="card-division-title">AI SOLUTIONS &amp; AGENTS</h3>
                        <p className="card-division-copy">
                            Custom self-healing AI agents, automated data ingestion pipelines, and LLM fine-tuning to accelerate team velocity and automate operations.
                        </p>
                    </div>

                    <div className="division-feature-card">
                        <h3 className="card-division-title">MOTION &amp; UX/UI</h3>
                        <p className="card-division-copy">
                            Interface design grounded in rigorous user research, wireframing, and immersive keyframe animations that capture and hold attention.
                        </p>
                    </div>
                </div>

                <motion.p 
                    className="what-we-do-bottom-desc"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Our integrated disciplines operate seamlessly without agency overhead, deploying the exact specialized talent required for your brand transformation.
                </motion.p>
            </section>

            {/* ==================================================== */}
            {/* CHAPTER 3: GLOBAL CONNECTIVITY / SELECTED WORK       */}
            {/* ==================================================== */}
            <section id="GlobalConnectivity" className="content-chapter" data-chapter="GlobalConnectivity" data-label="Global connectivity">
                <motion.h2 
                    className="who-we-are-top-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    MEASURABLE IMPACT FOR FAST-GROWING TECH &amp; ENTERPRISE LEADERS.
                </motion.h2>

                <div className="case-studies-grid">
                    <a href="/project/career-vedha" className="case-study-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div>
                            <div className="case-study-metric">50k+</div>
                            <div className="case-study-label">&lt;120ms p99 &bull; +67% Engagement</div>
                            <h3 className="case-study-title">CareerVedha ↗</h3>
                        </div>
                        <p className="case-study-tagline">
                            High-concurrency EdTech &amp; Analytics platform with decoupled Next.js edge rendering, Redis query caching, and live WebSocket dashboards.
                        </p>
                    </a>

                    <a href="/project/mh-marble" className="case-study-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div>
                            <div className="case-study-metric">340%</div>
                            <div className="case-study-label">Conversion Lift &bull; 1.2s Load</div>
                            <h3 className="case-study-title">MH Marble ↗</h3>
                        </div>
                        <p className="case-study-tagline">
                            Bespoke React storefront with CDN-backed Cloudinary asset pipeline and interactive 3D WebGL material inspection slab viewer.
                        </p>
                    </a>

                    <a href="/project/nexus" className="case-study-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div>
                            <div className="case-study-metric">5,000</div>
                            <div className="case-study-label">Concurrent Streams &bull; 98ms Latency</div>
                            <h3 className="case-study-title">Nexus ↗</h3>
                        </div>
                        <p className="case-study-tagline">
                            Production-grade, sub-100ms real-time messaging platform on Node.js cluster with Redis Pub/Sub inter-process brokerage.
                        </p>
                    </a>

                    <a href="/project/hrms" className="case-study-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div>
                            <div className="case-study-metric">20+ hrs</div>
                            <div className="case-study-label">Saved Weekly &bull; 4 Min Payroll</div>
                            <h3 className="case-study-title">HRMS ↗</h3>
                        </div>
                        <p className="case-study-tagline">
                            Enterprise management system built with Java Spring Boot REST API, RBAC security layer, and Recharts real-time KPI dashboards.
                        </p>
                    </a>
                </div>
            </section>

            {/* ==================================================== */}
            {/* CHAPTER 4: SUSTAINABILITY / COLLECTIVE               */}
            {/* ==================================================== */}
            <div data-chapter="Sustainability" id="Sustainability" data-label="Sustainability">
                <section className="content-chapter" style={{ minHeight: '80vh' }}>
                    <motion.h2 
                        className="sustainability-top-heading"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        THE QUINZEX COLLECTIVE &amp; SPECIALISTS.
                    </motion.h2>

                    <div className="sustainability-pillars-grid">
                        <div className="pillar-col">
                            <h3 className="pillar-name">CHAITANYA KUMAR</h3>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Full Stack Developer</div>
                            <p className="pillar-desc">
                                Specializing in MERN Stack, Next.js, and luxury UI/UX. Transforming bespoke aesthetics into scalable, high-performance web applications.
                            </p>
                            <a href="/member/chaitanya-kumar" style={{ fontSize: '12px', fontWeight: 600, color: '#0f3554', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>View Profile &amp; Work ↗</a>
                        </div>
                        <div className="pillar-col">
                            <h3 className="pillar-name">KATTA SRI SAI PRAVEEN</h3>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Backend &amp; Data Engineer</div>
                            <p className="pillar-desc">
                                Computer Science engineer specialized in Python, Django REST, microservices, real-time WebSockets, and ML-driven analytics pipelines.
                            </p>
                            <a href="/member/sri-sai-praveen" style={{ fontSize: '12px', fontWeight: 600, color: '#0f3554', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>View Profile &amp; Work ↗</a>
                        </div>
                        <div className="pillar-col">
                            <h3 className="pillar-name">AKHIL MALISETTY</h3>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Backend Engineer</div>
                            <p className="pillar-desc">
                                Java &amp; Spring Boot specialist building distributed systems, event-driven architectures (Kafka), Redis caching, and robust OAuth2/JWT security.
                            </p>
                            <a href="/member/akhil-malisetty" style={{ fontSize: '12px', fontWeight: 600, color: '#0f3554', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>View Profile &amp; Work ↗</a>
                        </div>
                        <div className="pillar-col">
                            <h3 className="pillar-name">SIVA CHANDRASEKHAR JAVVADI</h3>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cloud &amp; DevOps Engineer</div>
                            <p className="pillar-desc">
                                Kubernetes, AWS/Azure, Terraform, and CI/CD pipelines engineer ensuring zero-downtime deployments, observability, and infrastructure stability.
                            </p>
                            <a href="/member/siva-javvadi" style={{ fontSize: '12px', fontWeight: 600, color: '#0f3554', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>View Profile &amp; Work ↗</a>
                        </div>
                    </div>
                </section>

                {/* Exact Montfort Footer */}
                <footer className="exact-montfort-footer">
                    <div className="footer-columns-row">
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
                                    <circle cx="22" cy="13" r="3.6" fill="#0f3554" />
                                    <circle cx="11" cy="22" r="3.6" fill="#0f3554" />
                                    <circle cx="33" cy="22" r="3.6" fill="#0f3554" />
                                    <circle cx="15" cy="33" r="3.2" fill="#0f3554" />
                                    <circle cx="29" cy="33" r="3.2" fill="#0f3554" />
                                    <circle cx="22" cy="24" r="2.8" fill="#0f3554" />
                                </svg>
                                <span style={{ fontFamily: 'var(--font-main)', fontSize: '18px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#0f3554', fontWeight: 400 }}>QUINZEX</span>
                            </div>
                            <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--text-navy-secondary)', maxWidth: '280px', marginBottom: '24px' }}>
                                Strategy &amp; Design collective for technology leaders at turning points.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <a href="#contact" className="dock-btn-cta" style={{ display: 'inline-flex' }}>
                                    START A CONVERSATION
                                </a>
                                <a href="/quinzex/" className="dock-btn-cta" style={{ display: 'inline-flex', background: 'rgba(15, 53, 84, 0.08)', color: '#0f3554', border: '1px solid rgba(15, 53, 84, 0.2)' }}>
                                    LAUNCH PLATFORM ↗
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="footer-office-title">NAVIGATION</h4>
                            <ul className="footer-nav-list">
                                <li><a href="/quinzex/" style={{ color: '#0f3554', fontWeight: 600 }}>Quinzex Platform ↗</a></li>
                                <li><a href="#Hero">Overview</a></li>
                                <li><a href="#WhoWeAre">Who We Are</a></li>
                                <li><a href="#WhatWeDo">What We Do</a></li>
                                <li><a href="#GlobalConnectivity">Selected Work</a></li>
                                <li><a href="#Sustainability">Collective</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-office-title">CAPABILITIES</h4>
                            <ul className="footer-nav-list">
                                <li><a href="/quinzex/" style={{ color: '#0f3554', fontWeight: 600 }}>Quinzex Intelligence App ↗</a></li>
                                <li><a href="#WhatWeDo">WebGL &amp; 3D Design</a></li>
                                <li><a href="#WhatWeDo">Brand &amp; Positioning</a></li>
                                <li><a href="#WhatWeDo">AI Agents &amp; Workflows</a></li>
                                <li><a href="#WhatWeDo">Digital Experience</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-office-title">GLOBAL INQUIRIES</h4>
                            <p className="footer-office-address">
                                Geneva &bull; London &bull; San Francisco<br />
                                Global Distributed Collective
                            </p>
                            <p className="footer-office-contact">
                                <a href="mailto:hello@quinzex.ai">hello@quinzex.ai</a><br />
                                <a href="mailto:partners@quinzex.ai">partners@quinzex.ai</a>
                            </p>
                        </div>
                    </div>

                    <div className="footer-bottom-divider"></div>

                    <div className="footer-copyright-bar">
                        <div className="footer-logo-wrap">
                            <span className="footer-copyright-text">&copy; {new Date().getFullYear()} Quinzex Intelligence. All rights reserved.</span>
                        </div>
                        <span className="footer-copyright-text">Strategy &bull; Design &bull; AI Systems</span>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default MontfortSections;
