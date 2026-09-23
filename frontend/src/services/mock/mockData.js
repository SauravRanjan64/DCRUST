// Mock Database for DCRUST Campus Placement & Eligibility Portal

export const INITIAL_STUDENTS = [
  {
    id: 'std-1',
    name: 'Rahul Sharma',
    email: 'student@dcrust.ac.in',
    rollNumber: '21001001045',
    registrationNumber: '21DCRUST045',
    branch: 'CSE',
    batch: 2025,
    semester: 7,
    cgpa: 8.2,
    activeBacklogs: 0,
    phone: '+91 9876543210',
    graduationYear: 2025,
    consentGiven: true,
    resume: {
      fileName: 'Rahul_Sharma_CSE_Resume.pdf',
      uploadDate: '2026-08-14',
      fileSize: '1.4 MB',
      skills: ['React', 'Node.js', 'Express', 'JavaScript', 'SQL', 'Git', 'Data Structures']
    }
  },
  {
    id: 'std-2',
    name: 'Priya Verma',
    email: 'priya@dcrust.ac.in',
    rollNumber: '21001002018',
    registrationNumber: '21DCRUST118',
    branch: 'ECE',
    batch: 2025,
    semester: 7,
    cgpa: 6.4,
    activeBacklogs: 1,
    phone: '+91 9812345678',
    graduationYear: 2025,
    consentGiven: true,
    resume: {
      fileName: 'Priya_Verma_ECE_Resume.pdf',
      uploadDate: '2026-08-18',
      fileSize: '950 KB',
      skills: ['C++', 'Embedded Systems', 'VLSI', 'MATLAB', 'IoT']
    }
  },
  {
    id: 'std-3',
    name: 'Aman Malik',
    email: 'aman@dcrust.ac.in',
    rollNumber: '22001003009',
    registrationNumber: '22DCRUST209',
    branch: 'Mechanical',
    batch: 2026,
    semester: 5,
    cgpa: 7.5,
    activeBacklogs: 0,
    phone: '+91 9898989898',
    graduationYear: 2026,
    consentGiven: false, // For testing the first-login consent barrier
    resume: null
  },
  {
    id: 'std-4',
    name: 'Neha Gupta',
    email: 'neha@dcrust.ac.in',
    rollNumber: '21001004032',
    registrationNumber: '21DCRUST332',
    branch: 'IT',
    batch: 2025,
    semester: 7,
    cgpa: 8.9,
    activeBacklogs: 0,
    phone: '+91 9765432109',
    graduationYear: 2025,
    consentGiven: true,
    resume: {
      fileName: 'Neha_Gupta_IT_Resume.pdf',
      uploadDate: '2026-08-10',
      fileSize: '1.2 MB',
      skills: ['React', 'Python', 'Machine Learning', 'SQL', 'FastAPI', 'Docker']
    }
  }
];

export const INITIAL_COMPANIES = [
  {
    id: 'comp-1',
    name: 'ABC Technologies',
    industry: 'Information Technology & Software Services',
    email: 'recruiter@tcs.com',
    location: 'Gurugram / Noida',
    verified: true,
    activeDrivesCount: 1,
    contactPerson: 'Rajesh Mittal (Lead Campus Recruiter)',
    phone: '+91 124 4567890',
    website: 'https://abctech.example.com',
    about: 'Leading global enterprise technology and IT consulting organization.'
  },
  {
    id: 'comp-2',
    name: 'Infosys Limited',
    industry: 'Enterprise Software & Cloud Consulting',
    email: 'recruiter@infosys.com',
    location: 'Bengaluru / Chandigarh',
    verified: true,
    activeDrivesCount: 1,
    contactPerson: 'Shalini Rao (University Relations)',
    phone: '+91 80 28520261',
    website: 'https://infosys.example.com',
    about: 'Global leader in next-generation digital services and consulting.'
  },
  {
    id: 'comp-3',
    name: 'Maruti Suzuki India',
    industry: 'Automobile & Advanced Manufacturing',
    email: 'recruiter@maruti.co.in',
    location: 'Manesar / Gurugram, Haryana',
    verified: true,
    activeDrivesCount: 1,
    contactPerson: 'Vikram Singh (Head Campus HR)',
    phone: '+91 124 2341234',
    website: 'https://marutisuzuki.example.com',
    about: "India's largest passenger vehicle manufacturing organization."
  }
];

