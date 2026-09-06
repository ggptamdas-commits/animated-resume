import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    category: 'Hospitality & Management',
    title: 'Restaurant Supervision & Floor Operations',
    description:
      'Manage daily operations and lead the service team at Khamer Restaurant, Saudi Arabia. Stepping in as Cashier, Warehouse Manager, or Server during peak hours and staff shortages to guarantee uninterrupted dining standards.',
    tags: ['Operations', 'Team Leadership', 'Cashier', 'Floor Management'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    actionText: 'View Case Details',
  },
  {
    id: '02',
    category: 'Web Application & Cloud',
    title: 'Custom Warehouse Management App',
    description:
      'Developed and deployed a specialized warehouse management application hosted live at khamer.vercel.app. Features real-time stock tracking, quick deficit reports, and kitchen supply synchronization.',
    tags: ['React.js', 'Vercel', 'Inventory Cloud', 'Live Production'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    actionText: 'Explore Live App',
    link: 'https://khamer.vercel.app',
  },
  {
    id: '03',
    category: 'AI & Digital Automation',
    title: 'Kitchen Stock Tracking & Smart Menus',
    description:
      'Designed AI-assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows, prevent food waste, and keep kitchen prep aligned with real-time dining floor orders.',
    tags: ['AI Automation', 'Digital Menus', 'Kitchen Logistics', 'Waste Reduction'],
    image: 'https://images.unsplash.com/photo-1550989460-0adc9f678430?q=80&w=800&auto=format&fit=crop',
    actionText: 'Explore Automation',
  },
  {
    id: '04',
    category: 'Technical & Multilingual',
    title: '5-Language Service & Electrical Care',
    description:
      'Fluent in 5 languages (Arabic, English, Hindi, Urdu, Bengali) for smooth communication with diverse teams and international guests. Handles immediate on-site technical troubleshooting and electrical maintenance for equipment uptime.',
    tags: ['Arabic & English', 'Hindi & Urdu', 'Electrical Care', 'Service Standards'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    actionText: 'Explore Standards',
  },
];

export const RecentWorks: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeProject = PROJECTS[activeIdx];

  const handleCardClick = (clickedIdx: number) => {
    if (clickedIdx === activeIdx) {
      // Cycle to the back
      setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
    } else {
      // Pull to front
      setActiveIdx(clickedIdx);
    }
  };

  return (
    <section id="work" className="relative py-32 px-6 md:px-12 bg-[#0d1116] border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00df8f] font-bold">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white uppercase mt-2">
              RECENT WORKS<span className="text-[#00df8f]">.</span>
            </h2>
          </div>

          <a
            href="https://khamer.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14181f] border border-white/10 text-xs uppercase tracking-widest font-semibold text-gray-300 hover:border-[#00df8f] hover:text-[#00df8f] transition-all w-fit"
          >
            <span>Live App: khamer.vercel.app</span>
            <ExternalLink className="w-4 h-4 text-[#00df8f]" />
          </a>
        </div>

        {/* 3D Stacked Card Interactive Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side (7 cols): The 3D Stack */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Responsive Container for the stack */}
            <div className="relative w-full h-[340px] sm:h-[450px] md:h-[480px]">
              {PROJECTS.map((project, idx) => {
                // Calculate position relative to active card
                const diff = (idx - activeIdx + PROJECTS.length) % PROJECTS.length;

                // Position styles for 3D stacking
                const yOffset = diff * 35;
                const scale = 1 - diff * 0.05;
                const rotateX = diff * 2;
                const zIndex = PROJECTS.length - diff;
                const opacity = diff > 2 ? 0.3 : 1 - diff * 0.15;

                return (
                  <motion.div
                    key={project.id}
                    onClick={() => handleCardClick(idx)}
                    animate={{
                      y: yOffset,
                      scale: scale,
                      rotateX: rotateX,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    style={{
                      transformOrigin: 'top center',
                    }}
                    className="absolute inset-x-0 top-0 h-[280px] sm:h-[360px] md:h-[390px] rounded-3xl overflow-hidden border border-white/10 bg-[#14181f] shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1116] via-black/40 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#00df8f] block">
                          {project.category}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold uppercase tracking-tight mt-0.5 line-clamp-1">
                          {project.title}
                        </h4>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00df8f] group-hover:text-black transition-colors flex-shrink-0 ml-4">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Dot Indicators mapping to active card */}
            <div className="flex items-center gap-3 mt-4">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? 'w-8 bg-[#00df8f] shadow-[0_0_10px_#00df8f]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side (5 cols): Description Panel */}
          <div className="lg:col-span-5 flex flex-col items-start justify-start text-left pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Category */}
                <div className="text-xs uppercase tracking-widest text-[#00df8f] font-bold">
                  {activeProject.category}
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white uppercase leading-tight">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <p className="text-[#9ca3af] text-base sm:text-lg leading-relaxed font-normal">
                  {activeProject.description}
                </p>

                {/* Tags (array of pills) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full bg-[#14181f] border border-white/10 text-xs font-medium uppercase tracking-wider text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Explore Project Button */}
                <div className="pt-4">
                  {activeProject.link ? (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00df8f] to-[#00b373] text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,223,143,0.3)]"
                    >
                      <span>{activeProject.actionText}</span>
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#14181f] border border-white/10 text-white font-semibold uppercase tracking-widest text-xs sm:text-sm hover:border-[#00df8f] hover:text-[#00df8f] transition-all"
                    >
                      <span>{activeProject.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};