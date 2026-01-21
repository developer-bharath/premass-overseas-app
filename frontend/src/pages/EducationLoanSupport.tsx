import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, Shield, TrendUp } from "phosphor-react";

export default function EducationLoanSupport() {
  const banks = [
    // Government Banks
    { name: "State Bank of India (SBI)", type: "Government", established: 1955 },
    { name: "Punjab National Bank (PNB)", type: "Government", established: 1894 },
    { name: "Bank of India", type: "Government", established: 1906 },
    { name: "Central Bank of India", type: "Government", established: 1911 },
    { name: "Indian Bank", type: "Government", established: 1907 },
    { name: "Union Bank of India", type: "Government", established: 1919 },
    { name: "Bank of Baroda", type: "Government", established: 1908 },
    { name: "Canara Bank", type: "Government", established: 1906 },
    { name: "Indian Overseas Bank", type: "Government", established: 1937 },
    { name: "IDBI Bank", type: "Government", established: 1964 },
    { name: "Syndicate Bank", type: "Government", established: 1925 },
    { name: "Vijaya Bank", type: "Government", established: 1931 },

    // Private Banks
    { name: "HDFC Bank", type: "Private", established: 1994 },
    { name: "ICICI Bank", type: "Private", established: 1994 },
    { name: "Axis Bank", type: "Private", established: 1994 },
    { name: "Kotak Mahindra Bank", type: "Private", established: 1985 },
    { name: "YES Bank", type: "Private", established: 2004 },
    { name: "Federal Bank", type: "Private", established: 1913 },
    { name: "IndusInd Bank", type: "Private", established: 1994 },
    { name: "RBL Bank", type: "Private", established: 2010 },
    { name: "IDFC FIRST Bank", type: "Private", established: 2018 },
    { name: "Bandhan Bank", type: "Private", established: 2015 },
    { name: "South Indian Bank", type: "Private", established: 1929 },
    { name: "Dhanlaxmi Bank", type: "Private", established: 1992 },
  ];

  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="bg-[#054374] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Education Loan Support
            </h1>
            <p className="text-lg text-gray-100 max-w-xl leading-relaxed mb-8">
              End-to-end loan assistance with ties to <span className="font-bold text-[#cd9429]">26 banks</span> across India. Fast-track approval, flexible terms, and embassy-ready documentation.
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3 bg-[#cd9429] text-white rounded-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span>Get Loan Guidance</span>
              <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-full h-80 rounded-3xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <CreditCard size={120} weight="duotone" className="text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* LOAN TYPES */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">Loan Options We Support</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Choose the right loan type based on your financial profile, destination, and timeline.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Secured Education Loans",
                icon: <Shield size={28} weight="duotone" />,
                features: [
                  "Collateral: Property, Fixed Deposits, Securities",
                  "Lower Interest Rates: 6.5% - 9.5% p.a.",
                  "Higher Loan Amount: Up to ₹50-100 lakhs",
                  "Longer Repayment: 10-15 years tenure",
                  "Better for: Higher studies, longer programs",
                ],
              },
              {
                title: "Unsecured Education Loans",
                icon: <TrendUp size={28} weight="duotone" />,
                features: [
                  "No Collateral Required: Based on profile & offer",
                  "Faster Processing: Quick approval & disbursement",
                  "Higher Interest Rates: 9% - 14% p.a.",
                  "Lower Loan Ceiling: Up to ₹20-30 lakhs",
                  "Best for: Quick approval, lower amounts",
                ],
              },
            ].map((loanType, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cd9429] via-orange-500 to-[#cd9429] text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#cd9429]/40 transition-all duration-300">
                  {loanType.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#054374] mb-4">{loanType.title}</h3>
                <ul className="space-y-3">
                  {loanType.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">What We Provide</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Comprehensive loan assistance from selection to disbursement.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bank Selection & Shortlisting",
                points: [
                  "Profile analysis based on destination, amount, timeline",
                  "Match you with the best banks for your profile",
                  "Compare interest rates, processing fees, and terms",
                  "Advice on loan types (secured vs unsecured)",
                ],
              },
              {
                title: "Application & Documentation",
                points: [
                  "Complete KYC (Know Your Customer) preparation",
                  "Organize academic documents (mark sheets, certificates)",
                  "Income proof & financial statement compilation",
                  "Co-applicant documentation & guarantor support",
                ],
              },
              {
                title: "Sanction & Approval",
                points: [
                  "Fast-track processing aligned to visa timelines",
                  "Sanction letters mapping to offer letter amounts",
                  "Coordinate with bank for quick approval",
                  "Handle post-sanction formalities and NOCs",
                ],
              },
              {
                title: "Disbursement Planning",
                points: [
                  "Schedule disbursement with semester fee payments",
                  "Direct university transfers where applicable",
                  "Multiple disbursement tranches for long programs",
                  "Ensure funds are embassy-compliant for visa",
                ],
              },
              {
                title: "Embassy-Ready Documentation",
                points: [
                  "Funds certificate in prescribed formats",
                  "Disbursement schedule as per visa requirements",
                  "Insurance & floating rate documents",
                  "Affidavit of financial support preparation",
                ],
              },
              {
                title: "Repayment Guidance",
                points: [
                  "Post-arrival moratorium period explanation (6-12 months)",
                  "EMI calculation and budget planning",
                  "Part-time work & income offset strategies",
                  "Repayment schedule optimization",
                ],
              },
            ].map((service, idx) => (
              <div key={idx} className="p-8 bg-[#F4F6FB] rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition">
                <h3 className="text-xl font-bold text-[#054374] mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-[#cd9429] font-bold">→</span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANK PARTNERSHIPS */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">
            Our Bank Network: 26+ Partner Banks
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            We have partnerships with leading government and private banks across India, ensuring you get the best loan options.
          </p>

          {/* Bank Count Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="p-8 bg-white rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition">
              <h3 className="text-5xl font-bold text-[#cd9429] mb-2">26</h3>
              <p className="text-lg font-semibold text-[#054374]">Total Partner Banks</p>
              <p className="text-gray-600 text-sm">Government & Private Combined</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition">
              <h3 className="text-5xl font-bold text-[#054374] mb-2">12</h3>
              <p className="text-lg font-semibold text-[#054374]">Government Banks</p>
              <p className="text-gray-600 text-sm">Nationalized & Public Sector</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition">
              <h3 className="text-5xl font-bold text-[#054374] mb-2">14</h3>
              <p className="text-lg font-semibold text-[#054374]">Private Banks</p>
              <p className="text-gray-600 text-sm">Major & Emerging Players</p>
            </div>
          </div>

          {/* Bank List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banks.map((bank, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 transition hover:shadow-lg hover:-translate-y-1 ${bank.type === "Government"
                  ? "bg-blue-50 border-blue-200 hover:border-blue-400"
                  : "bg-orange-50 border-orange-200 hover:border-orange-400"
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-bold text-sm ${bank.type === "Government" ? "text-blue-900" : "text-orange-900"}`}>
                    {bank.name}
                  </h4>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${bank.type === "Government"
                      ? "bg-blue-200 text-blue-900"
                      : "bg-orange-200 text-orange-900"
                      }`}
                  >
                    {bank.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Est. {bank.established}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-700 text-lg mb-6">
              Don't see your preferred bank? <span className="font-bold text-[#054374]">Contact us</span> - we can work with additional banks based on your needs.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#F4F6FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-4">Our Loan Process</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            From consultation to disbursement - a smooth, streamlined journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: 1,
                title: "Initial Consultation",
                desc: "Understand your financial needs, destination, and loan amount required.",
              },
              {
                num: 2,
                title: "Bank Matching",
                desc: "Shortlist suitable banks based on your profile, collateral, and timeline.",
              },
              {
                num: 3,
                title: "Document Preparation",
                desc: "Organize and prepare all required documents for bank submission.",
              },
              {
                num: 4,
                title: "Approval & Disbursement",
                desc: "Track application, get approval, and ensure timely fund disbursement.",
              },
            ].map((step) => (
              <div key={step.num} className="relative">
                {step.num < 4 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[90%] h-0.5 bg-gradient-to-r from-[#cd9429] to-transparent" />
                )}

                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#cd9429] text-white flex items-center justify-center text-3xl font-bold shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                      {step.num}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <h3 className="text-xl font-bold text-[#054374] mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#054374] mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "What is the maximum loan amount I can get?",
                a: "It depends on your destination, course, and collateral. Secured loans can go up to ₹50-100 lakhs, while unsecured loans typically range from ₹10-30 lakhs. We help determine the best amount for your needs.",
              },
              {
                q: "How long does the approval process take?",
                a: "For secured loans: 15-30 days. For unsecured loans: 7-14 days. We expedite the process to align with your visa timeline.",
              },
              {
                q: "Do I need collateral for an education loan?",
                a: "Not always. Unsecured loans are available based on your academic profile, offer letter, and family income. Secured loans with collateral offer lower interest rates.",
              },
              {
                q: "What documents do I need?",
                a: "Academic documents (mark sheets, certificates), offer letter/CAS/COE, income proof (ITR/salary slips), bank statements, and admission documents. We provide a complete checklist.",
              },
              {
                q: "Can I get the loan disbursed directly to the university?",
                a: "Yes. We coordinate with banks to ensure direct disbursement to universities where applicable. For other cases, funds are transferred to your account and then to the university.",
              },
              {
                q: "What is the repayment moratorium period?",
                a: "Most banks offer 6-12 months moratorium after course completion before repayment begins. Some banks offer EMI holidays during studies or placement period.",
              },
              {
                q: "Can I prepay the loan without penalty?",
                a: "Yes. Most banks allow part or full prepayment without penalty on education loans. We'll ensure you choose banks with flexible prepayment terms.",
              },
              {
                q: "What if my application is rejected by one bank?",
                a: "We don't rely on a single bank. We shortlist multiple banks and submit applications strategically to maximize approval chances. If rejected, we'll approach another suitable bank.",
              },
            ].map((item, i) => (
              <details key={i} className="p-6 bg-[#F4F6FB] rounded-2xl border border-gray-100 hover:shadow-md transition group">
                <summary className="font-bold text-[#054374] cursor-pointer flex items-center justify-between">
                  <span className="relative">{item.q}</span>
                  <span className="text-[#cd9429]">▾</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#cd9429] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Get Expert Loan Guidance Today</h2>
          <p className="text-lg text-white/90 mb-8">
            Connect with our loan specialists to find the best education loan option for your study abroad plans.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[#054374] rounded-lg font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition"
          >
            <span>Schedule Free Consultation</span>
            <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
