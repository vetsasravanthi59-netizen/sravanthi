import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileSearch, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  Layers, 
  Lightbulb,
  Info
} from 'lucide-react';
import { AIValidationResult, LandRecord, Language } from '../types';
import { validateLandTransferWithAI } from '../services/aiValidatorService';
import { translations } from '../services/languageService';

interface Feature3Props {
  records: LandRecord[];
  language: Language;
}

export const Feature3AIValidator: React.FC<Feature3Props> = ({ records, language }) => {
  const [selectedScenario, setSelectedScenario] = useState<'clean' | 'name_mismatch' | 'extent_overflow' | 'stay_injunction'>('clean');
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<AIValidationResult | null>(null);

  const t = translations[language];

  // Scenarios to demonstrate AI capability
  const runPresetTest = async (scenario: 'clean' | 'name_mismatch' | 'extent_overflow' | 'stay_injunction') => {
    setSelectedScenario(scenario);
    setIsLoading(true);

    let targetRec = records[0]; // 142/2A
    let sellerName = targetRec.pattadarName;
    let sellerPassbook = targetRec.passbookNumber;
    let claimedAcres = 1;
    let claimedGuntas = 10;
    let transferType = 'sale';

    if (scenario === 'name_mismatch') {
      targetRec = records[0];
      sellerName = 'K. Ramana (Mismatch vs Kondaiah Venkata Ramana Rao)';
      sellerPassbook = 'T2814008921';
    } else if (scenario === 'extent_overflow') {
      targetRec = records[0]; // 2A 20G
      claimedAcres = 4; // Claiming 4 acres when only 2A 20G exists!
      claimedGuntas = 0;
    } else if (scenario === 'stay_injunction') {
      targetRec = records[3]; // Survey 55/A with Court Stay
      sellerName = targetRec.pattadarName;
      sellerPassbook = targetRec.passbookNumber;
    }

    const res = await validateLandTransferWithAI({
      sellerName,
      sellerAadhaar: 'XXXX-XXXX-4829',
      sellerPassbook,
      buyerName: 'Gaddam Srinivas Reddy',
      buyerAadhaar: 'XXXX-XXXX-7721',
      transferType,
      surveyNumber: targetRec.surveyNumber,
      claimedExtentAcres: claimedAcres,
      claimedExtentGuntas: claimedGuntas,
      targetLandRecord: targetRec,
      hasDeedDocument: true,
      hasPassbookDocument: true,
      hasECDocument: true
    });

    setValidationResult(res);
    setIsLoading(false);
  };

  // Run default test on mount if null
  React.useEffect(() => {
    runPresetTest('clean');
  }, []);

  return (
    <div id="feature-3-ai-validator-container" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Feature 3: AI Document & Boundary Discrepancy Validator</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Intelligent Pre-Filing Risk & Boundary Validation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies name variances, boundary overlaps, and legal encumbrances before filing. Free, local rule-based intelligence engine.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
            Engine: <span className="font-mono text-teal-700 font-bold">Heuristic NLP & Cadastral GIS Engine</span>
          </div>
        </div>

        {/* Demo Scenarios Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Test Interactive AI Analysis Scenarios:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              { id: 'clean', label: '1. Standard Clear Title Plot', desc: 'No mortgages, exact name match, safe boundaries' },
              { id: 'name_mismatch', label: '2. Name Spelling Variance', desc: 'Aadhaar name vs Pattadar title spelling variance' },
              { id: 'extent_overflow', label: '3. Extent Boundary Overflow', desc: 'Claimed acreage exceeds registered passbook extent' },
              { id: 'stay_injunction', label: '4. Legal Stay / Court Injunction', desc: 'Active dispute / injunction under revenue notice' }
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => runPresetTest(sc.id as any)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedScenario === sc.id
                    ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">{sc.label}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{sc.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Results Output View */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-slate-900">AI Evaluating Cadastral & Identity Registry...</h3>
          <p className="text-xs text-slate-500">Checking 30-year encumbrance records, boundary coordinates, and name tokens</p>
        </div>
      ) : validationResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Score & Summary Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  AI Title Health Score
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  validationResult.overallStatus === 'APPROVED_CLEAR'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : validationResult.overallStatus === 'NEEDS_ONLINE_RECTIFICATION'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {validationResult.overallStatus.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Large Score Indicator */}
              <div className="my-6 text-center">
                <div className="inline-flex items-baseline gap-1">
                  <span className={`text-6xl font-black font-mono ${
                    validationResult.clarityScore >= 85 
                      ? 'text-emerald-400' 
                      : validationResult.clarityScore >= 60 
                      ? 'text-amber-400' 
                      : 'text-rose-400'
                  }`}>
                    {validationResult.clarityScore}
                  </span>
                  <span className="text-slate-400 font-bold text-xl">/ 100</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {validationResult.clarityScore >= 85
                    ? 'Eligible for Fast-Track 4-Day Digital Mutation'
                    : validationResult.clarityScore >= 60
                    ? 'Requires Minor Online Affidavit'
                    : 'Blocked from Registration Due to Legal Dispute'}
                </p>
              </div>

              {/* Summary Description */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-400" />
                  <span>Executive Assessment</span>
                </div>
                <p className="leading-relaxed">
                  {validationResult.summary}
                </p>
              </div>
            </div>

            {/* Boundary Analysis Metrics */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Cadastral Extent Match</span>
              <div className="flex justify-between text-slate-300">
                <span>Claimed:</span>
                <span className="font-mono text-white font-bold">{validationResult.boundaryAnalysis.claimedExtent}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Registered:</span>
                <span className="font-mono text-white font-bold">{validationResult.boundaryAnalysis.registeredExtent}</span>
              </div>
              <div className="flex justify-between">
                <span>Adjacent Overlap:</span>
                <span className={`font-bold ${validationResult.boundaryAnalysis.isOverlapping ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {validationResult.boundaryAnalysis.isOverlapping ? '⚠️ Overlap Detected' : '✅ 0% Overlap (Clear)'}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Verification Checks & Recommendations */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Granular Verification Checklist
              </h3>
              <div className="space-y-3">
                {validationResult.checks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      check.status === 'pass'
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : check.status === 'warning'
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    {check.status === 'pass' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : check.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{check.name}</span>
                      <p className="text-xs text-slate-600 mt-0.5">{check.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Actionable Recommendations */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 text-teal-900 font-extrabold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-teal-700" />
                <span>Actionable Recommendations (Zero Office Visits Needed)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-teal-950 font-medium list-disc list-inside">
                {validationResult.recommendedActions.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
