import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';

// ── Magnetic Button Component ─────────────────────────────────────────────
const Magnetic = ({ children, className, href = '#form', onClick, style }) => {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.35;
        const y = (e.clientY - (top + height / 2)) * 0.35;
        setPos({ x, y });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }
        if (href?.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={handleClick}
            className={className}
            style={style}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.a>
    );
};

// ── Dropdown Helper ───────────────────────────────────────────────────────
const SmartDropdownMenu = ({ children, toggleLabel, toggleLink, id, activeMenu, setActiveMenu, menuTimerRef }) => {
    const isOpen = activeMenu === id;

    const handleMouseEnter = () => {
        if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
        setActiveMenu(id);
    };

    const handleMouseLeave = () => {
        if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
        menuTimerRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 180);
    };

    return (
        <div
            className="menu-dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <div className="link-wrapper">
                <Link to={toggleLink} className="nav-link dock-item-link">
                    {toggleLabel}
                </Link>
                <div className="hover-line"></div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="menu-container-area"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Inline Nav Variants ───────────────────────────────────────────────
// IMPORTANT: Do NOT animate width or height — it triggers layout reflow every
// frame which invalidates the backdrop-filter compositor cache, causing stutter.
// Only animate opacity + transform (compositor-only, zero reflow).
const menuContainerVariants = {
    hidden: { opacity: 0, x: -8 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.18,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.025,
            delayChildren: 0.01
        }
    },
    exit: {
        opacity: 0,
        x: -6,
        transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] }
    }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -5 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.14, ease: [0.16, 1, 0.3, 1] }
    }
};

