import { LandRecord, TransferApplication, PaymentReceipt } from '../types';

export const INITIAL_LAND_RECORDS: LandRecord[] = [
  {
    id: 'LR-TEL-001',
    surveyNumber: '142/2A',
    subDivision: '2A',
    passbookNumber: 'T2814008921',
    district: 'Ranga Reddy',
    mandal: 'Ibrahimpatnam',
    village: 'Polampalli',
    pattadarName: 'Kondaiah Venkata Ramana Rao',
    fatherOrHusbandName: 'Late Kondaiah Satyanarayana',
    aadhaarMasked: 'XXXX-XXXX-4829',
    extentAcres: 2,
    extentGuntas: 20, // 2 Acres 20 Guntas
    landClassification: 'Dry Land (Kushki)',
    marketValuationPerAcre: 1800000, // ₹18,00,000 / Acre
    totalMarketValue: 4500000,
    encumbranceStatus: 'Clear Title (No Dues)',
    isGovtOrForestLand: false,
    boundaries: {
      north: 'Survey 141 (G. Venkatesh agricultural land)',
      south: 'Village Zilla Parishad 24ft Cart Track',
      east: 'Survey 142/2B (N. Lakshmamma land)',
      west: 'Irrigation Canal (Polampalli Cheruvu distributary)'
    },
    coordinates: [
      { x: 30, y: 35 },
      { x: 190, y: 40 },
      { x: 185, y: 175 },
      { x: 25, y: 165 }
    ],
    lastRegisteredDate: '2018-04-12'
  },
  {
    id: 'LR-TEL-002',
    surveyNumber: '88/1B',
    subDivision: '1B',
    passbookNumber: 'T1902004419',
    district: 'Medchal-Malkajgiri',
    mandal: 'Ghatkesar',
    village: 'Edulabad',
    pattadarName: 'Bala Swamy Mudiraj',
    fatherOrHusbandName: 'M. Sayanna',
    aadhaarMasked: 'XXXX-XXXX-9104',
    extentAcres: 1,
    extentGuntas: 15, // 1 Acre 15 Guntas
    landClassification: 'Wet Land (Tari)',
    marketValuationPerAcre: 2800000,
    totalMarketValue: 3850000,
    encumbranceStatus: 'Clear Title (No Dues)',
    isGovtOrForestLand: false,
    boundaries: {
      north: 'Survey 87 (Gram Kantham border)',
      south: 'Survey 88/2 (Agricultural field)',
      east: 'Main Panchayat Tar Road',
      west: 'Survey 88/1A (Bala Swamy brother land)'
    },
    coordinates: [
      { x: 45, y: 25 },
      { x: 175, y: 30 },
      { x: 160, y: 150 },
      { x: 35, y: 140 }
    ],
    lastRegisteredDate: '2020-11-20'
  },
  {
    id: 'LR-TEL-003',
    surveyNumber: '204/3',
    subDivision: '3',
    passbookNumber: 'T3301007712',
    district: 'Yadadri Bhuvanagiri',
    mandal: 'Choutuppal',
    village: 'Lingojiguda',
    pattadarName: 'Mallamma Pedda Reddy',
    fatherOrHusbandName: 'W/o P. Narayana Reddy',
    aadhaarMasked: 'XXXX-XXXX-6123',
    extentAcres: 3,
    extentGuntas: 0,
    landClassification: 'Dry Land (Kushki)',
    marketValuationPerAcre: 1500000,
    totalMarketValue: 4500000,
    encumbranceStatus: 'Bank Mortgage (SBI)',
    isGovtOrForestLand: false,
    boundaries: {
      north: 'Survey 203 (Rocky Poramboke / Open ridge)',
      south: 'National Highway 65 Feeder road',
      east: 'Survey 204/4 (K. Anjaiah field)',
      west: 'Survey 204/2 (P. Mohan Reddy field)'
    },
    coordinates: [
      { x: 20, y: 30 },
      { x: 210, y: 25 },
      { x: 200, y: 180 },
      { x: 30, y: 190 }
    ],
    lastRegisteredDate: '2016-08-04'
  },
  {
    id: 'LR-TEL-004',
    surveyNumber: '55/A',
    subDivision: 'A',
    passbookNumber: 'T1104001928',
    district: 'Suryapet',
    mandal: 'Kodad',
    village: 'Kompalli',
    pattadarName: 'Shaik Meera Saheb',
    fatherOrHusbandName: 'Shaik Khaja Hussain',
    aadhaarMasked: 'XXXX-XXXX-3341',
    extentAcres: 0,
    extentGuntas: 30, // 30 Guntas
    landClassification: 'Commercial/Conversion',
    marketValuationPerAcre: 6000000,
    totalMarketValue: 4500000,
    encumbranceStatus: 'Court Injunction / Stay',
    isGovtOrForestLand: false,
    boundaries: {
      north: 'Survey 54 (Commercial Godown)',
      south: 'Municipal 40ft bypass road',
      east: 'Survey 55/B (Disputed partition)',
      west: 'Drainage Channel'
    },
    coordinates: [
      { x: 50, y: 40 },
      { x: 180, y: 45 },
      { x: 170, y: 160 },
      { x: 40, y: 155 }
    ],
    lastRegisteredDate: '2014-02-18'
  }
];

