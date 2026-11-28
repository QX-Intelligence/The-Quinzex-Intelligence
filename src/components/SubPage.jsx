import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from './Link';
import SelectedWorkShowcase from './SelectedWorkShowcase';
import { teamMembers } from '../data/team';
import { sendContactEmail } from '../services/emailService';
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
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState('idle'); // 'idle' | 'sending' | 'done' | 'error'
    const [contactError, setContactError] = useState('');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [path]);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;
        setContactStatus('sending');
        setContactError('');

        try {
            await sendContactEmail({
                name: contactForm.name,
                email: contactForm.email,
                service: 'Architecture Consultation',
                message: contactForm.message
            });
            setContactStatus('done');
        } catch (err) {
            console.error('Contact submit failed:', err);
            setContactError(err?.text || err?.message || 'Failed to dispatch inquiry. Please try again or email directly.');
            setContactStatus('error');
        }
    };

    // Normalize path aliases
    let activePath = path;
    if (path === '/collective') activePath = '/team';
    if (path === '/expertise') activePath = '/services';
    if (path === '/works' || path === '/work' || path === '/projects') activePath = '/portfolio';

    const pageMeta = {
        "/about": {
            title: "About Us",
            tagline: "Software engineering, product design, and cloud infrastructure built for scale."
        },
        "/team": {
            title: "Our Team",
            tagline: "Senior engineers specializing in full-stack development, data pipelines, and cloud infrastructure."
        },
        "/services": {
            title: "Services",
            tagline: "End-to-end software development, from responsive web interfaces to scalable backend systems."
        },
        "/philosophy": {
            title: "Our Philosophy",
            tagline: "We combine thoughtful interface design, reliable architecture, and automated delivery."
        },
        "/portfolio": {
            title: "Selected Work",
            tagline: "Production web applications, data platforms, and cloud systems built for our clients."
        },
        "/features": {
            title: "Capabilities",
            tagline: "Practical AI integrations, fast data pipelines, and reliable cloud infrastructure."
        },
        "/careers": {
            title: "Careers",
            tagline: "Join our team of engineers building production software for global clients."
        },
        "/startups": {
            title: "For Startups",
            tagline: "Dedicated engineering sprints for early-stage and scaling startups."
        },
        "/contact": {
            title: "Start a Conversation",
            tagline: "Let's discuss your next software project, architecture review, or product launch."
        },
        "/privacy": {
            title: privacyPolicyData.title,
            tagline: "Our commitment to protecting your privacy and confidential business data."
        },
        "/terms": {
            title: termsData.title,
            tagline: "Terms governing our software delivery, engagements, and intellectual property."
        }
    };

    const currentMeta = pageMeta[activePath] || {
        title: "Quinzex Intelligence",
        tagline: "Software engineering, cloud architecture, and digital product studio."
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sub-page-view"
            style={{ paddingTop: activePath === '/portfolio' ? '70px' : '100px', minHeight: '100vh', color: '#0f3554' }}
        >
            {/* Subpage Hero Header (Omitted for /portfolio since SelectedWorkShowcase renders a cinematic stage) */}
            {activePath !== '/portfolio' && (
                <section className="section sub-page-hero" style={{ paddingBottom: '2.5rem' }}>
                    <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <div className="project-hero-grid">
                            <h1 className="project-detail-title">{currentMeta.title}</h1>
                            <p className="project-detail-tagline">{currentMeta.tagline}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Subpage Dynamic Content Body */}
            <section className="section sub-page-content-section" style={{ minHeight: '40vh', paddingBottom: '5rem' }}>
                <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: activePath === '/portfolio' ? '1440px' : '1200px', margin: '0 auto', padding: '0 24px' }}>

                    {/* ==================================================== */}
                    {/* 1. ABOUT PAGE                                        */}
                    {/* ==================================================== */}
                    {activePath === '/about' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="narrative-grid">
                                <div className="narrative-left">
                                    <div className="sect-dot-flex w-layout-hflex">
                                        <div>Who We Are</div>
                                    </div>
                                </div>
                                <div className="narrative-right">
                                    <p className="narrative-paragraph">
                                        Quinzex Intelligence is a software engineering and design studio working with technology teams and business leaders. We bring product design, systems architecture, and infrastructure together so companies can ship reliable web applications and software platforms that support long-term growth.
                                    </p>
                                </div>
                            </div>

                            <div className="narrative-divider"></div>

                            <div className="narrative-grid">
                                <div className="narrative-left">
                                    <div className="sect-dot-flex w-layout-hflex">
                                        <div>How We Work</div>
                                    </div>
                                </div>
                                <div className="narrative-right">
                                    <p className="narrative-paragraph">
                                        We work directly as a focused team of senior specialists rather than layering account managers and junior handoffs. That lets us bring the right expertise to your project — whether it is distributed backend services, a responsive web platform, or custom data and AI workflows — with clear communication and predictable delivery.
                                    </p>
                                </div>
                            </div>

                            <div className="narrative-divider"></div>

                            {/* Core Principles Overview */}
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                    Core Principles
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                                    {philosophyPillars.map((p, idx) => (
                                            <div key={idx} className="ic-sub-glass-card" style={{ padding: '2rem' }}>
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
                                                className="ic-sub-glass-card"
                                                style={{
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
                                                            Core Skills
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
                                                <div key={idx} className="ic-sub-glass-card" style={{ padding: '2rem' }}>
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

                            {/* Technology Stack */ }
                                        <div className="ic-sub-glass-card" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
                                            <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                                Technology Stack
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
                                                        <div key={idx} className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
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

                            {/* Delivery Process */ }
                                                <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                                    <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                                                        Delivery Process
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
                                                <SelectedWorkShowcase />
                                            )}

                                            {/* ==================================================== */}
                                            {/* 6. FEATURES / AURA ARCHITECTURE                      */}
                                            {/* ==================================================== */}
                                            {activePath === '/features' && (
                                                <div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                                                        {auraFeatures.map((feat, idx) => (
                                    <div key={idx} className="ic-sub-glass-card" style={{ padding: '2rem' }}>
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

                            <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '1.5rem' }}>
                                    Why It Matters
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
                                                                    { title: "Senior Front-End Engineer", type: "Contract / Remote", desc: "Experienced in React, Next.js, Framer Motion, and building responsive, performance-focused interfaces with strong Core Web Vitals." },
                                                                    { title: "Senior Backend Engineer", type: "Contract / Remote", desc: "Build reliable Java Spring Boot and Node.js services, Redis caching layers, and high-concurrency event streams with Kafka." },
                                                                    { title: "Cloud & DevOps Engineer", type: "Contract / Remote", desc: "Manage automated Kubernetes CI/CD pipelines, zero-downtime deployments, and Terraform infrastructure as code." },
                                                                    { title: "Data & Applied AI Engineer", type: "Contract / Remote", desc: "Build practical AI workflows, Python NLP pipelines, and real-time analytics dashboards for production systems." }
                                                                ].map((role, idx) => (
                                                                        <div key={idx} className="ic-sub-glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
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
                                                                            <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                                                                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '8px' }}>Package 01</div>
                                                                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '12px' }}>The 4-Week Launch Sprint</h3>
                                                                                <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#2a4358', marginBottom: '1.5rem' }}>
                                                                                    A fast-paced, high-intensity partnership designed to build your flagship digital MVP, establish institutional brand guidelines, and prepare your deck and interactive product for Seed or Series A funding rounds.
                                                                                </p>
                                                                                <a href="mailto:quinzex.intel@gmail.com?subject=Launch%20Sprint" className="dock-btn-cta">
                                                                                    Inquire About Sprint &rarr;
                                                                                </a>
                                                                            </div>

                                                                                <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                                                                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '8px' }}>Package 02</div>
                                                                                    <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '12px' }}>Equity &amp; Hybrid Partnerships</h3>
                                                                                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#2a4358', marginBottom: '1.5rem' }}>
                                                                                        For selected high-potential technology companies, we offer hybrid service agreements combining cash and equity. We deploy our senior architects directly into your team, aligning our upside completely with yours.
                                                                                    </p>
                                                                                    <a href="mailto:quinzex.intel@gmail.com?subject=Equity%20Partnership" className="dock-btn-cta">
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
                                                                                        <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                                                                            <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '1.5rem' }}>Direct Inquiries</h3>

                                                                                            <div style={{ marginBottom: '1.5rem' }}>
                                                                                                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '4px' }}>Official Company Email</div>
                                                                                                <a href="mailto:quinzex.intel@gmail.com" style={{ fontSize: '16px', fontWeight: 600, color: '#0f3554', textDecoration: 'none' }}>quinzex.intel@gmail.com</a>
                                                                                            </div>

                                                                                            <div style={{ marginBottom: '1.5rem' }}>
                                                                                                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)', marginBottom: '4px' }}>Offices &amp; Presence</div>
                                                                                                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358' }}>
                                                                                                    San Francisco &bull; London &bull; Geneva<br />
                                                                                                    Global Distributed Engineering Team
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>

                                                                                            <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
                                                                                                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.4rem', fontWeight: 700, color: '#0f3554', marginBottom: '1.5rem' }}>Send a Message</h3>

                                                                                                {contactStatus === 'done' ? (
                                                                                                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                                                                                        <div style={{ fontSize: '2.5rem', color: '#0f3554', marginBottom: '0.75rem' }}>✓</div>
                                                                                                        <h4 style={{ fontFamily: 'var(--font-main)', fontSize: '1.25rem', fontWeight: 700, color: '#0f3554', marginBottom: '0.5rem' }}>
                                                                                                            Message Sent
                                                                                                        </h4>
                                                                                                        <p style={{ fontSize: '14px', color: '#2a4358', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                                                                                            Thank you{contactForm.name ? `, ${contactForm.name.split(' ')[0]}` : ''}. We have received your inquiry and will reply to {contactForm.email} within one business day.
                                                                                                        </p>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            onClick={() => {
                                                                                                                setContactForm({ name: '', email: '', message: '' });
                                                                                                                setContactStatus('idle');
                                                                                                            }}
                                                                                                            className="dock-btn-cta"
                                                                                                            style={{ padding: '8px 18px', fontSize: '13px' }}
                                                                                                        >
                                                                                                            Send Another Request
                                                                                                        </button>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                                                                        {contactError && (
                                                                                                            <div style={{ color: '#dc2626', fontSize: '13px', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '10px 14px', borderRadius: '8px' }}>
                                                                                                                {contactError}
                                                                                                            </div>
                                                                                                        )}
                                                                                                        <div>
                                                                                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Your Name *</label>
                                                                                                            <input
                                                                                                                required
                                                                                                                type="text"
                                                                                                                placeholder="e.g. Alexander Wright"
                                                                                                                value={contactForm.name}
                                                                                                                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                                                                                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Work Email *</label>
                                                                                                            <input
                                                                                                                required
                                                                                                                type="email"
                                                                                                                placeholder="alexander@company.com"
                                                                                                                value={contactForm.email}
                                                                                                                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                                                                                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#0f3554', marginBottom: '6px' }}>Project Scope / Challenge *</label>
                                                                                                            <textarea
                                                                                                                required
                                                                                                                rows={4}
                                                                                                                placeholder="Briefly describe your project goals, timeline, and technical requirements..."
                                                                                                                value={contactForm.message}
                                                                                                                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                                                                                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(15, 53, 84, 0.15)', background: '#ffffff', color: '#0f3554' }}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <button
                                                                                                            type="submit"
                                                                                                            className="dock-btn-cta"
                                                                                                            disabled={contactStatus === 'sending'}
                                                                                                            style={{ width: '100%', padding: '12px', opacity: contactStatus === 'sending' ? 0.7 : 1, cursor: contactStatus === 'sending' ? 'not-allowed' : 'pointer' }}
                                                                                                        >
                                                                                                            {contactStatus === 'sending' ? 'Sending Message...' : 'Send Message →'}
                                                                                                        </button>
                                                                                                    </form>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                    )}

                                                                                        {/* ==================================================== */}
                                                                                        {/* 10. PRIVACY POLICY PAGE                              */}
                                                                                        {/* ==================================================== */}
                                                                                        {activePath === '/privacy' && (
                                                                                                <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
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
                                                                                                        <div className="ic-sub-glass-card" style={{ padding: '2.5rem' }}>
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
