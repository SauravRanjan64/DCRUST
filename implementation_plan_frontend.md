# DCRUST Campus Placement & Eligibility Portal (Frontend V2) — Implementation Plan

Build a complete, production-quality, responsive frontend for the **DCRUST Campus Placement & Eligibility Portal**. The application is designed for Indian university placement workflows across three primary roles: **Students**, **T&P Cell Administrators**, and **Company Recruiters**.

---

## Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Build & Runtime** | React 18 / 19, Vite, Tailwind CSS (Slate + Indigo palette) |
| **Routing** | React Router v6 (`react-router-dom`), ProtectedRoute, RoleRoute, ConsentGuard |
| **Data Fetching & Cache** | TanStack Query v5 (`@tanstack/react-query`) |
| **Forms & Validation** | React Hook Form, Zod, `@hookform/resolvers/zod` |
| **Icons & UI Utilities** | Lucide React, `clsx`, `tailwind-merge` |
| **HTTP Client & Real-time** | Axios (configured with `withCredentials: true` for HttpOnly cookies), Socket.IO Client |
| **Mock Engine** | In-browser Axios interceptor & Socket.IO simulator for zero-friction standalone testing + companion Node.js/Express mock server |

---

## Key UI/UX Principles & India-First Polish

- **Clean Slate + Indigo Design System**:
  - Primary: Indigo (`#4f46e5` / `#4338ca`)
  - Secondary: Slate (`#0f172a` to `#f8fafc`)
  - Statuses:
    - `ELIGIBLE` → Emerald
    - `APPLIED` → Indigo
    - `SHORTLISTED` → Blue/Indigo
    - `SELECTED` → Emerald
    - `REJECTED` → Rose
    - `PENDING` → Amber
    - `CLOSED` → Slate
- **Indian Academic Terminology**:
  - Indian Rupee symbol `₹` (e.g., `₹6.5–8.0 LPA`)
  - Branches: CSE, IT, ECE, EEE, Mechanical, Civil, Biotechnology, Electrical, Other
  - Metrics: CGPA (out of 10.0), Active Backlogs (0, 1, 2...), Batch (e.g., 2025, 2026), Semester (1 to 8)
  - Identifiers: Roll Number, Registration Number
  - Organizations: "T&P Cell" (not Career Services), "Placement Drive" (not Recruitment Campaign)
- **Simplicity First**:
  - No bloated enterprise ERP clutter.
  - Generous spacing, accessible typography (Inter / system-sans), clear high-contrast status badges.
  - Strict privacy handling: student phone numbers are masked (`98******90`) prior to authorized shortlisting.

---

## Proposed Changes & Module Breakdown

### 1. Project Scaffolding & Configuration

