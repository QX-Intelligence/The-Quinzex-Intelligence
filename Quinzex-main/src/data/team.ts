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
    role: 'Backend, AI & Data Engineer',
    subtitle: 'Python · Django · LLMs & AI Agents · Machine Learning',
    description: 'Computer Science engineer specializing in Python, Django/Flask microservices, machine learning, computer vision, and LLM-powered workflows. Building scalable APIs, applied AI pipelines, and interactive analytics dashboards backed by SQL, Redis, and AWS S3.',
    portfolioUrl: 'https://69326c54e8aec728a1540bf7--celadon-zuccutto-a71c25.netlify.app/',
    image: '/quinzex/assets/team/sri-sai-praveen.jpg',
    skills: [
      { category: 'Languages & Backend', items: ['Python', 'SQL', 'Django', 'Django REST Framework', 'Flask', 'Microservices'] },
      { category: 'Generative AI & LLMs', items: ['LLMs', 'AI Agents', 'LangChain', 'LangGraph', 'Prompt Engineering', 'Google Gemini API', 'Stable Diffusion'] },
      { category: 'Machine Learning & Vision', items: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'OpenCV', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Random Forest'] },
      { category: 'Data & Visualization', items: ['Pandas', 'NumPy', 'SciPy', 'Streamlit', 'Matplotlib', 'Seaborn', 'Plotly'] },
      { category: 'Databases, Cloud & DevOps', items: ['MySQL', 'PostgreSQL', 'Oracle', 'Redis', 'AWS S3', 'Git', 'GitHub', 'CI/CD'] }
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
    subtitle: 'Java · Spring Boot · Microservices · Kafka & Redis',
    description: 'Backend engineer building scalable, low-latency applications with Java, the Spring ecosystem (Boot, MVC, Security, Cloud, Data JPA), Hibernate, Apache Kafka, Redis, WebSockets, and secure payment gateway integrations.',
    portfolioUrl: 'https://stunning-cactus-8b9821.netlify.app/',
    image: '/quinzex/assets/team/akhil-malisetty.jpg',
    skills: [
      { category: 'Languages & Frameworks', items: ['Java', 'Spring Boot', 'Spring Framework', 'Spring MVC', 'Spring Cloud', 'Spring Data JPA', 'Hibernate'] },
      { category: 'Architecture & Messaging', items: ['Microservices', 'REST APIs', 'WebSockets', 'Apache Kafka', 'Payment Gateway Integration'] },
      { category: 'Security & Databases', items: ['Spring Security', 'JWT', 'OAuth 2.0', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase'] },
      { category: 'Cloud, DevOps & Testing', items: ['AWS', 'Docker', 'Nginx', 'Maven', 'Git', 'GitHub', 'JUnit', 'Mockito'] }
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
    subtitle: 'AWS · Linux · Kubernetes · Terraform · CI/CD',
    description: 'Building reliable CI/CD pipelines, scalable cloud infrastructure, and automated workflows across Linux and AWS. Turning operational complexity into reproducible systems with Terraform, Docker, Kubernetes, Ansible, Puppet, Prometheus + Grafana, SonarQube, and Snyk.',
    portfolioUrl: 'https://shiva-portfolio-gray.vercel.app/',
    image: '/quinzex/assets/team/siva-chandrasekhar.jpg',
    skills: [
      { category: 'Systems & Cloud', items: ['Linux', 'AWS', 'SQL', 'Terraform'] },
      { category: 'Containers & Config Management', items: ['Docker', 'Kubernetes', 'Ansible', 'Puppet'] },
      { category: 'CI/CD & Build Automation', items: ['Maven', 'Jenkins'] },
      { category: 'Observability & Security', items: ['SonarQube', 'Prometheus + Grafana', 'Snyk'] }
    ],
    projects: [
      {
        title: 'Deployment - Dolphin HR',
        description: 'Deployed centralized HR portal (Java Springboot microservices) on internal infra with RBAC and audit logging.',
        tags: ['Kubernetes', 'Docker', 'Jenkins']
      },
      {
        title: 'Deployment - CareerVedha',
        description: 'Managed infrastructure for an EdTech video content delivery platform. Optimized for low-latency global edge access.',
        tags: ['AWS', 'Terraform', 'Linux']
      },
      {
        title: 'Automated CI/CD & DevSecOps Pipeline',
        description: 'Automated build, security scanning, and observability workflows using Maven, Jenkins, SonarQube, Snyk, Ansible, Puppet, and Prometheus + Grafana.',
        tags: ['Jenkins', 'SonarQube', 'Snyk']
      }
    ]
  },

];
