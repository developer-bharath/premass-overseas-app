# 🚀 Complete REST API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication
All endpoints (except `/auth/*`) require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 TASK MANAGEMENT APIs

### 1. Create New Task
**POST** `/tasks`
```json
{
  "taskTitle": "Lead Follow-up for Student XYZ",
  "taskDescription": "Schedule counseling session",
  "assignedTo": "USER_ID",
  "taskCategory": "lead_follow_up",
  "priority": "high",
  "dueDate": "2026-02-14",
  "estimatedDuration": 2,
  "relatedService": "overseas_education"
}
```

### 2. Get All Tasks
**GET** `/tasks`
- Query params: `?status=in_progress&priority=high&assignedTo=USER_ID`

### 3. Get Task by ID
**GET** `/tasks/:id`

### 4. Update Task Status
**PUT** `/tasks/:id/status`
```json
{
  "newStatus": "completed",
  "notes": "Task completed successfully"
}
```

### 5. Add Task Comment
**POST** `/tasks/:id/comments`
```json
{
  "comment": "Good progress on this task"
}
```

### 6. Log Task Time
**POST** `/tasks/:id/time-log`
```json
{
  "date": "2026-01-14",
  "hoursSpent": 2.5,
  "notes": "Completed documentation review"
}
```

### 7. Get Employee Tasks
**GET** `/tasks/employee/:employeeId?status=in_progress`

### 8. Get Task Analytics
**GET** `/tasks/analytics/dashboard`

---

## 🌍 OVERSEAS EDUCATION SERVICE APIs

### 1. Create New Lead
**POST** `/services/overseas-education`
```json
{
  "name": "Raj Kumar",
  "email": "raj@email.com",
  "phone": "+91-9876543210",
  "academicProfile": {
    "qualification": "12th Pass",
    "percentage": 85,
    "boards": ["CBSE"],
    "streams": ["Science"]
  },
  "studyAbroad": {
    "targetCountries": ["Canada", "USA"],
    "preferredCourses": ["Computer Science", "Engineering"],
    "budgetRange": "20-30 LPA"
  },
  "leadSource": "Website"
}
```

### 2. Get All Leads
**GET** `/services/overseas-education`
- Query params: `?status=inquiry&country=Canada&assignedCounselor=USER_ID`

### 3. Get Lead by ID
**GET** `/services/overseas-education/:id`

### 4. Update Lead Status
**PUT** `/services/overseas-education/:id/status`
```json
{
  "newStatus": "counseling_completed"
}
```

### 5. Assign Counselor
**PUT** `/services/overseas-education/:id/assign-counselor`
```json
{
  "counselorId": "COUNSELOR_USER_ID"
}
```

### 6. Add Shortlisted University
**POST** `/services/overseas-education/:id/universities`
```json
{
  "universityId": "UNI123",
  "universityName": "University of Toronto",
  "country": "Canada",
  "course": "Computer Science"
}
```

### 7. Update Application Status
**PUT** `/services/overseas-education/:id/applications/:applicationIndex`
```json
{
  "newStatus": "accepted"
}
```

### 8. Upload Offer Letter
**POST** `/services/overseas-education/:id/offer-letter`
```json
{
  "universityName": "University of Toronto",
  "course": "Computer Science",
  "fileUrl": "https://example.com/offer.pdf",
  "tuitionFee": 25000,
  "scholarship": 5000
}
```

### 9. Add Note
**POST** `/services/overseas-education/:id/notes`
```json
{
  "note": "Student is very interested in Canada"
}
```

### 10. Get Lead Analytics
**GET** `/services/overseas-education/analytics/dashboard`

---

## 🏫 EMPLOYEE MANAGEMENT APIs

### 1. Get All Employees
**GET** `/employees`
- Query params: `?department=overseas_education&role=counselor`

### 2. Get Employee by ID
**GET** `/employees/:id`

### 3. Record Attendance
**POST** `/employees/:employeeId/attendance`
```json
{
  "action": "check_in",
  "ipAddress": "192.168.1.1"
}
```
Or for check-out:
```json
{
  "action": "check_out",
  "ipAddress": "192.168.1.1"
}
```

### 4. Get Attendance Report
**GET** `/employees/:employeeId/attendance/:month/:year`
Example: `/employees/USER_ID/attendance/01/2026`

### 5. Update Performance Metrics
**PUT** `/employees/:employeeId/performance`
```json
{
  "tasksCompleted": 15,
  "averageResponseTime": 2,
  "customerSatisfactionScore": 4.5,
  "performanceRating": "excellent"
}
```

