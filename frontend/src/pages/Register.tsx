import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Envelope, LockKey, User, CircleNotch, CheckCircle, Eye, EyeSlash } from "phosphor-react";

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

      // Redirect to login (no OTP needed)
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Registration successful! Please login." },
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Premass Overseas</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Create Your Account</h1>
            <p className="text-white/70 mt-2">Join your global admissions journey in minutes.</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-400/40 rounded-xl flex items-center gap-3 text-emerald-200">
              <CheckCircle size={20} weight="duotone" />
              <p className="font-medium">Registration successful! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
                <div className="relative">
                  <User size={20} weight="duotone" className="absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/30 outline-none transition text-white placeholder-white/50"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address *</label>
                <div className="relative">
                  <Envelope size={20} weight="duotone" className="absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/30 outline-none transition text-white placeholder-white/50"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Password *</label>
                <div className="relative">
                  <LockKey size={20} weight="duotone" className="absolute left-3 top-3.5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/30 outline-none transition text-white placeholder-white/50"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-white/50 hover:text-white/70"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                  </button>
                </div>
                <p className="text-xs text-white/50 mt-1">Minimum 6 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Confirm Password *</label>
                <div className="relative">
                  <LockKey size={20} weight="duotone" className="absolute left-3 top-3.5 text-white/40" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:ring-2 focus:ring-[#cd9429]/30 outline-none transition text-white placeholder-white/50"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-white/50 hover:text-white/70"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">I am a *</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border border-white/10 rounded-xl cursor-pointer transition-all hover:border-[#cd9429]/60" style={{ borderColor: formData.role === "student" ? "#cd9429" : "" }}>
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
                <label className="flex items-center gap-2 p-3 border border-white/10 rounded-xl cursor-pointer transition-all hover:border-[#cd9429]/60" style={{ borderColor: formData.role === "employee" ? "#cd9429" : "" }}>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#cd9429] hover:bg-[#e3a842] disabled:opacity-60 text-slate-950 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
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
            {error && (
              <p className="text-red-300 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            Already have an account?{" "}
            <a href="/login" className="text-[#cd9429] hover:underline font-semibold">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
