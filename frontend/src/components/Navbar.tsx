import ukFlag from "../assets/flags/uk.png";
import usaFlag from "../assets/flags/usa.png";
import canadaFlag from "../assets/flags/canada.png";
import australiaFlag from "../assets/flags/australia.png";
import europeFlag from "../assets/flags/europe.png";


import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { services } from "../data/services";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const countriesRef = useRef<HTMLDivElement>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mega menu when clicking outside
  useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      servicesRef.current &&
      !servicesRef.current.contains(e.target as Node)
    ) {
      setServicesOpen(false);
    }

    if (
      countriesRef.current &&
      !countriesRef.current.contains(e.target as Node)
    ) {
      setCountriesOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  return (
    <header className="sticky top-0 z-50 bg-[#0A3A5E] shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="text-xl font-bold text-white">
            Premass <span className="text-[#F5A623]">Overseas</span>
          </Link>

          {/* MAIN MENU */}
          <nav className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={`nav-link ${location.pathname === "/" ? "nav-link-active" : ""}`}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "nav-link-active" : ""}`}
            >
              About
            </NavLink>

            {/* SERVICES MEGA MENU */}
            <div ref={servicesRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen(prev => !prev)}
                onKeyDown={(e) => e.key === "Escape" && setServicesOpen(false)}
                className={`nav-link ${
                  location.pathname.startsWith("/services")
                    ? "nav-link-active"
                    : ""
                }`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
              </button>

              {servicesOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-4
                             w-[1100px] mega-menu p-8
                             grid grid-cols-3 gap-10 animate-mega"
                >
                  {services.map(group => (
                    <div key={group.slug}>
                      {/* CATEGORY TITLE */}
                      <h4 className="mb-4 font-semibold text-[#0A3A5E]">
                        {group.category}
                      </h4>

                      <ul className="space-y-2">
                        {group.items.map(item => (
                          <li key={item.slug}>
                            <Link
                              to={`/services/${group.slug}/${item.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="
                                block
                                px-2 py-1
                                rounded-md
                                transition
                                mega-service-link
                              "
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
{/* COUNTRIES DROPDOWN */}

  {/* NAV LABEL */}
 <div ref={countriesRef} className="relative">
  <button
    type="button"
    onClick={() => setCountriesOpen(prev => !prev)}
    className={`nav-link cursor-pointer flex items-center ${
      location.pathname.startsWith("/countries")
        ? "nav-link-active"
        : ""
    }`}
    aria-haspopup="true"
    aria-expanded={countriesOpen}
  >
    Countries
  </button>


  {countriesOpen && (
    <div
      className="absolute left-1/2 -translate-x-1/2 mt-4
                 w-72 bg-white rounded-2xl shadow-xl p-4
                 countries-menu"
    >
      <ul className="space-y-3">

        {/* UNITED KINGDOM */}
        <li>
          <Link
  to="/countries/uk"
  onClick={() => setCountriesOpen(false)}
  className="mega-service-link flex items-center gap-3 px-3 py-2 rounded-lg transition"
>

            <span className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img
                src={ukFlag}
                alt="United Kingdom"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-sm font-medium">United Kingdom</span>
          </Link>
        </li>

        {/* UNITED STATES */}
        <li>
          <Link
  to="/countries/usa"
  onClick={() => setCountriesOpen(false)}
  className="mega-service-link flex items-center gap-3 px-3 py-2 rounded-lg transition"
>

            <span className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img
                src={usaFlag}
                alt="United States"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-sm font-medium">United States</span>
          </Link>
        </li>

        {/* CANADA */}
        <li>
          <Link
  to="/countries/canada"
  onClick={() => setCountriesOpen(false)}
  className="mega-service-link flex items-center gap-3 px-3 py-2 rounded-lg transition"
>

            <span className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img
                src={canadaFlag}
                alt="Canada"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-sm font-medium">Canada</span>
          </Link>
        </li>

        {/* AUSTRALIA */}
        <li>
          <Link
  to="/countries/australia"
  onClick={() => setCountriesOpen(false)}
  className="mega-service-link flex items-center gap-3 px-3 py-2 rounded-lg transition"
>

            <span className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img
                src={australiaFlag}
                alt="Australia"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-sm font-medium">Australia</span>
          </Link>
        </li>

        {/* EUROPE */}
        <li>
          <Link
  to="/countries/europe"
  onClick={() => setCountriesOpen(false)}
  className="mega-service-link flex items-center gap-3 px-3 py-2 rounded-lg transition"
>

            <span className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <img
                src={europeFlag}
                alt="Europe"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-sm font-medium">Europe</span>
          </Link>
        </li>

      </ul>
    </div>
  )}
</div>


            <NavLink
              to="/contact"
              className={`nav-link ${location.pathname === "/contact" ? "nav-link-active" : ""}`}
            >
              Contact
            </NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <a className="icon-btn" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a className="icon-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a className="icon-btn" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

            <Link to="/register" className="btn-outline">
              Register
            </Link>

            <Link to="/contact" className="btn-primary">
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
