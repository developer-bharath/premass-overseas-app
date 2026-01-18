import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader, User, Phone, ArrowRight, Shield, Zap, CheckCircle } from 'lucide-react';
import { authAPI } from '../utils/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (formData.phone.length < 10) {
      setError('Valid phone number is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email: formData.email } });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
          {/* Left Side - Benefits (Hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-center space-y-8">
            <div className="animate-fade-in" style={{ animation: 'fade-in 0.8s ease-out 0.1s forwards', opacity: 0 }}>
              <h1 className="text-5xl font-bold text-white mb-2">
                Premass <span style={{ color: '#cd9429' }}>Overseas</span>
              </h1>
              <p className="text-white/80 text-lg">Your Gateway to Global Education</p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.2s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <Shield className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#cd9429' }} />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Secure Process</h3>
                    <p className="text-blue-100 text-sm mt-1">Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.3s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#cd9429' }} />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Quick Verification</h3>
                    <p className="text-blue-100 text-sm mt-1">Get verified in minutes with our streamlined process</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fade-in hover:bg-white/15 transition-all" style={{ animation: 'fade-in 0.8s ease-out 0.4s forwards', opacity: 0 }}>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#cd9429' }} />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Expert Guidance</h3>
                    <p className="text-blue-100 text-sm mt-1">Get support from our team of education experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="animate-scale-in" style={{ animation: 'scale-in 0.6s ease-out forwards', opacity: 0 }}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
              <p className="text-white/80 mb-6">Join thousands of students pursuing global education</p>

              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3 animate-shake" style={{ animation: 'shake 0.5s ease-in-out' }}>
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold">Registration Error</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-semibold">Success!</p>
                    <p className="text-green-700 text-sm">Redirecting to login...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-white font-semibold mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#cd9429' }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                        focusedField === 'name'
                          ? 'bg-white'
                          : 'hover:bg-white'
                      }`}
                      style={focusedField === 'name' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#cd9429' }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                        focusedField === 'email'
                          ? 'bg-white'
                          : 'hover:bg-white'
                      }`}
                      style={focusedField === 'email' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#cd9429' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                        focusedField === 'phone'
                          ? 'bg-white'
                          : 'hover:bg-white'
                      }`}
                      style={focusedField === 'phone' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="At least 6 characters"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                        focusedField === 'name'
                          ? 'bg-white'
                          : 'hover:bg-white'
                      }`}
                      style={focusedField === 'name' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Confirm your password"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                        focusedField === 'confirmPassword'
                          ? 'bg-white'
                          : 'hover:bg-white'
                      }`}
                      style={focusedField === 'confirmPassword' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                    />
                  </div>
                </div>

                {/* Role Selection Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, role: e.target.value }));
                      setError('');
                    }}
                    onFocus={() => setFocusedField('role')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none bg-white/90 ${
                      focusedField === 'role'
                        ? 'bg-white'
                        : 'hover:bg-white'
                    }`}
                    style={focusedField === 'role' ? { borderColor: '#cd9429' } : { borderColor: '#ffffff' }}
                  >
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center space-x-2"
                  style={{ background: `linear-gradient(to right, #054374, #cd9429)` }}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold hover:transition-colors" style={{ color: '#cd9429' }}>
                  Sign In
                </Link>
              </p>
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
