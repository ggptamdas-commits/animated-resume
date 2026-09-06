import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';
import { Package, Utensils, Smartphone, Activity, Cpu, ArrowRight, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] pt-24 pb-12 select-none">
      <Navbar />

      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BA8C63]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2A2A2A]/40 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* 1. Hero Header Titles & Label */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full text-center relative z-20 mt-4 sm:mt-6">
        <FadeIn delay={0.1} y={-10}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#BA8C63] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#BA8C63] animate-pulse" />
            RESTAURANT SUPERVISOR
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-center text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw]">
            Hi, I&apos;m Amdaul
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <p className="text-[#D7E2EA]/80 font-light uppercase tracking-widest text-xs sm:text-base md:text-lg max-w-2xl mx-auto mt-2 sm:mt-4">
            Restaurant Supervisor &amp; Automation Specialist
          </p>
        </FadeIn>
      </div>

      {/* 2. Hero 3D Visual with Floating Elements */}
      <div className="relative my-auto flex justify-center items-center py-6 sm:py-10 z-10">
        <Magnet padding={120} strength={4} className="relative flex justify-center items-center">
          {/* Central Portrait Container */}
          <div className="relative w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#141414] group">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
              alt="Amdaul Hoque - 3D Restaurant Professional"
              className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-80" />
          </div>

          {/* Floating Element 1: Inventory box (Top Left) */}
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex absolute -top-4 -left-12 sm:-left-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63]">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">Warehouse</div>
              <div className="text-xs font-semibold text-white">Inventory Control</div>
            </div>
          </motion.div>

          {/* Floating Element 2: Restaurant order screen (Top Right) */}
          <motion.div
            animate={{ y: [6, -6, 6], rotate: [1, -1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="hidden sm:flex absolute -top-4 -right-12 sm:-right-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">Service Flow</div>
              <div className="text-xs font-semibold text-white">Restaurant Operations</div>
            </div>
          </motion.div>

          {/* Floating Element 3: Digital menu screen (Bottom Left) */}
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden sm:flex absolute -bottom-4 -left-8 sm:-left-16 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">Web App</div>
              <div className="text-xs font-semibold text-white">khamer.vercel.app</div>
            </div>
          </motion.div>

          {/* Floating Element 4: Kitchen stock indicator & tech (Bottom Right) */}
          <motion.div
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="hidden sm:flex absolute -bottom-4 -right-8 sm:-right-16 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63]">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">AI Tools</div>
              <div className="text-xs font-semibold text-white">Kitchen Automation</div>
            </div>
          </motion.div>
        </Magnet>
      </div>

      {/* 3. Bottom CTAs */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20">
        <FadeIn delay={0.4} y={20}>
          <a
            href="#experience"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#BA8C63] text-black font-semibold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#c99a70] transition-all duration-300 shadow-[0_4px_20px_rgba(186,140,99,0.3)] hover:scale-105"
          >
            <span>Explore My Experience</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-white/20 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            <span>Contact Me</span>
            <Mail className="w-4 h-4" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
};
