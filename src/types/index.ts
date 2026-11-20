export type AcademicLevel = 
  | 'Certificate'
  | 'Diploma'
  | 'Bachelor'
  | 'Master’s'
  | 'PhD'
  | 'Honorary Doctorate';

export interface Faculty {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  programmesCount?: number;
  availableProgrammes: string[];
}

export interface Programme {
  id: string;
  name: string;
  facultyId: string;
  facultyName: string;
  level: AcademicLevel;
  duration: string;
  registrationFee: string;
  tuitionFeeNote: string;
  description: string;
  entryRequirements: string;
  curriculumHighlights?: string[];
  careerOpportunities?: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  facultyId: string;
  level: AcademicLevel;
  credits: number;
  semester: 'Semester 1' | 'Semester 2' | 'Annual';
  lecturerName: string;
  description: string;
  syllabusUrl?: string;
}

export interface AdmissionApplication {
  id: string;
  referenceNumber: string; // e.g., HATHUN-2026-00001
  submittedAt: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Declined';
  // Step 1: Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  nationality: string;
  country: string;
  stateRegion: string;
  city: string;
  residentialAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  // Step 2 & 3: Academic & Programme Selection
  faculty: string;
  programme: string;
  academicLevel: AcademicLevel;
  previousInstitution: string;
  previousQualification: string;
  graduationYear: string;
  // Step 4: Documents (file names or simulated attachments)
  passportPhotoName?: string;
  academicDocumentsName?: string;
  supportingDocumentsName?: string;
  personalStatement?: string;
  assignedStudentId?: string;
  notes?: string;
}

export interface Student {
  id: string;
  studentId: string; // e.g., HATHUN/2026/0001
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  faculty: string;
  programme: string;
  academicLevel: AcademicLevel;
  admissionYear: string;
  currentSemester: string;
  status: 'Active' | 'Graduated' | 'On Leave';
  cgpa?: number;
  enrollmentReference?: string;
}

export interface AcademicResult {
  id: string;
  studentId: string;
  studentName: string;
  academicSession: string; // e.g. 2025/2026
  semester: string;
  courses: {
    courseCode: string;
    courseTitle: string;
    creditUnits: number;
    score: number;
    grade: string;
    gradePoint: number;
  }[];
  gpa: number;
  cgpa: number;
  totalCreditsEarned: number;
  status: 'Published' | 'Draft';
  publishedDate: string;
  remarks: string;
}

export interface InternalCertificate {
  id: string;
  certificateNumber: string; // e.g., HATHUN-CERT-2026-089
  studentId: string;
  studentName: string;
  programme: string;
  faculty: string;
  awardLevel: AcademicLevel;
  dateAwarded: string;
  chancellorName: string;
  registrarName: string;
  classification?: string; // e.g., First Class Honours, Distinction, Merit
  citation?: string;
  isPrivate: true;
}

export interface BoardMember {
  id: string;
  name: string;
  title: string;
  position: string;
  country: string;
  photoUrl: string;
  biography: string;
  displayOrder: number;
}

export interface AffiliationRecord {
  id: string;
  organization: string;
  relationshipType: 'Academic Alliance' | 'Affiliated University' | 'Theological Partnership' | 'International Fellowship';
  description: string;
  country?: string;
  logoUrl?: string;
  officialNote: string;
  documentTitle?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  date: string;
  author: string;
  category: 'University News' | 'Academic Notice' | 'Convocation' | 'Theological Discourse';
  excerpt: string;
  content: string;
  isFeatured?: boolean;
}

export interface UniversityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Convocation' | 'Seminar' | 'Matriculation' | 'Lecture' | 'Conference';
  description: string;
  registrationNote: string;
}

export interface UniversityDocument {
  id: string;
  title: string;
  category: 'Prospectus' | 'Admission Information' | 'Programme Information' | 'Student Handbook' | 'Academic Calendar' | 'Forms' | 'Policies';
  fileSize: string;
  updatedDate: string;
  description: string;
  isPrivate: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Graduation' | 'Students' | 'Academic Events' | 'Ceremonies' | 'Faculty' | 'Campus' | 'Certificates';
  imageUrl: string;
  fallbackUrl?: string;
  caption: string;
  date: string;
  featured?: boolean;
}
