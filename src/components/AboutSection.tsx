import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] select-none"
      style={{ overflowX: 'clip' }}
    >
      <div className="max-w-5xl w-full flex flex-col items-center text-center z-20">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
          >
            About Me
          </h2>
        </FadeIn>

        <div className="h-8 sm:h-12 w-full" />

        {/* Verbatim text from PDF */}
        <AnimatedText
          text="Experienced Restaurant Supervisor with a background in Warehouse Management. Expert in inventory control, team leadership, and social media management using Al tools. Fluent in 5 languages (Arabic, English, Hindi, Urdu, Bengali), allowing for seamless communication with international customers and diverse teams."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-3xl text-sm sm:text-lg md:text-xl"
        />

        <div className="h-12 sm:h-16 w-full" />

        {/* EDUCATION */}
        <div id="education" className="w-full text-left max-w-3xl">
          <FadeIn delay={0.2} y={30} className="p-6 sm:p-8 rounded-3xl bg-[#14181F] border border-[#2B5B84]/40 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-[#2B5B84]/30 pb-3">
              <i className="fa-solid fa-graduation-cap text-sky-400 text-lg"></i>
              <h3 className="font-heading font-bold text-lg sm:text-xl uppercase text-white tracking-wider">
                Education
              </h3>
            </div>
            <div className="space-y-5">
              <div className="border-l-2 border-sky-400 pl-4">
                <h4 className="font-semibold text-sm sm:text-base text-sky-200">
                  Higher Secondary Certificate (HSC) in Accounting
                </h4>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">
                  Fazlur Rahman Memorial College of Technology
                </p>
              </div>
              <div className="border-l-2 border-sky-400/60 pl-4">
                <h4 className="font-semibold text-sm sm:text-base text-sky-200">
                  Secondary School Certificate (SSC)
                </h4>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">
                  Bharasar High School
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
