import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { STUDY_COUNTRIES } from "../data/studyAbroad";
import logo from "../assets/logo.png";
import { ICONS } from "../data/icons";
import { useAuth } from "../context/AuthContext";
import { Phone, LinkedinLogo, InstagramLogo, FacebookLogo, YoutubeLogo } from "phosphor-react";
import { List as MenuIcon, X as CloseIcon } from "phosphor-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsStudyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Caret = ICONS.caret;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-[#054374] border-b border-white/20 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px] text-white">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-white/40 shadow-sm overflow-hidden">
                <img src={logo} alt="Premass Overseas" className="w-7 h-7 object-contain" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-lg font-semibold">Premass</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <div
                className="relative"
                onMouseEnter={() => setIsStudyOpen(true)}
                onMouseLeave={() => setIsStudyOpen(false)}
              >
                <button className="px-4 py-2 font-semibold flex items-center gap-1 hover:text-[#cd9429] transition relative group">
                  Study Abroad
                  <Caret size={14} weight="bold" className={`transition-transform ${isStudyOpen ? "rotate-180" : ""}`} />
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </button>
                {isStudyOpen && (
                  <div ref={dropdownRef} className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    {STUDY_COUNTRIES.map((country) => (
                      <Link
                        key={country.slug}
                        to={`/study/${country.slug}`}
                        className="block px-4 py-2 text-sm font-semibold text-[#054374] hover:bg-[#f6f7f9]"
                      >
                        {country.name.replace("Study in ", "")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <NavLink to="/courses" label="Courses" />
              <NavLink to="/services" label="Services" />
              <NavLink to="/contact" label="Contact" />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+918977708366"
                className="p-2 rounded-full border border-white/40 text-white hover:text-[#cd9429] hover:border-[#cd9429] transition"
                aria-label="Call Premass Overseas"
              >
                <Phone size={18} weight="regular" />
              </a>

              <div className="hidden lg:flex items-center gap-3 text-white">
                <a
                  href="https://linkedin.com"
                  className="p-2 rounded-full border border-white/40 hover:text-[#cd9429] hover:border-[#cd9429] transition"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={18} weight="duotone" />
                </a>
                <a
                  href="https://instagram.com"
                  className="p-2 rounded-full border border-white/40 hover:text-[#cd9429] hover:border-[#cd9429] transition"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={18} weight="duotone" />
                </a>
                <a
                  href="https://facebook.com"
                  className="p-2 rounded-full border border-white/40 hover:text-[#cd9429] hover:border-[#cd9429] transition"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={18} weight="duotone" />
                </a>
                <a
                  href="https://youtube.com"
                  className="p-2 rounded-full border border-white/40 hover:text-[#cd9429] hover:border-[#cd9429] transition"
                  aria-label="YouTube"
                >
                  <YoutubeLogo size={18} weight="duotone" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                {isAuthenticated && user ? (
                  <>
                    <Link to={user.role === "student" ? "/dashboard/student" : "/dashboard/employee"} className="px-3 py-2 font-semibold text-white hover:text-[#cd9429]">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="px-3 py-2 font-semibold text-white hover:text-[#cd9429]">
                      Profile
                    </Link>
                    <button onClick={logout} className="px-3 py-2 font-semibold text-white hover:text-red-100">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-2 font-semibold text-white hover:text-[#cd9429]">
                      Login
                    </Link>
                    <Link to="/apply" className="btn-primary">
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>

            <button
              className="lg:hidden flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={28} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
            <div className="w-80 max-w-full bg-white text-[#054374] flex flex-col p-6 relative shadow-2xl">
              <button
                className="absolute top-4 right-4 text-[#054374]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon size={32} />
              </button>
              <Link to="/" className="flex items-center gap-3 mb-8" onClick={() => setMobileOpen(false)}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[#e6e8ec] shadow-sm overflow-hidden">
                  <img src={logo} alt="Premass Overseas" className="w-9 h-9 object-contain" />
                </div>
                <div className="leading-tight">
                  <p className="text-lg font-semibold">Premass</p>
                  <p className="text-xs text-[#5b6472] font-medium">Overseas Education</p>
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <NavLink to="/" label="Home" onClick={() => setMobileOpen(false)} />
                <NavLink to="/about" label="About" onClick={() => setMobileOpen(false)} />
                <NavLink to="/countries" label="Study Abroad" onClick={() => setMobileOpen(false)} />
                <NavLink to="/courses" label="Courses" onClick={() => setMobileOpen(false)} />
                <NavLink to="/services" label="Services" onClick={() => setMobileOpen(false)} />
                <NavLink to="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={user.role === "student" ? "/dashboard/student" : "/dashboard/employee"}
                      className="px-6 py-2.5 font-semibold text-white bg-[#054374] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="px-6 py-2.5 font-semibold text-white bg-[#054374] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="px-6 py-2.5 font-semibold text-white bg-red-500 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-6 py-2.5 font-semibold text-white bg-[#054374] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/apply"
                      className="px-6 py-2.5 font-semibold text-white bg-[#cd9429] rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link to={to} className="px-4 py-2 font-semibold relative group" onClick={onClick}>
      <span className="group-hover:text-[#cd9429] transition">{label}</span>
      <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#cd9429] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
    </Link>
  );
}
