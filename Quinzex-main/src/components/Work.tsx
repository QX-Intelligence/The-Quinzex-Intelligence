import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, ArrowLeft, BookOpen, Monitor } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    id: '01',
    title: 'CareerVedha',
    subtitle: 'EdTech & Analytics Platform',
    category: 'Full-Stack / Next.js',
    year: '2024',
    url: 'https://careervedha.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    filterTag: 'fullstack',
    caseStudy: {
      challenge:
        'CareerVedha needed to process and visualise career trajectory data for 50,000+ students in real-time while serving personalised learning recommendations — all from a monolithic PHP backend that was buckling under load.',
      architecture:
        'We designed and implemented a decoupled architecture: a Next.js edge-rendered front-end deployed on Vercel, a Node.js microservice layer for recommendation processing, and a PostgreSQL + Redis data layer with intelligent query caching. A WebSocket-powered live dashboard delivers real-time analytics without polling overhead.',
      outcome:
        'The platform now handles 50,000 concurrent users at p99 response latency of <120ms. Time-on-platform increased 67% post-launch.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Vercel Edge', 'TailwindCSS'],
      metric: '50k concurrent · <120ms p99',
    },
  },
  {
    id: '02',
    title: 'MH Marble',
    subtitle: 'Premium E-Commerce Showcase',
    category: 'Architecture / React',
    year: '2024',
    url: 'https://mhmarble.com',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80',
    filterTag: 'design',
    caseStudy: {
      challenge:
        "MH Marble's existing website was a generic template that failed to communicate the premium nature of their marble and stone products. High-resolution imagery was crushing page load times and conversion rates were below industry benchmarks.",
      architecture:
        "We architected a bespoke React storefront with a CDN-backed image pipeline using Cloudinary transformations for lazy-loading and adaptive quality. A GSAP-driven scroll-narrative brings material textures to life through parallax and reveal animations, while a custom 3D product viewer built in Three.js lets buyers inspect marble slabs before purchase.",
      outcome:
        "Page load time dropped from 8.4s to under 1.2s. Conversion rate increased 340% within the first quarter post-launch.",
      tech: ['React', 'Three.js', 'GSAP', 'Cloudinary', 'Framer Motion', 'Tailwind CSS'],
      metric: '340% conversion lift · 1.2s load',
    },
  },
  {
    id: '03',
    title: 'Nexus',
    subtitle: 'Real-time Messaging Application',
    category: 'Socket.io / Node.js',
    year: '2023',
    url: 'https://nexus-sage-chi.vercel.app/',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    filterTag: 'fullstack',
    caseStudy: {
      challenge:
        'The client required a production-grade, sub-100ms latency messaging platform that could sustain 5,000+ concurrent WebSocket connections without memory leaks or server exhaustion.',
      architecture:
        'Nexus is built on a Node.js cluster with Socket.io using Redis Pub/Sub as the inter-process message broker, enabling horizontal scaling across workers. JWT-authenticated namespaces and rooms provide multi-tenancy isolation. A React front-end with optimistic UI updates achieves perceived instant delivery.',
      outcome:
        'Sustained 5,000 simultaneous connections at 98ms average end-to-end message latency in load tests. Zero dropped connections recorded in 6 months of production use.',
      tech: ['Node.js', 'Socket.io', 'Redis', 'JWT', 'React', 'MongoDB', 'Docker'],
      metric: '5k connections · 98ms latency',
    },
  },
  {
    id: '04',
    title: 'HRMS',
    subtitle: 'Enterprise Management System',
    category: 'Dashboard / Java',
    year: '2023',
    url: 'https://hrms-front-end-woad.vercel.app/',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
    filterTag: 'enterprise',
    caseStudy: {
      challenge:
        "The client's HR team was spending 20+ hours per week on manual payroll consolidation and attendance report generation using disconnected Excel spreadsheets and legacy software.",
      architecture:
        "We delivered a Spring Boot REST API with a role-based access control layer, connecting to a normalised MySQL database. The React dashboard surface — built with Recharts — enables real-time KPI visualisation, one-click payroll generation, and automated leave management. A PDF export pipeline handles auditable reports.",
      outcome:
        "Eliminated 20+ hours of manual weekly reporting. Payroll generation time reduced from 3 days to under 4 minutes. No data discrepancies reported in 14 months of use.",
      tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'Recharts', 'JWT', 'REST API'],
      metric: '20+ hrs saved/week · 4 min payroll',
    },
  },
];

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-project={project.title.toLowerCase()}
      className="group relative cursor-pointer block"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Top Info */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <span className="text-primary font-mono text-sm tracking-widest">{project.id}</span>
          <span className="text-muted-foreground text-xs tracking-widest">{project.year}</span>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-full border border-primary flex items-center justify-center"
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="pt-8">
        <motion.div animate={{ x: isHovered ? 10 : 0 }} transition={{ duration: 0.3 }}>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground group-hover:gradient-text transition-all duration-500">
            {project.title}
          </h3>
          <p className="text-muted-foreground mt-1">{project.subtitle}</p>
        </motion.div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{project.category}</p>
          <span className="text-xs font-mono text-primary/60 border border-primary/20 px-2 py-1 rounded-sm">
            {project.caseStudy.metric}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dialogTab, setDialogTab] = useState<'study' | 'sandbox'>('study');

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const getColumnY = (index: number) => {
    if (index % 3 === 0) return yColumn1;
    if (index % 3 === 1) return yColumn2;
    return yColumn3;
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setDialogTab('study');
    setIsPreviewOpen(true);
  };

  // Pause Lenis + lock body scroll when dialog is open to prevent bleed-through
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isPreviewOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isPreviewOpen]);

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.filterTag === activeFilter);

  return (
    <section id="work" className="relative py-20 md:py-32" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-4">
                ◆ Selected Work
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-foreground">Featured</span>
                <br />
                <span className="gradient-text">Projects</span>
              </h2>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="text-xs tracking-[0.3em] uppercase">Start a Project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
          {[
            { label: 'ALL DEPLOYMENTS', value: 'all' },
            { label: 'FULL-STACK', value: 'fullstack' },
            { label: 'ENTERPRISE', value: 'enterprise' },
            { label: 'PREMIUM DESIGN', value: 'design' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase border transition-all duration-300 rounded-sm ${
                activeFilter === tab.value
                  ? 'border-primary text-primary bg-primary/5 shadow-[0_0_15px_rgba(196,166,98,0.15)]'
                  : 'border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} style={{ y: getColumnY(index) }} layout>
              <ProjectCard project={project} index={index} onClick={() => handleProjectClick(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study / Sandbox Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={(open) => { setIsPreviewOpen(open); if (!open) setDialogTab('study'); }}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[92vh] p-0 overflow-hidden bg-background/98 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col">
          {/* Dialog Header */}
          <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </button>
              <div>
                <DialogTitle className="text-lg md:text-xl font-display font-bold text-foreground">
                  {selectedProject?.title}
                </DialogTitle>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">{selectedProject?.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pr-8">
              {/* Tab Switcher */}
              <div className="hidden sm:flex items-center gap-1 border border-white/10 rounded-sm p-1">
                <button
                  onClick={() => setDialogTab('study')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-sm transition-all duration-200 ${
                    dialogTab === 'study'
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  Case Study
                </button>
                <button
                  onClick={() => setDialogTab('sandbox')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-sm transition-all duration-200 ${
                    dialogTab === 'sandbox'
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  Live Preview
                </button>
              </div>

              <a
                href={selectedProject?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </DialogHeader>

          {/* Dialog Body — use relative+absolute so height is always explicit */}
          <div className="flex-1 relative min-h-0">
            <AnimatePresence mode="wait">
              {/* ── Case Study Panel ── */}
              {dialogTab === 'study' && selectedProject && (
                <motion.div
                  key="study"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 overflow-y-auto"
                  data-lenis-prevent
                >
                  {/* Hero Image */}
                  <div className="relative h-52 md:h-64 overflow-hidden shrink-0">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <span className="inline-block border border-primary/40 text-primary text-xs font-mono tracking-widest px-3 py-1 rounded-sm">
                        {selectedProject.caseStudy.metric}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Content */}
                  <div className="p-8 md:p-12 max-w-3xl mx-auto pb-20">
                    {/* Timeline strip */}
                    <div className="flex gap-2 mb-12 overflow-x-auto pb-1">
                      {['The Challenge', 'Our Architecture', 'The Outcome', 'Tech Stack'].map((s, i) => (
                        <div key={s} className="flex items-center gap-2 shrink-0">
                          <span className="w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center text-[9px] font-mono text-primary">{i + 1}</span>
                          <span className="text-xs text-muted-foreground tracking-wide whitespace-nowrap">{s}</span>
                          {i < 3 && <span className="w-6 h-px bg-white/10" />}
                        </div>
                      ))}
                    </div>

                    {/* Section: Challenge */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono">The Challenge</p>
                      </div>
                      <p className="text-foreground/85 leading-loose text-base md:text-lg">{selectedProject.caseStudy.challenge}</p>
                    </div>

                    {/* Section: Architecture */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono">Our Architecture</p>
                      </div>
                      <p className="text-foreground/85 leading-loose text-base md:text-lg">{selectedProject.caseStudy.architecture}</p>
                    </div>

                    {/* Section: Outcome */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono">The Outcome</p>
                      </div>
                      <div className="border border-primary/20 rounded-sm p-6 bg-primary/5">
                        <p className="text-foreground leading-loose text-base md:text-lg font-medium">{selectedProject.caseStudy.outcome}</p>
                        <div className="mt-4 inline-flex items-center gap-2 border border-primary/30 px-3 py-1.5 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-primary font-mono text-xs">{selectedProject.caseStudy.metric}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section: Tech Stack */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono">Technology Stack</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.caseStudy.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 border border-white/10 rounded-sm text-xs font-mono text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile: switch to live preview */}
                    <button
                      onClick={() => setDialogTab('sandbox')}
                      className="sm:hidden flex items-center gap-2 text-sm text-primary border border-primary/30 px-4 py-2 rounded-sm hover:bg-primary/10 transition-all mt-4"
                    >
                      <Monitor className="w-4 h-4" />
                      Launch Live Preview
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Live Sandbox Panel ── */}
              {dialogTab === 'sandbox' && selectedProject && (
                <motion.div
                  key="sandbox"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-black/20"
                >
                  <iframe
                    src={selectedProject.url}
                    className="w-full h-full border-none"
                    title={selectedProject.title}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
