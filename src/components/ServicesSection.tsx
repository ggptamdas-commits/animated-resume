import React from 'react';
import { FadeIn } from './FadeIn';
import { SkillItem } from '../types';

const SKILLS_SERVICES: SkillItem[] = [
  {
    id: '01',
    number: '01',
    name: 'Inventory Management',
    description: 'Restaurant inventory management and inventory control.',
  },
  {
    id: '02',
    number: '02',
    name: 'Team Leadership',
    description:
      'Manage daily operations and lead the service team, stepping in as Cashier, Warehouse Manager, or Server during staff shortages.',
  },
  {
    id: '03',
    number: '03',
    name: 'Multilingual',
    description: 'Arabic, English, Hindi, Urdu, Bengali.',
  },
  {
    id: '04',
    number: '04',
    name: 'Web App Development',
    description:
      'Developed and deployed a specialized warehouse management application: khamer.vercel.app.',
  },
  {
    id: '05',
    number: '05',
    name: 'Ai Tool Specialist',
    description:
      'Designed AI assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.',
  },
  {
    id: '06',
    number: '06',
    name: 'Electrical Troubleshooting',
    description:
      'Handle on-site electrical maintenance and basic technical problem-solving.',
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
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* 6 Skill items in vertical list */}
        <div className="flex flex-col">
          {SKILLS_SERVICES.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1} y={30}>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-4 md:gap-10">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </div>

                {/* Name + Description stacked on right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-grow md:max-w-2xl">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] opacity-60 leading-relaxed"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
