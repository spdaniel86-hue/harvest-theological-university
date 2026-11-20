import React, { useState, useEffect } from 'react';
import { HathunLogo } from './HathunLogo';
import { useUniversity } from '../context/UniversityContext';
import { 
  Menu, 
  X, 
  UserCheck, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Lock,
  Bot,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onOpenAdmissions: () => void;
  onOpenPortal: (target: 'student' | 'admin') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAIAssistant: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmissions,
  onOpenPortal,
  onNavigateSection,
  onOpenAIAssistant,
  activeSection
}) => {
  const { role, currentStudent, logout } = useUniversity();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'ACADEMICS', id: 'academics' },
    { label: 'PROGRAMMES', id: 'programmes' },
    { label: 'FACULTIES', id: 'faculties' },
    { label: 'ADMISSIONS', id: 'admissions' },
    { label: 'ACCREDITATION', id: 'accreditation' },
    { label: 'BOARD OF DIRECTORS', id: 'board' },
    { label: 'GALLERY', id: 'gallery' },
    { label: 'DOCUMENT CENTRE', id: 'documents' },
    { label: 'NEWS', id: 'news' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      {/* Top Institutional Notification Bar */}
      <div className="bg-[#040813] border-b border-[#142646] text-xs text-slate-300 py-1.5 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
              Ambam, South Region, Cameroon
            </span>
            <a
              href="https://wa.me/237672929067"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
              title="Official Admissions WhatsApp Desk"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: +237672929067</span>
            </a>
            <span className="text-[#d4af37] font-medium tracking-wide hidden xl:inline">
              “WE ARE A SURE GUIDE TO YOUR DREAM”
            </span>
          </div>
          <div className="flex items-center gap-4">
            {role === 'public' ? (
              <button
                onClick={() => onOpenPortal('admin')}
                className="text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                title="University Staff & Admin Login"
              >
                <Lock className="w-3 h-3 text-[#c59b27]" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Logged in as {role === 'admin' ? 'University Admin' : currentStudent?.fullName}
                </span>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-400 transition text-xs underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060e1d]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-[#1c335a]'
            : 'bg-[#071328]/90 backdrop-blur-sm py-4 border-b border-[#142646]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27] cursor-pointer"
          >
            <HathunLogo variant="horizontal" size={isScrolled ? 'sm' : 'md'} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-[#d4af37] font-bold'
                      : 'text-slate-200 hover:text-[#d4af37]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {role === 'student' ? (
              <button
                onClick={() => onOpenPortal('student')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f2a58] hover:bg-[#163b78] border border-[#2b4c84] rounded-md transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
                Student Portal
              </button>
            ) : role === 'admin' ? (
              <button
                onClick={() => onOpenPortal('admin')}
                className="px-3.5 py-2 text-xs font-semibold text-[#d4af37] bg-[#0c1e3d] hover:bg-[#122b54] border border-[#d4af37]/40 rounded-md transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => onOpenPortal('student')}
                className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#0e2246] hover:bg-[#142f5e] border border-[#1e3c74] rounded-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
                STUDENT PORTAL
              </button>
            )}

            <button
              onClick={onOpenAIAssistant}
              className="px-3 py-2 text-xs font-semibold text-[#d4af37] hover:text-white bg-[#0a1f42] hover:bg-[#123166] border border-[#d4af37]/60 rounded-md transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open AI Academic Guide"
            >
              <Bot className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>AI GUIDE</span>
            </button>

            <button
              onClick={onOpenAdmissions}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-gradient-to-r from-[#d4af37] to-[#e6c662] hover:from-[#c59b27] hover:to-[#d4af37] rounded-md shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              APPLY NOW
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenAdmissions}
              className="sm:hidden px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] rounded"
            >
              APPLY
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white rounded-md bg-[#0e2246] border border-[#1e3c74] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#071328] border-b border-[#1d355d] px-4 pt-3 pb-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-1.5 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between py-2 px-3 text-xs font-semibold rounded text-left tracking-wider ${
                    activeSection === item.id
                      ? 'bg-[#12284f] text-[#d4af37] border-l-2 border-[#d4af37]'
                      : 'text-slate-200 hover:bg-[#0c1f40]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#162e58] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIAssistant();
                }}
                className="w-full py-2.5 px-3 text-xs font-bold text-center text-[#d4af37] bg-[#0c224a] border border-[#d4af37]/60 rounded flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Bot className="w-4 h-4 text-[#d4af37]" />
                ASK HATHUN AI ACADEMIC ASSISTANT
              </button>

              <a
                href="https://wa.me/237672929067"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 text-xs font-semibold text-center text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 rounded flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                CHAT ON WHATSAPP: +237672929067
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal('student');
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-center text-slate-100 bg-[#0e244d] border border-[#21437c] rounded flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#d4af37]" />
                STUDENT PORTAL
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal('admin');
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-center text-[#d4af37] bg-[#081733] border border-[#d4af37]/30 rounded flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                ADMIN DASHBOARD
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded text-center shadow"
              >
                APPLY FOR ADMISSION
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
