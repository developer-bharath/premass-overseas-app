/*
=====================================================
PREMASS OVERSEAS – PROFESSIONAL FOOTER
=====================================================
Includes:
- Brand trust section
- Quick links
- Services
- Locations
- Copyright
=====================================================
*/

export default function Footer() {
  return (
    <>
      {/* ================= FOOTER WRAPPER ================= */}
      <footer className="bg-[#0A2540] text-gray-300 pt-16">

        {/* ================= FOOTER GRID ================= */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* ================= BRAND & TRUST ================= */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Premass Overseas
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Trusted overseas education consultants guiding students towards
              global admissions, visas, and career success with transparency
              and expertise.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 space-y-2 text-sm">
              <p>✔ 100% Transparent Process</p>
              <p>✔ Certified Counsellors</p>
              <p>✔ End-to-End Student Support</p>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-[#F59E0B] transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#F59E0B] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-[#F59E0B] transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#F59E0B] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Study Abroad Counselling</li>
              <li>University Admissions</li>
              <li>Visa Guidance</li>
              <li>Career Counselling</li>
              <li>Test Preparation</li>
            </ul>
          </div>

          {/* ================= LOCATIONS ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Our Locations
            </h4>
            <ul className="space-y-3 text-sm">
              <li>🇮🇳 India</li>
              <li>🇬🇧 United Kingdom</li>
              <li>🇺🇸 United States</li>
              <li>🇨🇦 Canada</li>
              <li>🌍 Global Online Support</li>
            </ul>

            {/* CTA */}
            <a
              href="/contact"
              className="inline-block mt-6 bg-[#0B5ED7] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Free Consultation
            </a>
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="border-t border-gray-700 mt-12 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Premass Overseas Services Pvt Ltd.  
          All rights reserved.
        </div>
      </footer>
    </>
  );
}
