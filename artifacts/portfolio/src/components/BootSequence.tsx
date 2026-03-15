import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "[OK] Kernel loaded",
  "[OK] Initializing hardware crypto module...",
  "[OK] Bypassing mainframe firewall...",
  "[OK] Establishing secure connection to node 'BELGIUM_01'...",
  "[OK] Decrypting user profile 'IONUT'...",
  "[OK] Loading skills manifest...",
  "[OK] Mounting project portfolio...",
  "SYSTEM ONLINE. ACCESS GRANTED."
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    }, 250); // fast printing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-black text-primary font-mono p-8 flex flex-col justify-end"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-2 mb-12">
            <div className="mb-8 text-accent">
              <pre className="text-xs sm:text-sm whitespace-pre-wrap">
{`   _____ _____ _____ 
  |_   _|   | |     |
    | | | | | |  |  |
   _| |_| | | |_____|
  |_____|_|___|     `}
              </pre>
              <p className="mt-4 text-xs tracking-[0.3em] uppercase">SysOS v9.4.2 // Unauthorized Access Mode</p>
            </div>
            
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${i === bootLogs.length - 1 ? 'text-accent font-bold mt-8 text-lg' : 'text-primary/80 text-sm'} `}
              >
                {line}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-primary inline-block mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
