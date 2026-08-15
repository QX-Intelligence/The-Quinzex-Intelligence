import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 700, mass: 0.08 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Detect surface background color
            const elem = document.elementFromPoint(e.clientX, e.clientY);
            if (elem) {
                let current = elem;
                let dark = false;

                while (current && current !== document.documentElement) {
                    if (current.matches && current.matches('.resend-prefooter-wrap, .resend-footer-section, .hero, .dark-theme, [data-theme="dark"], .bg-black')) {
                        dark = true;
                        break;
                    }

                    const bg = window.getComputedStyle(current).backgroundColor;
                    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                        const rgb = bg.match(/\d+/g);
                        if (rgb && rgb.length >= 3) {
                            const r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
                            const a = rgb[3] !== undefined ? parseFloat(rgb[3]) : 1;
                            if (a > 0.3) {
                                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                                dark = luminance < 0.5;
                                break;
                            }
                        }
                    }
                    current = current.parentElement;
                }
                setIsDarkTheme(dark);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.closest('a, button, p, h1, h2, h3, h4, h5, h6, span, label, input, textarea, li, img, svg, .menu-open, .arrow-slider, .grid-standart-services, .fs-checkbox_field, .submit-button, .img-project-wrapper, .link-wrapper-is-project, .main-btn, .main_btn-black, .scroll-down-link, .scroll-up-link, .menu-close, .lightbox-link, .dock-item-link, .menu-items, .dock-btn-cta, .fullmenu-link-light, .fullmenu-link-sub-light');
            setIsHovered(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible, cursorX, cursorY]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className="cursor-area">
            <motion.div
                className={`cursor ${isHovered ? 'grow' : ''} ${isDarkTheme ? 'on-dark' : 'on-light'}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div className="cursor-dot" />
            </motion.div>
        </div>,
        document.body
    );
};

export default CustomCursor;
