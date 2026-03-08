"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Code2,
    BarChart3,
    Settings,
    Github,
    Search,
    Zap,
    Fingerprint
} from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar({ username }: { username: string }) {
    const pathname = usePathname();

    const navItems = [
        { icon: <LayoutDashboard className="w-4 h-4" />, label: "Sequence", href: `/dashboard/${username}` },
        { icon: <Code2 className="w-4 h-4" />, label: "Codebase", href: `#repos` },
        { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics", href: `#skills` },
        { icon: <Fingerprint className="w-4 h-4" />, label: "DNA ID", href: `#ai` },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-white/5 flex flex-col z-50">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter group transition-all">
                    <Github className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                    <span className="text-white">DNA<span className="text-primary">.dev</span></span>
                </Link>
            </div>

            <nav className="flex-grow px-4 space-y-2 mt-8">
                <div className="px-4 mb-4 text-[10px] uppercase tracking-[0.4em] font-black text-white/20">Navigation Cluster</div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${isActive
                                ? "text-primary bg-primary/10 font-black"
                                : "text-muted-foreground/60 hover:text-white hover:bg-white/5 font-bold"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-sidebar"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_var(--color-primary)]"
                                />
                            )}
                            <span className={`transition-transform group-hover:scale-110 ${isActive ? "text-primary" : ""}`}>
                                {item.icon}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 mt-auto">
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-black tracking-widest text-white uppercase">System Status</span>
                        </div>
                        <div className="text-[9px] font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
                            Neural engine active. Processing <span className="text-white">v3.2</span> protocols...
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
