import React, { useState } from 'react';
import { Settings, Plus, Edit2, Trash2, ToggleRight, ToggleLeft } from 'lucide-react';

interface AdminOption {
  id: string;
  title: string;
  description: string;
  category: string;
  isActive: boolean;
  requiredPermissions: string[];
  assignedTo: string[]; // Employee IDs
}

interface AssignedOption {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface AdminDashboardOptionsProps {
  employees?: any[];
  setEmployees?: (employees: any[]) => void;
  loggedInEmployee?: any;
}

function AdminDashboardOptions(props: AdminDashboardOptionsProps) {
  const [options, setOptions] = useState<AdminOption[]>([
    {
      id: 'opt001',
      title: 'Create Applications',
      description: 'Allow employees to create new applications for students',
      category: 'applications',
      isActive: true,
      requiredPermissions: ['create_applications'],
      assignedTo: ['emp001'],
    },
    {
      id: 'opt002',
      title: 'View Reports',
      description: 'Access to analytics and reporting dashboard',
      category: 'analytics',
      isActive: true,
      requiredPermissions: ['view_reports'],
      assignedTo: ['emp001', 'emp002'],
    },
    {
      id: 'opt003',
      title: 'Manage Employees',
      description: 'Add, edit, and remove team members',
      category: 'admin',
      isActive: true,
      requiredPermissions: ['manage_employees'],
      assignedTo: ['emp001'],
    },
    {
      id: 'opt004',
      title: 'Approve Applications',
      description: 'Review and approve student applications',
      category: 'applications',
      isActive: true,
      requiredPermissions: ['approve_applications'],
      assignedTo: ['emp001'],
    },
    {
      id: 'opt005',
      title: 'View Analytics',
      description: 'View system analytics and statistics',
      category: 'analytics',
      isActive: true,
      requiredPermissions: ['view_analytics'],
      assignedTo: ['emp001'],
    },
    {
      id: 'opt006',
      title: 'Send Messages',
      description: 'Send messages to students and staff',
      category: 'communication',
      isActive: true,
      requiredPermissions: ['send_messages'],
      assignedTo: ['emp001', 'emp002', 'emp003'],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'applications',
    requiredPermissions: [] as string[],
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const categories = [
    { value: 'applications', label: '📋 Applications', color: 'blue' },
    { value: 'documents', label: '📄 Documents', color: 'purple' },
    { value: 'analytics', label: '📊 Analytics', color: 'green' },
    { value: 'admin', label: '⚙️ Administration', color: 'orange' },
    { value: 'communication', label: '💬 Communication', color: 'pink' },
    { value: 'settings', label: '🔧 Settings', color: 'indigo' },
  ];

  const allPermissions = [
    'create_applications',
    'view_applications',
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

  const handleAddOption = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: 'applications',
      requiredPermissions: [],
    });
    setSelectedPermissions([]);
    setShowForm(true);
  };

  const handleEditOption = (option: AdminOption) => {
    setEditingId(option.id);
    setFormData({
      title: option.title,
      description: option.description,
      category: option.category,
      requiredPermissions: option.requiredPermissions,
    });
    setSelectedPermissions(option.requiredPermissions);
    setShowForm(true);
  };

  const handleSaveOption = () => {
    if (editingId) {
      setOptions(options.map(opt =>
        opt.id === editingId
          ? {
              ...opt,
              ...formData,
              requiredPermissions: selectedPermissions,
            }
          : opt
      ));
    } else {
      setOptions([...options, {
        id: `opt${Date.now()}`,
        ...formData,
        requiredPermissions: selectedPermissions,
        isActive: true,
        assignedTo: [],
      }]);
    }
    setShowForm(false);
  };

  const handleDeleteOption = (id: string) => {
    if (confirm('Are you sure you want to delete this option?')) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const toggleOptionStatus = (id: string) => {
    setOptions(options.map(opt =>
      opt.id === id ? { ...opt, isActive: !opt.isActive } : opt
    ));
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      applications: '#3b82f6',
      documents: '#a855f7',
      analytics: '#10b981',
      admin: '#f97316',
      communication: '#ec4899',
      settings: '#6366f1',
    };
    return colors[category] || '#054374';
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <Settings className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dashboard Options</h1>
              <p className="text-gray-600 mt-1">Configure admin dashboard features and assign to employees</p>
            </div>
          </div>
          <button
            onClick={handleAddOption}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
            style={{ backgroundColor: '#054374' }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Option</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? 'Edit Option' : 'Add New Option'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Option title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Option description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Required Permissions</label>
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                  {allPermissions.map(perm => (
                    <label key={perm} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{perm.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={handleSaveOption}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Option' : 'Create Option'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Category Bar */}
            <div
              className="h-1"
              style={{ backgroundColor: getCategoryColor(option.category) }}
            />

            <div className="p-6">
              {/* Title and Status */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900 flex-1">{option.title}</h3>
                <button
                  onClick={() => toggleOptionStatus(option.id)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  {option.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>

              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: getCategoryColor(option.category) }}
                >
                  {categories.find(c => c.value === option.category)?.label}
                </span>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">REQUIRED PERMISSIONS ({option.requiredPermissions.length})</p>
                <div className="flex flex-wrap gap-1">
                  {option.requiredPermissions.map(perm => (
                    <span
                      key={perm}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {perm.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned To */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-500 mb-1">ASSIGNED TO</p>
                <p className="text-sm font-semibold text-blue-700">
                  {option.assignedTo.length > 0 ? `${option.assignedTo.length} employee(s)` : 'Not assigned yet'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditOption(option)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteOption(option.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {options.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No options configured yet</p>
          <button
            onClick={handleAddOption}
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#054374' }}
          >
            Create First Option
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardOptions;
