import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, Loader } from 'lucide-react';
import { documentManagementAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';

export default function DocumentManagementAdmin() {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ fileName: '', owner: '', type: '' });

  const { data, loading, error, refetch } = useFetch(
    () => documentManagementAPI.getDocuments(1, 50),
    []
  ) as any;

  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    async (formData) => {
      await documentManagementAPI.uploadDocument(formData as FormData);
    }
  );

  const documents = data?.data || [];

  const stats = [
    { label: 'Total Documents', value: data?.total || '1,234', color: 'bg-indigo-500' },
    { label: 'Verified', value: data?.stats?.verified || '1,098', color: 'bg-green-500' },
    { label: 'Pending Review', value: data?.stats?.pending || '98', color: 'bg-orange-500' },
    { label: 'Storage Used', value: data?.stats?.storageUsed || '2.4 GB', color: 'bg-blue-500' },
  ];

  const statusColors: Record<string, string> = {
    'pending': 'bg-orange-100 text-orange-800',
    'verified': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };

  const filteredDocuments = documents.filter((doc: any) =>
    doc.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.owner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#054374] mb-8">Document Management Admin</h1>

        <div className="flex gap-4 border-b mb-8">
          {['documents', 'analytics', 'settings'].map(tab => (
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

        {activeTab === 'documents' && (
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
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => handleSubmit(formData)}
                disabled={submitLoading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Plus size={20} /> {submitLoading ? 'Uploading...' : 'Upload Document'}
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
                  <Loader className="animate-spin text-indigo-500" size={32} />
                </div>
              )}
              {error && (
                <div className="p-8 flex justify-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <span>Error loading documents</span>
                </div>
              )}
              {!loading && !error && (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">File Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Owner</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Size</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Uploaded</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.length === 0 ? (
                    <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No documents found</td></tr>
                  ) : (
                  filteredDocuments.map((doc: any) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{doc.fileName}</td>
                      <td className="px-6 py-4 text-gray-600">{doc.owner}</td>
                      <td className="px-6 py-4">{doc.type}</td>
                      <td className="px-6 py-4 text-sm">{doc.size}</td>
                      <td className="px-6 py-4 text-sm">{doc.uploadDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[doc.status]}`}>
                          {doc.status}
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
                            await documentManagementAPI.deleteDocument(doc.id);
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
              <h3 className="text-lg font-bold mb-4">Documents by Type</h3>
              <div className="space-y-3">
                {[
                  { type: 'Academic', count: 456, percentage: 37 },
                  { type: 'Identity', count: 389, percentage: 32 },
                  { type: 'Financial', count: 234, percentage: 19 },
                  { type: 'Medical', count: 155, percentage: 12 },
                ].map(item => (
                  <div key={item.type}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Storage Analytics</h3>
              <div className="space-y-4">
                {[
                  { category: 'Documents Stored', value: '1,234' },
                  { category: 'Storage Used', value: '2.4 GB' },
                  { category: 'Storage Available', value: '7.6 GB' },
                  { category: 'Documents Verified', value: '1,098 (89%)' },
                ].map(item => (
                  <div key={item.category} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{item.category}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
            <h3 className="text-lg font-bold mb-6">Document Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Max File Size (MB)</label>
                <input type="number" defaultValue={50} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Allowed File Types</label>
                <input type="text" defaultValue="PDF, JPG, PNG, DOC, DOCX" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Storage Quota per User (GB)</label>
                <input type="number" defaultValue={1} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Enable Encryption</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Yes (AES-256)</option>
                  <option>No</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
