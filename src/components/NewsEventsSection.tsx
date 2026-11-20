import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { NewsArticle, UniversityEvent } from '../types';
import { Calendar, Clock, MapPin, User, ChevronRight, X, Share2, Tag, Bell } from 'lucide-react';

export const NewsEventsSection: React.FC = () => {
  const { news, events } = useUniversity();
  const [activeNewsModal, setActiveNewsModal] = useState<NewsArticle | null>(null);
  const [activeEventModal, setActiveEventModal] = useState<UniversityEvent | null>(null);

  return (
    <section id="news" className="py-20 bg-[#09152b] border-t border-b border-[#14284d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              DISPATCHES & SCHEDULES
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            NEWS, BULLETINS & UPCOMING EVENTS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Stay informed with official circulars, academic notices, theological symposium dates, and university celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official News & Bulletins (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#d4af37]" />
                <span>UNIVERSITY NEWS & NOTICES</span>
              </h3>
              <span className="text-xs text-[#38bdf8] font-semibold">Latest Official Releases</span>
            </div>

            <div className="space-y-6">
              {news.map((article) => (
                <div
                  key={article.id}
                  className="bg-[#0b1b38] border border-[#1c3c72] hover:border-[#2b5ba6] rounded-lg overflow-hidden flex flex-col sm:flex-row transition-all duration-200 group shadow-md"
                >
                  <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-[#060e1d]/90 text-[10px] text-[#d4af37] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#d4af37]" />
                          {article.date}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-sky-400" />
                          {article.author}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white font-heading tracking-wide mb-2 group-hover:text-sky-300 transition-colors leading-snug">
                        {article.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveNewsModal(article)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <span>Read Full Notice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming Events & Calendar (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>UPCOMING EVENTS</span>
              </h3>
              <span className="text-xs text-[#d4af37] font-semibold">Academic Calendar</span>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setActiveEventModal(ev)}
                  className="bg-[#0b1b38] border border-[#1c3c72] hover:border-[#d4af37]/70 rounded-lg p-5 transition-all duration-200 cursor-pointer shadow-md group"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Block */}
                    <div className="w-14 h-14 rounded bg-[#102750] border border-[#214785] flex flex-col items-center justify-center flex-shrink-0 text-center">
                      <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider leading-none">
                        {ev.date.split(' ')[0]}
                      </span>
                      <span className="text-lg font-black text-white font-heading leading-tight">
                        {ev.date.split(' ')[1]?.replace(',', '') || '24'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">
                          {ev.category}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white font-heading tracking-wide mb-1.5 group-hover:text-sky-300 transition-colors">
                        {ev.title}
                      </h4>

                      <div className="flex flex-col gap-1 text-[11px] text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="w-3 h-3 text-[#d4af37]" />
                          {ev.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400 truncate">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          {ev.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Session Summary Card */}
            <div className="mt-6 bg-[#071328] border border-[#1a3869] rounded-lg p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading mb-2">
                Session Registration Status
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Admissions for the 2026/2027 academic session remain open. Prospective candidates across all faculties may submit credentials through the admissions portal.
              </p>
              <div className="flex items-center justify-between text-xs text-[#d4af37]">
                <span>Ambam Campus & International Studies</span>
                <span className="font-semibold">Ongoing Intake</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full News Article Modal */}
        {activeNewsModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-fadeIn">
              <button
                onClick={() => setActiveNewsModal(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded bg-[#071328] border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider">
                  {activeNewsModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 leading-snug">
                  {activeNewsModal.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span>{activeNewsModal.date}</span>
                  <span>·</span>
                  <span>By {activeNewsModal.author}</span>
                </div>
              </div>

              <div className="h-56 rounded overflow-hidden mb-6 border border-slate-700">
                <img
                  src={activeNewsModal.featuredImage}
                  alt={activeNewsModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 mb-6">
                <p className="font-editorial text-base text-slate-100 italic border-l-2 border-[#d4af37] pl-3">
                  {activeNewsModal.excerpt}
                </p>
                <p>{activeNewsModal.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setActiveNewsModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Official news bulletin link copied to clipboard.");
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0e2752] border border-[#234b8c] rounded flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Share Notice</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full Event Modal */}
        {activeEventModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-lg w-full p-6 relative shadow-2xl animate-fadeIn">
              <button
                onClick={() => setActiveEventModal(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded bg-[#071328] border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4 pb-3 border-b border-slate-700">
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                  {activeEventModal.category}
                </span>
                <h3 className="text-xl font-bold text-white font-heading mt-1">
                  {activeEventModal.title}
                </h3>
              </div>

              <div className="space-y-3 mb-6 bg-[#071328] p-4 rounded border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Date:</strong> {activeEventModal.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span><strong>Time:</strong> {activeEventModal.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span><strong>Venue:</strong> {activeEventModal.venue}</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 space-y-3">
                <p>{activeEventModal.description}</p>
                <div className="p-3 bg-[#08152e] border border-[#1d3d74] rounded text-xs text-slate-200">
                  <span className="font-semibold text-[#d4af37] block mb-1">Registration & Attendance:</span>
                  {activeEventModal.registrationNote}
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-700">
                <button
                  onClick={() => setActiveEventModal(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0f244b] rounded border border-[#21437c]"
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
