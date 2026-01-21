import { Link } from "react-router-dom";
import { IMAGES } from "../data/images";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Trophy,
  MapPin,
  Users
} from "phosphor-react";

export default function About() {
  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              About Premass Overseas
            </h1>
            <p className="text-lg text-gray-100 max-w-xl leading-relaxed">
              A premium overseas education consultancy focused on ethical guidance,
              regulatory accuracy, and long-term student success.
            </p>
            <div className="mt-8 flex gap-4">
              {/* Speak to an Expert – add underline + arrow slide */}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-[#cd9429] text-white rounded-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative">
                  Speak to an Expert
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-white/70 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </span>
                <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Explore Services – add underline + arrow slide */}
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-[#cd9429] text-[#cd9429] rounded-lg font-bold hover:bg-[#cd9429] hover:text-white transition-all duration-300"
              >
                <span className="relative">
                  Explore Services
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </span>
                <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-full h-80 rounded-3xl border-2 border-white/30 overflow-hidden">
              {IMAGES.about.hero ? (
                <img src={IMAGES.about.hero} alt="Premass Overseas" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 text-lg">
                  Add hero image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-[#054374] mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Premass Overseas was founded with a student-first vision: to simplify global education
              and deliver outcomes. We provide transparent counselling, accurate documentation,
              and country-specific visa support while aligning education choices with employability
              and migration pathways.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our counsellors bring decades of experience across the UK, Europe, Canada, Australia,
              and the USA. We partner with reputed institutions, maintain strict compliance,
              and ensure a smooth journey from application to arrival.
            </p>
          </div>
          <div className="bg-[#F4F6FB] rounded-2xl p-8 border border-gray-100">
            {IMAGES.about.story ? (
              <div className="h-40 w-full rounded-xl overflow-hidden mb-5">
                <img src={IMAGES.about.story} alt="Our Story" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-40 w-full rounded-xl mb-5 bg-white border border-dashed border-gray-300 text-gray-500 text-sm flex items-center justify-center">
                Add story image
              </div>
            )}
            <h3 className="text-2xl font-bold text-[#054374] mb-6">What Sets Us Apart</h3>
            <ul className="space-y-3">
              {[
                "Profile-first counselling with data-driven recommendations",
                "Error-free documentation and visa-ready checklists",
                "Scholarships, funding, and compliance guidance",
                "Outcome-oriented planning aligned to employability",
                "Post-arrival settlement and alumni support",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start group">
                  <CheckCircle size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                  <span className="relative font-medium text-gray-700">
                    {item}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">Our Values</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            We uphold ethical practices, transparent processes, and student success at every step.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={28} weight="duotone" className="text-[#cd9429]" />, title: "Student-First", desc: "Personalized pathways tailored to your goals." },
              { icon: <Trophy size={28} weight="duotone" className="text-[#cd9429]" />, title: "Excellence", desc: "Meticulous documentation and compliance." },
              { icon: <MapPin size={28} weight="duotone" className="text-[#cd9429]" />, title: "Global Reach", desc: "UK, Europe, Canada, Australia, USA, and more." },
              { icon: <CheckCircle size={28} weight="duotone" className="text-[#cd9429]" />, title: "Integrity", desc: "Transparent guidance with no hidden agendas." },
            ].map((card, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cd9429]/20 via-orange-500/10 to-[#cd9429]/5 flex items-center justify-center mb-4 group-hover:from-[#cd9429] group-hover:via-orange-500 group-hover:to-[#cd9429] group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#cd9429]/30 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#054374] mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>

                {/* Added animated CTA to match site-wide style */}
                <div className="mt-4">
                  <Link to="/services" className="group/cta inline-flex items-center gap-2 text-[#cd9429] font-bold hover:text-[#054374] transition">
                    <span className="relative">
                      Learn more
                      <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/cta:scale-x-100 origin-left transition-transform duration-200" />
                    </span>
                    <ArrowRight size={20} weight="bold" className="group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#054374] mb-4">Global Presence</h2>
          <p className="text-gray-700 mb-10">
            We guide students across top destinations with verified partner institutions and alumni networks.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["United Kingdom", "Europe (Germany, Ireland, Netherlands)", "Canada", "Australia"].map((country, i) => (
              <div key={i} className="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition">
                {IMAGES.about.countries[country as keyof typeof IMAGES.about.countries] ? (
                  <div className="h-32 w-full rounded-xl overflow-hidden mb-3">
                    <img
                      src={IMAGES.about.countries[country as keyof typeof IMAGES.about.countries]}
                      alt={country}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 w-full rounded-xl mb-3 bg-[#F4F6FB] border border-dashed border-gray-300 text-gray-500 text-sm flex items-center justify-center">
                    Add country image
                  </div>
                )}
                {/* Make title a link with underline + arrow */}
                <Link to="/services" className="group/title inline-flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-[#054374] group-hover/title:text-[#cd9429] transition relative">
                    {country}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/title:scale-x-100 origin-left transition-transform duration-200" />
                  </span>
                  <ArrowRight size={20} weight="bold" className="text-[#cd9429] group-hover/title:translate-x-1 transition-transform" />
                </Link>

                {/* Explore interaction (kept) */}
                <Link to="/services" className="group/explore inline-flex items-center gap-2 text-[#cd9429] font-bold hover:text-[#054374] transition">
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/explore:scale-x-100 origin-left transition-transform duration-200" />
                  </span>
                  <ArrowRight size={20} weight="bold" className="group-hover/explore:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-[#054374] mb-4">Our Approach</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
            Structured, outcome-oriented planning to ensure a smooth journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: 1,
                title: "Profile Assessment",
                desc: "Understand your academics, interests, budget, and goals.",
              },
              {
                num: 2,
                title: "Shortlisting & Documentation",
                desc: "Select courses/universities and prepare SOP/LOR/financials.",
              },
              {
                num: 3,
                title: "Applications & Visa",
                desc: "Submit error-free applications and assist with visa filing.",
              },
              {
                num: 4,
                title: "Post-Arrival Support",
                desc: "Accommodation, onboarding, and local alumni connect.",
              },
            ].map((step) => (
              <div key={step.num} className="relative">
                {/* Connector line (hidden on mobile, visible on lg+) */}
                {step.num < 4 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[90%] h-0.5 bg-gradient-to-r from-[#cd9429] to-transparent" />
                )}

                <div className="text-center">
                  {/* Numbered Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#cd9429] text-white flex items-center justify-center text-3xl font-bold shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                      {step.num}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <h3 className="text-xl font-bold text-[#054374] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#054374] mb-6">Accreditations & Partnerships</h2>
          <p className="text-gray-700 mb-8">
            We work with reputed institutions and follow strict compliance across destinations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["UCAS Guidance (UK)", "DAAD (Germany)", "IRCC (Canada)", "Subclass 500 (Australia)"].map((badge, i) => (
              <div key={i} className="bg-[#F4F6FB] p-6 rounded-2xl border border-gray-100 text-center hover:-translate-y-1 hover:shadow-md transition">
                <p className="font-bold text-[#054374]">{badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-10">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "Is the initial counselling free?",
                a: "Yes. We offer a free first consultation to assess your profile and discuss options.",
              },
              {
                q: "Do you help with scholarships?",
                a: "We map scholarship opportunities and guide on eligibility and documentation.",
              },
              {
                q: "Which countries do you support?",
                a: "UK, Europe, Canada, Australia, USA, and more with verified partners.",
              },
              {
                q: "Can I get post-arrival support?",
                a: "Yes. We assist with accommodation, onboarding, and alumni connect.",
              },
            ].map((item, i) => (
              <details key={i} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition group">
                <summary className="font-bold text-[#054374] cursor-pointer flex items-center justify-between">
                  <span className="relative">
                    {item.q}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-open:scale-x-100 origin-left transition-transform duration-200" />
                  </span>
                  <span className="text-[#cd9429]">▾</span>
                </summary>
                <p className="text-gray-700 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#cd9429] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-lg text-white/90 mb-8">
            Connect with our expert counsellors for a personalized plan.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[#054374] rounded-lg font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition"
          >
            <span className="relative">
              Get Free Consultation
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
            </span>
            <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ROADMAP – START TO ARRIVAL */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">
            Your Journey Roadmap
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            A clear, outcome-first path from profile assessment to post-arrival settlement.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: 1, t: "Profile & Goals", d: "Assess academics, budget, destination preferences, and outcomes." },
              { n: 2, t: "Shortlist & Docs", d: "Choose courses; prepare SOP/LOR, transcripts, and financials." },
              { n: 3, t: "Apply & Visa", d: "Submit applications, receive offers, and file visa with full compliance." },
              { n: 4, t: "Arrival & Settle", d: "Travel readiness, accommodation, onboarding, and alumni connect." },
            ].map((step) => (
              <div key={step.n} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition group/card">
                <div className="w-12 h-12 rounded-full bg-[#cd9429] text-white flex items-center justify-center font-bold text-lg mb-4">
                  {step.n}
                </div>
                {/* Add underline to card title */}
                <h3 className="text-xl font-bold text-[#054374] mb-2 relative inline-block">
                  {step.t}
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/card:scale-x-100 origin-left transition-transform duration-200" />
                </h3>
                <p className="text-gray-700">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION LOAN SUPPORT */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">
            Education Loan Support
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            End-to-end loan assistance—bank selection, sanction letters, disbursement scheduling, and embassy-ready documentation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secured vs Unsecured Loans",
                points: [
                  "Secured: Lower interest; property collateral",
                  "Unsecured: Faster; profile-based; higher interest",
                  "We shortlist options by destination and timelines",
                ],
              },
              {
                title: "Sanction & Disbursement",
                points: [
                  "Fast-track sanction aligned to offer/CAS/COE",
                  "Disbursement mapped to semester fee and visa needs",
                  "Country-specific financial formats provided",
                ],
              },
              {
                title: "Providers & Documents",
                points: [
                  "Tie-ups: Nationalized & private banks, NBFCs",
                  "Docs: KYC, academics, fee structure, income proof",
                  "Embassy-compliant funds letters & schedules",
                ],
              },
            ].map((card, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition">
                <div className="w-12 h-12 rounded-full bg-[#054374] text-white flex items-center justify-center mb-4">
                  <CreditCard size={28} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-[#054374] mb-3">{card.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  {card.points.map((p, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <CheckCircle size={20} weight="duotone" className="text-[#cd9429] mt-1" />
                      <span className="relative font-medium">
                        {p}
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 hover:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
