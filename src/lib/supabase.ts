import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
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
} from '../types';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseUrl = rawSupabaseUrl
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// Snake_case (PostgreSQL) <-> camelCase (Frontend) Mappers
// ============================================================================

export const mapFacultyFromDb = (row: any): Faculty => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  iconName: row.icon_name,
  image: row.image,
  programmesCount: row.programmes_count ?? 0,
  availableProgrammes: row.available_programmes ?? [],
});

export const mapFacultyToDb = (f: Partial<Faculty>) => ({
  ...(f.id !== undefined ? { id: f.id } : {}),
  ...(f.name !== undefined ? { name: f.name } : {}),
  ...(f.slug !== undefined ? { slug: f.slug } : {}),
  ...(f.description !== undefined ? { description: f.description } : {}),
  ...(f.iconName !== undefined ? { icon_name: f.iconName } : {}),
  ...(f.image !== undefined ? { image: f.image } : {}),
  ...(f.programmesCount !== undefined ? { programmes_count: f.programmesCount } : {}),
  ...(f.availableProgrammes !== undefined ? { available_programmes: f.availableProgrammes } : {}),
});

export const mapProgrammeFromDb = (row: any): Programme => ({
  id: row.id,
  name: row.name,
  facultyId: row.faculty_id,
  facultyName: row.faculty_name,
  level: row.level,
  duration: row.duration,
  registrationFee: row.registration_fee,
  tuitionFeeNote: row.tuition_fee_note,
  description: row.description,
  entryRequirements: row.entry_requirements,
  curriculumHighlights: row.curriculum_highlights ?? [],
  careerOpportunities: row.career_opportunities ?? [],
});

export const mapProgrammeToDb = (p: Partial<Programme>) => ({
  ...(p.id !== undefined ? { id: p.id } : {}),
  ...(p.name !== undefined ? { name: p.name } : {}),
  ...(p.facultyId !== undefined ? { faculty_id: p.facultyId } : {}),
  ...(p.facultyName !== undefined ? { faculty_name: p.facultyName } : {}),
  ...(p.level !== undefined ? { level: p.level } : {}),
  ...(p.duration !== undefined ? { duration: p.duration } : {}),
  ...(p.registrationFee !== undefined ? { registration_fee: p.registrationFee } : {}),
  ...(p.tuitionFeeNote !== undefined ? { tuition_fee_note: p.tuitionFeeNote } : {}),
  ...(p.description !== undefined ? { description: p.description } : {}),
  ...(p.entryRequirements !== undefined ? { entry_requirements: p.entryRequirements } : {}),
  ...(p.curriculumHighlights !== undefined ? { curriculum_highlights: p.curriculumHighlights } : {}),
  ...(p.careerOpportunities !== undefined ? { career_opportunities: p.careerOpportunities } : {}),
});

export const mapCourseFromDb = (row: any): Course => ({
  id: row.id,
  code: row.code,
  title: row.title,
  facultyId: row.faculty_id,
  level: row.level,
  credits: row.credits,
  semester: row.semester,
  lecturerName: row.lecturer_name,
  description: row.description,
  syllabusUrl: row.syllabus_url ?? undefined,
});

export const mapCourseToDb = (c: Partial<Course>) => ({
  ...(c.id !== undefined ? { id: c.id } : {}),
  ...(c.code !== undefined ? { code: c.code } : {}),
  ...(c.title !== undefined ? { title: c.title } : {}),
  ...(c.facultyId !== undefined ? { faculty_id: c.facultyId } : {}),
  ...(c.level !== undefined ? { level: c.level } : {}),
  ...(c.credits !== undefined ? { credits: c.credits } : {}),
  ...(c.semester !== undefined ? { semester: c.semester } : {}),
  ...(c.lecturerName !== undefined ? { lecturer_name: c.lecturerName } : {}),
  ...(c.description !== undefined ? { description: c.description } : {}),
  ...(c.syllabusUrl !== undefined ? { syllabus_url: c.syllabusUrl } : {}),
});

export const mapBoardMemberFromDb = (row: any): BoardMember => ({
  id: row.id,
  name: row.name,
  title: row.title,
  position: row.position,
  country: row.country,
  photoUrl: row.photo_url,
  biography: row.biography,
  displayOrder: row.display_order,
});

export const mapBoardMemberToDb = (b: Partial<BoardMember>) => ({
  ...(b.id !== undefined ? { id: b.id } : {}),
  ...(b.name !== undefined ? { name: b.name } : {}),
  ...(b.title !== undefined ? { title: b.title } : {}),
  ...(b.position !== undefined ? { position: b.position } : {}),
  ...(b.country !== undefined ? { country: b.country } : {}),
  ...(b.photoUrl !== undefined ? { photo_url: b.photoUrl } : {}),
  ...(b.biography !== undefined ? { biography: b.biography } : {}),
  ...(b.displayOrder !== undefined ? { display_order: b.displayOrder } : {}),
});

