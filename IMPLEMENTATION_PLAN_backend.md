# DCRUST Campus Placement & Eligibility Portal — Backend V2 Architecture & Implementation Plan

This document outlines the complete architectural design, data models, state machines, engines, security practices, and testing strategies for the **DCRUST Campus Placement & Eligibility Portal** backend.

---

## 1. High-Level Architectural Design

The backend is built as a **Modular Monolith** in Node.js, Express.js, and PostgreSQL using Prisma ORM. It prioritizes clarity, relational integrity, deterministic business logic, and interview-ready engineering standards.

### Architectural Pipeline
```
HTTP Request
  ↓
Security Layer (Helmet, CORS, Rate Limiting, Cookie Parser, Pino Request Logger)
  ↓
Authentication Middleware (`authenticate()` — HttpOnly Cookie JWT verification)
  ↓
Authorization Middleware (`authorize(...roles)` — RBAC: STUDENT, COMPANY, ADMIN)
  ↓
Validation Middleware (Zod schema validation on body, params, query)
  ↓
Thin Controller (Extracts HTTP inputs, invokes domain service, returns standard JSON response)
  ↓
Domain Service (Contains all business rules, eligibility decisions, state machine checks)
  ↓
Data Access / Repository Layer (Prisma ORM with PostgreSQL queries, transactions, indexes)
  ↓
PostgreSQL Database (Source of Truth)
  ↓
Real-Time Delivery & Notifications (Socket.IO + Database Notifications)
```

---

## 2. Core Modules

| Module | Responsibilities | Key Endpoints |
|---|---|---|
| **auth** | Authentication, JWT in HttpOnly cookies, session verification, consent recording | `POST /api/auth/login`<br>`POST /api/auth/logout`<br>`GET /api/auth/me`<br>`POST /api/auth/refresh`<br>`POST /api/auth/consent` |
| **students** | Student profiles, academic details, contact privacy masking | `GET /api/students/profile`<br>`PUT /api/students/profile`<br>`GET /api/students/stats` |
| **companies** | Recruiter company profiles, company verification, applicant inspection | `GET /api/companies/profile`<br>`PUT /api/companies/profile`<br>`GET /api/companies/drives`<br>`GET /api/companies/applicants` |
| **jobs** | Job drives, allowed branches relation, required skills, deadline filters | `GET /api/jobs`<br>`GET /api/jobs/:id`<br>`POST /api/jobs` (Admin/Company) |
| **eligibility** | Deterministic V2 eligibility engine, reason builder, snapshot generator | `GET /api/jobs/:jobId/eligibility` |
| **applications** | Transactional apply, duplicate prevention, status transitions | `POST /api/jobs/:jobId/apply`<br>`POST /api/applications`<br>`GET /api/applications/my`<br>`PATCH /api/applications/:id/status` |
| **resumes** | Resume upload (Multer, UUID storage key, PDF verification), skill extraction | `POST /api/resumes/upload`<br>`GET /api/resumes`<br>`DELETE /api/resumes` |
| **resumeMatcher** | Deterministic keyword tokenizer, stop-word removal, skill matching | `POST /api/resumes/match` |
| **notifications** | User notifications, read status, real-time Socket.IO dispatch | `GET /api/notifications`<br>`PATCH /api/notifications/:id/read` |
| **analytics** | Admin placement statistics, branch charts, hiring funnel | `GET /api/analytics/dashboard` |
| **audit** | Tamper-evident audit logs with IP, user-agent, entity, and action | `GET /api/audit` |
| **admin** | Verification of companies, student management, streaming CSV exports | `GET /api/admin/students`<br>`GET /api/admin/companies`<br>`PATCH /api/admin/companies/:id/verify`<br>`GET /api/admin/applications/export` |

---

## 3. Database Schema Design (Prisma)

### Relational Integrity & Key Constraints:
- **`users`**: Unique constraint on `email`. Role enum: `STUDENT`, `ADMIN`, `COMPANY`.
- **`students`**: Unique constraints on `userId` and `rollNumber`. Check constraints: `cgpa` between 0 and 10, `activeBacklogs >= 0`. Foreign key cascade delete with `users`.
- **`companies`**: Unique constraint on `userId`. Relation to `job_drives`.
- **`job_drives`**: Foreign key to `companies`. Relational child tables `job_branches` and `job_skills`.
- **`applications`**: Strict unique constraint on `(studentId, jobId)` preventing double-submission. Foreign keys to `students` and `job_drives`.
- **`consents`**: Full append-only historical log of consent acceptance/revocation with timestamp and version.
- **`audit_logs`**: Recorded for all state modifications with user, entity, action, IP, and user-agent.
- **Indexes**: On `users.email`, `students.rollNumber`, `students.branch`, `students.cgpa`, `jobDrives.status`, `jobDrives.applicationEnd`, `applications.studentId`, `applications.jobId`, `applications.status`, `notifications.userId`, and `auditLogs.userId`.

