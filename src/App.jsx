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
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeChapter, setActiveChapter] = useState('WhoWeAre');
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

    // Initialize Lenis Momentum Smooth Scroll & Synchronize with GSAP
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
            infinite: false
        });
        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
            setScrollProgress(progress);

            // Active Chapter detection matching section IDs on homepage
            const chapters = ['WhoWeAre', 'WhatWeDo', 'GlobalConnectivity', 'Sustainability'];
            for (let i = chapters.length - 1; i >= 0; i--) {
                const el = document.getElementById(chapters[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.5) {
                        setActiveChapter(chapters[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            lenis.destroy();
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
            <MontfortCanvas scrollProgress={scrollProgress} />

            {/* Our Floating Dock Navbar */}
            <Navbar onOpenMenu={() => setMenuOpen(true)} />

            {/* Main Content Area Based on Route */}
            {isHome ? (
                <>
                    {/* Fixed Left Chapter Navigation HUD (Tracking Indicator) */}
                    <ChapterHUD 
                        activeChapter={activeChapter}
                        onScrollToChapter={scrollToTarget}
                    />

                    {/* Main Scroll Content Sections with Quinzex Data */}
                    <MontfortSections />
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
