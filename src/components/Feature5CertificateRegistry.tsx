import React, { useState } from 'react';
import { 
  CheckCircle2, 
  QrCode, 
  Printer, 
  Download, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  Copy, 
  Award, 
  ExternalLink,
  Lock,
  Landmark
} from 'lucide-react';
import { TransferApplication, Language } from '../types';
import { translations } from '../services/languageService';

interface Feature5Props {
  applications: TransferApplication[];
  language: Language;
}

export const Feature5CertificateRegistry: React.FC<Feature5Props> = ({ applications, language }) => {
  const completedApps = applications.filter((a) => a.currentStage === 'completed');
  const [selectedApp, setSelectedApp] = useState<TransferApplication>(
    completedApps[0] || applications[0]
  );
  const [verifySearchCode, setVerifySearchCode] = useState(
    completedApps[0]?.ePassbookNumber || 'TS-E-PB-2026-8819'
  );
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    app?: TransferApplication;
    message: string;
  } | null>(null);

  const t = translations[language];

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = verifySearchCode.trim().toLowerCase();
    const match = applications.find(
      (a) =>
        (a.ePassbookNumber && a.ePassbookNumber.toLowerCase() === clean) ||
        (a.digitalCertificateHash && a.digitalCertificateHash.toLowerCase() === clean) ||
        a.applicationNumber.toLowerCase() === clean
    );

    if (match && match.currentStage === 'completed') {
      setVerificationResult({
        verified: true,
        app: match,
        message: 'AUTHENTIC RECORD: Valid tamper-evident digital title issued by Mandal Revenue Officer.'
      });
      setSelectedApp(match);
    } else {
      setVerificationResult({
        verified: false,
        message: 'UNVERIFIED / PENDING: No finalized mutation certificate matches this code in the official registry.'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="feature-5-certificates-container" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Feature 5: Tamper-Evident e-Passbook & QR Public Registry</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Official Digital e-Passbook & Mutation Certificate
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly verifiable cryptographic land title with tamper-proof QR code. Accepted by banks, courts, and revenue sub-registrars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-certificate-btn"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official e-Title</span>
            </button>
          </div>
        </div>

        {/* Public QR Verification Input */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <form onSubmit={handleVerify} className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="verify-code-input"
                type="text"
                value={verifySearchCode}
                onChange={(e) => setVerifySearchCode(e.target.value)}
                placeholder="Verify Certificate No (e.g. TS-E-PB-2026-8819) or Hash"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              id="verify-code-submit-btn"
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Verify Registry</span>
            </button>
          </form>

          {verificationResult && (
            <div className={`mt-3 p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              verificationResult.verified 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {verificationResult.verified ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-rose-600" />}
              <span>{verificationResult.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Official Government e-Pattadar Passbook Document View */}
      <div className="bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 p-6 sm:p-10 rounded-2xl border-2 border-amber-600/30 shadow-md relative overflow-hidden print:p-0 print:border-none">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <Landmark className="w-96 h-96 text-amber-900" />
        </div>

        {/* Certificate Header with Emblem Representation */}
        <div className="text-center pb-6 border-b-2 border-amber-900/20 relative z-10">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-amber-900/10 border-2 border-amber-800 flex items-center justify-center text-amber-950 font-serif font-black text-xl">
            🏛️
          </div>
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-900">
            Government Revenue Administration & Land Records Department
          </h3>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
            e-PATTADAR PASSBOOK & MUTATION TITLE DEED
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            (Issued under Telangana / State Rights in Land and Pattadar Pass Books Act)
          </p>
        </div>

        {/* Certificate Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 py-3 px-4 bg-amber-100/50 rounded-xl border border-amber-200/80 text-xs relative z-10">
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase block">e-Passbook Number</span>
            <span className="font-mono font-black text-slate-950 text-sm">
              {selectedApp.ePassbookNumber || 'TS-E-PB-2026-8819'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase block">Date of Sanction</span>
            <span className="font-semibold text-slate-900">
              {selectedApp.submissionDate}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase block">Mutation Order ID</span>
            <span className="font-mono font-bold text-slate-900">
              {selectedApp.applicationNumber}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase block">Treasury Challan Ref</span>
            <span className="font-mono font-bold text-emerald-800">
              {selectedApp.challanReference || 'CHL-TREASURY-998231'}
            </span>
          </div>
        </div>

        {/* Land and Owner Details Table */}
        <div className="space-y-4 relative z-10 text-xs">
          <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-300">
              1. Title Holder Particulars (Sanctioned Transferee)
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-slate-500 block text-[10px]">Registered Pattadar Name</span>
                <span className="font-extrabold text-sm text-slate-900">{selectedApp.buyer.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Father / Husband Name</span>
                <span className="font-bold text-slate-800">{selectedApp.buyer.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Aadhaar / e-KYC Token</span>
                <span className="font-mono font-bold text-slate-800">{selectedApp.buyer.aadhaarMasked}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-300">
              2. Registered Cadastral Parcel Details
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-slate-500 block text-[10px]">Survey Number</span>
                <span className="font-mono font-black text-emerald-800 text-sm">Sy. {selectedApp.surveyNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Sanctioned Extent</span>
                <span className="font-black text-slate-900 text-sm">
                  {selectedApp.extentTransferring.acres} Ac {selectedApp.extentTransferring.guntas} Gts
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Village & Mandal</span>
                <span className="font-bold text-slate-800">{selectedApp.village}, {selectedApp.mandal}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">District</span>
                <span className="font-bold text-slate-800">{selectedApp.district}</span>
              </div>
            </div>
          </div>

          {/* Previous Owner / Transferor Line */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-600">
            <span>
              Transferred from previous Pattadar: <strong className="text-slate-900">{selectedApp.seller.name}</strong> ({selectedApp.seller.passbookNo})
            </span>
            <span className="font-semibold text-emerald-700">Mutation Type: {selectedApp.transferType.toUpperCase()}</span>
          </div>
        </div>

        {/* QR Code & Digital Signature Seal Section */}
        <div className="mt-8 pt-6 border-t-2 border-amber-900/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
          {/* QR Code representation */}
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs">
            <div className="w-16 h-16 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center shrink-0">
              {/* Scalable SVG QR code representation */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <rect x="10" y="10" width="25" height="25" />
                <rect x="15" y="15" width="15" height="15" fill="#0f172a" />
                <rect x="18" y="18" width="9" height="9" fill="#ffffff" />
                
                <rect x="65" y="10" width="25" height="25" />
                <rect x="70" y="15" width="15" height="15" fill="#0f172a" />
                <rect x="73" y="18" width="9" height="9" fill="#ffffff" />
                
                <rect x="10" y="65" width="25" height="25" />
                <rect x="15" y="70" width="15" height="15" fill="#0f172a" />
                <rect x="18" y="73" width="9" height="9" fill="#ffffff" />
                
                <circle cx="50" cy="50" r="8" fill="#10b981" />
                <rect x="45" y="20" width="8" height="12" />
                <rect x="45" y="70" width="8" height="12" />
                <rect x="20" y="45" width="12" height="8" />
                <rect x="70" y="45" width="12" height="8" />
              </svg>
            </div>
            <div className="text-[10px] space-y-0.5">
              <span className="font-extrabold text-slate-900 uppercase block">Scan to Verify</span>
              <p className="text-slate-500">Scan with any phone camera to verify cryptographic authenticity.</p>
              <span className="font-mono text-emerald-700 font-semibold block truncate max-w-[130px]">
                {selectedApp.digitalCertificateHash?.slice(0, 16) || 'a4f891b2c3d4e5f6'}...
              </span>
            </div>
          </div>

          {/* Legal Non-Repudiation Text */}
          <div className="text-[11px] text-slate-500 text-center sm:text-left space-y-1">
            <p className="font-bold text-slate-700">Digital Document Integrity:</p>
            <p>
              This electronic document is valid under Section 4 of the Information Technology Act. No physical endorsement or signature required.
            </p>
          </div>

          {/* Official DSC Seal */}
          <div className="text-center sm:text-right">
            <div className="inline-block p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-center">
              <div className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                MRO / Tahsildar Digital Seal
              </div>
              <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                DSC ID: 2026-MRO-REV-9812
              </div>
              <div className="text-[9px] text-slate-500">
                Digitally Signed on {selectedApp.submissionDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
