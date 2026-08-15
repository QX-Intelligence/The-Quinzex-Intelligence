import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Rocket, Shield, Heart, Zap, Share2, X, Download } from 'lucide-react';
import { toast } from 'sonner';
import Scene3D from '../components/Scene3D';
import InvitationCard from '../components/InvitationCard';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

const features = [
    {
        icon: <Sparkles className="w-8 h-8 text-primary" />,
        title: "Aura Design Language",
        description: "Bespoke digital curation styled with a luxury Obsidian & Champagne Gold aesthetic. Fluid responsive systems, micro-animations, and balanced glassmorphism form an instant emotional connection.",
        tech: "Bespoke Curation & UI/UX"
    },
    {
        icon: <Brain className="w-8 h-8 text-primary" />,
        title: "Cognitive Integration",
        description: "Intelligent software structures loaded with modern AI integrations, semantic pipelines, and natural language processing models to streamline complex operational tasks seamlessly.",
        tech: "AI & Machine Learning"
    },
    {
        icon: <Rocket className="w-8 h-8 text-primary" />,
        title: "Ultra-Low Latency Pipelines",
        description: "High-performance setups leveraging optimized asset loads, pre-rendering patterns, edge-caching networks, and minimal bundle weights to ensure instantaneous interaction vectors.",
        tech: "Performance Engineering"
    },
    {
        icon: <Shield className="w-8 h-8 text-primary" />,
        title: "Resilient System Architecture",
        description: "Dockerized, microservices-driven structures engineered for horizontal scalability, high concurrent traffic spikes, and strict data layer security protocols.",
        tech: "Robust Infrastructure"
    }
];

const whyItMatters = [
    {
        icon: <Heart className="w-6 h-6 text-primary" />,
        text: "Bespoke, elite visual presentation establishes instant, unwavering trust with enterprise stakeholders. First impressions are irreversible."
    },
    {
        icon: <Zap className="w-6 h-6 text-primary" />,
        text: "Uncompromising application performance guarantees high user retention and frictionless conversion vectors for your digital services."
    },
    {
        icon: <Rocket className="w-6 h-6 text-primary" />,
        text: "Unique, highly custom digital ecosystems set your enterprise leagues apart from standard off-the-shelf framework competitors."
    }
];

export default function ProjectFeatures() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);

    const handleDownloadInvite = async () => {
        if (!cardRef.current) return;

        try {
            const toastId = toast.loading("Printing your Golden Ticket...");

            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // High quality capture
                backgroundColor: '#0a0a0a',
                useCORS: true,
                logging: false
            });

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'quinzex-golden-ticket.png';
            link.href = dataUrl;
            link.click();

            toast.dismiss(toastId);
            toast.success("Golden Ticket Downloaded!");
            setShowModal(false); // Close after download
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate ticket");
        }
    };

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-background">

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Scene3D />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <div className="relative w-full max-w-5xl flex flex-col items-center">

                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/* Card Preview Container - Scaled for visibility on smaller screens */}
                            <div className="overflow-auto max-h-[80vh] w-full flex justify-center p-4">
                                {/* We render the card here nicely using a wrapper to handle scaling if needed,
                                 but keeping it straightforward for html2canvas */}
                                <div className="relative shadow-2xl shadow-primary/20">
                                    <InvitationCard ref={cardRef} />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDownloadInvite}
                                    className="px-8 py-3 rounded-full bg-primary text-background font-bold hover:brightness-110 transition-all flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Save Image
                                </button>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 section-container">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-4">
                            ◆ Engineering Specification ◆
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                            Distinct Core <span className="gradient-text">Assets</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Bespoke architectures crafted with uncompromising precision and premium luxury aesthetic.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative p-8 rounded-2xl bg-card/30 border border-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                            <div className="relative z-10">
                                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                                <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-mono tracking-wider uppercase">
                                    {feature.tech}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Why It Matters Section */}
                <div className="relative p-10 md:p-16 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
                    {/* Decorative Glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="font-display text-4xl font-bold mb-12">
                            The Architecture of <span className="text-primary">Success</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-10">
                            {whyItMatters.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        {item.icon}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        "{item.text}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Share Section - IGNORED IN DOWNLOAD */}
                <motion.div
                    data-html2canvas-ignore="true"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center flex flex-col items-center gap-8"
                >
                    <button
                        onClick={() => {
                            const url = window.location.href;
                            const text = "Hey! Check out this sneak peek of the future. Something amazing is coming... 🚀";

                            if (navigator.share) {
                                navigator.share({
                                    title: 'Future Preview',
                                    text: text,
                                    url: url
                                }).catch(console.error);
                            } else {
                                navigator.clipboard.writeText(`${text}\n${url}`);
                                toast.success("Invitation copied to clipboard!");
                            }
                        }}
                        className="group relative px-8 py-4 bg-primary/10 hover:bg-primary/20 rounded-full border border-primary/30 text-primary transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Share2 className="w-5 h-5 relative z-10" />
                        <span className="font-mono tracking-widest uppercase text-sm font-bold relative z-10">
                            Share Invite
                        </span>
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="group relative px-8 py-4 bg-primary/10 hover:bg-primary/20 rounded-full border border-primary/30 text-primary transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Sparkles className="w-5 h-5 relative z-10" />
                        <span className="font-mono tracking-widest uppercase text-sm font-bold relative z-10">
                            Get Golden Ticket
                        </span>
                    </button>

                    <p className="text-sm font-mono text-primary/60 tracking-widest uppercase">
                        Built with Love & Code
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
