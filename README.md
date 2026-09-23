# DCRUST Campus Placement & Eligibility Portal (V2)

Official, production-quality frontend application for the **Deenbandhu Chhotu Ram University of Science and Technology (DCRUST), Murthal** Training & Placement Cell.

---

## 🌟 Key Features

### 🎓 Students
- **University Authentication**: Secure HttpOnly cookie-based session management.
- **First-Login Placement Consent Barrier**: Mandatory full-page data processing consent before accessing drives.
- **Academic Profile Management**: Indian engineering disciplines (CSE, IT, ECE, EEE, ME, Civil, Biotech), CGPA, Semester, Roll Number, Registration Number, and Active Backlogs.
- **Drive Discovery & Filters**: Filter by Branch, Job Type, Location, and Status.
- **Strict Real-time Eligibility Verification**: Evaluates CGPA, branch, active backlogs, and batch against cutoffs with exact transparent checkmarks. Students cannot apply if ineligible.
- **Apply Flow & Confirmation Dialog**: Explicit application confirmation modal.
- **Resume Management**: Upload, replace, and delete PDF/DOCX resumes (up to 5MB).
- **Resume Matcher**: Real-time keyword overlap analysis (Match Score %, Matched Skills, Missing Skills) with non-AI hiring disclaimer.
- **Application Tracking & Status Timeline**: Visual progress steps (Applied → Shortlisted → Selected / Rejected).
- **Live Notifications**: Powered by Socket.IO for immediate status updates.

### 🏢 T&P Administration
- **Placement Dashboard**: Real-time metrics (Total Students, Companies, Active Drives, Applications, Shortlisted, Selected) with branch-wise distribution charts.
- **Student Management**: Directory with filters and privacy-masked mobile numbers (`98******90`).
- **Company Management**: Employer verification and partner directory.
- **5-Section Job Drive Wizard**: Form with Basic Info, Academic Cutoffs, Skills, Application Period, and Final Review.
- **CSV Data Exporter**: Multi-parameter CSV download for offline records.
- **Audit Logs**: Immutable event tracking for administrative oversight.

### 💼 Corporate Recruiters
- **Recruiter Dashboard**: Drive statistics and candidate screening funnel.
- **Candidate Screening**: Search and filter applicants with privacy-masked contact info.
- **Shortlisting & Rejection Workflows**: One-click actions with modal confirmation that trigger real-time student updates.
- **Shortlisted Candidate Directory**: Authorized unmasked direct student contact access.

---

## 🎨 Slate + Indigo Design System

- **Primary**: Indigo (`#4f46e5`)
- **Secondary**: Slate (`#0f172a` to `#f8fafc`)
- **Status Indicators**:
  - `ELIGIBLE`: Emerald
  - `APPLIED`: Indigo
  - `SHORTLISTED`: Blue/Indigo
  - `SELECTED`: Emerald
  - `REJECTED`: Rose
  - `PENDING`: Amber
  - `CLOSED`: Slate
- **India-First UI**: Currency symbol `₹` (INR), LPA package brackets, standard Indian engineering branches, semester tracking.

---

## 🚀 Getting Started

### Run frontend and backend together

From the project root, install the root development dependency once and start both applications with one command:

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend runs at `http://localhost:5000`.

### Backend database: MongoDB

The Express backend uses MongoDB through Mongoose. Set `MONGODB_URI` in `backend/.env`
to the MongoDB Atlas connection string.

```bash
cd backend
npm install
npm run db:seed
npm run dev
```

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Frontend in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

> By default, the application runs with an **integrated in-browser mock engine & Socket.IO simulator** so all workflows (student apply, eligibility check, admin creation, recruiter shortlisting, notifications) work immediately without external dependencies.

### 3. (Optional) Run Companion Express Backend
```bash
# In another terminal:
cd backend
npm run dev
```

---

## 🔑 Demo Personas for Quick Testing

Use the quick demo buttons on the `/login` page:

| Persona | Email | Description |
|---|---|---|
| **Eligible Student** | `student@dcrust.ac.in` | Rahul Sharma (CSE, 8.2 CGPA, 0 backlogs) |
| **Ineligible Student** | `priya@dcrust.ac.in` | Priya Verma (ECE, 6.4 CGPA, 1 backlog) |
| **Consent Test Student** | `aman@dcrust.ac.in` | Aman Malik (First-login consent screen test) |
| **T&P Admin** | `admin@dcrust.ac.in` | Dr. R. K. Sehrawat (Head, T&P Cell) |
| **Company Recruiter** | `recruiter@tcs.com` | Rajesh Mittal (ABC Technologies Recruiter) |
