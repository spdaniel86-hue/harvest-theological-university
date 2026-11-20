import React from 'react';
import { ACADEMIC_LEVELS_INFO } from '../data/universityData';
import { Clock, DollarSign, Award, Info, FileText } from 'lucide-react';

interface AcademicLevelsSectionProps {
  onApplyForLevel: (level: string) => void;
}

export const AcademicLevelsSection: React.FC<AcademicLevelsSectionProps> = ({ onApplyForLevel }) => {
  return (
    <section id="academics" className="py-20 bg-[#060e1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              ACADEMIC PROGRESSION
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            ACADEMIC LEVELS & PROGRAMMES
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Harvester’s Theological University offers structured educational pathways designed to guide candidates from foundational study to doctoral scholarship and distinguished honorary recognition.
          </p>
        </div>

        {/* Academic Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_LEVELS_INFO.map((item, index) => {
            const isHonorary = item.level === 'Honorary Doctorate';
            const isPhD = item.level === 'PhD';

            return (
              <div
                key={item.level}
                className={`flex flex-col justify-between rounded-lg p-6 transition-all duration-300 relative border ${
                  isHonorary
                    ? 'bg-gradient-to-b from-[#13284f] to-[#0a1835] border-[#d4af37]/60 shadow-xl'
                    : isPhD
                    ? 'bg-[#0a1b38] border-sky-600/40 hover:border-sky-500'
                    : 'bg-[#08152e] border-[#18325c] hover:border-[#274f8c]'
                }`}
              >
                <div>
                  {/* Level Header */}
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-700/50">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                        Tier 0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading tracking-tight mt-0.5">
                        {item.level}
                      </h3>
                    </div>
                    {isHonorary && (
                      <span className="text-[11px] text-[#d4af37] font-semibold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Conferred Honor
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Key Academic Specs */}
                  <div className="space-y-2.5 bg-[#050c18]/60 rounded p-3.5 mb-6 border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        Duration
                      </span>
                      <span className="font-semibold text-white">
                        {item.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />
                        Registration
                      </span>
                      <span className="font-semibold text-[#d4af37]">
                        {item.registrationFee}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        Tuition Fees
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {item.schoolFees}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onApplyForLevel(item.level)}
                  className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded transition flex items-center justify-center gap-2 cursor-pointer ${
                    isHonorary
                      ? 'bg-[#d4af37] hover:bg-[#c59b27] text-[#060e1d]'
                      : 'bg-[#102a58] hover:bg-[#183d7e] text-slate-100 border border-[#274e92]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isHonorary ? 'Nominate / Apply' : 'Apply For ' + item.level}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Strict Tuition & Payment Transparency Notice as Mandated */}
        <div className="mt-12 bg-[#091835] border border-[#1d3c72] rounded-lg p-5 sm:p-6 text-center max-w-4xl mx-auto shadow-md">
          <div className="flex items-center justify-center gap-2 text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-1.5 font-heading">
            <Info className="w-4 h-4" />
            <span>OFFICIAL TUITION & PAYMENT NOTICE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            “Please contact the University Admissions Office for payment instructions. All tuition and registration fees are processed strictly through official university-designated institutional accounts. The university website does not collect online card or gateway payments.”
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            Harvester’s Theological University maintains very affordable school fees across all faculties to ensure church workers, ministers, and students have equitable access to higher education.
          </p>
        </div>
      </div>
    </section>
  );
};
