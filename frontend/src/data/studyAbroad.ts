export type StudyCountry = {
  slug: "uk" | "usa" | "canada" | "australia" | "europe";
  name: string;
  heroImage: string;
  summary: string;
  whyStudy: string[];
  educationSystem: string[];
  topUniversities: string[];
  intakes: string[];
  cost: string[];
  careers: string[];
};

export const STUDY_COUNTRIES: StudyCountry[] = [
  {
    slug: "uk",
    name: "Study in the United Kingdom",
    heroImage: "https://images.unsplash.com/photo-1473959383414-b1c1e9b60441?w=1600&auto=format&fit=crop&q=80",
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
  },
  {
    slug: "usa",
    name: "Study in the United States",
    heroImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80",
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
  },
  {
    slug: "canada",
    name: "Study in Canada",
    heroImage: "https://images.unsplash.com/photo-1501769214405-5e86fb2f86b4?w=1600&auto=format&fit=crop&q=80",
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
  },
  {
    slug: "australia",
    name: "Study in Australia",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=80",
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
  },
  {
    slug: "europe",
    name: "Study in Europe",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop&q=80",
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
  },
];
