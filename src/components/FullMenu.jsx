import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';

const PRIMARY_NAV = [
    { num: '01', label: 'Home', path: '/' },
    { num: '02', label: 'About Us', path: '/about' },
    { num: '03', label: 'Selected Work', path: '/portfolio' },
    { num: '04', label: 'Tech Matrix', path: '/services' },
    { num: '05', label: 'The Collective', path: '/team' },
    { num: '06', label: 'Startup Sprints', path: '/startups' },
    { num: '07', label: 'Contact', path: '/contact' },
];

const FEATURED_PROJECTS = [
    { title: 'CareerVedha', path: '/project/career-vedha', category: 'EdTech & WebSocket Engine' },
    { title: 'MH Marble', path: '/project/mh-marble', category: '3D WebGL Inspector' },
    { title: 'Nexus Platform', path: '/project/nexus', category: 'Sub-100ms Messaging' },
    { title: 'HRMS Platform', path: '/project/hrms', category: 'Enterprise Core' },
];

const FullMenu = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fullmenu-overlay"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="fullmenu-wrap">
                        {/* Top Bar: Brand Crest & Close Button */}
                        <header className="fullmenu-header">
                            <div className="fullmenu-brand">
                                <span className="fullmenu-brand-name">QUINZEX</span>
                                <span className="fullmenu-brand-tagline">INTELLIGENCE</span>
                            </div>

                            <button 
                                type="button"
                                onClick={onClose}
                                className="fullmenu-close-btn"
                                aria-label="Close navigation"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </header>

                        {/* Main Body: Editorial Nav List + Quick Context Side Panel */}
                        <div className="fullmenu-body">
                            {/* Primary Navigation Links */}
                            <nav className="fullmenu-nav-list" aria-label="Main Navigation">
                                {PRIMARY_NAV.map((item, idx) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.25, delay: idx * 0.035 }}
                                    >
                                        <Link 
                                            to={item.path} 
                                            onClick={onClose} 
                                            className="fullmenu-nav-item"
                                        >
                                            <span className="fullmenu-nav-num">{item.num}</span>
                                            <span className="fullmenu-nav-label">{item.label}</span>
                                            <span className="fullmenu-nav-arrow">→</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Secondary Side Panel (Desktop featured work & studio locations) */}
                            <div className="fullmenu-side-panel">
                                <div className="fullmenu-side-block">
                                    <div className="fullmenu-side-heading">Selected Case Studies</div>
                                    <div className="fullmenu-featured-list">
                                        {FEATURED_PROJECTS.map((proj) => (
                                            <Link 
                                                key={proj.path} 
                                                to={proj.path} 
                                                onClick={onClose}
                                                className="fullmenu-featured-item"
                                            >
                                                <span className="fullmenu-featured-title">{proj.title}</span>
                                                <span className="fullmenu-featured-cat">{proj.category}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="fullmenu-side-block">
                                    <div className="fullmenu-side-heading">Studio Inquiries</div>
                                    <a href="mailto:hello@quinzexintelligence.com" className="fullmenu-side-email">
                                        hello@quinzexintelligence.com
                                    </a>
                                    <div className="fullmenu-side-studios">
                                        Geneva &bull; London &bull; San Francisco
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Footer Ribbon */}
                        <footer className="fullmenu-footer">
                            <Link 
                                to="/contact" 
                                onClick={onClose} 
                                className="fullmenu-cta-btn"
                            >
                                <span>Book Strategy Call</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>

                            <div className="fullmenu-footer-info">
                                <span>&copy; {new Date().getFullYear()} Quinzex Intelligence Inc.</span>
                                <span className="footer-dot">&bull;</span>
                                <a href="/quinzex/" onClick={onClose} className="fullmenu-platform-link">
                                    Platform Demo ↗
                                </a>
                            </div>
                        </footer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FullMenu;
