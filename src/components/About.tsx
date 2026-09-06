import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const SKILLS = [
  'Restaurant Supervision',
  'Inventory Control',
  'Team Leadership',
  'Cashier & POS Flow',
  'Warehouse Management',
  'khamer.vercel.app',
  'AI Digital Menus',
  'Kitchen Automation',
  'Electrical Troubleshooting',
  'Arabic (Fluent)',
  'English (Fluent)',
  'Hindi & Urdu',
  'Bengali (Native)',
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-[#0d1116] border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="flex flex-col space-y-8 text-left">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-[#00df8f] font-bold">
              ABOUT AMDAUL
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-white uppercase mt-3">
              MANAGING WITH PURPOSE<span className="text-[#00df8f]">.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-[#9ca3af] text-base sm:text-lg leading-relaxed font-normal"
          >
            <p>
              Experienced Restaurant Supervisor with a background in Warehouse Management. Expert in inventory control, team leadership, and social media management using AI tools.
            </p>
            <p>
              Fluent in 5 languages (Arabic, English, Hindi, Urdu, Bengali), allowing for seamless communication with international customers and diverse teams across Saudi Arabia.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 pt-4 border-t border-white/10"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                5+ <span className="text-[#00df8f]">Languages</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[#9ca3af] mt-1">
                Arabic, English, Hindi, Urdu, Bengali
              </div>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                100% <span className="text-[#00df8f]">Commitment</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[#9ca3af] mt-1">
                Dining Floor &amp; Stock Reliability
              </div>
            </div>
          </motion.div>

          {/* Academic Background */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-[#14181f] border border-white/10 p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00df8f]/10 border border-[#00df8f]/30 flex items-center justify-center text-[#00df8f] flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-left text-xs sm:text-sm">
              <div className="font-bold text-white uppercase tracking-wider">Education &amp; Credentials</div>
              <div className="text-[#9ca3af] mt-1">
                • <strong className="text-gray-200">Bharasar High School</strong> — HSC in Accounting<br />
                • <strong className="text-gray-200">Fazlur Rahman Memorial College of Tech</strong> — SSC
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: My Toolkit */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00df8f] font-bold block">
                MY TOOLKIT
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                Core Capabilities
              </h3>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#00df8f] shadow-[0_0_10px_#00df8f]" />
          </div>

          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="px-4 py-2.5 rounded-full bg-[#14181f] border border-white/10 text-xs sm:text-sm font-medium tracking-wide text-gray-300 hover:border-[#00df8f] hover:text-[#00df8f] hover:shadow-[0_0_15px_rgba(0,223,143,0.3)] transition-all duration-300 cursor-default flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00df8f]" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};