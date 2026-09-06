import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ServiceStage } from '../types';

const STAGES: ServiceStage[] = [
  {
    id: '01',
    number: '01',
    title: 'BRIEFING & SHIFT SETUP',
    description:
      'Daily pre-shift alignment with floor and kitchen staff. Clear station assignments, grooming and hygiene standards check, and dining hall readiness audit before opening doors.',
    details: [
      'Conduct daily 10-minute floor briefings.',
      'Assign roles: Cashier, Servers, Runner, and Barista.',
      'Review VIP guest reservations and daily specials.',
    ],
  },
  {
    id: '02',
    number: '02',
    title: 'INVENTORY & PROCUREMENT',
    description:
      'Systematic stock auditing across cold storage, deep freezers, and dry pantry. Immediate detection of stock deficits and automated supplier coordination.',
    details: [
      'Perform morning and evening inventory reconciliation.',
      'Audit stock levels against minimum threshold triggers.',
      'Coordinate procurement to eliminate food waste and stockouts.',
    ],
  },
  {
    id: '03',
    number: '03',
    title: 'CASHIER & FLOOR FLOW',
    description:
      'Supervising front-of-house point-of-sale checkout operations, optimizing table turnaround times, and maintaining rapid cashier accuracy during peak rushes.',
    details: [
      'Manage POS transactions and cash drawer balancing.',
      'Monitor speed of service from kitchen pass to dining table.',
      'Resolve guest inquiries immediately in 5 fluent languages.',
    ],
  },
  {
    id: '04',
    number: '04',
    title: 'DIGITAL & AI AUTOMATION',
    description:
      'Maintaining live digital menus and developing modern cloud workflows like khamer.vercel.app to automate kitchen stock logging and customer updates.',
    details: [
      'Maintain real-time menu availability and pricing.',
      'Operate custom warehouse app at khamer.vercel.app.',
      'Deploy AI-assisted logging to streamline daily kitchen reports.',
    ],
  },
  {
    id: '05',
    number: '05',
    title: 'TECHNICAL TROUBLESHOOTING',
    description:
      'Rapid on-site diagnosis and repair of restaurant hardware, refrigeration digital thermostats, water pressure switches, POS systems, and electrical connections.',
    details: [
      'Execute preventative maintenance on commercial equipment.',
      'Troubleshoot electrical switches, wiring, and cooler thermostats.',
      'Minimize downtime for kitchen appliances during high-traffic shifts.',
    ],
  },
  {
    id: '06',
    number: '06',
    title: 'THE FINAL CLOSING',
    description:
      'Comprehensive end-of-day reconciliation: cash register closure, kitchen consumption records, hygiene inspection, and tomorrow morning prep schedule verification.',
    details: [
      'Close and audit daily cashier settlement reports.',
      'Perform thorough sanitation inspection of stations.',
      'Lock inventory stores and verify cold-room temperatures.',
    ],
  },
];

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('01');

  const toggleStage = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-[#0d1116] border-t border-white/10 select-none">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[#00df8f] font-bold">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase mt-2">
            STAGES OF RESTAURANT <br />
            <span className="text-stroke-neon">OPERATIONS</span>
            <span className="text-[#00df8f]">.</span>
          </h2>
        </motion.div>

        {/* Accordion Items */}
        <div className="space-y-4 text-left">
          {STAGES.map((stage, index) => {
            const isExpanded = expandedId === stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#14181f] border-[#00df8f]/40 shadow-[0_0_20px_rgba(0,223,143,0.1)]'
                    : 'bg-[#14181f]/60 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleStage(stage.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-lg sm:text-xl font-bold text-[#00df8f] font-mono">
                      {stage.number}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-white">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#0d1116] border border-white/10 flex items-center justify-center text-[#00df8f] flex-shrink-0">
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Content Expansion */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-white/5 space-y-4">
                        <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed font-normal">
                          {stage.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                          {stage.details.map((d, i) => (
                            <div
                              key={i}
                              className="text-xs text-gray-300 bg-[#0d1116] border border-white/5 rounded-lg p-2.5 font-light"
                            >
                              • {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};