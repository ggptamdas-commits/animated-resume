import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExperienceCardItem } from '../types';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

const EXPERIENCES: ExperienceCardItem[] = [
  {
    id: '01',
    number: '01',
    category: 'Khamer Restaurant, Saudi Arabia · Dec 2023 – Present',
    title: 'Restaurant Supervisor & Automation Specialist',
    organization: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Manage daily operations and lead the service team, stepping in as Cashier, Warehouse Manager, or Server during staff shortages.',
    additionalBullets: [
      'Developed and deployed a specialized warehouse management application: khamer.vercel.app.',
      'Designed AI assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.',
      'Utilize fluency in 5 languages (Arabic, English, Hindi, Urdu, Bengali) to serve a diverse international clientele and diverse teams.',
      'Handle on-site electrical maintenance and basic technical problem-solving.',
    ],
    link: 'https://khamer.vercel.app',
    images: {
      col1Top:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85',
      col1Bottom:
        'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=85',
      col2:
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    },
  },
  {
    id: '02',
    number: '02',
    category: 'Khamer Restaurant, Saudi Arabia · Dec 2023 – Present',
    title: 'Custom Warehouse Solution',
    organization: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Developed and deployed a specialized warehouse management application: khamer.vercel.app.',
    additionalBullets: [
      'Custom warehouse & stock control platform designed specifically for restaurant operations.',
      'Real-time inventory visibility, supply-chain monitoring, and stock turnover optimization.',
    ],
    link: 'https://khamer.vercel.app',
    images: {
      col1Top:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85',
      col1Bottom:
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=85',
      col2:
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=85',
    },
  },
  {
    id: '03',
    number: '03',
    category: 'Khamer Restaurant, Saudi Arabia · Dec 2023 – Present',
    title: 'Operational Automation',
    organization: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Designed AI assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.',
    additionalBullets: [
      'AI-assisted kitchen stock tracking for fast inventory counts and reorder management.',
      'Modern digital menus providing seamless order coordination between service team and kitchen.',
    ],
    link: 'https://khamer.vercel.app',
    images: {
      col1Top:
        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=85',
      col1Bottom:
        'https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=800&q=85',
      col2:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    },
  },
];

interface CardProps {
  card: ExperienceCardItem;
  index: number;
  totalCards: number;
}

const ExperienceCard: React.FC<CardProps> = ({ card, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Row: Number, category label, experience name, Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {card.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {card.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA]">
                {card.title}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={card.link || '#experience'} label="View Experience" />
        </div>

        {/* Middle: Description paragraph */}
        <div className="text-[#D7E2EA]/90 text-sm sm:text-base leading-relaxed">
          <p>{card.description}</p>
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full flex-grow">
          {/* Left Column (40% width / 5 cols in 12-col grid) */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6 justify-between">
            {/* Top image */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={card.images.col1Top}
                alt={`${card.title} preview top`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
            {/* Bottom image */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={card.images.col1Bottom}
                alt={`${card.title} preview bottom`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols in 12-col grid): 1 tall image */}
          <div className="md:col-span-7 w-full h-[260px] sm:h-[340px] md:h-full min-h-[260px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]">
            <img
              src={card.images.col2}
              alt={`${card.title} full preview`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-36 pb-32 select-none"
    >
      {/* Heading: Experience using .hero-heading */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      {/* 3 sticky-stacking experience cards */}
      <div className="flex flex-col relative w-full pb-20">
        {EXPERIENCES.map((card, index) => (
          <ExperienceCard
            key={card.id}
            card={card}
            index={index}
            totalCards={EXPERIENCES.length}
          />
        ))}
      </div>

      {/* Footer / Final Contact callout */}
      <footer id="contact" className="mt-32 pt-20 border-t border-[#D7E2EA]/10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
        <FadeIn delay={0.1} y={30}>
          <h3
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 90px)' }}
          >
            Contact
          </h3>
        </FadeIn>

        {/* Factual Contact Details from CV */}
        <FadeIn delay={0.2} y={20} className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          <a
            href="tel:+966544575530"
            className="px-6 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-[#D7E2EA] transition-colors"
          >
            +966544575530
          </a>
          <a
            href="mailto:ahameddruboo@gmail.com"
            className="px-6 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-[#D7E2EA] transition-colors"
          >
            ahameddruboo@gmail.com
          </a>
          <div className="px-6 py-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]">
            Jizan, Saudi Arabia
          </div>
        </FadeIn>

        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm pt-8 uppercase tracking-wider font-light">
          &copy; {new Date().getFullYear()} AMDAUL HOQUE -- Restaurant Supervisor. All rights reserved.
        </p>
      </footer>
    </section>
  );
};
