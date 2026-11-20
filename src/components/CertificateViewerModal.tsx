import React from 'react';
import { InternalCertificate } from '../types';
import { HathunLogo } from './HathunLogo';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateViewerModalProps {
  certificate: InternalCertificate;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fffdf8] text-slate-900 rounded-lg max-w-4xl w-full shadow-2xl relative p-6 sm:p-12 border-[8px] border-[#c59b27] ring-8 ring-[#0b1b38]">
        {/* Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-200 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
              OFFICIAL INTERNAL ACADEMIC CERTIFICATE (PRIVATE RECORD)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0e2752] hover:bg-[#163a78] rounded shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Parchment Body */}
        <div className="text-center py-6 px-4 sm:px-10 border-2 border-dashed border-[#c59b27]/40 relative bg-gradient-to-b from-[#fffdf8] via-[#fffaf0] to-[#fffdf8]">
          {/* Top Seal */}
          <div className="flex justify-center mb-3">
            <HathunLogo variant="seal" size="xl" />
          </div>

          <span className="text-[11px] font-bold text-[#c59b27] uppercase tracking-[0.35em] font-heading block mb-1">
            HARVESTER’S THEOLOGICAL UNIVERSITY
          </span>

          <span className="text-[10px] text-slate-600 uppercase tracking-widest block font-medium mb-4">
            “WE ARE A SURE GUIDE TO YOUR DREAM” · HATHUN
          </span>

          <p className="text-xs font-editorial italic text-slate-700 max-w-xl mx-auto mb-6">
            By the authority of the Governing Council and the Senate of Harvester's Theological University, be it known that
          </p>

          {/* Student Name */}
          <h2 className="text-2xl sm:text-4xl font-black text-[#081830] font-heading tracking-wide mb-3 border-b-2 border-[#c59b27] pb-2 max-w-lg mx-auto">
            {certificate.studentName}
          </h2>

          <p className="text-xs font-editorial italic text-slate-600 mb-4">
            having satisfactorily completed the prescribed course of study, examinations, and ministerial character requirements, is hereby admitted to the award of
          </p>

          {/* Conferred Degree / Award */}
          <h3 className="text-xl sm:text-2xl font-black text-[#0c234b] font-heading tracking-wider uppercase mb-1">
            {certificate.programme}
          </h3>

          <p className="text-xs font-bold text-[#c59b27] uppercase tracking-wider mb-2">
            {certificate.faculty}
          </p>

          {certificate.classification && (
            <p className="text-xs font-semibold text-slate-800 mb-6">
              With Honours Classification: <strong className="text-slate-900">{certificate.classification}</strong>
            </p>
          )}

          {/* Citation / Text */}
          <p className="text-[11px] text-slate-600 max-w-lg mx-auto mb-10 leading-relaxed">
            {certificate.citation || "Given under the seal of Harvester’s Theological University this day with all honors, privileges, and responsibilities thereto appertaining."}
          </p>

          {/* Signatures & Seal Section */}
          <div className="grid grid-cols-3 items-end gap-4 pt-6 border-t border-[#c59b27]/30 text-xs">
            <div className="text-center">
              <div className="h-10 border-b border-slate-500 mx-auto w-40 flex items-end justify-center font-editorial italic text-slate-800 text-sm">
                Bishop Mrs Azor Loveline Ashia
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mt-1">
                Registrar and co-founder
              </span>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#c59b27] flex items-center justify-center p-1 bg-[#fffdf5] shadow-inner mb-1">
                <HathunLogo variant="seal" size="md" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                OFFICIAL SEAL
              </span>
            </div>

            <div className="text-center">
              <div className="h-10 border-b border-slate-500 mx-auto w-48 flex items-end justify-center font-editorial italic text-slate-800 text-xs sm:text-sm">
                Archbishop Amb Prof. King Azor
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mt-1">
                Founder and Global Chancellor
              </span>
            </div>
          </div>

          {/* Certificate Identification & Date */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Certificate No: <strong>{certificate.certificateNumber}</strong></span>
            <span>Date Conferred: <strong>{certificate.dateAwarded}</strong></span>
            <span>Student ID: <strong>{certificate.studentId}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
