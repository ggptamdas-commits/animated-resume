import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';

export const HeroSection: React.FC = () => {
  return (
    <header className="min-h-screen w-full flex flex-col justify-between relative select-none" style={{ overflowX: 'clip' }}>
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base">
          <div className="font-extrabold tracking-widest text-sky-400 text-sm sm:text-lg">
            AMDAUL HOQUE
          </div>
          <div className="flex gap-4 sm:gap-6 items-center">
            <a href="#about" className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">About</a>
            <a href="#education" className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">Education</a>
            <a href="#skills" className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">Skills</a>
            <a href="#experience" className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">Experience</a>
            <a href="#contact" className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">Contact</a>
          </div>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden flex items-center justify-center my-auto z-0 pointer-events-none">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] mt-4 md:-mt-4">
            AMDAUL HOQUE
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-4 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center items-end"
          >
            <div className="relative group rounded-full bg-gradient-to-tr from-[#1E354F] via-[#2C496A] to-sky-400 p-1.5 shadow-[0_20px_50px_rgba(30,53,79,0.5)]">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#0C0C0C] bg-[#1E354F]">
                <img
                  src="https://i.postimg.cc/Y9nzFJPT/Segment-20260827-155624995.png"
                  alt="Amdaul Hoque - Restaurant Supervisor"
                  className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', 'https://ui-avatars.com/api/?name=Amdaul+Hoque&background=1E354F&color=fff&size=512');
                  }}
                />
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 gap-4 sm:gap-0">
        <FadeIn delay={0.35} y={20}>
          <div className="text-center sm:text-left">
            <p className="text-sky-400 font-bold uppercase tracking-wider text-sm sm:text-base md:text-xl">
              RESTAURANT SUPERVISOR
            </p>
            <p className="text-[#D7E2EA]/80 font-light uppercase tracking-wide text-xs sm:text-sm mt-1">
              Jizan, Saudi Arabia · +966544575530
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-3">
            <a
              href="tel:+966544575530"
              className="rounded-full border border-sky-400/50 hover:bg-sky-400/10 text-sky-300 px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-transform duration-200 hover:scale-105 inline-flex items-center gap-2 shadow-lg"
            >
              <i className="fa-solid fa-phone text-sm"></i>
              <span>+966544575530</span>
            </a>
            <ContactButton label="Contact Me" />
          </div>
        </FadeIn>
      </div>
    </header>
  );
};
