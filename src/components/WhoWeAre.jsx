import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
    return (
        <section id="design" className="section" style={{ borderBottom: '1px solid var(--grey)' }}>
            <div className="w-layout-blockcontainer container w-container" style={{ borderTop: '1px solid var(--grey)', paddingTop: '4rem', paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
                    
                    {/* Left Column: Manifesto & CTA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}
                    >
                        <div className="sect-dot-flex w-layout-hflex" style={{ gap: '0.5rem', alignItems: 'center' }}>
                            <div className="dot" style={{ backgroundColor: 'var(--red)', width: '0.5rem', height: '0.5rem', borderRadius: '50%' }}></div>
                            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, color: 'var(--grey-light)' }}>
                                Who we are
                            </div>
                        </div>

                        <h2 style={{ textAlign: 'left', margin: 0, fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                            Most of our clients experience the same gap — between what they are and how they're perceived.
                        </h2>
                        
                        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--grey-light)', lineHeight: 1.6, textAlign: 'left' }}>
                            Quinzex Intelligence is a high-performance software engineering and AI systems studio for tech and corporate leaders at turning points — pre-launch, post-pivot, market expansion, or a full repositioning. We've seen what happens when a company's technology infrastructure lags behind its ambition. Investors notice. Deals stall. Talent looks elsewhere.
                        </p>

                        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--grey-light)', lineHeight: 1.6, textAlign: 'left' }}>
                            We close that gap by turning internal truth into external perception — through clarity, position, signal, proof, and memory.
                        </p>

                        <a href="/about" className="btn-outline-charcoal" id="about-btn">
                            <span>About us</span>
                            <span style={{ fontSize: '0.8rem' }}>↗</span>
                        </a>
                    </motion.div>

                    {/* Right Column: Showreel / Video Thumbnail */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <div style={{ 
                            borderRadius: '1rem', 
                            overflow: 'hidden', 
                            border: '1px solid var(--grey)', 
                            position: 'relative',
                            aspectRatio: '4/3',
                            backgroundColor: 'var(--lightgray)'
                        }}>
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop&crop=center&q=80" 
                                loading="lazy" 
                                alt="Quinzex Intelligence team working"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ 
                                position: 'absolute', inset: 0, 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: 'rgba(0,0,0,0.25)'
                            }}>
                                <div style={{ 
                                    width: '3.5rem', height: '3.5rem', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'var(--white)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}>
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                                        <path d="M1 1l12 7L1 15V1z" fill="var(--black)"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--grey-light)' }}>Quinzex Showreel</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--black)' }}>Q</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
