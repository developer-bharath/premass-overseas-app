import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "phosphor-react";
import { IMAGES } from "../data/images";

const serviceBlocks = [
  {
    title: "Career counselling",
    description: "Profile-first guidance to align academic goals with outcomes.",
    details: ["Profile assessment", "Goal mapping", "Destination fit analysis"],
  },
  {
    title: "University shortlisting",
    description: "Shortlist universities based on academic fit and budget.",
    details: ["Course match", "Ranking insight", "Scholarship guidance"],
  },
  {
    title: "Application assistance",
    description: "Structured application process with compliance checks.",
    details: ["Application strategy", "Document verification", "Submission tracking"],
  },
  {
    title: "SOP & LOR support",
    description: "Professional drafting and review aligned to university expectations.",
    details: ["Structured drafts", "Feedback loops", "Final polishing"],
  },
  {
    title: "Visa guidance",
    description: "Visa documentation support with country-specific compliance.",
    details: ["Checklist and SOP", "Financial docs", "Interview preparation"],
  },
  {
    title: "Pre-departure briefing",
    description: "Prepare for travel, accommodation, and arrival support.",
    details: ["Travel checklist", "Accommodation support", "Arrival guidance"],
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                Apply Now <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Free Counselling
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
            Click each service to view details and deliverables.
          </p>
          <div className="mt-8 space-y-4">
            {serviceBlocks.map((service, index) => (
              <div key={service.title} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#054374]">{service.title}</h3>
                    <p className="mt-2 text-sm text-[#5b6472]">{service.description}</p>
                  </div>
                  <span className="text-[#cd9429] font-semibold">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-sm text-[#5b6472]">
                    <ul className="space-y-2">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="text-[#cd9429]">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-[#054374] font-semibold">
                      Discuss this service <ArrowRight size={16} weight="bold" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
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
              Apply Now
            </Link>
            <Link to="/contact" className="btn-secondary">
              Free Counselling
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
