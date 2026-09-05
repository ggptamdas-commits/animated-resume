import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ className = '', onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const aboutSection = document.getElementById('contact');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:jack@3dcreator.studio';
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full uppercase font-medium tracking-widest text-white cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base select-none transition-transform duration-300 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </motion.button>
  );
};
