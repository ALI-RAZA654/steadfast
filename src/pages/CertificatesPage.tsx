import React, { useState } from 'react';
import { Certificate, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Modal } from '../components/Modal';
import { Award, ShieldCheck, Download, ExternalLink, CheckCircle2, FileCheck } from 'lucide-react';

interface CertificatesPageProps {
  certificates: Certificate[];
  onNavigate: (view: PageView, params?: any) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({
  certificates,
  onNavigate
}) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Dashboard', view: 'dashboard' },
          { label: 'Certificates' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            Verified Educational Credentials
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">
            My Earned Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Official verifiable completion records from Steadfast Deen.com scholars.
          </p>
        </div>

        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-center shrink-0">
          <Award className="w-8 h-8 text-amber-400 mx-auto" />
          <span className="text-xs font-bold text-white block mt-1">{certificates.length} Certificate Issued</span>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                  ID: {cert.certificateId}
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <h3 className="text-base font-bold font-heading text-slate-900 leading-snug">
                {cert.courseTitle}
              </h3>

              <div className="text-xs text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-800">Issued To:</span> {cert.studentName}</p>
                <p><span className="font-semibold text-slate-800">Instructor:</span> {cert.instructorName}</p>
                <p><span className="font-semibold text-slate-800">Issue Date:</span> {cert.issueDate}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2.5 px-3 text-xs font-bold rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>

              <button
                onClick={() => alert(`Simulating PDF download for ${cert.certificateId}`)}
                className="p-2.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} maxWidth="xl">
          <div className="space-y-6 text-center p-4 border-4 border-amber-400/40 rounded-2xl bg-slate-50">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-800">Certificate of Completion</span>
              <h2 className="text-2xl font-extrabold font-heading text-slate-900">Steadfast Deen.com</h2>
            </div>

            <p className="text-xs text-slate-600 italic">This is to certify that</p>
            <h3 className="text-xl font-bold font-heading text-blue-900 border-b border-amber-300 pb-2 inline-block px-6">
              {selectedCert.studentName}
            </h3>

            <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
              has successfully completed all coursework, quizzes, and scholar requirements for the accredited course:
            </p>

            <h4 className="text-base font-bold text-slate-900">{selectedCert.courseTitle}</h4>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 px-4">
              <div>
                <span className="font-semibold text-slate-800 block">Instructor Signature</span>
                <span className="font-serif italic text-slate-900">{selectedCert.instructorName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-800 block">Verification ID</span>
                <span className="font-mono text-slate-900">{selectedCert.certificateId}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
