import React from 'react';
import { FadeIn } from './FadeIn';
import { Card3D } from './Card3D';
import { Boxes, Users, Languages, LayoutDashboard, Sparkles, Wrench } from 'lucide-react';

const SKILLS = [
  {
    id: '01',
    number: '01',
    name: 'Inventory Management',
    description: 'Restaurant inventory management and inventory control.',
    icon: Boxes,
  },
  {
    id: '02',
    number: '02',
    name: 'Team Leadership',
    description:
      'Manage daily operations and lead the service team, stepping in as Cashier, Warehouse Manager, or Server during staff shortages.',
    icon: Users,
  },
  {
    id: '03',
    number: '03',
    name: 'Multilingual',
    description: 'Arabic, English, Hindi, Urdu, Bengali.',
    icon: Languages,
  },
  {
    id: '04',
    number: '04',
    name: 'Web App Development',
    description:
      'Developed and deployed a specialized warehouse management application: khamer.vercel.app.',
    icon: LayoutDashboard,
  },
  {
    id: '05',
    number: '05',
    name: 'Ai Tool Specialist',
    description:
      'Designed AI assisted tools for kitchen stock tracking and modern digital menus to streamline restaurant workflows.',
    icon: Sparkles,
  },
  {
    id: '06',
    number: '06',
    name: 'Electrical Troubleshooting',
    description:
      'Handle on-site electrical maintenance and basic technical problem-solving.',
    icon: Wrench,
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 px-6 md:px-12 bg-[#0C0C0C] select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={20}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
              Core Competencies
            </span>
            <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl mt-2 leading-none">
              Skills
            </h2>
          </FadeIn>
        </div>

        {/* 6 Premium Interactive Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SKILLS.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <FadeIn key={skill.id} delay={index * 0.1} y={30}>
                <Card3D className="border border-white/10 bg-[#141414] p-8 flex flex-col justify-between h-full group hover:border-[#BA8C63]/50 hover:shadow-[0_10px_35px_rgba(186,140,99,0.15)] transition-all">
                  
                  {/* Card Top: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-black text-3xl sm:text-4xl text-[#D7E2EA]/30 group-hover:text-[#BA8C63] transition-colors">
                      {skill.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#BA8C63] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Bottom: Name & Description */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl uppercase tracking-wider text-white group-hover:text-[#BA8C63] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                </Card3D>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};
