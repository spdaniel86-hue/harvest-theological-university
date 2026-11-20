import React, { useState, useMemo } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { 
  Faculty, 
  Programme, 
  Course, 
  Student, 
  AdmissionApplication, 
  AcademicResult, 
  InternalCertificate, 
  BoardMember, 
  AffiliationRecord, 
  NewsArticle, 
  UniversityEvent, 
  GalleryItem, 
  UniversityDocument,
  AcademicLevel
} from '../types';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Calendar, 
  Image, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Printer, 
  Eye, 
  Upload, 
  CheckCircle,
  Building,
  RefreshCw,
  Bell
} from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface AdminDashboardProps {
  onBackToPublic: () => void;
  onViewConfirmationSlip?: (app: AdmissionApplication) => void;
  onViewCertificateModal?: (cert: InternalCertificate) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPublic,
  onViewConfirmationSlip,
  onViewCertificateModal
}) => {
  const {
    faculties,
    programmes,
    courses,
    students,
    applications,
    results,
    certificates,
    boardMembers,
    affiliations,
    news,
    events,
    gallery,
    documents,
    universityInfo,
    logout,
    updateApplicationStatus,
    admitApplicant,
    addFaculty,
    deleteFaculty,
    addProgramme,
    deleteProgramme,
    addCourse,
    deleteCourse,
    addStudent,
    saveResult,
    toggleResultPublishStatus,
    deleteResult,
    issueCertificate,
    deleteCertificate,
    addBoardMember,
    deleteBoardMember,
    addAffiliation,
    deleteAffiliation,
    addNewsArticle,
    deleteNewsArticle,
    addEvent,
    deleteEvent,
    addGalleryItem,
    deleteGalleryItem,
    addDocument,
    deleteDocument,
    resetDataToFactoryDefaults
  } = useUniversity();

  const [activeModule, setActiveModule] = useState<
    | 'overview'
    | 'applications'
    | 'students'
    | 'faculties'
    | 'programmes'
    | 'courses'
    | 'results'
    | 'certificates'
    | 'board'
    | 'affiliations'
    | 'news'
    | 'events'
    | 'gallery'
    | 'documents'
    | 'settings'
  >('overview');

  // Search queries
  const [studentSearch, setStudentSearch] = useState('');
  const [applicationSearch, setApplicationSearch] = useState('');

  // Selected modals or forms
  const [showAddProgrammeModal, setShowAddProgrammeModal] = useState(false);
  const [newProg, setNewProg] = useState({
    name: '',
    facultyName: 'FACULTY OF THEOLOGY',
    level: 'Bachelor' as AcademicLevel,
    duration: '2 Years',
    registrationFee: '$100',
    tuitionFeeNote: 'Very Affordable',
    description: '',
    entryRequirements: 'Secondary or Diploma qualification'
  });

  const [showIssueCertModal, setShowIssueCertModal] = useState(false);
  const [newCert, setNewCert] = useState({
    studentId: '',
    studentName: '',
    programme: 'Biblical Studies',
    faculty: 'FACULTY OF THEOLOGY',
    awardLevel: 'Bachelor' as AcademicLevel,
    dateAwarded: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    chancellorName: 'HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs',
    registrarName: 'Bishop Mrs Azor Loveline Ashia',
    classification: 'Distinction'
  });

  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [newResultData, setNewResultData] = useState({
    studentId: 'HATHUN/2026/0001',
    studentName: 'Emmanuel N. Mbah',
    academicSession: '2026/2027',
    semester: 'Semester 1',
    courseCode: 'TH-BIB-201',
    courseTitle: 'Old Testament Exegesis & Theology',
    creditUnits: 3,
    score: 85,
    remarks: 'Very Good'
  });

  // Filtered Students
  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return students;
    const q = studentSearch.toLowerCase();
    return students.filter(s => 
      s.studentId.toLowerCase().includes(q) ||
      s.fullName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      s.faculty.toLowerCase().includes(q) ||
      s.programme.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    if (!applicationSearch.trim()) return applications;
    const q = applicationSearch.toLowerCase();
    return applications.filter(a => 
      a.referenceNumber.toLowerCase().includes(q) ||
      a.firstName.toLowerCase().includes(q) ||
      a.lastName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.faculty.toLowerCase().includes(q) ||
      a.programme.toLowerCase().includes(q)
    );
  }, [applications, applicationSearch]);

  // KPIs
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const approvedApps = applications.filter(a => a.status === 'Approved').length;
  const totalStudents = students.length;
  const totalProgrammes = programmes.length;
  const totalFaculties = faculties.length;

  const handleCreateProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProg.name) return;
    const fac = faculties.find(f => f.name === newProg.facultyName);
    addProgramme({
      name: newProg.name,
      facultyId: fac?.id || 'fac-theology',
      facultyName: newProg.facultyName,
      level: newProg.level,
      duration: newProg.duration,
      registrationFee: newProg.registrationFee,
      tuitionFeeNote: newProg.tuitionFeeNote,
      description: newProg.description || `${newProg.name} educational curriculum at Harvester’s Theological University.`,
      entryRequirements: newProg.entryRequirements
    });
    setShowAddProgrammeModal(false);
    setNewProg({
      name: '',
      facultyName: 'FACULTY OF THEOLOGY',
      level: 'Bachelor',
      duration: '2 Years',
      registrationFee: '$100',
      tuitionFeeNote: 'Very Affordable',
      description: '',
      entryRequirements: 'Secondary or Diploma qualification'
    });
  };

  const handleIssueCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.studentId || !newCert.studentName) return;
    issueCertificate({
      studentId: newCert.studentId,
      studentName: newCert.studentName,
      programme: newCert.programme,
      faculty: newCert.faculty,
      awardLevel: newCert.awardLevel,
      dateAwarded: newCert.dateAwarded,
      chancellorName: newCert.chancellorName,
      registrarName: newCert.registrarName,
      classification: newCert.classification,
      citation: `Having fulfilled all the academic and moral requirements set forth by the Senate of Harvester's Theological University.`
    });
    setShowIssueCertModal(false);
  };

  const handleAddResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gp = newResultData.score >= 80 ? 4.0 : newResultData.score >= 70 ? 3.5 : 3.0;
    const grade = newResultData.score >= 80 ? 'A' : newResultData.score >= 70 ? 'B+' : 'B';

    saveResult({
      studentId: newResultData.studentId,
      studentName: newResultData.studentName,
      academicSession: newResultData.academicSession,
      semester: newResultData.semester,
      courses: [
        {
          courseCode: newResultData.courseCode,
          courseTitle: newResultData.courseTitle,
          creditUnits: Number(newResultData.creditUnits),
          score: Number(newResultData.score),
          grade: grade,
          gradePoint: gp
        }
      ],
      gpa: gp,
      cgpa: gp,
      totalCreditsEarned: Number(newResultData.creditUnits),
      status: 'Published',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      remarks: newResultData.remarks
    });
    setShowAddResultModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050b17] text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#08152e] border-b border-[#1b396c] sticky top-0 z-30 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HathunLogo variant="horizontal" size="sm" />
            <div className="hidden sm:block h-5 w-[1px] bg-slate-700 mx-1" />
            <span className="hidden sm:inline text-xs font-bold text-[#d4af37] uppercase tracking-wider font-heading">
              UNIVERSITY ADMINISTRATIVE REGISTRY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 hidden md:inline">
              Office of the Global Chancellor & Registrar
            </span>

            <button
              onClick={() => {
                logout();
                onBackToPublic();
              }}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#0e2246] hover:bg-[#153468] border border-slate-700 rounded flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Modules (3 cols) */}
        <aside className="lg:col-span-3">
          <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-3 space-y-1 shadow-lg sticky top-16">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700 mb-2">
              ADMINISTRATION MODULES
            </div>

            <nav className="space-y-0.5 text-xs">
              {[
                { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
                { id: 'applications', label: `APPLICATIONS (${pendingApps})`, icon: FileText },
                { id: 'students', label: `STUDENTS (${students.length})`, icon: Users },
                { id: 'faculties', label: 'FACULTIES', icon: Building },
                { id: 'programmes', label: 'PROGRAMMES', icon: BookOpen },
                { id: 'courses', label: 'COURSES', icon: GraduationCap },
                { id: 'results', label: 'RESULTS MANAGEMENT', icon: Award },
                { id: 'certificates', label: 'INTERNAL CERTIFICATES', icon: ShieldCheck },
                { id: 'board', label: 'BOARD OF DIRECTORS', icon: Users },
                { id: 'affiliations', label: 'AFFILIATIONS & ALLIANCES', icon: Award },
                { id: 'news', label: 'NEWS & NOTICES', icon: Bell },
                { id: 'events', label: 'EVENTS & CALENDAR', icon: Calendar },
                { id: 'gallery', label: 'GALLERY ARCHIVES', icon: Image },
                { id: 'documents', label: 'ACADEMIC DOCUMENTS', icon: FileText },
                { id: 'settings', label: 'INSTITUTIONAL SETTINGS', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id as any)}
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
                onClick={resetDataToFactoryDefaults}
                className="w-full py-1.5 px-2 text-[11px] text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Reset all demo edits back to brochure seed data"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Admin Content Area (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* MODULE: OVERVIEW */}
          {activeModule === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Banner */}
              <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    HATHUN EXECUTIVE CONSOLE
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    “WE ARE A SURE GUIDE TO YOUR DREAM” · Ambam Campus & Global Records
                  </p>
                </div>
                <button
                  onClick={() => setActiveModule('applications')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow cursor-pointer"
                >
                  Review Applications ({pendingApps})
                </button>
              </div>

              {/* Statistical KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Applications</span>
                  <span className="text-2xl font-black text-white font-heading mt-1 block">{totalApps}</span>
                  <span className="text-[11px] text-amber-400 mt-1 block">{pendingApps} pending review</span>
                </div>

                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Approved Admissions</span>
                  <span className="text-2xl font-black text-emerald-400 font-heading mt-1 block">{approvedApps}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Admitted candidates</span>
                </div>

                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Enrolled Students</span>
                  <span className="text-2xl font-black text-white font-heading mt-1 block">{totalStudents}</span>
                  <span className="text-[11px] text-sky-400 mt-1 block">Active student IDs</span>
                </div>

                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Academic Faculties</span>
                  <span className="text-2xl font-black text-[#d4af37] font-heading mt-1 block">{totalFaculties}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">9 Brochure Divisions</span>
                </div>

                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Programmes</span>
                  <span className="text-2xl font-black text-white font-heading mt-1 block">{totalProgrammes}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">Certificate to PhD</span>
                </div>

                <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-4 shadow">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Certificates Issued</span>
                  <span className="text-2xl font-black text-white font-heading mt-1 block">{certificates.length}</span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Strictly Private</span>
                </div>
              </div>

              {/* Recent Applications Feed */}
              <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
                  <h3 className="text-sm font-bold text-white font-heading">
                    RECENT INCOMING ADMISSION APPLICATIONS
                  </h3>
                  <button
                    onClick={() => setActiveModule('applications')}
                    className="text-xs text-[#d4af37] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-3 bg-[#060f22] rounded border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#d4af37] font-bold">{app.referenceNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            app.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-white mt-1">{app.firstName} {app.lastName}</h4>
                        <span className="text-slate-400">{app.programme} ({app.academicLevel}) · {app.country}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {app.status === 'Pending' && (
                          <button
                            onClick={() => admitApplicant(app.id)}
                            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-semibold text-[11px]"
                          >
                            Admit Student
                          </button>
                        )}
                        <button
                          onClick={() => onViewConfirmationSlip && onViewConfirmationSlip(app)}
                          className="px-2.5 py-1 bg-[#0e2752] hover:bg-[#163a78] text-slate-200 rounded text-[11px]"
                        >
                          View Slip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE: APPLICATIONS */}
          {activeModule === 'applications' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    ADMISSIONS APPLICATION REGISTRY
                  </h2>
                  <p className="text-xs text-slate-300">
                    Review and admit online applicants across Certificate to PhD programmes.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, ref, email..."
                    value={applicationSearch}
                    onChange={(e) => setApplicationSearch(e.target.value)}
                    className="w-full bg-[#060f22] border border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 bg-[#060f22] border border-slate-800 rounded-lg text-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#d4af37]">
                          {app.referenceNumber}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          app.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {app.status}
                        </span>
                        {app.assignedStudentId && (
                          <span className="font-mono text-[11px] text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                            Student ID: {app.assignedStudentId}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Submitted: {app.submittedAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-slate-400 block">Applicant Name:</span>
                        <strong className="text-white text-sm">{app.firstName} {app.middleName} {app.lastName}</strong>
                        <p className="text-[11px] text-slate-300 mt-0.5">{app.gender} · {app.dateOfBirth}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 block">Target Programme:</span>
                        <strong className="text-slate-200">{app.programme}</strong>
                        <p className="text-[11px] text-slate-300 mt-0.5">{app.academicLevel} · {app.faculty}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 block">Contact Info:</span>
                        <p className="text-slate-200">{app.email}</p>
                        <p className="text-slate-300">{app.phone}</p>
                        <p className="text-[11px] text-slate-400">{app.city}, {app.country}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#08152e] rounded border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <p><strong>Previous Education:</strong> {app.previousInstitution} — {app.previousQualification} ({app.graduationYear})</p>
                      <p><strong>Attached Documents:</strong> {app.passportPhotoName || 'Photo'}, {app.academicDocumentsName || 'Transcript'}, {app.supportingDocumentsName || 'Recommendation'}</p>
                      {app.personalStatement && (
                        <p className="italic text-slate-400">"{app.personalStatement}"</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        {app.status !== 'Approved' && (
                          <button
                            onClick={() => {
                              const std = admitApplicant(app.id);
                              alert(`Applicant ${app.firstName} ${app.lastName} admitted successfully!\nGenerated Student ID: ${std.studentId}`);
                            }}
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Admit & Generate Student ID</span>
                          </button>
                        )}
                        {app.status === 'Pending' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'Under Review')}
                            className="px-3 py-1.5 bg-[#0e2752] hover:bg-[#163a78] text-slate-200 rounded text-xs"
                          >
                            Mark Under Review
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => onViewConfirmationSlip && onViewConfirmationSlip(app)}
                        className="px-3 py-1.5 bg-[#0e244b] hover:bg-[#153468] text-slate-200 rounded text-xs flex items-center gap-1.5 cursor-pointer border border-slate-700"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Print Official Application Slip</span>
                      </button>
                    </div>
                  </div>
                ))}

                {filteredApplications.length === 0 && (
                  <p className="text-center py-8 text-slate-400 text-xs">
                    No applications found matching your search.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* MODULE: STUDENTS */}
          {activeModule === 'students' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    STUDENT MASTER DIRECTORY
                  </h2>
                  <p className="text-xs text-slate-300">
                    Search students by ID, Name, Email, Phone, Faculty or Programme.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, email..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full bg-[#060f22] border border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-800 rounded">
                  <thead className="bg-[#060f22] text-[#d4af37] uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Student ID</th>
                      <th className="py-2.5 px-3">Full Name</th>
                      <th className="py-2.5 px-3">Programme</th>
                      <th className="py-2.5 px-3">Level</th>
                      <th className="py-2.5 px-3">Faculty</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {filteredStudents.map((std) => (
                      <tr key={std.id} className="hover:bg-[#071328]/60">
                        <td className="py-2.5 px-3 font-mono font-bold text-[#d4af37]">{std.studentId}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">{std.fullName}</td>
                        <td className="py-2.5 px-3">{std.programme}</td>
                        <td className="py-2.5 px-3">{std.academicLevel}</td>
                        <td className="py-2.5 px-3 text-slate-400">{std.faculty.replace('FACULTY OF ', '')}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                            {std.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setNewCert({
                                ...newCert,
                                studentId: std.studentId,
                                studentName: std.fullName,
                                programme: std.programme,
                                faculty: std.faculty,
                                awardLevel: std.academicLevel
                              });
                              setShowIssueCertModal(true);
                            }}
                            className="px-2.5 py-1 bg-[#0e2752] hover:bg-[#163a78] text-[#d4af37] border border-[#234b8c] rounded text-[11px]"
                          >
                            Issue Certificate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: PROGRAMMES */}
          {activeModule === 'programmes' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    PROGRAMME & CURRICULUM MANAGEMENT
                  </h2>
                  <p className="text-xs text-slate-300">
                    Add and manage degree and diploma offerings across all 9 faculties.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProgrammeModal(true)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Programme</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programmes.map((p) => (
                  <div key={p.id} className="p-4 bg-[#060f22] border border-slate-800 rounded-lg flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sky-400 font-semibold">{p.facultyName}</span>
                        <span className="font-bold text-[#d4af37]">{p.level}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading mb-1">{p.name}</h4>
                      <p className="text-slate-300 line-clamp-2 mb-2">{p.description}</p>
                      <div className="text-slate-400 text-[11px]">
                        Duration: {p.duration} · Reg Fee: {p.registrationFee}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Delete programme "${p.name}"?`)) deleteProgramme(p.id);
                        }}
                        className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: INTERNAL CERTIFICATES */}
          {activeModule === 'certificates' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    INTERNAL CERTIFICATE REGISTRY
                  </h2>
                  <p className="text-xs text-slate-300">
                    Confer and manage private academic certificates for graduated students.
                  </p>
                </div>

                <button
                  onClick={() => setShowIssueCertModal(true)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Confer New Certificate</span>
                </button>
              </div>

              {/* Strict Notice */}
              <div className="p-3 bg-[#060f22] border border-[#1b3d72] rounded text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>
                  <strong>Strict Internal Privacy:</strong> Certificates are recorded in the internal database only and are accessible solely by authenticated students and university administrators. No public search or public verification tool is active.
                </span>
              </div>

              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-[#060f22] border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-[#d4af37] text-sm">{cert.certificateNumber}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {cert.awardLevel} Conferred
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading">{cert.programme}</h4>
                      <p className="text-slate-300 mt-0.5">Awarded to: <strong>{cert.studentName}</strong> (ID: {cert.studentId})</p>
                      <p className="text-[11px] text-slate-400">Date: {cert.dateAwarded} · Chancellor: {cert.chancellorName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewCertificateModal && onViewCertificateModal(cert)}
                        className="px-3 py-1.5 bg-[#0e2752] hover:bg-[#163a78] text-white rounded flex items-center gap-1.5 cursor-pointer border border-[#234b8c]"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Print Official Certificate</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete certificate ${cert.certificateNumber}?`)) deleteCertificate(cert.id);
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                        title="Delete Certificate Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: RESULTS */}
          {activeModule === 'results' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    ACADEMIC RESULTS & TRANSCRIPTS
                  </h2>
                  <p className="text-xs text-slate-300">
                    Grade entry, GPA calculation, and publication controls.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddResultModal(true)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enter Student Score</span>
                </button>
              </div>

              <div className="space-y-4">
                {results.map((res) => (
                  <div key={res.id} className="p-4 bg-[#060f22] border border-slate-800 rounded-lg text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[#d4af37] font-bold">{res.studentId}</span>
                        <strong className="text-white ml-2 text-sm">{res.studentName}</strong>
                        <span className="text-slate-400 ml-2">({res.academicSession} · {res.semester})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleResultPublishStatus(res.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                            res.status === 'Published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {res.status === 'Published' ? 'Published to Student' : 'Draft (Unpublished)'}
                        </button>
                        <button
                          onClick={() => deleteResult(res.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-800 border-t border-slate-800 pt-2">
                      {res.courses.map((c, i) => (
                        <div key={i} className="py-1.5 flex items-center justify-between text-slate-300">
                          <span>{c.courseCode} — {c.courseTitle} ({c.creditUnits} Units)</span>
                          <span className="font-semibold text-white">Score: {c.score}% | Grade: {c.grade} ({c.gradePoint})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: BOARD OF DIRECTORS */}
          {activeModule === 'board' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    BOARD OF DIRECTORS & COUNCIL
                  </h2>
                  <p className="text-xs text-slate-300">
                    Add or update governing officers (Chancellor, Registrar, Vice Chancellor, Deans).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {boardMembers.map((bm) => (
                  <div key={bm.id} className="p-4 bg-[#060f22] border border-slate-800 rounded-lg flex gap-4 text-xs">
                    <img
                      src={bm.photoUrl}
                      alt={bm.name}
                      className="w-16 h-16 rounded object-cover border border-[#d4af37]"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white font-heading">{bm.name}</h4>
                      <p className="text-[#d4af37] font-semibold">{bm.position}</p>
                      <p className="text-slate-400 text-[11px]">{bm.country}</p>
                      <p className="text-slate-300 line-clamp-2 mt-1">{bm.biography}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: AFFILIATIONS */}
          {activeModule === 'affiliations' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  ACCREDITATION & ALLIANCES REGISTRY
                </h2>
                <p className="text-xs text-slate-300">
                  Institutional relationships from the official brochure.
                </p>
              </div>

              <div className="space-y-3">
                {affiliations.map((aff) => (
                  <div key={aff.id} className="p-4 bg-[#060f22] border border-slate-800 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-heading">{aff.organization}</h4>
                      <span className="text-sky-400 font-semibold">{aff.relationshipType}</span>
                    </div>
                    <p className="text-slate-300">{aff.description}</p>
                    <p className="text-[11px] text-slate-400">{aff.officialNote}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: SETTINGS */}
          {activeModule === 'settings' && (
            <div className="bg-[#091834] border border-[#1a3869] rounded-lg p-6 shadow-xl animate-fadeIn space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-xl font-bold text-white font-heading">
                  INSTITUTIONAL SETTINGS & POLICIES
                </h2>
                <p className="text-xs text-slate-300">
                  Official university identity, headquarters location, and compliance enforcement.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#060f22] rounded border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-heading text-xs uppercase tracking-wider">
                    Official Head Office
                  </h4>
                  <p className="text-slate-300"><strong>Address:</strong> Former Police Control, Ambam-yat, Ambam, South Region, Cameroon</p>
                  <p className="text-slate-300"><strong>Email:</strong> admissions@hathun.edu / info@hathun.edu</p>
                  <p className="text-slate-300"><strong>Phone:</strong> {universityInfo.headOffice.phone}</p>
                </div>

                <div className="p-4 bg-[#060f22] rounded border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-heading text-xs uppercase tracking-wider text-[#d4af37]">
                    Zero-Payment Gateway Enforcement
                  </h4>
                  <p className="text-slate-300">
                    Website payment processing is permanently disabled in code per charter instructions. Registration and tuition fee notices state: “Please contact the University Admissions Office for payment instructions.”
                  </p>
                </div>

                <div className="p-4 bg-[#060f22] rounded border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-heading text-xs uppercase tracking-wider text-sky-400">
                    Zero-Public Verification Enforcement
                  </h4>
                  <p className="text-slate-300">
                    Public search of certificates and student records is strictly disabled. Certificates and transcripts are internal to authenticated student profiles and the administrative registry.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Programme */}
      {showAddProgrammeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-lg w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white font-heading">Add Academic Programme</h3>
              <button onClick={() => setShowAddProgrammeModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProgramme} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Programme Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Divinity"
                  value={newProg.name}
                  onChange={(e) => setNewProg({ ...newProg, name: e.target.value })}
                  className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Faculty</label>
                  <select
                    value={newProg.facultyName}
                    onChange={(e) => setNewProg({ ...newProg, facultyName: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  >
                    {faculties.map((f) => (
                      <option key={f.id} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Academic Level</label>
                  <select
                    value={newProg.level}
                    onChange={(e) => setNewProg({ ...newProg, level: e.target.value as AcademicLevel })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma (2 Years)</option>
                    <option value="Bachelor">Bachelor (2 Years)</option>
                    <option value="Master’s">Master’s (1 Year)</option>
                    <option value="PhD">PhD (3 Years)</option>
                    <option value="Honorary Doctorate">Honorary Doctorate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newProg.duration}
                    onChange={(e) => setNewProg({ ...newProg, duration: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Registration Fee</label>
                  <input
                    type="text"
                    value={newProg.registrationFee}
                    onChange={(e) => setNewProg({ ...newProg, registrationFee: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProg.description}
                  onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
                  placeholder="Overview of the course..."
                  className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowAddProgrammeModal(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-[#060e1d] bg-[#d4af37] rounded"
                >
                  Save Programme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Certificate */}
      {showIssueCertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-lg w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white font-heading">Confer Internal Certificate</h3>
              <button onClick={() => setShowIssueCertModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Student ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HATHUN/2026/0001"
                    value={newCert.studentId}
                    onChange={(e) => setNewCert({ ...newCert, studentId: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emmanuel N. Mbah"
                    value={newCert.studentName}
                    onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Conferred Programme</label>
                  <input
                    type="text"
                    required
                    value={newCert.programme}
                    onChange={(e) => setNewCert({ ...newCert, programme: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Award Level</label>
                  <select
                    value={newCert.awardLevel}
                    onChange={(e) => setNewCert({ ...newCert, awardLevel: e.target.value as AcademicLevel })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master’s">Master’s</option>
                    <option value="PhD">PhD</option>
                    <option value="Honorary Doctorate">Honorary Doctorate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Classification / Honors</label>
                  <input
                    type="text"
                    value={newCert.classification}
                    onChange={(e) => setNewCert({ ...newCert, classification: e.target.value })}
                    placeholder="e.g. Distinction / First Class"
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Date Awarded</label>
                  <input
                    type="text"
                    value={newCert.dateAwarded}
                    onChange={(e) => setNewCert({ ...newCert, dateAwarded: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#060e1d] rounded border border-slate-800 text-[11px] text-slate-400">
                Authorized Signatories: Founder and Global Chancellor HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs & Registrar and co-founder Bishop Mrs Azor Loveline Ashia.
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowIssueCertModal(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-[#060e1d] bg-[#d4af37] rounded"
                >
                  Confer Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Enter Score */}
      {showAddResultModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1a36] border border-[#1e3c74] rounded-lg max-w-lg w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white font-heading">Record Academic Result</h3>
              <button onClick={() => setShowAddResultModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddResultSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Student ID *</label>
                  <input
                    type="text"
                    required
                    value={newResultData.studentId}
                    onChange={(e) => setNewResultData({ ...newResultData, studentId: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={newResultData.studentName}
                    onChange={(e) => setNewResultData({ ...newResultData, studentName: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={newResultData.courseCode}
                    onChange={(e) => setNewResultData({ ...newResultData, courseCode: e.target.value })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Score (0-100) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    max={100}
                    value={newResultData.score}
                    onChange={(e) => setNewResultData({ ...newResultData, score: Number(e.target.value) })}
                    className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newResultData.courseTitle}
                  onChange={(e) => setNewResultData({ ...newResultData, courseTitle: e.target.value })}
                  className="w-full bg-[#060f22] border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowAddResultModal(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-[#060e1d] bg-[#d4af37] rounded"
                >
                  Publish Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
