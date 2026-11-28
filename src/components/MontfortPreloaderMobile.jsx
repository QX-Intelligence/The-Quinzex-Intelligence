import React from 'react';

/**
 * Pure-CSS GPU-composited preloader for mobile and tablet viewports (<= 1024px).
 * Eliminates Framer Motion JS animation overhead while WebGL assets compile.
 */
const MontfortPreloaderMobile = ({
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
                <div
                    key={i}
                    className={`mp-mobile-column${isExiting ? ' is-exiting' : ''}`}
                    style={{
                        backgroundColor: i % 2 === 0 ? '#dce5ec' : '#d5e0e8',
                        borderRight: i < numColumns - 1 ? '1px solid rgba(15, 53, 84, 0.06)' : 'none',
                        transitionDelay: isExiting ? `${i * 45}ms` : '0ms'
                    }}
                />
            ))}
        </div>

        <div className={`mp-mobile-stage${isExiting ? ' is-exiting' : ''}`}>
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
                    <div className="mp-mobile-ring-outer" />
                    <div className="mp-mobile-ring-inner" />
                    <div className="mp-mobile-crest">{crest}</div>
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
                        <span
                            key={idx}
                            className="mp-mobile-letter"
                            style={{ animationDelay: `${140 + idx * 55}ms` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="mp-mobile-sub">
                    Software &amp; Cloud Engineering
                </div>

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
        </div>
    </div>
);

export default MontfortPreloaderMobile;
