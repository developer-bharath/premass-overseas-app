import ukFlag from "../assets/flags/uk.png";
import usaFlag from "../assets/flags/usa.png";
import canadaFlag from "../assets/flags/canada.png";
import australiaFlag from "../assets/flags/australia.png";
import europeFlag from "../assets/flags/europe.png";

export type StudyCountry = {
  slug: "uk" | "usa" | "canada" | "australia" | "europe";
  name: string;
  heroImage: string;
  flag: string;
  summary: string;
  whyStudy: string[];
  educationSystem: string[];
  topUniversities: string[];
  intakes: string[];
  cost: string[];
  careers: string[];
  popularCourses: string[];
  eligibility: string[];
  documents: string[];
  scholarships: string[];
  workRights: string[];
  living: string[];
  timeline: string[];
  howWeHelp: string[];
  keyFacts: { label: string; value: string }[];
};

export const STUDY_COUNTRIES: StudyCountry[] = [
  {
    slug: "uk",
    name: "Study in UK",
    heroImage: "https://images.unsplash.com/photo-1473959383414-b1c1e9b60441?w=1600&auto=format&fit=crop&q=80",
    flag: ukFlag,
    summary:
      "Prestigious universities, accelerated programs, and globally recognized qualifications.",
    whyStudy: [
      "One-year master's programs with strong academic quality",
      "Globally ranked institutions and research excellence",
      "Post-study work routes for eligible graduates",
    ],
    educationSystem: [
      "Undergraduate: 3 years (4 in Scotland)",
      "Postgraduate: 1 year taught programs",
      "Strong focus on independent research and projects",
    ],
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "London School of Economics",
    ],
    intakes: ["January", "September"],
    cost: [
      "Tuition: £14,000 - £30,000 per year",
      "Living: £12,000 - £18,000 per year",
    ],
    careers: [
      "Graduate Route work visa for eligible students",
      "Strong finance, tech, and consulting sectors",
    ],
    popularCourses: [
      "Business Analytics",
      "Finance & Accounting",
      "Computer Science",
      "Data Science",
      "Engineering Management",
      "Public Health",
    ],
    eligibility: [
      "Academic transcripts with consistent performance",
      "IELTS/TOEFL/PTE as per university requirement",
      "Statement of Purpose and academic references",
      "Relevant work experience for select programs",
    ],
    documents: [
      "Valid passport, academic transcripts, and certificates",
      "SOP and two academic/professional LORs",
      "Proof of funds and bank statements",
      "CV/Resume and portfolio (if required)",
    ],
    scholarships: [
      "University merit scholarships for eligible students",
      "Chevening and Commonwealth scholarships",
      "Early application fee waivers at select universities",
    ],
    workRights: [
      "20 hours per week during term time",
      "Full-time work during vacations",
      "Graduate Route work visa up to 2 years",
    ],
    living: [
      "Accommodation: £600 - £1,200 per month",
      "Transport & utilities: £150 - £300 per month",
      "Food & lifestyle: £200 - £400 per month",
    ],
    timeline: [
      "Shortlist universities (2-3 weeks)",
      "Prepare SOP/LORs and applications (4-6 weeks)",
      "Offer and deposit (2-4 weeks)",
      "Visa file and interview (3-5 weeks)",
    ],
    howWeHelp: [
      "Profile evaluation and country fit analysis",
      "University shortlisting and application strategy",
      "SOP/LOR guidance and document verification",
      "Visa file preparation and interview readiness",
    ],
    keyFacts: [
      { label: "Programs", value: "1-3 years" },
      { label: "Intakes", value: "Jan & Sep" },
      { label: "Work Rights", value: "20 hrs/week" },
      { label: "PR Path", value: "Graduate Route" },
    ],
  },
  {
    slug: "usa",
    name: "Study in USA",
    heroImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80",
    flag: usaFlag,
    summary:
      "Flexible programs, cutting-edge research, and diverse career pathways.",
    whyStudy: [
      "Wide course choices and flexible electives",
      "Strong research and innovation culture",
      "Vibrant campus life and global networks",
    ],
    educationSystem: [
      "Undergraduate: 4 years",
      "Postgraduate: 1.5 - 2 years",
      "Credit-based systems with internships",
    ],
    topUniversities: [
      "MIT",
      "Stanford University",
      "Harvard University",
      "University of California, Berkeley",
    ],
    intakes: ["January", "August", "May (limited)"],
    cost: [
      "Tuition: $20,000 - $60,000 per year",
      "Living: $12,000 - $20,000 per year",
    ],
    careers: [
      "OPT and STEM OPT work authorization options",
      "Strong opportunities in tech, research, and business",
    ],
    popularCourses: [
      "Computer Science",
      "Business & MBA",
      "Data Science",
      "Engineering",
      "Biotech",
      "Cybersecurity",
    ],
    eligibility: [
      "Strong academic profile with relevant prerequisites",
      "IELTS/TOEFL/Duolingo as per university",
      "GRE/GMAT for select universities",
      "SOP and recommendation letters",
    ],
    documents: [
      "Passport, transcripts, and degree certificates",
      "SOP, LORs, CV, and test scores",
      "I-20 and financial documentation",
      "Visa appointment confirmation and DS-160",
    ],
    scholarships: [
      "Merit-based scholarships at select universities",
      "Assistantships and on-campus opportunities",
      "Program-specific fee waivers",
    ],
    workRights: [
      "On-campus work up to 20 hrs/week",
      "OPT for 12 months",
      "STEM OPT extension up to 24 months",
    ],
    living: [
      "Accommodation: $700 - $1,500 per month",
      "Transport & utilities: $150 - $350 per month",
      "Food & lifestyle: $250 - $500 per month",
    ],
    timeline: [
      "Shortlist universities (3-4 weeks)",
      "Applications and essays (6-8 weeks)",
      "Admissions decisions (6-12 weeks)",
      "Visa process and travel (4-6 weeks)",
    ],
    howWeHelp: [
      "Shortlist based on program ranking and budget",
      "Application strategy with essay planning",
      "Financial documentation and I-20 support",
      "Visa interview coaching and mock sessions",
    ],
    keyFacts: [
      { label: "Programs", value: "2-4 years" },
      { label: "Intakes", value: "Jan & Aug" },
      { label: "Work Rights", value: "OPT/STEM" },
      { label: "Campus Life", value: "Vibrant" },
    ],
  },
  {
    slug: "canada",
    name: "Study in Canada",
    heroImage: "https://images.unsplash.com/photo-1501769214405-5e86fb2f86b4?w=1600&auto=format&fit=crop&q=80",
    flag: canadaFlag,
    summary:
      "High visa success rates, affordable tuition, and clear PR pathways.",
    whyStudy: [
      "Affordable education with high quality",
      "Work opportunities during and after studies",
      "Clear immigration pathways for graduates",
    ],
    educationSystem: [
      "Undergraduate: 3-4 years",
      "Postgraduate: 1-2 years",
      "Co-op and internship pathways",
    ],
    topUniversities: [
      "University of Toronto",
      "McGill University",
      "University of British Columbia",
      "University of Waterloo",
    ],
    intakes: ["January", "May", "September"],
    cost: [
      "Tuition: CAD 15,000 - 35,000 per year",
      "Living: CAD 10,000 - 15,000 per year",
    ],
    careers: [
      "PGWP work permit for eligible graduates",
      "Strong demand in healthcare, tech, and finance",
    ],
    popularCourses: [
      "Computer Science",
      "Business Analytics",
      "Healthcare Management",
      "Civil Engineering",
      "Supply Chain",
      "Hospitality",
    ],
    eligibility: [
      "Academic transcripts with required GPA",
      "IELTS/TOEFL/PTE for language proof",
      "SOP and academic references",
      "GIC and financial proof (if required)",
    ],
    documents: [
      "Passport, transcripts, and certificates",
      "SOP, LORs, and CV",
      "Proof of funds and GIC documents",
      "Visa forms and biometrics",
    ],
    scholarships: [
      "Entrance scholarships for high achievers",
      "Province-specific grants",
      "Early bird fee waivers",
    ],
    workRights: [
      "20 hrs/week during study",
      "Full-time work during scheduled breaks",
      "PGWP up to 3 years",
    ],
    living: [
      "Accommodation: CAD 700 - 1,300 per month",
      "Transport & utilities: CAD 120 - 250 per month",
      "Food & lifestyle: CAD 250 - 450 per month",
    ],
    timeline: [
      "Program selection (2-3 weeks)",
      "Applications and SOP (4-6 weeks)",
      "Offer and deposit (3-4 weeks)",
      "Visa submission (4-6 weeks)",
    ],
    howWeHelp: [
      "Program and province selection",
      "SOP review and application tracking",
      "GIC and financial documentation guidance",
      "Biometrics and visa support",
    ],
    keyFacts: [
      { label: "Programs", value: "1-4 years" },
      { label: "Intakes", value: "Jan/May/Sep" },
      { label: "Work Rights", value: "PGWP" },
      { label: "PR Path", value: "Clear" },
    ],
  },
  {
    slug: "australia",
    name: "Study in Australia",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=80",
    flag: australiaFlag,
    summary:
      "Globally ranked universities with strong employability outcomes.",
    whyStudy: [
      "High-quality education with industry focus",
      "Work rights during study periods",
      "Pathways for regional opportunities",
    ],
    educationSystem: [
      "Undergraduate: 3 years",
      "Postgraduate: 1.5 - 2 years",
      "Strong vocational and research pathways",
    ],
    topUniversities: [
      "University of Melbourne",
      "Australian National University",
      "University of Sydney",
      "Monash University",
    ],
    intakes: ["February", "July", "November (limited)"],
    cost: [
      "Tuition: AUD 22,000 - 45,000 per year",
      "Living: AUD 12,000 - 20,000 per year",
    ],
    careers: [
      "Post-study work visas for eligible graduates",
      "Opportunities in engineering, healthcare, and IT",
    ],
    popularCourses: [
      "Engineering",
      "Business & Analytics",
      "Public Health",
      "IT & Cybersecurity",
      "Education",
      "Hospitality",
    ],
    eligibility: [
      "Academic transcripts with required GPA",
      "IELTS/TOEFL/PTE for language proof",
      "SOP and academic references",
      "Work experience for select programs",
    ],
    documents: [
      "Passport and academic transcripts",
      "SOP, LORs, and CV",
      "Financial proof and health cover",
      "Visa forms and biometrics",
    ],
    scholarships: [
      "University merit scholarships",
      "Destination Australia scholarships",
      "Early offer benefits",
    ],
    workRights: [
      "24-48 hrs/fortnight (policy dependent)",
      "Full-time during breaks",
      "Post-study work visas by level and region",
    ],
    living: [
      "Accommodation: AUD 800 - 1,500 per month",
      "Transport & utilities: AUD 150 - 300 per month",
      "Food & lifestyle: AUD 250 - 450 per month",
    ],
    timeline: [
      "Shortlist universities (2-3 weeks)",
      "Applications and SOP (4-6 weeks)",
      "Offer and deposit (2-4 weeks)",
      "Visa submission (4-6 weeks)",
    ],
    howWeHelp: [
      "Course matching and scholarship screening",
      "Application filing and follow-ups",
      "OSHC guidance and visa checklist",
      "Pre-departure briefing",
    ],
    keyFacts: [
      { label: "Programs", value: "1-4 years" },
      { label: "Intakes", value: "Feb/Jul" },
      { label: "Work Rights", value: "Part-time" },
      { label: "PR Path", value: "Regional" },
    ],
  },
  {
    slug: "europe",
    name: "Study in Europe",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop&q=80",
    flag: europeFlag,
    summary:
      "English-taught programs, cultural diversity, and low tuition in many countries.",
    whyStudy: [
      "Affordable tuition and scholarships",
      "Cultural diversity and global exposure",
      "Strong engineering and management programs",
    ],
    educationSystem: [
      "Undergraduate: 3 years",
      "Postgraduate: 1-2 years",
      "Growing number of English-taught courses",
    ],
    topUniversities: [
      "ETH Zurich",
      "Technical University of Munich",
      "Sorbonne University",
      "University of Amsterdam",
    ],
    intakes: ["September", "February (limited)"],
    cost: [
      "Tuition: €1,500 - €15,000 per year",
      "Living: €8,000 - €14,000 per year",
    ],
    careers: [
      "EU-wide opportunities in engineering and business",
      "Post-study options vary by country",
    ],
    popularCourses: [
      "Engineering",
      "International Business",
      "Computer Science",
      "Sustainability",
      "Design & Architecture",
      "Data Analytics",
    ],
    eligibility: [
      "Academic transcripts with required GPA",
      "IELTS/TOEFL/PTE or language waiver",
      "SOP and academic references",
      "Portfolio for select programs",
    ],
    documents: [
      "Passport, transcripts, and degree certificates",
      "SOP, LORs, and CV",
      "Proof of funds and insurance",
      "Visa forms and biometrics",
    ],
    scholarships: [
      "DAAD and Erasmus scholarships",
      "University grants and tuition waivers",
      "Country-specific fee reductions",
    ],
    workRights: [
      "Part-time work rules vary by country",
      "Post-study stays based on local policy",
      "Internship pathways across EU",
    ],
    living: [
      "Accommodation: €400 - €900 per month",
      "Transport & utilities: €120 - €250 per month",
      "Food & lifestyle: €200 - €400 per month",
    ],
    timeline: [
      "Country and program selection (3-4 weeks)",
      "Applications and SOP (4-6 weeks)",
      "Offer confirmation (3-6 weeks)",
      "Visa submission (4-6 weeks)",
    ],
    howWeHelp: [
      "Country shortlisting and budget mapping",
      "University applications and documentation",
      "Scholarship screening and guidance",
      "Visa and accommodation support",
    ],
    keyFacts: [
      { label: "Programs", value: "1-3 years" },
      { label: "Intakes", value: "Sep/Feb" },
      { label: "Work Rights", value: "Varies" },
      { label: "Tuition", value: "Low/Moderate" },
    ],
  },
];