export const mapAffiliationFromDb = (row: any): AffiliationRecord => ({
  id: row.id,
  organization: row.organization,
  relationshipType: row.relationship_type,
  description: row.description,
  country: row.country ?? undefined,
  logoUrl: row.logo_url ?? undefined,
  officialNote: row.official_note,
  documentTitle: row.document_title ?? undefined,
});

export const mapAffiliationToDb = (a: Partial<AffiliationRecord>) => ({
  ...(a.id !== undefined ? { id: a.id } : {}),
  ...(a.organization !== undefined ? { organization: a.organization } : {}),
  ...(a.relationshipType !== undefined ? { relationship_type: a.relationshipType } : {}),
  ...(a.description !== undefined ? { description: a.description } : {}),
  ...(a.country !== undefined ? { country: a.country } : {}),
  ...(a.logoUrl !== undefined ? { logo_url: a.logoUrl } : {}),
  ...(a.officialNote !== undefined ? { official_note: a.officialNote } : {}),
  ...(a.documentTitle !== undefined ? { document_title: a.documentTitle } : {}),
});

export const mapNewsFromDb = (row: any): NewsArticle => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  featuredImage: row.featured_image,
  date: row.date,
  author: row.author,
  category: row.category,
  excerpt: row.excerpt,
  content: row.content,
  isFeatured: row.is_featured ?? false,
});

export const mapNewsToDb = (n: Partial<NewsArticle>) => ({
  ...(n.id !== undefined ? { id: n.id } : {}),
  ...(n.title !== undefined ? { title: n.title } : {}),
  ...(n.slug !== undefined ? { slug: n.slug } : {}),
  ...(n.featuredImage !== undefined ? { featured_image: n.featuredImage } : {}),
  ...(n.date !== undefined ? { date: n.date } : {}),
  ...(n.author !== undefined ? { author: n.author } : {}),
  ...(n.category !== undefined ? { category: n.category } : {}),
  ...(n.excerpt !== undefined ? { excerpt: n.excerpt } : {}),
  ...(n.content !== undefined ? { content: n.content } : {}),
  ...(n.isFeatured !== undefined ? { is_featured: n.isFeatured } : {}),
});

export const mapEventFromDb = (row: any): UniversityEvent => ({
  id: row.id,
  title: row.title,
  date: row.date,
  time: row.time,
  venue: row.venue,
  category: row.category,
  description: row.description,
  registrationNote: row.registration_note,
});

export const mapEventToDb = (e: Partial<UniversityEvent>) => ({
  ...(e.id !== undefined ? { id: e.id } : {}),
  ...(e.title !== undefined ? { title: e.title } : {}),
  ...(e.date !== undefined ? { date: e.date } : {}),
  ...(e.time !== undefined ? { time: e.time } : {}),
  ...(e.venue !== undefined ? { venue: e.venue } : {}),
  ...(e.category !== undefined ? { category: e.category } : {}),
  ...(e.description !== undefined ? { description: e.description } : {}),
  ...(e.registrationNote !== undefined ? { registration_note: e.registrationNote } : {}),
});

export const mapDocumentFromDb = (row: any): UniversityDocument => ({
  id: row.id,
  title: row.title,
  category: row.category,
  fileSize: row.file_size,
  updatedDate: row.updated_date,
  description: row.description,
  isPrivate: Boolean(row.is_private),
});

export const mapDocumentToDb = (d: Partial<UniversityDocument>) => ({
  ...(d.id !== undefined ? { id: d.id } : {}),
  ...(d.title !== undefined ? { title: d.title } : {}),
  ...(d.category !== undefined ? { category: d.category } : {}),
  ...(d.fileSize !== undefined ? { file_size: d.fileSize } : {}),
  ...(d.updatedDate !== undefined ? { updated_date: d.updatedDate } : {}),
  ...(d.description !== undefined ? { description: d.description } : {}),
  ...(d.isPrivate !== undefined ? { is_private: d.isPrivate } : {}),
});

export const mapGalleryFromDb = (row: any): GalleryItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  imageUrl: row.image_url,
  fallbackUrl: row.fallback_url ?? undefined,
  caption: row.caption,
  date: row.date,
  featured: row.featured ?? false,
});

