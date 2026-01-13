// =====================================================
// SERVICE CATEGORY PAGE
// Left Sticky Menu + Dynamic Content Area
// Menu stays fixed, only content changes
// =====================================================

import { useParams, NavLink, Link } from "react-router-dom";
import { services } from "../data/services";

export default function ServiceCategory() {
  const { category = "", service = "" } = useParams();

  const currentCategory = services.find(c => c.slug === category);
  const currentService = currentCategory?.items.find(s => s.slug === service);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">

      {/* ================= LEFT MENU ================= */}
      <aside className="sticky top-28 h-fit bg-white rounded-2xl p-6 shadow-lg">

        <h2 className="text-lg font-bold text-[#0A3A5E] mb-6">Services</h2>

        {services.map(group => (
          <div key={group.slug} className="mb-8">

            {/* CATEGORY */}
            <div className="service-heading">{group.category}</div>

            {/* SUB SERVICES */}
            <ul className="space-y-2">
              {group.items.map(item => (
                <li key={item.slug}>
                  <NavLink
                    to={`/services/${group.slug}/${item.slug}`}
                    className={({ isActive }) =>
                      `service-item ${isActive ? "service-item-active" : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </aside>

      {/* ================= CONTENT ================= */}
      <div className="bg-white rounded-2xl shadow-lg p-10">

        {!currentService && (
          <>
            <h1 className="text-3xl font-bold text-[#0A3A5E] mb-4">
              {currentCategory?.category || "Our Services"}
            </h1>

            <p className="text-gray-600 max-w-3xl leading-relaxed">
              Select a service from the left menu to explore detailed guidance,
              processes, benefits and expert overseas education support by{" "}
              <span className="font-medium text-[#0A3A5E]">Premass Overseas</span>.
            </p>
          </>
        )}

        {currentService && (
          <>
            <h1 className="text-3xl font-bold text-[#0A3A5E] mb-4">
              {currentService.name}
            </h1>

            <p className="text-gray-600 max-w-3xl mb-8 leading-relaxed">
              {currentService.name} is part of our{" "}
              <span className="font-medium">{currentCategory?.category}</span>{" "}
              services. We provide structured, transparent and personalised
              guidance aligned with your academic and career goals.
            </p>

            {/* FEATURE CARDS */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                ["Expert Counsellors", "Certified overseas education experts"],
                ["Transparent Process", "Clear steps & honest timelines"],
                ["Global Coverage", "USA, UK, Canada, Europe, Australia"],
                ["Career Focused", "Aligned with post-study work & jobs"],
              ].map(([title, desc]) => (
                <div key={title} className="card">
                  <h4 className="font-semibold text-[#0A3A5E] mb-2">{title}</h4>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn-primary">
              Enquire About This Service
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
