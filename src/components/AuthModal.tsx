import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { HathunLogo } from './HathunLogo';
import { Lock, GraduationCap, ShieldCheck, X, ArrowRight, UserCheck } from 'lucide-react';

interface AuthModalProps {
  initialTarget?: 'student' | 'admin';
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialTarget = 'student',
  onClose,
  onSuccess
}) => {
  const { loginAsStudent, loginAsAdmin, students } = useUniversity();
  const [tab, setTab] = useState<'student' | 'admin'>(initialTarget);
  const [studentInput, setStudentInput] = useState('HATHUN/2026/0001');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInput.trim()) {
      setErrorMsg('Please enter your Student ID or Email.');
      return;
    }
    const success = loginAsStudent(studentInput);
    if (success) {
      onSuccess();
      onClose();
    } else {
      setErrorMsg('Invalid Student ID or Email. Try the sample student account below.');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded bg-[#071328] border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand */}
        <div className="text-center mb-6">
          <HathunLogo variant="seal" size="md" className="mx-auto mb-2" />
          <h2 className="text-lg font-bold text-white font-heading">
            HARVESTER’S THEOLOGICAL UNIVERSITY
          </h2>
          <p className="text-xs text-[#d4af37] font-semibold">
            Institutional Digital Portals
          </p>
        </div>

        {/* Tabs: Student vs Admin */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#060e1d] rounded-lg mb-6 border border-slate-800 text-xs">
          <button
            onClick={() => {
              setTab('student');
              setErrorMsg('');
            }}
            className={`py-2 rounded font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'student'
                ? 'bg-[#0f2752] text-white shadow border border-[#234b8c]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#d4af37]" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => {
              setTab('admin');
              setErrorMsg('');
            }}
            className={`py-2 rounded font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'admin'
                ? 'bg-[#0f2752] text-white shadow border border-[#234b8c]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Admin Console</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 bg-rose-950/60 border border-rose-700 rounded text-xs text-rose-200">
            {errorMsg}
          </div>
        )}

        {/* Student Login Form */}
        {tab === 'student' ? (
          <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Student ID or Registered Email:
              </label>
              <input
                type="text"
                required
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                placeholder="e.g. HATHUN/2026/0001 or email"
                className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Student Password:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Log In to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Switcher */}
            <div className="pt-4 border-t border-slate-700/80 text-center">
              <span className="text-[11px] text-slate-400 block mb-2">Instant Quick Preview:</span>
              <button
                type="button"
                onClick={() => {
                  loginAsStudent('HATHUN/2026/0001');
                  onSuccess();
                  onClose();
                }}
                className="w-full py-2 bg-[#061024] hover:bg-[#0c1f44] border border-[#1d3d74] text-sky-300 rounded font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Sign In as Sample Student (Emmanuel Mbah)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Admin Login Form */
          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Administrator Username / Email:
              </label>
              <input
                type="text"
                defaultValue="admin@hathun.edu"
                className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Admin Password:
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-gradient-to-r from-[#d4af37] to-[#e6c662] hover:brightness-110 rounded shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enter University Admin Dashboard</span>
            </button>

            <div className="pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 text-center">
              Global Chancellor & Registry Governance Control
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
