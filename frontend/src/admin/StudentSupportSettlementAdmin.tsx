import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { studentSupportSettlementAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function StudentSupportSettlementAdmin() {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ studentName: '', email: '', destination: '' });

  const { data, loading, error, refetch } = useFetch(
    () => studentSupportSettlementAPI.getCases(1, 50),
    []
  ) as any;

  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    async (formData) => {
      await studentSupportSettlementAPI.createCase(formData);
    }
  );

  const cases = data?.data || [];

  const stats = [
    { label: 'Total Cases', value: data?.total || '189', color: 'bg-rose-500' },
    { label: 'Completed', value: data?.stats?.completed || '156', color: 'bg-green-500' },
    { label: 'In Progress', value: data?.stats?.inProgress || '28', color: 'bg-orange-500' },
    { label: 'Avg Cost', value: data?.stats?.avgCost || '₹2.5 L', color: 'bg-blue-500' },
  ];

  const statusColors: Record<string, string> = {
    'pending': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
  };

  const filteredCases = cases.filter((c: any) =>
    c.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#054374] mb-8">Student Support & Settlement Admin</h1>

        <div className="flex gap-4 border-b mb-8">
          {['cases', 'analytics', 'settings'].map(tab => (
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

        {activeTab === 'cases' && (
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
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <button
                onClick={() => handleSubmit(formData)}
                disabled={submitLoading}
                className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition flex items-center gap-2"
              >
                <Plus size={20} /> {submitLoading ? 'Creating...' : 'New Case'}
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
                  <Loader className="animate-spin text-rose-500" size={32} />
                </div>
              )}
              {error && (
                <div className="p-8 flex justify-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <span>Error loading cases</span>
                </div>
              )}
              {!loading && !error && (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Destination</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Current Stage</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No cases found</td></tr>
                  ) : (
                  filteredCases.map((settleCase: any) => (
                    <tr key={settleCase.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{settleCase.studentName}</td>
                      <td className="px-6 py-4 text-gray-600">{settleCase.email}</td>
                      <td className="px-6 py-4">{settleCase.destination}</td>
                      <td className="px-6 py-4 text-sm">{settleCase.stage}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[settleCase.status]}`}>
                          {settleCase.status}
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
                            await studentSupportSettlementAPI.deleteCase(settleCase.id);
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
              <h3 className="text-lg font-bold mb-4">Cases by Destination</h3>
              <div className="space-y-3">
                {[
                  { country: 'USA', cases: 52, percentage: 27 },
                  { country: 'Canada', cases: 48, percentage: 25 },
                  { country: 'UK', cases: 41, percentage: 22 },
                  { country: 'Australia', cases: 48, percentage: 26 },
                ].map(item => (
                  <div key={item.country}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.country}</span>
                      <span className="text-sm text-gray-600">{item.cases}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Settlement Services Used</h3>
              <div className="space-y-3">
                {[
                  { service: 'Accommodation Arrangement', usage: 95 },
                  { service: 'Travel Booking', usage: 89 },
                  { service: 'Health Insurance', usage: 92 },
                  { service: 'Visa Support', usage: 88 },
                ].map(item => (
                  <div key={item.service}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.service}</span>
                      <span className="text-sm text-gray-600">{item.usage}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.usage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Settlement Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Standard Processing Time (days)</label>
                <input type="number" defaultValue={45} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Accommodation Search Buffer (days)</label>
                <input type="number" defaultValue={30} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Insurance Provider</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Aditya Birla Health</option>
                  <option>Care Health</option>
                  <option>Max Bupa</option>
                </select>
              </div>
              <button className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 transition">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
