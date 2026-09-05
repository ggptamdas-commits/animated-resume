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
      {/* 1. Decorative 3D images in four corners */}
      {/* Top-left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Decor"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Geometry Decor"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </FadeIn>

      {/* Top-right: Lego icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Decor"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Composition Decor"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        />
      </FadeIn>

      {/* 2. Main Content Container */}
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

        {/* Spacing between heading and text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16 w-full" />

        {/* Animated paragraph: character-by-character scroll opacity */}
        <AnimatedText
          text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
        />

        {/* Spacing between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="h-16 sm:h-20 md:h-24 w-full" />

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
