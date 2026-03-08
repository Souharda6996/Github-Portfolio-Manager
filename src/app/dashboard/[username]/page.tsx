"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGithubUser, useGithubRepos } from "@/hooks/useGithubData";
import { useDashboardStore } from "@/features/github/store";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { SkillRadar } from "@/components/charts/skill-radar";
import { LanguageGraph } from "@/components/charts/language-graph";
import { RepoImpactList } from "@/components/dashboard/repo-impact";
import { RepoTable } from "@/components/dashboard/repo-table";
import { extractLanguageStats } from "@/utils/languageExtractor";
import { calculateRepoImpact } from "@/utils/scoring";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Brain, CornerUpLeft, Calendar, ChevronRight, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArchetypeBadge } from "@/components/dashboard/archetype-badge";
import { TechTimeline } from "@/components/dashboard/tech-timeline";
import { ContributionHeatmap } from "@/components/dashboard/contribution-heatmap";

export default function DashboardPage() {
    const { username } = useParams() as { username: string };
    const { setUserData } = useDashboardStore();
    const [aiInsight, setAiInsight] = useState<any>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);

    const { data: user, isLoading: userLoading, error: userError } = useGithubUser(username);
    const { data: repos, isLoading: reposLoading, error: reposError } = useGithubRepos(username);

    useEffect(() => {
        if (user && repos) {
            setUserData(user, repos);
            fetchAIInsight(user, repos);
        }
    }, [user, repos, setUserData]);

    const fetchAIInsight = async (userData: any, repoData: any) => {
        setIsAiLoading(true);
        try {
            const stats = extractLanguageStats(repoData);
            const { data } = await axios.post("/api/analyze", {
                userData,
                repoData,
                langStats: stats
            });
            setAiInsight(data);
        } catch (err) {
            console.error("AI Fetch error:", err);
        } finally {
            setIsAiLoading(false);
        }
    };

    const isLoading = userLoading || reposLoading;
    const error = userError || reposError;

    const langStats = repos ? extractLanguageStats(repos) : [];
    const impactRepos = repos ? calculateRepoImpact(repos) : [];

    const portfolioScore = repos ? Math.min(95, Math.round(
        (repos.length * 0.5) +
        (impactRepos.reduce((acc: number, r: any) => acc + r.score, 0) / 10) +
        (user?.followers || 0) * 0.2
    )) : 0;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-[#030303]">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h1 className="text-2xl font-black tracking-tighter mb-2">SEQUENCE ERROR</h1>
                <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">Failed to retrieve DNA payload for "{username}".</p>
                <button onClick={() => window.location.href = "/"} className="mt-8 px-6 py-2 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/5">Reinitialize</button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#030303] text-foreground font-sans scroll-smooth selection:bg-primary/30">
            <Sidebar username={username} />

            <main className="flex-grow ml-64 p-12">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-7xl mx-auto space-y-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-4">
                                    <Skeleton className="h-[600px] w-full rounded-[40px] bg-white/5" />
                                </div>
                                <div className="lg:col-span-8 space-y-12">
                                    <Skeleton className="h-40 w-full rounded-[40px] bg-white/5" />
                                    <div className="grid grid-cols-2 gap-12">
                                        <Skeleton className="h-80 w-full rounded-[40px] bg-white/5" />
                                        <Skeleton className="h-80 w-full rounded-[40px] bg-white/5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : user && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-7xl mx-auto space-y-16"
                        >
                            <header className="flex justify-between items-end border-b border-white/5 pb-12">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary">Live Bio-Analysis</span>
                                    </div>
                                    <h1 className="text-5xl font-black tracking-tighter mb-3 leading-none uppercase">Sequence Overview</h1>
                                    <p className="text-muted-foreground/60 font-bold uppercase text-[11px] tracking-[0.2em]">Processing digital signature: <span className="text-white">ID-{user.id}</span></p>
                                </motion.div>
                                <div className="text-right hidden lg:block">
                                    <div className="text-[100px] font-black text-white/[0.03] leading-none select-none tracking-tighter uppercase mr-[-20px] mb-[-30px]">
                                        {user.login}
                                    </div>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                {/* Left Column: Profile */}
                                <div className="lg:col-span-4 space-y-12">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <ProfileCard user={user} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-6 animate-pulse">Portfolio Health sequencing</div>
                                        <div className="flex items-end justify-between mb-8">
                                            <div className="text-8xl font-black text-white leading-none">{portfolioScore}</div>
                                            <div className="flex flex-col items-end pb-2">
                                                <div className="text-[10px] font-black uppercase text-muted-foreground/40 mb-2">Stability index</div>
                                                <div className="w-32 h-2 bg-white/5 rounded-full relative overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${portfolioScore}%` }}
                                                        transition={{ duration: 2, ease: "easeOut" }}
                                                        className="absolute inset-0 bg-primary shadow-[0_0_20px_var(--color-primary)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground/80 leading-relaxed font-bold uppercase tracking-wider">
                                            Synthesized from project impact, neural consistency, and community resonance.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <RepoImpactList impactRepos={impactRepos} />
                                    </motion.div>
                                </div>

                                {/* Right Column: Key Metrics */}
                                <div className="lg:col-span-8 space-y-12">
                                    <motion.div
                                        id="skills"
                                        className="grid grid-cols-1 md:grid-cols-2 gap-12 scroll-mt-24"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <SkillRadar stats={langStats} />
                                        <LanguageGraph stats={langStats} />
                                    </motion.div>

                                    {/* AI Insight Premium Section */}
                                    <motion.div
                                        id="ai"
                                        className="scroll-mt-24"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="p-12 rounded-[50px] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />

                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                                                <h3 className="text-3xl font-black mb-0 flex items-center gap-4 tracking-tighter uppercase">
                                                    <Brain className="w-10 h-10 text-primary animate-pulse" />
                                                    Neural Executive Summary
                                                </h3>
                                                <ArchetypeBadge archetype={aiInsight?.archetype} />
                                            </div>

                                            <p className="text-2xl text-white leading-relaxed max-w-3xl font-bold tracking-tight mb-12 relative z-10">
                                                {aiInsight ? `"${aiInsight.summary}"` : `"Neural engine is currently decrypting source patterns and repository metadata for final synthesis..."`}
                                            </p>

                                            {aiInsight && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                                                    <div className="space-y-6">
                                                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-3">Primary Sequence Indicators</h4>
                                                        <ul className="space-y-4">
                                                            {aiInsight.strengths?.map((s: string, i: number) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    whileInView={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                    className="flex items-center gap-4 text-sm font-black text-white uppercase tracking-wider"
                                                                >
                                                                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                                                                    {s}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-3">Trajectory Optimizations</h4>
                                                        <ul className="space-y-4">
                                                            {aiInsight.suggestions?.map((s: string, i: number) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    whileInView={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.1 + 0.3 }}
                                                                    className="flex items-center gap-4 text-sm font-black text-white/60 uppercase tracking-wider"
                                                                >
                                                                    <ChevronRight className="w-4 h-4 text-primary" />
                                                                    {s}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                onClick={() => {
                                                    const blob = new Blob([JSON.stringify({ user, stats: langStats, impact: impactRepos, ai: aiInsight }, null, 2)], { type: 'application/json' });
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `DNA-Report-${username}.json`;
                                                    a.click();
                                                }}
                                                className="mt-16 px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
                                            >
                                                Extract Deep Technical Report
                                                <Rocket className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>

                                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            <RepoTable repos={repos || []} />
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <TechTimeline repos={repos || []} />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        className="p-12 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-md"
                                    >
                                        <h3 className="text-xl font-black mb-10 tracking-tighter uppercase">Annual Contribution Flux</h3>
                                        <ContributionHeatmap repos={repos || []} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