### 6. Request Leave
**POST** `/employees/:employeeId/leave-request`
```json
{
  "leaveType": "casual",
  "fromDate": "2026-02-15",
  "toDate": "2026-02-17",
  "reason": "Personal work"
}
```

### 7. Approve/Reject Leave
**PUT** `/employees/:employeeId/leave-request/:leaveIndex`
```json
{
  "approvalStatus": "approved"
}
```

### 8. Get Employee Performance Dashboard
**GET** `/employees/:employeeId/dashboard`

### 9. Get Login History
**GET** `/employees/:employeeId/login-history?days=30`

---

## 🏠 DOMESTIC ADMISSION SERVICE APIs

### 1. Create Lead
**POST** `/services/domestic-admission`
```json
{
  "name": "Priya Singh",
  "email": "priya@email.com",
  "phone": "+91-9876543211",
  "academicProfile": {
    "qualification": "12th Pass",
    "percentage": 92,
    "board": "CBSE"
  },
  "preferences": {
    "preferredStates": ["Delhi", "Maharashtra"],
    "preferredCourses": ["MBBS", "Engineering"],
    "budgetRange": "5-10 LPA"
  },
  "leadSource": "Referral"
}
```

### 2. Get All Leads
**GET** `/services/domestic-admission`

### 3. Update Lead Status
**PUT** `/services/domestic-admission/:id/status`
```json
{
  "newStatus": "counseling_completed"
}
```

### 4. Add College
**POST** `/services/domestic-admission/:id/colleges`
```json
{
  "collegeName": "Delhi Institute of Technology",
  "state": "Delhi",
  "course": "B.Tech Computer Science",
  "cutoff": 650
}
```

### 5. Update Seat Allocation
**PUT** `/services/domestic-admission/:id/seat-allocation`
```json
{
  "collegeName": "Delhi Institute of Technology",
  "allottedCourse": "B.Tech CSE",
  "rank": 125,
  "allottedCategory": "Open Merit"
}
```

### 6. Get Analytics
**GET** `/services/domestic-admission/analytics/dashboard`

---

## 💰 EDUCATION LOAN SERVICE APIs

### 1. Create Loan Application
**POST** `/services/education-loan`
```json
{
  "name": "Akshay Verma",
  "email": "akshay@email.com",
  "phone": "+91-9876543212",
  "financialProfile": {
    "parentalIncome": 1200000,
    "annualExpense": 300000,
    "assets": 500000,
    "liabilities": 100000
  },
  "loanDetails": {
    "estimatedLoanAmount": 2000000,
    "loanPurpose": "Overseas Education - USA",
    "studyDestination": "United States"
  }
}
```

### 2. Get All Applications
**GET** `/services/education-loan`

### 3. Calculate Eligibility
**POST** `/services/education-loan/:id/eligibility`
```json
{
  "creditScore": 750,
  "parentalIncome": 1200000,
  "collateral": 500000,
  "repaymentCapacity": 50000
}
```

### 4. Add Lender
**POST** `/services/education-loan/:id/lenders`
```json
{
  "lenderName": "SBI",
  "lenderType": "Bank",
  "interestRate": 6.5,
  "processingFee": 10000,
  "repaymentPeriod": 15
}
```

### 5. Update Disbursement
**PUT** `/services/education-loan/:id/disbursement`
```json
{
  "disbursementAmount": 2000000,
  "disbursementDate": "2026-02-01",
  "bankAccountNumber": "1234567890",
  "description": "First tranche disbursed"
}
```

### 6. Get Analytics
**GET** `/services/education-loan/analytics/dashboard`

---

## 🛂 VISA & IMMIGRATION SERVICE APIs

### 1. Create Application
**POST** `/services/visa-immigration`
```json
{
  "name": "Ananya Sharma",
  "email": "ananya@email.com",
  "phone": "+91-9876543213",
  "visaType": "student",
  "destination": "Canada",
  "purpose": "Study - Masters in CSE"
}
```

### 2. Get All Applications
**GET** `/services/visa-immigration`
- Query params: `?status=interview_scheduled&visaType=student&destination=USA`

### 3. Update Status
**PUT** `/services/visa-immigration/:id/status`
```json
{
  "newStatus": "interview_scheduled"
}
```

### 4. Add Document
**POST** `/services/visa-immigration/:id/documents`
```json
{
  "documentType": "Passport",
  "fileUrl": "https://example.com/passport.pdf",
  "verificationStatus": "pending"
}
```

### 5. Schedule Interview
**POST** `/services/visa-immigration/:id/interview/schedule`
```json
{
  "interviewDate": "2026-02-20",
  "interviewTime": "10:00 AM",
  "location": "New Delhi Embassy",
  "type": "In-Person",
  "notes": "Bring all original documents"
}
```

