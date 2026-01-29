import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "premass_cookie_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-6">
      <div className="max-w-5xl mx-auto card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#054374]">We use cookies</p>
          <p className="text-xs text-[#5b6472] mt-1 max-w-2xl">
            We use cookies to improve website performance, personalize content, and analyze traffic.
            You can review our policy at any time.
          </p>
          <div className="mt-2">
            <Link to="/cookie-policy" className="text-xs font-semibold text-[#cd9429] hover:underline">
              Read Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={acceptCookies} className="btn-primary">
            Accept Cookies
          </button>
          <Link to="/privacy-policy" className="btn-secondary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
