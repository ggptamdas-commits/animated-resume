import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectItem } from '../types';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
    link: 'https://nextlevel.studio',
  },
  {
    id: '02',
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
    link: 'https://aura.design',
  },
  {
    id: '03',
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
    link: 'https://solaris.digital',
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
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
        {/* Top Row: Number, category label, project name, Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.link || '#'} />
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
                src={project.images.col1Top}
                alt={`${project.name} preview top`}
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
                src={project.images.col1Bottom}
                alt={`${project.name} preview bottom`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols in 12-col grid): 1 tall image */}
          <div className="md:col-span-7 w-full h-[260px] sm:h-[340px] md:h-full min-h-[260px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]">
            <img
              src={project.images.col2}
              alt={`${project.name} full preview`}
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
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-36 pb-32 select-none"
    >
      {/* Heading: Project (singular) using .hero-heading */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* 3 sticky-stacking project cards */}
      <div className="flex flex-col relative w-full pb-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
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
            Let&apos;s Create
          </h3>
        </FadeIn>
        <FadeIn delay={0.2} y={20}>
          <p className="text-[#D7E2EA] font-light max-w-lg leading-relaxed text-sm sm:text-base md:text-lg">
            Ready to bring your next bold 3D vision, brand identity, or immersive digital experience to life? Let’s connect today.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20} className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:jack3dcreator@gmail.com"
            className="rounded-full uppercase font-medium tracking-widest text-white cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-105 inline-block"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
              outline: '2px solid white',
              outlineOffset: '-3px',
            }}
          >
            jack3dcreator@gmail.com
          </a>
        </FadeIn>
        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm pt-8 uppercase tracking-wider font-light">
          © {new Date().getFullYear()} Jack — 3D Creator. All rights reserved.
        </p>
      </footer>
    </section>
  );
};
