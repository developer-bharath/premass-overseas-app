import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeSlash, Envelope, LockKey, CircleNotch } from "phosphor-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"student" | "employee">("student");

  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Validation
  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  // ✅ Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
      
      // Get user from localStorage (set by AuthContext)
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      // ✅ Redirect based on role
      if (user?.role === "student") {
        navigate("/dashboard/student");
      } else if (user?.role === "employee" || user?.role === "admin") {
        navigate("/dashboard/employee");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#054374] to-[#073a57] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#054374] mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your Premass Overseas account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Role Selection */}
            <div className="flex gap-3 mb-6">
              <label className="flex-1 flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all" style={{ borderColor: role === "student" ? "#cd9429" : "#e0e7ff" }}>
                <input
                  type="radio"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value as "student")}
                  className="w-4 h-4"
                />
                <span className="font-medium text-sm">Student</span>
              </label>
              <label className="flex-1 flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all" style={{ borderColor: role === "employee" ? "#cd9429" : "#e0e7ff" }}>
                <input
                  type="radio"
                  value="employee"
                  checked={role === "employee"}
                  onChange={(e) => setRole(e.target.value as "employee")}
                  className="w-4 h-4"
                />
                <span className="font-medium text-sm">Employee</span>
              </label>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#054374] mb-2">Email Address</label>
              <div className="relative">
                <Envelope className="absolute left-3 top-3.5 text-gray-400" size={20} weight="duotone" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#054374] mb-2">Password</label>
              <div className="relative">
                <LockKey className="absolute left-3 top-3.5 text-gray-400" size={20} weight="duotone" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:outline-none transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#cd9429] to-orange-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <CircleNotch size={20} weight="bold" className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="#"
                className="text-sm text-[#cd9429] hover:text-orange-600 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#cd9429] hover:text-orange-600 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Demo Account:</strong> Use any email with password to test (your backend validates)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-white hover:text-[#cd9429] transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
