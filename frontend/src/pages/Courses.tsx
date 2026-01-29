import { GraduationCap, BookOpen, Certificate, Stethoscope } from "phosphor-react";
import { IMAGES } from "../data/images";

const courseSections = [
  {
    title: "UG Programs",
    icon: <GraduationCap size={22} weight="regular" />,
    items: ["Business & Management", "Engineering & Technology", "Arts & Humanities", "Science & Computing"],
  },
  {
    title: "PG Programs",
    icon: <BookOpen size={22} weight="regular" />,
    items: ["MBA & Management", "Data Science & AI", "Engineering & Architecture", "Public Health"],
  },
  {
    title: "MBBS",
    icon: <Stethoscope size={22} weight="regular" />,
    items: ["EU Medical Programs", "UK Medical Pathways", "Australia Graduate Medicine", "Global Pre-Med Routes"],
  },
  {
    title: "Diploma / Pathway",
    icon: <Certificate size={22} weight="regular" />,
    items: ["Foundation programs", "Credit transfer options", "One-year diplomas", "Language pathways"],
  },
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
              <div className="flex items-center gap-3 text-[#054374]">
                {section.icon}
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
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
    </main>
  );
}
