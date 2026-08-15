import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Navbar';
import Link from './Link';

const ServiceCard = ({ name, description, tags, href }) => {
    return (
        <Link to={href} className="service-card w-inline-block">
            <div className="service-card-header">
                <h3 className="service-card-title">{name}</h3>
                <div className="service-card-arrow">↗</div>
            </div>
            <p className="service-card-desc">{description}</p>
            <div className="service-card-tags">
                {tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                ))}
            </div>
        </Link>
    );
};

const Services = () => {
    const servicesList = [
        { 
            name: "Web Design", 
            description: "Custom high-performance web experiences designed to engage visitors and drive conversion.", 
            tags: ["Vite", "React", "3D Graphics", "Clean CSS"], 
            href: "/services/website-design" 
        },
        { 
            name: "Branding", 
            description: "Cohesive visual identities and strategic brand positioning that build institutional trust.", 
            tags: ["Logo Design", "Identity Systems", "Brand Guides"], 
            href: "/services/branding" 
        },
        { 
            name: "AI Solutions", 
            description: "Deploying production-grade machine learning pipelines, LLM fine-tuning, and task automation.", 
            tags: ["LLM Agents", "Data Pipelines", "API integrations"], 
            href: "/services/ai-solutions" 
        },
        { 
            name: "UX/UI Design", 
            description: "Interface architecture grounded in user research, wireframing, and interactive prototyping.", 
            tags: ["User Research", "Wireframes", "Figma Design"], 
            href: "/services/ux-ui" 
        },
        { 
            name: "Motion Design", 
            description: "Adding immersive, interactive dynamic elements that capture and direct user attention.", 
            tags: ["Lottie", "Framer Motion", "Keyframe Art"], 
            href: "/services/motion-design" 
        },
        { 
            name: "Content Creation", 
            description: "Crafting technical copywriting, strategic digital assets, and value statements that resonate.", 
            tags: ["Technical Copy", "Social Assets", "Pitch Decks"], 
            href: "/services/content-creation" 
        }
    ];

    return (
        <section className="section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="sticky-split-layout">
                    {/* Left Sticky Info Column */}
                    <div className="sticky-left-col">
                        <div className="sect-dot-flex w-layout-hflex">
                            <div className="dot"></div>
                            <div>What we do</div>
                        </div>
                        <h2 id="services-h2" style={{ margin: 0, textAlign: 'left' }}>
                            Services built for companies that mean business.
                        </h2>
                        <Magnetic href="/services" className="main-btn w-inline-block" style={{ fontSize: '1rem', marginTop: '1rem' }}>
                            <div className="btn-bg"></div>
                            <div className="relative-1">All services</div>
                            <img 
                                src="https://cdn.prod.website-files.com/673786754d248974527e65b5/673a44cda8de37d4fb190f71_logo%20btn.svg" 
                                loading="lazy" 
                                alt="" 
                                className="handwave-img"
                            />
                        </Magnetic>
                    </div>

                    {/* Right Scrollable Service Cards Column */}
                    <div className="scroll-right-col">
                        {servicesList.map((svc) => (
                            <ServiceCard 
                                key={svc.name} 
                                name={svc.name} 
                                description={svc.description} 
                                tags={svc.tags} 
                                href={svc.href} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
