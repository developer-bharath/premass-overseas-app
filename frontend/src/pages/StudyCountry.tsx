import { Link, useParams } from "react-router-dom";
import {
  Globe,
  GraduationCap,
  Buildings,
  BookOpen,
  Calendar,
  CurrencyDollar,
  House,
  Briefcase,
  CheckCircle,
  FileText,
  Gift,
  Suitcase,
  ListChecks,
  Handshake,
} from "phosphor-react";
import { STUDY_COUNTRIES } from "../data/studyAbroad";

export default function StudyCountry() {
  const { country } = useParams();
  const data = STUDY_COUNTRIES.find((item) => item.slug === country);

  if (!data) {
    return (
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-semibold text-[#054374]">Country not found</h1>
          <p className="mt-3 text-[#5b6472]">Please choose a destination from our study abroad list.</p>
          <Link to="/countries" className="btn-secondary mt-6">
            Back to destinations
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="tag">Study Abroad</span>
            <div className="mt-5 flex items-center gap-3">
              <img src={data.flag} alt={`${data.name} flag`} className="h-8 w-8 rounded-full" />
              <h1 className="text-4xl md:text-5xl font-semibold text-[#054374]">
                {data.name.replace(/^Study in\s+/, "")}
              </h1>
            </div>
            <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">{data.summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Book Free Consultation
              </Link>
              <Link to="/apply" className="btn-secondary">
                Start Application
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#054374]/10 via-white to-[#cd9429]/10 blur-xl" />
            <div className="relative rounded-[32px] overflow-hidden border border-[#e6e8ec] shadow-lg">
              <img
                src={data.heroImage}
                alt={data.name}
                className="h-[360px] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">Country snapshot</h2>
          <p className="section-subtitle">Key facts and a quick overview to help you compare destinations.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.keyFacts.map((fact) => (
              <div key={fact.label} className="card p-5">
                <div className="card-icon">
                  <Globe weight="duotone" />
                </div>
                <p className="text-xs uppercase tracking-wide text-[#9aa1ab]">{fact.label}</p>
                <p className="mt-2 text-lg font-semibold text-[#054374]">{fact.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <div className="card-icon">
                <GraduationCap weight="duotone" />
              </div>
              <h2 className="text-xl font-semibold text-[#054374]">Why study here</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
                {data.whyStudy.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#cd9429]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="card-icon">
                <BookOpen weight="duotone" />
              </div>
              <h2 className="text-xl font-semibold text-[#054374]">Education system</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
                {data.educationSystem.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#cd9429]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="card-icon">
              <Buildings weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Top universities</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.topUniversities.map((uni) => (
                <li key={uni}>• {uni}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <BookOpen weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Popular courses</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.popularCourses.map((course) => (
                <li key={course}>• {course}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <Calendar weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Intakes</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.intakes.map((intake) => (
                <li key={intake}>• {intake}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="card-icon">
              <CurrencyDollar weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Cost of study</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.cost.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <House weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Living expenses</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.living.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <Briefcase weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Career opportunities</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.careers.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <div className="card-icon">
              <CheckCircle weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Eligibility checklist</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.eligibility.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <FileText weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Documents required</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.documents.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="card-icon">
              <Gift weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Scholarships & funding</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.scholarships.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <Suitcase weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Work rights</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.workRights.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <ListChecks weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold text-[#054374]">Application timeline</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {data.timeline.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card p-8">
            <div className="card-icon">
              <Handshake weight="duotone" />
            </div>
            <h3 className="text-xl font-semibold text-[#054374]">How Premass Overseas supports you</h3>
            <p className="mt-2 text-sm text-[#5b6472]">
              A full-service advisory model to keep your study abroad plan structured and compliant.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-[#5b6472]">
              {data.howWeHelp.map((line) => (
                <div key={line} className="flex gap-2">
                  <span className="text-[#cd9429]">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
              <Link to="/apply" className="btn-primary">
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#054374] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to begin your application?</h2>
          <p className="mt-4 text-white/80">Speak to a counsellor for a detailed roadmap.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Book Free Consultation
            </Link>
            <Link to="/apply" className="btn-secondary">
              Start Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
