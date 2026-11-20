import React from 'react';
import { ArrowRight, BookOpen, Compass, Award } from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface WelcomeSectionProps {
  onLearnMore: () => void;
  onExploreFaculties: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onLearnMore,
  onExploreFaculties,
}) => {
  return (
    <section id="about" className="py-20 bg-[#09152b] border-t border-b border-[#14284d] relative overflow-hidden">
      {/* Decorative Collegiate Crest Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.03] pointer-events-none">
        <HathunLogo variant="seal" size="xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Institutional Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-[#d4af37]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
                INSTITUTIONAL OVERVIEW
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-6">
              WELCOME TO HATHUN
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="text-lg text-slate-100 font-editorial italic border-l-2 border-[#d4af37] pl-4">
                “Harvester’s Theological University (HATHUN) is a theological university focused on church education and higher learning. The institution provides theological education across different branches and offers academic opportunities extending from Certificate through PhD level.”
              </p>
              
              <p>
                Rooted in divine calling and educational rigor, Harvester's Theological University prepares Christian workers, ministers, legal scholars, and public leaders with an unyielding commitment to academic integrity and ethical leadership.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm">
                In addition to its cornerstone theological scholarship, HATHUN offers structured education in Law from Diploma to PhD level, as well as multidisciplinary faculties spanning Public Administration, Business Management and Marketing, Agriculture, Medical Science & Medicine, Arts and Culture, Political Science, and Public Communication.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>LEARN MORE ABOUT HATHUN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreFaculties}
                className="px-5 py-3 text-xs sm:text-sm font-semibold tracking-wide text-slate-200 hover:text-white bg-[#0e2448] hover:bg-[#143264] border border-[#21437c] rounded transition flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE ALL 9 FACULTIES</span>
              </button>
            </div>
          </div>

          {/* Right Column: Institutional Pillars Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b1b38] border border-[#1d3c72] rounded-lg p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center gap-3 border-b border-[#1b3562] pb-4 mb-6">
                <HathunLogo variant="seal" size="md" />
                <div>
                  <h3 className="font-heading text-sm font-bold text-white tracking-wide">
                    HARVESTER’S THEOLOGICAL UNIVERSITY
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium tracking-wider">
                    “WE ARE A SURE GUIDE TO YOUR DREAM”
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded bg-[#132c58] border border-[#234b8c] flex items-center justify-center flex-shrink-0 text-[#d4af37]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                      Church & Theological Education
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Handling church education affairs and pastoral training with scriptural fidelity and theological discernment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded bg-[#132c58] border border-[#234b8c] flex items-center justify-center flex-shrink-0 text-sky-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                      Certificate to PhD Progression
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Structured academic pathways providing continuous intellectual and ministerial advancement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded bg-[#132c58] border border-[#234b8c] flex items-center justify-center flex-shrink-0 text-[#d4af37]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                      International Head Office
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Former Police Control, Ambam-yat, Ambam, South Region, Cameroon, serving students globally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#173059] flex items-center justify-between text-xs text-slate-400">
                <span>Academic Session 2026/2027</span>
                <span className="text-[#38bdf8] font-semibold">Admissions Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
