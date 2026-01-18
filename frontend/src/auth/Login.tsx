import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: '#054374' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 0s' }}></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ backgroundColor: '#ffffff', animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#cd9429', animation: 'blob 7s infinite 4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Premass <span style={{ color: '#cd9429' }}>Overseas</span>
          </h1>
          <p className="text-2xl text-white/80">Choose your login portal</p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div
            onMouseEnter={() => setHoveredCard('student')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group cursor-pointer"
            onClick={() => navigate('/login/student')}
          >
            <div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-12 border-2 transition-all duration-300 hover:scale-105 hover:bg-white/15"
              style={{ 
                borderColor: hoveredCard === 'student' ? '#cd9429' : 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div 
                  className="p-4 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(205, 148, 41, 0.2)' }}
                >
                  <Users className="w-16 h-16 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Student Login</h2>
                  <p className="text-white/80 text-lg">Access your student portal</p>
                </div>

                <div className="w-full space-y-2 text-left bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-white/90 font-semibold">Features:</p>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>✓ Dashboard with applications</li>
                    <li>✓ Ticket management</li>
                    <li>✓ Service tracking</li>
                    <li>✓ Profile management</li>
                  </ul>
                </div>

                <button
                  className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mt-4"
                  style={{ background: `linear-gradient(to right, #054374, #cd9429)` }}
                >
                  <span>Continue as Student</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Employee Card */}
          <div
            onMouseEnter={() => setHoveredCard('employee')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group cursor-pointer"
            onClick={() => navigate('/login/employee')}
          >
            <div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-12 border-2 transition-all duration-300 hover:scale-105 hover:bg-white/15"
              style={{ 
                borderColor: hoveredCard === 'employee' ? '#cd9429' : 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div 
                  className="p-4 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(205, 148, 41, 0.2)' }}
                >
                  <Briefcase className="w-16 h-16 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Employee Login</h2>
                  <p className="text-white/80 text-lg">Access your employee portal</p>
                </div>

                <div className="w-full space-y-2 text-left bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-white/90 font-semibold">Features:</p>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>✓ Support dashboard</li>
                    <li>✓ Student management</li>
                    <li>✓ Ticket handling</li>
                    <li>✓ Performance metrics</li>
                  </ul>
                </div>

                <button
                  className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mt-4"
                  style={{ background: `linear-gradient(to right, #054374, #cd9429)` }}
                >
                  <span>Continue as Employee</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/80">
            New user? <Link to="/register" className="font-semibold hover:text-white transition-colors" style={{ color: '#cd9429' }}>Register here</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
