import { Link } from "react-router-dom";

/* =========================================
   COUNTRIES DATA (LANDING PAGE)
========================================= */
const countries = [
  {
    name: "United Kingdom",
    slug: "uk",
    flag: "/flags/uk.png",
    description:
      "World-class universities, post-study work opportunities, and globally recognised degrees.",
    universities: ["University of Oxford", "University of Cambridge", "Imperial College London"],
    mastersCourses: ["MSc in Engineering", "MBA", "MSc in Finance"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Personal Statement",
      "References",
      "Financial proof",
    ],
    visaSteps: [
      "Receive CAS from university",
      "Apply for Tier 4 (Student) visa",
      "Pay visa fee and healthcare surcharge",
      "Book and attend biometrics appointment",
      "Submit documents",
      "Receive visa decision",
    ],
  },
  {
    name: "United States",
    slug: "usa",
    flag: "/flags/usa.png",
    description:
      "Flexible education system, cutting-edge research, and diverse career pathways.",
    universities: ["MIT", "Stanford University", "Harvard University"],
    mastersCourses: ["MS in Computer Science", "MBA", "MS in Data Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (TOEFL/IELTS)",
      "Statement of Purpose",
      "Letters of Recommendation",
      "Financial documents",
    ],
    visaSteps: [
      "Receive university admission letter",
      "Pay SEVIS fee",
      "Complete DS-160 form",
      "Schedule visa interview",
      "Attend interview and submit biometrics",
      "Receive visa approval",
    ],
  },
  {
    name: "Canada",
    slug: "canada",
    flag: "/flags/canada.png",
    description:
      "High visa success rate, affordable education, and clear PR pathways.",
    universities: ["University of Toronto", "McGill University", "University of British Columbia"],
    mastersCourses: ["MEng in Engineering", "MBA", "MSc in Computer Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Statement of Purpose",
      "Letters of Recommendation",
      "Proof of funds",
    ],
    visaSteps: [
      "Receive admission letter",
      "Apply for study permit online",
      "Submit biometrics",
      "Medical examination (if required)",
      "Receive visa decision",
    ],
  },
  {
    name: "Australia",
    slug: "australia",
    flag: "/flags/australia.png",
    description:
      "Globally ranked universities with strong post-study employment options.",
    universities: ["University of Melbourne", "Australian National University", "University of Sydney"],
    mastersCourses: ["Master of IT", "MBA", "Master of Engineering"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Statement of Purpose",
      "Letters of Recommendation",
      "Proof of funds",
      "Overseas Student Health Cover (OSHC)",
    ],
    visaSteps: [
      "Receive CoE from university",
      "Apply for subclass 500 visa",
      "Submit biometrics",
      "Health checkup",
      "Receive visa decision",
    ],
  },
  {
    name: "Europe",
    slug: "europe",
    flag: "/flags/europe.png",
    description:
      "Affordable education, English-taught programs, and cultural diversity.",
    universities: ["ETH Zurich", "Technical University of Munich", "Sorbonne University"],
    mastersCourses: ["MSc in Engineering", "MBA", "MSc in Data Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Motivation letter",
      "CV/Resume",
      "Proof of funds",
    ],
    visaSteps: [
      "Receive admission letter",
      "Apply for student visa at embassy/consulate",
      "Submit biometrics",
      "Health insurance",
      "Receive visa decision",
    ],
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    flag: "/flags/newzealand.png",
    description:
      "High-quality education, safe environment, and post-study work opportunities.",
    universities: ["University of Auckland", "University of Otago", "Victoria University of Wellington"],
    mastersCourses: ["Master of Engineering", "MBA", "Master of Data Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Statement of Purpose",
      "Proof of funds",
      "Medical and police certificates",
    ],
    visaSteps: [
      "Receive offer of place",
      "Apply for student visa online",
      "Submit biometrics",
      "Medical and police checks",
      "Receive visa decision",
    ],
  },
  {
    name: "Ireland",
    slug: "ireland",
    flag: "/flags/ireland.png",
    description:
      "Renowned universities, tech industry links, and welcoming culture.",
    universities: ["Trinity College Dublin", "University College Dublin", "National University of Ireland Galway"],
    mastersCourses: ["MSc in Computer Science", "MBA", "MSc in Finance"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Statement of Purpose",
      "Proof of funds",
      "Medical insurance",
    ],
    visaSteps: [
      "Receive admission letter",
      "Apply for Irish student visa",
      "Submit biometrics",
      "Medical insurance",
      "Receive visa decision",
    ],
  },
  {
    name: "Singapore",
    slug: "singapore",
    flag: "/flags/singapore.png",
    description:
      "World-class institutions, global business hub, and multicultural society.",
    universities: ["National University of Singapore", "Nanyang Technological University", "Singapore Management University"],
    mastersCourses: ["MSc in Management", "MBA", "MSc in Computer Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English proficiency test (IELTS/TOEFL)",
      "Statement of Purpose",
      "Proof of funds",
      "Student's Pass application",
    ],
    visaSteps: [
      "Receive admission letter",
      "Apply for Student's Pass (SOLAR system)",
      "Submit required documents",
      "Receive Student's Pass approval",
    ],
  },
  {
    name: "Germany",
    slug: "germany",
    flag: "/flags/germany.png",
    description:
      "No/low tuition fees, strong engineering programs, and vibrant student life.",
    universities: ["Technical University of Munich", "RWTH Aachen University", "Heidelberg University"],
    mastersCourses: ["MSc in Engineering", "MBA", "MSc in Computer Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "English/German proficiency test",
      "Motivation letter",
      "Proof of funds (blocked account)",
      "Health insurance",
    ],
    visaSteps: [
      "Receive admission letter",
      "Open blocked account",
      "Apply for student visa at German embassy",
      "Submit biometrics",
      "Receive visa decision",
    ],
  },
  {
    name: "India",
    slug: "india",
    flag: "/flags/india.png",
    description:
      "Emerging global education hub, diverse universities, and strong STEM programs.",
    universities: ["IIT Bombay", "IIT Delhi", "Indian Institute of Science"],
    mastersCourses: ["MTech in Engineering", "MBA", "MSc in Data Science"],
    requiredDocuments: [
      "Passport",
      "Academic transcripts",
      "Entrance exam scores (GATE/CAT/others)",
      "Statement of Purpose",
      "Letters of Recommendation",
      "Proof of funds",
    ],
    visaSteps: [
      "Apply to university",
      "Receive admission letter",
      "Apply for student visa (if studying abroad)",
      "Submit required documents",
      "Attend visa interview (if required)",
      "Receive visa decision",
    ],
  },
];

