import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { AcademicLevel, AdmissionApplication, Programme } from '../types';
import { 
  FileText, 
  CheckCircle, 
  Upload, 
  Printer, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Info,
  ShieldCheck,
  User,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileCheck
} from 'lucide-react';
import { HathunLogo } from './HathunLogo';

interface AdmissionsSectionProps {
  initialProgramme?: Programme | null;
  onViewConfirmationSlip?: (app: AdmissionApplication) => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  initialProgramme,
  onViewConfirmationSlip,
}) => {
  const { faculties, programmes, submitApplication, universityInfo } = useUniversity();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dateOfBirth: '',
    nationality: 'Cameroonian',
    country: 'Cameroon',
    stateRegion: 'South Region',
    city: 'Ambam',
    residentialAddress: '',
    phone: '',
    whatsapp: '',
    email: '',

    // Step 2 & 3: Academic & Programme Selection
    previousInstitution: '',
    previousQualification: '',
    graduationYear: '2024',
    academicLevel: (initialProgramme?.level || 'Bachelor') as AcademicLevel,
    faculty: initialProgramme?.facultyName || 'FACULTY OF THEOLOGY',
    programme: initialProgramme?.name || 'Biblical Studies',

    // Step 4: Documents (Simulated file attachments)
    passportPhotoName: '',
    academicDocumentsName: '',
    supportingDocumentsName: '',
    personalStatement: '',
  });

  const [errorMsg, setErrorMsg] = useState<string>('');

  // Handle Faculty change and sync available programmes
  const handleFacultyChange = (newFacultyName: string) => {
    const selectedFac = faculties.find(f => f.name === newFacultyName);
    const available = programmes.filter(p => p.facultyName === newFacultyName);
    setFormData(prev => ({
      ...prev,
      faculty: newFacultyName,
      programme: available[0]?.name || selectedFac?.availableProgrammes[0] || 'Biblical Studies'
    }));
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setErrorMsg('Please enter both your First Name and Last Name.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMsg('Please enter your primary phone number.');
        return false;
      }
      if (!formData.dateOfBirth) {
        setErrorMsg('Please enter your Date of Birth.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.previousInstitution.trim() || !formData.previousQualification.trim()) {
        setErrorMsg('Please enter your previous institution and qualification.');
        return false;
      }
    }

    if (step === 3) {
      if (!formData.faculty || !formData.programme) {
        setErrorMsg('Please select your target Faculty and Programme.');
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('admissions')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    const newApp = submitApplication({
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      nationality: formData.nationality,
      country: formData.country,
      stateRegion: formData.stateRegion,
      city: formData.city,
      residentialAddress: formData.residentialAddress || 'Ambam, Cameroon',
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      faculty: formData.faculty,
      programme: formData.programme,
      academicLevel: formData.academicLevel,
      previousInstitution: formData.previousInstitution,
      previousQualification: formData.previousQualification,
      graduationYear: formData.graduationYear,
      passportPhotoName: formData.passportPhotoName || 'passport_photo.jpg',
      academicDocumentsName: formData.academicDocumentsName || 'certified_transcript.pdf',
      supportingDocumentsName: formData.supportingDocumentsName || 'recommendation_letter.pdf',
      personalStatement: formData.personalStatement || 'Dedicated to advancing theological knowledge and Christian service.'
    });

    setSubmittedApp(newApp);
    setCurrentStep(6);
  };

  const stepsList = [
    { num: 1, label: 'Personal Information' },
    { num: 2, label: 'Academic Background' },
    { num: 3, label: 'Programme Selection' },
    { num: 4, label: 'Document Verification' },
    { num: 5, label: 'Application Review' },
    { num: 6, label: 'Submission' },
  ];

  return (
    <section id="admissions" className="py-20 bg-[#060e1d] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              ONLINE ENROLLMENT
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            START YOUR ACADEMIC JOURNEY WITH HATHUN
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm sm:text-base leading-relaxed">
            Welcome to Harvester’s Theological University. Complete our secure online admission application below. No application fees are charged on this website.
          </p>
        </div>

        {/* Multi-Step Indicator Bar */}
        <div className="mb-10 bg-[#091733] border border-[#1a3869] rounded-lg p-4 shadow-lg overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {stepsList.map((step, idx) => {
              const isPassed = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <div key={step.num} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isPassed
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#d4af37] text-[#060e1d] ring-2 ring-[#d4af37]/40'
                        : 'bg-[#102449] text-slate-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isCurrent ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  {idx < stepsList.length - 1 && (
                    <div className="w-6 h-[1px] bg-slate-700 mx-1 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-950/60 border border-rose-600 rounded-lg flex items-center gap-3 text-xs text-rose-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step Container Form */}
        <div className="bg-[#091834] border border-[#1c3c72] rounded-lg p-6 sm:p-10 shadow-2xl">
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-700/80 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  STEP 1: Personal Information
                </h3>
                <p className="text-xs text-slate-300">
                  Please enter your legal name and contact details as they appear on official government identification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    First Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Emmanuel"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    placeholder="e.g. Nji"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Last Name / Surname <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Mbah"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gender <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Birth <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nationality <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="e.g. Cameroonian"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country of Residence <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Cameroon"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={formData.stateRegion}
                    onChange={(e) => setFormData({ ...formData, stateRegion: e.target.value })}
                    placeholder="e.g. South Region"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ambam"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                  placeholder="Street name, neighborhood, landmark..."
                  className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+237 600 000 000"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+237 600 000 000"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Background */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-700/80 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  STEP 2: Academic Background
                </h3>
                <p className="text-xs text-slate-300">
                  Provide records of your previous school, Bible college, seminary, or university studies.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Previous Institution Attended <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.previousInstitution}
                    onChange={(e) => setFormData({ ...formData, previousInstitution: e.target.value })}
                    placeholder="e.g. Grace Theological Institute / Secondary School"
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Highest Qualification Obtained <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.previousQualification}
                      onChange={(e) => setFormData({ ...formData, previousQualification: e.target.value })}
                      placeholder="e.g. Diploma in Ministry / High School Diploma / Bachelor"
                      className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Year of Graduation / Completion
                    </label>
                    <input
                      type="text"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      placeholder="e.g. 2024"
                      className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#0f244b] rounded flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Programme Selection */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-700/80 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  STEP 3: Programme & Faculty Selection
                </h3>
                <p className="text-xs text-slate-300">
                  Select the faculty and specific programme you intend to pursue at HATHUN.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Academic Faculty <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.faculty}
                    onChange={(e) => handleFacultyChange(e.target.value)}
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {faculties.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Academic Level <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formData.academicLevel}
                      onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })}
                      className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Certificate">Certificate</option>
                      <option value="Diploma">Diploma (2 Years)</option>
                      <option value="Bachelor">Bachelor (2 Years)</option>
                      <option value="Master’s">Master’s (1 Year)</option>
                      <option value="PhD">PhD (3 Years)</option>
                      <option value="Honorary Doctorate">Honorary Doctorate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Programme of Study <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.programme}
                      onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                      placeholder="e.g. Biblical Studies / Church Administration / Law"
                      className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#071328] border border-[#18366c] rounded text-xs text-slate-300">
                  <span className="font-semibold text-[#d4af37] block mb-1">Fees & Institutional Guidelines:</span>
                  Registration for {formData.academicLevel} studies is set at official university schedule (e.g. Diploma $50, Bachelor $100, Master’s $150, PhD $200). Tuition fees are <strong>Very Affordable</strong>. Official payment instructions will be delivered directly by the Admissions Office.
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#0f244b] rounded flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 4</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Document Verification */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-700/80 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  STEP 4: Document Verification & Statement
                </h3>
                <p className="text-xs text-slate-300">
                  Specify your uploaded credentials and ministerial statement. Documents are preserved securely for registry appraisal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#071328] border border-dashed border-slate-600 rounded text-center">
                    <Upload className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
                    <label className="block text-xs font-semibold text-white mb-1">
                      Passport Photograph
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. passport_photo.jpg"
                      value={formData.passportPhotoName}
                      onChange={(e) => setFormData({ ...formData, passportPhotoName: e.target.value })}
                      className="w-full bg-[#050d1c] border border-slate-700 rounded px-2 py-1.5 text-[11px] text-white"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Recent white-background portrait</span>
                  </div>

                  <div className="p-4 bg-[#071328] border border-dashed border-slate-600 rounded text-center">
                    <FileCheck className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                    <label className="block text-xs font-semibold text-white mb-1">
                      Academic Documents
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. diploma_transcript.pdf"
                      value={formData.academicDocumentsName}
                      onChange={(e) => setFormData({ ...formData, academicDocumentsName: e.target.value })}
                      className="w-full bg-[#050d1c] border border-slate-700 rounded px-2 py-1.5 text-[11px] text-white"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Transcripts, certificates, diplomas</span>
                  </div>

                  <div className="p-4 bg-[#071328] border border-dashed border-slate-600 rounded text-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <label className="block text-xs font-semibold text-white mb-1">
                      Supporting Documents
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. pastoral_letter.pdf"
                      value={formData.supportingDocumentsName}
                      onChange={(e) => setFormData({ ...formData, supportingDocumentsName: e.target.value })}
                      className="w-full bg-[#050d1c] border border-slate-700 rounded px-2 py-1.5 text-[11px] text-white"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Recommendation or ministry bio</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Personal / Ministerial Statement
                  </label>
                  <textarea
                    rows={4}
                    value={formData.personalStatement}
                    onChange={(e) => setFormData({ ...formData, personalStatement: e.target.value })}
                    placeholder="Briefly state your academic objectives, spiritual calling, and why you have selected Harvester’s Theological University..."
                    className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#0f244b] rounded flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Application (Step 5)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-700/80 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  STEP 5: Review Application Details
                </h3>
                <p className="text-xs text-slate-300">
                  Carefully verify all details before submitting. Once submitted, your application reference will be generated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                <div className="bg-[#060f22] p-4 rounded border border-slate-800 space-y-2">
                  <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
                    Applicant Profile
                  </h4>
                  <p><strong>Full Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
                  <p><strong>Gender / DOB:</strong> {formData.gender} · {formData.dateOfBirth}</p>
                  <p><strong>Nationality:</strong> {formData.nationality}</p>
                  <p><strong>Address:</strong> {formData.city}, {formData.stateRegion}, {formData.country}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone} (WhatsApp: {formData.whatsapp || formData.phone})</p>
                </div>

                <div className="bg-[#060f22] p-4 rounded border border-slate-800 space-y-2">
                  <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
                    Academic Programme Choice
                  </h4>
                  <p><strong>Faculty:</strong> {formData.faculty}</p>
                  <p><strong>Programme:</strong> {formData.programme}</p>
                  <p><strong>Level:</strong> {formData.academicLevel}</p>
                  <p><strong>Previous Institution:</strong> {formData.previousInstitution}</p>
                  <p><strong>Previous Qualification:</strong> {formData.previousQualification} ({formData.graduationYear})</p>
                </div>
              </div>

              {/* Anti-Payment Notice & Declaration */}
              <div className="p-4 bg-[#08152e] border border-[#1b3d72] rounded text-xs text-slate-300 leading-relaxed">
                <div className="flex items-center gap-2 text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-1 font-heading">
                  <Info className="w-4 h-4" />
                  <span>Submission Notice</span>
                </div>
                <p>
                  By submitting this application, I solemnly certify that all details submitted are truthful and complete. I acknowledge that Harvester’s Theological University does not process payments through this website and all official tuition and fees instructions will be communicated by the Admissions Office.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#0f244b] rounded flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#060e1d] bg-gradient-to-r from-[#d4af37] to-[#e6c662] hover:brightness-110 rounded shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>SUBMIT APPLICATION (STEP 6)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Submission Success */}
          {currentStep === 6 && submittedApp && (
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block font-heading">
                  ENROLLMENT CONFIRMED
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                  APPLICATION SUBMITTED SUCCESSFULLY
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2">
                  Your admission file has been logged in the Harvester’s Theological University Academic Registry.
                </p>
              </div>

              {/* Prominent Application Reference */}
              <div className="bg-[#060f22] border-2 border-[#d4af37] rounded-lg p-6 max-w-md mx-auto shadow-xl">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                  Official Application Reference:
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#d4af37] tracking-wider block mt-1">
                  {submittedApp.referenceNumber}
                </span>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Submitted on {submittedApp.submittedAt}
                </span>
              </div>

              {/* Instructions */}
              <div className="bg-[#071328] border border-slate-700/60 rounded-lg p-5 max-w-lg mx-auto text-left text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-white">Next Steps for Applicant:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Keep your reference number (<strong className="text-white">{submittedApp.referenceNumber}</strong>) secure for tracking.</li>
                  <li>The University Admissions Office at Ambam will review your credentials within 2–5 working days.</li>
                  <li>Upon approval, your formal admission letter and official Student ID will be generated.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => onViewConfirmationSlip && onViewConfirmationSlip(submittedApp)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Application Confirmation Slip</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSubmittedApp(null);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#0e244d] border border-[#21437c] rounded cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
