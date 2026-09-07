import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Users, 
  CreditCard, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LandRecord, Language, TransferApplication, TransferType } from '../types';
import { translations, speakText } from '../services/languageService';
import { validateLandTransferWithAI } from '../services/aiValidatorService';

interface Feature2Props {
  records: LandRecord[];
  selectedInitialRecord: LandRecord | null;
  onApplicationCreated: (newApp: TransferApplication) => void;
  language: Language;
}

export const Feature2TransferWizard: React.FC<Feature2Props> = ({
  records,
  selectedInitialRecord,
  onApplicationCreated,
  language
}) => {
  const t = translations[language];

  // Current wizard step: 1 (Type & Land), 2 (Parties), 3 (Fees & Docs)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedSurveyNo, setSelectedSurveyNo] = useState(selectedInitialRecord?.surveyNumber || '142/2A');
  const [transferType, setTransferType] = useState<TransferType>('sale');

  const [sellerName, setSellerName] = useState(selectedInitialRecord?.pattadarName || 'Kondaiah Venkata Ramana Rao');
  const [sellerFather, setSellerFather] = useState(selectedInitialRecord?.fatherOrHusbandName || 'Late K. Satyanarayana');
  const [sellerAadhaar, setSellerAadhaar] = useState('XXXX-XXXX-4829');
  const [sellerPhone, setSellerPhone] = useState('9848011223');
  const [sellerPassbook, setSellerPassbook] = useState(selectedInitialRecord?.passbookNumber || 'T2814008921');

  const [buyerName, setBuyerName] = useState('Mudiraj Naresh Kumar');
  const [buyerFather, setBuyerFather] = useState('M. Sayanna');
  const [buyerAadhaar, setBuyerAadhaar] = useState('XXXX-XXXX-9104');
  const [buyerPhone, setBuyerPhone] = useState('9949022334');
  const [buyerRelation, setBuyerRelation] = useState('Purchaser');

  const [transferAcres, setTransferAcres] = useState(1);
  const [transferGuntas, setTransferGuntas] = useState(10);

  const [docPassbook, setDocPassbook] = useState(true);
  const [docSaleDeed, setDocSaleDeed] = useState(true);
  const [docEC, setDocEC] = useState(true);
  const [docAadhaar, setDocAadhaar] = useState(true);

  // Derive target land record
  const currentRecord = records.find((r) => r.surveyNumber === selectedSurveyNo) || records[0];

  // Calculate market value & govt fees
  const totalGuntas = (transferAcres * 40) + transferGuntas;
  const fractionOfAcre = totalGuntas / 40;
  const valuationAmount = Math.round(fractionOfAcre * (currentRecord?.marketValuationPerAcre || 1800000));

  // Stamp Duty rate: Sale (5.5%), Gift (1.5%), Inheritance (0%), Partition (1%)
  const stampDutyRate = transferType === 'sale' ? 0.055 : transferType === 'gift' ? 0.015 : transferType === 'partition' ? 0.01 : 0;
  const stampDutyFee = Math.round(valuationAmount * stampDutyRate);
  const registrationFee = transferType === 'inheritance' ? 2000 : Math.round(valuationAmount * 0.005);
  const mutationFee = 500;
  const totalGovtFee = stampDutyFee + registrationFee + mutationFee;
  const estimatedBrokerFee = Math.round(totalGovtFee + 25000); // What middlemen traditionally charge

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!sellerName || !selectedSurveyNo) {
        alert('Please specify the survey number and seller information.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!buyerName || !buyerAadhaar) {
        alert('Please fill the buyer/transferee information.');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    try {
      // Run AI validator locally
      const aiResult = await validateLandTransferWithAI({
        sellerName,
        sellerAadhaar,
        sellerPassbook,
        buyerName,
        buyerAadhaar,
        transferType,
        surveyNumber: selectedSurveyNo,
        claimedExtentAcres: transferAcres,
        claimedExtentGuntas: transferGuntas,
        targetLandRecord: currentRecord,
        hasDeedDocument: docSaleDeed,
        hasPassbookDocument: docPassbook,
        hasECDocument: docEC
      });

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newAppId = `BS-MUT-2026-${randomSuffix}`;

      const newApplication: TransferApplication = {
        id: `APP-2026-${randomSuffix}`,
        applicationNumber: newAppId,
        submissionDate: new Date().toISOString().split('T')[0],
        transferType,
        surveyNumber: selectedSurveyNo,
        village: currentRecord?.village || 'Polampalli',
        mandal: currentRecord?.mandal || 'Ibrahimpatnam',
        district: currentRecord?.district || 'Ranga Reddy',
        extentTransferring: { acres: transferAcres, guntas: transferGuntas },
        seller: {
          name: sellerName,
          fatherName: sellerFather,
          aadhaarMasked: sellerAadhaar,
          phone: sellerPhone,
          passbookNo: sellerPassbook
        },
        buyer: {
          name: buyerName,
          fatherName: buyerFather,
          aadhaarMasked: buyerAadhaar,
          phone: buyerPhone,
          relationship: buyerRelation
        },
        valuationAmount,
        stampDutyFee,
        registrationFee,
        mutationFee,
        totalFee: totalGovtFee,
        paymentStatus: 'Paid (Digital Challan)',
        challanReference: `CHL-TREASURY-${Math.floor(100000 + Math.random() * 900000)}`,
        documents: {
          pattadarPassbook: docPassbook,
          saleOrGiftDeed: docSaleDeed,
          encumbranceCertificate: docEC,
          aadhaarKyc: docAadhaar,
          panOrForm60: true
        },
        aiValidation: aiResult,
        currentStage: 'surveyor_review',
        stageHistory: [
          {
            stage: 'Online Application & Digital Challan',
            officerRole: 'Citizen',
            officerName: buyerName,
            status: 'approved',
            timestamp: new Date().toLocaleString(),
            remarks: 'Submitted via SLS Direct Portal. Biometric KYC and Treasury Challan verified.'
          },
          {
            stage: 'Mandal Surveyor GIS Geo-tagging',
            officerRole: 'Mandal Surveyor',
            officerName: 'K. Ramesh Babu (Licensed Surveyor)',
            status: 'in_progress',
            timestamp: 'Queued for automated cadastral match',
            remarks: 'Digital boundary polygon matching in progress. Zero physical survey visit needed.'
          },
          {
            stage: 'Village Revenue Officer (VRO) Verification',
            officerRole: 'Village Revenue Officer (VRO)',
            officerName: 'Smt. D. Sharada (VRO)',
            status: 'pending',
            timestamp: 'Upcoming',
            remarks: '72-Hour digital e-notice to be published.'
          },
          {
            stage: 'Mandal Revenue Officer (MRO) Final Seal',
            officerRole: 'Mandal Revenue Officer (MRO)',
            officerName: 'Sri M. Anand Kumar (MRO)',
            status: 'pending',
            timestamp: 'Upcoming',
            remarks: 'Awaiting VRO signoff.'
          }
        ]
      };

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }

      onApplicationCreated(newApplication);
    } catch (err) {
      console.error(err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="feature-2-transfer-wizard-container" className="space-y-6">
      {/* Wizard Step Tracker Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1 border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Feature 2: Direct Ownership Transfer Application</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              File Digital Mutation & Ownership Transfer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your transfer online with transparent government fees. Zero middlemen or physical office visits required.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-right">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Estimated Processing</span>
            <span className="text-sm font-extrabold text-emerald-950">4 - 7 Business Days</span>
          </div>
        </div>

        {/* 3 Step Progress Bar */}
        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition ${
            currentStep === 1 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
              : currentStep > 1 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
            <span>Land & Transfer Type</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition ${
            currentStep === 2 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
              : currentStep > 2 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
            <span>Parties (Seller & Buyer)</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition ${
            currentStep === 3 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
              : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
            <span>Treasury Fees & AI Validation</span>
          </div>
        </div>
      </div>

      {/* Step 1: Transfer Type & Land Extent */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Select Transfer Category & Target Land Survey</span>
          </h3>

          {/* Transfer Type Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'sale', label: 'Sale Deed (క్రయవిక్రయం)', sub: 'Standard market purchase between buyer and seller', stamp: '5.5% Stamp Duty' },
              { id: 'gift', label: 'Gift Settlement (బహుమతి)', sub: 'Transferring to sons, daughters, or spouse', stamp: '1.5% Stamp Duty' },
              { id: 'inheritance', label: 'Succession (వారసత్వం)', sub: 'Transfer following demise of Pattadar / Legal Heir', stamp: '₹0 (Nominal ₹2000)' },
              { id: 'partition', label: 'Family Partition (భాగ పరిష్కారం)', sub: 'Mutual partition among brothers or coparceners', stamp: '1% Stamp Duty' }
            ].map((tItem) => (
              <div
                key={tItem.id}
                onClick={() => setTransferType(tItem.id as TransferType)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  transferType === tItem.id
                    ? 'bg-emerald-50/70 border-emerald-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-slate-900">{tItem.label}</span>
                    {transferType === tItem.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500">{tItem.sub}</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 mt-3 block">{tItem.stamp}</span>
              </div>
            ))}
          </div>

          {/* Survey Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Survey Number
              </label>
              <select
                id="transfer-survey-select"
                value={selectedSurveyNo}
                onChange={(e) => {
                  const s = e.target.value;
                  setSelectedSurveyNo(s);
                  const found = records.find((r) => r.surveyNumber === s);
                  if (found) {
                    setSellerName(found.pattadarName);
                    setSellerFather(found.fatherOrHusbandName);
                    setSellerPassbook(found.passbookNumber);
                    setTransferAcres(found.extentAcres);
                    setTransferGuntas(found.extentGuntas);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {records.map((r) => (
                  <option key={r.id} value={r.surveyNumber}>
                    Sy. No. {r.surveyNumber} - {r.pattadarName} ({r.village}, {r.extentAcres}A {r.extentGuntas}G)
                  </option>
                ))}
              </select>
            </div>

            {/* Extent Transferring */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Extent of Land Being Transferred
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      id="transfer-acres-input"
                      type="number"
                      min="0"
                      max="100"
                      value={transferAcres}
                      onChange={(e) => setTransferAcres(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">Acres</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      id="transfer-guntas-input"
                      type="number"
                      min="0"
                      max="39"
                      value={transferGuntas}
                      onChange={(e) => setTransferGuntas(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">Guntas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          {currentRecord && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-600">Total Registered Holding: </span>
                <span className="font-extrabold text-slate-900">{currentRecord.extentAcres} Acres {currentRecord.extentGuntas} Guntas</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="font-semibold text-slate-600">Village: </span>
                <span className="font-bold text-slate-900">{currentRecord.village}</span>
              </div>
              <div className="text-emerald-700 font-bold">
                EC Status: {currentRecord.encumbranceStatus}
              </div>
            </div>
          )}

          {/* Step 1 CTA */}
          <div className="pt-4 flex justify-end">
            <button
              id="wizard-step1-next-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Parties Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Parties Details (Seller & Buyer) */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller / Transferor */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <User className="w-4 h-4 text-emerald-600" />
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Transferor (Current Owner / Seller)
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Legal Name</label>
                <input
                  id="seller-name-input"
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Father / Husband Name</label>
                <input
                  id="seller-father-input"
                  type="text"
                  value={sellerFather}
                  onChange={(e) => setSellerFather(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Aadhaar (Masked)</label>
                  <input
                    id="seller-aadhaar-input"
                    type="text"
                    value={sellerAadhaar}
                    onChange={(e) => setSellerAadhaar(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Passbook ID</label>
                  <input
                    id="seller-passbook-input"
                    type="text"
                    value={sellerPassbook}
                    onChange={(e) => setSellerPassbook(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile Phone (for OTP Consent)</label>
                <input
                  id="seller-phone-input"
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Buyer / Transferee */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Users className="w-4 h-4 text-emerald-600" />
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Transferee (New Owner / Buyer)
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Legal Name</label>
                <input
                  id="buyer-name-input"
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter purchaser's full legal name as per Aadhaar"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Father / Husband Name</label>
                <input
                  id="buyer-father-input"
                  type="text"
                  value={buyerFather}
                  onChange={(e) => setBuyerFather(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Aadhaar (Masked)</label>
                  <input
                    id="buyer-aadhaar-input"
                    type="text"
                    value={buyerAadhaar}
                    onChange={(e) => setBuyerAadhaar(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Relationship / Role</label>
                  <input
                    id="buyer-relation-input"
                    type="text"
                    value={buyerRelation}
                    onChange={(e) => setBuyerRelation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile Phone (for e-Passbook SMS)</label>
                <input
                  id="buyer-phone-input"
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-4 flex justify-between">
            <button
              id="wizard-step2-back-btn"
              onClick={handlePrevStep}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              id="wizard-step2-next-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Fees & Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Fee Breakdown & Document Upload */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Documents Checklist & Uploads */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-600" />
                <span>Upload & Verify Supporting Documents</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  {
                    title: 'Current Pattadar Passbook / Title Deed Copy',
                    desc: 'Digital photo or scan of existing passbook / Pahani copy',
                    checked: docPassbook,
                    toggle: () => setDocPassbook(!docPassbook)
                  },
                  {
                    title: 'Deed Document (Registered Sale / Gift / Partition / FMC)',
                    desc: 'Sale Deed or Family Member Certificate for succession',
                    checked: docSaleDeed,
                    toggle: () => setDocSaleDeed(!docSaleDeed)
                  },
                  {
                    title: 'Encumbrance Certificate (30 Years EC)',
                    desc: 'Auto-retrieved from Sub-Registrar Office database',
                    checked: docEC,
                    toggle: () => setDocEC(!docEC)
                  },
                  {
                    title: 'Buyer & Seller Aadhaar Biometric e-KYC',
                    desc: 'Digital OTP authentication verified via UIDAI stack',
                    checked: docAadhaar,
                    toggle: () => setDocAadhaar(!docAadhaar)
                  }
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={doc.toggle}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      doc.checked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        doc.checked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {doc.checked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{doc.title}</span>
                        <span className="text-[11px] text-slate-500">{doc.desc}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-emerald-700 border border-emerald-200">
                      {doc.checked ? 'Verified ✓' : 'Click to Attach'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparent Government Fee Calculation Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                      Direct Treasury Challan
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    Zero Brokerage
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Govt Valuation Amount:</span>
                    <span className="font-mono font-bold text-white">₹{valuationAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Stamp Duty ({stampDutyRate * 100}%):</span>
                    <span className="font-mono font-bold text-white">₹{stampDutyFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Registration Fee:</span>
                    <span className="font-mono font-bold text-white">₹{registrationFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Mutation Fee (VRO/MRO):</span>
                    <span className="font-mono font-bold text-white">₹{mutationFee}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-black text-sm text-emerald-300">Total Legal Fee:</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">
                      ₹{totalGovtFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Direct Comparison vs Middleman */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Traditional Middleman/Agent:</span>
                    <span className="line-through text-rose-400">₹{estimatedBrokerFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-bold">
                    <span>Your Direct Savings:</span>
                    <span>₹25,000 Saved!</span>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <button
                  id="submit-transfer-application-btn"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-950/50 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Running AI Discrepancy Engine...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Application & Pay Treasury Challan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              id="wizard-step3-back-btn"
              onClick={handlePrevStep}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Parties</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
