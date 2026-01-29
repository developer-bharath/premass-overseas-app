export default function PrivacyPolicy() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Legal</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">Privacy Policy</h1>
          <p className="mt-4 text-[#5b6472]">
            This Privacy Policy explains how Premass Overseas collects, uses, and protects your
            personal information.
          </p>

          <div className="mt-8 space-y-6 text-sm text-[#5b6472] leading-relaxed">
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Information we collect</h2>
              <p className="mt-2">
                We collect information you provide when you submit forms, request consultations,
                or communicate with our team. This may include your name, email, phone number, and
                academic background.
              </p>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">How we use your information</h2>
              <ul className="mt-3 space-y-2">
                <li>• Respond to enquiries and provide counselling.</li>
                <li>• Improve our services and internal processes.</li>
                <li>• Share application updates and guidance.</li>
              </ul>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Data protection</h2>
              <p className="mt-2">
                We implement reasonable safeguards to protect your data. Access is limited to
                authorized staff and trusted service providers.
              </p>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold text-[#054374]">Contact</h2>
              <p className="mt-2">
                For privacy-related questions, email{" "}
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
