// =====================================================
// SERVICE CATEGORY PAGE
// Left Sticky Menu + Dynamic Content Area
// Menu stays fixed, only content changes
// =====================================================

import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import { IMAGES } from "../data/images";

export default function ServiceCategory() {
  const { category } = useParams();
  const activeCategory = services.find((c) => c.slug === category);

  if (!activeCategory) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-[#054374]">Category not found</h2>
        <Link to="/services" className="group inline-flex items-center gap-2 text-[#cd9429] font-bold mt-4 hover:text-[#054374] transition">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Services
        </Link>
      </div>
    );
  }

  const heroImage = IMAGES.home.services[activeCategory.slug] || IMAGES.home.hero;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <nav className="text-sm text-slate-600 mb-8 flex items-center gap-2">
          <Link to="/services" className="hover:text-[#054374] font-semibold">Services</Link>
          <span>/</span>
          <span className="text-[#054374] font-bold">{activeCategory.category}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cd9429]/10 text-[#cd9429] text-sm font-semibold">
              {activeCategory.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#054374] mt-4 mb-4">
              Premium {activeCategory.category} services
            </h1>
            <p className="text-lg text-slate-900 mb-6 max-w-2xl">
              Explore reliable, structured, and outcome-focused support built around your overseas education goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#054374] text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Speak to an expert →
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#cd9429]/20 via-white to-[#054374]/15 blur-xl opacity-80" />
            <div className="relative rounded-3xl overflow-hidden border border-[#054374]/10 shadow-2xl">
              <img
                src={heroImage}
                alt={activeCategory.category}
                className="h-[320px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#054374]/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${activeCategory.slug}/${item.slug}`}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-[#054374]/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#054374] group-hover:text-[#cd9429] transition">
                  {item.name}
                </h3>
                <span className="text-[#cd9429] text-sm font-semibold">Premium</span>
              </div>
              <p className="text-slate-900 text-sm mb-4 font-medium">
                Learn more about our {item.name.toLowerCase()} service and tailored guidance.
              </p>
              <div className="inline-flex items-center text-[#054374] font-bold group-hover:text-[#cd9429] transition">
                Explore Service
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
