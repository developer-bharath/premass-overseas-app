// =====================================================
// SERVICE CATEGORY PAGE
// Left Sticky Menu + Dynamic Content Area
// Menu stays fixed, only content changes
// =====================================================

import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";

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

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/services" className="hover:text-[#054374] font-semibold">Services</Link>
          <span>→</span>
          <span className="text-[#054374] font-bold">{activeCategory.category}</span>
        </nav>

        <h1 className="text-4xl font-bold text-[#054374] mb-4">{activeCategory.category}</h1>
        <p className="text-gray-600 mb-12 font-medium">Explore our specialized services in this category</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${activeCategory.slug}/${item.slug}`}
              className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-[#cd9429]"
            >
              <h3 className="text-xl font-bold text-[#054374] mb-2 group-hover:text-[#cd9429] transition">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4 font-medium">Learn more about our {item.name.toLowerCase()} service</p>
              <div className="flex items-center text-[#cd9429] font-bold group-hover:translate-x-2 transition-transform">
                Explore
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
