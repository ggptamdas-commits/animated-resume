import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { RecentWorks } from './components/RecentWorks';
import { Services } from './components/Services';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1116] text-white font-sans overflow-x-clip select-none">
      <Navbar />
      <Hero />
      <About />
      <RecentWorks />
      <Services />
      <Footer />
    </div>
  );
};

export default App;