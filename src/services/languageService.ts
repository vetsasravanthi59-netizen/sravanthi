import { Language } from '../types';

export interface TranslationDict {
  appName: string;
  tagline: string;
  watchVideoGuide: string;
  videoGuideTitle: string;
  videoGuideSub: string;
  languageSelect: string;
  home: string;
  verifyTitle: string;
  applyTransfer: string;
  aiValidator: string;
  trackWorkflow: string;
  certificates: string;
  forUneducatedHelp: string;
  listenAudio: string;
  stopAudio: string;
  noVisitsNeeded: string;
  timeSavedStat: string;
  moneySavedStat: string;
  transparentFeesStat: string;
  searchSurveyPlaceholder: string;
  searchButton: string;
  pattadarName: string;
  surveyNumber: string;
  extent: string;
  marketValue: string;
  ecStatus: string;
  startTransfer: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  officerMode: string;
  citizenMode: string;
  freeOpenSourceNotice: string;
  payments: string;
  payChallan: string;
  challanNumber: string;
  headOfAccount: string;
  paymentMethod: string;
  amountToPay: string;
  instantReceipt: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "SLS",
    tagline: "Direct Digital Land Registration & Transfer Portal",
    watchVideoGuide: "How to Apply? (Audio-Visual Guide)",
    videoGuideTitle: "Learn How to Transfer Land Without Middlemen",
    videoGuideSub: "Special visual and voice guide designed for easy understanding by rural citizens and farmers",
    languageSelect: "Language",
    home: "Home",
    verifyTitle: "1. Land Title & Survey Check",
    applyTransfer: "2. Ownership Transfer Application",
    aiValidator: "3. AI Discrepancy Validator",
    trackWorkflow: "4. Live Workflow Tracking",
    certificates: "5. e-Passbook & Verification",
    forUneducatedHelp: "Audio Assistance Available",
    listenAudio: "Listen to Voice Explanation",
    stopAudio: "Stop Voice",
    noVisitsNeeded: "Zero Repeat Office Visits",
    timeSavedStat: "Average 4 days vs 90 days earlier",
    moneySavedStat: "100% Zero Middleman Bribe / Brokerage Cut",
    transparentFeesStat: "Direct Govt Treasury Online Challan",
    searchSurveyPlaceholder: "Enter Survey Number (e.g., 142/2A or 88/1B)",
    searchButton: "Verify Land Record",
    pattadarName: "Current Land Owner (Pattadar)",
    surveyNumber: "Survey Number",
    extent: "Land Extent",
    marketValue: "Govt Market Value",
    ecStatus: "Encumbrance (EC) Status",
    startTransfer: "Initiate Ownership Transfer",
    step1: "Search & Verify Land Survey No.",
    step2: "Fill Buyer & Seller Details",
    step3: "AI Discrepancy & Boundary Check",
    step4: "Digital Verification by Surveyor, VRO & MRO",
    step5: "Download Sealed Digital e-Passbook",
    officerMode: "Revenue Officer View",
    citizenMode: "Citizen / Farmer View",
    freeOpenSourceNotice: "100% Free & Open-Source Community Portal • No Paid APIs • Open Access",
    payments: "e-Challan & Payments",
    payChallan: "Pay Government Treasury e-Challan",
    challanNumber: "Challan / Reference Number",
    headOfAccount: "Govt Treasury Head of Account",
    paymentMethod: "Payment Gateway Method",
    amountToPay: "Total Government Treasury Payable",
    instantReceipt: "Download Cyber Treasury Form TR-6 Receipt"
  },
  te: {
    appName: "SLS",
    tagline: "ప్రత్యక్ష డిజిటల్ భూమి రిజిస్ట్రేషన్ & యాజమాన్య బదిలీ వేదిక",
    watchVideoGuide: "దరఖాస్తు ఎలా చేయాలి? (వీడియో & ఆడియో గైడ్)",
    videoGuideTitle: "దళారులు, ఆఫీసుల చుట్టూ తిరగకుండా భూమి బదిలీ నేర్చుకోండి",
    videoGuideSub: "రైతులు మరియు గ్రామీణ ప్రజల సులభమైన అవగాహన కోసం ప్రత్యేక వీడియో మరియు వాయిస్ వివరణ",
    languageSelect: "భాష",
    home: "ముఖ్యాంశం",
    verifyTitle: "1. భూమి సర్వే & హక్కుల తనిఖీ",
    applyTransfer: "2. యాజమాన్య బదిలీ దరఖాస్తు",
    aiValidator: "3. ఏఐ దస్తావేజు పరిశీలన",
    trackWorkflow: "4. దరఖాస్తు స్థితి పరిశీలన",
    certificates: "5. ఈ-పాస్ బుక్ & ధృవీకరణ",
    forUneducatedHelp: "ఆడియో సహాయం అందుబాటులో ఉంది",
    listenAudio: "వాయిస్ వివరణ వినండి",
    stopAudio: "వాయిస్ ఆపండి",
    noVisitsNeeded: "ఆఫీసుల చుట్టూ తిరగాల్సిన అవసరం లేదు",
    timeSavedStat: "గతంలో 90 రోజులు, ఇప్పుడు కేవలం 4 రోజుల్లో",
    moneySavedStat: "లంచాలు లేవు, దళారుల దోపిడీ శూన్యం",
    transparentFeesStat: "నేరుగా ప్రభుత్వ చలానా మాత్రమే",
    searchSurveyPlaceholder: "సర్వే నంబర్ నమోదు చేయండి (ఉదా: 142/2A లేదా 88/1B)",
    searchButton: "భూమి రికార్డు తనిఖీ చేయండి",
    pattadarName: "ప్రస్తుత యజమాని (పట్టాదారుడు)",
    surveyNumber: "సర్వే నంబరు",
    extent: "భూమి విస్తీర్ణం",
    marketValue: "ప్రభుత్వ మార్కెట్ విలువ",
    ecStatus: "ఈసీ (ఎన్‌కంబరెన్స్) వివరాలు",
    startTransfer: "యాజమాన్య బదిలీ ప్రారంభించండి",
    step1: "సర్వే నంబరుతో భూమి రికార్డు వెతకండి",
    step2: "కొనుగోలుదారు, అమ్మకందారు వివరాలు నమోదు చేయండి",
    step3: "ఏఐ ద్వారా సరిహద్దుల, పత్రాల తనిఖీ చేయండి",
    step4: "సర్వేయర్, వి.ఆర్.ఓ, ఎం.ఆర్.ఓ డిజిటల్ ఆమోదం",
    step5: "డిజిటల్ సీల్ తో కూడిన ఈ-పాస్ బుక్ డౌన్లోడ్ చేసుకోండి",
    officerMode: "రెవెన్యూ అధికారి లాగిన్",
    citizenMode: "రైతు / పౌరుల లాగిన్",
    freeOpenSourceNotice: "100% ఉచిత & ఓపెన్ సోర్స్ పౌర సేవ • ఎలాంటి రుసుములు లేవు",
    payments: "ఈ-చలానా & చెల్లింపులు",
    payChallan: "ప్రభుత్వ ట్రెజరీ ఈ-చలానా చెల్లించండి",
    challanNumber: "చలానా / రిఫరెన్స్ నంబర్",
    headOfAccount: "ప్రభుత్వ ఖాతా వివరాలు (Head of Account)",
    paymentMethod: "చెల్లింపు విధానం (UPI / నెట్ బ్యాంకింగ్)",
    amountToPay: "మొత్తం చెల్లించవలసిన ప్రభుత్వ ఫీజు",
    instantReceipt: "డిజిటల్ ట్రెజరీ రశీదు డౌన్లోడ్ చేయండి"
  },
  hi: {
    appName: "SLS",
    tagline: "प्रत्यक्ष डिजिटल भूमि पंजीकरण एवं स्वामित्व हस्तांतरण पोर्टल",
    watchVideoGuide: "आवेदन कैसे करें? (वीडियो एवं ऑडियो गाइड)",
    videoGuideTitle: "बिना दलालों और बार-बार दफ्तरों के चक्कर काटे जमीन ट्रांसफर करें",
    videoGuideSub: "ग्रामीण नागरिकों और किसान भाइयों की सुगमता के लिए सरल ऑडियो-वीडियो मार्गदर्शिका",
    languageSelect: "भाषा",
    home: "मुख्य पृष्ठ",
    verifyTitle: "1. भूमि खाता एवं सर्वे सत्यापन",
    applyTransfer: "2. स्वामित्व हस्तांतरण आवेदन",
    aiValidator: "3. एआई दस्तावेज व सीमा सत्यापन",
    trackWorkflow: "4. रियल-टाइम आवेदन स्थिति",
    certificates: "5. ई-पट्टा पासबुक एवं सत्यापन",
    forUneducatedHelp: "ध्वनि (ऑडियो) सहायता उपलब्ध",
    listenAudio: "आवाज में विवरण सुनें",
    stopAudio: "आवाज रोकें",
    noVisitsNeeded: "दफ्तरों के चक्कर काटने से मुक्ति",
    timeSavedStat: "पहले 90 दिन, अब मात्र 4 से 7 दिनों में",
    moneySavedStat: "दलाली और घूसखोरी से 100% छुटकारा",
    transparentFeesStat: "सीधे सरकारी चालान द्वारा पारदर्शी भुगतान",
    searchSurveyPlaceholder: "खसरा / सर्वे नंबर दर्ज करें (उदा: 142/2A या 88/1B)",
    searchButton: "रिकॉर्ड खोजें",
    pattadarName: "वर्तमान पट्टेदार (भूमि स्वामी)",
    surveyNumber: "खसरा / सर्वे नंबर",
    extent: "भूमि का क्षेत्रफल",
    marketValue: "सरकारी बाजार मूल्य",
    ecStatus: "भारमुक्त स्थिति (EC)",
    startTransfer: "स्वामित्व हस्तांतरण शुरू करें",
    step1: "सर्वे नंबर से जमीन की जांच करें",
    step2: "क्रेता और विक्रेता का विवरण भरें",
    step3: "एआई द्वारा त्रुटि व सीमा जांच कराएं",
    step4: "सर्वेयर, वीआरओ एवं एमआरओ से डिजिटल मंजूरी",
    step5: "डिजिटल हस्ताक्षरित ई-पासबुक प्राप्त करें",
    officerMode: "राजस्व अधिकारी व्यू",
    citizenMode: "नागरिक / किसान व्यू",
    freeOpenSourceNotice: "100% निःशुल्क और ओपन-सोर्स पोर्टल • कोई शुल्क नहीं",
    payments: "ई-चालान एवं भुगतान",
    payChallan: "सरकारी राजकोष ई-चालान भुगतान करें",
    challanNumber: "चालान / संदर्भ संख्या",
    headOfAccount: "सरकारी लेखा शीर्ष (Head of Account)",
    paymentMethod: "भुगतान माध्यम (UPI / नेट बैंकिंग / कार्ड)",
    amountToPay: "कुल देय सरकारी शुल्क",
    instantReceipt: "डिजिटल राजकोष रसीद (Form TR-6) डाउनलोड करें"
  },
  ta: {
    appName: "SLS",
    tagline: "நேரடி டிஜிட்டல் நிலப் பதிவு மற்றும் உரிமை மாற்ற தளம்",
    watchVideoGuide: "விண்ணப்பிப்பது எப்படி? (வீடியோ & ஆடியோ வழிகாட்டி)",
    videoGuideTitle: "தரகர்கள் இன்றி நேரடியாக நிலப் பட்டா மாற்றத்தை கற்றுக்கொள்ளுங்கள்",
    videoGuideSub: "கிராமப்புற மக்கள் மற்றும் விவசாயிகளின் எளிதான புரிதலுக்கான எளிய வழிகாட்டி",
    languageSelect: "மொழி",
    home: "முகப்பு",
    verifyTitle: "1. நில உரிமை & சர்வே சரிபார்ப்பு",
    applyTransfer: "2. உரிமை மாற்ற விண்ணப்பம்",
    aiValidator: "3. AI ஆவண பிழை சரிபார்ப்பு",
    trackWorkflow: "4. நேரலை நிலை கண்காணிப்பு",
    certificates: "5. இ-பட்டா & சரிபார்ப்பு",
    forUneducatedHelp: "ஆடியோ உதவி உள்ளது",
    listenAudio: "குரல் விளக்கத்தைக் கேட்கவும்",
    stopAudio: "குரலை நிறுத்தவும்",
    noVisitsNeeded: "அலுவலகங்களுக்கு அலைய வேண்டியதில்லை",
    timeSavedStat: "முன்பு 90 நாட்கள், இப்போது வெறும் 4 நாட்களில்",
    moneySavedStat: "தரகர் கட்டணங்கள் முற்றிலும் இல்லை",
    transparentFeesStat: "நேரடி அரசு சலான் கட்டணம் மட்டுமே",
    searchSurveyPlaceholder: "சர்வே எண்ணை உள்ளிடவும் (எ.கா: 142/2A)",
    searchButton: "நில ஆவணத்தை சரிபார்க்கவும்",
    pattadarName: "தற்போதைய பட்டாதாரர்",
    surveyNumber: "சர்வே எண்",
    extent: "நில பரப்பளவு",
    marketValue: "அரசு வழிகாட்டி மதிப்பு",
    ecStatus: "வில்லங்க சான்று நிலை",
    startTransfer: "உரிமை மாற்றத்தை தொடங்குங்கள்",
    step1: "சர்வே எண்ணை சரிபார்க்கவும்",
    step2: "வாங்குபவர் விவரங்களை உள்ளிடவும்",
    step3: "AI மூலம் எல்லை பிழைகளை கண்டறியவும்",
    step4: "அதிகாரிகளின் டிஜிட்டல் ஒப்புதல்",
    step5: "டிஜிட்டல் இ-பட்டா பதிவிறக்கம் செய்யவும்",
    officerMode: "அதிகாரி பக்கம்",
    citizenMode: "விவசாயி / பொது மக்கள் பக்கம்",
    freeOpenSourceNotice: "100% இலவச மற்றும் திறந்த மூல சேவை",
    payments: "மின்-சலான் & கட்டணம்",
    payChallan: "அரசு கருவூல மின்-சலான் செலுத்துங்கள்",
    challanNumber: "சலான் / குறிப்பு எண்",
    headOfAccount: "அரசு கணக்கு தலைப்பு (Head of Account)",
    paymentMethod: "கட்டண முறை (UPI / நெட் பேங்கிங்)",
    amountToPay: "செலுத்த வேண்டிய அரசு கட்டணம்",
    instantReceipt: "மின்-கருவூல ரசீது (Form TR-6) பெறவும்"
  }
};

/**
 * Text-to-speech helper using the native browser SpeechSynthesis API.
 * 100% Free, zero external API keys, operates entirely offline in browser!
 */
export function speakText(text: string, language: Language, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  window.speechSynthesis.cancel(); // cancel ongoing speech

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map languages
  const langCodeMap: Record<Language, string> = {
    en: 'en-IN',
    te: 'te-IN',
    hi: 'hi-IN',
    ta: 'ta-IN'
  };

  utterance.lang = langCodeMap[language] || 'en-IN';
  utterance.rate = 0.9; // Slightly slower for clarity for rural citizens
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error/interrupted', e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
