export type Language = 'en' | 'te' | 'hi' | 'ta';

export interface LandRecord {
  id: string;
  surveyNumber: string;
  subDivision: string;
  passbookNumber: string;
  district: string;
  mandal: string;
  village: string;
  pattadarName: string;
  fatherOrHusbandName: string;
  aadhaarMasked: string;
  extentAcres: number;
  extentGuntas: number; // 40 guntas = 1 acre
  landClassification: 'Dry Land (Kushki)' | 'Wet Land (Tari)' | 'Commercial/Conversion' | 'Garden';
  marketValuationPerAcre: number;
  totalMarketValue: number;
  encumbranceStatus: 'Clear Title (No Dues)' | 'Bank Mortgage (SBI)' | 'Court Injunction / Stay' | 'Disputed Boundary';
  isGovtOrForestLand: boolean;
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  coordinates: { x: number; y: number }[];
  lastRegisteredDate: string;
}

export type TransferType = 'sale' | 'gift' | 'inheritance' | 'partition';

export interface TransferApplication {
  id: string;
  applicationNumber: string;
  submissionDate: string;
  transferType: TransferType;
  surveyNumber: string;
  village: string;
  mandal: string;
  district: string;
  extentTransferring: { acres: number; guntas: number };
  
  // Parties
  seller: {
    name: string;
    fatherName: string;
    aadhaarMasked: string;
    phone: string;
    passbookNo: string;
  };
  buyer: {
    name: string;
    fatherName: string;
    aadhaarMasked: string;
    phone: string;
    relationship?: string;
  };

  // Fees
  valuationAmount: number;
  stampDutyFee: number;
  registrationFee: number;
  mutationFee: number;
  totalFee: number;
  paymentStatus: 'Paid (Digital Challan)' | 'Pending';
  challanReference?: string;

  // Documents
  documents: {
    pattadarPassbook: boolean;
    saleOrGiftDeed: boolean;
    encumbranceCertificate: boolean;
    aadhaarKyc: boolean;
    panOrForm60: boolean;
  };

  // AI Validation Result
  aiValidation?: AIValidationResult;

  // Workflow Stages
  currentStage: 'submitted' | 'surveyor_review' | 'vro_verification' | 'mro_approval' | 'completed';
  stageHistory: {
    stage: string;
    officerRole: 'Citizen' | 'Mandal Surveyor' | 'Village Revenue Officer (VRO)' | 'Mandal Revenue Officer (MRO)';
    officerName: string;
    status: 'pending' | 'in_progress' | 'approved' | 'rejected';
    timestamp: string;
    remarks: string;
  }[];

  digitalCertificateHash?: string;
  ePassbookNumber?: string;
}

export interface AIValidationResult {
  clarityScore: number; // 0 - 100
  overallStatus: 'APPROVED_CLEAR' | 'NEEDS_ONLINE_RECTIFICATION' | 'HIGH_RISK_DISPUTED';
  summary: string;
  checks: {
    name: string;
    status: 'pass' | 'warning' | 'fail';
    details: string;
  }[];
  boundaryAnalysis: {
    claimedExtent: string;
    registeredExtent: string;
    isOverlapping: boolean;
    adjacentSurveyMatches: boolean;
    notes: string;
  };
  recommendedActions: string[];
}

export interface PaymentReceipt {
  id: string;
  challanNumber: string; // e.g. TS-ECH-2026-88192
  cinNumber: string; // Challan Identification Number (e.g. SBIN260907482910)
  bankReferenceNumber: string; // e.g. TXN99823104
  applicationNumber: string;
  surveyNumber: string;
  district: string;
  mandal: string;
  village: string;
  payerName: string;
  payerPhone: string;
  payerAadhaarMasked?: string;
  paymentMode: 'UPI' | 'Net Banking' | 'Debit/Credit Card' | 'Cyber Treasury e-GRAS';
  serviceType: string;
  headOfAccounts: {
    headCode: string;
    description: string;
    amount: number;
  }[];
  totalAmount: number;
  transactionDate: string;
  paymentStatus: 'SUCCESS' | 'PENDING' | 'FAILED';
  treasuryDepartment: string;
  ddoCode: string;
}

export type ActiveTab = 'home' | 'video_guide' | 'verify_title' | 'apply_transfer' | 'ai_validator' | 'track_workflow' | 'certificates' | 'payments';
