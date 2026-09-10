export const projectData = {
    "brunst-studios": {
        id: "brunst-studios",
        numId: "01",
        category: "Next.js / Creative Direction",
        title: "Brunst Studios",
        tagline: "Visionary creative agency platform bringing together the world’s creative diversity.",
        year: "2024",
        url: "https://www.brunst.in/",
        image: "/assets/brunst_studios.png",
        results: {
            metrics: ["<0.8s", "100%", "+140%"],
            labels: ["TurboPack load speed", "Typography switch score", "Global client inquiries"]
        },
        challenge: "Brunst Studios is home to a world of creative fields—bringing together luxury brands, interiors, authors, and athletes under a single visionary creative agency. They needed a high-fashion, midnight-aesthetic web platform with dynamic typography switching, atmospheric noise textures, and zero performance compromise.",
        architecture: "Engineered on Next.js with TurboPack and Vercel edge deployment. Implemented an interactive typography switcher (switching between Cormorant Garamond and Libre Baskerville in real-time), procedural SVG fractal noise filters, and framer-motion stagger reveals for seamless modal interactions.",
        outcome: "Delivered a cinematic, sub-800ms luxury web portal with global CDN distribution. Elevated Brunst Studios' digital presence with a 140% surge in creative partnership inquiries across US, EU, and APAC markets.",
        tech: ["Next.js", "Turbopack", "TailwindCSS", "Framer Motion", "SVG Noise", "Vercel Edge"],
        next: {
            id: "nova-analytics",
            title: "Nova Analytics",
            category: "Data & ML / Python & Vue",
            image: "/assets/nova_analytics_home.png"
        }
    },
    "nova-analytics": {
        id: "nova-analytics",
        numId: "02",
        category: "Data & ML / Python & Vue",
        title: "Nova Analytics",
        tagline: "High-throughput predictive telemetry pipeline & executive business intelligence suite.",
        year: "2024",
        url: "https://69326c54e8aec728a1540bf7--celadon-zuccutto-a71c25.netlify.app/",
        image: "/assets/nova_analytics_home.png",
        results: {
            metrics: ["10M+", "350ms", "99.9%"],
            labels: ["Daily telemetry events", "p99 Query response", "Pipeline reliability"]
        },
        challenge: "Enterprise clients required real-time telemetry processing across millions of daily events with interactive drill-down analytics without exhausting memory or stalling client dashboards.",
        architecture: "Engineered a distributed streaming pipeline using Python, Apache Kafka, and ClickHouse for columnar OLAP queries. The reactive frontend is built with Vue 3, Pinia, and custom WebGL charting canvas, delivering sub-second updates.",
        outcome: "Processed 10M+ daily events at 350ms average query latency. Enabled instant root-cause diagnostics across distributed server nodes with zero data loss over 12 months.",
        tech: ["Python", "Vue 3", "ClickHouse", "Apache Kafka", "Docker", "FastAPI", "TailwindCSS"],
        next: {
            id: "career-vedha",
            title: "CareerVedha",
            category: "Full-Stack / Next.js",
            image: "/assets/careervedha_home.png"
        }
    },
    "career-vedha": {
        id: "career-vedha",
        numId: "03",
        category: "Full-Stack / Next.js",
        title: "CareerVedha",
        tagline: "High-concurrency EdTech & Analytics platform serving 50,000+ students in real-time.",
        year: "2024",
        url: "https://careervedha.com",
        image: "/assets/careervedha_home.png",
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
            image: "/assets/mhmarble_home.png"
        }
    },
    "mh-marble": {
        id: "mh-marble",
        numId: "04",
        category: "Architecture / React",
        title: "MH Marble",
        tagline: "Premium E-Commerce showcase with interactive 3D WebGL material inspection.",
        year: "2024",
        url: "https://mhmarble.com",
        image: "/assets/mhmarble_home.png",
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
            image: "/assets/nexus_home.png"
        }
    },
    "nexus": {
        id: "nexus",
        numId: "05",
        category: "Socket.io / Node.js",
        title: "Nexus",
        tagline: "Production-grade, sub-100ms real-time messaging application for high concurrent streams.",
        year: "2023",
        url: "https://nexus-sage-chi.vercel.app/",
        image: "/assets/nexus_home.png",
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
            image: "/assets/hrms_home.png"
        }
    },
    "hrms": {
        id: "hrms",
        numId: "06",
        category: "Dashboard / Java",
        title: "HRMS",
        tagline: "Enterprise management system with automated payroll consolidation & analytics.",
        year: "2023",
        url: "https://hrms-front-end-woad.vercel.app/",
        image: "/assets/hrms_home.png",
        results: {
            metrics: ["20+ hrs", "4 min", "100%"],
            labels: ["Saved weekly", "Payroll generation time", "Data accuracy rate"]
        },
        challenge: "The client's HR team was spending 20+ hours per week on manual payroll consolidation and attendance report generation using disconnected Excel spreadsheets and legacy software.",
        architecture: "We delivered a Spring Boot REST API with a role-based access control layer, connecting to a normalised MySQL database. The React dashboard surface — built with Recharts — enables real-time KPI visualisation, one-click payroll generation, and automated leave management. A PDF export pipeline handles auditable reports.",
        outcome: "Eliminated 20+ hours of manual weekly reporting. Payroll generation time reduced from 3 days to under 4 minutes. No data discrepancies reported in 14 months of use.",
        tech: ["Java", "Spring Boot", "MySQL", "React", "Recharts", "JWT", "REST API"],
        next: {
            id: "brunst-studios",
            title: "Brunst Studios",
            category: "Next.js / Creative Direction",
            image: "/assets/brunst_studios.png"
        }
    }
};

export const projectsList = Object.values(projectData);

export default projectData;
