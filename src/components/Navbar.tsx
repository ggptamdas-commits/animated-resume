import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full h-24 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f1115]/80 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tighter uppercase text-white hover:opacity-90 transition-opacity"
        >
          AMDAUL<span className="text-[#00df8f]">.</span>
        </a>

        {/* Center-Right Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest text-gray-300 uppercase">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#00df8f] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Far Right Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[#14181f] border border-white/10 hover:border-[#00df8f]/50 transition-all duration-300"
            title="Available for Supervision & Automation"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00df8f] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#00df8f]" />
            <span className="sr-only">Available for work</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1116]/95 backdrop-blur-lg border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold tracking-widest text-gray-300 hover:text-[#00df8f] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};