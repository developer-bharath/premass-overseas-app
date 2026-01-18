import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Mail, Lock, User, Building2, Badge } from 'lucide-react';

interface EmployeeLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
  permissions: string[];
  joiningDate: string;
  profileImage?: string;
}

export default function EmployeeLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [loginData, setLoginData] = useState<EmployeeLoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'overseas_education',
    designation: 'counselor',
    password: '',
    confirmPassword: '',
  });

  const [userProfile, setUserProfile] = useState<EmployeeProfile | null>(null);

  // Mock employee data for demo
  const mockEmployees: Record<string, EmployeeProfile> = {
    'raj@premass.com': {
      id: '1',
      name: 'Raj Kumar',
      email: 'raj@premass.com',
      phone: '+91-9876543210',
      department: 'overseas_education',
      designation: 'senior_counselor',
      role: 'employee',
      permissions: ['create_applications', 'view_applications', 'edit_applications', 'send_messages', 'view_reports'],
      joiningDate: '2023-01-15',
    },
    'priya@premass.com': {
      id: '2',
      name: 'Priya Singh',
      email: 'priya@premass.com',
      phone: '+91-9876543211',
      department: 'visa_immigration',
      designation: 'service_officer',
      role: 'employee',
      permissions: ['create_applications', 'view_applications', 'send_messages'],
      joiningDate: '2023-03-20',
    },
  };

  const departments = [
    { value: 'overseas_education', label: '🌍 Overseas Education' },
    { value: 'domestic_admission', label: '🎓 Domestic Admission' },
    { value: 'education_loan', label: '💰 Education Loan' },
    { value: 'visa_immigration', label: '📚 Visa & Immigration' },
    { value: 'document_management', label: '📄 Document Management' },
    { value: 'career_support', label: '💼 Career Support' },
    { value: 'it_training', label: '💻 IT Training' },
  ];

  const designations = [
    { value: 'counselor', label: 'Counselor' },
    { value: 'senior_counselor', label: 'Senior Counselor' },
    { value: 'service_officer', label: 'Service Officer' },
    { value: 'manager', label: 'Manager' },
  ];

  const allPermissions = [
    'view_applications',
    'create_applications',
    'edit_applications',
    'delete_applications',
    'approve_applications',
    'reject_applications',
    'send_messages',
    'view_reports',
    'manage_documents',
    'manage_employees',
    'manage_settings',
    'view_analytics',
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      const employee = mockEmployees[loginData.email];
      
      if (employee && loginData.password === 'password123') {
        setUserProfile(employee);
        setLoginSuccess(true);
        localStorage.setItem('employeeData', JSON.stringify(employee));
        
        // Redirect after 2 seconds
        setTimeout(() => {
          // In real app: navigate to dashboard
          alert(`Welcome ${employee.name}! You have access to ${employee.permissions.length} features.`);
        }, 1000);
      } else {
        setLoginError('Invalid email or password. Demo: Use raj@premass.com / password123');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newEmployee: EmployeeProfile = {
        id: Date.now().toString(),
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        department: signupData.department,
        designation: signupData.designation,
        role: 'employee',
        permissions: [],
        joiningDate: new Date().toISOString().split('T')[0],
      };

      setUserProfile(newEmployee);
      localStorage.setItem('employeeData', JSON.stringify(newEmployee));
      
      alert(`Account created successfully! Welcome ${signupData.name}. Please wait for admin to assign permissions.`);
      setIsLogin(true);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setLoginSuccess(false);
    setLoginData({ email: '', password: '', rememberMe: false });
    localStorage.removeItem('employeeData');
  };

  // Show user profile if logged in
  if (userProfile) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <User className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-gray-600">Logged in as: {userProfile.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
            style={{ backgroundColor: '#054374' }}
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Profile Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">FULL NAME</p>
                <p className="text-lg font-bold text-gray-900">{userProfile.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">EMAIL</p>
                <p className="text-lg font-bold text-gray-900">{userProfile.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">PHONE</p>
                <p className="text-lg font-bold text-gray-900">{userProfile.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">JOINING DATE</p>
                <p className="text-lg font-bold text-gray-900">{new Date(userProfile.joiningDate).toLocaleDateString()}</p>
              </div>
            </div>

            <hr className="my-6" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-500">DEPARTMENT</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {departments.find(d => d.value === userProfile.department)?.label}
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Badge className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-500">DESIGNATION</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {designations.find(d => d.value === userProfile.designation)?.label}
                </p>
              </div>
            </div>
          </div>

          {/* Permissions Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Access Summary</h3>
            
            <div className="mb-6">
              <p className="text-sm opacity-90 mb-1">Total Permissions</p>
              <p className="text-4xl font-bold">{userProfile.permissions.length}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm opacity-90">Assigned Features:</p>
              {userProfile.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.permissions.slice(0, 4).map(perm => (
                    <span key={perm} className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                      {perm.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {userProfile.permissions.length > 4 && (
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                      +{userProfile.permissions.length - 4} more
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-sm opacity-75">Waiting for admin to assign permissions</p>
              )}
            </div>
          </div>
        </div>

        {/* Permissions List */}
        <div className="mt-8 bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Permissions</h3>
          
          {userProfile.permissions.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userProfile.permissions.map(perm => (
                <div
                  key={perm}
                  className="p-4 border border-green-200 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }} />
                    <span className="text-sm font-semibold text-gray-900">
                      {perm.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No permissions assigned yet</p>
              <p className="text-sm text-gray-500 mt-1">Contact your administrator to request access</p>
            </div>
          )}
        </div>

        {/* Available Features */}
        <div className="mt-8 bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Available Features</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allPermissions.map(perm => {
              const hasPermission = userProfile.permissions.includes(perm);
              return (
                <div
                  key={perm}
                  className={`p-4 rounded-lg border-2 transition ${
                    hasPermission
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      hasPermission
                        ? 'border-green-400 bg-green-400'
                        : 'border-gray-300'
                    }`}>
                      {hasPermission && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${
                      hasPermission ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {perm.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show login/signup form
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
            <LogIn className="w-8 h-8" style={{ color: '#054374' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Portal</h1>
          <p className="text-gray-600">Manage your access and permissions</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              isLogin
                ? 'text-white'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{ backgroundColor: isLogin ? '#054374' : 'transparent' }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              !isLogin
                ? 'text-white'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{ backgroundColor: !isLogin ? '#054374' : 'transparent' }}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {loginError}
              </div>
            )}

            {loginSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Login successful! Redirecting...
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374]"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={loginData.rememberMe}
                onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
              style={{ backgroundColor: '#054374' }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Demo credentials: raj@premass.com / password123
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={signupData.phone}
                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="+91-9876543210"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  value={signupData.department}
                  onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                <select
                  value={signupData.designation}
                  onChange={(e) => setSignupData({ ...signupData, designation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                >
                  {designations.map(des => (
                    <option key={des.value} value={des.value}>{des.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
              style={{ backgroundColor: '#054374' }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
