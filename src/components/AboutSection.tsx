import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] select-none"
      style={{ overflowX: 'clip' }}
    >
      {/* 4 Decorative 3D Restaurant Environment Images in Four Corners */}
      {/* Top-left: Restaurant supervision/service environment */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=85"
          alt="Restaurant Supervision Decor"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-cover rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </FadeIn>

      {/* Bottom-left: Organized restaurant warehouse/inventory environment */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=85"
          alt="Warehouse Inventory Decor"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-cover rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </FadeIn>

      {/* Top-right: Professional cashier and restaurant service environment */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=500&q=85"
          alt="Cashier & Service Decor"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-cover rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </FadeIn>

      {/* Bottom-right: Restaurant automation and digital technology environment */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=500&q=85"
          alt="Restaurant Automation Decor"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-cover rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10"
        />
      </FadeIn>

      {/* Main Content Container */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center z-20">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Spacing gap between heading and text */}
        <div className="h-10 sm:h-14 md:h-16 w-full" />

        {/* Animated paragraph */}
        <AnimatedText
          text="Experienced Restaurant Supervisor with a background in Warehouse Management. Expert in inventory control, team leadership, and social media management using AI tools. Fluent in 5 languages (Arabic, English, Hindi, Urdu, Bengali), allowing for seamless communication with international customers and diverse teams."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
        />

        {/* Clean Education Subsection (within portfolio without changing main section order) */}
        <FadeIn delay={0.2} y={30} className="w-full max-w-xl mt-12 text-left">
          <div className="rounded-3xl border border-[#D7E2EA]/20 bg-[#121212]/80 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-4">
              Education
            </h3>
            <div className="space-y-4 text-[#D7E2EA]">
              <div className="border-l-2 border-[#D7E2EA]/40 pl-4">
                <div className="font-semibold text-sm sm:text-base">
                  Higher Secondary Certificate (HSC) in Accounting
                </div>
                <div className="text-xs sm:text-sm text-[#D7E2EA]/70">
                  Bharasar High School
                </div>
              </div>
              <div className="border-l-2 border-[#D7E2EA]/40 pl-4">
                <div className="font-semibold text-sm sm:text-base">
                  Secondary School Certificate (SSC)
                </div>
                <div className="text-xs sm:text-sm text-[#D7E2EA]/70">
                  Fazlur Rahman Memorial College of Technology
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Spacing gap between text block and button */}
        <div className="h-16 sm:h-20 md:h-24 w-full" />

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
