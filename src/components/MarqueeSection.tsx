import React, { useRef, useState, useEffect } from 'react';

const ROW1_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const ROW2_IMAGES = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// Tripled lists for continuous scrolling
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
      {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
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
              alt="3D Motion Preview"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
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
              alt="3D Motion Preview"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
