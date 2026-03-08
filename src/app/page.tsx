"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ArrowRight, Rocket, Code2, Brain } from "lucide-react";
import Link from "next/link";
import { HowItWorks } from "@/components/landing/how-it-works";
import { NeuralNarrative } from "@/components/landing/neural-narrative";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: "primary" | "blue";
}

function FeatureCard({ icon, title, desc, accent }: FeatureCardProps) {
  const accentColor = accent === "primary" ? "text-primary border-primary/20 bg-primary/5" : "text-blue-400 border-blue-400/20 bg-blue-400/5";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-10 rounded-[40px] border backdrop-blur-xl transition-all duration-500 group ${accentColor}`}
    >
      <div className="mb-8 p-4 rounded-3xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-white/50 font-bold uppercase text-[11px] tracking-[0.2em] leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/dashboard/${username.trim()}`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden pt-20 selection:bg-primary/30" onMouseMove={handleMouseMove}>
      {/* 🌌 Advanced 3D Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
        {/* 3D Perspective Grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, #primary 1px, transparent 1px), linear-gradient(to bottom, #primary 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-200px)',
            maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          }}
        />

        {/* Moving Mesh Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 45, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [45, 0, 45],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-500/10 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#1a0b2e]/5 rounded-full blur-[200px]"
        />

        {/* Carbon Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

        {/* Grainy Texture */}
        <div className="absolute inset-0 opacity-[0.1] bg-[url(\'https://grainy-gradients.vercel.app/noise.svg\')] blend-soft-light" />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mt-20 md:mt-24 w-full">
          <motion.div
            style={{ rotateX: mousePos.y, rotateY: -mousePos.x }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neural Intelligence Engine</span>
            </div>
            <h1 className="text-6xl md:text-[130px] font-black tracking-tighter leading-none mb-4 uppercase drop-shadow-[0_0_30px_rgba(var(--color-primary),0.3)]">
              Decode Your <br />
              <span className="text-primary">Builder DNA.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-bold tracking-tight">
              Transform your GitHub footprint into a high-impact visual signature. For builders who demand excellence.
            </p>
          </motion.div>

          {/* Search & Entry */}
          <motion.div
            style={{ rotateX: mousePos.y * 0.5, rotateY: -mousePos.x * 0.5, translateZ: 50 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative p-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] flex items-center gap-4 transition-all duration-500 group-hover:border-white/20">
                <div className="p-4 bg-white/5 rounded-full hidden sm:block">
                  <Github className="w-8 h-8 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="ENTER GITHUB IDENTITY..."
                  className="bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-black w-full text-white placeholder:text-white/10 uppercase tracking-tighter outline-none pl-6 sm:pl-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="h-14 md:h-16 px-6 md:px-10 bg-white text-black text-[10px] md:text-xs font-black rounded-full uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] shrink-0 active:scale-95">
                  Sequence
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <Link href="/signup">
                <button className="group text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-primary transition-all flex items-center gap-3">
                  Waitlist <div className="w-8 h-[1px] bg-white/10 group-hover:bg-primary group-hover:w-12 transition-all" /> Alpha Access
                </button>
              </Link>
              <div className="flex -space-x-3 overflow-hidden opacity-40 hover:opacity-100 transition-opacity cursor-help">
                {["octocat", "torvalds", "gaearon"].map((u, i) => (
                  <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-black grayscale hover:grayscale-0 transition-all" src={`https://github.com/${u}.png`} alt={u} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div id="features" className="w-full mt-60 scroll-mt-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              Neural Capabilities
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Bio-Metric Insights"
              desc="Neural analysis of your contribution patterns, language dominance, and project impact sequences."
              accent="primary"
            />
            <FeatureCard
              icon={<Code2 className="w-8 h-8" />}
              title="Builder Identity"
              desc="Generate a professional archetype that highlights your unique builder signature to the world."
              accent="blue"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Neural Forensics"
              desc="DEEP PATTERN RECOGNITION ACROSS PUBLIC REPOSITORY MODULES TO IDENTIFY CORE ARCHITECTURAl STRENGTHS."
              accent="primary"
            />
          </div>
        </div>

        {/* Neural Narrative Section */}
        <NeuralNarrative />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Footer */}
        <footer className="w-full mt-40 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Pulse Status: Operational</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Lab Docs</a>
            <a href="#" className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Neural Hub</a>
            <a href="#" className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">DNA Protocol</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
