import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "[OK] Booting portfolio OS v2026...",
  "[OK] Loading: Python, PyTorch, React, PostgreSQL, Docker...",
  "[OK] Detected: 6+ ML projects, 1 live SaaS product...",
  "[OK] Scanning for relevant experience... found.",
  "[OK] Student job loaded: AI Data Quality @ Brussels startup",
  "[OK] Side project detected: retallio.app — built from scratch",
  "[OK] Status: Open to internships & student opportunities",
  "WELCOME. YOU'VE FOUND THE RIGHT CANDIDATE."
];

interface BootSequenceProps {
  onComplete: () => void;
}

function TypingLine({ text, onDone, isFinal }: { text: string; onDone: () => void; isFinal: boolean }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onDone, isFinal ? 100 : 80);
      }
    }, isFinal ? 40 : 18);
    return () => clearInterval(interval);
  }, []);

  if (isFinal) {
    return (
      <motion.div
        className="mt-8 text-xl sm:text-2xl font-bold font-mono"
        animate={{
          color: ['#00f0ff', '#ffffff', '#00f0ff', '#ff00ff', '#00f0ff'],
          textShadow: [
            '0 0 10px #00f0ff',
            '0 0 20px #ffffff',
            '0 0 10px #00f0ff',
            '0 0 20px #ff00ff',
            '0 0 10px #00f0ff',
          ],
          x: [0, -2, 2, -1, 0],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >_</motion.span>
      </motion.div>
    );
  }

  return (
    <div className="text-primary/80 text-sm">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="inline-block w-2"
      >▋</motion.span>
    </div>
  );
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleLineDone = () => {
    if (currentLine < bootLogs.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 800);
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black text-primary font-mono p-8 flex flex-col justify-end"
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
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

            {bootLogs.slice(0, currentLine + 1).map((line, i) => (
              i < currentLine ? (
                <div key={i} className={`text-sm ${i === bootLogs.length - 1 ? 'text-accent font-bold mt-8 text-lg' : 'text-primary/80'}`}>
                  {line}
                </div>
              ) : (
                <TypingLine
                  key={i}
                  text={line}
                  onDone={handleLineDone}
                  isFinal={i === bootLogs.length - 1}
                />
              )
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}