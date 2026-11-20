import React, { useState, useMemo } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { Programme, AcademicLevel } from '../types';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  FileText, 
  ChevronRight, 
  X,
  BookOpen,
  CheckCircle,
  Briefcase
} from 'lucide-react';

interface ProgrammesDirectoryProps {
  onApplyForProgramme: (programme: Programme) => void;
}

export const ProgrammesDirectory: React.FC<ProgrammesDirectoryProps> = ({
  onApplyForProgramme,
}) => {
  const { programmes, faculties } = useUniversity();

  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailProgramme, setActiveDetailProgramme] = useState<Programme | null>(null);

  // Unique durations available
  const durations = useMemo(() => {
    const set = new Set<string>();
    programmes.forEach(p => {
      if (p.duration) set.add(p.duration);
    });
    return Array.from(set);
  }, [programmes]);

  // Filtered programmes
  const filteredProgrammes = useMemo(() => {
    return programmes.filter(prog => {
      // Faculty filter
      if (selectedFaculty !== 'all' && prog.facultyId !== selectedFaculty) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && prog.level !== selectedLevel) {
        return false;
      }
      // Duration filter
      if (selectedDuration !== 'all' && prog.duration !== selectedDuration) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = prog.name.toLowerCase().includes(query);
        const matchFaculty = prog.facultyName.toLowerCase().includes(query);
        const matchDesc = prog.description.toLowerCase().includes(query);
        if (!matchName && !matchFaculty && !matchDesc) return false;
      }
      return true;
    });
  }, [programmes, selectedFaculty, selectedLevel, selectedDuration, searchQuery]);

  return (
    <section id="programmes" className="py-20 bg-[#060e1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              CURRICULAR OFFERINGS
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            ACADEMIC PROGRAMMES DIRECTORY
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore our curriculum offerings spanning Certificate, Diploma, Bachelor’s, Master’s and Doctoral levels. Filter by faculty, degree level, or duration.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 sm:p-6 mb-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Search Programmes
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Biblical Studies, Law..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#060e1d] border border-[#1d3c72] rounded pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Faculty Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Filter by Faculty
              </label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full bg-[#060e1d] border border-[#1d3c72] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All 9 Faculties</option>
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Level Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Filter by Academic Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#060e1d] border border-[#1d3c72] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Academic Levels</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma (2 Years)</option>
                <option value="Bachelor">Bachelor (2 Years)</option>
                <option value="Master’s">Master’s (1 Year)</option>
                <option value="PhD">PhD (3 Years)</option>
                <option value="Honorary Doctorate">Honorary Doctorate</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Filter by Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-[#060e1d] border border-[#1d3c72] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">Any Duration</option>
                {durations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Clear Helper */}
          {(selectedFaculty !== 'all' || selectedLevel !== 'all' || selectedDuration !== 'all' || searchQuery) && (
            <div className="mt-4 pt-3 border-t border-[#17325e] flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Found <strong className="text-white">{filteredProgrammes.length}</strong> matching programmes
              </span>
              <button
                onClick={() => {
                  setSelectedFaculty('all');
                  setSelectedLevel('all');
                  setSelectedDuration('all');
                  setSearchQuery('');
                }}
                className="text-[#d4af37] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Programme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog) => {
            return (
              <div
                key={prog.id}
                className="bg-[#091733] border border-[#1a3869] hover:border-[#2f5ba6] rounded-lg p-6 flex flex-col justify-between transition-all duration-200 group shadow-md"
              >
                <div>
                  {/* Card Header: Faculty & Level Quiet Kicker */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-3 pb-2 border-b border-slate-800">
                    <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider truncate">
                      {prog.facultyName.replace('FACULTY OF ', '')}
                    </span>
                    <span className="text-xs font-bold text-[#d4af37] font-heading flex-shrink-0">
                      {prog.level}
                    </span>
                  </div>

                  {/* Programme Name */}
                  <h3 className="text-lg font-bold text-white font-heading tracking-wide mb-2 group-hover:text-sky-300 transition-colors">
                    {prog.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {prog.description}
                  </p>

                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-[#060f22] p-3 rounded mb-4 border border-[#142d56] text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Duration</span>
                      <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-sky-400" />
                        {prog.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Registration</span>
                      <span className="font-semibold text-[#d4af37] flex items-center gap-1 mt-0.5">
                        <DollarSign className="w-3 h-3" />
                        {prog.registrationFee}
                      </span>
                    </div>
                  </div>

                  {/* Entry Requirements Snippet */}
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Entry Requirements:
                    </span>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {prog.entryRequirements}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveDetailProgramme(prog)}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>VIEW DETAILS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onApplyForProgramme(prog)}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow transition cursor-pointer"
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProgrammes.length === 0 && (
          <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-12 text-center">
            <GraduationCap className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white font-heading mb-1">No Programmes Match Your Filter</h4>
            <p className="text-xs text-slate-400 mb-4">
              Try adjusting your faculty, level, or search terms, or contact the University Admissions Office.
            </p>
            <button
              onClick={() => {
                setSelectedFaculty('all');
                setSelectedLevel('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-[#060e1d] bg-[#d4af37] rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Programme Modal */}
        {activeDetailProgramme && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-fadeIn">
              <button
                onClick={() => setActiveDetailProgramme(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-md bg-[#071328] border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6 pb-4 border-b border-slate-700">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block">
                  {activeDetailProgramme.facultyName}
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-1">
                  {activeDetailProgramme.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
                  <span>Level: <strong className="text-white">{activeDetailProgramme.level}</strong></span>
                  <span>·</span>
                  <span>Duration: <strong className="text-white">{activeDetailProgramme.duration}</strong></span>
                  <span>·</span>
                  <span>Registration Fee: <strong className="text-[#d4af37]">{activeDetailProgramme.registrationFee}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-1.5">
                    Programme Overview
                  </h4>
                  <p>{activeDetailProgramme.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-1.5">
                    Admission & Entry Requirements
                  </h4>
                  <div className="p-3 bg-[#061022] border border-[#16305a] rounded text-xs text-slate-200">
                    {activeDetailProgramme.entryRequirements}
                  </div>
                </div>

                {activeDetailProgramme.curriculumHighlights && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-2">
                      Curricular Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeDetailProgramme.curriculumHighlights.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-[#071328] rounded border border-slate-800 text-xs text-slate-200">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailProgramme.careerOpportunities && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-2">
                      Ministry & Vocational Outcomes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDetailProgramme.careerOpportunities.map((co, i) => (
                        <span key={i} className="text-xs bg-[#0f254b] text-sky-200 px-3 py-1 rounded border border-[#21437c] flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-[#d4af37]" />
                          {co}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3.5 bg-[#08152e] border border-[#1b3b6d] rounded text-xs text-slate-300">
                  <span className="font-semibold text-[#d4af37] block mb-1">Tuition Fee Policy:</span>
                  School fees are classified as <strong>Very Affordable</strong>. Official payment instructions and schedules are provided directly by the University Admissions Office upon review of application.
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  onClick={() => setActiveDetailProgramme(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prog = activeDetailProgramme;
                    setActiveDetailProgramme(null);
                    onApplyForProgramme(prog);
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow"
                >
                  Apply For This Programme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
