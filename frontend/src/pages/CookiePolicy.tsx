import { Cookie, ChartLine, Sliders } from "phosphor-react";

export default function CookiePolicy() {
  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Legal</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">Cookie Policy</h1>
          <p className="mt-4 text-[#5b6472]">
            This policy explains how cookies are used on the Premass Overseas website.
          </p>

          <div className="mt-8 space-y-6 text-sm text-[#5b6472] leading-relaxed">
            <section className="card p-6">
              <div className="card-icon">
                <Cookie weight="duotone" />
              </div>
              <h2 className="text-lg font-semibold text-[#054374]">What are cookies?</h2>
              <p className="mt-2">
                Cookies are small files stored on your device that help us improve your browsing
                experience and understand website usage.
              </p>
            </section>

            <section className="card p-6">
              <div className="card-icon">
                <ChartLine weight="duotone" />
              </div>
              <h2 className="text-lg font-semibold text-[#054374]">How we use cookies</h2>
              <ul className="mt-3 space-y-2">
                <li>• Remember your preferences and settings.</li>
                <li>• Analyze traffic and improve performance.</li>
                <li>• Provide secure browsing experiences.</li>
              </ul>
            </section>

            <section className="card p-6">
              <div className="card-icon">
                <Sliders weight="duotone" />
              </div>
              <h2 className="text-lg font-semibold text-[#054374]">Managing cookies</h2>
              <p className="mt-2">
                You can manage cookie preferences from your browser settings. Disabling cookies may
                affect site functionality.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
