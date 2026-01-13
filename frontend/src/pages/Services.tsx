import { Link } from "react-router-dom";
import { services } from "../data/services";

import {
  GraduationCap,
  ClipboardCheck,
  Globe,
  Plane,
  Briefcase,
  Users,
} from "lucide-react";

/* =====================================================
   ICON MAP (SAME AS HOME)
===================================================== */
const serviceIcons: Record<string, JSX.Element> = {
  "pre-admission": <GraduationCap size={32} />,
  "admission-coaching": <ClipboardCheck size={32} />,
  "visa-immigration": <Globe size={32} />,
  "post-study": <Plane size={32} />,
  "career-services": <Briefcase size={32} />,
  settlement: <Users size={32} />,
};

export default function Services() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – SERVICES
      ================================================= */}
      <section className="bg-[#0A3A5E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
            Overseas Education & Immigration Services
          </h1>

          <p className="mt-6 max-w-3xl text-gray-200 leading-relaxed">
            Premass Overseas provides structured, transparent, and
            compliance-driven services covering overseas education,
            visa processing, career planning, and settlement support.
          </p>

        </div>
      </section>

      {/* =================================================
         SERVICES OVERVIEW – LIGHT GREY
      ================================================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h2 className="text-3xl font-bold text-center text-[#0A3A5E]">
            Our Service Categories
          </h2>

          <p className="mt-4 text-center max-w-3xl mx-auto text-gray-600">
            Each service category is designed to support students at
            a specific stage of their international education and
            career journey.
          </p>

          <div className="mt-20 grid md:grid-cols-3 gap-12">

            {services.map((category) => (
              <div
                key={category.slug}
                className="premium-service-card text-left"
              >

                <div className="service-icon mb-4">
                  {serviceIcons[category.slug]}
                </div>

                <h3 className="service-title mb-3">
                  {category.category}
                </h3>

                <ul className="space-y-2 text-sm text-slate-600">
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      {item.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    to={`/services/${category.slug}`}
                    className="service-view-btn"
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
         CTA – BRAND TINT
      ================================================= */}
      <section className="premium-services-section">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h2 className="text-3xl font-bold text-[#0A3A5E]">
            Not Sure Which Service You Need?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            Speak with our experienced consultants for personalised
            guidance based on your academic profile and career goals.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-premium">
              Book a Free Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
