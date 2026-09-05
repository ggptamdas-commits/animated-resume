import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState<string>(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      const isInside =
        Math.abs(distX) <= halfWidth + padding &&
        Math.abs(distY) <= halfHeight + padding;

      if (isInside) {
        setTransition(activeTransition);
        const moveX = distX / strength;
        const moveY = distY / strength;
        setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
