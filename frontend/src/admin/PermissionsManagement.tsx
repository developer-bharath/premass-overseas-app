import React, { useState } from 'react';
import { Lock, Plus, Edit2, Trash2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  employees: number;
  isActive: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

interface PermissionsManagementProps {
  employees?: any[];
  setEmployees?: (employees: any[]) => void;
  loggedInEmployee?: any;
}

function PermissionsManagement(props: PermissionsManagementProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'perm001',
      name: 'View Applications',
      description: 'Access and view all student applications',
      category: 'applications',
      employees: 3,
      isActive: true,
      riskLevel: 'low',
    },
    {
      id: 'perm002',
      name: 'Create Applications',
      description: 'Create new applications on behalf of students',
      category: 'applications',
      employees: 2,
      isActive: true,
      riskLevel: 'low',
    },
    {
      id: 'perm003',
      name: 'Edit Applications',
      description: 'Edit existing student applications',
      category: 'applications',
      employees: 2,
      isActive: true,
      riskLevel: 'medium',
    },
    {
      id: 'perm004',
      name: 'Approve Applications',
      description: 'Approve or reject student applications',
      category: 'applications',
      employees: 1,
      isActive: true,
      riskLevel: 'high',
    },
    {
      id: 'perm005',
      name: 'Reject Applications',
      description: 'Reject student applications',
      category: 'applications',
      employees: 1,
      isActive: true,
      riskLevel: 'high',
    },
    {
      id: 'perm006',
      name: 'Send Messages',
      description: 'Send messages to students and staff',
      category: 'communication',
      employees: 3,
      isActive: true,
      riskLevel: 'low',
    },
    {
      id: 'perm007',
      name: 'Manage Documents',
      description: 'Manage student documents and files',
      category: 'documents',
      employees: 2,
      isActive: true,
      riskLevel: 'medium',
    },
    {
      id: 'perm008',
      name: 'View Reports',
      description: 'Access analytics and reporting dashboard',
      category: 'analytics',
      employees: 2,
      isActive: true,
      riskLevel: 'medium',
    },
    {
      id: 'perm009',
      name: 'View Analytics',
      description: 'View system analytics and statistics',
      category: 'analytics',
      employees: 1,
      isActive: true,
      riskLevel: 'medium',
    },
    {
      id: 'perm010',
      name: 'Manage Employees',
      description: 'Add, edit, and remove team members',
      category: 'admin',
      employees: 1,
      isActive: true,
      riskLevel: 'high',
    },
    {
      id: 'perm011',
      name: 'Manage Settings',
      description: 'Configure system settings and preferences',
      category: 'admin',
      employees: 1,
      isActive: true,
      riskLevel: 'high',
    },
    {
      id: 'perm012',
      name: 'Delete Applications',
      description: 'Delete applications from system',
      category: 'applications',
      employees: 1,
      isActive: true,
      riskLevel: 'high',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'applications',
    riskLevel: 'low' as 'low' | 'medium' | 'high',
  });

  const categories = [
    { value: 'applications', label: '📋 Applications' },
    { value: 'documents', label: '📄 Documents' },
    { value: 'analytics', label: '📊 Analytics' },
    { value: 'admin', label: '⚙️ Administration' },
    { value: 'communication', label: '💬 Communication' },
  ];

  const handleAddPermission = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      category: 'applications',
      riskLevel: 'low',
    });
    setShowForm(true);
  };

  const handleEditPermission = (perm: Permission) => {
    setEditingId(perm.id);
    setFormData({
      name: perm.name,
      description: perm.description,
      category: perm.category,
      riskLevel: perm.riskLevel,
    });
    setShowForm(true);
  };

  const handleSavePermission = () => {
    if (editingId) {
      setPermissions(permissions.map(perm =>
        perm.id === editingId ? { ...perm, ...formData } : perm
      ));
    } else {
      setPermissions([...permissions, {
        id: `perm${Date.now()}`,
        ...formData,
        employees: 0,
        isActive: true,
      }]);
    }
    setShowForm(false);
  };

  const handleDeletePermission = (id: string) => {
    if (confirm('Are you sure? This permission is assigned to employees.')) {
      setPermissions(permissions.filter(perm => perm.id !== id));
    }
  };

  const togglePermissionStatus = (id: string) => {
    setPermissions(permissions.map(perm =>
      perm.id === id ? { ...perm, isActive: !perm.isActive } : perm
    ));
  };

  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
    };
    return colors[level] || '#6b7280';
  };

  const getRiskBgColor = (level: string) => {
    const colors: Record<string, string> = {
      low: '#f0fdf4',
      medium: '#fffbeb',
      high: '#fef2f2',
    };
    return colors[level] || '#f9fafb';
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <Lock className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Permissions Management</h1>
              <p className="text-gray-600 mt-1">Manage system permissions and access control</p>
            </div>
          </div>
          <button
            onClick={handleAddPermission}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
            style={{ backgroundColor: '#054374' }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Permission</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? 'Edit Permission' : 'Add New Permission'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Permission Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="e.g., View Applications"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Describe what this permission allows"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Level</label>
                  <select
                    value={formData.riskLevel}
                    onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={handleSavePermission}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Permission' : 'Create Permission'}
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

      {/* Permissions List */}
      <div className="space-y-4">
        {permissions.map((perm) => (
          <div
            key={perm.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              {/* Permission Info */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{perm.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{perm.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {categories.find(c => c.value === perm.category)?.label}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">ASSIGNED TO</p>
                  <p className="text-2xl font-bold text-gray-900">{perm.employees}</p>
                  <p className="text-xs text-gray-600">employees</p>
                </div>
              </div>

              {/* Risk Level */}
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: getRiskBgColor(perm.riskLevel) }}
              >
                <p className="text-xs font-semibold text-gray-500 mb-1">RISK LEVEL</p>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getRiskColor(perm.riskLevel) }}
                  />
                  <p className="font-semibold text-sm" style={{ color: getRiskColor(perm.riskLevel) }}>
                    {perm.riskLevel.charAt(0).toUpperCase() + perm.riskLevel.slice(1)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => togglePermissionStatus(perm.id)}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-semibold transition text-sm ${
                    perm.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {perm.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEditPermission(perm)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeletePermission(perm.id)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {permissions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No permissions configured yet</p>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Permissions</p>
          <p className="text-3xl font-bold text-gray-900">{permissions.length}</p>
          <div className="mt-2 text-sm text-gray-600">
            {permissions.filter(p => p.isActive).length} active
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">High Risk Permissions</p>
          <p className="text-3xl font-bold text-red-600">{permissions.filter(p => p.riskLevel === 'high').length}</p>
          <div className="mt-2 text-sm text-gray-600">
            Require careful monitoring
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Assignments</p>
          <p className="text-3xl font-bold text-gray-900">{permissions.reduce((sum, p) => sum + p.employees, 0)}</p>
          <div className="mt-2 text-sm text-gray-600">
            Across all employees
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionsManagement;
