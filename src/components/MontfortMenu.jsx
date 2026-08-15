import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const OFFICES = [
    { city: 'GENEVA', tz: 'Europe/Zurich', address: 'Rue du Rhône 42, 1204 Geneva, Switzerland' },
    { city: 'DUBAI', tz: 'Asia/Dubai', address: 'DIFC Gate Precinct 4, Level 5, Dubai, UAE' },
    { city: 'SINGAPORE', tz: 'Asia/Singapore', address: 'Marina Bay Financial Centre, Tower 1, Singapore' },
    { city: 'HOUSTON', tz: 'America/Chicago', address: '1000 Louisiana St, Suite 4800, Houston, TX, USA' }
];

const MENU_ITEMS = [
    { id: 'hero', label: 'Overview' },
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'what-we-do', label: 'What We Do' },
    { id: 'global-connectivity', label: 'Global Connectivity' },
    { id: 'sustainability', label: 'Sustainability & ESG' },
    { id: 'footer', label: 'Contact & Governance' }
];

const MontfortMenu = ({ isOpen, onClose, onNavigate }) => {
    const [officeTimes, setOfficeTimes] = useState({});

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();
            const times = {};
            OFFICES.forEach(off => {
                try {
                    times[off.city] = new Intl.DateTimeFormat('en-GB', {
                        timeZone: off.tz,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).format(now);
                } catch (e) {
                    times[off.city] = '12:00:00';
                }
            });
            setOfficeTimes(times);
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleItemClick = (id) => {
        onNavigate(id);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="luxury-menu-overlay"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                    <div className="menu-overlay-header">
                        <div className="brand-logo-wrap">
                            <span className="brand-title">MONTFORT GROUP</span>
                        </div>
                        <button className="menu-close-btn" onClick={onClose} aria-label="Close navigation menu">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="menu-overlay-content">
                        {/* Navigation Links */}
                        <div>
                            <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--active-accent)' }}>
                                DIRECTORY
                            </span>
                            <ul className="menu-nav-links" style={{ marginTop: '24px' }}>
                                {MENU_ITEMS.map((item, idx) => (
                                    <li 
                                        key={item.id} 
                                        className="menu-nav-link-item"
                                        onClick={() => handleItemClick(item.id)}
                                    >
                                        <span style={{ fontSize: '14px', color: 'var(--text-dim)', marginRight: '16px', fontFamily: 'var(--font-body)' }}>
                                            0{idx + 1}
                                        </span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Global Office Clocks */}
                        <div>
                            <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--active-accent)' }}>
                                GLOBAL HUBS & LOCAL TIME
                            </span>
                            <div className="office-clocks-grid" style={{ marginTop: '24px' }}>
                                {OFFICES.map((off) => (
                                    <div key={off.city} className="office-clock-card">
                                        <div className="office-city">{off.city}</div>
                                        <div className="office-time">{officeTimes[off.city] || '--:--:--'}</div>
                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
                                            {off.address}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                                <div style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>
                                    INVESTOR & MEDIA INQUIRIES
                                </div>
                                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                    corporate@mont-fort.com · +41 22 552 9000
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MontfortMenu;
