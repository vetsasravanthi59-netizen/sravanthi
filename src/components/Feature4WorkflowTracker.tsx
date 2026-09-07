import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  MapPin, 
  FileCheck, 
  ShieldAlert, 
  Sparkles, 
  MessageSquare, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TransferApplication, Language } from '../types';
import { translations } from '../services/languageService';

interface Feature4Props {
  applications: TransferApplication[];
  onUpdateApplication: (app: TransferApplication) => void;
  isOfficerMode: boolean;
  language: Language;
  onNavigateToPayments?: () => void;
}

export const Feature4WorkflowTracker: React.FC<Feature4Props> = ({
  applications,
  onUpdateApplication,
  isOfficerMode,
  language,
  onNavigateToPayments
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [smsSentNotice, setSmsSentNotice] = useState<string | null>(null);

  const t = translations[language];
  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  // Officer Action: Advance stage simulation
  const handleAdvanceStage = (app: TransferApplication) => {
    const updated = { ...app };

    if (updated.currentStage === 'submitted') {
      updated.currentStage = 'surveyor_review';
      updated.stageHistory[1].status = 'approved';
      updated.stageHistory[1].timestamp = new Date().toLocaleString();
      updated.stageHistory[1].remarks = 'Surveyor approved DGPS GIS cadastral match. Zero boundary overlap.';
      updated.stageHistory[2].status = 'in_progress';
    } else if (updated.currentStage === 'surveyor_review') {
      updated.currentStage = 'vro_verification';
      updated.stageHistory[2].status = 'approved';
      updated.stageHistory[2].timestamp = new Date().toLocaleString();
      updated.stageHistory[2].remarks = 'VRO verified physical possession & published 72-hour e-notice without objections.';
      updated.stageHistory[3].status = 'in_progress';
    } else if (updated.currentStage === 'vro_verification') {
      updated.currentStage = 'completed';
      updated.stageHistory[3].status = 'approved';
      updated.stageHistory[3].timestamp = new Date().toLocaleString();
      updated.stageHistory[3].remarks = 'MRO / Tahsildar applied Digital Signature Certificate (DSC). Mutation sanctioned.';
      updated.digitalCertificateHash = 'a4f891b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abc';
      updated.ePassbookNumber = `TS-E-PB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {
        console.log(e);
      }
    }

    onUpdateApplication(updated);
    setSmsSentNotice(`Automated SMS notification dispatched to buyer (${updated.buyer.phone}) & seller (${updated.seller.phone})!`);
    setTimeout(() => setSmsSentNotice(null), 4000);
  };

  return (
    <div id="feature-4-workflow-tracker-container" className="space-y-6">
      {/* Tracker Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-1 border border-sky-200">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>Feature 4: Multi-Tier Digital Workflow & Tracking</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Transparent Citizen ➔ Surveyor ➔ VRO ➔ MRO Pipeline
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live statutory tracking with defined Citizen Charter SLAs. Eliminates physical office visits, bribery, and unrecorded delays.
            </p>
          </div>

          {/* Application Selector Pills */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Select Application:</span>
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition ${
                  selectedAppId === app.id
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {app.applicationNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {smsSentNotice && (
        <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>{smsSentNotice}</span>
          </div>
        </div>
      )}

      {currentApp ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 4-Tier Interactive Milestone Stepper */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Application ID</span>
                <span className="text-lg font-black text-slate-900 font-mono">{currentApp.applicationNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Current State:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                  currentApp.currentStage === 'completed'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-sky-100 text-sky-800 border border-sky-300'
                }`}>
                  {currentApp.currentStage.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Stepper Milestones */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:z-0">
              {currentApp.stageHistory.map((item, idx) => {
                const isDone = item.status === 'approved';
                const isInProgress = item.status === 'in_progress';

                return (
                  <div key={idx} className="relative z-10 flex items-start gap-4">
                    {/* Circle Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-bold text-xs shadow-sm ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-sky-500 border-sky-500 text-white animate-pulse'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>

                    {/* Step Card */}
                    <div className={`flex-1 p-4 rounded-xl border transition ${
                      isDone 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : isInProgress 
                        ? 'bg-sky-50/50 border-sky-300 ring-2 ring-sky-500/10' 
                        : 'bg-slate-50/70 border-slate-200 opacity-60'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{item.stage}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          isDone ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-slate-700">{item.officerRole}: {item.officerName}</span>
                        <span>•</span>
                        <span className="font-mono text-[11px]">{item.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-100 font-medium">
                        "{item.remarks}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Officer Action Simulation Box */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-700">Citizen Charter SLA:</span> Max 7 days from submission. Zero physical attendance.
              </div>

              {currentApp.currentStage !== 'completed' && (
                <button
                  id="advance-stage-officer-btn"
                  onClick={() => handleAdvanceStage(currentApp)}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>
                    Advance Stage (Simulate Officer Approval)
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Side Summary & Mobile SMS Notification Simulator */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3.5 text-xs">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Application Summary
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Survey Number:</span>
                  <span className="font-mono font-bold text-slate-900">Sy. {currentApp.surveyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">{currentApp.village}, {currentApp.mandal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Extent:</span>
                  <span className="font-extrabold text-emerald-700">
                    {currentApp.extentTransferring.acres}A {currentApp.extentTransferring.guntas}G
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transferor (Seller):</span>
                  <span className="font-bold text-slate-900">{currentApp.seller.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transferee (Buyer):</span>
                  <span className="font-bold text-slate-900">{currentApp.buyer.name}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Treasury Challan:</span>
                  <div className="text-right">
                    <span className={`font-mono font-bold text-xs ${currentApp.paymentStatus.includes('Paid') ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {currentApp.challanReference || 'TS-CHL-PENDING'}
                    </span>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                        currentApp.paymentStatus.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {currentApp.paymentStatus}
                      </span>
                      {onNavigateToPayments && (
                        <button
                          onClick={onNavigateToPayments}
                          className="text-[10px] font-bold text-sky-700 hover:underline cursor-pointer"
                        >
                          {currentApp.paymentStatus.includes('Paid') ? 'View TR-6' : 'Pay Now →'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile SMS Simulation */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Smartphone className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Citizen SMS Gateway
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1.5 text-slate-300">
                <div className="text-sky-400 font-bold">FROM: GOV-REVDEPT</div>
                <p>
                  Dear {currentApp.buyer.name}, your mutation request for Sy.No {currentApp.surveyNumber} is at stage: [{currentApp.currentStage.toUpperCase()}]. Track status 24/7 without visiting MRO office.
                </p>
                <div className="text-[9px] text-slate-500">Official Revenue Portal Automated Dispatch</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
