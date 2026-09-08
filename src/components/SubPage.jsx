import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from './Link';
import { teamMembers } from '../data/team';
import { projectsList } from '../data/projects';
import {
    techMatrix,
    engineeringPillars,
    philosophyPillars,
    clientJourney,
    auraFeatures,
    whyItMatters,
    privacyPolicyData,
    termsData
} from '../data/companyData';

const SubPage = ({ path }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [path]);

    // Normalize path aliases
    let activePath = path;
    if (path === '/collective') activePath = '/team';
    if (path === '/expertise') activePath = '/services';
    if (path === '/works') activePath = '/portfolio';

    const pageMeta = {
        "/about": {
            title: "About Us",
            category: "Who We Are",
            tagline: "We close the gap between what companies are and how they are perceived."
        },
        "/team": {
            title: "Our Team",
            category: "Our Team & Specialists",
            tagline: "An elite engineering team deployed to build your highest-stakes systems."
        },
        "/services": {
            title: "Core Expertise",
            category: "Infrastructure & Capabilities",
            tagline: "Bespoke digital engineering from high-performance frontends to resilient distributed microservices."
        },
        "/philosophy": {
            title: "Our Philosophy",
            category: "Operating Convictions",
            tagline: "An obsession with craft. We combine visual art, systems architecture, and automated infrastructure."
        },
        "/portfolio": {
            title: "Selected Work",
            category: "Client Case Studies",
            tagline: "Measurable architectural impact for fast-growing technology leaders and enterprise platforms."
        },
        "/features": {
            title: "Aura Architecture",
            category: "System Capabilities",
            tagline: "Modern cognitive integrations, ultra-low latency pipelines, and resilient system architecture."
        },
        "/careers": {
            title: "Careers & Engineering",
            category: "Join Our Ranks",
            tagline: "Work with elite global talent on high-impact projects."
        },
        "/startups": {
            title: "For Startups",
            category: "Startup Accelerator",
            tagline: "Pre-launch, post-pivot, and market expansion sprint packages."
        },
        "/contact": {
            title: "Start a Conversation",
            category: "Direct Inquiries",
            tagline: "Let's discuss your next engineering challenge, AI workflow, architecture overhaul, or digital product launch."
        },
        "/privacy": {
            title: privacyPolicyData.title,
            category: "Legal & Security",
            tagline: "Our commitment to protecting your privacy and confidential business data."
        },
        "/terms": {
            title: termsData.title,
            category: "Legal Terms",
            tagline: "Terms governing our software delivery, engagements, and intellectual property."
        }
    };

    const currentMeta = pageMeta[activePath] || {
        title: "Quinzex Intelligence",
        category: "Software Engineering & AI Systems",
        tagline: "High-performance software engineering, cloud architecture & AI systems studio for modern technology leaders."
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sub-page-view"
            style={{ paddingTop: '100px', minHeight: '100vh', color: '#0f3554' }}
        >
            {/* Subpage Hero Header */}
            <section className="section sub-page-hero" style={{ paddingBottom: '2.5rem' }}>
                <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div className="project-hero-grid">
                        <div className="sect-dot-flex w-layout-hflex" style={{ marginBottom: '1.5rem' }}>
                            <div className="dot"></div>
                            <div>{currentMeta.category}</div>
                        </div>
                        <h1 className="project-detail-title">{currentMeta.title}</h1>
                        <p className="project-detail-tagline">{currentMeta.tagline}</p>
                    </div>
                </div>
            </section>

            {/* Subpage Dynamic Content Body */}
            <section className="section sub-page-content-section" style={{ minHeight: '40vh', paddingBottom: '5rem' }}>
                <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

                    {/* ==================================================== */}
                    {/* 1. ABOUT PAGE                                        */}
                    {/* ==================================================== */}
                    {activePath === '/about' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="narrative-grid">
                                <div className="narrative-left">
                                    <div className="sect-dot-flex w-layout-hflex">
                                        <div className="dot"></div>
                                        <div>Our Manifesto</div>
                                    </div>
                                </div>
                                <div className="narrative-right">
                                    <p className="narrative-paragraph">
                                        Quinzex Intelligence is a bespoke software &amp; design studio for technology and corporate leaders at turning points. We believe that architecture, strategy, and design are not separate disciplines — they are three pillars of the same foundation. We reject generic templates and cookie-cutter approaches in favor of high-performance web applications and software systems that demand attention and drive growth.
                                    </p>
                                </div>
                            </div>

                            <div className="narrative-divider"></div>

                            <div className="narrative-grid">
                                <div className="narrative-left">
                                    <div className="sect-dot-flex w-layout-hflex">
                                        <div className="dot"></div>
                                        <div>The Engineering Model</div>
                                    </div>
                                </div>
                                <div className="narrative-right">
                                    <p className="narrative-paragraph">
                                        Unlike traditional agencies that carry massive overhead and assign juniors to critical accounts, we operate as a dedicated team of senior specialists. This model allows us to deploy the exact talent needed for your specific challenge — whether it is distributed microservices, a 3D WebGL brand overhaul, or custom AI telemetry — without friction, bureaucracy, or unnecessary price tags.
                                    </p>
                                </div>
                            </div>

                            <div className="narrative-divider"></div>

                            {/* Triple-A Standard Overview */}
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                    The Triple-A Standard
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                                    {philosophyPillars.map((p, idx) => (
                                        <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2rem' }}>
                                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f3554', marginBottom: '10px' }}>{p.title}</h4>
                                            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358', marginBottom: '16px' }}>{p.intro}</p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {p.points.map((pt, pIdx) => (
                                                    <li key={pIdx} style={{ fontSize: '13px', color: '#0f3554', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0f3554' }}></span>
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 2. TEAM / COLLECTIVE PAGE                            */}
                    {/* ==================================================== */}
                    {activePath === '/team' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                                {teamMembers.map((member, index) => (
                                    <motion.div 
                                        key={member.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.65)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(15, 53, 84, 0.08)',
                                            borderRadius: '1.25rem',
                                            padding: '2rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 12px 32px rgba(15, 53, 84, 0.04)'
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                <div style={{ width: '72px', height: '72px', borderRadius: '1rem', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(15, 53, 84, 0.15)' }}>
                                                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.25rem', fontWeight: 700, color: '#0f3554', marginBottom: '4px' }}>
                                                        {member.name}
                                                    </h3>
                                                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f3554', opacity: 0.85 }}>
                                                        {member.role}
                                                    </div>
                                                </div>
                                            </div>

                                            <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#2a4358', marginBottom: '1.5rem' }}>
                                                {member.description}
                                            </p>

                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '8px' }}>
                                                    Core Competencies
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {member.skills.flatMap(s => s.items).slice(0, 6).map((skill, sIdx) => (
                                                        <span key={sIdx} style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: 'rgba(15, 53, 84, 0.06)', color: '#0f3554' }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', paddingTop: '1rem', borderTop: '1px solid rgba(15, 53, 84, 0.08)' }}>
                                            <Link
                                                to={`/member/${member.id}`}
                                                className="dock-btn-cta"
                                                style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '8px 14px' }}
                                            >
                                                View Profile &rarr;
                                            </Link>
                                            {member.portfolioUrl && (
                                                <a
                                                    href={member.portfolioUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '8px 14px',
                                                        borderRadius: '999px',
                                                        background: 'rgba(15, 53, 84, 0.06)',
                                                        color: '#0f3554',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    Portfolio ↗
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 3. SERVICES / EXPERTISE PAGE                         */}
                    {/* ==================================================== */}
                    {activePath === '/services' && (
                        <div>
                            {/* Engineering Pillars */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                                {engineeringPillars.map((pillar, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2rem' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '8px' }}>
                                            {pillar.metric}
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.3rem', fontWeight: 700, color: '#0f3554', marginBottom: '10px' }}>
                                            {pillar.title}
                                        </h3>
                                        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358' }}>
                                            {pillar.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Tech Matrix */}
                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem', marginBottom: '4rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                    Enterprise Technology Matrix
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                                    {techMatrix.map((cat, idx) => (
                                        <div key={idx}>
                                            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '12px' }}>
                                                {cat.category}
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {cat.items.map((item, iIdx) => (
                                                    <span key={iIdx} style={{ fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '999px', background: 'rgba(15, 53, 84, 0.06)', color: '#0f3554' }}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 4. PHILOSOPHY PAGE                                   */}
                    {/* ==================================================== */}
                    {activePath === '/philosophy' && (
                        <div>
                            {/* Triple-A Standard */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                                {philosophyPillars.map((p, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '10px' }}>
                                            {p.title}
                                        </h3>
                                        <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#2a4358', marginBottom: '1.5rem' }}>
                                            {p.intro}
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {p.points.map((pt, pIdx) => (
                                                <li key={pIdx} style={{ fontSize: '13.5px', color: '#0f3554', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0f3554' }}></span>
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* 5-Step Client Journey */}
                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                    The 5-Step Engagement Journey
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    {clientJourney.map((step, sIdx) => (
                                        <div key={sIdx} style={{ borderLeft: '2px solid rgba(15, 53, 84, 0.2)', paddingLeft: '1.25rem' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f3554', marginBottom: '4px' }}>
                                                {step.step}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f3554', marginBottom: '8px' }}>
                                                {step.phase}
                                            </div>
                                            <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#2a4358' }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 5. PORTFOLIO / WORKS PAGE                            */}
                    {/* ==================================================== */}
                    {activePath === '/portfolio' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                                {projectsList.map((project, idx) => (
                                    <div
                                        key={project.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.65)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(15, 53, 84, 0.08)',
                                            borderRadius: '1.25rem',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 12px 32px rgba(15, 53, 84, 0.04)'
                                        }}
                                    >
                                        <div>
                                            <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                                                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, color: '#0f3554' }}>
                                                    {project.category}
                                                </div>
                                            </div>

                                            <div style={{ padding: '2rem' }}>
                                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '8px' }}>
                                                    {project.title}
                                                </h3>
                                                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358', marginBottom: '1.5rem' }}>
                                                    {project.tagline}
                                                </p>

                                                {/* Metrics */}
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '1rem', background: 'rgba(15, 53, 84, 0.04)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                                    {project.results.metrics.map((m, mIdx) => (
                                                        <div key={mIdx} style={{ textAlign: 'center' }}>
                                                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f3554' }}>{m}</div>
                                                            <div style={{ fontSize: '10px', color: 'rgba(15, 53, 84, 0.6)' }}>{project.results.labels[mIdx]}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ padding: '0 2rem 2rem 2rem', display: 'flex', gap: '10px' }}>
                                            <Link
                                                to={`/project/${project.id}`}
                                                className="dock-btn-cta"
                                                style={{ flex: 1, textAlign: 'center', fontSize: '12px', padding: '10px 14px' }}
                                            >
                                                Full Case Study &rarr;
                                            </Link>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '10px 14px',
                                                        borderRadius: '999px',
                                                        background: 'rgba(15, 53, 84, 0.06)',
                                                        color: '#0f3554',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    Live ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 6. FEATURES / AURA ARCHITECTURE                      */}
                    {/* ==================================================== */}
                    {activePath === '/features' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                                {auraFeatures.map((feat, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2rem' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', opacity: 0.6, marginBottom: '8px' }}>
                                            {feat.tech}
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.3rem', fontWeight: 700, color: '#0f3554', marginBottom: '10px' }}>
                                            {feat.title}
                                        </h3>
                                        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358' }}>
                                            {feat.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '1.5rem' }}>
                                    Why It Matters For Technology Leaders
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {whyItMatters.map((w, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f3554', marginTop: '6px', flexShrink: 0 }}></div>
                                            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#2a4358' }}>{w.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 7. CAREERS PAGE                                      */}
                    {/* ==================================================== */}
                    {activePath === '/careers' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                { title: "Senior Front-End Architect", type: "Contract / Remote", desc: "Expert in React, Next.js, Framer Motion, and building smooth, performance-optimized micro-interactions with 99+ Core Web Vitals." },
                                { title: "Lead Distributed Systems Engineer", type: "Contract / Remote", desc: "Craft robust Java Spring Boot and Node.js microservices, Redis caching layers, and high-concurrency event streams (Kafka)." },
                                { title: "Cloud & Infrastructure Architect", type: "Contract / Remote", desc: "Build automated EKS/Kubernetes CI/CD pipelines, zero-downtime blue/green deployments, and Terraform infrastructure as code." },
                                { title: "AI Workflow & Data Engineer", type: "Contract / Remote", desc: "Integrate agentic AI architectures, Python NLP models, and real-time telemetry dashboards for enterprise pipelines." }
                            ].map((role, idx) => (
                                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                                    <div style={{ maxWidth: '700px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(15, 53, 84, 0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{role.type}</div>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.3rem', fontWeight: 700, color: '#0f3554', marginBottom: '8px' }}>{role.title}</h3>
                                        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358' }}>{role.desc}</p>
                                    </div>
                                    <a href="mailto:careers@quinzexintelligence.com" className="dock-btn-cta">
                                        Apply to Team &rarr;
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 8. FOR STARTUPS PAGE                                 */}
                    {/* ==================================================== */}
                    {activePath === '/startups' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '8px' }}>Package 01</div>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '12px' }}>The 4-Week Launch Sprint</h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#2a4358', marginBottom: '1.5rem' }}>
                                    A fast-paced, high-intensity partnership designed to build your flagship digital MVP, establish institutional brand guidelines, and prepare your deck and interactive product for Seed or Series A funding rounds.
                                </p>
                                <a href="mailto:partners@quinzexintelligence.com?subject=Launch%20Sprint" className="dock-btn-cta">
                                    Inquire About Sprint &rarr;
                                </a>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '8px' }}>Package 02</div>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '12px' }}>Equity &amp; Hybrid Partnerships</h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#2a4358', marginBottom: '1.5rem' }}>
                                    For selected high-potential technology companies, we offer hybrid service agreements combining cash and equity. We deploy our senior architects directly into your team, aligning our upside completely with yours.
                                </p>
                                <a href="mailto:partners@quinzexintelligence.com?subject=Equity%20Partnership" className="dock-btn-cta">
                                    Propose Partnership &rarr;
                                </a>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 9. CONTACT PAGE                                      */}
                    {/* ==================================================== */}
                    {activePath === '/contact' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '1.5rem' }}>Direct Inquiries</h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '4px' }}>General &amp; New Projects</div>
                                    <a href="mailto:hello@quinzexintelligence.com" style={{ fontSize: '16px', fontWeight: 600, color: '#0f3554', textDecoration: 'none' }}>hello@quinzexintelligence.com</a>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '4px' }}>Enterprise Partnerships</div>
                                    <a href="mailto:partners@quinzexintelligence.com" style={{ fontSize: '16px', fontWeight: 600, color: '#0f3554', textDecoration: 'none' }}>partners@quinzexintelligence.com</a>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '4px' }}>Offices &amp; Presence</div>
                                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358' }}>
                                        San Francisco &bull; London &bull; Geneva<br />
                                        Global Distributed Engineering Team
                                    </p>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '1.5rem' }}>Request Architecture Consultation</h3>
                                <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your inquiry has been dispatched to the Quinzex partners."); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Your Name</label>
                                        <input required type="text" placeholder="e.g. Alexander Wright" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Work Email</label>
                                        <input required type="email" placeholder="alexander@company.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Project Scope / Challenge</label>
                                        <textarea required rows={4} placeholder="Briefly describe your objectives, timeframe, or architecture turning point..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }} />
                                    </div>
                                    <button type="submit" className="dock-btn-cta" style={{ width: '100%', padding: '12px' }}>
                                        Submit Architecture Request &rarr;
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 10. PRIVACY POLICY PAGE                              */}
                    {/* ==================================================== */}
                    {activePath === '/privacy' && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {privacyPolicyData.sections.map((sec, idx) => (
                                    <div key={idx}>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.25rem', fontWeight: 700, color: '#0f3554', marginBottom: '8px' }}>
                                            {sec.heading}
                                        </h3>
                                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#2a4358' }}>
                                            {sec.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ==================================================== */}
                    {/* 11. TERMS OF SERVICE PAGE                            */}
                    {/* ==================================================== */}
                    {activePath === '/terms' && (
                        <div style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {termsData.sections.map((sec, idx) => (
                                    <div key={idx}>
                                        <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.25rem', fontWeight: 700, color: '#0f3554', marginBottom: '8px' }}>
                                            {sec.heading}
                                        </h3>
                                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#2a4358' }}>
                                            {sec.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </motion.div>
    );
};

export default SubPage;
