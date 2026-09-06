import React from 'react';
import { FadeIn } from './FadeIn';
import { Card3D } from './Card3D';
import { GraduationCap, School } from 'lucide-react';

const EDUCATION_ITEMS = [
  {
    institution: 'Bharasar High School',
    credential: 'Higher Secondary Certificate (HSC) in Accounting',
    icon: School,
  },
  {
    institution: 'Fazlur Rahman Memorial College of Technology',
    credential: 'Secondary School Certificate (SSC)',
    icon: GraduationCap,
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 sm:py-32 px-6 md:px-12 bg-[#0C0C0C] select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={20}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
              Academic Background
            </span>
            <h2 className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl mt-2 leading-none">
              Education
            </h2>
          </FadeIn>
        </div>

        {/* Two Elegant 3D Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION_ITEMS.map((item, index) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={item.institution} delay={index * 0.15} y={30}>
                <Card3D className="border border-white/10 bg-[#141414] p-8 sm:p-10 rounded-3xl h-full flex flex-col justify-between group hover:border-[#BA8C63]/50 transition-all shadow-xl">
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#BA8C63]/20 flex items-center justify-center text-[#BA8C63] group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#BA8C63] font-semibold">
                        Academic Institution
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mt-1">
                        {item.institution}
                      </h3>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/50 font-light block mb-1">
                      Certificate / Credential
                    </span>
                    <div className="text-base sm:text-lg font-medium text-[#D7E2EA]">
                      {item.credential}
                    </div>
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
