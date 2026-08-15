import React from 'react';
import Link from './Link';

const MontfortFooter = () => {
    return (
        <footer className="exact-montfort-footer" style={{ borderTop: '1px solid rgba(15, 53, 84, 0.1)', marginTop: '4rem' }}>
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
                        <Link to="/contact" className="dock-btn-cta" style={{ display: 'inline-flex' }}>
                            START A CONVERSATION
                        </Link>
                        <a href="/quinzex/" className="dock-btn-cta" style={{ display: 'inline-flex', background: 'rgba(15, 53, 84, 0.08)', color: '#0f3554', border: '1px solid rgba(15, 53, 84, 0.2)' }}>
                            LAUNCH PLATFORM ↗
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="footer-office-title">NAVIGATION</h4>
                    <ul className="footer-nav-list">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/team">The Collective</Link></li>
                        <li><Link to="/services">Core Expertise</Link></li>
                        <li><Link to="/portfolio">Selected Work</Link></li>
                        <li><Link to="/philosophy">Our Philosophy</Link></li>
                        <li><Link to="/features">Aura Architecture</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="footer-office-title">CAPABILITIES</h4>
                    <ul className="footer-nav-list">
                        <li><Link to="/services">WebGL &amp; 3D Design</Link></li>
                        <li><Link to="/services">Brand &amp; Positioning</Link></li>
                        <li><Link to="/services">Distributed Microservices</Link></li>
                        <li><Link to="/services">AI Agents &amp; Workflows</Link></li>
                        <li><Link to="/services">Cloud &amp; DevOps Pipelines</Link></li>
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
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Link to="/privacy" style={{ fontSize: '11px', color: 'rgba(15, 53, 84, 0.6)', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link to="/terms" style={{ fontSize: '11px', color: 'rgba(15, 53, 84, 0.6)', textDecoration: 'none' }}>Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default MontfortFooter;