export const mapGalleryToDb = (g: Partial<GalleryItem>) => ({
  ...(g.id !== undefined ? { id: g.id } : {}),
  ...(g.title !== undefined ? { title: g.title } : {}),
  ...(g.category !== undefined ? { category: g.category } : {}),
  ...(g.imageUrl !== undefined ? { image_url: g.imageUrl } : {}),
  ...(g.fallbackUrl !== undefined ? { fallback_url: g.fallbackUrl } : {}),
  ...(g.caption !== undefined ? { caption: g.caption } : {}),
  ...(g.date !== undefined ? { date: g.date } : {}),
  ...(g.featured !== undefined ? { featured: g.featured } : {}),
});

export const mapStudentFromDb = (row: any): Student => ({
  id: row.id,
  studentId: row.student_id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  avatarUrl: row.avatar_url || '',
  faculty: row.faculty,
  programme: row.programme,
  academicLevel: row.academic_level,
  admissionYear: row.admission_year,
  currentSemester: row.current_semester,
  status: row.status,
  cgpa: row.cgpa !== null && row.cgpa !== undefined ? Number(row.cgpa) : undefined,
  enrollmentReference: row.enrollment_reference ?? undefined,
});

export const mapStudentToDb = (s: Partial<Student>) => ({
  ...(s.id !== undefined ? { id: s.id } : {}),
  ...(s.studentId !== undefined ? { student_id: s.studentId } : {}),
  ...(s.fullName !== undefined ? { full_name: s.fullName } : {}),
  ...(s.email !== undefined ? { email: s.email } : {}),
  ...(s.phone !== undefined ? { phone: s.phone } : {}),
  ...(s.avatarUrl !== undefined ? { avatar_url: s.avatarUrl } : {}),
  ...(s.faculty !== undefined ? { faculty: s.faculty } : {}),
  ...(s.programme !== undefined ? { programme: s.programme } : {}),
  ...(s.academicLevel !== undefined ? { academic_level: s.academicLevel } : {}),
  ...(s.admissionYear !== undefined ? { admission_year: s.admissionYear } : {}),
  ...(s.currentSemester !== undefined ? { current_semester: s.currentSemester } : {}),
  ...(s.status !== undefined ? { status: s.status } : {}),
  ...(s.cgpa !== undefined ? { cgpa: s.cgpa } : {}),
  ...(s.enrollmentReference !== undefined ? { enrollment_reference: s.enrollmentReference } : {}),
});

export const mapApplicationFromDb = (row: any): AdmissionApplication => ({
  id: row.id,
  referenceNumber: row.reference_number,
  submittedAt: row.submitted_at,
  status: row.status,
  firstName: row.first_name,
  middleName: row.middle_name ?? undefined,
  lastName: row.last_name,
  gender: row.gender,
  dateOfBirth: row.date_of_birth,
  nationality: row.nationality,
  country: row.country,
  stateRegion: row.state_region,
  city: row.city,
  residentialAddress: row.residential_address,
  phone: row.phone,
  whatsapp: row.whatsapp,
  email: row.email,
  faculty: row.faculty,
  programme: row.programme,
  academicLevel: row.academic_level,
  previousInstitution: row.previous_institution,
  previousQualification: row.previous_qualification,
  graduationYear: row.graduation_year,
  passportPhotoName: row.passport_photo_name ?? undefined,
  academicDocumentsName: row.academic_documents_name ?? undefined,
  supportingDocumentsName: row.supporting_documents_name ?? undefined,
  personalStatement: row.personal_statement ?? undefined,
  assignedStudentId: row.assigned_student_id ?? undefined,
  notes: row.notes ?? undefined,
});

