import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'seal' | 'horizontal' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HathunLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md'
}) => {
  const [imgSrc, setImgSrc] = useState<string>('/hathun-logo.jpg');

  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 md:w-28 md:h-28'
  }[size];

  // Official HATHUN Logo Image Component with graceful fallback
  const OfficialLogoImage = (
    <div 
      className={`${dimensions} flex-shrink-0 relative rounded-full p-[2px] bg-gradient-to-tr from-[#c59b27] via-[#ffd700] to-[#0284c7] shadow-lg flex items-center justify-center overflow-hidden`}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-[#061024] flex items-center justify-center">
        <img
          src={imgSrc}
          alt="Harvester's Theological University Official Logo"
          className="w-full h-full object-cover object-center transform scale-105"
          onError={() => {
            // Fallback to direct external URL if local asset hasn't finished downloading
            if (imgSrc !== 'https://i.ibb.co/Kj8LT8Fk/IMG-20260926-WA0034.jpg') {
              setImgSrc('https://i.ibb.co/Kj8LT8Fk/IMG-20260926-WA0034.jpg');
            }
          }}
        />
      </div>
    </div>
  );

  if (variant === 'seal') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {OfficialLogoImage}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        {OfficialLogoImage}
        <div>
          <span className="block text-xl md:text-2xl font-bold tracking-wider text-white font-heading">
            HARVESTER’S
          </span>
          <span className="block text-sm md:text-base font-semibold tracking-widest text-[#d4af37] font-heading">
            THEOLOGICAL UNIVERSITY
          </span>
          <span className="block text-xs uppercase tracking-widest text-sky-300 font-medium mt-1">
            HATHUN · CAMEROON
          </span>
        </div>
      </div>
    );
  }

  // Default 'horizontal'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {OfficialLogoImage}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-heading font-extrabold text-base sm:text-lg tracking-wide text-white leading-tight">
            HARVESTER’S
          </span>
        </div>
        <span className="font-heading font-semibold text-xs tracking-wider text-[#d4af37] uppercase leading-tight">
          Theological University
        </span>
        <span className="text-[10px] tracking-widest text-slate-300/80 uppercase font-medium mt-0.5 hidden sm:block">
          HATHUN · Est. Theological & Higher Education
        </span>
      </div>
    </div>
  );
};
