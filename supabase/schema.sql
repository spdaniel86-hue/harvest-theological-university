-- ============================================================================
-- Harvester's Theological University (HATHUN) — Supabase PostgreSQL Schema
-- ============================================================================
-- Run this entire script in the Supabase Dashboard -> SQL Editor -> New Query.
-- It creates all tables, constraints, indexes, triggers, Auth RBAC helpers,
-- Row-Level Security (RLS) policies, RPC helpers, and Storage buckets
-- matching src/types/index.ts and src/context/UniversityContext.tsx.
-- ============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Shared Utility Functions
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 3. Auth & Role-Based Access Control (Profiles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  student_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Automatically create a profile row whenever a new Supabase Auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'student'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- SECURITY DEFINER helpers to prevent recursive RLS checks
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.current_user_student_id()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT student_id
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1;
$$;

-- ============================================================================
-- 4. Core Academic & Institutional Catalog Tables
-- ============================================================================

-- 4.1 University Settings (Global metadata & head office info)
CREATE TABLE IF NOT EXISTS public.university_settings (
  id text PRIMARY KEY DEFAULT 'default',
  name text NOT NULL,
  short_name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  law_description text,
  head_office jsonb NOT NULL DEFAULT '{}'::jsonb,
  payment_notice text,
  academic_levels_info jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.2 Faculties
CREATE TABLE IF NOT EXISTS public.faculties (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  icon_name text NOT NULL DEFAULT 'BookOpen',
  image text NOT NULL,
  programmes_count integer NOT NULL DEFAULT 0,
  available_programmes text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.3 Programmes
CREATE TABLE IF NOT EXISTS public.programmes (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  faculty_id text NOT NULL REFERENCES public.faculties(id) ON DELETE CASCADE,
  faculty_name text NOT NULL,
  level text NOT NULL CHECK (
    level IN ('Certificate', 'Diploma', 'Bachelor', 'Master’s', 'Master''s', 'PhD', 'Honorary Doctorate')
  ),
  duration text NOT NULL,
  registration_fee text NOT NULL,
  tuition_fee_note text NOT NULL,
  description text NOT NULL,
  entry_requirements text NOT NULL,
  curriculum_highlights text[] NOT NULL DEFAULT '{}',
  career_opportunities text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.4 Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  faculty_id text NOT NULL REFERENCES public.faculties(id) ON DELETE CASCADE,
  level text NOT NULL CHECK (
    level IN ('Certificate', 'Diploma', 'Bachelor', 'Master’s', 'Master''s', 'PhD', 'Honorary Doctorate')
  ),
  credits integer NOT NULL DEFAULT 3 CHECK (credits > 0),
  semester text NOT NULL CHECK (semester IN ('Semester 1', 'Semester 2', 'Annual')),
  lecturer_name text NOT NULL,
  description text NOT NULL,
  syllabus_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.5 Board of Directors
CREATE TABLE IF NOT EXISTS public.board_members (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  title text NOT NULL,
  position text NOT NULL,
  country text NOT NULL,
  photo_url text NOT NULL,
  biography text NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.6 Affiliations & Partnerships
CREATE TABLE IF NOT EXISTS public.affiliations (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  organization text NOT NULL,
  relationship_type text NOT NULL CHECK (
    relationship_type IN (
      'Academic Alliance',
      'Affiliated University',
      'Theological Partnership',
      'International Fellowship'
    )
  ),
  description text NOT NULL,
  country text,
  logo_url text,
  official_note text NOT NULL,
  document_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.7 News Articles
CREATE TABLE IF NOT EXISTS public.news_articles (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  featured_image text NOT NULL,
  date text NOT NULL,
  author text NOT NULL,
  category text NOT NULL CHECK (
    category IN ('University News', 'Academic Notice', 'Convocation', 'Theological Discourse')
  ),
  excerpt text NOT NULL,
  content text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.8 University Events
CREATE TABLE IF NOT EXISTS public.university_events (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  venue text NOT NULL,
  category text NOT NULL CHECK (
    category IN ('Convocation', 'Seminar', 'Matriculation', 'Lecture', 'Conference')
  ),
  description text NOT NULL,
  registration_note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.9 University Documents (Public vs. Private Portal Files)
CREATE TABLE IF NOT EXISTS public.university_documents (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title text NOT NULL,
  category text NOT NULL CHECK (
    category IN (
      'Prospectus',
      'Admission Information',
      'Programme Information',
      'Student Handbook',
      'Academic Calendar',
      'Forms',
      'Policies'
    )
  ),
  file_size text NOT NULL,
  updated_date text NOT NULL,
  description text NOT NULL,
  file_url text,
  is_private boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4.10 Gallery Items
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title text NOT NULL,
  category text NOT NULL CHECK (
    category IN (
      'Graduation',
      'Students',
      'Academic Events',
      'Ceremonies',
      'Faculty',
      'Campus',
      'Certificates'
    )
  ),
  image_url text NOT NULL,
  fallback_url text,
  caption text NOT NULL,
  date text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 5. Student Portal, Admissions, Results & Private Certificates
-- ============================================================================

-- 5.1 Students
CREATE TABLE IF NOT EXISTS public.students (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  auth_user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  student_id text NOT NULL UNIQUE, -- e.g. HATHUN/2026/0001
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  avatar_url text NOT NULL DEFAULT '',
  faculty text NOT NULL,
  programme text NOT NULL,
  academic_level text NOT NULL CHECK (
    academic_level IN ('Certificate', 'Diploma', 'Bachelor', 'Master’s', 'Master''s', 'PhD', 'Honorary Doctorate')
  ),
  admission_year text NOT NULL,
  current_semester text NOT NULL DEFAULT 'Semester 1',
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Graduated', 'On Leave')),
  cgpa numeric(3, 2) DEFAULT 0.00 CHECK (cgpa >= 0 AND cgpa <= 4.00),
  enrollment_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5.2 Admission Applications
CREATE TABLE IF NOT EXISTS public.admission_applications (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reference_number text NOT NULL UNIQUE, -- e.g. HATHUN-2026-00001
  submitted_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'Pending' CHECK (
    status IN ('Pending', 'Under Review', 'Approved', 'Declined')
  ),
  -- Step 1: Personal Info
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  date_of_birth date NOT NULL,
  nationality text NOT NULL,
  country text NOT NULL,
  state_region text NOT NULL,
  city text NOT NULL,
  residential_address text NOT NULL,
  phone text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  -- Step 2 & 3: Academic & Programme Selection
  faculty text NOT NULL,
  programme text NOT NULL,
  academic_level text NOT NULL CHECK (
    academic_level IN ('Certificate', 'Diploma', 'Bachelor', 'Master’s', 'Master''s', 'PhD', 'Honorary Doctorate')
  ),
  previous_institution text NOT NULL,
  previous_qualification text NOT NULL,
  graduation_year text NOT NULL,
  -- Step 4: Uploaded Document Names & Storage URLs
  passport_photo_name text,
  academic_documents_name text,
  supporting_documents_name text,
  passport_photo_url text,
  academic_documents_url text,
  supporting_documents_url text,
  personal_statement text,
  assigned_student_id text REFERENCES public.students(student_id) ON UPDATE CASCADE ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-generate reference_number (HATHUN-YYYY-NNNNN) if omitted on insert
CREATE SEQUENCE IF NOT EXISTS public.admission_ref_seq START 1;

CREATE OR REPLACE FUNCTION public.assign_application_reference()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.reference_number IS NULL OR btrim(NEW.reference_number) = '' THEN
    NEW.reference_number := format(
      'HATHUN-%s-%s',
      to_char(now(), 'YYYY'),
      lpad(nextval('public.admission_ref_seq')::text, 5, '0')
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_application_reference ON public.admission_applications;
CREATE TRIGGER trg_assign_application_reference
  BEFORE INSERT ON public.admission_applications
  FOR EACH ROW EXECUTE FUNCTION public.assign_application_reference();

-- 5.3 Academic Results
CREATE TABLE IF NOT EXISTS public.academic_results (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  student_id text NOT NULL REFERENCES public.students(student_id) ON UPDATE CASCADE ON DELETE CASCADE,
  student_name text NOT NULL,
  academic_session text NOT NULL, -- e.g. 2025/2026
  semester text NOT NULL,
  -- Array of { courseCode, courseTitle, creditUnits, score, grade, gradePoint }
  courses jsonb NOT NULL DEFAULT '[]'::jsonb,
  gpa numeric(3, 2) NOT NULL DEFAULT 0.00 CHECK (gpa >= 0 AND gpa <= 4.00),
  cgpa numeric(3, 2) NOT NULL DEFAULT 0.00 CHECK (cgpa >= 0 AND cgpa <= 4.00),
  total_credits_earned integer NOT NULL DEFAULT 0 CHECK (total_credits_earned >= 0),
  status text NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  published_date text NOT NULL DEFAULT '',
  remarks text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5.4 Internal Certificates (Strictly Private — Student Owner & Admin Only)
CREATE TABLE IF NOT EXISTS public.internal_certificates (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  certificate_number text NOT NULL UNIQUE, -- e.g. HATHUN-CERT-2026-0014
  student_id text NOT NULL REFERENCES public.students(student_id) ON UPDATE CASCADE ON DELETE CASCADE,
  student_name text NOT NULL,
  programme text NOT NULL,
  faculty text NOT NULL,
  award_level text NOT NULL CHECK (
    award_level IN ('Certificate', 'Diploma', 'Bachelor', 'Master’s', 'Master''s', 'PhD', 'Honorary Doctorate')
  ),
  date_awarded text NOT NULL,
  chancellor_name text NOT NULL,
  registrar_name text NOT NULL,
  classification text,
  citation text,
  is_private boolean NOT NULL DEFAULT true CHECK (is_private = true),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE SEQUENCE IF NOT EXISTS public.certificate_num_seq START 1;

CREATE OR REPLACE FUNCTION public.assign_certificate_number()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.certificate_number IS NULL OR btrim(NEW.certificate_number) = '' THEN
    NEW.certificate_number := format(
      'HATHUN-CERT-%s-%s',
      to_char(now(), 'YYYY'),
      lpad(nextval('public.certificate_num_seq')::text, 4, '0')
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_certificate_number ON public.internal_certificates;
CREATE TRIGGER trg_assign_certificate_number
  BEFORE INSERT ON public.internal_certificates
  FOR EACH ROW EXECUTE FUNCTION public.assign_certificate_number();

-- ============================================================================
-- 6. Triggers for updated_at
-- ============================================================================
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'profiles',
    'university_settings',
    'faculties',
    'programmes',
    'courses',
    'board_members',
    'affiliations',
    'news_articles',
    'university_events',
    'university_documents',
    'gallery_items',
    'students',
    'admission_applications',
    'academic_results',
    'internal_certificates'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON public.%I;', tbl, tbl);
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();',
      tbl, tbl
    );
  END LOOP;
END $$;

-- ============================================================================
-- 7. Indexes for Performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_programmes_faculty_id ON public.programmes(faculty_id);
CREATE INDEX IF NOT EXISTS idx_programmes_level ON public.programmes(level);
CREATE INDEX IF NOT EXISTS idx_courses_faculty_id ON public.courses(faculty_id);
CREATE INDEX IF NOT EXISTS idx_board_members_order ON public.board_members(display_order);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON public.gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_documents_private ON public.university_documents(is_private);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.admission_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.admission_applications(email);
CREATE INDEX IF NOT EXISTS idx_students_auth_user_id ON public.students(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_results_student_id ON public.academic_results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_status ON public.academic_results(status);
CREATE INDEX IF NOT EXISTS idx_certificates_student_id ON public.internal_certificates(student_id);

-- ============================================================================
-- 8. Row-Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on every table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_certificates ENABLE ROW LEVEL SECURITY;

-- 8.1 Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own full_name only" ON public.profiles;
CREATE POLICY "Users can update own full_name only"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
  );

DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 8.2 Public Read + Admin Write Catalog Tables
DO $$
DECLARE
  public_tbl text;
BEGIN
  FOREACH public_tbl IN ARRAY ARRAY[
    'university_settings',
    'faculties',
    'programmes',
    'courses',
    'board_members',
    'affiliations',
    'news_articles',
    'university_events',
    'gallery_items'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public read %I" ON public.%I;', public_tbl, public_tbl);
    EXECUTE format(
      'CREATE POLICY "Public read %I" ON public.%I FOR SELECT TO anon, authenticated USING (true);',
      public_tbl, public_tbl
    );
    EXECUTE format('DROP POLICY IF EXISTS "Admin insert %I" ON public.%I;', public_tbl, public_tbl);
    EXECUTE format(
      'CREATE POLICY "Admin insert %I" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_admin());',
      public_tbl, public_tbl
    );
    EXECUTE format('DROP POLICY IF EXISTS "Admin update %I" ON public.%I;', public_tbl, public_tbl);
    EXECUTE format(
      'CREATE POLICY "Admin update %I" ON public.%I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());',
      public_tbl, public_tbl
    );
    EXECUTE format('DROP POLICY IF EXISTS "Admin delete %I" ON public.%I;', public_tbl, public_tbl);
    EXECUTE format(
      'CREATE POLICY "Admin delete %I" ON public.%I FOR DELETE TO authenticated USING (public.is_admin());',
      public_tbl, public_tbl
    );
  END LOOP;
END $$;

-- 8.3 University Documents (Public only sees non-private; Auth users & Admins see private)
DROP POLICY IF EXISTS "Public can read public documents" ON public.university_documents;
CREATE POLICY "Public can read public documents"
  ON public.university_documents FOR SELECT
  TO anon, authenticated
  USING (is_private = false OR auth.role() = 'authenticated' OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage documents" ON public.university_documents;
CREATE POLICY "Admin manage documents"
  ON public.university_documents FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 8.4 Admission Applications
-- Anyone (anon or authenticated) can submit an application, locked to status = 'Pending'
DROP POLICY IF EXISTS "Public can submit admission application" ON public.admission_applications;
CREATE POLICY "Public can submit admission application"
  ON public.admission_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'Pending'
    AND assigned_student_id IS NULL
  );

DROP POLICY IF EXISTS "Admins can view and manage all applications" ON public.admission_applications;
CREATE POLICY "Admins can view and manage all applications"
  ON public.admission_applications FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 8.5 Students
DROP POLICY IF EXISTS "Students can view own record" ON public.students;
CREATE POLICY "Students can view own record"
  ON public.students FOR SELECT
  TO authenticated
  USING (
    auth_user_id = auth.uid()
    OR student_id = public.current_user_student_id()
    OR lower(email) = lower(coalesce(auth.jwt()->>'email', ''))
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can manage students" ON public.students;
CREATE POLICY "Admins can manage students"
  ON public.students FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 8.6 Academic Results (Students only see their own Published results; Admins see all)
DROP POLICY IF EXISTS "Students can view own published results" ON public.academic_results;
CREATE POLICY "Students can view own published results"
  ON public.academic_results FOR SELECT
  TO authenticated
  USING (
    public.is_admin()
    OR (
      status = 'Published'
      AND EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.student_id = academic_results.student_id
          AND (
            s.auth_user_id = auth.uid()
            OR s.student_id = public.current_user_student_id()
            OR lower(s.email) = lower(coalesce(auth.jwt()->>'email', ''))
          )
      )
    )
  );

DROP POLICY IF EXISTS "Admins can manage academic results" ON public.academic_results;
CREATE POLICY "Admins can manage academic results"
  ON public.academic_results FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 8.7 Internal Certificates (Strictly Private — Student Owner & Admin Only)
DROP POLICY IF EXISTS "Students can view own private certificates" ON public.internal_certificates;
CREATE POLICY "Students can view own private certificates"
  ON public.internal_certificates FOR SELECT
  TO authenticated
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.student_id = internal_certificates.student_id
        AND (
          s.auth_user_id = auth.uid()
          OR s.student_id = public.current_user_student_id()
          OR lower(s.email) = lower(coalesce(auth.jwt()->>'email', ''))
        )
    )
  );

DROP POLICY IF EXISTS "Admins can manage internal certificates" ON public.internal_certificates;
CREATE POLICY "Admins can manage internal certificates"
  ON public.internal_certificates FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================================
-- 9. Safe Public & Admin RPC Functions
-- ============================================================================

-- Allow prospective applicants to check their own application status safely
-- without exposing other applicants' PII via public SELECT policies.
CREATE OR REPLACE FUNCTION public.check_application_status(
  p_reference_number text,
  p_email text
)
RETURNS TABLE (
  reference_number text,
  applicant_name text,
  programme text,
  academic_level text,
  status text,
  submitted_at timestamptz,
  assigned_student_id text,
  notes text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    a.reference_number,
    trim(a.first_name || ' ' || coalesce(a.middle_name || ' ', '') || a.last_name) AS applicant_name,
    a.programme,
    a.academic_level,
    a.status,
    a.submitted_at,
    a.assigned_student_id,
    a.notes
  FROM public.admission_applications a
  WHERE lower(a.reference_number) = lower(trim(p_reference_number))
    AND lower(a.email) = lower(trim(p_email))
  LIMIT 1;
$$;

-- Admin-only helper to admit an applicant and create their Student record atomically
CREATE SEQUENCE IF NOT EXISTS public.student_num_seq START 1;

CREATE OR REPLACE FUNCTION public.admit_applicant(p_application_id text)
RETURNS public.students
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_app public.admission_applications;
  v_student public.students;
  v_student_code text;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only administrators can admit applicants.';
  END IF;

  SELECT * INTO v_app
  FROM public.admission_applications
  WHERE id = p_application_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Admission application not found.';
  END IF;

  IF v_app.assigned_student_id IS NOT NULL THEN
    SELECT * INTO v_student FROM public.students WHERE student_id = v_app.assigned_student_id;
    RETURN v_student;
  END IF;

  v_student_code := format(
    'HATHUN/%s/%s',
    to_char(now(), 'YYYY'),
    lpad(nextval('public.student_num_seq')::text, 4, '0')
  );

  INSERT INTO public.students (
    student_id,
    full_name,
    email,
    phone,
    faculty,
    programme,
    academic_level,
    admission_year,
    current_semester,
    status,
    cgpa,
    enrollment_reference
  ) VALUES (
    v_student_code,
    trim(v_app.first_name || ' ' || coalesce(v_app.middle_name || ' ', '') || v_app.last_name),
    v_app.email,
    v_app.phone,
    v_app.faculty,
    v_app.programme,
    v_app.academic_level,
    to_char(now(), 'YYYY'),
    'Semester 1',
    'Active',
    0.00,
    v_app.reference_number
  )
  RETURNING * INTO v_student;

  UPDATE public.admission_applications
  SET
    status = 'Approved',
    assigned_student_id = v_student_code,
    notes = coalesce(notes || E'\n', '') || 'Admitted as Student ID: ' || v_student_code
  WHERE id = p_application_id;

  RETURN v_student;
END;
$$;

-- ============================================================================
-- 10. Supabase Storage Buckets & Policies
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('university-media', 'university-media', true),
  ('admissions-documents', 'admissions-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Public read for university-media (gallery, board portraits, news images, brochures)
DROP POLICY IF EXISTS "Public read university-media" ON storage.objects;
CREATE POLICY "Public read university-media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'university-media');

DROP POLICY IF EXISTS "Admins manage university-media" ON storage.objects;
CREATE POLICY "Admins manage university-media"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'university-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'university-media' AND public.is_admin());

-- Applicants can upload admission documents; only admins can view/delete them
DROP POLICY IF EXISTS "Anyone can upload admission documents" ON storage.objects;
CREATE POLICY "Anyone can upload admission documents"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'admissions-documents');

DROP POLICY IF EXISTS "Admins can view and manage admission documents" ON storage.objects;
CREATE POLICY "Admins can view and manage admission documents"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'admissions-documents' AND public.is_admin())
  WITH CHECK (bucket_id = 'admissions-documents' AND public.is_admin());

-- ============================================================================
-- 11. Explicit Role Grants (Required by PostgREST alongside RLS policies)
-- ============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Public read tables
GRANT SELECT ON
  public.university_settings,
  public.faculties,
  public.programmes,
  public.courses,
  public.board_members,
  public.affiliations,
  public.news_articles,
  public.university_events,
  public.gallery_items,
  public.university_documents
TO anon, authenticated;

-- Public admission submission (RLS enforces status = 'Pending')
GRANT INSERT ON public.admission_applications TO anon, authenticated;

-- Authenticated full table privileges (guarded strictly by RLS policies)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Sequence permissions for auto-generated reference/student/certificate IDs
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- RPC function execution permissions
GRANT EXECUTE ON FUNCTION public.check_application_status(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admit_applicant(text) TO authenticated;

