"use client";

import { motion } from "framer-motion";
import { GithubRepo } from "@/features/github/api";
import { Calendar, Rocket } from "lucide-react";

export function TechTimeline({ repos }: { repos: GithubRepo[] }) {
    const sortedRepos = [...repos]
        .filter(r => r.language)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // Get first occurrence of each language
    const languageFirstSeen: Record<string, string> = {};
    sortedRepos.forEach(repo => {
        if (repo.language && !languageFirstSeen[repo.language]) {
            languageFirstSeen[repo.language] = repo.created_at;
        }
    });

    const timelineItems = Object.entries(languageFirstSeen)
        .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime())
        .slice(0, 6);

    return (
        <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 tracking-tighter">
                <Rocket className="w-6 h-6 text-primary" />
                TECH STACK EVOLUTION
            </h3>

            <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-blue-500/50 before:to-transparent">
                {timelineItems.map(([lang, date], i) => (
                    <motion.div
                        key={lang}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -left-[30px] top-1.5 w-6 h-6 rounded-full bg-background border-[3px] border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10" />

                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">
                                {new Date(date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-lg font-black text-white tracking-tight">{lang}</span>
                            <p className="text-xs text-muted-foreground font-medium mt-1">
                                First milestone detected in development lifecycle.
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
