"use client";

import { motion } from "framer-motion";
import { Search, Brain, Rocket, ChevronRight, Github } from "lucide-react";

interface StepCardProps {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    delay: number;
}

function StepCard({ number, title, description, icon, delay }: StepCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="relative group h-full"
        >
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full p-10 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden group-hover:border-primary/40 transition-all duration-500">
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                <div className="flex justify-between items-start mb-12">
                    <div className="p-4 rounded-2xl bg-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                        {icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 select-none">{number}</span>
                </div>

                <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase text-white group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                    {description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                    Neural Pulse Synced <ChevronRight className="w-3 h-3" />
                </div>
            </div>
        </motion.div>
    );
}

export function HowItWorks() {
    return (
        <section className="w-full py-40 relative z-10 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                    <div className="w-1 h-1 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary transition-colors">
                        Protocol Overview
                    </span>
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white italic">
                    Neural Lifecycle
                </h2>
                <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-bold tracking-tight">
                    A three-stage synthesis process that converts raw repository metadata into a professional digital identity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StepCard
                    number="01"
                    title="Identity Link"
                    description="Connect your GitHub signature to our neural core. We initiate the deep scanning of your contribution modules."
                    icon={<Github className="w-8 h-8" />}
                    delay={0.1}
                />
                <StepCard
                    number="02"
                    title="DNA Sequencing"
                    description="Our neural engine decrypts commit sequences, language dominance, and impact signals across public repositories."
                    icon={<Brain className="w-8 h-8" />}
                    delay={0.2}
                />
                <StepCard
                    number="03"
                    title="Identity Synthesis"
                    description="Generate a high-impact builder visual. Fromarchetypes to project evolution timelines, your DNA is exposed."
                    icon={<Rocket className="w-8 h-8" />}
                    delay={0.3}
                />
            </div>
        </section>
    );
}
