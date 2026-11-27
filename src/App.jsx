import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/montfort.css';
import MontfortCanvas from './components/MontfortCanvas';
import Navbar from './components/Navbar';
import ChapterHUD from './components/ChapterHUD';
import MontfortSections from './components/MontfortSections';
import FullMenu from './components/FullMenu';
import MontfortPreloader from './components/MontfortPreloader';
import SubPage from './components/SubPage';
import ProjectDetail from './components/ProjectDetail';
import MemberProfile from './components/MemberProfile';
import MontfortFooter from './components/MontfortFooter';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [activeChapter, setActiveChapter] = useState('WhoWeAre');
    const [isInFooter, setIsInFooter] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

    const lenisRef = useRef(null);

    // Synchronize Client-Side Routing and History
    useEffect(() => {
        const handleNav = (e) => {
            const newPath = e.detail?.to || window.location.pathname;
            if (newPath && (newPath.startsWith('/quinzex') || newPath.startsWith('http'))) {
                window.location.href = newPath;
                return;
            }
            if (newPath.startsWith('#')) {
                const el = document.getElementById(newPath.replace('#', ''));
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                return;
            }
            window.history.pushState({}, '', newPath);
            setCurrentPath(newPath);
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        window.addEventListener('nav-navigate', handleNav);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('nav-navigate', handleNav);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Initialize Lenis Momentum Smooth Scroll (desktop only) & Synchronize with GSAP
    useEffect(() => {
        const isTouchOrMobile = typeof window !== 'undefined' && (
            window.innerWidth <= 1024 ||
            window.matchMedia?.('(pointer: coarse)')?.matches
        );

        let lenis = null;
        let onTick = null;

        if (!isTouchOrMobile) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1.0,
                infinite: false
            });
            lenisRef.current = lenis;

            lenis.on('scroll', ScrollTrigger.update);

            onTick = (time) => {
                lenis.raf(time * 1000);
            };
            gsap.ticker.add(onTick);
            gsap.ticker.lagSmoothing(0);
        } else {
            lenisRef.current = null;
        }

        // Cache DOM nodes for scroll chapter & footer tracking
        const chapterIds = ['Sustainability', 'GlobalConnectivity', 'WhatWeDo', 'WhoWeAre'];
        const footerEl = document.querySelector('.ic-creative-footer');
        const chapterEls = chapterIds
            .map(id => ({ id, el: document.getElementById(id) }))
            .filter(item => item.el);

        let ticking = false;
        let scrollRafId = null;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            scrollRafId = requestAnimationFrame(() => {
                const winH = window.innerHeight;
                if (footerEl) {
                    const fRect = footerEl.getBoundingClientRect();
                    const nextInFooter = fRect.top < winH * 0.75;
                    setIsInFooter(prev => (prev === nextInFooter ? prev : nextInFooter));
                } else {
                    setIsInFooter(prev => (prev ? false : prev));
                }

                // Active Chapter detection matching section IDs on homepage
                const threshold = winH * 0.5;
                for (let i = 0; i < chapterEls.length; i++) {
                    const rect = chapterEls[i].el.getBoundingClientRect();
                    if (rect.top <= threshold) {
                        const found = chapterEls[i].id;
                        setActiveChapter(prev => (prev === found ? prev : found));
                        break;
                    }
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollRafId) cancelAnimationFrame(scrollRafId);
            if (onTick) gsap.ticker.remove(onTick);
            if (lenis) {
                lenis.destroy();
                lenisRef.current = null;
            }
            ScrollTrigger.killAll();
        };
    }, [currentPath]);

    // Smooth Scroll Navigation Handler
    const scrollToTarget = (targetId) => {
        const el = document.getElementById(targetId);
        if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Route classifications
    const isHome = currentPath === '/' || currentPath === '' || currentPath.startsWith('/#');
    const isProject = currentPath.startsWith('/project/') || currentPath.startsWith('/projects/');
    const isMember = (currentPath.startsWith('/member/') || currentPath.startsWith('/collective/')) && currentPath.split('/').filter(Boolean).length >= 2;
    const projectId = isProject ? currentPath.replace(/^\/projects?\//, '') : null;
    const memberId = isMember ? currentPath.replace(/^\/(member|collective)\//, '') : null;

    return (
        <div className="montfort-page">
            {/* Luxury Alpine Montfort/Quinzex Themed Preloader (24h Cookie Managed) */}
            <MontfortPreloader onDone={() => setIsLoaded(true)} />

            {/* Atmospheric Misty Cloud Layer */}
            <div className="cloud-mist-overlay" />

            {/* 3D WebGL Alpine Mountain Canvas Backdrop */}
            <MontfortCanvas />

            {/* Our Floating Dock Navbar */}
            <Navbar onOpenMenu={() => setMenuOpen(true)} />

            {/* Main Content Area Based on Route */}
            {isHome ? (
                <>
                    {/* Fixed Left Chapter Navigation HUD (Tracking Indicator) */}
                    <ChapterHUD 
                        activeChapter={activeChapter}
                        isInFooter={isInFooter}
                        onScrollToChapter={scrollToTarget}
                    />

                    {/* Main Scroll Content Sections with Quinzex Data */}
                    <MontfortSections onScrollToChapter={scrollToTarget} />
                </>
            ) : isProject ? (
                <>
                    <ProjectDetail projectId={projectId} />
                    <MontfortFooter />
                </>
            ) : isMember ? (
                <>
                    <MemberProfile memberId={memberId} />
                    <MontfortFooter />
                </>
            ) : (
                <>
                    <SubPage path={currentPath} />
                    <MontfortFooter />
                </>
            )}

            {/* Fullscreen Navigation Menu */}
            <FullMenu 
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </div>
    );
}

export default App;
