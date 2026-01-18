import { Link } from "react-router-dom";
import StatsSection from "../components/StatsSection";
import { services } from "../data/services";

import {
  GraduationCap,
  ClipboardCheck,
  Globe,
  Briefcase,
  Plane,
  Users,
} from "lucide-react";

/* =====================================================
   ICON MAP FOR SERVICE CATEGORIES
===================================================== */
const serviceIcons: Record<string, JSX.Element> = {
  "pre-admission": <GraduationCap size={28} />,
  "admission-coaching": <ClipboardCheck size={28} />,
  "visa-immigration": <Globe size={28} />,
  "post-study": <Plane size={28} />,
  "career-services": <Briefcase size={28} />,
  settlement: <Users size={28} />,
};

export default function Home() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – DARK BRAND (AUTHORITY)
      ================================================= */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Trusted Partner for <br />
              <span className="text-[#cd9429]">
                Global Education & Career Success
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-xl leading-relaxed">
              Premass Overseas empowers students with expert counselling,
              global university access, visa guidance, and career-driven
              education planning.
            </p>

            <div className="mt-10 flex gap-6">
              <Link to="/contact" className="btn-premium">
                Free Consultation
              </Link>
              <Link to="/services" className="btn-premium-outline">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 rounded-3xl h-96 flex items-center justify-center text-gray-200">
              Global Student Success Visual
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
         STATS – PURE WHITE (TRUST RESET)
      ================================================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-24 text-center">
          <h2 className="text-3xl font-bold text-[#054374]">
            Trusted by Students Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Proven outcomes through transparent counselling,
            global partnerships, and compliance-driven processes.
          </p>
        </div>

        <StatsSection />
      </section>

      {/* =================================================
         WHY CHOOSE US – LIGHT GREY (INSTITUTIONAL)
      ================================================= */}
      <section className="bg-slate-50">
        <div className="premium-container py-28">

          <h2 className="premium-heading text-center">
            Why Choose Premass Overseas
          </h2>

          <p className="premium-subtext text-center mx-auto">
            A premium overseas education consultancy focused on ethical
            guidance, regulatory accuracy, and long-term student success.
          </p>

          <div className="mt-16 grid md:grid-cols-4 gap-10">

            <div className="premium-card text-center">
              <div className="premium-icon mx-auto">
                <GraduationCap />
              </div>
              <h3 className="font-semibold text-lg">
                Expert Counselling
              </h3>
              <p className="mt-3 text-slate-600">
                Profile-based counselling aligned with global standards.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="premium-icon mx-auto">
                <ClipboardCheck />
              </div>
              <h3 className="font-semibold text-lg">
                Accurate Documentation
              </h3>
              <p className="mt-3 text-slate-600">
                Error-free applications with compliance at every step.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="premium-icon mx-auto">
                <Globe />
              </div>
              <h3 className="font-semibold text-lg">
                Global Reach
              </h3>
              <p className="mt-3 text-slate-600">
                UK, Europe, Canada, Australia, and more.
              </p>
            </div>

            <div className="premium-card text-center">
              <div className="premium-icon mx-auto">
                <Briefcase />
              </div>
              <h3 className="font-semibold text-lg">
                Career-Oriented Approach
              </h3>
              <p className="mt-3 text-slate-600">
                Education aligned with employability and migration goals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
         OUR CORE SERVICES – BRAND TINT (PREMIUM)
      ================================================= */}
      <section className="premium-services-section">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h2 className="text-3xl font-bold text-center text-[#054374]">
            Our Core Services
          </h2>

          <p className="mt-4 text-center text-gray-700 max-w-3xl mx-auto">
            End-to-end overseas education, visa, career, and settlement
            services supporting students at every stage of their journey.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">

            {services.map((category) => (
              <div key={category.slug} className="premium-service-card">

                <div className="service-icon">
                  {serviceIcons[category.slug]}
                </div>

                <h3 className="service-title">
                  {category.category}
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {category.items.slice(0, 3).map((item) => (
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
    View Services
  </Link>
</div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =================================================
         FINAL CTA – DARK BRAND (STRONG CLOSE)
      ================================================= */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">

          <h2 className="text-3xl font-bold">
            Start Your Global Education Journey with Confidence
          </h2>

          <p className="mt-6 text-gray-200 max-w-2xl mx-auto">
            Speak with our experienced overseas education consultants
            for personalised and transparent guidance.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-premium">
              Get Free Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
