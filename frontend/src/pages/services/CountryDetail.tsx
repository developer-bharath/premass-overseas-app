import { Link } from "react-router-dom";

// Example data for demonstration; replace or fetch as needed
const countries = [
  {
    name: "United States",
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
    name: "United Kingdom",
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
  // Add more countries as needed
];

export default function CountryDetail() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-[#054374] mb-4 text-center">Country Specific Services</h1>
      <p className="text-gray-600 mb-8 text-center">Choose your dream destination and see all the details you need for your study abroad journey.</p>
      <div className="grid md:grid-cols-2 gap-8">
        {countries.map((country) => (
          <div key={country.name} className="bg-white rounded-xl shadow p-6 border border-[#cd9429]/20">
            <h2 className="text-2xl font-semibold text-[#cd9429] mb-2">{country.name}</h2>
            <div className="mb-2">
              <span className="font-semibold text-[#054374]">Top Universities:</span>
              <ul className="list-disc list-inside text-gray-700">
                {country.universities.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-[#054374]">Popular Master's Courses:</span>
              <ul className="list-disc list-inside text-gray-700">
                {country.mastersCourses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-[#054374]">Required Documents:</span>
              <ul className="list-disc list-inside text-gray-700">
                {country.requiredDocuments.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-[#054374]">Visa Steps:</span>
              <ol className="list-decimal list-inside text-gray-700">
                {country.visaSteps.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/services" className="text-[#cd9429] underline hover:text-[#054374]">
          Back to All Services
        </Link>
      </div>
    </div>
  );
}
