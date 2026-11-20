import React from 'react';
import { FileText, Compass, PhoneCall, Award, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface HeroSectionProps {
  onApplyNow: () => void;
  onExploreProgrammes: () => void;
  onContactAdmissions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyNow,
  onExploreProgrammes,
  onContactAdmissions,
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#060e1d]">
      {/* Background Academic Imagery with Deep Royal Blue & Navy Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/gallery/item-4.jpg')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1d]/90 via-[#0a1835]/85 to-[#060e1d]" />
      
      {/* Architectural Collegiate Pattern Subtle Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        {/* Subtle Institutional Kicker (No Pill Badges!) */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-[1px] bg-[#d4af37]/60" />
          <span className="font-heading text-xs md:text-sm font-bold tracking-[0.3em] text-[#d4af37] uppercase">
            HATHUN · CAMEROON & GLOBAL ALLIANCES
          </span>
          <div className="w-10 h-[1px] bg-[#d4af37]/60" />
        </div>

        {/* Heraldic Crest Display */}
        <div className="flex justify-center mb-6">
          <HathunLogo variant="seal" size="xl" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight leading-[1.1] mb-5">
          HARVESTER’S <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#d4af37]">
            THEOLOGICAL UNIVERSITY
          </span>
        </h1>

        {/* Tagline / Supporting Headline */}
        <p className="font-heading font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#38bdf8] uppercase tracking-wider max-w-3xl mx-auto mb-6">
          ADVANCING THEOLOGICAL EDUCATION, ACADEMIC EXCELLENCE AND PROFESSIONAL DEVELOPMENT.
        </p>

        {/* Supporting Paragraph */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal mb-10">
          “Harvester’s Theological University provides theological and higher education opportunities across multiple academic disciplines, with programmes ranging from Certificate and Diploma studies to Bachelor’s, Master’s and PhD-level education.”
        </p>

        {/* Action Buttons: 3 explicit CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-14">
          <button
            onClick={onApplyNow}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#060e1d] bg-gradient-to-r from-[#d4af37] via-[#e5c45e] to-[#c59b27] hover:brightness-110 rounded-md shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>APPLY NOW</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreProgrammes}
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#0e2752] hover:bg-[#153a7a] border border-[#274f96] rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>EXPLORE PROGRAMMES</span>
          </button>

          <button
            onClick={onContactAdmissions}
            className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-slate-300 hover:text-white hover:bg-white/5 border border-slate-700/60 rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#d4af37]" />
            <span>CONTACT ADMISSIONS</span>
          </button>
        </div>

        {/* Academic Institutional Highlights Ribbon */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Theological Breadth</h4>
              <p className="text-[11px] text-slate-400">Certificate to PhD ministerial depth</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Faculty of Law</h4>
              <p className="text-[11px] text-slate-400">Diploma to PhD jurisprudence</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Multidisciplinary</h4>
              <p className="text-[11px] text-slate-400">9 Specialized Faculties</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border border-sky-400/50 flex items-center justify-center text-sky-400 text-xs font-bold flex-shrink-0 mt-0.5">
              §
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Sure Guide</h4>
              <p className="text-[11px] text-slate-400">To your educational dream</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
