import React from 'react';
import { useUniversity } from '../context/UniversityContext';
import { ShieldCheck, Globe, Building2, FileCheck2, Info, ExternalLink } from 'lucide-react';
import { HathunLogo } from './HathunLogo';

export const AccreditationSection: React.FC = () => {
  const { affiliations } = useUniversity();

  return (
    <section id="accreditation" className="py-20 bg-[#09152b] border-t border-b border-[#14284d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              INSTITUTIONAL RELATIONS
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            ACCREDITATION, PARTNERSHIPS & AFFILIATIONS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Harvester’s Theological University maintains collaborative fellowships, academic alliances, and institutional relationships with recognized theological bodies and partner universities globally.
          </p>
        </div>

        {/* Official Transparency Statement Box */}
        <div className="mb-12 bg-[#061022] border border-[#1b3664] rounded-lg p-5 sm:p-6 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl mx-auto shadow-md">
          <div className="flex items-center gap-2 text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-2 font-heading">
            <ShieldCheck className="w-4 h-4" />
            <span>INSTITUTIONAL INFORMATION & INTEGRITY POLICY</span>
          </div>
          <p>
            The educational alliances and institutional affiliations listed below are presented based on official institutional documentation and records supplied by Harvester’s Theological University. HATHUN operates as an independent theological and Christian higher learning institution handling the affairs of church education.
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            Verification letters, affiliation charters, and cooperation memoranda are archived within the university administration registry and may be inspected by prospective students and institutional partners upon official request.
          </p>
        </div>

        {/* Affiliations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {affiliations.map((item, index) => {
            return (
              <div
                key={item.id}
                className="bg-[#0b1b38] border border-[#1c3c72] hover:border-[#2f5ba6] rounded-lg p-6 flex flex-col justify-between transition-all duration-200 shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#132c58] border border-[#234b8c] flex items-center justify-center text-[#d4af37] flex-shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider block">
                          {item.relationshipType}
                        </span>
                        <h3 className="text-base font-bold text-white font-heading tracking-wide mt-0.5">
                          {item.organization}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.country && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Globe className="w-3.5 h-3.5 text-sky-400" />
                      <span>Territory / Jurisdiction: <strong className="text-slate-200">{item.country}</strong></span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-300">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.officialNote}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Registry Verification Box */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-xl mx-auto">
          <p>
            Official institutional partnership enquiries can be directed to the Office of the Registrar at <strong className="text-slate-200">admissions@hathun.edu</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
