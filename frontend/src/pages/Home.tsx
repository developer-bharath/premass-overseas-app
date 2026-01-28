import { Link } from "react-router-dom";
import StatsSection from "../components/StatsSection";
import { services } from "../data/services";
import { IMAGES } from "../data/images";
import {
  Book,
  Clipboard,
  Globe,
  Shield,
  Users,
  TrendUp,
  ArrowRight,
  CheckCircle,
  Target,
} from "phosphor-react";

const serviceIcons: Record<string, JSX.Element> = {
  counselling: <Book size={28} weight="duotone" />,
  applications: <Clipboard size={28} weight="duotone" />,
  "test-prep": <Shield size={28} weight="duotone" />,
  visa: <Globe size={28} weight="duotone" />,
  "post-arrival": <Users size={28} weight="duotone" />,
  countries: <Globe size={28} weight="duotone" />,
};

const serviceImages: Record<string, string> = IMAGES.home.services;

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Trusted Partner for <br />
              <span className="text-[#cd9429]">
                Global Education
              </span>
            </h1>

            <p className="text-lg text-white/90 max-w-xl leading-relaxed mb-8">
              Expert counselling, visa guidance, and career-driven education planning for your international success.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-3 bg-[#cd9429] text-white rounded-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Free Consultation <ArrowRight size={20} weight="bold" />
              </Link>
              <Link to="/services" className="px-8 py-3 border-2 border-[#cd9429] text-[#cd9429] rounded-lg font-bold hover:bg-[#cd9429] hover:text-white transition-all duration-300">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative w-full h-96">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#cd9429]/30 via-white/10 to-[#054374]/30 blur-xl opacity-70"></div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={IMAGES.home.hero}
                  alt="Students planning overseas education"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#054374]/70 via-transparent to-[#cd9429]/40" />
                <div className="absolute bottom-6 left-6 bg-white/90 text-[#054374] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Trusted by global learners
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white">
        <StatsSection />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">Why Choose Premass Overseas</h2>
          <p className="text-center text-slate-900 max-w-3xl mx-auto mb-16">
            Ethical guidance, regulatory accuracy, and long-term student success.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {[ // attach images to each card
              {
                title: "Expert Counselling",
                subtitle: "Profile-first guidance built on outcomes",
                icon: <Target size={22} weight="duotone" />,
                bullets: [
                  "Personalized pathways for every student profile",
                  "Data-driven course and university recommendations",
                  "Dedicated counsellors with global expertise",
                ],
                img: IMAGES.home.whyChoose.counselling,
              },
              {
                title: "Accurate Documentation",
                subtitle: "Compliance and precision at every step",
                icon: <Clipboard size={22} weight="duotone" />,
                bullets: [
                  "Error-free SOP/LOR drafting and reviews",
                  "Visa-ready checklists and filing support",
                  "Country-specific compliance guidance",
                ],
                img: IMAGES.home.whyChoose.documentation,
              },
              {
                title: "Global Reach",
                subtitle: "Top destinations with verified partners",
                icon: <Globe size={22} weight="duotone" />,
                bullets: [
                  "UK, Europe, Canada, Australia, USA, and more",
                  "Scholarship and funding opportunity mapping",
                  "Local alumni and mentor connect",
                ],
                img: IMAGES.home.whyChoose.reach,
              },
              {
                title: "Career-Focused",
                subtitle: "Outcome-oriented planning",
                icon: <TrendUp size={22} weight="duotone" />,
                bullets: [
                  "Programs aligned to employability and PR pathways",
                  "Interview prep, mock visa, and job-readiness coaching",
                  "Post-arrival support for smooth settlement",
                ],
                img: IMAGES.home.whyChoose.career,
              },
            ].map((card, idx) => (
              <div key={idx} className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition group">
                <div className="h-36 w-full rounded-2xl overflow-hidden mb-5">
                  <img src={card.img} alt={card.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cd9429]/20 via-orange-500/10 to-[#cd9429]/5 text-[#cd9429] flex items-center justify-center group-hover:from-[#cd9429] group-hover:via-orange-500 group-hover:to-[#cd9429] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#cd9429]/30 transition-all duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#054374] group-hover:text-[#cd9429] transition">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-slate-900">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <CheckCircle size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">Our Core Services</h2>
          <p className="text-center text-slate-900 max-w-3xl mx-auto mb-16">
            End-to-end overseas education support at every stage of your journey.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((category) => (
              <div key={category.slug} className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="h-32 w-full rounded-2xl overflow-hidden mb-4">
                  <img
                    src={serviceImages[category.slug] || serviceImages.countries}
                    alt={category.category}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cd9429]/20 via-orange-500/10 to-[#cd9429]/5 flex items-center justify-center text-[#cd9429] text-3xl mb-3 group-hover:from-[#cd9429] group-hover:via-orange-500 group-hover:to-[#cd9429] group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#cd9429]/30 transition-all duration-300">{serviceIcons[category.slug] ?? <Globe size={32} weight="duotone" />}</div>
                <h3 className="text-xl font-bold text-[#054374] mb-3 group-hover:text-[#cd9429] transition">{category.category}</h3>
                <ul className="space-y-2 text-sm text-slate-900 mb-5">
                  {category.items.slice(0, 3).map((item) => (
                    <li key={item.slug} className="flex items-start gap-2 group/item">
                      <span className="text-[#cd9429] mt-1 group-hover/item:translate-x-1 transition-transform">→</span>
                      <span className="relative font-semibold">
                        {item.name}
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/item:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${category.slug}`} className="text-[#cd9429] font-bold hover:text-[#054374] inline-flex items-center gap-2 group/link">
                  View Services
                  <ArrowRight size={20} weight="bold" className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#cd9429] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Global Education Journey Today</h2>
          <p className="text-lg text-white/90 mb-8">Connect with our expert counsellors for personalized guidance.</p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-white text-[#054374] rounded-lg font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition">
            Get Your Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
