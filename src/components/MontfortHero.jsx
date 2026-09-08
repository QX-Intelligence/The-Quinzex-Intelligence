import React from 'react';
import { motion } from 'framer-motion';

const MontfortHero = () => {
    return (
        <div className="hero-monumental-container">
            {/* ── Monumental Colossal Typography (Full-Bleed Horizon Wordmark) ── */}
            <div className="hero-colossal-display">
                <motion.div 
                    className="colossal-wordmark-wrap"
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="colossal-title">QUINZEX</h1>
                </motion.div>
            </div>
        </div>
    );
};

export default MontfortHero;
