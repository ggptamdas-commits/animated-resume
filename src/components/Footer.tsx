import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-[#0C0C0C] text-center select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <div className="text-lg font-extrabold uppercase tracking-wider text-white">
            AMDAUL HOQUE
          </div>
          <div className="text-xs uppercase tracking-widest text-[#BA8C63] mt-0.5">
            Restaurant Supervisor
          </div>
        </div>

        <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light">
          &copy; {new Date().getFullYear()} AMDAUL HOQUE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
