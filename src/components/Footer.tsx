import React from 'react';
import { HathunLogo } from './HathunLogo';
import { useUniversity } from '../context/UniversityContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp, 
  FileText, 
  Lock, 
  GraduationCap 
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPortal: (target: 'student' | 'admin') => void;
  onOpenAdmissions: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenPortal,
  onOpenAdmissions,
}) => {
  const { universityInfo } = useUniversity();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040915] border-t-2 border-[#162f5e] text-slate-300 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Institutional Crest & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <HathunLogo variant="horizontal" size="lg" />

            <p className="text-xs text-slate-300 leading-relaxed mt-4">
              “Harvester’s Theological University is a theological university that handles the affairs of church education and provides theological education from Certificate to PhD level.”
            </p>

            <div className="pt-2 text-xs">
              <span className="font-heading font-semibold text-[#d4af37] tracking-wider block">
                TAGLINE:
              </span>
              <p className="text-sm font-bold text-white font-heading mt-0.5 tracking-wide">
                “WE ARE A SURE GUIDE TO YOUR DREAM”
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                <span>{universityInfo.headOffice.formattedAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>{universityInfo.headOffice.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Academic Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-4 border-b border-slate-800 pb-2">
              ACADEMICS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('academics')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Academic Levels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('theology')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Faculty of Theology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('programmes')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Programmes Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('accreditation')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Accreditation & Alliances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('board')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Board of Directors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('documents')} className="hover:text-[#d4af37] transition cursor-pointer">
                  Document Centre
                </button>
              </li>
            </ul>
          </div>

          {/* Faculties Directory (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-4 border-b border-slate-800 pb-2">
              ACADEMIC FACULTIES
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>1. Faculty of Theology</li>
              <li>2. Faculty of Law (Diploma to PhD)</li>
              <li>3. Faculty of Public Administration</li>
              <li>4. Faculty of Business Management & Marketing</li>
              <li>5. Faculty of Agriculture</li>
              <li>6. Faculty of Medical Science & Medicine</li>
              <li>7. Faculty of Arts and Culture</li>
              <li>8. Faculty of Political Science</li>
              <li>9. Faculty of Public Communication</li>
            </ul>
          </div>

          {/* Digital Portals & Enrollment (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading mb-4 border-b border-slate-800 pb-2">
              PORTALS & ADMISSIONS
            </h4>

            <div className="space-y-2.5">
              <button
                onClick={onOpenAdmissions}
                className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ONLINE ADMISSION</span>
              </button>

              <button
                onClick={() => onOpenPortal('student')}
                className="w-full py-2.5 px-3 text-xs font-semibold text-slate-100 bg-[#0e2752] hover:bg-[#153a7a] border border-[#234b8c] rounded transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>STUDENT PORTAL LOGIN</span>
              </button>

              <button
                onClick={() => onOpenPortal('admin')}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-[#071328] hover:bg-[#0c1f40] border border-slate-800 rounded transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>ADMINISTRATOR LOGIN</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>Admissions Office (Ambam Campus):</p>
              <p className="text-slate-300 font-mono">{universityInfo.headOffice.phone}</p>
              <a
                href="https://wa.me/237672929067"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold block pt-0.5 transition cursor-pointer"
                title="Direct WhatsApp Admissions Desk"
              >
                Official WhatsApp: +237672929067
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Integrity Notices (Strict Zero Payment / Zero Public Verification compliance) */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-400 space-y-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <p>
              <strong>OFFICIAL POLICY ON ONLINE PAYMENTS:</strong> Harvester’s Theological University does NOT integrate or operate online payment gateways, credit card processing, or third-party checkouts on this website. Tuition and registration fee instructions are issued privately through official university bank accounts via the Admissions Office.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>PRIVACY OF ACADEMIC RECORDS & CERTIFICATES:</strong> In accordance with international institutional privacy regulations, all academic records, examination transcripts, and internal graduation certificates are strictly confidential and accessible exclusively by authenticated enrolled students and authorized university administrators. No public search or public verification tool is published.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Harvester’s Theological University (HATHUN). All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              International Head Office: Former Police Control, Ambam-yat, Ambam, South Region, Cameroon
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 text-slate-300 hover:text-white bg-[#0c1f40] rounded border border-slate-700 hover:border-[#d4af37] transition cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
