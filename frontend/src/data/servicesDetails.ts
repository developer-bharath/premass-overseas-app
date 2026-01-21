export const servicesDetails: Record<string, {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  process: string[];
  includes: string[];
  duration: string;
  price: string;
}> = {
  "career-counselling": {
    title: "Career Counselling",
    description: "Personalized career guidance based on your academic background, interests, and market trends. Our expert counsellors help you identify the right career path aligned with global opportunities.",
    icon: "🎯",
    benefits: [
      "One-on-one sessions with certified counsellors",
      "Psychometric assessments and aptitude tests",
      "Industry trend analysis and job market insights",
      "Personalized career roadmap development"
    ],
    process: [
      "Initial profile assessment",
      "Aptitude and interest evaluation",
      "Career options mapping",
      "Final recommendation report"
    ],
    includes: ["3 counselling sessions", "Career assessment report", "Industry insights document"],
    duration: "2-3 weeks",
    price: "Free consultation available"
  },
  "course-selection": {
    title: "Course Selection",
    description: "Strategic course selection based on career goals, academic eligibility, and future employability. We help you choose programs that align with your aspirations and market demand.",
    icon: "📚",
    benefits: [
      "Data-driven course recommendations",
      "Subject-wise eligibility analysis",
      "ROI and career outcome projections",
      "Alternative course options"
    ],
    process: [
      "Academic profile review",
      "Career goal alignment",
      "Course shortlisting",
      "Final selection guidance"
    ],
    includes: ["Course comparison chart", "Eligibility checklist", "Career prospects analysis"],
    duration: "1-2 weeks",
    price: "Included in counselling package"
  },
  "university-shortlisting": {
    title: "University Shortlisting",
    description: "Comprehensive university selection based on rankings, location, fees, scholarships, and post-study work opportunities. We help you build a balanced list of reach, match, and safety schools.",
    icon: "🏫",
    benefits: [
      "QS/THE ranking analysis",
      "Scholarship opportunity mapping",
      "Location and cost comparison",
      "Visa success rate insights"
    ],
    process: [
      "Profile and budget assessment",
      "University research and filtering",
      "Application strategy planning",
      "Final list preparation"
    ],
    includes: ["University comparison matrix", "Scholarship opportunities list", "Application timeline"],
    duration: "2-3 weeks",
    price: "Part of comprehensive service"
  },
  "sop-lor-writing": {
    title: "SOP & LOR Writing",
    description: "Professional statement of purpose and letter of recommendation drafting that highlights your strengths, achievements, and suitability for your chosen program.",
    icon: "✍️",
    benefits: [
      "University-specific customization",
      "Multiple revisions included",
      "Plagiarism-free original content",
      "Expert editing and proofreading"
    ],
    process: [
      "Background and goals discussion",
      "First draft preparation",
      "Review and revisions",
      "Final polished documents"
    ],
    includes: ["SOP for 3 universities", "LOR templates", "Unlimited revisions"],
    duration: "1-2 weeks",
    price: "Competitive pricing"
  },
  "application-assistance": {
    title: "Application Assistance",
    description: "End-to-end application management including form filling, document uploads, fee payments, and submission tracking to ensure error-free applications.",
    icon: "📋",
    benefits: [
      "Portal account setup and management",
      "Form completion guidance",
      "Document verification",
      "Deadline tracking and reminders"
    ],
    process: [
      "Application portal setup",
      "Document preparation and upload",
      "Form review and submission",
      "Status tracking and follow-up"
    ],
    includes: ["Application to 5 universities", "Document checklist", "Submission confirmation"],
    duration: "3-4 weeks",
    price: "Package-based pricing"
  },
  "document-preparation": {
    title: "Document Preparation",
    description: "Comprehensive document collection, verification, and formatting according to university and visa requirements. We ensure all documents meet official standards.",
    icon: "📄",
    benefits: [
      "Document checklist provision",
      "Format and specification guidance",
      "Attestation and notarization support",
      "Digital and physical copies management"
    ],
    process: [
      "Requirements review",
      "Document collection",
      "Formatting and verification",
      "Final compilation"
    ],
    includes: ["Complete document checklist", "Format samples", "Verification report"],
    duration: "2-3 weeks",
    price: "Included in package"
  },
  "ielts-coaching": {
    title: "IELTS Coaching",
    description: "Comprehensive IELTS preparation with expert trainers, practice tests, and personalized feedback to help you achieve your target band score.",
    icon: "🎧",
    benefits: [
      "Experienced IELTS trainers",
      "Full-length mock tests",
      "Section-wise strategy sessions",
      "Speaking practice with feedback"
    ],
    process: [
      "Diagnostic test",
      "Customized study plan",
      "Regular practice and tests",
      "Final exam readiness"
    ],
    includes: ["40+ hours training", "Study materials", "10 mock tests"],
    duration: "8-12 weeks",
    price: "Competitive batch pricing"
  },
  "toefl-coaching": {
    title: "TOEFL Coaching",
    description: "Structured TOEFL preparation covering reading, listening, speaking, and writing with proven strategies and extensive practice materials.",
    icon: "📖",
    benefits: [
      "Section-wise intensive training",
      "Computer-based test simulation",
      "Time management techniques",
      "Score improvement guarantee"
    ],
    process: [
      "Initial assessment",
      "Skill development sessions",
      "Practice test series",
      "Final review and tips"
    ],
    includes: ["35+ hours training", "Official materials", "8 full tests"],
    duration: "6-10 weeks",
    price: "Premium coaching rates"
  },
  "pte-coaching": {
    title: "PTE Coaching",
    description: "Computer-based PTE Academic preparation with AI-powered practice tools and expert guidance for all four skills.",
    icon: "💻",
    benefits: [
      "AI-based scoring practice",
      "Template and strategy training",
      "Real exam simulation",
      "Rapid score improvement"
    ],
    process: [
      "Baseline test",
      "Module-wise training",
      "Practice platform access",
      "Exam strategy finalization"
    ],
    includes: ["30+ hours training", "Online portal access", "Unlimited practice tests"],
    duration: "4-8 weeks",
    price: "Flexible payment options"
  },
  "gre-gmat-coaching": {
    title: "GRE & GMAT Coaching",
    description: "Advanced test prep for graduate admissions with quantitative, verbal, and analytical writing focus. Personalized study plans for score maximization.",
    icon: "🧮",
    benefits: [
      "Quantitative and verbal mastery",
      "Analytical writing guidance",
      "Adaptive learning approach",
      "High scorer mentorship"
    ],
    process: [
      "Diagnostic evaluation",
      "Conceptual clarity sessions",
      "Practice and mock tests",
      "Score optimization"
    ],
    includes: ["50+ hours training", "Manhattan/Kaplan materials", "12 full-length tests"],
    duration: "10-16 weeks",
    price: "Premium package"
  },
  "visa-guidance": {
    title: "Visa Guidance",
    description: "Complete visa application support including documentation, form filling, interview preparation, and embassy liaison for maximum approval chances.",
    icon: "🛂",
    benefits: [
      "Country-specific visa expertise",
      "Document checklist and verification",
      "Embassy appointment scheduling",
      "98% visa success rate"
    ],
    process: [
      "Eligibility check",
      "Document preparation",
      "Application submission",
      "Interview prep and follow-up"
    ],
    includes: ["Visa form assistance", "Document review", "Interview training"],
    duration: "3-6 weeks",
    price: "Success-based pricing"
  },
  "financial-documentation": {
    title: "Financial Documentation",
    description: "Expert guidance on financial proofs, bank statements, loan sanctions, and sponsor letters to meet visa requirements.",
    icon: "💰",
    benefits: [
      "Financial requirement calculation",
      "Bank statement formatting",
      "Loan sanction support",
      "Embassy-compliant formats"
    ],
    process: [
      "Financial assessment",
      "Document collection",
      "Format compliance check",
      "Final verification"
    ],
    includes: ["Financial checklist", "Format samples", "Loan guidance"],
    duration: "1-2 weeks",
    price: "Included in visa package"
  },
  "mock-interviews": {
    title: "Mock Interviews",
    description: "Realistic visa interview simulations with detailed feedback to build confidence and improve success rates.",
    icon: "🎤",
    benefits: [
      "Real visa officer experience",
      "Common question practice",
      "Body language and communication tips",
      "Personalized feedback"
    ],
    process: [
      "Interview prep briefing",
      "Mock session recording",
      "Detailed feedback",
      "Improvement plan"
    ],
    includes: ["2 mock sessions", "Video recording", "Feedback report"],
    duration: "1 week",
    price: "Nominal fee"
  },
  "accommodation-support": {
    title: "Accommodation Support",
    description: "Assistance in finding and securing safe, comfortable, and affordable accommodation near your university.",
    icon: "🏠",
    benefits: [
      "University housing options",
      "Off-campus listings",
      "Lease agreement review",
      "Roommate matching support"
    ],
    process: [
      "Budget and preference discussion",
      "Options research",
      "Virtual/in-person tours",
      "Booking assistance"
    ],
    includes: ["Housing options list", "Lease template", "Checklist"],
    duration: "2-4 weeks",
    price: "Free with package"
  },
  "airport-pickup": {
    title: "Airport Pickup",
    description: "Safe and reliable airport pickup service to ensure a smooth arrival in your new country.",
    icon: "✈️",
    benefits: [
      "Pre-arranged transportation",
      "Local guide assistance",
      "Direct to accommodation",
      "24/7 support"
    ],
    process: [
      "Flight details collection",
      "Driver assignment",
      "Real-time tracking",
      "Pickup and drop-off"
    ],
    includes: ["Pickup service", "Local SIM card", "Welcome kit"],
    duration: "Arrival day",
    price: "Competitive rates"
  },
  "bank-sim-setup": {
    title: "Bank Account & SIM Setup",
    description: "Guidance on opening a local bank account and getting a mobile SIM card for seamless settling.",
    icon: "📱",
    benefits: [
      "Bank account opening support",
      "SIM card activation",
      "Document preparation",
      "In-person assistance"
    ],
    process: [
      "Requirements briefing",
      "Bank/provider selection",
      "Application submission",
      "Account/SIM activation"
    ],
    includes: ["Bank comparison", "SIM plan options", "Setup guidance"],
    duration: "1-2 days",
    price: "Complimentary"
  },
  "orientation-networking": {
    title: "Orientation & Networking",
    description: "Campus orientation, local area tours, and alumni networking to help you integrate quickly.",
    icon: "🤝",
    benefits: [
      "Campus familiarization",
      "Local area guidance",
      "Alumni connect",
      "Student community introduction"
    ],
    process: [
      "Welcome orientation session",
      "Campus and city tour",
      "Alumni meetup",
      "Ongoing support"
    ],
    includes: ["Orientation session", "City guide", "Alumni network access"],
    duration: "First week",
    price: "Included"
  },
  "usa-admissions": {
    title: "USA Admissions",
    description: "Specialized USA admissions support covering top universities, F-1 visa, scholarships, and post-study OPT/STEM extension guidance.",
    icon: "🇺🇸",
    benefits: [
      "Top 100 university expertise",
      "GRE/GMAT waiver guidance",
      "F-1 visa high success rate",
      "OPT and STEM extension info"
    ],
    process: [
      "University shortlisting (Ivy League to state schools)",
      "Application and SOP customization",
      "Scholarship and assistantship applications",
      "F-1 visa and I-20 processing"
    ],
    includes: ["University list", "Visa prep", "Pre-departure briefing"],
    duration: "3-6 months",
    price: "Premium package"
  },
  "uk-admissions": {
    title: "UK Admissions",
    description: "UK admissions covering Russell Group universities, Tier 4/Student visa, UCAS applications, and Graduate Route visa guidance.",
    icon: "🇬🇧",
    benefits: [
      "Russell Group and top universities",
      "UCAS application expertise",
      "CAS and visa support",
      "2-year Graduate Route info"
    ],
    process: [
      "Course and university selection",
      "UCAS application management",
      "Offer acceptance and CAS",
      "Student visa filing"
    ],
    includes: ["UCAS guidance", "Visa checklist", "Accommodation help"],
    duration: "3-5 months",
    price: "Competitive"
  },
  "canada-admissions": {
    title: "Canada Admissions",
    description: "Canada admissions covering study permit, GIC, co-op programs, and post-graduation work permit (PGWP) pathways.",
    icon: "🇨🇦",
    benefits: [
      "SDS stream expertise",
      "GIC account setup",
      "Co-op program guidance",
      "PGWP and PR pathways"
    ],
    process: [
      "University and program selection",
      "LOA and GIC processing",
      "Study permit filing",
      "Pre-arrival orientation"
    ],
    includes: ["LOA support", "GIC guidance", "Permit checklist"],
    duration: "3-5 months",
    price: "Package-based"
  },
  "australia-admissions": {
    title: "Australia Admissions",
    description: "Australia admissions covering COE, student visa (subclass 500), OSHC, and post-study work visa opportunities.",
    icon: "🇦🇺",
    benefits: [
      "Go8 and top universities",
      "COE and OSHC processing",
      "GTE statement expertise",
      "Post-study work visa info"
    ],
    process: [
      "University application",
      "COE issuance",
      "Visa lodgement",
      "Pre-departure support"
    ],
    includes: ["COE assistance", "Visa guidance", "OSHC setup"],
    duration: "3-5 months",
    price: "Flexible"
  },
  "europe-admissions": {
    title: "Europe Admissions",
    description: "Europe admissions covering Germany, Ireland, Netherlands, and France with low tuition options, scholarships, and residence permit guidance.",
    icon: "🇪🇺",
    benefits: [
      "Low/no tuition programs",
      "DAAD and Erasmus scholarships",
      "Blocked account setup (Germany)",
      "Job seeker visa info"
    ],
    process: [
      "Country and university selection",
      "Application and funding",
      "Visa and residence permit",
      "Pre-departure briefing"
    ],
    includes: ["Country guide", "Scholarship list", "Visa support"],
    duration: "4-6 months",
    price: "Affordable"
  }
};
