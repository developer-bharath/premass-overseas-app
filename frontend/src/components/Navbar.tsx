import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { services } from "../data/services";
import { COUNTRIES_MENU } from "../data/images";
import { ICONS } from "../data/icons";
import { useAuth } from "../context/AuthContext";
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "phosphor-react";
import { List as MenuIcon, X as CloseIcon } from "phosphor-react";

// Premium country data with flag images and descriptions
const COUNTRY_DATA: Record<string, { flag: string; name: string; description: string; emoji: string }> = {
  USA: {
    flag: "/flags/usa.png",
    name: "United States",
    description: "Top-ranked universities & diverse programs",
    emoji: "🇺🇸"
  },
  UK: {
    flag: "/flags/uk.png",
    name: "United Kingdom",
    description: "World-class education & post-study work",
    emoji: "🇬🇧"
  },
  Canada: {
    flag: "/flags/canada.png",
    name: "Canada",
    description: "Affordable education & PR pathways",
    emoji: "🇨🇦"
  },
  Australia: {
    flag: "/flags/australia.png",
    name: "Australia",
    description: "High-quality universities & work rights",
    emoji: "🇦🇺"
  },
  Germany: {
    flag: "/flags/germany.png",
    name: "Germany",
    description: "Low tuition fees & strong engineering",
    emoji: "🇩🇪"
  },
  Ireland: {
    flag: "/flags/ireland.png",
    name: "Ireland",
    description: "Tech hub & welcoming culture",
    emoji: "🇮🇪"
  },
  Netherlands: {
    flag: "/flags/europe.png",
    name: "Netherlands",
    description: "English programs & innovation",
    emoji: "🇳🇱"
  },
};

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

            {/* NAV LINKS (Desktop) */}
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

              {/* COUNTRIES MENU - PREMIUM DESIGN */}
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
                  <div
                    ref={countryDropdownRef}
                    className="absolute left-0 mt-3 w-[480px] bg-gradient-to-br from-white via-gray-50 to-blue-50/30 text-slate-800 rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl overflow-hidden"
                    style={{
                      boxShadow: "0 20px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    {/* Premium Header */}
                    <div className="bg-gradient-to-r from-[#054374] to-[#0a3f5c] px-6 py-4 border-b border-white/10">
                      <h3 className="text-white font-bold text-lg mb-1">Study Destinations</h3>
                      <p className="text-blue-100 text-xs">Choose your preferred country</p>
                    </div>

                    {/* Countries Grid */}
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {COUNTRIES_MENU.map((c) => {
                        const country = COUNTRY_DATA[c.label] || { flag: "/flags/europe.png", name: c.label, description: "Study destination", emoji: "🌍" };
                        return (
                          <Link
                            key={c.path}
                            to={c.path}
                            className="group relative flex items-center gap-4 px-5 py-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-[#054374]/5 hover:to-[#cd9429]/5 border border-gray-200/50 hover:border-[#cd9429]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            {/* Beautiful Round Flag Icon */}
                            <div className="relative flex-shrink-0">
                              {/* Outer glow ring */}
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#cd9429]/30 via-[#054374]/20 to-[#cd9429]/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>

                              {/* Main flag container with beautiful styling */}
                              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/90 group-hover:ring-[#cd9429] shadow-xl group-hover:shadow-2xl group-hover:shadow-[#cd9429]/40 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                {/* Inner shadow for depth */}
                                <div className="absolute inset-0 rounded-full shadow-inner border-2 border-white/50"></div>
                                {/* Flag Image with beautiful effects */}
                                <img
                                  src={country.flag}
                                  alt={country.name}
                                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    // Show emoji fallback
                                    const parent = target.parentElement;
                                    if (parent) {
                                      let fallback = parent.querySelector('.flag-emoji-fallback') as HTMLElement;
                                      if (!fallback) {
                                        fallback = document.createElement('span');
                                        fallback.className = 'flag-emoji-fallback text-3xl absolute inset-0 flex items-center justify-center';
                                        fallback.textContent = country.emoji;
                                        parent.appendChild(fallback);
                                      } else {
                                        fallback.style.display = 'flex';
                                      }
                                    }
                                  }}
                                />

                                {/* Emoji fallback - hidden by default, shown on image error */}
                                <span className="flag-emoji-fallback text-3xl absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                                  {country.emoji}
                                </span>

                                {/* Shine overlay effect */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Animated border on hover */}
                                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#cd9429]/50 transition-all duration-300"></div>
                              </div>

                              {/* Pulsing glow effect on hover */}
                              <div className="absolute inset-0 rounded-full bg-[#cd9429]/30 scale-0 group-hover:scale-125 transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100 -z-10"></div>
                            </div>

                            {/* Country Info */}
                            <div className="flex-1 min-w-0 relative z-10">
                              <div className="font-bold text-base text-[#054374] group-hover:text-[#cd9429] transition-colors duration-200 truncate leading-tight">
                                {country.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 line-clamp-1 leading-tight">
                                {country.description}
                              </div>
                            </div>

                            {/* Arrow Icon */}
                            <Arrow
                              size={16}
                              weight="bold"
                              className="text-[#cd9429] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                            />

                            {/* Hover gradient overlay - lighter to not interfere with text */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#054374]/0 to-[#cd9429]/0 group-hover:from-[#054374]/3 group-hover:to-[#cd9429]/3 transition-all duration-300 pointer-events-none z-0"></div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Premium Footer CTA */}
                    <div className="px-4 pb-4 pt-2 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                      <Link
                        to="/countries"
                        className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-[#cd9429] to-orange-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#cd9429]/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="relative z-10">View All Countries</span>
                        <Arrow size={18} weight="bold" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#cd9429] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

              {/* AUTH BUTTONS / USER MENU */}
              <div className="flex items-center gap-3">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={user.role === "student" ? "/dashboard/student" : "/dashboard/employee"}
                      className="px-6 py-2.5 font-bold text-white hover:text-[#cd9429] transition relative group"
                    >
                      <span className="relative">
                        Dashboard
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                    </Link>
                    <Link
                      to="/profile"
                      className="px-6 py-2.5 font-bold text-white hover:text-[#cd9429] transition relative group"
                    >
                      <span className="relative">
                        Profile
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                    </Link>
                    <button
                      onClick={logout}
                      className="px-6 py-2.5 font-bold text-white hover:text-red-400 transition relative group"
                    >
                      <span className="relative">
                        Logout
                        <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-red-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                      </span>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={32} />
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
            <div className="w-80 max-w-full bg-gradient-to-br from-[#054374] via-[#054374] to-[#0a3f5c] text-white flex flex-col p-6 relative">
              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon size={32} />
              </button>
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 mb-8" onClick={() => setMobileOpen(false)}>
                <div className="w-12 h-12 bg-gradient-to-br from-[#cd9429] to-orange-500 text-[#054374] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">P</div>
                <div className="leading-tight">
                  <p className="text-lg font-bold">Premass</p>
                  <p className="text-xs text-blue-100 font-medium">Overseas Education</p>
                </div>
              </Link>
              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <NavLink to="/" label="Home" onClick={() => setMobileOpen(false)} />
                <NavLink to="/about" label="About" onClick={() => setMobileOpen(false)} />
                <NavLink to="/education-loan-support" label="Education Loan Support" onClick={() => setMobileOpen(false)} />
                <NavLink to="/countries" label="Countries" onClick={() => setMobileOpen(false)} />
                <NavLink to="/services" label="Services" onClick={() => setMobileOpen(false)} />
                <NavLink to="/blog" label="Blog" onClick={() => setMobileOpen(false)} />
                <NavLink to="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
              </div>
              {/* Auth Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={user.role === "student" ? "/dashboard/student" : "/dashboard/employee"}
                      className="px-6 py-2.5 font-bold text-white bg-[#cd9429] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="px-6 py-2.5 font-bold text-white bg-[#054374] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="px-6 py-2.5 font-bold text-white bg-red-500 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-6 py-2.5 font-bold text-white bg-[#054374] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-6 py-2.5 font-bold text-white bg-[#cd9429] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </nav>
    </>
  );
}

// Update NavLink to accept onClick for mobile
function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link to={to} className="px-4 py-2 font-bold relative group" onClick={onClick}>
      <span className="group-hover:text-[#cd9429] transition">{label}</span>
      <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
    </Link>
  );
}
