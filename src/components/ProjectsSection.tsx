import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ExternalLink } from 'lucide-react';

const EXPERIENCE_CARDS = [
  {
    id: '01',
    number: '01',
    title: 'Restaurant Supervisor & Automation Specialist',
    company: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Versatile Leadership: Manage daily operations and lead the service team, stepping in as Cashier, Warehouse Manager, or Server during staff shortages.',
    bullets: [
      'Coordinate daily dining room operations and oversee service standards.',
      'Maintain front-of-house cashier flow and back-of-house floor alignment.',
    ],
    images: {
      col1Top: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      col1Bottom: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: '02',
    number: '02',
    title: 'Custom Warehouse Solution',
    company: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Developed and deployed a specialized warehouse management application: khamer.vercel.app.',
    link: 'https://khamer.vercel.app',
    bullets: [
      'Full deployment of custom inventory software built for restaurant storage tracking.',
      'Live web application accessible at khamer.vercel.app.',
    ],
    images: {
      col1Top: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      col1Bottom: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: '03',
    number: '03',
    title: 'Operational Automation',
    company: 'Khamer Restaurant, Saudi Arabia',
    date: 'Dec 2023 – Present',
    description:
      'Designed Ai assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.',
    bullets: [
      'Smart inventory auditing to minimize food waste and stockouts.',
      'Modern digital menu solutions for efficient guest orders and kitchen prep.',
    ],
    images: {
      col1Top: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80',
      col1Bottom: 'https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=800&q=80',
      col2: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    },
  },
];

interface CardProps {
  card: (typeof EXPERIENCE_CARDS)[0];
  index: number;
  totalCards: number;
}

const ExperienceStickyCard: React.FC<CardProps> = ({ card, index, totalCards }) => {
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
      className="min-h-[85vh] flex items-start justify-center sticky top-24 md:top-28 mb-12"
      style={{
        top: `calc(5rem + ${index * 24}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-3xl sm:rounded-[40px] border-2 border-[#D7E2EA]/20 bg-[#141414] p-6 sm:p-10 flex flex-col gap-6 shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
      >
        {/* Card Header: Number, Company, Role, Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-4xl sm:text-6xl text-[#BA8C63]">
              {card.number}
            </span>
            <div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-[#BA8C63] font-medium">
                {card.company} &middot; {card.date}
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold uppercase text-white mt-1">
                {card.title}
              </h3>
            </div>
          </div>

          {card.link && (
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/20 text-[#D7E2EA] hover:border-[#BA8C63] hover:text-[#BA8C63] text-xs uppercase tracking-wider font-semibold transition-all"
            >
              <span>khamer.vercel.app</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Card Description */}
        <p className="text-[#D7E2EA] text-sm sm:text-base md:text-lg leading-relaxed font-light">
          {card.description}
        </p>

        {/* Visual 2-column image layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full flex-grow">
          {/* Left Column (2 stacked images) */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div className="w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-[#0C0C0C]">
              <img
                src={card.images.col1Top}
                alt={`${card.title} scene 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-[#0C0C0C]">
              <img
                src={card.images.col1Bottom}
                alt={`${card.title} scene 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column (1 tall image) */}
          <div className="md:col-span-7 w-full h-64 sm:h-80 md:h-full min-h-[260px] rounded-2xl overflow-hidden bg-[#0C0C0C]">
            <img
              src={card.images.col2}
              alt={`${card.title} main scene`}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 md:px-12 bg-[#0C0C0C] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <FadeIn delay={0.1} y={20}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
              Employment History
            </span>
            <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl mt-2 leading-none">
              Experience
            </h2>
            <p className="text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-widest mt-4">
              Khamer Restaurant, Saudi Arabia &middot; Dec 2023 – Present
            </p>
          </FadeIn>
        </div>

        {/* 3 Sticky Cards */}
        <div className="relative w-full">
          {EXPERIENCE_CARDS.map((card, index) => (
            <ExperienceStickyCard
              key={card.id}
              card={card}
              index={index}
              totalCards={EXPERIENCE_CARDS.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
