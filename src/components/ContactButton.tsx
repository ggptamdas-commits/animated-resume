import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  label = 'Contact Me',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:ahameddruboo@gmail.com';
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full uppercase font-medium tracking-widest text-white cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm select-none transition-transform duration-300 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #152538 7%, #1E354F 37%, #2C496A 72%, #3D628B 100%)',
        boxShadow: '0px 4px 12px rgba(30, 53, 79, 0.4), inset 2px 2px 8px rgba(255, 255, 255, 0.15)',
        outline: '2px solid rgba(255, 255, 255, 0.8)',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </motion.button>
  );
};
