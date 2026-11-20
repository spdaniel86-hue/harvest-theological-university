import React from 'react';
import { AdmissionApplication } from '../types';
import { HathunLogo } from './HathunLogo';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';

interface ApplicationConfirmationSlipModalProps {
  application: AdmissionApplication;
  onClose: () => void;
}

export const ApplicationConfirmationSlipModal: React.FC<ApplicationConfirmationSlipModalProps> = ({
  application,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 border-4 border-[#0b1b38]">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            OFFICIAL ADMISSION CONFIRMATION SLIP
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0e2752] hover:bg-[#163a78] rounded shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div className="space-y-6 print:p-0">
          {/* Header Seal & Title */}
          <div className="flex items-center justify-between border-b-2 border-[#c59b27] pb-4">
            <div className="flex items-center gap-3">
              <HathunLogo variant="seal" size="lg" />
              <div>
                <h1 className="text-lg sm:text-xl font-black text-[#081830] font-heading tracking-tight leading-tight">
                  HARVESTER’S THEOLOGICAL UNIVERSITY
                </h1>
                <p className="text-xs font-bold text-[#c59b27] font-heading tracking-widest uppercase">
                  “WE ARE A SURE GUIDE TO YOUR DREAM”
                </p>
                <p className="text-[10px] text-slate-500">
                  Ambam-yat, Ambam, South Region, Cameroon · admissions@hathun.edu
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Application Reference:
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-[#081830] block">
                {application.referenceNumber}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 inline-block mt-1">
                {application.status}
              </span>
            </div>
          </div>

          {/* Document Subtitle */}
          <div className="text-center py-1 bg-slate-100 rounded border border-slate-200">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#081830] font-heading">
              OFFICIAL ADMISSION APPLICATION ACKNOWLEDGEMENT SLIP
            </h2>
          </div>

          {/* Section 1: Candidate Bio */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Candidate Full Name</span>
              <strong className="text-slate-900 text-sm">{application.firstName} {application.middleName} {application.lastName}</strong>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Gender / Date of Birth</span>
              <span className="text-slate-800">{application.gender} · {application.dateOfBirth}</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Nationality & Country</span>
              <span className="text-slate-800">{application.nationality} ({application.country})</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Primary Email</span>
              <span className="text-slate-800 font-mono">{application.email}</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Phone / WhatsApp</span>
              <span className="text-slate-800">{application.phone}</span>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Residential City / Region</span>
              <span className="text-slate-800">{application.city}, {application.stateRegion}</span>
            </div>
          </div>

          {/* Section 2: Programme Applied */}
          <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
            <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-wider block font-heading">
              PROGRAMME & FACULTY REGISTRATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 text-[10px] block">Chosen Programme:</span>
                <strong className="text-sm text-slate-900">{application.programme}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Academic Faculty:</span>
                <strong className="text-sm text-slate-900">{application.faculty}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Academic Level:</span>
                <span className="font-semibold text-slate-800">{application.academicLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Submission Timestamp:</span>
                <span className="text-slate-800">{application.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Academic Qualifications Provided */}
          <div className="text-xs space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Academic Record Submitted</span>
            <p className="text-slate-800">
              Previous Institution: <strong>{application.previousInstitution}</strong>
            </p>
            <p className="text-slate-800">
              Qualification: <strong>{application.previousQualification}</strong> (Completed: {application.graduationYear})
            </p>
          </div>

          {/* Important Notice Box */}
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
            <strong>OFFICIAL ADMISSIONS NOTICE:</strong> Please present this acknowledgment slip along with original credentials during orientation or credential verification. The university does not accept payments via online portals; payment for registration is handled strictly through designated university institutional accounts upon official communication.
          </div>

          {/* Official Seal Signatures Block */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="h-10 border-b border-slate-400 mx-auto w-48 flex items-end justify-center font-editorial italic text-slate-700">
                Bishop Mrs Azor Loveline Ashia
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 mt-1 block">
                Registrar and co-founder
              </span>
            </div>

            <div>
              <div className="h-10 border-b border-slate-400 mx-auto w-48 flex items-end justify-center font-editorial italic text-slate-700">
                Bishop Dr Achine Divine Fru
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 mt-1 block">
                Vice Chancellor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
