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

  const heroImage =
    IMAGES.home.services[activeCategory.slug as keyof typeof IMAGES.home.services] || IMAGES.home.hero;

  return (
    <section className="bg-white">
      <div className="bg-gradient-to-br from-[#054374] via-[#054374] to-[#0a3f5c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <nav className="text-sm text-white/70 mb-6 flex items-center gap-2">
            <Link to="/services" className="hover:text-white font-semibold">Services</Link>
            <span>/</span>
            <span className="text-white font-semibold">{activeCategory.category}</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
                Premium service category
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold mt-4">
                {activeCategory.category}
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Structured, outcome-focused services designed to guide students from shortlisting to visa success.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-accent">
                  Book Free Consultation →
                </Link>
                <Link to="/apply" className="btn-secondary">
                  Start Application
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/70">
                {["Compliance-led", "Expert-led", "Transparent", "End-to-end"].map((tag) => (
                  <div key={tag} className="rounded-lg bg-white/10 px-3 py-2 text-center">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-white/10 blur-xl" />
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={heroImage}
                  alt={activeCategory.category}
                  className="h-[320px] w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${activeCategory.slug}/${item.slug}`}
              className="group card p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#054374] group-hover:text-[#cd9429] transition">
                  {item.name}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#cd9429]/10 text-[#cd9429] font-semibold">
                  Premium
                </span>
              </div>
              <p className="mt-3 text-sm text-[#5b6472]">
                Custom guidance and deliverables for {item.name.toLowerCase()}.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-[#054374] font-semibold group-hover:text-[#cd9429] transition">
                View details <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
