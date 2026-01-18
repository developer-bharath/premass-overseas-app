import React, { useState } from 'react';
import { Menu, X, LogOut, Home, Users, Briefcase, Lock, FileText, Settings, BarChart3 } from 'lucide-react';
import AdminHomeHub from './AdminHomeHub';
import EmployeeManagement from './EmployeeManagement';
import RoleManagement from './RoleManagement';
import PermissionsManagement from './PermissionsManagement';
import PermissionAssignments from './PermissionAssignments';
import AdminDashboardOptions from './AdminDashboardOptions';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  joiningDate: string;
  password: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: number;
}

interface LoggedInEmployee extends Employee {
  profilePicture?: string;
  lastLogin?: string;
}

const AdminDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggedInEmployee, setLoggedInEmployee] = useState<LoggedInEmployee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'emp001',
      name: 'Raj Kumar',
      email: 'raj@premass.com',
      phone: '+91 98765 43210',
      department: 'Overseas Education',
      designation: 'Senior Counselor',
      role: 'Manager',
      permissions: ['view_applications', 'create_applications', 'edit_applications', 'approve_applications', 'send_messages'],
      isActive: true,
      joiningDate: '2023-01-15',
      password: 'password123',
    },
    {
      id: 'emp002',
      name: 'Priya Singh',
      email: 'priya@premass.com',
      phone: '+91 97654 32109',
      department: 'Domestic Admission',
      designation: 'Counselor',
      role: 'Counselor',
      permissions: ['view_applications', 'send_messages', 'view_reports'],
      isActive: true,
      joiningDate: '2023-06-20',
      password: 'password123',
    },
    {
      id: 'emp003',
      name: 'Amit Sharma',
      email: 'amit@premass.com',
      phone: '+91 96543 21098',
      department: 'Education Loan',
      designation: 'Manager',
      role: 'Manager',
      permissions: ['view_applications', 'create_applications', 'edit_applications', 'approve_applications', 'manage_documents'],
      isActive: true,
      joiningDate: '2023-03-10',
      password: 'password123',
    },
  ]);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      component: AdminHomeHub,
      badge: undefined,
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: <Users className="w-5 h-5" />,
      component: EmployeeManagement,
      badge: employees.length,
    },
    {
      id: 'roles',
      label: 'Roles',
      icon: <Briefcase className="w-5 h-5" />,
      component: RoleManagement,
      badge: 4,
    },
    {
      id: 'permissions',
      label: 'Permissions',
      icon: <Lock className="w-5 h-5" />,
      component: PermissionsManagement,
      badge: 12,
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: <FileText className="w-5 h-5" />,
      component: PermissionAssignments,
      badge: employees.length,
    },
    {
      id: 'options',
      label: 'Dashboard Options',
      icon: <BarChart3 className="w-5 h-5" />,
      component: AdminDashboardOptions,
      badge: 6,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      component: () => (
        <div className="p-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <p className="text-gray-600">Admin settings coming soon...</p>
          </div>
        </div>
      ),
      badge: undefined,
    },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setLoggedInEmployee(null);
      setActiveModule('home');
    }
  };

  const handleLogin = (employee: Employee) => {
    setLoggedInEmployee({
      ...employee,
      lastLogin: new Date().toLocaleString(),
    });
  };

  const activeNavItem = navItems.find(item => item.id === activeModule);
  const ActiveComponent = activeNavItem?.component || AdminHomeHub;

  if (!loggedInEmployee) {
    return (
      <EmployeeLoginComponent
        employees={employees}
        onLogin={handleLogin}
        onAddEmployee={(employee) => setEmployees([...employees, employee])}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#054374] text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          {sidebarOpen && <h1 className="text-xl font-bold">PREMASS</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-700 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-blue-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-bold">
                {loggedInEmployee.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{loggedInEmployee.name}</p>
                <p className="text-xs text-blue-200 truncate">{loggedInEmployee.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                activeModule === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </div>
              {sidebarOpen && item.badge !== undefined && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-white font-semibold"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {navItems.find(item => item.id === activeModule)?.label || 'Dashboard'}
            </h2>
            <p className="text-sm text-gray-500">Manage your admin operations</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Welcome, {loggedInEmployee.name}</p>
            <p className="text-xs text-gray-400">{loggedInEmployee.email}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <ActiveComponent
            employees={employees}
            setEmployees={setEmployees}
            loggedInEmployee={loggedInEmployee}
          />
        </div>
      </div>
    </div>
  );
};

// Employee Login Component
interface EmployeeLoginComponentProps {
  employees: Employee[];
  onLogin: (employee: Employee) => void;
  onAddEmployee: (employee: Employee) => void;
}

const EmployeeLoginComponent: React.FC<EmployeeLoginComponentProps> = ({
  employees,
  onLogin,
  onAddEmployee,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    department: 'Overseas Education',
    designation: 'Counselor',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError('');
    const employee = employees.find(
      (emp) => emp.email === loginData.email && emp.password === loginData.password
    );
    if (employee) {
      onLogin(employee);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = () => {
    setError('');
    if (!signupData.name || !signupData.email || !signupData.password) {
      setError('Please fill in all fields');
      return;
    }
    const newEmployee: Employee = {
      id: `emp${Date.now()}`,
      ...signupData,
      role: 'Counselor',
      permissions: ['view_applications', 'send_messages'],
      isActive: true,
      joiningDate: new Date().toISOString().split('T')[0],
    };
    onAddEmployee(newEmployee);
    setIsLogin(true);
    setSignupData({
      name: '',
      email: '',
      phone: '',
      password: '',
      department: 'Overseas Education',
      designation: 'Counselor',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#054374] to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#054374] text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">PREMASS</h1>
          <p className="text-blue-100">Admin Management System</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {isLogin ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">Admin Login</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374]"
                  placeholder="admin@premass.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-[#054374] hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Login
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={() => setIsLogin(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Create New Account
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 font-semibold mb-3">Demo Credentials:</p>
                <div className="space-y-2 text-sm">
                  <p>📧 <span className="font-mono text-gray-700">raj@premass.com</span></p>
                  <p>🔐 <span className="font-mono text-gray-700">password123</span></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 text-center">Create Account</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374] text-sm"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374] text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374] text-sm"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                <select
                  value={signupData.department}
                  onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374] text-sm"
                >
                  <option>Overseas Education</option>
                  <option>Domestic Admission</option>
                  <option>Education Loan</option>
                  <option>Visa & Immigration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374] text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                onClick={handleSignup}
                className="w-full bg-[#054374] hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Create Account
              </button>

              <button
                onClick={() => setIsLogin(true)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
