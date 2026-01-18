import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, BarChart3, AlertCircle, Loader } from 'lucide-react';
import { overseasEducationAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function OverseasEducationAdmin() {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch applications from API
  const { data, loading, error, refetch } = useFetch(
    () => overseasEducationAPI.getApplications(1, 50),
    []
  );

  // Form submission handler
  const { handleSubmit: submitApplication, loading: submitLoading, error: submitError } = useFormSubmit(
    (formData: any) => overseasEducationAPI.createApplication(formData)
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
  });

  const applications = data?.data || [];

  const stats = [
    { label: 'Total Applications', value: data?.total || '156', color: 'bg-blue-500' },
    { label: 'Completed', value: data?.completed || '89', color: 'bg-green-500' },
    { label: 'In Progress', value: data?.inProgress || '45', color: 'bg-orange-500' },
    { label: 'Pending', value: data?.pending || '22', color: 'bg-red-500' },
  ];

  const statusColors: Record<string, string> = {
    'pending': 'bg-red-100 text-red-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
  };

  const filteredApplications = applications.filter((app: any) =>
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#054374] mb-2">Overseas Education Admin</h1>
          <p className="text-gray-600">Manage applications, track progress, and analyze metrics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-8">
          {['applications', 'analytics', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-[#cd9429] border-b-2 border-[#cd9429]'
                  : 'text-gray-600 hover:text-[#054374]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <div className={`${stat.color} w-12 h-12 rounded-lg mb-4`}></div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#054374]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search & Add */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd9429]"
                />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#054374] text-white px-6 py-2 rounded-lg hover:bg-[#073a57] transition flex items-center gap-2"
              >
                <Plus size={20} /> Add Application
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold mb-4">New Application</h3>
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {submitError}
                  </div>
                )}
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border rounded px-3 py-2"
                  />
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="border rounded px-3 py-2"
                  >
                    <option>Select Destination</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={async () => {
                      try {
                        await submitApplication(formData);
                        setFormData({ name: '', email: '', destination: '' });
                        setShowAddForm(false);
                        refetch();
                      } catch (err) {
                        console.error('Submission error:', err);
                      }
                    }}
                    disabled={submitLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitLoading && <Loader size={16} className="animate-spin" />}
                    {submitLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading && (
                <div className="p-8 text-center">
                  <Loader className="animate-spin mx-auto mb-2" />
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              )}

              {error && (
                <div className="p-6 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-red-700">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              {!loading && !error && (
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Destination</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stage</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app: any) => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{app.name}</td>
                          <td className="px-6 py-4 text-gray-600">{app.email}</td>
                          <td className="px-6 py-4">{app.destination}</td>
                          <td className="px-6 py-4 text-sm">{app.stage || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <button className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition">
                              <Eye size={16} />
                            </button>
                            <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm('Delete this application?')) {
                                  try {
                                    await overseasEducationAPI.deleteApplication(app.id);
                                    refetch();
                                  } catch (err) {
                                    alert('Failed to delete');
                                  }
                                }
                              }}
                              className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                          No applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 /> Application Timeline
              </h3>
              <div className="space-y-4">
                {[
                  { month: 'January', applications: 45 },
                  { month: 'February', applications: 52 },
                  { month: 'March', applications: 38 },
                  { month: 'April', applications: 61 },
                ].map(item => (
                  <div key={item.month} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{item.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(item.applications / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold w-12">{item.applications}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Popular Destinations</h3>
              <div className="space-y-3">
                {[
                  { country: 'USA', count: 45, percentage: 28 },
                  { country: 'UK', count: 38, percentage: 24 },
                  { country: 'Canada', count: 36, percentage: 23 },
                  { country: 'Australia', count: 37, percentage: 25 },
                ].map(item => (
                  <div key={item.country}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.country}</span>
                      <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Service Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Default Processing Days</label>
                <input type="number" defaultValue={30} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notification Email</label>
                <input type="email" defaultValue="admin@premass.com" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Auto-assignment to Team</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
