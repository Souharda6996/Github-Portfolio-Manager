"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, User, LogIn, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCurrentSession, logoutUser, UserSession } from "@/utils/auth";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const [session, setSession] = useState<UserSession | null>(null);

    const isDashboard = pathname.startsWith("/dashboard");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const checkAuth = () => setSession(getCurrentSession());

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("auth-change", checkAuth);
        checkAuth();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("auth-change", checkAuth);
        };
    }, []);

    if (isDashboard) return null; // Dashboard has its own sidebar navigation

    const navLinks = [
        { name: "FEATURES", href: "#features" },
        { name: "ENTERPRISE", href: "#" },
        { name: "CHANGELOG", href: "#" },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
            scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Github className="w-8 h-8 text-primary relative z-10 transition-transform group-hover:rotate-12" />
                    </div>
                    <span className="text-white font-black text-xl tracking-tighter uppercase">
                        DNA<span className="text-primary">.dev</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black tracking-[0.3em] text-white/40 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {session ? (
                        <>
                            <Link
                                href={`/dashboard/${session.username}`}
                                className="text-[11px] font-black tracking-widest text-primary hover:text-white transition-colors uppercase border border-primary/20 px-4 py-2 rounded-xl bg-primary/5"
                            >
                                {session.username}
                            </Link>
                            <button
                                onClick={logoutUser}
                                className="text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-colors uppercase italic"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-[11px] font-black tracking-widest text-white/60 hover:text-white transition-colors uppercase"
                            >
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <button className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all duration-500 flex items-center gap-2 group shadow-xl shadow-white/5">
                                    Sequence DNA
                                    <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <ChevronRight className="w-3 h-3" />
                                    </div>
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-8 md:hidden shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-black tracking-widest text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                            <Link
                                href="/login"
                                className="text-lg font-black tracking-widest text-white/60"
                                onClick={() => setIsOpen(false)}
                            >
                                LOGIN
                            </Link>
                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl">
                                    GET STARTED
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
