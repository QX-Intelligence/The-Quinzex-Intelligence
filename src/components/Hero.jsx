import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Navbar';

const Hero = () => {
    const [anim, setAnim] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        setAnim(true);
    }, []);

    const scrollToDesign = (e) => {
        e.preventDefault();
        const target = document.getElementById('design');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="section is-fullscreen overflow-hidden" style={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: '100svh' }}>
            {/* Background Grid Pattern */}
            <div className="hero-grid-pattern"></div>

            <div className="w-layout-blockcontainer container w-container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hero-layout-wrap" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.75rem', alignItems: 'center' }}>
                    
                    {/* Left Column: Editorial Copy */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-layout-vflex" 
                        style={{ gap: '2rem', alignItems: 'flex-start' }}
                    >
                        <div className="sect-dot-flex w-layout-hflex" style={{ gap: '0.5rem', alignItems: 'center' }}>
                            <div className="dot" style={{ backgroundColor: 'var(--red)', width: '0.5rem', height: '0.5rem', borderRadius: '50%' }}></div>
                            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, color: 'var(--grey-light)' }}>
                                Strategy &amp; Design Collective
                            </div>
                        </div>

                        <header className="w-layout-vflex" style={{ gap: '1.25rem', alignItems: 'flex-start' }}>
                            <h1 style={{ textAlign: 'left', margin: 0, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--black)', lineHeight: 1.1 }}>
                                We help tech leaders shape the brand &amp; digital presence that drives growth.
                            </h1>
                            <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--grey-light)', lineHeight: 1.6, maxWidth: '32rem', textAlign: 'left' }}>
                                Quinzex is a premium creative agency. We reject generic templates and cookie-cutter approaches in favor of bespoke, high-signal digital experiences that demand attention and drive growth.
                            </p>
                        </header>

                        <div className="w-layout-hflex" style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                            <Magnetic href="#form" className="btn-solid-charcoal">
                                <span>Book strategy call</span>
                                <span style={{ fontSize: '0.9rem' }}>↗</span>
                            </Magnetic>
                            <a href="#design" className="btn-outline-charcoal" onClick={scrollToDesign}>
                                <span>See our work</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: High-Signal Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="new-mockup-card">
                            <div className="mockup-header-bar">
                                <div className="mockup-tabs">
                                    {['Overview', 'Metrics', 'Audit'].map((tab) => (
                                        <button 
                                            key={tab} 
                                            className={`mockup-tab ${activeTab === tab ? 'is-active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="mockup-status">
                                    <div className="mockup-status-dot"></div>
                                    <span>System Active</span>
                                </div>
                            </div>

                            {activeTab === 'Overview' && (
                                <div className="mockup-content">
                                    <div className="mockup-row">
                                        <span className="mockup-label">Perception Gap</span>
                                        <span className="mockup-badge green">Closed</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Market Signal</span>
                                        <span className="mockup-badge blue">Premium</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Valuation Catalyst</span>
                                        <span className="mockup-value">3.8x Lift</span>
                                    </div>
                                    
                                    <div className="mockup-chart-wrap">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--grey-light)', fontWeight: 500 }}>PERFORMANCE INDICATOR</span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--red)', fontWeight: 600 }}>+42.8%</span>
                                        </div>
                                        <svg viewBox="0 0 100 25" className="sparkline-svg">
                                            <path 
                                                d="M0 20 Q 15 18, 30 8 T 60 12 T 90 4 T 100 2" 
                                                fill="none" 
                                                stroke="var(--red)" 
                                                strokeWidth="2" 
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Metrics' && (
                                <div className="mockup-content">
                                    <div className="mockup-row">
                                        <span className="mockup-label">Conversion Rate</span>
                                        <span className="mockup-value">+4.2%</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Engagement Time</span>
                                        <span className="mockup-value">4m 12s</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Site Velocity</span>
                                        <span className="mockup-badge green">99 / 100</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Audit' && (
                                <div className="mockup-content">
                                    <div className="mockup-row">
                                        <span className="mockup-label">SEO Performance</span>
                                        <span className="mockup-badge blue">Passed</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Mobile Score</span>
                                        <span className="mockup-badge green">A+</span>
                                    </div>
                                    <div className="mockup-row">
                                        <span className="mockup-label">Accessibility</span>
                                        <span className="mockup-badge green">98%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
