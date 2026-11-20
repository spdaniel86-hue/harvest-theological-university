import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Faculty,
  Programme,
  Course,
  BoardMember,
  AffiliationRecord,
  NewsArticle,
  UniversityEvent,
  UniversityDocument,
  GalleryItem,
  Student,
  AcademicResult,
  InternalCertificate,
  AdmissionApplication,
  AcademicLevel
} from '../types';
import {
  INITIAL_FACULTIES,
  INITIAL_PROGRAMMES,
  INITIAL_COURSES,
  INITIAL_BOARD_MEMBERS,
  INITIAL_AFFILIATIONS,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_DOCUMENTS,
  INITIAL_GALLERY,
  INITIAL_STUDENT,
  INITIAL_RESULTS,
  INITIAL_CERTIFICATES,
  INITIAL_APPLICATIONS,
  UNIVERSITY_INFO
} from '../data/universityData';
import {
  supabase,
  mapFacultyFromDb,
  mapFacultyToDb,
  mapProgrammeFromDb,
  mapProgrammeToDb,
  mapCourseFromDb,
  mapCourseToDb,
  mapBoardMemberFromDb,
  mapBoardMemberToDb,
  mapAffiliationFromDb,
  mapAffiliationToDb,
  mapNewsFromDb,
  mapNewsToDb,
  mapEventFromDb,
  mapEventToDb,
  mapDocumentFromDb,
  mapDocumentToDb,
  mapGalleryFromDb,
  mapGalleryToDb,
  mapStudentFromDb,
  mapStudentToDb,
  mapApplicationFromDb,
  mapApplicationToDb,
  mapResultFromDb,
  mapResultToDb,
  mapCertificateFromDb,
  mapCertificateToDb,
} from '../lib/supabase';

export type UserRole = 'public' | 'student' | 'admin';

interface UniversityContextType {
  // State
  role: UserRole;
  currentStudent: Student | null;
  faculties: Faculty[];
  programmes: Programme[];
  courses: Course[];
  boardMembers: BoardMember[];
  affiliations: AffiliationRecord[];
  news: NewsArticle[];
  events: UniversityEvent[];
  documents: UniversityDocument[];
  gallery: GalleryItem[];
  applications: AdmissionApplication[];
  students: Student[];
  results: AcademicResult[];
  certificates: InternalCertificate[];
  universityInfo: typeof UNIVERSITY_INFO;

  // Actions - Auth
  loginAsStudent: (studentIdOrEmail: string) => boolean;
  loginAsAdmin: (password?: string) => boolean;
  logout: () => void;

  // Admissions
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => AdmissionApplication;
  updateApplicationStatus: (appId: string, status: AdmissionApplication['status'], notes?: string) => void;
  admitApplicant: (appId: string) => Student;

  // Academic Management
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;

  addProgramme: (prog: Omit<Programme, 'id'>) => void;
  updateProgramme: (id: string, prog: Partial<Programme>) => void;
  deleteProgramme: (id: string) => void;

  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Student & Records
  addStudent: (student: Omit<Student, 'id' | 'studentId'>) => Student;
  updateStudent: (id: string, student: Partial<Student>) => void;

  // Results
  saveResult: (result: Omit<AcademicResult, 'id'>) => void;
  toggleResultPublishStatus: (resultId: string) => void;
  deleteResult: (resultId: string) => void;

  // Certificates (Internal strictly)
  issueCertificate: (cert: Omit<InternalCertificate, 'id' | 'certificateNumber' | 'isPrivate'>) => InternalCertificate;
  deleteCertificate: (certId: string) => void;

  // Board of Directors
  addBoardMember: (member: Omit<BoardMember, 'id'>) => void;
  updateBoardMember: (id: string, member: Partial<BoardMember>) => void;
  deleteBoardMember: (id: string) => void;

  // Affiliations
  addAffiliation: (aff: Omit<AffiliationRecord, 'id'>) => void;
  updateAffiliation: (id: string, aff: Partial<AffiliationRecord>) => void;
  deleteAffiliation: (id: string) => void;

