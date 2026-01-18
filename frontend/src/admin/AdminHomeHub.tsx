import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Shield,
  Lock,
  UserCheck,
  Settings,
  LogIn,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface AdminHomeHubProps {
  employees?: any[];
  setEmployees?: (employees: any[]) => void;
  loggedInEmployee?: any;
}

function AdminHomeHub(props: AdminHomeHubProps) {
  const { employees = [] } = props;

  const adminModules = [
    {
      id: 'employees',
      title: 'Employee Management',
      description: 'Add, edit, and manage team members with their details and roles',
      icon: Users,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      stats: { value: '24', label: 'Employees' },
      route: '/admin/employees',
      features: ['Add employees', 'Edit details', 'Assign permissions', 'Toggle status'],
    },
    {
      id: 'roles',
      title: 'Role Management',
      description: 'Create job roles with specific permissions and hierarchy levels',
      icon: Shield,
      color: '#8b5cf6',
      bgColor: '#faf5ff',
      stats: { value: '8', label: 'Active Roles' },
      route: '/admin/roles',
      features: ['Create roles', 'Set permissions', 'Define hierarchy', 'Assign departments'],
    },
    {
      id: 'permissions',
      title: 'Permissions',
      description: 'Define and manage system permissions with risk level categorization',
      icon: Lock,
      color: '#10b981',
      bgColor: '#f0fdf4',
      stats: { value: '12', label: 'Permissions' },
      route: '/admin/permissions',
      features: ['Define permissions', 'Set categories', 'Risk assessment', 'Enable/disable'],
    },
    {
      id: 'assignments',
      title: 'Permission Assignments',
      description: 'Assign specific permissions to individual employees and manage access',
      icon: UserCheck,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      stats: { value: '18', label: 'Assigned' },
      route: '/admin/assignments',
      features: ['Assign permissions', 'Bulk management', 'Export/import', 'Track history'],
    },
    {
      id: 'options',
      title: 'Dashboard Options',
      description: 'Configure admin dashboard features and assign them to employees',
      icon: Settings,
      color: '#06b6d4',
      bgColor: '#ecfdf5',
      stats: { value: '6', label: 'Options' },
      route: '/admin/options',
      features: ['Configure options', 'Set permissions', 'Toggle features', 'Track usage'],
    },
    {
      id: 'login',
      title: 'Employee Login',
      description: 'Employee authentication portal and profile management system',
      icon: LogIn,
      color: '#ec4899',
      bgColor: '#fce7f3',
      stats: { value: '100%', label: 'Uptime' },
      route: '/employee/login',
      features: ['Login/signup', 'View profile', 'Check permissions', 'Logout'],
    },
  ];

  const quickStats = [
    { label: 'Total Employees', value: '24', trend: '+8' },
    { label: 'Active Permissions', value: '12', trend: '+2' },
    { label: 'Team Roles', value: '8', trend: '0' },
    { label: 'Departments', value: '8', trend: '+1' },
  ];

  const recentActivities = [
    { action: 'New employee added', status: 'success', time: '2 hours ago' },
    { action: 'Permission updated', status: 'info', time: '5 hours ago' },
    { action: 'Role assignment completed', status: 'success', time: 'Yesterday' },
  ];

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Main Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
            <Settings className="w-10 h-10" style={{ color: '#054374' }} />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Admin Control Center</h1>
            <p className="text-gray-600 text-lg mt-2">Manage employees, roles, and permissions</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-green-600 font-semibold text-sm">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Modules Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map(module => {
            const Icon = module.icon;
            return (
              <Link
                key={module.id}
                to={module.route}
                className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:scale-105 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-lg group-hover:scale-110 transition"
                      style={{ backgroundColor: module.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: module.color }} />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: module.color }}
                    >
                      {module.stats.value}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                  {/* Stats */}
                  <p className="text-xs text-gray-500 mb-4">{module.stats.label}</p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: module.color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <div className="flex items-center space-x-2 text-sm font-semibold" style={{ color: module.color }}>
                    <span>Access Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'success'
                    ? 'bg-green-100'
                    : 'bg-blue-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className={`w-5 h-5 ${activity.status === 'success' ? 'text-green-600' : 'text-blue-600'}`} />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow p-6 text-white">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/admin/employees"
              className="flex items-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
            >
              <Users className="w-5 h-5" />
              <span className="font-semibold">Add Employee</span>
            </Link>
            <Link
              to="/admin/roles"
              className="flex items-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
            >
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Create Role</span>
            </Link>
            <Link
              to="/admin/assignments"
              className="flex items-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
            >
              <UserCheck className="w-5 h-5" />
              <span className="font-semibold">Assign Permissions</span>
            </Link>
            <Link
              to="/employee/login"
              className="flex items-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-semibold">Employee Login</span>
            </Link>
          </div>

          <hr className="my-6 border-white border-opacity-20" />

          <div className="space-y-2">
            <p className="text-sm font-semibold">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              Check the comprehensive documentation for setup instructions, API integration details, and best practices.
            </p>
            <div className="flex space-x-4">
              <a
                href="/docs/admin-system-guide"
                className="text-blue-600 font-semibold hover:text-blue-800 underline"
              >
                View Full Guide
              </a>
              <a
                href="/docs/quick-start"
                className="text-blue-600 font-semibold hover:text-blue-800 underline"
              >
                Quick Start
              </a>
              <a
                href="/docs/api-reference"
                className="text-blue-600 font-semibold hover:text-blue-800 underline"
              >
                API Reference
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeHub;
