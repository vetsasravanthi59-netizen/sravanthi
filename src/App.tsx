/**
 * SLS - Digital Land Registration & Direct Ownership Transfer System
 * Final-Year Computer Science Engineering Capstone MVP Project
 * 100% Free & Open-Source Architecture (Vercel & AI Studio Compatible)
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VideoGuideModal } from './components/VideoGuideModal';
import { HomeDashboard } from './components/HomeDashboard';
import { Feature1TitleVerification } from './components/Feature1TitleVerification';
import { Feature2TransferWizard } from './components/Feature2TransferWizard';
import { Feature3AIValidator } from './components/Feature3AIValidator';
import { Feature4WorkflowTracker } from './components/Feature4WorkflowTracker';
import { Feature5CertificateRegistry } from './components/Feature5CertificateRegistry';
import { FeaturePayment } from './components/FeaturePayment';
import { 
  ActiveTab, 
  LandRecord, 
  Language, 
  TransferApplication 
} from './types';
import { 
  getStoredRecords, 
  saveStoredRecords, 
  getStoredApplications, 
  saveStoredApplications,
  STORAGE_KEYS 
} from './data/mockLandData';
import { translations, stopSpeaking } from './services/languageService';
import { ShieldCheck, Heart, Sparkles, Code2, Globe } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isOfficerMode, setIsOfficerMode] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoGuideOpen, setIsVideoGuideOpen] = useState<boolean>(false);

  // Data State
  const [records, setRecords] = useState<LandRecord[]>([]);
  const [applications, setApplications] = useState<TransferApplication[]>([]);
  const [selectedRecordForTransfer, setSelectedRecordForTransfer] = useState<LandRecord | null>(null);

  // Initialize data from LocalStorage
  useEffect(() => {
    const loadedRecords = getStoredRecords();
    const loadedApps = getStoredApplications();
    setRecords(loadedRecords);
    setApplications(loadedApps);

    // Load stored language preference
    try {
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      if (savedLang && ['en', 'te', 'hi', 'ta'].includes(savedLang)) {
        setCurrentLanguage(savedLang);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTabChange = (tab: ActiveTab) => {
    stopSpeaking();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForTransfer = (record: LandRecord) => {
    setSelectedRecordForTransfer(record);
    handleTabChange('apply_transfer');
  };

  const handleApplicationCreated = (newApp: TransferApplication) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    saveStoredApplications(updated);
    handleTabChange('track_workflow');
  };

  const handleUpdateApplication = (updatedApp: TransferApplication) => {
    const updatedList = applications.map((a) => (a.id === updatedApp.id ? updatedApp : a));
    setApplications(updatedList);
    saveStoredApplications(updatedList);
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Universal Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isOfficerMode={isOfficerMode}
        onToggleOfficerMode={() => setIsOfficerMode(!isOfficerMode)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => {
          if (!isAudioMuted) stopSpeaking();
          setIsAudioMuted(!isAudioMuted);
        }}
        onOpenVideoGuide={() => setIsVideoGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'home' && (
          <HomeDashboard
            onNavigate={handleTabChange}
            onOpenVideoGuide={() => setIsVideoGuideOpen(true)}
            applications={applications}
            records={records}
            language={currentLanguage}
          />
        )}

        {currentTab === 'verify_title' && (
          <Feature1TitleVerification
            records={records}
            onSelectForTransfer={handleSelectForTransfer}
            language={currentLanguage}
          />
        )}

        {currentTab === 'apply_transfer' && (
          <Feature2TransferWizard
            records={records}
            selectedInitialRecord={selectedRecordForTransfer}
            onApplicationCreated={handleApplicationCreated}
            language={currentLanguage}
          />
        )}

        {currentTab === 'ai_validator' && (
          <Feature3AIValidator
            records={records}
            language={currentLanguage}
          />
        )}

        {currentTab === 'track_workflow' && (
          <Feature4WorkflowTracker
            applications={applications}
            onUpdateApplication={handleUpdateApplication}
            isOfficerMode={isOfficerMode}
            language={currentLanguage}
            onNavigateToPayments={() => handleTabChange('payments')}
          />
        )}

        {currentTab === 'certificates' && (
          <Feature5CertificateRegistry
            applications={applications}
            language={currentLanguage}
          />
        )}

        {currentTab === 'payments' && (
          <FeaturePayment
            applications={applications}
            onUpdateApplication={handleUpdateApplication}
            language={currentLanguage}
            onNavigateToWorkflow={(appId) => {
              handleTabChange('track_workflow');
            }}
          />
        )}
      </main>

      {/* Audio-Visual Video Guide Modal for Uneducated Citizens */}
      <VideoGuideModal
        isOpen={isVideoGuideOpen}
        onClose={() => setIsVideoGuideOpen(false)}
        language={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onStartApplication={() => handleTabChange('apply_transfer')}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>SLS • Digital Land Registration Architecture</span>
              </div>
              <p className="text-slate-400 text-xs mt-1 max-w-xl">
                A low-cost, time-efficient land registration system that helps people transfer land ownership to the correct person without repeatedly visiting surveyors, MROs, and VROs.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-3 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                100% Free & Open-Source • Zero Paid APIs • Vercel Ready
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-slate-500">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Final-Year Computer Science Engineering Capstone Project</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => setIsVideoGuideOpen(true)} className="hover:text-emerald-400 transition">
                Audio-Visual Guide
              </button>
              <span>•</span>
              <button onClick={() => handleTabChange('verify_title')} className="hover:text-emerald-400 transition">
                Cadastral Survey Search
              </button>
              <span>•</span>
              <button onClick={() => handleTabChange('ai_validator')} className="hover:text-emerald-400 transition">
                AI Validator
              </button>
              <span>•</span>
              <button onClick={() => handleTabChange('certificates')} className="hover:text-emerald-400 transition">
                e-Passbook Registry
              </button>
              <span>•</span>
              <button onClick={() => handleTabChange('payments')} className="hover:text-amber-400 transition font-semibold text-amber-300">
                e-Challan Payments
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
