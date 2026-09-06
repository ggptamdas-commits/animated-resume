import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-32 pb-12 px-6 md:px-12 bg-[#0d1116] border-t border-white/10 select-none overflow-hidden">
      {/* Background Graphic: Massive Text Reading "CONTACT" */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none select-none -z-0">
        <span className="text-[25vw] font-black tracking-tighter text-white opacity-[0.03] leading-none whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-20">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left (7 cols): How Can I Help? */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest text-[#00df8f] font-bold">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white uppercase leading-none">
              HOW CAN I HELP<span className="text-[#00df8f]">?</span>
            </h2>
            <p className="text-[#9ca3af] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Available for full-time restaurant supervision, dining floor management, warehouse automation, and customized restaurant digital tools in Saudi Arabia.
            </p>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="mailto:ahameddruboo@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-gray-200 hover:scale-105 transition-all shadow-lg"
              >
                <Mail className="w-4 h-4 text-black" />
                <span>ahameddruboo@gmail.com</span>
              </a>

              <a
                href="tel:+966544575530"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#14181f] text-white font-semibold uppercase tracking-widest text-xs sm:text-sm border border-[#00df8f]/40 hover:border-[#00df8f] hover:bg-[#181d26] transition-all"
              >
                <Phone className="w-4 h-4 text-[#00df8f]" />
                <span>+966 54 457 5530</span>
              </a>
            </div>
          </div>

          {/* Right (5 cols): Two-column grid of links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-left">
            {/* Column 1: Menu */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                Navigation
              </div>
              <ul className="space-y-3 text-sm font-semibold tracking-wider uppercase text-gray-300">
                <li>
                  <a href="#about" className="hover:text-[#00df8f] transition-colors">About Me</a>
                </li>
                <li>
                  <a href="#work" className="hover:text-[#00df8f] transition-colors">Recent Works</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#00df8f] transition-colors">Operations Stages</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#00df8f] transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            {/* Column 2: Credentials & Direct Links */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                Credentials
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00df8f] flex-shrink-0" />
                  <span>Jizan, Saudi Arabia</span>
                </li>
                <li>
                  <a
                    href="https://khamer.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#00df8f] transition-colors"
                  >
                    <span>khamer.vercel.app</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li className="text-gray-400 text-xs pt-1">
                  Fluent in 5 Languages:<br />
                  <span className="text-gray-200 font-medium">Arabic, English, Hindi, Urdu, Bengali</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider text-[#9ca3af]">
          <div>
            &copy; {new Date().getFullYear()} AMDAUL HOQUE. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-300 hover:text-[#00df8f] transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-[#14181f] border border-white/10 flex items-center justify-center text-[#00df8f]">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};