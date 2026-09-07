import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Printer, 
  Search, 
  RefreshCw, 
  Smartphone, 
  IndianRupee, 
  Lock, 
  FileCheck, 
  HelpCircle, 
  Volume2, 
  Copy, 
  Check, 
  Sparkles,
  ChevronRight,
  Landmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TransferApplication, PaymentReceipt, Language } from '../types';
import { translations, speakText } from '../services/languageService';
import { getStoredReceipts, saveStoredReceipts } from '../data/mockLandData';

interface FeaturePaymentProps {
  applications: TransferApplication[];
  onUpdateApplication: (app: TransferApplication) => void;
  language: Language;
  onNavigateToWorkflow?: (appId?: string) => void;
}

type PaymentTab = 'application_challan' | 'direct_challan' | 'receipts_history';
type PaymentMethod = 'upi' | 'netbanking' | 'card' | 'egras';

export const FeaturePayment: React.FC<FeaturePaymentProps> = ({
  applications,
  onUpdateApplication,
  language,
  onNavigateToWorkflow
}) => {
  const t = translations[language];

  // Active sub-tab in Payments page
  const [activeSubTab, setActiveSubTab] = useState<PaymentTab>('application_challan');

  // Receipts list state
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);
  const [selectedReceiptForView, setSelectedReceiptForView] = useState<PaymentReceipt | null>(null);

  // Application-based payment state
  const [selectedAppId, setSelectedAppId] = useState<string>(() => {
    // Default to first pending application or first app
    const pending = applications.find(a => a.paymentStatus === 'Pending');
    return pending ? pending.id : (applications[0]?.id || '');
  });

  // Direct Ad-hoc Challan state
  const [directService, setDirectService] = useState<'mutation' | 'ec_copy' | 'survey_demarcation' | 'stamp_duty'>('mutation');
  const [directDistrict, setDirectDistrict] = useState<string>('Ranga Reddy');
  const [directMandal, setDirectMandal] = useState<string>('Ibrahimpatnam');
  const [directVillage, setDirectVillage] = useState<string>('Polampalli');
  const [directSurveyNo, setDirectSurveyNo] = useState<string>('142/2A');
  const [directPayerName, setDirectPayerName] = useState<string>('');
  const [directPayerPhone, setDirectPayerPhone] = useState<string>('');
  const [directCustomValuation, setDirectCustomValuation] = useState<number>(2000000);

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiVpa, setUpiVpa] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('SBI');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [activePaidReceipt, setActivePaidReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search in History
  const [receiptSearchQuery, setReceiptSearchQuery] = useState<string>('');

  // QR timer simulation (10 min countdown)
  const [qrSecondsLeft, setQrSecondsLeft] = useState<number>(599);

  useEffect(() => {
    const loaded = getStoredReceipts();
    setReceipts(loaded);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrSecondsLeft((prev) => (prev > 0 ? prev - 1 : 599));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Current selected application object
  const currentApp = applications.find(a => a.id === selectedAppId) || applications[0];

  // Fee calculation for direct ad-hoc challan
  const getDirectFeeStructure = () => {
    switch (directService) {
      case 'mutation':
        return {
          total: 900,
          heads: [
            { headCode: '0217-02-800-05', description: 'Mutation Processing Fee', amount: 500 },
            { headCode: '0217-02-800-06', description: 'Digital e-Passbook Issuance Fee', amount: 300 },
            { headCode: '0070-60-800-11', description: 'Cyber Treasury Portal User Charge', amount: 100 }
          ]
        };
      case 'ec_copy':
        return {
          total: 250,
          heads: [
            { headCode: '0030-03-800-03', description: 'Certified 30-Year Encumbrance Search Fee', amount: 200 },
            { headCode: '0070-60-800-11', description: 'Digital Archival & Verification Fee', amount: 50 }
          ]
        };
      case 'survey_demarcation':
        return {
          total: 1600,
          heads: [
            { headCode: '0029-00-106-01', description: 'DGPS Cadastral Boundary Survey Demarcation', amount: 1500 },
            { headCode: '0070-60-800-11', description: 'GIS Geo-Tagging User Charge', amount: 100 }
          ]
        };
      case 'stamp_duty':
        const duty = Math.round(directCustomValuation * 0.055);
        const reg = Math.round(directCustomValuation * 0.005);
        return {
          total: duty + reg + 500,
          heads: [
            { headCode: '0030-02-103-01', description: 'Stamp Duty on Land Conveyance (5.5%)', amount: duty },
            { headCode: '0030-03-800-01', description: 'Registration Fee (0.5%)', amount: reg },
            { headCode: '0217-02-800-05', description: 'Mutation & Passbook Fee', amount: 400 },
            { headCode: '0070-60-800-11', description: 'Portal Digital User Charge', amount: 100 }
          ]
        };
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleAudioExplainFees = () => {
    const speech = language === 'te'
      ? 'ఇది ప్రభుత్వ ట్రెజరీ అధికారిక ఈ-చలానా చెల్లింపుల పోర్టల్. ఇక్కడ ఎలాంటి దళారుల ఫీజులు లేదా లంచాలు ఉండవు. మీరు యూపీఐ లేదా నెట్ బ్యాంకింగ్ ద్వారా నేరుగా ప్రభుత్వ ఖజానాకు ఫీజు చెల్లించి, తక్షణమే ఫారం టిఆర్-6 అధికారిక రశీదును పొందవచ్చు.'
      : language === 'hi'
      ? 'यह सरकारी राजकोष का आधिकारिक ई-चालान पोर्टल है। यहां किसी बिचौलिए या दलाल को अतिरिक्त राशि देने की आवश्यकता नहीं है। आप सीधे यूपीआई अथवा नेट बैंकिंग से सरकारी चालान भरकर तुरंत वैध रसीद प्राप्त कर सकते हैं।'
      : language === 'ta'
      ? 'இது அரசு கருவூலத்தின் நேரடி மின்-சலான் கட்டண தளம். இங்கு எந்த இடைத்தரகருக்கும் கட்டணம் செலுத்த தேவையில்லை. நீங்கள் நேரடியாக UPI அல்லது நெட் பேங்கிங் மூலம் பணம் செலுத்தி உடனடியாக அதிகாரப்பூர்வ ரசீதை பதிவிறக்கம் செய்யலாம்.'
      : 'This is the official Government Cyber Treasury e-Challan payment portal. There are zero broker commissions or middleman charges. You pay directly to the state treasury via UPI or Net Banking and receive an instant tamper-evident Form TR-6 receipt.';

    speakText(speech, language);
  };

  // Execute payment simulation
  const handleExecutePayment = async (isDirect: boolean) => {
    setIsProcessing(true);

    const steps = [
      'Establishing 256-bit SSL encrypted handshake with State Cyber Treasury...',
      'Validating Revenue DDO code & Cadastral Head of Accounts...',
      'Authorizing payment gateway & verifying biometric ledger...',
      'Generating Government Challan Identification Number (CIN)...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 650));
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const cinGen = `SBIN${new Date().toISOString().slice(2, 10).replace(/-/g, '')}${randomNum}`;
    const challanGen = `TS-ECH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const bankRefGen = `TXN${Math.floor(10000000 + Math.random() * 90000000)}`;

    let newReceipt: PaymentReceipt;

    if (!isDirect && currentApp) {
      // Application-based payment
      const duty = currentApp.stampDutyFee || Math.round(currentApp.valuationAmount * 0.055);
      const reg = currentApp.registrationFee || Math.round(currentApp.valuationAmount * 0.005);
      const mut = currentApp.mutationFee || 500;
      const portal = 100;

      newReceipt = {
        id: `RCP-2026-${randomNum}`,
        challanNumber: challanGen,
        cinNumber: cinGen,
        bankReferenceNumber: bankRefGen,
        applicationNumber: currentApp.applicationNumber,
        surveyNumber: currentApp.surveyNumber,
        district: currentApp.district,
        mandal: currentApp.mandal,
        village: currentApp.village,
        payerName: currentApp.buyer.name,
        payerPhone: currentApp.buyer.phone,
        payerAadhaarMasked: currentApp.buyer.aadhaarMasked,
        paymentMode: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'netbanking' ? 'Net Banking' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cyber Treasury e-GRAS',
        serviceType: 'Land Ownership Transfer (Mutation & Stamp Duty)',
        headOfAccounts: [
          { headCode: '0030-02-103-01', description: 'Stamp Duty on Conveyance', amount: duty },
          { headCode: '0030-03-800-01', description: 'Registration Fee', amount: reg },
          { headCode: '0217-02-800-05', description: 'Mutation & Digital Pattadar Entry', amount: mut },
          { headCode: '0070-60-800-11', description: 'Portal User Charges', amount: portal }
        ],
        totalAmount: duty + reg + mut + portal,
        transactionDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        paymentStatus: 'SUCCESS',
        treasuryDepartment: `Telangana Cyber Treasury / Sub-Registrar ${currentApp.mandal}`,
        ddoCode: '25000302001'
      };

      // Update application in main state
      const updatedApp: TransferApplication = {
        ...currentApp,
        paymentStatus: 'Paid (Digital Challan)',
        challanReference: challanGen,
        currentStage: currentApp.currentStage === 'submitted' ? 'surveyor_review' : currentApp.currentStage,
        stageHistory: currentApp.stageHistory.map(stage => {
          if (stage.stage.includes('Challan') || stage.stage.includes('Application')) {
            return {
              ...stage,
              status: 'approved',
              remarks: `Digital Treasury Challan paid (${challanGen} / CIN: ${cinGen}). Verified automatically.`
            };
          }
          if (stage.stage.includes('Surveyor') && stage.status === 'pending') {
            return {
              ...stage,
              status: 'in_progress',
              remarks: 'Challan verified. Cadastral boundary GIS check queued.'
            };
          }
          return stage;
        })
      };

      onUpdateApplication(updatedApp);
    } else {
      // Direct Ad-hoc Challan
      const feeData = getDirectFeeStructure();
      newReceipt = {
        id: `RCP-2026-${randomNum}`,
        challanNumber: challanGen,
        cinNumber: cinGen,
        bankReferenceNumber: bankRefGen,
        applicationNumber: `ADHOC-${randomNum}`,
        surveyNumber: directSurveyNo,
        district: directDistrict,
        mandal: directMandal,
        village: directVillage,
        payerName: directPayerName || 'Citizen Applicant',
        payerPhone: directPayerPhone || '98490xxxxx',
        paymentMode: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'netbanking' ? 'Net Banking' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cyber Treasury e-GRAS',
        serviceType: directService === 'mutation' 
          ? 'Land Mutation Fee (Direct Challan)' 
          : directService === 'ec_copy' 
          ? 'Certified Copy of Encumbrance Certificate' 
          : directService === 'survey_demarcation'
          ? 'Cadastral Boundary Demarcation Survey'
          : 'Title Deed Stamp Duty & Registration',
        headOfAccounts: feeData.heads,
        totalAmount: feeData.total,
        transactionDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        paymentStatus: 'SUCCESS',
        treasuryDepartment: `Telangana Cyber Treasury / Sub-Registrar ${directMandal}`,
        ddoCode: '25000401002'
      };
    }

    const updatedReceipts = [newReceipt, ...receipts];
    setReceipts(updatedReceipts);
    saveStoredReceipts(updatedReceipts);

    setIsProcessing(false);
    setActivePaidReceipt(newReceipt);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const filteredReceipts = receipts.filter(r => {
    const q = receiptSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.challanNumber.toLowerCase().includes(q) ||
      r.cinNumber.toLowerCase().includes(q) ||
      r.applicationNumber.toLowerCase().includes(q) ||
      r.payerName.toLowerCase().includes(q) ||
      r.surveyNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Cyber Treasury Identity */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-3 py-1 rounded-full w-fit">
              <Landmark className="w-3.5 h-3.5" />
              <span>Integrated State Cyber Treasury Gateway (e-GRAS & e-Challan)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.payments} & Digital Challan Portal
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Direct settlement of Stamp Duty, Land Mutation, and Demarcation Survey charges. 100% transparent government fees with zero middleman deductions, generating verified Form TR-6 Cyber Receipts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="payment-listen-voice-btn"
              onClick={handleAudioExplainFees}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold shadow transition"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>{t.listenAudio}</span>
            </button>

            <button
              id="view-all-receipts-quick-btn"
              onClick={() => setActiveSubTab('receipts_history')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify & Reprint Past Receipts</span>
            </button>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ₹0
            </div>
            <div>
              <div className="font-semibold text-white">Zero Broker / Extra Fees</div>
              <div className="text-[11px] text-slate-400">Direct credit to Revenue Major Head 0030</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">Form TR-6 Official Challan</div>
              <div className="text-[11px] text-slate-400">Instant CIN & Bank Ref Generation</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">Instant Workflow Sync</div>
              <div className="text-[11px] text-slate-400">Automatically advances to Surveyor Queue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            id="subtab-app-challan"
            onClick={() => setActiveSubTab('application_challan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeSubTab === 'application_challan'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-500" />
            <span>Pay for Ownership Transfer Application</span>
          </button>

          <button
            id="subtab-direct-challan"
            onClick={() => setActiveSubTab('direct_challan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeSubTab === 'direct_challan'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Direct Treasury e-Challan (Demarcation / EC / Ad-hoc)</span>
          </button>

          <button
            id="subtab-receipts-history"
            onClick={() => setActiveSubTab('receipts_history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeSubTab === 'receipts_history'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4 text-sky-500" />
            <span>Verified Receipts & Challan Search ({receipts.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PAY FOR REGISTERED APPLICATION */}
      {activeSubTab === 'application_challan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Application Selection & Land Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Application Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Select Application to Pay Treasury Challan</span>
                </label>
                <span className="text-xs text-slate-500">
                  {applications.length} applications in system
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      selectedAppId === app.id
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded">
                          {app.applicationNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          Survey No: <span className="text-emerald-700 font-bold">{app.surveyNumber}</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        Payer: <strong className="text-slate-900">{app.buyer.name}</strong> • Location: {app.village}, {app.mandal}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Govt Treasury Fee</div>
                        <div className="text-sm font-black text-slate-900">
                          ₹{app.totalFee.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        app.paymentStatus.includes('Paid')
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      }`}>
                        {app.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Application Details & Head of Accounts Breakdown */}
            {currentApp && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Government Treasury Head of Accounts Breakdown
                    </h2>
                    <p className="text-xs text-slate-500">
                      Standard rates pursuant to State Registration & Mutation Rules
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                    DDO: 25000302001
                  </span>
                </div>

                {/* Land Parcel Summary Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Survey Number</div>
                    <div className="font-bold text-slate-900">{currentApp.surveyNumber}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Extent</div>
                    <div className="font-bold text-slate-900">{currentApp.extentTransferring.acres} Ac {currentApp.extentTransferring.guntas} Gts</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Govt Valuation</div>
                    <div className="font-bold text-slate-900">₹{currentApp.valuationAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Transfer Type</div>
                    <div className="font-bold text-slate-900 capitalize">{currentApp.transferType}</div>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Head of Account</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Rate / Basis</th>
                        <th className="p-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      <tr>
                        <td className="p-3 font-mono text-slate-600">0030-02-103-01</td>
                        <td className="p-3 text-slate-900">Stamp Duty on Conveyance Deed</td>
                        <td className="p-3 text-slate-500">{currentApp.stampDutyFee === 0 ? 'Exempted (Succession)' : '5.5% of market value'}</td>
                        <td className="p-3 text-right font-bold text-slate-900">₹{(currentApp.stampDutyFee || 0).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-slate-600">0030-03-800-01</td>
                        <td className="p-3 text-slate-900">Registration Charges</td>
                        <td className="p-3 text-slate-500">{currentApp.stampDutyFee === 0 ? 'Nominal succession tariff' : '0.5% statutory fee'}</td>
                        <td className="p-3 text-right font-bold text-slate-900">₹{(currentApp.registrationFee || 0).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-slate-600">0217-02-800-05</td>
                        <td className="p-3 text-slate-900">Mutation & Digital Pattadar Entry Fee</td>
                        <td className="p-3 text-slate-500">Fixed statutory charge</td>
                        <td className="p-3 text-right font-bold text-slate-900">₹{(currentApp.mutationFee || 400).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-slate-600">0070-60-800-11</td>
                        <td className="p-3 text-slate-900">Digital Archival & Portal User Charges</td>
                        <td className="p-3 text-slate-500">Zero-profit community charge</td>
                        <td className="p-3 text-right font-bold text-slate-900">₹100</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-emerald-50 text-slate-900 font-bold border-t-2 border-emerald-200">
                      <tr>
                        <td colSpan={3} className="p-3 text-right text-sm">
                          Total Payable to State Cyber Treasury:
                        </td>
                        <td className="p-3 text-right text-base text-emerald-800 font-extrabold">
                          ₹{currentApp.totalFee.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Broker Comparison Banner */}
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 space-y-1">
                    <div className="font-bold">Zero-Commission Citizen Protection Notice</div>
                    <p>
                      Physical agents and document writers often charge ₹25,000 to ₹50,000 as unofficial service cuts for this exact mutation. By paying your treasury challan directly through SLS, you ensure 100% of your money reaches the government treasury with zero leakage.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Payment Gateway Selector & Checkout (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-6 sticky top-24">
              <div className="border-b border-slate-100 pb-4">
                <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                  Secure Treasury Checkout
                </div>
                <div className="text-lg font-black text-slate-900 mt-1">
                  Amount: ₹{currentApp?.totalFee.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Application: {currentApp?.applicationNumber}
                </div>
              </div>

              {/* If already paid */}
              {currentApp?.paymentStatus.includes('Paid') && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="font-bold text-emerald-900 text-sm">
                    e-Challan Already Paid & Settled
                  </div>
                  <div className="text-xs text-emerald-800 font-mono">
                    Challan Ref: {currentApp.challanReference || 'CHL-TREASURY-998231'}
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      id="view-already-paid-receipt-btn"
                      onClick={() => {
                        const rec = receipts.find(r => r.applicationNumber === currentApp.applicationNumber);
                        if (rec) {
                          setSelectedReceiptForView(rec);
                        } else {
                          setActiveSubTab('receipts_history');
                        }
                      }}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>View / Print Form TR-6 Receipt</span>
                    </button>

                    <button
                      id="track-workflow-from-paid-btn"
                      onClick={() => onNavigateToWorkflow && onNavigateToWorkflow(currentApp.id)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Track Application in Feature 4</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* If not paid or user wants to proceed */}
              {!currentApp?.paymentStatus.includes('Paid') && (
                <div className="space-y-5">
                  {/* Payment Method Tabs */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-2 block">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          paymentMethod === 'upi'
                            ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-emerald-600" />
                        <span>UPI / Dynamic QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          paymentMethod === 'netbanking'
                            ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-sky-600" />
                        <span>Net Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          paymentMethod === 'card'
                            ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-amber-600" />
                        <span>Debit / RuPay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('egras')}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                          paymentMethod === 'egras'
                            ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-purple-600" />
                        <span>Cyber Treasury e-GRAS</span>
                      </button>
                    </div>
                  </div>

                  {/* UPI Gateway Details */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                      <div className="text-xs text-slate-600 font-medium">
                        Scan with any UPI App (BHIM, PhonePe, Google Pay, Paytm)
                      </div>

                      {/* Realistic SVG QR Code Display */}
                      <div className="relative inline-block p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                        <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                          <rect width="100" height="100" fill="white" />
                          {/* Outer markers */}
                          <rect x="10" y="10" width="24" height="24" rx="2" fill="#0f172a" />
                          <rect x="14" y="14" width="16" height="16" fill="white" />
                          <rect x="18" y="18" width="8" height="8" fill="#0f172a" />

                          <rect x="66" y="10" width="24" height="24" rx="2" fill="#0f172a" />
                          <rect x="70" y="14" width="16" height="16" fill="white" />
                          <rect x="74" y="18" width="8" height="8" fill="#0f172a" />

                          <rect x="10" y="66" width="24" height="24" rx="2" fill="#0f172a" />
                          <rect x="14" y="70" width="16" height="16" fill="white" />
                          <rect x="18" y="74" width="8" height="8" fill="#0f172a" />

                          {/* Pattern Data dots */}
                          <rect x="42" y="12" width="6" height="6" fill="#059669" />
                          <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                          <rect x="42" y="24" width="12" height="6" fill="#0f172a" />
                          <rect x="12" y="42" width="6" height="12" fill="#0f172a" />
                          <rect x="24" y="42" width="12" height="6" fill="#059669" />
                          <rect x="42" y="42" width="16" height="16" fill="#0f172a" />
                          <rect x="64" y="42" width="6" height="12" fill="#059669" />
                          <rect x="76" y="42" width="12" height="6" fill="#0f172a" />
                          <rect x="42" y="66" width="12" height="6" fill="#0f172a" />
                          <rect x="60" y="66" width="6" height="12" fill="#0f172a" />
                          <rect x="72" y="66" width="16" height="6" fill="#059669" />
                          <rect x="42" y="78" width="6" height="12" fill="#0f172a" />
                          <rect x="54" y="82" width="12" height="8" fill="#0f172a" />
                          <rect x="72" y="78" width="16" height="12" fill="#0f172a" />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="bg-emerald-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow">
                            SLS GOV
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-700 bg-white py-1.5 px-3 rounded-lg border border-slate-200">
                        <span>UPI ID: <strong>gov.treasury.sls@sbi</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy('gov.treasury.sls@sbi', 'upi_id')}
                          className="text-slate-400 hover:text-emerald-600"
                          title="Copy UPI ID"
                        >
                          {copiedText === 'upi_id' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        QR expires in: <span className="font-bold text-slate-900">{Math.floor(qrSecondsLeft / 60)}:{(qrSecondsLeft % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Details */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                      <label className="font-bold text-slate-700 block">Select Authorized Treasury Bank</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['SBI (State Bank of India)', 'Union Bank (Andhra Bank)', 'HDFC Bank Treasury', 'ICICI Cyber Gateway', 'Canara Bank', 'Punjab National Bank'].map(bank => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2.5 rounded-lg border text-left font-medium transition ${
                              selectedBank === bank
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Redirects securely to 256-bit bank gateway</span>
                      </div>
                    </div>
                  )}

                  {/* Debit / RuPay Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Card Number (RuPay / Visa / MC)</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 8901 2345 6789"
                          className="w-full p-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="08/29"
                            className="w-full p-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full p-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-800 bg-emerald-100/60 p-2 rounded flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>RuPay debit card transactions incur 0% MDR merchant convenience charges.</span>
                      </div>
                    </div>
                  )}

                  {/* Cyber Treasury e-GRAS */}
                  {paymentMethod === 'egras' && (
                    <div className="space-y-2 bg-purple-50 p-4 rounded-xl border border-purple-200 text-xs text-purple-950">
                      <div className="font-bold flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-purple-700" />
                        <span>State Cyber Treasury e-GRAS Portal</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Integrated electronic Government Receipts Accounting System (e-GRAS). Generates auto-reconciliation challan with treasury department reference ID for direct real-time audit clearance.
                      </p>
                    </div>
                  )}

                  {/* Execute Button */}
                  <button
                    id="execute-gov-payment-btn"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Connecting State Cyber Treasury...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authorize Treasury Payment (₹{currentApp?.totalFee.toLocaleString('en-IN')})</span>
                      </>
                    )}
                  </button>

                  {/* Processing Status Step Text */}
                  {isProcessing && (
                    <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg animate-pulse text-center">
                      {processingStep}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>256-Bit TLS End-to-End Treasury Encryption</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECT AD-HOC TREASURY CHALLAN */}
      {activeSubTab === 'direct_challan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Generate Direct Government Treasury e-Challan
                </h2>
                <p className="text-xs text-slate-500">
                  Pay individual statutory fees directly to Revenue Heads without an existing application draft
                </p>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Select Revenue Service</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'mutation', title: 'Land Mutation & Passbook Entry', fee: '₹900', desc: 'Transfer fee & e-Passbook issuance' },
                    { id: 'survey_demarcation', title: 'DGPS Boundary Demarcation', fee: '₹1,600', desc: 'Cadastral GIS field re-measurement' },
                    { id: 'ec_copy', title: 'Certified 30-Year Encumbrance (EC)', fee: '₹250', desc: 'Title clearance certificate search' },
                    { id: 'stamp_duty', title: 'Adjudication of Conveyance Stamp Duty', fee: 'Variable (6%)', desc: 'Pre-payment of transfer duty' }
                  ].map(srv => (
                    <div
                      key={srv.id}
                      onClick={() => setDirectService(srv.id as any)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                        directService === srv.id
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{srv.title}</span>
                        <span className="text-emerald-700 font-extrabold">{srv.fee}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">{srv.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom valuation slider if stamp duty chosen */}
              {directService === 'stamp_duty' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Assessed Land Market Valuation:</span>
                    <span className="text-emerald-700">₹{directCustomValuation.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={10000000}
                    step={100000}
                    value={directCustomValuation}
                    onChange={(e) => setDirectCustomValuation(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₹5 Lakhs</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>
              )}

              {/* Citizen & Location Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Citizen / Remitter Name *</label>
                  <input
                    type="text"
                    value={directPayerName}
                    onChange={(e) => setDirectPayerName(e.target.value)}
                    placeholder="e.g. K. Sangeetha Rao"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number (For SMS Challan) *</label>
                  <input
                    type="tel"
                    value={directPayerPhone}
                    onChange={(e) => setDirectPayerPhone(e.target.value)}
                    placeholder="e.g. 98490xxxxx"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">District</label>
                  <select
                    value={directDistrict}
                    onChange={(e) => setDirectDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Ranga Reddy">Ranga Reddy</option>
                    <option value="Medchal-Malkajgiri">Medchal-Malkajgiri</option>
                    <option value="Yadadri Bhuvanagiri">Yadadri Bhuvanagiri</option>
                    <option value="Sangareddy">Sangareddy</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mandal & Village</label>
                  <input
                    type="text"
                    value={`${directMandal}, ${directVillage}`}
                    onChange={(e) => {
                      const [m, v] = e.target.value.split(',');
                      if (m) setDirectMandal(m.trim());
                      if (v) setDirectVillage(v.trim());
                    }}
                    placeholder="Mandal, Village"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Survey Number / Sub-Division *</label>
                  <input
                    type="text"
                    value={directSurveyNo}
                    onChange={(e) => setDirectSurveyNo(e.target.value)}
                    placeholder="e.g. 142/2A or 88/1B"
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ad-hoc Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">
                  Direct Treasury e-Challan Summary
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  ₹{getDirectFeeStructure().total.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Service: <strong className="text-slate-800 capitalize">{directService.replace('_', ' ')}</strong>
                </div>
              </div>

              {/* Head of Accounts list */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-700">Account Heads Allocation</div>
                {getDirectFeeStructure().heads.map(h => (
                  <div key={h.headCode} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <div className="font-mono text-[10px] text-slate-500">{h.headCode}</div>
                      <div className="font-medium text-slate-800">{h.description}</div>
                    </div>
                    <div className="font-bold text-slate-900">₹{h.amount.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              {/* Payment selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-2 block">Payment Gateway</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Instant UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'netbanking' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="generate-direct-challan-btn"
                disabled={isProcessing}
                onClick={() => handleExecutePayment(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Treasury Challan...</span>
                  </>
                ) : (
                  <>
                    <Receipt className="w-4 h-4" />
                    <span>Pay & Generate Form TR-6 Receipt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RECEIPTS HISTORY & SEARCH */}
      {activeSubTab === 'receipts_history' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Verified Cyber Treasury Receipts (Form TR-6)
              </h2>
              <p className="text-xs text-slate-500">
                All digital receipts contain encrypted CIN, bank reference hash, and QR code for field inspection
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={receiptSearchQuery}
                onChange={(e) => setReceiptSearchQuery(e.target.value)}
                placeholder="Search Challan No, CIN, or Payer..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {filteredReceipts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <FileCheck className="w-8 h-8 mx-auto text-slate-300" />
              <div>No receipts found matching your search.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3.5">Challan / CIN</th>
                    <th className="p-3.5">Service & Land Parcel</th>
                    <th className="p-3.5">Remitter Details</th>
                    <th className="p-3.5">Payment Mode</th>
                    <th className="p-3.5 text-right">Amount (₹)</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredReceipts.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-emerald-700">{r.challanNumber}</div>
                        <div className="text-[10px] font-mono text-slate-500">CIN: {r.cinNumber}</div>
                        <div className="text-[10px] text-slate-400">{r.transactionDate}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{r.serviceType}</div>
                        <div className="text-[11px] text-slate-600">
                          Survey: <strong className="text-slate-800">{r.surveyNumber}</strong> • {r.village}, {r.mandal}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{r.payerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Mobile: {r.payerPhone}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {r.paymentMode}
                        </span>
                        <div className="text-[10px] text-emerald-600 font-bold mt-1">PAID (TR-6)</div>
                      </td>
                      <td className="p-3.5 text-right font-black text-slate-900 text-sm">
                        ₹{r.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => setSelectedReceiptForView(r)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold transition flex items-center justify-center gap-1 mx-auto"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View / Print</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* OFFICIAL FORM TR-6 RECEIPT MODAL */}
      {(activePaidReceipt || selectedReceiptForView) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-scaleIn my-8">
            {/* Modal Actions Bar (hidden on print) */}
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between text-xs print:hidden">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">Official Cyber Treasury e-Challan Receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 font-bold transition text-white"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => {
                    setActivePaidReceipt(null);
                    setSelectedReceiptForView(null);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Receipt Body (Form TR-6) */}
            {(() => {
              const r = activePaidReceipt || selectedReceiptForView;
              if (!r) return null;

              return (
                <div className="p-8 space-y-6 text-slate-900 bg-slate-50/50">
                  {/* Government Header */}
                  <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
                    <div className="font-serif font-black text-sm uppercase tracking-widest text-slate-800">
                      GOVERNMENT OF TELANGANA / REVENUE DEPARTMENT
                    </div>
                    <div className="font-serif font-bold text-xs uppercase text-slate-700">
                      CYBER TREASURY & REGISTRATION E-RECEIPT
                    </div>
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      Form TR-6 (Treasury Rule 10) • e-Challan Cyber Receipt
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Integrated Financial Management & Information System (IFMIS)
                    </div>
                  </div>

                  {/* Identification Data Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs font-medium">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Challan Number</div>
                      <div className="font-mono font-bold text-emerald-800">{r.challanNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">CIN Number</div>
                      <div className="font-mono font-bold text-slate-900">{r.cinNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Bank Ref Number</div>
                      <div className="font-mono font-bold text-slate-900">{r.bankReferenceNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">DDO Code</div>
                      <div className="font-mono font-bold text-slate-900">{r.ddoCode}</div>
                    </div>
                  </div>

                  {/* Payer and Parcel Data */}
                  <div className="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-slate-200">
                    <div className="space-y-1.5">
                      <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                        Remitter / Payer Details
                      </div>
                      <div>Name: <strong>{r.payerName}</strong></div>
                      <div>Mobile: <strong>{r.payerPhone}</strong></div>
                      {r.payerAadhaarMasked && (
                        <div>Aadhaar: <span className="font-mono">{r.payerAadhaarMasked}</span></div>
                      )}
                      <div>Payment Mode: <span className="font-semibold text-emerald-700">{r.paymentMode}</span></div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                        Land Parcel & Office
                      </div>
                      <div>Survey Number: <strong className="text-emerald-800">{r.surveyNumber}</strong></div>
                      <div>Location: {r.village}, {r.mandal}</div>
                      <div>District: {r.district}</div>
                      <div>Jurisdiction: Sub-Registrar / Tahsildar</div>
                    </div>
                  </div>

                  {/* Head of Accounts Table */}
                  <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 text-[10px] font-bold uppercase border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Head of Account</th>
                          <th className="p-2.5">Service Component</th>
                          <th className="p-2.5 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-xs">
                        {r.headOfAccounts.map(h => (
                          <tr key={h.headCode}>
                            <td className="p-2.5 font-mono text-slate-600">{h.headCode}</td>
                            <td className="p-2.5 text-slate-800">{h.description}</td>
                            <td className="p-2.5 text-right font-bold text-slate-900">₹{h.amount.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-emerald-50 text-slate-900 font-bold border-t border-emerald-200">
                        <tr>
                          <td colSpan={2} className="p-2.5 text-right font-extrabold">
                            Total Realized Amount:
                          </td>
                          <td className="p-2.5 text-right font-black text-emerald-800 text-sm">
                            ₹{r.totalAmount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Verification Watermark and Seal */}
                  <div className="flex items-center justify-between border-t-2 border-dashed border-slate-300 pt-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-extrabold text-emerald-900">TREASURY CLEARANCE CONFIRMED</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Status: SUCCESS • Realized on {r.transactionDate}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Computer-generated e-Receipt. Zero physical signature needed.
                      </div>
                    </div>

                    {/* QR Code SVG */}
                    <div className="p-1.5 bg-white border border-slate-300 rounded-lg text-center">
                      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" fill="white" />
                        <rect x="10" y="10" width="24" height="24" fill="#0f172a" />
                        <rect x="14" y="14" width="16" height="16" fill="white" />
                        <rect x="18" y="18" width="8" height="8" fill="#0f172a" />
                        <rect x="66" y="10" width="24" height="24" fill="#0f172a" />
                        <rect x="70" y="14" width="16" height="16" fill="white" />
                        <rect x="74" y="18" width="8" height="8" fill="#0f172a" />
                        <rect x="10" y="66" width="24" height="24" fill="#0f172a" />
                        <rect x="14" y="70" width="16" height="16" fill="white" />
                        <rect x="18" y="74" width="8" height="8" fill="#0f172a" />
                        <rect x="42" y="42" width="16" height="16" fill="#059669" />
                      </svg>
                      <div className="text-[8px] font-mono text-slate-500 mt-0.5">VERIFIED</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
