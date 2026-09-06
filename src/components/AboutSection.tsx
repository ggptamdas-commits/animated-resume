import React from 'react';
import { FadeIn } from './FadeIn';
import { Card3D } from './Card3D';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 bg-[#0C0C0C] select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left side: Large animated heading */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
          <FadeIn delay={0.1} y={30}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
              Professional Overview
            </span>
            <h2 className="hero-heading font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 leading-none">
              About Me
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="text-[#D7E2EA]/60 text-sm sm:text-base leading-relaxed font-light">
              Bridging hands-on restaurant floor supervision with custom warehouse automation and digital operational tools.
            </p>
          </FadeIn>
        </div>

        {/* Right side: Verbatim CV Text & 4 3D Visual Cards */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Verbatim Paragraph Card */}
          <FadeIn delay={0.2} y={30}>
            <div className="rounded-3xl border border-white/10 bg-[#141414]/90 p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#BA8C63] to-transparent" />
              <p className="text-[#D7E2EA] font-normal leading-relaxed text-base sm:text-lg md:text-xl">
                &ldquo;Experienced Restaurant Supervisor with a background in Warehouse Management. Expert in inventory control, team leadership, and social media management using AI tools. Fluent in 5 languages (Arabic, English, Hindi, Urdu, Bengali), allowing for seamless communication with international customers and diverse teams.&rdquo;
              </p>
            </div>
          </FadeIn>

          {/* Four Decorative 3D Restaurant-Related Visuals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Visual 01: Restaurant supervision and service operations */}
            <FadeIn delay={0.3} y={20}>
              <Card3D className="border border-white/10 bg-[#141414] overflow-hidden group shadow-lg">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80"
                    alt="Restaurant Supervision"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                    01 · Service Operations
                  </span>
                </div>
              </Card3D>
            </FadeIn>

            {/* Visual 02: Warehouse and inventory management */}
            <FadeIn delay={0.35} y={20}>
              <Card3D className="border border-white/10 bg-[#141414] overflow-hidden group shadow-lg">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80"
                    alt="Warehouse Management"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                    02 · Warehouse &amp; Inventory
                  </span>
                </div>
              </Card3D>
            </FadeIn>

            {/* Visual 03: Cashier/service operations */}
            <FadeIn delay={0.4} y={20}>
              <Card3D className="border border-white/10 bg-[#141414] overflow-hidden group shadow-lg">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=500&q=80"
                    alt="Cashier Operations"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                    03 · Cashier &amp; Guest Service
                  </span>
                </div>
              </Card3D>
            </FadeIn>

            {/* Visual 04: AI-assisted digital restaurant technology */}
            <FadeIn delay={0.45} y={20}>
              <Card3D className="border border-white/10 bg-[#141414] overflow-hidden group shadow-lg">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=500&q=80"
                    alt="Digital Restaurant Automation"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                    04 · AI &amp; Digital Menus
                  </span>
                </div>
              </Card3D>
            </FadeIn>

          </div>
        </div>

      </div>
    </section>
  );
};
