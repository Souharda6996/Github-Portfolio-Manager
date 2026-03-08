"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ArchetypeBadgeProps {
    archetype: string;
}

export function ArchetypeBadge({ archetype }: ArchetypeBadgeProps) {
    return (
        <div className="relative group">
            {/* 🎇 Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-primary/30 blur-2xl rounded-full"
            />

            <div className="relative flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-primary/40 transition-all duration-500">
                {/* 🧬 Scanning Animation */}
                <motion.div
                    animate={{
                        top: ["-100%", "200%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm z-0"
                />

                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary animate-pulse">
                        Neural Classification
                    </span>
                    <span className="text-xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
                        {archetype || "Analyzing DNA..."}
                    </span>
                </div>
            </div>
        </div>
    );
}
