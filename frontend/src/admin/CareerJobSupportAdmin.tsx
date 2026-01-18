import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { careerJobSupportAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function CareerJobSupportAdmin() {
  const [activeTab, setActiveTab] = useState('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ candidateName: '', email: '', role: '' });

  const { data, loading, error, refetch } = useFetch(
    () => careerJobSupportAPI.getCandidates(1, 50),
    []
  ) as any;

  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    async (formData) => {
      await careerJobSupportAPI.createCandidate(formData);
    }
  );

  const candidates = data?.data || [];

  const stats = [
    { label: 'Total Candidates', value: data?.total || '345', color: 'bg-cyan-500' },
    { label: 'Placed', value: data?.stats?.placed || '312', color: 'bg-green-500' },
    { label: 'In Interview', value: data?.stats?.interview || '23', color: 'bg-orange-500' },
    { label: 'Avg Salary', value: data?.stats?.avgSalary || '₹10.5 L', color: 'bg-blue-500' },
  ];

  const statusColors: Record<string, string> = {
    'applied': 'bg-gray-100 text-gray-800',
    'interview': 'bg-orange-100 text-orange-800',
    'offer': 'bg-blue-100 text-blue-800',
    'placed': 'bg-green-100 text-green-800',
  };

  const filteredCandidates = candidates.filter((c: any) =>
    c.candidateName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#054374] mb-8">Career & Job Support Admin</h1>

        <div className="flex gap-4 border-b mb-8">
          {['candidates', 'analytics', 'settings'].map(tab => (
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

        {activeTab === 'candidates' && (
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
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button
                onClick={() => handleSubmit(formData)}
                disabled={submitLoading}
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition flex items-center gap-2"
              >
                <Plus size={20} /> {submitLoading ? 'Adding...' : 'Add Candidate'}
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
                  <Loader className="animate-spin text-cyan-500" size={32} />
                </div>
              )}
              {error && (
                <div className="p-8 flex justify-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <span>Error loading candidates</span>
                </div>
              )}
              {!loading && !error && (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Salary</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No candidates found</td></tr>
                  ) : (
                  filteredCandidates.map((candidate: any) => (
                    <tr key={candidate.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{candidate.candidateName}</td>
                      <td className="px-6 py-4 text-gray-600">{candidate.email}</td>
                      <td className="px-6 py-4">{candidate.role}</td>
                      <td className="px-6 py-4">{candidate.company}</td>
                      <td className="px-6 py-4 font-semibold">{candidate.salary}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[candidate.status]}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200">
                          <Eye size={16} />
                        </button>
                        <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await careerJobSupportAPI.deleteCandidate(candidate.id);
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
              <h3 className="text-lg font-bold mb-4">Placement Rate</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="10" strokeDasharray={`${90.5} ${314.159}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">90%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">312 out of 345 candidates placed</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Top Hiring Companies</h3>
              <div className="space-y-3">
                {[
                  { company: 'TCS', placements: 45 },
                  { company: 'Infosys', placements: 38 },
                  { company: 'Wipro', placements: 35 },
                  { company: 'HCL', placements: 32 },
                ].map(item => (
                  <div key={item.company}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.company}</span>
                      <span className="text-sm text-gray-600">{item.placements}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(item.placements / 45) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Career Service Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Resume Review Cost</label>
                <input type="number" defaultValue={2500} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interview Coaching Rate (per hour)</label>
                <input type="number" defaultValue={1000} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Default Placement Target (months)</label>
                <input type="number" defaultValue={3} className="w-full border rounded px-3 py-2" />
              </div>
              <button className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
