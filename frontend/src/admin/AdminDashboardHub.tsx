import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  GraduationCap,
  DollarSign,
  BookOpen,
  FileText,
  Briefcase,
  Code,
  MapPin,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function AdminDashboardHub() {
  const dashboards = [
    {
      title: 'Overseas Education',
      icon: Globe,
      color: 'bg-[#054374]',
      lightColor: 'bg-blue-100',
      route: '/admin/overseas-education',
      stats: { applications: '156', completed: '89', inProgress: '45' },
      description: 'Manage study abroad applications and track student progress',
    },
    {
      title: 'Domestic Admission',
      icon: GraduationCap,
      color: 'bg-[#054374]',
      lightColor: 'bg-amber-100',
      route: '/admin/domestic-admission',
      stats: { students: '234', admitted: '178', inProcess: '42' },
      description: 'Handle Indian college admissions and counseling',
    },
    {
      title: 'Education Loan',
      icon: DollarSign,
      color: 'bg-[#054374]',
      lightColor: 'bg-green-100',
      route: '/admin/education-loan',
      stats: { applications: '189', approved: '145', disbursed: '112' },
      description: 'Manage education loan applications and disbursements',
    },
    {
      title: 'Visa & Immigration',
      icon: BookOpen,
      color: 'bg-[#054374]',
      lightColor: 'bg-purple-100',
      route: '/admin/visa-immigration',
      stats: { applications: '267', approved: '198', inProcess: '52' },
      description: 'Track visa applications and immigration processes',
    },
    {
      title: 'Document Management',
      icon: FileText,
      color: 'bg-[#054374]',
      lightColor: 'bg-indigo-100',
      route: '/admin/document-management',
      stats: { documents: '1,234', verified: '1,098', pending: '98' },
      description: 'Manage secure document storage and verification',
    },
    {
      title: 'Career & Job Support',
      icon: Briefcase,
      color: 'bg-[#054374]',
      lightColor: 'bg-cyan-100',
      route: '/admin/career-job-support',
      stats: { candidates: '345', placed: '312', inInterview: '23' },
      description: 'Monitor career services and job placements',
    },
    {
      title: 'IT Training',
      icon: Code,
      color: 'bg-[#054374]',
      lightColor: 'bg-orange-100',
      route: '/admin/it-training',
      stats: { enrollments: '456', active: '89', completed: '234' },
      description: 'Manage IT course enrollments and training programs',
    },
    {
      title: 'Student Support & Settlement',
      icon: MapPin,
      color: 'bg-[#054374]',
      lightColor: 'bg-rose-100',
      route: '/admin/student-support-settlement',
      stats: { cases: '189', completed: '156', inProgress: '28' },
      description: 'Handle pre-departure and arrival support services',
    },
  ];

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#054374] to-[#073a57] w-14 h-14 rounded-lg flex items-center justify-center">
              <BarChart3 size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#054374]">Admin Control Center</h1>
              <p className="text-slate-600 mt-1">Manage all services and view comprehensive analytics</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Applications', value: '1,299', icon: '📊' },
            { label: 'Completed Cases', value: '811', icon: '✅' },
            { label: 'In Progress', value: '289', icon: '⏳' },
            { label: 'Success Rate', value: '89%', icon: '🎯' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-slate-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-[#054374]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Dashboards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboards.map((dashboard, idx) => {
            const Icon = dashboard.icon;
            return (
              <Link
                key={idx}
                to={dashboard.route}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Header with Icon */}
                <div className={`${dashboard.color} p-4 flex items-center justify-between`}>
                  <Icon size={32} className="text-white" />
                  <span className="text-xs bg-white bg-opacity-20 text-white px-2 py-1 rounded">
                    Dashboard
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#054374] mb-1 group-hover:text-[#073a57] transition">
                    {dashboard.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {dashboard.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 pt-4 border-t border-slate-200">
                    {Object.entries(dashboard.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold text-[#054374]">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className={`w-full ${dashboard.color} text-white py-2 rounded-lg font-semibold hover:opacity-90 transition group-hover:shadow-lg`}>
                    Open Dashboard →
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link
            to="/admin/overseas-education"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex items-center gap-4"
          >
            <div className="bg-slate-100 p-3 rounded-lg">
              <Users size={24} className="text-slate-700" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">User Management</p>
              <p className="text-sm text-slate-600">Manage admin users & roles</p>
            </div>
          </Link>

          <Link
            to="/admin/overseas-education"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex items-center gap-4"
          >
            <div className="bg-slate-100 p-3 rounded-lg">
              <BarChart3 size={24} className="text-slate-700" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Analytics & Reports</p>
              <p className="text-sm text-slate-600">View comprehensive reports</p>
            </div>
          </Link>

          <Link
            to="/admin/overseas-education"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex items-center gap-4"
          >
            <div className="bg-slate-100 p-3 rounded-lg">
              <Settings size={24} className="text-slate-700" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">System Settings</p>
              <p className="text-sm text-slate-600">Configure platform settings</p>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-600">
          <p className="text-sm">
            All dashboards are synchronized in real-time • Last updated: Just now
          </p>
        </div>
      </div>
    </div>
  );
}
