import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0C0C0C]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-lg md:text-xl font-bold tracking-wider uppercase text-white hover:text-[#BA8C63] transition-colors"
        >
          AMDAUL HOQUE
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 sm:gap-8 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-[#D7E2EA]">
          <a href="#about" className="hover:text-white hover:opacity-80 transition-all">About</a>
          <a href="#skills" className="hover:text-white hover:opacity-80 transition-all">Skills</a>
          <a href="#experience" className="hover:text-white hover:opacity-80 transition-all">Experience</a>
          <a href="#education" className="hover:text-white hover:opacity-80 transition-all">Education</a>
          <a href="#contact" className="hover:text-white hover:opacity-80 transition-all">Contact</a>
        </div>
      </nav>
    </header>
  );
};
