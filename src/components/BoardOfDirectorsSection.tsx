import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { BoardMember } from '../types';
import { Award, Globe, BookOpen, ChevronRight, X, Shield } from 'lucide-react';
import { HathunLogo } from './HathunLogo';

export const BoardOfDirectorsSection: React.FC = () => {
  const { boardMembers } = useUniversity();
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  return (
    <section id="board" className="py-20 bg-[#09152b] border-t border-b border-[#14284d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              GOVERNING COUNCIL & LEADERSHIP
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            BOARD OF DIRECTORS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The governing leadership of Harvester’s Theological University provides visionary guidance, moral stewardship, and academic oversight across all collegiate institutions.
          </p>
        </div>

        {/* Board Members Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boardMembers.map((member) => {
            const isChancellor = member.position.toLowerCase().includes('chancellor');
            const isRegistrar = member.position.toLowerCase().includes('registrar');

            return (
              <div
                key={member.id}
                className={`rounded-lg overflow-hidden border flex flex-col justify-between transition-all duration-300 group shadow-xl ${
                  isChancellor
                    ? 'bg-gradient-to-b from-[#0f244e] to-[#08152e] border-[#d4af37]/70 ring-1 ring-[#d4af37]/30'
                    : 'bg-[#0b1b38] border-[#1c3c72] hover:border-[#2b5ba6]'
                }`}
              >
                {/* Member Portrait */}
                <div className="relative h-72 overflow-hidden bg-[#060e1d]">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (member.id === 'bm-1') {
                        target.src = 'https://i.ibb.co/whPmBWpp/IMG-20260926-WA0036.jpg';
                      } else if (member.id === 'bm-2') {
                        target.src = 'https://i.ibb.co/qLtw7nPZ/IMG-20261004-WA0088.jpg';
                      } else if (member.id === 'bm-3') {
                        target.src = 'https://i.ibb.co/5g25PV63/file-000000000e588210b858f24a4c652166.png';
                      } else if (member.id === 'bm-4') {
                        target.src = 'https://i.ibb.co/TqP7Vj4T/IMG-20260926-WA0045.jpg';
                      } else if (member.id === 'bm-5') {
                        target.src = 'https://i.ibb.co/FLgS92XQ/IMG-20260926-WA0052.jpg';
                      } else if (member.id === 'bm-6') {
                        target.src = 'https://i.ibb.co/DH9b2KRV/IMG-20261016-195428-105.jpg';
                      } else if (member.id === 'bm-7') {
                        target.src = 'https://i.ibb.co/xSvtzLTr/IMG-20260926-WA0053.jpg';
                      } else if (member.id === 'bm-8') {
                        target.src = 'https://i.ibb.co/CKVfvzKB/IMG-20260926-WA0050.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08152e] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-[#d4af37] text-[#060e1d] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                    {member.id === 'bm-1'
                      ? 'CHANCELLOR'
                      : member.id === 'bm-2'
                      ? 'REGISTRAR'
                      : member.id === 'bm-3'
                      ? 'VICE CHANCELLOR'
                      : member.id === 'bm-4'
                      ? 'GENERAL SECRETARY'
                      : member.id === 'bm-5'
                      ? "INT'L PRESIDENT"
                      : member.id === 'bm-6'
                      ? "VICE INT'L PRESIDENT"
                      : member.id === 'bm-7'
                      ? 'GLOBAL VICE CHANCELLOR'
                      : 'DEAN OF LAW'}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider block">
                      {member.country}
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading tracking-wide leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Member Role & Bio Snippet */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-3 pb-2 border-b border-slate-700/60">
                      <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wide font-heading block">
                        {member.position}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                      {member.biography}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Citation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <Shield className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brochure Note for Additional Board Members */}
        <div className="mt-14 max-w-2xl mx-auto bg-[#061022] border border-[#183564] rounded-lg p-5 text-center text-xs text-slate-400">
          <p className="leading-relaxed">
            Harvester’s Theological University operates under an international collegiate council. As records are updated by the University Senate, additional council members, visiting deans, and trustees are registered through the administrative registry.
          </p>
        </div>

        {/* Modal for Full Citation / Bio */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-lg w-full p-6 relative shadow-2xl animate-fadeIn">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded bg-[#071328] border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
                <img
                  src={selectedMember.photoUrl}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (selectedMember.id === 'bm-1') {
                      target.src = 'https://i.ibb.co/whPmBWpp/IMG-20260926-WA0036.jpg';
                    } else if (selectedMember.id === 'bm-2') {
                      target.src = 'https://i.ibb.co/qLtw7nPZ/IMG-20261004-WA0088.jpg';
                    } else if (selectedMember.id === 'bm-3') {
                      target.src = 'https://i.ibb.co/5g25PV63/file-000000000e588210b858f24a4c652166.png';
                    } else if (selectedMember.id === 'bm-4') {
                      target.src = 'https://i.ibb.co/TqP7Vj4T/IMG-20260926-WA0045.jpg';
                    } else if (selectedMember.id === 'bm-5') {
                      target.src = 'https://i.ibb.co/FLgS92XQ/IMG-20260926-WA0052.jpg';
                    } else if (selectedMember.id === 'bm-6') {
                      target.src = 'https://i.ibb.co/DH9b2KRV/IMG-20261016-195428-105.jpg';
                    } else if (selectedMember.id === 'bm-7') {
                      target.src = 'https://i.ibb.co/xSvtzLTr/IMG-20260926-WA0053.jpg';
                    } else if (selectedMember.id === 'bm-8') {
                      target.src = 'https://i.ibb.co/CKVfvzKB/IMG-20260926-WA0050.jpg';
                    }
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-semibold">
                    {selectedMember.position}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {selectedMember.country}
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 mb-6">
                <p>{selectedMember.biography}</p>
                <div className="p-3 bg-[#060f22] border border-[#152e5a] rounded text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Academic Governance Role:</span>
                  Entrusted by the University Charter to safeguard theological sound doctrine, student welfare, international affiliations, and educational development.
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-700">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#0e244d] rounded border border-[#21437c]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
