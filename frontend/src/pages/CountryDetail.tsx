import { useParams, Link } from "react-router-dom";
import countries from "../data/countries.json";
import { STUDY_COUNTRIES } from "../data/studyAbroad";

export default function CountryDetail() {
  const { country } = useParams();
  const data = country ? (countries as any)[country] : null;
  const heroImage = STUDY_COUNTRIES.find((item) => item.slug === country)?.heroImage;

  if (!data) {
    return (
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#054374]">Country not found</h2>
          <Link to="/countries" className="btn-secondary mt-6">
            Back to Countries
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
            <span className="tag">Study in {data.name}</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
              {data.tagline || data.name}
            </h1>
            <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">
              {data.heroDescription}
            </p>
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
              <img
                src={heroImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80"}
                alt={data.name}
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#054374]">Why study here</h2>
            <p className="mt-4 text-sm text-[#5b6472] leading-relaxed">{data.whyStudy}</p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#054374]">Education system</h2>
            <div className="mt-4 space-y-2 text-sm text-[#5b6472]">
              <p><strong>Undergraduate:</strong> {data.degreeTypes?.bachelor?.duration || "3-4 years"}</p>
              <p><strong>Postgraduate:</strong> {data.degreeTypes?.master?.duration || "1-2 years"}</p>
              <p><strong>Doctorate:</strong> {data.degreeTypes?.phd?.duration || "3-5 years"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Top universities</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.universities?.slice(0, 6).map((uni: string) => (
                <li key={uni}>• {uni}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Intakes</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.intakes?.map((intake: string) => (
                <li key={intake}>• {intake}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Cost of study</h3>
            <div className="mt-4 text-sm text-[#5b6472] space-y-2">
              <p><strong>Tuition:</strong> {data.tuitionFees?.international || "Varies by university"}</p>
              <p><strong>Living:</strong> {data.livingCosts?.total || "Varies by city"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Visa overview</h3>
            <p className="mt-3 text-sm text-[#5b6472]">{data.visa?.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.visa?.requirements?.slice(0, 4).map((req: string) => (
                <li key={req}>• {req}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Career opportunities</h3>
            <p className="mt-3 text-sm text-[#5b6472]">
              Employment rate: {data.jobMarket?.employmentRate || "Strong graduate outcomes"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.jobMarket?.topIndustries?.slice(0, 5).map((industry: string) => (
                <span key={industry} className="px-3 py-1 rounded-full text-xs bg-white border border-[#e6e8ec] text-[#054374]">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#054374] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to start your journey?</h2>
          <p className="mt-4 text-white/80">
            Get a personalized roadmap for studying in {data.name}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Talk to Counsellor
            </Link>
            <Link to="/countries" className="btn-secondary">
              Back to Destinations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
