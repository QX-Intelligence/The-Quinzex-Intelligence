export const teamMembers = [
  {
    id: 'sri-sai-praveen',
    name: 'Katta Sri Sai Praveen',
    role: 'Backend & Data Engineer',
    subtitle: 'Python · Microservices · ML-driven Analytics',
    description: 'Computer Science Engineer specializing in Python, backend development, microservices, and data/ML systems. Designing and shipping production-grade APIs, real-time services, and analytics pipelines that are secure, observable, and performant under real traffic.',
    portfolioUrl: 'https://69326c54e8aec728a1540bf7--celadon-zuccutto-a71c25.netlify.app/',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    subtitle: 'Java · Spring Boot · Distributed Systems',
    description: 'Backend engineer with hands-on experience building scalable, secure, and real-time applications. Specialized across API design, authentication systems, cloud integrations, and performance optimization.',
    portfolioUrl: 'https://stunning-cactus-8b9821.netlify.app/',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    skills: [
      { category: 'Languages', items: ['Java', 'SQL'] },
      { category: 'Frameworks', items: ['Spring Boot', 'Hibernate'] },
      { category: 'Architecture', items: ['Distributed Systems', 'Event-Driven Arch', 'WebSockets', 'Redis'] },
      { category: 'Cloud & Auth', items: ['AWS S3', 'JWT', 'OAuth2', 'RBAC', 'Kafka'] }
    ],
    projects: [
      {
        title: 'Real-Time Chat & Notifications',
        description: 'Built a full-featured real-time communication platform with WebSocket-based messaging, signaling flow, and Kafka-powered async event handling.',
        tags: ['Java', 'Kafka', 'WebSockets']
      },
      {
        title: 'Advanced Authentication System',
        description: 'Production-style authentication using Redis with TTL, JWT access & refresh tokens, OAuth2 social logins, and role-based access control.',
        tags: ['Security', 'OAuth2', 'Redis']
      },
      {
        title: 'Scalable API System',
        description: 'High-performance API system with cursor-based pagination for large data, optimized database queries, and secure AWS S3 integrations.',
        tags: ['API Design', 'AWS S3', 'Optimization']
      }
    ]
  },
  {
    id: 'siva-javvadi',
    name: 'Siva Chandrasekhar Javvadi',
    role: 'Cloud & DevOps Engineer',
    subtitle: 'Kubernetes · Infrastructure · Automation',
    description: 'Building reliable pipelines, scalable infrastructure, and automated workflows. Turning complexity into clean, reproducible systems. Focusing on zero-downtime, AWS/Azure, multi-environment deployments, and infrastructure stability.',
    portfolioUrl: 'https://shiva-portfolio-gray.vercel.app/',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    skills: [
      { category: 'Cloud', items: ['AWS', 'Azure', 'Terraform'] },
      { category: 'Orchestration', items: ['Kubernetes', 'Docker'] },
      { category: 'CI/CD & Automation', items: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'Ansible'] },
      { category: 'Observability', items: ['Prometheus', 'Grafana', 'SonarQube'] }
    ],
    projects: [
      {
        title: 'Deployment - Dolphin HR',
        description: 'Deployed centralized HR portal (Java Springboot microservices) on internal infra with RBAC and audit logging.',
        tags: ['Internal Infra', 'RBAC', 'Deployment']
      },
      {
        title: 'Deployment - CareerVedha',
        description: 'Managed infrastructure for an EdTech video content delivery platform. Optimized for low-latency global edge access.',
        tags: ['AWS', 'Low Latency', 'CDN']
      },
      {
        title: 'K8s Migration & Pipelines',
        description: 'Migrating monolithic apps to scalable microservices on EKS with automated CI/CD pipelines securing zero downtime.',
        tags: ['EKS', 'ArgoCD', 'Microservices']
      }
    ]
  },
  {
    id: 'chaitanya-kumar',
    name: 'Chaitanya Kumar',
    role: 'Full Stack Developer',
    subtitle: 'MERN Stack · Next.js · Premium UI/UX',
    description: 'Full Stack Developer specializing in the MERN Stack. Passionate about transforming beautiful designs into highly functional, scalable, and engaging digital experiences.',
    portfolioUrl: 'https://profolio-blue.vercel.app/',
    image: 'https://images.unsplash.com/photo-1627398246734-d8dd0217dc3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
  }
];
