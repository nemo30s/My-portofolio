import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  interval?: number;
}

export function GlitchText({ text, as: Component = 'span', className, interval = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glither = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    }, interval + Math.random() * 2000);
    
    return () => clearInterval(glither);
  }, [interval]);

  return (
    <Component 
      className={cn("relative inline-block", className)}
      data-text={text}
    >
      <span className={cn("relative inline-block z-10", isGlitching && "opacity-0")}>{text}</span>
      
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[-2px] text-primary z-0 opacity-80"
            style={{ clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)` }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-[2px] text-accent z-0 opacity-80"
            style={{ clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)` }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Component>
  );
}
