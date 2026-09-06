import React from 'react';

// 21 premium 3D restaurant-themed visuals matching the 21 factual themes
const MARQUEE_ITEMS = [
  { id: 1, title: 'Restaurant Supervision', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Daily Restaurant Operations', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Team Leadership', img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Cashier Work', img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: 'Warehouse Management', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
  { id: 6, title: 'Inventory Control', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80' },
  { id: 7, title: 'Kitchen Stock Tracking', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=600&q=80' },
  { id: 8, title: 'AI-Assisted Tools', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 9, title: 'Digital Menus', img: 'https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=600&q=80' },
  { id: 10, title: 'Web Application Development', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' },
  { id: 11, title: 'Warehouse Management Application', img: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=600&q=80' },
  { id: 12, title: 'Workflow Automation', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
  { id: 13, title: 'Multilingual Communication', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80' },
  { id: 14, title: 'Restaurant Service', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80' },
  { id: 15, title: 'Technical Troubleshooting', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { id: 16, title: 'Electrical Maintenance', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
  { id: 17, title: 'Restaurant Technology', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
  { id: 18, title: 'Digital Operations', img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80' },
  { id: 19, title: 'Stock Management', img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80' },
  { id: 20, title: 'Service Team Coordination', img: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=600&q=80' },
  { id: 21, title: 'Restaurant Operational Technology', img: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80' },
];

const ROW1 = MARQUEE_ITEMS.slice(0, 11);
const ROW2 = MARQUEE_ITEMS.slice(11);

export const MarqueeSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] py-16 sm:py-24 overflow-hidden select-none border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-[#BA8C63] font-semibold">
          Operational &amp; Technical Capabilities
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white mt-1">
          Visual Highlights
        </h2>
      </div>

      {/* Row 1: Marquee */}
      <div className="flex gap-4 w-max overflow-x-hidden group hover:[animation-play-state:paused]">
        <div className="flex gap-4 animate-marquee">
          {ROW1.concat(ROW1).map((item, idx) => (
            <div
              key={`r1-${idx}`}
              className="w-[320px] sm:w-[380px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-[#141414] border border-white/10 flex-shrink-0 relative group/tile shadow-xl transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/tile:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-4">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="flex gap-4 w-max overflow-x-hidden mt-4 group hover:[animation-play-state:paused]">
        <div className="flex gap-4 animate-marquee-reverse">
          {ROW2.concat(ROW2).map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="w-[320px] sm:w-[380px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-[#141414] border border-white/10 flex-shrink-0 relative group/tile shadow-xl transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/tile:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-4">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