export const mapApplicationToDb = (a: Partial<AdmissionApplication>) => ({
  ...(a.id !== undefined ? { id: a.id } : {}),
  ...(a.referenceNumber !== undefined ? { reference_number: a.referenceNumber } : {}),
  ...(a.status !== undefined ? { status: a.status } : {}),
  ...(a.firstName !== undefined ? { first_name: a.firstName } : {}),
  ...(a.middleName !== undefined ? { middle_name: a.middleName } : {}),
  ...(a.lastName !== undefined ? { last_name: a.lastName } : {}),
  ...(a.gender !== undefined ? { gender: a.gender } : {}),
  ...(a.dateOfBirth !== undefined ? { date_of_birth: a.dateOfBirth } : {}),
  ...(a.nationality !== undefined ? { nationality: a.nationality } : {}),
  ...(a.country !== undefined ? { country: a.country } : {}),
  ...(a.stateRegion !== undefined ? { state_region: a.stateRegion } : {}),
  ...(a.city !== undefined ? { city: a.city } : {}),
  ...(a.residentialAddress !== undefined ? { residential_address: a.residentialAddress } : {}),
  ...(a.phone !== undefined ? { phone: a.phone } : {}),
  ...(a.whatsapp !== undefined ? { whatsapp: a.whatsapp } : {}),
  ...(a.email !== undefined ? { email: a.email } : {}),
  ...(a.faculty !== undefined ? { faculty: a.faculty } : {}),
  ...(a.programme !== undefined ? { programme: a.programme } : {}),
  ...(a.academicLevel !== undefined ? { academic_level: a.academicLevel } : {}),
  ...(a.previousInstitution !== undefined ? { previous_institution: a.previousInstitution } : {}),
  ...(a.previousQualification !== undefined ? { previous_qualification: a.previousQualification } : {}),
  ...(a.graduationYear !== undefined ? { graduation_year: a.graduationYear } : {}),
  ...(a.passportPhotoName !== undefined ? { passport_photo_name: a.passportPhotoName } : {}),
  ...(a.academicDocumentsName !== undefined ? { academic_documents_name: a.academicDocumentsName } : {}),
  ...(a.supportingDocumentsName !== undefined ? { supporting_documents_name: a.supportingDocumentsName } : {}),
  ...(a.personalStatement !== undefined ? { personal_statement: a.personalStatement } : {}),
  ...(a.assignedStudentId !== undefined ? { assigned_student_id: a.assignedStudentId } : {}),
  ...(a.notes !== undefined ? { notes: a.notes } : {}),
});

export const mapResultFromDb = (row: any): AcademicResult => ({
  id: row.id,
  studentId: row.student_id,
  studentName: row.student_name,
  academicSession: row.academic_session,
  semester: row.semester,
  courses: row.courses ?? [],
  gpa: Number(row.gpa ?? 0),
  cgpa: Number(row.cgpa ?? 0),
  totalCreditsEarned: row.total_credits_earned ?? 0,
  status: row.status,
  publishedDate: row.published_date || '',
  remarks: row.remarks || '',
});

export const mapResultToDb = (r: Partial<AcademicResult>) => ({
  ...(r.id !== undefined ? { id: r.id } : {}),
  ...(r.studentId !== undefined ? { student_id: r.studentId } : {}),
  ...(r.studentName !== undefined ? { student_name: r.studentName } : {}),
  ...(r.academicSession !== undefined ? { academic_session: r.academicSession } : {}),
  ...(r.semester !== undefined ? { semester: r.semester } : {}),
  ...(r.courses !== undefined ? { courses: r.courses } : {}),
  ...(r.gpa !== undefined ? { gpa: r.gpa } : {}),
  ...(r.cgpa !== undefined ? { cgpa: r.cgpa } : {}),
  ...(r.totalCreditsEarned !== undefined ? { total_credits_earned: r.totalCreditsEarned } : {}),
  ...(r.status !== undefined ? { status: r.status } : {}),
  ...(r.publishedDate !== undefined ? { published_date: r.publishedDate } : {}),
  ...(r.remarks !== undefined ? { remarks: r.remarks } : {}),
});

export const mapCertificateFromDb = (row: any): InternalCertificate => ({
  id: row.id,
  certificateNumber: row.certificate_number,
  studentId: row.student_id,
  studentName: row.student_name,
  programme: row.programme,
  faculty: row.faculty,
  awardLevel: row.award_level,
  dateAwarded: row.date_awarded,
  chancellorName: row.chancellor_name,
  registrarName: row.registrar_name,
  classification: row.classification ?? undefined,
  citation: row.citation ?? undefined,
  isPrivate: true,
});

export const mapCertificateToDb = (c: Partial<InternalCertificate>) => ({
  ...(c.id !== undefined ? { id: c.id } : {}),
  ...(c.certificateNumber !== undefined ? { certificate_number: c.certificateNumber } : {}),
  ...(c.studentId !== undefined ? { student_id: c.studentId } : {}),
  ...(c.studentName !== undefined ? { student_name: c.studentName } : {}),
  ...(c.programme !== undefined ? { programme: c.programme } : {}),
  ...(c.faculty !== undefined ? { faculty: c.faculty } : {}),
  ...(c.awardLevel !== undefined ? { award_level: c.awardLevel } : {}),
  ...(c.dateAwarded !== undefined ? { date_awarded: c.dateAwarded } : {}),
  ...(c.chancellorName !== undefined ? { chancellor_name: c.chancellorName } : {}),
  ...(c.registrarName !== undefined ? { registrar_name: c.registrarName } : {}),
  ...(c.classification !== undefined ? { classification: c.classification } : {}),
  ...(c.citation !== undefined ? { citation: c.citation } : {}),
  is_private: true,
});
