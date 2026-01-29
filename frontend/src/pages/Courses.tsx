import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, ShieldCheck, Briefcase, CheckCircle, ClipboardText, ListChecks } from "phosphor-react";
import { IMAGES } from "../data/images";

const courseSections = [
  {
    title: "UG Programs",
    icon: <GraduationCap weight="duotone" />,
    items: ["Business & Management", "Engineering & Technology", "Arts & Humanities", "Science & Computing"],
  },
  {
    title: "PG Programs",
    icon: <BookOpen weight="duotone" />,
    items: ["MBA & Management", "Data Science & AI", "Engineering & Architecture", "Public Health"],
  },
  {
    title: "MBBS",
    icon: <ShieldCheck weight="duotone" />,
    items: ["EU Medical Programs", "UK Medical Pathways", "Australia Graduate Medicine", "Global Pre-Med Routes"],
  },
  {
    title: "Diploma / Pathway",
    icon: <Briefcase weight="duotone" />,
    items: ["Foundation programs", "Credit transfer options", "One-year diplomas", "Language pathways"],
  },
];

const courseHighlights = [
  "Course mapping aligned to career outcomes",
  "Shortlisting based on rankings, budget, and intake",
  "Eligibility checks and documentation review",
  "Scholarship and fee waiver screening",
];

const admissionRequirements = [
  "Academic transcripts with required GPA",
  "English test scores (IELTS/TOEFL/PTE)",
  "SOP, CV, and academic references",
  "Work experience for select programs",
];

const timelineSteps = [
  "Shortlist programs and destinations",
  "Prepare SOP/LORs and finalize documents",
  "Submit applications and track offers",
  "Confirm offer and prepare visa file",
];

export default function Courses() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="tag">Courses</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
              Explore academic pathways across global universities.
            </h1>
            <p className="mt-5 text-lg text-[#5b6472] max-w-3xl">
              Choose from undergraduate, postgraduate, medical, and pathway programs with structured guidance.
            </p>
          </div>
          <div className="card overflow-hidden">
            <img
              src={IMAGES.home.services.counselling}
              alt="Academic pathways"
              className="h-56 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {courseSections.map((section) => (
            <div key={section.title} className="card p-6">
              <div className="card-icon">{section.icon}</div>
              <h3 className="text-lg font-semibold text-[#054374]">{section.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#cd9429]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1fr] gap-8">
          <div className="card p-6">
            <div className="card-icon">
              <BookOpen weight="duotone" />
            </div>
            <h2 className="text-2xl font-semibold text-[#054374]">Popular specializations</h2>
            <p className="mt-3 text-sm text-[#5b6472]">
              Industry-aligned domains with strong international demand.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-[#5b6472]">
              {[
                "Data Science & AI",
                "Business Analytics",
                "Cybersecurity",
                "Finance & Accounting",
                "Healthcare Management",
                "Supply Chain & Logistics",
                "Engineering Management",
                "Public Health",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-[#cd9429]">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <ClipboardText weight="duotone" />
            </div>
            <h2 className="text-2xl font-semibold text-[#054374]">Admission requirements</h2>
            <p className="mt-3 text-sm text-[#5b6472]">
              Core documentation and eligibility standards for most programs.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#5b6472]">
              {admissionRequirements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#cd9429]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1fr] gap-8">
          <div className="card p-6">
            <div className="card-icon">
              <ShieldCheck weight="duotone" />
            </div>
            <h2 className="text-2xl font-semibold text-[#054374]">How we help with courses</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#5b6472]">
              {courseHighlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle size={18} weight="regular" className="text-[#cd9429]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="card-icon">
              <ListChecks weight="duotone" />
            </div>
            <h2 className="text-2xl font-semibold text-[#054374]">Application timeline</h2>
            <p className="mt-3 text-sm text-[#5b6472]">
              A structured plan to move from shortlisting to visa submission.
            </p>
            <ol className="mt-4 space-y-3 text-sm text-[#5b6472]">
              {timelineSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#054374]/10 text-[#054374] flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-[#054374]">Need help shortlisting courses?</h2>
          <p className="mt-4 text-[#5b6472]">
            Share your profile and we will recommend the right programs and universities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
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
