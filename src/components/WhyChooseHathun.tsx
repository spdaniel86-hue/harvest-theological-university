import React from 'react';
import { 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Cross, 
  Briefcase, 
  Globe2 
} from 'lucide-react';

export const WhyChooseHathun: React.FC = () => {
  const pillars = [
    {
      title: "THEOLOGICAL EDUCATION",
      description: "Develop knowledge and understanding across major areas of theological education.",
      icon: BookOpen,
      iconColor: "text-[#d4af37]",
      bgColor: "bg-[#0b1c3d]"
    },
    {
      title: "MULTIDISCIPLINARY EDUCATION",
      description: "Academic opportunities across Theology, Law, Business Management, Public Administration and other fields.",
      icon: Layers,
      iconColor: "text-sky-400",
      bgColor: "bg-[#0b1c3d]"
    },
    {
      title: "ACADEMIC PROGRESSION",
      description: "Study through multiple academic levels from foundational education to advanced academic qualifications.",
      icon: TrendingUp,
      iconColor: "text-emerald-400",
      bgColor: "bg-[#0b1c3d]"
    },
    {
      title: "CHRISTIAN EDUCATION",
      description: "Promote theological learning, Christian education, ministry development and leadership.",
      icon: Cross,
      iconColor: "text-[#d4af37]",
      bgColor: "bg-[#0b1c3d]"
    },
    {
      title: "PROFESSIONAL DEVELOPMENT",
      description: "Develop academically and professionally through structured education.",
      icon: Briefcase,
      iconColor: "text-sky-400",
      bgColor: "bg-[#0b1c3d]"
    },
    {
      title: "INTERNATIONAL OUTLOOK",
      description: "Present an international academic orientation through the institution’s stated affiliations and partnerships.",
      icon: Globe2,
      iconColor: "text-amber-400",
      bgColor: "bg-[#0b1c3d]"
    }
  ];

  return (
    <section className="py-20 bg-[#09152b] border-t border-b border-[#14284d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              DISTINCTIVE EXCELLENCE
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            WHY CHOOSE HATHUN?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Harvester’s Theological University is guided by a resolute mission to combine theological scholarship, multidisciplinary learning, and Christian leadership into a transformative educational experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#0b1a36] border border-[#1a386b] rounded-lg p-6 hover:border-[#2f5ba6] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded bg-[#102750] border border-[#214785] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <span className="text-slate-500 font-heading text-xs font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading tracking-wide mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center text-[11px] text-[#38bdf8] font-medium">
                  <span>HATHUN Core Value</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
