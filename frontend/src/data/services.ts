export type ServiceItem = {
  name: string;
  slug: string;
};

export type ServiceCategory = {
  category: string;
  slug: string;
  items: ServiceItem[];
};

export const services: ServiceCategory[] = [
  {
    category: "Pre-Admission Services",
    slug: "pre-admission",
    items: [
      { name: "Career Counselling", slug: "career-counselling" },
      { name: "University Shortlisting", slug: "university-shortlisting" },
      { name: "Profile Evaluation", slug: "profile-evaluation" },
      { name: "Application Assistance", slug: "application-assistance" },
      { name: "Scholarship Guidance", slug: "scholarship-guidance" },
    ],
  },
  {
    category: "Admission & Coaching",
    slug: "admission-coaching",
    items: [
      { name: "Entrance Exam Coaching", slug: "entrance-exam-coaching" },
      { name: "University Admission Support", slug: "admission-support" },
      { name: "Education Loan Assistance", slug: "education-loan" },
      { name: "Document Preparation", slug: "document-preparation" },
    ],
  },
  {
    category: "Visa & Immigration",
    slug: "visa-immigration",
    items: [
      { name: "Student Visa Processing", slug: "student-visa" },
      { name: "Visit & Dependent Visa", slug: "visit-dependent-visa" },
      { name: "Visa Interview Preparation", slug: "visa-interview" },
    ],
  },
  {
    category: "Post-Study & Immigration Support",
    slug: "post-study",
    items: [
      { name: "Post-Study Work Visa", slug: "post-study-work" },
      { name: "PR Assistance", slug: "pr-assistance" },
      { name: "Work Permit Support", slug: "work-permit" },
    ],
  },
  {
    category: "Job & Career Services",
    slug: "career-services",
    items: [
      { name: "Internships & Certifications", slug: "internships" },
      { name: "Job Placement Assistance", slug: "job-placement" },
      { name: "Resume & LinkedIn Profile", slug: "resume-linkedin" },
      { name: "Payroll & HR Services", slug: "payroll-hr" },
    ],
  },
  {
    category: "Pre-Departure & Settlement",
    slug: "settlement",
    items: [
      { name: "Accommodation Assistance", slug: "accommodation" },
      { name: "Forex & Travel Assistance", slug: "forex-travel" },
      { name: "Health Insurance Support", slug: "health-insurance" },
    ],
  },
];
