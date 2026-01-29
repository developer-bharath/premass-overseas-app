import { useState } from "react";
import { IMAGES } from "../data/images";
import applyHero from "../assets/apply-premium-consultation.png";

const steps = ["Personal", "Education", "Destination", "Review"];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    highestQualification: "",
    intake: "",
    country: "",
    course: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <main className="bg-white text-black">
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          <div className="card p-8 md:p-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="tag">Apply Now</span>
                <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-[#054374]">
                  Student registration
                </h1>
                <p className="mt-3 text-[#5b6472]">
                  Complete the short form to begin your application journey.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {steps.map((label, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 border ${
                    index <= step ? "border-[#054374] text-[#054374]" : "border-[#e6e8ec] text-[#9aa1ab]"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index <= step ? "bg-[#054374] text-white" : "bg-[#e6e8ec] text-[#5b6472]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className={`${index === step ? "font-semibold" : ""}`}>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {step === 0 && (
                <>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <input
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    placeholder="Highest qualification"
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  />
                  <select
                    name="intake"
                    value={formData.intake}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  >
                    <option value="">Preferred intake</option>
                    <option>January</option>
                    <option>May</option>
                    <option>September</option>
                  </select>
                </>
              )}

              {step === 2 && (
                <>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  >
                    <option value="">Preferred destination</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Europe</option>
                  </select>
                  <input
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="Preferred course"
                    className="w-full rounded-lg border border-[#e6e8ec] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054374]/20"
                  />
                </>
              )}

              {step === 3 && (
                <div className="text-sm text-[#5b6472] space-y-2">
                  <p><strong>Name:</strong> {formData.fullName || "-"}</p>
                  <p><strong>Email:</strong> {formData.email || "-"}</p>
                  <p><strong>Phone:</strong> {formData.phone || "-"}</p>
                  <p><strong>Qualification:</strong> {formData.highestQualification || "-"}</p>
                  <p><strong>Intake:</strong> {formData.intake || "-"}</p>
                  <p><strong>Destination:</strong> {formData.country || "-"}</p>
                  <p><strong>Course:</strong> {formData.course || "-"}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button type="button" onClick={handleBack} className="btn-secondary" disabled={step === 0}>
                Back
              </button>
              {step < steps.length - 1 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Continue
                </button>
              ) : (
                <button type="button" className="btn-primary">
                  Submit Application
                </button>
              )}
            </div>
          </div>

          <div className="card overflow-hidden">
            <img
              src={applyHero}
              alt="Premium counselling session"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#054374]">Premium guidance, end-to-end</h3>
              <p className="mt-2 text-sm text-[#5b6472]">
                Share your profile and we will build a personalized shortlist, application roadmap,
                and visa readiness plan.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#5b6472]">
                {[
                  { label: "Response time", value: "Within 24 hrs" },
                  { label: "Support", value: "Dedicated counsellor" },
                  { label: "Process", value: "4-step review" },
                  { label: "Success", value: "98% visa rate" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-[#e6e8ec] px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ab]">{item.label}</p>
                    <p className="font-semibold text-[#054374]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
