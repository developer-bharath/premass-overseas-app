import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "phosphor-react";
import { IMAGES } from "../data/images";
import { services } from "../data/services";

const serviceMeta: Record<string, { description: string; highlights: string[]; image: string }> = {
  counselling: {
    description: "Profile-first guidance with outcome-driven counselling and academic planning.",
    highlights: ["Profile diagnostics", "Course fit analysis", "Destination mapping"],
    image: IMAGES.home.services.counselling,
  },
  applications: {
    description: "End-to-end application support with clear documentation checkpoints.",
    highlights: ["University shortlisting", "Document verification", "Submission tracking"],
    image: IMAGES.home.services.applications,
  },
  "test-prep": {
    description: "Structured coaching plans with mock tests and performance review.",
    highlights: ["IELTS/TOEFL/PTE", "GRE/GMAT prep", "Target score planning"],
    image: IMAGES.home.services["test-prep"],
  },
  visa: {
    description: "Compliance-first visa documentation and interview preparation.",
    highlights: ["Visa SOP review", "Financial checklist", "Mock interviews"],
    image: IMAGES.home.services.visa,
  },
  "post-arrival": {
    description: "Settle with confidence through arrival and onboarding support.",
    highlights: ["Accommodation help", "Airport pickup", "Local onboarding"],
    image: IMAGES.home.services["post-arrival"],
  },
  countries: {
    description: "Country-specific guidance and admissions strategies.",
    highlights: ["University strategy", "Program selection", "Localized support"],
    image: IMAGES.home.services.countries,
  },
};

export default function Services() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="tag">Our Services</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
              Structured support for every stage of your journey.
            </h1>
            <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">
              A clear, professional service model that delivers clarity, compliance, and confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/apply" className="btn-primary">
                Start Application <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Book Free Consultation
              </Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <img
              src={IMAGES.home.services.visa}
              alt="Premium counselling session"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#054374]">What you get</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#5b6472]">
                {[
                  "Dedicated counsellor support",
                  "Transparent documentation workflow",
                  "University and visa compliance checks",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">Services overview</h2>
          <p className="section-subtitle">
            Premium, card-based service modules designed for clarity and results.
          </p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((category) => {
              const meta = serviceMeta[category.slug];
              return (
                <div key={category.slug} className="card overflow-hidden flex flex-col">
                  <img
                    src={meta?.image ?? IMAGES.home.hero}
                    alt={category.category}
                    className="h-44 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-[#054374]">{category.category}</h3>
                      <p className="mt-2 text-sm text-[#5b6472]">
                        {meta?.description ?? "Comprehensive support tailored to your profile and destination."}
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm text-[#5b6472]">
                      {(meta?.highlights ?? category.items.slice(0, 3).map((item) => item.name)).map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="text-[#cd9429]">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-3">
                      <Link to={`/services/${category.slug}`} className="btn-secondary">
                        View service details
                      </Link>
                      <Link to="/contact" className="btn-primary">
                        Book consultation
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#054374]">
            Ready to build your study abroad plan?
          </h2>
          <p className="mt-4 text-[#5b6472]">
            Get a detailed consultation with our team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-primary">
              Start Application
            </Link>
            <Link to="/contact" className="btn-secondary">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
