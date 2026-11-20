import React, { useState } from 'react';
import { useUniversity } from '../context/UniversityContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { HathunLogo } from './HathunLogo';

export const ContactSection: React.FC = () => {
  const { universityInfo } = useUniversity();
  const [formSent, setFormSent] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    facultyInterest: 'FACULTY OF THEOLOGY',
    message: ''
  });

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.email || !inquiry.message) return;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#09152b] border-t border-[#14284d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#d4af37]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase font-heading">
              OFFICIAL CORRESPONDENCE
            </span>
            <span className="h-[2px] w-6 bg-[#d4af37]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            CONTACT THE UNIVERSITY
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reach the International Head Office and Registry for admissions enquiries, academic verification requests, and institutional affiliations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Official Location & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b1b38] border border-[#1c3c72] rounded-lg p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                <HathunLogo variant="seal" size="md" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    HARVESTER’S THEOLOGICAL UNIVERSITY
                  </h3>
                  <span className="text-xs text-[#d4af37] font-semibold">
                    {universityInfo.headOffice.title}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                {/* Official Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#102750] border border-[#204582] flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-heading mb-0.5">Campus Physical Address:</strong>
                    <p className="text-slate-200">{universityInfo.headOffice.formattedAddress}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Former Police Control, Ambam-yat, Ambam, South Region, Cameroon</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#102750] border border-[#204582] flex items-center justify-center text-sky-400 flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-heading mb-0.5">Official University Email:</strong>
                    <p className="text-[#38bdf8] font-mono">{universityInfo.headOffice.email}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">For General Registry: {universityInfo.headOffice.supportEmail}</p>
                  </div>
                </div>

                {/* Telephone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#102750] border border-[#204582] flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-heading mb-0.5">Telephone & Registry Lines:</strong>
                    <p className="text-slate-200">{universityInfo.headOffice.phone}</p>
                    <a
                      href="https://wa.me/237672929067"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-700/60 rounded px-2.5 py-1 mt-1 transition cursor-pointer"
                      title="Open WhatsApp chat with +237672929067"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>Click to Chat on WhatsApp: +237672929067</span>
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded bg-[#102750] border border-[#204582] flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-heading mb-0.5">Official Registry Hours:</strong>
                    <p className="text-slate-200">{universityInfo.headOffice.officeHours}</p>
                  </div>
                </div>
              </div>

              {/* Strict Disclaimer Box */}
              <div className="mt-6 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-[#d4af37] font-semibold block mb-0.5">Admissions Notice:</span>
                Prospective students may arrange visits to the Ambam campus or schedule virtual admissions counselling through the contact desk.
              </div>
            </div>
          </div>

          {/* Interactive Correspondence Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b1b38] border border-[#1c3c72] rounded-lg p-6 sm:p-8 shadow-xl">
              <div className="border-b border-slate-700 pb-3 mb-6">
                <h3 className="text-lg font-bold text-white font-heading">
                  SEND AN OFFICIAL INQUIRY
                </h3>
                <p className="text-xs text-slate-300">
                  Submit your query to the Admissions Office. Responses are provided within 24 to 48 business hours.
                </p>
              </div>

              {formSent ? (
                <div className="text-center py-10 space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">
                    Inquiry Received by Registry
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{inquiry.name}</strong>. An admissions advisor at Harvester’s Theological University will contact you at <strong>{inquiry.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setInquiry({ name: '', email: '', phone: '', facultyInterest: 'FACULTY OF THEOLOGY', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#060e1d] bg-[#d4af37] rounded"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiry.name}
                        onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                        placeholder="e.g. Pastor John Doe"
                        className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiry.email}
                        onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={inquiry.phone}
                        onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                        placeholder="+237 / +234..."
                        className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Faculty of Interest
                      </label>
                      <select
                        value={inquiry.facultyInterest}
                        onChange={(e) => setInquiry({ ...inquiry, facultyInterest: e.target.value })}
                        className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="FACULTY OF THEOLOGY">FACULTY OF THEOLOGY</option>
                        <option value="FACULTY OF LAW">FACULTY OF LAW</option>
                        <option value="FACULTY OF PUBLIC ADMINISTRATION">FACULTY OF PUBLIC ADMINISTRATION</option>
                        <option value="FACULTY OF BUSINESS MANAGEMENT AND MARKETING">FACULTY OF BUSINESS MANAGEMENT</option>
                        <option value="FACULTY OF AGRICULTURE">FACULTY OF AGRICULTURE</option>
                        <option value="FACULTY OF MEDICAL SCIENCE & MEDICINE">FACULTY OF MEDICAL SCIENCE</option>
                        <option value="FACULTY OF ARTS AND CULTURE">FACULTY OF ARTS AND CULTURE</option>
                        <option value="FACULTY OF POLITICAL SCIENCE">FACULTY OF POLITICAL SCIENCE</option>
                        <option value="FACULTY OF PUBLIC COMMUNICATION">FACULTY OF PUBLIC COMMUNICATION</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Message or Question <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={inquiry.message}
                      onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                      placeholder="Please specify your academic level, intended area of study, or institutional question..."
                      className="w-full bg-[#060f22] border border-[#1a3869] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#060e1d] bg-gradient-to-r from-[#d4af37] to-[#e6c662] hover:brightness-110 rounded shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Official Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
