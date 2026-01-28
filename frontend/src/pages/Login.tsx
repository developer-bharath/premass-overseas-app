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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Premass Overseas</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Welcome Back</h1>
            <p className="text-white/70 mt-2">Access your account and continue your journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 border border-white/10 rounded-xl cursor-pointer transition-all hover:border-[#cd9429]/60" style={{ borderColor: role === "student" ? "#cd9429" : "" }}>
                <input
                  type="radio"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value as "student")}
                  className="w-4 h-4"
                />
                <span className="font-medium text-sm">Student</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-white/10 rounded-xl cursor-pointer transition-all hover:border-[#cd9429]/60" style={{ borderColor: role === "employee" ? "#cd9429" : "" }}>
                <input
                  type="radio"
                  value="employee"
                  checked={role === "employee"}
                  onChange={(e) => setRole(e.target.value as "employee")}
                  className="w-4 h-4"
                />
                <span className="font-medium text-sm">Staff</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
              <div className="relative">
                <Envelope className="absolute left-3 top-3.5 text-white/40" size={20} weight="duotone" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:outline-none transition text-white placeholder-white/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <LockKey className="absolute left-3 top-3.5 text-white/40" size={20} weight="duotone" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/10 rounded-xl focus:border-[#cd9429] focus:outline-none transition text-white placeholder-white/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-white/50 hover:text-white/70"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlash size={20} weight="duotone" /> : <Eye size={20} weight="duotone" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-white/60">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20"
                  disabled={isLoading}
                />
                <span>Remember me</span>
              </label>
              <Link to="#" className="text-[#cd9429] hover:text-[#e3a842] font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#cd9429] hover:bg-[#e3a842] text-slate-950 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70"
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
            {error && (
              <p className="text-red-300 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[#cd9429] hover:underline">
              Create one
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-white/50 hover:text-[#cd9429] transition-colors font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
