import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { Student, AcademicResult, InternalCertificate } from '../types';
import { 
  User, 
  BookOpen, 
  Layers, 
  FileText, 
  Award, 
  Calendar, 
  Bell, 
  HelpCircle, 
  Download, 
  Printer, 
  LogOut, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FolderDown,
  X,
  FileCheck
} from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface StudentPortalProps {
  onBackToPublic: () => void;
  onViewCertificateModal?: (cert: InternalCertificate) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  onBackToPublic,
  onViewCertificateModal
}) => {
  const { 
    currentStudent, 
    results, 
    certificates, 
    courses, 
    events, 
    news, 
    documents, 
    logout 
  } = useUniversity();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'programme' | 'courses' | 'materials' | 'assignments' | 'exams' | 'results' | 'calendar' | 'announcements' | 'documents' | 'certificates' | 'support'
  >('profile');

  // Filter student-specific data
  const studentResults = results.filter(
    r => r.studentId === currentStudent?.studentId && r.status === 'Published'
  );

  const studentCertificates = certificates.filter(
    c => c.studentId === currentStudent?.studentId
  );

  const studentCourses = courses.filter(
    c => c.level === currentStudent?.academicLevel || c.facultyId === 'fac-theology'
  );

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-[#060e1d] flex items-center justify-center p-4">
        <div className="bg-[#0b1b38] border border-slate-700 rounded-lg p-8 max-w-md w-full text-center">
          <GraduationCap className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white font-heading mb-2">Student Session Expired</h2>
          <p className="text-xs text-slate-300 mb-6">
            Please log in with your official HATHUN Student ID or registered email.
          </p>
          <button
            onClick={onBackToPublic}
            className="w-full py-2.5 text-xs font-bold uppercase text-[#060e1d] bg-[#d4af37] rounded"
          >
            Return to Portal Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1b] text-slate-100 flex flex-col">
      {/* Top Portal App Header */}
      <header className="bg-[#08152e] border-b border-[#1b396c] sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToPublic} className="cursor-pointer">
              <HathunLogo variant="horizontal" size="sm" />
            </button>
            <div className="hidden sm:block h-5 w-[1px] bg-slate-700 mx-1" />
            <span className="hidden sm:inline text-xs font-bold text-sky-400 uppercase tracking-wider font-heading">
              STUDENT INTRANET PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.fullName}
                className="w-8 h-8 rounded-full object-cover border border-[#d4af37]"
              />
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentStudent.fullName}
                </span>
                <span className="text-[11px] font-mono text-[#d4af37]">
                  {currentStudent.studentId}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                onBackToPublic();
              }}
              className="p-2 text-slate-400 hover:text-rose-400 transition rounded hover:bg-white/5 cursor-pointer"
              title="Sign Out of Student Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (3 cols) */}
        <aside className="lg:col-span-3">
          <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 space-y-1 shadow-lg sticky top-20">
            {/* Student Mini Profile Summary */}
            <div className="pb-4 mb-3 border-b border-slate-700/80 text-center">
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37] mx-auto mb-2"
              />
              <h3 className="text-sm font-bold text-white font-heading">
                {currentStudent.fullName}
              </h3>
              <p className="text-xs text-[#d4af37] font-mono mt-0.5">
                {currentStudent.studentId}
              </p>
              <span className="text-[10px] text-slate-300 bg-[#060e1d] px-2 py-0.5 rounded mt-2 inline-block border border-slate-700">
                {currentStudent.academicLevel} · {currentStudent.faculty.replace('FACULTY OF ', '')}
              </span>
            </div>

            {/* Navigation Tab Links */}
            <nav className="space-y-1 text-xs">
              {[
                { id: 'profile', label: 'MY PROFILE', icon: User },
                { id: 'programme', label: 'MY PROGRAMME', icon: Layers },
                { id: 'courses', label: 'MY COURSES', icon: BookOpen },
                { id: 'materials', label: 'COURSE MATERIALS', icon: FolderDown },
                { id: 'assignments', label: 'ASSIGNMENTS', icon: FileCheck },
                { id: 'exams', label: 'EXAMINATIONS', icon: Clock },
                { id: 'results', label: 'RESULTS & TRANSCRIPT', icon: Award },
                { id: 'calendar', label: 'ACADEMIC CALENDAR', icon: Calendar },
                { id: 'announcements', label: 'ANNOUNCEMENTS', icon: Bell },
                { id: 'documents', label: 'DOCUMENTS & FORMS', icon: FileText },
                { id: 'certificates', label: 'INTERNAL CERTIFICATES', icon: ShieldCheck },
                { id: 'support', label: 'STUDENT SUPPORT', icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition font-semibold cursor-pointer ${
                      isActive
                        ? 'bg-[#122a56] text-[#d4af37] border-l-2 border-[#d4af37]'
                        : 'text-slate-300 hover:bg-[#071328] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 mt-3 border-t border-slate-800">
              <button
                onClick={onBackToPublic}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white"
              >
                Back to Public University Site
              </button>
            </div>
          </div>
        </aside>

        {/* Content Panel (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    STUDENT OFFICIAL PROFILE
                  </h2>
                  <p className="text-xs text-slate-300">
                    Verified Academic Dossier · Harvester’s Theological University
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-700/50">
                  Status: {currentStudent.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="bg-[#060f22] p-4 rounded border border-slate-800 text-center">
                  <img
                    src={currentStudent.avatarUrl}
                    alt={currentStudent.fullName}
                    className="w-28 h-28 rounded object-cover border-2 border-[#d4af37] mx-auto mb-3 shadow"
                  />
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    Official Passport Photo
                  </span>
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-[#d4af37] block font-bold">
                      {currentStudent.studentId}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Enrolled: {currentStudent.admissionYear}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-xs block">Full Student Name:</span>
                      <strong className="text-white text-base font-heading">{currentStudent.fullName}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Official Student ID:</span>
                      <strong className="text-[#d4af37] font-mono text-sm">{currentStudent.studentId}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-xs block">Academic Faculty:</span>
                      <strong className="text-slate-200">{currentStudent.faculty}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Enrolled Programme:</span>
                      <strong className="text-slate-200">{currentStudent.programme}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-xs block">Academic Level:</span>
                      <strong className="text-slate-200">{currentStudent.academicLevel}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Current Session & Semester:</span>
                      <strong className="text-slate-200">{currentStudent.admissionYear}/{Number(currentStudent.admissionYear) + 1} · {currentStudent.currentSemester}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-xs block">Official Email:</span>
                      <strong className="text-sky-300 font-mono text-xs">{currentStudent.email}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Telephone Contact:</span>
                      <strong className="text-slate-200">{currentStudent.phone}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Standing */}
              <div className="p-4 bg-[#071328] border border-[#193769] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-white font-heading">Current Cumulative Performance</h4>
                  <p className="text-slate-300">Cumulative Grade Point Average (CGPA): <strong className="text-[#d4af37] text-sm">{currentStudent.cgpa || 3.82} / 4.00</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200 font-medium">In Good Academic & Moral Standing</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Programme */}
          {activeTab === 'programme' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  MY PROGRAMME & CURRICULUM
                </h2>
                <p className="text-xs text-slate-300">
                  {currentStudent.programme} ({currentStudent.academicLevel})
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  You are registered under the <strong>{currentStudent.faculty}</strong> at Harvester’s Theological University. Your study program is designed to deliver rigorous academic grounding and Christian leadership training.
                </p>

                <div className="p-4 bg-[#060f22] border border-slate-800 rounded">
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading mb-2">
                    Degree Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Level</span>
                      <span className="font-semibold text-white">{currentStudent.academicLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Standard Duration</span>
                      <span className="font-semibold text-white">2 Years</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Credit Units Required</span>
                      <span className="font-semibold text-white">60 Units</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Enrollment Status</span>
                      <span className="font-semibold text-emerald-400">Active</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading mb-3">
                    Core Curricular Modules
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2 p-2.5 bg-[#071328] rounded border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Biblical Hermeneutics & Exegetical Methodology (3 Credit Units)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-[#071328] rounded border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Ecclesiastical Administration & Church Governance (3 Credit Units)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-[#071328] rounded border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Cross-Cultural Missiology & Church Planting (3 Credit Units)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-[#071328] rounded border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Pastoral Theology & Christian Ethics (3 Credit Units)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Courses */}
          {activeTab === 'courses' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    MY ENROLLED COURSES
                  </h2>
                  <p className="text-xs text-slate-300">
                    Semester 1 Registered Modules
                  </p>
                </div>
                <span className="text-xs text-[#d4af37] font-mono">Total: 4 Courses / 12 Credits</span>
              </div>

              <div className="space-y-4">
                {studentCourses.map((crs) => (
                  <div
                    key={crs.id}
                    className="p-4 bg-[#071328] border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#d4af37]">
                          {crs.code}
                        </span>
                        <span className="text-[10px] text-sky-400 font-semibold uppercase">
                          {crs.credits} Credit Units
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading">
                        {crs.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Lecturer: {crs.lecturerName} · {crs.semester}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Accessing syllabus and lecture notes for ${crs.code}.`)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0e2752] hover:bg-[#163a78] border border-[#21437c] rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>View Syllabus</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Course Materials */}
          {activeTab === 'materials' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  COURSE MATERIALS & LECTURE NOTES
                </h2>
                <p className="text-xs text-slate-300">
                  Official study modules, lecture handouts, and recommended theological reading.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Old Testament Exegesis Lecture Notes - Weeks 1-6", code: "TH-BIB-201", size: "2.1 MB", date: "Sept 2026" },
                  { title: "Church Governance & Legal Frameworks Reader", code: "TH-ADM-202", size: "3.4 MB", date: "Sept 2026" },
                  { title: "Global Missiological Case Studies Compendium", code: "TH-MIS-301", size: "1.8 MB", date: "Sept 2026" },
                  { title: "Principles of Biblical Hermeneutics Study Manual", code: "TH-HER-101", size: "4.2 MB", date: "Aug 2026" },
                ].map((mat, idx) => (
                  <div key={idx} className="p-3.5 bg-[#071328] border border-slate-800 rounded flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FolderDown className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{mat.title}</h4>
                        <span className="text-[10px] text-slate-400">{mat.code} · {mat.size} · Uploaded {mat.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading material: ${mat.title}`)}
                      className="px-3 py-1 text-xs text-slate-200 bg-[#0e244b] hover:bg-[#153468] rounded border border-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Assignments */}
          {activeTab === 'assignments' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  ASSIGNMENTS & CONTINUOUS ASSESSMENTS
                </h2>
                <p className="text-xs text-slate-300">
                  Semester 1 Assignment Submissions & Deadlines
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#071328] border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#d4af37] font-bold">TH-BIB-201</span>
                    <span className="text-emerald-400 font-semibold">Submitted & Graded: 28/30</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Exegesis of Isaiah 53 in Theological Context
                  </h4>
                  <p className="text-slate-300">
                    A 2,500-word scholarly commentary analyzing the Messianic servant songs and ancient linguistic nuances.
                  </p>
                </div>

                <div className="p-4 bg-[#071328] border border-amber-600/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#d4af37] font-bold">TH-ADM-202</span>
                    <span className="text-amber-400 font-semibold">Due in 14 Days</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Comparative Study of Ecclesiastical Constitution & Trust Deeds
                  </h4>
                  <p className="text-slate-300 mb-3">
                    Draft a comprehensive administrative protocol for a multi-campus church organization in Africa.
                  </p>
                  <button
                    onClick={() => alert("Upload assignment interface opened.")}
                    className="px-3 py-1.5 text-xs font-semibold text-[#060e1d] bg-[#d4af37] rounded"
                  >
                    Submit Assignment File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Examinations */}
          {activeTab === 'exams' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  EXAMINATION SCHEDULE
                </h2>
                <p className="text-xs text-slate-300">
                  Official Timetable for Semester 1 Examinations
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#060f22] text-[#d4af37] uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Course</th>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Venue</th>
                      <th className="py-2.5 px-3">Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Nov 28, 2026</td>
                      <td className="py-2.5 px-3">TH-BIB-201: Old Testament Exegesis</td>
                      <td className="py-2.5 px-3">09:00 AM</td>
                      <td className="py-2.5 px-3">Hall A / Online Proctored</td>
                      <td className="py-2.5 px-3 text-sky-400">Written & Oral</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Dec 01, 2026</td>
                      <td className="py-2.5 px-3">TH-ADM-202: Ecclesiastical Administration</td>
                      <td className="py-2.5 px-3">09:00 AM</td>
                      <td className="py-2.5 px-3">Hall A / Online Proctored</td>
                      <td className="py-2.5 px-3 text-sky-400">Written Exam</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Dec 04, 2026</td>
                      <td className="py-2.5 px-3">TH-MIS-301: Cross-Cultural Missiology</td>
                      <td className="py-2.5 px-3">01:00 PM</td>
                      <td className="py-2.5 px-3">Hall B / Online Proctored</td>
                      <td className="py-2.5 px-3 text-sky-400">Comprehensive Defense</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: Results (Private & Secure, Authenticated Student Only) */}
          {activeTab === 'results' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    OFFICIAL STATEMENT OF RESULTS
                  </h2>
                  <p className="text-xs text-slate-300">
                    Private & Confidential Academic Transcript
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0e2752] hover:bg-[#153a78] border border-[#21437c] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Print Result Slip</span>
                </button>
              </div>

              {studentResults.length > 0 ? (
                studentResults.map((res) => (
                  <div key={res.id} className="space-y-4">
                    <div className="bg-[#071328] p-4 rounded border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Session & Semester:</span>
                        <strong className="text-white text-sm">{res.academicSession} · {res.semester}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Grade Point Average (GPA):</span>
                        <strong className="text-[#d4af37] text-base">{res.gpa.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Cumulative GPA:</span>
                        <strong className="text-emerald-400 text-base">{res.cgpa.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Published Date:</span>
                        <strong className="text-slate-300">{res.publishedDate}</strong>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border border-slate-800 rounded">
                        <thead className="bg-[#060f22] text-[#d4af37] uppercase text-[10px] tracking-wider border-b border-slate-700">
                          <tr>
                            <th className="py-2.5 px-3">Course Code</th>
                            <th className="py-2.5 px-3">Course Title</th>
                            <th className="py-2.5 px-3">Units</th>
                            <th className="py-2.5 px-3">Score</th>
                            <th className="py-2.5 px-3">Grade</th>
                            <th className="py-2.5 px-3">Grade Point</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-200">
                          {res.courses.map((c, i) => (
                            <tr key={i} className="hover:bg-[#071328]/60">
                              <td className="py-2.5 px-3 font-mono font-semibold text-[#d4af37]">{c.courseCode}</td>
                              <td className="py-2.5 px-3">{c.courseTitle}</td>
                              <td className="py-2.5 px-3">{c.creditUnits}</td>
                              <td className="py-2.5 px-3 font-semibold">{c.score}%</td>
                              <td className="py-2.5 px-3 font-bold text-white">{c.grade}</td>
                              <td className="py-2.5 px-3">{c.gradePoint.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-[#060e1d] rounded border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                      <span>Remarks: <strong>{res.remarks}</strong></span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified by Registrar
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-[#071328] rounded border border-slate-800 text-slate-400 text-xs">
                  No published results recorded for this session yet. Please check back after semester grading concludes.
                </div>
              )}
            </div>
          )}

          {/* TAB 8: Internal Certificates (Strictly Private) */}
          {activeTab === 'certificates' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  INTERNAL ACADEMIC CERTIFICATES
                </h2>
                <p className="text-xs text-slate-300">
                  Official certificates conferred by Harvester's Theological University Senate.
                </p>
              </div>

              {/* Private notice */}
              <div className="p-3 bg-[#060f22] border border-[#16356c] rounded text-xs text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Private Certificate Notice:</strong> Your certificate is tied to your student account and is strictly private. In accordance with university policy, no public verification or public search tool is published.
                </p>
              </div>

              <div className="space-y-4">
                {studentCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-[#0b2149] border-2 border-[#d4af37]/60 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#d4af37]">
                          {cert.certificateNumber}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                          {cert.awardLevel} Conferred
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-heading">
                        {cert.programme}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Awarded on {cert.dateAwarded} · Classification: <strong>{cert.classification || 'Merit'}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400 italic mt-0.5">
                        Presiding Chancellor: {cert.chancellorName}
                      </p>
                    </div>

                    <button
                      onClick={() => onViewCertificateModal && onViewCertificateModal(cert)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>View & Print Certificate</span>
                    </button>
                  </div>
                ))}

                {studentCertificates.length === 0 && (
                  <div className="p-8 text-center bg-[#071328] rounded border border-slate-800 text-slate-400 text-xs">
                    No certificate has been issued for your profile yet. Certificates are conferred upon successful completion of your academic curriculum.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: Calendar */}
          {activeTab === 'calendar' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  ACADEMIC CALENDAR 2026/2027
                </h2>
                <p className="text-xs text-slate-300">
                  Key Institutional Semesters and Dates
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {events.map((ev) => (
                  <div key={ev.id} className="p-3.5 bg-[#071328] border border-slate-800 rounded flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-sky-400 font-semibold block">{ev.date}</span>
                      <strong className="text-white text-sm font-heading">{ev.title}</strong>
                      <p className="text-slate-400 mt-0.5">{ev.venue}</p>
                    </div>
                    <span className="text-xs text-[#d4af37] font-semibold">{ev.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: Announcements */}
          {activeTab === 'announcements' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  UNIVERSITY ANNOUNCEMENTS & NOTICES
                </h2>
                <p className="text-xs text-slate-300">
                  Direct Circulars from the Office of the Registrar
                </p>
              </div>

              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="p-4 bg-[#071328] border border-slate-800 rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sky-400 font-semibold">{item.category}</span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white font-heading">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.content}</p>
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-800">
                      Dispatched by: {item.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: Documents */}
          {activeTab === 'documents' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  STUDENT FORMS & REGULATIONS
                </h2>
                <p className="text-xs text-slate-300">
                  Download institutional forms and official guides
                </p>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3.5 bg-[#071328] border border-slate-800 rounded flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                      <span className="text-[10px] text-slate-400">{doc.category} · {doc.fileSize}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading student document: ${doc.title}`)}
                      className="px-3 py-1 text-xs text-slate-200 bg-[#0e244b] rounded border border-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: Support */}
          {activeTab === 'support' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 sm:p-8 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  STUDENT ACADEMIC & PASTORAL SUPPORT
                </h2>
                <p className="text-xs text-slate-300">
                  Registry Assistance, Academic Advising, and Pastoral Care
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#071328] border border-slate-800 rounded">
                  <h4 className="font-bold text-white font-heading mb-1">Academic Registry Desk</h4>
                  <p className="text-slate-300">Email: admissions@hathun.edu</p>
                  <p className="text-slate-300 mt-1">Telephone: +237 672 929 067</p>
                  <a
                    href="https://wa.me/237672929067"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold mt-2"
                  >
                    <span>Direct WhatsApp: +237672929067</span>
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">Hours: Mon-Fri 8:00 AM – 5:00 PM</p>
                </div>

                <div className="p-4 bg-[#071328] border border-slate-800 rounded">
                  <h4 className="font-bold text-white font-heading mb-1">Ambam Campus Registry</h4>
                  <p className="text-slate-300">Former Police Control, Ambam-yat, Ambam, South Region, Cameroon</p>
                  <p className="text-[11px] text-[#d4af37] mt-2">Personal counselling appointments available upon request.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
