# SLS (Smart Land Settlement)
### Digital Land Registration & Direct Ownership Transfer System
**Final-Year Computer Science Engineering Capstone Project**

---

## 1. Project Overview & Motivation
In the traditional land revenue and mutation system, rural citizens, farmers, and land buyers face critical challenges:
- **Exorbitant Time Delays:** The manual mutation process typically takes 60 to 90 days.
- **Repeat Physical Visits:** Applicants must physically visit Mandal Revenue Offices (MRO), Village Revenue Offices (VRO), and Surveyors 10 to 15 times for boundary inspections, objection checks, and signature seals.
- **Middleman Exploitation & Bribery:** Because rules and fee calculations are opaque, unofficial brokers and middlemen extract heavy cuts (often ₹15,000 to ₹30,000 above government fees).
- **High Uncertainty & Litigation Risk:** Double registrations, legal stays, non-agricultural discrepancies, or boundary overlap are often discovered only after transactions are finished.

**SLS** is an open-source, low-cost, time-efficient digital land registration and ownership transfer system designed to help people transfer land ownership directly to the correct person without repeatedly visiting surveyors, MROs, and VROs.

---

## 2. Core Features (The 5 Mandatory Modules)

### 🎥 Audio-Visual Guide for Illiterate / Rural Citizens & Multi-Language Support
- **Interactive Visual Storyteller:** Step-by-step visual animation walking through the transfer process in simple terms.
- **Native Browser Voice Narration (Zero-Cost Web Speech API):** Reads aloud every step in English, Telugu (తెలుగు), Hindi (हिंदी), and Tamil (தமிழ்).
- **Multi-Language Switcher:** Instant localization across all forms, checklists, and legal notices.

### 🌟 Feature 1: Digital Land Title & Cadastral Survey Verification
- Instant search by Survey Number (e.g., `142/2A`), Passbook/Khata number, or owner name.
- Real-time extract of ROR-1B / Pahani records: Pattadar name, total extent (Acres & Guntas), market valuation, and 30-year Encumbrance Certificate (EC) status.
- Interactive GIS Cadastral boundary visualizer with SVG polygon coordinates and adjacent survey plots.

### 📝 Feature 2: Simplified 3-Step Guided Ownership Transfer Application
- Streamlined wizard supporting **Sale Deeds, Family Gift Settlements, Legal Heir Succession/Inheritance, and Partitions**.
- Aadhaar biometric e-KYC consent and mobile OTP simulation.
- **Transparent Treasury Fee Calculator:** Automatically calculates official Stamp Duty, Registration Fee, and Mutation Fee with zero broker markup, showing exact citizen savings.
- Digital document upload checklist with instant file integrity verification.

### 🤖 Feature 3: AI Document & Boundary Discrepancy Validator
- **100% Free & Open-Source Engine:** Client-side rule-based NLP and heuristic cadastral engine that operates with zero paid API requirements.
- Performs fuzzy name matching (seller deed vs registered Pattadar), cadastral extent sub-division check, boundary overlap detection, and Section 22A prohibited land checks.
- Generates a **Title Clarity & Health Score (0-100)**, categorized risk matrix, and actionable online resolution guidance.

### ⏱️ Feature 4: Transparent Multi-Tier Digital Workflow & Tracking
- Tracks file milestones in real time:
  1. *Online Citizen Application & Digital Challan*
  2. *Mandal Surveyor GIS Geo-tagging & Cadastral Verification*
  3. *Village Revenue Officer (VRO) Field Possession & 72-hour e-Notice*
  4. *Mandal Revenue Officer (MRO / Tahsildar) Digital Signature Seal*
- Built-in **Revenue Officer Simulator** to demonstrate how officers review and approve applications.
- Automated SMS and digital status dispatch simulation.

### 📜 Feature 5: Tamper-Evident e-Passbook & QR-Verifiable Registry
- Generates official, printable **e-Pattadar Passbook & Mutation Title Deed** with cryptographic 256-bit digital signature hash.
- Scannable QR code verification portal allowing banks, sub-registrars, and buyers to verify legal title authenticity instantly.

---

## 3. Technologies Used
- **Frontend Framework:** React 19 with Vite & TypeScript
- **Styling:** Tailwind CSS v4
- **Icons & Animation:** Lucide React & Canvas-Confetti
- **Audio Narration:** Native Web Speech Synthesis API (`window.speechSynthesis` - 100% Free, zero external API keys)
- **Local Persistence:** Browser `localStorage` and in-memory state for instant demonstration
- **AI Architecture:** Free heuristic cadastral evaluation engine and NLP tokenizer

---

## 4. Cost & Free / Open-Source Compliance Verification
This project was constructed strictly following student project requirements:
- ❌ No paid subscriptions
- ❌ No credit cards required
- ❌ No paid APIs or mandatory billing accounts
- ❌ No paid database or authentication services
- ✅ 100% Free and Open-Source software stack
- ✅ Operates seamlessly in offline and demo environments

---

## 5. How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bhoomi-setu.git
   cd bhoomi-setu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Run TypeScript linter:**
   ```bash
   npm run lint
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 6. Deployment to Vercel

The application is structured as a standard client-side React SPA, making it 100% compatible with Vercel:
1. Push the code to a GitHub repository:
   ```bash
   git add .
   git commit -m "Initial commit of BhoomiSetu Land Registration System"
   git branch -M main
   git remote add origin https://github.com/your-username/bhoomi-setu.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) using your GitHub account.
3. Click **"Add New Project"** and select the `bhoomi-setu` repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**. Your application will be live in under 60 seconds with zero configuration and zero cost!
