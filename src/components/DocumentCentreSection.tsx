import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { FileText, Download, Search } from 'lucide-react';

export const DocumentCentreSection: React.FC = () => {
  const { documents } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchDoc, setSearchDoc] = useState<string>('');

  const categories = [
    'all',
    'Prospectus',
    'Admission Information',
    'Programme Information',
    'Student Handbook',
    'Academic Calendar',
    'Forms'
  ];

  const filteredDocs = documents.filter(doc => {
    if (doc.isPrivate) return false;
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (searchDoc.trim() && !doc.title.toLowerCase().includes(searchDoc.toLowerCase())) return false;
    return true;
  });

  const handleDownloadSim = (docTitle: string) => {
    alert(`Downloading official document: "${docTitle}" (HATHUN Academic Publication).`);
  };

  return (
    <section id="documents" className="py-20 bg-[#060e1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              ACADEMIC REPOSITORY & PUBLICATIONS
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            HATHUN DOCUMENT CENTRE
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Access official university prospectuses, academic calendars, student handbook guidelines, and enrollment forms.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#091733] border border-[#1a3869] rounded-lg p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded uppercase tracking-wider transition cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-[#d4af37] text-[#060e1d] font-bold shadow'
                    : 'bg-[#071328] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {c === 'all' ? 'All Documents' : c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              className="w-full bg-[#060e1d] border border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#0b1b38] border border-[#1a386b] hover:border-[#2b5ba6] rounded-lg p-5 flex flex-col justify-between transition-all duration-200 shadow-md"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded bg-[#102750] border border-[#204582] flex items-center justify-center text-[#d4af37]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-400 bg-[#060e1d] px-2 py-0.5 rounded border border-slate-800">
                    {doc.fileSize}
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block mb-1">
                  {doc.category}
                </span>

                <h3 className="text-sm font-bold text-white font-heading tracking-wide mb-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Updated: {doc.updatedDate}
                </span>

                <button
                  onClick={() => handleDownloadSim(doc.title)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0e2752] hover:bg-[#163a78] border border-[#21437c] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
