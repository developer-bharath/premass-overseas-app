import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Loader, CheckCircle, ArrowRight } from 'lucide-react';
import { authAPI } from '../utils/api';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const email = location.state?.email || '';

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');

    // Auto-submit on 6 digits
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  const handleVerify = async (otpValue: string = otp) => {
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      await authAPI.verifyOtp({ email, otp: otpValue });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email } });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authAPI.resendOtp({ email });
      setTimeLeft(300);
      setCanResend(false);
      setError('');
      setOtp('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: '#054374' }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 0s' }}></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ backgroundColor: '#ffffff', animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 4s' }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Security Benefits (Hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-center space-y-8">
            <div className="animate-fade-in" style={{ animation: 'fade-in 0.8s ease-out 0.1s forwards', opacity: 0 }}>
              <h1 className="text-5xl font-bold text-white mb-2">
                Verify Your <span style={{ color: '#cd9429' }}>Email</span>
              </h1>
              <p className="text-white/80 text-lg">Secure your account in seconds</p>
            </div>

            {/* Security Features */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.2s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">🔒</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Secure</h3>
                    <p className="text-blue-100 text-sm mt-1">Your account is protected with encryption</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.3s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">⚡</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Instant</h3>
                    <p className="text-blue-100 text-sm mt-1">Verification takes less than a minute</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.4s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">✓</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Verified</h3>
                    <p className="text-blue-100 text-sm mt-1">Join our trusted community of students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - OTP Form */}
          <div className="animate-scale-in" style={{ animation: 'scale-in 0.6s ease-out forwards', opacity: 0 }}>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#054374' }}>Enter Verification Code</h2>
              <p className="text-gray-600 mb-1">We've sent a code to</p>
              <p className="text-gray-700 font-semibold mb-6">{email}</p>

              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3 animate-shake" style={{ animation: 'shake 0.5s ease-in-out' }}>
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold">Verification Error</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-semibold">Success!</p>
                    <p className="text-green-700 text-sm">Email verified. Redirecting to login...</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-white font-semibold mb-4">6-Digit Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-6 py-4 text-center text-4xl font-bold border-2 rounded-2xl focus:outline-none bg-white/90 focus:bg-white transition-all tracking-widest"
                    style={{ borderColor: '#cd9429' }}
                  />
                  <p className="text-gray-600 text-sm mt-3 text-center">Enter the code from your email inbox</p>
                </div>

                {/* Timer Display */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <p className="text-gray-600 font-medium mb-1">Code expires in:</p>
                    <p className="text-3xl font-bold" style={{ color: '#cd9429' }}>
                      {formatTime(timeLeft)}
                    </p>
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={() => handleVerify()}
                    disabled={loading || otp.length !== 6}
                    className="w-full text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center space-x-2"
                    style={{ background: `linear-gradient(to right, #054374, #cd9429)` }}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Code</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Resend Button */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 text-sm text-center mb-4">Didn't receive the code?</p>
                  <button
                    onClick={handleResend}
                    disabled={!canResend}
                    className="w-full border-2 font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50" 
                    style={{ borderColor: '#cd9429', color: '#cd9429' }}
                  >
                    {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
                  </button>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-gray-700 text-sm">
                    <strong className="text-blue-900">Tip:</strong> Check your spam folder if you don't see the email. Demo code: <span className="font-mono bg-white px-2 py-1 rounded">000000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
