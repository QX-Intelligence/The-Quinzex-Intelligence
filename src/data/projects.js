export const projectData = {
    "career-vedha": {
        id: "career-vedha",
        numId: "01",
        category: "Full-Stack / Next.js",
        title: "CareerVedha",
        tagline: "High-concurrency EdTech & Analytics platform serving 50,000+ students in real-time.",
        year: "2024",
        url: "https://careervedha.com",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        results: {
            metrics: ["50k+", "<120ms", "+67%"],
            labels: ["Concurrent users", "p99 Response latency", "Time-on-platform gain"]
        },
        challenge: "CareerVedha needed to process and visualise career trajectory data for 50,000+ students in real-time while serving personalised learning recommendations — all from a monolithic PHP backend that was buckling under load.",
        architecture: "We designed and implemented a decoupled architecture: a Next.js edge-rendered front-end deployed on Vercel, a Node.js microservice layer for recommendation processing, and a PostgreSQL + Redis data layer with intelligent query caching. A WebSocket-powered live dashboard delivers real-time analytics without polling overhead.",
        outcome: "The platform now handles 50,000 concurrent users at p99 response latency of <120ms. Time-on-platform increased 67% post-launch with zero downtime reported during peak enrollment cycles.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebSockets", "Vercel Edge", "TailwindCSS"],
        next: {
            id: "mh-marble",
            title: "MH Marble",
            category: "Architecture / React",
            image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=640&h=480&fit=crop&q=80"
        }
    },
    "mh-marble": {
        id: "mh-marble",
        numId: "02",
        category: "Architecture / React",
        title: "MH Marble",
        tagline: "Premium E-Commerce showcase with interactive 3D WebGL material inspection.",
        year: "2024",
        url: "https://mhmarble.com",
        image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80",
        results: {
            metrics: ["340%", "1.2s", "99+"],
            labels: ["Conversion lift", "Page load time", "Core Web Vitals"]
        },
        challenge: "MH Marble's existing website was a generic template that failed to communicate the premium nature of their marble and stone products. High-resolution imagery was crushing page load times and conversion rates were below industry benchmarks.",
        architecture: "We architected a bespoke React storefront with a CDN-backed image pipeline using Cloudinary transformations for lazy-loading and adaptive quality. A GSAP-driven scroll-narrative brings material textures to life through parallax and reveal animations, while a custom 3D product viewer built in Three.js lets buyers inspect marble slabs before purchase.",
        outcome: "Page load time dropped from 8.4s to under 1.2s. Conversion rate increased 340% within the first quarter post-launch, establishing them as the premium benchmark in stone architecture.",
        tech: ["React", "Three.js", "GSAP", "Cloudinary", "Framer Motion", "Tailwind CSS"],
        next: {
            id: "nexus",
            title: "Nexus",
            category: "Socket.io / Node.js",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=480&fit=crop&q=80"
        }
    },
    "nexus": {
        id: "nexus",
        numId: "03",
        category: "Socket.io / Node.js",
        title: "Nexus",
        tagline: "Production-grade, sub-100ms real-time messaging application for high concurrent streams.",
        year: "2023",
        url: "https://nexus-sage-chi.vercel.app/",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
        results: {
            metrics: ["5k", "98ms", "0%"],
            labels: ["Simultaneous connections", "Avg message latency", "Dropped connections (6mo)"]
        },
        challenge: "The client required a production-grade, sub-100ms latency messaging platform that could sustain 5,000+ concurrent WebSocket connections without memory leaks or server exhaustion.",
        architecture: "Nexus is built on a Node.js cluster with Socket.io using Redis Pub/Sub as the inter-process message broker, enabling horizontal scaling across workers. JWT-authenticated namespaces and rooms provide multi-tenancy isolation. A React front-end with optimistic UI updates achieves perceived instant delivery.",
        outcome: "Sustained 5,000 simultaneous connections at 98ms average end-to-end message latency in load tests. Zero dropped connections recorded in 6 months of production use.",
        tech: ["Node.js", "Socket.io", "Redis", "JWT", "React", "MongoDB", "Docker"],
        next: {
            id: "hrms",
            title: "HRMS",
            category: "Dashboard / Java",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=640&h=480&fit=crop&q=80"
        }
    },
    "hrms": {
        id: "hrms",
        numId: "04",
        category: "Dashboard / Java",
        title: "HRMS",
        tagline: "Enterprise management system with automated payroll consolidation & analytics.",
        year: "2023",
        url: "https://hrms-front-end-woad.vercel.app/",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
        results: {
            metrics: ["20+ hrs", "4 min", "100%"],
            labels: ["Saved weekly", "Payroll generation time", "Data accuracy rate"]
        },
        challenge: "The client's HR team was spending 20+ hours per week on manual payroll consolidation and attendance report generation using disconnected Excel spreadsheets and legacy software.",
        architecture: "We delivered a Spring Boot REST API with a role-based access control layer, connecting to a normalised MySQL database. The React dashboard surface — built with Recharts — enables real-time KPI visualisation, one-click payroll generation, and automated leave management. A PDF export pipeline handles auditable reports.",
        outcome: "Eliminated 20+ hours of manual weekly reporting. Payroll generation time reduced from 3 days to under 4 minutes. No data discrepancies reported in 14 months of use.",
        tech: ["Java", "Spring Boot", "MySQL", "React", "Recharts", "JWT", "REST API"],
        next: {
            id: "career-vedha",
            title: "CareerVedha",
            category: "Full-Stack / Next.js",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=480&fit=crop&q=80"
        }
    }
};

export const projectsList = Object.values(projectData);

export default projectData;
