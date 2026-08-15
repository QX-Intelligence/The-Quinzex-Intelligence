import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

const NEWS_ARTICLES = [
    {
        id: 1,
        date: 'AUGUST 2026',
        category: 'COMMODITY TRADING',
        title: 'Montfort Expands Clean Fuels & LNG Terminal Capacity Across Asia-Pacific',
        summary: 'Strategic acquisition of deep-water storage facilities bolsters reliable supply chains for low-emission liquefied gases and marine fuels.'
    },
    {
        id: 2,
        date: 'JULY 2026',
        category: 'MARITIME LOGISTICS',
        title: 'Deployment of Next-Gen Eco-VLCC Fleet with Dual-Fuel Propulsion',
        summary: 'Delivery of 4 state-of-the-art very large crude carriers engineered for 35% reduced carbon intensity and real-time voyage optimization.'
    },
    {
        id: 3,
        date: 'JUNE 2026',
        category: 'ENERGY INVESTMENTS',
        title: 'Fort Energy Commits $450M to Bio-Bunkering & Hydrogen Infrastructure in UAE',
        summary: 'Accelerating the energy transition through targeted investments in sustainable aviation fuels, green methanol, and smart grid storage.'
    },
    {
        id: 4,
        date: 'MAY 2026',
        category: 'CAPITAL MARKETS',
        title: 'Montfort Capital Closes Global Commodities Real Assets Fund II at $1.8B',
        summary: 'Institutional investor backing reinforces our disciplined approach to energy security and long-term asset value creation.'
    }
];

const NewsDrawer = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="news-drawer-backdrop" onClick={onClose}>
                    <motion.aside 
                        className="news-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--active-accent)' }}>
                                    MARKET INTELLIGENCE
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '4px' }}>
                                    Latest Press Releases
                                </h3>
                            </div>
                            <button className="menu-close-btn" onClick={onClose} aria-label="Close news drawer">
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                            {NEWS_ARTICLES.map((article) => (
                                <article key={article.id} className="news-article-card">
                                    <div className="news-article-date">
                                        {article.date} — {article.category}
                                    </div>
                                    <h4 className="news-article-title">
                                        {article.title}
                                    </h4>
                                    <p className="news-article-summary">
                                        {article.summary}
                                    </p>
                                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--active-accent)', cursor: 'pointer' }}>
                                        <span>READ FULL REPORT</span>
                                        <ArrowUpRight size={14} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NewsDrawer;
