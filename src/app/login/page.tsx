"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, Mail, Lock, ChevronRight, Zap, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, validateCredentials } from "@/utils/auth";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate network latency for professional feel
        await new Promise(r => setTimeout(r, 1500));

        const user = validateCredentials(identifier, password);

        if (user) {
            loginUser(user);
            router.push(`/dashboard/${user.username}`);
        } else {
            setError("Neural mismatch: Invalid credentials detected.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col relative overflow-hidden selection:bg-primary/30 font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-center pointer-events-none">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 group">
                    <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Back to Lab</span>
                </Link>
                <div className="flex items-center gap-2 pointer-events-auto group">
                    <Github className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
                    <span className="font-black text-lg tracking-tighter">DNA<span className="text-primary">.dev</span></span>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black tracking-tighter uppercase mb-3">Initialize Pulse</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Re-linking your sequence with our neural nodes.</p>
                    </div>

                    <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

                        <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest mb-6"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <div className="flex justify-between px-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary">Identity (Username or Email)</label>
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="IDENTIFIER..."
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-black/40 border-white/10 rounded-2xl h-14 pl-12 pr-4 text-xs font-black tracking-widest uppercase placeholder:text-white/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between px-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary">Password Payload</label>
                                    <Link href="#" className="text-[9px] font-black text-white/20 hover:text-primary tracking-widest uppercase">Lost Key?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border-white/10 rounded-2xl h-14 pl-12 pr-4 text-xs font-black tracking-widest focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full h-14 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Authorizing...
                                    </>
                                ) : (
                                    <>
                                        Authorize Session
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="h-px flex-grow bg-white/5" />
                            <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">or socialize</span>
                            <div className="h-px flex-grow bg-white/5" />
                        </div>

                        <button className="mt-8 w-full h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all font-black text-[11px] uppercase tracking-widest group">
                            <Github className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                            GitHub Linkage
                        </button>
                    </div>

                    <p className="text-center mt-10 text-[10px] font-black uppercase tracking-widest text-white/20">
                        First time in the lab? <Link href="/signup" className="text-primary hover:underline ml-2">Begin Sequencing</Link>
                    </p>
                </motion.div>
            </main>

            <footer className="p-8 flex justify-center items-center gap-6 relative z-10 pointer-events-none">
                <div className="flex items-center gap-2 opacity-20">
                    <Zap className="w-3 h-3" />
                    <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">Protocol v3.2-Auth</span>
                </div>
            </footer>
        </div>
    );
}