const Navbar = ({ onOpenMenu }) => {
    const [scrolled, setScrolled]     = useState(false);
    const [navOpen, setNavOpen]       = useState(false);
    const [isMobile, setIsMobile]     = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const menuTimerRef                = useRef(null);
    const wrapperRef                  = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setNavOpen(false);
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleMenuToggle = () => {
        if (isMobile) {
            if (onOpenMenu) onOpenMenu();
        } else {
            setNavOpen(v => !v);
        }
    };

    return (
        <motion.div
            ref={wrapperRef}
            className={`dock-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={`dock-pill-container ${scrolled ? 'is-scrolled' : ''}`}
            >
                {/* ── LEFT: Menu toggle + inline nav ─────────────────── */}
                <div className="dock-left-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={handleMenuToggle}
                        className="dock-menu-btn"
                        style={{
                            display:      'flex',
                            alignItems:   'center',
                            gap:          '8px',
                            background:   'none',
                            border:       'none',
                            cursor:       'pointer',
                            padding:      '6px 10px',
                            borderRadius: '8px',
                            transition:   'background 0.12s ease',
                            flexShrink:   0,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 53, 84, 0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                            <motion.rect
                                x="0" y="2.5" width="18" height="2.5" rx="1.25" fill="#0f3554"
                                style={{ transformOrigin: '9px 7px' }}
                                animate={(!isMobile && navOpen) ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.rect
                                x="0" y="9" width="18" height="2.5" rx="1.25" fill="#0f3554"
                                style={{ transformOrigin: '9px 7px' }}
                                animate={(!isMobile && navOpen) ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </svg>
                        <span className="dock-menu-label" style={{ fontSize: '13px', fontWeight: 500, color: '#0f3554', fontFamily: 'var(--font-main)', letterSpacing: '0.04em' }}>
                            {!isMobile && navOpen ? 'Close' : 'Menu'}
                        </span>
                    </button>

                    {/* Desktop inline nav items slide in to the RIGHT of the button */}
                    <AnimatePresence>
                        {!isMobile && navOpen && (
                            <motion.div
                                key="inline-nav"
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                variants={menuContainerVariants}
                                style={{ overflow: 'visible', display: 'flex' }}
                            >
                                <nav
                                    className="nav-menu is-header w-layout-hflex"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingLeft: '8px' }}
                                >
                                    <motion.div 
                                        variants={menuItemVariants} 
                                        className="link-wrapper" 
                                        onMouseEnter={() => {
                                            if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
                                            setActiveMenu(null);
                                        }}
                                        onClick={() => setNavOpen(false)}
                                    >
                                        <Link to="/" className="nav-link dock-item-link">Home</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu 
                                            id="about"
                                            activeMenu={activeMenu}
                                            setActiveMenu={setActiveMenu}
                                            menuTimerRef={menuTimerRef}
                                            toggleLink="/about" 
                                            toggleLabel="About"
                                        >
                                            <div className="menu-area-list w-layout-hflex">
                                                <Link to="/about" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f3554" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="menu-items-icon-img">
                                                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                                        <line x1="9" y1="22" x2="9" y2="18" />
                                                        <line x1="15" y1="22" x2="15" y2="18" />
                                                        <line x1="9" y1="6" x2="9.01" y2="6" strokeWidth="2.4" />
                                                        <line x1="15" y1="6" x2="15.01" y2="6" strokeWidth="2.4" />
                                                        <line x1="9" y1="10" x2="9.01" y2="10" strokeWidth="2.4" />
                                                        <line x1="15" y1="10" x2="15.01" y2="10" strokeWidth="2.4" />
                                                        <line x1="9" y1="14" x2="9.01" y2="14" strokeWidth="2.4" />
                                                        <line x1="15" y1="14" x2="15.01" y2="14" strokeWidth="2.4" />
                                                    </svg>
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Company</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Learn more about who we are.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/philosophy" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f3554" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="menu-items-icon-img">
                                                        <polygon points="12 2 15.5 8.5 22 12 15.5 15.5 12 22 8.5 15.5 2 12 8.5 8.5 12 2" />
                                                        <circle cx="12" cy="12" r="2.5" fill="#0f3554" />
                                                    </svg>
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Philosophy</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Our principles and engineering approach.</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu 
                                            id="divisions"
                                            activeMenu={activeMenu}
                                            setActiveMenu={setActiveMenu}
                                            menuTimerRef={menuTimerRef}
                                            toggleLink="/services" 
                                            toggleLabel="Divisions"
                                        >
                                            <div className="menu-area-list w-layout-hflex">
                                                <Link to="/services" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f3554" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="menu-items-icon-img">
                                                        <polyline points="16 18 22 12 16 6" />
                                                        <polyline points="8 6 2 12 8 18" />
                                                        <line x1="14" y1="4" x2="10" y2="20" />
                                                    </svg>
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Engineering</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Custom software & high-scale architecture.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/services" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f3554" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="menu-items-icon-img">
                                                        <circle cx="12" cy="12" r="3.2" />
                                                        <circle cx="5" cy="6" r="2" />
                                                        <circle cx="19" cy="6" r="2" />
                                                        <circle cx="5" cy="18" r="2" />
                                                        <circle cx="19" cy="18" r="2" />
                                                        <line x1="6.8" y1="7.4" x2="10" y2="10.2" />
                                                        <line x1="17.2" y1="7.4" x2="14" y2="10.2" />
                                                        <line x1="6.8" y1="16.6" x2="10" y2="13.8" />
                                                        <line x1="17.2" y1="16.6" x2="14" y2="13.8" />
                                                    </svg>
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">AI & Machine Learning</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Autonomous agents & intelligence pipelines.</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div 
                                        variants={menuItemVariants} 
                                        className="link-wrapper" 
                                        onMouseEnter={() => {
                                            if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
                                            setActiveMenu(null);
                                        }}
                                        onClick={() => setNavOpen(false)}
                                    >
                                        <Link to="/team" className="nav-link dock-item-link">Our Team</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div 
                                        variants={menuItemVariants} 
                                        className="link-wrapper" 
                                        onMouseEnter={() => {
                                            if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
                                            setActiveMenu(null);
                                        }}
                                        onClick={() => setNavOpen(false)}
                                    >
                                        <Link to="/portfolio" className="nav-link dock-item-link">Selected Work</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div
                                        variants={menuItemVariants}
                                        className="link-wrapper"
                                        onMouseEnter={() => {
                                            if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
                                            setActiveMenu(null);
                                        }}
                                        onClick={() => {
                                            setNavOpen(false);
                                            if (onOpenMenu) onOpenMenu();
                                        }}
                                    >
                                        <span className="nav-link dock-item-link" style={{ cursor: 'pointer' }}>Full Menu</span>
                                        <div className="hover-line"></div>
                                    </motion.div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── CENTER: Brand Logo ─────────────────── */}
                <Link
                    to="/"
                    className="dock-brand"
                    style={{
                        position:      isMobile ? 'static' : 'absolute',
                        left:          isMobile ? 'auto' : '50%',
                        top:           isMobile ? 'auto' : '50%',
                        transform:     isMobile ? 'none' : 'translate(-50%, -50%)',
                        zIndex:        1,
                        opacity:       (!isMobile && navOpen) ? 0 : 1,
                        pointerEvents: (!isMobile && navOpen) ? 'none' : 'auto',
                        transition:    'opacity 0.15s ease, transform 0.15s ease',
                        textDecoration: 'none',
                        display:       'flex',
                        alignItems:    'center',
                        justifyContent:'center'
                    }}
                >
                    <span className="dock-brand-name">QUINZEX</span>
                </Link>

                {/* ── RIGHT: CTA ──────────────────────── */}
                <div className="dock-right-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <Magnetic href="#form" className="dock-btn-cta">
                        <span>{isMobile ? 'Chat 👋' : "Let's chat"}</span>
                        {!isMobile && (
                            <img
                                src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673a19276ccbf2bcc1c6be57_hand%20wave.avif"
                                loading="lazy"
                                alt=""
                                style={{ width: '1.1rem', height: '1.1rem' }}
                            />
                        )}
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
export { Magnetic };
