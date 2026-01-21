import { Link } from "react-router-dom";

export default function OverseasEducation() {
  return (
    <div className="py-32 text-center">
      <h1 className="text-4xl font-bold text-[#054374] mb-4">Overseas Education Services</h1>
      <p className="text-gray-600 mb-8">Comprehensive guidance for studying abroad</p>
      <Link to="/services" className="text-[#cd9429] underline hover:text-[#054374]">
        Back to All Services
      </Link>
    </div>
  );
}
