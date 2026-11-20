import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { Faculty } from '../types';
import { 
  BookOpen, 
  Scale, 
  Landmark, 
  Briefcase, 
  Sprout, 
  HeartPulse, 
  Palette, 
  Globe, 
  Radio, 
  ArrowRight,
  GraduationCap,
  X
} from 'lucide-react';

interface FacultiesSectionProps {
  onSelectFaculty: (facultyId: string) => void;
  onApplyForFaculty: (facultyName: string) => void;
}

export const FacultiesSection: React.FC<FacultiesSectionProps> = ({
  onSelectFaculty,
  onApplyForFaculty
}) => {
  const { faculties } = useUniversity();
  const [activeModalFaculty, setActiveModalFaculty] = useState<Faculty | null>(null);

  const getFacultyIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'Scale': return Scale;
      case 'Landmark': return Landmark;
      case 'Briefcase': return Briefcase;
      case 'Sprout': return Sprout;
      case 'HeartPulse': return HeartPulse;
      case 'Palette': return Palette;
      case 'Globe': return Globe;
      case 'Radio': return Radio;
      default: return GraduationCap;
    }
  };

  return (
    <section id="faculties" className="py-20 bg-[#060e1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              ACADEMIC DIVISIONS
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            FACULTIES OF THE UNIVERSITY
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Harvester’s Theological University features nine distinguished faculties providing holistic instruction in sacred theology, legal jurisprudence, governance, business, sciences, and the arts.
          </p>
        </div>

        {/* Faculties Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty, index) => {
            const IconComponent = getFacultyIcon(faculty.iconName);
            const isTheology = faculty.id === 'fac-theology';
            const isLaw = faculty.id === 'fac-law';

            return (
              <div
                key={faculty.id}
                className={`flex flex-col justify-between rounded-lg overflow-hidden border transition-all duration-300 ${
                  isTheology
                    ? 'bg-gradient-to-b from-[#0f244b] to-[#091733] border-[#d4af37]/60 shadow-xl'
                    : isLaw
                    ? 'bg-[#091b3b] border-sky-600/50 hover:border-sky-400'
                    : 'bg-[#08152c] border-[#18325a] hover:border-[#264b85]'
                }`}
              >
                {/* Faculty Card Image Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e1d] via-[#060e1d]/50 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-[#060e1d]/90 backdrop-blur-sm border border-[#1b3869] text-white p-2 rounded">
                    <IconComponent className="w-5 h-5 text-[#d4af37]" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest block font-medium">
                      Division 0{index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-heading tracking-wide leading-tight">
                      {faculty.name}
                    </h3>
                  </div>
                </div>

                {/* Faculty Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {faculty.description}
                    </p>

                    {/* Available Programmes List */}
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Stated Programmes:
                      </span>
                      <ul className="space-y-1">
                        {faculty.availableProgrammes.slice(0, 3).map((prog, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                            <span className="truncate">{prog}</span>
                          </li>
                        ))}
                        {faculty.availableProgrammes.length > 3 && (
                          <li className="text-[11px] text-[#38bdf8] font-medium pt-0.5">
                            + {faculty.availableProgrammes.length - 3} more programmes
                          </li>
                        )}
                        {faculty.availableProgrammes.length === 0 && (
                          <li className="text-xs text-slate-400 italic">
                            Information coming soon. Contact the University for official details.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalFaculty(faculty)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Faculty</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onApplyForFaculty(faculty.name)}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Full Faculty Details */}
        {activeModalFaculty && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl animate-fadeIn">
              <button
                onClick={() => setActiveModalFaculty(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-md bg-[#071328] border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 border-b border-slate-700/60 pb-4">
                <div className="p-3 bg-[#132d5c] border border-[#274f98] rounded text-[#d4af37]">
                  {React.createElement(getFacultyIcon(activeModalFaculty.iconName), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {activeModalFaculty.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium tracking-wide">
                    Harvester's Theological University
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed">
                <p>{activeModalFaculty.description}</p>
                
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading mb-2">
                    Available Programmes & Study Areas:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalFaculty.availableProgrammes.map((p, idx) => (
                      <div key={idx} className="p-2.5 bg-[#060f20] border border-[#152e5c] rounded text-xs text-slate-200 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#071226] border border-[#1b3564] p-3 rounded text-xs text-slate-300">
                  <p className="font-semibold text-white mb-1">Admissions Information:</p>
                  <p>
                    Applications for this faculty are actively being received for Certificate, Diploma, Bachelor’s, Master’s and PhD levels. Prospective candidates should submit their credentials via the Online Admissions Application.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => setActiveModalFaculty(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const facName = activeModalFaculty.name;
                    setActiveModalFaculty(null);
                    onApplyForFaculty(facName);
                  }}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded"
                >
                  Apply to this Faculty
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
