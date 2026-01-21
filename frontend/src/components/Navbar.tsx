import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { services } from "../data/services";
import { COUNTRIES_MENU } from "../data/images";
import { ICONS } from "../data/icons";
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "phosphor-react";

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  Ireland: "🇮🇪",
  Netherlands: "🇳🇱",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setIsCountriesOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target as Node)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Caret = ICONS.caret;
  const Arrow = ICONS.arrow;

  return (
    <>
      {/* MODERN NAVBAR – NO TOP BAR */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-2xl" : "shadow-lg"} bg-gradient-to-r from-[#054374] via-[#054374] to-[#0a3f5c] backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 text-white">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#cd9429] to-orange-500 text-[#054374] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-2xl group-hover:shadow-[#cd9429] transition-all duration-300">P</div>
              <div className="hidden sm:block leading-tight">
                <p className="text-lg font-bold">Premass</p>
                <p className="text-xs text-blue-100 font-medium">Overseas Education</p>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" label="Home" />

              {/* ABOUT DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button className="px-4 py-2 font-bold flex items-center gap-1 hover:text-[#cd9429] transition relative group">
                  About
                  <Caret size={14} weight="bold" className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </button>

                {isAboutOpen && (
                  <div ref={aboutDropdownRef} className="absolute left-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-2xl border border-gray-200 py-2">
                    <Link
                      to="/about"
                      className="block px-4 py-2 hover:bg-[#F4F6FB] transition text-sm font-semibold text-[#054374] group relative"
                    >
                      <span className="relative">About Premass Overseas<span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" /></span>
                    </Link>
                    <Link
                      to="/education-loan-support"
                      className="block px-4 py-2 hover:bg-[#F4F6FB] transition text-sm font-semibold text-[#054374] group relative"
                    >
                      <span className="relative">Education Loan Support<span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" /></span>
                    </Link>
                  </div>
                )}
              </div>

              {/* COUNTRIES MENU */}
              <div
                className="relative"
                onMouseEnter={() => setIsCountriesOpen(true)}
                onMouseLeave={() => setIsCountriesOpen(false)}
              >
                <button className="px-4 py-2 font-bold flex items-center gap-1 hover:text-[#cd9429] transition relative group">
                  Countries
                  <Caret size={14} weight="bold" className={`transition-transform ${isCountriesOpen ? "rotate-180" : ""}`} />
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </button>

                {isCountriesOpen && (
                  <div ref={countryDropdownRef} className="absolute left-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-gray-200 py-3">
                    <div className="flex flex-col">
                      {COUNTRIES_MENU.map((c) => (
                        <Link
                          key={c.path}
                          to={c.path}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-[#F4F6FB] transition text-sm font-semibold text-[#054374]"
                        >
                          <span className="text-lg">{COUNTRY_FLAGS[c.label] ?? "🌍"}</span>
                          <span>Study in {c.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200 text-center">
                      <Link
                        to="/countries"
                        className="inline-flex items-center gap-1 px-4 py-2 text-[#cd9429] font-bold hover:text-[#054374] transition"
                      >
                        View all countries <Arrow size={16} weight="bold" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* SERVICES MEGA MENU */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="px-4 py-2 font-bold flex items-center gap-1 hover:text-[#cd9429] transition relative group">
                  Services
                  <Caret size={14} weight="bold" className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </button>

                {isServicesOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-[900px] bg-gradient-to-br from-white via-gray-50 to-blue-50 text-slate-800 rounded-xl shadow-2xl border border-gray-200 p-8 backdrop-blur-sm"
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {services.map((cat) => (
                        <div key={cat.slug} className="space-y-3">
                          <Link
                            to={`/services/${cat.slug}`}
                            className="block text-base font-bold text-[#054374] hover:text-[#cd9429] transition pb-2 border-b-2 border-gray-200"
                          >
                            {cat.category}
                          </Link>
                          <ul className="space-y-2">
                            {cat.items.map((item) => (
                              <li key={item.slug} className="group/item">
                                <Link
                                  to={`/services/${cat.slug}/${item.slug}`}
                                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#cd9429] transition-all py-1 relative"
                                >
                                  <Arrow size={14} weight="bold" className="text-[#cd9429] group-hover/item:translate-x-1 transition-transform" />
                                  <span className="relative">
                                    {item.name}
                                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover/item:scale-x-100 origin-left transition-transform duration-200" />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-300 text-center">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#cd9429] to-orange-600 text-white font-bold rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        View All Services <Arrow size={16} weight="bold" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/blog" label="Blog" />
              <NavLink to="/contact" label="Contact" />
            </div>

            {/* SOCIAL ICONS WITH PHOSPHOR DUOTONE GRADIENT */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]"
                  title="LinkedIn"
                >
                  <LinkedinLogo size={24} weight="duotone" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]"
                  title="Instagram"
                >
                  <InstagramLogo size={24} weight="duotone" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]"
                  title="Facebook"
                >
                  <FacebookLogo size={24} weight="duotone" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#cd9429] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(205,148,41,0.8)]"
                  title="YouTube"
                >
                  <YoutubeLogo size={24} weight="duotone" />
                </a>
              </div>

              {/* DIVIDER */}
              <div className="w-px h-6 bg-white/20"></div>

              {/* AUTH BUTTONS */}
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 font-bold text-white hover:text-[#cd9429] transition relative group"
                >
                  <span className="relative">
                    Login
                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#cd9429] to-orange-500 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-[#cd9429]/50 hover:-translate-y-0.5 transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">Register</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#cd9429] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="px-4 py-2 font-bold relative group">
      <span className="group-hover:text-[#cd9429] transition">{label}</span>
      <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
    </Link>
  );
}
