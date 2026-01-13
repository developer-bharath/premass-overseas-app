import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="text-slate-800">

      {/* =================================================
         HERO – IMAGE + AUTHORITY
      ================================================= */}
      <section className="bg-[#0A3A5E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About Premass Overseas
            </h1>

            <p className="mt-6 text-gray-200 leading-relaxed max-w-xl">
              A trusted overseas education and immigration consultancy
              focused on ethical guidance, regulatory compliance, and
              long-term career success.
            </p>

            <div className="mt-8">
              <Link to="/contact" className="btn-premium">
                Speak With an Expert
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="hidden md:block">
            <div className="h-96 rounded-3xl bg-white/10 flex items-center justify-center text-gray-200">
              Team / Office / Students Image
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
         WHO WE ARE – IMAGE FIRST
      ================================================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <div className="h-80 rounded-2xl bg-slate-100 flex items-center justify-center text-gray-500">
            Counselling Session Visual
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A5E]">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed">
              Premass Overseas is a professional consultancy supporting
              students who plan to study, work, or settle abroad.
              Our guidance is based on realistic assessment, compliance,
              and long-term outcomes.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              We do not believe in shortcuts or false promises. Our role
              is to help students make informed decisions.
            </p>
          </div>

        </div>
      </section>

      {/* =================================================
         OUR APPROACH – CARD BASED
      ================================================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h2 className="text-2xl font-bold text-center text-[#0A3A5E]">
            Our Approach
          </h2>

          <p className="mt-4 text-center max-w-2xl mx-auto text-gray-600">
            A structured, transparent process designed to reduce risk
            and improve success rates.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">

            <div className="premium-card">
              <h3 className="font-semibold text-lg text-[#0A3A5E]">
                Profile Assessment
              </h3>
              <p className="mt-3 text-gray-600">
                Academic background, finances, career goals, and
                eligibility are evaluated in detail.
              </p>
            </div>

            <div className="premium-card">
              <h3 className="font-semibold text-lg text-[#0A3A5E]">
                Compliance First
              </h3>
              <p className="mt-3 text-gray-600">
                Every recommendation follows current university and
                visa regulations.
              </p>
            </div>

            <div className="premium-card">
              <h3 className="font-semibold text-lg text-[#0A3A5E]">
                End-to-End Support
              </h3>
              <p className="mt-3 text-gray-600">
                From counselling to post-study and settlement guidance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
         WHY STUDENTS TRUST US – BRAND TINT + CARDS
      ================================================= */}
      <section className="premium-services-section">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <h2 className="text-2xl font-bold text-center text-[#0A3A5E]">
            Why Students Trust Premass Overseas
          </h2>

          <div className="mt-16 grid md:grid-cols-4 gap-10">

            <div className="premium-card text-center">
              <h3 className="font-semibold">
                Ethical Guidance
              </h3>
              <p className="mt-3 text-gray-600">
                Honest advice aligned with eligibility and goals.
              </p>
            </div>

            <div className="premium-card text-center">
              <h3 className="font-semibold">
                Accurate Documentation
              </h3>
              <p className="mt-3 text-gray-600">
                Attention to detail at every stage.
              </p>
            </div>

            <div className="premium-card text-center">
              <h3 className="font-semibold">
                Country Expertise
              </h3>
              <p className="mt-3 text-gray-600">
                UK, Europe, Canada, Australia, and more.
              </p>
            </div>

            <div className="premium-card text-center">
              <h3 className="font-semibold">
                Career Focus
              </h3>
              <p className="mt-3 text-gray-600">
                Decisions aligned with long-term outcomes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
         FINAL CTA – STRONG CLOSE
      ================================================= */}
      <section className="bg-[#0A3A5E] text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">

          <h2 className="text-3xl font-bold">
            Build Your International Future With Confidence
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-200">
            Speak with our consultants for transparent,
            professional overseas education guidance.
          </p>

          <div className="mt-10">
            <Link to="/contact" className="btn-premium">
              Book a Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
