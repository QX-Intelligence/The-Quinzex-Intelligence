import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MontfortContact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        budget: "",
        message: ""
    });
    const [service, setService] = useState("");
    const [status, setStatus] = useState("idle"); // idle | sending | done

    const services = ["Engineering", "AI & Automation", "Web Design & 3D", "Brand & Strategy", "Other"];
    const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Let's talk"];

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus("sending");
        // Build a mailto with all fields prefilled so submissions land in inbox
        const subject = encodeURIComponent(`[Quinzex Inquiry] ${service || "General"} — ${form.name}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nService: ${service || "—"}\nBudget/Timeline: ${form.budget || "—"}\n\nProject Brief:\n${form.message}`
        );
        window.location.href = `mailto:hello@quinzexintelligence.com?subject=${subject}&body=${body}`;
        setTimeout(() => setStatus("done"), 800);
    };

    return (
        <section id="form" className="montfort-contact-section">
            <div className="montfort-contact-inner">

                {/* ── Centered Header & Copy ─────────────────────── */}
                <div className="montfort-contact-copy">
                    <h2 className="montfort-contact-heading">
                        START A CONVERSATION
                    </h2>
                    <p className="montfort-contact-sub">
                        Tell us about your engineering challenge, AI initiative, or software product. We respond within one business day.
                    </p>

                    {/* Emails & Calendly */}
                    <div className="montfort-contact-info">
                        <a href="mailto:hello@quinzexintelligence.com" className="montfort-contact-email">
                            hello@quinzexintelligence.com
                        </a>
                        <span className="montfort-contact-divider">&bull;</span>
                        <a href="mailto:partners@quinzexintelligence.com" className="montfort-contact-email">
                            partners@quinzexintelligence.com
                        </a>
                        <span className="montfort-contact-divider">&bull;</span>
                        <a
                            href="https://cal.com/quinzex/discovery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="montfort-calendly-btn"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            BOOK A DISCOVERY CALL
                        </a>
                    </div>

                    <p className="montfort-contact-timezone">
                        Global Distributed Team &middot; US &middot; EU &middot; APAC Timezones
                    </p>
                </div>

                {/* ── Centered Form ───────────────────────────────── */}
                <div className="montfort-contact-form-wrap">
                    <AnimatePresence mode="wait">
                        {status === "done" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="montfort-contact-success"
                            >
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="23" stroke="#0f3554" strokeWidth="1.5" />
                                    <path d="M14 24l7 7 13-14" stroke="#0f3554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3 className="montfort-contact-success-title">Opening your email client…</h3>
                                <p className="montfort-contact-success-sub">
                                    Your message draft is ready. Hit Send in your email app and we'll reply within one business day.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="montfort-contact-form"
                                onSubmit={handleSubmit}
                            >
                                {/* Row 1: Name + Work Email */}
                                <div className="montfort-form-row">
                                    <div className="montfort-form-field">
                                        <label className="montfort-form-label">Full Name *</label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="montfort-form-input"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="montfort-form-field">
                                        <label className="montfort-form-label">Work Email *</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="montfort-form-input"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Service chips */}
                                <div className="montfort-form-field">
                                    <label className="montfort-form-label">Service of Interest</label>
                                    <div className="montfort-service-chips">
                                        {services.map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setService(s)}
                                                className={`montfort-chip ${service === s ? "active" : ""}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget / Timeline */}
                                <div className="montfort-form-field">
                                    <label className="montfort-form-label">Estimated Budget / Timeline</label>
                                    <div className="montfort-service-chips">
                                        {budgets.map((b) => (
                                            <button
                                                key={b}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, budget: b }))}
                                                className={`montfort-chip ${form.budget === b ? "active" : ""}`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Brief */}
                                <div className="montfort-form-field">
                                    <label className="montfort-form-label">Project Brief *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className="montfort-form-input montfort-form-textarea"
                                        placeholder="Describe your project, goals, stack, and timeline…"
                                        rows={5}
                                        required
                                    />
                                </div>

                                <div className="montfort-form-actions">
                                    <button
                                        type="submit"
                                        className={`montfort-form-submit ${status === "sending" ? "sending" : ""}`}
                                        disabled={status === "sending"}
                                    >
                                        {status === "sending" ? (
                                            <span className="montfort-submit-spinner" />
                                        ) : (
                                            "SEND MESSAGE"
                                        )}
                                    </button>
                                    <a
                                        href="https://cal.com/quinzex/discovery"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="montfort-form-calendly-link"
                                    >
                                        or book a call instead ↗
                                    </a>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default MontfortContact;
