import React from 'react';
import { 
  PlayCircle, 
  MapPin, 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Volume2, 
  Users, 
  TrendingUp, 
  Building2,
  Lock,
  Search,
  Receipt
} from 'lucide-react';
import { ActiveTab, LandRecord, Language, TransferApplication } from '../types';
import { translations, speakText } from '../services/languageService';

interface HomeDashboardProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenVideoGuide: () => void;
  applications: TransferApplication[];
  records: LandRecord[];
  language: Language;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onOpenVideoGuide,
  applications,
  records,
  language
}) => {
  const t = translations[language];

  return (
    <div id="home-dashboard-container" className="space-y-8">
      {/* Hero Video Guide Feature Callout for Illiterate / Rural Citizens */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            <span>Rural Citizen & Farmer Accessibility Assistance</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Transfer Land Directly to the Right Person Without Repeated Office Visits
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed">
            Eliminates repeat trips to Surveyors, Mandal Revenue Officers (MRO), and Village Revenue Officers (VRO). 100% transparent government fees, AI boundary checking, and digital e-Passbooks.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Watch Video Guide Button */}
            <button
              id="hero-watch-video-guide-btn"
              onClick={onOpenVideoGuide}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/40 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-3 cursor-pointer"
            >
              <PlayCircle className="w-6 h-6 fill-slate-950 text-amber-300 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider">How to Apply? (Video & Voice Guide)</div>
                <div className="text-[11px] font-semibold opacity-90">Listen and watch in your mother tongue</div>
              </div>
            </button>

            <button
              id="hero-start-application-btn"
              onClick={() => onNavigate('apply_transfer')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
            >
              <span>Start New Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-pay-challan-btn"
              onClick={() => onNavigate('payments')}
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-slate-700 font-bold text-sm shadow transition flex items-center gap-2 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>Pay e-Challan</span>
            </button>
          </div>
        </div>

        {/* Impact Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Required</span>
            <span className="text-lg font-black text-emerald-400 font-mono">4 to 7 Days</span>
            <span className="text-[10px] text-slate-400 block">vs 90 days earlier</span>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Middleman Brokerage</span>
            <span className="text-lg font-black text-emerald-400 font-mono">₹0 Zero Bribes</span>
            <span className="text-[10px] text-slate-400 block">Only official challans</span>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Physical Office Trips</span>
            <span className="text-lg font-black text-emerald-400 font-mono">0 Visits</span>
            <span className="text-[10px] text-slate-400 block">100% Online tracking</span>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Discrepancy Check</span>
            <span className="text-lg font-black text-emerald-400 font-mono">Instant (5s)</span>
            <span className="text-[10px] text-slate-400 block">Boundary & EC checked</span>
          </div>
        </div>
      </div>

      {/* 5 Core Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Five Core Architecture Modules
            </h2>
            <p className="text-xs text-slate-500">
              Complete end-to-end digital lifecycle replacing physical surveyor, VRO, and MRO queues.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature 1 */}
          <div
            id="card-feature-1"
            onClick={() => onNavigate('verify_title')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Feature 1</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-emerald-700 transition">
                Land Title & Cadastral Survey Check
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Instantly search Survey No., Khata, Pattadar name, 30-year Encumbrance Certificate (EC), and GIS boundary plot.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Verify Survey Parcel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 2 */}
          <div
            id="card-feature-2"
            onClick={() => onNavigate('apply_transfer')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Feature 2</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-teal-700 transition">
                Guided Ownership Transfer Wizard
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Simplified 3-step filing for Sale, Gift, Succession, or Partition with 100% transparent treasury fee calculation.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Apply Online</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 3 */}
          <div
            id="card-feature-3"
            onClick={() => onNavigate('ai_validator')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Feature 3</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-teal-700 transition">
                AI Document & Boundary Validator
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Intelligent NLP heuristic checks for name variance, extent overlaps, and prohibited land flags before submission.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Run AI Scan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 4 */}
          <div
            id="card-feature-4"
            onClick={() => onNavigate('track_workflow')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Feature 4</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-sky-700 transition">
                Live 4-Tier Workflow Tracker
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Track file progression from Citizen ➔ Mandal Surveyor ➔ VRO ➔ MRO with live timestamps and digital remarks.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>Track Live Status</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 5 */}
          <div
            id="card-feature-5"
            onClick={() => onNavigate('certificates')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group md:col-span-1 lg:col-span-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Feature 5</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-emerald-700 transition">
                Tamper-Proof e-Passbook & QR Registry
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Official digital mutation deed with 256-bit cryptographic signature and public QR verification portal.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View & Verify Certificates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* e-Challan & Payments Card */}
          <div
            id="card-feature-payments"
            onClick={() => onNavigate('payments')}
            className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-5 rounded-2xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group md:col-span-1 lg:col-span-1"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Treasury Gateway</span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5 group-hover:text-amber-700 transition">
                Government e-Challan & Payments
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Direct statutory settlement of Stamp Duty, Land Mutation, and Demarcation fees with instant Form TR-6 receipt.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-amber-200 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Pay e-Challan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Preloaded Applications Showcase Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Active Demonstration Registry Applications
            </h3>
            <p className="text-xs text-slate-500">
              Pre-seeded realistic transfers demonstrating surveyor verification, public notice, and digital approval.
            </p>
          </div>
          <button
            onClick={() => onNavigate('track_workflow')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Survey No & Village</th>
                <th className="py-3 px-4">Transfer Type</th>
                <th className="py-3 px-4">Parties (Seller ➔ Buyer)</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {app.applicationNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">Sy. {app.surveyNumber}</span>
                    <span className="text-[11px] text-slate-500">{app.village} ({app.extentTransferring.acres}A {app.extentTransferring.guntas}G)</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {app.transferType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <div>{app.seller.name} ➔ <strong className="text-slate-900">{app.buyer.name}</strong></div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      app.currentStage === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {app.currentStage.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('track_workflow')}
                      className="text-emerald-700 hover:text-emerald-800 font-bold"
                    >
                      Track ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
