import React from 'react';
import { FadeIn } from './FadeIn';
import { Card3D } from './Card3D';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-24 sm:py-32 px-6 md:px-12 bg-[#0C0C0C] select-none border-t border-white/5 relative">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BA8C63]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        
        {/* Header */}
        <FadeIn delay={0.1} y={20}>
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
            Get In Touch
          </span>
          <h2 className="hero-heading font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl mt-3 leading-none">
            Let&apos;s Connect
          </h2>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-4 font-light">
            Available for restaurant supervision, warehouse automation, and operational management.
          </p>
        </FadeIn>

        {/* 3 Contact Cards: Phone, Email, Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 sm:mt-16">
          
          {/* Phone */}
          <FadeIn delay={0.2} y={30}>
            <Card3D className="border border-white/10 bg-[#141414] p-8 rounded-3xl h-full flex flex-col items-center justify-center text-center group hover:border-[#BA8C63]/50 transition-all shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63] group-hover:scale-110 transition-transform mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light mb-1">
                Phone Call
              </span>
              <a
                href="tel:+966544575530"
                className="text-base sm:text-lg font-bold text-white group-hover:text-[#BA8C63] transition-colors"
              >
                +966544575530
              </a>
            </Card3D>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.3} y={30}>
            <Card3D className="border border-white/10 bg-[#141414] p-8 rounded-3xl h-full flex flex-col items-center justify-center text-center group hover:border-[#BA8C63]/50 transition-all shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63] group-hover:scale-110 transition-transform mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light mb-1">
                Direct Email
              </span>
              <a
                href="mailto:ahameddruboo@gmail.com"
                className="text-base sm:text-lg font-bold text-white group-hover:text-[#BA8C63] transition-colors break-all"
              >
                ahameddruboo@gmail.com
              </a>
            </Card3D>
          </FadeIn>

          {/* Location */}
          <FadeIn delay={0.4} y={30}>
            <Card3D className="border border-white/10 bg-[#141414] p-8 rounded-3xl h-full flex flex-col items-center justify-center text-center group hover:border-[#BA8C63]/50 transition-all shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63] group-hover:scale-110 transition-transform mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light mb-1">
                Location
              </span>
              <div className="text-base sm:text-lg font-bold text-white">
                Jizan, Saudi Arabia
              </div>
            </Card3D>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};
