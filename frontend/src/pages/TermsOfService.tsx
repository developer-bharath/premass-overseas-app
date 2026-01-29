export default function TermsOfService() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Legal</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">Terms of Service</h1>
          <p className="mt-4 text-[#5b6472]">
            These terms govern the use of Premass Overseas services and website.
          </p>

          <div className="mt-8 space-y-6 text-sm text-[#5b6472] leading-relaxed">
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Services</h2>
              <p className="mt-2">
                We provide counselling and guidance services. Admissions outcomes depend on
                universities, visa authorities, and documentation accuracy.
              </p>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">User responsibilities</h2>
              <ul className="mt-3 space-y-2">
                <li>• Provide accurate and complete information.</li>
                <li>• Submit required documents on time.</li>
                <li>• Follow guidance for visa and application compliance.</li>
              </ul>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Limitation of liability</h2>
              <p className="mt-2">
                Premass Overseas is not responsible for decisions made by universities, embassies,
                or third-party service providers.
              </p>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Contact</h2>
              <p className="mt-2">
                Questions about these terms can be sent to{" "}
                <a className="text-[#cd9429] font-semibold" href="mailto:premass.overseas@gmail.com">
                  premass.overseas@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