### 6. Update Interview Outcome
**PUT** `/services/visa-immigration/:id/interview/outcome`
```json
{
  "outcome": "passed",
  "interviewerNotes": "Excellent communication skills",
  "scheduledDecisionDate": "2026-02-25"
}
```

### 7. Update Visa Decision
**PUT** `/services/visa-immigration/:id/decision`
```json
{
  "decision": "approved",
  "passportNumber": "L7890123",
  "visaValidityStart": "2026-03-01",
  "visaValidityEnd": "2027-03-01"
}
```

### 8. Get Analytics
**GET** `/services/visa-immigration/analytics/dashboard`

---

## 📄 DOCUMENT MANAGEMENT APIs

### 1. Upload Document
**POST** `/documents`
```json
{
  "documentName": "IELTS Certificate",
  "documentType": "Language Test",
  "category": "academic",
  "fileUrl": "https://example.com/ielts.pdf",
  "expiryDate": "2028-02-14",
  "remarks": "IELTS Score: 7.5"
}
```

### 2. Get All Documents
**GET** `/documents`
- Query params: `?category=academic&verificationStatus=pending`

### 3. Get Document by ID
**GET** `/documents/:id`

### 4. Verify Document
**PUT** `/documents/:id/verify`
```json
{
  "verificationStatus": "verified",
  "verificationNotes": "Document verified against official records"
}
```

### 5. Grant Access
**POST** `/documents/:id/access`
```json
{
  "userId": "STAFF_USER_ID",
  "accessType": "view",
  "expiryDate": "2026-03-14"
}
```

### 6. Get Expiring Documents
**GET** `/documents/check/expiring?daysFromNow=30`

### 7. Delete Document
**DELETE** `/documents/:id`

### 8. Get Analytics
**GET** `/documents/analytics/dashboard`

---

## 💼 CAREER & JOB SUPPORT APIs

### 1. Enroll in Career Support
**POST** `/services/career-support`
```json
{
  "name": "Neha Patel",
  "email": "neha@email.com",
  "phone": "+91-9876543214",
  "skills": ["Java", "Python", "SQL"],
  "experience": "2 years",
  "targetRole": "Senior Software Engineer"
}
```

### 2. Request Resume Service
**POST** `/services/career-support/:id/resume-service`
```json
{
  "serviceType": "professional_rewrite",
  "resumeFileUrl": "https://example.com/resume.pdf",
  "comments": "Need ATS-optimized resume"
}
```

### 3. Submit Revised Resume
**PUT** `/services/career-support/:id/resume-service/:serviceIndex`
```json
{
  "revisedResumeUrl": "https://example.com/resume-revised.pdf",
  "reviewerComments": "Good improvements. One more revision needed."
}
```

### 4. Add Job Application
**POST** `/services/career-support/:id/job-applications`
```json
{
  "companyName": "Google",
  "position": "Software Engineer",
  "applicationDate": "2026-02-10",
  "applicationLink": "https://careers.google.com/jobs/...",
  "currentStatus": "applied"
}
```

### 5. Update Job Application Status
**PUT** `/services/career-support/:id/job-applications/:appIndex`
```json
{
  "newStatus": "interview_scheduled",
  "updateDetails": "First round interview on Feb 20"
}
```

### 6. Record Job Offer
**PUT** `/services/career-support/:id/job-offer`
```json
{
  "companyName": "Google",
  "position": "Senior Software Engineer",
  "salary": 2500000,
  "joinDate": "2026-03-15",
  "offerLetter": "https://example.com/offer.pdf",
  "acceptedStatus": "accepted"
}
```

### 7. Get Analytics
**GET** `/services/career-support/analytics/dashboard`

---

## 🎓 IT TRAINING SERVICE APIs

### 1. Create Course
**POST** `/services/it-training`
```json
{
  "courseName": "Full Stack Development with MERN",
  "courseDescription": "Learn modern web development",
  "technologies": ["JavaScript", "React", "Node.js", "MongoDB"],
  "duration": "3 months",
  "trainingMode": "Online",
  "courseStartDate": "2026-03-01"
}
```

### 2. Get All Courses
**GET** `/services/it-training`
- Query params: `?status=in_progress`

### 3. Get Course by ID
**GET** `/services/it-training/:id`

### 4. Enroll Student
**POST** `/services/it-training/:id/enroll`
```json
{
  "studentId": "STUDENT_USER_ID",
  "studentName": "Rohan Kumar",
  "studentEmail": "rohan@email.com",
  "enrollmentDate": "2026-02-20"
}
```

