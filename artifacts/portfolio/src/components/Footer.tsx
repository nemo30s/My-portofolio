import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-sm py-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-primary rotate-45 flex items-center justify-center">
            <span className="-rotate-45 font-serif font-bold text-[10px] text-primary">IN</span>
          </div>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} IONUT. ALL RIGHTS RESERVED.
          </span>
        </div>
        
        <div className="flex gap-6 font-mono text-xs tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">TERMINAL</a>
          <a href="#" className="hover:text-primary transition-colors">ROOT</a>
          <a href="#" className="hover:text-primary transition-colors">SYS_ADMIN</a>
        </div>
      </div>
    </footer>
  );
}