#### [NEW] `package.json`
Configure scripts and dependencies:
- `react`, `react-dom`, `react-router-dom`
- `@tanstack/react-query`, `lucide-react`
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `axios`, `socket.io-client`, `clsx`, `tailwind-merge`
- Dev: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`

#### [NEW] `vite.config.js`
Setup path alias (`@` -> `./src`) and proxy configuration for `/api` and `/socket.io`.

#### [NEW] `tailwind.config.js` & `src/index.css`
Setup Slate + Indigo theme colors, custom badge utility classes, accessible focus rings, and font configuration.

---

### 2. API Client & Service Layer (`src/services/`)

Adheres strictly to requirement #43 (no direct API calls inside components):
- `axiosClient.js`: Axios instance with `withCredentials: true`, `baseURL: import.meta.env.VITE_API_URL || '/api'`.
- `authApi.js`: `login(email, password)`, `logout()`, `getMe()`, `updateConsent(agreed)`.
- `studentApi.js`: `getProfile()`, `updateProfile(data)`, `getStudentStats()`.
- `jobApi.js`: `getJobs(filters)`, `getJobById(id)`, `checkEligibility(jobId)`.
- `applicationApi.js`: `applyForJob(jobId)`, `getMyApplications()`, `getApplicationById(id)`.
- `resumeApi.js`: `getResume()`, `uploadResume(file)`, `deleteResume()`, `matchResume({ jobId, resumeId })`.
- `adminApi.js`: `getDashboardStats()`, `getStudents(filters)`, `getCompanies()`, `verifyCompany(id)`, `getDrives()`, `createDrive(data)`, `getApplications(filters)`, `exportApplicationsCsv(params)`, `getAuditLogs()`.
- `companyApi.js`: `getDashboardStats()`, `getCompanyDrives()`, `getApplicants(driveId, filters)`, `shortlistApplicant(appId)`, `rejectApplicant(appId, reason)`, `getCompanyProfile()`, `updateCompanyProfile(data)`.
- `notificationApi.js`: `getNotifications()`, `markAsRead(id)`, `markAllAsRead()`.
- `mock/mockData.js` & `mock/mockAdapter.js`: Full-fidelity offline mock data (realistic DCRUST students, companies like TCS, Infosys, Maruti Suzuki, Google, Samsung, active drives, applications, eligibility rules, and resume matching keywords).

---

### 3. State Management & Contexts (`src/contexts/`)

- `AuthContext.jsx`:
  - HttpOnly cookie authentication pattern: calls `authApi.getMe()` on bootstrap.
  - Role management (`STUDENT`, `ADMIN`, `COMPANY`).
  - Consent tracking (`hasConsent: boolean`).
  - Demo switcher helper so reviewers can switch between Rahul Sharma (Student), Priya (Ineligible student), T&P Admin, and TCS Recruiter in 1 click.
- `SocketContext.jsx`:
  - Socket.IO connection handling.
  - Live listener for `application:status_updated`, `drive:new`, `notification:new`.
  - Dispatches global toasts and invalidates queries in TanStack Query.
- `ToastContext.jsx`:
  - Accessible, dismissible alert toasts (Success, Error, Warning, Info).

---

### 4. Reusable Common Components (`src/components/common/`)

- `Button.jsx`: variants (primary, secondary, outline, danger, ghost), sizes, loading spinner.
- `Input.jsx` & `Select.jsx` & `Checkbox.jsx`: Accessible form controls with label, helper text, and Zod error messages.
- `Modal.jsx` & `ConfirmDialog.jsx`: Accessible dialogs for confirmation (Shortlist, Reject, Apply).
- `Card.jsx` & `StatCard.jsx`: Clean cards with subtle borders and clear metric indicators.
- `Badge.jsx`: Status badge mapping (`ELIGIBLE`, `APPLIED`, `SHORTLISTED`, `SELECTED`, `REJECTED`, `PENDING`, `CLOSED`).
- `Table.jsx` & `Pagination.jsx`: Accessible tabular view with responsive card fallback for mobile screens.
- `SearchBox.jsx` & `Filter.jsx`: Debounced search box and filter dropdowns.
- `EmptyState.jsx` & `ErrorState.jsx`: Meaningful feedback states with next-action buttons.
- `LoadingSkeleton.jsx`: Skeletons for cards, tables, profile forms, and stat metrics.
- `StatusTimeline.jsx`: Step-by-step application timeline (Applied → Shortlisted → Selected / Rejected).
- `FileUpload.jsx`: File upload dropzone with PDF/DOCX validation and maximum size warning.

---

### 5. Layouts & Navigation (`src/layouts/`)

- `StudentLayout.jsx`:
  - Desktop: Sidebar (`Dashboard`, `Jobs`, `My Applications`, `Resume`, `Profile`, `Notifications`, `Logout`) + Header.
  - Mobile: Header + Responsive Bottom Navigation bar.
- `AdminLayout.jsx`:
  - Desktop & Mobile: Sidebar (`Dashboard`, `Students`, `Companies`, `Job Drives`, `Applications`, `Analytics`, `Exports`, `Audit Logs`, `Logout`) + Header.
- `CompanyLayout.jsx`:
  - Desktop & Mobile: Sidebar (`Dashboard`, `Job Drives`, `Applicants`, `Shortlisted`, `Company Profile`, `Logout`) + Header.
- `Header.jsx`: Page title, real-time notification bell with unread badge & popover, user name/role, logout.

---

### 6. Pages Implementation

#### Public & Guarded Core
- `src/pages/auth/LoginPage.jsx`: Clean split screen with DCRUST branding, credentials helper, and demo persona switch.
- `src/pages/auth/ConsentScreen.jsx`: Full-screen placement data consent barrier.
- `src/components/routing/ProtectedRoute.jsx` & `RoleRoute.jsx` & `ConsentGuard.jsx`.

#### Student Pages (`src/pages/student/`)
- `StudentDashboard.jsx`: Top KPI cards (Available Jobs, My Applications, Shortlisted, Selected) + "Latest Placement Drives" list.
- `StudentProfile.jsx`: Comprehensive form with Indian engineering fields (Roll No, Reg No, Branch, Batch, Semester, CGPA, Backlogs, Phone, Email, Graduation Year).
- `JobList.jsx`: Search + filters (Branch, Job Type, Location, Eligibility, Status) + clean job cards.
- `JobDetails.jsx`: Full JD, required skills, allowed branches, CTC (₹ LPA), **[Check Eligibility]** button.
  - Calls `GET /api/jobs/:id/eligibility`.
  - Displays checkmarks breakdown: CGPA, Branch, Active Backlogs, Batch.
  - If eligible: shows **[Apply Now]** button -> triggers apply confirmation modal.
  - If ineligible: shows clear failure breakdown (e.g. CGPA required 7.5, yours 6.9) and prevents application.
- `MyApplications.jsx`: Desktop table / Mobile cards with real-time status badges and match scores.
- `ApplicationDetails.jsx`: Drive details, eligibility snapshot, resume match score, and status timeline.
- `ResumePage.jsx`: Current resume card, upload/replace/delete actions, PDF/DOCX rules, max size notice.
- `ResumeMatcher.jsx`: Resume + target job picker, keyword match score %, matched skills (✓), missing skills (•), keyword disclaimer note.
- `NotificationsPage.jsx`: Notification list with unread markers.

#### T&P Admin Pages (`src/pages/admin/`)
- `AdminDashboard.jsx`: Stats (Total Students, Active Companies, Active Drives, Applications, Shortlisted, Selected), simple branch distribution bar chart, status breakdown, recent drives.
- `StudentManagement.jsx`: Student roster with search, Branch/Batch/CGPA filters, masked contact information, profile details modal.
- `CompanyManagement.jsx`: Recruiter company directory, verification badge, Verify/Disable actions.
- `JobDriveManagement.jsx`: List of placement drives with status and applicant counts.
- `CreateJobDrive.jsx`: 5-section creation wizard (1. Basic Info, 2. Eligibility, 3. Job Details, 4. Application Period, 5. Review & Submit).
- `AdminApplications.jsx`: Cross-drive applications with filters.
- `AdminAnalytics.jsx`: Clean placement rate metrics, branch-wise placements, top CTC offers.
- `AdminExports.jsx`: Filterable CSV exporter (Drive, Status, Branch, Batch) with direct download.
- `AdminAuditLogs.jsx`: Chronological audit log of administrative and placement events.

#### Company Recruiter Pages (`src/pages/company/`)
- `CompanyDashboard.jsx`: Drive metrics, applicant funnel (Total, Eligible, Shortlisted, Selected), recent applicants.
- `CompanyDrives.jsx`: Active drives posted by the company.
- `CompanyApplicants.jsx`: Candidate table with filters (Branch, CGPA, Backlogs, Match Score, Status). Privacy masking for contact (`98******90`) prior to shortlisting. Shortlist confirmation dialog and Reject dialog with optional reason.
- `CompanyShortlisted.jsx`: Shortlisted candidates with unmasked contact info.
- `CompanyProfile.jsx`: Recruiter company profile and coordinator contacts.

---

### 7. Companion Node.js + Express Backend (`server/`)

To fulfill "The frontend must connect to a separate Node.js + Express.js REST API backend":
- `server/package.json` & `server/index.js`: Express server with CORS, cookie-parser, Socket.IO, and REST endpoints for Auth, Students, Jobs, Eligibility, Applications, Resume Match, Admin, and Company actions.
- Allows running `npm run server` alongside `npm run dev` or using the in-browser mock adapter transparently.

---

## Verification Plan

### Automated & Build Verification
1. **Dependency Installation**: Verify all packages install cleanly using `cmd /c "npm install"`.
2. **Production Build**: Run `cmd /c "npm run build"` to verify zero syntax, lint, or TypeScript/Vite compilation errors.
3. **Dev Server Execution**: Start Vite dev server and verify HTTP response and asset loading.

### Manual & Interactive Verification
1. **Authentication & Roles**:
   - Log in as Student (`student@dcrust.ac.in`). Test role protection: attempting to visit `/admin/dashboard` or `/company/dashboard` must redirect to `/student/dashboard`.
   - Log in as Admin (`admin@dcrust.ac.in`): access admin routes.
   - Log in as Company (`recruiter@tcs.com`): access recruiter routes.
2. **Consent Flow**:
   - New student login without consent: verify full-page consent barrier blocks access until checked and submitted.
3. **Student Eligibility & Apply Flow**:
   - Browse jobs. Open eligible job (e.g. TCS Digital, min CGPA 7.0, student has 8.2). Click **[Check Eligibility]**. Verify green checkmarks on CGPA, Branch, Backlogs, Batch.
   - Click **[Apply Now]** -> confirm modal -> success notification -> view application.
   - Switch to ineligible job or test with student Priya (CGPA 6.4 < 7.5, 1 backlog). Click **[Check Eligibility]**. Verify red cross and specific failure reason displayed; verify "Apply" is disabled/blocked.
4. **Resume & Matcher Flow**:
   - Upload/replace resume PDF.
   - Run Resume Matcher against a job: verify match score %, matched skills (✓), missing skills (•), and non-AI keyword disclaimer.
5. **Real-time Status Updates**:
   - As Company recruiter, shortlist an applicant.
   - Verify student receives instant notification and application status updates to `SHORTLISTED` without page reload.
6. **Admin Features**:
   - Create a new Placement Drive through the 5-section form.
   - Filter students and export CSV.
7. **Privacy Check**:
   - Verify unshortlisted candidate phone numbers are masked (`98******90`) in both student lists and recruiter views.
8. **Responsive UI**:
   - Verify desktop sidebar and mobile bottom-nav/responsive card rendering.