export default function Countries() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – AUTHORITY SECTION
      ================================================= */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">

          <h1 className="text-4xl md:text-5xl font-bold">
            Study Destinations Worldwide
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-200">
            Explore top global education destinations with expert guidance
            from Premass Overseas. We help you choose the right country
            based on academics, career goals, and migration opportunities.
          </p>

        </div>
      </section>

      {/* =================================================
         COUNTRIES GRID – PREMIUM CARDS
      ================================================= */}
      <section className="premium-section">
        <div className="premium-container">

          <h2 className="premium-heading text-center">
            Choose Your Preferred Country
          </h2>

          <p className="premium-subtext text-center mx-auto">
            Each destination offers unique academic strengths,
            lifestyle benefits, and career opportunities.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">

            {countries.map((country) => (
              <div key={country.slug} className="premium-card text-center">

                {/* FLAG */}
                <div className="mx-auto mb-6 w-20 h-20 rounded-full overflow-hidden border border-slate-200">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-[#054374]">
                  {country.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {country.description}
                </p>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    to={`/countries/${country.slug}`}
                    className="view-services-btn"
                  >
                    View Details
                  </Link>
                </div>

                {/* ADDITIONAL INFO */}
                <div className="mt-4 text-left text-sm">
                  <strong className="text-[#054374]">Top Universities:</strong>
                  <ul className="list-disc list-inside ml-4 mb-2">
                    {country.universities?.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                  <strong className="text-[#054374]">Popular Master's Courses:</strong>
                  <ul className="list-disc list-inside ml-4 mb-2">
                    {country.mastersCourses?.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <strong className="text-[#054374]">Required Documents:</strong>
                  <ul className="list-disc list-inside ml-4 mb-2">
                    {country.requiredDocuments?.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <strong className="text-[#054374]">Visa Steps:</strong>
                  <ol className="list-decimal list-inside ml-4">
                    {country.visaSteps?.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ol>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =================================================
         FINAL CTA – TRUST CLOSE
      ================================================= */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h2 className="text-3xl font-bold text-[#054374]">
            Not Sure Which Country Is Right for You?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Speak with our overseas education experts for personalised
            country and university guidance.
          </p>

          <div className="mt-8">
            <Link to="/contact" className="btn-premium">
              Get Free Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
