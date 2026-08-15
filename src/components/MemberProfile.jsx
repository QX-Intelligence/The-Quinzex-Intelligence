import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team';
import Link from './Link';

const MemberProfile = ({ memberId }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [memberId]);

    const member = teamMembers.find(m => m.id === memberId) || teamMembers[0];

    if (!member) {
        return (
            <div className="section is-fullscreen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', color: '#0f3554' }}>
                <h2>Member Profile Not Found</h2>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="sub-page-view"
            style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', color: '#0f3554' }}
        >
            <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                
                {/* Back Link */}
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0f3554', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        &larr; Back to Collective
                    </Link>
                </div>

                {/* Profile Header Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }}>
                    
                    {/* Top Row: Avatar & Bio */}
                    <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ width: '160px', height: '160px', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(15, 53, 84, 0.15)', flexShrink: 0, boxShadow: '0 12px 32px rgba(15, 53, 84, 0.08)' }}>
                            <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <div className="dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0f3554' }}></div>
                                <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.6)' }}>Quinzex Specialist</span>
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-main)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15, color: '#0f3554', marginBottom: '10px' }}>
                                {member.name}
                            </h1>
                            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f3554', opacity: 0.85, marginBottom: '16px' }}>
                                {member.role} &bull; <span style={{ opacity: 0.75 }}>{member.subtitle}</span>
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#2a4358', maxWidth: '750px', marginBottom: '24px' }}>
                                {member.description}
                            </p>

                            {member.portfolioUrl && (
                                <a
                                    href={member.portfolioUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="dock-btn-cta"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <span>Personal Portfolio</span>
                                    <span style={{ fontSize: '14px' }}>↗</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Skills Matrix */}
                <div style={{ marginBottom: '4rem', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(15, 53, 84, 0.08)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-main)', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                        Specialized Technical Matrix
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                        {member.skills.map((skillGroup, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15, 53, 84, 0.5)' }}>
                                    {skillGroup.category}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {skillGroup.items.map((item, itemIdx) => (
                                        <span
                                            key={itemIdx}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                padding: '5px 12px',
                                                borderRadius: '999px',
                                                background: 'rgba(15, 53, 84, 0.06)',
                                                color: '#0f3554',
                                                border: '1px solid rgba(15, 53, 84, 0.1)'
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engineering Projects */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-main)', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f3554', marginBottom: '2rem' }}>
                        Engineered Systems &amp; Contributions
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {member.projects.map((proj, pIdx) => (
                            <div
                                key={pIdx}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.65)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(15, 53, 84, 0.08)',
                                    borderRadius: '1.25rem',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.2rem', fontWeight: 700, color: '#0f3554', marginBottom: '12px' }}>
                                        {proj.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2a4358', marginBottom: '20px' }}>
                                        {proj.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {proj.tags.map((tag, tIdx) => (
                                        <span key={tIdx} style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'rgba(15, 53, 84, 0.08)', color: '#0f3554' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default MemberProfile;