export const INITIAL_APPLICATIONS: TransferApplication[] = [
  {
    id: 'APP-2026-0891',
    applicationNumber: 'SLS-MUT-2026-0891',
    submissionDate: '2026-09-02',
    transferType: 'sale',
    surveyNumber: '142/2A',
    village: 'Polampalli',
    mandal: 'Ibrahimpatnam',
    district: 'Ranga Reddy',
    extentTransferring: { acres: 1, guntas: 10 },
    seller: {
      name: 'Kondaiah Venkata Ramana Rao',
      fatherName: 'Late K. Satyanarayana',
      aadhaarMasked: 'XXXX-XXXX-4829',
      phone: '98480xxxxx',
      passbookNo: 'T2814008921'
    },
    buyer: {
      name: 'Gaddam Srinivas Reddy',
      fatherName: 'G. Malla Reddy',
      aadhaarMasked: 'XXXX-XXXX-7721',
      phone: '99490xxxxx',
      relationship: 'Purchaser (Registered Sale Deed)'
    },
    valuationAmount: 2250000,
    stampDutyFee: 123750, // 5.5%
    registrationFee: 11250, // 0.5%
    mutationFee: 500,
    totalFee: 135500,
    paymentStatus: 'Paid (Digital Challan)',
    challanReference: 'CHL-TREASURY-998231',
    documents: {
      pattadarPassbook: true,
      saleOrGiftDeed: true,
      encumbranceCertificate: true,
      aadhaarKyc: true,
      panOrForm60: true
    },
    aiValidation: {
      clarityScore: 98,
      overallStatus: 'APPROVED_CLEAR',
      summary: 'All digital boundaries, seller passbook, and Aadhaar biometric hashes verified without discrepancy.',
      checks: [
        { name: 'Pattadar Name Match', status: 'pass', details: 'Exact match between Land Registry & Sale Deed' },
        { name: 'Encumbrance Verification', status: 'pass', details: 'Zero active mortgages or court stays in 30-year EC' },
        { name: 'Boundary Overlap Check', status: 'pass', details: 'Survey 142/2A has clear cart-track and canal markers, zero neighbour overlap' },
        { name: 'Govt / Forest Land Proximity', status: 'pass', details: 'Not classified under Section 22A prohibited lands' }
      ],
      boundaryAnalysis: {
        claimedExtent: '1 Acre 10 Guntas',
        registeredExtent: '2 Acres 20 Guntas total (sub-division safe)',
        isOverlapping: false,
        adjacentSurveyMatches: true,
        notes: 'Cartographic GIS sub-division polygon mapped automatically'
      },
      recommendedActions: [
        'Proceed directly to automated VRO verification without visiting MRO office.',
        'Digital mutation seal will be auto-generated upon Surveyor GIS approval.'
      ]
    },
    currentStage: 'vro_verification',
    stageHistory: [
      {
        stage: 'Online Application & Digital Challan',
        officerRole: 'Citizen',
        officerName: 'Gaddam Srinivas Reddy (Applicant)',
        status: 'approved',
        timestamp: '2026-09-02 10:15 AM',
        remarks: 'Direct electronic application submitted with Aadhaar biometric consent and treasury payment.'
      },
      {
        stage: 'Mandal Surveyor GIS Geo-tagging',
        officerRole: 'Mandal Surveyor',
        officerName: 'K. Ramesh Babu (Licensed Surveyor)',
        status: 'approved',
        timestamp: '2026-09-03 03:40 PM',
        remarks: 'Digital DGPS survey coordinates verified against Revenue Master Sheet. Zero physical survey visit needed.'
      },
      {
        stage: 'Village Revenue Officer (VRO) Mutation Verification',
        officerRole: 'Village Revenue Officer (VRO)',
        officerName: 'Smt. D. Sharada (VRO Polampalli)',
        status: 'in_progress',
        timestamp: '2026-09-05 11:30 AM',
        remarks: 'Public notice displayed digitally for 72 hours. Zero objections raised from neighbouring Pattadars.'
      },
      {
        stage: 'Mandal Revenue Officer (MRO / Tahsildar) Final Seal',
        officerRole: 'Mandal Revenue Officer (MRO)',
        officerName: 'Sri M. Anand Kumar (MRO / Tahsildar)',
        status: 'pending',
        timestamp: 'Awaiting VRO Signoff',
        remarks: 'Digital signature certificate (DSC) seal scheduled.'
      }
    ]
  },
  {
    id: 'APP-2026-0744',
    applicationNumber: 'SLS-MUT-2026-0744',
    submissionDate: '2026-08-28',
    transferType: 'inheritance',
    surveyNumber: '88/1B',
    village: 'Edulabad',
    mandal: 'Ghatkesar',
    district: 'Medchal-Malkajgiri',
    extentTransferring: { acres: 1, guntas: 15 },
    seller: {
      name: 'Bala Swamy Mudiraj',
      fatherName: 'M. Sayanna',
      aadhaarMasked: 'XXXX-XXXX-9104',
      phone: '98661xxxxx',
      passbookNo: 'T1902004419'
    },
    buyer: {
      name: 'Mudiraj Naresh Kumar',
      fatherName: 'Bala Swamy Mudiraj',
      aadhaarMasked: 'XXXX-XXXX-4552',
      phone: '97010xxxxx',
      relationship: 'Son (Legal Heir / Succession)'
    },
    valuationAmount: 3850000,
    stampDutyFee: 0, // Exemption for family succession
    registrationFee: 2000, // Nominal fee
    mutationFee: 500,
    totalFee: 2500,
    paymentStatus: 'Paid (Digital Challan)',
    challanReference: 'CHL-TREASURY-881293',
    documents: {
      pattadarPassbook: true,
      saleOrGiftDeed: false,
      encumbranceCertificate: true,
      aadhaarKyc: true,
      panOrForm60: true
    },
    aiValidation: {
      clarityScore: 100,
      overallStatus: 'APPROVED_CLEAR',
      summary: 'Succession hierarchy verified with Family Member Certificate (FMC) and surviving family consent.',
      checks: [
        { name: 'Legal Heir Registry Match', status: 'pass', details: 'FMC verified from MeeSeva database' },
        { name: 'Encumbrance Clear', status: 'pass', details: 'Zero encumbrance or tax arrears' }
      ],
      boundaryAnalysis: {
        claimedExtent: '1 Acre 15 Guntas',
        registeredExtent: '1 Acre 15 Guntas',
        isOverlapping: false,
        adjacentSurveyMatches: true,
        notes: 'Full survey parcel transfer under succession'
      },
      recommendedActions: ['Digital passbook ready to be issued.']
    },
    currentStage: 'completed',
    stageHistory: [
      {
        stage: 'Online Application & Digital Challan',
        officerRole: 'Citizen',
        officerName: 'Mudiraj Naresh Kumar',
        status: 'approved',
        timestamp: '2026-08-28 09:00 AM',
        remarks: 'Submitted succession application with digital legal heir tree.'
      },
      {
        stage: 'Mandal Surveyor GIS Geo-tagging',
        officerRole: 'Mandal Surveyor',
        officerName: 'B. Prabhakar (Surveyor)',
        status: 'approved',
        timestamp: '2026-08-29 02:00 PM',
        remarks: 'Pre-existing survey coordinates re-authenticated.'
      },
      {
        stage: 'Village Revenue Officer (VRO) Mutation Verification',
        officerRole: 'Village Revenue Officer (VRO)',
        officerName: 'P. Venkat Reddy (VRO)',
        status: 'approved',
        timestamp: '2026-08-30 04:15 PM',
        remarks: 'Neighbours confirmed uninterrupted physical cultivation.'
      },
      {
        stage: 'Mandal Revenue Officer (MRO / Tahsildar) Final Seal',
        officerRole: 'Mandal Revenue Officer (MRO)',
        officerName: 'Dr. V. Sujatha (MRO Ghatkesar)',
        status: 'approved',
        timestamp: '2026-08-31 11:30 AM',
        remarks: 'Digital mutation approved. Digital title deed issued.'
      }
    ],
    digitalCertificateHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    ePassbookNumber: 'TS-E-PB-2026-8819'
  },
  {
    id: 'APP-2026-1033',
    applicationNumber: 'SLS-MUT-2026-1033',
    submissionDate: '2026-09-06',
    transferType: 'sale',
    surveyNumber: '304/A',
    village: 'Shamshabad',
    mandal: 'Shamshabad',
    district: 'Ranga Reddy',
    extentTransferring: { acres: 1, guntas: 0 },
    seller: {
      name: 'Ramu Naik Rathod',
      fatherName: 'Late Bheekya Naik',
      aadhaarMasked: 'XXXX-XXXX-6631',
      phone: '98492xxxxx',
      passbookNo: 'T2819001122'
    },
    buyer: {
      name: 'K. Sangeetha Rao',
      fatherName: 'K. Narsimha Rao',
      aadhaarMasked: 'XXXX-XXXX-5529',
      phone: '94401xxxxx',
      relationship: 'Purchaser (Sale Deed)'
    },
    valuationAmount: 1400000,
    stampDutyFee: 77000,
    registrationFee: 7000,
    mutationFee: 500,
    totalFee: 84500,
    paymentStatus: 'Pending',
    documents: {
      pattadarPassbook: true,
      saleOrGiftDeed: true,
      encumbranceCertificate: true,
      aadhaarKyc: true,
      panOrForm60: true
    },
    aiValidation: {
      clarityScore: 96,
      overallStatus: 'APPROVED_CLEAR',
      summary: 'Seller passbook active, 30-year EC clear, digital survey boundary matches sub-division map.',
      checks: [
        { name: 'Pattadar Title Match', status: 'pass', details: 'Ramu Naik Rathod registered as sole owner' },
        { name: 'Boundary Check', status: 'pass', details: 'Zero overlap with Survey 304/B' }
      ],
      boundaryAnalysis: {
        claimedExtent: '1 Acre 0 Guntas',
        registeredExtent: '3 Acres 10 Guntas',
        isOverlapping: false,
        adjacentSurveyMatches: true,
        notes: 'Sub-division cartographic boundary demarcated'
      },
      recommendedActions: ['Complete Treasury e-Challan payment to proceed to Surveyor review.']
    },
    currentStage: 'submitted',
    stageHistory: [
      {
        stage: 'Online Application & Digital Challan',
        officerRole: 'Citizen',
        officerName: 'K. Sangeetha Rao (Buyer)',
        status: 'in_progress',
        timestamp: '2026-09-06 04:30 PM',
        remarks: 'Application drafted and KYC validated. Pending Treasury e-Challan settlement.'
      }
    ]
  }
];

