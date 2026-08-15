import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from './Link';
import { projectData } from '../data/projects';

const ProjectDetail = ({ projectId }) => {
    const project = projectData[projectId] || projectData['career-vedha'];
    const imageRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [projectId]);

    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    if (!project) {
        return (
            <div className="section is-fullscreen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', color: '#0f3554' }}>
                <h2>Project Not Found</h2>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="project-detail-view"
        >
            <div className="project-detail-container">
                
                {/* ── TOP: Back Link & Category Badge ───────────────────────── */}
                <div className="project-detail-nav-bar">
                    <Link to="/portfolio" className="project-back-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Back to Selected Work</span>
                    </Link>

                    <div className="project-category-badge">
                        <span className="badge-pulse-dot"></span>
                        <span>{project.category} &bull; {project.year}</span>
                    </div>
                </div>

                {/* ── HERO: Title, Tagline & Action Button ──────────────────── */}
                <header className="project-detail-header">
                    <h1 className="project-headline">{project.title}</h1>
                    <p className="project-subheadline">{project.tagline}</p>

                    <div className="project-action-row">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="dock-btn-cta"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
                            >
                                <span>Visit Live Platform</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        )}
                        <a href="#narrative" className="dock-btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span>Read Architecture Brief</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                        </a>
                    </div>
                </header>

                {/* ── METRICS RIBBON: 3 High-Signal Glass Cards ──────────────── */}
                <div className="project-metrics-ribbon">
                    {project.results.metrics.map((metric, i) => (
                        <div className="project-metric-card" key={i}>
                            <div className="project-metric-num">{metric}</div>
                            <div className="project-metric-label">{project.results.labels[i]}</div>
                        </div>
                    ))}
                </div>

                {/* ── MEDIA HERO: Full-Width Showcase Frame ──────────────────── */}
                <div className="project-hero-media-frame" ref={imageRef}>
                    <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="project-hero-media-img"
                        style={{ y: yParallax }}
                    />
                    <div className="project-hero-media-overlay" />
                    <div className="project-hero-media-label">
                        <span>{project.title} &mdash; Architecture View</span>
                    </div>
                </div>

                {/* ── TECH STACK BADGES ──────────────────────────────────────── */}
                {project.tech && project.tech.length > 0 && (
                    <div className="project-tech-stack-wrap">
                        <span className="project-tech-stack-title">Engineered Stack</span>
                        <div className="project-tech-pills">
                            {project.tech.map((t, idx) => (
                                <span key={idx} className="project-tech-pill">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── NARRATIVE CASE STUDY DETAILS ───────────────────────────── */}
                <div id="narrative" className="project-narrative-cards-grid">
                    
                    {/* Card 1: The Challenge */}
                    <div className="project-narrative-card">
                        <div className="narrative-card-header">
                            <span className="narrative-step-num">01</span>
                            <h2 className="narrative-card-title">The Challenge</h2>
                        </div>
                        <p className="narrative-card-body">{project.challenge}</p>
                    </div>

                    {/* Card 2: The Architecture */}
                    <div className="project-narrative-card">
                        <div className="narrative-card-header">
                            <span className="narrative-step-num">02</span>
                            <h2 className="narrative-card-title">System Architecture</h2>
                        </div>
                        <p className="narrative-card-body">{project.architecture || project.solution}</p>
                    </div>

                    {/* Card 3: The Measurable Outcome */}
                    {project.outcome && (
                        <div className="project-narrative-card is-highlight">
                            <div className="narrative-card-header">
                                <span className="narrative-step-num">03</span>
                                <h2 className="narrative-card-title">Measurable Outcome</h2>
                            </div>
                            <p className="narrative-card-body">{project.outcome}</p>
                        </div>
                    )}
                </div>

                {/* ── NEXT CASE STUDY BANNER CARD ────────────────────────────── */}
                {project.next && (
                    <div className="project-next-case-wrapper">
                        <div className="project-next-case-header">
                            <span className="next-case-label-dot"></span>
                            <span className="next-case-label-text">Next Architecture Case Study</span>
                        </div>

                        <Link to={`/project/${project.next.id}`} className="project-next-card">
                            <div className="next-card-bg-wrap">
                                <img src={project.next.image} alt={project.next.title} className="next-card-bg-img" />
                                <div className="next-card-gradient-overlay" />
                            </div>

                            <div className="next-card-content">
                                <div>
                                    <span className="next-card-category">{project.next.category}</span>
                                    <h3 className="next-card-title">{project.next.title}</h3>
                                </div>
                                <div className="next-card-arrow-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

            </div>
        </motion.div>
    );
};

export default ProjectDetail;
