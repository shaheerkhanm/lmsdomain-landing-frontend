import React from 'react';
import Image from 'next/image';

// Define the props for our component
interface GlassCardProps {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children }) => {
  return (
    // Main container to position the glows and the card
    // It needs a dark background for the effect to be visible
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Glow effect 1: Top-left corner */}
      <div className="absolute -top-1/4 -left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_80%)] blur-3xl"></div>
      
      {/* Glow effect 2: Bottom-right corner */}
      <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_80%)] blur-3xl"></div>

      {/* The Glass Card itself */}
      <div className="
        relative z-10 flex h-64 w-96 flex-col items-center justify-center rounded-2xl 
        border border-white/20 
        bg-white/10 
        shadow-xl 
        backdrop-blur-lg
      ">
        {children}
      </div>

    </div>
  );
};

export default GlassCard;