export const INITIAL_RECEIPTS: PaymentReceipt[] = [
  {
    id: 'RCP-2026-98124',
    challanNumber: 'TS-ECH-2026-98124',
    cinNumber: 'SBIN260902481920',
    bankReferenceNumber: 'TXN99823104',
    applicationNumber: 'SLS-MUT-2026-0891',
    surveyNumber: '142/2A',
    district: 'Ranga Reddy',
    mandal: 'Ibrahimpatnam',
    village: 'Polampalli',
    payerName: 'Gaddam Srinivas Reddy',
    payerPhone: '99490xxxxx',
    payerAadhaarMasked: 'XXXX-XXXX-7721',
    paymentMode: 'UPI',
    serviceType: 'Land Ownership Transfer (Mutation & Stamp Duty)',
    headOfAccounts: [
      { headCode: '0030-02-103-01', description: 'Stamp Duty on Land Conveyance Deed (5.5%)', amount: 123750 },
      { headCode: '0030-03-800-01', description: 'Registration Fee (0.5%)', amount: 11250 },
      { headCode: '0217-02-800-05', description: 'Mutation & Digital Pattadar Entry Fee', amount: 400 },
      { headCode: '0070-60-800-11', description: 'User Charges & Digital Archival Portal Fee', amount: 100 }
    ],
    totalAmount: 135500,
    transactionDate: '02 Sep 2026, 10:22 AM',
    paymentStatus: 'SUCCESS',
    treasuryDepartment: 'Telangana Cyber Treasury / Sub-Registrar Ibrahimpatnam',
    ddoCode: '25000302001'
  },
  {
    id: 'RCP-2026-88129',
    challanNumber: 'TS-ECH-2026-88129',
    cinNumber: 'SBIN260828391823',
    bankReferenceNumber: 'TXN88129341',
    applicationNumber: 'SLS-MUT-2026-0744',
    surveyNumber: '88/1B',
    district: 'Medchal-Malkajgiri',
    mandal: 'Ghatkesar',
    village: 'Edulabad',
    payerName: 'Mudiraj Naresh Kumar',
    payerPhone: '97010xxxxx',
    payerAadhaarMasked: 'XXXX-XXXX-4552',
    paymentMode: 'Net Banking',
    serviceType: 'Legal Heir Succession / Family Transfer',
    headOfAccounts: [
      { headCode: '0030-03-800-02', description: 'Succession Document Registration Fee', amount: 2000 },
      { headCode: '0217-02-800-05', description: 'Mutation Fee & e-Passbook Issuance', amount: 400 },
      { headCode: '0070-60-800-11', description: 'Portal User Charges', amount: 100 }
    ],
    totalAmount: 2500,
    transactionDate: '28 Aug 2026, 09:15 AM',
    paymentStatus: 'SUCCESS',
    treasuryDepartment: 'Telangana Cyber Treasury / Sub-Registrar Ghatkesar',
    ddoCode: '25000401002'
  }
];

