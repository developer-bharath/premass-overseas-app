import { useState } from "react";
import { Envelope, Phone, MapPin, Clock } from "phosphor-react";
import { IMAGES } from "../data/images";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const supportEmail = "premass.overseas@gmail.com";
    const subject = "New Consultation Request";
    const body = [
      `Full Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Mobile: ${formState.phone}`,
      `Country Interested In: ${formState.country}`,
      `Message: ${formState.message}`,
    ].join("\n");

    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#054374]">Contact Us</h1>
            <p className="mt-3 text-lg text-[#5b6472]">Talk to our overseas education experts</p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div>
              <div className="card overflow-hidden">
                <img
                  src={IMAGES.home.services.counselling}
                  alt="Consultation session"
                  className="h-52 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80";
                  }}
                />
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="card p-6 text-center">
                  <div className="card-icon mx-auto">
                    <MapPin weight="duotone" />
                  </div>
                  <p className="font-semibold text-[#054374]">Office Address</p>
                  <a
                    href="https://maps.google.com/?q=Green%20Square%20Plaza%2C%20Mukarampura%2C%20Karimnagar%2C%20Telangana%20505001%2C%20India"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm text-[#5b6472] hover:text-[#054374] transition"
                  >
                    2nd floor, Green Square Plaza, Mukarampura, Karimnagar, Telangana 505001, India
                  </a>
                </div>
                <div className="card p-6 text-center">
                  <div className="card-icon mx-auto">
                    <Phone weight="duotone" />
                  </div>
                  <p className="font-semibold text-[#054374]">Phone Number</p>
                  <a href="tel:+918977708366" className="mt-2 block text-sm text-[#5b6472] hover:text-[#054374] transition">
                    +91 89777 08366
                  </a>
                </div>
                <div className="card p-6 text-center">
                  <div className="card-icon mx-auto">
                    <Envelope weight="duotone" />
                  </div>
                  <p className="font-semibold text-[#054374]">Email</p>
                  <a
                    href="mailto:premass.overseas@gmail.com"
                    className="mt-2 block text-sm text-[#5b6472] hover:text-[#054374] transition"
                  >
                    premass.overseas@gmail.com
                  </a>
                </div>
                <div className="card p-6 text-center">
                  <div className="card-icon mx-auto">
                    <Clock weight="duotone" />
                  </div>
                  <p className="font-semibold text-[#054374]">Office Timings</p>
                  <p className="mt-2 text-sm text-[#5b6472]">Mon - Sat · 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="card p-8 lg:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#054374]">Request a consultation</h2>
              <p className="mt-2 text-sm text-[#5b6472]">
                Share your details and we will contact you shortly.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <input
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <input
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <input
                  name="country"
                  value={formState.country}
                  onChange={handleChange}
                  placeholder="Country interested in"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us your study goals"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20 md:col-span-2"
                />
                <button type="submit" className="btn-primary w-full md:col-span-2">
                  Get Free Counselling
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 card overflow-hidden">
            <iframe
              title="Premass Overseas location"
              src="https://maps.google.com/maps?q=Green%20Square%20Plaza%20Karimnagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-12 rounded-3xl bg-[#f6f7f9] px-6 py-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#054374]">
              Start Your Study Abroad Journey Today
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#5b6472]">
              Speak with our counsellors to build a personalized roadmap for your destination and program.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="/apply" className="btn-primary">
                Apply Now
              </a>
              <a href="/contact" className="btn-secondary">
                Talk to Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
