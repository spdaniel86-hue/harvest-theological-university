import React, { useState } from 'react';
import { Award, BookOpen, Calendar, Users, Sparkles, GraduationCap } from 'lucide-react';

export const AcademicLifeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const activities = [
    {
      id: 'act-1',
      category: 'GRADUATION CEREMONIES',
      title: 'Solemn Annual Convocation & Conferment',
      description: 'The pinnacle of academic dedication where graduating scholars across Certificate, Diploma, Bachelor, Master’s and PhD levels receive their hard-earned credentials under the authority of the Chancellor.',
      image: '/gallery/item-3.jpg',
      fallback: 'https://i.ibb.co/s9fKQWvQ/IMG-20260926-WA0079.jpg',
      icon: Award
    },
    {
      id: 'act-2',
      category: 'ACADEMIC EVENTS',
      title: 'Theological Colloquium & Ministerial Forums',
      description: 'Scholarly gatherings where faculty members, visiting theologians, and research students present peer-reviewed papers on biblical interpretation, public administration, and ministry leadership.',
      image: '/gallery/item-5.jpg',
      fallback: 'https://i.ibb.co/cpgvcHL/IMG-20260926-WA0086.jpg',
      icon: Calendar
    },
    {
      id: 'act-3',
      category: 'LECTURES',
      title: 'Interactive Theological & Legal Lectures',
      description: 'Rigorous classroom and modular instruction uniting scriptural depth with practical case studies across Theology, Law, Business Management, and Public Administration.',
      image: '/gallery/item-2.jpg',
      fallback: 'https://i.ibb.co/d0cXyFkK/IMG-20260926-WA0069.jpg',
      icon: BookOpen
    },
    {
      id: 'act-4',
      category: 'STUDENT ACTIVITIES',
      title: 'Spiritual Fellowship & Student Guild',
      description: 'Vibrant student life fostering communal prayer, peer study circles, cross-faculty symposiums, and evangelical outreach into regional communities.',
      image: '/gallery/item-7.jpg',
      fallback: 'https://i.ibb.co/Xx5JyD0b/IMG-20260926-WA0078.jpg',
      icon: Users
    },
    {
      id: 'act-5',
      category: 'ACADEMIC PROCESSIONS',
      title: 'Ceremonial Academic Processions',
      description: 'Historic academic dignity on display as the Chancellor, Registrar, Vice Chancellor, and faculty deans process in full regalia to open academic sessions.',
      image: '/gallery/item-8.jpg',
      fallback: 'https://i.ibb.co/nF754RR/IMG-20260926-WA0072.jpg',
      icon: Sparkles
    },
    {
      id: 'act-6',
      category: 'CERTIFICATE PRESENTATIONS',
      title: 'Conferral of Academic Qualifications',
      description: 'Formal internal presentation of university degree diplomas, transcripts, and verified awards honoring continuous academic excellence and Christian character.',
      image: '/gallery/item-1.jpg',
      fallback: 'https://i.ibb.co/XxKmbQg5/IMG-20260926-WA0064.jpg',
      icon: GraduationCap
    }
  ];

  const categories = ['all', 'GRADUATION CEREMONIES', 'ACADEMIC EVENTS', 'LECTURES', 'STUDENT ACTIVITIES', 'ACADEMIC PROCESSIONS', 'CERTIFICATE PRESENTATIONS'];

  const filtered = activeTab === 'all' 
    ? activities 
    : activities.filter(a => a.category === activeTab);

  return (
    <section className="py-20 bg-[#060e1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              CAMPUS EXPERIENCE
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            ACADEMIC LIFE AT HATHUN
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience an intellectually stimulating and spiritually enriching academic atmosphere characterized by fellowship, scholarly debate, and dignified university ceremonies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#d4af37] text-[#060e1d] font-bold shadow'
                  : 'bg-[#0b1b38] text-slate-300 hover:text-white border border-[#1b396c]'
              }`}
            >
              {cat === 'all' ? 'All Activities' : cat}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="bg-[#091733] border border-[#1b386b] rounded-lg overflow-hidden group hover:border-[#2d5aa3] transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                    onError={(e) => {
                      if (act.fallback) {
                        (e.target as HTMLImageElement).src = act.fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091733] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-[#060e1d]/90 p-2 rounded text-[#d4af37] border border-[#1c3866]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">
                      {act.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading tracking-wide mb-2 group-hover:text-sky-300 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-[#d4af37] font-medium">
                    Harvester’s Theological University
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
