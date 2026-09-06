import React from 'react';
import { FadeIn } from './FadeIn';
import { SkillItem } from '../types';

// Exactly the 6 skills from the PDF
const SKILLS: SkillItem[] = [
  {
    id: '01',
    number: '01',
    name: 'Inventory Management',
  },
  {
    id: '02',
    number: '02',
    name: 'Team Leadership',
  },
  {
    id: '03',
    number: '03',
    name: 'Multilingual (5 Languages)',
  },
  {
    id: '04',
    number: '04',
    name: 'Web App Development',
  },
  {
    id: '05',
    number: '05',
    name: 'Ai Tool Specialist',
  },
  {
    id: '06',
    number: '06',
    name: 'Electrical Troubleshooting',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0 select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center mb-14 sm:mb-18 md:mb-24 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* 6 Skill items */}
        <div className="flex flex-col">
          {SKILLS.map((skill, index) => (
            <FadeIn key={skill.id} delay={index * 0.08} y={30}>
              <div className="flex items-center justify-between py-6 sm:py-8 md:py-10 border-b border-[#0C0C0C]/15 gap-4 md:gap-10">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
                >
                  {skill.number}
                </div>

                {/* Skill Name */}
                <div className="flex-grow text-right md:text-left">
                  <h3
                    className="font-bold uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
                  >
                    {skill.name}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
