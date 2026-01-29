import { Link } from "react-router-dom";
import { IMAGES } from "../data/images";
import { ArrowRight, CheckCircle, Users, Trophy, Briefcase, Globe } from "phosphor-react";

export default function About() {
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="tag">About Premass Overseas</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
              A professional consultancy built on clarity, compliance, and outcomes.
            </h1>
            <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">
              We guide students through global education with structured counselling, verified
              documentation processes, and a consistent, transparent journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Speak to an Expert <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#054374]/10 via-white to-[#cd9429]/10 blur-xl" />
            <div className="relative rounded-[32px] overflow-hidden border border-[#e6e8ec] shadow-lg">
              <img src={IMAGES.about.hero} alt="Premass Overseas" className="h-[360px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY INTRO */}
      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title">Company introduction</h2>
            <p className="section-subtitle">
              Premass Overseas is an outcome-focused consultancy helping students identify the
              right country, course, and institution while ensuring a compliant application journey.
            </p>
            <p className="mt-5 text-sm text-[#5b6472] leading-relaxed">
              Our team combines global admissions expertise with a process-driven approach to deliver
              dependable results for students and families.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Why we are different</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#5b6472]">
              {[
                "Clear counselling roadmaps with milestone tracking",
                "Strict document verification for error-free submissions",
                "Country-specific compliance and visa readiness",
                "Dedicated advisors throughout the application",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Vision</h3>
            <p className="mt-3 text-sm text-[#5b6472]">
              To become the most trusted overseas education partner for families seeking global
              academic success.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[#054374]">Mission</h3>
            <p className="mt-3 text-sm text-[#5b6472]">
              To deliver transparent, compliant, and personalized guidance that enables students to
              succeed at leading international institutions.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">Our expertise</h2>
          <p className="section-subtitle">
            Experience across leading destinations and structured application systems.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { icon: <Users size={22} weight="regular" />, title: "Counselling", text: "Profile-first assessment and shortlisting." },
              { icon: <Globe size={22} weight="regular" />, title: "Destination expertise", text: "UK, USA, Canada, Australia, Europe." },
              { icon: <Briefcase size={22} weight="regular" />, title: "Career outcomes", text: "Course planning aligned to employability." },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-[#054374]/10 text-[#054374] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#054374]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5b6472]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">Numbers that reflect trust</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Students counselled", value: "2,300+" },
              { label: "Global destinations", value: "25+" },
              { label: "Visa success rate", value: "98%" },
              { label: "Partner institutions", value: "120+" },
            ].map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <p className="text-2xl font-semibold text-[#054374]">{stat.value}</p>
                <p className="mt-2 text-xs text-[#5b6472] uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#054374] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Plan your overseas education journey with us.</h2>
          <p className="mt-4 text-white/80">Get a professional roadmap tailored to your profile.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-accent">
              Apply Now
            </Link>
            <Link to="/contact" className="btn-secondary">
              Free Counselling
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
