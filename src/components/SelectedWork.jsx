import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from './Link';

const FeaturedProjectCard = ({ project }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [-12, 12]);

    return (
        <motion.div 
            ref={itemRef}
            className="bento-card-featured"
            initial={{ opacity: 0, y: '2rem' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="h-w-space-btwn w-layout-vflex" style={{ height: '100%', justifyContent: 'space-between' }}>
                <header className="h-work-header w-layout-vflex">
                    <div className="sect-dot-flex w-layout-hflex">
                        <div className="dot"></div>
                        <div>Featured Project • {project.category}</div>
                    </div>
                    <Link to={project.link} className="w-inline-block">
                        <div className="link-wrapper">
                            <h3 className="proj-h3">{project.title}</h3>
                            <div className="hover-line is-2"></div>
                        </div>
                    </Link>
                    <div className="relative-for-animation">
                        <p className="p-work-home" style={{ margin: 0 }}>{project.description}</p>
                        <motion.div 
                            className="blackout-text-animation"
                            initial={{ scaleX: 1 }}
                            whileInView={{ scaleX: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                            style={{ originX: 1 }}
                        />
                    </div>
                    <div className="h-w-result-wrap w-layout-hflex" style={{ marginTop: '1.5rem' }}>
                        <div className="result-head">{project.results.metrics[0]}</div>
                        <div className="result-head">{project.results.metrics[1]}</div>
                        <div className="result-head">{project.results.metrics[2]}</div>
                        <div className="result-text">{project.results.labels[0]}</div>
                        <div className="result-text">{project.results.labels[1]}</div>
                        <div className="result-text">{project.results.labels[2]}</div>
                    </div>
                </header>
                <Link to={project.link} className="link-wrapper-is-project w-inline-block" style={{ marginTop: '2rem' }}>
                    <div className="arrow-flex-explore w-layout-hflex">
                        <div className="explore-link">Explore Case Study</div>
                        <div className="expl-arrow w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 8" fill="none">
                                <path d="M0.5 3.18C0.224 3.18 0 3.406 0 3.682 0 3.958.224 4.182.5 4.182L.5 3.682.5 3.18zm12.354.854a.5.5 0 000-.707L9.672.146A.5.5 0 008.964.854L11.793 3.68 8.964 6.51a.5.5 0 00.707.707l3.182-3.182zM.5 3.682.5 4.182 12.5 4.182v-.5-.5H.5L.5 3.682z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    <div className="hover-line is-h-projects"></div>
                </Link>
            </div>
            
            <Link to={project.link} className="img-project-wrapper w-inline-block" style={{ flex: '0 0 45%', maxWidth: '45%' }}>
                <motion.img 
                    src={project.image} 
                    loading="lazy" 
                    alt={project.title} 
                    className="h-w-img"
                    style={{
                        y: yParallax,
                        scale: 1.06
                    }}
                />
            </Link>
        </motion.div>
    );
};

const SubProjectCard = ({ project, index }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    return (
        <motion.div 
            ref={itemRef}
            className="bento-card-sub"
            initial={{ opacity: 0, y: '2rem' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        >
            <div className="w-layout-vflex" style={{ gap: '1rem', width: '100%' }}>
                <div className="sect-dot-flex w-layout-hflex">
                    <div className="dot"></div>
                    <div>{project.category}</div>
                </div>
                <Link to={project.link} className="w-inline-block">
                    <div className="link-wrapper">
                        <h3 className="proj-h3" style={{ fontSize: '2rem' }}>{project.title}</h3>
                        <div className="hover-line is-2"></div>
                    </div>
                </Link>
                <p className="p-work-home" style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8 }}>{project.description}</p>
            </div>
            
            <Link to={project.link} className="bento-img-wrap w-inline-block" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <motion.img 
                    src={project.image} 
                    loading="lazy" 
                    alt={project.title} 
                    className="bento-img"
                    style={{
                        y: yParallax,
                        scale: 1.06
                    }}
                />
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <div className="h-w-result-wrap w-layout-hflex" style={{ gap: '1.5rem' }}>
                    <div>
                        <div className="result-head" style={{ fontSize: '1.75rem' }}>{project.results.metrics[0]}</div>
                        <div className="result-text" style={{ fontSize: '0.65rem' }}>{project.results.labels[0]}</div>
                    </div>
                    <div>
                        <div className="result-head" style={{ fontSize: '1.75rem' }}>{project.results.metrics[1]}</div>
                        <div className="result-text" style={{ fontSize: '0.65rem' }}>{project.results.labels[1]}</div>
                    </div>
                </div>
                <Link to={project.link} className="link-wrapper-is-project w-inline-block">
                    <div className="arrow-flex-explore w-layout-hflex">
                        <div className="explore-link" style={{ fontSize: '0.95rem' }}>Explore</div>
                        <div className="expl-arrow w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 13 8" fill="none">
                                <path d="M0.5 3.18C0.224 3.18 0 3.406 0 3.682 0 3.958.224 4.182.5 4.182L.5 3.682.5 3.18zm12.354.854a.5.5 0 000-.707L9.672.146A.5.5 0 008.964.854L11.793 3.68 8.964 6.51a.5.5 0 00.707.707l3.182-3.182zM.5 3.682.5 4.182 12.5 4.182v-.5-.5H.5L.5 3.682z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    <div className="hover-line is-h-projects"></div>
                </Link>
            </div>
        </motion.div>
    );
};

const SelectedWork = () => {
    const projects = [
        {
            category: "AI & Automation, US",
            link: "/projects/nexaflow-ai",
            title: "NexaFlow AI",
            description: "NexaFlow AI is an enterprise automation platform deploying intelligent workflows across finance, operations, and data infrastructure — reducing manual overhead by 80% and enabling teams to operate at 10x speed.",
            image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&h=480&fit=crop&crop=center&q=80",
            results: {
                metrics: ["$42M", "80%", "10x"],
                labels: ["Series B raised", "Ops cost reduction", "Team velocity gain"]
            }
        },
        {
            category: "SaaS Platform, UK",
            link: "/projects/orbis-saas",
            title: "Orbis SaaS",
            description: "Orbis is a B2B SaaS platform connecting enterprise buyers with vetted digital solution providers — 50,000+ active users, Fortune 500 partnerships, and a platform growing faster than its brand could keep up with.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=480&fit=crop&crop=center&q=80",
            results: {
                metrics: ["60%+", "50k+", "3.8:1"],
                labels: ["Activation growth", "Active users", "ROAS in 90 days"]
            }
        },
        {
            category: "Fintech, SG",
            link: "/projects/vaultex",
            title: "Vaultex Fintech",
            description: "Vaultex is Southeast Asia's emerging cross-border payment intelligence platform — integrating AI-driven risk models with real-time FX optimization across 12 markets, built for the institutional and SME alike.",
            image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=640&h=480&fit=crop&crop=center&q=80",
            results: {
                metrics: ["$1.2B", "12", "99.97%"],
                labels: ["Volume processed", "Markets served", "Uptime SLA"]
            }
        }
    ];

    return (
        <>
            {/* Header section */}
            <section className="section overflow-hidden">
                <div className="w-layout-blockcontainer container w-container">
                    <motion.div 
                        className="grid-nopad-home w-layout-grid"
                        initial={{ opacity: 0, y: '1.5rem' }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.12 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="sect-dot-flex w-layout-hflex">
                            <div className="dot"></div>
                            <div>Selected Work</div>
                        </div>
                        <h2 className="heading-3-home" id="work-heading">
                            Companies that closed the perception gap and what changed.
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Project Bento Grid */}
            <section className="section">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="home_projects-wrap" id="projects-wrap" style={{ background: 'transparent', padding: 0 }}>
                        <div className="bento-grid">
                            {/* First Project: Featured Card */}
                            <FeaturedProjectCard project={projects[0]} />
                            
                            {/* Second and Third Projects: Sub-Cards */}
                            <SubProjectCard project={projects[1]} index={1} />
                            <SubProjectCard project={projects[2]} index={2} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SelectedWork;
