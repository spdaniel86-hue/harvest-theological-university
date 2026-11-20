import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface AIAssistantFloatingButtonProps {
  onClick: () => void;
}

export const AIAssistantFloatingButton: React.FC<AIAssistantFloatingButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-24 right-5 sm:right-6 z-40 group">
      {/* Tooltip on desktop */}
      <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0a1b38] border border-[#d4af37]/70 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Ask HATHUN AI Assistant</span>
        </div>
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0a1b38] border-t border-r border-[#d4af37]/70 transform rotate-45" />
      </div>

      <button
        onClick={onClick}
        aria-label="Ask HATHUN AI Academic Assistant"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0a1d3d] via-[#103064] to-[#1a4b9c] text-[#d4af37] border-2 border-[#d4af37] shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        {/* Animated Radial Glow */}
        <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full animate-ping opacity-75" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37]" />
          <span className="text-[8px] font-black uppercase tracking-tighter text-white font-heading">
            AI GUIDE
          </span>
        </div>

        {/* Active Online Status Dot */}
        <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#060e1d] animate-pulse" />
      </button>
    </div>
  );
};
