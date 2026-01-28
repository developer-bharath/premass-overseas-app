import { Link } from "react-router-dom";
import { useState } from "react";
import { services } from "../data/services";
import { servicesDetails } from "../data/servicesDetails";
import { premiumIcons } from "../utils/premiumIcons";
import { IMAGES } from "../data/images";

export default function Services() {
  const categoryDescriptions: Record<string, string> = {
    counselling: "Expert guidance from certified counsellors to shape your future",
    applications: "Professional support for compelling applications and documentation",
    "test-prep": "Comprehensive coaching for all major English and standardized tests",
    visa: "Complete visa processing with 98% success rate guarantee",
    "post-arrival": "Seamless transition and settlement support abroad",
    countries: "Specialized expertise for your chosen destination"
  };

  const categoryIcons: Record<string, string> = {
    counselling: premiumIcons.career,
    applications: premiumIcons.sop,
    "test-prep": premiumIcons.ielts,
    visa: premiumIcons.visa,
    "post-arrival": premiumIcons.accommodation,
    countries: premiumIcons.usa
  };
  const fallbackIcon = premiumIcons.usa;

  const renderIcon = (slug: string) => categoryIcons[slug] ?? fallbackIcon;

  const scrollToCategory = (slug: string) => {
    const el = document.getElementById(`cat-${slug}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPageLinks = [
    { label: "What We Offer", target: "offer" },
    { label: "Why Choose Premass Overseas", target: "why" },
    { label: "Success Stories", target: "stories" }
  ];

  const sideGroups = services.map((group) => ({
    label: `${group.category} Services`,
    slug: group.slug,
    items: group.items.slice(0, 4).map((item) => item.name)
  }));

  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const toggleGroup = (slug: string) => {
    setExpandedGroup(expandedGroup === slug ? null : slug);
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HERO */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center mb-12">
          <div className="space-y-6" id="offer">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cd9429]/10 text-[#cd9429] text-sm font-semibold">
              Premium Overseas Education Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#054374]">
              Services designed for confident global outcomes
            </h1>
            <p className="text-lg text-slate-900 leading-relaxed max-w-2xl">
              Clear guidance, verified processes, and end-to-end support that aligns with your academic profile and career goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-7 py-3 rounded-lg bg-[#054374] text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Book Free Consultation
              </Link>
              <button
                type="button"
                onClick={() => scrollToTarget("why")}
                className="px-7 py-3 rounded-lg border border-[#054374] text-[#054374] font-semibold hover:bg-[#054374] hover:text-white transition"
              >
                Why Premass
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#cd9429]/20 via-white to-[#054374]/15 blur-xl opacity-80" />
            <div className="relative rounded-3xl overflow-hidden border border-[#054374]/10 shadow-2xl">
              <img
                src={IMAGES.home.hero}
                alt="Premium overseas education guidance"
                className="h-[340px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#054374]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-white/90 text-[#054374] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Trusted by 10,000+ students
              </div>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL BREADCRUMB HEADING */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-wrap justify-center items-center gap-2 text-sm font-semibold text-[#054374]">
          {["Services", "Counselling Services", "Course Selection"].map((label, i, arr) => (
            <span key={label} className="flex items-center gap-2">
              <span className="relative">
                {label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 hover:scale-x-100 origin-left transition-transform duration-200" />
              </span>
              {i < arr.length - 1 && <span className="text-[#cd9429]">/</span>}
            </span>
          ))}
        </div>

        {/* ON THIS PAGE */}
        <div className="max-w-5xl mx-auto mb-14 flex flex-wrap justify-center gap-4">
          {onPageLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollToTarget(link.target)}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#054374]/15 rounded-full text-[#054374] font-semibold shadow-sm hover:shadow-md transition"
            >
              <span className="relative">
                {link.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
              </span>
              <span className="text-[#cd9429] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ))}
        </div>

        {/* LAYOUT: SIDEBAR + CONTENT */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* SIDEBAR – collapsible menu */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-[#054374]/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-6 rounded-full bg-[#cd9429]" />
                <h3 className="text-lg font-extrabold tracking-wide text-[#054374]">
                  Browse Services
                </h3>
              </div>
              <ul className="space-y-3">
                {sideGroups.map((group) => (
                  <li key={group.slug}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.slug)}
                      className="group inline-flex items-center gap-2 text-[#054374] font-bold hover:text-[#cd9429] transition w-full"
                    >
                      <span className="relative flex-1 text-left">
                        {group.label}
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                      <span className={`text-[#cd9429] transition-transform ${expandedGroup === group.slug ? "rotate-90" : ""}`}>
                        →
                      </span>
                    </button>

                    {/* Collapsible sub-items */}
                    {expandedGroup === group.slug && (
                      <ul className="mt-3 pl-6 space-y-2 animate-fade-in">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link
                              to={`/services/${group.slug}`}
                              className="group/item inline-flex items-center gap-2 text-sm text-slate-900 hover:text-[#054374] transition"
                            >
                              <span className="relative font-semibold">
                                {item}
                                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/item:scale-x-100 origin-left transition-transform duration-200" />
                              </span>
                              <span className="text-[#cd9429] group-hover/item:translate-x-1 transition-transform">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            {/* Show detailed service info when selected */}
            {selectedService && servicesDetails[selectedService] ? (
              <ServiceDetailView service={servicesDetails[selectedService]} onClose={() => setSelectedService(null)} />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((category, idx) => (
                  <Link
                    key={category.slug}
                    to={`/services/${category.slug}`}
                    className="group h-full"
                    id={`cat-${category.slug}`}
                  >
                    <div
                      className={`h-full bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 ${idx % 2 === 0 ? "border-[#cd9429]/30" : "border-[#054374]/20"
                        }`}
                    >
                      {/* IMAGE */}
                      <div className="h-32 w-full rounded-2xl overflow-hidden mb-5">
                        <img
                          src={IMAGES.home.services[category.slug] || IMAGES.home.services.countries}
                          alt={category.category}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* ICON */}
                      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {renderIcon(category.slug)}
                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl font-bold text-[#054374] mb-3 group-hover:text-[#cd9429] transition duration-300 relative inline-block">
                        {category.category}
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-200" />
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-slate-900 mb-6 leading-relaxed">
                        {categoryDescriptions[category.slug]}
                      </p>

                      {/* SERVICES LIST */}
                      <div className="space-y-2 mb-6">
                        {category.items.slice(0, 3).map((item) => (
                          <div key={item.slug} className="flex items-center gap-2 text-sm text-slate-900 group/item">
                            <span className="text-[#cd9429] group-hover/item:translate-x-1 transition-transform">→</span>
                            <span className="relative font-semibold">
                              {item.name}
                              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/item:scale-x-100 origin-left transition-transform duration-200" />
                            </span>
                          </div>
                        ))}
                        {category.items.length > 3 && (
                          <p className="text-sm text-[#cd9429] font-bold pt-2">
                            + {category.items.length - 3} more services
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-[#054374] font-bold group-hover:text-[#cd9429] group-hover:translate-x-1 transition-all duration-300">
                        Explore Services
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WHY CHOOSE / SUCCESS STORIES placeholders for anchors */}
        <div id="why" className="mt-20" />
        <div id="stories" className="mt-10" />

        {/* CTA SECTION */}
        <div className="bg-gradient-to-r from-[#054374] via-[#054374]/90 to-[#cd9429] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with our expert counsellors for a personalized consultation.
            Your success is our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-[#054374] rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#054374] transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceDetailView({ service, onClose }: { service: typeof servicesDetails[string]; onClose: () => void }) {
  const scrollToTarget = (id: string) => {
    onClose(); // Close detail view first
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-5xl">{service.icon}</span>
          <h2 className="text-3xl font-bold text-[#054374]">{service.title}</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-[#054374] text-2xl">×</button>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <button
          onClick={() => scrollToTarget("offer")}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-[#054374] font-semibold shadow-sm hover:shadow-md transition"
        >
          <span className="relative">
            What We Offer
            <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
          </span>
          <span className="text-[#cd9429] group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button
          onClick={() => scrollToTarget("why")}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-[#054374] font-semibold shadow-sm hover:shadow-md transition"
        >
          <span className="relative">
            Why Choose Premass Overseas
            <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
          </span>
          <span className="text-[#cd9429] group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button
          onClick={() => scrollToTarget("stories")}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-[#054374] font-semibold shadow-sm hover:shadow-md transition"
        >
          <span className="relative">
            Success Stories
            <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
          </span>
          <span className="text-[#cd9429] group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8">{service.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#054374] mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#cd9429] rounded-full" />
            Key Benefits
          </h3>
          <ul className="space-y-2">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex gap-2 items-start text-sm">
                <span className="text-[#cd9429] mt-1">✓</span>
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#054374] mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#cd9429] rounded-full" />
            Process
          </h3>
          <ol className="space-y-2">
            {service.process.map((p, i) => (
              <li key={i} className="flex gap-2 items-start text-sm">
                <span className="font-bold text-[#cd9429]">{i + 1}.</span>
                <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-[#054374] mb-3">What's Included</h3>
        <div className="flex flex-wrap gap-2">
          {service.includes.map((item, i) => (
            <span key={i} className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-center justify-between p-6 bg-gradient-to-r from-[#054374] to-[#cd9429] rounded-xl text-white">
        <div>
          <p className="text-sm opacity-90">Duration</p>
          <p className="font-bold text-lg">{service.duration}</p>
        </div>
        <div>
          <p className="text-sm opacity-90">Pricing</p>
          <p className="font-bold text-lg">{service.price}</p>
        </div>
        <Link to="/contact" className="px-6 py-2 bg-white text-[#054374] rounded-lg font-bold hover:shadow-lg transition">
          Get Started →
        </Link>
      </div>
    </div>
  );
}
