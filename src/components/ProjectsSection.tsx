import React from 'react';
import { FadeIn } from './FadeIn';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-36 pb-28 select-none"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="mb-14 sm:mb-20">
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      {/* Main Experience Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        <FadeIn delay={0.1} y={30}>
          <div className="p-6 sm:p-10 rounded-3xl bg-[#14181F] border-2 border-[#2B5B84]/50 shadow-2xl space-y-6">
            
            {/* Header: Role, Company, Period */}
            <div className="border-b border-[#2B5B84]/30 pb-6 space-y-2">
              <div className="text-sky-400 font-bold text-xs sm:text-sm uppercase tracking-widest">
                Dec 2023 - Present · Saudi Arabia
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
                Restaurant Supervisor & Automation Specialist
              </h3>
              <p className="text-slate-300 font-semibold text-sm sm:text-base">
                Khamer Restaurant, Saudi Arabia
              </p>
            </div>

            {/* Bullets: verbatim from the PDF */}
            <ul className="space-y-4 text-xs sm:text-sm md:text-base text-slate-200">
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base leading-none mt-0.5">•</span>
                <span>
                  <strong className="text-white">Versatile Leadership:</strong> Manage daily operations and lead the service team, stepping in as Cashier, Warehouse Manager, or Server during staff shortages.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base leading-none mt-0.5">•</span>
                <span>
                  <strong className="text-white">Custom Warehouse Solution:</strong> Developed and deployed a specialized warehouse management application:{' '}
                  <a
                    href="https://khamer.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 underline font-semibold font-mono"
                  >
                    khamer.vercel.app
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base leading-none mt-0.5">•</span>
                <span>
                  <strong className="text-white">Operational Automation:</strong> Designed Ai assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base leading-none mt-0.5">•</span>
                <span>
                  <strong className="text-white">Multilingual Expertise:</strong> Utilize fluency in 5 languages (Arabic, English, Hindi, Urdu, Bengali) to serve a diverse international clientele.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base leading-none mt-0.5">•</span>
                <span>
                  <strong className="text-white">Technical Troubleshooting:</strong> Handle on-site electrical maintenance and basic technical problem-solving.
                </span>
              </li>
            </ul>

          </div>
        </FadeIn>
      </div>

      {/* Footer / Contact Section */}
      <footer id="contact" className="mt-28 pt-16 border-t border-[#D7E2EA]/10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
        <FadeIn delay={0.1} y={30}>
          <h3
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 80px)' }}
          >
            Contact
          </h3>
        </FadeIn>

        {/* Contact Info Pills: Strictly from CV */}
        <FadeIn delay={0.2} y={20} className="flex flex-wrap justify-center gap-4 w-full">
          <a
            href="tel:+966544575530"
            className="rounded-full bg-[#1E354F] hover:bg-[#2C496A] text-white font-semibold uppercase tracking-wider px-6 py-3 text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 border border-sky-400/30"
          >
            <i className="fa-solid fa-phone text-sky-400"></i>
            <span>+966544575530</span>
          </a>

          <a
            href="mailto:ahameddruboo@gmail.com"
            className="rounded-full bg-[#1E354F] hover:bg-[#2C496A] text-white font-semibold uppercase tracking-wider px-6 py-3 text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 border border-sky-400/30"
          >
            <i className="fa-solid fa-envelope text-sky-400"></i>
            <span>ahameddruboo@gmail.com</span>
          </a>

          <div className="rounded-full bg-[#1E354F] text-white font-semibold uppercase tracking-wider px-6 py-3 text-xs sm:text-sm shadow-lg flex items-center gap-2 border border-sky-400/30">
            <i className="fa-solid fa-location-dot text-rose-400"></i>
            <span>Jizan, Saudi Arabia</span>
          </div>
        </FadeIn>

        <p className="text-[#D7E2EA]/50 text-xs pt-8 uppercase tracking-widest font-normal">
          AMDAUL HOQUE · RESTAURANT SUPERVISOR · JIZAN, SAUDI ARABIA
        </p>
      </footer>
    </section>
  );
};
