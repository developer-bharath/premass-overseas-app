import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentLogin() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('student@test.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Auto-redirect if already logged in as student
  useEffect(() => {
    if (loginAttempted && user && user.role === 'student') {
      navigate('/dashboard/student', { replace: true });
    }
  }, [user, navigate, loginAttempted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Valid email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setLoginAttempted(true);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: '#054374' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 0s' }}></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ backgroundColor: '#ffffff', animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="hidden md:flex flex-col justify-center space-y-8">
            <div className="animate-fade-in" style={{ animation: 'fade-in 0.8s ease-out 0.1s forwards', opacity: 0 }}>
              <h1 className="text-5xl font-bold text-white mb-2">
                Student <span style={{ color: '#cd9429' }}>Portal</span>
              </h1>
              <p className="text-white/80 text-lg">Continue your education journey</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Global Education</h3>
                    <p className="text-white/70 text-sm mt-1">Access top universities worldwide</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Expert Guidance</h3>
                    <p className="text-white/70 text-sm mt-1">24/7 support from counselors</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">✈️</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Visa Support</h3>
                    <p className="text-white/70 text-sm mt-1">Complete visa processing assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-scale-in" style={{ animation: 'scale-in 0.6s ease-out forwards', opacity: 0 }}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-2 text-white">Student Login</h2>
              <p className="text-white/80 mb-6">Access your student account</p>

              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold">Error</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#cd9429' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="student@example.com"
                      className="w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90"
                      style={focusedField === 'email' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#cd9429' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90"
                      style={focusedField === 'password' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: '#cd9429' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Test Credentials */}
                <div className="rounded-xl p-4 border-2 text-white" style={{ backgroundColor: 'rgba(205, 148, 41, 0.15)', borderColor: '#cd9429' }}>
                  <p className="font-semibold text-sm mb-2">Demo Credentials:</p>
                  <p className="text-sm font-mono">📧 student@test.com</p>
                  <p className="text-sm font-mono">🔐 password123</p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center space-x-2"
                  style={{ background: `linear-gradient(to right, #054374, #cd9429)` }}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center text-gray-300 mt-6 space-y-2">
                <p>Don't have an account? <Link to="/register" className="font-semibold hover:transition-colors" style={{ color: '#cd9429' }}>Register</Link></p>
                <p>Employee? <Link to="/login/employee" className="font-semibold hover:transition-colors" style={{ color: '#cd9429' }}>Employee Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
