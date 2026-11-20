import React from 'react';
import { BookOpen, Church, Compass, Heart, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface TheologyFacultyHighlightProps {
  onApplyTheology: () => void;
  onViewProgrammes: () => void;
}

export const TheologyFacultyHighlight: React.FC<TheologyFacultyHighlightProps> = ({
  onApplyTheology,
  onViewProgrammes,
}) => {
  // Courses/areas specifically visible in the brochure:
  const brochureTheologyAreas = [
    {
      title: "CHURCH ADMINISTRATION",
      description: "Equipping ministers and church executives with organizational structures, financial accountability, and ecclesiastical governance.",
      icon: Church,
      levelRange: "Certificate to PhD"
    },
    {
      title: "MISSIOLOGY",
      description: "Developing cross-cultural evangelism, church planting methodologies, and contemporary missionary strategies.",
      icon: Compass,
      levelRange: "Diploma to PhD"
    },
    {
      title: "DIVINITY",
      description: "Deep doctrinal and pastoral training in homiletics, systematic theology, apologetics, and spiritual formation.",
      icon: BookOpen,
      levelRange: "Bachelor to PhD"
    },
    {
      title: "CHRISTIAN EDUCATION",
      description: "Instructional leadership for Bible schools, church discipleship, youth development, and theological pedagogy.",
      icon: GraduationCap,
      levelRange: "Certificate to Master’s"
    },
    {
      title: "BIBLICAL STUDIES",
      description: "Rigorous biblical hermeneutics, exegesis of Old and New Testaments, ancient cultural context, and textual analysis.",
      icon: BookOpen,
      levelRange: "Certificate to PhD"
    },
    {
      title: "AND OTHERS",
      description: "Specialized theological studies including Pastoral Counselling, Church History, Christian Ethics, and Ministry Leadership.",
      icon: Heart,
      levelRange: "Certificate to PhD"
    }
  ];

  return (
    <section className="py-20 bg-[#091733] border-t border-b border-[#18366c] relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#091733] via-[#091733]/95 to-[#0b2046]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-[#d4af37]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
                SIGNATURE FACULTY HIGHLIGHT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
              FACULTY OF THEOLOGY
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-editorial italic border-l-2 border-[#d4af37] pl-4 mb-4">
              “The Faculty of Theology provides theological education designed to deepen biblical understanding, Christian leadership, ministry knowledge and theological scholarship.”
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              As the spiritual and academic bedrock of Harvester’s Theological University, the Faculty of Theology handles the affairs of church education and prepares men and women for exemplary service in pulpit ministry, missions, Christian institutions, and global academia.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="bg-[#07132a] border border-[#1d3d76] rounded-lg p-6 text-center shadow-xl w-full max-w-sm">
              <HathunLogo variant="seal" size="lg" className="mx-auto mb-3" />
              <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                DEGREES CONFERRED
              </h3>
              <p className="text-xs text-[#d4af37] font-semibold mt-1">
                Certificate · Diploma · Bachelor’s · Master’s · PhD
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                Affordable fees · Structured curricula · Modular options
              </div>
            </div>
          </div>
        </div>

        {/* Brochure Specified Theology Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {brochureTheologyAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-[#0c1f43] border border-[#1e4282] hover:border-[#d4af37]/70 rounded-lg p-6 transition-all duration-200 group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-[#132c58] border border-[#234b8c] flex items-center justify-center text-[#d4af37]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-sky-400">
                      {area.levelRange}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading tracking-wide mb-2">
                    {area.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Brochure Specified Curricular Area</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call-to-Action Bar */}
        <div className="bg-[#071329] border border-[#1b386a] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg font-bold text-white font-heading">
              Ready to Advance Your Theological Calling?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Join students and ministers advancing their ministry qualifications with Harvester's Theological University.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onApplyTheology}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll in Theology</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewProgrammes}
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-200 hover:text-white bg-[#0f244b] hover:bg-[#16356e] border border-[#21437c] rounded transition"
            >
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
