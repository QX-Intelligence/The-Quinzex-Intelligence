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
const SmartDropdownMenu = ({ children, toggleLabel, toggleLink }) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => setOpen(false), 120);
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
                {open && (
                    <motion.div
                        className="menu-container-area"
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Inline Nav Variants ───────────────────────────────────────────────────
const menuContainerVariants = {
    hidden: { opacity: 0, width: 0 },
    show: {
        opacity: 1,
        width: 'auto',
        transition: {
            duration: 0.22,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.03,
            delayChildren: 0.02
        }
    },
    exit: {
        opacity: 0,
        width: 0,
        transition: { duration: 0.14, ease: [0.16, 1, 0.3, 1] }
    }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -6, filter: 'blur(2px)' },
    show: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.14, ease: [0.16, 1, 0.3, 1] }
    }
};

const Navbar = ({ onOpenMenu }) => {
    const [scrolled, setScrolled] = useState(false);
    const [navOpen, setNavOpen]   = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef              = useRef(null);

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
                                style={{ overflow: 'visible' }}
                            >
                                <nav
                                    className="nav-menu is-header w-layout-hflex"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingLeft: '8px' }}
                                >
                                    <motion.div variants={menuItemVariants} className="link-wrapper" onClick={() => setNavOpen(false)}>
                                        <Link to="/" className="nav-link dock-item-link">Home</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu toggleLink="/about" toggleLabel="About">
                                            <div className="menu-area-list w-layout-hflex">
                                                <Link to="/about" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fcffeb4a9ebce019aab78_9f7d0ed25b545b1c9973dfe3c39693df_Company.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Company</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Learn more about who we are.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/philosophy" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fd16f9f6e5aeeb4003d15_18e11a37c95e1e19488a0ea13bba4d6c_Careers.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Philosophy</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Our principles and engineering approach.</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu toggleLink="/services" toggleLabel="Divisions">
                                            <div className="menu-area-list w-layout-hflex">
                                                <Link to="/services" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fd0dcbf5f6a96bfbeae54_b6c4bda0b2401eb124ce8df8645e54d3_Engineering.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Engineering</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Custom software & high-scale architecture.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/services" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fd107a6ecb0c6a51d9d95_7b0d744b74bbbe519b5b2984534f5aa1_Strategy.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">AI & Machine Learning</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Autonomous agents & intelligence pipelines.</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants} className="link-wrapper" onClick={() => setNavOpen(false)}>
                                        <Link to="/team" className="nav-link dock-item-link">Collective</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants} className="link-wrapper" onClick={() => setNavOpen(false)}>
                                        <Link to="/portfolio" className="nav-link dock-item-link">Selected Work</Link>
                                        <div className="hover-line"></div>
                                    </motion.div>

                                    <motion.div
                                        variants={menuItemVariants}
                                        className="link-wrapper"
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
