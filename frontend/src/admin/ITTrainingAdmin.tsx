import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { itTrainingAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function ITTrainingAdmin() {
  const [activeTab, setActiveTab] = useState('enrollments');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ candidateName: '', email: '', course: '' });

  const { data, loading, error, refetch } = useFetch(
    () => itTrainingAPI.getEnrollments(1, 50),
    []
  ) as any;

  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    async (formData) => {
      await itTrainingAPI.createEnrollment(formData);
    }
  );

  const enrollments = data?.data || [];

  const stats = [
    { label: 'Total Enrollments', value: data?.total || '456', color: 'bg-orange-500' },
    { label: 'Active', value: data?.stats?.active || '12', color: 'bg-blue-500' },
    { label: 'Completed', value: data?.stats?.completed || '234', color: 'bg-green-500' },
    { label: 'Placement Rate', value: data?.stats?.placementRate || '94%', color: 'bg-purple-500' },
  ];

  const statusColors: Record<string, string> = {
    'active': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'dropped': 'bg-red-100 text-red-800',
  };

  const filteredEnrollments = enrollments.filter((e: any) =>
    e.candidateName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#054374] mb-8">IT Training Admin</h1>

        <div className="flex gap-4 border-b mb-8">
          {['enrollments', 'analytics', 'settings'].map(tab => (
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

        {activeTab === 'enrollments' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <div className={`${stat.color} w-12 h-12 rounded-lg mb-4`}></div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                onClick={() => handleSubmit(formData)}
                disabled={submitLoading}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <Plus size={20} /> {submitLoading ? 'Enrolling...' : 'New Enrollment'}
              </button>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex gap-2 mb-6">
                <AlertCircle size={20} />
                <span>{submitError}</span>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              {loading && (
                <div className="p-8 flex justify-center">
                  <Loader className="animate-spin text-orange-500" size={32} />
                </div>
              )}
              {error && (
                <div className="p-8 flex justify-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <span>Error loading enrollments</span>
                </div>
              )}
              {!loading && !error && (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Course</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Batch</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.length === 0 ? (
                    <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No enrollments found</td></tr>
                  ) : (
                  filteredEnrollments.map((enrollment: any) => (
                    <tr key={enrollment.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{enrollment.candidateName}</td>
                      <td className="px-6 py-4 text-gray-600">{enrollment.email}</td>
                      <td className="px-6 py-4">{enrollment.course}</td>
                      <td className="px-6 py-4">{enrollment.batch}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[enrollment.status]}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{enrollment.endDate}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200">
                          <Eye size={16} />
                        </button>
                        <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await itTrainingAPI.deleteEnrollment(enrollment.id);
                            refetch();
                          }}
                          className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Enrollments by Course</h3>
              <div className="space-y-3">
                {[
                  { course: 'Full Stack Web Dev', students: 78, percentage: 35 },
                  { course: 'Python Data Science', students: 65, percentage: 29 },
                  { course: 'Java Backend', students: 52, percentage: 23 },
                  { course: 'Cloud & DevOps', students: 34, percentage: 13 },
                ].map(item => (
                  <div key={item.course}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{item.course}</span>
                      <span className="text-sm text-gray-600">{item.students}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Course Completion Rate</h3>
              <div className="space-y-3">
                {[
                  { course: 'Full Stack Web Dev', rate: 92 },
                  { course: 'Python Data Science', rate: 88 },
                  { course: 'Java Backend', rate: 95 },
                  { course: 'Cloud & DevOps', rate: 89 },
                ].map(item => (
                  <div key={item.course}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.course}</span>
                      <span className="text-sm text-gray-600">{item.rate}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.rate}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Training Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Course Fee</label>
                <input type="number" defaultValue={35000} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Course Duration (weeks)</label>
                <input type="number" defaultValue={12} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Batch Size</label>
                <input type="number" defaultValue={20} className="w-full border rounded px-3 py-2" />
              </div>
              <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
