import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  X, 
  ShieldCheck, 
  Users, 
  Smartphone, 
  MapPin, 
  FileCheck2, 
  Sparkles, 
  Award,
  Clock,
  Languages
} from 'lucide-react';
import { Language } from '../types';
import { speakText, stopSpeaking } from '../services/languageService';

interface VideoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStartApplication: () => void;
}

interface Scene {
  id: number;
  duration: number; // in seconds
  title: Record<Language, string>;
  sub: Record<Language, string>;
  narration: Record<Language, string>;
  icon: React.ReactNode;
  bgGradient: string;
  visualGraphic: React.ReactNode;
}

export const VideoGuideModal: React.FC<VideoGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  onStartApplication
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100 within current scene
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<number | null>(null);

  const scenes: Scene[] = [
    {
      id: 0,
      duration: 6,
      title: {
        en: "No More Running to Offices or Middlemen!",
        te: "ఆఫీసుల చుట్టూ తిరగడం, దళారులకు లంచాలు ఇవ్వడం ఇకపై వద్దు!",
        hi: "दफ्तरों के चक्कर और दलालों को पैसे देना अब पूरी तरह बंद!",
        ta: "இனி அலுவலகங்களுக்கு அலையவோ, இடைத்தரகர்களுக்கு லஞ்சம் கொடுக்கவோ தேவையில்லை!"
      },
      sub: {
        en: "Previously, citizens had to make 10-15 physical trips to Surveyors, VROs, and MROs. SLS brings the entire registry directly to your mobile phone.",
        te: "గతంలో సర్వేయర్, వి.ఆర్.ఓ, ఎం.ఆర్.ఓ ఆఫీసుల చుట్టూ నెలల తరబడి తిరిగేవాళ్ళు. ఇప్పుడు మీ మొబైల్ ఫోన్ ద్వారా ఇంట్లోనే సులభంగా భూమి బదిలీ చేయవచ్చు.",
        hi: "पहले पटवारी, सर्वेयर और तहसील के अनगिनत चक्कर लगाने पड़ते थे। SLS से अब सारा काम सीधे आपके मोबाइल पर पारदर्शी रूप से होगा।",
        ta: "முன்பு சர்வேயர், விஏஓ, தாசில்தார் அலுவலகங்களுக்கு மாதக்கணக்கில் அலைய வேண்டியிருந்தது. இப்போது உங்கள் செல்போனிலேயே எளிதாக செய்யலாம்."
      },
      narration: {
        en: "Welcome to SLS. You no longer need to pay bribes or repeatedly visit revenue offices. Let us show you how simple it is to transfer land in just 5 easy steps.",
        te: "SLS కు స్వాగతం. ఇకపై సర్వేయర్, వి.ఆర్.ఓ, ఎం.ఆర్.ఓ ఆఫీసుల చుట్టూ తిరగనవసరం లేదు. కేవలం 5 సులభమైన దశల్లో భూమి ఎలా బదిలీ చేయాలో ఇప్పుడు చూద్దాం.",
        hi: "SLS में आपका स्वागत है। अब आपको दलालों या राजस्व कार्यालयों के चक्कर काटने की कोई आवश्यकता नहीं है। आइए देखें मात्र 5 सरल चरणों में जमीन कैसे ट्रांसफर करें।",
        ta: "SLS இற்கு நல்வரவு. இனி இடைத்தரகர்களுக்கு லஞ்சம் கொடுக்கவோ அரசு அலுவலகங்களுக்கு அலையவோ தேவையில்லை. 5 எளிய படிகளில் நில மாற்றம் செய்வது எப்படி என்று பார்ப்போம்."
      },
      icon: <Users className="w-8 h-8 text-emerald-300" />,
      bgGradient: "from-slate-900 via-emerald-950 to-slate-900",
      visualGraphic: (
        <div className="flex items-center justify-center gap-6 py-6">
          <div className="bg-rose-950/80 border border-rose-600/40 p-4 rounded-xl text-center max-w-[170px] opacity-80 scale-95">
            <div className="text-2xl mb-1">❌ 90 Days</div>
            <p className="text-xs text-rose-200 font-semibold">Old Way: 15 Physical Visits to Surveyor / VRO / MRO</p>
            <span className="text-[10px] text-rose-300 bg-rose-900/60 px-2 py-0.5 rounded mt-2 inline-block">High Bribe Risk</span>
          </div>
          <div className="text-3xl font-black text-amber-400">➔</div>
          <div className="bg-emerald-900/90 border-2 border-emerald-400 p-5 rounded-xl text-center max-w-[200px] shadow-lg shadow-emerald-900/50 scale-105">
            <div className="text-3xl mb-1 font-black text-emerald-300">✅ 4 Days</div>
            <p className="text-xs text-emerald-100 font-bold">SLS: Direct Digital Transfer from Home</p>
            <span className="text-[10px] text-slate-950 bg-emerald-400 font-extrabold px-2 py-0.5 rounded mt-2 inline-block">Zero Bribe • 100% Legal</span>
          </div>
        </div>
      )
    },
    {
      id: 1,
      duration: 6,
      title: {
        en: "Step 1: Check Land Survey Number",
        te: "మొదటి దశ: మీ సర్వే నంబర్ నమోదు చేసి భూమి వివరాలు చూడండి",
        hi: "चरण 1: सर्वे / खसरा नंबर डालकर जमीन का विवरण देखें",
        ta: "படி 1: சர்வே எண்ணை உள்ளிட்டு நில விவரங்களை சரிபார்க்கவும்"
      },
      sub: {
        en: "Type your Survey Number (e.g., 142/2A). Instantly see your Pattadar passbook, total acreage, boundaries, and clear title status on satellite map.",
        te: "మీ సర్వే నంబర్ (ఉదా: 142/2A) టైప్ చేయగానే మీ పట్టాదారు పాస్ బుక్, విస్తీర్ణం, చుట్టుపక్కల సరిహద్దులు, ఎన్కంబరెన్స్ వివరాలు క్షణాల్లో కనిపిస్తాయి.",
        hi: "बस अपना सर्वे नंबर डालें। तुरंत आपको पट्टेदार का नाम, कुल रकबा, चारों दिशाओं की सीमाएं और निष्कंटक स्थिति स्पष्ट दिखेगी।",
        ta: "உங்கள் சர்வே எண்ணை பதிவு செய்யுங்கள். உடனடி பட்டா விவரங்கள், நில அளவு மற்றும் எல்லைகள் தெளிவாக தெரியும்."
      },
      narration: {
        en: "Step one. Just enter your survey number. The system instantly loads your official land title, digital map, and verifies there are no pending court disputes.",
        te: "మొదటి దశ: మీ సర్వే నంబర్ నమోదు చేయండి. సిస్టమ్ మీ పట్టా వివరాలు, సరిహద్దుల మ్యాప్ మరియు ఎటువంటి కోర్టు కేసులు లేవని వెంటనే ధృవీకరిస్తుంది.",
        hi: "पहला चरण: अपना सर्वे नंबर दर्ज करें। सिस्टम तुरंत आपकी जमीन का नक्शा, सरकारी रिकॉर्ड और बैंक लोन की स्थिति दिखा देगा।",
        ta: "படி ஒன்று: உங்கள் சர்வே எண்ணை உள்ளிடவும். நிலத்தின் பட்டா விவரங்கள் மற்றும் எல்லை வரைபடம் உடனடியாக திரையில் தோன்றும்."
      },
      icon: <MapPin className="w-8 h-8 text-sky-400" />,
      bgGradient: "from-slate-900 via-sky-950 to-slate-900",
      visualGraphic: (
        <div className="bg-slate-900/90 border border-sky-500/40 p-5 rounded-xl max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-sky-300">SEARCH SURVEY NO:</span>
            <span className="bg-sky-500/20 text-sky-200 text-xs px-2 py-0.5 rounded font-mono font-bold">142/2A</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 text-left text-xs">
            <div className="flex justify-between"><span className="text-slate-400">Pattadar:</span> <span className="font-bold text-emerald-300">K. Venkata Ramana Rao</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Extent:</span> <span className="font-bold text-white">2 Acres 20 Guntas</span></div>
            <div className="flex justify-between"><span className="text-slate-400">EC Status:</span> <span className="font-bold text-emerald-400">✅ Clear Title (Zero Dues)</span></div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      duration: 6,
      title: {
        en: "Step 2: Enter Buyer & Seller Details",
        te: "రెండవ దశ: కొనుగోలుదారు, అమ్మకందారు వివరాలు సులభంగా నమోదు చేయండి",
        hi: "चरण 2: क्रेता और विक्रेता का आधार व जरूरी जानकारी भरें",
        ta: "படி 2: வாங்குபவர் மற்றும் விற்பவர் விவரங்களை உள்ளிடவும்"
      },
      sub: {
        en: "Select whether it is a Sale, Gift to children, or Inheritance. Enter names and Aadhaar. The exact government treasury fee is calculated openly without hidden agent cuts.",
        te: "అమ్మకం, బహుమతి లేదా వారసత్వ బదిలీ ఎంచుకోండి. ఆధార్ నమోదు చేయండి. ప్రభుత్వ చలానా ఫీజు ఖచ్చితంగా లెక్కించబడుతుంది. దళారుల కమీషన్లు ఉండవు.",
        hi: "जमीन बिक्री, उपहार या वरासत का चयन करें। सरकारी फीस बिल्कुल पारदर्शी तरीके से स्क्रीन पर आ जाती है, बिना किसी बिचौलिये के।",
        ta: "விற்பனை, தானம் அல்லது வாரிசுரிமை மாற்றத்தை தேர்வு செய்து விவரங்களை உள்ளிடவும். துல்லியமான அரசு கட்டணம் மட்டுமே."
      },
      narration: {
        en: "Step two. Select if you are selling or passing land to your children. Enter basic details. The system calculates the exact government stamp duty transparently.",
        te: "రెండవ దశ: భూమిని అమ్ముతున్నారా లేదా పిల్లలకు ఇస్తున్నారా ఎంచుకోండి. సిస్టమ్ నేరుగా ప్రభుత్వ చలానా ఫీజును మాత్రమే లెక్కిస్తుంది.",
        hi: "दूसरा चरण: चुनें कि आप जमीन बेच रहे हैं या बच्चों के नाम कर रहे हैं। सही सरकारी चालान की रकम पारदर्शी रूप से तय होती है।",
        ta: "படி இரண்டு: நில மாற்றம் வகையை தேர்வு செய்யவும். கூடுதல் செலவின்றி முறையான அரசு கட்டணம் மட்டும் கணக்கிடப்படும்."
      },
      icon: <Smartphone className="w-8 h-8 text-amber-400" />,
      bgGradient: "from-slate-900 via-amber-950 to-slate-900",
      visualGraphic: (
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="bg-slate-900/90 border border-amber-500/40 p-4 rounded-xl text-left text-xs space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Transfer Type</span>
            <p className="font-bold text-white text-sm">Sale / Gift / Succession</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
              Govt Registration Fee: <span className="font-mono text-emerald-400 font-bold">100% Transparent</span>
            </div>
          </div>
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-xl text-left text-xs">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Aadhaar e-KYC</span>
            <p className="font-bold text-white">Biometric / OTP Instant</p>
            <span className="text-[10px] text-emerald-200">No stamp paper black-marketing</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      duration: 6,
      title: {
        en: "Step 3: AI Checks Documents & Boundaries",
        te: "మూడవ దశ: కృత్రిమ మేధ (AI) ద్వారా పత్రాల, సరిహద్దుల తనిఖీ",
        hi: "चरण 3: एआई द्वारा दस्तावेजों और सीमाओं की स्वचालित जांच",
        ta: "படி 3: AI தானியங்கி ஆவண மற்றும் எல்லை பிழை சரிபார்ப்பு"
      },
      sub: {
        en: "Our smart AI validator checks for name spellings, overlapping survey boundaries, and bank loans in 5 seconds. If there's an issue, it tells you how to fix it online.",
        te: "మన ఏఐ సాఫ్ట్‌వేర్ కేవలం 5 సెకన్లలో పేర్ల తేడాలు, సరిహద్దుల వివాదాలు, బ్యాంకు రుణాలు ఉన్నాయో లేదో స్వయంగా పరిశీలిస్తుంది.",
        hi: "हमारा एआई सिस्टम 5 सेकंड में स्पेलिंग, बैंक लोन और पड़ोसियों की सीमा की जांच करता है। गलती होने पर ऑनलाइन सुधारने का तरीका बताता है।",
        ta: "நமது AI நுட்பம் பெயர் பிழைகள், எல்லை தகராறுகள் மற்றும் கடன் விவரங்களை 5 வினாடிகளில் சரிபார்க்கிறது."
      },
      narration: {
        en: "Step three. The intelligent AI scanner validates names, boundaries, and documents. It prevents errors that previously took months to fix at revenue offices.",
        te: "మూడవ దశ: ఏఐ స్కానర్ మీ పత్రాలను, సరిహద్దులను సరిచూస్తుంది. తప్పులు లేకుండా నిర్ధారించి మీ సమయాన్ని కాపాడుతుంది.",
        hi: "तीसरा चरण: स्मार्ट एआई तुरंत जमीन की सीमाओं और दस्तावेजों की जांच करके आपको त्रुटिहीन स्कोर देता है।",
        ta: "படி மூன்று: AI தொழில்நுட்பம் ஆவணங்கள் மற்றும் எல்லைகளை துல்லியமாக சரிபார்த்து உறுதி செய்கிறது."
      },
      icon: <Sparkles className="w-8 h-8 text-teal-300" />,
      bgGradient: "from-slate-900 via-teal-950 to-slate-900",
      visualGraphic: (
        <div className="bg-slate-900/90 border border-teal-500/40 p-4 rounded-xl max-w-sm mx-auto text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-teal-300">AI Title Clarity Score:</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-black text-sm">98 / 100</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Pattadar Name verified</div>
            <div className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Zero Boundary Overlap with adjacent survey plots</div>
            <div className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> 30-Year Encumbrance Clear</div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      duration: 6,
      title: {
        en: "Step 4: Transparent Digital Verification (Surveyor ➔ VRO ➔ MRO)",
        te: "నాల్గవ దశ: సర్వేయర్, వి.ఆర్.ఓ, ఎం.ఆర్.ఓల పారదర్శక డిజిటల్ ఆమోదం",
        hi: "चरण 4: पारदर्शी डिजिटल सत्यापन (सर्वेयर ➔ वीआरओ ➔ एमआरओ)",
        ta: "படி 4: அதிகாரிகளின் நேரடி டிஜிட்டல் ஒப்புதல் (சர்வேயர் ➔ விஏஓ ➔ தாசில்தார்)"
      },
      sub: {
        en: "Track every step live on your phone. Mandal Surveyor confirms GIS coordinates, VRO verifies physical cultivation, and MRO applies digital signature seal without you standing in queues.",
        te: "మీ దరఖాస్తు ఎవరి వద్ద ఉందో మీ ఫోన్ లోనే లైవ్ గా చూడవచ్చు. సర్వేయర్, వి.ఆర్.ఓ, ఎం.ఆర్.ఓ లు ఆన్లైన్ లోనే డిజిటల్ సంతకం చేసి ఆమోదిస్తారు.",
        hi: "अपने फोन पर लाइव देखें कि फाइल किस अधिकारी के पास है। समय सीमा तय है, इसलिए कोई भी अधिकारी काम नहीं लटका सकता।",
        ta: "உங்கள் விண்ணப்பத்தின் நிலையை செல்போனிலேயே பார்க்கலாம். வரிசையில் நிற்காமல் அதிகாரிகள் டிஜிட்டல் கையொப்பமிடுவார்கள்."
      },
      narration: {
        en: "Step four. Track your file in real-time. Officers verify digitally within strict statutory timelines. You don't need to meet anyone in person.",
        te: "నాల్గవ దశ: మీ దరఖాస్తును లైవ్ లో ట్రాక్ చేయండి. అధికారులు నిబంధనల ప్రకారం వేగంగా ఆన్లైన్ లోనే ఆమోదిస్తారు. మీరు ఎవరినీ కలవనవసరం లేదు.",
        hi: "चौथा चरण: अपनी फाइल को लाइव ट्रैक करें। अधिकारियों को निर्धारित समय में डिजिटल हस्ताक्षर करना अनिवार्य है।",
        ta: "படி நான்கு: விண்ணப்ப நிலையை உடனுக்குடன் கண்காணிக்கலாம். குறிப்பிட்ட நாட்களுக்குள் அதிகாரிகள் ஒப்புதல் அளிப்பார்கள்."
      },
      icon: <Clock className="w-8 h-8 text-sky-400" />,
      bgGradient: "from-slate-900 via-indigo-950 to-slate-900",
      visualGraphic: (
        <div className="grid grid-cols-3 gap-2 py-3 text-center text-xs">
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-2.5 rounded-lg">
            <span className="text-[10px] text-emerald-300 font-bold block">1. Surveyor</span>
            <span className="text-white font-semibold">GIS Map Approved</span>
            <div className="text-[10px] text-emerald-400 mt-1">✓ Digital</div>
          </div>
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-2.5 rounded-lg">
            <span className="text-[10px] text-emerald-300 font-bold block">2. VRO</span>
            <span className="text-white font-semibold">Field Verified</span>
            <div className="text-[10px] text-emerald-400 mt-1">✓ No Objection</div>
          </div>
          <div className="bg-sky-950/80 border border-sky-500/50 p-2.5 rounded-lg">
            <span className="text-[10px] text-sky-300 font-bold block">3. MRO</span>
            <span className="text-white font-semibold">Digital Seal</span>
            <div className="text-[10px] text-sky-400 mt-1">✓ Final Order</div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      duration: 6,
      title: {
        en: "Step 5: Get Sealed e-Pattadar Passbook Directly on Phone!",
        te: "ఐదవ దశ: అధికారిక డిజిటల్ సీల్ తో కూడిన ఈ-పాస్ బుక్ మీ ఫోన్ లోనే అందుకోండి!",
        hi: "चरण 5: क्यूआर कोड युक्त प्रमाणित डिजिटल ई-पासबुक सीधे अपने फोन में पाएं!",
        ta: "படி 5: க்யூஆர் குறியீட்டுடன் கூடிய அதிகாரப்பூர்வ இ-பட்டாவை நேரடியாக பதிவிறக்குங்கள்!"
      },
      sub: {
        en: "Download your tamper-proof e-Pattadar Passbook and Mutation Certificate with encrypted QR code. Anyone can verify its legal authenticity instantly with a smartphone camera.",
        te: "ఎవ్వరూ మార్చలేని క్యూఆర్ కోడ్ తో కూడిన ఈ-పాస్ బుక్ డౌన్లోడ్ చేసుకోండి. దీనిని బ్యాంకు లోన్లు, రిజిస్ట్రేషన్ల కోసం ఎక్కడైనా వాడవచ్చు.",
        hi: "क्यूआर कोड वाली डिजिटल ई-पासबुक डाउनलोड करें। बैंक लोन और सरकारी योजनाओं के लिए यह 100% वैध और सुरक्षित है।",
        ta: "பாதுகாப்பான க்யூஆர் குறியீடு கொண்ட டிஜிட்டல் பட்டாவை பதிவிறக்குங்கள். அனைத்து அரசு மற்றும் வங்கி தேவைகளுக்கும் செல்லுபடியாகும்."
      },
      narration: {
        en: "Step five. Download your legally binding e-Pattadar Passbook. It contains a tamper-proof QR code that anyone can verify instantly. Fast, safe, and zero corruption.",
        te: "ఐదవ దశ: అధికారిక ఈ-పాస్ బుక్ డౌన్లోడ్ చేసుకోండి. సురక్షితమైన క్యూఆర్ కోడ్ తో లంచాలు లేకుండా మీ పని పూర్తవుతుంది.",
        hi: "पाँचवाँ चरण: अपनी प्रमाणित डिजिटल ई-पासबुक डाउनलोड करें। पारदर्शी, सुरक्षित और बिना किसी रिश्वत के आपकी जमीन ट्रांसफर!",
        ta: "படி ஐந்து: அதிகாரப்பூர்வ இ-பட்டாவை உடனே பதிவிறக்குங்கள். இடைத்தரகர்கள் இன்றி பாதுகாப்பான சேவை."
      },
      icon: <Award className="w-8 h-8 text-amber-400" />,
      bgGradient: "from-slate-900 via-amber-950 to-slate-900",
      visualGraphic: (
        <div className="bg-gradient-to-r from-amber-900/40 to-emerald-900/40 border-2 border-amber-400 p-4 rounded-xl max-w-sm mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
            <Award className="w-4 h-4" /> OFFICIAL GOVERNMENT e-PASSBOOK
          </div>
          <p className="text-xs text-amber-200 font-medium">Secured with 256-bit Hash & Verifiable QR Code</p>
          <div className="text-[11px] text-emerald-300 font-mono">TS-E-PB-2026-8819 • Mutation Complete</div>
        </div>
      )
    }
  ];

  const currentScene = scenes[currentSceneIdx];

  // Play narration when scene changes if not muted and modal is open
  useEffect(() => {
    if (isOpen && !isVoiceMuted) {
      speakText(currentScene.narration[language], language);
    }
    return () => {
      stopSpeaking();
    };
  }, [currentSceneIdx, language, isOpen, isVoiceMuted]);

  // Handle playback timer
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    const stepIncrement = (intervalMs / (currentScene.duration * 1000 / playbackSpeed)) * 100;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next scene or loop
          if (currentSceneIdx < scenes.length - 1) {
            setCurrentSceneIdx((curr) => curr + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentSceneIdx, playbackSpeed, currentScene.duration, scenes.length]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSceneIdx < scenes.length - 1) {
      setCurrentSceneIdx(currentSceneIdx + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(currentSceneIdx - 1);
      setProgress(0);
    }
  };

  const handleReplay = () => {
    setCurrentSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div 
      id="video-guide-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div 
        id="video-guide-modal-container"
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col text-white my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
              ▶
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Audio-Visual Guide for Citizens & Farmers
              </h3>
              <p className="text-[11px] text-amber-400 font-medium">
                Designed for illiterate & rural applicants • Listen & watch step-by-step
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher inside video player */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <select
                id="video-guide-language-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="en" className="bg-slate-900">English</option>
                <option value="te" className="bg-slate-900">తెలుగు</option>
                <option value="hi" className="bg-slate-900">हिंदी</option>
                <option value="ta" className="bg-slate-900">தமிழ்</option>
              </select>
            </div>

            <button
              id="close-video-guide-btn"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Stage / Visual Screen */}
        <div 
          id="video-stage-canvas"
          className={`relative px-6 py-8 min-h-[360px] flex flex-col justify-between bg-gradient-to-b ${currentScene.bgGradient} transition-colors duration-500`}
        >
          {/* Watermark / Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 text-amber-400 flex items-center gap-1.5">
              {currentScene.icon}
              <span>Scene {currentSceneIdx + 1} of {scenes.length}</span>
            </span>

            <button
              id="voice-toggle-video-btn"
              onClick={() => {
                if (!isVoiceMuted) {
                  stopSpeaking();
                  setIsVoiceMuted(true);
                } else {
                  setIsVoiceMuted(false);
                  speakText(currentScene.narration[language], language);
                }
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                isVoiceMuted 
                  ? 'bg-slate-800 text-slate-400' 
                  : 'bg-emerald-500 text-slate-950 shadow-md animate-pulse'
              }`}
            >
              {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isVoiceMuted ? "Audio Muted" : "Voice Narrating..."}</span>
            </button>
          </div>

          {/* Central Animated Graphic */}
          <div className="my-auto py-2">
            <h2 className="text-lg sm:text-2xl font-black text-center text-white mb-2 leading-tight">
              {currentScene.title[language]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 text-center max-w-xl mx-auto mb-4 font-medium leading-relaxed">
              {currentScene.sub[language]}
            </p>

            {currentScene.visualGraphic}
          </div>

          {/* Spoken subtitle / Audio guidance banner */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-center text-xs text-amber-200 italic shadow-inner">
            "{currentScene.narration[language]}"
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-3">
          {/* Step Timeline Pills */}
          <div className="grid grid-cols-6 gap-1.5">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                id={`timeline-step-${idx}`}
                onClick={() => {
                  setCurrentSceneIdx(idx);
                  setProgress(0);
                }}
                className={`h-2 rounded-full transition-all relative overflow-hidden ${
                  idx === currentSceneIdx 
                    ? 'bg-slate-700' 
                    : idx < currentSceneIdx 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-800'
                }`}
                title={`Scene ${idx + 1}`}
              >
                {idx === currentSceneIdx && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-amber-400 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="video-play-pause-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center font-bold transition shadow"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                id="video-prev-btn"
                onClick={handlePrev}
                disabled={currentSceneIdx === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="video-next-btn"
                onClick={handleNext}
                disabled={currentSceneIdx === scenes.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="video-replay-btn"
                onClick={handleReplay}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Replay from start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed dropdown */}
              <div className="text-xs text-slate-400 flex items-center gap-1 ml-2">
                <span>Speed:</span>
                <select
                  id="video-speed-select"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-slate-800 text-white rounded px-1.5 py-0.5 font-bold focus:outline-none"
                >
                  <option value={0.75}>0.75x (Slow)</option>
                  <option value={1}>1.0x (Normal)</option>
                  <option value={1.25}>1.25x (Fast)</option>
                </select>
              </div>
            </div>

            {/* Quick Action Button to Start Application */}
            <button
              id="video-start-applying-btn"
              onClick={() => {
                stopSpeaking();
                onClose();
                onStartApplication();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <span>I Understand, Start Application Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
