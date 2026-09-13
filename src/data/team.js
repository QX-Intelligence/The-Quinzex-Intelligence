export const teamMembers = [
    {
        id: 'chaitanya-kumar',
        name: 'Chaitanya Kumar',
        role: 'Full Stack Developer',
        subtitle: 'MERN Stack · Next.js · Premium UI/UX',
        description: 'Full Stack Developer specializing in the MERN Stack. Passionate about transforming beautiful designs into highly functional, scalable, and engaging digital experiences.',
        portfolioUrl: 'https://profolio-blue.vercel.app/',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
        skills: [
            { category: 'Frontend', items: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion'] },
            { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB'] },
            { category: 'Tools & Architecture', items: ['REST APIs', 'Vercel', 'Git'] },
            { category: 'Design', items: ['UI/UX', 'Responsive Design', 'Interactive Visuals'] }
        ],
        projects: [
            {
                title: 'Full Stack Web Applications',
                description: 'Engineered high-performance web applications ensuring scalable architecture, pristine design systems, and responsive layouts across platforms.',
                tags: ['React', 'UI/UX', 'MERN']
            },
            {
                title: 'Premium Portfolios',
                description: 'Developed premium portfolio showcases utilizing advanced interactive animations (Framer Motion, GSAP) and cohesive branding strategies.',
                tags: ['Next.js', 'Framer Motion', 'Design']
            }
        ]
    },
    {
        id: 'sri-sai-praveen',
        name: 'Katta Sri Sai Praveen',
        role: 'Backend & Data Engineer',
        subtitle: 'Python · Microservices · ML-driven Analytics',
        description: 'Computer Science Engineer specializing in Python, backend development, microservices, and data/ML systems. Designing and shipping production-grade APIs, real-time services, and analytics pipelines that are secure, observable, and performant under real traffic.',
        portfolioUrl: 'https://69326c54e8aec728a1540bf7--celadon-zuccutto-a71c25.netlify.app/',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        skills: [
            { category: 'Languages', items: ['Python', 'SQL', 'JavaScript'] },
            { category: 'Frameworks', items: ['Django REST Framework', 'Streamlit'] },
            { category: 'Cloud & Infrastructure', items: ['AWS S3', 'Redis', 'Docker', 'Microservices', 'GitHub Actions'] },
            { category: 'Data & ML', items: ['NLP (spaCy, NLTK)', 'Pandas', 'Plotly', 'Matplotlib'] }
        ],
        projects: [
            {
                title: 'Product Management APIs',
                description: 'Built Product Management APIs using Django REST Framework with full CRUD logic and JWT auth. Designed a scalable e-commerce backend platform supporting 5,000+ concurrent shoppers using Django and PostgreSQL.',
                tags: ['E-Commerce', 'Django', 'PostgreSQL']
            },
            {
                title: 'Real-Time Notification Systems',
                description: 'Deployed real-time order and notification systems using Django Channels & WebSockets, enabling instant updates outperforming standard HTTP polling.',
                tags: ['WebSockets', 'Django Channels', 'Real-Time']
            },
            {
                title: 'Heart Disease Risk Analytics',
                description: 'Applied Exploratory Data Analysis to uncover core patterns. Built a Streamlit dashboard providing clinical insights with correlation matrices.',
                tags: ['Data Science', 'Streamlit', 'Analytics']
            }
        ]
    },
    {
        id: 'akhil-malisetty',
        name: 'Akhil Malisetty',
        role: 'Backend Engineer',
        subtitle: 'Java · Spring Boot · Distributed Systems · Redis',
        description: 'Backend engineer building scalable, low-latency applications with Java, Spring Boot, distributed microservices, Redis caching layers, and high-throughput REST/WebSocket APIs.',
        portfolioUrl: 'https://stunning-cactus-8b9821.netlify.app/',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
        skills: [
            { category: 'Languages', items: ['Java', 'SQL', 'Python'] },
            { category: 'Frameworks', items: ['Spring Boot', 'Hibernate', 'Express'] },
            { category: 'Architecture', items: ['Distributed Systems', 'Event-Driven Architecture', 'WebSockets', 'Redis'] },
            { category: 'Cloud & Security', items: ['AWS S3', 'JWT', 'OAuth2', 'RBAC', 'Kafka'] }
        ],
        projects: [
            {
                title: 'Real-Time Distributed Communication',
                description: 'Engineered a high-concurrency real-time messaging pipeline with WebSocket connections, stateful session handling, and Kafka-backed async event streaming.',
                tags: ['Java', 'Kafka', 'WebSockets']
            },
            {
                title: 'High-Throughput Authentication Core',
                description: 'Designed a production authentication service utilizing Redis for token revocation with TTL, JWT rotation, and role-based access control.',
                tags: ['Security', 'OAuth2', 'Redis']
            },
            {
                title: 'Scalable Microservice APIs',
                description: 'Architected robust REST APIs featuring cursor-based pagination, optimized relational database query plans, and secure S3 asset pipelines.',
                tags: ['API Design', 'AWS S3', 'Spring Boot']
            }
        ]
    },
    {
        id: 'siva-chandrasekhar',
        name: 'Siva Chandrasekhar Javvadi',
        role: 'Cloud & DevOps Engineer',
        subtitle: 'Kubernetes · Cloud Architecture · Zero-Downtime CI/CD',
        description: 'Building reliable pipelines, scalable infrastructure, and automated workflows. Turning complexity into clean, reproducible systems. Focusing on zero-downtime, AWS/Azure, multi-environment deployments, and infrastructure stability.',
        portfolioUrl: 'https://shiva-portfolio-gray.vercel.app/',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=80',
        skills: [
            { category: 'Cloud Platforms', items: ['AWS', 'Azure', 'Terraform'] },
            { category: 'Container Orchestration', items: ['Kubernetes (EKS)', 'Docker', 'Helm'] },
            { category: 'CI/CD & Automation', items: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'Ansible'] },
            { category: 'Observability & Security', items: ['Prometheus', 'Grafana', 'SonarQube'] }
        ],
        projects: [
            {
                title: 'Enterprise Microservice Deployment',
                description: 'Deployed centralized HR portal (Java Spring Boot microservices) on cloud infrastructure with RBAC and immutable audit logging.',
                tags: ['Kubernetes', 'RBAC', 'Zero-Downtime']
            },
            {
                title: 'High-Availability EdTech Edge Infrastructure',
                description: 'Managed infrastructure for an EdTech video content delivery platform optimized for sub-100ms global edge delivery via CDN.',
                tags: ['AWS', 'CloudFront', 'Edge']
            },
            {
                title: 'Automated GitOps & Kubernetes Migration',
                description: 'Migrated monolithic workloads to scalable microservices on AWS EKS using ArgoCD declarative pipelines with automated blue/green canary rollouts.',
                tags: ['EKS', 'ArgoCD', 'GitOps']
            }
        ]
    }
];

export default teamMembers;
