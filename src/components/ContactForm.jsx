import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'submitted'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const services = [
        "Web Design",
        "Branding",
        "AI Solutions",
        "UX/UI Design",
        "Motion Design",
        "Content Creation"
    ];

    const handleServiceToggle = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate form submission delay
        setTimeout(() => {
            setStatus('submitted');
        }, 1200);
    };

    return (
        <section id="form" className="section overflow-hidden" style={{ position: 'relative', backgroundColor: 'var(--bg-body)' }}>
            {/* Matching dotted grid background from hero */}
            <div className="hero-grid-pattern"></div>
            <div className="w-layout-blockcontainer container w-container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div 
                    className="form-wrapper w-layout-vflex"
                    initial={{ opacity: 0, y: '1.5rem' }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.12 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="label-text" style={{ color: 'var(--grey-light)', border: '1px solid var(--grey)', borderRadius: '9999px', padding: '0.25rem 0.75rem', display: 'inline-block', fontSize: '0.85rem' }}>Let's work together</div>
                    <div className="v-flex-btwn w-layout-hflex">
                        <div>
                            <h3 className="h3-form" style={{ color: 'var(--black)' }}>Ready to close the<br/>perception gap?</h3>
                        </div>
                        <div className="flex-block-6 w-layout-vflex">
                            <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                Tell us about your project. We'll get back to you within 24 hours with a clear plan of action.
                            </p>
                            <div className="h-flex-0-75 w-layout-hflex">
                                <a href="mailto:hello@quinzexintelligence.com" className="ico-standard" title="Email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/company/quinzex" target="_blank" rel="noopener noreferrer" className="ico-standard" title="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {status !== 'submitted' ? (
                            <motion.form 
                                key="contact-form"
                                className="form-2 w-form" 
                                id="contact-form" 
                                onSubmit={handleSubmit}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="form-block-2">
                                    <div className="grid-first-inputs w-layout-grid">
                                        <div className="field-wrap w-layout-vflex">
                                            <label className="field-label" htmlFor="name">Full Name</label>
                                            <input 
                                                className="text-field w-input" 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                placeholder="Your name" 
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="field-wrap w-layout-vflex">
                                            <label className="field-label" htmlFor="email">Email Address</label>
                                            <input 
                                                className="text-field w-input" 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                placeholder="your@company.com" 
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="v-flex-input w-layout-vflex" style={{ marginTop: '1.5rem' }}>
                                        <div className="field-wrap w-layout-vflex">
                                            <label className="field-label" htmlFor="company">Company</label>
                                            <input 
                                                className="text-field w-input" 
                                                type="text" 
                                                name="company" 
                                                id="company" 
                                                placeholder="Your company name"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="field-wrap is-select w-layout-vflex">
                                        <label className="field-label">Service of interest</label>
                                        <div className="fs-checkbox_row w-layout-hflex">
                                            {services.map((svc) => {
                                                const isActive = selectedServices.includes(svc);
                                                return (
                                                    <label 
                                                        key={svc} 
                                                        className={`fs-checkbox_field ${isActive ? 'is-active' : ''}`}
                                                        onClick={() => handleServiceToggle(svc)}
                                                    >
                                                        <div 
                                                            className="fs-checkbox_button" 
                                                            style={{ height: isActive ? '100%' : '0%' }}
                                                        />
                                                        <div className="checkbox_label">{svc}</div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="v-flex-input w-layout-vflex" style={{ marginTop: '1rem' }}>
                                        <div className="field-wrap w-layout-vflex">
                                            <label className="field-label" htmlFor="message">Tell us about your project</label>
                                            <textarea 
                                                className="text-field is-area w-input" 
                                                name="message" 
                                                id="message" 
                                                placeholder="Describe your goals, challenges, and what success looks like..." 
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <input 
                                        type="submit" 
                                        className="submit-button" 
                                        value={status === 'sending' ? 'Sending...' : 'Send message →'}
                                        disabled={status === 'sending'}
                                    />
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="success-msg"
                                className="w-form-done" 
                                id="form-done" 
                                style={{ display: 'block', width: '100%' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <div className="success-message-3" style={{ padding: '3.5rem 2rem' }}>
                                    <div className="image-12" style={{ fontSize: '2.5rem', color: '#000', marginBottom: '1rem' }}>✓</div>
                                    <div className="text-block-12" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                                        Message sent! We'll be in touch within 24 hours.
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
