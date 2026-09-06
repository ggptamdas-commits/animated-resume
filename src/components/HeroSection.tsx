import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';

export const HeroSection: React.FC = () => {
  return (
    <header className="h-screen w-full flex flex-col justify-between relative select-none" style={{ overflowX: 'clip' }}>
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer">About</a>
          <a href="#skills" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer">Skills</a>
          <a href="#experience" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer">Experience</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer">Contact</a>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden flex items-center justify-center my-auto z-0 pointer-events-none">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m Amdaul
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-end"
          >
            <div className="relative group w-full flex justify-center items-end">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
                alt="Amdaul Hoque - 3D Restaurant Professional Portrait"
                className="w-full h-auto object-contain max-h-[520px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] pointer-events-auto select-none rounded-b-3xl"
                draggable={false}
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            restaurant supervisor &amp; automation specialist
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </header>
  );
};
