import React from 'react';

const RESUME_ITEMS_ROW1 = [
  'RESTAURANT SUPERVISOR',
  'INVENTORY MANAGEMENT',
  'TEAM LEADERSHIP',
  'MULTILINGUAL (5 LANGUAGES)',
  'WEB APP DEVELOPMENT',
  'AI TOOL SPECIALIST',
  'ELECTRICAL TROUBLESHOOTING',
];

const RESUME_ITEMS_ROW2 = [
  'KHAMER RESTAURANT',
  'DEC 2023 - PRESENT',
  'KHAMER.VERCEL.APP',
  'ARABIC · ENGLISH · HINDI · URDU · BENGALI',
  'HSC IN ACCOUNTING',
  'JIZAN, SAUDI ARABIA',
];

const ROW1_TRIPLED = [...RESUME_ITEMS_ROW1, ...RESUME_ITEMS_ROW1, ...RESUME_ITEMS_ROW1, ...RESUME_ITEMS_ROW1];
const ROW2_TRIPLED = [...RESUME_ITEMS_ROW2, ...RESUME_ITEMS_ROW2, ...RESUME_ITEMS_ROW2, ...RESUME_ITEMS_ROW2];

export const MarqueeSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] pt-16 sm:pt-24 md:pt-32 pb-10 w-full overflow-hidden flex flex-col gap-4 select-none">
      {/* Row 1 */}
      <div className="flex gap-4 w-max overflow-x-hidden">
        {ROW1_TRIPLED.map((text, index) => (
          <div
            key={`r1-${index}`}
            className="px-6 py-3.5 rounded-full bg-[#14181F] border border-[#2B5B84]/40 text-sky-200 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-3 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-4 w-max overflow-x-hidden">
        {ROW2_TRIPLED.map((text, index) => (
          <div
            key={`r2-${index}`}
            className="px-6 py-3.5 rounded-full bg-[#14181F] border border-[#2B5B84]/40 text-slate-300 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-3 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
