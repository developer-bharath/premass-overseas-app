export interface ServiceItem {
  slug: string;
  name: string;
}

export interface ServiceCategory {
  slug: string;
  category: string;
  items: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    slug: "counselling",
    category: "Counselling Services",
    items: [
      { slug: "career-counselling", name: "Career Counselling" },
      { slug: "course-selection", name: "Course Selection" },
      { slug: "university-shortlisting", name: "University Shortlisting" }
    ]
  },
  {
    slug: "applications",
    category: "Application Services",
    items: [
      { slug: "sop-lor-writing", name: "SOP & LOR Writing" },
      { slug: "application-assistance", name: "Application Assistance" },
      { slug: "document-preparation", name: "Document Preparation" }
    ]
  },
  {
    slug: "test-prep",
    category: "Test Preparation",
    items: [
      { slug: "ielts-coaching", name: "IELTS Coaching" },
      { slug: "toefl-coaching", name: "TOEFL Coaching" },
      { slug: "pte-coaching", name: "PTE Coaching" },
      { slug: "gre-gmat-coaching", name: "GRE & GMAT Coaching" }
    ]
  },
  {
    slug: "visa",
    category: "Visa Services",
    items: [
      { slug: "visa-guidance", name: "Visa Guidance" },
      { slug: "financial-documentation", name: "Financial Documentation" },
      { slug: "mock-interviews", name: "Mock Interviews" }
    ]
  },
  {
    slug: "post-arrival",
    category: "Post-Arrival Services",
    items: [
      { slug: "accommodation-support", name: "Accommodation Support" },
      { slug: "airport-pickup", name: "Airport Pickup" },
      { slug: "bank-account-sim", name: "Bank Account & SIM Setup" },
      { slug: "orientation-networking", name: "Orientation & Networking" }
    ]
  },
  {
    slug: "countries",
    category: "Country-Specific Services",
    items: [
      { slug: "usa-admissions", name: "USA Admissions" },
      { slug: "uk-admissions", name: "UK Admissions" },
      { slug: "canada-admissions", name: "Canada Admissions" },
      { slug: "australia-admissions", name: "Australia Admissions" },
      { slug: "europe-admissions", name: "Europe Admissions" }
    ]
  }
];
