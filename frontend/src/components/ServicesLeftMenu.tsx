// =====================================================
// SERVICE DETAIL PAGE
// Route: /services/:category/:service
// =====================================================

import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";

export default function ServiceDetail() {
  const { category, service } = useParams();

  const activeCategory = services.find(c => c.slug === category);
  const activeService = activeCategory?.items.find(
    s => s.slug === service
  );

  if (!activeCategory || !activeService) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-[#0A3A5E]">
          Service not found
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[280px_1fr] gap-10">

        {/* =====================================
            LEFT STICKY MENU
           ===================================== */}
        <aside className="sticky top-28 h-fit bg-white rounded-2xl p-6 shadow-md">

          <h3 className="text-lg font-semibold text-[#0A3A5E] mb-4">
            Services
          </h3>

          {services.map(group => (
            <div key={group.slug} className="mb-6">
              <Link
                to={`/services/${group.slug}`}
                className={`block font-medium mb-2
                  ${
                    group.slug === category
                      ? "text-[#F5A623]"
                      : "text-[#0A3A5E] hover:text-[#F5A623]"
                  }`}
              >
                {group.category}
              </Link>

              <ul className="space-y-2 ml-2">
                {group.items.map(item => (
                  <li key={item.slug}>
                    <Link
                      to={`/services/${group.slug}/${item.slug}`}
                      className={`text-sm transition
                        ${
                          item.slug === service
                            ? "text-[#F5A623]"
                            : "text-gray-600 hover:text-[#0A3A5E]"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* =====================================
            RIGHT CONTENT AREA
           ===================================== */}
        <main className="bg-white rounded-2xl p-10 shadow-md animate-fade-up">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-[#0A3A5E] mb-3">
            {activeService.name}
          </h1>

          <p className="text-gray-600 mb-8 max-w-3xl">
            Our {activeService.name.toLowerCase()} service is designed to give
            students expert guidance, clarity, and confidence throughout their
            overseas education and career journey.
          </p>

          {/* IMAGE / ILLUSTRATION */}
          <div className="bg-[#F1F5F9] rounded-xl h-64 flex items-center justify-center mb-10 text-gray-500">
            Illustration / Image Placeholder
          </div>

          {/* CONTENT BLOCKS */}
          <div className="space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-[#0A3A5E] mb-2">
                What We Offer
              </h2>
              <p className="text-gray-600">
                Our experts work closely with students to understand academic
                background, career goals, and destination preferences to deliver
                personalized and reliable guidance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0A3A5E] mb-2">
                Why Choose Premass Overseas
              </h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Experienced certified counsellors</li>
                <li>• Transparent end-to-end process</li>
                <li>• Country-specific expertise</li>
                <li>• Career-focused approach</li>
              </ul>
            </section>

          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-[#F5A623] text-white px-8 py-3 rounded-lg
                         font-medium hover:opacity-90 transition"
            >
              Enquire About This Service
            </Link>

            <Link
              to="/services"
              className="border border-[#0A3A5E] text-[#0A3A5E]
                         px-8 py-3 rounded-lg hover:bg-[#0A3A5E]
                         hover:text-white transition"
            >
              View All Services
            </Link>
          </div>

        </main>
      </div>
    </section>
  );
}