---

## 4. Key Business Logic Engines

### A. Eligibility Engine (V2)
The backend is the ultimate authority for placement eligibility. It never trusts client submissions.
- **Checks evaluated**:
  1. **CGPA**: `student.cgpa >= job.minCgpa`
  2. **Branch**: `job.allowedBranches.includes(student.branch)`
  3. **Backlogs**: `student.activeBacklogs <= job.maxBacklogs`
  4. **Profile**: `student.profileComplete === true`
  5. **Consent**: Active accepted consent on file
  6. **Status**: Job is `ACTIVE`
  7. **Window**: `job.applicationStart <= now <= job.applicationEnd`
  8. **Duplicates**: No existing application for `(studentId, jobId)`
- **Output Contract**:
  ```json
  {
    "eligible": false,
    "reasons": [
      {
        "rule": "CGPA",
        "required": 7.5,
        "actual": 6.9,
        "message": "Minimum CGPA required is 7.5."
      }
    ],
    "checkedAt": "2026-09-20T03:00:00.000Z",
    "rulesVersion": "V2"
  }
  ```
- **Eligibility Snapshot**: On application submission, a complete immutable JSON snapshot of all student criteria, job requirements, rules version, and timestamp is stored permanently inside the `applications` record.

### B. Application State Machine
Restricts application status changes strictly to allowed transitions:
- `APPLIED` → `SHORTLISTED`
- `APPLIED` → `REJECTED`
- `APPLIED` → `WITHDRAWN`
- `SHORTLISTED` → `SELECTED`
- `SHORTLISTED` → `REJECTED`
Any other transition is rejected with `400 INVALID_STATUS_TRANSITION`.

### C. Deterministic Resume Matcher
- Extracts keywords from job required skills and student resume text/skills.
- Normalizes text: lowercase, punctuation stripped, common English stop words removed.
- Matches tokens deterministically:
  $$\text{Match Score} = \left(\frac{\text{Count of matched skills}}{\text{Count of total required job skills}}\right) \times 100$$
- Identifies and returns both `matchedSkills` and `missingSkills`.
- Assistive only: Recruiters make final hiring decisions.

---

## 5. Security & Privacy Guarantees
1. **HttpOnly Cookies**: JWT stored in `Set-Cookie` with `HttpOnly`, `SameSite=Lax/Strict`, and `Secure` in production.
2. **Contact Masking**: Student phone numbers are masked (`98******90`) on general recruiter views and only revealed once a candidate is officially shortlisted or selected.
3. **Company Ownership Guard**: Company users can only access applicants who applied to job drives belonging to their specific company (`application -> job -> company.userId === req.user.id`).
4. **Student Isolation Guard**: Students can only query their own applications, profile, resume, and notifications.
5. **Pino Redaction**: Automatically suppresses passwords, JWT tokens, and sensitive PII from application logs.
6. **Zod Validation**: Strips and validates all incoming payload fields before passing to controllers.

---

## 6. Verification & Testing Matrix

- **Unit Tests**:
  - `eligibility.test.js`: Comprehensive boundary testing (passing CGPA, failing CGPA, invalid branch, excessive backlogs, closed application deadlines).
  - `resumeMatcher.test.js`: Skill set tokenization, score calculation, missing skills isolation.
  - `statusTransition.test.js`: State machine validation for legal and illegal transitions.
  - `privacy.test.js`: Server-side phone number masking test.
- **Integration Tests**:
  - `auth.test.js`: Cookie issuance, login failure, role verification (STUDENT vs COMPANY vs ADMIN).
  - `applicationFlow.test.js`: Complete end-to-end flow: Student registration/login -> Consent -> Profile -> Job eligibility check -> Application submission (with snapshot) -> Recruiter login -> Applicant review -> Shortlisting -> Socket.IO event & Notification creation.
