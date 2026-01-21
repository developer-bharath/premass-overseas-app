/* =====================================================
   PREMASS OVERSEAS – ULTRA PREMIUM CONTACT PAGE
   Advanced Design with Animations & Backend Integration
   ===================================================== */

import React, { useState } from "react";
import {
  Phone, Envelope, MapPin, Clock, CheckCircle, LinkedinLogo,
  InstagramLogo, FacebookLogo, Star, GlobeHemisphereWest,
  Users, Sparkle, WhatsappLogo, TelegramLogo, Checks,
  Trophy, Medal, ShieldCheck, Headset
} from "phosphor-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Real backend API call
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", countryCode: "+91", phone: "", service: "", message: "" });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const countryCodes = [
    { code: "+91", label: "🇮🇳 +91" },
    { code: "+1", label: "🇺🇸 +1" },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+61", label: "🇦🇺 +61" },
    { code: "+971", label: "🇦🇪 +971" },
    { code: "+65", label: "🇸🇬 +65" },
    { code: "+81", label: "🇯🇵 +81" },
    { code: "+82", label: "🇰🇷 +82" },
    { code: "+49", label: "🇩🇪 +49" },
    { code: "+33", label: "🇫🇷 +33" },
    { code: "+39", label: "🇮🇹 +39" },
    { code: "+34", label: "🇪🇸 +34" },
    { code: "+7", label: "🇷🇺 +7" },
    { code: "+86", label: "🇨🇳 +86" },
    { code: "+852", label: "🇭🇰 +852" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#cd9429]/10 to-orange-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#054374]/10 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-18">
        {/* TOP SOCIAL / CONTACT STRIP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-[#cd9429]/20 shadow-sm">
            <Sparkle size={14} weight="duotone" className="text-[#cd9429]" />
            <span className="text-xs md:text-sm font-semibold text-[#054374]">Available 24/7 for Your Success</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:border-[#cd9429] hover:text-[#cd9429] transition">
              <LinkedinLogo size={14} weight="fill" />
              <span className="text-xs font-semibold">LinkedIn</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:border-[#cd9429] hover:text-[#cd9429] transition">
              <InstagramLogo size={14} weight="fill" />
              <span className="text-xs font-semibold">Instagram</span>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:border-[#cd9429] hover:text-[#cd9429] transition">
              <FacebookLogo size={14} weight="fill" />
              <span className="text-xs font-semibold">Facebook</span>
            </a>
            <a href="https://wa.me/918977708366" className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-full bg-green-500 text-white shadow-sm hover:bg-green-600 transition text-xs md:text-sm">
              <WhatsappLogo size={14} weight="fill" />
              <span className="font-semibold hidden md:inline">WhatsApp</span>
            </a>
            <a href="mailto:premass.overseas@gmail.com" className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-full bg-[#054374] text-white shadow-sm hover:bg-[#0a5a8f] transition text-xs md:text-sm">
              <Envelope size={14} weight="duotone" />
              <span className="font-semibold hidden md:inline">Email</span>
            </a>
            <a href="tel:+918977708366" className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-full bg-[#cd9429] text-white shadow-sm hover:bg-orange-600 transition text-xs md:text-sm">
              <Phone size={14} weight="duotone" />
              <span className="font-semibold hidden md:inline">Call</span>
            </a>
          </div>
        </div>

        {/* HERO SPLIT: FORM + VISUAL */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 md:mb-14">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#cd9429] via-orange-500 to-[#054374] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-9 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#054374] mb-1">Get Free Consultation</h2>
                  <p className="text-xs md:text-sm text-gray-600">Fill the form and our team will contact you</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#cd9429] to-orange-600 flex items-center justify-center shadow-lg shadow-[#cd9429]/20">
                  <Medal size={18} weight="duotone" className="text-white" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <PremiumInput
                  icon={<Users size={16} weight="duotone" />}
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <PremiumInput
                  icon={<Envelope size={16} weight="duotone" />}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="relative flex gap-2">
                  <div className="relative w-32">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl pl-10 pr-2 py-3.5 focus:outline-none focus:border-[#cd9429] focus:ring-4 focus:ring-[#cd9429]/10 transition-all duration-300 font-semibold text-gray-700 appearance-none cursor-pointer hover:border-[#cd9429]/50 text-sm"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cd9429] pointer-events-none">
                      <GlobeHemisphereWest size={12} weight="duotone" />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl pl-10 pr-3 py-3.5 focus:outline-none focus:border-[#cd9429] focus:ring-4 focus:ring-[#cd9429]/10 transition-all duration-300 font-semibold text-gray-700 placeholder-gray-500"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cd9429] pointer-events-none">
                      <Phone size={14} weight="duotone" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl px-10 py-3.5 focus:outline-none focus:border-[#cd9429] focus:ring-4 focus:ring-[#cd9429]/10 transition-all duration-300 font-semibold text-gray-700 appearance-none cursor-pointer hover:border-[#cd9429]/50 text-sm"
                  >
                    <option value="">Select Service</option>
                    <option>🎓 Career Counselling</option>
                    <option>📚 Course Selection</option>
                    <option>🏫 University Shortlisting</option>
                    <option>✍️ SOP & LOR Writing</option>
                    <option>📋 Application Assistance</option>
                    <option>📄 Document Preparation</option>
                    <option>🗣️ IELTS/TOEFL Coaching</option>
                    <option>✈️ Visa Guidance</option>
                    <option>🎤 Mock Interviews</option>
                    <option>🌍 Post-Arrival Support</option>
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <GlobeHemisphereWest size={14} weight="duotone" className="text-[#cd9429]" />
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Tell us about your study abroad goals..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl px-10 py-3.5 focus:outline-none focus:border-[#cd9429] focus:ring-4 focus:ring-[#cd9429]/10 transition-all duration-300 resize-none font-medium text-gray-700 placeholder-gray-500 text-sm"
                  />
                  <div className="absolute left-4 top-4 pointer-events-none">
                    <Sparkle size={14} weight="duotone" className="text-[#cd9429]" />
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl flex items-center gap-3 animate-pulse shadow-lg shadow-green-500/20">
                    <CheckCircle size={20} weight="duotone" className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-bold text-base">Success! 🎉</p>
                      <p className="text-green-700 text-sm">We'll contact you within 2 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 rounded-2xl flex items-center gap-3 shadow-lg shadow-red-500/20">
                    <span className="text-red-600 text-2xl">⚠️</span>
                    <div>
                      <p className="text-red-800 font-bold text-base">Oops! Something went wrong</p>
                      <p className="text-red-700 text-sm">Please try again or call us directly.</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#054374] via-[#cd9429] to-orange-600 hover:shadow-2xl text-white py-3.5 rounded-2xl font-bold text-base md:text-lg transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm md:text-base">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Checks size={18} weight="bold" />
                        <span className="text-sm md:text-base">Get Free Consultation</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#cd9429] to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <ShieldCheck size={14} weight="duotone" className="text-green-600" />
                  <p className="text-xs md:text-sm text-gray-600">
                    🔒 Your data is <span className="font-bold text-[#054374]">100% secure</span>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#054374] via-[#0a5a8f] to-[#cd9429] leading-tight">
              Let's Make Your Dream Come True
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Connect with our award-winning counsellors and join <span className="font-bold text-[#cd9429]">2300+ successful students</span> who achieved their study abroad dreams.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <TrustCard icon={<Trophy />} number="20+" label="Years Excellence" />
              <TrustCard icon={<Users />} number="2300+" label="Students Placed" />
              <TrustCard icon={<GlobeHemisphereWest />} number="25+" label="Countries" />
              <TrustCard icon={<Star />} number="98%" label="Success Rate" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 bg-gradient-to-br from-[#054374] via-[#0a5a8f] to-[#cd9429] p-6 relative">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative text-white space-y-3">
                <h3 className="text-xl font-black">Your Global Journey Starts Here</h3>
                <p className="text-sm text-white/90">Hyderabad HQ · Jubilee Hills · Trusted by 2300+ students worldwide.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+918977708366" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full text-sm font-semibold transition">
                    <Phone size={16} weight="duotone" /> Call
                  </a>
                  <a href="https://wa.me/918977708366" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-sm font-semibold transition">
                    <WhatsappLogo size={16} weight="bold" /> WhatsApp
                  </a>
                  <a href="mailto:premass.overseas@gmail.com" className="flex items-center gap-2 bg-white text-[#054374] hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold transition">
                    <Envelope size={16} weight="duotone" /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREMIUM CONTACT CARDS */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <PremiumContactCard
            icon={<Phone size={22} weight="duotone" />}
            title="Call Anytime"
            description="Available 9 AM - 6 PM IST"
            detail="+91 89777 08366"
            link="tel:+918977708366"
            color="blue"
          />
          <PremiumContactCard
            icon={<Envelope size={22} weight="duotone" />}
            title="Email Us"
            description="Reply within 2 hours"
            detail="premass.overseas@gmail.com"
            link="mailto:premass.overseas@gmail.com"
            color="gold"
          />
          <PremiumContactCard
            icon={<MapPin size={22} weight="duotone" />}
            title="Visit Office"
            description="Hyderabad, India"
            detail="Jubilee Hills, Telangana"
            link="https://maps.app.goo.gl/jQcTWxs2LVH4iqvu7"
            color="purple"
          />
        </div>

        {/* FULL WIDTH GOOGLE MAPS */}
        <div className="mb-16 md:mb-18">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:border-[#cd9429]/30 transition-all duration-300">
            <div className="p-6 bg-gradient-to-r from-[#054374] via-[#0a5a8f] to-[#cd9429] text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MapPin size={26} weight="duotone" />
                Visit Our Office - Jubilee Hills, Hyderabad
              </h3>
            </div>
            <div className="h-96 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3858418896547!2d78.40933931487585!3d17.433098488048103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90dd0745d397%3A0x69fe3c16b4c2f111!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1642424242424!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Premass Overseas Location"
                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/jQcTWxs2LVH4iqvu7"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white px-6 py-3 rounded-xl shadow-xl font-bold text-[#054374] hover:bg-[#cd9429] hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <MapPin size={20} weight="bold" />
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="mb-16 md:mb-18">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl font-black text-[#054374] mb-4">What Our Students Say</h2>
            <p className="text-gray-600 text-base">Real success stories from real students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Priya Sharma"
              country="🇬🇧 UK"
              text="Premass Overseas made my dream of studying at Oxford a reality. Their guidance was exceptional!"
              rating={5}
            />
            <TestimonialCard
              name="Rahul Kumar"
              country="🇨🇦 Canada"
              text="Best consultancy in Hyderabad! Got admission to University of Toronto with full scholarship."
              rating={5}
            />
            <TestimonialCard
              name="Sneha Patel"
              country="🇦🇺 Australia"
              text="Professional, caring, and results-driven. Thank you for helping me reach Melbourne!"
              rating={5}
            />
          </div>
        </div>

        {/* FAQ SECTION - PREMIUM */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-10 md:p-12 border-2 border-blue-100">
          <h2 className="text-3xl font-black text-[#054374] mb-10 text-center flex items-center justify-center gap-3">
            <Sparkle size={28} weight="duotone" className="text-[#cd9429]" />
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <PremiumFAQItem
              question="How long does consultation take?"
              answer="Our initial consultation takes 30-45 minutes where we understand your profile, goals, and create a personalized roadmap."
            />
            <PremiumFAQItem
              question="Is the consultation free?"
              answer="Yes! Your first consultation is completely FREE with no obligations. We believe in building trust first."
            />
            <PremiumFAQItem
              question="Can I book online consultation?"
              answer="Absolutely! We offer both in-person and online consultations via Zoom, Google Meet, or Microsoft Teams."
            />
            <PremiumFAQItem
              question="How soon can I get an appointment?"
              answer="We typically confirm appointments within 2-4 hours. Urgent requests are given priority."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= PREMIUM COMPONENTS ============= */

function TrustCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
  return (
    <div className="group bg-white rounded-2xl p-4 md:p-5 shadow-lg border-2 border-gray-100 hover:border-[#cd9429] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-2xl bg-gradient-to-br from-[#cd9429]/20 to-orange-600/10 flex items-center justify-center text-[#cd9429] group-hover:scale-110 group-hover:from-[#cd9429] group-hover:to-orange-600 group-hover:text-white transition-all duration-300">
        {React.cloneElement(icon as React.ReactElement, { size: 20, weight: "duotone" })}
      </div>
      <div className="text-lg md:text-xl font-black text-[#054374] mb-1">{number}</div>
      <div className="text-xs md:text-sm text-gray-600 font-semibold">{label}</div>
    </div>
  );
}

function PremiumContactCard({ icon, title, description, detail, link, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
  link?: string;
  color: "blue" | "gold" | "purple";
}) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 group-hover:from-blue-500 group-hover:to-blue-600 border-blue-200 group-hover:shadow-blue-500/30",
    gold: "from-[#cd9429]/20 to-orange-600/10 group-hover:from-[#cd9429] group-hover:to-orange-600 border-yellow-200 group-hover:shadow-[#cd9429]/30",
    purple: "from-purple-500/20 to-pink-500/10 group-hover:from-purple-500 group-hover:to-pink-500 border-purple-200 group-hover:shadow-purple-500/30"
  };

  const cardContent = (
    <>
      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-3xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-[#cd9429] group-hover:text-white group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 border-2`}>
        {icon}
      </div>
      <h3 className="text-base md:text-lg font-black text-[#054374] mb-1 group-hover:text-[#cd9429] transition-colors">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 mb-2 font-semibold">{description}</p>
      <p className="text-xs md:text-sm font-bold text-[#cd9429] break-words">{detail}</p>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        target={link.startsWith('http') ? '_blank' : undefined}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="group relative block bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#cd9429]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">{cardContent}</div>
      </a>
    );
  }

  return (
    <div className="group relative bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#cd9429]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative">{cardContent}</div>
    </div>
  );
}

function PremiumInput({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl pl-10 pr-3 py-3.5 focus:outline-none focus:border-[#cd9429] focus:ring-4 focus:ring-[#cd9429]/10 transition-all duration-300 font-semibold text-gray-700 placeholder-gray-500 text-sm"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cd9429] pointer-events-none">
        {icon}
      </div>
    </div>
  );
}

function OfficeHour({ day, time, active }: { day: string; time: string; active?: boolean }) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl ${active ? 'bg-gradient-to-r from-[#cd9429]/10 to-orange-500/5 border-2 border-[#cd9429]/30' : 'bg-gray-50 border-2 border-gray-100'} transition-all duration-300`}>
      <span className="font-bold text-[#054374]">{day}</span>
      <span className={`font-semibold ${active ? 'text-[#cd9429]' : 'text-gray-600'}`}>{time}</span>
      {active && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>}
    </div>
  );
}

function FeatureBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white/50">
      <div className="text-[#cd9429]">
        {React.cloneElement(icon as React.ReactElement, { size: 20, weight: "duotone" })}
      </div>
      <span className="font-bold text-[#054374] text-sm">{text}</span>
    </div>
  );
}

function SocialIconPremium({ icon, href, color }: { icon: React.ReactNode; href: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600 hover:shadow-blue-500/50",
    pink: "from-pink-500 to-rose-500 hover:shadow-pink-500/50",
    cyan: "from-cyan-500 to-blue-500 hover:shadow-cyan-500/50"
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-1 flex items-center justify-center h-14 rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300`}
    >
      {icon}
    </a>
  );
}

function TestimonialCard({ name, country, text, rating }: { name: string; country: string; text: string; rating: number }) {
  return (
    <div className="group bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-gray-100 hover:border-[#cd9429] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} weight="fill" className="text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic leading-relaxed text-sm md:text-base">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#cd9429] to-orange-500 flex items-center justify-center text-white font-bold text-sm md:text-base">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-[#054374] text-sm md:text-base">{name}</p>
          <p className="text-xs md:text-sm text-gray-600">{country}</p>
        </div>
      </div>
    </div>
  );
}

function PremiumFAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${isOpen ? 'border-[#cd9429]' : 'border-gray-200'} hover:border-[#cd9429] transition-all duration-300 cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex justify-between items-center hover:bg-gray-50 transition">
        <h4 className="font-bold text-[#054374] text-lg pr-4">{question}</h4>
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#cd9429] to-orange-500 flex items-center justify-center text-white transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
          <span className="text-lg font-bold">↓</span>
        </div>
      </div>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed bg-gradient-to-br from-gray-50 to-white border-t-2 border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}
