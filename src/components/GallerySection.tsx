import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { GalleryItem } from '../types';
import { Image, Maximize2, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = useUniversity();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'ALL',
    'GRADUATION',
    'STUDENTS',
    'ACADEMIC EVENTS',
    'CEREMONIES',
    'FACULTY',
    'CAMPUS',
    'CERTIFICATES'
  ];

  const filteredItems = activeCategory === 'ALL'
    ? gallery
    : gallery.filter(item => item.category.toUpperCase() === activeCategory);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-[#060e1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              VISUAL REPOSITORY
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            UNIVERSITY ARCHIVES & GALLERY
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Moments of academic triumph, sacred convocations, campus life, and ministerial fellowships at Harvester's Theological University.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#d4af37] text-[#060e1d] font-bold shadow'
                  : 'bg-[#091733] text-slate-300 hover:text-white border border-[#163466]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative bg-[#091733] border border-[#18366c] rounded-lg overflow-hidden cursor-pointer shadow-md hover:border-[#d4af37] transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackUrl) {
                      (e.target as HTMLImageElement).src = item.fallbackUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1d] via-[#060e1d]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 left-3 bg-[#060e1d]/80 backdrop-blur-sm text-[10px] font-semibold text-sky-400 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-wider">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#d4af37] text-[#060e1d] p-1.5 rounded">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold text-white font-heading leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-[#091733] border border-[#18366c] rounded-lg p-10 text-center text-slate-400">
            <Image className="w-8 h-8 mx-auto mb-2 text-slate-500" />
            <p className="text-sm">Information coming soon for this gallery category.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="max-h-[75vh] overflow-hidden rounded-lg border border-slate-700 shadow-2xl mb-4">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-contain max-h-[75vh]"
                  onError={(e) => {
                    const current = filteredItems[lightboxIndex];
                    if (current?.fallbackUrl) {
                      (e.target as HTMLImageElement).src = current.fallbackUrl;
                    }
                  }}
                />
              </div>

              <div className="text-center max-w-xl">
                <div className="flex items-center justify-center gap-3 text-xs text-sky-400 mb-1 font-semibold uppercase tracking-wider">
                  <span>{filteredItems[lightboxIndex].category}</span>
                  <span>·</span>
                  <span>Photo {lightboxIndex + 1} of {filteredItems.length}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
