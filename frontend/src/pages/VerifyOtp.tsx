import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();

  // Get email from session or location state
  useEffect(() => {
    const registeredEmail =
      sessionStorage.getItem("registeredEmail") ||
      (location.state?.email as string);

    if (!registeredEmail) {
      navigate("/register");
      return;
    }

    setEmail(registeredEmail);
  }, [location, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      await verifyOtp(email, otp);
      setSuccess(true);

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Email
          </h1>
          <p className="text-gray-600 mb-2">
            We sent a code to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Code expires in {formatTime(timeLeft)}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Email verified! Redirecting to login...
            </div>
          )}

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.toUpperCase())}
              placeholder="000000"
              maxLength={6}
              inputMode="numeric"
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || timeLeft <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
          <button
            type="button"
            disabled={timeLeft > 300} // Can resend after 5 minutes
            className="text-blue-600 hover:underline font-semibold disabled:text-gray-400"
          >
            Resend Code
          </button>
        </div>

        {/* Back to Register */}
        <p className="text-center text-gray-600 mt-6">
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Back to Registration
          </a>
        </p>
      </div>
    </div>
  );
}
