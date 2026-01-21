export interface ServiceContent {
  hero: {
    summary: string;
    description: string;
    image?: string;
    icon?: string;
  };
  overview: {
    title: string;
    description: string;
    highlights: string[];
  };
  features: {
    title: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  process: {
    title: string;
    steps: {
      number: number;
      title: string;
      description: string;
    }[];
  };
  sections: {
    title: string;
    body?: string;
    bullets?: string[];
  }[];
  faqs?: {
    q: string;
    a: string;
  }[];
  cta?: {
    primaryText?: string;
    primaryTo?: string;
    secondaryText?: string;
    secondaryTo?: string;
  };
}

export const serviceContent: Record<string, ServiceContent> = {
  "counselling/career-counselling": {
    hero: {
      summary: "Expert Career Counselling for Your Global Future",
      description: "Discover your true potential with personalized career guidance from certified international education counsellors with 20+ years of experience.",
      icon: "🎯",
      image: "/images/services/career-counselling.jpg"
    },
    overview: {
      title: "Transform Your Career Path",
      description: "Our expert career counsellors help you navigate the complex world of international education and make informed decisions about your future.",
      highlights: [
        "Certified career counsellors with global expertise",
        "Personalized guidance based on your strengths",
        "20+ years of experience in international education",
        "95% student satisfaction rate",
        "Free initial consultation"
      ]
    },
    features: {
      title: "Comprehensive Counselling Services",
      items: [
        {
          title: "One-on-One Sessions",
          description: "Personal sessions with certified counsellors to understand your goals and aspirations",
          icon: "👤"
        },
        {
          title: "Psychometric Assessments",
          description: "Scientific tests to identify your strengths, interests, and career aptitudes",
          icon: "📊"
        },
        {
          title: "University Recommendations",
          description: "Personalized suggestions based on your academic profile and career goals",
          icon: "🎓"
        },
        {
          title: "Country Selection Guidance",
          description: "Expert advice on choosing the best destination for your studies",
          icon: "🌍"
        },
        {
          title: "Career Roadmap",
          description: "Comprehensive plan from bachelor's to post-graduation opportunities",
          icon: "📈"
        },
        {
          title: "Industry Insights",
          description: "Current data on employment trends and future career prospects",
          icon: "💼"
        }
      ]
    },
    process: {
      title: "Our Counselling Process",
      steps: [
        {
          number: 1,
          title: "Initial Consultation",
          description: "Meet with our counsellor to discuss your background, goals, and preferences"
        },
        {
          number: 2,
          title: "Assessment & Analysis",
          description: "Complete psychometric tests and academic profile evaluation"
        },
        {
          number: 3,
          title: "Career Exploration",
          description: "Deep dive into career options and study path possibilities"
        },
        {
          number: 4,
          title: "Personalized Recommendations",
          description: "Receive customized suggestions for courses, universities, and countries"
        },
        {
          number: 5,
          title: "Follow-up Support",
          description: "Ongoing guidance to refine your choices and prepare for applications"
        }
      ]
    },
    sections: [
      {
        title: "What We Offer",
        body: "Our career counselling service provides comprehensive guidance through:",
        bullets: [
          "One-on-one sessions with certified international education counsellors",
          "Psychometric assessments (Myers-Briggs, Strong Interest Inventory, etc.)",
          "Personalized course and university recommendations",
          "Country selection based on job market trends and visa policies",
          "Industry insights and future career prospects analysis",
          "Academic pathway planning from bachelor's to PhD",
          "Scholarship and financial aid guidance",
          "Post-study career planning and immigration options"
        ]
      },
      {
        title: "Why Choose Premass Overseas",
        bullets: [
          "20+ years of experience in international education counselling",
          "Certified career counsellors with global exposure and expertise",
          "Data-driven insights on employment trends across industries",
          "Personalized approach tailored to each student's unique profile",
          "Free initial consultation with no obligations",
          "95% student satisfaction and successful placements",
          "Ongoing support even after enrollment",
          "Network of partner universities and employers worldwide"
        ]
      },
      {
        title: "Success Stories",
        bullets: [
          "500+ students successfully placed in top global universities",
          "Average salary increase: 40% post-graduation",
          "90% employment rate within 6 months",
          "Students studying at Harvard, MIT, Oxford, Cambridge, NUS, etc.",
          "Career transitions from engineering to MBA, medicine to law"
        ]
      }
    ],
    faqs: [
      {
        q: "When should I start career counselling?",
        a: "Ideally 12-18 months before your intended start date. This gives ample time for course selection, exam preparation, and applications. However, it's never too early or too late to seek guidance."
      },
      {
        q: "Is the counselling service really free?",
        a: "Yes, initial career counselling sessions are completely free with no hidden charges. Advanced services like detailed psychometric assessments may have nominal charges."
      },
      {
        q: "Can you help me switch career fields?",
        a: "Absolutely! We specialize in helping students transition to new fields. We analyze your background and recommend courses that bridge your previous experience with your new career goals."
      },
      {
        q: "How do you choose recommendations?",
        a: "We use a data-driven approach considering your academic profile, test scores, budget, location preferences, career goals, and visa policies to create a balanced list of options."
      }
    ],
    cta: {
      primaryText: "Book Free Counselling Session",
      primaryTo: "/contact",
      secondaryText: "View Success Stories",
      secondaryTo: "/about"
    }
  },

  "counselling/course-selection": {
    hero: {
      summary: "Navigate Thousands of Global Courses",
      description: "Access our database of 5000+ verified courses across 30+ countries and receive expert recommendations tailored to your profile.",
      icon: "📚",
      image: "/images/services/course-selection.jpg"
    },
    overview: {
      title: "Perfect Course, Perfect Fit",
      description: "From undergraduate programs to specialized master's degrees, we help you find the course that matches your academic level, budget, and career aspirations.",
      highlights: [
        "Access to 5000+ vetted courses globally",
        "Detailed curriculum analysis and comparison",
        "Scholarship and financial aid insights",
        "Post-study work visa eligibility check",
        "Alumni success rate and placement data"
      ]
    },
    features: {
      title: "Course Selection Features",
      items: [
        {
          title: "Global Database Access",
          description: "Browse 5000+ verified courses from top universities worldwide",
          icon: "🔍"
        },
        {
          title: "Curriculum Analysis",
          description: "Detailed review of course structure, syllabus, and specializations",
          icon: "📖"
        },
        {
          title: "Fee Comparison",
          description: "Compare tuition costs, scholarships, and financial aid options",
          icon: "💰"
        },
        {
          title: "Employment Data",
          description: "Check graduate employability rates and average salaries",
          icon: "📈"
        },
        {
          title: "Visa & Immigration Info",
          description: "Understand post-study work visa and PR eligibility",
          icon: "✈️"
        },
        {
          title: "Alumni Network",
          description: "Connect with alumni and learn about their experiences",
          icon: "👥"
        }
      ]
    },
    process: {
      title: "Course Selection Process",
      steps: [
        {
          number: 1,
          title: "Profile Assessment",
          description: "Evaluate your academic background, budget, and career goals"
        },
        {
          number: 2,
          title: "Course Research",
          description: "Identify matching courses using our comprehensive database"
        },
        {
          number: 3,
          title: "Detailed Analysis",
          description: "Compare curriculum, fees, scholarships, and employment prospects"
        },
        {
          number: 4,
          title: "Shortlisting",
          description: "Create a focused list of 8-12 ideal courses for you"
        },
        {
          number: 5,
          title: "Finalization",
          description: "Refine choices and begin the application process"
        }
      ]
    },
    sections: [
      {
        title: "How We Help You Choose",
        bullets: [
          "Access to 5000+ courses across 30+ countries",
          "Detailed course curriculum and structure analysis",
          "University rankings and accreditation verification",
          "Tuition fee comparison and scholarship opportunities",
          "Post-study work visa eligibility assessment",
          "Alumni network and placement record insights",
          "Industry demand and career pathway analysis",
          "Peer reviews and student testimonials"
        ]
      },
      {
        title: "Course Evaluation Criteria",
        body: "We evaluate courses based on:",
        bullets: [
          "Academic reputation and global rankings (QS, Times, Shanghai)",
          "Industry connections and internship opportunities",
          "Faculty expertise and research facilities",
          "Graduate employability and average salary prospects",
          "Location advantages and cost of living",
          "Duration, flexibility, and specialization options",
          "Student support services and campus facilities",
          "Scholarship and financial aid availability"
        ]
      },
      {
        title: "Popular Study Destinations",
        body: "We provide expert guidance for:",
        bullets: [
          "USA - STEM programs, MBA, Liberal Arts, and specialized degrees",
          "UK - 1-year Master's programs and research degrees",
          "Canada - Co-op programs with paid internships and pathway courses",
          "Australia - Vocational training and professional degrees",
          "Germany - Engineering and tuition-free programs",
          "Ireland, New Zealand - Emerging study destinations with career benefits"
        ]
      }
    ],
    faqs: [
      {
        q: "How many courses should I shortlist?",
        a: "We recommend 8-12 courses across different universities to maintain a balanced mix of ambitious, moderate, and safe options."
      },
      {
        q: "Can I apply to courses in multiple countries?",
        a: "Yes! Many students apply to 2-3 countries to maximize opportunities and compare offers before making a final decision."
      }
    ],
    cta: {
      primaryText: "Start Course Search",
      primaryTo: "/contact",
      secondaryText: "View Course Database",
      secondaryTo: "/services"
    }
  },

  "counselling/university-shortlisting": {
    hero: {
      summary: "Strategic University Selection",
      description: "Get matched with universities that fit your profile, budget, and goals. Our proven methodology ensures maximum admission chances.",
      icon: "🎓",
      image: "/images/services/university-shortlisting.jpg"
    },
    overview: {
      title: "Your Perfect University Match",
      description: "We create a balanced list of reach, moderate, and safe universities tailored specifically to your academic profile and aspirations.",
      highlights: [
        "Data-driven university matching",
        "Balanced reach/moderate/safe strategy",
        "100% admission success rate",
        "Scholarship opportunities identification",
        "Campus culture and lifestyle analysis"
      ]
    },
    features: {
      title: "University Shortlisting Features",
      items: [
        {
          title: "Profile Analysis",
          description: "In-depth evaluation of your academics and strengths",
          icon: "📋"
        },
        {
          title: "University Database",
          description: "Access to detailed profiles of 1000+ universities globally",
          icon: "🌐"
        },
        {
          title: "Ranking Comparison",
          description: "Compare QS, Times, Shanghai, and subject-specific rankings",
          icon: "⭐"
        },
        {
          title: "Financial Planning",
          description: "Identify scholarship and financial aid opportunities",
          icon: "💵"
        },
        {
          title: "Application Strategy",
          description: "Plan your applications timeline and process",
          icon: "📅"
        },
        {
          title: "Visa Prediction",
          description: "Assess visa approval likelihood for each university",
          icon: "🛂"
        }
      ]
    },
    process: {
      title: "Shortlisting Process",
      steps: [
        {
          number: 1,
          title: "Profile Evaluation",
          description: "Comprehensive review of your academic background and test scores"
        },
        {
          number: 2,
          title: "University Research",
          description: "Identify matching universities using our advanced database"
        },
        {
          number: 3,
          title: "Detailed Comparison",
          description: "Compare rankings, fees, scholarships, and admission chances"
        },
        {
          number: 4,
          title: "Strategy Creation",
          description: "Develop reach/moderate/safe university list strategy"
        },
        {
          number: 5,
          title: "Application Planning",
          description: "Plan application timeline and deadline management"
        }
      ]
    },
    sections: [
      {
        title: "Our Shortlisting Strategy",
        bullets: [
          "Thorough profile evaluation against university requirements",
          "Reach, moderate, and safe university categorization (2-3-3 or 2-4-2 mix)",
          "Geographic diversity and campus culture assessment",
          "Financial aid and scholarship availability analysis",
          "Application deadlines and intake planning",
          "Immigration and visa success rate consideration",
          "Post-graduation career prospects for each university",
          "Alumni network strength and employer connections"
        ]
      },
      {
        title: "University Assessment Parameters",
        bullets: [
          "QS World Rankings, Times Higher Education, Shanghai Rankings",
          "Subject-specific rankings for your field of study",
          "Admission requirements and acceptance rates",
          "Program structure, duration, and specialization options",
          "Campus facilities, libraries, research labs, and student services",
          "Industry partnerships and placement record",
          "Alumni success stories and employer reputation",
          "Student diversity and international student support"
        ]
      }
    ],
    faqs: [
      {
        q: "How many universities should I apply to?",
        a: "We recommend 6-8 universities: 2 reach schools, 3-4 moderate fits, and 2 safe options. This balanced approach ensures at least one strong acceptance."
      },
      {
        q: "Do you have university partnerships?",
        a: "Yes, we are official representatives for 200+ universities globally, providing application fee waivers, direct admissions, and priority processing."
      }
    ]
  },

  // Applications Services
  "applications/sop-lor-writing": {
    hero: {
      summary: "Compelling SOPs & Strong LORs",
      description: "Get professionally written statements that make admissions committees take notice. Our alumni writers have placed students in top universities worldwide.",
      icon: "✍️",
      image: "/images/services/sop-lor.jpg"
    },
    overview: {
      title: "Tell Your Story Powerfully",
      description: "Your Statement of Purpose and Letters of Recommendation are your voice to admissions committees. We help you articulate your journey compellingly.",
      highlights: [
        "Alumni writers from top universities",
        "85% admission success rate",
        "Multiple revision rounds included",
        "100% plagiarism-free guarantee",
        "University-specific customization"
      ]
    },
    features: {
      title: "Writing Services",
      items: [
        {
          title: "SOP Writing",
          description: "Customized statements tailored to each university's requirements",
          icon: "📝"
        },
        {
          title: "LOR Guidance",
          description: "Strategic guidance on recommender selection and content",
          icon: "👨‍🏫"
        },
        {
          title: "Story Development",
          description: "Transform your experiences into compelling narratives",
          icon: "📖"
        },
        {
          title: "Multiple Revisions",
          description: "Unlimited revisions until you're completely satisfied",
          icon: "🔄"
        },
        {
          title: "Plagiarism Check",
          description: "Guaranteed original content verified by Turnitin",
          icon: "✓"
        },
        {
          title: "Proofreading",
          description: "Professional editing for grammar, style, and impact",
          icon: "🔍"
        }
      ]
    },
    process: {
      title: "SOP Writing Process",
      steps: [
        {
          number: 1,
          title: "Consultation",
          description: "Discuss your background, goals, and university requirements"
        },
        {
          number: 2,
          title: "Content Gathering",
          description: "Collect your achievements, experiences, and motivations"
        },
        {
          number: 3,
          title: "First Draft",
          description: "Professional writers craft compelling first draft (5-7 days)"
        },
        {
          number: 4,
          title: "Revisions",
          description: "2-3 rounds of revisions based on your feedback"
        },
        {
          number: 5,
          title: "Finalization",
          description: "Final plagiarism check and proofreading"
        }
      ]
    },
    sections: [
      {
        title: "SOP Writing Services",
        bullets: [
          "Customized SOPs tailored to each university's focus areas",
          "Story-driven approach highlighting your unique journey",
          "Achievement-focused content with quantifiable results",
          "Clear articulation of academic and long-term career goals",
          "Multiple revision rounds until satisfied",
          "University-specific guidelines and format compliance",
          "Demonstration of fit between your goals and program",
          "Authentic voice that reflects your personality"
        ]
      },
      {
        title: "LOR Guidance & Support",
        bullets: [
          "Strategic recommender selection (professors, employers, mentors)",
          "LOR structure and content planning consultation",
          "Draft templates and guidelines for recommenders",
          "Key points to emphasize based on program requirements",
          "Professional tone and formatting guidelines",
          "Follow-up and timely submission tracking",
          "Backup recommender identification",
          "Post-submission communication support"
        ]
      }
    ],
    faqs: [
      {
        q: "Can you guarantee admission with your SOP?",
        a: "While we can't guarantee admission, our SOPs significantly strengthen applications. 85% of clients with competitive profiles receive multiple offers."
      },
      {
        q: "How long does SOP writing take?",
        a: "Initial draft: 5-7 days. With 2-3 revision rounds: 2-3 weeks total. Rush service available for urgent applications."
      }
    ]
  },

  // ... Continue with remaining 21 services in similar detail ...
};
