"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, Mail, Lock, ChevronRight, User, Fingerprint, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/utils/auth";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (username.length < 3) return setError("Username must be at least 3 characters.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));

        const result = registerUser({
            username,
            email,
            password,
            createdAt: Date.now()
        });

        if (result.success) {
            loginUser({ username, email, createdAt: Date.now() });
            router.push(`/dashboard/${username}`);
        } else {
            setError(result.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col relative overflow-hidden selection:bg-primary/30 font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-3/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-center pointer-events-none">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 group">
                    <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Abort Pulse</span>
                </Link>
                <div className="flex items-center gap-2 pointer-events-auto group">
                    <Fingerprint className="w-6 h-6 text-primary group-hover:animate-pulse" />
                    <span className="font-black text-lg tracking-tighter">DNA<span className="text-primary">.dev</span></span>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black tracking-tighter uppercase mb-3 leading-none">Initialize Sequencing</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Generating unique digital fingerprint in the global developer pool.</p>
                    </div>

                    <div className="p-12 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative group overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

                        <form className="space-y-8 relative z-10" onSubmit={handleSignup}>
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary px-2">Operator Identity</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            placeholder="NAME..."
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-black/40 border-white/10 rounded-2xl h-14 pl-12 pr-4 text-xs font-black tracking-widest uppercase focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary px-2">Communication Link</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="email"
                                            placeholder="EMAIL..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black/40 border-white/10 rounded-2xl h-14 pl-12 pr-4 text-xs font-black tracking-widest uppercase focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-primary px-2">Access Payload (Alpha-Numeric)</label>
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

                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20">
                                <p className="text-[9px] font-bold text-white/60 leading-relaxed uppercase tracking-wider">
                                    By initializing the pulse, you agree to our <span className="text-primary hover:underline cursor-pointer">Neural Protocols</span> and data harvesting policies for analysis.
                                </p>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full h-16 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Initializing DNA...
                                    </>
                                ) : (
                                    <>
                                        Finalize Sequence
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 flex items-center justify-center gap-4">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                                Already in the engine? <Link href="/login" className="text-primary hover:underline ml-2">Resume Session</Link>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </main>

            <footer className="p-12 text-center opacity-10 font-black text-[8px] uppercase tracking-[1em]">
                Distributed Neutral Architecture &copy; 2024
            </footer>
        </div>
    );
}
