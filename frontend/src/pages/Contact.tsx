/* =====================================================
   PREMASS OVERSEAS – PREMIUM CONTACT PAGE
   Branding Safe | No Ticks | No Quick Links
   ===================================================== */

import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaUserGraduate,
} from "react-icons/fa6";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry:", form);
    alert("Thank you! Our counsellor will contact you shortly.");
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-[#054374] to-[#073a57] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Speak with a <span className="text-[#cd9429]">Certified Counsellor</span>
            </h1>

            <p className="mt-6 text-blue-100 text-lg">
              Get expert guidance for global education, admissions,
              visas, and career pathways — all under one roof.
            </p>

            {/* CONTACT INFO */}
            <div className="mt-10 space-y-5">
              <InfoRow icon={<FaPhone />} text="+91 90000 00000" />
              <InfoRow icon={<FaEnvelope />} text="info@premassoverseas.com" />
              <InfoRow icon={<FaLocationDot />} text="Hyderabad, India" />
            </div>
          </div>

          {/* RIGHT – ILLUSTRATION PLACEHOLDER */}
          <div className="bg-white/10 rounded-2xl h-80 flex items-center justify-center text-blue-200">
            Premium Contact Illustration
          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* LEFT – TRUST CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-[#054374] mb-8">
              Why Students Choose Premass Overseas
            </h2>

            <div className="space-y-6">
              <TrustCard
                icon={<FaUserGraduate />}
                title="Certified Counsellors"
                text="Experienced advisors with proven international admission success."
              />
              <TrustCard
                icon={<FaUserGraduate />}
                title="Transparent Process"
                text="Clear guidance, honest timelines, and no hidden surprises."
              />
              <TrustCard
                icon={<FaUserGraduate />}
                title="End-to-End Support"
                text="From academics to career placement — we stay with you."
              />
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-white shadow-2xl rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-[#054374] mb-6">
              Enquiry Form
            </h3>

            <form onSubmit={submitForm} className="space-y-5">
              <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <Input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
              <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1E6AE1]"
              >
                <option value="">Select Service</option>
                <option>Study Abroad</option>
                <option>University Admissions</option>
                <option>Visa Assistance</option>
                <option>Career Counselling</option>
                <option>Job Placement</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your goals"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1E6AE1]"
              />

              <button
                type="submit"
                className="w-full bg-[#1E6AE1] hover:bg-[#1557C0] text-white py-4 rounded-xl font-semibold transition"
              >
                Request Consultation
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}

/* ================= SUB COMPONENTS ================= */

function InfoRow({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <div className="flex items-center gap-4 text-lg">
      <div className="text-[#cd9429] text-xl">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5 bg-white rounded-xl p-6 shadow-md">
      <div className="text-[#cd9429] text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-[#054374]">{title}</h4>
        <p className="text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}

function Input({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: any;
}) {
  return (
    <input
      name={name}
      required
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1E6AE1]"
    />
  );
}
