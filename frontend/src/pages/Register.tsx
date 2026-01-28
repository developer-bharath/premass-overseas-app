import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Envelope, LockKey, User, CircleNotch, CheckCircle, Eye, EyeSlash, ShieldCheck } from "phosphor-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "employee",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!isHuman) {
      setError("Please confirm you're not a robot");
      return;
    }

    try {
      setIsLoading(true);
      setError(""); // Clear any previous errors
      
      console.log("🔄 Starting registration...");
      
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      
      console.log("✅ Registration successful, showing success message");
      setSuccess(true);

      // Redirect to OTP verification
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email: formData.email },
        });
      }, 1500);
    } catch (err) {
      console.error("❌ Registration error in component:", err);
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
      setSuccess(false);
    } finally {
      // Always clear loading state, even if something unexpected happens
      setIsLoading(false);
      console.log("🔄 Loading state cleared");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#054374] to-[#073a57] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#054374] mb-2">Create Account</h1>
            <p className="text-gray-600">Join Premass Overseas for expert guidance</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex items-center gap-3">
              <CheckCircle size={20} weight="duotone" className="text-green-600" />
              <p className="text-green-700 font-medium">Registration successful! Redirecting...</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <div className="relative">
                <User size={20} weight="duotone" className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/20 outline-none transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Envelope size={20} weight="duotone" className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/20 outline-none transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <LockKey size={20} weight="duotone" className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/20 outline-none transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Min 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
              <div className="relative">
                <LockKey size={20} weight="duotone" className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/20 outline-none transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a: *</label>
              <div className="flex gap-3">
                <label className="flex-1 flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all" style={{ borderColor: formData.role === "student" ? "#cd9429" : "#e5e7eb" }}>
                  <input
                    type="radio"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    name="role"
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-sm">Student</span>
                </label>
                <label className="flex-1 flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all" style={{ borderColor: formData.role === "employee" ? "#cd9429" : "#e5e7eb" }}>
                  <input
                    type="radio"
                    value="employee"
                    checked={formData.role === "employee"}
                    onChange={handleChange}
                    name="role"
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-sm">Staff</span>
                </label>
              </div>
            </div>

            {/* Human Verification Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#cd9429]/50 transition">
              <input
                type="checkbox"
                id="humanCheck"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
                className="w-5 h-5 text-[#cd9429] border-gray-300 rounded focus:ring-[#cd9429] cursor-pointer"
              />
              <label htmlFor="humanCheck" className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                <ShieldCheck size={20} weight="duotone" className="text-green-600" />
                I'm not a robot
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#054374] to-[#073a57] hover:shadow-lg disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <CircleNotch size={20} weight="bold" className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-[#cd9429] hover:underline font-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
