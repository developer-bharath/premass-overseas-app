import { Link } from "react-router-dom";
import { STUDY_COUNTRIES } from "../data/studyAbroad";

export default function Countries() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="tag">Study Destinations</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
            Explore global education destinations
          </h1>
          <p className="mt-5 text-lg text-[#5b6472] max-w-3xl mx-auto">
            Compare leading countries and choose the destination that fits your academic and
            career goals.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDY_COUNTRIES.map((country) => (
            <Link key={country.slug} to={`/study/${country.slug}`} className="card overflow-hidden hover:shadow-lg transition">
              <div className="relative">
                <img
                  src={country.heroImage}
                  alt={country.name}
                  className="h-44 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 flex items-center gap-2 shadow-md">
                  <img src={country.flag} alt={`${country.name} flag`} className="h-4 w-4 rounded-full" />
                  <span className="text-xs font-semibold text-[#054374]">
                    {country.name.replace(/^Study in\s+/, "")}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#054374]">
                  {country.name.replace(/^Study in\s+/, "")}
                </h3>
                <p className="mt-2 text-sm text-[#5b6472]">{country.summary}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#5b6472]">
                  {country.keyFacts.slice(0, 4).map((fact) => (
                    <div key={fact.label} className="rounded-lg border border-[#e6e8ec] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-[#9aa1ab]">{fact.label}</p>
                      <p className="font-semibold text-[#054374]">{fact.value}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-[#cd9429] font-semibold">
                  View full guide
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#054374]">
            Need help choosing the right country?
          </h2>
          <p className="mt-4 text-[#5b6472]">
            Our counsellors will help you shortlist based on profile, budget, and outcomes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Book Free Consultation
            </Link>
            <Link to="/apply" className="btn-secondary">
              Start Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
