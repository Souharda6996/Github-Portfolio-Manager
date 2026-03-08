"use client";

import { motion } from "framer-motion";
import { GithubRepo } from "@/features/github/api";
import { useMemo } from "react";

interface ContributionHeatmapProps {
    repos: GithubRepo[];
}

export function ContributionHeatmap({ repos }: ContributionHeatmapProps) {
    // Generate a realistic heatmap based on repository update dates
    const heatmapData = useMemo(() => {
        const data = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 2)); // Base noise

        // Boost intensity based on repo updates
        repos.forEach(repo => {
            const updateDate = new Date(repo.updated_at);
            const now = new Date();
            const diffMs = now.getTime() - updateDate.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffDays < 364) {
                const index = 364 - diffDays;
                if (index >= 0 && index < data.length) {
                    data[index] = Math.min(4, data[index] + 2);

                    // Add some surrounding activity to the same week
                    for (let i = 1; i < 3; i++) {
                        if (index - i >= 0) data[index - i] = Math.min(3, data[index - i] + 1);
                        if (index + i < data.length) data[index + i] = Math.min(3, data[index + i] + 1);
                    }
                }
            }
        });

        return data;
    }, [repos]);

    const getColor = (level: number) => {
        switch (level) {
            case 0: return "bg-white/[0.02]";
            case 1: return "bg-primary/20";
            case 2: return "bg-primary/40";
            case 3: return "bg-primary/70";
            case 4: return "bg-primary";
            default: return "bg-white/[0.02]";
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                        <span key={m} className="text-[8px] font-black text-white/20 uppercase tracking-widest w-[calc(100%/12)] text-center">
                            {m}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-1.5 h-32 md:h-40">
                {heatmapData.map((level, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (i % 52) * 0.01 + (Math.floor(i / 52) * 0.02) }}
                        className={`w-full h-full rounded-sm ${getColor(level)} border border-white/5 hover:border-primary/50 transition-colors cursor-crosshair relative group`}
                    >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-tighter rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                            Level {level} Flux
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Low Flux</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(l => (
                        <div key={l} className={`w-3 h-3 rounded-sm ${getColor(l)} border border-white/5`}></div>
                    ))}
                </div>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">High Flux</span>
            </div>
        </div>
    );
}
