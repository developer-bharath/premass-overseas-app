import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { educationLoanAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function EducationLoanAdmin() {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', loanAmount: '', bank: '' });

  const { data, loading, error, refetch } = useFetch(
    () => educationLoanAPI.getApplications(1, 50),
    []
  ) as any;

  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    async (formData) => {
      await educationLoanAPI.createApplication(formData);
    }
  );

  const applications = data?.data || [];

  const stats = [
    { label: 'Total Applications', value: data?.total || '189', color: 'bg-green-500' },
    { label: 'Approved', value: data?.stats?.approved || '145', color: 'bg-green-600' },
    { label: 'In Process', value: data?.stats?.inProcess || '32', color: 'bg-orange-500' },
    { label: 'Disbursed', value: data?.stats?.disbursed || '112', color: 'bg-blue-500' },
  ];

  const statusColors: Record<string, string> = {
    'pending': 'bg-red-100 text-red-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    'approved': 'bg-green-100 text-green-800',
  };

  const filteredApplications = applications.filter((app: any) =>
    app.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#054374] mb-8">Education Loan Admin</h1>

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

        {activeTab === 'applications' && (
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
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                onClick={() => handleSubmit(formData)}
                disabled={submitLoading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus size={20} /> {submitLoading ? 'Creating...' : 'New Application'}
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
                  <Loader className="animate-spin text-green-500" size={32} />
                </div>
              )}
              {error && (
                <div className="p-8 flex justify-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <span>Error loading applications</span>
                </div>
              )}
              {!loading && !error && (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Loan Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Bank Partner</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No applications found</td></tr>
                  ) : (
                  filteredApplications.map((app: any) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{app.name}</td>
                      <td className="px-6 py-4 text-gray-600">{app.email}</td>
                      <td className="px-6 py-4 font-semibold">{app.loanAmount}</td>
                      <td className="px-6 py-4">{app.bank}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                          {app.status}
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
                            await educationLoanAPI.deleteApplication(app.id);
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
              <h3 className="text-lg font-bold mb-4">Loan Distribution by Bank</h3>
              <div className="space-y-3">
                {[
                  { bank: 'SBI', amount: '₹45,00,000', percentage: 28 },
                  { bank: 'ICICI', amount: '₹40,00,000', percentage: 24 },
                  { bank: 'HDFC', amount: '₹38,00,000', percentage: 23 },
                  { bank: 'Axis', amount: '₹37,00,000', percentage: 25 },
                ].map(item => (
                  <div key={item.bank}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.bank}</span>
                      <span className="text-sm text-gray-600">{item.amount}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Monthly Disbursements</h3>
              <div className="space-y-4">
                {[
                  { month: 'November', amount: '₹8,50,000' },
                  { month: 'December', amount: '₹12,30,000' },
                  { month: 'January', amount: '₹10,75,000' },
                ].map(item => (
                  <div key={item.month} className="flex justify-between items-center">
                    <span className="font-medium">{item.month}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Loan Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Loan Amount</label>
                <input type="number" defaultValue={500000} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Maximum Loan Amount</label>
                <input type="number" defaultValue={5000000} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Processing Fee %</label>
                <input type="number" defaultValue={2.5} step={0.1} className="w-full border rounded px-3 py-2" />
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
