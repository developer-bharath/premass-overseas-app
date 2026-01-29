import { Link } from "react-router-dom";
import { LinkedinLogo, InstagramLogo, FacebookLogo, YoutubeLogo, Phone, Envelope, MapPin } from "phosphor-react";
import { STUDY_COUNTRIES } from "../data/studyAbroad";
import logo from "../logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#054374] text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COMPANY INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-md overflow-hidden">
                <img src={logo} alt="Premass Overseas" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Premass Overseas</h3>
                <p className="text-xs text-gray-300">Education Consultancy</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Professional guidance for global education, built on clarity, compliance, and results.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]">
                <LinkedinLogo size={24} weight="duotone" />
              </a>
              <a href="https://instagram.com" className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]">
                <InstagramLogo size={24} weight="duotone" />
              </a>
              <a href="https://facebook.com" className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]">
                <FacebookLogo size={24} weight="duotone" />
              </a>
              <a href="https://youtube.com" className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]">
                <YoutubeLogo size={24} weight="duotone" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#cd9429]">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink to="/" label="Home" /></li>
              <li><FooterLink to="/about" label="About Us" /></li>
              <li><FooterLink to="/courses" label="Courses" /></li>
              <li><FooterLink to="/services" label="Services" /></li>
              <li><FooterLink to="/contact" label="Contact Us" /></li>
              <li><FooterLink to="/apply" label="Apply Now" /></li>
            </ul>
          </div>

          {/* STUDY DESTINATIONS */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#cd9429]">Study Destinations</h3>
            <ul className="space-y-3 text-sm">
              {STUDY_COUNTRIES.map((country) => (
                <li key={country.slug}>
                  <FooterLink to={`/study/${country.slug}`} label={country.name.replace("Study in ", "")} />
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#cd9429]">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-300">+91 89777 08366</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Envelope size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-300">premass.overseas@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={20} weight="duotone" className="text-[#cd9429] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-300">Hyderabad, Telangana, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-300">
          <p className="font-medium">© 2026 Premass Overseas. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <FooterLink to="#" label="Privacy Policy" />
            <FooterLink to="#" label="Terms of Service" />
            <FooterLink to="#" label="Cookie Policy" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 hover:text-[#cd9429] transition-all">
      <span className="text-[#cd9429] group-hover:translate-x-1 transition-transform">→</span>
      <span className="relative font-semibold">
        {label}
        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
      </span>
    </Link>
  );
}
