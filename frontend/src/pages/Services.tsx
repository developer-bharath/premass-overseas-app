import { Link } from "react-router-dom";
import { services } from "../data/services";

import {
  GraduationCap,
  ClipboardCheck,
  Globe,
  Plane,
  Briefcase,
  Users,
  Code,
  MapPin,
} from "lucide-react";

/* =====================================================
   ICON MAP (SAME AS HOME)
===================================================== */
const serviceIcons: Record<string, JSX.Element> = {
  "pre-admission": <GraduationCap size={32} />,
  "admission-coaching": <ClipboardCheck size={32} />,
  "visa-immigration": <Globe size={32} />,
  "post-study": <Plane size={32} />,
  "career-services": <Briefcase size={32} />,
  settlement: <Users size={32} />,
};

export default function Services() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – SERVICES
      ================================================= */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
            Overseas Education & Immigration Services
          </h1>

          <p className="mt-6 max-w-3xl text-gray-200 leading-relaxed">
            Premass Overseas provides structured, transparent, and
            compliance-driven services covering overseas education,
            visa processing, career planning, and settlement support.
          </p>

        </div>
      </section>

      {/* =================================================
         SERVICES OVERVIEW – LIGHT GREY
      ================================================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h2 className="text-3xl font-bold text-center text-[#054374]">
            Our Service Categories
          </h2>

          <p className="mt-4 text-center max-w-3xl mx-auto text-gray-600">
            Each service category is designed to support students at
            a specific stage of their international education and
            career journey.
          </p>

          <div className="mt-20 grid md:grid-cols-3 gap-12">

            {services.map((category) => (
              <div
                key={category.slug}
                className="premium-service-card text-left"
              >

                <div className="service-icon mb-4">
                  {serviceIcons[category.slug]}
                </div>

                <h3 className="service-title mb-3">
                  {category.category}
                </h3>

                <ul className="space-y-2 text-sm text-slate-600">
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      {item.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    to={`/services/${category.slug}`}
                    className="service-view-btn"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =================================================
         FEATURED SERVICES – ALL 8 SERVICES
      ================================================= */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">
            Complete Service Portfolio
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our comprehensive range of services designed to support every stage of your educational and career journey
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Overseas Education', 
                icon: Globe, 
                color: 'blue',
                link: '/services/overseas-education',
                desc: 'Study abroad guidance & university selection'
              },
              { 
                title: 'Domestic Admission', 
                icon: GraduationCap, 
                color: 'amber',
                link: '/services/domestic-admission',
                desc: 'Indian college admissions & counseling'
              },
              { 
                title: 'Education Loan', 
                icon: Briefcase, 
                color: 'green',
                link: '/services/education-loan',
                desc: 'Financing options & loan processing'
              },
              { 
                title: 'Visa & Immigration', 
                icon: Plane, 
                color: 'purple',
                link: '/services/visa-immigration',
                desc: 'Student visa & immigration support'
              },
              { 
                title: 'Document Management', 
                icon: ClipboardCheck, 
                color: 'indigo',
                link: '/services/document-management',
                desc: 'Secure document storage & verification'
              },
              { 
                title: 'Career & Job Support', 
                icon: Briefcase, 
                color: 'cyan',
                link: '/services/career-job-support',
                desc: 'Resume, interviews & job placement'
              },
              { 
                title: 'IT Training', 
                icon: Code, 
                color: 'orange',
                link: '/services/it-training',
                desc: 'Industry-relevant IT skill courses'
              },
              { 
                title: 'Student Support & Settlement', 
                icon: MapPin, 
                color: 'rose',
                link: '/services/student-support-settlement',
                desc: 'Pre-departure to arrival support'
              },
            ].map((service) => {
              const colorClasses: Record<string, { gradient: string; button: string }> = {
                blue: { gradient: 'from-blue-100 to-blue-50', button: 'bg-blue-600 hover:bg-blue-700' },
                amber: { gradient: 'from-amber-100 to-amber-50', button: 'bg-amber-600 hover:bg-amber-700' },
                green: { gradient: 'from-green-100 to-green-50', button: 'bg-green-600 hover:bg-green-700' },
                purple: { gradient: 'from-purple-100 to-purple-50', button: 'bg-purple-600 hover:bg-purple-700' },
                indigo: { gradient: 'from-indigo-100 to-indigo-50', button: 'bg-indigo-600 hover:bg-indigo-700' },
                cyan: { gradient: 'from-cyan-100 to-cyan-50', button: 'bg-cyan-600 hover:bg-cyan-700' },
                orange: { gradient: 'from-orange-100 to-orange-50', button: 'bg-orange-600 hover:bg-orange-700' },
                rose: { gradient: 'from-rose-100 to-rose-50', button: 'bg-rose-600 hover:bg-rose-700' },
              };
              
              const colors = colorClasses[service.color];
              const IconComponent = service.icon;
              
              return (
                <Link 
                  key={service.link}
                  to={service.link}
                  className={`bg-gradient-to-br ${colors.gradient} p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1`}
                >
                  <div className={`${colors.button} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#054374] mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
         CTA – BRAND TINT
      ================================================= */}
      <section className="premium-services-section">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h2 className="text-3xl font-bold text-[#054374]">
            Not Sure Which Service You Need?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            Speak with our experienced consultants for personalised
            guidance based on your academic profile and career goals.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-premium">
              Book a Free Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
