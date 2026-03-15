import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-primary/20 py-3 shadow-[0_4px_30px_rgba(0,240,255,0.05)]' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 border-2 border-primary rotate-45 flex items-center justify-center group-hover:bg-primary/10 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <span className="-rotate-45 font-serif font-bold text-lg text-primary tracking-tighter">ID</span>
          </div>
          <span className="font-mono text-sm tracking-[0.2em] font-bold text-foreground hidden sm:block">
            Ionut<span className="text-primary"> Diaconu</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['about', 'projects', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase relative group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-primary absolute -left-4 transition-opacity">&gt;</span>
              {item}
            </button>
          ))}
        </nav>

        <a
          href="https://www.linkedin.com/in/diaconu-ionut/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 text-xs font-mono border border-primary/30 text-primary px-4 py-2 hover:bg-primary/10 transition-colors tracking-widest"
        >
          LinkedIn ↗
        </a>
      </div>
    </motion.header>
  );
}
