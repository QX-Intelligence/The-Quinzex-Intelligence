import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';

const Footer = () => {
    const [showScrollUp, setShowScrollUp] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 600, y: 150 });
    const svgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollUp(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMouseMove = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        // Map cursor position to SVG viewBox (0..1200, 0..260)
        const x = ((e.clientX - rect.left) / rect.width) * 1200;
        const y = ((e.clientY - rect.top) / rect.height) * 260;
        setMousePos({ x, y });
    };

    return (
        <div style={{ backgroundColor: '#000000', color: '#a1a1aa' }}>
            {/* Pre-Footer CTA Section */}
            <div className="resend-prefooter-wrap">
                <div className="w-layout-blockcontainer container w-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="resend-prefooter-title">
                            Digital excellence.<br />Available today.
                        </h2>

                        <div className="resend-cta-buttons">
                            <Link to="/contact" className="resend-btn-getstarted">
                                <span>Get started</span>
                                <span style={{ opacity: 0.6 }}>›</span>
                            </Link>

                            <Link to="/contact" className="resend-btn-contact">
                                <span>Contact us</span>
                                <span style={{ opacity: 0.6 }}>›</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Giant Outlined Watermark Brand Text: Quinzex (Titlecase, Peeping Top Half, Crisp 1px Rim Light) */}
                <motion.div 
                    className="resend-giant-watermark-container"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <svg 
                        ref={svgRef}
                        className="resend-giant-svg" 
                        viewBox="0 0 1400 340" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <radialGradient 
                                id="rimSpotlight" 
                                cx={mousePos.x} 
                                cy={mousePos.y} 
                                r="380" 
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
                            </radialGradient>
                            <radialGradient 
                                id="bodySpotlight" 
                                cx={mousePos.x} 
                                cy={mousePos.y} 
                                r="380" 
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stopColor="#1e2028" />
                                <stop offset="60%" stopColor="#0e0f12" />
                                <stop offset="100%" stopColor="#0a0a0c" />
                            </radialGradient>
                        </defs>

                        {/* Titlecase 'Quinzex' - Stretched, Bigger & Pushed Down */}
                        <text
                            x="50%"
                            y="63%"
                            dominantBaseline="central"
                            textAnchor="middle"
                            fontFamily="'Dr Sugiyama', cursive"
                            fontWeight="400"
                            fontSize="290"
                            letterSpacing="0.05em"
                            fill={isHovered ? "url(#bodySpotlight)" : "#0e0f12"}
                            stroke={isHovered ? "url(#rimSpotlight)" : "rgba(255, 255, 255, 0.18)"}
                            strokeWidth="1.2"
                            paintOrder="stroke fill"
                            style={{
                                cursor: 'pointer',
                                transition: 'stroke 0.12s ease, fill 0.2s ease'
                            }}
                        >
                            Quinzex
                        </text>
                    </svg>
                </motion.div>
            </div>

            {/* Footer Main Section */}
            <footer className="resend-footer-section" style={{ borderTop: 'none' }}>
                {/* Top gradient glow line matching Resend */}
                <div className="resend-footer-glow-line" />

                <div className="w-layout-blockcontainer container w-container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="resend-footer-grid">
                            
                            {/* Left Column: Address, Socials & Status Pill */}
                            <div className="resend-footer-left">
                                <p className="resend-footer-address">
                                    2261 Market Street #5039<br/>
                                    San Francisco, CA 94114
                                </p>

                                {/* Social Icons */}
                                <div className="resend-footer-socials">
                                    {/* X (Twitter) */}
                                    <a 
                                        href="https://x.com/quinzex" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="resend-social-btn"
                                        title="X (Twitter)"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>

                                    {/* GitHub */}
                                    <a 
                                        href="https://github.com/quinzex" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="resend-social-btn"
                                        title="GitHub"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                        </svg>
                                    </a>

                                    {/* LinkedIn */}
                                    <a 
                                        href="https://linkedin.com/company/quinzex" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="resend-social-btn"
                                        title="LinkedIn"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                        </svg>
                                    </a>

                                    {/* YouTube */}
                                    <a 
                                        href="https://youtube.com/@quinzex" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="resend-social-btn"
                                        title="YouTube"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </a>
                                </div>

                            </div>

                            {/* 5 Column Navigation Grid */}
                            <div className="resend-footer-cols">
                                
                                {/* Column 1: Features */}
                                <div className="resend-footer-col">
                                    <p className="resend-footer-col-title">Features</p>
                                    <ul className="resend-footer-links-list">
                                        <li><Link to="/quinzex/" className="resend-footer-link" style={{ color: '#ffffff', fontWeight: 600 }}>Quinzex Platform ↗</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Automations</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Audiences</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Broadcasts</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Inbound</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Templates</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Webhooks</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Dedicated IPs</Link></li>
                                    </ul>
                                </div>

                                {/* Column 2: Resources */}
                                <div className="resend-footer-col">
                                    <p className="resend-footer-col-title">Resources</p>
                                    <ul className="resend-footer-links-list">
                                        <li><Link to="/quinzex/" className="resend-footer-link" style={{ color: '#ffffff', fontWeight: 500 }}>Quinzex App ↗</Link></li>
                                        <li><Link to="/changelog" className="resend-footer-link">Changelog</Link></li>
                                        <li><Link to="/pricing" className="resend-footer-link">Pricing</Link></li>
                                        <li><Link to="/security" className="resend-footer-link">Security</Link></li>
                                        <li><Link to="/security" className="resend-footer-link">SOC 2</Link></li>
                                        <li><Link to="/security" className="resend-footer-link">GDPR</Link></li>
                                        <li><Link to="/brand" className="resend-footer-link">Brand</Link></li>
                                    </ul>
                                </div>

                                {/* Column 3: Company */}
                                <div className="resend-footer-col">
                                    <p className="resend-footer-col-title">Company</p>
                                    <ul className="resend-footer-links-list">
                                        <li><Link to="/about" className="resend-footer-link">About</Link></li>
                                        <li><Link to="/blog" className="resend-footer-link">Blog</Link></li>
                                        <li><Link to="/careers" className="resend-footer-link">Careers</Link></li>
                                        <li><Link to="/startups" className="resend-footer-link">Clubs</Link></li>
                                        <li><Link to="/customers" className="resend-footer-link">Customers</Link></li>
                                        <li><Link to="/about" className="resend-footer-link">Humans</Link></li>
                                        <li><Link to="/about" className="resend-footer-link">Philosophy</Link></li>
                                    </ul>
                                </div>

                                {/* Column 4: Help */}
                                <div className="resend-footer-col">
                                    <p className="resend-footer-col-title">Help</p>
                                    <ul className="resend-footer-links-list">
                                        <li><Link to="/contact" className="resend-footer-link">Contact</Link></li>
                                        <li><Link to="/contact" className="resend-footer-link">Support</Link></li>
                                        <li><Link to="/status" className="resend-footer-link">Status</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Migrate</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Knowledge base</Link></li>
                                        <li><Link to="/privacy" className="resend-footer-link">Legal policies</Link></li>
                                    </ul>
                                </div>

                                {/* Column 5: Community */}
                                <div className="resend-footer-col">
                                    <p className="resend-footer-col-title">Community</p>
                                    <ul className="resend-footer-links-list">
                                        <li><Link to="/events" className="resend-footer-link">Events</Link></li>
                                        <li><Link to="/startups" className="resend-footer-link">Insiders</Link></li>
                                        <li><Link to="/services" className="resend-footer-link">Open source</Link></li>
                                        <li><Link to="/brand" className="resend-footer-link">Wallpapers</Link></li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        {/* Footer Bottom Bar: Copyright & Legal */}
                        <div className="resend-footer-bottom">
                            <div>
                                <span>© 2026 Quinzex Intelligence Inc. All rights reserved.</span>
                            </div>

                            <div className="resend-footer-legal-links">
                                <Link to="/privacy" className="resend-footer-legal-link">Privacy Policy</Link>
                                <Link to="/privacy" className="resend-footer-legal-link">Terms of Service</Link>
                                <Link to="/security" className="resend-footer-legal-link">Security</Link>
                            </div>
                        </div>

                        {/* Back to top button floating */}
                        <AnimatePresence>
                            {showScrollUp && (
                                <motion.a 
                                    href="#top" 
                                    onClick={scrollToTop}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ 
                                        position: 'fixed', 
                                        bottom: '2rem', 
                                        right: '2rem', 
                                        zIndex: 99,
                                        width: '2.5rem', 
                                        height: '2.5rem', 
                                        borderRadius: '50%',
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                    }}
                                    title="Scroll to top"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 19V5M5 12l7-7 7 7"/>
                                    </svg>
                                </motion.a>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