export const INITIAL_DRIVES = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'ABC Technologies',
    title: 'Software Engineer',
    location: 'Gurugram / Noida',
    salaryRange: '₹6–8 LPA',
    minSalary: 6.0,
    maxSalary: 8.0,
    jobType: 'Full-Time',
    description: 'We are looking for enthusiastic Software Engineers with strong foundation in data structures, algorithms, web technologies, and database design. Selected candidates will participate in building scalable cloud solutions.',
    requiredSkills: ['React', 'Node.js', 'Express', 'SQL', 'Git'],
    allowedBranches: ['CSE', 'IT', 'ECE'],
    minCgpa: 7.0,
    maxBacklogs: 0,
    eligibleBatch: 2025,
    applicationStart: '2026-09-01',
    applicationEnd: '2026-09-28',
    status: 'ACTIVE',
    selectionRounds: ['Online Assessment', 'Technical Interview 1', 'Managerial & HR Interview']
  },
  {
    id: 'job-2',
    companyId: 'comp-2',
    companyName: 'Infosys Limited',
    title: 'Specialist Programmer',
    location: 'Bengaluru / Chandigarh',
    salaryRange: '₹9.5 LPA',
    minSalary: 9.5,
    maxSalary: 9.5,
    jobType: 'Full-Time',
    description: 'Specialist Programmer role focused on high-performance algorithm implementation, modern cloud microservices, and distributed backend systems.',
    requiredSkills: ['Data Structures', 'Python', 'Java', 'Cloud', 'System Design'],
    allowedBranches: ['CSE', 'IT'],
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleBatch: 2025,
    applicationStart: '2026-09-05',
    applicationEnd: '2026-10-05',
    status: 'ACTIVE',
    selectionRounds: ['Coding Challenge (HackWithInfy)', 'Deep Technical Round', 'HR Round']
  },
  {
    id: 'job-3',
    companyId: 'comp-3',
    companyName: 'Maruti Suzuki India',
    title: 'Graduate Engineer Trainee',
    location: 'Manesar / Gurugram',
    salaryRange: '₹8.2 LPA',
    minSalary: 8.2,
    maxSalary: 8.2,
    jobType: 'Full-Time',
    description: 'Maruti Suzuki GET Program offers cutting-edge exposure to robotic assembly lines, automotive automation, IoT sensors, quality validation and manufacturing excellence.',
    requiredSkills: ['AutoCAD', 'MATLAB', 'IoT', 'Manufacturing Systems', 'Quality Control'],
    allowedBranches: ['Mechanical', 'Electrical', 'EEE', 'ECE'],
    minCgpa: 6.8,
    maxBacklogs: 0,
    eligibleBatch: 2025,
    applicationStart: '2026-09-08',
    applicationEnd: '2026-09-30',
    status: 'ACTIVE',
    selectionRounds: ['Aptitude & Core Technical Test', 'Group Discussion', 'Personal Interview']
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    studentId: 'std-1',
    appliedOn: '2026-09-15T10:30:00Z',
    status: 'APPLIED',
    matchScore: 82,
    matchedSkills: ['React', 'Node.js', 'Express', 'SQL', 'Git'],
    missingSkills: [],
    timeline: [
      { status: 'APPLIED', timestamp: '2026-09-15T10:30:00Z', note: 'Application submitted successfully.' }
    ],
    eligibilitySnapshot: {
      cgpa: { student: 8.2, required: 7.0, pass: true },
      branch: { student: 'CSE', allowed: ['CSE', 'IT', 'ECE'], pass: true },
      backlogs: { student: 0, maxAllowed: 0, pass: true },
      batch: { student: 2025, required: 2025, pass: true }
    }
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    studentId: 'std-4',
    appliedOn: '2026-09-14T14:15:00Z',
    status: 'SHORTLISTED',
    matchScore: 68,
    matchedSkills: ['React', 'SQL'],
    missingSkills: ['Node.js', 'Express'],
    timeline: [
      { status: 'APPLIED', timestamp: '2026-09-14T14:15:00Z', note: 'Application submitted successfully.' },
      { status: 'SHORTLISTED', timestamp: '2026-09-18T16:00:00Z', note: 'Shortlisted for Online Assessment.' }
    ],
    eligibilitySnapshot: {
      cgpa: { student: 8.9, required: 7.0, pass: true },
      branch: { student: 'IT', allowed: ['CSE', 'IT', 'ECE'], pass: true },
      backlogs: { student: 0, maxAllowed: 0, pass: true },
      batch: { student: 2025, required: 2025, pass: true }
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    recipientId: 'std-1',
    title: 'New Placement Drive Announced',
    message: 'Infosys Limited has opened applications for Specialist Programmer (₹9.5 LPA).',
    timestamp: '2026-09-18T09:00:00Z',
    read: false,
    link: '/student/jobs/job-2'
  },
  {
    id: 'notif-2',
    recipientId: 'std-1',
    title: 'Application Received',
    message: 'Your application for Software Engineer at ABC Technologies was successfully submitted.',
    timestamp: '2026-09-15T10:30:00Z',
    read: true,
    link: '/student/applications/app-1'
  },
  {
    id: 'notif-3',
    recipientId: 'std-4',
    title: 'Application Shortlisted!',
    message: 'Your application for Software Engineer at ABC Technologies has been shortlisted.',
    timestamp: '2026-09-18T16:00:00Z',
    read: false,
    link: '/student/applications/app-2'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-09-18T16:00:00Z',
    actor: 'recruiter@tcs.com (ABC Technologies)',
    action: 'CANDIDATE_SHORTLISTED',
    details: 'Shortlisted applicant Neha Gupta (Roll: 21001004032) for drive job-1.'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-15T10:30:00Z',
    actor: 'student@dcrust.ac.in (Rahul Sharma)',
    action: 'JOB_APPLICATION_SUBMITTED',
    details: 'Applied for job-1 (Software Engineer at ABC Technologies).'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-08T11:00:00Z',
    actor: 'admin@dcrust.ac.in (T&P Admin)',
    action: 'JOB_DRIVE_APPROVED',
    details: 'Approved and published Maruti Suzuki GET Drive 2025.'
  },
  {
    id: 'log-4',
    timestamp: '2026-09-01T09:00:00Z',
    actor: 'admin@dcrust.ac.in (T&P Admin)',
    action: 'COMPANY_VERIFIED',
    details: 'Verified corporate credentials for ABC Technologies.'
  }
];
