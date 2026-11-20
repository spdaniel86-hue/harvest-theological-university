import React, { useState, useEffect } from 'react';
import { UniversityProvider, useUniversity } from './context/UniversityContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { AcademicLevelsSection } from './components/AcademicLevelsSection';
import { WhyChooseHathun } from './components/WhyChooseHathun';
import { FacultiesSection } from './components/FacultiesSection';
import { TheologyFacultyHighlight } from './components/TheologyFacultyHighlight';
import { ProgrammesDirectory } from './components/ProgrammesDirectory';
import { AccreditationSection } from './components/AccreditationSection';
import { AcademicLifeSection } from './components/AcademicLifeSection';
import { BoardOfDirectorsSection } from './components/BoardOfDirectorsSection';
import { GallerySection } from './components/GallerySection';
import { NewsEventsSection } from './components/NewsEventsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { DocumentCentreSection } from './components/DocumentCentreSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentPortal } from './components/StudentPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ApplicationConfirmationSlipModal } from './components/ApplicationConfirmationSlipModal';
import { CertificateViewerModal } from './components/CertificateViewerModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AIAssistantFloatingButton } from './components/AIAssistantFloatingButton';
import { Programme, AdmissionApplication, InternalCertificate } from './types';

function MainApp() {
  const { role, currentStudent } = useUniversity();

  // Active section tracking for header highlight
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTarget, setAuthTarget] = useState<'student' | 'admin'>('student');
  const [activeSlipApp, setActiveSlipApp] = useState<AdmissionApplication | null>(null);
  const [activeCert, setActiveCert] = useState<InternalCertificate | null>(null);
  const [selectedProgrammeForAdmissions, setSelectedProgrammeForAdmissions] = useState<Programme | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenAdmissions = () => {
    handleNavigateSection('admissions');
  };

  const handleOpenPortal = (target: 'student' | 'admin') => {
    setAuthTarget(target);
    setAuthModalOpen(true);
  };

  const handleApplyForProgramme = (prog: Programme) => {
    setSelectedProgrammeForAdmissions(prog);
    handleNavigateSection('admissions');
  };

  // If role is 'student', render private Student Portal
  if (role === 'student') {
    return (
      <>
        <StudentPortal
          onBackToPublic={() => window.location.reload()}
          onViewCertificateModal={(cert) => setActiveCert(cert)}
        />
        {activeCert && (
          <CertificateViewerModal
            certificate={activeCert}
            onClose={() => setActiveCert(null)}
          />
        )}
      </>
    );
  }

  // If role is 'admin', render Admin Dashboard
  if (role === 'admin') {
    return (
      <>
        <AdminDashboard
          onBackToPublic={() => window.location.reload()}
          onViewConfirmationSlip={(app) => setActiveSlipApp(app)}
          onViewCertificateModal={(cert) => setActiveCert(cert)}
        />
        {activeSlipApp && (
          <ApplicationConfirmationSlipModal
            application={activeSlipApp}
            onClose={() => setActiveSlipApp(null)}
          />
        )}
        {activeCert && (
          <CertificateViewerModal
            certificate={activeCert}
            onClose={() => setActiveCert(null)}
          />
        )}
      </>
    );
  }

  // Otherwise render the full public website with the 16 exact sections in order
  return (
    <div className="min-h-screen bg-[#060e1d] text-slate-100 flex flex-col selection:bg-[#d4af37] selection:text-[#060e1d]">
      {/* 1. Premium Sticky Header */}
      <Header
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenAdmissions={handleOpenAdmissions}
        onOpenPortal={handleOpenPortal}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onApplyNow={handleOpenAdmissions}
          onExploreProgrammes={() => handleNavigateSection('programmes')}
          onContactAdmissions={() => handleNavigateSection('contact')}
        />

        {/* 3. Welcome to HATHUN */}
        <WelcomeSection
          onLearnMore={() => handleNavigateSection('about')}
          onExploreFaculties={() => handleNavigateSection('faculties')}
        />

        {/* 4. Academic Levels */}
        <AcademicLevelsSection
          onApplyForLevel={(level) => handleOpenAdmissions()}
        />

        {/* 5. Why Choose HATHUN */}
        <WhyChooseHathun />

        {/* 6. Faculties Directory */}
        <FacultiesSection
          onSelectFaculty={(facId) => handleNavigateSection('programmes')}
          onApplyForFaculty={(facName) => handleOpenAdmissions()}
        />

        {/* 7. Faculty of Theology Dedicated Highlight */}
        <div id="theology">
          <TheologyFacultyHighlight
            onApplyTheology={handleOpenAdmissions}
            onViewProgrammes={() => handleNavigateSection('programmes')}
          />
        </div>

        {/* 8. Programmes Directory */}
        <ProgrammesDirectory
          onApplyForProgramme={handleApplyForProgramme}
        />

        {/* 9. Accreditation / Partnerships / Affiliations */}
        <AccreditationSection />

        {/* 10. Academic Life */}
        <div id="academic-life">
          <AcademicLifeSection />
        </div>

        {/* 11. Board of Directors */}
        <BoardOfDirectorsSection />

        {/* 12. Gallery */}
        <GallerySection />

        {/* 13. News & Events */}
        <NewsEventsSection />

        {/* 14. Admissions Call-to-Action & Multi-Step Online Admission Application */}
        <AdmissionsSection
          initialProgramme={selectedProgrammeForAdmissions}
          onViewConfirmationSlip={(app) => setActiveSlipApp(app)}
        />

        {/* Document Centre Section */}
        <DocumentCentreSection />

        {/* 15. Contact Section */}
        <ContactSection />
      </main>

      {/* 16. Premium Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPortal={handleOpenPortal}
        onOpenAdmissions={handleOpenAdmissions}
      />

      {/* Floating Direct WhatsApp Action */}
      <WhatsAppFloatingButton />

      {/* Floating AI Academic Assistant Button */}
      <AIAssistantFloatingButton onClick={() => setAiAssistantOpen(true)} />

      {/* Automated AI Academic Assistant Modal */}
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onNavigateSection={handleNavigateSection}
      />

      {authModalOpen && (
        <AuthModal
          initialTarget={authTarget}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => setAuthModalOpen(false)}
        />
      )}

      {activeSlipApp && (
        <ApplicationConfirmationSlipModal
          application={activeSlipApp}
          onClose={() => setActiveSlipApp(null)}
        />
      )}

      {activeCert && (
        <CertificateViewerModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <UniversityProvider>
      <MainApp />
    </UniversityProvider>
  );
}
