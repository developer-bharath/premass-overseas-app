import { useState } from "react";
import { Envelope, Phone, MapPin, Clock } from "phosphor-react";
import { IMAGES } from "../data/images";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
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
  };

  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
            <div>
              <span className="tag">Contact Premass Overseas</span>
              <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-[#054374]">
                Speak with a counsellor today.
              </h1>
              <p className="mt-5 text-lg text-[#5b6472] max-w-2xl">
                We respond within business hours with a clear consultation plan and next steps.
              </p>

              <div className="mt-8 card overflow-hidden">
                <img
                  src={IMAGES.home.services.counselling}
                  alt="Consultation session"
                  className="h-44 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="p-5 grid sm:grid-cols-3 gap-4 text-sm text-[#5b6472]">
                  {[
                    { label: "Response time", value: "Within 24 hrs" },
                    { label: "Consultation", value: "Free & guided" },
                    { label: "Support", value: "End-to-end" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-[#e6e8ec] px-3 py-3">
                      <p className="text-[10px] uppercase tracking-wide text-[#9aa1ab]">{item.label}</p>
                      <p className="font-semibold text-[#054374]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid gap-4">
                <div className="card p-5 flex items-start gap-3">
                  <Phone size={20} weight="regular" className="text-[#cd9429]" />
                  <div>
                    <p className="font-semibold text-[#054374]">Phone</p>
                    <p className="text-sm text-[#5b6472]">+91 89777 08366</p>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <Envelope size={20} weight="regular" className="text-[#cd9429]" />
                  <div>
                    <p className="font-semibold text-[#054374]">Email</p>
                    <p className="text-sm text-[#5b6472]">premass.overseas@gmail.com</p>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <MapPin size={20} weight="regular" className="text-[#cd9429]" />
                  <div>
                    <p className="font-semibold text-[#054374]">Office</p>
                    <p className="text-sm text-[#5b6472]">Jubilee Hills, Hyderabad</p>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <Clock size={20} weight="regular" className="text-[#cd9429]" />
                  <div>
                    <p className="font-semibold text-[#054374]">Office timings</p>
                    <p className="text-sm text-[#5b6472]">Mon - Sat · 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-2xl font-semibold text-[#054374]">Request a consultation</h2>
              <p className="mt-2 text-sm text-[#5b6472]">
                Share your details and we will contact you shortly.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <select
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                >
                  <option value="">Select service</option>
                  <option>Career Counselling</option>
                  <option>University Shortlisting</option>
                  <option>Application Assistance</option>
                  <option>SOP & LOR Guidance</option>
                  <option>Visa Guidance</option>
                </select>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us your study goals"
                  className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                />
                <button type="submit" className="btn-primary w-full">
                  Send Consultation Request
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 card overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3858418896547!2d78.40933931487585!3d17.433098488048103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90dd0745d397%3A0x69fe3c16b4c2f111!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1642424242424!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Premass Overseas Office Location"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
