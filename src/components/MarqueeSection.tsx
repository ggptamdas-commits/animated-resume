import React, { useRef, useState, useEffect } from 'react';

// Row 1: 11 premium 3D restaurant-themed images matching CV professional themes
const ROW1_IMAGES = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85", // Restaurant supervision
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85", // Restaurant daily operations
  "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=85", // Service team leadership
  "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=85", // Cashier responsibilities
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85", // Warehouse management
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=85", // Inventory management
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=85", // Organized restaurant stock
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=85", // Kitchen stock tracking
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85", // AI-assisted restaurant tools
  "https://images.unsplash.com/photo-1550989460-0adc9f678430?auto=format&fit=crop&w=800&q=85", // Modern digital menus
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=85", // Web app development
];

// Row 2: 10 premium 3D restaurant-themed images matching CV professional themes
const ROW2_IMAGES = [
  "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=85", // Warehouse management application
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85", // Restaurant workflow automation
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=85", // Multilingual communication
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85", // Technical troubleshooting
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85", // Electrical maintenance
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85", // Restaurant service environment
  "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=85", // Professional restaurant team environment
  "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=85", // Digital restaurant operations
  "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=85", // Inventory control
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=85", // Restaurant technology
];

const ROW1_TRIPLED = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
const ROW2_TRIPLED = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 w-full overflow-hidden flex flex-col gap-3 select-none"
    >
      {/* Row 1: Moves RIGHT on scroll */}
      <div
        className="flex gap-3 w-max"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {ROW1_TRIPLED.map((src, index) => (
          <div
            key={`row1-${index}`}
            className="w-[420px] h-[270px] min-w-[420px] max-w-[420px] rounded-2xl overflow-hidden bg-[#161616] flex-shrink-0 shadow-lg"
          >
            <img
              src={src}
              alt="Restaurant Operations & Automation Visual"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Moves LEFT on scroll */}
      <div
        className="flex gap-3 w-max"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {ROW2_TRIPLED.map((src, index) => (
          <div
            key={`row2-${index}`}
            className="w-[420px] h-[270px] min-w-[420px] max-w-[420px] rounded-2xl overflow-hidden bg-[#161616] flex-shrink-0 shadow-lg"
          >
            <img
              src={src}
              alt="Warehouse Management & Restaurant Tech Visual"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
