import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/services";
import { IMAGES } from "../data/images";
import {
  ArrowRight,
  GraduationCap,
  Users,
  Globe,
  CheckCircle,
  ShieldCheck,
  BookOpen,
  Briefcase,
} from "phosphor-react";

const destinations = [
  {
    name: "United Kingdom",
    slug: "uk",
    image: "https://images.unsplash.com/photo-1473959383414-b1c1e9b60441?w=1200&auto=format&fit=crop&q=80",
    note: "Top-ranked universities & post-study work",
  },
  {
    name: "United States",
    slug: "usa",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    note: "Diverse programs and world-class research",
  },
  {
    name: "Canada",
    slug: "canada",
    image: "https://images.unsplash.com/photo-1501769214405-5e86fb2f86b4?w=1200&auto=format&fit=crop&q=80",
    note: "Affordable education with PR pathways",
  },
  {
    name: "Australia",
    slug: "australia",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
    note: "High employability and global campuses",
  },
  {
    name: "Europe",
    slug: "europe",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80",
    note: "English-taught programs and low tuition",
  },
];

const whyChoose = [
  {
    title: "Profile-first counselling",
    description: "Personalized pathways built on academic profile, budget, and outcomes.",
    icon: <Users size={22} weight="regular" />,
  },
  {
    title: "Documentation accuracy",
    description: "SOP, LOR, and visa documentation with compliance-first checks.",
    icon: <ShieldCheck size={22} weight="regular" />,
  },
  {
    title: "University partnerships",
    description: "Access to verified institutions and scholarship guidance.",
    icon: <GraduationCap size={22} weight="regular" />,
  },
  {
    title: "Career-ready planning",
    description: "Course selection aligned to employability and post-study work.",
    icon: <Briefcase size={22} weight="regular" />,
  },
];

const processSteps = [
  "Profile evaluation and counselling",
  "Course and university shortlisting",
  "Documentation and application filing",
  "Offer management and financial planning",
  "Visa guidance and compliance checks",
  "Pre-departure briefing and arrival support",
];

const testimonials = [
  {
    name: "Aarav S.",
    program: "UK Business Analytics",
    quote: "Premass delivered clear guidance and a very professional process from start to visa.",
  },
  {
    name: "Meera K.",
    program: "Canada Computer Science",
    quote: "A dependable team with strong documentation support and transparent timelines.",
  },
  {
    name: "Ritvik P.",
    program: "Australia Engineering",
    quote: "Clean communication, structured planning, and steady updates throughout.",
  },
];

const partners = [
  "Global University Network",
  "International Admissions Council",
  "Study Abroad Alliance",
  "Campus Connect Partners",
  "Worldwide Education Trust",
  "Scholarship Link",
];

export default function Home() {
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/075d072a-d9b5-44f7-b442-81a05f18b0ef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "Home.tsx:110",
        message: "home-render",
        data: {
          heroImage: IMAGES.home.hero,
          destinationsCount: destinations.length,
          partnersCount: partners.length,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log
  }, []);
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag">Premass Overseas</span>
            <h1 className="mt-5 text-3xl md:text-5xl font-semibold text-[#054374] leading-tight">
              Overseas education consulting built for confident outcomes.
            </h1>
            <p className="mt-5 text-base md:text-lg text-[#5b6472] max-w-2xl">
              Premium guidance for course selection, applications, and visa success with a
              transparent, professional process at every step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/apply" className="btn-primary">
                Apply Now <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Free Counselling
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-[#5b6472]">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                Transparent counselling
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                Verified partners
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                Visa-ready support
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#054374]/10 via-white to-[#cd9429]/10 blur-xl" />
            <div className="relative rounded-[32px] overflow-hidden border border-[#e6e8ec] shadow-lg">
              <img
                src={IMAGES.home.hero}
                alt="Professional counselling session"
                className="h-[280px] md:h-[420px] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="section-title">Study destinations</h2>
              <p className="section-subtitle">
                Choose from leading global education hubs supported by expert counsellors.
              </p>
            </div>
            <Link to="/countries" className="btn-secondary">
              View All Destinations
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.slug} to={`/study/${dest.slug}`} className="card overflow-hidden hover:shadow-lg transition">
                <img src={dest.image} alt={dest.name} className="h-40 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#054374]">{dest.name}</h3>
                  <p className="mt-2 text-sm text-[#5b6472]">{dest.note}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[#cd9429] font-semibold">
                    Explore <ArrowRight size={16} weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">Why Premass Overseas</h2>
          <p className="section-subtitle text-center mx-auto">
            Professional, outcome-focused guidance backed by experienced counsellors.
          </p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="card p-6 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#054374]/10 text-[#054374] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#054374]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5b6472]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">Services overview</h2>
          <p className="section-subtitle text-center mx-auto">
            End-to-end support from counselling to visa success.
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((category) => (
              <div key={category.slug} className="card p-6">
                <div className="flex items-center gap-3 text-[#054374]">
                  <BookOpen size={22} weight="regular" />
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
                  {category.items.slice(0, 3).map((item) => (
                    <li key={item.slug} className="flex items-center gap-2">
                      <span className="text-[#cd9429]">•</span>
                      {item.name}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${category.slug}`} className="mt-5 inline-flex items-center gap-2 text-[#054374] font-semibold">
                  View details <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">Process timeline</h2>
          <p className="section-subtitle text-center mx-auto">
            A clear six-step journey to keep your application on track.
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <div key={step} className="card p-6">
                <div className="text-sm font-semibold text-[#cd9429]">Step {index + 1}</div>
                <h3 className="mt-3 text-lg font-semibold text-[#054374]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">Student testimonials</h2>
          <p className="section-subtitle text-center mx-auto">
            Trusted by students for structured guidance and transparency.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card p-6">
                <p className="text-sm text-[#5b6472]">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-[#054374]">{testimonial.name}</p>
                  <p className="text-xs text-[#5b6472]">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title text-center">University partners</h2>
          <p className="section-subtitle text-center mx-auto">
            Collaborations with trusted institutions and partner networks worldwide.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <div key={partner} className="card p-4 text-center text-xs text-[#5b6472]">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#054374] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to plan your overseas education journey?
          </h2>
          <p className="mt-4 text-white/80">
            Speak with our counsellors and get a personalized action plan today.
          </p>
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
