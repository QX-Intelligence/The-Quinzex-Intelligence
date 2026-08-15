import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';

const Magnetic = ({ children, className, href, style, ...props }) => {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const btn = ref.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.15;
        const dy = (e.clientY - cy) * 0.15;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleMouseLeave = () => {
        const btn = ref.current;
        if (btn) btn.style.transform = '';
    };

    return (
        <a
            ref={ref}
            className={className}
            href={href}
            style={{ ...style, transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </a>
    );
};

const SmartDropdownMenu = ({ toggleLink, toggleLabel, isSmall = false, children }) => {
    return (
        <div className="dropdown-menu w-dropdown">
            <div className="dropdown-toggle">
                <Link to={toggleLink} className="nav-link dock-item-link">{toggleLabel}</Link>
                <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4' viewBox='0 0 7 4'%3E%3Cpath d='M0 0l3.5 4L7 0' fill='none' stroke='%230f3554' stroke-width='1.2'/%3E%3C/svg%3E"
                    alt=""
                    className="icon-arrow-about"
                />
            </div>
            <nav className={`menu-area ${isSmall ? 'is-small' : ''}`}>
                {children}
            </nav>
        </div>
    );
};

const menuContainerVariants = {
    hidden: {
        opacity: 0,
        width: 0,
        scale: 0.98,
        filter: 'blur(3px)'
    },
    show: {
        opacity: 1,
        width: 'auto',
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.16,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.02,
            delayChildren: 0.01
        }
    },
    exit: {
        opacity: 0,
        width: 0,
        scale: 0.98,
        filter: 'blur(2px)',
        transition: {
            duration: 0.12,
            ease: [0.76, 0, 0.24, 1]
        }
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
    const wrapperRef              = useRef(null);

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
                style={{ position: 'relative' }}
            >
                {/* ── LEFT: Menu toggle + inline nav ─────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    {/* Hamburger + label */}
                    <button
                        onClick={() => setNavOpen(v => !v)}
                        style={{
                            display:      'flex',
                            alignItems:   'center',
                            gap:          '8px',
                            background:   'none',
                            border:       'none',
                            cursor:       'pointer',
                            padding:      '6px 12px',
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
                                animate={navOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.rect
                                x="0" y="9" width="18" height="2.5" rx="1.25" fill="#0f3554"
                                style={{ transformOrigin: '9px 7px' }}
                                animate={navOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </svg>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f3554', fontFamily: 'var(--font-main)', letterSpacing: '0.04em' }}>
                            {navOpen ? 'Close' : 'Menu'}
                        </span>
                    </button>

                    {/* Nav items slide in to the RIGHT of the button */}
                    <AnimatePresence>
                        {navOpen && (
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
                                                <Link to="/team" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fcffea1a74756a0ea9991_edabc52cff38743f22f94c9ff559f4ef_Our%20Team.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Our Team</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Meet the people behind.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/careers" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503c24b9058ebe3f531_b0965bb658c3b4935ff4f09ca731d691_Content%20Design%20%26%20Socials.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">Careers</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Join and grow with us</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu toggleLink="/portfolio" toggleLabel="Works">
                                            <div className="menu-area-list w-layout-hflex">
                                                <Link to="/portfolio" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fe0daab03c9f1bb1718c4_5c8d24e46fc57de9461bfac6d8624f76_Branding.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">All Projects</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Explore complete case studies.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/project/career-vedha" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fe0e10239b149c2a14060_914fbc70f5ca2721d8720d45fcf53533_Web%20Design.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">CareerVedha</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">50k+ EdTech Analytics Platform.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/project/mh-marble" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fe0e16d0c82b3823721e1_20fdc18bbacab0fb9433926d4e9bacb2_UXUI%20Design.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items">MH Marble</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">3D WebGL E-Commerce.</div>
                                                    </div>
                                                </Link>
                                                <Link to="/quinzex/" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0f3554', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>QX</div>
                                                    <div className="w-layout-vflex">
                                                        <div className="link-wrapper"><div className="nav-link-sub-items" style={{ color: '#0f3554', fontWeight: 600 }}>Quinzex Platform ↗</div><div className="hover-line"></div></div>
                                                        <div className="menu-items-detail-text">Explore interactive app.</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants}>
                                        <SmartDropdownMenu toggleLink="/services" toggleLabel="Services" isSmall={true}>
                                            <div className="menu-area-list w-layout-hflex">
                                                <div className="nav-services-flex w-layout-vflex">
                                                    <Link to="/services" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                        <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fe0e10239b149c2a14060_914fbc70f5ca2721d8720d45fcf53533_Web%20Design.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                        <div className="w-layout-vflex">
                                                            <div className="link-wrapper"><div className="nav-link-sub-items">Core Expertise</div><div className="hover-line"></div></div>
                                                            <div className="menu-items-detail-text">Enterprise Tech Matrix</div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/philosophy" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                        <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686fe0daab03c9f1bb1718c4_5c8d24e46fc57de9461bfac6d8624f76_Branding.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                        <div className="w-layout-vflex">
                                                            <div className="link-wrapper"><div className="nav-link-sub-items">Philosophy</div><div className="hover-line"></div></div>
                                                            <div className="menu-items-detail-text">Triple-A &amp; 5-Step Journey</div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/features" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                        <img src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503e2370d69422c28b3_1b7feb640e79e59978d46c353df27adc_SEO.svg" loading="lazy" alt="" className="menu-items-icon-img" />
                                                        <div className="w-layout-vflex">
                                                            <div className="link-wrapper"><div className="nav-link-sub-items">Aura Architecture</div><div className="hover-line"></div></div>
                                                            <div className="menu-items-detail-text">Low Latency &amp; Resilience</div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/quinzex/" className="menu-items w-inline-block" onClick={() => setNavOpen(false)}>
                                                        <div style={{ width: '24px', height: '24px', borderRadius: '5px', background: '#0f3554', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700 }}>QX</div>
                                                        <div className="w-layout-vflex">
                                                            <div className="link-wrapper"><div className="nav-link-sub-items" style={{ color: '#0f3554', fontWeight: 600 }}>Quinzex Platform ↗</div><div className="hover-line"></div></div>
                                                            <div className="menu-items-detail-text">Launch interactive ecosystem</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SmartDropdownMenu>
                                    </motion.div>

                                    <motion.div
                                        variants={menuItemVariants}
                                        className="link-wrapper"
                                        onClick={() => {
                                            setNavOpen(false);
                                            onOpenMenu();
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

                {/* ── CENTER: Brand Logo — absolutely centered, smoothly hidden when menu is open ────────── */}
                <Link
                    to="/"
                    className="dock-brand"
                    style={{
                        position:      'absolute',
                        left:          '50%',
                        top:           '50%',
                        transform:     'translate(-50%, -50%)',
                        zIndex:        1,
                        opacity:       navOpen ? 0 : 1,
                        pointerEvents: navOpen ? 'none' : 'auto',
                        transition:    'opacity 0.15s ease, transform 0.15s ease',
                        transformOrigin: 'center center'
                    }}
                >
                    <span className="dock-brand-name">Quinzex</span>
                </Link>

                {/* ── RIGHT: CTA ──────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Magnetic href="#form" className="dock-btn-cta">
                        <span>Let's chat</span>
                        <img
                            src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673a19276ccbf2bcc1c6be57_hand%20wave.avif"
                            loading="lazy"
                            alt=""
                            style={{ width: '1.1rem', height: '1.1rem' }}
                        />
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
export { Magnetic };
