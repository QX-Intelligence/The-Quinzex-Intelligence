import React from 'react';
import { motion } from 'framer-motion';

/**
 * Desktop Framer Motion preloader (>= 1025px) preserving the original staggered
 * shutter curtain wipe, dual gyroscope orbit rings, and staggered typography.
 */
const MontfortPreloaderDesktop = ({
    numColumns,
    brandLetters,
    crest,
    isExiting,
    counterRef
}) => (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: isExiting ? 'none' : 'all',
            overflow: 'hidden',
            fontFamily: "'Montserrat', sans-serif"
        }}
    >
        {/* STAGGERED VERTICAL SHUTTER CURTAIN PANELS */}
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                width: '100%',
                height: '100%',
                zIndex: 1
            }}
        >
            {Array.from({ length: numColumns }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '0%' }}
                    animate={{ y: isExiting ? '-100%' : '0%' }}
                    transition={{
                        duration: 0.95,
                        delay: isExiting ? i * 0.05 : 0,
                        ease: [0.77, 0, 0.175, 1]
                    }}
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: i % 2 === 0 ? '#dce5ec' : '#d5e0e8',
                        borderRight: i < numColumns - 1 ? '1px solid rgba(15, 53, 84, 0.06)' : 'none',
                        position: 'relative'
                    }}
                />
            ))}
        </div>

        {/* CINEMATIC CLEAN CENTER BRAND PRELOADER */}
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -25 : 0 }}
            transition={{ duration: 0.45, ease: 'easeIn' }}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f3554',
                pointerEvents: 'none'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '170px',
                        height: '170px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '26px'
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '1px dashed rgba(15, 53, 84, 0.32)'
                        }}
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: '14px',
                            borderRadius: '50%',
                            border: '1px solid rgba(15, 53, 84, 0.16)'
                        }}
                    />

                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '52px',
                            height: '52px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {crest}
                    </motion.div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '14px',
                        marginBottom: '12px',
                        overflow: 'hidden'
                    }}
                >
                    {brandLetters.map((letter, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ y: 45, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.75,
                                delay: 0.2 + idx * 0.07,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                            style={{
                                fontSize: '34px',
                                fontWeight: 300,
                                letterSpacing: '0.12em',
                                color: '#0f3554',
                                display: 'inline-block'
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.65 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.36em',
                        textTransform: 'uppercase',
                        color: '#2d4f6e',
                        marginBottom: '32px'
                    }}
                >
                    Software &amp; Cloud Engineering
                </motion.div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontVariantNumeric: 'tabular-nums'
                    }}
                >
                    <span
                        ref={counterRef}
                        style={{
                            fontSize: '64px',
                            fontWeight: 200,
                            letterSpacing: '-0.02em',
                            color: '#0f3554',
                            lineHeight: 1
                        }}
                    >
                        00
                    </span>
                    <span
                        style={{
                            fontSize: '16px',
                            fontWeight: 400,
                            color: 'rgba(15, 53, 84, 0.45)',
                            letterSpacing: '0.05em'
                        }}
                    >
                        %
                    </span>
                </div>
            </div>
        </motion.div>
    </div>
);

export default MontfortPreloaderDesktop;
