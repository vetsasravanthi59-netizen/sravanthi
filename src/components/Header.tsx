import React from 'react';
import { 
  Landmark, 
  Languages, 
  Volume2, 
  VolumeX, 
  PlayCircle, 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  FileSearch, 
  Clock,
  Receipt
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { translations, speakText, stopSpeaking } from '../services/languageService';

interface HeaderProps {
  currentTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isOfficerMode: boolean;
  onToggleOfficerMode: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenVideoGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  currentLanguage,
  onLanguageChange,
  isOfficerMode,
  onToggleOfficerMode,
  isAudioMuted,
  onToggleAudio,
  onOpenVideoGuide
}) => {
  const t = translations[currentLanguage];

  const handleSpeakNav = (text: string) => {
    if (!isAudioMuted) {
      speakText(text, currentLanguage);
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      {/* Top Banner with Gov Seal styling & Accessibility */}
      <div className="bg-emerald-800 px-4 py-1.5 text-xs text-emerald-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">
            Government of India & State Revenue Department Architecture
          </span>
          <span className="hidden sm:inline text-emerald-300">|</span>
          <span className="hidden sm:inline text-emerald-200">
            {t.freeOpenSourceNotice}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio narration toggle for illiterate / rural citizens */}
          <button
            id="audio-narrator-toggle-btn"
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition ${
              isAudioMuted 
                ? 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-900' 
                : 'bg-emerald-500 text-slate-950 font-semibold shadow-sm animate-pulse'
            }`}
            title={isAudioMuted ? "Enable Voice Help" : "Voice Help is Active"}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isAudioMuted ? "Voice: OFF" : "Voice: ON (Read Aloud)"}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-900/50 px-2 py-0.5 rounded border border-emerald-700/60">
            <Languages className="w-3.5 h-3.5 text-emerald-300" />
            <select
              id="language-select-dropdown"
              value={currentLanguage}
              onChange={(e) => {
                const lang = e.target.value as Language;
                onLanguageChange(lang);
                stopSpeaking();
              }}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="te" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
              <option value="ta" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Role Toggle: Citizen vs Revenue Officer (MRO/VRO/Surveyor) */}
          <button
            id="toggle-officer-mode-btn"
            onClick={onToggleOfficerMode}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition ${
              isOfficerMode 
                ? 'bg-amber-400 text-slate-950 shadow' 
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isOfficerMode ? <ShieldCheck className="w-3.5 h-3.5 text-slate-950" /> : <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOfficerMode ? t.officerMode : t.citizenMode}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Name */}
        <div 
          id="app-brand-logo"
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-950/40 text-white group-hover:scale-105 transition-transform">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition">
                {t.appName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                DIRECT REGISTRY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Video Guide Prompt Button (Especially highlighted for uneducated citizens) */}
        <button
          id="open-video-guide-header-btn"
          onClick={() => {
            onOpenVideoGuide();
            handleSpeakNav(t.videoGuideTitle);
          }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-950/30 hover:scale-[1.02] active:scale-[0.98] transition"
        >
          <PlayCircle className="w-5 h-5 text-slate-950 fill-amber-300" />
          <div className="text-left leading-tight">
            <div className="text-xs font-extrabold uppercase tracking-wider">{t.watchVideoGuide}</div>
            <div className="text-[10px] font-medium opacity-90">{t.forUneducatedHelp}</div>
          </div>
        </button>

        {/* Navigation Tabs for All 5 Features */}
        <nav className="w-full lg:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs sm:text-sm font-semibold">
          <button
            id="nav-tab-home"
            onClick={() => onTabChange('home')}
            className={`px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'home'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.home}
          </button>

          <button
            id="nav-tab-verify-title"
            onClick={() => {
              onTabChange('verify_title');
              handleSpeakNav(t.verifyTitle);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'verify_title'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{t.verifyTitle}</span>
          </button>

          <button
            id="nav-tab-apply-transfer"
            onClick={() => {
              onTabChange('apply_transfer');
              handleSpeakNav(t.applyTransfer);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'apply_transfer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t.applyTransfer}</span>
          </button>

          <button
            id="nav-tab-ai-validator"
            onClick={() => {
              onTabChange('ai_validator');
              handleSpeakNav(t.aiValidator);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'ai_validator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSearch className="w-4 h-4 text-teal-400" />
            <span>{t.aiValidator}</span>
          </button>

          <button
            id="nav-tab-track-workflow"
            onClick={() => {
              onTabChange('track_workflow');
              handleSpeakNav(t.trackWorkflow);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'track_workflow'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-sky-400" />
            <span>{t.trackWorkflow}</span>
          </button>

          <button
            id="nav-tab-certificates"
            onClick={() => {
              onTabChange('certificates');
              handleSpeakNav(t.certificates);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'certificates'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t.certificates}</span>
          </button>

          <button
            id="nav-tab-payments"
            onClick={() => {
              onTabChange('payments');
              handleSpeakNav(t.payments);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap ${
              currentTab === 'payments'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-amber-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Receipt className="w-4 h-4 text-amber-400" />
            <span>{t.payments}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