  // News & Events
  addNewsArticle: (news: Omit<NewsArticle, 'id'>) => void;
  deleteNewsArticle: (id: string) => void;
  addEvent: (event: Omit<UniversityEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Documents
  addDocument: (doc: Omit<UniversityDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Reset to initial seed
  resetDataToFactoryDefaults: () => void;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FACULTIES: 'hathun_faculties_v9',
  PROGRAMMES: 'hathun_programmes_v9',
  COURSES: 'hathun_courses_v9',
  BOARD: 'hathun_board_v9',
  AFFILIATIONS: 'hathun_affiliations_v9',
  NEWS: 'hathun_news_v9',
  EVENTS: 'hathun_events_v9',
  DOCUMENTS: 'hathun_documents_v9',
  GALLERY: 'hathun_gallery_v9',
  APPLICATIONS: 'hathun_applications_v9',
  STUDENTS: 'hathun_students_v9',
  RESULTS: 'hathun_results_v9',
  CERTIFICATES: 'hathun_certificates_v9',
  ROLE: 'hathun_auth_role_v9',
  CURRENT_STUDENT_ID: 'hathun_current_student_v9'
};

export const UniversityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe localStorage helper
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [role, setRole] = useState<UserRole>(() => loadStored(STORAGE_KEYS.ROLE, 'public'));
  const [faculties, setFaculties] = useState<Faculty[]>(() => loadStored(STORAGE_KEYS.FACULTIES, INITIAL_FACULTIES));
  const [programmes, setProgrammes] = useState<Programme[]>(() => loadStored(STORAGE_KEYS.PROGRAMMES, INITIAL_PROGRAMMES));
  const [courses, setCourses] = useState<Course[]>(() => loadStored(STORAGE_KEYS.COURSES, INITIAL_COURSES));
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(() => loadStored(STORAGE_KEYS.BOARD, INITIAL_BOARD_MEMBERS));
  const [affiliations, setAffiliations] = useState<AffiliationRecord[]>(() => loadStored(STORAGE_KEYS.AFFILIATIONS, INITIAL_AFFILIATIONS));
  const [news, setNews] = useState<NewsArticle[]>(() => loadStored(STORAGE_KEYS.NEWS, INITIAL_NEWS));
  const [events, setEvents] = useState<UniversityEvent[]>(() => loadStored(STORAGE_KEYS.EVENTS, INITIAL_EVENTS));
  const [documents, setDocuments] = useState<UniversityDocument[]>(() => loadStored(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY));
  const [applications, setApplications] = useState<AdmissionApplication[]>(() => loadStored(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS));
  const [students, setStudents] = useState<Student[]>(() => loadStored(STORAGE_KEYS.STUDENTS, [INITIAL_STUDENT]));
  const [results, setResults] = useState<AcademicResult[]>(() => loadStored(STORAGE_KEYS.RESULTS, INITIAL_RESULTS));
  const [certificates, setCertificates] = useState<InternalCertificate[]>(() => loadStored(STORAGE_KEYS.CERTIFICATES, INITIAL_CERTIFICATES));

  const [currentStudentId, setCurrentStudentId] = useState<string | null>(() => 
    loadStored(STORAGE_KEYS.CURRENT_STUDENT_ID, INITIAL_STUDENT.id)
  );

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, JSON.stringify(role));
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT_ID, JSON.stringify(currentStudentId));
    } catch {}
  }, [currentStudentId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch {}
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    } catch {}
  }, [results]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    } catch {}
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACULTIES, JSON.stringify(faculties));
    } catch {}
  }, [faculties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(programmes));
    } catch {}
  }, [programmes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch {}
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(boardMembers));
    } catch {}
  }, [boardMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch {}
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch {}
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch {}
  }, [documents]);

  // Hydrate live records from Supabase when VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY are configured
  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let cancelled = false;

    const loadFromSupabase = async () => {
      try {
        const [
          facRes,
          progRes,
          crsRes,
          boardRes,
          affRes,
          newsRes,
          evRes,
          docRes,
          galRes,
          appRes,
          studRes,
          resRes,
          certRes,
        ] = await Promise.all([
          client.from('faculties').select('*'),
          client.from('programmes').select('*'),
          client.from('courses').select('*'),
          client.from('board_members').select('*').order('display_order', { ascending: true }),
          client.from('affiliations').select('*'),
          client.from('news_articles').select('*'),
          client.from('university_events').select('*'),
          client.from('university_documents').select('*'),
          client.from('gallery_items').select('*'),
          client.from('admission_applications').select('*').order('submitted_at', { ascending: false }),
          client.from('students').select('*'),
          client.from('academic_results').select('*'),
          client.from('internal_certificates').select('*'),
        ]);

        if (cancelled) return;

        if (!facRes.error && facRes.data?.length) setFaculties(facRes.data.map(mapFacultyFromDb));
        if (!progRes.error && progRes.data?.length) setProgrammes(progRes.data.map(mapProgrammeFromDb));
        if (!crsRes.error && crsRes.data?.length) setCourses(crsRes.data.map(mapCourseFromDb));
        if (!boardRes.error && boardRes.data?.length) setBoardMembers(boardRes.data.map(mapBoardMemberFromDb));
        if (!affRes.error && affRes.data?.length) setAffiliations(affRes.data.map(mapAffiliationFromDb));
        if (!newsRes.error && newsRes.data?.length) setNews(newsRes.data.map(mapNewsFromDb));
        if (!evRes.error && evRes.data?.length) setEvents(evRes.data.map(mapEventFromDb));
        if (!docRes.error && docRes.data?.length) setDocuments(docRes.data.map(mapDocumentFromDb));
        if (!galRes.error && galRes.data?.length) setGallery(galRes.data.map(mapGalleryFromDb));
        if (!appRes.error && appRes.data?.length) setApplications(appRes.data.map(mapApplicationFromDb));
        if (!studRes.error && studRes.data?.length) setStudents(studRes.data.map(mapStudentFromDb));
        if (!resRes.error && resRes.data?.length) setResults(resRes.data.map(mapResultFromDb));
        if (!certRes.error && certRes.data?.length) setCertificates(certRes.data.map(mapCertificateFromDb));
      } catch (err) {
        console.warn('Supabase sync skipped or unavailable:', err);
      }
    };

    loadFromSupabase();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentStudent = students.find(s => s.id === currentStudentId) || (students.length > 0 ? students[0] : null);

  // Authentication Helpers
  const loginAsStudent = (query: string): boolean => {
    const trimmed = query.trim().toLowerCase();
    const found = students.find(
      s => s.studentId.toLowerCase() === trimmed || s.email.toLowerCase() === trimmed
    );
    if (found) {
      setCurrentStudentId(found.id);
      setRole('student');
      return true;
    }
    // If not found in seed, check if default student can log in
    if (students.length > 0) {
      setCurrentStudentId(students[0].id);
      setRole('student');
      return true;
    }
    return false;
  };

  const loginAsAdmin = (): boolean => {
    setRole('admin');
    return true;
  };

  const logout = () => {
    setRole('public');
  };

  // Applications
  const submitApplication = (appData: Omit<AdmissionApplication, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>): AdmissionApplication => {
    const currentYear = new Date().getFullYear();
    const count = applications.length + 1;
    const refNum = `HATHUN-${currentYear}-${String(count).padStart(5, '0')}`;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      submittedAt: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      status: 'Pending'
    };
    setApplications(prev => [newApp, ...prev]);
    if (supabase) {
      void supabase.from('admission_applications').insert(mapApplicationToDb(newApp)).then(({ error }) => {
        if (error) console.warn('Supabase insert admission_applications failed:', error.message);
      });
    }
    return newApp;
  };

  const updateApplicationStatus = (appId: string, status: AdmissionApplication['status'], notes?: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status, notes: notes || a.notes } : a));
    if (supabase) {
      void supabase
        .from('admission_applications')
        .update({ status, ...(notes ? { notes } : {}) })
        .eq('id', appId)
        .then(({ error }) => {
          if (error) console.warn('Supabase update admission_applications failed:', error.message);
        });
    }
  };

  const admitApplicant = (appId: string): Student => {
    const app = applications.find(a => a.id === appId);
    if (!app) throw new Error('Application not found');

    const currentYear = new Date().getFullYear();
    const studentCount = students.length + 1;
    const generatedStudentId = `HATHUN/${currentYear}/${String(studentCount).padStart(4, '0')}`;

    const newStudent: Student = {
      id: `stud-${Date.now()}`,
      studentId: generatedStudentId,
      fullName: `${app.firstName} ${app.middleName ? app.middleName + ' ' : ''}${app.lastName}`,
      email: app.email,
      phone: app.phone,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      faculty: app.faculty,
      programme: app.programme,
      academicLevel: app.academicLevel,
      admissionYear: `${currentYear}`,
      currentSemester: "Semester 1",
      status: "Active",
      cgpa: 0.0,
      enrollmentReference: app.referenceNumber
    };

    setStudents(prev => [newStudent, ...prev]);
    if (supabase) {
      void supabase.from('students').insert(mapStudentToDb(newStudent)).then(({ error }) => {
        if (error) console.warn('Supabase insert students failed:', error.message);
      });
    }
    updateApplicationStatus(appId, 'Approved', `Admitted as Student ID: ${generatedStudentId}`);
    return newStudent;
  };

  // Academic Management
  const addFaculty = (f: Omit<Faculty, 'id'>) => {
    const newFac: Faculty = { ...f, id: `fac-${Date.now()}` };
    setFaculties(prev => [...prev, newFac]);
    if (supabase) {
      void supabase.from('faculties').insert(mapFacultyToDb(newFac));
    }
  };

  const updateFaculty = (id: string, updated: Partial<Faculty>) => {
    setFaculties(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    if (supabase) {
      void supabase.from('faculties').update(mapFacultyToDb(updated)).eq('id', id);
    }
  };

  const deleteFaculty = (id: string) => {
    setFaculties(prev => prev.filter(f => f.id !== id));
    if (supabase) {
      void supabase.from('faculties').delete().eq('id', id);
    }
  };

  const addProgramme = (prog: Omit<Programme, 'id'>) => {
    const newProg: Programme = { ...prog, id: `prog-${Date.now()}` };
    setProgrammes(prev => [...prev, newProg]);
    if (supabase) {
      void supabase.from('programmes').insert(mapProgrammeToDb(newProg));
    }
  };

  const updateProgramme = (id: string, updated: Partial<Programme>) => {
    setProgrammes(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    if (supabase) {
      void supabase.from('programmes').update(mapProgrammeToDb(updated)).eq('id', id);
    }
  };

  const deleteProgramme = (id: string) => {
    setProgrammes(prev => prev.filter(p => p.id !== id));
    if (supabase) {
      void supabase.from('programmes').delete().eq('id', id);
    }
  };

  const addCourse = (crs: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...crs, id: `crs-${Date.now()}` };
    setCourses(prev => [...prev, newCourse]);
    if (supabase) {
      void supabase.from('courses').insert(mapCourseToDb(newCourse));
    }
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    if (supabase) {
      void supabase.from('courses').update(mapCourseToDb(updated)).eq('id', id);
    }
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    if (supabase) {
      void supabase.from('courses').delete().eq('id', id);
    }
  };

  // Student management
  const addStudent = (stud: Omit<Student, 'id' | 'studentId'>): Student => {
    const currentYear = new Date().getFullYear();
    const count = students.length + 1;
    const generatedId = `HATHUN/${currentYear}/${String(count).padStart(4, '0')}`;
    const newStudent: Student = {
      ...stud,
      id: `stud-${Date.now()}`,
      studentId: generatedId
    };
    setStudents(prev => [newStudent, ...prev]);
    if (supabase) {
      void supabase.from('students').insert(mapStudentToDb(newStudent));
    }
    return newStudent;
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    if (supabase) {
      void supabase.from('students').update(mapStudentToDb(updated)).eq('id', id);
    }
  };

  // Results
  const saveResult = (res: Omit<AcademicResult, 'id'>) => {
    const newRes: AcademicResult = {
      ...res,
      id: `res-${Date.now()}`
    };
    setResults(prev => [newRes, ...prev]);
    if (supabase) {
      void supabase.from('academic_results').insert(mapResultToDb(newRes));
    }
  };

  const toggleResultPublishStatus = (resultId: string) => {
    const target = results.find(r => r.id === resultId);
    const nextStatus = target?.status === 'Published' ? 'Draft' : 'Published';
    const nextDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setResults(prev => prev.map(r => r.id === resultId ? {
      ...r,
      status: nextStatus,
      publishedDate: nextDate
    } : r));
    if (supabase && target) {
      void supabase
        .from('academic_results')
        .update({ status: nextStatus, published_date: nextDate })
        .eq('id', resultId);
    }
  };

  const deleteResult = (resultId: string) => {
    setResults(prev => prev.filter(r => r.id !== resultId));
    if (supabase) {
      void supabase.from('academic_results').delete().eq('id', resultId);
    }
  };

  // Internal Certificates (Strictly Private)
  const issueCertificate = (cert: Omit<InternalCertificate, 'id' | 'certificateNumber' | 'isPrivate'>): InternalCertificate => {
    const currentYear = new Date().getFullYear();
    const count = certificates.length + 1;
    const certNum = `HATHUN-CERT-${currentYear}-${String(count).padStart(4, '0')}`;
    const newCert: InternalCertificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      isPrivate: true
    };
    setCertificates(prev => [newCert, ...prev]);
    if (supabase) {
      void supabase.from('internal_certificates').insert(mapCertificateToDb(newCert));
    }
    return newCert;
  };

  const deleteCertificate = (certId: string) => {
    setCertificates(prev => prev.filter(c => c.id !== certId));
    if (supabase) {
      void supabase.from('internal_certificates').delete().eq('id', certId);
    }
  };

  // Board
  const addBoardMember = (bm: Omit<BoardMember, 'id'>) => {
    const newBm: BoardMember = { ...bm, id: `bm-${Date.now()}` };
    setBoardMembers(prev => [...prev, newBm]);
    if (supabase) {
      void supabase.from('board_members').insert(mapBoardMemberToDb(newBm));
    }
  };

  const updateBoardMember = (id: string, updated: Partial<BoardMember>) => {
    setBoardMembers(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
    if (supabase) {
      void supabase.from('board_members').update(mapBoardMemberToDb(updated)).eq('id', id);
    }
  };

  const deleteBoardMember = (id: string) => {
    setBoardMembers(prev => prev.filter(b => b.id !== id));
    if (supabase) {
      void supabase.from('board_members').delete().eq('id', id);
    }
  };

  // Affiliations
  const addAffiliation = (aff: Omit<AffiliationRecord, 'id'>) => {
    const newAff: AffiliationRecord = { ...aff, id: `aff-${Date.now()}` };
    setAffiliations(prev => [...prev, newAff]);
    if (supabase) {
      void supabase.from('affiliations').insert(mapAffiliationToDb(newAff));
    }
  };

  const updateAffiliation = (id: string, updated: Partial<AffiliationRecord>) => {
    setAffiliations(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    if (supabase) {
      void supabase.from('affiliations').update(mapAffiliationToDb(updated)).eq('id', id);
    }
  };

  const deleteAffiliation = (id: string) => {
    setAffiliations(prev => prev.filter(a => a.id !== id));
    if (supabase) {
      void supabase.from('affiliations').delete().eq('id', id);
    }
  };

  // News, Events, Gallery, Documents
  const addNewsArticle = (n: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = { ...n, id: `news-${Date.now()}` };
    setNews(prev => [newArticle, ...prev]);
    if (supabase) {
      void supabase.from('news_articles').insert(mapNewsToDb(newArticle));
    }
  };

  const deleteNewsArticle = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    if (supabase) {
      void supabase.from('news_articles').delete().eq('id', id);
    }
  };

  const addEvent = (e: Omit<UniversityEvent, 'id'>) => {
    const newEvent: UniversityEvent = { ...e, id: `ev-${Date.now()}` };
    setEvents(prev => [newEvent, ...prev]);
    if (supabase) {
      void supabase.from('university_events').insert(mapEventToDb(newEvent));
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    if (supabase) {
      void supabase.from('university_events').delete().eq('id', id);
    }
  };

  const addGalleryItem = (g: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...g, id: `gal-${Date.now()}` };
    setGallery(prev => [newItem, ...prev]);
    if (supabase) {
      void supabase.from('gallery_items').insert(mapGalleryToDb(newItem));
    }
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    if (supabase) {
      void supabase.from('gallery_items').delete().eq('id', id);
    }
  };

  const addDocument = (d: Omit<UniversityDocument, 'id'>) => {
    const newDoc: UniversityDocument = { ...d, id: `doc-${Date.now()}` };
    setDocuments(prev => [...prev, newDoc]);
    if (supabase) {
      void supabase.from('university_documents').insert(mapDocumentToDb(newDoc));
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (supabase) {
      void supabase.from('university_documents').delete().eq('id', id);
    }
  };

  const resetDataToFactoryDefaults = () => {
    setFaculties(INITIAL_FACULTIES);
    setProgrammes(INITIAL_PROGRAMMES);
    setCourses(INITIAL_COURSES);
    setBoardMembers(INITIAL_BOARD_MEMBERS);
    setAffiliations(INITIAL_AFFILIATIONS);
    setNews(INITIAL_NEWS);
    setEvents(INITIAL_EVENTS);
    setDocuments(INITIAL_DOCUMENTS);
    setGallery(INITIAL_GALLERY);
    setApplications(INITIAL_APPLICATIONS);
    setStudents([INITIAL_STUDENT]);
    setResults(INITIAL_RESULTS);
    setCertificates(INITIAL_CERTIFICATES);
    setRole('public');
  };

  return (
    <UniversityContext.Provider
      value={{
        role,
        currentStudent,
        faculties,
        programmes,
        courses,
        boardMembers,
        affiliations,
        news,
        events,
        documents,
        gallery,
        applications,
        students,
        results,
        certificates,
        universityInfo: UNIVERSITY_INFO,

        loginAsStudent,
        loginAsAdmin,
        logout,

        submitApplication,
        updateApplicationStatus,
        admitApplicant,

        addFaculty,
        updateFaculty,
        deleteFaculty,

        addProgramme,
        updateProgramme,
        deleteProgramme,

        addCourse,
        updateCourse,
        deleteCourse,

        addStudent,
        updateStudent,

        saveResult,
        toggleResultPublishStatus,
        deleteResult,

        issueCertificate,
        deleteCertificate,

        addBoardMember,
        updateBoardMember,
        deleteBoardMember,

        addAffiliation,
        updateAffiliation,
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
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = () => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};
