import { Link, useParams } from "react-router-dom";
import { STUDY_COUNTRIES } from "../data/studyAbroad";

export default function StudyCountry() {
  const { country } = useParams();
  const data = STUDY_COUNTRIES.find((item) => item.slug === country);

  if (!data) {
    return (
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-semibold text-[#054374]">Country not found</h1>
          <p className="mt-3 text-[#5b6472]">Please choose a destination from our study abroad list.</p>
          <Link to="/countries" className="btn-secondary mt-6">
            Back to destinations
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="tag">Study Abroad</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">{data.name}</h1>
            <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">{data.summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Talk to Counsellor
              </Link>
              <Link to="/apply" className="btn-secondary">
                Apply Now
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#054374]/10 via-white to-[#cd9429]/10 blur-xl" />
            <div className="relative rounded-[32px] overflow-hidden border border-[#e6e8ec] shadow-lg">
              <img src={data.heroImage} alt={data.name} className="h-[360px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#054374]">Why study here</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.whyStudy.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#cd9429]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#054374]">Education system</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.educationSystem.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#cd9429]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Top universities</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.topUniversities.map((uni) => (
                <li key={uni}>• {uni}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Intakes</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.intakes.map((intake) => (
                <li key={intake}>• {intake}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Cost of study</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.cost.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Career opportunities</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.careers.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#054374] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to begin your application?</h2>
          <p className="mt-4 text-white/80">Speak to a counsellor for a detailed roadmap.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Talk to Counsellor
            </Link>
            <Link to="/apply" className="btn-secondary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
