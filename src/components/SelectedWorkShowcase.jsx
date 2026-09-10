import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from './Link';
import { projectsList } from '../data/projects';

// Real Category Taxonomy
const CATEGORY_FILTERS = [
    { id: 'all', label: 'All Projects', count: 6 },
    { id: 'creative', label: 'Creative & WebGL', count: 2 },
    { id: 'ai', label: 'Data & AI', count: 1 },
    { id: 'scale', label: 'High-Concurrency Scale', count: 2 },
    { id: 'enterprise', label: 'Enterprise Platforms', count: 1 }
];

const projectCategoryMap = {
    'brunst-studios': 'creative',
    'nova-analytics': 'ai',
    'career-vedha': 'scale',
    'mh-marble': 'creative',
    'nexus': 'scale',
    'hrms': 'enterprise'
};

export default function SelectedWorkShowcase() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('editorial'); // 'editorial' | 'grid' | 'table'
    const [searchQuery, setSearchQuery] = useState('');
    const [previewProject, setPreviewProject] = useState(null);

    // Floating cursor preview state for table view
    const [hoveredProject, setHoveredProject] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projectsList.filter(proj => {
            const matchesCategory = activeFilter === 'all' || projectCategoryMap[proj.id] === activeFilter;
            const matchesSearch = !searchQuery.trim() || 
                proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proj.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                proj.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    // Close preview drawer on escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setPreviewProject(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="selected-work-showcase" onMouseMove={handleMouseMove}>
            {/* ── HEADER & CONTROLS ────────────────────────────────────────── */}
            <div className="sw-header-container">
                <div className="sw-headline-wrap">
                    <div className="sect-dot-flex w-layout-hflex" style={{ marginBottom: '1rem' }}>
                        <span className="dot pulse-dot"></span>
                        <span className="sw-category-subtitle">Portfolio &bull; 2023–2025</span>
                    </div>
                    <h1 className="sw-display-title">
                        SELECTED <span className="sw-highlight-italic">WORK</span>
                    </h1>
                    <p className="sw-lead-description">
                        A curated selection of high-performance web applications, cloud platforms, 
                        and custom digital experiences engineered by Quinzex.
                    </p>
                </div>

                {/* ── CONTROLS TOOLBAR: Filter Pills, Search & View Switcher ── */}
                <div className="sw-toolbar">
                    {/* Category Filter Pills */}
                    <div className="sw-filter-group" role="tablist">
                        {CATEGORY_FILTERS.map(f => {
                            const isActive = activeFilter === f.id;
                            return (
                                <button
                                    key={f.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`sw-filter-pill ${isActive ? 'is-active' : ''}`}
                                    onClick={() => setActiveFilter(f.id)}
                                >
                                    <span>{f.label}</span>
                                    <span className="sw-pill-count">{f.count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="sw-toolbar-right">
                        {/* Search Input */}
                        <div className="sw-search-wrap">
                            <svg className="sw-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                className="sw-search-input"
                                placeholder="Filter by tech (e.g. Next.js, WebGL)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="sw-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                    &times;
                                </button>
                            )}
                        </div>

                        {/* View Mode Switcher */}
                        <div className="sw-view-switcher" role="group" aria-label="Layout view mode">
                            <button
                                className={`sw-view-btn ${viewMode === 'editorial' ? 'is-active' : ''}`}
                                onClick={() => setViewMode('editorial')}
                                title="Editorial View"
                                aria-label="Editorial View"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="3" y1="9" x2="21" y2="9"></line>
                                    <line x1="9" y1="21" x2="9" y2="9"></line>
                                </svg>
                                <span className="sw-view-label">Editorial</span>
                            </button>

                            <button
                                className={`sw-view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                                aria-label="Grid View"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span className="sw-view-label">Grid</span>
                            </button>

                            <button
                                className={`sw-view-btn ${viewMode === 'table' ? 'is-active' : ''}`}
                                onClick={() => setViewMode('table')}
                                title="Table View"
                                aria-label="Table View"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                <span className="sw-view-label">Table</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN GALLERY SECTION ─────────────────────────────────────── */}
            <div className="sw-main-gallery">
                {/* Result count indicator if filtered */}
                {(activeFilter !== 'all' || searchQuery) && (
                    <div className="sw-results-meta">
                        Showing <strong>{filteredProjects.length}</strong> of {projectsList.length} projects
                        {searchQuery && <span> matching "{searchQuery}"</span>}
                    </div>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="sw-empty-state">
                        <div className="sw-empty-icon">🔍</div>
                        <h3>No projects match your criteria</h3>
                        <p>Try clearing your search query or selecting "All Projects".</p>
                        <button 
                            className="dock-btn-cta" 
                            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* ── 1. EDITORIAL VIEW ─────────────────────────────────────── */}
                {viewMode === 'editorial' && filteredProjects.length > 0 && (
                    <div className="sw-editorial-stream">
                        {filteredProjects.map((project, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.article 
                                    key={project.id}
                                    className={`sw-editorial-card ${isEven ? 'layout-normal' : 'layout-reverse'}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                >
                                    {/* Image Stage Frame */}
                                    <div className="sw-card-media-col">
                                        <div className="sw-card-media-wrapper">
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="sw-card-img"
                                                loading="lazy" 
                                            />
                                            <div className="sw-card-media-glass">
                                                <span className="sw-glass-year">{project.year}</span>
                                                <button 
                                                    className="sw-glass-quick-btn"
                                                    onClick={() => setPreviewProject(project)}
                                                    title="Quick Preview"
                                                >
                                                    Preview &bull;
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Information Column */}
                                    <div className="sw-card-info-col">
                                        <div className="sw-card-meta-row">
                                            <span className="sw-card-num">0{index + 1}</span>
                                            <span className="sw-card-category">{project.category}</span>
                                        </div>

                                        <h2 className="sw-card-title">
                                            <Link to={`/project/${project.id}`} className="sw-title-link">
                                                {project.title}
                                            </Link>
                                        </h2>

                                        <p className="sw-card-tagline">{project.tagline}</p>

                                        {project.challenge && (
                                            <p className="sw-card-challenge-excerpt">
                                                {project.challenge}
                                            </p>
                                        )}

                                        {/* Metrics Row */}
                                        <div className="sw-card-metrics-row">
                                            {project.results.metrics.map((val, mIdx) => (
                                                <div key={mIdx} className="sw-c-metric-pill">
                                                    <span className="sw-c-metric-val">{val}</span>
                                                    <span className="sw-c-metric-lbl">{project.results.labels[mIdx]}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="sw-card-tech-wrap">
                                            {project.tech.map((tech, tIdx) => (
                                                <span key={tIdx} className="sw-card-tech-tag">{tech}</span>
                                            ))}
                                        </div>

                                        {/* Action Links */}
                                        <div className="sw-card-actions">
                                            <Link to={`/project/${project.id}`} className="dock-btn-cta sw-action-btn">
                                                <span>View Project</span>
                                                <span>&rarr;</span>
                                            </Link>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="sw-card-live-btn"
                                                >
                                                    <span>Live Platform</span>
                                                    <span>↗</span>
                                                </a>
                                            )}
                                            <button 
                                                className="sw-card-inspect-btn"
                                                onClick={() => setPreviewProject(project)}
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {/* ── 2. GRID VIEW ─────────────────────────────────────────── */}
                {viewMode === 'grid' && filteredProjects.length > 0 && (
                    <div className="sw-bento-grid-view">
                        {filteredProjects.map((project, index) => {
                            const isWide = index === 0 || index === 3;
                            return (
                                <motion.div
                                    key={project.id}
                                    className={`sw-bento-item ${isWide ? 'is-span-2' : ''}`}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <div className="sw-bento-inner">
                                        <div className="sw-bento-image-layer">
                                            <img src={project.image} alt={project.title} className="sw-bento-bg-img" />
                                            <div className="sw-bento-grad-overlay" />
                                        </div>

                                        <div className="sw-bento-header-info">
                                            <div className="sw-bento-badges">
                                                <span className="sw-bento-num">0{index + 1}</span>
                                                <span className="sw-bento-category">{project.category}</span>
                                            </div>
                                            <button 
                                                className="sw-bento-quick-look"
                                                onClick={() => setPreviewProject(project)}
                                                title="Preview Project"
                                            >
                                                ⚡
                                            </button>
                                        </div>

                                        <div className="sw-bento-footer-info">
                                            <h3 className="sw-bento-title">
                                                <Link to={`/project/${project.id}`}>{project.title}</Link>
                                            </h3>
                                            <p className="sw-bento-tagline">{project.tagline}</p>

                                            <div className="sw-bento-metrics">
                                                <div className="sw-b-metric">
                                                    <strong>{project.results.metrics[0]}</strong>
                                                    <span>{project.results.labels[0]}</span>
                                                </div>
                                                <div className="sw-b-metric">
                                                    <strong>{project.results.metrics[1]}</strong>
                                                    <span>{project.results.labels[1]}</span>
                                                </div>
                                            </div>

                                            <div className="sw-bento-actions">
                                                <Link to={`/project/${project.id}`} className="sw-bento-link-arrow">
                                                    <span>View Project</span>
                                                    <span>&rarr;</span>
                                                </Link>
                                                {project.url && (
                                                    <a href={project.url} target="_blank" rel="noreferrer" className="sw-bento-external-link">
                                                        <span>Live</span>
                                                        <span>↗</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* ── 3. TABLE VIEW ─────────────────────────────────────────── */}
                {viewMode === 'table' && filteredProjects.length > 0 && (
                    <div className="sw-index-table-container">
                        <table className="sw-index-table">
                            <thead>
                                <tr>
                                    <th className="th-num">#</th>
                                    <th className="th-project">Project</th>
                                    <th className="th-category">Discipline</th>
                                    <th className="th-stack">Primary Stack</th>
                                    <th className="th-metric">Benchmark</th>
                                    <th className="th-year">Year</th>
                                    <th className="th-action">Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project, idx) => (
                                    <tr 
                                        key={project.id}
                                        className="sw-index-row"
                                        onMouseEnter={() => setHoveredProject(project)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <td className="td-num">0{idx + 1}</td>
                                        <td className="td-project">
                                            <Link to={`/project/${project.id}`} className="sw-index-title-link">
                                                <span className="sw-idx-title">{project.title}</span>
                                                <span className="sw-idx-industry">{project.tagline}</span>
                                            </Link>
                                        </td>
                                        <td className="td-category">
                                            <span className="sw-idx-cat-badge">{project.category}</span>
                                        </td>
                                        <td className="td-stack">
                                            <div className="sw-idx-tech-chips">
                                                {project.tech.slice(0, 3).map((t, tIdx) => (
                                                    <span key={tIdx} className="sw-idx-chip">{t}</span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="sw-idx-chip-more">+{project.tech.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="td-metric">
                                            <span className="sw-idx-metric-val">{project.results.metrics[0]}</span>
                                            <span className="sw-idx-metric-lbl">{project.results.labels[0]}</span>
                                        </td>
                                        <td className="td-year">{project.year}</td>
                                        <td className="td-action">
                                            <div className="sw-idx-actions">
                                                <button 
                                                    className="sw-idx-inspect-btn"
                                                    onClick={() => setPreviewProject(project)}
                                                    title="Preview"
                                                >
                                                    Preview
                                                </button>
                                                <Link to={`/project/${project.id}`} className="sw-idx-case-btn" title="View Project">
                                                    &rarr;
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Floating Cursor Thumbnail Preview */}
                        <AnimatePresence>
                            {hoveredProject && (
                                <motion.div
                                    className="sw-floating-cursor-preview"
                                    style={{
                                        position: 'fixed',
                                        left: `${cursorPos.x + 24}px`,
                                        top: `${cursorPos.y - 100}px`,
                                        pointerEvents: 'none',
                                        zIndex: 9999
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="sw-floating-inner">
                                        <img src={hoveredProject.image} alt={hoveredProject.title} />
                                        <div className="sw-floating-label">
                                            <span className="sw-fl-title">{hoveredProject.title}</span>
                                            <span className="sw-fl-cat">{hoveredProject.category}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* ── PREVIEW DRAWER ───────────────────────────────────────────── */}
            <AnimatePresence>
                {previewProject && (
                    <div className="sw-quick-modal-backdrop" onClick={() => setPreviewProject(null)}>
                        <motion.div
                            className="sw-quick-modal-sheet"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: '0%' }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Drawer Header */}
                            <div className="sw-qm-header">
                                <div className="sw-qm-meta">
                                    <span className="dot pulse-dot"></span>
                                    <span>PROJECT OVERVIEW &bull; {previewProject.title}</span>
                                </div>
                                <button 
                                    className="sw-qm-close-btn" 
                                    onClick={() => setPreviewProject(null)}
                                    aria-label="Close Preview"
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Drawer Body */}
                            <div className="sw-qm-body">
                                <div className="sw-qm-hero-img-wrap">
                                    <img src={previewProject.image} alt={previewProject.title} />
                                    <div className="sw-qm-img-overlay">
                                        <h3>{previewProject.title}</h3>
                                        <span>{previewProject.year} &bull; {previewProject.category}</span>
                                    </div>
                                </div>

                                <div className="sw-qm-section">
                                    <h4>The Challenge</h4>
                                    <p>{previewProject.challenge}</p>
                                </div>

                                <div className="sw-qm-section">
                                    <h4>Architecture & Implementation</h4>
                                    <p>{previewProject.architecture}</p>
                                </div>

                                <div className="sw-qm-section">
                                    <h4>Outcome</h4>
                                    <p>{previewProject.outcome}</p>
                                </div>

                                <div className="sw-qm-section">
                                    <h4>Measured Benchmarks</h4>
                                    <div className="sw-qm-metrics-grid">
                                        {previewProject.results.metrics.map((val, idx) => (
                                            <div key={idx} className="sw-qm-metric-card">
                                                <div className="sw-qm-metric-val">{val}</div>
                                                <div className="sw-qm-metric-lbl">{previewProject.results.labels[idx]}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="sw-qm-section">
                                    <h4>Technologies</h4>
                                    <div className="sw-qm-tech-list">
                                        {previewProject.tech.map((t, idx) => (
                                            <span key={idx} className="sw-qm-tech-chip">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Footer Actions */}
                            <div className="sw-qm-footer">
                                <Link 
                                    to={`/project/${previewProject.id}`} 
                                    className="dock-btn-cta sw-qm-btn-full"
                                    onClick={() => setPreviewProject(null)}
                                >
                                    <span>View Project</span>
                                    <span>&rarr;</span>
                                </Link>
                                {previewProject.url && (
                                    <a 
                                        href={previewProject.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="dock-btn-secondary sw-qm-btn-live"
                                    >
                                        <span>Live Platform</span>
                                        <span>↗</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
