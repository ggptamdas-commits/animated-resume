import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d1116] pt-24 pb-16 px-6 md:px-12 select-none">
      {/* Faint CSS Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-0" />

      {/* Massive Barely Visible Background Typography Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-0">
        <span className="text-[20vw] font-black tracking-tighter text-white opacity-[0.02] leading-none whitespace-nowrap">
          OPERATIONS
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center space-y-6 text-left">
          {/* Subheading with neon green dot indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#00df8f]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00df8f] shadow-[0_0_8px_#00df8f] animate-pulse" />
            <span>RESTAURANT SUPERVISOR</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.2rem] font-bold tracking-tighter leading-[0.9] text-white uppercase"
          >
            OPERATIONAL <br />
            <span className="text-stroke-neon">EXCELLENCE</span>
            <span className="text-[#00df8f]">.</span>
          </motion.h1>

          {/* Intro Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#9ca3af] text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            Experienced Restaurant Supervisor &amp; Automation Specialist in Jizan, Saudi Arabia. Bridging hands-on floor leadership and warehouse management with custom web applications and AI-assisted workflows.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            {/* View My Work: Neon green gradient background, pill shape */}
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00df8f] to-[#00b373] text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_rgba(0,223,143,0.3)]"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </a>

            {/* Contact Me: Dark surface, thin white border, green dot */}
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#14181f] text-white font-semibold uppercase tracking-widest text-xs sm:text-sm border border-white/10 hover:border-[#00df8f]/50 hover:bg-[#181d26] transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#00df8f] shadow-[0_0_6px_#00df8f]" />
              <span>Contact Me</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive ID Card */}
        <div className="relative flex justify-center items-center pt-8 lg:pt-0">
          {/* Lanyard Strip */}
          <div className="hidden sm:block absolute -top-32 left-1/2 -translate-x-1/2 w-12 h-36 bg-gradient-to-b from-white/10 via-[#14181f] to-[#0d1116] border-x border-white/10 z-0">
            {/* Clip Mechanism */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-zinc-700 rounded-sm border border-white/20 shadow-md">
              <div className="w-2 h-2 bg-zinc-900 mx-auto mt-1 rounded-full" />
            </div>
          </div>

          {/* Interactive ID Badge */}
          <motion.div
            drag
            dragElastic={0.2}
            dragConstraints={{ top: -40, left: -40, right: 40, bottom: 40 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            animate={{ y: [0, -15, 0], rotateZ: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
            className="relative z-10 w-[290px] sm:w-[340px] md:w-[380px] rounded-3xl bg-[#14181f] border border-white/10 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing backdrop-blur-md"
          >
            {/* Badge Punch Hole */}
            <div className="w-10 h-2.5 mx-auto mb-4 rounded-full bg-[#0d1116] border border-white/15" />

            {/* Portrait Image */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#0d1116] border border-white/5 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
                alt="Amdaul Hoque - Restaurant Supervisor"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Top Tag on Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1116]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#00df8f]">
                <Sparkles className="w-3 h-3 text-[#00df8f]" />
                <span>Khamer Team</span>
              </div>

              {/* Bottom Gradient Overlay with Credentials */}
              <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-5 bg-gradient-to-t from-[#0d1116] via-[#0d1116]/90 to-transparent flex flex-col justify-end text-left">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1">
                  Amdaul Hoque<span className="text-[#00df8f]">.</span>
                </div>
                <div className="text-xs font-semibold tracking-wider text-[#00df8f] uppercase mt-0.5">
                  Restaurant Supervisor
                </div>
                <div className="text-[11px] text-[#9ca3af] font-light mt-0.5">
                  &amp; Automation Specialist · Jizan, KSA
                </div>
              </div>
            </div>

            {/* Bottom ID Badge Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-wider text-[#9ca3af]">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00df8f] shadow-[0_0_6px_#00df8f]" />
                Active Staff
              </span>
              <span className="font-mono text-white/50">ID #2026-SR</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};