export const STORAGE_KEYS = {
  RECORDS: 'sls_records',
  APPLICATIONS: 'sls_applications',
  RECEIPTS: 'sls_receipts',
  LANGUAGE: 'sls_language',
  AUDIO_ENABLED: 'sls_audio_enabled'
};

export function getStoredRecords(): LandRecord[] {
  if (typeof window === 'undefined') return INITIAL_LAND_RECORDS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return data ? JSON.parse(data) : INITIAL_LAND_RECORDS;
  } catch {
    return INITIAL_LAND_RECORDS;
  }
}

export function saveStoredRecords(records: LandRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save land records to localStorage', e);
  }
}

export function getStoredApplications(): TransferApplication[] {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : INITIAL_APPLICATIONS;
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

export function saveStoredApplications(apps: TransferApplication[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  } catch (e) {
    console.error('Failed to save applications to localStorage', e);
  }
}

export function getStoredReceipts(): PaymentReceipt[] {
  if (typeof window === 'undefined') return INITIAL_RECEIPTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
    return data ? JSON.parse(data) : INITIAL_RECEIPTS;
  } catch {
    return INITIAL_RECEIPTS;
  }
}

export function saveStoredReceipts(receipts: PaymentReceipt[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
  } catch (e) {
    console.error('Failed to save receipts to localStorage', e);
  }
}