### 5. Schedule Batch
**POST** `/services/it-training/:id/batch`
```json
{
  "batchName": "Batch-03-2026",
  "startDate": "2026-03-01",
  "endDate": "2026-05-31",
  "maxStrength": 30,
  "trainerId": "TRAINER_USER_ID"
}
```

### 6. Record Assessment
**POST** `/services/it-training/:id/assessment/:studentIndex`
```json
{
  "assignmentScore": 85,
  "projectScore": 90,
  "quizScore": 88,
  "overallScore": 87.6,
  "feedback": "Excellent understanding of concepts"
}
```

### 7. Issue Certificate
**POST** `/services/it-training/:id/certificate/:studentIndex`
```json
{
  "certificateNumber": "CERT-20260515-001",
  "issuedDate": "2026-05-15",
  "certificateUrl": "https://example.com/certificate.pdf"
}
```

### 8. Update Placement
**PUT** `/services/it-training/:id/placement/:studentIndex`
```json
{
  "companyName": "Accenture",
  "position": "Software Developer",
  "salary": 600000,
  "placedDate": "2026-06-01",
  "placementStatus": "placed"
}
```

### 9. Get Analytics
**GET** `/services/it-training/analytics/dashboard`

---

## 🌎 STUDENT SUPPORT & SETTLEMENT APIs

### 1. Create Support Profile
**POST** `/services/student-support`
```json
{
  "studentName": "Prateek Singh",
  "studentEmail": "prateek@email.com",
  "studyDestination": "United Kingdom",
  "departureDate": "2026-08-15",
  "accommodationNeeds": "Hostel/Shared apartment"
}
```

### 2. Get All Profiles
**GET** `/services/student-support`
- Query params: `?status=pre_departure_support&destination=Canada`

### 3. Get Profile by ID
**GET** `/services/student-support/:id`

### 4. Update Pre-Departure Checklist
**PUT** `/services/student-support/:id/pre-departure-checklist`
```json
{
  "checklistItem": "Get medical insurance done",
  "isCompleted": true
}
```

### 5. Arrange Accommodation
**PUT** `/services/student-support/:id/accommodation`
```json
{
  "accommodationType": "Hostel",
  "location": "London, UK",
  "monthlyRent": 600,
  "landlordName": "John Doe",
  "landlordContact": "+44-7900123456",
  "checkinDate": "2026-08-20"
}
```

### 6. Arrange Travel
**PUT** `/services/student-support/:id/travel`
```json
{
  "departureCity": "Delhi",
  "arrivalCity": "London",
  "departureDate": "2026-08-15",
  "arrivalDate": "2026-08-16",
  "airline": "Air India",
  "ticketNumber": "AI101-123456",
  "ticketCost": 50000,
  "bookingConfirmation": "https://example.com/booking.pdf"
}
```

### 7. Arrange Health Insurance
**PUT** `/services/student-support/:id/health-insurance`
```json
{
  "insuranceProvider": "Aditya Birla Health",
  "policyNumber": "AB-POL-123456",
  "coverageType": "Comprehensive",
  "monthlyCost": 1500,
  "policyStartDate": "2026-08-01",
  "policyEndDate": "2027-07-31",
  "documentUrl": "https://example.com/policy.pdf"
}
```

### 8. Update Arrival Support
**PUT** `/services/student-support/:id/arrival-support`
```json
{
  "airportPickupArranged": true,
  "pickupContactName": "Amit Kumar",
  "pickupContactPhone": "+44-7900654321",
  "orientationScheduled": true,
  "bankAccountOpened": false,
  "phoneConnectionEstablished": true
}
```

### 9. Get Analytics
**GET** `/services/student-support/analytics/dashboard`

---

## ✅ TESTING CHECKLIST FOR POSTMAN

- [ ] Authentication - Register & Login
- [ ] Task Management - Create, Update, Analytics
- [ ] Overseas Education - Create Lead, Assign Counselor, Upload Offer
- [ ] Domestic Admission - Create Lead, Add College, Seat Allocation
- [ ] Education Loan - Apply, Calculate Eligibility, Disburse
- [ ] Visa Immigration - Apply, Schedule Interview, Decision
- [ ] Document Management - Upload, Verify, Check Expiry
- [ ] Career Support - Enroll, Resume Service, Job Tracking
- [ ] IT Training - Create Course, Enroll, Issue Certificate
- [ ] Student Support - Create Profile, Arrange Accommodation, Travel, Insurance
- [ ] Employee Management - Attendance, Performance, Leave Management

---

## 🔐 Response Format

All endpoints return:
```json
{
  "message": "Success/Error message",
  "data/entity_name": { /* response data */ }
}
```

Error response (4xx, 5xx):
```json
{
  "message": "Error description",
  "error": "Detailed error"
}
```

---

**Happy Testing! 🎉**
