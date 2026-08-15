import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';

const menuVariants = {
    hidden: { opacity: 0, scale: 0.98, y: -10 },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        transition: { 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.05,
            delayChildren: 0.1
        } 
    }
};

const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    }
};

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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        zIndex: 999999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '3.5rem 4rem 2.5rem 4rem',
                        overflowY: 'auto',
                        color: '#000000'
                    }}
                >
                    {/* Header Row: Brand & Close Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1400px', margin: '0 auto', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.15em', color: '#000000', textTransform: 'uppercase' }}>QUINZEX</span>
                            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', marginTop: '2px' }}>INTELLIGENCE</span>
                        </div>

                        <button 
                            type="button"
                            onClick={onClose}
                            style={{
                                background: '#f4f4f5',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                color: '#000000',
                                borderRadius: '50%',
                                width: '2.75rem',
                                height: '2.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            title="Close menu"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <motion.div 
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ 
                            display: 'flex', 
                            gap: '4rem', 
                            alignItems: 'stretch', 
                            width: '100%', 
                            maxWidth: '1400px', 
                            margin: '0 auto',
                            flex: 1
                        }}
                    >
                        {/* Left Column: Featured Image Card */}
                        <motion.div variants={linkVariants} style={{ flex: '0 0 380px', display: 'flex' }}>
                            <div style={{ 
                                position: 'relative', 
                                borderRadius: '1.25rem', 
                                overflow: 'hidden', 
                                width: '100%', 
                                minHeight: '380px',
                                border: '1px solid rgba(0, 0, 0, 0.08)'
                            }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=700&fit=crop&crop=center" 
                                    loading="lazy" 
                                    alt="Quinzex Intelligence team" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    color: '#ffffff'
                                }}>
                                    <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.35rem' }}>
                                        Bespoke Engineering
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3 }}>
                                        Quinzex Strategy &amp; Design Collective
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Area: 4 Clean Navigation Columns */}
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
                            
                            {/* Column 1: Company */}
                            <motion.div variants={linkVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '0.5rem' }}>
                                    Company
                                </div>
                                <Link to="/" className="fullmenu-link-light" onClick={onClose}>Home</Link>
                                <Link to="/about" className="fullmenu-link-light" onClick={onClose}>About Us</Link>
                                <Link to="/team" className="fullmenu-link-sub-light" onClick={onClose}>Our Team</Link>
                                <Link to="/careers" className="fullmenu-link-sub-light" onClick={onClose}>Careers</Link>
                            </motion.div>

                            {/* Column 2: Works */}
                            <motion.div variants={linkVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '0.5rem' }}>
                                    Works &amp; Case Studies
                                </div>
                                <Link to="/portfolio" className="fullmenu-link-light" onClick={onClose}>All Projects</Link>
                                <Link to="/project/career-vedha" className="fullmenu-link-sub-light" onClick={onClose}>CareerVedha</Link>
                                <Link to="/project/mh-marble" className="fullmenu-link-sub-light" onClick={onClose}>MH Marble</Link>
                                <Link to="/project/nexus" className="fullmenu-link-sub-light" onClick={onClose}>Nexus App</Link>
                                <Link to="/project/hrms" className="fullmenu-link-sub-light" onClick={onClose}>HRMS Platform</Link>
                            </motion.div>

                            {/* Column 3: Services & Philosophy */}
                            <motion.div variants={linkVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '0.5rem' }}>
                                    Expertise
                                </div>
                                <Link to="/services" className="fullmenu-link-light" onClick={onClose}>Tech Matrix</Link>
                                <Link to="/philosophy" className="fullmenu-link-sub-light" onClick={onClose}>Our Philosophy</Link>
                                <Link to="/features" className="fullmenu-link-sub-light" onClick={onClose}>Aura Architecture</Link>
                                <Link to="/quinzex/" className="fullmenu-link-sub-light" onClick={onClose} style={{ color: '#0f3554', fontWeight: 700 }}>Quinzex Platform ↗</Link>
                            </motion.div>

                            {/* Column 4: Startups & Contact */}
                            <motion.div variants={linkVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '0.5rem' }}>
                                    Startups &amp; Inquiries
                                </div>
                                <Link to="/startups" className="fullmenu-link-light" onClick={onClose}>Startup Sprints</Link>
                                <Link to="/contact" className="fullmenu-link-light" onClick={onClose}>Contact Partners</Link>
                                
                                <div style={{ marginTop: '1.5rem' }}>
                                    <Link 
                                        to="/contact" 
                                        onClick={onClose} 
                                        style={{ 
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            backgroundColor: '#000000',
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            padding: '0.65rem 1.25rem',
                                            borderRadius: '9999px',
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        Let's chat 👋
                                    </Link>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                    {/* Footer Row */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        width: '100%', 
                        maxWidth: '1400px', 
                        margin: '0 auto', 
                        paddingTop: '2.5rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        color: 'rgba(0, 0, 0, 0.5)',
                        fontSize: '0.85rem'
                    }}>
                        <div>© 2026 Quinzex Intelligence Inc.</div>
                        <div>hello@quinzexintelligence.com</div>
                        <a href="#form" onClick={onClose} style={{ color: '#000000', textDecoration: 'none', fontWeight: 600 }}>
                            Book strategy call →
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FullMenu;
