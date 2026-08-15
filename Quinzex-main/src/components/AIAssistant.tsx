import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  AlertCircle, 
  Bot, 
  Compass, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Trash2,
  Copy,
  Check,
  Activity,
  Zap,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';
import { aiConfig } from '@/config/ai';

// ──────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT (FRIENDLY RECEPTIONIST CONCIERGE)
// ──────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are ARIA, the warm, charming, and highly friendly virtual receptionist concierge at Quinzex Intelligence.
Your personality: Delightfully welcoming, professional, and intellectual yet approachable. You speak with natural grace and genuine helpfulness, like a host guiding a premium client through our digital office.
Always be conversational and organic. Feel free to use warm transitions (e.g. "I'd love to show you...", "It's wonderful to have you looking at...").
Tailor responses slightly to their context: Page: {path}, Section: {section}.
Keep responses descriptive yet readable (2-3 sentences max) to maintain a lively, friendly conversation flow.
`;

const COMPANY_KNOWLEDGE = `
Company Details:
- Who we are: Boutique digital intelligence collective.
- Our pillars: Interactive WebGL builds, high-throughput backend APIs, custom systems architecture.
- Key Projects:
  1. CareerVedha (EdTech): Next.js decoupled storefront + Redis caching. 50k concurrent users, <120ms p99.
  2. MH Marble (Premium Showcase): React + Three.js 3D slab viewer + GSAP scroll. +340% conversion.
  3. Nexus (Real-time Messaging): Node.js Socket.io cluster + Redis Pub/Sub. 5k active connections, 98ms latency.
  4. HRMS (Dashboard): React + Spring Boot. Automated payroll from 3 days down to 4 minutes.
`;

const personaMode = 'concierge';

const getCannedResponse = (query: string, currentPath: string, currentSection: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes('price') || q.includes('cost') || q.includes('budget')) {
    return "Our custom projects generally start around $10k. If you'd like, I can help you build an interactive estimate right here or guide you to our Project Planner on the contact page!";
  }
  if (q.includes('tech') || q.includes('stack') || q.includes('framework')) {
    return "We specialize in modern frontend storefronts using React and Next.js, backed by ultra-reliable Spring Boot or Node.js services. Everything we ship is heavily optimized for zero lag!";
  }
  if (q.includes('speed') || q.includes('performance') || q.includes('fast')) {
    return "Performance is our absolute obsession! We guarantee sub-1.5 second page loads by using aggressive edge-caching and asset optimization, so visitors get an instant experience.";
  }
  if (q.includes('design') || q.includes('style') || q.includes('animation')) {
    return "We build premium fluid animations using Framer Motion and GSAP. Everything is hardware-accelerated to keep interactions incredibly buttery and responsive.";
  }
  if (q.includes('3d') || q.includes('blob')) {
    return "Ah, that gorgeous liquid mesh on our homepage? It runs custom WebGL displacement noise shaders, optimized to maintain a perfect 60 frames per second on any device!";
  }

  // General canned logic
  if (q.includes('price') || q.includes('cost') || q.includes('budget')) {
    return "Our engagements begin at $10k, scaling depending on project complexity. You can configure a project estimate directly using our 3-step interactive Project Planner at the /contact page.";
  }
  if (q.includes('contact') || q.includes('hire') || q.includes('start')) {
    return "To initiate a project, launch our conversational Project Planner on the /contact route. You can set services, budgets, and upload project briefs.";
  }
  if (q.includes('career') || q.includes('vedha')) {
    return "CareerVedha is our analytics & EdTech storefront. We built Next.js storefronts integrated with Redis key-value clusters to process 50k concurrent users with under 120ms latency.";
  }
  if (q.includes('marble') || q.includes('mh')) {
    return "MH Marble features a Three.js WebGL slab viewer that enables visitors to inspect materials in 3D, boosting client conversions by 340%.";
  }
  if (q.includes('nexus') || q.includes('chat')) {
    return "Nexus is a messaging architecture built on Socket.io clustered nodes and Redis Pub/Sub, delivering realtime message frames under 98ms end-to-end.";
  }
  if (q.includes('hrms') || q.includes('payroll')) {
    return "HRMS is an enterprise portal that optimized payroll processes for a large logistics firm, reducing payroll latency from 3 days down to 4 minutes.";
  }
  if (q.includes('who') || q.includes('about')) {
    return "Quinzex Intelligence is a premium digital collective of specialized engineers, design architects, and systems developers creating premium custom assets.";
  }
  if (q.includes('lenis') || q.includes('scroll')) {
    return "We sync Lenis smooth scroll engine with standard CSS overflow bounds to achieve fully locked background geometry whenever case study modals or chat overlays are active.";
  }

  return `I am ARIA, currently analyzing ${currentSection} on the ${currentPath || 'page'}. We build premium WebGL portals and robust cloud infrastructures. Let me know what architectural stack you'd like to explore.`;
};
const getReceptionistGreeting = (path: string, section: string): string => {
  const p = path.toLowerCase();
  const s = section.toLowerCase();

  if (p === '/contact') {
    return "Hi there! I can guide you through our interactive Project Planner. Ready to estimate a project budget?";
  }
  if (p === '/philosophy') {
    return "Welcome! You're looking at our core design principles. Should I explain how we achieve zero layout shifts?";
  }
  if (p === '/collective') {
    return "Greetings! Meet our network of specialized architects. Want to learn about our project flow?";
  }
  if (p === '/expertise') {
    return "Hi! I see you're viewing our core capabilities. Want to inspect our high-throughput API stack?";
  }
  if (p === '/portfolio') {
    return "Welcome to our selected works. I can show you how we scaled CareerVedha for 50k concurrent users. Shall we?";
  }
  
  if (s === 'about') {
    return "Hello! I'm ARIA. Let me know if you want to inspect our custom cursor physics or WebGL blob configurations.";
  }
  if (s === 'testimonials' || s === 'clients') {
    return "Hi there! Feel free to read client team reports, or ask me for specific metrics on our shipments.";
  }
  if (s === 'expertise') {
    return "Hello! Inspecting our services? I can explain how we enforce our sub-1.5s p99 load boundary.";
  }
  if (s === 'work' || s === 'portfolio') {
    return "Hey! Checking out our active showcase? You can toggle between static case studies and dynamic sandboxes.";
  }
  
  return "Welcome to Quinzex Intelligence! I'm ARIA, your digital receptionist. How can I guide you today?";
};

