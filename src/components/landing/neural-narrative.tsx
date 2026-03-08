"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Search, Database, Fingerprint, Zap, Shield, BarChart3 } from "lucide-react";

interface NarrativeSectionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

function NarrativeSection({ icon, title, description, index }: NarrativeSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, rotateY, perspective: "1000px" }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10 max-w-4xl mx-auto"
        >
            <div className="mb-12 relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/40 transition-all duration-700" />
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-3xl text-primary animate-pulse group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
            </div>

            <span className="text-[10px] font-black text-primary uppercase tracking-[0.8em] mb-6 block">
                Neural Segment {index + 1}
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-white">
                {title}
            </h2>
            <p className="text-lg md:text-xl text-white/40 font-bold tracking-tight leading-relaxed max-w-2xl px-4">
                {description}
            </p>

            {/* Connection Line */}
            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
        </motion.div>
    );
}

export function NeuralNarrative() {
    const sections = [
        {
            icon: <Database className="w-12 h-12" />,
            title: "Deep Ingestion",
            description: "Our neural probes scan every commit, branch, and pull request. We don't just see code; we see the metabolic rate of your contribution lifecycle."
        },
        {
            icon: <Brain className="w-12 h-12" />,
            title: "Cognitive Analysis",
            description: "Proprietary algorithms decrypt language dominance and architectural influence. We identify if you are a system-thinker, a feature-builder, or a code-gardener."
        },
        {
            icon: <Fingerprint className="w-12 h-12" />,
            title: "Identity Synthesis",
            description: "Raw metadata is fused into a high-impact digital signature. Your professional archetype is exposed, validated, and rendered in high fidelity."
        }
    ];

    return (
        <section className="relative w-full py-40 space-y-40">
            {/* Narrative Header */}
            <div className="text-center sticky top-40 z-0 opacity-10 pointer-events-none overflow-hidden h-0 md:h-auto">
                <h2 className="text-[200px] font-black text-white/5 tracking-tighter uppercase leading-none">
                    THE ENGINE
                </h2>
            </div>

            <div className="relative z-10">
                {sections.map((section, i) => (
                    <NarrativeSection key={i} {...section} index={i} />
                ))}
            </div>

            {/* Functional Grid Highlight */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-40">
                {[
                    { icon: <Shield className="w-5 h-5" />, label: "Encrypted Vault", val: "AES-256" },
                    { icon: <Zap className="w-5 h-5" />, label: "Pulse Rate", val: "Sub-Second" },
                    { icon: <BarChart3 className="w-5 h-5" />, label: "Precision", val: "99.9% Rank" },
                    { icon: <Search className="w-5 h-5" />, label: "Forensics", val: "Deep Trace" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 text-center hover:bg-white/[0.08] transition-all"
                    >
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            {stat.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
                            <span className="text-sm font-black text-white uppercase tracking-widest">{stat.val}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
