import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Compass, 
  ExternalLink, 
  Volume2,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { LandRecord, Language } from '../types';
import { translations, speakText } from '../services/languageService';

interface Feature1Props {
  records: LandRecord[];
  onSelectForTransfer: (record: LandRecord) => void;
  language: Language;
}

export const Feature1TitleVerification: React.FC<Feature1Props> = ({
  records,
  onSelectForTransfer,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState('142/2A');
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(
    records.find((r) => r.surveyNumber === '142/2A') || records[0]
  );
  const [hasSearched, setHasSearched] = useState(true);

  const t = translations[language];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchTerm.trim().toLowerCase();
    const found = records.find(
      (r) =>
        r.surveyNumber.toLowerCase().includes(clean) ||
        r.passbookNumber.toLowerCase().includes(clean) ||
        r.pattadarName.toLowerCase().includes(clean) ||
        r.village.toLowerCase().includes(clean)
    );
    setSelectedRecord(found || null);
    setHasSearched(true);
  };

  const handleReadDetailsAloud = (rec: LandRecord) => {
    const textToRead = language === 'te'
      ? `సర్వే నంబర్ ${rec.surveyNumber}. పట్టాదారుడు ${rec.pattadarName}. విస్తీర్ణం ${rec.extentAcres} ఎకరాల ${rec.extentGuntas} గుంటలు. ఎన్కంబరెన్స్ స్థితి: ${rec.encumbranceStatus}. మార్కెట్ విలువ రూపాయలు ${rec.totalMarketValue.toLocaleString('en-IN')}.`
      : language === 'hi'
      ? `खसरा नंबर ${rec.surveyNumber}. पट्टेदार ${rec.pattadarName}. रकबा ${rec.extentAcres} एकड़ ${rec.extentGuntas} गुंठे. ईसी स्थिति: ${rec.encumbranceStatus}. सरकारी मूल्य ${rec.totalMarketValue.toLocaleString('en-IN')} रुपये.`
      : `Survey Number ${rec.surveyNumber}. Land owner ${rec.pattadarName}. Total extent ${rec.extentAcres} Acres and ${rec.extentGuntas} Guntas in village ${rec.village}. Encumbrance status is ${rec.encumbranceStatus}. Total government valuation is Rupees ${rec.totalMarketValue.toLocaleString('en-IN')}.`;

    speakText(textToRead, language);
  };

  return (
    <div id="feature-1-title-verification-container" className="space-y-6">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Feature 1: Cadastral Title & Survey Verification</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Instant Land Title, Boundary & Encumbrance Verification
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify land ownership, survey sub-division boundaries, and 30-year encumbrance certificates directly from home.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick sample surveys:</span>
            {['142/2A', '88/1B', '204/3', '55/A'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSearchTerm(s);
                  const found = records.find((r) => r.surveyNumber === s);
                  setSelectedRecord(found || null);
                  setHasSearched(true);
                }}
                className={`px-2.5 py-1 rounded-md font-mono text-xs font-semibold border transition ${
                  searchTerm === s
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="survey-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Survey No. (e.g., 142/2A), Passbook No. (T2814008921), or Owner Name"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>
          <button
            id="survey-search-submit-btn"
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Registry</span>
          </button>
        </form>
      </div>

      {/* Search Result Display */}
      {selectedRecord ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Record Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
            {/* Top Bar with Status and Voice assistance */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base border border-emerald-200">
                  {selectedRecord.subDivision}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900 font-mono">
                      Survey No: {selectedRecord.surveyNumber}
                    </span>
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono border border-slate-200">
                      Khata/PB: {selectedRecord.passbookNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedRecord.village} Village, {selectedRecord.mandal} Mandal, {selectedRecord.district} District</span>
                  </p>
                </div>
              </div>

              {/* Read Aloud Button for Farmers */}
              <button
                id="read-aloud-record-btn"
                onClick={() => handleReadDetailsAloud(selectedRecord)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Listen in Voice</span>
              </button>
            </div>

            {/* Ownership and Land Classification Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Pattadar Owner</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{selectedRecord.pattadarName}</span>
                <span className="text-[10px] text-slate-500 block">S/o: {selectedRecord.fatherOrHusbandName}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Registered Extent</span>
                <span className="text-base font-extrabold text-emerald-700 block mt-0.5">
                  {selectedRecord.extentAcres} Ac {selectedRecord.extentGuntas} Gts
                </span>
                <span className="text-[10px] text-slate-500 block">
                  ({((selectedRecord.extentAcres * 40 + selectedRecord.extentGuntas) / 40).toFixed(2)} Acres total)
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Govt Market Value</span>
                <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                  ₹{selectedRecord.totalMarketValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  ₹{(selectedRecord.marketValuationPerAcre / 100000).toFixed(1)}L / Acre
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Classification</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{selectedRecord.landClassification}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Section 22A Clear</span>
              </div>
            </div>

            {/* Encumbrance Certificate (EC) Status Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              selectedRecord.encumbranceStatus.includes('Clear Title')
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : selectedRecord.encumbranceStatus.includes('Bank Mortgage')
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}>
              {selectedRecord.encumbranceStatus.includes('Clear Title') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider">
                    30-Year Encumbrance Certificate (EC) Status
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/80 border">
                    ROR-1B Validated
                  </span>
                </div>
                <p className="text-sm font-bold mt-1">
                  {selectedRecord.encumbranceStatus}
                </p>
                <p className="text-xs opacity-80 mt-0.5">
                  {selectedRecord.encumbranceStatus.includes('Clear Title')
                    ? 'No registered mortgages, liens, leaseholds, or court attachments recorded on this survey parcel.'
                    : 'Active financial or legal notification. Clearance certificate required prior to mutation transfer.'}
                </p>
              </div>
            </div>

            {/* Four Boundaries (N, S, E, W) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Official Cadastral Boundaries (Surrounding Plots)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                  <span className="font-extrabold text-emerald-700 w-12 shrink-0">NORTH:</span>
                  <span className="text-slate-800 font-medium">{selectedRecord.boundaries.north}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                  <span className="font-extrabold text-emerald-700 w-12 shrink-0">SOUTH:</span>
                  <span className="text-slate-800 font-medium">{selectedRecord.boundaries.south}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                  <span className="font-extrabold text-emerald-700 w-12 shrink-0">EAST:</span>
                  <span className="text-slate-800 font-medium">{selectedRecord.boundaries.east}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                  <span className="font-extrabold text-emerald-700 w-12 shrink-0">WEST:</span>
                  <span className="text-slate-800 font-medium">{selectedRecord.boundaries.west}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Last Revenue Update: {selectedRecord.lastRegisteredDate} • SHA-256 Validated
              </span>
              <button
                id="initiate-transfer-from-search-btn"
                onClick={() => onSelectForTransfer(selectedRecord)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
              >
                <span>Initiate Ownership Transfer for This Plot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GIS Cadastral Boundary Map Visualizer */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">GIS Cadastral Map</h3>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  DGPS Geo-Coordinates
                </span>
              </div>

              {/* Interactive SVG Cadastral Plot */}
              <div className="bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800 aspect-square flex items-center justify-center">
                {/* Compass Marker */}
                <div className="absolute top-2 right-2 bg-slate-900/80 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-300 font-bold flex items-center gap-1">
                  <span>N</span>
                  <span className="text-amber-400">▲</span>
                </div>

                <svg viewBox="0 0 240 220" className="w-full h-full">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="240" height="220" fill="url(#grid)" />

                  {/* Neighboring Ghost Survey Polygons */}
                  <polygon points="10,5 230,10 190,40 30,35" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="120" y="25" fill="rgba(56, 189, 248, 0.6)" fontSize="9" textAnchor="middle">Survey 141 (Adjacent)</text>

                  {/* Main Target Parcel Polygon */}
                  <polygon
                    points={selectedRecord.coordinates.map((c) => `${c.x},${c.y}`).join(' ')}
                    fill="rgba(16, 185, 129, 0.25)"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />

                  {/* Vertex Corner Points */}
                  {selectedRecord.coordinates.map((c, i) => (
                    <g key={i}>
                      <circle cx={c.x} cy={c.y} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={c.x + 6} y={c.y - 4} fill="#a7f3d0" fontSize="8" fontWeight="bold">
                        P{i + 1}
                      </text>
                    </g>
                  ))}

                  {/* Label inside polygon */}
                  <text x="110" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Sy. No. {selectedRecord.surveyNumber}
                  </text>
                  <text x="110" y="122" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {selectedRecord.extentAcres}A {selectedRecord.extentGuntas}G
                  </text>
                </svg>

                <div className="absolute bottom-2 left-2 text-[9px] text-slate-400 font-mono bg-slate-900/90 px-2 py-0.5 rounded">
                  Lat 17.2091° N • Long 78.5812° E
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Boundary Perimeter:</span>
                <span className="font-semibold text-slate-800">412.8 Meters</span>
              </div>
              <div className="flex justify-between">
                <span>Sub-Division Dispute Risk:</span>
                <span className="font-bold text-emerald-600">0% (Cadastral Matched)</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Survey Record Not Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No active record found for "{searchTerm}". Please check the Survey Number or select one of the preloaded demo plots (e.g. 142/2A or 88/1B).
          </p>
        </div>
      ) : null}
    </div>
  );
};