const getPageSuggestions = (path: string): string[] => {
  if (path === '/') {
    return [
      "Tell me about the 3D fluid blob",
      "What are your core capabilities?",
      "How did you optimize cursor lag?"
    ];
  }
  if (path === '/portfolio') {
    return [
      "Explain the CareerVedha edtech build",
      "How does MH Marble use Three.js?",
      "What are the metrics for Nexus?"
    ];
  }
  if (path === '/philosophy') {
    return [
      "What is backend-less lead gen?",
      "How do you maintain zero scroll lag?",
      "Explain your interactive guidelines"
    ];
  }
  if (path === '/collective') {
    return [
      "Who are the system architects?",
      "What's your project flow model?",
      "How to join the collective?"
    ];
  }
  return [
    "Estimate a project timeline",
    "What is your production tech stack?",
    "How to get a custom quote"
  ];
};

const getPageName = (path: string): string => {
  if (path === '/') return 'Home';
  if (path.startsWith('/collective')) return 'Collective';
  const name = path.substring(1);
  return name.charAt(0).toUpperCase() + name.slice(1);
};


type ARIAEmotion = 'happy' | 'excited' | 'thinking' | 'sleeping';

function ARIAFace({ emotion, className = "w-14 h-14" }: { emotion: ARIAEmotion; className?: string }) {
  const [blink, setBlink] = useState(false);
  const [pupilX, setPupilX] = useState(0);
  const [pupilY, setPupilY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Natural blinking at random intervals
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 4000; // 2–6 seconds
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        scheduleNextBlink();
      }, delay);
    };
    const t = scheduleNextBlink();
    return () => clearTimeout(t);
  }, []);

  // Handle pupil cursor tracking & deep thinking wander
  useEffect(() => {
    if (emotion === 'sleeping') {
      setPupilX(0);
      setPupilY(0);
      return;
    }

    if (emotion === 'thinking') {
      // Slow quizzical wandering in the upper right quadrant
      let angle = 0;
      const interval = setInterval(() => {
        angle += 0.2;
        setPupilX(1.4 + Math.cos(angle) * 0.4);
        setPupilY(-1.4 + Math.sin(angle) * 0.3);
      }, 150);
      return () => clearInterval(interval);
    }

    // rAF-throttled tracker — only calls setState once per animation frame,
    // never on every raw mousemove pixel, so it adds zero cursor lag.
    let rafId: number | null = null;
    let latestMouseX = 0;
    let latestMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      latestMouseX = e.clientX;
      latestMouseY = e.clientY;
      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const faceCenterX = rect.left + rect.width / 2;
        const faceCenterY = rect.top + rect.height / 2;
        const dx = latestMouseX - faceCenterX;
        const dy = latestMouseY - faceCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          const maxMovement = 2.4;
          const angle = Math.atan2(dy, dx);
          const intensity = Math.min(distance / 300, 1);
          setPupilX(Math.cos(angle) * maxMovement * intensity);
          setPupilY(Math.sin(angle) * maxMovement * intensity);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [emotion]);

  const eyeScaleY = emotion === 'sleeping' ? 0.08 : blink ? 0.05 : emotion === 'thinking' ? 0.55 : 1;
  const eyeColor  = emotion === 'excited' ? '#ffd700' : '#c4a662';

  // Eyebrow path mappings for each emotion
  const leftEyebrowPath = {
    happy:    'M 9 13 Q 15 10 21 13',
    excited:  'M 9 11 Q 15 6 21 11',
    thinking: 'M 9 12 Q 15 14 21 12',
    sleeping: 'M 9 15 Q 15 14 21 15',
  }[emotion || 'happy'] || 'M 9 13 Q 15 10 21 13';

  const rightEyebrowPath = {
    happy:    'M 35 13 Q 41 10 47 13',
    excited:  'M 35 11 Q 41 6 47 11',
    thinking: 'M 35 10 Q 41 8 47 11',
    sleeping: 'M 35 15 Q 41 14 47 15',
  }[emotion || 'happy'] || 'M 35 13 Q 41 10 47 13';

  // Mouth path per emotion
  const mouthPath = {
    happy:    'M 20 37 Q 28 44 36 37',                      // gentle smile, centered below eyes
    excited:  'M 18 35 Q 28 47 38 35',                      // big wide grin, centered below eyes
    thinking: 'M 21 38 Q 24.5 35 28 38 Q 31.5 41 35 38',    // wavy uncertain, centered below eyes
    sleeping: 'M 23 38 L 33 38',                            // small closed/neutral line, centered below eyes
  }[emotion || 'happy'] || 'M 20 37 Q 28 44 36 37';

  const mouthStrokeWidth = emotion === 'excited' ? 2.5 : 2;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 56 56"
      className={`select-none ${className}`}
      aria-label={`ARIA is ${emotion}`}
    >
      {/* Face background glow */}
      <defs>
        <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4a662" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pupilGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c4a662" stopOpacity="0.65" />
        </radialGradient>
      </defs>

      {/* Pulsating background aura */}
      <motion.circle
        cx="28"
        cy="28"
        r="27"
        fill="url(#faceGlow)"
        animate={{
          opacity: emotion === 'excited' ? [0.75, 1, 0.75] : emotion === 'sleeping' ? [0.2, 0.45, 0.2] : [0.45, 0.65, 0.45],
          scale: emotion === 'excited' ? [0.98, 1.06, 0.98] : [0.99, 1.01, 0.99]
        }}
        transition={{
          duration: emotion === 'excited' ? 1.5 : emotion === 'sleeping' ? 4.5 : 3.0,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: '28px 28px' }}
      />

      {/* ── Left Eye ── */}
      <g transform="translate(15, 21)">
        {/* Eye socket */}
        <ellipse cx="0" cy="0" rx="5.5" ry="5.5" fill="#1a1a1a" stroke={eyeColor} strokeWidth="1.2" />
        {/* Pupil */}
        <motion.ellipse
          cx={pupilX}
          cy={pupilY}
          rx="2.8"
          ry="2.8"
          fill="url(#pupilGrad)"
          animate={{ scaleY: eyeScaleY }}
          transition={{ duration: blink ? 0.06 : 0.3 }}
        />
        {/* Double reflection shines */}
        <circle cx={pupilX + 1.2} cy={pupilY - 1.2} r="0.8" fill="white" opacity="0.9" />
        <circle cx={pupilX - 1.0} cy={pupilY + 1.0} r="0.4" fill="white" opacity="0.45" />
        {/* Eyelid */}
        <motion.ellipse
          cx="0" cy="-5.5"
          rx="5.8" ry="5.8"
          fill="#0d0d0d"
          animate={{ scaleY: eyeScaleY < 0.4 ? 1.8 : 0 }}
          style={{ transformOrigin: '0px -5.5px' }}
          transition={{ duration: 0.08 }}
        />
      </g>

      {/* ── Right Eye ── */}
      <g transform="translate(41, 21)">
        {/* Eye socket */}
        <ellipse cx="0" cy="0" rx="5.5" ry="5.5" fill="#1a1a1a" stroke={eyeColor} strokeWidth="1.2" />
        {/* Pupil */}
        <motion.ellipse
          cx={pupilX}
          cy={pupilY}
          rx="2.8"
          ry="2.8"
          fill="url(#pupilGrad)"
          animate={{ scaleY: eyeScaleY }}
          transition={{ duration: blink ? 0.06 : 0.3 }}
        />
        {/* Double reflection shines */}
        <circle cx={pupilX + 1.2} cy={pupilY - 1.2} r="0.8" fill="white" opacity="0.9" />
        <circle cx={pupilX - 1.0} cy={pupilY + 1.0} r="0.4" fill="white" opacity="0.45" />
        {/* Eyelid */}
        <motion.ellipse
          cx="0" cy="-5.5"
          rx="5.8" ry="5.8"
          fill="#0d0d0d"
          animate={{ scaleY: eyeScaleY < 0.4 ? 1.8 : 0 }}
          style={{ transformOrigin: '0px -5.5px' }}
          transition={{ duration: 0.08 }}
        />
      </g>

      {/* ── Eyebrows ── */}
      <motion.path
        d={leftEyebrowPath}
        stroke={eyeColor}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        animate={{ d: leftEyebrowPath }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.path
        d={rightEyebrowPath}
        stroke={eyeColor}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        animate={{ d: rightEyebrowPath }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* ── Thinking squiggle on forehead ── */}
      {emotion === 'thinking' && (
        <motion.path d="M 22 10 Q 25 7 28 10 Q 31 13 34 10" stroke={eyeColor} strokeWidth="1.2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }} />
      )}

      {/* ── Sleeping Z Z ── */}
      {emotion === 'sleeping' && (
        <>
          <motion.text
            x="36"
            y="14"
            fill={eyeColor}
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
            animate={{ opacity: [0, 1, 0], y: [14, 5], x: [36, 39] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            z
          </motion.text>
          <motion.text
            x="37"
            y="14"
            fill={eyeColor}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
            animate={{ opacity: [0, 1, 0], y: [14, 2], x: [37, 42] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.85 }}
          >
            Z
          </motion.text>
        </>
      )}

      {/* ── Mouth ── */}
      <motion.path
        d={mouthPath}
        stroke={eyeColor}
        strokeWidth={mouthStrokeWidth}
        fill="none"
        strokeLinecap="round"
        animate={{ d: mouthPath }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />

      {/* ── Cheek blush fading ── */}
      <motion.g
        animate={{ opacity: emotion === 'excited' ? 0.35 : emotion === 'happy' ? 0.12 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <ellipse cx="12" cy="32" rx="4" ry="2.2" fill="#ff6b9d" />
        <ellipse cx="44" cy="32" rx="4" ry="2.2" fill="#ff6b9d" />
      </motion.g>
    </svg>
  );
}

interface Message {
  id: string;
  sender: 'aria' | 'user';
  text: string;
  timestamp: Date;
  isAutoExplanation?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('Hero');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [simulatedLatency, setSimulatedLatency] = useState(0);
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  // ── Idle/Sleeping Timer logic ─────────────────
  useEffect(() => {
    if (isOpen) {
      setIsIdle(false);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsIdle(true);
      }, 25000); // 25 seconds of inactivity
    };

    // Initial setup
    resetTimer();

    // Event listeners for activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isOpen]);
  
  // Floating proactive suggestions states
  const [activeSuggestion, setActiveSuggestion] = useState('What is Quinzex Intelligence?');
  const [showCallout, setShowCallout] = useState(false);

  const location = useLocation();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<string>('');

  // Initial welcome message
  useEffect(() => {
    const welcomeText = `Hello, I'm ARIA. I am synced with your viewport on the ${getPageName(location.pathname)} page. Ask me anything about our architecture, design patterns, or case studies.`;
    setMessages([
      {
        id: 'welcome',
        sender: 'aria',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Update suggestions dynamically when page route or scrolled section shifts
  useEffect(() => {
    const sug = getReceptionistGreeting(location.pathname, currentSection);
    setActiveSuggestion(sug);
    
    // Automatically trigger a floating callout to grab attention if chat is closed
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowCallout(true);
      }, 3000); // 3 seconds delay for natural feel
      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentSection, isOpen]);

  // Hide callout instantly if user opens the main assistant panel manually
  useEffect(() => {
    if (isOpen) {
      setShowCallout(false);
    }
  }, [isOpen]);

  // ── Global mouse tracker — detect hovering over project cards ──────
  useEffect(() => {
    const PROJECT_HINTS: Record<string, string> = {
      'careervedha': "Psst! 👋 Want to know how CareerVedha handles 50k concurrent users? I'd love to walk you through it!",
      'mh marble':   "Ooh, MH Marble is a gem! 🪨 Shall I tell you how we boosted their conversions by 340%?",
      'nexus':       "Nexus is our real-time messaging powerhouse! ⚡ Want to know how it hits 98ms latency?",
      'hrms':        "HRMS automated payroll from 3 days to just 4 minutes! 🚀 Curious how we did it?",
    };

    let hoverTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      // Walk up the DOM to find the nearest element with data-project
      const card = (el as HTMLElement).closest('[data-project]') as HTMLElement | null;
      const projectName = card?.dataset.project?.toLowerCase() ?? null;

      if (projectName && PROJECT_HINTS[projectName]) {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          if (!isOpen) {
            setHoveredProject(projectName);
            setActiveSuggestion(PROJECT_HINTS[projectName]);
            setShowCallout(true);
          }
        }, 1200); // 1.2s dwell before suggesting
      } else {
        clearTimeout(hoverTimer);
        // only reset if we are not mid-callout
        setHoveredProject(prev => {
          if (prev) setShowCallout(false);
          return null;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(hoverTimer);
    };
  }, [isOpen]);

  const handleReceptionistClick = (greeting: string) => {
    setIsOpen(true);
    setShowCallout(false);
    
    // Add receptionist greeting to chat history if not already present
    setMessages(prev => {
      const exists = prev.some(m => m.text === greeting);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: `receptionist-${Date.now()}`,
          sender: 'aria',
          text: greeting,
          timestamp: new Date()
        }
      ];
    });

    if (audioEnabled) {
      speakText(greeting);
    }
  };

  // Section Tracking via IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) {
        const sectionId = visible.target.id;
        if (sectionId && sectionId !== lastSectionRef.current) {
          lastSectionRef.current = sectionId;
          const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
          setCurrentSection(sectionName);
          triggerAutoExplanation(sectionName);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.25
    });

    const sections = document.querySelectorAll('section[id], div[id^="section-"]');
    sections.forEach(s => observer.observe(s));

    return () => {
      sections.forEach(s => observer.unobserve(s));
    };
  }, [location.pathname]);

  // Route tracker
  useEffect(() => {
    const pageName = getPageName(location.pathname);
    triggerAutoExplanation(`Page: ${pageName}`);
  }, [location.pathname]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const triggerAutoExplanation = (contextName: string) => {
    let contextText = '';
    if (contextName.toLowerCase().includes('page: philosophy')) {
      contextText = "Viewing: **Philosophy**. We design with *engineering purity*: backend-less forms, zero scroll lag, and optimized vertex noise shaders.";
    } else if (contextName.toLowerCase().includes('page: expertise')) {
      contextText = "Viewing: **Expertise**. We deliver custom WebGL interactive designs, Spring-Boot clusters, and Next.js edge storefronts.";
    } else if (contextName.toLowerCase().includes('page: portfolio') || contextName.toLowerCase() === 'work') {
      contextText = "Viewing: **Selected Works**. Click to toggle between structured editorial **Case Studies** and interactive live **Sandbox** iframe previews.";
    } else if (contextName.toLowerCase().includes('page: collective') || contextName.toLowerCase() === 'team') {
      contextText = "Viewing: **Collective**. Meet our network of specialized developers, systems architects, and CDN specialists.";
    } else if (contextName.toLowerCase().includes('page: contact') || contextName.toLowerCase() === 'contact') {
      contextText = "Viewing: **Project Planner**. A responsive 3-step lead wizard. Configure budget brackets and service selections to get an automated pricing profile.";
    } else if (contextName.toLowerCase() === 'about') {
      contextText = "Viewing: **About**. Custom scroll physics sync with native viewports to maintain steady 60fps on mobile displays.";
    } else if (contextName.toLowerCase() === 'testimonials' || contextName.toLowerCase() === 'clients') {
      contextText = "Viewing: **Trust Proofs**. Swipe verified logs from product teams alongside our high-speed logo marquee ticker.";
    } else {
      return;
    }

    setTimeout(() => {
      setMessages(prev => {
        if (prev.length > 0 && prev[prev.length - 1].text === contextText) return prev;
        
        if (audioEnabled) {
          speakText(contextText);
        }

        if (!isOpen) {
          setUnreadCount(c => c + 1);
        }

        return [
          ...prev,
          {
            id: `auto-${Date.now()}`,
            sender: 'aria',
            text: contextText,
            timestamp: new Date(),
            isAutoExplanation: true
          }
        ];
      });
    }, 1200);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*|`|_|\*/g, ''); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira')));
    if (premiumVoice) utterance.voice = premiumVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    // Add user message to state
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const startTime = Date.now();

    try {
      let responseText = '';

      if (aiConfig.enableAI && aiConfig.geminiApiKey) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.model}:generateContent?key=${aiConfig.geminiApiKey}`;
        
        // strictly formatted history for Gemini API
        const chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
        
        messages.forEach(m => {
          if (m.isAutoExplanation || m.id === 'welcome') return;
          const role = m.sender === 'user' ? 'user' : 'model';
          
          if (chatHistory.length === 0) {
            if (role === 'user') {
              chatHistory.push({ role, parts: [{ text: m.text }] });
            }
          } else {
            const lastTurn = chatHistory[chatHistory.length - 1];
            if (lastTurn.role === role) {
              lastTurn.parts[0].text += "\n" + m.text;
            } else {
              chatHistory.push({ role, parts: [{ text: m.text }] });
            }
          }
        });

        // Add user text
        const alreadyAdded = chatHistory.some(h => h.parts[0].text.includes(userText));
        if (!alreadyAdded) {
          chatHistory.push({ role: 'user', parts: [{ text: userText }] });
        }

        const systemPrompt = SYSTEM_PROMPT
          .replace('{path}', location.pathname)
          .replace('{section}', currentSection)
          + "\n\n" + COMPANY_KNOWLEDGE;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: chatHistory.slice(-10),
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.55,
              // gemini-2.5-flash uses ~250 thinking tokens internally;
              // 2048 guarantees a full reply after thinking overhead.
              maxOutputTokens: 2048,
            }
          })
        });

        if (!response.ok) throw new Error('API failed');

        const data = await response.json();
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        
        // Estimate token counts
        const tokens = Math.round((systemPrompt.length + JSON.stringify(chatHistory).length) / 4);
        setTokenEstimate(tokens);
      } else {
        // Canned Sandbox Mode response
        await new Promise(resolve => setTimeout(resolve, 600));
        responseText = getCannedResponse(userText, location.pathname, currentSection);
        setTokenEstimate(Math.round(userText.length / 4));
      }

      setSimulatedLatency(Date.now() - startTime);

      setMessages(prev => [
        ...prev,
        {
          id: `aria-${Date.now()}`,
          sender: 'aria',
          text: responseText,
          timestamp: new Date()
        }
      ]);

      if (audioEnabled) {
        speakText(responseText);
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'aria',
          text: "API connection failed. Reverted to offline system. Check API Key in `src/config/ai.ts`.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'aria',
        text: "Conversation context flushed. How can I assist you now?",
        timestamp: new Date()
      }
    ]);
  };

  const handleCopyConversation = () => {
    const transcript = messages
      .map(m => `[${m.sender.toUpperCase()} - ${m.timestamp.toLocaleTimeString()}] ${m.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(transcript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Custom Formatter for Markdown (bold, lists, code)
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        const lines = code.split('\n');
        const lang = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const actualCode = lang ? lines.slice(1).join('\n') : code;
        return (
          <pre key={i} className="my-2 p-2.5 bg-black/40 border border-white/10 rounded font-mono text-[10px] text-primary overflow-x-auto whitespace-pre">
            {actualCode}
          </pre>
        );
      }
      
      const subParts = part.split(/(\*\*.*?\*\*|`.*?`|\n)/g);
      return (
        <span key={i}>
          {subParts.map((sub, j) => {
            if (sub.startsWith('**') && sub.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{sub.slice(2, -2)}</strong>;
            }
            if (sub.startsWith('`') && sub.endsWith('`')) {
              return <code key={j} className="bg-white/10 px-1 py-0.5 rounded font-mono text-[10px] text-primary">{sub.slice(1, -1)}</code>;
            }
            if (sub === '\n') {
              return <br key={j} />;
            }
            return sub;
          })}
        </span>
      );
    });
  };

  const currentSuggestions = getPageSuggestions(location.pathname);

  // ── ARIA Emotion state derived from component state ─────────────────
  const ariaEmotion: 'happy' | 'excited' | 'thinking' | 'sleeping' =
    isLoading ? 'thinking' :
    (showCallout || hoveredProject) ? 'excited' :
    isIdle ? 'sleeping' :
    'happy';

  return (
    <>
      {/* Floating Sparkles Trigger & Callout */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex items-end gap-3 pointer-events-none">
        {/* Floating Proactive Suggestion Callout */}
        <AnimatePresence>
          {showCallout && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-2.5 bg-background/95 backdrop-blur-md border border-primary/30 p-3.5 rounded-lg shadow-[0_4px_25px_rgba(196,166,98,0.2)] max-w-[190px] xs:max-w-[240px] sm:max-w-[280px] shrink-0"
            >
              <div 
                onClick={() => handleReceptionistClick(activeSuggestion)}
                className="cursor-pointer group flex-1"
              >
                <div className="flex items-center gap-1.5 text-primary text-[8px] font-mono font-bold tracking-wider uppercase mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-primary animate-pulse" />
                  ARIA Concierge
                </div>
                <p className="text-white text-xs leading-snug group-hover:text-primary transition-colors font-medium">
                  {activeSuggestion}
                </p>
                <span className="text-[8px] text-muted-foreground font-mono mt-1.5 block group-hover:underline">
                  Click to reply / open chat →
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                }}
                className="text-muted-foreground hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors self-start shrink-0"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative pointer-events-auto">
          <AnimatePresence>
            {!isOpen && unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-1 bg-primary text-primary-foreground font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold z-10 shadow-lg border border-background animate-pulse"
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => { setIsOpen(!isOpen); setUnreadCount(0); }}
            className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background/90 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-[0_0_25px_rgba(196,166,98,0.2)] hover:border-primary hover:shadow-[0_0_35px_rgba(196,166,98,0.35)] transition-all duration-300 overflow-hidden"
            title="Toggle ARIA AI Bot"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 group-hover:rotate-180 transition-transform duration-1000" />
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div key="face" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ARIAFace emotion={ariaEmotion} className="w-12 h-12 sm:w-14 sm:h-14" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Main Glassmorphism Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent // CRITICAL: Stop background scroll propagation
            className={`fixed right-4 bottom-20 sm:right-8 sm:bottom-28 z-50 flex flex-col bg-background/95 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'w-[calc(100vw-32px)] md:w-[600px] h-[75vh] sm:h-[80vh]' 
                : 'w-[calc(100vw-32px)] sm:w-[390px] h-[70vh] sm:h-[520px] max-h-[520px]'
            }`}
          >
            {/* Widget Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-primary/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-black/40 overflow-hidden animate-pulse">
                  <ARIAFace emotion={ariaEmotion} className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-xs tracking-wider text-white uppercase">{aiConfig.botName}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[9px] text-muted-foreground tracking-widest uppercase">{aiConfig.botSubtitle}</p>
                </div>
              </div>

              {/* Utility Panel */}
              <div className="flex items-center gap-1.5">
                {/* Telemetry Switcher */}
                <button
                  onClick={() => setShowTelemetry(!showTelemetry)}
                  className={`p-1.5 rounded transition-colors ${showTelemetry ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-muted-foreground'}`}
                  title="Toggle Tech Telemetry"
                >
                  <Activity className="w-3.5 h-3.5" />
                </button>

                {/* Audio toggle */}
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-1.5 rounded transition-colors ${audioEnabled ? 'bg-primary/15 text-primary' : 'hover:bg-white/5 text-muted-foreground'}`}
                  title="Text-to-Speech Toggle"
                >
                  {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Size toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:bg-white/5 rounded text-muted-foreground transition-colors hidden sm:block"
                  title={isExpanded ? "Minimize Widget" : "Maximize Widget"}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Close panel */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded text-muted-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sci-Fi Telemetry Panel */}
            <AnimatePresence>
              {showTelemetry && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-black/80 border-b border-primary/20 px-4 py-3 text-[10px] font-mono text-primary/80 grid grid-cols-2 gap-x-4 gap-y-1.5 shrink-0 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-primary/50" /> MODEL: <span className="text-white">{aiConfig.model}</span></div>
                  <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-primary/50" /> LATENCY: <span className="text-white">{simulatedLatency ? `${simulatedLatency}ms` : '0ms'}</span></div>
                  <div className="flex items-center gap-1.5"><Layers className="w-3 h-3 text-primary/50" /> STACK: <span className="text-white">Gemini/Vite</span></div>
                  <div className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-primary/50" /> EST. TOKENS: <span className="text-white">{tokenEstimate}</span></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Context Strip — shows current page & section */}
            <div className="px-4 py-1.5 bg-white/5 border-b border-white/5 flex items-center gap-2 text-[9px] shrink-0 font-mono text-muted-foreground">
              <Sparkles className="w-2.5 h-2.5 text-primary/60" />
              <span className="text-primary/70 uppercase tracking-wide">ARIA</span>
              <span className="text-white/10">·</span>
              <span className="truncate">{currentSection} section{hoveredProject ? ` · Viewing ${hoveredProject}` : ''}</span>
            </div>

            {/* Sandbox banner */}
            {!aiConfig.enableAI && (
              <div className="px-4 py-1.5 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center gap-2 shrink-0">
                <AlertCircle className="w-3 h-3 text-yellow-500 shrink-0" />
                <p className="text-[9px] text-yellow-500/80 leading-snug">
                  Offline Sandbox Mode. Update key in `src/config/ai.ts` for full cognitive AI.
                </p>
              </div>
            )}

            {/* Messages Scroll Frame */}
            <div 
              data-lenis-prevent // CRITICAL: Stop background scroll propagation on inner list
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 relative bg-black/10"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground font-medium shadow-[0_4px_12px_rgba(196,166,98,0.15)]'
                        : msg.isAutoExplanation
                          ? 'bg-primary/5 border border-primary/20 text-foreground/90 italic'
                          : 'bg-white/5 border border-white/10 text-foreground/90 shadow-sm'
                    }`}
                  >
                    {msg.sender === 'aria' && !msg.isAutoExplanation && (
                      <div className="font-display font-semibold text-[9px] tracking-wider text-primary uppercase mb-1.5 flex items-center gap-1.5">
                        <Bot className="w-2.5 h-2.5" />
                        {aiConfig.botName}
                        <span className="text-[7px] text-muted-foreground italic font-mono lowercase">({personaMode})</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{renderFormattedText(msg.text)}</p>
                    <span className="block text-[8px] text-right mt-1.5 opacity-40 font-mono">
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-md px-4 py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex gap-2 overflow-x-auto shrink-0 scrollbar-none scroll-smooth">
              {currentSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  className="whitespace-nowrap px-2.5 py-1 bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 rounded-full text-[9px] text-muted-foreground transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Form & Conversation Actions */}
            <div className="border-t border-white/10 bg-background shrink-0">
              {/* Action Toolbar */}
              <div className="px-3 py-1 flex items-center justify-between border-b border-white/5 bg-black/20 text-[9px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-primary" /> PATH: {location.pathname}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyConversation}
                    className="hover:text-white flex items-center gap-1.5 transition-colors"
                    title="Copy Conversation"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'COPIED' : 'COPY'}
                  </button>
                  <span className="text-white/10">|</span>
                  <button
                    onClick={handleClearHistory}
                    className="hover:text-red-400 flex items-center gap-1.5 transition-colors"
                    title="Clear Conversation History"
                  >
                    <Trash2 className="w-3 h-3" />
                    CLEAR
                  </button>
                </div>
              </div>

              {/* Form Input Field */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); setInputValue(''); }}
                className="p-3 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask ARIA about our projects, stack..."
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/95 disabled:opacity-40 disabled:hover:bg-primary transition-all shadow-md shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
