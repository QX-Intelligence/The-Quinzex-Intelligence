import React from 'react';
import { navigate } from '../utils/navigation';

const MontfortFooter = ({ onScrollToChapter }) => {
    const handleNavigation = (e, target) => {
        e.preventDefault();
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

        if (target.startsWith('#')) {
            const chapterId = target.slice(1);
            if (isHomePage) {
                if (onScrollToChapter) {
                    onScrollToChapter(chapterId);
                } else {
                    const el = document.getElementById(chapterId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate(`/#${chapterId}`);
            }
        } else if (target.startsWith('/')) {
            navigate(target);
        }
    };

    return (
        <footer className="ic-creative-footer">
            <div className="ic-footer-card-wrapper">
                {/* FLOATING WHITE CARD (EXACTLY MATCHING SPECIFICATION) */}
                <div className="ic-footer-floating-card">
                    <div className="ic-footer-card-grid">
                        {/* Brand Column */}
                        <div className="ic-footer-brand-col">
                            <div className="ic-footer-card-brand">
                                <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
                                    <circle cx="22" cy="13" r="3.6" fill="#0f3554" />
                                    <circle cx="11" cy="22" r="3.6" fill="#0f3554" />
                                    <circle cx="33" cy="22" r="3.6" fill="#0f3554" />
                                    <circle cx="15" cy="33" r="3.2" fill="#0f3554" />
                                    <circle cx="29" cy="33" r="3.2" fill="#0f3554" />
                                    <circle cx="22" cy="24" r="2.8" fill="#0f3554" />
                                </svg>
                                <span className="ic-footer-card-name">QUINZEX</span>
                            </div>
                            <p className="ic-footer-card-desc">
                                Quinzex empowers modern technology leaders to engineer resilient cloud platforms and generative AI systems.
                            </p>
                            <div className="ic-footer-social-row">
                                <a 
                                    href="https://twitter.com/quinzex" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="X (Twitter)" 
                                    className="ic-footer-social-icon"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://linkedin.com/company/quinzex" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="LinkedIn" 
                                    className="ic-footer-social-icon"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.7a1.65 1.65 0 0 0-1.66 1.65 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.65 1.65 0 0 0 7.83 6.7z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://github.com/quinzex" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label="GitHub" 
                                    className="ic-footer-social-icon"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="mailto:hello@quinzexintelligence.com" 
                                    aria-label="Email Studio" 
                                    className="ic-footer-social-icon"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* 3 Navigation Columns */}
                        <div className="ic-footer-columns-group">
                            <div className="ic-footer-column">
                                <span className="ic-footer-col-title">Product</span>
                                <a href="#Hero" onClick={(e) => handleNavigation(e, '#Hero')}>Overview</a>
                                <a href="#WhoWeAre" onClick={(e) => handleNavigation(e, '#WhoWeAre')}>Who We Are</a>
                                <a href="#WhatWeDo" onClick={(e) => handleNavigation(e, '#WhatWeDo')}>Capabilities</a>
                                <a href="#GlobalConnectivity" onClick={(e) => handleNavigation(e, '#GlobalConnectivity')}>Selected Work</a>
                                <a href="#Sustainability" onClick={(e) => handleNavigation(e, '#Sustainability')}>Our Team</a>
                            </div>

                            <div className="ic-footer-column">
                                <span className="ic-footer-col-title">Resources</span>
                                <a href="https://cal.com/quinzex/discovery" target="_blank" rel="noopener noreferrer">Discovery Call</a>
                                <a href="#form" onClick={(e) => handleNavigation(e, '#form')}>Start Project</a>
                                <a href="mailto:hello@quinzexintelligence.com">Architecture Audits</a>
                                <a href="mailto:hello@quinzexintelligence.com">Documentation</a>
                            </div>

                            <div className="ic-footer-column">
                                <span className="ic-footer-col-title">Company</span>
                                <a href="mailto:hello@quinzexintelligence.com">hello@quinzexintelligence.com</a>
                                <a href="mailto:partners@quinzexintelligence.com">partners@quinzexintelligence.com</a>
                                <a href="#Sustainability" onClick={(e) => handleNavigation(e, '#Sustainability')}>Careers</a>
                                <span className="ic-footer-col-note">Global Studio<br />US · EU · APAC</span>
                            </div>
                        </div>
                    </div>

                    {/* Thin Divider Line */}
                    <div className="ic-footer-card-divider" />

                    {/* Bottom Row */}
                    <div className="ic-footer-card-bottom">
                        <span className="ic-footer-card-copyright">
                            &copy; 2026 Quinzex Intelligence. All rights reserved.
                        </span>
                        <div className="ic-footer-card-legal">
                            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                            <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookies Settings</a>
                        </div>
                    </div>
                </div>

                {/* GIANT OUTLINED QUINZEX WATERMARK BEHIND/BELOW CARD */}
                <div className="ic-footer-watermark" aria-hidden="true">
                    <span className="ic-footer-watermark-text">QUINZEX</span>
                </div>
            </div>
        </footer>
    );
};

export default MontfortFooter;
