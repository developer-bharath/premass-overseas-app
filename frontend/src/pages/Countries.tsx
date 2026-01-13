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
  },
  {
    name: "United States",
    slug: "usa",
    flag: "/flags/usa.png",
    description:
      "Flexible education system, cutting-edge research, and diverse career pathways.",
  },
  {
    name: "Canada",
    slug: "canada",
    flag: "/flags/canada.png",
    description:
      "High visa success rate, affordable education, and clear PR pathways.",
  },
  {
    name: "Australia",
    slug: "australia",
    flag: "/flags/australia.png",
    description:
      "Globally ranked universities with strong post-study employment options.",
  },
  {
    name: "Europe",
    slug: "europe",
    flag: "/flags/europe.png",
    description:
      "Affordable education, English-taught programs, and cultural diversity.",
  },
];

export default function Countries() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – AUTHORITY SECTION
      ================================================= */}
      <section className="bg-[#0A3A5E] text-white">
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
                <h3 className="text-lg font-semibold text-[#0A3A5E]">
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

          <h2 className="text-3xl font-bold text-[#0A3A5E]">
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
